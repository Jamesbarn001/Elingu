// Phase 7: parent weekly card, billing cleanup, teacher safeguarding inbox.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const parentStore = require('../../parentStore');
const teacherStore = require('../../teacherStore');
const weeklyCard = require('../../weeklyCard');
const read = (p) => fs.readFileSync(path.join(__dirname, '..', '..', p), 'utf8');

async function familyWithChild(ctx) {
  const handle = ctx.uniqueHandle('WkChild');
  const pin = ctx.uniquePin();
  const email = ctx.uniqueEmail('parent');
  const reg = await ctx.api('/api/students/profile', { method: 'POST', body: { handle, pin, grade: 7, email } });
  const parent = parentStore.getParentByEmail(email);
  const password = 'FamilyPass2026!x';
  await ctx.api('/api/parent/verify', { method: 'POST', body: { token: parent.verifyToken, childId: reg.data.student.id, familyPassword: password } });
  return { email, password, studentId: reg.data.student.id, handle };
}

module.exports = {
  'TC-P7-01: Weekly card tells only what happened and gives more detail on higher plans': async (ctx) => {
    const data = {
      handle: 'Amani', activity: { subjectsExplored: ['Maths'], recentTopics: [{ subject: 'Maths', topic: 'Fractions', turnCount: 9 }] },
      missions: [{ status: 'completed', title: 'M1', subject: 'Maths', cbeLevel: 'ME', missedQuestions: [{ concept: 'Ratios', outcome: 'unsolved' }], exactScore: { scorePercent: 70, hintsUsedCount: 2 } }],
      week: { activeDays: 3, xp: 40, masteredTotal: 2 }
    };
    const free = weeklyCard.build({ ...data, tier: 'free' });
    ctx.assert(free.tryTonight && free.headline, 'free card has the basics');
    ctx.assert(!('stuckOn' in free) && !('weekXp' in free), 'free card has no extra detail');
    const std = weeklyCard.build({ ...data, tier: 'standard' });
    ctx.assert(std.stuckOn.length === 1 && !('weekXp' in std), 'standard adds stuck points but not the premium detail');
    const prem = weeklyCard.build({ ...data, tier: 'premium' });
    ctx.assertEqual(prem.hintsUsed, 2);
    ctx.assertEqual(prem.weekXp, 40);
  },

  'TC-P7-02: Weekly card is honest when nothing happened and strips markup': async (ctx) => {
    const quiet = weeklyCard.build({ handle: 'Zuri', tier: 'free', activity: { subjectsExplored: [], recentTopics: [] }, missions: [], week: { activeDays: 0, xp: 0 } });
    ctx.assertEqual(quiet.hasActivity, false);
    ctx.assertIncludes(quiet.headline, 'has not studied yet');
    const evil = weeklyCard.build({ handle: '<img src=x onerror=alert(1)>Kim', tier: 'standard', activity: { subjectsExplored: ['<b>Maths</b>'], recentTopics: [] }, missions: [], week: { activeDays: 1, xp: 1 } });
    ctx.assert(!/[<>]/.test(JSON.stringify(evil)), 'no markup survives in the card');
  },

  'TC-P7-03: Parent dashboard returns a weekly card for each child': async (ctx) => {
    const fam = await familyWithChild(ctx);
    const dash = await ctx.api('/api/parent/dashboard', { method: 'POST', body: { email: fam.email, familyPassword: fam.password } });
    ctx.assertEqual(dash.status, 200);
    const child = dash.data.children.find(c => c.id === fam.studentId);
    ctx.assert(child && child.weeklyCard && child.weeklyCard.tryTonight, 'child has a weekly card');
  },

  'TC-P7-04: Card payments go to the provider page, and Paybill/card-form leftovers are gone': async (ctx) => {
    const src = read('server.js');
    ctx.assert(!/id="cardNum"|id="cardCvv"|id="cardExp"/.test(src), 'no card number fields on our own page');
    ctx.assert(!/payTabBtnPaybill|submitPaybillPayment|completeSimulatedMpesa/.test(src), 'dead payment paths are removed');
    ctx.assert(/authorizationUrl/.test(src) && /submitCardPayment/.test(src), 'card button hands off to Paystack');
  },

  'TC-P7-05: Paystack start needs the parent login and ignores any price the browser sends': async (ctx) => {
    const noAuth = await ctx.api('/api/payment/paystack/initialize', { method: 'POST', body: { email: 'x@example.com', tier: 'standard', amount: 1 } });
    ctx.assertEqual(noAuth.status, 401);
    const fam = await familyWithChild(ctx);
    const bad = await ctx.api('/api/payment/quote', { method: 'POST', body: { email: fam.email, familyPassword: 'wrong-password-1', tier: 'standard', billingCycle: 'monthly' } });
    ctx.assert(bad.status === 401 || bad.status === 423, 'quote needs the real family password');
  },

  'TC-P7-06: The server quotes the price and the end date': async (ctx) => {
    const fam = await familyWithChild(ctx);
    const q = await ctx.api('/api/payment/quote', { method: 'POST', body: { email: fam.email, familyPassword: fam.password, tier: 'standard', billingCycle: 'monthly', studentId: fam.studentId } });
    ctx.assertEqual(q.status, 200);
    ctx.assertEqual(q.data.amount, 699);
    ctx.assertEqual(q.data.period, 'month');
    ctx.assert(new Date(q.data.accessUntil) > new Date(), 'end date is in the future');
    const bogus = await ctx.api('/api/payment/quote', { method: 'POST', body: { email: fam.email, familyPassword: fam.password, tier: 'platinum' } });
    ctx.assertEqual(bogus.status, 400);
  },

  'TC-P7-07: Every inline script in the parent portal still parses': async (ctx) => {
    const res = await fetch(ctx.getBaseUrl() + '/parent/portal');
    const html = await res.text();
    const scripts = [...html.matchAll(/<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).filter(s => s.trim());
    ctx.assert(scripts.length > 0, 'portal has scripts');
    scripts.forEach(code => new vm.Script(code));
    ctx.assert(html.includes('id="weeklyCards"'), 'weekly card mount exists');
  },

  'TC-P7-08: Safeguarding inbox is for school leaders only, and updates are recorded': async (ctx) => {
    const adminCode = ctx.uniqueSchoolCode('SGI');
    const created = await ctx.api('/api/school/create', { method: 'POST', body: { name: 'Inbox High', county: 'Nairobi', adminCode, grades: [7], streams: { '7': ['East'] } } });
    ctx.assertEqual(created.status, 200);
    const schoolId = created.data.school.id;
    const alertItem = teacherStore.recordSchoolSafeguardingAlert({ schoolId, studentId: 'stu_x', studentHandle: 'Nia', matchedWord: 'hopeless', category: 'distress_keyword' });
    ctx.assert(alertItem && alertItem.id, 'alert recorded');

    const head = ctx.createTeacherToken({ id: 'tch_head', role: 'school_admin', schoolId, name: 'Head' });
    const sub = ctx.createTeacherToken({ id: 'tch_sub', role: 'subject_teacher', schoolId, name: 'Sub' });
    const auth = (t) => ({ headers: { Authorization: 'Bearer ' + t } });

    ctx.assertEqual((await ctx.api('/api/school/safeguarding')).status, 401);
    ctx.assertEqual((await ctx.api('/api/school/safeguarding', auth(sub))).status, 403);
    const list = await ctx.api('/api/school/safeguarding', auth(head));
    ctx.assertEqual(list.status, 200);
    ctx.assert(list.data.alerts.some(a => a.id === alertItem.id), 'leader sees the alert');

    const bad = await ctx.api('/api/school/safeguarding/' + alertItem.id, { method: 'POST', ...auth(head), body: { status: 'deleted' } });
    ctx.assertEqual(bad.status, 400);
    const ok = await ctx.api('/api/school/safeguarding/' + alertItem.id, { method: 'POST', ...auth(head), body: { status: 'resolved', note: 'Spoke to the learner <b>today</b>' } });
    ctx.assertEqual(ok.status, 200);
    ctx.assertEqual(ok.data.alert.status, 'resolved');
    ctx.assert(!/[<>]/.test(ok.data.alert.reviewNote), 'note is stripped of markup');
    ctx.assertEqual(ok.data.alert.parentNotificationHeld, true);

    const otherSchool = ctx.createTeacherToken({ id: 'tch_o', role: 'school_admin', schoolId: 'sch_other_none', name: 'Other' });
    const none = await ctx.api('/api/school/safeguarding', auth(otherSchool));
    ctx.assert(!(none.data.alerts || []).some(a => a.id === alertItem.id), 'another school cannot see it');
  },

  'TC-P7-09: National ID numbers are masked in the portal': async (ctx) => {
    ctx.assertEqual(teacherStore.maskIdNumber('12345678'), '*****678');
    ctx.assertEqual(teacherStore.maskIdNumber(''), '');
    ctx.assert(/maskIdNumber\(teacher\.idNumber\)/.test(read('teacherRoutes.js')), 'own profile is masked');
  }
};
