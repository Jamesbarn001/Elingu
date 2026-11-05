// ============================================================
// Tier 1 — Sign-up, consent and session hygiene (Phase 3 of the November 2026 audit)
// ============================================================

const fs = require('fs');
const path = require('path');
const authUtils = require('../../authUtils');
const studentStore = require('../../studentStore');
const parentStore = require('../../parentStore');
const secureJson = require('../../secureJson');
const { DATA_DIR } = require('../../dataDir');

const ROOT = path.resolve(__dirname, '..', '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

module.exports = {
  'TC-SGN-01: Privacy notice and terms are public, plain, and make no compliance claims': async (ctx) => {
    for (const route of ['/privacy', '/terms']) {
      const res = await ctx.api(route);
      ctx.assertEqual(res.status, 200, `${route} must load without signing in`);
      const html = typeof res.data === 'string' ? res.data : res.text;
      ctx.assert(html.includes(studentStore.CONSENT_TEXT_VERSION), `${route} must show its version`);
      ctx.assert(!/\bcompliant\b|certified|approved by/i.test(html.replace(/not (certified|approved)/gi, '')), `${route} must not claim compliance or certification`);
    }
    const privacy = (await ctx.api('/privacy')).data;
    for (const must of ['Who we are', 'What we collect', 'parent or guardian', 'AI providers', 'How long we keep it', 'Your rights', '116', 'Data Protection Commissioner']) {
      ctx.assert(privacy.includes(must), `privacy notice must cover: ${must}`);
    }
  },

  'TC-SGN-02: No compliance badges anywhere in the app, portals or emails': async (ctx) => {
    const banned = /KDPA 2019 Protected|Compliant with Kenya|DPA 2019 compliant|End-to-End Encrypted|Protected under (Kenya|KDPA)|GOVERNANCE COMPLIANT|Zero-PII KDPA|Zero card data/i;
    for (const file of ['public/index.html', 'server.js', 'teacherRoutes.js', 'adminRoutes.js', 'emailService.js']) {
      const lines = read(file).split('\n').filter(l => banned.test(l) && !l.trim().startsWith('//'));
      ctx.assertEqual(lines.length, 0, `${file} still contains a banned badge/claim: ${lines[0] || ''}`);
    }
  },

  'TC-SGN-03: Explore-first catalogue is database-driven and keeps the curricula apart': async (ctx) => {
    const cbc = (await ctx.api('/api/curriculum/catalogue?curriculum=CBC')).data;
    ctx.assert(cbc.success && cbc.grades.length >= 6, 'CBC levels must be listed');
    const cbc8 = (await ctx.api('/api/curriculum/catalogue?curriculum=CBC&grade=8')).data;
    ctx.assert(cbc8.subjects.some(s => s.name === 'Mathematics'), 'CBC Grade 8 must offer Mathematics');
    const bri = (await ctx.api('/api/curriculum/catalogue?curriculum=BRITISH&grade=10')).data;
    ctx.assert(bri.subjects.some(s => s.name === 'Computer Science'), 'Cambridge Year 10 must offer Computer Science');
    ctx.assert(!bri.subjects.some(s => /Computer Studies/i.test(s.name)), 'Cambridge must never show the Kenyan name "Computer Studies"');
    ctx.assert(!JSON.stringify(bri).includes('Strand'), 'Cambridge catalogue must not use the word "Strand"');
  },

  'TC-SGN-04: Explore screen ships with the app and works before any account exists': async (ctx) => {
    const html = (await ctx.api('/index.html')).data;
    ctx.assert(html.includes('/explore.css') && html.includes('/explore.js'), 'index.html must load the explore assets');
    ctx.assertEqual((await ctx.api('/explore.js')).status, 200);
    ctx.assertEqual((await ctx.api('/explore.css')).status, 200);
    const sw = read('public/sw.js');
    ctx.assert(sw.includes('/explore.js') && sw.includes('/explore.css'), 'service worker must precache the explore assets');
    const js = read('public/explore.js');
    ctx.assert(!/localStorage\.setItem\([^)]*(email|phone|name)/i.test(js), 'explore must not store personal data');
    // anonymous map access works (nothing about the learner is needed)
    const map = (await ctx.api('/api/curriculum/map?curriculum=CBC&grade=8&subject=Mathematics')).data;
    ctx.assert(map.success && map.map.stations.length > 0, 'public roadmap preview must load');
  },

  'TC-SGN-05: Sign-up asks for the minimum and the consent box is not pre-ticked': async (ctx) => {
    const html = read('public/index.html');
    ctx.assert(/<input type="hidden" id="figmaRealName"/.test(html), 'real name is no longer asked for');
    const tag = /<input[^>]*id="parentConsentCheckbox"[^>]*>/.exec(html)[0];
    ctx.assert(!/\bchecked\b/.test(tag), 'consent box must start unticked');
    ctx.assert(html.includes('<details') && html.includes('Optional: add my own email or phone'), 'recovery contact is optional and tucked away');
    ctx.assert(!/password,\n\s+email,/.test(html), 'the PIN must not be saved in the browser draft');
  },

  'TC-SGN-06: Parental consent is only recorded when the parent confirms, with an auditable record': async (ctx) => {
    const handle = ctx.uniqueHandle('Consent');
    const reg = await ctx.api('/api/students/profile', {
      method: 'POST',
      body: { handle, pin: ctx.uniquePin(), grade: 7, email: ctx.uniqueEmail('parent'), parentConsent: true }
    });
    ctx.assertEqual(reg.status, 200);
    const id = reg.data.student.id;
    let stu = studentStore.getStudentById(id, true);
    ctx.assertEqual(stu.parentConsent, false, 'a tick-box typed by the child is not parental consent');
    ctx.assert(stu.childAttestedPermissionAt, 'what the child said is kept separately');
    ctx.assertEqual(stu.consent, null, 'no consent record before the parent confirms');

    studentStore.setStudentParentVerified(id, { method: 'activation_link_and_family_password' });
    stu = studentStore.getStudentById(id, true);
    ctx.assertEqual(stu.parentConsent, true);
    ctx.assert(stu.consent && stu.consent.consentGivenAt, 'consentGivenAt recorded');
    ctx.assertEqual(stu.consent.method, 'activation_link_and_family_password');
    ctx.assertEqual(stu.consent.textVersion, studentStore.CONSENT_TEXT_VERSION);
    ctx.assert(stu.consent.parentContact, 'which contact approved is recorded');
    const first = stu.consent.consentGivenAt;
    studentStore.setStudentParentVerified(id, { method: 'something_else' });
    ctx.assertEqual(studentStore.getStudentById(id, true).consent.consentGivenAt, first, 'the first consent record is never overwritten');
  },

  'TC-SGN-07: OTP codes lock after 5 wrong guesses and a verified code expires quickly': async (ctx) => {
    const rec = {};
    authUtils.storeOTPOnRecord(rec, '123456');
    for (let i = 0; i < 4; i++) ctx.assertEqual(authUtils.verifyOTPFromRecord(rec, '000000').valid, false);
    ctx.assert(rec.otpHash, 'code still alive after 4 wrong guesses');
    const fifth = authUtils.verifyOTPFromRecord(rec, '000000');
    ctx.assertEqual(fifth.valid, false);
    ctx.assert(/too many/i.test(fifth.error), 'fifth wrong guess invalidates the code');
    ctx.assertEqual(authUtils.verifyOTPFromRecord(rec, '123456').valid, false, 'the right code no longer works once locked');

    const ok = {};
    authUtils.storeOTPOnRecord(ok, '654321');
    ctx.assertEqual(authUtils.verifyOTPFromRecord(ok, '654321').valid, true);
    ctx.assertEqual(authUtils.isOtpVerificationFresh(ok), true, 'fresh right after verifying');
    ok.otpVerifiedUntil = new Date(Date.now() - 1000).toISOString();
    ctx.assertEqual(authUtils.isOtpVerificationFresh(ok), false, 'an abandoned reset cannot be finished later');
    ctx.assertEqual(authUtils.isOtpVerificationFresh({ otpVerified: true }), false, 'old records without an expiry are treated as expired');
  },

  'TC-SGN-08: Resend needs the learner token, and an expired activation link is replaced with a fresh one': async (ctx) => {
    const reg = await ctx.api('/api/students/profile', {
      method: 'POST',
      body: { handle: ctx.uniqueHandle('Resend'), pin: ctx.uniquePin(), grade: 7, email: ctx.uniqueEmail('parent') }
    });
    const id = reg.data.student.id;
    const anon = await ctx.api('/api/students/resend-verification', { method: 'POST', noAuth: true, body: { studentId: id } });
    ctx.assertEqual(anon.status, 401, 'knowing a student id must not be enough to trigger messages to a parent');

    const email = ctx.uniqueEmail('stale');
    parentStore.createParent({ email, phone: ctx.uniquePhone() });
    const file = path.join(DATA_DIR, 'parents.json');
    const doc = secureJson.readJson(file, { parents: [] });
    const p = doc.parents.find(x => x.email === email);
    const oldToken = p.verifyToken;
    p.tokenExpiresAt = new Date(Date.now() - 3600 * 1000).toISOString();
    secureJson.writeJson(file, doc);
    const fresh = parentStore.ensureFreshVerifyToken(email);
    ctx.assert(fresh && fresh !== oldToken, 'an expired link must be replaced with a new token');
    ctx.assert(new Date(parentStore.getParentByEmail(email).tokenExpiresAt).getTime() > Date.now(), 'and the new token must be valid');
  },

  'TC-SGN-09: Contacts nobody confirmed are removed': async (ctx) => {
    const email = ctx.uniqueEmail('ghost');
    parentStore.createParent({ email, phone: ctx.uniquePhone() });
    const file = path.join(DATA_DIR, 'parents.json');
    const doc = secureJson.readJson(file, { parents: [] });
    doc.parents.find(x => x.email === email).tokenExpiresAt = new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString();
    secureJson.writeJson(file, doc);
    ctx.assert(parentStore.getParentByEmail(email), 'ghost contact exists before the purge');
    const removed = parentStore.purgeExpiredUnverifiedParents(() => false);
    ctx.assert(removed >= 1, 'purge removes expired, unconfirmed contacts');
    ctx.assertEqual(parentStore.getParentByEmail(email), null);
    // a verified parent is never touched
    const keep = ctx.uniqueEmail('keep');
    parentStore.createParent({ email: keep, phone: ctx.uniquePhone(), familyPin: '482915', verified: true });
    parentStore.purgeExpiredUnverifiedParents(() => false);
    ctx.assert(parentStore.getParentByEmail(keep), 'verified parents are kept');
  },

  'TC-SGN-10: Signing out ends the session on the server too': async (ctx) => {
    const stu = await ctx.createVerifiedStudent('SignOut');
    const before = await ctx.api(`/api/students/session?studentId=${stu.id}&subject=Mathematics`);
    ctx.assertEqual(before.status, 200, 'token works before sign-out');
    const out = await ctx.api('/api/students/logout', { method: 'POST', headers: { Authorization: 'Bearer ' + stu.token }, body: {} });
    ctx.assertEqual(out.status, 200);
    const after = await ctx.api(`/api/students/session?studentId=${stu.id}&subject=Mathematics`);
    ctx.assertEqual(after.status, 401, 'a signed-out token must stop working');
  },

  'TC-SGN-11: Tokens are never accepted in URLs, and 2FA codes are not echoed outside tests': async (ctx) => {
    const teacherSrc = read('teacherRoutes.js');
    ctx.assert(!/req\.query\.token/.test(teacherSrc), 'teacher routes must not read a token from the query string');
    ctx.assert(!/req\.query\.token/.test(read('adminRoutes.js')), 'admin routes must not read a token from the query string');
    ctx.assert(/const isDev = process\.env\.NODE_ENV === 'test'/.test(teacherSrc), 'devOtp only for tests');
    const res = await ctx.api('/api/teacher/dashboard-data?token=' + encodeURIComponent('abc.def'));
    ctx.assertEqual(res.status, 401);
  },

  'TC-SGN-12: A visitor with no token gets the public lists only (sign-up still works) and no learner profiles': async (ctx) => {
    const res = await ctx.api('/api/students/profiles', { noAuth: true });
    ctx.assertEqual(res.status, 200);
    ctx.assertEqual((res.data.students || []).length, 0, 'no learner profiles for anonymous visitors');
    ctx.assert(Array.isArray(res.data.counties) && res.data.counties.length > 10, 'counties list is still public');
    const bad = await ctx.api('/api/students/profiles', { noAuth: true, headers: { Authorization: 'Bearer not.a.token' } });
    ctx.assertEqual(bad.status, 401, 'an invalid token is still refused');
  }
};
