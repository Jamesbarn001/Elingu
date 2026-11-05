// ============================================================
// tests/test_adversarial_m3.js — Adversarial Stress Test for Milestone 3
// Independent probes for paystackService, mpesaService, and server webhook endpoints
// ============================================================

const crypto = require('crypto');
const http = require('http');
const paystackService = require('../paystackService');
const mpesaService = require('../mpesaService');
const paymentStore = require('../paymentStore');
const parentStore = require('../parentStore');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`  ❌ [FAIL] ${message}`);
    failed++;
  } else {
    console.log(`  ✅ [PASS] ${message}`);
    passed++;
  }
}

async function runProbes() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('🛡️  ADVERSARIAL STRESS PROBES — MILESTONE 3 (GATEWAYS)');
  console.log('════════════════════════════════════════════════════════════\n');

  // ── SECTION 1: Paystack Subunit Cents Conversion & Boundary Math ──
  console.log('>>> SECTION 1: Paystack Subunit Cents & Math Boundary');
  {
    const res1 = await paystackService.initializeTransaction({ email: 'test@example.com', amountKsh: 499 });
    assert(res1.amount === 49900, '499 KES converts to exactly 49900 cents');

    const res2 = await paystackService.initializeTransaction({ email: 'test@example.com', amountKsh: 8900 });
    assert(res2.amount === 890000, '8900 KES converts to exactly 890000 cents');

    const res3 = await paystackService.initializeTransaction({ email: 'test@example.com', amountKsh: 1199.50 });
    assert(res3.amount === 119950, '1199.50 KES converts to 119950 cents via Math.round');

    const res4 = await paystackService.initializeTransaction({ email: 'test@example.com', amountKsh: 0 });
    assert(res4.amount === 0, '0 KES converts to 0 cents without throwing');

    const res5 = await paystackService.initializeTransaction();
    assert(res5.amount === 0 && res5.reference, 'Empty options handled safely with auto-reference');
  }

  // ── SECTION 2: Paystack Timing-Safe HMAC-SHA512 Signature Verification ──
  console.log('\n>>> SECTION 2: Timing-Safe HMAC-SHA512 Verification');
  {
    const secret = paystackService.PAYSTACK_SECRET_KEY;
    const bodyStr = JSON.stringify({ event: 'charge.success', data: { reference: 'ref_123', amount: 50000 } });
    const validHmac = crypto.createHmac('sha512', secret).update(bodyStr).digest('hex');

    // Valid HMAC
    assert(paystackService.verifyWebhookSignature(bodyStr, validHmac) === true, 'Valid HMAC-SHA512 passes');

    // Tampered payload with valid HMAC
    const tamperedBody = bodyStr.replace('ref_123', 'ref_999');
    assert(paystackService.verifyWebhookSignature(tamperedBody, validHmac) === false, 'Tampered payload rejected');

    // Truncated / malformed signature length
    assert(paystackService.verifyWebhookSignature(bodyStr, validHmac.slice(0, 64)) === false, 'Short signature rejected without timingSafeEqual length throw');
    assert(paystackService.verifyWebhookSignature(bodyStr, validHmac + '00') === false, 'Long signature rejected without timingSafeEqual length throw');

    // Single-bit flip
    const flippedChar = validHmac[0] === 'a' ? 'b' : 'a';
    const flippedHmac = flippedChar + validHmac.slice(1);
    assert(paystackService.verifyWebhookSignature(bodyStr, flippedHmac) === false, 'Single character mutation rejected');

    // Null/undefined/empty
    assert(paystackService.verifyWebhookSignature(null, validHmac) === false, 'Null rawBody safely rejected');
    assert(paystackService.verifyWebhookSignature(bodyStr, null) === false, 'Null signatureHeader safely rejected');
    assert(paystackService.verifyWebhookSignature('', '') === false, 'Empty strings safely rejected');

    // Buffer rawBody support
    const bufBody = Buffer.from(bodyStr, 'utf8');
    assert(paystackService.verifyWebhookSignature(bufBody, validHmac) === true, 'Buffer rawBody verified correctly');
  }

  // ── SECTION 3: M-Pesa Phone Normalization & STK Simulation Contracts ──
  console.log('\n>>> SECTION 3: M-Pesa Phone Validation & Simulation Contracts');
  {
    // Valid phone variations
    const validCases = ['0712345678', '0112345678', '+254712345678', '254712345678', '0799887766'];
    for (const p of validCases) {
      const res = await mpesaService.initiateSTKPush({ phone: p, amount: 499 });
      assert(res.success === true && res.checkoutRequestId.startsWith('ws_CO_'), `Valid phone ${p} accepted with ws_CO_ prefix`);
      assert(res.customerMessage === 'Success. Request accepted for processing', 'Contains Daraja customerMessage');
      assert(res.merchantRequestId && res.merchantRequestId.startsWith('mr_'), 'Contains Daraja merchantRequestId');
    }

    // Support for alternative property name phoneNumber
    const resAlt = await mpesaService.initiateSTKPush({ phoneNumber: '0712345678', amount: 499 });
    assert(resAlt.success === true, 'Accepts phoneNumber property name');

    // Malformed and invalid phone inputs
    const invalidCases = [
      null, undefined, '', 'abc', '12345',
      '+14155552671', // US number
      '0201234567',   // Nairobi landline (not mobile)
      '070000000000', // Too long
      '0712'          // Too short
    ];
    for (const inv of invalidCases) {
      const res = await mpesaService.initiateSTKPush({ phone: inv, amount: 499 });
      assert(res.success === false && res.error, `Invalid phone "${inv}" rejected with explicit error`);
    }
  }

  // ── SECTION 4: Dual Gateway Configuration Toggles ──
  console.log('\n>>> SECTION 4: Dual Gateway Configuration Toggles');
  {
    assert(paystackService.PAYSTACK_ENV === 'test' || paystackService.PAYSTACK_ENV === 'live', 'PAYSTACK_ENV resolves to valid environment');
    assert(mpesaService.DARAJA_ENV === 'sandbox' || mpesaService.DARAJA_ENV === 'production', 'DARAJA_ENV resolves to valid environment');
  }

  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`SUMMARY: ${passed} / ${passed + failed} Probes Passed (${((passed / (passed + failed)) * 100).toFixed(1)}%)`);
  console.log('════════════════════════════════════════════════════════════\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runProbes().catch(err => {
  console.error('Fatal probe error:', err);
  process.exit(1);
});
