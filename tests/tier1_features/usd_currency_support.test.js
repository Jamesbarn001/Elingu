const assert = require('assert');
const crypto = require('crypto');
const pricingConfig = require('../../pricingConfig');
const paymentStore = require('../../paymentStore');

function computePaystackSignature(rawBody) {
  const secret = process.env.PAYSTACK_SECRET_KEY || 'sk_test_elingu_demo_secret_2026';
  return crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
}

module.exports = {
  name: 'Feature 23: USD Currency Payments & Dual KES/USD Support',
  run: async (ctx) => {
    // 1. Verify British and CBC plans calculate USD authoritative prices
    const briTermly = paymentStore.calculateExpectedPrice({
      curriculum: 'BRITISH',
      planPeriod: 'termly',
      currency: 'USD'
    });
    assert.strictEqual(briTermly.amount, 69, 'British Termly must be $69 USD');
    assert.strictEqual(briTermly.currency, 'USD', 'Currency must be USD');

    const briMonthly = paymentStore.calculateExpectedPrice({
      curriculum: 'BRITISH',
      planPeriod: 'monthly',
      currency: 'USD'
    });
    assert.strictEqual(briMonthly.amount, 29, 'British Monthly must be $29 USD');

    const cbcTermly = paymentStore.calculateExpectedPrice({
      curriculum: 'CBC',
      planPeriod: 'termly',
      currency: 'USD'
    });
    assert.strictEqual(cbcTermly.amount, 10, 'CBC Termly must be $10 USD');

    // 2. Paystack initialization with USD currency
    // The parent must now be logged in to start a payment: register a family first.
    const parentStore = require('../../parentStore');
    const dEmail = ctx.uniqueEmail('diaspora');
    const dReg = await ctx.api('/api/students/profile', { method: 'POST', body: { handle: ctx.uniqueHandle('Dia'), pin: ctx.uniquePin(), grade: 10, email: dEmail } });
    const dParent = parentStore.getParentByEmail(dEmail);
    await ctx.api('/api/parent/verify', { method: 'POST', body: { token: dParent.verifyToken, childId: dReg.data.student.id, familyPassword: 'FamilyPass2026!x' } });
    const initRes = await ctx.api('/api/payment/paystack/initialize', {
      method: 'POST',
      body: {
        email: dEmail,
        familyPassword: 'FamilyPass2026!x',
        curriculum: 'BRITISH',
        planPeriod: 'termly',
        currency: 'USD'
      }
    });
    if (initRes.status !== 200) {
      console.error('DEBUG initRes status:', initRes.status, 'data:', initRes.data);
    }
    assert.strictEqual(initRes.status, 200, `Paystack init in USD must return 200, got: ${JSON.stringify(initRes.data)}`);
    assert.strictEqual(initRes.data.currency, 'USD', 'Returned currency must be USD');
    assert.strictEqual(initRes.data.amount, 69, 'Returned amount must be 69');

    // 3. Paystack webhook processes valid USD payment ($69 = 6900 cents)
    const email = 'usd_parent_' + Date.now() + '@elingu-test.local';
    const ref = 'pstk_usd_valid_' + Date.now();
    paymentStore.createIntent({
      email,
      curriculum: 'BRITISH',
      planPeriod: 'termly',
      tier: 'premium',
      amount: 69,
      currency: 'USD',
      provider: 'paystack',
      transactionRef: ref
    });

    const payload = {
      event: 'charge.success',
      data: {
        reference: ref,
        amount: 6900,
        currency: 'USD',
        status: 'success',
        customer: { email },
        metadata: { curriculum: 'BRITISH', planPeriod: 'termly', currency: 'USD' }
      }
    };
    const rawBody = JSON.stringify(payload);
    const signature = computePaystackSignature(rawBody);

    const webhookRes = await ctx.api('/api/payment/paystack-webhook', {
      method: 'POST',
      headers: {
        'x-paystack-signature': signature,
        'Content-Type': 'application/json'
      },
      body: rawBody
    });
    assert.strictEqual(webhookRes.status, 200, 'Webhook must return 200 for valid USD payment');
    assert.strictEqual(webhookRes.data.success, true, 'Payment must succeed');
    assert.strictEqual(webhookRes.data.currency, 'USD', 'Payment currency must be USD');

    // 4. Unsupported currency rejection (e.g. EUR)
    const badPayload = {
      event: 'charge.success',
      data: {
        reference: 'pstk_eur_' + Date.now(),
        amount: 5000,
        currency: 'EUR',
        status: 'success'
      }
    };
    const badRaw = JSON.stringify(badPayload);
    const badSig = computePaystackSignature(badRaw);

    const badRes = await ctx.api('/api/payment/paystack-webhook', {
      method: 'POST',
      headers: {
        'x-paystack-signature': badSig,
        'Content-Type': 'application/json'
      },
      body: badRaw
    });
    assert.strictEqual(badRes.status, 400, 'Unsupported currency must be rejected with 400');
    assert.strictEqual(badRes.data.rejected, true, 'Rejected flag must be true');

    return true;
  }
};
