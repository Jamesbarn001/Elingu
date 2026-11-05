// ════════════════════════════════════════════════════════════
// tests/test_challenger_m3_webhooks.js
// EMPIRICAL CHALLENGER ADVERSARIAL TEST HARNESS — MILESTONE 3
// Challenger: challenger_m3_1 (teamwork_preview_challenger)
// Scope:
//   1. Signature Forgery (tampered body, truncated, wrong keys, non-hex, missing)
//   2. Replay Protection (duplicate callbacks, case sensitivity, ledger integrity)
//   3. Concurrent Webhooks (10 and 20 parallel callbacks race stress)
//   4. Mismatched Amount & Underpayment Access Gatekeeping (AC3.2 verification)
//   5. Currency Mismatch & Boundary Edge Cases
// ════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const http = require('http');
const { spawn } = require('child_process');

const paystackService = require('../paystackService');
const paymentStore = require('../paymentStore');
const parentStore = require('../parentStore');
const studentStore = require('../studentStore');

const PORT = process.env.TEST_PORT || 3099;
const BASE_URL = `http://localhost:${PORT}`;

const DATA_DIR = path.resolve(__dirname, '..', 'data');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');
const PAYMENTS_BAK = path.join(DATA_DIR, 'payments.json.bak_m3_challenger');
const PARENTS_FILE = path.join(DATA_DIR, 'parents.json');
const PARENTS_BAK = path.join(DATA_DIR, 'parents.json.bak_m3_challenger');
const STUDENTS_FILE = path.join(DATA_DIR, 'students.json');
const STUDENTS_BAK = path.join(DATA_DIR, 'students.json.bak_m3_challenger');

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;
const failureDetails = [];

function recordCheck(name, passed, details = null) {
  totalChecks++;
  if (passed) {
    passedChecks++;
    console.log(`  [PASS] ${name}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${name}`);
    if (details) {
      console.error(`         Details: ${details}`);
    }
    failureDetails.push({ name, details });
  }
}

// ─────────────────────────────────────────────────────────────
// BACKUP & RESTORE UTILITIES
// ─────────────────────────────────────────────────────────────
function backupData() {
  if (fs.existsSync(PAYMENTS_FILE)) fs.copyFileSync(PAYMENTS_FILE, PAYMENTS_BAK);
  if (fs.existsSync(PARENTS_FILE)) fs.copyFileSync(PARENTS_FILE, PARENTS_BAK);
  if (fs.existsSync(STUDENTS_FILE)) fs.copyFileSync(STUDENTS_FILE, STUDENTS_BAK);
}

function restoreData() {
  if (fs.existsSync(PAYMENTS_BAK)) {
    fs.copyFileSync(PAYMENTS_BAK, PAYMENTS_FILE);
    fs.unlinkSync(PAYMENTS_BAK);
  }
  if (fs.existsSync(PARENTS_BAK)) {
    fs.copyFileSync(PARENTS_BAK, PARENTS_FILE);
    fs.unlinkSync(PARENTS_BAK);
  }
  if (fs.existsSync(STUDENTS_BAK)) {
    fs.copyFileSync(STUDENTS_BAK, STUDENTS_FILE);
    fs.unlinkSync(STUDENTS_BAK);
  }
}

// ─────────────────────────────────────────────────────────────
// SERVER PROCESS MANAGEMENT
// ─────────────────────────────────────────────────────────────
let serverProc = null;

async function startServer() {
  console.log(`\n📡 Spawning Elingu challenger server on port ${PORT}...`);
  serverProc = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: {
      ...process.env,
      PORT: String(PORT),
      NODE_ENV: 'test',
      PAYSTACK_ENVIRONMENT: 'test',
      PAYSTACK_SECRET_KEY: 'sk_test_elingu_demo_secret_2026'
    },
    stdio: 'pipe'
  });

  serverProc.stderr.on('data', d => {
    const s = d.toString();
    if (s.includes('TypeError') || s.includes('Unhandled') || s.includes('SyntaxError')) {
      console.error(`[Server stderr] ${s}`);
    }
  });

  const startTime = Date.now();
  while (Date.now() - startTime < 15000) {
    try {
      const res = await fetch(`${BASE_URL}/api/health`, { signal: AbortSignal.timeout(1000) });
      if (res.ok) {
        console.log(`✅ Challenger server live on port ${PORT}\n`);
        return;
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 250));
  }
  throw new Error(`Server failed to start on port ${PORT} within 15 seconds.`);
}

function stopServer() {
  if (serverProc) {
    try {
      serverProc.kill();
    } catch (e) {}
    serverProc = null;
  }
}

// ─────────────────────────────────────────────────────────────
// PAYSTACK WEBHOOK TEST PAYLOAD GENERATOR & SIGNER
// ─────────────────────────────────────────────────────────────
const SECRET_KEY = 'sk_test_elingu_demo_secret_2026';

function computeHmac(rawBody, secret = SECRET_KEY) {
  const str = typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody);
  return crypto.createHmac('sha512', secret).update(str).digest('hex');
}

function makeWebhookPayload({
  event = 'charge.success',
  reference = 'pstk_test_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex'),
  amountKsh = 1199,
  currency = 'KES',
  email = 'parent@example.com',
  metadata = {}
} = {}) {
  const amountSubunits = Math.round(Number(amountKsh || 0) * 100);
  return {
    event,
    data: {
      id: Math.floor(100000000 + Math.random() * 900000000),
      domain: 'test',
      status: 'success',
      reference,
      amount: amountSubunits,
      message: null,
      gateway_response: 'Successful',
      paid_at: new Date().toISOString(),
      created_at: new Date(Date.now() - 60000).toISOString(),
      channel: 'card',
      currency,
      ip_address: '41.90.12.34',
      metadata: {
        email,
        ...metadata
      },
      customer: {
        id: Math.floor(100000 + Math.random() * 900000),
        email,
        customer_code: 'CUS_' + crypto.randomBytes(4).toString('hex')
      }
    }
  };
}

// ─────────────────────────────────────────────────────────────
// PROBE SUITE 1: SIGNATURE FORGERY, TAMPERING & TIMING SAFETY
// ─────────────────────────────────────────────────────────────
async function probeSignatureForgery() {
  console.log('\n================================================================');
  console.log('PROBE SUITE 1: Paystack Webhook Signature Forgery & Header Probe');
  console.log('================================================================');

  const basePayload = makeWebhookPayload({ reference: 'pstk_sig_probe_1' });
  const rawBody = JSON.stringify(basePayload);
  const genuineSig = computeHmac(rawBody, SECRET_KEY);

  // 1.1 Tampered raw body
  const tamperedBody = JSON.stringify({ ...basePayload, event: 'tampered.event' });
  try {
    const res = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-paystack-signature': genuineSig },
      body: tamperedBody
    });
    recordCheck('1.1 Tampered raw body returns HTTP 401', res.status === 401, `Status: ${res.status}`);
  } catch (err) {
    recordCheck('1.1 Tampered raw body returns HTTP 401', false, err.message);
  }

  // 1.2 Truncated & altered length signatures
  const lengthCases = [
    { name: 'Empty signature string ""', sig: '' },
    { name: '1 character "a"', sig: 'a' },
    { name: '16 characters', sig: 'a'.repeat(16) },
    { name: '64 characters (SHA256 hex length)', sig: 'a'.repeat(64) },
    { name: '127 characters (1 short of SHA512 hex length 128)', sig: genuineSig.slice(0, 127) },
    { name: '129 characters (1 extra char)', sig: genuineSig + 'a' },
    { name: '0 characters (null/undefined)', sig: null }
  ];

  for (const lc of lengthCases) {
    try {
      const headers = { 'Content-Type': 'application/json' };
      if (lc.sig !== null) headers['x-paystack-signature'] = lc.sig;
      const res = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
        method: 'POST',
        headers,
        body: rawBody
      });
      recordCheck(`1.2 Truncated/Length guard: ${lc.name} returns HTTP 401`, res.status === 401, `Status: ${res.status}`);
    } catch (err) {
      recordCheck(`1.2 Truncated/Length guard: ${lc.name} returns HTTP 401`, false, err.message);
    }
  }

  // 1.3 Wrong secret keys
  const wrongKeys = [
    'sk_test_attacker_fake_key_12345',
    'sk_live_compromised_key',
    'wrong_secret',
    'sk_test_elingu_demo_secret_2025',
    'sk_test_elingu_demo_secret_2026_suffix'
  ];

  for (const wk of wrongKeys) {
    try {
      const forgedSig = computeHmac(rawBody, wk);
      const res = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-paystack-signature': forgedSig },
        body: rawBody
      });
      recordCheck(`1.3 Wrong secret key [${wk}] returns HTTP 401`, res.status === 401, `Status: ${res.status}`);
    } catch (err) {
      recordCheck(`1.3 Wrong secret key [${wk}] returns HTTP 401`, false, err.message);
    }
  }

  // 1.4 Non-hex strings & adversarial formatting
  const nonHexCases = [
    { name: '128 non-hex chars (letters g-z)', sig: 'z'.repeat(128) },
    { name: '128 punctuation characters (!@#$...)', sig: '!'.repeat(128) },
    { name: '128 whitespace spaces', sig: ' '.repeat(128) },
    { name: '128 base64 characters with + and /', sig: 'A'.repeat(126) + '+/' },
    { name: '5,000 character oversized header buffer (DoS test)', sig: 'f'.repeat(5000) },
    { name: 'Valid hex with 1 byte flipped', sig: genuineSig.slice(0, 126) + (genuineSig.slice(126) === 'aa' ? 'bb' : '00') }
  ];

  for (const nh of nonHexCases) {
    try {
      const res = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-paystack-signature': nh.sig },
        body: rawBody
      });
      recordCheck(`1.4 Non-hex / Adversarial: ${nh.name} returns HTTP 401`, res.status === 401, `Status: ${res.status}`);
    } catch (err) {
      recordCheck(`1.4 Non-hex / Adversarial: ${nh.name} returns HTTP 401`, false, err.message);
    }
  }

  // 1.5 Missing header & empty raw body
  try {
    const res = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: rawBody
    });
    recordCheck('1.5 Missing x-paystack-signature header returns HTTP 401', res.status === 401, `Status: ${res.status}`);
  } catch (err) {
    recordCheck('1.5 Missing x-paystack-signature header returns HTTP 401', false, err.message);
  }

  try {
    const res = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-paystack-signature': genuineSig },
      body: ''
    });
    recordCheck('1.6 Empty raw body returns HTTP 401', res.status === 401, `Status: ${res.status}`);
  } catch (err) {
    recordCheck('1.6 Empty raw body returns HTTP 401', false, err.message);
  }

  // 1.7 Direct unit probe on verifyWebhookSignature timing safety & multi-byte resilience
  console.log('  Testing paystackService.verifyWebhookSignature direct unit invariants...');
  const v1 = paystackService.verifyWebhookSignature('', genuineSig);
  const v2 = paystackService.verifyWebhookSignature(rawBody, '');
  const v3 = paystackService.verifyWebhookSignature(rawBody, null);
  const v4 = paystackService.verifyWebhookSignature(null, genuineSig);
  const v5 = paystackService.verifyWebhookSignature(rawBody, genuineSig);
  const v6 = paystackService.verifyWebhookSignature(rawBody, genuineSig.slice(0, 64));
  const v7 = paystackService.verifyWebhookSignature(rawBody, '🔥'.repeat(32)); // 128 bytes in UTF-8

  recordCheck('1.7 Direct verifyWebhookSignature handles empty/null/emoji safely without crash',
    v1 === false && v2 === false && v3 === false && v4 === false && v5 === true && v6 === false && v7 === false,
    `v1=${v1}, v2=${v2}, v3=${v3}, v4=${v4}, v5=${v5}, v6=${v6}, v7=${v7}`);
}

// ─────────────────────────────────────────────────────────────
// PROBE SUITE 2: REPLAY PROTECTION & LEDGER DEDUPLICATION
// ─────────────────────────────────────────────────────────────
async function probeReplayProtection() {
  console.log('\n================================================================');
  console.log('PROBE SUITE 2: Replay Protection & Single-Use Receipt Guarantee');
  console.log('================================================================');

  const ref = 'pstk_replay_' + Date.now();
  const testEmail = 'replay_parent_' + Date.now() + '@example.com';
  const payload = makeWebhookPayload({
    reference: ref,
    amountKsh: 1199,
    email: testEmail,
    metadata: {
      email: testEmail,
      curriculum: 'CBC',
      planPeriod: 'termly'
    }
  });
  const rawBody = JSON.stringify(payload);
  const sig = computeHmac(rawBody, SECRET_KEY);

  // 2.1 First webhook: Genuine new payment
  try {
    const res1 = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sig },
      body: rawBody
    });
    const d1 = await res1.json();
    recordCheck('2.1 Initial webhook delivers successfully with HTTP 200',
      res1.status === 200 && (d1.status === 'success' || d1.status === 'received'),
      `Status: ${res1.status}, Body: ${JSON.stringify(d1)}`);
  } catch (err) {
    recordCheck('2.1 Initial webhook delivers successfully with HTTP 200', false, err.message);
  }

  // 2.2 Replay webhook: Same payload sent again immediately
  try {
    const res2 = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sig },
      body: rawBody
    });
    const d2 = await res2.json();
    recordCheck('2.2 Replay webhook delivers HTTP 200 acknowledged without error',
      res2.status === 200,
      `Status: ${res2.status}, Body: ${JSON.stringify(d2)}`);
  } catch (err) {
    recordCheck('2.2 Replay webhook delivers HTTP 200 acknowledged without error', false, err.message);
  }

  // 2.3 Verify ledger contains exactly ONE completed payment for this receipt
  try {
    const paymentsData = JSON.parse(fs.readFileSync(PAYMENTS_FILE, 'utf8'));
    const matches = (paymentsData.completedPayments || []).filter(
      p => p.providerReceipt && p.providerReceipt.toUpperCase() === ref.toUpperCase()
    );
    recordCheck('2.3 Ledger records exactly ONE completed payment for replayed receipt',
      matches.length === 1,
      `Completed payments matching ref ${ref}: ${matches.length}`);
  } catch (err) {
    recordCheck('2.3 Ledger records exactly ONE completed payment for replayed receipt', false, err.message);
  }

  // 2.4 Replay with case variation (e.g. UPPERCASE reference in second payload)
  const refUpper = ref.toUpperCase();
  const payloadUpper = makeWebhookPayload({
    reference: refUpper,
    amountKsh: 1199,
    email: testEmail,
    metadata: {
      email: testEmail,
      curriculum: 'CBC',
      planPeriod: 'termly'
    }
  });
  const rawBodyUpper = JSON.stringify(payloadUpper);
  const sigUpper = computeHmac(rawBodyUpper, SECRET_KEY);

  try {
    const resCase = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sigUpper },
      body: rawBodyUpper
    });
    const dCase = await resCase.json();

    const paymentsData = JSON.parse(fs.readFileSync(PAYMENTS_FILE, 'utf8'));
    const matches = (paymentsData.completedPayments || []).filter(
      p => p.providerReceipt && p.providerReceipt.toUpperCase() === ref.toUpperCase()
    );
    recordCheck('2.4 Case-insensitive replay does not create duplicate completed payment',
      matches.length === 1,
      `Matches for ${refUpper}: ${matches.length}, response: ${JSON.stringify(dCase)}`);
  } catch (err) {
    recordCheck('2.4 Case-insensitive replay does not create duplicate completed payment', false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────
// PROBE SUITE 3: CONCURRENT WEBHOOK CALLBACKS & RACE STRESS
// ─────────────────────────────────────────────────────────────
async function probeConcurrentWebhooks() {
  console.log('\n================================================================');
  console.log('PROBE SUITE 3: Concurrent Webhooks Race Stress (10 & 20 Parallel)');
  console.log('================================================================');

  // 3.1 10 Concurrent Webhooks for the SAME reference
  const raceRef10 = 'pstk_race10_' + Date.now();
  const raceEmail10 = 'race10_' + Date.now() + '@example.com';
  const payload10 = makeWebhookPayload({
    reference: raceRef10,
    amountKsh: 1199,
    email: raceEmail10,
    metadata: {
      email: raceEmail10,
      curriculum: 'CBC',
      planPeriod: 'termly'
    }
  });
  const rawBody10 = JSON.stringify(payload10);
  const sig10 = computeHmac(rawBody10, SECRET_KEY);

  console.log(`  Dispatching 10 concurrent requests for ref: ${raceRef10}...`);
  const promises10 = Array.from({ length: 10 }).map((_, idx) =>
    fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sig10 },
      body: rawBody10
    }).then(async r => ({ idx, status: r.status, data: await r.json() }))
  );

  try {
    const results10 = await Promise.all(promises10);
    const all200 = results10.every(r => r.status === 200);
    recordCheck('3.1 All 10 concurrent webhook requests return HTTP 200 without crashing',
      all200,
      `Statuses: ${results10.map(r => r.status).join(',')}`);

    // Check ledger
    const paymentsData = JSON.parse(fs.readFileSync(PAYMENTS_FILE, 'utf8'));
    const matches = (paymentsData.completedPayments || []).filter(
      p => p.providerReceipt && p.providerReceipt.toUpperCase() === raceRef10.toUpperCase()
    );
    recordCheck('3.1 Exactly ONE completed payment entry created despite 10 concurrent requests',
      matches.length === 1,
      `Actual completed payments found: ${matches.length}`);
  } catch (err) {
    recordCheck('3.1 All 10 concurrent webhook requests return HTTP 200 without crashing', false, err.message);
  }

  // 3.2 20 Concurrent Webhooks for the SAME reference (Intense Concurrency)
  const raceRef20 = 'pstk_race20_' + Date.now();
  const raceEmail20 = 'race20_' + Date.now() + '@example.com';
  const payload20 = makeWebhookPayload({
    reference: raceRef20,
    amountKsh: 3499,
    email: raceEmail20,
    metadata: {
      email: raceEmail20,
      curriculum: 'CBC',
      planPeriod: 'annual'
    }
  });
  const rawBody20 = JSON.stringify(payload20);
  const sig20 = computeHmac(rawBody20, SECRET_KEY);

  console.log(`  Dispatching 20 concurrent requests for ref: ${raceRef20}...`);
  const promises20 = Array.from({ length: 20 }).map((_, idx) =>
    fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sig20 },
      body: rawBody20
    }).then(async r => ({ idx, status: r.status, data: await r.json() }))
  );

  try {
    const results20 = await Promise.all(promises20);
    const all200 = results20.every(r => r.status === 200);
    recordCheck('3.2 All 20 concurrent webhook requests return HTTP 200 without crashing',
      all200,
      `Statuses: ${results20.map(r => r.status).join(',')}`);

    const paymentsData = JSON.parse(fs.readFileSync(PAYMENTS_FILE, 'utf8'));
    const matches = (paymentsData.completedPayments || []).filter(
      p => p.providerReceipt && p.providerReceipt.toUpperCase() === raceRef20.toUpperCase()
    );
    recordCheck('3.2 Exactly ONE completed payment entry created despite 20 concurrent requests',
      matches.length === 1,
      `Actual completed payments found: ${matches.length}`);
  } catch (err) {
    recordCheck('3.2 All 20 concurrent webhook requests return HTTP 200 without crashing', false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────
// PROBE SUITE 4: MISMATCHED AMOUNT & UNDERPAYMENT GATEKEEPING (AC3.2)
// ─────────────────────────────────────────────────────────────
async function probeAmountMismatchAndUnderpayment() {
  console.log('\n================================================================');
  console.log('PROBE SUITE 4: Amount Mismatch & Underpayment Access Gatekeeping (AC3.2)');
  console.log('================================================================');

  // 4.1 Probe underpayment for Student Plan: British Termly (KES 8,900) underpaid with KES 1.00
  const testEmail = `victim_parent_${Date.now()}@example.com`;
  const studentHandle = `Pupil_${Date.now()}`.slice(0, 18);
  let studentId = null;

  try {
    const regRes = await fetch(`${BASE_URL}/api/students/profile`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        handle: studentHandle,
        pin: '8492',
        grade: 8,
        email: testEmail,
        curriculum: 'BRITISH',
        examBoard: 'CAIE',
        yearGroup: 8,
        school: 'Nairobi Academy'
      })
    });
    const regData = await regRes.json();
    studentId = regData.student?.id;

    const parent = parentStore.getParentByEmail(testEmail);
    if (parent && parent.verifyToken) {
      await fetch(`${BASE_URL}/api/parent/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: parent.verifyToken,
          childId: studentId,
          familyPassword: 'ParentSecurePass2026!'
        })
      });
    }
  } catch (err) {
    console.error('Failed to setup parent/student fixture:', err.message);
  }

  // Check initial subscription tier
  const parentBefore = parentStore.getParentByEmail(testEmail);
  const initialTier = (parentBefore?.childrenSubscriptions || {})[studentId] || 'free';
  console.log(`  Initial student subscription tier: "${initialTier}"`);

  // Attack: Send a validly-signed webhook for British Termly (catalogue price KES 8,900)
  // BUT with amount: 100 subunits = KES 1.00 (severe underpayment)
  const ref = 'pstk_underpay_student_' + Date.now();
  const underpayPayload = makeWebhookPayload({
    reference: ref,
    amountKsh: 1, // KES 1.00 instead of 8,900!
    email: testEmail,
    metadata: {
      email: testEmail,
      studentId: studentId,
      curriculum: 'BRITISH',
      planPeriod: 'termly',
      tier: 'premium'
    }
  });

  const rawBody = JSON.stringify(underpayPayload);
  const sig = computeHmac(rawBody, SECRET_KEY);

  try {
    const res = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sig },
      body: rawBody
    });

    const resData = await res.json();
    console.log(`  Student Underpay webhook response: HTTP ${res.status}, body: ${JSON.stringify(resData)}`);

    // Reload parent and student store to verify if paid access was granted
    const parentAfter = parentStore.getParentByEmail(testEmail);
    const subAfter = (parentAfter?.studentSubscriptions || {})[studentId] || {};
    const childTierAfter = (parentAfter?.childrenSubscriptions || {})[studentId];

    const studentsData = JSON.parse(fs.readFileSync(STUDENTS_FILE, 'utf8'));
    const studentInDb = studentsData.students.find(s => s.id === studentId);
    const studentDbTier = studentInDb?.subscriptionTier;

    console.log(`  Post-underpay state: childTier=${childTierAfter}, studentDbTier=${studentDbTier}, subAfter=${JSON.stringify(subAfter)}`);

    // AC3.2 Requirement: "A Paystack webhook with an invalid signature is rejected; a valid one with a mismatched amount does not grant access."
    const accessGranted = childTierAfter === 'premium' || studentDbTier === 'premium';

    recordCheck(
      '4.1 AC3.2 Invariant: Webhook with mismatched/underpaid amount does NOT grant student access',
      !accessGranted,
      accessGranted
        ? `CRITICAL BUG: Learner was upgraded to premium after paying KES 1 for KES 8,900 British Termly plan!`
        : `Access correctly denied. Tier remains ${childTierAfter || studentDbTier}`
    );
  } catch (err) {
    recordCheck('4.1 AC3.2 Invariant: Webhook with mismatched/underpaid amount does NOT grant student access', false, err.message);
  }

  // 4.2 Probe underpayment for Family Plan (Parent-level subscription): British Family Termly (KES 14,900) underpaid with KES 10.00
  // Use the verified registered parent `testEmail`
  const familyRef = 'pstk_underpay_family_' + Date.now();
  const familyPayload = makeWebhookPayload({
    reference: familyRef,
    amountKsh: 10, // KES 10.00 instead of 14,900!
    email: testEmail,
    metadata: {
      email: testEmail,
      curriculum: 'BRITISH',
      planPeriod: 'termly',
      tier: 'premium',
      isFamily: true,
      childrenCount: 3
    }
  });

  const rawBodyFamily = JSON.stringify(familyPayload);
  const sigFamily = computeHmac(rawBodyFamily, SECRET_KEY);

  try {
    const res = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-paystack-signature': sigFamily },
      body: rawBodyFamily
    });

    const resData = await res.json();
    console.log(`  Family Underpay webhook response: HTTP ${res.status}, body: ${JSON.stringify(resData)}`);

    const parentAfter = parentStore.getParentByEmail(testEmail);
    const parentTier = parentAfter?.subscriptionTier;
    console.log(`  Post-underpay parent state: subscriptionTier=${parentTier}, receipt=${parentAfter?.paymentReceipt}`);

    // If parent received active premium subscription despite paying KES 10 instead of KES 14,900:
    const familyGranted = parentTier === 'premium';
    recordCheck(
      '4.2 AC3.2 Invariant: Webhook with mismatched/underpaid amount does NOT grant family subscription',
      !familyGranted,
      familyGranted
        ? `CRITICAL BUG: Family subscription was activated after paying KES 10 for KES 14,900 British Family Termly plan!`
        : `Access correctly denied for family subscription.`
    );
  } catch (err) {
    recordCheck('4.2 AC3.2 Invariant: Webhook with mismatched/underpaid amount does NOT grant family subscription', false, err.message);
  }

  // 4.3 Mismatched Currency (e.g. USD instead of KES)
  const usdPayload = makeWebhookPayload({
    reference: 'pstk_usd_' + Date.now(),
    currency: 'USD',
    amountKsh: 8900
  });
  const usdRaw = JSON.stringify(usdPayload);
  const usdSig = computeHmac(usdRaw, SECRET_KEY);

  try {
    const res = await fetch(`${BASE_URL}/api/payment/paystack-webhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-paystack-signature': usdSig },
      body: usdRaw
    });
    const d = await res.json();
    recordCheck('4.3 Non-KES currency rejected with HTTP 400',
      res.status === 400 && d.rejected === true,
      `Status: ${res.status}, body: ${JSON.stringify(d)}`);
  } catch (err) {
    recordCheck('4.3 Non-KES currency rejected with HTTP 400', false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────
// MAIN HARNESS ENTRYPOINT
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║  ELINGU CHALLENGER M3-1 ADVERSARIAL WEBHOOK TEST HARNESS    ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');

  backupData();

  try {
    await startServer();

    // Suite 1: Signature Forgery & Header Probing
    await probeSignatureForgery();

    // Suite 2: Replay Protection & Deduplication
    await probeReplayProtection();

    // Suite 3: Concurrent Webhooks Race Stress
    await probeConcurrentWebhooks();

    // Suite 4: Amount Mismatch & Underpayment Gatekeeping
    await probeAmountMismatchAndUnderpayment();

  } catch (err) {
    console.error('Fatal harness error:', err);
  } finally {
    stopServer();
    restoreData();

    console.log('\n================================================================');
    console.log('CHALLENGER M3-1 ADVERSARIAL HARNESS SUMMARY');
    console.log('================================================================');
    console.log(`Total Checks:     ${totalChecks}`);
    console.log(`Passed Checks:    ${passedChecks}`);
    console.log(`Failed Checks:    ${failedChecks}`);
    console.log('================================================================\n');

    if (failureDetails.length > 0) {
      console.log('Detailed Failures:');
      failureDetails.forEach((f, idx) => {
        console.log(`  ${idx + 1}. [${f.name}]`);
        if (f.details) console.log(`     -> ${f.details}`);
      });
      console.log('');
    }

    process.exit(failedChecks === 0 ? 0 : 1);
  }
}

main();
