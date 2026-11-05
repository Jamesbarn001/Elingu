// ============================================================
// Tier 1 — Auth hardening regression tests
// Covers the loopholes found in the November 2026 audit:
//  - Google sign-in must never accept a bare email or an unverifiable token
//  - Parent enrollment must need Google-verified proof and must not overwrite an existing PIN
//  - Parents cannot buy institutional tiers by sending a "tier" field
//  - Rate limits cannot be disabled by a request header
// ============================================================

const parentStore = require('../../parentStore');
const authUtils = require('../../authUtils');

module.exports = {
  'TC-SEC-01: /api/auth/google rejects a bare email (no credential)': async (ctx) => {
    for (const role of ['student', 'parent', 'teacher']) {
      const res = await ctx.api('/api/auth/google', { method: 'POST', body: { email: 'victim@example.com', role } });
      ctx.assertEqual(res.status, 400, `bare email must not log in as ${role}`);
      ctx.assert(!res.data.sessionToken && !res.data.token && !res.data.parent, 'No session material may be returned');
    }
  },

  'TC-SEC-02: /api/auth/google rejects a forged (unsigned) token and an email fallback together': async (ctx) => {
    const payload = Buffer.from(JSON.stringify({ email: 'victim@example.com', email_verified: true })).toString('base64url');
    const forged = `eyJhbGciOiJub25lIn0.${payload}.sig`;
    const res = await ctx.api('/api/auth/google', {
      method: 'POST',
      body: { credential: forged, email: 'victim@example.com', role: 'teacher' }
    });
    ctx.assert(res.status === 401 || res.status === 503, `forged token must be refused, got ${res.status}`);
    ctx.assert(!res.data.token, 'No teacher token may be issued');
  },

  'TC-SEC-03: complete-google-enrollment requires a Google-issued enrollment token': async (ctx) => {
    const res = await ctx.api('/api/parent/complete-google-enrollment', {
      method: 'POST',
      body: { email: ctx.uniqueEmail('hijack'), phone: '0712345678', familyPin: '482915' }
    });
    ctx.assertEqual(res.status, 401);
  },

  'TC-SEC-04: complete-google-enrollment cannot overwrite an existing Family PIN': async (ctx) => {
    const email = ctx.uniqueEmail('owner');
    // Use a unique phone: parentStore matches existing parents by phone too, so a reused number would not create a new record.
    const phone = ctx.uniquePhone();
    parentStore.createParent({ email, phone, name: 'Owner', familyPin: '582913', verified: true });
    const token = authUtils.generateEnrollmentToken(email); // what a genuine Google sign-in would have produced
    const res = await ctx.api('/api/parent/complete-google-enrollment', {
      method: 'POST',
      body: { email, phone: ctx.uniquePhone(), familyPin: '739154', enrollmentToken: token }
    });
    ctx.assertEqual(res.status, 409, 'An already-set-up account must not be re-enrolled');
    const stillOwner = await parentStore.verifyFamilyPassword(email, '582913');
    ctx.assertEqual(stillOwner.success, true, 'Original PIN must still work');
  },

  'TC-SEC-05: enrollment token is bound to its email and expires with tampering': async (ctx) => {
    const token = authUtils.generateEnrollmentToken('a@example.com');
    ctx.assertEqual(authUtils.verifyEnrollmentToken(token, 'a@example.com'), 'a@example.com');
    ctx.assertEqual(authUtils.verifyEnrollmentToken(token, 'b@example.com'), null, 'Token for another email must fail');
    ctx.assertEqual(authUtils.verifyEnrollmentToken(token + 'x', 'a@example.com'), null, 'Tampered token must fail');
  },

  'TC-SEC-06: Parents cannot purchase institutional tiers via the tier field': async (ctx) => {
    const email = ctx.uniqueEmail('buyer');
    const buyerPhone = ctx.uniquePhone();
    parentStore.createParent({ email, phone: buyerPhone, name: 'Buyer', familyPin: '482915', verified: true });
    for (const tier of ['county', 'school', 'foundation', 'pilot']) {
      const res = await ctx.api('/api/payment/mpesa-stk-push', {
        method: 'POST',
        body: { email, familyPin: '482915', phone: buyerPhone, tier, billingCycle: 'monthly' }
      });
      ctx.assertEqual(res.status, 400, `tier "${tier}" must be rejected`);
      const init = await ctx.api('/api/payment/initiate', {
        method: 'POST',
        body: { email, familyPin: '482915', phone: buyerPhone, tier, planPeriod: 'monthly', provider: 'daraja' }
      });
      ctx.assertEqual(init.status, 400, `initiate with tier "${tier}" must be rejected`);
    }
  },

  'TC-SEC-07: Test header no longer disables rate limiting (server decides test mode itself)': async (ctx) => {
    // The server spawned by the runner is in NODE_ENV=test, so limiters are skipped for everyone; here we assert the
    // source no longer trusts the header.
    const fs = require('fs');
    const path = require('path');
    const src = fs.readFileSync(path.join(__dirname, '..', '..', 'server.js'), 'utf8');
    const line = src.split('\n').find(l => l.includes('const isTestEnv'));
    ctx.assert(line, 'isTestEnv definition must exist');
    ctx.assert(!/x-elingu-test/i.test(line), 'isTestEnv must not read a request header');
  }
};
