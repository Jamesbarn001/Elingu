const assert = require('assert');
const crypto = require('crypto');
const pricingConfig = require('../../pricingConfig');
const paymentStore = require('../../paymentStore');

function computePaystackSignature(rawBody) {
  const secret = process.env.PAYSTACK_SECRET_KEY || 'sk_test_elingu_demo_secret_2026';
  return crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
}

module.exports = {
  name: 'USD Currency Payments Support',
  tests: {
    'TC-USD-01: Server calculates authoritative USD pricing for British and CBC plans': async (ctx) => {
      // British Termly in USD
      const briTermly = paymentStore.calculateExpectedPrice({
        curriculum: 'BRITISH',
        planPeriod: 'termly',
        currency: 'USD'
      });
      assert.strictEqual(briTermly.amount, 69, 'British Termly must be $69 USD');
      assert.strictEqual(briTermly.currency, 'USD', 'Currency must be USD');

      // British Monthly in USD
      const briMonthly = paymentStore.calculateExpectedPrice({
        curriculum: 'BRITISH',
        planPeriod: 'monthly',
        currency: 'USD'
      });
      assert.strictEqual(briMonthly.amount, 29, 'British Monthly must be $29 USD');

      // CBC Termly in USD (for diaspora)
      const cbcTermly = paymentStore.calculateExpectedPrice({
        curriculum: 'CBC',
        planPeriod: 'termly',
        currency: 'USD'
      });
      assert.strictEqual(cbcTermly.amount, 10, 'CBC Termly must be $10 USD');
      assert.strictEqual(cbcTermly.currency, 'USD', 'Currency must be USD');
    },

    'TC-USD-02: Paystack initialization accepts currency USD and calculates $69': async (ctx) => {
      const res = await ctx.api('/api/payment/paystack/initialize', {
        method: 'POST',
        body: {
          email: 'diaspora_parent_' + Date.now() + '@elingu-test.local',
          curriculum: 'BRITISH',
          planPeriod: 'termly',
          currency: 'USD'
        }
      });
      assert.strictEqual(res.status, 200, 'Initialization should return 200');
      assert.strictEqual(res.data.currency, 'USD', 'Returned currency must be USD');
      assert.strictEqual(res.data.amount, 69, 'Returned amount must be $69 USD');
      assert.ok(res.data.reference, 'Must return reference');
    },

    'TC-USD-03: Paystack webhook processes valid USD payment and activates subscription': async (ctx) => {
      const email = 'usd_parent_' + Date.now() + '@elingu-test.local';
      const ref = 'pstk_usd_valid_' + Date.now();

      // 1. Initialize intent in USD
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

      // 2. Webhook payload with USD ($69 = 6900 cents)
      const payload = {
        event: 'charge.success',
        data: {
          reference: ref,
          amount: 6900,
          currency: 'USD',
          status: 'success',
          customer: { email },
          metadata: { curriculum: 'BRITISH', planPeriod: 'termly' }
        }
      };
      const rawBody = JSON.stringify(payload);
      const signature = computePaystackSignature(rawBody);

      const res = await ctx.api('/api/payment/paystack-webhook', {
        method: 'POST',
        headers: {
          'x-paystack-signature': signature,
          'Content-Type': 'application/json'
        },
        body: rawBody
      });

      assert.strictEqual(res.status, 200, 'Webhook should return 200 for valid USD charge');
      assert.strictEqual(res.data.success, true, 'Payment activation must succeed');
      assert.strictEqual(res.data.currency, 'USD', 'Ledger record must show currency USD');
    },

    'TC-USD-04: Unsupported currencies (e.g. EUR) are rejected': async (ctx) => {
      const payload = {
        event: 'charge.success',
        data: {
          reference: 'pstk_eur_test_' + Date.now(),
          amount: 5000,
          currency: 'EUR',
          status: 'success'
        }
      };
      const rawBody = JSON.stringify(payload);
      const signature = computePaystackSignature(rawBody);

      const res = await ctx.api('/api/payment/paystack-webhook', {
        method: 'POST',
        headers: {
          'x-paystack-signature': signature,
          'Content-Type': 'application/json'
        },
        body: rawBody
      });

      assert.strictEqual(res.status, 400, 'Unsupported currency must return 400');
      assert.strictEqual(res.data.rejected, true, 'Rejected flag must be true');
    }
  }
};
