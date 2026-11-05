/**
 * Empirical Adversarial Challenger Test Suite: Milestone 2 Lifecycle & Grace Period
 * Challenger: challenger_m2_2 (teamwork_preview_challenger)
 * Target: pricingConfig.js (calculateSubscriptionLifecycle & getReminderSchedule)
 */

const assert = require('assert');
const path = require('path');
const pricingConfig = require('../pricingConfig');

const ONE_DAY_MS = 86400000;
const THREE_DAYS_MS = 3 * ONE_DAY_MS; // 259,200,000 ms = 72 hours

let totalProbes = 0;
let passedProbes = 0;
let failedProbes = 0;
const failureLog = [];

function recordProbe(title, success, details = null) {
  totalProbes++;
  if (success) {
    passedProbes++;
    console.log(`  [PASS] ${title}`);
  } else {
    failedProbes++;
    console.error(`  [FAIL] ${title}`);
    if (details) {
      console.error(`         Detail: ${details}`);
    }
    failureLog.push({ title, details });
  }
}

console.log('================================================================');
console.log('CHALLENGER M2-2: EMPIRICAL LIFECYCLE, BOUNDARY & GRACE HARNESS');
console.log('================================================================\n');

// ─────────────────────────────────────────────────────────────
// PROBE SUITE 1: PLAN PERIOD MAPPINGS & MILLISECOND PRECISION
// ─────────────────────────────────────────────────────────────
console.log('>>> SECTION 1: Plan Period Duration & Millisecond Precision');

// Expected durations per specification & catalogue definitions:
// termly: 105 days
// monthly: 30 days
// annual: 365 days
// trial: 7 days
// bootcamp: 21 days
// exam season pass: 181 days
const periodTestCases = [
  // Canonical names
  { input: 'termly', expectedDays: 105, desc: 'Standard Termly' },
  { input: 'monthly', expectedDays: 30, desc: 'Standard Monthly' },
  { input: 'annual', expectedDays: 365, desc: 'Standard Annual' },
  { input: 'trial', expectedDays: 7, desc: 'Standard Trial' },
  { input: 'bootcamp', expectedDays: 21, desc: 'CBC Holiday Bootcamp' },
  { input: 'exam_season_pass', expectedDays: 181, desc: 'British Exam Season Pass (snake_case)' },

  // Catalogue keys directly exported by BRITISH_CATALOGUE and CBC_CATALOGUE
  { input: 'examSeasonPass', expectedDays: 181, desc: 'British Exam Season Pass (camelCase catalogue key)' },
  { input: 'exam_pass', expectedDays: 181, desc: 'British Exam Pass (catalogue alias)' },
  { input: 'bootcampPass', expectedDays: 21, desc: 'CBC Bootcamp Pass (camelCase catalogue key)' },
  { input: 'holidayBootcampPass', expectedDays: 21, desc: 'CBC Holiday Bootcamp Pass (camelCase catalogue alias)' },
  { input: 'holiday_bootcamp', expectedDays: 21, desc: 'CBC Holiday Bootcamp (snake_case alias)' },
  { input: 'holiday_bootcamp_pass', expectedDays: 21, desc: 'CBC Holiday Bootcamp Pass (snake_case worker log alias)' },
  { input: 'trial_7d', expectedDays: 7, desc: 'British 7-Day Trial (worker changes.md alias)' },
  { input: 'free_trial', expectedDays: 7, desc: 'Free trial alias' },

  // Case insensitivity & formatting
  { input: 'TERMLY', expectedDays: 105, desc: 'Uppercase TERMLY' },
  { input: '  monthly  ', expectedDays: 30, desc: 'Padded monthly' },
  { input: 'Yearly', expectedDays: 365, desc: 'Yearly alias' },
  { input: 'year', expectedDays: 365, desc: 'Year alias' },
  { input: 'month', expectedDays: 30, desc: 'Month alias' },
  { input: 'term', expectedDays: 105, desc: 'Term alias' }
];

const fixedStart = new Date('2026-05-01T08:00:00.000Z');

for (const tc of periodTestCases) {
  try {
    const res = pricingConfig.calculateSubscriptionLifecycle({
      startDate: fixedStart,
      planPeriod: tc.input
    });

    const actualDurationMs = res.expiresAt.getTime() - res.startsAt.getTime();
    const expectedDurationMs = tc.expectedDays * ONE_DAY_MS;
    const actualDays = res.durationDays;

    const matchesDays = actualDays === tc.expectedDays;
    const matchesMs = actualDurationMs === expectedDurationMs;

    recordProbe(
      `Plan period "${tc.input}" (${tc.desc}) -> ${tc.expectedDays} days`,
      matchesDays && matchesMs,
      `expected ${tc.expectedDays}d (${expectedDurationMs}ms), got durationDays=${actualDays}, deltaMs=${actualDurationMs}`
    );
  } catch (err) {
    recordProbe(`Plan period "${tc.input}" (${tc.desc}) threw error`, false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────
// PROBE SUITE 2: EXACT 3-DAY (72-HOUR) GRACE PERIOD PRECISION
// ─────────────────────────────────────────────────────────────
console.log('\n>>> SECTION 2: Exact 3-Day (72-Hour) Post-Expiry Grace Period Invariant');

for (const tc of periodTestCases) {
  try {
    const res = pricingConfig.calculateSubscriptionLifecycle({
      startDate: fixedStart,
      planPeriod: tc.input
    });

    const graceMs = res.gracePeriodEndsAt.getTime() - res.expiresAt.getTime();
    const graceDays = res.graceDays;

    const exact72h = graceMs === THREE_DAYS_MS;
    const exact3Days = graceDays === 3;

    recordProbe(
      `Grace duration for "${tc.input}": exactly 72h (259,200,000ms)`,
      exact72h && exact3Days,
      `expected 259,200,000ms and graceDays=3, got ${graceMs}ms, graceDays=${graceDays}`
    );
  } catch (err) {
    recordProbe(`Grace duration check for "${tc.input}" threw error`, false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────
// PROBE SUITE 3: ENCOUNTERED ACCESS STATES AT MILLISECOND BOUNDARIES
// ─────────────────────────────────────────────────────────────
console.log('\n>>> SECTION 3: Simulated Entitlement States at +/- 1ms Boundaries');

// Standard entitlement evaluation helper according to R2 & AC:
// - timestamp < startsAt: NOT_STARTED
// - startsAt <= timestamp <= expiresAt: ACTIVE
// - expiresAt < timestamp <= gracePeriodEndsAt: IN_GRACE (Active access preserved)
// - timestamp > gracePeriodEndsAt: EXPIRED / SUSPENDED
function evaluateEntitlement(timestamp, lifecycle) {
  const t = timestamp instanceof Date ? timestamp.getTime() : Number(timestamp);
  const s = lifecycle.startsAt.getTime();
  const e = lifecycle.expiresAt.getTime();
  const g = lifecycle.gracePeriodEndsAt.getTime();

  if (t < s) return 'NOT_STARTED';
  if (t <= e) return 'ACTIVE';
  if (t <= g) return 'IN_GRACE';
  return 'EXPIRED';
}

const standardLifecycle = pricingConfig.calculateSubscriptionLifecycle({
  startDate: fixedStart,
  planPeriod: 'termly'
});

const expiryMs = standardLifecycle.expiresAt.getTime();
const graceEndMs = standardLifecycle.gracePeriodEndsAt.getTime();

// 1. 1ms before expiry: ACTIVE
const tMinus1Expiry = new Date(expiryMs - 1);
const state1 = evaluateEntitlement(tMinus1Expiry, standardLifecycle);
recordProbe(
  'Entitlement at (expiresAt - 1ms): ACTIVE',
  state1 === 'ACTIVE',
  `expected ACTIVE, got ${state1}`
);

// 2. Exact expiry instant: ACTIVE
const stateExactExpiry = evaluateEntitlement(standardLifecycle.expiresAt, standardLifecycle);
recordProbe(
  'Entitlement at (expiresAt exactly): ACTIVE',
  stateExactExpiry === 'ACTIVE',
  `expected ACTIVE, got ${stateExactExpiry}`
);

// 3. 1ms after expiry: IN_GRACE
const tPlus1Expiry = new Date(expiryMs + 1);
const state2 = evaluateEntitlement(tPlus1Expiry, standardLifecycle);
recordProbe(
  'Entitlement at (expiresAt + 1ms): IN_GRACE',
  state2 === 'IN_GRACE',
  `expected IN_GRACE, got ${state2}`
);

// 4. Mid grace period (e.g. +36 hours): IN_GRACE
const tMidGrace = new Date(expiryMs + 36 * 3600000);
const state3 = evaluateEntitlement(tMidGrace, standardLifecycle);
recordProbe(
  'Entitlement at (expiresAt + 36h): IN_GRACE',
  state3 === 'IN_GRACE',
  `expected IN_GRACE, got ${state3}`
);

// 5. 1ms before grace ends: IN_GRACE
const tMinus1Grace = new Date(graceEndMs - 1);
const state4 = evaluateEntitlement(tMinus1Grace, standardLifecycle);
recordProbe(
  'Entitlement at (gracePeriodEndsAt - 1ms): IN_GRACE',
  state4 === 'IN_GRACE',
  `expected IN_GRACE, got ${state4}`
);

// 6. Exact graceEnd instant: IN_GRACE (inclusive end boundary)
const stateExactGrace = evaluateEntitlement(standardLifecycle.gracePeriodEndsAt, standardLifecycle);
recordProbe(
  'Entitlement at (gracePeriodEndsAt exactly): IN_GRACE',
  stateExactGrace === 'IN_GRACE',
  `expected IN_GRACE, got ${stateExactGrace}`
);

// 7. 1ms after grace ends: EXPIRED
const tPlus1Grace = new Date(graceEndMs + 1);
const state5 = evaluateEntitlement(tPlus1Grace, standardLifecycle);
recordProbe(
  'Entitlement at (gracePeriodEndsAt + 1ms): EXPIRED',
  state5 === 'EXPIRED',
  `expected EXPIRED, got ${state5}`
);

// 8. 1 hour after grace ends: EXPIRED
const tPlus1HourGrace = new Date(graceEndMs + 3600000);
const state6 = evaluateEntitlement(tPlus1HourGrace, standardLifecycle);
recordProbe(
  'Entitlement at (gracePeriodEndsAt + 1 hour): EXPIRED',
  state6 === 'EXPIRED',
  `expected EXPIRED, got ${state6}`
);

// ─────────────────────────────────────────────────────────────
// PROBE SUITE 4: CALENDAR BOUNDARY & LEAP YEAR STRESS
// ─────────────────────────────────────────────────────────────
console.log('\n>>> SECTION 4: Leap Year & Calendar Transition Stress');

const leapCalendarProbes = [
  // 1. Leap year 2024: Started on Feb 29
  {
    desc: 'Leap Year 2024 leap day (2024-02-29T12:00:00Z)',
    startDate: new Date('2024-02-29T12:00:00.000Z'),
    planPeriod: 'monthly',
    expectedDays: 30
  },
  // 2. Leap year 2024: Started on Feb 28 (day before leap day)
  {
    desc: 'Leap Year 2024 eve of leap day (2024-02-28T00:00:00Z)',
    startDate: new Date('2024-02-28T00:00:00.000Z'),
    planPeriod: 'termly',
    expectedDays: 105
  },
  // 3. Leap year 2028: Started on Feb 29
  {
    desc: 'Next Leap Year 2028 leap day (2028-02-29T00:00:00Z)',
    startDate: new Date('2028-02-29T00:00:00.000Z'),
    planPeriod: 'annual',
    expectedDays: 365
  },
  // 4. Non-leap year 2025: Started on Feb 28
  {
    desc: 'Non-Leap Year 2025 Feb 28 (2025-02-28T18:00:00Z)',
    startDate: new Date('2025-02-28T18:00:00.000Z'),
    planPeriod: 'monthly',
    expectedDays: 30
  },
  // 5. Month-end transitions across year boundary (Dec 31 -> New Year)
  {
    desc: 'Year-end rollover (2026-12-31T23:59:59.999Z)',
    startDate: new Date('2026-12-31T23:59:59.999Z'),
    planPeriod: 'bootcamp',
    expectedDays: 21
  },
  // 6. Jan 31 (31-day month transition into Feb)
  {
    desc: 'Jan 31 month-end transition (2026-01-31T00:00:00Z)',
    startDate: new Date('2026-01-31T00:00:00.000Z'),
    planPeriod: 'monthly',
    expectedDays: 30
  },
  // 7. Exam Season Pass across leap year boundary (starts Jan 1 on leap year 2028)
  {
    desc: 'Exam Season Pass spanning leap day (2028-01-01T00:00:00Z)',
    startDate: new Date('2028-01-01T00:00:00.000Z'),
    planPeriod: 'exam_season_pass',
    expectedDays: 181
  }
];

for (const probe of leapCalendarProbes) {
  try {
    const res = pricingConfig.calculateSubscriptionLifecycle({
      startDate: probe.startDate,
      planPeriod: probe.planPeriod
    });

    const expectedMs = probe.expectedDays * ONE_DAY_MS;
    const actualMs = res.expiresAt.getTime() - res.startsAt.getTime();
    const graceMs = res.gracePeriodEndsAt.getTime() - res.expiresAt.getTime();

    const durationMatches = actualMs === expectedMs;
    const graceMatches = graceMs === THREE_DAYS_MS;
    const startsAtPreserved = res.startsAt.getTime() === probe.startDate.getTime();

    // Verify calendar properties
    const expiresUTC = res.expiresAt.toISOString();
    const startsUTC = res.startsAt.toISOString();

    recordProbe(
      `Calendar Stress: ${probe.desc} [${probe.planPeriod}]`,
      durationMatches && graceMatches && startsAtPreserved,
      `starts=${startsUTC}, expires=${expiresUTC}, deltaMs=${actualMs} (expected ${expectedMs})`
    );
  } catch (err) {
    recordProbe(`Calendar Stress: ${probe.desc} threw error`, false, err.message);
  }
}

// ─────────────────────────────────────────────────────────────
// PROBE SUITE 5: UTC INVARIANCE & STRING / NUMBER INPUTS
// ─────────────────────────────────────────────────────────────
console.log('\n>>> SECTION 5: Input Resiliency & UTC Invariance');

// Test string date input
const stringDate = '2026-06-15T10:30:00.000Z';
const resFromString = pricingConfig.calculateSubscriptionLifecycle({
  startDate: stringDate,
  planPeriod: 'monthly'
});
recordProbe(
  'Handles ISO-8601 string input for startDate',
  resFromString.startsAt instanceof Date &&
  resFromString.startsAt.getTime() === new Date(stringDate).getTime() &&
  (resFromString.expiresAt.getTime() - resFromString.startsAt.getTime()) === 30 * ONE_DAY_MS,
  `startsAt=${resFromString.startsAt}`
);

// Test timestamp number input
const timestampNumber = 1777536000000;
const resFromTimestamp = pricingConfig.calculateSubscriptionLifecycle({
  startDate: timestampNumber,
  planPeriod: 'termly'
});
recordProbe(
  'Handles epoch millisecond number input for startDate',
  resFromTimestamp.startsAt instanceof Date &&
  resFromTimestamp.startsAt.getTime() === timestampNumber &&
  (resFromTimestamp.expiresAt.getTime() - resFromTimestamp.startsAt.getTime()) === 105 * ONE_DAY_MS,
  `startsAt=${resFromTimestamp.startsAt}`
);

// Test default parameters when called with empty object or undefined
const resDefault = pricingConfig.calculateSubscriptionLifecycle();
recordProbe(
  'Handles no-argument call calculateSubscriptionLifecycle() gracefully',
  resDefault.startsAt instanceof Date &&
  resDefault.durationDays === 105 &&
  (resDefault.expiresAt.getTime() - resDefault.startsAt.getTime()) === 105 * ONE_DAY_MS,
  `durationDays=${resDefault.durationDays}`
);

// ─────────────────────────────────────────────────────────────
// PROBE SUITE 6: AUTOMATED RENEWAL REMINDER SCHEDULE (4 STAGES)
// ─────────────────────────────────────────────────────────────
console.log('\n>>> SECTION 6: Automated Renewal Reminder Schedule (4 Stages)');

const testExpiryDate = new Date('2026-09-01T15:00:00.000Z');
const reminders = pricingConfig.getReminderSchedule(testExpiryDate);

// Requirement: Exactly 4 stages
recordProbe(
  'getReminderSchedule returns exactly 4 stages',
  Array.isArray(reminders) && reminders.length === 4,
  `returned length = ${reminders ? reminders.length : 'null'}`
);

// Requirement: Correct stage names
const expectedStages = ['7d_before', '3d_before', '1d_before', '1d_grace'];
const actualStages = reminders ? reminders.map(r => r.stage) : [];
const stagesMatch = JSON.stringify(actualStages) === JSON.stringify(expectedStages);
recordProbe(
  'Reminder stages match ["7d_before", "3d_before", "1d_before", "1d_grace"]',
  stagesMatch,
  `actual stages: ${JSON.stringify(actualStages)}`
);

// Requirement: Strict Chronological Order
// 7d_before < 3d_before < 1d_before < expiresAt < 1d_grace < gracePeriodEndsAt
if (reminders && reminders.length === 4) {
  const t7d = new Date(reminders[0].sendAt).getTime();
  const t3d = new Date(reminders[1].sendAt).getTime();
  const t1d = new Date(reminders[2].sendAt).getTime();
  const tExp = testExpiryDate.getTime();
  const t1g = new Date(reminders[3].sendAt).getTime();
  const tGraceEnd = tExp + THREE_DAYS_MS;

  const strictlyOrdered = (t7d < t3d) && (t3d < t1d) && (t1d < tExp) && (tExp < t1g) && (t1g < tGraceEnd);
  recordProbe(
    'Reminders strictly monotonic: 7d_before < 3d_before < 1d_before < expiresAt < 1d_grace < gracePeriodEndsAt',
    strictlyOrdered,
    `t7d=${t7d}, t3d=${t3d}, t1d=${t1d}, tExp=${tExp}, t1g=${t1g}, tGraceEnd=${tGraceEnd}`
  );

  // Exact millisecond delta verification:
  const delta7d = tExp - t7d;
  const delta3d = tExp - t3d;
  const delta1d = tExp - t1d;
  const delta1g = t1g - tExp;

  recordProbe(
    '7d_before is exactly 7 * 86,400,000 ms before expiry',
    delta7d === 7 * ONE_DAY_MS,
    `delta7d = ${delta7d} ms (expected ${7 * ONE_DAY_MS})`
  );

  recordProbe(
    '3d_before is exactly 3 * 86,400,000 ms before expiry',
    delta3d === 3 * ONE_DAY_MS,
    `delta3d = ${delta3d} ms (expected ${3 * ONE_DAY_MS})`
  );

  recordProbe(
    '1d_before is exactly 1 * 86,400,000 ms before expiry',
    delta1d === 1 * ONE_DAY_MS,
    `delta1d = ${delta1d} ms (expected ${1 * ONE_DAY_MS})`
  );

  recordProbe(
    '1d_grace is exactly 1 * 86,400,000 ms after expiry',
    delta1g === 1 * ONE_DAY_MS,
    `delta1g = ${delta1g} ms (expected ${1 * ONE_DAY_MS})`
  );

  // Valid ISO 8601 string check
  const allIsoValid = reminders.every(r => {
    const d = new Date(r.sendAt);
    return !isNaN(d.getTime()) && r.sendAt === d.toISOString();
  });
  recordProbe(
    'All reminder sendAt timestamps are valid ISO 8601 UTC strings',
    allIsoValid,
    `reminders: ${JSON.stringify(reminders)}`
  );
}

// Resiliency test: passing string or millisecond timestamp to getReminderSchedule
const remindersFromString = pricingConfig.getReminderSchedule('2026-09-01T15:00:00.000Z');
recordProbe(
  'getReminderSchedule accepts ISO-8601 string timestamp',
  Array.isArray(remindersFromString) && remindersFromString.length === 4 &&
  remindersFromString[0].sendAt === reminders[0].sendAt,
  `sendAt=${remindersFromString && remindersFromString[0] && remindersFromString[0].sendAt}`
);

const remindersFromMs = pricingConfig.getReminderSchedule(testExpiryDate.getTime());
recordProbe(
  'getReminderSchedule accepts epoch millisecond number timestamp',
  Array.isArray(remindersFromMs) && remindersFromMs.length === 4 &&
  remindersFromMs[0].sendAt === reminders[0].sendAt,
  `sendAt=${remindersFromMs && remindersFromMs[0] && remindersFromMs[0].sendAt}`
);


// ─────────────────────────────────────────────────────────────
// SUMMARY & EXIT
// ─────────────────────────────────────────────────────────────
console.log('\n================================================================');
console.log(`TOTAL PROBES RUN: ${totalProbes}`);
console.log(`PASSED: ${passedProbes}`);
console.log(`FAILED: ${failedProbes}`);
console.log('================================================================\n');

if (failureLog.length > 0) {
  console.log('SUMMARY OF FAILED PROBES:');
  failureLog.forEach((f, idx) => {
    console.log(`${idx + 1}. ${f.title}`);
    if (f.details) console.log(`   ${f.details}`);
  });
}

// Exit with 1 if there were failures, 0 if all passed
process.exit(failedProbes > 0 ? 1 : 0);
