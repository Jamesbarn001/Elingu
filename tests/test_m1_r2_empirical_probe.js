// ════════════════════════════════════════════════════════════
// tests/test_m1_r2_empirical_probe.js
// EMPIRICAL CHALLENGER DEEP AUDIT HARNESS — MILESTONE 1 R2
// Focused Stress-Testing of the 4 Target Remediation Areas
// ════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const paymentStore = require('../paymentStore');
const authUtils = require('../authUtils');
const pricingConfig = require('../pricingConfig');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function api(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const fetchOptions = {
    method: options.method || 'GET',
    headers,
    signal: AbortSignal.timeout(10000)
  };
  if (options.body) {
    fetchOptions.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
  }
  const res = await fetch(url, fetchOptions);
  let data = null;
  const text = await res.text();
  try {
    data = JSON.parse(text);
  } catch (e) {
    data = text;
  }
  return { status: res.status, ok: res.ok, headers: res.headers, data };
}

const auditResults = {
  passed: 0,
  failed: 0,
  details: []
};

async function testCase(name, fn) {
  process.stdout.write(`  [PROBE] ${name} ... `);
  try {
    const outcome = await fn();
    console.log('✅ PASS');
    auditResults.passed++;
    auditResults.details.push({ name, status: 'PASS', outcome });
  } catch (err) {
    console.log('❌ FAIL');
    console.error(`      Error: ${err.message}`);
    auditResults.failed++;
    auditResults.details.push({ name, status: 'FAIL', error: err.message, stack: err.stack });
  }
}

async function runAudit() {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('🔬 EMPIRICAL CHALLENGER R2 AUDIT — 4 TARGET REMEDIATION AREAS');
  console.log('════════════════════════════════════════════════════════════\n');

  // Verify server is listening
  try {
    const health = await api('/api/health');
    assert(health.status === 200, 'Server must be running on target port');
    console.log(`📡 Connected to target server at ${BASE_URL}\n`);
  } catch (e) {
    console.error(`❌ Could not connect to server at ${BASE_URL}. Ensure server is running.`);
    process.exit(1);
  }

  // ════════════════════════════════════════════════════════════
  // AREA 1: Zero/Negative Amounts & Plan Period Validation
  // ════════════════════════════════════════════════════════════
  console.log('─── AREA 1: Amount Boundaries & Canonical Plan Period Validation ───');

  await testCase('Reject amount: 0 with HTTP 400', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: { email: 'probe_bnd_1@example.com', amount: 0, curriculum: 'CBC', planPeriod: 'monthly' }
    });
    assert.strictEqual(res.status, 400);
    assert(res.data.error.includes('greater than zero'));
  });

  await testCase('Reject negative amount: -500 with HTTP 400', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: { email: 'probe_bnd_2@example.com', amount: -500, curriculum: 'CBC', planPeriod: 'monthly' }
    });
    assert.strictEqual(res.status, 400);
    assert(res.data.error.includes('greater than zero'));
  });

  await testCase('Reject fractional negative amount: -0.01 with HTTP 400', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: { email: 'probe_bnd_3@example.com', amount: -0.01, curriculum: 'CBC', planPeriod: 'monthly' }
    });
    assert.strictEqual(res.status, 400);
  });

  await testCase('Reject NaN string amount: "invalid_num" with HTTP 400', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: { email: 'probe_bnd_4@example.com', amount: 'invalid_num', curriculum: 'CBC', planPeriod: 'monthly' }
    });
    assert.strictEqual(res.status, 400);
  });

  await testCase('Reject unrecognised planPeriod: "custom" with HTTP 400', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: { email: 'probe_bnd_5@example.com', curriculum: 'CBC', planPeriod: 'custom' }
    });
    assert.strictEqual(res.status, 400);
    assert.strictEqual(res.data.error, 'Invalid plan period.');
  });

  await testCase('Reject unrecognised planPeriod: "hacked_tier" with HTTP 400', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: { email: 'probe_bnd_6@example.com', curriculum: 'CBC', planPeriod: 'hacked_tier' }
    });
    assert.strictEqual(res.status, 400);
  });

  await testCase('Reject free trial checkout initiation (amount <= 0) with HTTP 400', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: { email: 'probe_bnd_7@example.com', curriculum: 'BRITISH', planPeriod: 'trial' }
    });
    assert.strictEqual(res.status, 400);
    assert(res.data.error.includes('Free trials do not require payment checkout'));
  });

  await testCase('Positive amount tampering (amount: 1) is overridden by server price authority (KES 8,900)', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: 'probe_bnd_8@example.com',
        amount: 1, // Tampered price
        curriculum: 'BRITISH',
        planPeriod: 'termly',
        provider: 'daraja'
      }
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.amount, 8900, 'Server authority must compute KES 8,900, not KES 1');
  });

  // ════════════════════════════════════════════════════════════
  // AREA 2: Numeric Phone Input & CAK Prefix Normalization
  // ════════════════════════════════════════════════════════════
  console.log('\n─── AREA 2: Phone Input Types & CAK Mobile Prefix Normalization ───');

  await testCase('POST /api/payment/initiate with 12-digit numeric phone (254712345678) returns 200', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: 'probe_phone_1@example.com',
        phone: 254712345678, // Integer type!
        curriculum: 'CBC',
        planPeriod: 'monthly',
        provider: 'daraja'
      }
    });
    assert.strictEqual(res.status, 200);
    assert(res.data.checkoutRequestId, 'Should return checkoutRequestId');
  });

  await testCase('POST /api/payment/initiate with 12-digit numeric 01-prefix phone (254112345678) returns 200', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: 'probe_phone_2@example.com',
        phone: 254112345678, // Integer type with CAK 01 prefix
        curriculum: 'CBC',
        planPeriod: 'monthly',
        provider: 'daraja'
      }
    });
    assert.strictEqual(res.status, 200);
  });

  await testCase('POST /api/payment/initiate with 9-digit numeric phone (712345678) returns 200', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: 'probe_phone_3@example.com',
        phone: 712345678, // Integer 9-digit
        curriculum: 'CBC',
        planPeriod: 'monthly',
        provider: 'daraja'
      }
    });
    assert.strictEqual(res.status, 200);
  });

  await testCase('POST /api/payment/initiate with dummy numeric phone (254000000000) rejected with HTTP 400', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: 'probe_phone_4@example.com',
        phone: 254000000000, // Invalid CAK prefix (00)
        curriculum: 'CBC',
        planPeriod: 'monthly',
        provider: 'daraja'
      }
    });
    assert.strictEqual(res.status, 400);
    assert(res.data.error.includes('phone') || res.data.error.includes('M-Pesa'));
  });

  await testCase('POST /api/payment/initiate with Nairobi landline (254201234567) rejected with HTTP 400', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: 'probe_phone_5@example.com',
        phone: 254201234567, // Nairobi landline
        curriculum: 'CBC',
        planPeriod: 'monthly',
        provider: 'daraja'
      }
    });
    assert.strictEqual(res.status, 400);
  });

  await testCase('POST /api/payment/initiate with single-digit numeric phone (0) does not crash (HTTP 400)', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: 'probe_phone_6@example.com',
        phone: 0,
        curriculum: 'CBC',
        planPeriod: 'monthly',
        provider: 'daraja'
      }
    });
    // Must return 400 or handle cleanly, NEVER HTTP 500
    assert.notStrictEqual(res.status, 500);
  });

  // ════════════════════════════════════════════════════════════
  // AREA 3: Intent Collision, Shadowing & Precedence in paymentStore
  // ════════════════════════════════════════════════════════════
  console.log('\n─── AREA 3: Intent Collision, Shadowing & Precedence ───');

  await testCase('createIntent returns existing intent when intentId already exists (idempotency)', async () => {
    const testId = 'pi_test_idem_' + Date.now();
    const intentA = paymentStore.createIntent({
      intentId: testId,
      email: 'original_user@example.com',
      curriculum: 'CBC',
      planPeriod: 'monthly'
    });
    assert.strictEqual(intentA.id, testId);
    assert.strictEqual(intentA.email, 'original_user@example.com');

    // Attempt collision with different email and curriculum
    const intentB = paymentStore.createIntent({
      intentId: testId,
      email: 'attacker_user@example.com',
      curriculum: 'BRITISH',
      planPeriod: 'termly'
    });

    // Must return existing intentA without mutating or creating shadow
    assert.strictEqual(intentB.id, testId);
    assert.strictEqual(intentB.email, 'original_user@example.com', 'Original user must be preserved');
    assert.strictEqual(intentB.amount, 499, 'Original amount must be preserved');
  });

  await testCase('Completed payments cannot be shadowed by new pending intent reusing same ID', async () => {
    const completedId = 'pi_test_comp_' + Date.now();
    const receipt = 'REC_SHADOW_TEST_' + Date.now();

    paymentStore.createIntent({
      intentId: completedId,
      email: 'legit_customer@example.com',
      curriculum: 'CBC',
      planPeriod: 'termly'
    });

    const comp = paymentStore.completePayment({
      intentId: completedId,
      paidAmount: 1199,
      currency: 'KES',
      providerReceipt: receipt
    });
    assert.strictEqual(comp.success, true);

    // Try to create intent with same completedId
    const collisionAttempt = paymentStore.createIntent({
      intentId: completedId,
      email: 'shadow_attacker@example.com',
      curriculum: 'BRITISH',
      planPeriod: 'annual'
    });
    assert.strictEqual(collisionAttempt.id, completedId);
    assert.strictEqual(collisionAttempt.status, 'completed', 'Must return completed record');

    // findIntent must return the completed payment
    const lookup = paymentStore.findIntent({ intentId: completedId });
    assert.strictEqual(lookup.status, 'completed', 'Completed payment must take precedence over any pending intent');
    assert.strictEqual(lookup.providerReceipt, receipt);
  });

  await testCase('Null and undefined parameter safety across paymentStore APIs', async () => {
    // Should safely return defaults without throwing Uncaught TypeError
    assert.strictEqual(paymentStore.findIntent(null), null);
    assert.strictEqual(paymentStore.findIntent(undefined), null);
    assert.strictEqual(paymentStore.getPaymentStatus(null).status, 'not_found');
    assert.strictEqual(paymentStore.getPaymentStatus(undefined).status, 'not_found');
    assert.strictEqual(paymentStore.isReceiptUsed(null), false);
    assert.strictEqual(paymentStore.isReceiptUsed(undefined), false);
    assert.strictEqual(paymentStore.isReceiptConsumed(null), false);
    assert.strictEqual(paymentStore.isReceiptConsumed(undefined), false);

    // Safe destructuring on calculateExpectedPrice(null)
    const priceRes = paymentStore.calculateExpectedPrice(null);
    assert.strictEqual(priceRes.amount, 499, 'Should default to 499 KES');

    // Safe parameter on createIntent(null)
    const createRes = paymentStore.createIntent(null);
    assert.strictEqual(createRes, null);

    // Safe parameter on completePayment(null)
    const completeRes = paymentStore.completePayment(null);
    assert.strictEqual(completeRes.success, false);
  });

  // ════════════════════════════════════════════════════════════
  // AREA 4: Daraja Callback ResultCode Handling
  // ════════════════════════════════════════════════════════════
  console.log('\n─── AREA 4: Daraja Callback ResultCode Coercion & Security ───');

  await testCase('Daraja callback with numeric ResultCode: 0 confirms payment and grants access', async () => {
    const email = `probe_daraja_num_${Date.now()}@example.com`;
    const init = await api('/api/payment/initiate', {
      method: 'POST',
      body: { email, curriculum: 'CBC', planPeriod: 'monthly', phone: '0712345678', provider: 'daraja' }
    });
    assert.strictEqual(init.status, 200);
    const coId = init.data.checkoutRequestId;
    const receipt = 'REC_NUM_ZERO_' + Date.now();

    const cb = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_NUM_ZERO',
            CheckoutRequestID: coId,
            ResultCode: 0, // Numeric integer 0
            ResultDesc: 'The service request is processed successfully.',
            CallbackMetadata: {
              Item: [
                { Name: 'Amount', Value: 499 },
                { Name: 'MpesaReceiptNumber', Value: receipt },
                { Name: 'PhoneNumber', Value: 254712345678 }
              ]
            }
          }
        }
      }
    });
    assert.strictEqual(cb.status, 200);

    const status = await api(`/api/payment/status?intentId=${init.data.intentId}`);
    assert.strictEqual(status.data.status, 'completed', 'Numeric ResultCode: 0 must complete payment');
    assert.strictEqual(status.data.providerReceipt, receipt);
  });

  await testCase('Daraja callback with numeric ResultCode: 1032 marks intent failed and denies access', async () => {
    const email = `probe_daraja_cancel_${Date.now()}@example.com`;
    const init = await api('/api/payment/initiate', {
      method: 'POST',
      body: { email, curriculum: 'CBC', planPeriod: 'monthly', phone: '0712345678', provider: 'daraja' }
    });
    assert.strictEqual(init.status, 200);
    const coId = init.data.checkoutRequestId;

    const cb = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_CANCEL',
            CheckoutRequestID: coId,
            ResultCode: 1032, // User cancelled
            ResultDesc: 'Request cancelled by user'
          }
        }
      }
    });
    assert.strictEqual(cb.status, 200);

    const status = await api(`/api/payment/status?intentId=${init.data.intentId}`);
    assert.strictEqual(status.data.status, 'failed', 'ResultCode: 1032 must mark intent failed');
  });

  await testCase('Daraja callback with string ResultCode: "0" behavior inspection', async () => {
    const email = `probe_daraja_str_${Date.now()}@example.com`;
    const init = await api('/api/payment/initiate', {
      method: 'POST',
      body: { email, curriculum: 'CBC', planPeriod: 'monthly', phone: '0712345678', provider: 'daraja' }
    });
    assert.strictEqual(init.status, 200);
    const coId = init.data.checkoutRequestId;
    const receipt = 'REC_STR_ZERO_' + Date.now();

    const cb = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_STR_ZERO',
            CheckoutRequestID: coId,
            ResultCode: "0", // String "0"
            ResultDesc: 'The service request is processed successfully.',
            CallbackMetadata: {
              Item: [
                { Name: 'Amount', Value: 499 },
                { Name: 'MpesaReceiptNumber', Value: receipt },
                { Name: 'PhoneNumber', Value: 254712345678 }
              ]
            }
          }
        }
      }
    });
    assert.strictEqual(cb.status, 200);

    const status = await api(`/api/payment/status?intentId=${init.data.intentId}`);
    return {
      coId,
      status: status.data.status,
      isCompleted: status.data.status === 'completed',
      isFailed: status.data.status === 'failed'
    };
  });

  // ════════════════════════════════════════════════════════════
  // SUMMARY
  // ════════════════════════════════════════════════════════════
  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`📊 AUDIT SUMMARY: ${auditResults.passed} Passed, ${auditResults.failed} Failed`);
  console.log('════════════════════════════════════════════════════════════\n');

  if (auditResults.failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAudit().catch(err => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
