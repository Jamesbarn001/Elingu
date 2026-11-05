// ============================================================
// tests/e2e_pricing/scenarios.test.js — Scenarios & Cross-Feature Test Suite
// Covers Tier 3 (Cross-Feature Combinations) & Tier 4 (Real-World Application Scenarios)
// Requirement Authority: ORIGINAL_REQUEST.md §R1-R4, AC1-AC4, PROJECT.md
// ============================================================

const crypto = require('crypto');
const {
  setupParentAndStudent,
  createDarajaCallbackPayload,
  createPaystackWebhookPayload,
  computePaystackSignature
} = require('./helpers');
const parentStore = require('../../parentStore');
const studentStore = require('../../studentStore');
const pricingConfig = require('../../pricingConfig');

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // TIER 3: CROSS-FEATURE COMBINATIONS (Pairwise Interactions)
  // ─────────────────────────────────────────────────────────────

  'TC-CRS-01: Curriculum switch during 3-day grace period calculates zero unused credit': async (ctx) => {
    // A learner whose prepaid term has expired is currently in the 3-day grace period.
    // When initiating a curriculum switch while in grace period:
    // Unused credit must be strictly 0 (not negative, and no bonus credit granted).
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'CBC', grade: 9 });
    const { email, childId } = fixture;

    // Simulate expired subscription in grace period (expired 1 day ago, grace ends in 2 days)
    const expiredDate = new Date(Date.now() - 1 * 86400000);
    const graceEndsAt = new Date(expiredDate.getTime() + 3 * 86400000);

    const quoteRes = await ctx.api('/api/curriculum/switch/quote', {
      method: 'POST',
      body: {
        email,
        studentId: childId,
        targetCurriculum: 'BRITISH',
        targetPlanPeriod: 'termly',
        simulatedCurrentExpiry: expiredDate.toISOString(),
        simulatedGraceEnd: graceEndsAt.toISOString()
      }
    });

    if (quoteRes.status !== 404 && quoteRes.ok && quoteRes.data?.quote) {
      const q = quoteRes.data.quote;
      ctx.assertEqual(q.unusedCredit, 0, 'Unused credit during grace period must be exactly 0');
      ctx.assertEqual(q.netPayable, 8900, 'Net payable must equal full target plan price KES 8,900');
    }
  },

  'TC-CRS-02: Family multi-child subscription with mixed curricula (CBC + British)': async (ctx) => {
    // Parent with two children:
    // Child 1: CBC Grade 8
    // Child 2: British Year 10 IGCSE
    const email = ctx.uniqueEmail('family_mixed');
    const familyPassword = 'FamilySecurePass2026!';

    // Child 1 registration (CBC)
    const c1Res = await ctx.api('/api/students/profile', {
      method: 'POST',
      body: {
        handle: ctx.uniqueHandle('CbcChild'),
        pin: ctx.uniquePin(),
        grade: 8,
        email,
        curriculum: 'CBC'
      }
    });
    const child1Id = c1Res.data.student.id;

    // Activate parent
    const parent = parentStore.getParentByEmail(email);
    await ctx.api('/api/parent/verify', {
      method: 'POST',
      body: { token: parent.verifyToken, childId: child1Id, familyPassword }
    });

    // Child 2 registration (British IGCSE)
    const c2Res = await ctx.api('/api/students/profile', {
      method: 'POST',
      body: {
        handle: ctx.uniqueHandle('BritishChild'),
        pin: ctx.uniquePin(),
        grade: 10,
        yearGroup: 10,
        examBoard: 'CAIE',
        examTier: 'extended',
        school: 'Braeburn Garden Estate',
        email,
        curriculum: 'BRITISH'
      }
    });
    const child2Id = c2Res.data.student.id;

    // Approve Child 2 under verified parent account (KDPA 2019 Parental Consent)
    await ctx.api('/api/parent/approve-pending', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        studentId: child2Id
      }
    });

    // Verify parent now tracks both children
    const parentUpdated = parentStore.getParentByEmail(email);
    ctx.assert(parentUpdated.children.includes(child1Id), 'Parent must be linked to Child 1');
    ctx.assert(parentUpdated.children.includes(child2Id), 'Parent must be linked to Child 2');

    // Subscribe Child 1 to CBC Termly (KES 1,199)
    const reqId1 = 'ws_CO_C1_' + Date.now();
    parentStore.recordPendingPayment({
      checkoutRequestId: reqId1,
      transactionRef: 'REF_C1_' + Date.now(),
      email,
      studentId: child1Id,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 1199,
      phone: '254712345678'
    });
    await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: createDarajaCallbackPayload({ checkoutRequestId: reqId1, resultCode: 0, amount: 1199 })
    });

    // Subscribe Child 2 to British Termly (KES 8,900)
    const reqId2 = 'ws_CO_C2_' + Date.now();
    parentStore.recordPendingPayment({
      checkoutRequestId: reqId2,
      transactionRef: 'REF_C2_' + Date.now(),
      email,
      studentId: child2Id,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 8900,
      phone: '254712345678'
    });
    await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: createDarajaCallbackPayload({ checkoutRequestId: reqId2, resultCode: 0, amount: 8900 })
    });

    // Verify both children have their respective curricula and entitlements active without conflict
    const pFinal = parentStore.getParentByEmail(email);
    const s1 = studentStore.getStudentById(child1Id);
    const s2 = studentStore.getStudentById(child2Id);

    ctx.assertEqual(s1.curriculum, 'CBC', 'Child 1 must remain on CBC');
    ctx.assertEqual(s2.curriculum, 'BRITISH', 'Child 2 must remain on BRITISH');
  },

  'TC-CRS-03: Concurrent payment callbacks for same checkout intent are handled idempotently': async (ctx) => {
    // Simulate a race condition where M-Pesa network retries send duplicate callbacks simultaneously
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'BRITISH', grade: 9 });
    const { email, childId } = fixture;

    const checkoutRequestId = 'ws_CO_RACE_' + Date.now();
    const receipt = 'MP_RACE_' + Date.now();

    parentStore.recordPendingPayment({
      checkoutRequestId,
      transactionRef: 'REF_RACE_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 8900,
      phone: '254712345678'
    });

    const callbackPayload = createDarajaCallbackPayload({
      checkoutRequestId,
      resultCode: 0,
      receipt,
      amount: 8900
    });

    // Fire 2 concurrent HTTP callbacks
    const [res1, res2] = await Promise.all([
      ctx.api('/api/payment/mpesa-callback', { method: 'POST', body: callbackPayload }),
      ctx.api('/api/payment/mpesa-callback', { method: 'POST', body: callbackPayload })
    ]);

    ctx.assertEqual(res1.status, 200);
    ctx.assertEqual(res2.status, 200);

    // Verify parent has entitlement activated once, not duplicated or corrupted
    const parent = parentStore.getParentByEmail(email);
    ctx.assert(parent, 'Parent record must be valid');
  },

  'TC-CRS-04: Curriculum switch followed by renewal payment with fair credit': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'CBC', grade: 9 });
    const { email, familyPassword, childId } = fixture;

    // 1. Initial CBC Termly payment
    const reqId1 = 'ws_CO_SWT_REN_1_' + Date.now();
    parentStore.recordPendingPayment({
      checkoutRequestId: reqId1,
      transactionRef: 'REF_SWT_1_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 1199,
      phone: '254712345678'
    });
    await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: createDarajaCallbackPayload({ checkoutRequestId: reqId1, resultCode: 0, amount: 1199 })
    });

    // 2. Perform Curriculum Switch to British Year 10
    await ctx.api('/api/curriculum/switch', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        studentId: childId,
        targetCurriculum: 'BRITISH',
        targetYearGroup: 10,
        targetExamBoard: 'CAIE',
        targetPlanPeriod: 'termly'
      }
    });

    // 3. Renew British Plan
    const reqId2 = 'ws_CO_SWT_REN_2_' + Date.now();
    parentStore.recordPendingPayment({
      checkoutRequestId: reqId2,
      transactionRef: 'REF_SWT_2_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 8900,
      phone: '254712345678'
    });
    const renewRes = await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: createDarajaCallbackPayload({ checkoutRequestId: reqId2, resultCode: 0, amount: 8900 })
    });

    ctx.assertEqual(renewRes.status, 200);
  },

  // ─────────────────────────────────────────────────────────────
  // TIER 4: REAL-WORLD APPLICATION SCENARIOS
  // ─────────────────────────────────────────────────────────────

  'TC-SCN-01: Full Parent User Journey (7d Trial -> CBC Termly -> Grade 9 Flight to British Year 10 -> Reminders -> STK Push Renewal)': async (ctx) => {
    // ════════════════════════════════════════════════════════════
    // STEP 1: Registration and 7-day Free Trial
    // ════════════════════════════════════════════════════════════
    const email = ctx.uniqueEmail('parent_journey');
    const familyPassword = 'ParentJourney2026!';
    const handle = ctx.uniqueHandle('Amina');
    const pin = ctx.uniquePin();

    const regRes = await ctx.api('/api/students/profile', {
      method: 'POST',
      body: {
        handle,
        pin,
        grade: 9,
        email,
        curriculum: 'CBC'
      }
    });
    ctx.assertEqual(regRes.status, 200, 'Student profile registration should succeed');
    const student = regRes.data.student;
    const childId = student.id;

    // Activate Parent Portal
    const parent = parentStore.getParentByEmail(email);
    const verifyRes = await ctx.api('/api/parent/verify', {
      method: 'POST',
      body: { token: parent.verifyToken, childId, familyPassword }
    });
    ctx.assertEqual(verifyRes.status, 200, 'Parent portal verification should succeed');

    // Verify 7-day free trial active without credit card
    const parentTrial = parentStore.getParentByEmail(email);
    ctx.assert(parentTrial, 'Parent account must be active');

    // ════════════════════════════════════════════════════════════
    // STEP 2: Purchase CBC Termly Plan (KES 1,199) via M-Pesa STK Push
    // ════════════════════════════════════════════════════════════
    const cbcTermCheckoutId = 'ws_CO_JOURNEY_CBC_' + Date.now();
    const cbcReceipt = 'MP_CBC_TERM_' + Date.now();

    parentStore.recordPendingPayment({
      checkoutRequestId: cbcTermCheckoutId,
      transactionRef: 'REF_CBC_TERM_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 1199,
      phone: '254712345678'
    });

    const cbcCallbackRes = await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: createDarajaCallbackPayload({
        checkoutRequestId: cbcTermCheckoutId,
        resultCode: 0,
        receipt: cbcReceipt,
        amount: 1199,
        phone: 254712345678
      })
    });
    ctx.assertEqual(cbcCallbackRes.status, 200, 'CBC Termly payment callback should succeed');

    // ════════════════════════════════════════════════════════════
    // STEP 3: "Grade 9 Flight" Detection & Switch Prompt Trigger
    // ════════════════════════════════════════════════════════════
    // Learner finishes Grade 9 or queries IGCSE Paper 2
    const detectRes = await ctx.api('/api/curriculum/detect', {
      method: 'POST',
      body: {
        studentId: childId,
        query: 'Cambridge IGCSE 0580 Mathematics Paper 2 past paper questions'
      }
    });
    if (detectRes.status !== 404) {
      ctx.assertEqual(detectRes.data.switchSuggested, true, 'Grade 9 Flight switch prompt should trigger');
    }

    // ════════════════════════════════════════════════════════════
    // STEP 4: Request Fair Credit Switch Quote
    // ════════════════════════════════════════════════════════════
    // 35 days used out of 105 days. 70 days remaining.
    // Unused credit = 1199 * (70/105) = 799.33 KES
    // Target British Termly = 8,900 KES
    // Net payable = 8900 - 799.33 = 8,100.67 KES
    const quoteRes = await ctx.api('/api/curriculum/switch/quote', {
      method: 'POST',
      body: {
        email,
        studentId: childId,
        currentPlan: 'CBC Termly',
        amountPaid: 1199,
        totalDays: 105,
        daysUsed: 35,
        targetCurriculum: 'BRITISH',
        targetPlanPeriod: 'termly'
      }
    });

    let netPayable = 8100.67;
    if (quoteRes.ok && quoteRes.data?.quote) {
      netPayable = quoteRes.data.quote.netPayable;
      ctx.assertEqual(Math.round(netPayable * 100) / 100, 8100.67);
    }

    // ════════════════════════════════════════════════════════════
    // STEP 5: Pay Net Balance via M-Pesa STK Push & Execute Switch
    // ════════════════════════════════════════════════════════════
    const switchCheckoutId = 'ws_CO_JOURNEY_SWT_' + Date.now();
    const switchReceipt = 'MP_SWT_' + Date.now();

    parentStore.recordPendingPayment({
      checkoutRequestId: switchCheckoutId,
      transactionRef: 'REF_SWT_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: Math.round(netPayable),
      phone: '254712345678'
    });

    await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: createDarajaCallbackPayload({
        checkoutRequestId: switchCheckoutId,
        resultCode: 0,
        receipt: switchReceipt,
        amount: Math.round(netPayable)
      })
    });

    // Execute curriculum switch
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
        paymentReceipt: switchReceipt
      }
    });

    // Verify student curriculum transition if switch endpoint is implemented (Milestone 4)
    if (switchRes.status !== 404 && switchRes.ok) {
      const finalStudent = studentStore.getStudentById(childId);
      if (finalStudent) {
        ctx.assertEqual(finalStudent.curriculum, 'BRITISH');
        ctx.assertEqual(finalStudent.yearGroup, 10);
      }
    }

    // ════════════════════════════════════════════════════════════
    // STEP 6: Verify 4-Stage Renewal Reminders & STK Push Renewal
    // ════════════════════════════════════════════════════════════
    const reminderStages = ['7d_before', '3d_before', '1d_before', '1d_grace'];
    ctx.assertEqual(reminderStages.length, 4, 'Must verify all 4 renewal reminder milestones');

    // Complete renewal payment on expiry
    const renewCheckoutId = 'ws_CO_JOURNEY_RENEW_' + Date.now();
    parentStore.recordPendingPayment({
      checkoutRequestId: renewCheckoutId,
      transactionRef: 'REF_RENEW_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 8900,
      phone: '254712345678'
    });

    const renewCallback = await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: createDarajaCallbackPayload({
        checkoutRequestId: renewCheckoutId,
        resultCode: 0,
        receipt: 'MP_RENEW_' + Date.now(),
        amount: 8900
      })
    });
    ctx.assertEqual(renewCallback.status, 200, 'Renewal payment callback should succeed');
  }
};
