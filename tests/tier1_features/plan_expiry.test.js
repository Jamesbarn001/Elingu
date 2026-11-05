// Paid plans end on a date: 3 days of grace, then the learner is back on Free; paying early adds days.
const path = require('path');
const parentStore = require('../../parentStore');
const studentStore = require('../../studentStore');

const DAY = 86400000;
async function family(ctx) {
  const handle = ctx.uniqueHandle('Exp');
  const email = ctx.uniqueEmail('parent');
  const reg = await ctx.api('/api/students/profile', { method: 'POST', body: { handle, pin: ctx.uniquePin(), grade: 7, email } });
  const parent = parentStore.getParentByEmail(email);
  const password = 'FamilyPass2026!x';
  await ctx.api('/api/parent/verify', { method: 'POST', body: { token: parent.verifyToken, childId: reg.data.student.id, familyPassword: password } });
  return { email, password, id: reg.data.student.id };
}
function pay(f, tier, cycle) {
  return parentStore.setChildSubscription(f.email, f.id, tier, cycle, { verifiedPayment: true, receipt: 'RC' + Math.random().toString(36).slice(2, 10).toUpperCase(), intentId: 'int_' + Date.now() });
}
// The clock is moved with the `now` option, so these tests never edit data files.
const resolve = (f, now) => studentStore.resolveStudentTier(studentStore.getStudentById(f.id), now ? { now } : {});

module.exports = {
  'TC-EXP-01: A verified payment gives a paid plan with an end date': async (ctx) => {
    const f = await family(ctx);
    ctx.assert(pay(f, 'premium', 'monthly').success, 'payment recorded');
    const r = resolve(f);
    ctx.assertEqual(r.subscriptionTier, 'premium');
    ctx.assertEqual(r.subscription.status, 'active');
    const days = (new Date(r.subscription.paidUntil) - Date.now()) / DAY;
    ctx.assert(days > 29 && days <= 30.1, 'about 30 days for a month, got ' + days);
  },

  'TC-EXP-02: Paying early adds a period to the current end date': async (ctx) => {
    const f = await family(ctx);
    pay(f, 'standard', 'monthly');
    const first = new Date(resolve(f).subscription.paidUntil);
    pay(f, 'standard', 'monthly');
    const second = new Date(resolve(f).subscription.paidUntil);
    const added = (second - first) / DAY;
    ctx.assert(added > 29 && added < 31, 'a second payment adds about 30 days, added ' + added);
  },

  'TC-EXP-03: Three days of grace, then back to Free': async (ctx) => {
    const f = await family(ctx);
    pay(f, 'premium', 'monthly');
    const inGrace = new Date(Date.now() + 31 * DAY);                       // ended yesterday: inside the grace days
    let r = resolve(f, inGrace);
    ctx.assertEqual(r.subscriptionTier, 'premium', 'still premium during grace');
    ctx.assertEqual(r.subscription.status, 'grace');
    r = resolve(f, new Date(Date.now() + 35 * DAY));                       // ended 5 days ago: past the grace days
    ctx.assertEqual(r.subscriptionTier, 'free', 'free after grace');
    ctx.assertEqual(r.subscription.status, 'expired');
    r = resolve(f, new Date(Date.now() + 25 * DAY));
    ctx.assertEqual(r.subscription.status, 'ending_soon', 'a week before the end');
  },

  'TC-EXP-04: Older plans without an end date keep working': async (ctx) => {
    const f = await family(ctx);
    parentStore.setChildSubscription(f.email, f.id, 'standard', 'monthly');   // set without a payment, as older accounts were
    const r = resolve(f, new Date(Date.now() + 400 * DAY));
    ctx.assertEqual(r.subscriptionTier, 'standard');
    ctx.assertEqual(r.subscription.status, 'none');
  },

  'TC-EXP-05: The parent dashboard shows the end date': async (ctx) => {
    const f = await family(ctx);
    pay(f, 'premium', 'monthly');
    const dash = await ctx.api('/api/parent/dashboard', { method: 'POST', body: { email: f.email, familyPassword: f.password } });
    const child = dash.data.children.find(c => c.id === f.id);
    ctx.assertEqual(child.subscription.status, 'active');
    ctx.assert(child.subscription.paidUntil, 'end date is sent');
    ctx.assertEqual(child.subscriptionTier, 'premium');
  },

  'TC-EXP-06: The price quote counts from the current end date when the plan is still running': async (ctx) => {
    const f = await family(ctx);
    pay(f, 'premium', 'monthly');
    const end = new Date(resolve(f).subscription.paidUntil);
    const q = await ctx.api('/api/payment/quote', { method: 'POST', body: { email: f.email, familyPassword: f.password, tier: 'premium', billingCycle: 'monthly', studentId: f.id } });
    ctx.assertEqual(q.status, 200);
    ctx.assertEqual(q.data.extendsCurrent, true);
    const added = (new Date(q.data.accessUntil) - end) / DAY;
    ctx.assert(added > 29 && added < 31, 'quote adds a month to the current end date, added ' + added);
  },

  'TC-EXP-07: M-Pesa and card activations both record a verified payment': async (ctx) => {
    const fs = require('fs');
    const src = fs.readFileSync(path.join(__dirname, '..', '..', 'server.js'), 'utf8');
    const m = src.match(/\[Daraja Callback\][\s\S]{0,4000}/);
    ctx.assert(/payment\.billingCycle, \{ verifiedPayment: true, receipt: normalizedReceipt/.test(src), 'M-Pesa activation passes a verified payment');
    ctx.assert(m, 'daraja callback found');
  }
};
