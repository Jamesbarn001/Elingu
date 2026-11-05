// ════════════════════════════════════════════════════════════
// tests/stress_m1_challenger.js
// EMPIRICAL CHALLENGER STRESS & ADVERSARIAL VERIFICATION SUITE
// Milestone 1: Payment Security, Idempotent Ledger & Gatekeeping
// ════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const PORT = 3001; // Isolated port to avoid collision with port 3000
const BASE_URL = `http://localhost:${PORT}`;
let serverProc = null;

async function startServer() {
  try {
    const r = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(1000) });
    if (r.ok) return;
  } catch (e) {}

  console.log(`📡 Spawning Elingu test server on port ${PORT}...`);
  serverProc = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT), NODE_ENV: 'test' },
    stdio: 'ignore'
  });

  const start = Date.now();
  while (Date.now() - start < 25000) {
    try {
      const r = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(1000) });
      if (r.ok) {
        console.log(`✅ Server healthy on port ${PORT}\n`);
        return;
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 300));
  }
  throw new Error('Server failed to start in 25s');
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
let failedCount = 0;
const failures = [];

async function challengeTest(name, fn) {
  testCount++;
  const label = `[T${testCount}] ${name}`;
  process.stdout.write(`  ${label} ... `);
  try {
    await fn();
    passedCount++;
    console.log('✅ PASS');
  } catch (err) {
    failedCount++;
    console.log(`❌ FAIL`);
    console.error(`      Detail: ${err.message}`);
    failures.push({ name: label, error: err.message, stack: err.stack });
  }
}

function generateCallbackPayload(checkoutRequestId, receiptNumber, amount, phone = '254712345678', resultCode = 0) {
  return {
    Body: {
      stkCallback: {
        MerchantRequestID: 'MR_' + Date.now(),
        CheckoutRequestID: checkoutRequestId,
        ResultCode: resultCode,
        ResultDesc: resultCode === 0 ? 'The service request is processed successfully.' : 'Payment failed or cancelled',
        CallbackMetadata: resultCode === 0 ? {
          Item: [
            { Name: 'Amount', Value: amount },
            { Name: 'MpesaReceiptNumber', Value: receiptNumber },
            { Name: 'Balance' },
            { Name: 'TransactionDate', Value: 20261028120000 },
            { Name: 'PhoneNumber', Value: phone }
          ]
        } : undefined
      }
    }
  };
}

async function main() {
  console.log('════════════════════════════════════════════════════════════');
  console.log('⚔️  EMPIRICAL CHALLENGER: ADVERSARIAL STRESS TEST SUITE');
  console.log('   Milestone 1: Payment Security, Idempotent Ledger & Gatekeeping');
  console.log('════════════════════════════════════════════════════════════\n');

  await startServer();

  const parentStore = require('../parentStore');
  const studentStore = require('../studentStore');
  const paymentStore = require('../paymentStore');

  async function setupFamily(parentEmail, password, children = []) {
    const childRecords = [];
    for (const c of children) {
      const regRes = await api('/api/students/profile', {
        method: 'POST',
        body: {
          handle: c.handle,
          pin: c.pin || '8888',
          grade: c.grade || 8,
          email: parentEmail,
          curriculum: c.curriculum || 'CBC'
        }
      });
      assert.strictEqual(regRes.status, 200, `Child registration ${c.handle} failed`);
      childRecords.push(regRes.data.student);
    }

    const parentRec = parentStore.getParentByEmail(parentEmail);
    if (parentRec && parentRec.verifyToken) {
      const vRes = await api('/api/parent/verify', {
        method: 'POST',
        body: {
          token: parentRec.verifyToken,
          childId: childRecords[0].id,
          familyPassword: password
        }
      });
      assert.strictEqual(vRes.status, 200, 'Parent verify failed');
    }
    return { parentEmail, childRecords };
  }

  // Shared test accounts
  const victimEmail = `victim_parent_${Date.now()}@example.com`;
  const attackerEmail = `attacker_parent_${Date.now()}@example.com`;
  const commonPassword = 'StrongTestPassword2026!';

  const victimFamily = await setupFamily(victimEmail, commonPassword, [
    { handle: `VicKid1_${Date.now().toString(36)}`, pin: '7788', grade: 7, curriculum: 'CBC' },
    { handle: `VicKid2_${Date.now().toString(36)}`, pin: '7789', grade: 8, curriculum: 'CBC' },
    { handle: `VicKid3_${Date.now().toString(36)}`, pin: '7790', grade: 9, curriculum: 'CBC' }
  ]);
  const victimChild1 = victimFamily.childRecords[0];
  const victimChild2 = victimFamily.childRecords[1];
  const victimChild3 = victimFamily.childRecords[2];

  const attackerFamily = await setupFamily(attackerEmail, commonPassword, [
    { handle: `AtkKid_${Date.now().toString(36)}`, pin: '9900', grade: 10, curriculum: 'BRITISH' }
  ]);
  const attackerChild = attackerFamily.childRecords[0];

  console.log('─── CATEGORY A: CONCURRENT REPLAY ATTACKS & RACE CONDITIONS ───');

  await challengeTest('20 Concurrent M-Pesa callbacks for identical CheckoutRequestID & receipt: exactly 1 completes, 19 replayed', async () => {
    // 1. Initiate intent
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        studentId: victimChild1.id,
        curriculum: 'CBC',
        planPeriod: 'termly',
        provider: 'daraja'
      }
    });
    assert.strictEqual(initRes.status, 200);
    const checkoutRequestId = 'CRQ_CONC_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
    paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId });

    const sharedReceipt = 'REC_CONC_' + Date.now().toString(36).toUpperCase();
    const payload = generateCallbackPayload(checkoutRequestId, sharedReceipt, 1199);

    // Fire 20 parallel requests at the exact same instant
    const promises = Array.from({ length: 20 }).map(() =>
      api('/api/payment/mpesa-callback', { method: 'POST', body: payload })
    );

    const results = await Promise.all(promises);

    // All should return HTTP 200 (Safaricom requirement)
    for (const res of results) {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.ResultCode, 0);
    }

    // Inspect ledger state
    const intent = paymentStore.findIntent({ checkoutRequestId });
    assert.strictEqual(intent.status, 'completed');
    assert.strictEqual(intent.providerReceipt, sharedReceipt);
    assert.strictEqual(intent.replayedCount, 19, `Expected replayedCount to be 19, got ${intent.replayedCount}`);

    // Verify child 1 is upgraded to standard/termly
    const updatedChild = studentStore.getStudentById(victimChild1.id);
    const resolved = studentStore.resolveStudentTier(updatedChild);
    assert.strictEqual(resolved.subscriptionTier, 'standard');
  });

  await challengeTest('20 Concurrent M-Pesa callbacks across 20 DIFFERENT intents presenting SAME receipt: exactly 1 completes', async () => {
    const sharedReceipt = 'REC_MULTIPLE_INTENTS_' + Date.now().toString(36).toUpperCase();
    const intentIds = [];
    const checkoutIds = [];

    // Create 20 unique intents
    for (let i = 0; i < 20; i++) {
      const initRes = await api('/api/payment/initiate', {
        method: 'POST',
        body: {
          email: victimEmail,
          studentId: victimChild1.id,
          curriculum: 'CBC',
          planPeriod: 'monthly',
          provider: 'daraja'
        }
      });
      assert.strictEqual(initRes.status, 200);
      const crq = `CRQ_MULTI_${i}_${Date.now()}`;
      paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId: crq });
      intentIds.push(initRes.data.intentId);
      checkoutIds.push(crq);
    }

    // Fire 20 parallel callbacks, each for a different checkoutRequestId, but all claiming the same receipt
    const promises = checkoutIds.map(crq =>
      api('/api/payment/mpesa-callback', {
        method: 'POST',
        body: generateCallbackPayload(crq, sharedReceipt, 499)
      })
    );

    const responses = await Promise.all(promises);
    for (const r of responses) {
      assert.strictEqual(r.status, 200);
    }

    // Verify exactly ONE intent in completedPayments has this receipt
    const all = paymentStore.getAllPayments();
    const completedWithReceipt = all.completedPayments.filter(p => p.providerReceipt === sharedReceipt);
    assert.strictEqual(completedWithReceipt.length, 1, `Expected exactly 1 completed intent with receipt ${sharedReceipt}, found ${completedWithReceipt.length}`);

    // Verify all other 19 intents remain pending (or not completed)
    const pendingWithCrq = all.intents.filter(i => checkoutIds.includes(i.checkoutRequestId));
    assert.strictEqual(pendingWithCrq.length, 19, `Expected 19 intents to remain pending, found ${pendingWithCrq.length}`);
  });

  await challengeTest('10 Concurrent POST /api/parent/child-subscription with same receipt across multiple children: exactly 1 succeeds', async () => {
    // 1. Create and complete an unassigned payment intent (studentId = null)
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        curriculum: 'CBC',
        planPeriod: 'termly',
        provider: 'daraja'
      }
    });
    const crq = 'CRQ_CHILD_RACE_' + Date.now();
    paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId: crq });
    const raceReceipt = 'REC_CHILD_RACE_' + Date.now().toString(36).toUpperCase();

    // Complete the payment via callback
    await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: generateCallbackPayload(crq, raceReceipt, 1199)
    });

    assert.strictEqual(paymentStore.isReceiptUsed(raceReceipt), true);
    assert.strictEqual(paymentStore.isReceiptConsumed(raceReceipt), false);

    // 2. Fire 10 concurrent requests to activate Child 2 vs Child 3 using this single receipt
    const targets = [
      victimChild2.id,
      victimChild3.id,
      victimChild2.id,
      victimChild3.id,
      victimChild2.id,
      victimChild3.id,
      victimChild2.id,
      victimChild3.id,
      victimChild2.id,
      victimChild3.id
    ];

    const activationPromises = targets.map(stuId =>
      api('/api/parent/child-subscription', {
        method: 'POST',
        body: {
          email: victimEmail,
          familyPassword: commonPassword,
          studentId: stuId,
          tier: 'standard',
          billingCycle: 'termly',
          paymentReceipt: raceReceipt
        }
      })
    );

    const activationResults = await Promise.all(activationPromises);

    const successResponses = activationResults.filter(r => r.status === 200 && r.data?.success === true);
    const rejectedResponses = activationResults.filter(r => r.status === 403 && r.data?.code === 'RECEIPT_ALREADY_USED');

    assert.strictEqual(successResponses.length, 1, `Expected exactly 1 activation to succeed, got ${successResponses.length}`);
    assert.strictEqual(rejectedResponses.length, 9, `Expected exactly 9 activations to be rejected with 403 RECEIPT_ALREADY_USED, got ${rejectedResponses.length}`);
    assert.strictEqual(paymentStore.isReceiptConsumed(raceReceipt), true);
  });

  console.log('\n─── CATEGORY B: PRICE & CURRENCY TAMPERING ───');

  await challengeTest('POST /api/payment/initiate ignores client-supplied price tampering (KES 1, 0, negative, strings)', async () => {
    const tamperedPayloads = [
      { amount: 1 },
      { amount: 0.01 },
      { amount: 0 },
      { amount: -5000 },
      { price: 1 },
      { amount: '1.00' },
      { amount: 999999 }
    ];

    for (const tampered of tamperedPayloads) {
      const res = await api('/api/payment/initiate', {
        method: 'POST',
        body: {
          email: victimEmail,
          curriculum: 'BRITISH',
          planPeriod: 'annual',
          ...tampered
        }
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.amount, 24500, `Client tampered ${JSON.stringify(tampered)} did not resolve to canonical KES 24,500`);
      assert.strictEqual(res.data.currency, 'KES');
    }
  });

  await challengeTest('POST /api/payment/initiate ignores client-supplied currency tampering (USD, EUR, kes, null)', async () => {
    const currencies = ['USD', 'EUR', 'GBP', 'kes', null, ''];
    for (const cur of currencies) {
      const res = await api('/api/payment/initiate', {
        method: 'POST',
        body: {
          email: victimEmail,
          curriculum: 'CBC',
          planPeriod: 'termly',
          currency: cur
        }
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.data.currency, 'KES', `Currency ${cur} was not sanitized to KES`);
    }
  });

  await challengeTest('POST /api/payment/initiate handles invalid/spoofed plan periods without granting free access', async () => {
    const spoofedPeriods = ['free', 'lifetime', 'zero', 'admin', '../../../etc/passwd', '__proto__'];
    for (const p of spoofedPeriods) {
      const res = await api('/api/payment/initiate', {
        method: 'POST',
        body: {
          email: victimEmail,
          curriculum: 'CBC',
          planPeriod: p
        }
      });
      assert.strictEqual(res.status, 200);
      // Fallback for CBC unrecognized period is monthly (KES 499)
      assert.strictEqual(res.data.amount, 499, `Spoofed period ${p} did not default to canonical monthly price`);
    }
  });

  await challengeTest('POST /api/payment/mpesa-callback underpayment tampering is rejected (paid 100 vs 8900 expected)', async () => {
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        curriculum: 'BRITISH',
        planPeriod: 'termly'
      }
    });
    const crq = 'CRQ_UNDERPAY_' + Date.now();
    paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId: crq });

    const underpayReceipt = 'REC_UNDERPAY_' + Date.now().toString(36).toUpperCase();
    const res = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: generateCallbackPayload(crq, underpayReceipt, 100) // 100 instead of 8900
    });
    assert.strictEqual(res.status, 200);

    const intent = paymentStore.findIntent({ checkoutRequestId: crq });
    assert.strictEqual(intent.status, 'underpaid_rejected');
    assert.strictEqual(intent.paidAmount, 100);
    assert.strictEqual(paymentStore.isReceiptUsed(underpayReceipt), false);
  });

  await challengeTest('POST /api/payment/mpesa-callback overpayment mismatch is rejected without unverified credit', async () => {
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        curriculum: 'CBC',
        planPeriod: 'monthly'
      }
    });
    const crq = 'CRQ_OVERPAY_' + Date.now();
    paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId: crq });

    const overpayReceipt = 'REC_OVERPAY_' + Date.now().toString(36).toUpperCase();
    const res = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: generateCallbackPayload(crq, overpayReceipt, 500) // 500 instead of 499
    });
    assert.strictEqual(res.status, 200);

    const intent = paymentStore.findIntent({ checkoutRequestId: crq });
    assert.strictEqual(intent.status, 'underpaid_rejected'); // amount mismatch
    assert.strictEqual(paymentStore.isReceiptUsed(overpayReceipt), false);
  });

  await challengeTest('completePayment rejects non-KES currency', async () => {
    const intent = paymentStore.createIntent({
      email: victimEmail,
      curriculum: 'CBC',
      planPeriod: 'monthly'
    });
    const res = paymentStore.completePayment({
      intentId: intent.id,
      providerReceipt: 'REC_BAD_CUR_' + Date.now(),
      paidAmount: 499,
      currency: 'USD'
    });
    assert.strictEqual(res.success, false);
    assert.strictEqual(res.code, 'INVALID_CURRENCY');
  });

  console.log('\n─── CATEGORY C: PRIVILEGE ESCALATION, HEADERS & GATEKEEPING BYPASS ───');

  await challengeTest('POST /api/payment/confirm rejects direct self-activation with tier (403 FORBIDDEN_SELF_ACTIVATION)', async () => {
    const res = await api('/api/payment/confirm', {
      method: 'POST',
      body: {
        email: victimEmail,
        tier: 'premium',
        billingCycle: 'annual'
      }
    });
    assert.strictEqual(res.status, 403);
    assert.strictEqual(res.data.code, 'FORBIDDEN_SELF_ACTIVATION');
  });

  await challengeTest('POST /api/payment/confirm rejects query params & spoofed admin headers', async () => {
    const bypassHeaders = [
      { 'X-Admin': 'true' },
      { 'X-Role': 'superadmin' },
      { 'X-Forwarded-For': '127.0.0.1' },
      { 'X-Elingu-Test': 'true' }
    ];

    for (const h of bypassHeaders) {
      const res = await api('/api/payment/confirm?bypass=true&admin=true&tier=premium', {
        method: 'POST',
        headers: h,
        body: { tier: 'premium' }
      });
      assert.strictEqual(res.status, 403);
      assert.strictEqual(res.data.code, 'FORBIDDEN_SELF_ACTIVATION');
    }
  });

  await challengeTest('POST /api/parent/subscription rejects unpaid upgrade with 403 PAID_ACCESS_REQUIRES_VERIFIED_PAYMENT', async () => {
    const res = await api('/api/parent/subscription', {
      method: 'POST',
      body: {
        email: attackerEmail,
        familyPassword: commonPassword,
        tier: 'premium',
        billingCycle: 'termly'
      }
    });
    assert.strictEqual(res.status, 403);
    assert.strictEqual(res.data.code, 'PAID_ACCESS_REQUIRES_VERIFIED_PAYMENT');

    const attacker = parentStore.getParentByEmail(attackerEmail);
    assert.notStrictEqual(attacker.subscriptionTier, 'premium');
  });

  await challengeTest('POST /api/parent/subscription rejects spoofed { verifiedPayment: true } without real receipt', async () => {
    const res = await api('/api/parent/subscription', {
      method: 'POST',
      body: {
        email: attackerEmail,
        familyPassword: commonPassword,
        tier: 'premium',
        billingCycle: 'termly',
        verifiedPayment: true
      }
    });
    assert.strictEqual(res.status, 403);
    assert.strictEqual(res.data.code, 'PAID_ACCESS_REQUIRES_VERIFIED_PAYMENT');
  });

  await challengeTest('POST /api/parent/subscription rejects non-existent receipt or intentId', async () => {
    const res1 = await api('/api/parent/subscription', {
      method: 'POST',
      body: {
        email: attackerEmail,
        familyPassword: commonPassword,
        tier: 'premium',
        paymentReceipt: 'FAKE_NON_EXISTENT_RECEIPT_9999'
      }
    });
    assert.strictEqual(res1.status, 403);
    assert.strictEqual(res1.data.code, 'PAID_ACCESS_REQUIRES_VERIFIED_PAYMENT');

    const res2 = await api('/api/parent/subscription', {
      method: 'POST',
      body: {
        email: attackerEmail,
        familyPassword: commonPassword,
        tier: 'premium',
        intentId: 'pi_fake_intent_9999'
      }
    });
    assert.strictEqual(res2.status, 403);
    assert.strictEqual(res2.data.code, 'PAID_ACCESS_REQUIRES_VERIFIED_PAYMENT');
  });

  await challengeTest('Attacker cannot hijack Victim\'s completed receipt (cross-tenant receipt theft rejected)', async () => {
    // 1. Victim completes a valid payment
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        curriculum: 'CBC',
        planPeriod: 'termly'
      }
    });
    const crq = 'CRQ_HIJACK_' + Date.now();
    paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId: crq });
    const victimReceipt = 'REC_VICTIM_LEGIT_' + Date.now().toString(36).toUpperCase();

    await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: generateCallbackPayload(crq, victimReceipt, 1199)
    });

    // 2. Attacker attempts to use victimReceipt to upgrade attacker's own account
    const hijackRes = await api('/api/parent/subscription', {
      method: 'POST',
      body: {
        email: attackerEmail,
        familyPassword: commonPassword,
        tier: 'premium',
        paymentReceipt: victimReceipt
      }
    });
    assert.strictEqual(hijackRes.status, 403);
    assert.strictEqual(hijackRes.data.code, 'PAID_ACCESS_REQUIRES_VERIFIED_PAYMENT');

    const attacker = parentStore.getParentByEmail(attackerEmail);
    assert.notStrictEqual(attacker.subscriptionTier, 'premium');
  });

  await challengeTest('POST /api/parent/child-subscription rejects STUDENT_MISMATCH when receipt was issued for a different learner', async () => {
    // 1. Victim pays specifically for Child 1
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        studentId: victimChild1.id,
        curriculum: 'CBC',
        planPeriod: 'monthly'
      }
    });
    const crq = 'CRQ_MISMATCH_' + Date.now();
    paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId: crq });
    const singleChildReceipt = 'REC_CHILD1_ONLY_' + Date.now().toString(36).toUpperCase();

    await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: generateCallbackPayload(crq, singleChildReceipt, 499)
    });

    // 2. Victim tries to use this receipt to activate Child 2
    const mismatchRes = await api('/api/parent/child-subscription', {
      method: 'POST',
      body: {
        email: victimEmail,
        familyPassword: commonPassword,
        studentId: victimChild2.id,
        tier: 'standard',
        paymentReceipt: singleChildReceipt
      }
    });
    assert.strictEqual(mismatchRes.status, 403);
    assert.strictEqual(mismatchRes.data.code, 'STUDENT_MISMATCH');
  });

  await challengeTest('PUT /api/students/profile ignores subscriptionTier / tier injection', async () => {
    const res = await api('/api/students/profile', {
      method: 'PUT',
      body: {
        studentId: victimChild3.id,
        subscriptionTier: 'premium',
        tier: 'premium',
        quests: ['Mathematics']
      }
    });
    assert.strictEqual(res.status, 200);

    const freshChild = studentStore.getStudentById(victimChild3.id);
    const resolved = studentStore.resolveStudentTier(freshChild);
    assert.strictEqual(resolved.subscriptionTier, 'free', 'Direct profile update injected premium tier!');
  });

  await challengeTest('Downgrading to free tier succeeds without payment receipt', async () => {
    const res = await api('/api/parent/subscription', {
      method: 'POST',
      body: {
        email: victimEmail,
        familyPassword: commonPassword,
        tier: 'free'
      }
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.tier, 'free');
  });

  console.log('\n─── CATEGORY D: M-PESA RESULTCODE & MALFORMED CALLBACK PROBING ───');

  await challengeTest('Non-zero ResultCodes (1032 cancelled, 1 insufficient funds, 2001 wrong PIN) do not grant access', async () => {
    const errorCodes = [
      { code: 1032, desc: 'Request cancelled by user' },
      { code: 1, desc: 'The balance is insufficient' },
      { code: 2001, desc: 'The initiator information is invalid' }
    ];

    for (const ec of errorCodes) {
      const initRes = await api('/api/payment/initiate', {
        method: 'POST',
        body: {
          email: victimEmail,
          studentId: victimChild1.id,
          curriculum: 'CBC',
          planPeriod: 'monthly'
        }
      });
      const crq = 'CRQ_FAIL_' + ec.code + '_' + Date.now();
      paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId: crq });

      const res = await api('/api/payment/mpesa-callback', {
        method: 'POST',
        body: generateCallbackPayload(crq, 'REC_FAIL_' + ec.code, 499, '254712345678', ec.code)
      });
      assert.strictEqual(res.status, 200);

      const intent = paymentStore.findIntent({ checkoutRequestId: crq });
      assert.strictEqual(intent.status, 'failed');
    }
  });

  await challengeTest('Callback with string zero ResultCode: "0" does not grant access (strict integer check)', async () => {
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        curriculum: 'CBC',
        planPeriod: 'monthly'
      }
    });
    const crq = 'CRQ_STR_ZERO_' + Date.now();
    paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId: crq });

    const strPayload = generateCallbackPayload(crq, 'REC_STR_ZERO', 499);
    strPayload.Body.stkCallback.ResultCode = "0"; // string instead of number 0

    const res = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: strPayload
    });
    assert.strictEqual(res.status, 200);

    const intent = paymentStore.findIntent({ checkoutRequestId: crq });
    assert.notStrictEqual(intent.status, 'completed');
  });

  await challengeTest('Callback with missing MpesaReceiptNumber does not grant access', async () => {
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        curriculum: 'CBC',
        planPeriod: 'monthly'
      }
    });
    const crq = 'CRQ_NO_REC_' + Date.now();
    paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId: crq });

    const noRecPayload = {
      Body: {
        stkCallback: {
          MerchantRequestID: 'MR_NO_REC',
          CheckoutRequestID: crq,
          ResultCode: 0,
          ResultDesc: 'Success',
          CallbackMetadata: {
            Item: [{ Name: 'Amount', Value: 499 }]
          }
        }
      }
    };

    const res = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: noRecPayload
    });
    assert.strictEqual(res.status, 200);

    const intent = paymentStore.findIntent({ checkoutRequestId: crq });
    assert.notStrictEqual(intent.status, 'completed');
  });

  await challengeTest('Receipt case & whitespace normalization prevents double-spending via case alteration', async () => {
    const initRes1 = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        curriculum: 'CBC',
        planPeriod: 'monthly'
      }
    });
    const crq1 = 'CRQ_CASE_1_' + Date.now();
    paymentStore.updateIntent(initRes1.data.intentId, { checkoutRequestId: crq1 });

    const receipt = 'rec_lower_case_99';
    await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: generateCallbackPayload(crq1, receipt, 499)
    });

    // Intent 2 with uppercase version
    const initRes2 = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        curriculum: 'CBC',
        planPeriod: 'monthly'
      }
    });
    const crq2 = 'CRQ_CASE_2_' + Date.now();
    paymentStore.updateIntent(initRes2.data.intentId, { checkoutRequestId: crq2 });

    await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: generateCallbackPayload(crq2, '  REC_LOWER_CASE_99  ', 499)
    });

    const intent2 = paymentStore.findIntent({ checkoutRequestId: crq2 });
    assert.strictEqual(intent2.status, 'pending', 'Case alteration bypassed single-use receipt index!');
  });

  console.log('\n─── CATEGORY E: DISK PERSISTENCE & CROSS-RESTART IDEMPOTENCY ───');

  await challengeTest('Disk persistence preserves completed payments & consumed receipts across simulated restart', async () => {
    // 1. Create intent and complete it
    const initRes = await api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email: victimEmail,
        curriculum: 'CBC',
        planPeriod: 'termly'
      }
    });
    const crq = 'CRQ_RESTART_' + Date.now();
    paymentStore.updateIntent(initRes.data.intentId, { checkoutRequestId: crq });
    const restartReceipt = 'REC_RESTART_' + Date.now().toString(36).toUpperCase();

    await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: generateCallbackPayload(crq, restartReceipt, 1199)
    });

    // Consume the receipt for Child 1
    const subRes = await api('/api/parent/child-subscription', {
      method: 'POST',
      body: {
        email: victimEmail,
        familyPassword: commonPassword,
        studentId: victimChild1.id,
        tier: 'standard',
        billingCycle: 'termly',
        paymentReceipt: restartReceipt
      }
    });
    assert.strictEqual(subRes.status, 200);

    // 2. Simulate process crash & restart: force re-read from disk
    paymentStore.initLedger();

    // Verify receipt is still marked used and consumed
    assert.strictEqual(paymentStore.isReceiptUsed(restartReceipt), true);
    assert.strictEqual(paymentStore.isReceiptConsumed(restartReceipt), true);

    // 3. Attempt to replay callback with this receipt
    const replayRes = await api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: generateCallbackPayload(crq, restartReceipt, 1199)
    });
    assert.strictEqual(replayRes.status, 200);

    // 4. Attempt to consume again for Child 2
    const replaySubRes = await api('/api/parent/child-subscription', {
      method: 'POST',
      body: {
        email: victimEmail,
        familyPassword: commonPassword,
        studentId: victimChild2.id,
        tier: 'standard',
        paymentReceipt: restartReceipt
      }
    });
    assert.strictEqual(replaySubRes.status, 403);
    assert.strictEqual(replaySubRes.data.code, 'RECEIPT_ALREADY_USED');
  });

  console.log('\n════════════════════════════════════════════════════════════');
  console.log(`📊 ADVERSARIAL CHALLENGE TEST RESULTS`);
  console.log(`   Total Tests:  ${testCount}`);
  console.log(`   Passed Tests: ${passedCount} ✅`);
  console.log(`   Failed Tests: ${failedCount} ${failedCount > 0 ? '❌' : ''}`);
  console.log(`   Pass Rate:    ${((passedCount / testCount) * 100).toFixed(1)}%`);
  console.log('════════════════════════════════════════════════════════════\n');

  stopServer();

  if (failedCount > 0) {
    console.error('🚨 FAILURES DETECTED:');
    failures.forEach((f, idx) => {
      console.error(`\n[${idx + 1}] ${f.name}\n${f.error}`);
    });
    process.exit(1);
  } else {
    console.log('🛡️ ALL EMPIRICAL CHALLENGES DEFEATED. PAYMENT SECURITY ROBUST.');
    process.exit(0);
  }
}

main().catch(err => {
  console.error('Fatal Test Runner Error:', err);
  stopServer();
  process.exit(1);
});
