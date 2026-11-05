// Friday summary, receipts and plan reminders: content, once-only rules, unsubscribe, caps. Nothing here reaches an email provider.
const parentStore = require('../../parentStore');
const studentStore = require('../../studentStore');
const weeklyCard = require('../../weeklyCard');
const svc = require('../../notificationService');

const DAY = 86400000;
async function family(ctx, handlePrefix) {
  const handle = ctx.uniqueHandle(handlePrefix || 'Nt');
  const email = ctx.uniqueEmail('parent');
  const reg = await ctx.api('/api/students/profile', { method: 'POST', body: { handle, pin: ctx.uniquePin(), grade: 7, email } });
  const parent = parentStore.getParentByEmail(email);
  await ctx.api('/api/parent/verify', { method: 'POST', body: { token: parent.verifyToken, childId: reg.data.student.id, familyPassword: 'FamilyPass2026!x' } });
  return { email, id: reg.data.student.id, handle, parentId: parentStore.getParentByEmail(email).id };
}
const collector = () => { const sent = []; return { sent, send: async (m) => { sent.push(m); return { success: true, id: 'fake_' + sent.length }; } }; };
const withEnv = async (k, v, fn) => { const old = process.env[k]; process.env[k] = v; try { return await fn(); } finally { if (old === undefined) delete process.env[k]; else process.env[k] = old; } };

module.exports = {
  'TC-NTF-01: The Friday summary tells only what happened, escapes names, and has an unsubscribe link': async (ctx) => {
    const card = weeklyCard.build({ handle: '<img src=x onerror=alert(1)>Kim', tier: 'standard', activity: { subjectsExplored: ['Maths'], recentTopics: [{ subject: 'Maths', topic: 'Fractions', turnCount: 5 }] }, missions: [], week: { activeDays: 2, xp: 10 } });
    const m = svc.renderDigest({ parentId: 'par_abc123', cards: [{ handle: '<img src=x onerror=alert(1)>Kim', card }] });
    ctx.assert(!/<img src=x/.test(m.html), 'markup in a nickname is escaped');
    ctx.assert(/Stop these weekly emails/.test(m.html) && m.html.indexOf('/parent/unsubscribe?p=par_abc123') !== -1, 'unsubscribe link present');
    ctx.assert(/Try tonight/.test(m.html) && /Privacy notice/.test(m.html));
    ctx.assert(!/complies|compliant|certified/i.test(m.html), 'no compliance claim');
    ctx.assert(m.text.indexOf('Stop these emails') !== -1);
  },

  'TC-NTF-02: Scheduled emails are off unless switched on': async (ctx) => {
    const { sent, send } = collector();
    const r = await svc.runWeeklyDigest({ send });
    ctx.assert(r.skipped, 'off by default');
    ctx.assertEqual(sent.length, 0);
    const q = await svc.runRenewalReminders({ send });
    ctx.assert(q.skipped);
  },

  'TC-NTF-03: A parent gets the summary once a week, not after unsubscribing, and not past the daily cap': async (ctx) => {
    const f = await family(ctx);
    const { sent, send } = collector();
    const now = new Date('2031-03-07T14:00:00Z');                        // a Friday afternoon in Kenya
    await withEnv('ELINGU_EMAIL_DAILY_CAP', '1000', async () => {
      const first = await svc.runWeeklyDigest({ send, force: true, only: f.parentId, now });
      ctx.assertEqual(first.sent, 1);
      ctx.assertEqual(sent[0].to, f.email);
      ctx.assert(sent[0].subject.indexOf(f.handle) !== -1, 'subject names the child');
      const again = await svc.runWeeklyDigest({ send, force: true, only: f.parentId, now });
      ctx.assertEqual(again.sent, 0, 'once per week');
      const nextWeek = await svc.runWeeklyDigest({ send, force: true, only: f.parentId, now: new Date(now.getTime() + 7 * DAY) });
      ctx.assertEqual(nextWeek.sent, 1, 'next week is a new week');
      ctx.assert(parentStore.setEmailPref(f.parentId, 'weeklyDigest', false).success);
      const stopped = await svc.runWeeklyDigest({ send, force: true, only: f.parentId, now: new Date(now.getTime() + 14 * DAY) });
      ctx.assertEqual(stopped.sent, 0, 'unsubscribed');
      parentStore.setEmailPref(f.parentId, 'weeklyDigest', true);
    });
    await withEnv('ELINGU_EMAIL_DAILY_CAP', '0', async () => {
      const capped = await svc.runWeeklyDigest({ send, force: true, only: f.parentId, now: new Date(now.getTime() + 21 * DAY) });
      ctx.assertEqual(capped.sent, 0);
      ctx.assert(capped.stopped, 'stops at the daily cap');
    });
  },

  'TC-NTF-04: The unsubscribe link is signed, works once clicked, and can be undone': async (ctx) => {
    const f = await family(ctx);
    const url = svc.unsubscribeUrl(f.parentId).replace(/^https?:\/\/[^/]+/, ctx.getBaseUrl());
    const bad = await fetch(url.replace(/t=[0-9a-f]+/, 't=deadbeef'));
    ctx.assertEqual(bad.status, 400, 'a forged link is refused');
    const ok = await fetch(url);
    ctx.assertEqual(ok.status, 200);
    ctx.assert(/no longer get the Friday email/.test(await ok.text()));
    ctx.assertEqual((parentStore.getParentByEmail(f.email).emailPrefs || {}).weeklyDigest, false);
    const back = await fetch(url + '&on=1');
    ctx.assert(/back on/.test(await back.text()));
    ctx.assertEqual(parentStore.getParentByEmail(f.email).emailPrefs.weeklyDigest, true);
  },

  'TC-NTF-05: A receipt is sent once per payment and is not blocked by the daily cap': async (ctx) => {
    const f = await family(ctx);
    const parent = parentStore.getParentByEmail(f.email);
    const { sent, send } = collector();
    const base = { parent, learnerName: f.handle, planName: 'Premium Scholar', amount: 1499, currency: 'KES', receipt: 'QWE' + Date.now(), paidUntil: new Date(Date.now() + 30 * DAY).toISOString(), billingCycle: 'monthly' };
    await withEnv('ELINGU_EMAIL_DAILY_CAP', '0', async () => {
      ctx.assert((await svc.sendReceipt(base, { send })).success, 'sent');
      ctx.assert((await svc.sendReceipt(base, { send })).skipped, 'not twice');
    });
    ctx.assertEqual(sent.length, 1);
    ctx.assert(/1,499/.test(sent[0].html) && /Receipt number/.test(sent[0].html) && /Paid access runs to/.test(sent[0].html));
    ctx.assert(/do not renew by themselves/.test(sent[0].html), 'honest about renewal');
  },

  'TC-NTF-06: Plan reminders go out 7 days before, 1 day before and after the end, each once': async (ctx) => {
    const f = await family(ctx);
    parentStore.setChildSubscription(f.email, f.id, 'premium', 'monthly', { verifiedPayment: true, receipt: 'RMD' + Date.now() });
    const { sent, send } = collector();
    await withEnv('ELINGU_EMAIL_DAILY_CAP', '1000', async () => {
      const at = (days) => new Date(Date.now() + days * DAY);
      ctx.assertEqual((await svc.runRenewalReminders({ send, force: true, only: f.parentId, now: at(10) })).sent, 0, '10 days left: too early');
      ctx.assertEqual((await svc.runRenewalReminders({ send, force: true, only: f.parentId, now: at(24) })).sent, 1, '6 days left');
      ctx.assertEqual((await svc.runRenewalReminders({ send, force: true, only: f.parentId, now: at(25) })).sent, 0, 'same stage not repeated');
      ctx.assertEqual((await svc.runRenewalReminders({ send, force: true, only: f.parentId, now: at(29.5) })).sent, 1, 'the day before');
      ctx.assertEqual((await svc.runRenewalReminders({ send, force: true, only: f.parentId, now: at(32) })).sent, 1, 'after it ended');
    });
    ctx.assertEqual(sent.length, 3);
    ctx.assert(/ends on/.test(sent[0].subject) && /tomorrow/.test(sent[1].subject) && /has ended/.test(sent[2].subject));
  },

  'TC-NTF-07: A test address never reaches an email provider': async (ctx) => {
    const emailService = require('../../emailService');
    const r = await emailService.sendViaEmail({ to: 'someone@example.com', subject: 'x', html: '<p>x</p>', description: 'test' });
    ctx.assertEqual(r.provider, 'simulated');
  }
};
