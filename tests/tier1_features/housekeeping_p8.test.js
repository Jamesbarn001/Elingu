// Pilot codes (private, once per account) and the Kenyan-day fix for the daily limit.
const fs = require('fs');
const path = require('path');
const parentStore = require('../../parentStore');
const studentStore = require('../../studentStore');

function freshPilotConfig(envValue) {
  const key = require.resolve('../../pilotConfig');
  const old = process.env.ELINGU_PILOT_CODES;
  if (envValue === undefined) delete process.env.ELINGU_PILOT_CODES; else process.env.ELINGU_PILOT_CODES = envValue;
  delete require.cache[key];
  const cfg = require('../../pilotConfig');
  delete require.cache[key];
  if (old === undefined) delete process.env.ELINGU_PILOT_CODES; else process.env.ELINGU_PILOT_CODES = old;
  return cfg;
}

module.exports = {
  'TC-HK-01: When private pilot codes are configured, the public built-in ones stop working': async (ctx) => {
    const cfg = freshPilotConfig(JSON.stringify({ 'kamau-7xq2': { type: 'school', cohortName: 'Kamau JSS', durationDays: 45 } }));
    ctx.assertEqual(cfg.verifyPilotCode('KAMAU-7XQ2').valid, true);
    ctx.assertEqual(cfg.verifyPilotCode('kamau-7xq2').durationDays, 45);
    ctx.assertEqual(cfg.verifyPilotCode('PILOT2026').valid, false, 'the old public code no longer works');
    const broken = freshPilotConfig('{not json');
    ctx.assertEqual(broken.verifyPilotCode('PILOT2026').valid, false, 'a broken setting fails closed');
  },

  'TC-HK-02: A pilot code cannot be re-entered after it runs out': async (ctx) => {
    const handle = ctx.uniqueHandle('Pil');
    const email = ctx.uniqueEmail('parent');
    const reg = await ctx.api('/api/students/profile', { method: 'POST', body: { handle, pin: ctx.uniquePin(), grade: 7, email } });
    const parent = parentStore.getParentByEmail(email);
    await ctx.api('/api/parent/verify', { method: 'POST', body: { token: parent.verifyToken, childId: reg.data.student.id, familyPassword: 'FamilyPass2026!x' } });
    const first = parentStore.activateParentPilot(email, 'TRIAL30');
    ctx.assertEqual(first.success, true);
    const again = parentStore.activateParentPilot(email, 'TRIAL30');
    ctx.assertEqual(again.success, false);
    ctx.assertIncludes(again.error, 'already been used');
  },

  'TC-HK-03: The example pilot codes are no longer printed in the forms': async (ctx) => {
    const root = path.join(__dirname, '..', '..');
    ['public/index.html', 'server.js'].forEach(f => ctx.assert(!/placeholder="e\.g\. PILOT2026/.test(fs.readFileSync(path.join(root, f), 'utf8')), f + ' still shows example codes'));
  },

  'TC-HK-05: One real contact address is shown everywhere, and the landing page makes no unproven claims': async (ctx) => {
    const { SUPPORT_EMAIL } = require('../../contactConfig');
    ctx.assert(/@/.test(SUPPORT_EMAIL) && !/support@elingu\./.test(SUPPORT_EMAIL), 'a real address is configured');
    const root = path.join(__dirname, '..', '..');
    for (const f of ['server.js', 'studentStore.js', 'public/index.html', 'teacherRoutes.js', 'public/i18n.js']) {
      ctx.assert(!/support@elingu\.(ke|com)/.test(fs.readFileSync(path.join(root, f), 'utf8')), f + ' still has an address that is not ours');
    }
    const home = await (await fetch(ctx.getBaseUrl() + '/')).text();
    ctx.assert(home.indexOf(SUPPORT_EMAIL) !== -1, 'the landing page shows the real address');
    ctx.assert(!/KDPA 2019 Protected|End-to-End Encrypted|Zero-PII|complies fully/i.test(home), 'no unproven security claims on the landing page');
  },

  'TC-HK-04: The daily limit and streak count Kenyan days, not UTC days': async (ctx) => {
    // 22:30 UTC on 4 Nov is already 01:30 on 5 Nov in Kenya
    ctx.assertEqual(studentStore.todayNairobi(new Date('2026-11-04T22:30:00Z')), '2026-11-05');
    ctx.assertEqual(studentStore.todayNairobi(new Date('2026-11-04T10:00:00Z')), '2026-11-04');
    const src = fs.readFileSync(path.join(__dirname, '..', '..', 'studentStore.js'), 'utf8');
    ctx.assert(/function getDailyTurns[\s\S]{0,400}todayNairobi\(\)/.test(src), 'getDailyTurns uses the Kenyan day');
    const srv = fs.readFileSync(path.join(__dirname, '..', '..', 'server.js'), 'utf8');
    ctx.assert(/todayStr = studentStore\.todayNairobi\(\)/.test(srv), 'the parent dashboard uses the Kenyan day');
  }
};
