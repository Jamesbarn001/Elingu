// ════════════════════════════════════════════════════════════
// tests/test_m1_payment_security.js
// Forensic Automated Verification for Milestone 1:
// Payment Security, Idempotent Ledger & Gatekeeping
// ════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;
let serverProc = null;

async function startServer() {
  try {
    const r = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(1500) });
    if (r.ok) return;
  } catch (e) {}

  console.log(`📡 Spawning Elingu test server on port ${PORT}...`);
  serverProc = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT), NODE_ENV: 'test' },
    stdio: 'ignore'
  });

  const start = Date.now();
  while (Date.now() - start < 20000) {
    try {
      const r = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(1000) });
      if (r.ok) {
        console.log(`✅ Server healthy on port ${PORT}\n`);
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
    signal: AbortSignal.timeout(10000)
  };
  if (options.body) {
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

let testCount = 0;
let passedCount = 0;

async function runTest(name, fn) {
  testCount++;
  process.stdout.write(`  [${testCount}] ${name} ... `);
  try {
    await fn();
    passedCount++;
    console.log('✅ PASS');
  } catch (err) {
    console.log(`❌ FAIL\n      Error: ${err.message}`);
  }
}

async function main() {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('🛡️  MILESTONE 1 FORENSIC PAYMENT SECURITY TEST SUITE');
  console.log('════════════════════════════════════════════════════════════\n');

  await startServer();

  const parentStore = require('../parentStore');
  const studentStore = require('../studentStore');
  const paymentStore = require('../paymentStore');

  // Test setup: create test parent and learner
  const testEmail = `parent_m1_${Date.now()}@example.com`;
  const parentPass = 'FamilySecure2026!';
  const childHandle = `Learner_${Date.now().toString(36)}`;
  const childPin = '8492';

  // 1. Create learner
  const regRes = await api('/api/students/profile', {
    method: 'POST',
    body: { handle: childHandle, pin: childPin, grade: 8, email: testEmail }
  });
  assert.strictEqual(regRes.status, 200, 'Student registration must succeed');
  const studentId = regRes.data.student.id;

  // 2. Verify parent
  const parentRec = parentStore.getParentByEmail(testEmail);
  assert(parentRec && parentRec.verifyToken, 'Parent token must exist');
  const verifyRes = await api('/api/parent/verify', {
    method: 'POST',
    body: { token: parentRec.verifyToken, childId: studentId, familyPassword: parentPass }
  });
  assert.strictEqual(verifyRes.status, 200, 'Parent verification must succeed');

  // ── TEST 1: REJECTION OF UNVERIFIED CLIENT SELF-ACTIVATION VIA /api/payment/confirm
  await runTest('POST /api/payment/confirm rejects direct client self-activation with 403 Forbidden', async () => {
    const res = await api('/api/payment/confirm', {
      method: 'POST',
      body: {
        email: testEmail,
        familyPassword: parentPass,
        studentId,
        tier: 'premium',
        billingCycle: 'annual',
        transactionRef: 'FAKE_TX_' + Date.now()
      }
    });

    assert.strictEqual(res.status, 403, 'Must return HTTP 403 Forbidden');
    assert.strictEqual(res.data.code, 'FORBIDDEN_SELF_ACTIVATION');

    // Confirm student and parent tiers remain 'free'
    const updatedParent = parentStore.getParentByEmail(testEmail);
    assert.strictEqual(updatedParent.subscriptionTier, 'free', 'Parent tier must remain free');
    const updatedStudent = studentStore.getStudentById(studentId);
    assert.strictEqual(updatedStudent.subscriptionTier, 'free', 'Student tier must remain free');
  });

  // ── TEST 2: REJECTION OF DIRECT TIER MUTATION VIA /api/parent/subscription
  await runTest('POST /api/parent/subscription rejects unpaid tier upgrade with 403 Forbidden', async () => {
    const res = await api('/api/parent/subscription', {
      method: 'POST',
      body: {
        email: testEmail,
        familyPassword: parentPass,
        tier: 'premium',
        billingCycle: 'monthly'
      }
    });

    assert.strictEqual(res.status, 403, 'Must return HTTP 403 Forbidden');
    assert.strictEqual(res.data.code, 'PAID_ACCESS_REQUIRES_VERIFIED_PAYMENT');

    const updatedParent = parentStore.getParentByEmail(testEmail);
    assert.strictEqual(updatedParent.subscriptionTier, 'free', 'Parent tier must remain free');
  });

  // ── TEST 3: REJECTION OF DIRECT LEARNER TIER MUTATION VIA /api/parent/child-subscription
  await runTest('POST /api/parent/child-subscription rejects unpaid learner upgrade with 403 Forbidden', async () => {
    const res = await api('/api/parent/child-subscription', {
      method: 'POST',
      body: {
        email: testEmail,
        familyPassword: parentPass,
        studentId,
        tier: 'standard',
        billingCycle: 'termly'
      }
    });

    assert.strictEqual(res.status, 403, 'Must return HTTP 403 Forbidden');
    assert.strictEqual(res.data.code, 'PAID_ACCESS_REQUIRES_VERIFIED_PAYMENT');

    const updatedStudent = studentStore.getStudentById(studentId);
    assert.strictEqual(updatedStudent.subscriptionTier, 'free', 'Student tier must remain free');
  });

  // ── TEST 4: FREE PLAN DOWNGRADE PERMITTED WITHOUT PAYMENT
  await runTest('Downgrading to "free" tier succeeds without payment record', async () => {
    const resChild = await api('/api/parent/child-subscription', {
      method: 'POST',
      body: {
        email: testEmail,
        familyPassword: parentPass,
        studentId,
        tier: 'free'
      }
    });
    assert.strictEqual(resChild.status, 200, 'Free child subscription update must succeed');

    const resParent = await api('/api/parent/subscription', {
      method: 'POST',
      body: {
        email: testEmail,
        familyPassword: parentPass,
        tier: 'free'
      }
    });
    assert.strictEqual(resParent.status, 200, 'Free parent subscription update must succeed');
  });

  // ── TEST 5: SERVER-SIDE PRICE AUTHORITY (CLIENT AMOUNTS ARE DISCARDED)
  let britishIntent = null;
  await runTest('POST /api/payment/initiate calculates canonical price and ignores client amount tampering', async () => {
    const tamperedRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        familyPassword: parentPass,
        studentId,
        curriculum: 'BRITISH',
        planPeriod: 'termly',
        amount: 1, // MALICIOUS CLIENT TAMPERING: KES 1 instead of KES 8,900
        price: 5,
        provider: 'daraja'
      }
    });

    assert.strictEqual(tamperedRes.status, 200, 'Initiate must succeed');
    assert.strictEqual(tamperedRes.data.amount, 8900, 'Server must enforce canonical KES 8,900 price');
    assert.strictEqual(tamperedRes.data.currency, 'KES', 'Currency must be KES');
    assert.strictEqual(tamperedRes.data.planPeriod, 'termly');
    assert.strictEqual(tamperedRes.data.curriculum, 'BRITISH');

    britishIntent = tamperedRes.data;

    // Verify stored intent in ledger
    const storedIntent = paymentStore.getIntent(britishIntent.intentId);
    assert(storedIntent, 'Intent must exist in paymentStore ledger');
    assert.strictEqual(storedIntent.amount, 8900, 'Stored intent amount must be 8900');
    assert.strictEqual(storedIntent.status, 'pending');

    // Also test CBC Monthly authoritative pricing
    const cbcRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        curriculum: 'CBC',
        planPeriod: 'monthly',
        amount: 50 // Tampered
      }
    });
    assert.strictEqual(cbcRes.data.amount, 499, 'CBC Monthly must resolve to KES 499');
  });

  // ── TEST 6: SAFE READ-ONLY PAYMENT STATUS POLLING
  await runTest('GET /api/payment/status returns accurate read-only intent status', async () => {
    const res = await api(`/api/payment/status?intentId=${britishIntent.intentId}`);
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.status, 'pending');
    assert.strictEqual(res.data.amount, 8900);
    assert.strictEqual(res.data.curriculum, 'BRITISH');

    const notFound = await api('/api/payment/status?intentId=nonexistent_id');
    assert.strictEqual(notFound.status, 404);
  });

  // ── TEST 7: M-PESA CALLBACK REJECTS CANCELLED / FAILED RESULTCODE
  await runTest('/api/payment/mpesa-callback ignores non-zero ResultCode without granting access', async () => {
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'BRITISH',
        planPeriod: 'termly',
        phone: '0712345678',
        provider: 'daraja'
      }
    });
    assert.strictEqual(initRes.status, 200);
    const checkoutReqId = initRes.data.checkoutRequestId;
    assert(checkoutReqId, 'checkoutRequestId must be present');

    const callbackPayload = {
      Body: {
        stkCallback: {
          MerchantRequestID: 'MR_FAIL',
          CheckoutRequestID: checkoutReqId,
          ResultCode: 1032, // User cancelled
          ResultDesc: 'Request cancelled by user'
        }
      }
    };

    const res = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: callbackPayload
    });

    assert.strictEqual(res.status, 200, 'Must return 200 to Safaricom');

    const studentAfterFail = studentStore.getStudentById(studentId);
    assert.strictEqual(studentAfterFail.subscriptionTier, 'free', 'Failed payment must not grant access');

    const pollRes = await api(`/api/payment/status?intentId=${initRes.data.intentId}`);
    assert.strictEqual(pollRes.data.status, 'failed', 'Intent status must be failed');
  });

  // ── TEST 8: M-PESA CALLBACK REJECTS UNDERPAYMENT TAMPERING
  let underpayIntent = null;
  await runTest('/api/payment/mpesa-callback rejects underpayment (amount mismatch)', async () => {
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'BRITISH',
        planPeriod: 'termly',
        phone: '0712345678',
        provider: 'daraja'
      }
    });
    assert.strictEqual(initRes.status, 200);
    underpayIntent = initRes.data;
    const checkoutReqId = underpayIntent.checkoutRequestId;
    assert(checkoutReqId, 'checkoutRequestId must be present');

    // Safaricom callback claiming ResultCode 0, but paid amount is only KES 100 instead of KES 8,900
    const underpayCallback = {
      Body: {
        stkCallback: {
          MerchantRequestID: 'MR_UNDERPAY',
          CheckoutRequestID: checkoutReqId,
          ResultCode: 0,
          ResultDesc: 'Success',
          CallbackMetadata: {
            Item: [
              { Name: 'Amount', Value: 100 }, // Underpayment: 100 vs expected 8,900
              { Name: 'MpesaReceiptNumber', Value: 'QWE_UNDERPAY_1' },
              { Name: 'PhoneNumber', Value: 254712345678 }
            ]
          }
        }
      }
    };

    const cbRes = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: underpayCallback
    });
    assert.strictEqual(cbRes.status, 200, 'Must acknowledge Safaricom webhook');

    const studentAfterUnderpay = studentStore.getStudentById(studentId);
    assert.strictEqual(studentAfterUnderpay.subscriptionTier, 'free', 'Underpayment must not grant access');

    const pollRes = await api(`/api/payment/status?intentId=${underpayIntent.intentId}`);
    assert.strictEqual(pollRes.data.status, 'underpaid_rejected', 'Intent must be marked underpaid_rejected');
  });

  // ── TEST 9: M-PESA CALLBACK VERIFIED PAYMENT GRANTS ACCESS
  const testReceipt = 'QWE_LEGIT_' + Date.now();
  let legitIntent = null;
  await runTest('/api/payment/mpesa-callback with exact amount and unused receipt activates paid plan', async () => {
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'BRITISH',
        planPeriod: 'termly',
        phone: '0712345678',
        provider: 'daraja'
      }
    });
    assert.strictEqual(initRes.status, 200);
    legitIntent = initRes.data;
    const checkoutReqId = legitIntent.checkoutRequestId;
    assert(checkoutReqId, 'checkoutRequestId must be present');

    const validCallback = {
      Body: {
        stkCallback: {
          MerchantRequestID: 'MR_LEGIT',
          CheckoutRequestID: checkoutReqId,
          ResultCode: 0,
          ResultDesc: 'The service request is processed successfully.',
          CallbackMetadata: {
            Item: [
              { Name: 'Amount', Value: 8900 }, // Exact expected amount
              { Name: 'MpesaReceiptNumber', Value: testReceipt },
              { Name: 'PhoneNumber', Value: 254712345678 }
            ]
          }
        }
      }
    };

    const cbRes = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: validCallback
    });
    assert.strictEqual(cbRes.status, 200);

    // Verify polling returns completed
    const pollRes = await api(`/api/payment/status?intentId=${legitIntent.intentId}`);
    assert.strictEqual(pollRes.data.status, 'completed');
    assert.strictEqual(pollRes.data.providerReceipt, testReceipt);
    assert.strictEqual(pollRes.data.paidAmount, 8900);

    // Verify student subscription upgraded
    const studentAfterPay = studentStore.getStudentById(studentId);
    assert.strictEqual(studentAfterPay.subscriptionTier, 'premium', 'Learner must be upgraded to premium');
  });

  // ── TEST 10: SINGLE-USE RECEIPT & REPLAY ATTACK PREVENTION
  await runTest('Replaying completed receipt does not grant access second time', async () => {
    // 1. Replay the exact callback
    const replayCheckoutReqId = 'ws_CO_REPLAY_' + Date.now();
    const replayCallback = {
      Body: {
        stkCallback: {
          MerchantRequestID: 'MR_REPLAY',
          CheckoutRequestID: replayCheckoutReqId,
          ResultCode: 0,
          ResultDesc: 'Success',
          CallbackMetadata: {
            Item: [
              { Name: 'Amount', Value: 8900 },
              { Name: 'MpesaReceiptNumber', Value: testReceipt }, // REPLAY: Already completed receipt!
              { Name: 'PhoneNumber', Value: 254712345678 }
            ]
          }
        }
      }
    };

    const replayRes = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: replayCallback
    });
    assert.strictEqual(replayRes.status, 200, 'Must return 200 to Safaricom without error');

    // 2. Attempt to use this receipt on another student or parent endpoint
    const otherStudent = studentStore.createStudent({
      handle: 'Attacker_' + Date.now(),
      pin: '7391',
      email: 'attacker@example.com',
      grade: 8
    });

    const hijackRes = await api('/api/parent/child-subscription', {
      method: 'POST',
      body: {
        email: testEmail,
        familyPassword: parentPass,
        studentId: otherStudent.id,
        tier: 'premium',
        paymentReceipt: testReceipt // Attempting to reuse already consumed receipt
      }
    });

    assert.strictEqual(hijackRes.status, 403, 'Receipt reuse must be rejected with 403');
    assert.strictEqual(hijackRes.data.code, 'RECEIPT_ALREADY_USED');
  });

  // ── TEST 11: PERSISTENT LEDGER INTEGRITY & ZERO TRUNCATION
  await runTest('Payment ledger stores records permanently on disk without 50-item truncation', async () => {
    const paymentsFilePath = path.join(__dirname, '..', 'data', 'payments.json');
    assert(fs.existsSync(paymentsFilePath), 'data/payments.json must exist');

    const fileRaw = JSON.parse(fs.readFileSync(paymentsFilePath, 'utf8'));
    assert(Array.isArray(fileRaw.completedPayments), 'completedPayments must be an array');
    assert(fileRaw.receiptIndex, 'receiptIndex must be populated');
    assert(fileRaw.receiptIndex[testReceipt], 'Receipt must be indexed in receiptIndex');

    // Re-initialize paymentStore to verify disk load persistence
    paymentStore.initLedger();
    assert(paymentStore.isReceiptUsed(testReceipt), 'Receipt must still be marked used after reload');
    const paymentCheck = paymentStore.getCompletedPaymentByReceipt(testReceipt);
    assert(paymentCheck, 'Payment record must be retrievable by receipt after reload');
    assert.strictEqual(paymentCheck.paidAmount, 8900);
  });

  console.log('\n────────────────────────────────────────────────────────────');
  console.log(`Results: ${passedCount} / ${testCount} Tests Passed (${((passedCount / testCount) * 100).toFixed(1)}%)`);
  console.log('────────────────────────────────────────────────────────────\n');

  stopServer();

  if (passedCount !== testCount) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal Test Runner Error:', err);
  stopServer();
  process.exit(1);
});
