/**
 * ============================================================================
 * tests/test_challenger_m3_boundaries.js
 * EMPIRICAL ADVERSARIAL CHALLENGER TEST SUITE: Milestone 3 Boundaries & Resilience
 * Challenger: challenger_m3_2 (teamwork_preview_challenger)
 * Targets:
 *   1. mpesaService.js (Phone Normalization & Daraja Simulation Responses)
 *   2. paystackService.js (HMAC Signature Verification & Simulation Responses)
 *   3. server.js (Currency Boundary Rejection & Null/Extreme Payload Resilience)
 *   4. Direct API boundaries (Initialize, Deprecated Confirm, STK Push)
 * ============================================================================
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { spawn } = require('child_process');

const mpesaService = require('../mpesaService');
const paystackService = require('../paystackService');
const authUtils = require('../authUtils');

const PORT = 3005; // Isolated test port
const BASE_URL = `http://127.0.0.1:${PORT}`;
let serverProc = null;

// File backup & restore to guarantee clean ledger state
const DATA_DIR = path.resolve(__dirname, '..', 'data');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');
const PAYMENTS_BAK = path.join(DATA_DIR, 'payments.json.bak_challenger_m3');
const PARENTS_FILE = path.join(DATA_DIR, 'parents.json');
const PARENTS_BAK = path.join(DATA_DIR, 'parents.json.bak_challenger_m3');

function backupFiles() {
  if (fs.existsSync(PAYMENTS_FILE)) {
    fs.copyFileSync(PAYMENTS_FILE, PAYMENTS_BAK);
  }
  if (fs.existsSync(PARENTS_FILE)) {
    fs.copyFileSync(PARENTS_FILE, PARENTS_BAK);
  }
}

function restoreFiles() {
  if (fs.existsSync(PAYMENTS_BAK)) {
    fs.copyFileSync(PAYMENTS_BAK, PAYMENTS_FILE);
    try { fs.unlinkSync(PAYMENTS_BAK); } catch (e) {}
  }
  if (fs.existsSync(PARENTS_BAK)) {
    fs.copyFileSync(PARENTS_BAK, PARENTS_FILE);
    try { fs.unlinkSync(PARENTS_BAK); } catch (e) {}
  }
}

// HTTP Helper
async function api(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = { ...(options.headers || {}) };
  if (!headers['Content-Type'] && options.body && typeof options.body === 'object') {
    headers['Content-Type'] = 'application/json';
  }

  const fetchOptions = {
    method: options.method || 'GET',
    headers,
    signal: AbortSignal.timeout(10000)
  };

  if (options.body !== undefined) {
    fetchOptions.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
  }

  const res = await fetch(url, fetchOptions);
  let data = null;
  const rawText = await res.text();
  try {
    data = JSON.parse(rawText);
  } catch (e) {
    data = rawText;
  }
  return { status: res.status, ok: res.ok, data, headers: res.headers };
}

// Helper to sign Paystack payloads
function signPaystackPayload(payload) {
  const raw = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return crypto.createHmac('sha512', paystackService.PAYSTACK_SECRET_KEY).update(raw).digest('hex');
}

// Metrics
let totalProbes = 0;
let passedProbes = 0;
let failedProbes = 0;
const failures = [];

function recordProbe(section, title, passed, details = null) {
  totalProbes++;
  if (passed) {
    passedProbes++;
    console.log(`  [PASS] [${section}] ${title}`);
  } else {
    failedProbes++;
    console.error(`  [FAIL] [${section}] ${title}`);
    if (details) {
      console.error(`         Details: ${typeof details === 'object' ? JSON.stringify(details) : details}`);
    }
    failures.push({ section, title, details });
  }
}

async function startServer() {
  console.log(`📡 Spawning test server on isolated port ${PORT}...`);
  serverProc = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT), NODE_ENV: 'test' },
    stdio: 'pipe'
  });

  serverProc.stderr.on('data', d => {
    const s = d.toString();
    if (s.includes('TypeError') || s.includes('Unhandled') || s.includes('Error [ERR_')) {
      console.error(`  [Server Stderr] ${s.trim()}`);
    }
  });

  const start = Date.now();
  while (Date.now() - start < 15000) {
    try {
      const r = await fetch(`${BASE_URL}/api/health/storage`, { signal: AbortSignal.timeout(1000) });
      if (r.ok) {
        console.log(`✅ Test server active and healthy on port ${PORT}\n`);
        return;
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 250));
  }
  throw new Error('Test server failed to start within 15s');
}

function stopServer() {
  if (serverProc) {
    console.log(`🛑 Stopping test server on port ${PORT}...`);
    try {
      serverProc.kill('SIGTERM');
    } catch (e) {}
    serverProc = null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROBE SUITE 1: Phone Normalization & Simulation Responses
// ─────────────────────────────────────────────────────────────────────────────
async function runPhoneNormalizationProbes() {
  console.log('>>> SECTION 1: Phone Normalization & Daraja Simulation Responses');

  // 1.1 Valid Kenyan Mobile Phone Formats
  const validPhoneCases = [
    { input: '0712345678', expectedClean: '254712345678', desc: '10-digit Safaricom 07xx' },
    { input: '0112345678', expectedClean: '254112345678', desc: '10-digit CAK 01xx' },
    { input: '+254712345678', expectedClean: '254712345678', desc: 'E.164 +254 7xx' },
    { input: '+254112345678', expectedClean: '254112345678', desc: 'E.164 +254 1xx' },
    { input: '254712345678', expectedClean: '254712345678', desc: '12-digit 254 7xx without +' },
    { input: '254112345678', expectedClean: '254112345678', desc: '12-digit 254 1xx without +' },
    { input: '712345678', expectedClean: '254712345678', desc: '9-digit 7xx' },
    { input: '112345678', expectedClean: '254112345678', desc: '9-digit 1xx' },
    { input: 254712345678, expectedClean: '254712345678', desc: 'Numeric literal 12-digit' },
    { input: 712345678, expectedClean: '254712345678', desc: 'Numeric literal 9-digit' },
    { input: '0712-345-678', expectedClean: '254712345678', desc: 'Hyphenated string' },
    { input: '0712 345 678', expectedClean: '254712345678', desc: 'Space-delimited string' },
    { input: '+254 (712) 345-678', expectedClean: '254712345678', desc: 'Parenthesized format with spaces & dashes' },
    { input: '0712.345.678', expectedClean: '254712345678', desc: 'Dot-delimited string' },
    { input: '  0712345678  ', expectedClean: '254712345678', desc: 'Leading & trailing padded whitespace' },
    { input: '+254-712-345-678', expectedClean: '254712345678', desc: 'Full country code with hyphens' },
    { input: '0112-345-678', expectedClean: '254112345678', desc: '01xx with hyphens' }
  ];

  for (const tc of validPhoneCases) {
    try {
      const res = await mpesaService.initiateSTKPush({
        phone: tc.input,
        amount: 499,
        accountReference: 'ElinguTest'
      });

      const hasSuccess = res && res.success === true;
      const isSimulated = res && res.simulated === true;
      const validCheckoutId = res && typeof res.checkoutRequestId === 'string' && /^ws_CO_\d+_[a-f0-9]{8}$/.test(res.checkoutRequestId);
      const validMerchantId = res && typeof res.merchantRequestId === 'string' && /^mr_\d+$/.test(res.merchantRequestId);
      const validCustomerMsg = res && res.customerMessage === 'Success. Request accepted for processing';
      const validPhone = res && res.phone === tc.expectedClean;
      const validCurrency = res && res.currency === 'KES';
      const validAmount = res && res.amount === 499;

      const allOk = hasSuccess && isSimulated && validCheckoutId && validMerchantId && validCustomerMsg && validPhone && validCurrency && validAmount;
      recordProbe(
        'Phone-Valid',
        `Valid format: "${tc.input}" (${tc.desc}) -> normalized +${tc.expectedClean}`,
        allOk,
        allOk ? null : { res, expectedClean: tc.expectedClean }
      );
    } catch (err) {
      recordProbe('Phone-Valid', `Valid format "${tc.input}" threw unexpected error`, false, err.message);
    }
  }

  // 1.2 Param alias: phoneNumber instead of phone
  try {
    const resAlias = await mpesaService.initiateSTKPush({
      phoneNumber: '0712345678',
      amount: 1199
    });
    const aliasOk = resAlias && resAlias.success === true && resAlias.phone === '254712345678' && /^ws_CO_/.test(resAlias.checkoutRequestId);
    recordProbe('Phone-ParamAlias', 'Accepts { phoneNumber } parameter alias', aliasOk, resAlias);
  } catch (err) {
    recordProbe('Phone-ParamAlias', 'phoneNumber parameter threw error', false, err.message);
  }

  // 1.3 Param precedence: phone takes precedence over phoneNumber
  try {
    const resPrec = await mpesaService.initiateSTKPush({
      phone: '0712345678',
      phoneNumber: '0112345678',
      amount: 1199
    });
    const precOk = resPrec && resPrec.success === true && resPrec.phone === '254712345678';
    recordProbe('Phone-ParamAlias', 'Parameter { phone } takes precedence over { phoneNumber }', precOk, resPrec);
  } catch (err) {
    recordProbe('Phone-ParamAlias', 'phone precedence test threw error', false, err.message);
  }

  // 1.4 Invalid Phone Formats (must return success: false)
  const invalidPhoneCases = [
    // Landlines
    { input: '0201234567', reason: 'Nairobi landline 020...' },
    { input: '+254201234567', reason: 'Nairobi landline +25420...' },
    { input: '0411234567', reason: 'Mombasa landline 041...' },
    { input: '0511234567', reason: 'Nakuru landline 051...' },
    { input: '0531234567', reason: 'Eldoret landline 053...' },

    // Dummy / Non-mobile prefixes
    { input: '0000000000', reason: 'All zeros dummy sequence' },
    { input: '0012345678', reason: '00... dummy prefix' },
    { input: '254001234567', reason: '25400... country code with dummy prefix' },
    { input: '0812345678', reason: 'Non-existent CAK mobile prefix 08...' },
    { input: '0912345678', reason: 'Non-existent CAK mobile prefix 09...' },
    { input: '0312345678', reason: 'Non-existent CAK mobile prefix 03...' },

    // Shortcodes
    { input: '1234', reason: '4-digit shortcode' },
    { input: '22222', reason: '5-digit shortcode' },
    { input: '888', reason: '3-digit emergency/tollfree shortcode' },
    { input: '888888', reason: '6-digit premium rate shortcode' },

    // International numbers (Non-Kenyan)
    { input: '+14155552671', reason: 'US mobile (+1)' },
    { input: '+447911123456', reason: 'UK mobile (+44)' },
    { input: '+256772123456', reason: 'Uganda mobile (+256)' },
    { input: '+255712345678', reason: 'Tanzania mobile (+255)' },
    { input: '+2348012345678', reason: 'Nigeria mobile (+234)' },
    { input: '+919876543210', reason: 'India mobile (+91)' },

    // Length boundaries
    { input: '07123456', reason: 'Truncated 8-digit starting with 07' },
    { input: '71234567', reason: 'Truncated 8-digit starting with 7' },
    { input: '07123456789', reason: '11-digit overflow starting with 07' },
    { input: '2547123456789', reason: '13-digit overflow starting with 254' },
    { input: '+25471234567899', reason: '14-digit overflow starting with +254' },
    { input: '7', reason: 'Single digit' },
    { input: '07', reason: 'Two digits' },

    // Malformed / Non-numeric
    { input: '', reason: 'Empty string' },
    { input: '    ', reason: 'Whitespace string' },
    { input: null, reason: 'null value' },
    { input: undefined, reason: 'undefined value' },
    { input: false, reason: 'boolean false' },
    { input: true, reason: 'boolean true' },
    { input: {}, reason: 'empty object' },
    { input: 'not-a-phone', reason: 'alphabetic string' },
    { input: '+@#$%^&*()', reason: 'symbols only string' }
  ];

  for (const tc of invalidPhoneCases) {
    try {
      const res = await mpesaService.initiateSTKPush({
        phone: tc.input,
        amount: 499
      });

      const rejectedProperly = res && res.success === false && typeof res.error === 'string' && res.error.length > 0;
      recordProbe(
        'Phone-Invalid',
        `Rejects invalid phone: ${JSON.stringify(tc.input)} (${tc.reason})`,
        rejectedProperly,
        rejectedProperly ? null : res
      );
    } catch (err) {
      recordProbe('Phone-Invalid', `Invalid phone ${JSON.stringify(tc.input)} threw exception`, false, err.message);
    }
  }

  // 1.5 Empty payload object check
  try {
    const resEmpty = await mpesaService.initiateSTKPush({});
    const emptyOk = resEmpty && resEmpty.success === false && typeof resEmpty.error === 'string';
    recordProbe('Phone-Invalid', 'Rejects empty argument object initiateSTKPush({})', emptyOk, resEmpty);
  } catch (err) {
    recordProbe('Phone-Invalid', 'Empty argument object threw unexpected error', false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROBE SUITE 2: Paystack Webhook Currency Boundary Rejection
// ─────────────────────────────────────────────────────────────────────────────
async function runCurrencyBoundaryProbes() {
  console.log('\n>>> SECTION 2: Paystack Webhook Currency Boundary Rejection (KES Only)');

  const nonKesCurrencies = [
    { currency: 'USD', amount: 5000, desc: 'US Dollar' },
    { currency: 'EUR', amount: 4500, desc: 'Euro' },
    { currency: 'GBP', amount: 3900, desc: 'British Pound' },
    { currency: 'UGX', amount: 15000000, desc: 'Ugandan Shilling' },
    { currency: 'TZS', amount: 12000000, desc: 'Tanzanian Shilling' },
    { currency: 'ZAR', amount: 85000, desc: 'South African Rand' },
    { currency: 'CAD', amount: 6000, desc: 'Canadian Dollar' },
    { currency: 'AUD', amount: 7000, desc: 'Australian Dollar' },
    { currency: 'JPY', amount: 750000, desc: 'Japanese Yen' },
    { currency: 'usd', amount: 5000, desc: 'Lowercase usd' },
    { currency: 'eur', amount: 4500, desc: 'Lowercase eur' },
    { currency: 'gbp', amount: 3900, desc: 'Lowercase gbp' },
    { currency: 'ugx', amount: 15000000, desc: 'Lowercase ugx' }
  ];

  for (const tc of nonKesCurrencies) {
    const ref = `pstk_test_cur_${tc.currency}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const payload = {
      event: 'charge.success',
      data: {
        id: 12345678,
        status: 'success',
        reference: ref,
        amount: tc.amount,
        currency: tc.currency,
        customer: { email: 'parent@example.com' },
        metadata: {
          email: 'parent@example.com',
          curriculum: 'CBC',
          planPeriod: 'termly'
        }
      }
    };

    const signature = signPaystackPayload(payload);

    try {
      const res = await api('/api/payment/paystack-webhook', {
        method: 'POST',
        headers: {
          'x-paystack-signature': signature,
          'Content-Type': 'application/json'
        },
        body: payload
      });

      const is400 = res.status === 400;
      const hasRejectedFlag = res.data && res.data.rejected === true;
      const hasCurrencyMsg = res.data && typeof res.data.error === 'string' && res.data.error.includes('Only KES transactions are accepted');

      const pass = is400 && hasRejectedFlag && hasCurrencyMsg;
      recordProbe(
        'Currency-Boundary',
        `Rejects non-KES currency "${tc.currency}" (${tc.desc}) with HTTP 400`,
        pass,
        pass ? null : { status: res.status, body: res.data }
      );
    } catch (err) {
      recordProbe('Currency-Boundary', `Non-KES probe for "${tc.currency}" threw fetch error`, false, err.message);
    }
  }

  // Probe canonical KES and lowercase kes to verify acceptance
  const kesCases = [
    { currency: 'KES', desc: 'Canonical uppercase KES' },
    { currency: 'kes', desc: 'Lowercase kes' },
    { currency: 'Kes', desc: 'Mixed case Kes' }
  ];

  for (const tc of kesCases) {
    const ref = `pstk_test_kes_${tc.currency}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    const payload = {
      event: 'charge.success',
      data: {
        id: 888888,
        status: 'success',
        reference: ref,
        amount: 119900, // 1,199 KES
        currency: tc.currency,
        customer: { email: 'kes_test_parent@example.com' },
        metadata: {
          email: 'kes_test_parent@example.com',
          curriculum: 'CBC',
          planPeriod: 'termly'
        }
      }
    };

    const signature = signPaystackPayload(payload);

    try {
      const res = await api('/api/payment/paystack-webhook', {
        method: 'POST',
        headers: {
          'x-paystack-signature': signature,
          'Content-Type': 'application/json'
        },
        body: payload
      });

      const is200 = res.status === 200;
      const notRejected = !res.data || res.data.rejected !== true;

      const pass = is200 && notRejected;
      recordProbe(
        'Currency-Boundary',
        `Accepts valid KES currency "${tc.currency}" (${tc.desc}) with HTTP 200`,
        pass,
        pass ? null : { status: res.status, body: res.data }
      );
    } catch (err) {
      recordProbe('Currency-Boundary', `Valid KES probe for "${tc.currency}" threw fetch error`, false, err.message);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROBE SUITE 3: Null, Missing & Extreme Payloads (Resilience)
// ─────────────────────────────────────────────────────────────────────────────
async function runNullAndExtremePayloadProbes() {
  console.log('\n>>> SECTION 3: Null, Missing & Extreme Payloads Resilience');

  // 3.1 Signature Guards (Missing, Truncated, Forged)
  const testPayload = { event: 'charge.success', data: { reference: 'pstk_test_sig', amount: 1000, currency: 'KES' } };
  const validSig = signPaystackPayload(testPayload);

  // Missing signature header
  try {
    const resNoSig = await api('/api/payment/paystack-webhook', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: testPayload
    });
    const noSigOk = resNoSig.status === 401 && resNoSig.data?.error?.includes('signature');
    recordProbe('Payload-SigGuards', 'Missing x-paystack-signature header rejected with HTTP 401', noSigOk, resNoSig);
  } catch (err) {
    recordProbe('Payload-SigGuards', 'Missing signature probe threw exception', false, err.message);
  }

  // Tampered signature header
  try {
    const resBadSig = await api('/api/payment/paystack-webhook', {
      method: 'POST',
      headers: {
        'x-paystack-signature': 'bad_forged_signature_00000000000000000000000000000000',
        'Content-Type': 'application/json'
      },
      body: testPayload
    });
    const badSigOk = resBadSig.status === 401 && resBadSig.data?.error?.includes('signature');
    recordProbe('Payload-SigGuards', 'Tampered signature rejected with HTTP 401', badSigOk, resBadSig);
  } catch (err) {
    recordProbe('Payload-SigGuards', 'Tampered signature probe threw exception', false, err.message);
  }

  // Truncated signature header (different buffer length)
  try {
    const resTruncSig = await api('/api/payment/paystack-webhook', {
      method: 'POST',
      headers: {
        'x-paystack-signature': 'abc123',
        'Content-Type': 'application/json'
      },
      body: testPayload
    });
    const truncSigOk = resTruncSig.status === 401 && resTruncSig.data?.error?.includes('signature');
    recordProbe('Payload-SigGuards', 'Truncated signature of mismatched length rejected with HTTP 401 without error', truncSigOk, resTruncSig);
  } catch (err) {
    recordProbe('Payload-SigGuards', 'Truncated signature probe threw exception', false, err.message);
  }

  // Empty string signature
  try {
    const resEmptySig = await api('/api/payment/paystack-webhook', {
      method: 'POST',
      headers: {
        'x-paystack-signature': '',
        'Content-Type': 'application/json'
      },
      body: testPayload
    });
    const emptySigOk = resEmptySig.status === 401;
    recordProbe('Payload-SigGuards', 'Empty string signature rejected with HTTP 401', emptySigOk, resEmptySig);
  } catch (err) {
    recordProbe('Payload-SigGuards', 'Empty string signature probe threw exception', false, err.message);
  }

  // 3.2 Null & Empty Payloads with Valid Signatures
  const extremePayloadCases = [
    {
      name: 'Completely empty JSON object {}',
      payload: {},
      expectedStatus: 200
    },
    {
      name: 'null data field: { event: "charge.success", data: null }',
      payload: { event: 'charge.success', data: null },
      expectedStatus: 200
    },
    {
      name: 'empty data field: { event: "charge.success", data: {} }',
      payload: { event: 'charge.success', data: {} },
      expectedStatus: 200
    },
    {
      name: 'null metadata field: { data: { metadata: null } }',
      payload: {
        event: 'charge.success',
        data: {
          reference: 'pstk_null_meta_' + Date.now(),
          amount: 10000,
          currency: 'KES',
          metadata: null
        }
      },
      expectedStatus: 200
    },
    {
      name: 'string metadata field: { data: { metadata: "not-an-object" } }',
      payload: {
        event: 'charge.success',
        data: {
          reference: 'pstk_str_meta_' + Date.now(),
          amount: 10000,
          currency: 'KES',
          metadata: 'unexpected string metadata'
        }
      },
      expectedStatus: 200
    },
    {
      name: 'array metadata field: { data: { metadata: [1, 2, 3] } }',
      payload: {
        event: 'charge.success',
        data: {
          reference: 'pstk_arr_meta_' + Date.now(),
          amount: 10000,
          currency: 'KES',
          metadata: [1, 2, 3]
        }
      },
      expectedStatus: 200
    },
    {
      name: 'null customer field: { data: { customer: null } }',
      payload: {
        event: 'charge.success',
        data: {
          reference: 'pstk_null_cust_' + Date.now(),
          amount: 10000,
          currency: 'KES',
          customer: null,
          metadata: null
        }
      },
      expectedStatus: 200
    },
    {
      name: 'string customer field: { data: { customer: "parent@example.com" } }',
      payload: {
        event: 'charge.success',
        data: {
          reference: 'pstk_str_cust_' + Date.now(),
          amount: 10000,
          currency: 'KES',
          customer: 'parent@example.com',
          metadata: null
        }
      },
      expectedStatus: 200
    },
    {
      name: 'Amount = 0: { data: { amount: 0 } }',
      payload: {
        event: 'charge.success',
        data: {
          reference: 'pstk_amt_zero_' + Date.now(),
          amount: 0,
          currency: 'KES',
          metadata: { email: 'zero@example.com' }
        }
      },
      expectedStatus: 200
    },
    {
      name: 'Negative amount: { data: { amount: -50000 } }',
      payload: {
        event: 'charge.success',
        data: {
          reference: 'pstk_amt_neg_' + Date.now(),
          amount: -50000,
          currency: 'KES',
          metadata: { email: 'neg@example.com' }
        }
      },
      expectedStatus: 200
    },
    {
      name: 'Huge amount (1e12): { data: { amount: 1000000000000 } }',
      payload: {
        event: 'charge.success',
        data: {
          reference: 'pstk_amt_huge_' + Date.now(),
          amount: 1000000000000,
          currency: 'KES',
          metadata: { email: 'huge@example.com' }
        }
      },
      expectedStatus: 200
    },
    {
      name: 'String amount: { data: { amount: "non_numeric_amount" } }',
      payload: {
        event: 'charge.success',
        data: {
          reference: 'pstk_amt_str_' + Date.now(),
          amount: 'non_numeric_amount',
          currency: 'KES',
          metadata: { email: 'str@example.com' }
        }
      },
      expectedStatus: 200
    },
    {
      name: 'Unhandled event: { event: "transfer.success" }',
      payload: {
        event: 'transfer.success',
        data: { id: 9999 }
      },
      expectedStatus: 200
    },
    {
      name: 'Null event: { event: null, data: {} }',
      payload: {
        event: null,
        data: {}
      },
      expectedStatus: 200
    },
    {
      name: 'Arbitrary custom event: { event: "custom.event.v1", data: { foo: "bar" } }',
      payload: {
        event: 'custom.event.v1',
        data: { foo: 'bar' }
      },
      expectedStatus: 200
    }
  ];

  for (const tc of extremePayloadCases) {
    const raw = JSON.stringify(tc.payload);
    const sig = crypto.createHmac('sha512', paystackService.PAYSTACK_SECRET_KEY).update(raw).digest('hex');

    try {
      const res = await api('/api/payment/paystack-webhook', {
        method: 'POST',
        headers: {
          'x-paystack-signature': sig,
          'Content-Type': 'application/json'
        },
        body: raw
      });

      // Crucial verification: Must NEVER return HTTP 500 (Unhandled Server Error)
      const isNot500 = res.status !== 500;
      const matchesExpected = res.status === tc.expectedStatus;
      const pass = isNot500 && matchesExpected;

      recordProbe(
        'Payload-Resilience',
        `Handles ${tc.name} without 500 exception (HTTP ${res.status})`,
        pass,
        pass ? null : { status: res.status, body: res.data }
      );
    } catch (err) {
      recordProbe('Payload-Resilience', `Payload "${tc.name}" threw client fetch exception`, false, err.message);
    }
  }

  // 3.3 Malformed JSON String (SyntaxError handling)
  try {
    const brokenJson = '{"broken": json without closing brace';
    const sigBroken = crypto.createHmac('sha512', paystackService.PAYSTACK_SECRET_KEY).update(brokenJson).digest('hex');

    const resMalformed = await api('/api/payment/paystack-webhook', {
      method: 'POST',
      headers: {
        'x-paystack-signature': sigBroken,
        'Content-Type': 'application/json'
      },
      body: brokenJson
    });

    // Should return HTTP 400 from express syntax error handler, not an unhandled 500 crash
    const malformedOk = resMalformed.status === 400;
    recordProbe(
      'Payload-Resilience',
      'Malformed JSON string caught gracefully with HTTP 400 (not 500 crash)',
      malformedOk,
      resMalformed
    );
  } catch (err) {
    recordProbe('Payload-Resilience', 'Malformed JSON probe threw client fetch exception', false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROBE SUITE 4: Direct Checkout & Payment Endpoint Boundaries
// ─────────────────────────────────────────────────────────────────────────────
async function runDirectEndpointBoundaryProbes() {
  console.log('\n>>> SECTION 4: Direct Checkout & Payment Endpoint Boundaries');

  // 4.1 POST /api/payment/paystack/initialize
  // Missing email
  try {
    const resNoEmail = await api('/api/payment/paystack/initialize', {
      method: 'POST',
      body: { curriculum: 'CBC', planPeriod: 'termly' }
    });
    const noEmailOk = resNoEmail.status === 400 && resNoEmail.data?.error?.includes('email');
    recordProbe('Checkout-Init', 'Reject initialization without email (HTTP 400)', noEmailOk, resNoEmail);
  } catch (err) {
    recordProbe('Checkout-Init', 'Initialization no-email test threw error', false, err.message);
  }

  // Zero / negative amount with no valid plan
  try {
    const resZeroAmt = await api('/api/payment/paystack/initialize', {
      method: 'POST',
      body: { email: 'parent@example.com', amountKsh: 0, planPeriod: 'invalid_period', tier: 'invalid_tier' }
    });
    // calculateExpectedPrice resolves fallback or zero -> should reject or calculate standard price
    const zeroOk = resZeroAmt.status === 400 || (resZeroAmt.status === 200 && resZeroAmt.data.amountKsh > 0);
    recordProbe('Checkout-Init', 'Enforces positive server price or rejects zero price', zeroOk, resZeroAmt);
  } catch (err) {
    recordProbe('Checkout-Init', 'Zero amount initialization test threw error', false, err.message);
  }

  // Successful initialization in simulation mode
  try {
    const resInit = await api('/api/payment/paystack/initialize', {
      method: 'POST',
      body: {
        email: 'parent_boundary_test@example.com',
        curriculum: 'CBC',
        planPeriod: 'termly'
      }
    });

    const initOk = resInit.status === 200 &&
      resInit.data?.success === true &&
      resInit.data?.amountKsh === 1199 && // Canonical CBC termly price
      resInit.data?.currency === 'KES' &&
      typeof resInit.data?.authorizationUrl === 'string' &&
      typeof resInit.data?.accessCode === 'string' &&
      typeof resInit.data?.reference === 'string';

    recordProbe('Checkout-Init', 'Valid CBC termly initialization returns KES 1,199 checkout URL', initOk, resInit);
  } catch (err) {
    recordProbe('Checkout-Init', 'Valid initialization test threw error', false, err.message);
  }

  // 4.2 POST /api/payment/confirm (Deprecated Client Self-Activation Endpoint)
  try {
    const resConfirmDirect = await api('/api/payment/confirm', {
      method: 'POST',
      body: {
        intentId: 'pi_fake_123',
        tier: 'premium'
      }
    });

    // Per R1, direct client-sent tier self-activation MUST be rejected with HTTP 403
    const directRejected = resConfirmDirect.status === 403 &&
      resConfirmDirect.data?.error?.includes('deprecated and forbidden');

    recordProbe('Gatekeeping', 'Direct self-activation via POST /api/payment/confirm blocked with HTTP 403', directRejected, resConfirmDirect);
  } catch (err) {
    recordProbe('Gatekeeping', 'Confirm endpoint test threw error', false, err.message);
  }

  // 4.3 POST /api/payment/mpesa-stk-push Boundaries
  // Missing required fields
  try {
    const resEmptyStk = await api('/api/payment/mpesa-stk-push', {
      method: 'POST',
      body: {}
    });
    const emptyStkOk = resEmptyStk.status === 400 && resEmptyStk.data?.error?.includes('required');
    recordProbe('STKPush-Endpoint', 'Reject empty STK push request with HTTP 400', emptyStkOk, resEmptyStk);
  } catch (err) {
    recordProbe('STKPush-Endpoint', 'Empty STK push test threw error', false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROBE SUITE 5: Paystack Service Module Unit Boundaries
// ─────────────────────────────────────────────────────────────────────────────
async function runPaystackServiceModuleProbes() {
  console.log('\n>>> SECTION 5: Paystack Service Module Unit Boundaries');

  // 5.1 initializeTransaction unit checks
  try {
    const resInit = await paystackService.initializeTransaction({
      email: 'unit@example.com',
      amountKsh: 8900 // British termly
    });

    const hasSim = resInit && resInit.simulated === true;
    const hasAuth = resInit && resInit.authorizationUrl && resInit.authorizationUrl.startsWith('https://checkout.paystack.com/');
    const hasSubunits = resInit && resInit.amount === 890000; // Subunits (8900 * 100)
    const hasKES = resInit && resInit.currency === 'KES';

    const unitInitOk = hasSim && hasAuth && hasSubunits && hasKES;
    recordProbe('PaystackService-Unit', 'initializeTransaction produces simulation URL and subunit cents', unitInitOk, resInit);
  } catch (err) {
    recordProbe('PaystackService-Unit', 'initializeTransaction unit probe threw error', false, err.message);
  }

  // 5.2 verifyWebhookSignature timing-safe unit checks
  try {
    const sampleBody = JSON.stringify({ hello: 'world' });
    const realSig = crypto.createHmac('sha512', paystackService.PAYSTACK_SECRET_KEY).update(sampleBody).digest('hex');

    const validCheck = paystackService.verifyWebhookSignature(sampleBody, realSig);
    const badCheck = paystackService.verifyWebhookSignature(sampleBody, 'wrong_hex_signature');
    const emptySig = paystackService.verifyWebhookSignature(sampleBody, '');
    const nullSig = paystackService.verifyWebhookSignature(sampleBody, null);
    const nullBody = paystackService.verifyWebhookSignature(null, realSig);
    const emptyBody = paystackService.verifyWebhookSignature('', realSig);

    const timingSafeOk = validCheck === true &&
      badCheck === false &&
      emptySig === false &&
      nullSig === false &&
      nullBody === false &&
      emptyBody === false;

    recordProbe('PaystackService-Unit', 'verifyWebhookSignature strictly validates HMAC-SHA512 with timing safety', timingSafeOk, {
      validCheck, badCheck, emptySig, nullSig, nullBody, emptyBody
    });
  } catch (err) {
    recordProbe('PaystackService-Unit', 'verifyWebhookSignature unit probe threw error', false, err.message);
  }

  // 5.3 verifyTransaction unit checks
  try {
    const resVer = await paystackService.verifyTransaction('pstk_sample_ref_123');
    const verOk = resVer && resVer.success === true && resVer.simulated === true && resVer.data?.reference === 'pstk_sample_ref_123';
    recordProbe('PaystackService-Unit', 'verifyTransaction provides simulated verification fallback', verOk, resVer);

    const resEmptyVer = await paystackService.verifyTransaction('');
    const emptyVerOk = resEmptyVer && resEmptyVer.success === false && resEmptyVer.error;
    recordProbe('PaystackService-Unit', 'verifyTransaction rejects empty reference', emptyVerOk, resEmptyVer);
  } catch (err) {
    recordProbe('PaystackService-Unit', 'verifyTransaction unit probe threw error', false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN RUNNER
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log('════════════════════════════════════════════════════════════════');
  console.log('EMPIRICAL CHALLENGER M3-2: PHONE NORMALIZATION & BOUNDARIES HARNESS');
  console.log('════════════════════════════════════════════════════════════════\n');

  backupFiles();

  try {
    // Probes that do not require running HTTP server
    await runPhoneNormalizationProbes();
    await runPaystackServiceModuleProbes();

    // Start server for HTTP boundary probes
    await startServer();
    await runCurrencyBoundaryProbes();
    await runNullAndExtremePayloadProbes();
    await runDirectEndpointBoundaryProbes();
  } catch (err) {
    console.error('\n❌ Uncaught error during challenge execution:', err);
    failedProbes++;
    failures.push({ section: 'EXECUTION', title: 'Uncaught runner exception', details: err.message });
  } finally {
    stopServer();
    restoreFiles();
  }

  console.log('\n════════════════════════════════════════════════════════════════');
  console.log(`TOTAL ADVERSARIAL PROBES RUN: ${totalProbes}`);
  console.log(`PASSED: ${passedProbes}`);
  console.log(`FAILED: ${failedProbes}`);
  console.log('════════════════════════════════════════════════════════════════');

  if (failures.length > 0) {
    console.error('\n⚠️ SUMMARY OF FAILED PROBES:');
    failures.forEach((f, idx) => {
      console.error(`${idx + 1}. [${f.section}] ${f.title}`);
      if (f.details) {
        console.error(`   Details: ${typeof f.details === 'object' ? JSON.stringify(f.details) : f.details}`);
      }
    });
    process.exit(1);
  } else {
    console.log('\n🎉 ALL ADVERSARIAL BOUNDARY PROBES PASSED EMPIRICALLY!');
    process.exit(0);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
