// ============================================================
// tests/test_auditor_m3_forensic.js — Auditor M3 Independent Forensic Stress Test
// Tests paystackService and mpesaService implementation directly and via server
// ============================================================

const assert = require('assert');
const crypto = require('crypto');
const paystackService = require('../paystackService');
const mpesaService = require('../mpesaService');

async function runTests() {
  console.log('--- 1. Testing paystackService.initializeTransaction ---');
  // Check subunit conversion for all approved pricing tiers
  const tiers = [
    { ksh: 499, expectedSubunits: 49900 },
    { ksh: 1199, expectedSubunits: 119900 },
    { ksh: 3499, expectedSubunits: 349900 },
    { ksh: 3500, expectedSubunits: 350000 },
    { ksh: 8900, expectedSubunits: 890000 },
    { ksh: 12900, expectedSubunits: 1290000 },
    { ksh: 24500, expectedSubunits: 2450000 },
  ];

  for (const t of tiers) {
    const res = await paystackService.initializeTransaction({
      email: 'parent@example.com',
      amountKsh: t.ksh
    });
    assert.strictEqual(res.success, true, `Init failed for KES ${t.ksh}`);
    assert.strictEqual(res.amount, t.expectedSubunits, `Subunit mismatch for KES ${t.ksh}`);
    assert.strictEqual(res.currency, 'KES');
    assert.ok(res.reference.startsWith('pstk_'), `Reference prefix mismatch: ${res.reference}`);
    assert.strictEqual(res.authorizationUrl, `https://checkout.paystack.com/${res.reference}`);
    assert.strictEqual(res.accessCode, `acc_${res.reference}`);
  }
  console.log('✅ All subunit conversions & simulation fallbacks verified.');

  console.log('\n--- 2. Testing paystackService.verifyWebhookSignature ---');
  const secret = paystackService.PAYSTACK_SECRET_KEY;
  const payloadStr = JSON.stringify({ event: 'charge.success', data: { reference: 'pstk_test_123' } });
  const validSig = crypto.createHmac('sha512', secret).update(payloadStr).digest('hex');

  // Valid signature
  assert.strictEqual(paystackService.verifyWebhookSignature(payloadStr, validSig), true, 'Valid signature must pass');
  
  // Buffer body
  assert.strictEqual(paystackService.verifyWebhookSignature(Buffer.from(payloadStr, 'utf8'), validSig), true, 'Buffer body must pass');

  // Tampered payload
  const tamperedStr = JSON.stringify({ event: 'charge.success', data: { reference: 'pstk_tampered' } });
  assert.strictEqual(paystackService.verifyWebhookSignature(tamperedStr, validSig), false, 'Tampered payload must fail');

  // Invalid signature string
  assert.strictEqual(paystackService.verifyWebhookSignature(payloadStr, 'bad_sig'), false, 'Bad signature must fail');
  assert.strictEqual(paystackService.verifyWebhookSignature(payloadStr, ''), false, 'Empty signature must fail');
  assert.strictEqual(paystackService.verifyWebhookSignature('', validSig), false, 'Empty body must fail');
  assert.strictEqual(paystackService.verifyWebhookSignature(null, validSig), false, 'Null body must fail');
  assert.strictEqual(paystackService.verifyWebhookSignature(payloadStr, null), false, 'Null sig must fail');

  // Length mismatch guard test (timingSafeEqual requires equal length, verify no uncaught exceptions)
  const shortSig = 'abcd';
  assert.strictEqual(paystackService.verifyWebhookSignature(payloadStr, shortSig), false, 'Short sig must fail gracefully');
  const longSig = 'a'.repeat(256);
  assert.strictEqual(paystackService.verifyWebhookSignature(payloadStr, longSig), false, 'Long sig must fail gracefully');
  console.log('✅ HMAC-SHA512 verification & timingSafeEqual bounds safely verified.');

  console.log('\n--- 3. Testing mpesaService.initiateSTKPush ---');
  // Valid Kenyan phones
  const validPhones = ['0712345678', '0722000000', '0110000000', '+254712345678', '254712345678'];
  for (const p of validPhones) {
    const res = await mpesaService.initiateSTKPush({
      phone: p,
      amount: 499,
      accountReference: 'ELINGU'
    });
    assert.strictEqual(res.success, true, `Valid phone ${p} should succeed`);
    assert.ok(res.checkoutRequestId.startsWith('ws_CO_'), 'checkoutRequestId prefix ws_CO_');
    assert.ok(res.merchantRequestId.startsWith('mr_'), 'merchantRequestId prefix mr_');
    assert.strictEqual(res.customerMessage, 'Success. Request accepted for processing');
    assert.strictEqual(res.currency, 'KES');
  }

  // Also support phoneNumber field
  const resPhoneField = await mpesaService.initiateSTKPush({
    phoneNumber: '0712345678',
    amount: 1199
  });
  assert.strictEqual(resPhoneField.success, true, 'phoneNumber field should be supported');

  // Malformed phones
  const badPhones = ['0712', '12345678', '+12025550199', 'invalid_phone', '', null, undefined];
  for (const bp of badPhones) {
    const res = await mpesaService.initiateSTKPush({
      phone: bp,
      amount: 499
    });
    assert.strictEqual(res.success, false, `Bad phone ${bp} must fail`);
    assert.strictEqual(res.error, 'Invalid Kenyan phone number format.');
  }
  console.log('✅ Kenyan phone validation and STK simulation response fields verified.');

  console.log('\n--- 4. Testing paystackService.verifyTransaction ---');
  const verifyRes = await paystackService.verifyTransaction('pstk_sample_ref_123');
  assert.strictEqual(verifyRes.success, true);
  assert.strictEqual(verifyRes.simulated, true);
  assert.strictEqual(verifyRes.data.status, 'success');
  assert.strictEqual(verifyRes.data.currency, 'KES');

  const emptyVerify = await paystackService.verifyTransaction('');
  assert.strictEqual(emptyVerify.success, false);
  console.log('✅ verifyTransaction behavior verified.');

  console.log('\n🎉 ALL AUDITOR FORENSIC PROBES PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Probe failed:', err);
  process.exit(1);
});
