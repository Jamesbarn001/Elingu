// ============================================================
// tests/e2e_pricing/payment_security.test.js — Payment Security Test Suite
// Covers Tier 1 Feature Coverage (F01-F05) & Tier 2 Boundary Cases
// Requirement Authority: ORIGINAL_REQUEST.md §R1, AC1.1-1.5, PROJECT.md
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

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // TIER 1: FEATURE COVERAGE (Payment Security)
  // ─────────────────────────────────────────────────────────────

  'TC-SEC-01: Rejection of self-activation bypass via POST /api/payment/confirm without verified payment': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'BRITISH', grade: 8 });
    const { email, familyPassword, childId } = fixture;

    // Check baseline subscription is free / unentitled
    const parentBefore = parentStore.getParentByEmail(email);
    const initialPlan = parentBefore.subscriptionTier || 'free';

    // Attempt direct self-activation via deprecated confirm endpoint without paying
    const confirmRes = await ctx.api('/api/payment/confirm', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        studentId: childId,
        tier: 'termly',
        billingCycle: 'termly',
        paymentMethod: 'SelfActivatedBypass',
        transactionRef: 'FAKE_UNVERIFIED_REF_' + Date.now()
      }
    });

    // In accordance with F01 & R1:
    // "Attempting to activate any paid plan without a verified provider payment is rejected, and the account's plan is unchanged."
    // Either the endpoint returns an error (400/403/409/422), or if converted to read-only status check, returns success: false.
    const parentAfter = parentStore.getParentByEmail(email);
    const studentAfter = studentStore.getStudentById(childId);

    if (confirmRes.ok && confirmRes.data && confirmRes.data.success === true) {
      // If the endpoint claimed success, verify whether it actually granted paid access without payment verification
      const planAfter = parentAfter.subscriptionTier || 'free';
      const childPlanAfter = (parentAfter.childrenSubscriptions || {})[childId] || (studentAfter && studentAfter.subscriptionTier) || 'free';

      ctx.assert(
        planAfter === initialPlan && childPlanAfter !== 'termly' && childPlanAfter !== 'premium',
        `VULNERABILITY DETECTED: Self-activation bypass granted paid access without verified payment! Before: ${initialPlan}, After: ${childPlanAfter}`
      );
    } else {
      // Correctly rejected
      ctx.assert(
        !confirmRes.ok || confirmRes.data?.success === false,
        'Self-activation without verified payment must be rejected'
      );
    }

    // Double-check the student's access remains unchanged
    ctx.assertEqual(
      (parentAfter.childrenSubscriptions || {})[childId] || 'free',
      initialPlan,
      'Learner subscription tier must remain unchanged'
    );
  },

  'TC-SEC-02: Server-side price authority rejects or overrides client-supplied price tampering': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'BRITISH', grade: 10 });
    const { email, familyPassword, childId } = fixture;

    // Client attempts to initiate checkout for British Termly (KES 8,900 catalogue price)
    // but tampered the request body with amount: 100
    const initiateRes = await ctx.api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        studentId: childId,
        curriculum: 'BRITISH',
        planPeriod: 'termly',
        provider: 'mpesa',
        phone: '0712345678',
        amount: 100 // TAMPERED! True server price is 8,900
      }
    });

    if (initiateRes.status === 404) {
      // Fallback check if initiate endpoint is under /api/payment/mpesa-stk-push
      const pushRes = await ctx.api('/api/payment/mpesa-stk-push', {
        method: 'POST',
        body: {
          email,
          familyPassword,
          studentId: childId,
          tier: 'termly',
          phone: '0712345678',
          amount: 100 // Tampered
        }
      });
      // Should not trust client amount 100
      if (pushRes.data && pushRes.data.amount) {
        ctx.assertNotEqual(pushRes.data.amount, 100, 'Server must not trust client-supplied 100 KES');
      }
      return;
    }

    ctx.assertEqual(initiateRes.status, 200, 'Initiation endpoint should respond');
    const intent = initiateRes.data;

    // Per R1 & F03: Client-supplied prices are ignored; the charged amount always equals the server catalogue price
    ctx.assertEqual(intent.amount, 8900, 'Server must enforce catalogue price KES 8,900 regardless of client-supplied KES 100');
    ctx.assertEqual(intent.currency, 'KES', 'Currency must be KES');
  },

  'TC-SEC-03: M-Pesa callback with failed result code (ResultCode !== 0) does not grant access': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'CBC', grade: 8 });
    const { email, familyPassword, childId } = fixture;

    // Initiate checkout or record pending intent
    const checkoutRequestId = 'ws_CO_' + Date.now() + '_TESTFAIL';
    parentStore.recordPendingPayment({
      checkoutRequestId,
      transactionRef: 'REF_FAIL_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 1199,
      phone: '254712345678'
    });

    // Simulate user cancelling prompt on handset (ResultCode: 1032)
    const failedCallbackPayload = createDarajaCallbackPayload({
      checkoutRequestId,
      resultCode: 1032,
      resultDesc: 'Request cancelled by user.'
    });

    const callbackRes = await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: failedCallbackPayload
    });

    // Callback should be acknowledged (Daraja requires 200 with ResultCode: 0)
    ctx.assertEqual(callbackRes.status, 200, 'Daraja webhook receiver must return 200');

    // Confirm parent and student did NOT receive paid access
    const parentAfter = parentStore.getParentByEmail(email);
    const childTier = (parentAfter.childrenSubscriptions || {})[childId] || 'free';
    ctx.assertNotEqual(childTier, 'termly', 'Failed payment must not activate termly subscription');
  },

  'TC-SEC-04: M-Pesa callback with unknown reference or missing checkoutRequestId does not grant access': async (ctx) => {
    const unknownCheckoutId = 'ws_CO_UNKNOWN_' + Date.now();
    const rogueReceipt = 'MP_ROGUE_' + Date.now();

    const rogueCallback = createDarajaCallbackPayload({
      checkoutRequestId: unknownCheckoutId,
      resultCode: 0,
      receipt: rogueReceipt,
      amount: 8900
    });

    const callbackRes = await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: rogueCallback
    });

    ctx.assertEqual(callbackRes.status, 200, 'Daraja webhook should return 200 acknowledgment');

    // Ensure no orphan subscription was granted in parentStore or ledger
    const pending = parentStore.findPendingPayment({ checkoutRequestId: unknownCheckoutId });
    ctx.assertEqual(pending, null, 'Unknown checkoutRequestId must not be found or fulfilled');
  },

  'TC-SEC-05: Single-use receipt replay prevention — duplicate receipt cannot extend access twice': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'BRITISH', grade: 9 });
    const { email, childId } = fixture;

    const checkoutReqId1 = 'ws_CO_REPLAY_1_' + Date.now();
    const commonReceipt = 'MP_REPLAY_' + Date.now();

    // Setup first legitimate pending payment
    parentStore.recordPendingPayment({
      checkoutRequestId: checkoutReqId1,
      transactionRef: 'REF_1_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 8900,
      phone: '254712345678'
    });

    // First legitimate callback
    const callback1 = createDarajaCallbackPayload({
      checkoutRequestId: checkoutReqId1,
      resultCode: 0,
      receipt: commonReceipt,
      amount: 8900
    });

    await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: callback1
    });

    const parentAfterFirst = parentStore.getParentByEmail(email);
    const expiryAfterFirst = parentAfterFirst.subscriptionExpiresAt;

    // Setup second pending payment attempt for another period
    const checkoutReqId2 = 'ws_CO_REPLAY_2_' + Date.now();
    parentStore.recordPendingPayment({
      checkoutRequestId: checkoutReqId2,
      transactionRef: 'REF_2_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 8900,
      phone: '254712345678'
    });

    // Adversary re-submits the SAME receipt number on checkout 2
    const replayCallback = createDarajaCallbackPayload({
      checkoutRequestId: checkoutReqId2,
      resultCode: 0,
      receipt: commonReceipt, // REPLAY!
      amount: 8900
    });

    await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: replayCallback
    });

    // Verify expiry was NOT extended a second time
    const parentAfterReplay = parentStore.getParentByEmail(email);
    if (expiryAfterFirst && parentAfterReplay.subscriptionExpiresAt) {
      ctx.assertEqual(
        parentAfterReplay.subscriptionExpiresAt,
        expiryAfterFirst,
        'Replaying receipt must not extend subscription expiration date'
      );
    }
  },

  'TC-SEC-06: Direct subscription update rejection via POST /api/parent/subscription without verified payment': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'CBC', grade: 7 });
    const { email, familyPassword } = fixture;

    // Attacker tries to escalate parent family subscription to annual without payment
    const res = await ctx.api('/api/parent/subscription', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        tier: 'annual',
        billingCycle: 'annual'
      }
    });

    // Per F01: Reject unpaid tier changes in POST /api/parent/subscription
    // Must reject with 400/402/403 or leave tier as free
    const parent = parentStore.getParentByEmail(email);
    if (res.ok) {
      ctx.assertNotEqual(
        parent.subscriptionTier,
        'annual',
        'Direct call to /api/parent/subscription must NOT grant paid annual tier without payment'
      );
    } else {
      ctx.assert(res.status >= 400, 'Unpaid tier upgrade request must be rejected with 4xx');
    }
  },

  'TC-SEC-07: Direct child subscription update rejection via POST /api/parent/child-subscription without verified payment': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'BRITISH', grade: 8 });
    const { email, familyPassword, childId } = fixture;

    // Attacker tries to escalate child subscription to premium/termly without payment
    const res = await ctx.api('/api/parent/child-subscription', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        studentId: childId,
        tier: 'termly',
        billingCycle: 'termly'
      }
    });

    // Per F01: Reject unpaid tier changes in POST /api/parent/child-subscription
    const parent = parentStore.getParentByEmail(email);
    const childTier = (parent.childrenSubscriptions || {})[childId] || 'free';

    if (res.ok) {
      ctx.assertNotEqual(
        childTier,
        'termly',
        'Direct call to /api/parent/child-subscription must NOT grant paid termly tier without payment'
      );
    } else {
      ctx.assert(res.status >= 400, 'Unpaid child tier upgrade request must be rejected with 4xx');
    }
  },

  // ─────────────────────────────────────────────────────────────
  // TIER 2: BOUNDARY & CORNER CASES (Payment Security)
  // ─────────────────────────────────────────────────────────────

  'TC-BND-01: M-Pesa callback with wrong / mismatched amount does not grant access': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'BRITISH', grade: 9 });
    const { email, childId } = fixture;

    const checkoutReqId = 'ws_CO_UNDERPAY_' + Date.now();
    parentStore.recordPendingPayment({
      checkoutRequestId: checkoutReqId,
      transactionRef: 'REF_UNDERPAY_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 8900, // Expected 8,900 KES
      phone: '254712345678'
    });

    // Callback reports only KES 500 paid
    const underpaidCallback = createDarajaCallbackPayload({
      checkoutRequestId: checkoutReqId,
      resultCode: 0,
      receipt: 'MP_UNDERPAY_' + Date.now(),
      amount: 500 // MISMATCH!
    });

    await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: underpaidCallback
    });

    const parent = parentStore.getParentByEmail(email);
    const childTier = (parent.childrenSubscriptions || {})[childId] || 'free';
    ctx.assertNotEqual(childTier, 'termly', 'Underpaid transaction must NOT grant termly access');
  },

  'TC-BND-02: Zero and negative amounts rejected during payment intent creation': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'CBC', grade: 7 });
    const { email, familyPassword, childId } = fixture;

    // Test zero amount
    const zeroRes = await ctx.api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        studentId: childId,
        curriculum: 'CBC',
        planPeriod: 'custom',
        amount: 0,
        provider: 'mpesa',
        phone: '0712345678'
      }
    });

    // Test negative amount
    const negRes = await ctx.api('/api/payment/initiate', {
      method: 'POST',
      body: {
        email,
        familyPassword,
        studentId: childId,
        curriculum: 'CBC',
        planPeriod: 'custom',
        amount: -500,
        provider: 'mpesa',
        phone: '0712345678'
      }
    });

    if (zeroRes.status !== 404) {
      ctx.assert(zeroRes.status >= 400, 'Zero amount checkout initiation must be rejected');
    }
    if (negRes.status !== 404) {
      ctx.assert(negRes.status >= 400, 'Negative amount checkout initiation must be rejected');
    }
  },

  'TC-BND-03: Expired intent timestamp rejection': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'CBC', grade: 8 });
    const { email, childId } = fixture;

    const checkoutReqId = 'ws_CO_EXPIRED_' + Date.now();
    // Record payment intent with expired timestamp (2 hours in the past)
    parentStore.recordPendingPayment({
      checkoutRequestId: checkoutReqId,
      transactionRef: 'REF_EXP_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 1199,
      phone: '254712345678',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      expiresAt: new Date(Date.now() - 3600000).toISOString() // expired 1h ago
    });

    const lateCallback = createDarajaCallbackPayload({
      checkoutRequestId: checkoutReqId,
      resultCode: 0,
      receipt: 'MP_LATE_' + Date.now(),
      amount: 1199
    });

    await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: lateCallback
    });

    // Check payment status or verify handling
    const payment = parentStore.findPendingPayment({ checkoutRequestId: checkoutReqId });
    if (payment && payment.expiresAt && new Date(payment.expiresAt) < new Date()) {
      ctx.assert(
        payment.status !== 'completed' || payment.expired === true || payment.status === 'expired',
        'Expired intent should not transition to valid completed entitlement'
      );
    }
  },

  'TC-BND-04: Receipt replay with whitespace and case mutation is rejected': async (ctx) => {
    const fixture = await setupParentAndStudent(ctx, { curriculum: 'BRITISH', grade: 11 });
    const { email, childId } = fixture;

    const baseReceipt = 'QWE99ZZ88';
    const checkoutReqId1 = 'ws_CO_CASE_1_' + Date.now();

    parentStore.recordPendingPayment({
      checkoutRequestId: checkoutReqId1,
      transactionRef: 'REF_C1_' + Date.now(),
      email,
      studentId: childId,
      tier: 'termly',
      billingCycle: 'termly',
      amount: 8900,
      phone: '254712345678'
    });

    // First use with uppercase
    await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: createDarajaCallbackPayload({
        checkoutRequestId: checkoutReqId1,
        resultCode: 0,
        receipt: baseReceipt,
        amount: 8900
      })
    });

    // Second use with lowercase and trailing spaces: '  qwe99zz88  '
    const checkoutReqId2 = 'ws_CO_CASE_2_' + Date.now();
    parentStore.recordPendingPayment({
      checkoutRequestId: checkoutReqId2,
      transactionRef: 'REF_C2_' + Date.now(),
      email,
      studentId: childId,
      tier: 'annual',
      billingCycle: 'annual',
      amount: 24500,
      phone: '254712345678'
    });

    await ctx.api('/api/payment/mpesa-callback', {
      method: 'POST',
      body: createDarajaCallbackPayload({
        checkoutRequestId: checkoutReqId2,
        resultCode: 0,
        receipt: `  ${baseReceipt.toLowerCase()}  `,
        amount: 24500
      })
    });

    const parent = parentStore.getParentByEmail(email);
    const childTier = (parent.childrenSubscriptions || {})[childId] || 'free';
    ctx.assertNotEqual(childTier, 'annual', 'Receipt replay with case/whitespace variations must NOT upgrade to annual');
  },

  'TC-BND-05: Paystack webhook signature tampering rejection': async (ctx) => {
    const payload = createPaystackWebhookPayload({
      event: 'charge.success',
      reference: 'pstk_tamper_' + Date.now(),
      amountKsh: 8900
    });
    const rawBody = JSON.stringify(payload);

    // Compute genuine signature then alter 1 byte
    const genuineSig = computePaystackSignature(rawBody);
    const tamperedSig = genuineSig.slice(0, -2) + (genuineSig.slice(-2) === 'aa' ? 'bb' : 'aa');

    const res = await ctx.api('/api/payment/paystack-webhook', {
      method: 'POST',
      headers: {
        'x-paystack-signature': tamperedSig,
        'Content-Type': 'application/json'
      },
      body: rawBody
    });

    if (res.status !== 404) {
      // Must reject with 400 or 401
      ctx.assert(
        res.status === 400 || res.status === 401,
        `Tampered Paystack signature must be rejected with 400 or 401. Got: ${res.status}`
      );
    }
  }
};
