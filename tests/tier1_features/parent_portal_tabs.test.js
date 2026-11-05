// ============================================================
// Tier 1 — Parent Portal 3-Tab Architecture & KDPA Account Customization
// Verification: Children tab, Membership & Billing tab, Account tab,
// profile customization, child switcher, and strict consent onboarding.
// ============================================================

const assert = require('assert');

module.exports = {
  'TC-PAR-TAB-01: Standalone parent portal renders Children, Membership & Billing, and Account tabs': async (ctx) => {
    const res = await ctx.api('/parent/portal');
    assert.strictEqual(res.status, 200, 'Endpoint should return HTTP 200 OK');
    const html = res.data;
    assert.ok(typeof html === 'string', 'Should return HTML string');
    assert.ok(html.includes('Children'), 'Must feature Children tab');
    assert.ok(html.includes('Membership & Billing'), 'Must feature Membership & Billing tab');
    assert.ok(html.includes('Account'), 'Must feature Account tab');
  },

  'TC-PAR-TAB-02: Children tab contains single-family multi-child switcher bar': async (ctx) => {
    const res = await ctx.api('/parent/portal');
    assert.strictEqual(res.status, 200);
    const html = res.data;
    assert.ok(html.includes('id="childSwitcherBar"'), 'Must contain child switcher bar');
    assert.ok(html.includes('scrollToChild'), 'Must provide single-family child toggle function');
  },

  'TC-PAR-TAB-03: Parent profile customization updates parent display name and phone': async (ctx) => {
    // 1. Create or ensure test parent
    const email = 'parent.tabs.test@example.com';
    const parentStore = require('../../parentStore');
    parentStore.createParent({ email, phone: '0711000111', name: 'Initial Name', familyPin: '482915', verified: true });

    // 2. Update parent profile
    const res = await ctx.api('/api/parent/update-profile', {
      method: 'POST',
      body: {
        emailOrPhone: email,
        familyPin: '482915',
        name: 'Mama Zawadi',
        username: 'Mama Zawadi',
        phone: '0722334455',
        notifications: { sms: true, weeklyDigest: true }
      }
    });

    assert.strictEqual(res.status, 200, 'Should return HTTP 200 OK');
    assert.strictEqual(res.data.success, true);
    assert.strictEqual(res.data.parent.name, 'Mama Zawadi');
    assert.strictEqual(res.data.parent.phone, '+254722334455');
    assert.strictEqual(res.data.parent.familyPinHash, undefined, 'Response must never include credential hashes');
  },

  'TC-PAR-TAB-03b: Profile update without Family PIN is rejected': async (ctx) => {
    const res = await ctx.api('/api/parent/update-profile', {
      method: 'POST',
      body: { emailOrPhone: 'parent.tabs.test@example.com', name: 'Hijack' }
    });
    assert.strictEqual(res.status, 401, 'Unauthenticated profile edit must be rejected');
  },

  'TC-PAR-TAB-04: Missing parent identifier rejected with 400 Bad Request': async (ctx) => {
    const res = await ctx.api('/api/parent/update-profile', {
      method: 'POST',
      body: {
        name: 'Unauthorized Edit'
      }
    });

    assert.strictEqual(res.status, 400, 'Should return HTTP 400 Bad Request');
    assert.strictEqual(res.data.success, false);
  },

  'TC-PAR-TAB-05: Student app strictly enforces KDPA consent (no instant anonymous bypass)': async (ctx) => {
    const res = await ctx.api('/index.html');
    assert.strictEqual(res.status, 200);
    const html = typeof res.data === 'string' ? res.data : (res.text || '');
    assert.ok(!html.includes('launchProgressiveInstantRoadmap'), 'Instant anonymous bypass must be removed');
    assert.ok(/section 33/i.test(html), 'Must explain parental consent (Kenya DPA section 33) at sign-up');
    assert.ok(html.includes('href="/privacy"'), 'Sign-up must link to the privacy notice before data is collected');
    const consentTag = /<input[^>]*id="parentConsentCheckbox"[^>]*>/.exec(html);
    assert.ok(consentTag && !/checked/.test(consentTag[0]), 'The consent tick-box must not be pre-ticked');
  }
};
