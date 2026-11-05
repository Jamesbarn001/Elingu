// ════════════════════════════════════════════════════════════
// tests/test_challenger_m2_empirical.js
// EMPIRICAL CHALLENGER ADVERSARIAL TEST HARNESS — MILESTONE 2
// Challenger: challenger_m2_1 (teamwork_preview_challenger)
// Scope:
//   1. VAT Arithmetic Precision (1,000+ diverse gross amounts)
//   2. B2B Self-Serve Rejection on POST /api/payment/initiate
//   3. Plan Period Tampering & Boundary Validation
//   4. Positive Price Tampering & Server Price Authority
// ════════════════════════════════════════════════════════════

const assert = require('assert');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const pricingConfig = require('../pricingConfig');
const { calculateVatBreakdown } = pricingConfig;

const PORT = process.env.TEST_PORT || 3098;
const BASE_URL = `http://localhost:${PORT}`;

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const failureDetails = [];

function recordCheck(name, passed, details = null) {
  totalAssertions++;
  if (passed) {
    passedAssertions++;
    console.log(`  [PASS] ${name}`);
  } else {
    failedAssertions++;
    console.error(`  [FAIL] ${name}`);
    if (details) {
      console.error(`         Details: ${details}`);
    }
    failureDetails.push({ name, details });
  }
}

// ─────────────────────────────────────────────────────────────
// SECTION 1: PROBE calculateVatBreakdown ACROSS 1,000+ AMOUNTS
// ─────────────────────────────────────────────────────────────
function probeVatBreakdownPrecision() {
  console.log('\n================================================================');
  console.log('PROBE SUITE 1: VAT Arithmetic Precision & Penny-Exact Breakdown');
  console.log('================================================================');

  let vatTestCount = 0;
  let vatFailures = 0;

  // 1.1 Fixed catalogue and milestone amounts
  const fixedAmounts = [
    0, 0.01, 0.02, 0.05, 0.07, 0.08, 0.09, 0.10, 0.50, 0.99, 1.00, 1.15, 1.16, 1.17, 2.32,
    499,      // CBC Monthly / CBC Bootcamp Pass
    1199,     // CBC Termly
    3499,     // CBC Annual
    3500,     // British Monthly
    8900,     // British Termly
    12900,    // British Exam Season Pass
    24500,    // British Annual
    1798,     // Family Model A CBC
    1999,     // Family Model B CBC
    2199,     // Family Model C CBC
    2499,     // Family Monthly CBC
    7999,     // Family Monthly British
    13350,    // Family Model A British
    14900,    // Family Model B British
    16500,    // Family Model C British
    19990,    // Family Annual CBC
    79999,    // Family Annual British
    1800,     // B2B annual per student
    45000,    // B2B school lab licence termly
    75000,    // B2B school lab licence annual
    600,      // B2B2C fee slip levy
    999999,   // High value
    10000000  // 10,000,000 KES large value
  ];

  for (const gross of fixedAmounts) {
    vatTestCount++;
    const res = calculateVatBreakdown(gross);
    const sumCents = Math.round((res.netBase + res.vatAmount) * 100);
    const grossCents = Math.round(res.grossTotal * 100);
    const match = sumCents === grossCents && res.vatRate === 0.16 && res.isInclusive === true;
    if (!match) {
      vatFailures++;
      recordCheck(`Fixed Gross KES ${gross}`, false, `sumCents=${sumCents}, grossCents=${grossCents}, res=${JSON.stringify(res)}`);
    }
  }

  // 1.2 Programmatic 1,000 diverse gross amounts (fractions, small, odd, large)
  // Generates 1,000 distinct values:
  // - 300 cents stepped from KES 0.01 to 3.00
  // - 300 random medium values with odd cents (KES 3.01 to 9,999.99)
  // - 200 large random values (KES 10,000 to 10,000,000)
  // - 200 recurring fractional values (1/3, 2/3, 1/7, 5/13, 0.001, 10.555, etc.)
  const generatedAmounts = [];
  for (let i = 1; i <= 300; i++) {
    generatedAmounts.push(i / 100);
  }
  for (let i = 0; i < 300; i++) {
    const val = (Math.random() * 9996 + 3);
    generatedAmounts.push(Math.round(val * 100) / 100);
  }
  for (let i = 0; i < 200; i++) {
    const val = (Math.random() * 9990000 + 10000);
    generatedAmounts.push(Math.round(val * 100) / 100);
  }
  const fractionBase = [1/3, 2/3, 1/6, 5/6, 1/7, 2/7, 3/7, 4/7, 5/7, 6/7, 1/9, 2/9, 4/9, 5/9, 7/9, 8/9, 1/11, 1/13, 1/17, 1/19];
  for (let i = 0; i < 200; i++) {
    const base = fractionBase[i % fractionBase.length];
    const multiplier = Math.pow(10, (i % 6));
    generatedAmounts.push(base * multiplier);
  }

  for (const gross of generatedAmounts) {
    vatTestCount++;
    const res = calculateVatBreakdown(gross);
    const sumCents = Math.round((res.netBase + res.vatAmount) * 100);
    const grossCents = Math.round(res.grossTotal * 100);
    const rateValid = res.vatRate === 0.16;
    const incValid = res.isInclusive === true;
    if (sumCents !== grossCents || !rateValid || !incValid) {
      vatFailures++;
      recordCheck(`Generated Gross KES ${gross}`, false, `sumCents=${sumCents}, grossCents=${grossCents}, res=${JSON.stringify(res)}`);
    }
  }

  // 1.3 Edge cases: string number, zero, negative, null, NaN
  const edgeCases = [
    { input: '499', expectedGross: 499 },
    { input: '1199.50', expectedGross: 1199.50 },
    { input: '8900', expectedGross: 8900 },
    { input: null, expectedGross: 0 },
    { input: undefined, expectedGross: 0 },
    { input: 'invalid_string', expectedGross: 0 },
    { input: -100, expectedGross: -100 }
  ];

  for (const ec of edgeCases) {
    vatTestCount++;
    const res = calculateVatBreakdown(ec.input);
    const sumCents = Math.round((res.netBase + res.vatAmount) * 100);
    const grossCents = Math.round(res.grossTotal * 100);
    const match = sumCents === grossCents && res.grossTotal === ec.expectedGross;
    if (!match) {
      vatFailures++;
      recordCheck(`Edge Case Gross "${ec.input}"`, false, `sumCents=${sumCents}, grossCents=${grossCents}, res=${JSON.stringify(res)}`);
    }
  }

  recordCheck(
    `calculateVatBreakdown penny-exact precision across ${vatTestCount} diverse amounts`,
    vatFailures === 0,
    vatFailures === 0 ? `100% invariant compliance across all ${vatTestCount} samples` : `${vatFailures} / ${vatTestCount} failed`
  );
}

// ─────────────────────────────────────────────────────────────
// HTTP TEST HARNESS SETUP
// ─────────────────────────────────────────────────────────────
let serverProc = null;

async function startServer() {
  console.log(`\n📡 Spawning Elingu challenger server on port ${PORT}...`);
  serverProc = spawn(process.execPath, ['server.js'], {
    cwd: path.resolve(__dirname, '..'),
    env: { ...process.env, PORT: String(PORT), NODE_ENV: 'test' },
    stdio: 'ignore'
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
// SECTION 2: B2B SELF-SERVE REJECTION ON POST /api/payment/initiate
// ─────────────────────────────────────────────────────────────
async function probeB2BSelfServeRejection() {
  console.log('\n================================================================');
  console.log('PROBE SUITE 2: B2B Self-Serve Checkout Rejection & Boundary Leakage');
  console.log('================================================================');

  const EXPECTED_ERROR = 'B2B school licences require administrative onboarding.';

  const b2bPayloads = [
    {
      name: 'curriculum = "b2b" (lowercase)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'b2b', planPeriod: 'termly' }
    },
    {
      name: 'curriculum = "B2B" (uppercase)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'B2B', planPeriod: 'termly' }
    },
    {
      name: 'curriculum = "B2b" (mixed case)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'B2b', planPeriod: 'termly' }
    },
    {
      name: 'curriculum = "school" (school keyword)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'school', planPeriod: 'termly' }
    },
    {
      name: 'curriculum = "SCHOOL" (school keyword uppercase)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'SCHOOL', planPeriod: 'termly' }
    },
    {
      name: 'curriculum = "b2b_school" (catalogue tier as curriculum)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'b2b_school', planPeriod: 'termly' }
    },
    {
      name: 'planPeriod = "school_licence" (licence keyword)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'CBC', planPeriod: 'school_licence' }
    },
    {
      name: 'planPeriod = "school_license" (license keyword)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'CBC', planPeriod: 'school_license' }
    },
    {
      name: 'planPeriod = "school" (school keyword in period)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'CBC', planPeriod: 'school' }
    },
    {
      name: 'planPeriod = "annual_per_student" (official B2B catalogue pricing key)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'CBC', planPeriod: 'annual_per_student' }
    },
    {
      name: 'tier = "school" (institutional tier injection)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'CBC', tier: 'school', planPeriod: 'termly' }
    },
    {
      name: 'tier = "b2b_school" (official B2B tier injection)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'CBC', tier: 'b2b_school', planPeriod: 'termly' }
    },
    {
      name: 'tier = "igcse_school" (institutional Cambridge tier injection)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'BRITISH', tier: 'igcse_school', planPeriod: 'termly' }
    },
    {
      name: 'period = "school_licence" (alias property)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'CBC', period: 'school_licence' }
    },
    {
      name: 'billingCycle = "school_licence" (alias property)',
      payload: { email: 'admin@school.ac.ke', curriculum: 'CBC', billingCycle: 'school_licence' }
    }
  ];

  for (const testCase of b2bPayloads) {
    try {
      const resp = await fetch(`${BASE_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase.payload)
      });
      const data = await resp.json();

      const isStatus400 = resp.status === 400;
      const hasB2BError = data.error === EXPECTED_ERROR;

      if (isStatus400 && hasB2BError) {
        recordCheck(`B2B Guard rejects: ${testCase.name}`, true);
      } else {
        recordCheck(
          `B2B Guard rejects: ${testCase.name}`,
          false,
          `Status: ${resp.status} (expected 400), Error: "${data.error || JSON.stringify(data)}" (expected "${EXPECTED_ERROR}")`
        );
      }
    } catch (err) {
      recordCheck(`B2B Guard rejects: ${testCase.name}`, false, `Network / request error: ${err.message}`);
    }
  }
}

// ─────────────────────────────────────────────────────────────
// SECTION 3: PLAN PERIOD TAMPERING & BOUNDARY VALIDATION
// ─────────────────────────────────────────────────────────────
async function probePlanPeriodTampering() {
  console.log('\n================================================================');
  console.log('PROBE SUITE 3: Plan Period Tampering & Boundary Validation');
  console.log('================================================================');

  const invalidPeriods = [
    'lifetime',
    'custom',
    'invalid',
    'forever',
    'vip',
    'hacked',
    'unlimited',
    'promo_99'
  ];

  for (const badPeriod of invalidPeriods) {
    try {
      const resp = await fetch(`${BASE_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'attacker@example.com',
          curriculum: 'CBC',
          planPeriod: badPeriod
        })
      });
      const data = await resp.json();

      const is400 = resp.status === 400;
      const isExpectedError = data.error === 'Invalid plan period.';

      recordCheck(
        `Tampered planPeriod "${badPeriod}" rejected with HTTP 400`,
        is400 && isExpectedError,
        `Status: ${resp.status}, Error: "${data.error}"`
      );
    } catch (err) {
      recordCheck(`Tampered planPeriod "${badPeriod}" rejected with HTTP 400`, false, err.message);
    }
  }

  // Probe British 7-day free trial checkout rejection
  try {
    const trialResp = await fetch(`${BASE_URL}/api/payment/initiate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'parent@example.com',
        curriculum: 'BRITISH',
        planPeriod: 'trial'
      })
    });
    const trialData = await trialResp.json();
    recordCheck(
      'Free trial (7d, KES 0) checkout rejected with HTTP 400',
      trialResp.status === 400 && trialData.error === 'Free trials do not require payment checkout.',
      `Status: ${trialResp.status}, Error: "${trialData.error}"`
    );
  } catch (err) {
    recordCheck('Free trial checkout rejected with HTTP 400', false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────
// SECTION 4: POSITIVE PRICE TAMPERING & SERVER PRICE AUTHORITY
// ─────────────────────────────────────────────────────────────
async function probePriceTamperingAndServerAuthority() {
  console.log('\n================================================================');
  console.log('PROBE SUITE 4: Positive Price Tampering & Server Price Authority');
  console.log('================================================================');

  const tamperCases = [
    {
      curriculum: 'BRITISH',
      planPeriod: 'annual',
      tamperedClientAmount: 1,
      expectedCataloguePrice: 24500,
      label: 'British Annual (KES 24,500) tampered with amount: 1'
    },
    {
      curriculum: 'BRITISH',
      planPeriod: 'termly',
      tamperedClientAmount: 10,
      expectedCataloguePrice: 8900,
      label: 'British Termly (KES 8,900) tampered with amount: 10'
    },
    {
      curriculum: 'BRITISH',
      planPeriod: 'monthly',
      tamperedClientAmount: 100,
      expectedCataloguePrice: 3500,
      label: 'British Monthly (KES 3,500) tampered with amount: 100'
    },
    {
      curriculum: 'BRITISH',
      planPeriod: 'exam_season_pass',
      tamperedClientAmount: 1,
      expectedCataloguePrice: 12900,
      label: 'British Exam Season Pass (KES 12,900) tampered with amount: 1'
    },
    {
      curriculum: 'CBC',
      planPeriod: 'annual',
      tamperedClientAmount: 50,
      expectedCataloguePrice: 3499,
      label: 'CBC Annual (KES 3,499) tampered with amount: 50'
    },
    {
      curriculum: 'CBC',
      planPeriod: 'termly',
      tamperedClientAmount: 1,
      expectedCataloguePrice: 1199,
      label: 'CBC Termly (KES 1,199) tampered with amount: 1'
    },
    {
      curriculum: 'CBC',
      planPeriod: 'monthly',
      tamperedClientAmount: 5,
      expectedCataloguePrice: 499,
      label: 'CBC Monthly (KES 499) tampered with amount: 5'
    },
    {
      curriculum: 'CBC',
      planPeriod: 'bootcamp',
      tamperedClientAmount: 1,
      expectedCataloguePrice: 499,
      label: 'CBC Holiday Bootcamp Pass (KES 499) tampered with amount: 1'
    },
    {
      curriculum: 'CBC',
      planPeriod: 'termly',
      tamperedClientAmount: 999999,
      expectedCataloguePrice: 1199,
      label: 'CBC Termly (KES 1,199) inflated with amount: 999,999'
    }
  ];

  for (const tc of tamperCases) {
    try {
      const resp = await fetch(`${BASE_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'parent@example.com',
          curriculum: tc.curriculum,
          planPeriod: tc.planPeriod,
          amount: tc.tamperedClientAmount
        })
      });
      const data = await resp.json();

      const is200 = resp.status === 200;
      const isAuthoritative = data.amount === tc.expectedCataloguePrice;

      recordCheck(
        `Server price authority overrides tampering: ${tc.label}`,
        is200 && isAuthoritative,
        `Status: ${resp.status}, Charged: KES ${data.amount} (Expected KES ${tc.expectedCataloguePrice}, Client sent KES ${tc.tamperedClientAmount})`
      );
    } catch (err) {
      recordCheck(`Server price authority overrides tampering: ${tc.label}`, false, err.message);
    }
  }

  // Non-positive amount validations (0, negative, NaN)
  const nonPositiveCases = [
    { amount: 0, label: 'amount: 0 rejected with HTTP 400' },
    { amount: -500, label: 'amount: -500 rejected with HTTP 400' },
    { amount: 'free', label: 'amount: "free" string rejected with HTTP 400' }
  ];

  for (const npc of nonPositiveCases) {
    try {
      const resp = await fetch(`${BASE_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'parent@example.com',
          curriculum: 'CBC',
          planPeriod: 'termly',
          amount: npc.amount
        })
      });
      const data = await resp.json();
      recordCheck(
        npc.label,
        resp.status === 400 && data.error === 'Payment amount must be greater than zero.',
        `Status: ${resp.status}, Body: ${JSON.stringify(data)}`
      );
    } catch (err) {
      recordCheck(npc.label, false, err.message);
    }
  }
}

// ─────────────────────────────────────────────────────────────
// MAIN EXECUTION
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log('╔══════════════════════════════════════════════════════════════╗');
  console.log('║  ELINGU CHALLENGER M2-1 EMPIRICAL ADVERSARIAL TEST SUITE    ║');
  console.log('╚══════════════════════════════════════════════════════════════╝');

  try {
    // Section 1: VAT Arithmetic Precision (unit/computational)
    probeVatBreakdownPrecision();

    // Start server for Section 2, 3, 4
    await startServer();

    // Section 2: B2B Self-Serve Rejection
    await probeB2BSelfServeRejection();

    // Section 3: Plan Period Tampering
    await probePlanPeriodTampering();

    // Section 4: Positive Price Tampering & Server Price Authority
    await probePriceTamperingAndServerAuthority();

  } catch (err) {
    console.error('Fatal harness error:', err);
  } finally {
    stopServer();

    console.log('\n================================================================');
    console.log('CHALLENGER M2-1 HARNESS SUMMARY');
    console.log('================================================================');
    console.log(`Total Checks:     ${totalAssertions}`);
    console.log(`Passed Checks:    ${passedAssertions}`);
    console.log(`Failed Checks:    ${failedAssertions}`);
    console.log('================================================================\n');

    if (failureDetails.length > 0) {
      console.log('Detailed Failures:');
      failureDetails.forEach((f, idx) => {
        console.log(`  ${idx + 1}. [${f.name}]`);
        if (f.details) console.log(`     -> ${f.details}`);
      });
      console.log('');
    }

    // Exit code 0 if all pass, 1 if any fail
    process.exit(failedAssertions === 0 ? 0 : 1);
  }
}

main();
