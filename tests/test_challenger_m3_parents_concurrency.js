// ════════════════════════════════════════════════════════════
// tests/test_challenger_m3_parents_concurrency.js
// EMPIRICAL CONCURRENCY & PARENTS.JSON CORRUPTION STRESS HARNESS
// Challenger: challenger_m3_1_rep
// ════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { spawn } = require('child_process');

const PORT = 3199;
const BASE_URL = `http://localhost:${PORT}`;
const DATA_DIR = path.resolve(__dirname, '..', 'data');
const PARENTS_FILE = path.join(DATA_DIR, 'parents.json');
const PARENTS_BAK = path.join(DATA_DIR, 'parents.json.bak_concurrency_m3');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');
const PAYMENTS_BAK = path.join(DATA_DIR, 'payments.json.bak_concurrency_m3');

const SECRET_KEY = 'sk_test_elingu_demo_secret_2026';

function computeHmac(rawBody, secret = SECRET_KEY) {
  const str = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody);
  return crypto.createHmac('sha512', secret).update(str).digest('hex');
}

function backup() {
  if (fs.existsSync(PARENTS_FILE)) fs.copyFileSync(PARENTS_FILE, PARENTS_BAK);
  if (fs.existsSync(PAYMENTS_FILE)) fs.copyFileSync(PAYMENTS_FILE, PAYMENTS_BAK);
}

function restore() {
  if (fs.existsSync(PARENTS_BAK)) {
    fs.copyFileSync(PARENTS_BAK, PARENTS_FILE);
    fs.unlinkSync(PARENTS_BAK);
  }
  if (fs.existsSync(PAYMENTS_BAK)) {
    fs.copyFileSync(PAYMENTS_BAK, PAYMENTS_FILE);
    fs.unlinkSync(PAYMENTS_BAK);
  }
}

function verifyParentsJsonIntegrity() {
  const content = fs.readFileSync(PARENTS_FILE, 'utf8');
  assert(content && content.trim().length > 0, 'parents.json must not be empty');
  const parsed = JSON.parse(content);
  assert(parsed && Array.isArray(parsed.parents), 'parents.json must contain parents array');
  return parsed;
}

let serverProc = null;

async function startServer() {
  console.log(`Starting server on port ${PORT}...`);
  serverProc = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: {
      ...process.env,
      PORT: String(PORT),
      NODE_ENV: 'test',
      PAYSTACK_ENVIRONMENT: 'test',
      PAYSTACK_SECRET_KEY: SECRET_KEY
    },
    stdio: 'pipe'
  });

  const start = Date.now();
  while (Date.now() - start < 15000) {
    try {
      const res = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(1000) });
      if (res.ok) return;
    } catch (_) {}
    await new Promise(r => setTimeout(r, 200));
  }
  throw new Error(`Server failed to start on port ${PORT}`);
}

function stopServer() {
  if (serverProc) {
    serverProc.kill();
    serverProc = null;
  }
}

async function runTest() {
  backup();
  try {
    await startServer();
    console.log('\n--- Test 1: 10 Parallel Distinct Webhooks (Unique Parents) ---');
    const parentStore = require('../parentStore');
    const emails10 = Array.from({ length: 10 }, (_, i) => `par_conc_10_${Date.now()}_${i}@test.com`);
    emails10.forEach(e => parentStore.createParent(e));

    const reqs10 = emails10.map((email, i) => {
      const ref = `pstk_c10_${Date.now()}_${i}_${crypto.randomBytes(3).toString('hex')}`;
      const payload = {
        event: 'charge.success',
        data: {
          reference: ref,
          amount: 119900,
          currency: 'KES',
          status: 'success',
          metadata: {
            email,
            curriculum: 'CBC',
            planPeriod: 'termly',
            tier: 'premium'
          }
        }
      };
      const raw = JSON.stringify(payload);
      const sig = computeHmac(raw);
      return fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sig },
        body: raw
      }).then(async r => ({ status: r.status, body: await r.json() }));
    });

    const res10 = await Promise.all(reqs10);
    const pass10 = res10.every(r => r.status === 200 && r.body.status === 'success');
    console.log(`10 Parallel Requests: ${pass10 ? 'ALL HTTP 200 SUCCESS' : 'FAILED'}`);
    assert(pass10, 'All 10 parallel webhook requests must return HTTP 200');

    const parentsAfter10 = verifyParentsJsonIntegrity();
    console.log(`parents.json parsed successfully. Total parents: ${parentsAfter10.parents.length}`);
    emails10.forEach(email => {
      const p = parentsAfter10.parents.find(x => x.email === email);
      assert(p, `Parent ${email} must exist in parents.json`);
      assert(p.subscriptionTier === 'premium', `Parent ${email} subscriptionTier must be premium`);
    });
    console.log('✅ Test 1 Passed: 10 Parallel requests completed with zero parents.json corruption.');

    console.log('\n--- Test 2: 20 Parallel Distinct Webhooks (Unique Parents) ---');
    const emails20 = Array.from({ length: 20 }, (_, i) => `par_conc_20_${Date.now()}_${i}@test.com`);
    emails20.forEach(e => parentStore.createParent(e));

    const reqs20 = emails20.map((email, i) => {
      const ref = `pstk_c20_${Date.now()}_${i}_${crypto.randomBytes(3).toString('hex')}`;
      const payload = {
        event: 'charge.success',
        data: {
          reference: ref,
          amount: 890000,
          currency: 'KES',
          status: 'success',
          metadata: {
            email,
            curriculum: 'BRITISH',
            planPeriod: 'termly',
            tier: 'premium'
          }
        }
      };
      const raw = JSON.stringify(payload);
      const sig = computeHmac(raw);
      return fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sig },
        body: raw
      }).then(async r => ({ status: r.status, body: await r.json() }));
    });

    const res20 = await Promise.all(reqs20);
    const pass20 = res20.every(r => r.status === 200 && r.body.status === 'success');
    console.log(`20 Parallel Requests: ${pass20 ? 'ALL HTTP 200 SUCCESS' : 'FAILED'}`);
    assert(pass20, 'All 20 parallel webhook requests must return HTTP 200');

    const parentsAfter20 = verifyParentsJsonIntegrity();
    console.log(`parents.json parsed successfully. Total parents: ${parentsAfter20.parents.length}`);
    emails20.forEach(email => {
      const p = parentsAfter20.parents.find(x => x.email === email);
      assert(p, `Parent ${email} must exist in parents.json`);
      assert(p.subscriptionTier === 'premium', `Parent ${email} subscriptionTier must be premium`);
    });
    console.log('✅ Test 2 Passed: 20 Parallel requests completed with zero parents.json corruption.');

    console.log('\n--- Test 3: 20 Parallel Requests for the SAME Parent Account ---');
    const sharedEmail = `shared_parent_${Date.now()}@test.com`;
    parentStore.createParent(sharedEmail);

    const reqsShared = Array.from({ length: 20 }, (_, i) => {
      const ref = `pstk_shared_${Date.now()}_${i}_${crypto.randomBytes(3).toString('hex')}`;
      const payload = {
        event: 'charge.success',
        data: {
          reference: ref,
          amount: 49900,
          currency: 'KES',
          status: 'success',
          metadata: {
            email: sharedEmail,
            curriculum: 'CBC',
            planPeriod: 'monthly',
            tier: 'standard'
          }
        }
      };
      const raw = JSON.stringify(payload);
      const sig = computeHmac(raw);
      return fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sig },
        body: raw
      }).then(async r => ({ status: r.status, body: await r.json() }));
    });

    const resShared = await Promise.all(reqsShared);
    const passShared = resShared.every(r => r.status === 200 && r.body.status === 'success');
    console.log(`20 Parallel Requests for same parent: ${passShared ? 'ALL HTTP 200 SUCCESS' : 'FAILED'}`);
    assert(passShared, 'All 20 parallel requests for shared parent must succeed');

    const parentsAfterShared = verifyParentsJsonIntegrity();
    const matchingShared = parentsAfterShared.parents.filter(x => x.email === sharedEmail);
    assert.strictEqual(matchingShared.length, 1, 'Shared parent must exist exactly once in parents.json without duplication');
    console.log('✅ Test 3 Passed: 20 Parallel requests to same parent completed without duplicate records or corruption.');

    console.log('\n--- Test 4: 20 Parallel Underpaid Webhook Requests ---');
    const underpayEmails = Array.from({ length: 20 }, (_, i) => `underpay_par_${Date.now()}_${i}@test.com`);
    const reqsUnderpay = underpayEmails.map((email, i) => {
      const ref = `pstk_underpay_conc_${Date.now()}_${i}_${crypto.randomBytes(3).toString('hex')}`;
      const payload = {
        event: 'charge.success',
        data: {
          reference: ref,
          amount: 100, // KES 1.00 instead of KES 14,900!
          currency: 'KES',
          status: 'success',
          metadata: {
            email,
            curriculum: 'BRITISH',
            planPeriod: 'termly',
            isFamily: true,
            childrenCount: 3
          }
        }
      };
      const raw = JSON.stringify(payload);
      const sig = computeHmac(raw);
      return fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sig },
        body: raw
      }).then(async r => ({ status: r.status, body: await r.json() }));
    });

    const resUnderpay = await Promise.all(reqsUnderpay);
    const allRejected = resUnderpay.every(r => r.status === 200 && r.body.status === 'rejected' && r.body.code === 'INVALID_AMOUNT');
    console.log(`20 Parallel Underpaid Requests: ${allRejected ? 'ALL STRICTLY REJECTED' : 'FAILED'}`);
    assert(allRejected, 'All 20 parallel underpaid webhooks must be rejected with INVALID_AMOUNT');

    const parentsAfterUnderpay = verifyParentsJsonIntegrity();
    underpayEmails.forEach(email => {
      const p = parentsAfterUnderpay.parents.find(x => x.email === email);
      if (p) {
        assert(p.subscriptionTier !== 'premium', `Underpaid parent ${email} must not have premium subscription`);
      }
    });
    console.log('✅ Test 4 Passed: All 20 parallel underpaid webhooks rejected with zero entitlement granted.');

    console.log('\n🎉 ALL CONCURRENCY AND INTEGRITY TESTS PASSED (4/4)!');
  } finally {
    stopServer();
    restore();
  }
}

runTest().catch(err => {
  console.error('Fatal concurrency test failure:', err);
  process.exit(1);
});
