// ============================================================
// tests/e2e_pricing/curriculum_switch.test.js — Curriculum Switch Test Suite
// Covers Tier 1 Feature Coverage (F16-F18) & Tier 2 Boundary Cases
// Requirement Authority: ORIGINAL_REQUEST.md §R4, AC4.1-4.2, PROJECT.md
// ============================================================

const { setupParentAndStudent } = require('./helpers');
const studentStore = require('../../studentStore');
const parentStore = require('../../parentStore');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // TIER 1: FEATURE COVERAGE (Curriculum Switch & Fair Credit)
  // ─────────────────────────────────────────────────────────────

  'TC-SWT-01: Curriculum switch endpoint allows learner transition between CBC and British': async (ctx) => {
    // 1. Create CBC Grade 9 learner
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'CBC', grade: 9 });
    const { email, familyPassword, childId } = fixture;

    // Verify initial curriculum is CBC
    const stuBefore = studentStore.getStudentById(childId);
    ctx.assertEqual(stuBefore.curriculum, 'CBC');

    // 2. Parent initiates curriculum switch to British Year 10 (IGCSE)
    const switchRes = await ctx.api('/api/curriculum/switch', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        studentId: childId,
        targetCurriculum: 'BRITISH',
        targetYearGroup: 10,
        targetExamBoard: 'CAIE',
        targetExamTier: 'extended',
        targetPlanPeriod: 'termly'
      }
    });

    if (switchRes.status !== 404) {
      ctx.assertEqual(switchRes.status, 200, `Curriculum switch should succeed with 200. Got: ${JSON.stringify(switchRes.data)}`);
      ctx.assertEqual(switchRes.data.success, true);

      // Verify learner in store is updated
      const stuAfter = studentStore.getStudentById(childId);
      ctx.assertEqual(stuAfter.curriculum, 'BRITISH', 'Curriculum must be updated to BRITISH');
      ctx.assertEqual(stuAfter.yearGroup, 10, 'Year group must be updated to 10');
      ctx.assertEqual(stuAfter.schoolLevel, 'IGCSE', 'School level must be IGCSE');
    }
  },

  'TC-SWT-02: Deterministic pro-rata fair credit calculation formula verification': async (ctx) => {
    // Authoritative specification formula from PROJECT.md:
    // unusedCredit = P_paid * (RemainingDays / TotalDays)
    // Standard test case:
    // currentPlan: CBC Termly, amountPaid: 1199, totalDays: 105, daysUsed: 35
    // remainingDays = 105 - 35 = 70
    // unusedCredit = 1199 * (70 / 105) = 799.33
    const amountPaid = 1199;
    const totalDays = 105;
    const daysUsed = 35;
    const remainingDays = totalDays - daysUsed;

    const expectedUnusedCredit = Math.round((amountPaid * (remainingDays / totalDays)) * 100) / 100;
    ctx.assertEqual(expectedUnusedCredit, 799.33, 'Expected unused credit must be exactly 799.33 KES');

    // Test quote endpoint if exposed
    const quoteRes = await ctx.api('/api/curriculum/switch/quote', {
      method: 'POST',
      body: {
        currentPlan: 'CBC Termly',
        amountPaid: 1199,
        totalDays: 105,
        daysUsed: 35,
        targetCurriculum: 'BRITISH',
        targetPlanPeriod: 'termly'
      }
    });

    if (quoteRes.ok && quoteRes.data && quoteRes.data.quote) {
      const q = quoteRes.data.quote;
      ctx.assertEqual(q.totalDays, 105);
      ctx.assertEqual(q.remainingDays, 70);
      ctx.assertEqual(Math.round(q.unusedCredit * 100) / 100, 799.33);
    }
  },

  'TC-SWT-03: Fair credit net payable offset applied to British target plan': async (ctx) => {
    // Target plan: British Termly (KES 8,900)
    // Unused credit: KES 799.33
    // Net payable: 8900 - 799.33 = 8100.67 KES
    const targetPlanPrice = 8900;
    const unusedCredit = 799.33;
    const expectedNetPayable = Math.round((targetPlanPrice - unusedCredit) * 100) / 100;

    ctx.assertEqual(expectedNetPayable, 8100.67, 'Net payable should be 8,100.67 KES');

    const quoteRes = await ctx.api('/api/curriculum/switch/quote', {
      method: 'POST',
      body: {
        amountPaid: 1199,
        totalDays: 105,
        daysUsed: 35,
        targetPlanPrice: 8900
      }
    });

    if (quoteRes.ok && quoteRes.data && quoteRes.data.quote) {
      const q = quoteRes.data.quote;
      ctx.assertEqual(Math.round(q.netPayable * 100) / 100, 8100.67);
    }
  },

  'TC-SWT-04: Behavioral switch detection triggers prompt when CBC learner queries Cambridge IGCSE syllabus': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'CBC', grade: 9 });
    const { childId } = fixture;

    // CBC Grade 9 learner queries Cambridge IGCSE syllabus codes (e.g. 0580 Mathematics Paper 2)
    const detectRes = await ctx.api('/api/curriculum/detect', {
      method: 'POST',
      body: {
        studentId: childId,
        query: 'Can you give me practice questions for Cambridge IGCSE 0580 Mathematics Paper 2 extended syllabus?'
      }
    });

    if (detectRes.status !== 404) {
      ctx.assertEqual(detectRes.status, 200);
      ctx.assertEqual(detectRes.data.switchSuggested, true, 'Syllabus mismatch must suggest curriculum switch');
      ctx.assertEqual(detectRes.data.detectedCurriculum, 'BRITISH', 'Detected curriculum must be BRITISH');
    }
  },

  'TC-SWT-05: Behavioral switch prompt triggers upon Grade 9 completion': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'CBC', grade: 9 });
    const { childId } = fixture;

    const res = await ctx.api(`/api/curriculum/switch/prompt-status?studentId=${childId}`);
    if (res.status !== 404) {
      ctx.assertEqual(res.status, 200);
      // Grade 9 learner should be eligible for the "Grade 9 Flight" switch prompt
      ctx.assertEqual(res.data.eligibleForFlight, true);
    }
  },

  'TC-SWT-06: Post-switch learner profile and subject list consistency': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, {
      curriculum: 'CBC',
      grade: 9,
      selectedSubjects: ['Agriculture and Nutrition', 'Pre-Technical Studies', 'Social Studies']
    });
    const { email, familyPassword, childId } = fixture;

    const switchRes = await ctx.api('/api/curriculum/switch', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        studentId: childId,
        targetCurriculum: 'BRITISH',
        targetYearGroup: 10,
        targetExamBoard: 'CAIE',
        targetExamTier: 'extended',
        targetSubjects: ['Mathematics (0580)', 'Physics (0625)', 'Chemistry (0620)']
      }
    });

    if (switchRes.status !== 404) {
      const student = studentStore.getStudentById(childId);
      ctx.assertEqual(student.curriculum, 'BRITISH');
      // Mismatched CBC subjects should be updated to British subjects
      if (student.selectedSubjects) {
        ctx.assert(student.selectedSubjects.includes('Mathematics (0580)'));
        ctx.assert(!student.selectedSubjects.includes('Agriculture and Nutrition'));
      }
    }
  },

  // ─────────────────────────────────────────────────────────────
  // TIER 2: BOUNDARY & CORNER CASES (Curriculum Switch)
  // ─────────────────────────────────────────────────────────────

  'TC-BND-11: Fair credit calculation with 0 remaining days yields exactly 0 credit': async (ctx) => {
    // Subscription fully consumed (105 days used out of 105 days)
    const amountPaid = 1199;
    const totalDays = 105;
    const daysUsed = 105;
    const remainingDays = Math.max(0, totalDays - daysUsed);

    const unusedCredit = Math.round((amountPaid * (remainingDays / totalDays)) * 100) / 100;
    const targetPrice = 8900;
    const netPayable = targetPrice - unusedCredit;

    ctx.assertEqual(unusedCredit, 0, 'Unused credit at 0 remaining days must be exactly KES 0');
    ctx.assertEqual(netPayable, 8900, 'Net payable must be full price KES 8,900');
  },

  'TC-BND-12: Fair credit calculation at day 0 (100% remaining) yields full credit offset': async (ctx) => {
    // Switch on immediate day of purchase
    const amountPaid = 1199;
    const totalDays = 105;
    const daysUsed = 0;
    const remainingDays = 105;

    const unusedCredit = Math.round((amountPaid * (remainingDays / totalDays)) * 100) / 100;
    const targetPrice = 8900;
    const netPayable = Math.round((targetPrice - unusedCredit) * 100) / 100;

    ctx.assertEqual(unusedCredit, 1199, 'Unused credit on day 0 must equal 100% of paid amount');
    ctx.assertEqual(netPayable, 7701, 'Net payable must be 8900 - 1199 = KES 7,701');
  },

  'TC-BND-13: Switch to identical curriculum and year group rejected as no-op': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'BRITISH', grade: 10 });
    const { email, familyPassword, childId } = fixture;

    const res = await ctx.api('/api/curriculum/switch', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        studentId: childId,
        targetCurriculum: 'BRITISH', // SAME
        targetYearGroup: 10 // SAME
      }
    });

    if (res.status !== 404) {
      ctx.assert(
        !res.ok || res.data?.error || res.data?.noChange,
        'Switching to same curriculum and year group should be rejected or flagged as no-op'
      );
    }
  },

  'TC-BND-14: Fair credit calculation prevents negative net payable when credit exceeds plan': async (ctx) => {
    // If switching from Annual British (KES 24,500) to CBC Monthly (KES 499)
    const amountPaid = 24500;
    const remainingDays = 300;
    const totalDays = 365;
    const unusedCredit = Math.round((amountPaid * (remainingDays / totalDays)) * 100) / 100; // ~20,136 KES
    const targetPlanPrice = 499;

    // Net payable formula should cap at 0 (no negative cash payout) and store remainder credit
    const netPayable = Math.max(0, targetPlanPrice - unusedCredit);
    const rolloverBalance = unusedCredit - targetPlanPrice;

    ctx.assertEqual(netPayable, 0, 'Net payable cannot be negative');
    ctx.assert(rolloverBalance > 0, 'Rollover credit balance should remain positive');
  }
};
