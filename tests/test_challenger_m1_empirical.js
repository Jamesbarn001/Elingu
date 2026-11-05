// ════════════════════════════════════════════════════════════
// tests/test_challenger_m1_empirical.js
// EMPIRICAL CHALLENGER DEEP STRESS HARNESS — Milestone 1 Remediation
// Specifically probes:
// 1. Concurrent M-Pesa callbacks (10-20 parallel requests for same receipt)
// 2. Concurrent M-Pesa callbacks across multiple intents for same receipt
// 3. Concurrent subscription activation with single receipt
// 4. Parameter destructuring with null/undefined/empty across all APIs
// 5. Client price tampering vs server price authority
// 6. CAK phone normalization and invalid prefix rejection
// 7. Ledger precedence (completed vs pending)
// ════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const PORT = 3002; // Isolated port
const BASE_URL = `http://localhost:${PORT}`;
let serverProc = null;

const DATA_DIR = path.resolve(__dirname, '..', 'data');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');
const PAYMENTS_BAK = path.join(DATA_DIR, 'payments.json.bak_challenger_deep');

function backupPayments() {
  if (fs.existsSync(PAYMENTS_FILE)) {
    fs.copyFileSync(PAYMENTS_FILE, PAYMENTS_BAK);
  }
}

function restorePayments() {
  if (fs.existsSync(PAYMENTS_BAK)) {
    fs.copyFileSync(PAYMENTS_BAK, PAYMENTS_FILE);
    fs.unlinkSync(PAYMENTS_BAK);
  }
}

async function startServer() {
  try {
    const r = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(1000) });
    if (r.ok) return;
  } catch (e) {}

  console.log(`📡 Spawning challenger server on port ${PORT}...`);
  serverProc = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT), NODE_ENV: 'test' },
    stdio: 'pipe'
  });

  serverProc.stderr.on('data', d => {
    // print unexpected server errors
    const str = d.toString();
    if (str.includes('TypeError') || str.includes('Unhandled') || str.includes('crash')) {
      console.error(`[Server stderr] ${str}`);
    }
  });

  const start = Date.now();
  while (Date.now() - start < 20000) {
    try {
      const r = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(1000) });
      if (r.ok) {
        console.log(`✅ Challenger server healthy on port ${PORT}\n`);
        return;
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 300));
  }
  throw new Error('Server failed to start in 20s');
}

function stopServer() {
  if (serverProc) {
    serverProc.kill('SIGTERM');
    serverProc = null;
  }
}

async function api(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const fetchOptions = {
    method: options.method || 'GET',
    headers,
    signal: AbortSignal.timeout(15000)
  };
  if (options.body !== undefined) {
    fetchOptions.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
  }

  const res = await fetch(url, fetchOptions);
  let data;
  try {
    data = await res.json();
  } catch (e) {
    data = null;
  }
  return { status: res.status, ok: res.ok, data };
}

let totalProbes = 0;
let passedProbes = 0;
const probeFailures = [];

async function probe(name, fn) {
  totalProbes++;
  const id = `Probe-${totalProbes}`;
  process.stdout.write(`  [${id}] ${name} ... `);
  try {
    await fn();
    passedProbes++;
    console.log('✅ PASS');
  } catch (err) {
    console.log(`❌ FAIL`);
    console.error(`      Error: ${err.message}`);
    probeFailures.push({ id, name, error: err.message, stack: err.stack });
  }
}

async function runEmpiricalStress() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('⚔️  CHALLENGER DEEP EMPIRICAL STRESS HARNESS — M1 REMEDIATION');
  console.log('════════════════════════════════════════════════════════════\n');

  backupPayments();

  const paymentStore = require('../paymentStore');
  const authUtils = require('../authUtils');

  // ════════════════════════════════════════════════════════════
  // SECTION 1: IN-PROCESS PARAMETER DESTRUCTURING & NULL SAFETY
  // ════════════════════════════════════════════════════════════
  console.log('--- SECTION 1: In-Process Parameter Destructuring & Null Safety ---');

  await probe('paymentStore.calculateExpectedPrice(null) returns valid CBC monthly default without throwing', async () => {
    const res = paymentStore.calculateExpectedPrice(null);
    assert(res && typeof res === 'object');
    assert.strictEqual(res.amount, 499);
    assert.strictEqual(res.curriculum, 'CBC');
    assert.strictEqual(res.planPeriod, 'monthly');
  });

  await probe('paymentStore.calculateExpectedPrice(undefined) returns valid default', async () => {
    const res = paymentStore.calculateExpectedPrice(undefined);
    assert(res && typeof res === 'object');
    assert.strictEqual(res.amount, 499);
  });

  await probe('paymentStore.calculateExpectedPrice({}) returns valid default', async () => {
    const res = paymentStore.calculateExpectedPrice({});
    assert.strictEqual(res.amount, 499);
  });

  await probe('paymentStore.createIntent(null) returns null without throwing', async () => {
    const res = paymentStore.createIntent(null);
    assert.strictEqual(res, null);
  });

  await probe('paymentStore.createIntent(undefined) throws required email validation error without crash', async () => {
    assert.throws(() => paymentStore.createIntent(undefined), /Payer email is required/);
  });

  await probe('paymentStore.createIntent({}) throws required email validation error without crash', async () => {
    assert.throws(() => paymentStore.createIntent({}), /Payer email is required/);
  });

  await probe('paymentStore.completePayment(null) returns error response without throwing', async () => {
    const res = paymentStore.completePayment(null);
    assert(res && typeof res === 'object');
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.code, 'INTENT_NOT_FOUND');
  });

  await probe('paymentStore.completePayment({}) returns error response without throwing', async () => {
    const res = paymentStore.completePayment({});
    assert(res && typeof res === 'object');
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.code, 'INTENT_NOT_FOUND');
  });

  await probe('paymentStore.findIntent(null) and findIntent(undefined) return null', async () => {
    assert.strictEqual(paymentStore.findIntent(null), null);
    assert.strictEqual(paymentStore.findIntent(undefined), null);
  });

  await probe('paymentStore.getPaymentStatus(null) and getPaymentStatus(undefined) return not_found', async () => {
    assert.strictEqual(paymentStore.getPaymentStatus(null).status, 'not_found');
    assert.strictEqual(paymentStore.getPaymentStatus(undefined).status, 'not_found');
  });

  // ════════════════════════════════════════════════════════════
  // SECTION 2: INTENT IDEMPOTENCY & LEDGER PRECEDENCE
  // ════════════════════════════════════════════════════════════
  console.log('\n--- SECTION 2: Intent Idempotency & Ledger Precedence ---');

  await probe('createIntent with duplicate intentId returns existing intent idempotently', async () => {
    const uniqueId = 'pi_idem_test_' + Date.now();
    const intent1 = paymentStore.createIntent({
      intentId: uniqueId,
      email: 'idem_user@example.com',
      curriculum: 'CBC',
      planPeriod: 'monthly'
    });
    assert.strictEqual(intent1.id, uniqueId);
    assert.strictEqual(intent1.amount, 499);

    // Call again with same ID but different parameters
    const intent2 = paymentStore.createIntent({
      intentId: uniqueId,
      email: 'attacker@example.com',
      curriculum: 'BRITISH',
      planPeriod: 'annual'
    });

    // Must return intent1 unchanged
    assert.strictEqual(intent2.id, uniqueId);
    assert.strictEqual(intent2.email, 'idem_user@example.com');
    assert.strictEqual(intent2.amount, 499);
  });

  await probe('Completed payment cannot be shadowed or overwritten by new intent with same ID', async () => {
    const compId = 'pi_comp_shadow_' + Date.now();
    const receipt = 'REC_SHADOW_' + Date.now();

    // Create and complete
    paymentStore.createIntent({
      intentId: compId,
      email: 'legit_user@example.com',
      curriculum: 'BRITISH',
      planPeriod: 'termly'
    });
    const cRes = paymentStore.completePayment({
      intentId: compId,
      paidAmount: 8900,
      currency: 'KES',
      providerReceipt: receipt
    });
    assert.strictEqual(cRes.success, true);

    // Try to create new intent reusing the completed ID
    const intentAttempt = paymentStore.createIntent({
      intentId: compId,
      email: 'attacker@example.com',
      curriculum: 'CBC',
      planPeriod: 'monthly'
    });

    // Should return existing completed intent idempotently
    assert.strictEqual(intentAttempt.id, compId);
    assert.strictEqual(intentAttempt.status, 'completed');
    assert.strictEqual(intentAttempt.email, 'legit_user@example.com');

    // findIntent lookup returns completed payment
    const lookup = paymentStore.findIntent({ intentId: compId });
    assert.strictEqual(lookup.status, 'completed');
    assert.strictEqual(lookup.providerReceipt, receipt);
  });

  // ════════════════════════════════════════════════════════════
  // SECTION 3: COMMUNICATIONS AUTHORITY OF KENYA (CAK) PHONE NORMALIZATION
  // ════════════════════════════════════════════════════════════
  console.log('\n--- SECTION 3: CAK Mobile Prefix Enforcement ---');

  await probe('authUtils.normalizeKenyanPhone validates authentic Kenyan mobile prefixes', async () => {
    assert.strictEqual(authUtils.normalizeKenyanPhone('0712345678'), '+254712345678');
    assert.strictEqual(authUtils.normalizeKenyanPhone('0722000000'), '+254722000000');
    assert.strictEqual(authUtils.normalizeKenyanPhone('0110000000'), '+254110000000');
    assert.strictEqual(authUtils.normalizeKenyanPhone('254712345678'), '+254712345678');
    assert.strictEqual(authUtils.normalizeKenyanPhone('+254712345678'), '+254712345678');
    assert.strictEqual(authUtils.normalizeKenyanPhone('+254112345678'), '+254112345678');
    assert.strictEqual(authUtils.normalizeKenyanPhone('712345678'), '+254712345678');
    assert.strictEqual(authUtils.normalizeKenyanPhone('112345678'), '+254112345678');
  });

  await probe('authUtils.normalizeKenyanPhone rejects non-mobile, dummy, and foreign numbers', async () => {
    // Dummy sequences
    assert.strictEqual(authUtils.normalizeKenyanPhone('0000000000'), null);
    assert.strictEqual(authUtils.normalizeKenyanPhone('+254000000000'), null);
    assert.strictEqual(authUtils.normalizeKenyanPhone('254000000000'), null);

    // Landlines (Nairobi 020, Mombasa 041, Kisumu 057)
    assert.strictEqual(authUtils.normalizeKenyanPhone('0201234567'), null);
    assert.strictEqual(authUtils.normalizeKenyanPhone('+254201234567'), null);

    // Toll-free
    assert.strictEqual(authUtils.normalizeKenyanPhone('0800123456'), null);

    // International (US, UK, etc.)
    assert.strictEqual(authUtils.normalizeKenyanPhone('+14155552671'), null);
    assert.strictEqual(authUtils.normalizeKenyanPhone('+447911123456'), null);

    // Short/invalid
    assert.strictEqual(authUtils.normalizeKenyanPhone('12345'), null);
    assert.strictEqual(authUtils.normalizeKenyanPhone(''), null);
    assert.strictEqual(authUtils.normalizeKenyanPhone(null), null);
    assert.strictEqual(authUtils.normalizeKenyanPhone(undefined), null);
  });

  // ════════════════════════════════════════════════════════════
  // SECTION 4: HTTP SERVER END-TO-END ADVERSARIAL STRESS
  // ════════════════════════════════════════════════════════════
  console.log('\n--- SECTION 4: HTTP Server End-to-End Adversarial Stress ---');

  await startServer();

  const studentStore = require('../studentStore');
  const parentStore = require('../parentStore');

  const testEmail = `challenger_deep_${Date.now()}@example.com`;
  const parentPass = 'DeepChallenge2026!';
  const childHandle = `DeepKid_${Date.now().toString(36)}`;

  const regRes = await api('/api/students/profile', {
    method: 'POST',
    body: { handle: childHandle, pin: '7788', grade: 8, email: testEmail }
  });
  assert.strictEqual(regRes.status, 200);
  const studentId = regRes.data.student.id;

  const parentRec = parentStore.getParentByEmail(testEmail);
  const vRes = await api('/api/parent/verify', {
    method: 'POST',
    body: { token: parentRec.verifyToken, childId: studentId, familyPassword: parentPass }
  });
  assert.strictEqual(vRes.status, 200);

  // 4.1 Client Price Tampering vs Server Authority
  await probe('POST /api/payment/initiate overrides positive client amounts and enforces server catalogue', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'BRITISH',
        planPeriod: 'termly',
        amount: 1, // Tampered amount KES 1!
        provider: 'daraja'
      }
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.amount, 8900, 'Server price authority must override KES 1 to KES 8,900');
    assert.strictEqual(res.data.currency, 'KES');
  });

  await probe('POST /api/payment/initiate rejects zero or negative amounts with 400', async () => {
    const resZero = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'CBC',
        planPeriod: 'monthly',
        amount: 0
      }
    });
    assert.strictEqual(resZero.status, 400);

    const resNeg = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'CBC',
        planPeriod: 'monthly',
        amount: -499
      }
    });
    assert.strictEqual(resNeg.status, 400);
  });

  await probe('POST /api/payment/initiate rejects invalid plan periods with 400', async () => {
    const resBadPeriod = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'CBC',
        planPeriod: 'hacked_custom_period'
      }
    });
    assert.strictEqual(resBadPeriod.status, 400);
    assert(resBadPeriod.data.error.includes('Invalid plan period'));
  });

  await probe('POST /api/payment/initiate accepts integer numeric phone { phone: 254712345678 } without 500 error', async () => {
    const res = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'CBC',
        planPeriod: 'termly',
        phone: 254712345678, // Integer number
        provider: 'daraja'
      }
    });
    assert.strictEqual(res.status, 200);
    assert(res.data.checkoutRequestId, 'Should return checkoutRequestId');
  });

  // 4.2 CONCURRENCY RACE CONDITION: 10 Parallel M-Pesa Callbacks for the SAME CheckoutRequestID & Receipt
  await probe('10 Parallel M-Pesa callbacks for same CheckoutRequestID & receipt: exactly 1 completes, 9 marked replayed', async () => {
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'CBC',
        planPeriod: 'termly',
        phone: '0712345678',
        provider: 'daraja'
      }
    });
    assert.strictEqual(initRes.status, 200);
    const coId = initRes.data.checkoutRequestId;
    assert(coId, 'CheckoutRequestID must be present');

    const raceReceipt = 'REC_PARALLEL_STRESS_' + Date.now();
    const makePayload = () => ({
      Body: {
        stkCallback: {
          MerchantRequestID: 'MR_' + Date.now(),
          CheckoutRequestID: coId,
          ResultCode: 0,
          ResultDesc: 'The service request is processed successfully.',
          CallbackMetadata: {
            Item: [
              { Name: 'Amount', Value: 1199 },
              { Name: 'MpesaReceiptNumber', Value: raceReceipt },
              { Name: 'PhoneNumber', Value: 254712345678 }
            ]
          }
        }
      }
    });

    // Dispatch 10 requests simultaneously
    const requests = Array.from({ length: 10 }).map(() =>
      api('/api/payment/mpesa-callback', { method: 'POST', body: makePayload() })
    );

    const responses = await Promise.all(requests);

    // All must return HTTP 200 to Daraja gateway
    for (const r of responses) {
      assert.strictEqual(r.status, 200);
      assert.strictEqual(r.data.ResultCode, 0);
    }

    // Verify polling status returns completed
    const poll = await api(`/api/payment/status?intentId=${initRes.data.intentId}`);
    assert.strictEqual(poll.data.status, 'completed');
    assert.strictEqual(poll.data.amount, 1199);
    assert.strictEqual(poll.data.providerReceipt, raceReceipt);

    // Reload ledger and verify single-use guarantee
    paymentStore.initLedger();
    const all = paymentStore.getAllPayments();
    const completedWithReceipt = all.completedPayments.filter(p => p.providerReceipt === raceReceipt);
    assert.strictEqual(completedWithReceipt.length, 1, 'Exactly one completed entry in ledger');

    const completedEntry = completedWithReceipt[0];
    assert.strictEqual(completedEntry.replayedCount, 9, `Expected 9 replayed attempts, got ${completedEntry.replayedCount}`);
  });

  // 4.3 CONCURRENCY RACE CONDITION: 10 Parallel Callbacks for 10 DIFFERENT Intents Presenting the SAME Receipt
  await probe('10 Parallel M-Pesa callbacks for 10 DIFFERENT intents presenting SAME receipt: exactly 1 completes', async () => {
    const sharedReceipt = 'REC_SHARED_MULTI_' + Date.now();
    const intents = [];

    // Create 10 distinct intents
    for (let i = 0; i < 10; i++) {
      const init = await api('/api/payment/initiate', {
        method: 'POST',
        body: {
          email: testEmail,
          studentId,
          curriculum: 'CBC',
          planPeriod: 'monthly',
          phone: '0712345678',
          provider: 'daraja'
        }
      });
      assert.strictEqual(init.status, 200);
      assert(init.data.checkoutRequestId);
      intents.push(init.data);
    }

    // Fire 10 parallel callbacks with different checkoutRequestIDs but the SAME receipt
    const promises = intents.map(intent =>
      api('/api/payment/mpesa-callback', {
        method: 'POST',
        body: {
          Body: {
            stkCallback: {
              MerchantRequestID: 'MR_' + Date.now(),
              CheckoutRequestID: intent.checkoutRequestId,
              ResultCode: 0,
              ResultDesc: 'Success',
              CallbackMetadata: {
                Item: [
                  { Name: 'Amount', Value: 499 },
                  { Name: 'MpesaReceiptNumber', Value: sharedReceipt },
                  { Name: 'PhoneNumber', Value: 254712345678 }
                ]
              }
            }
          }
        }
      })
    );

    const responses = await Promise.all(promises);
    for (const r of responses) {
      assert.strictEqual(r.status, 200);
    }

    // Inspect ledger: exactly ONE of the 10 intents completed, other 9 remained pending or rejected
    paymentStore.initLedger();
    const all = paymentStore.getAllPayments();
    const completed = all.completedPayments.filter(p => p.providerReceipt === sharedReceipt);
    assert.strictEqual(completed.length, 1, `Exactly 1 intent must complete with shared receipt, got ${completed.length}`);
  });

  // 4.4a REPLAY DEFENSE: Verify that once callback consumes receipt, all concurrent attempts to reuse it fail with 403
  await probe('Replay defense: Once callback completes payment, all attempts to reuse receipt on /api/parent/child-subscription are rejected with 403', async () => {
    // Register second child under testEmail
    const child2Handle = `Kid2_${Date.now().toString(36)}`;
    const regChild2 = await api('/api/students/profile', {
      method: 'POST',
      body: { handle: child2Handle, pin: '4455', grade: 8, email: testEmail }
    });
    assert.strictEqual(regChild2.status, 200);
    const child2Id = regChild2.data.student.id;

    // Create an unassigned completed payment (no studentId)
    const initUnassigned = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        curriculum: 'CBC',
        planPeriod: 'termly',
        phone: '0712345678',
        provider: 'daraja'
      }
    });
    assert.strictEqual(initUnassigned.status, 200);
    const coId = initUnassigned.data.checkoutRequestId;
    const singleReceipt = 'REC_UNASSIGNED_' + Date.now();

    const cbRes = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_' + Date.now(),
            CheckoutRequestID: coId,
            ResultCode: 0,
            ResultDesc: 'Success',
            CallbackMetadata: {
              Item: [
                { Name: 'Amount', Value: 1199 },
                { Name: 'MpesaReceiptNumber', Value: singleReceipt },
                { Name: 'PhoneNumber', Value: 254712345678 }
              ]
            }
          }
        }
      }
    });
    assert.strictEqual(cbRes.status, 200);

    // Now fire 5 concurrent requests to activate either child 1 or child 2 with this already consumed receipt
    const activationTargets = [studentId, child2Id, studentId, child2Id, studentId];
    const actPromises = activationTargets.map(targetId =>
      api('/api/parent/child-subscription', {
        method: 'POST',
        body: {
          email: testEmail,
          familyPassword: parentPass,
          studentId: targetId,
          tier: 'standard',
          billingCycle: 'termly',
          paymentReceipt: singleReceipt
        }
      })
    );

    const actResponses = await Promise.all(actPromises);
    const rejected = actResponses.filter(r => r.status === 403 && r.data?.code === 'RECEIPT_ALREADY_USED');
    assert.strictEqual(rejected.length, 5, `All 5 replay attempts must be rejected with 403 RECEIPT_ALREADY_USED, got ${rejected.length}`);
  });

  // 4.4b CONCURRENCY RACE CONDITION: 5 Concurrent child activations with an unconsumed completed payment
  await probe('5 Concurrent POST /api/parent/child-subscription with an unconsumed receipt: exactly 1 succeeds, 4 get 403', async () => {
    // Manually register an unconsumed completed payment in the ledger
    const unconsumedReceipt = 'REC_FRESH_' + Date.now();
    const freshIntentId = 'pi_fresh_' + Date.now();

    // Create intent and complete in paymentStore directly (simulating completed payment awaiting manual claim)
    paymentStore.createIntent({
      intentId: freshIntentId,
      email: testEmail,
      curriculum: 'CBC',
      planPeriod: 'termly',
      amount: 1199
    });
    paymentStore.completePayment({
      intentId: freshIntentId,
      paidAmount: 1199,
      currency: 'KES',
      providerReceipt: unconsumedReceipt
    });
    assert.strictEqual(paymentStore.isReceiptUsed(unconsumedReceipt), true);
    assert.strictEqual(paymentStore.isReceiptConsumed(unconsumedReceipt), false);

    // Fire 5 concurrent requests with this unconsumed receipt
    const actPromises = Array.from({ length: 5 }).map(() =>
      api('/api/parent/child-subscription', {
        method: 'POST',
        body: {
          email: testEmail,
          familyPassword: parentPass,
          studentId,
          tier: 'standard',
          billingCycle: 'termly',
          paymentReceipt: unconsumedReceipt
        }
      })
    );

    const actResponses = await Promise.all(actPromises);
    const succeeded = actResponses.filter(r => r.status === 200 && r.data?.success === true);
    const rejected = actResponses.filter(r => r.status === 403 && r.data?.code === 'RECEIPT_ALREADY_USED');

    assert.strictEqual(succeeded.length, 1, `Expected exactly 1 activation to succeed, got ${succeeded.length}`);
    assert.strictEqual(rejected.length, 4, `Expected exactly 4 activations rejected with 403, got ${rejected.length}`);
    assert.strictEqual(paymentStore.isReceiptConsumed(unconsumedReceipt), true);
  });

  // 4.5 Deprecated self-activation endpoint safety
  await probe('POST /api/payment/confirm rejects any attempt to self-activate with 403', async () => {
    const res = await api('/api/payment/confirm', {
      method: 'POST',
      body: {
        tier: 'premium',
        email: testEmail
      }
    });
    assert.strictEqual(res.status, 403);
    assert.strictEqual(res.data.code, 'FORBIDDEN_SELF_ACTIVATION');
  });

  stopServer();
  restorePayments();

  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`SUMMARY: ${passedProbes} / ${totalProbes} Probes Passed (${Math.round((passedProbes / totalProbes) * 100)}%)`);
  if (probeFailures.length > 0) {
    console.log(`❌ FAILURES: ${probeFailures.length}`);
    probeFailures.forEach(f => console.log(`  - [${f.id}] ${f.name}: ${f.error}`));
  } else {
    console.log('🎉 ALL EMPIRICAL CHALLENGER STRESS PROBES PASSED ZERO CRITICAL DEFECTS');
  }
  console.log('════════════════════════════════════════════════════════════\n');

  if (probeFailures.length > 0) {
    process.exit(1);
  }
}

runEmpiricalStress().catch(err => {
  console.error('Fatal crash in stress harness:', err);
  stopServer();
  restorePayments();
  process.exit(1);
});
