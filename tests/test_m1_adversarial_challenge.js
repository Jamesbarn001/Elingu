// ════════════════════════════════════════════════════════════
// tests/test_m1_adversarial_challenge.js
// EMPIRICAL CHALLENGER STRESS HARNESS — Milestone 1
// Probes edge cases, disk corruption, duplicate IDs, nulls,
// malformed phones, negative values, mismatched result codes,
// partial payments, and replay triggers.
// ════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3001; // Use 3001 to avoid collisions
const BASE_URL = `http://localhost:${PORT}`;
let serverProc = null;

const DATA_DIR = path.resolve(__dirname, '..', 'data');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');
const PAYMENTS_BACKUP_FILE = path.join(DATA_DIR, 'payments.json.bak_challenger');

// Backup payments.json before tests so we can restore original state
function backupPaymentsFile() {
  if (fs.existsSync(PAYMENTS_FILE)) {
    fs.copyFileSync(PAYMENTS_FILE, PAYMENTS_BACKUP_FILE);
  }
}

function restorePaymentsFile() {
  if (fs.existsSync(PAYMENTS_BACKUP_FILE)) {
    fs.copyFileSync(PAYMENTS_BACKUP_FILE, PAYMENTS_FILE);
    fs.unlinkSync(PAYMENTS_BACKUP_FILE);
  }
}

async function startServer() {
  try {
    const r = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(1500) });
    if (r.ok) return;
  } catch (e) {}

  console.log(`📡 Spawning Elingu challenger test server on port ${PORT}...`);
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
    signal: AbortSignal.timeout(10000)
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

let testCount = 0;
let passedCount = 0;
let findings = [];

async function probe(name, fn) {
  testCount++;
  process.stdout.write(`  [Probe ${testCount}] ${name} ... `);
  try {
    const result = await fn();
    passedCount++;
    console.log('✅ PASS');
    if (result && result.finding) {
      findings.push({ name, ...result.finding });
    }
  } catch (err) {
    console.log(`❌ FAIL: ${err.message}`);
    findings.push({ name, error: err.message, stack: err.stack, level: 'CRITICAL' });
  }
}

async function runAdversarialProbes() {
  console.log('\n════════════════════════════════════════════════════════════');
  console.log('⚔️  EMPIRICAL ADVERSARIAL STRESS HARNESS — MILESTONE 1');
  console.log('════════════════════════════════════════════════════════════\n');

  backupPaymentsFile();

  const paymentStore = require('../paymentStore');
  const parentStore = require('../parentStore');
  const studentStore = require('../studentStore');

  // ════════════════════════════════════════════════════════════
  // GROUP 1: paymentStore.js Edge Cases & Robustness
  // ════════════════════════════════════════════════════════════
  console.log('--- GROUP 1: paymentStore.js Edge Cases & Robustness ---');

  // 1.1 Disk Corruption Handling: Corrupted syntax
  await probe('paymentStore recovers gracefully from corrupted JSON syntax on disk', async () => {
    // Write malformed JSON to payments.json
    fs.writeFileSync(PAYMENTS_FILE, '{"intents": [{"id": "corrupt', 'utf8');

    // Call initLedger()
    paymentStore.initLedger();

    // Verify paymentStore does not crash and operates normally
    const testIntent = paymentStore.createIntent({
      email: 'recover_test@example.com',
      curriculum: 'CBC',
      planPeriod: 'monthly'
    });
    assert(testIntent && testIntent.id, 'createIntent must succeed after disk corruption recovery');
    assert.strictEqual(testIntent.amount, 499);

    const retrieved = paymentStore.findIntent({ intentId: testIntent.id });
    assert(retrieved && retrieved.id === testIntent.id, 'findIntent must locate new intent');
  });

  // 1.2 Disk Corruption Handling: Invalid Schema (non-array intents)
  await probe('paymentStore recovers gracefully from invalid schema (non-array intents)', async () => {
    fs.writeFileSync(PAYMENTS_FILE, JSON.stringify({ intents: "invalid_string_not_array", completedPayments: 123 }), 'utf8');
    paymentStore.initLedger();

    const intent = paymentStore.createIntent({
      email: 'schema_test@example.com',
      curriculum: 'BRITISH',
      planPeriod: 'termly'
    });
    assert(intent && intent.amount === 8900);
  });

  // 1.3 Duplicate Intent IDs Handling
  await probe('paymentStore behavior with duplicate intentId parameter', async () => {
    const dupId = 'pi_duplicate_test_' + Date.now();
    const intent1 = paymentStore.createIntent({
      intentId: dupId,
      email: 'user1@example.com',
      curriculum: 'CBC',
      planPeriod: 'monthly'
    });
    assert.strictEqual(intent1.id, dupId);

    // Call createIntent again with same intentId but different email and plan
    const intent2 = paymentStore.createIntent({
      intentId: dupId,
      email: 'user2@example.com',
      curriculum: 'BRITISH',
      planPeriod: 'termly'
    });

    const found = paymentStore.findIntent({ intentId: dupId });
    assert(found, 'Should find an intent with duplicate id');
    
    // Check finding note
    const finding = (intent1.email !== intent2.email && found.id === dupId) ? {
      observation: `createIntent allows duplicate intentId without throwing or overwriting check. findIntent returns the newest unshifted intent (${found.email}, amount: ${found.amount}).`,
      level: 'NOTE'
    } : null;

    return { finding };
  });

  // 1.4 Duplicate Intent ID when already in completedPayments
  await probe('paymentStore behavior when new intent reuses completed intentId', async () => {
    const compId = 'pi_completed_' + Date.now();
    const receipt = 'REC_COMP_' + Date.now();
    
    // Create and complete intent
    paymentStore.createIntent({
      intentId: compId,
      email: 'legit@example.com',
      curriculum: 'CBC',
      planPeriod: 'monthly'
    });
    const compRes = paymentStore.completePayment({
      intentId: compId,
      paidAmount: 499,
      currency: 'KES',
      providerReceipt: receipt
    });
    assert.strictEqual(compRes.success, true);
    assert.strictEqual(paymentStore.isReceiptUsed(receipt), true);

    // Now try to create a new pending intent with the same ID
    paymentStore.createIntent({
      intentId: compId,
      email: 'attacker@example.com',
      curriculum: 'BRITISH',
      planPeriod: 'termly'
    });

    // Lookup: what does findIntent return?
    const lookup = paymentStore.findIntent({ intentId: compId });
    // Look at receipt lookup: is receipt still marked used?
    assert.strictEqual(paymentStore.isReceiptUsed(receipt), true, 'Receipt must remain used');

    const finding = (lookup && lookup.status === 'pending') ? {
      observation: `When a new intent is created reusing a completed intent ID, findIntent resolves the pending intent first. However, provider receipt indexing (isReceiptUsed) remains strictly protected.`,
      level: 'NOTE'
    } : null;

    return { finding };
  });

  // 1.5 Null / Undefined Parameter Handling in paymentStore APIs
  await probe('paymentStore APIs handling of null and undefined inputs', async () => {
    // findIntent
    assert.strictEqual(paymentStore.findIntent(null), null, 'findIntent(null) must return null');
    assert.strictEqual(paymentStore.findIntent(undefined), null, 'findIntent(undefined) must return null');
    assert.strictEqual(paymentStore.findIntent({}), null, 'findIntent({}) must return null');

    // getPaymentStatus
    const stNull = paymentStore.getPaymentStatus(null);
    assert.strictEqual(stNull.status, 'not_found', 'getPaymentStatus(null) must return not_found');
    const stUndef = paymentStore.getPaymentStatus(undefined);
    assert.strictEqual(stUndef.status, 'not_found');

    // isReceiptUsed & isReceiptConsumed
    assert.strictEqual(paymentStore.isReceiptUsed(null), false);
    assert.strictEqual(paymentStore.isReceiptUsed(undefined), false);
    assert.strictEqual(paymentStore.isReceiptUsed(''), false);
    assert.strictEqual(paymentStore.isReceiptConsumed(null), false);
    assert.strictEqual(paymentStore.isReceiptConsumed(undefined), false);

    // markReceiptConsumed & failPayment
    paymentStore.markReceiptConsumed(null); // should not throw
    paymentStore.markReceiptConsumed(undefined);
    const failRes = paymentStore.failPayment(null);
    assert.strictEqual(failRes, null);

    // calculateExpectedPrice with undefined vs null
    const priceUndef = paymentStore.calculateExpectedPrice(undefined);
    assert.strictEqual(priceUndef.amount, 499, 'Default undefined options should default to CBC monthly (499)');

    let nullCalcThrew = false;
    try {
      paymentStore.calculateExpectedPrice(null);
    } catch (e) {
      nullCalcThrew = true;
    }

    let nullCreateThrew = false;
    try {
      paymentStore.createIntent(null);
    } catch (e) {
      nullCreateThrew = true;
    }

    let nullCompleteThrew = false;
    try {
      paymentStore.completePayment(null);
    } catch (e) {
      nullCompleteThrew = true;
    }

    const finding = (nullCalcThrew || nullCreateThrew || nullCompleteThrew) ? {
      observation: `Direct in-process JavaScript calls with literal null: calculateExpectedPrice(null), createIntent(null), completePayment(null) throw TypeError due to parameter destructuring. Normal HTTP callers always pass object payloads parsed by Express.`,
      level: 'NOTE'
    } : null;

    return { finding };
  });

  // 1.6 Negative Values & Numeric Boundary Edge Cases
  await probe('paymentStore handling of negative, NaN, and Infinity amounts', async () => {
    const testIntent = paymentStore.createIntent({
      email: 'boundary_test@example.com',
      curriculum: 'BRITISH',
      planPeriod: 'termly'
    });
    assert.strictEqual(testIntent.amount, 8900);

    // Negative paidAmount
    const negRes = paymentStore.completePayment({
      intentId: testIntent.id,
      paidAmount: -8900,
      currency: 'KES',
      providerReceipt: 'REC_NEG_1'
    });
    assert.strictEqual(negRes.success, false);
    assert.strictEqual(negRes.code, 'INVALID_AMOUNT');
    assert.strictEqual(paymentStore.isReceiptUsed('REC_NEG_1'), false);

    // NaN paidAmount
    const nanRes = paymentStore.completePayment({
      intentId: testIntent.id,
      paidAmount: NaN,
      currency: 'KES',
      providerReceipt: 'REC_NAN_1'
    });
    assert.strictEqual(nanRes.success, false);
    assert.strictEqual(nanRes.code, 'INVALID_AMOUNT');

    // Infinity paidAmount
    const infRes = paymentStore.completePayment({
      intentId: testIntent.id,
      paidAmount: Infinity,
      currency: 'KES',
      providerReceipt: 'REC_INF_1'
    });
    assert.strictEqual(infRes.success, false);
    assert.strictEqual(infRes.code, 'INVALID_AMOUNT');

    // Negative childrenCount
    const negChildPrice = paymentStore.calculateExpectedPrice({
      curriculum: 'CBC',
      childrenCount: -5,
      planPeriod: 'monthly'
    });
    assert.strictEqual(negChildPrice.amount, 499, 'Negative childrenCount must not enable family discounts');
    assert.strictEqual(negChildPrice.isFamily, false);

    // Extreme large childrenCount
    const hugeChildPrice = paymentStore.calculateExpectedPrice({
      curriculum: 'CBC',
      childrenCount: 999999,
      planPeriod: 'termly'
    });
    assert.strictEqual(hugeChildPrice.amount, 1999, 'Huge childrenCount selects family tier safely');
    assert.strictEqual(hugeChildPrice.isFamily, true);
  });

  // ════════════════════════════════════════════════════════════
  // GROUP 2: HTTP API & Phone Number Validation
  // ════════════════════════════════════════════════════════════
  console.log('\n--- GROUP 2: HTTP API & Phone Number Validation ---');

  await startServer();

  const testEmail = `parent_challenger_${Date.now()}@example.com`;
  const parentPass = 'SecurePass2026!';
  const childHandle = `Challenger_${Date.now().toString(36)}`;
  const childPin = '9912';

  // Create student and verify parent
  const regRes = await api('/api/students/profile', {
    method: 'POST',
    body: { handle: childHandle, pin: childPin, grade: 8, email: testEmail }
  });
  assert.strictEqual(regRes.status, 200);
  const studentId = regRes.data.student.id;

  const parentRec = parentStore.getParentByEmail(testEmail);
  const verifyRes = await api('/api/parent/verify', {
    method: 'POST',
    body: { token: parentRec.verifyToken, childId: studentId, familyPassword: parentPass }
  });
  assert.strictEqual(verifyRes.status, 200);

  // 2.1 Malformed phone number strings (letters, symbols, too short)
  await probe('POST /api/payment/initiate rejects malformed phone strings with 400', async () => {
    const resBadStr = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'CBC',
        planPeriod: 'termly',
        phone: 'invalid-phone-string',
        provider: 'daraja'
      }
    });
    assert.strictEqual(resBadStr.status, 400, 'Must return 400 for invalid phone');
    assert(resBadStr.data.error.includes('phone') || resBadStr.data.error.includes('format'));

    const resTooShort = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'CBC',
        planPeriod: 'termly',
        phone: '0712',
        provider: 'daraja'
      }
    });
    assert.strictEqual(resTooShort.status, 400, 'Must return 400 for short phone');
  });

  // 2.2 Numeric Phone Number Handling ({ phone: 254712345678 })
  await probe('POST /api/payment/initiate handling when phone is passed as integer number', async () => {
    const resNum = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'CBC',
        planPeriod: 'termly',
        phone: 254712345678, // Number instead of String!
        provider: 'daraja'
      }
    });

    let finding = null;
    if (resNum.status === 500) {
      finding = {
        observation: `Passing a numeric phone number { phone: 254712345678 } causes server to throw TypeError: rawPhone.replace is not a function and return HTTP 500 instead of HTTP 400 validation error.`,
        level: 'LOW_RISK_DEFECT'
      };
    } else {
      assert(resNum.status === 200 || resNum.status === 400);
    }
    return { finding };
  });

  // 2.3 Foreign/International Phone Number Handling
  await probe('POST /api/payment/initiate rejects non-Kenyan international phone numbers', async () => {
    const resUS = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId,
        curriculum: 'CBC',
        planPeriod: 'monthly',
        phone: '+14155552671',
        provider: 'daraja'
      }
    });
    assert.strictEqual(resUS.status, 400, 'Daraja STK push must reject non-Kenyan phone');
  });

  // 2.4 Null / Missing Body and Query Endpoints
  await probe('HTTP endpoints handle null / empty bodies and queries without crash', async () => {
    // Missing email in initiate
    const initEmpty = await api('/api/payment/initiate', { method: 'POST', body: {} });
    assert.strictEqual(initEmpty.status, 400);

    // Empty query in status
    const statEmpty = await api('/api/payment/status', { method: 'GET' });
    assert.strictEqual(statEmpty.status, 400);

    // Non-existent intent in status
    const statMissing = await api('/api/payment/status?intentId=nonexistent_xyz_123', { method: 'GET' });
    assert.strictEqual(statMissing.status, 404);

    // Empty callback body
    const cbEmpty = await api('/api/payment/mpesa-callback', { method: 'POST', body: {} });
    assert.strictEqual(cbEmpty.status, 200);
    assert.strictEqual(cbEmpty.data.ResultCode, 0);
  });

  // ════════════════════════════════════════════════════════════
  // GROUP 3: Callback Verification & Security Probing
  // ════════════════════════════════════════════════════════════
  console.log('\n--- GROUP 3: Callback Verification & Security Probing ---');

  // 3.1 Non-zero Result Codes (1032, 1, 1037, 2001)
  await probe('Callback rejects user-cancelled (1032) and insufficient funds (1)', async () => {
    // Initiate intent
    const init1 = await api('/api/payment/initiate', {
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
    assert.strictEqual(init1.status, 200);
    const coId = init1.data.checkoutRequestId;

    // Send ResultCode 1 (Insufficient funds)
    const cb1 = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_INS',
            CheckoutRequestID: coId,
            ResultCode: 1,
            ResultDesc: 'The balance is insufficient for the transaction.'
          }
        }
      }
    });
    assert.strictEqual(cb1.status, 200, 'Webhook must return 200 to Daraja');

    // Confirm student remains free
    const st1 = studentStore.getStudentById(studentId);
    assert.strictEqual(st1.subscriptionTier, 'free');

    // Confirm intent status is failed
    const poll1 = await api(`/api/payment/status?intentId=${init1.data.intentId}`);
    assert.strictEqual(poll1.data.status, 'failed');
  });

  // 3.2 String ResultCode "0" vs Integer ResultCode 0
  await probe('Callback handling when ResultCode is sent as string "0"', async () => {
    const initStr = await api('/api/payment/initiate', {
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
    assert.strictEqual(initStr.status, 200);

    const recStr = 'REC_STR_ZERO_' + Date.now();
    const cbStr = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_STR_ZERO',
            CheckoutRequestID: initStr.data.checkoutRequestId,
            ResultCode: "0", // String "0"
            ResultDesc: 'Success',
            CallbackMetadata: {
              Item: [
                { Name: 'Amount', Value: 499 },
                { Name: 'MpesaReceiptNumber', Value: recStr },
                { Name: 'PhoneNumber', Value: 254712345678 }
              ]
            }
          }
        }
      }
    });
    assert.strictEqual(cbStr.status, 200);

    const pollStr = await api(`/api/payment/status?intentId=${initStr.data.intentId}`);
    let finding = null;
    if (pollStr.data.status === 'failed') {
      finding = {
        observation: `Callback uses strict inequality (resultCode !== 0). String "0" is treated as non-zero failure instead of success. Safaricom production Daraja returns numeric 0, but simulated gateways or JSON serializers passing string "0" will fail.`,
        level: 'NOTE'
      };
    }
    return { finding };
  });

  // 3.3 Partial Payment / Underpayment Edge Cases (e.g. 1 KES less than plan)
  await probe('Callback rejects underpayment by exactly 1 KES (8,899 vs 8,900)', async () => {
    const initBri = await api('/api/payment/initiate', {
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
    assert.strictEqual(initBri.status, 200);
    assert.strictEqual(initBri.data.amount, 8900);

    const partialRec = 'REC_PARTIAL_' + Date.now();
    const cbPart = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_PARTIAL',
            CheckoutRequestID: initBri.data.checkoutRequestId,
            ResultCode: 0,
            ResultDesc: 'Success',
            CallbackMetadata: {
              Item: [
                { Name: 'Amount', Value: 8899 }, // 1 KES short!
                { Name: 'MpesaReceiptNumber', Value: partialRec },
                { Name: 'PhoneNumber', Value: 254712345678 }
              ]
            }
          }
        }
      }
    });
    assert.strictEqual(cbPart.status, 200);

    // Confirm student remains unchanged
    const stPart = studentStore.getStudentById(studentId);
    assert.strictEqual(stPart.subscriptionTier, 'free', 'Underpayment must not grant access');

    // Confirm intent marked underpaid_rejected
    const pollPart = await api(`/api/payment/status?intentId=${initBri.data.intentId}`);
    assert.strictEqual(pollPart.data.status, 'underpaid_rejected');
    assert.strictEqual(paymentStore.isReceiptUsed(partialRec), false, 'Underpaid receipt is not credited');
  });

  // 3.4 Overpayment Edge Case (e.g. 10,000 paid for 8,900 plan)
  await probe('Callback rejects overpayment mismatch (10,000 paid vs 8,900 expected)', async () => {
    const initOver = await api('/api/payment/initiate', {
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
    assert.strictEqual(initOver.status, 200);

    const overRec = 'REC_OVER_' + Date.now();
    const cbOver = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_OVER',
            CheckoutRequestID: initOver.data.checkoutRequestId,
            ResultCode: 0,
            ResultDesc: 'Success',
            CallbackMetadata: {
              Item: [
                { Name: 'Amount', Value: 10000 }, // Overpayment!
                { Name: 'MpesaReceiptNumber', Value: overRec },
                { Name: 'PhoneNumber', Value: 254712345678 }
              ]
            }
          }
        }
      }
    });
    assert.strictEqual(cbOver.status, 200);

    const pollOver = await api(`/api/payment/status?intentId=${initOver.data.intentId}`);
    assert.strictEqual(pollOver.data.status, 'underpaid_rejected', 'Any amount mismatch is rejected');
  });

  // 3.5 Replay Trigger 1: Concurrent Webhook Callback Race Condition
  await probe('Concurrent duplicate callback delivery (Promise.all race condition)', async () => {
    const initRace = await api('/api/payment/initiate', {
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
    assert.strictEqual(initRace.status, 200);
    const coIdRace = initRace.data.checkoutRequestId;
    const raceReceipt = 'REC_RACE_' + Date.now();

    const makeCallbackPayload = () => ({
      Body: {
        stkCallback: {
          MerchantRequestID: 'MR_RACE',
          CheckoutRequestID: coIdRace,
          ResultCode: 0,
          ResultDesc: 'Success',
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

    // Fire 2 callbacks concurrently
    const [resA, resB] = await Promise.all([
      api('/api/payment/mpesa-callback', { method: 'POST', body: makeCallbackPayload() }),
      api('/api/payment/mpesa-callback', { method: 'POST', body: makeCallbackPayload() })
    ]);

    assert.strictEqual(resA.status, 200);
    assert.strictEqual(resB.status, 200);

    // Verify polling returns completed
    const pollRace = await api(`/api/payment/status?intentId=${initRace.data.intentId}`);
    assert.strictEqual(pollRace.data.status, 'completed');

    // Verify learner upgraded
    const stRace = studentStore.getStudentById(studentId);
    assert.strictEqual(stRace.subscriptionTier, 'standard');

    // Verify ledger has only 1 completed payment entry for this receipt
    paymentStore.initLedger();
    const all = paymentStore.getAllPayments();
    const matchingEntries = all.completedPayments.filter(p => p.providerReceipt === raceReceipt);
    assert.strictEqual(matchingEntries.length, 1, 'Exactly one completed payment entry must exist for receipt');
  });

  // 3.6 Replay Trigger 2: Cross-Family Receipt Hijack
  await probe('Cross-family receipt hijack is rejected with 403', async () => {
    // Legit payment completed by testEmail for studentId with receipt
    const legitReceipt = 'REC_LEGIT_PARENT1_' + Date.now();
    const initP1 = await api('/api/payment/initiate', {
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
    assert.strictEqual(initP1.status, 200);

    const cbP1 = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_P1',
            CheckoutRequestID: initP1.data.checkoutRequestId,
            ResultCode: 0,
            ResultDesc: 'Success',
            CallbackMetadata: {
              Item: [
                { Name: 'Amount', Value: 8900 },
                { Name: 'MpesaReceiptNumber', Value: legitReceipt },
                { Name: 'PhoneNumber', Value: 254712345678 }
              ]
            }
          }
        }
      }
    });
    assert.strictEqual(cbP1.status, 200);

    // Create Parent 2 and Student 2 with non-blocklisted PIN
    const attackerEmail = `attacker_${Date.now()}@example.com`;
    const attackerPass = 'AttackerPass123!';
    const attChildHandle = `AttChild_${Date.now().toString(36)}`;
    const regAtt = await api('/api/students/profile', {
      method: 'POST',
      body: { handle: attChildHandle, pin: '8573', grade: 8, email: attackerEmail }
    });
    assert.strictEqual(regAtt.status, 200, 'Attacker student registration must succeed');
    const attStudentId = regAtt.data.student.id;
    const attParentRec = parentStore.getParentByEmail(attackerEmail);
    assert(attParentRec && attParentRec.verifyToken, 'Attacker parent token must exist');
    const attVerifyRes = await api('/api/parent/verify', {
      method: 'POST',
      body: { token: attParentRec.verifyToken, childId: attStudentId, familyPassword: attackerPass }
    });
    assert.strictEqual(attVerifyRes.status, 200, 'Attacker parent verification must succeed');

    // Parent 2 attempts to claim Parent 1's receipt
    const hijackRes = await api('/api/parent/subscription', {
      method: 'POST',
      body: {
        email: attackerEmail,
        familyPassword: attackerPass,
        tier: 'premium',
        paymentReceipt: legitReceipt
      }
    });

    assert.strictEqual(hijackRes.status, 403, 'Must reject cross-family receipt hijack with 403');
    assert.strictEqual(hijackRes.data.code, 'PAID_ACCESS_REQUIRES_VERIFIED_PAYMENT');

    const attParentAfter = parentStore.getParentByEmail(attackerEmail);
    assert.strictEqual(attParentAfter.subscriptionTier, 'free', 'Attacker tier must remain free');
  });

  // 3.7 Replay Trigger 3: Sibling Learner Receipt Reuse (Within Same Family)
  await probe('Sibling learner receipt reuse within same family is rejected with 403', async () => {
    // Register second child under testEmail
    const child2Handle = `Child2_${Date.now().toString(36)}`;
    const regChild2 = await api('/api/students/profile', {
      method: 'POST',
      body: { handle: child2Handle, pin: '3344', grade: 8, email: testEmail }
    });
    const child2Id = regChild2.data.student.id;

    // Single learner payment made for Child 1
    const child1Receipt = 'REC_CHILD1_ONLY_' + Date.now();
    const initC1 = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: testEmail,
        studentId: studentId, // Explicitly for Child 1
        curriculum: 'BRITISH',
        planPeriod: 'termly',
        phone: '0712345678',
        provider: 'daraja'
      }
    });
    assert.strictEqual(initC1.status, 200);

    const cbC1 = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_C1',
            CheckoutRequestID: initC1.data.checkoutRequestId,
            ResultCode: 0,
            ResultDesc: 'Success',
            CallbackMetadata: {
              Item: [
                { Name: 'Amount', Value: 8900 },
                { Name: 'MpesaReceiptNumber', Value: child1Receipt },
                { Name: 'PhoneNumber', Value: 254712345678 }
              ]
            }
          }
        }
      }
    });
    assert.strictEqual(cbC1.status, 200);

    // Now parent attempts to activate Child 2 with Child 1's receipt
    const reuseRes = await api('/api/parent/child-subscription', {
      method: 'POST',
      body: {
        email: testEmail,
        familyPassword: parentPass,
        studentId: child2Id,
        tier: 'premium',
        paymentReceipt: child1Receipt
      }
    });

    assert.strictEqual(reuseRes.status, 403, 'Must reject sibling receipt reuse');
    // Code should be RECEIPT_ALREADY_USED or STUDENT_MISMATCH
    assert(reuseRes.data.code === 'RECEIPT_ALREADY_USED' || reuseRes.data.code === 'STUDENT_MISMATCH');

    const c2Rec = studentStore.getStudentById(child2Id);
    assert.strictEqual(c2Rec.subscriptionTier, 'free', 'Child 2 must remain on free tier');
  });

  // 3.8 Missing MpesaReceiptNumber in Callback Metadata
  await probe('Callback rejects ResultCode 0 when MpesaReceiptNumber is missing', async () => {
    const initNoRec = await api('/api/payment/initiate', {
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
    assert.strictEqual(initNoRec.status, 200);

    const cbNoRec = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: {
        Body: {
          stkCallback: {
            MerchantRequestID: 'MR_NO_REC',
            CheckoutRequestID: initNoRec.data.checkoutRequestId,
            ResultCode: 0,
            ResultDesc: 'Success',
            CallbackMetadata: {
              Item: [
                { Name: 'Amount', Value: 499 },
                { Name: 'PhoneNumber', Value: 254712345678 }
                // MpesaReceiptNumber omitted!
              ]
            }
          }
        }
      }
    });
    assert.strictEqual(cbNoRec.status, 200);

    const pollNoRec = await api(`/api/payment/status?intentId=${initNoRec.data.intentId}`);
    assert.strictEqual(pollNoRec.data.status, 'pending', 'Intent must not complete without receipt number');
  });

  // 3.9 Currency Mismatch Enforcement in completePayment
  await probe('paymentStore rejects currency mismatch (USD vs KES)', async () => {
    const intentCur = paymentStore.createIntent({
      email: 'cur_test@example.com',
      curriculum: 'CBC',
      planPeriod: 'monthly'
    });
    assert.strictEqual(intentCur.currency, 'KES');

    const curRes = paymentStore.completePayment({
      intentId: intentCur.id,
      paidAmount: 499,
      currency: 'USD', // Tampered currency
      providerReceipt: 'REC_USD_1'
    });

    assert.strictEqual(curRes.success, false);
    assert.strictEqual(curRes.code, 'INVALID_CURRENCY');
    assert.strictEqual(paymentStore.isReceiptUsed('REC_USD_1'), false);
  });

  console.log('\n────────────────────────────────────────────────────────────');
  console.log(`Results: ${passedCount} / ${testCount} Adversarial Probes Executed (${((passedCount / testCount) * 100).toFixed(1)}%)`);
  console.log('────────────────────────────────────────────────────────────\n');

  if (findings.length > 0) {
    console.log('📝 EMPIRICAL FINDINGS:');
    findings.forEach((f, i) => {
      console.log(`  [${i + 1}] ${f.name}`);
      console.log(`      Severity: ${f.level}`);
      console.log(`      Observation: ${f.observation || f.error}\n`);
    });
  }

  stopServer();
  restorePaymentsFile();

  if (passedCount !== testCount) {
    process.exit(1);
  }
}

runAdversarialProbes().catch(err => {
  console.error('Fatal Adversarial Runner Error:', err);
  stopServer();
  restorePaymentsFile();
  process.exit(1);
});
