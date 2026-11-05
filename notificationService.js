// notificationService.js — the emails a parent expects: the Friday summary, payment receipts, and plan-ending reminders.
//
// Safety rules (so nobody is spammed and your email allowance is not drained):
//   • The scheduled emails are OFF unless ELINGU_NOTIFICATIONS=on. Receipts for real payments are always sent.
//   • At most ELINGU_EMAIL_DAILY_CAP scheduled emails a day (default 40). Receipts are sent even if the cap is reached.
//   • Each parent gets the Friday summary once a week, each reminder once per plan end date, each receipt once.
//   • Every summary has a one-click unsubscribe link. Phone-only parents (no real email) are skipped.
//   • Tests and test addresses never reach an email provider (emailService already guarantees this).
// Everything shown comes from real activity (see weeklyCard.js). Nothing is invented.

const crypto = require('crypto');
const path = require('path');
const weeklyCard = require('./weeklyCard');

const BASE_URL = () => process.env.BASE_URL || process.env.APP_BASE_URL || process.env.RENDER_EXTERNAL_URL || 'https://elingu.onrender.com';
const esc = (v) => String(v === undefined || v === null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const isRealEmail = (e) => !!e && e.includes('@') && !/@(phone|teacher)\.elingu\.local$/i.test(e);

// ───────────────────────── unsubscribe links ─────────────────────────
function secret() { return process.env.SESSION_SECRET || process.env.STUDENT_TOKEN_SECRET || 'elingu_unsubscribe_dev_secret'; }
function unsubscribeToken(parentId, kind = 'digest') { return crypto.createHmac('sha256', secret()).update(`${parentId}|${kind}`).digest('hex').slice(0, 32); }
function verifyUnsubscribeToken(parentId, token, kind = 'digest') {
  const want = unsubscribeToken(parentId, kind);
  return typeof token === 'string' && token.length === want.length && crypto.timingSafeEqual(Buffer.from(token), Buffer.from(want));
}
const unsubscribeUrl = (parentId, kind = 'digest') => `${BASE_URL()}/parent/unsubscribe?p=${encodeURIComponent(parentId)}&k=${kind}&t=${unsubscribeToken(parentId, kind)}`;

// ───────────────────────── the pieces of an email ─────────────────────────
function shell({ title, preheader, bodyHtml, footerHtml }) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${esc(title)}</title></head>
<body style="margin:0;padding:20px 0;background:#F1F5F9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1F2937;">
<span style="display:none;max-height:0;overflow:hidden;">${esc(preheader || '')}</span>
<table width="100%" border="0" cellpadding="0" cellspacing="0"><tr><td align="center">
<table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width:540px;background:#FFFFFF;border-radius:16px;overflow:hidden;">
<tr><td style="background:#0D3A26;padding:20px 24px;"><div style="color:#FFFFFF;font-size:22px;font-weight:700;">🌳 Elingu</div><div style="color:#6EE7B7;font-size:12px;margin-top:2px;">Elimu ni Nguvu</div></td></tr>
<tr><td style="padding:24px;font-size:15px;line-height:1.55;">${bodyHtml}</td></tr>
<tr><td style="padding:16px 24px;background:#F8FAFC;font-size:12px;color:#64748B;line-height:1.5;">${footerHtml || ''}</td></tr>
</table></td></tr></table></body></html>`;
}
const button = (href, label) => `<p style="margin:18px 0 4px;"><a href="${esc(href)}" style="display:inline-block;background:#0D3A26;color:#FFFFFF;text-decoration:none;font-weight:700;padding:12px 20px;border-radius:10px;">${esc(label)}</a></p>`;

// ───────────────────────── Friday summary ─────────────────────────
/** cards: [{ handle, card }] where card comes from weeklyCard.build(). Pure: returns { subject, html, text }. */
function renderDigest({ parentId, cards }) {
  const names = cards.map(c => c.handle);
  const subject = names.length === 1 ? `${names[0]}'s week on Elingu` : `Your family's week on Elingu`;
  const blocks = cards.map(({ handle, card }) => {
    let h = `<div style="border:1px solid #D1FAE5;border-radius:12px;padding:14px 16px;margin:0 0 14px;">
      <div style="font-weight:700;color:#0D3A26;font-size:16px;margin-bottom:4px;">${esc(handle)}</div>
      <div>${esc(card.headline)}</div>`;
    if (card.missions && card.missions.assigned > 0) h += `<div style="margin-top:6px;">Classroom missions: ${esc(card.missions.completed)} of ${esc(card.missions.assigned)} done.</div>`;
    if (card.stuckOn && card.stuckOn.length) h += `<div style="margin-top:6px;">Found tricky: ${card.stuckOn.map(s => `${esc(s.concept)} (${esc(s.outcome)})`).join('; ')}</div>`;
    if (card.topics && card.topics.length) h += `<div style="margin-top:6px;color:#475569;">Worked on: ${card.topics.map(t => esc(t.topic)).join(', ')}</div>`;
    h += `<div style="margin-top:10px;background:#F0FDF4;border-radius:10px;padding:10px 12px;font-weight:600;">Try tonight: ${esc(card.tryTonight)}</div></div>`;
    return h;
  }).join('');
  const html = shell({
    title: subject,
    preheader: cards[0] ? cards[0].card.headline : '',
    bodyHtml: `<p style="margin:0 0 14px;">Habari! Here is the week at a glance.</p>${blocks}${button(`${BASE_URL()}/parent/portal`, 'Open the parent portal')}`,
    footerHtml: `You get this note every Friday because you are a parent on Elingu. <a href="${esc(unsubscribeUrl(parentId))}" style="color:#64748B;">Stop these weekly emails</a> · <a href="${esc(BASE_URL())}/privacy" style="color:#64748B;">Privacy notice</a>`
  });
  const text = [subject, '', ...cards.map(({ handle, card }) => `${handle}: ${card.headline}\nTry tonight: ${card.tryTonight}`), '', `Open the parent portal: ${BASE_URL()}/parent/portal`, `Stop these emails: ${unsubscribeUrl(parentId)}`].join('\n');
  return { subject, html, text };
}

// ───────────────────────── receipt ─────────────────────────
function renderReceipt({ learnerName, planName, amount, currency = 'KES', receipt, paidUntil, billingCycle }) {
  const until = paidUntil ? new Date(paidUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : null;
  const subject = `Your Elingu receipt: ${planName}`;
  const row = (k, v) => `<tr><td style="padding:6px 0;color:#64748B;">${esc(k)}</td><td style="padding:6px 0;text-align:right;font-weight:600;">${esc(v)}</td></tr>`;
  const html = shell({
    title: subject, preheader: `Thank you. ${planName} is active.`,
    bodyHtml: `<p style="margin:0 0 14px;">Asante! Your payment was received and the plan is active.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #E2E8F0;border-bottom:1px solid #E2E8F0;margin:8px 0 14px;">
        ${row('Plan', planName)}${learnerName ? row('For', learnerName) : ''}${row('Amount paid', `${currency} ${Number(amount).toLocaleString('en-US')}`)}
        ${billingCycle ? row('Period', billingCycle === 'annual' ? 'One year' : 'One month') : ''}${until ? row('Paid access runs to', until) : ''}${row('Receipt number', receipt)}
      </table>
      <p style="margin:0;color:#475569;">Plans do not renew by themselves. We will remind you before it ends, and you can renew any time from the Billing tab.</p>
      ${button(`${BASE_URL()}/parent/portal`, 'Open the parent portal')}`,
    footerHtml: `Keep this email as your receipt. Questions? Reply to this email. <a href="${esc(BASE_URL())}/privacy" style="color:#64748B;">Privacy notice</a>`
  });
  const text = `${subject}\n\nAsante! Your payment was received.\nPlan: ${planName}\n${learnerName ? 'For: ' + learnerName + '\n' : ''}Amount: ${currency} ${amount}\n${until ? 'Paid access runs to: ' + until + '\n' : ''}Receipt: ${receipt}\n`;
  return { subject, html, text };
}

// ───────────────────────── plan ending reminders ─────────────────────────
function renderReminder({ learnerName, planName, stage, paidUntil, amount, currency = 'KES' }) {
  const until = new Date(paidUntil).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const lines = {
    ending_7: { subject: `${learnerName}'s Elingu plan ends on ${until}`, lead: `${learnerName}'s ${planName} plan ends on ${until}. Renew to keep every subject and the full tutor.` },
    ending_1: { subject: `${learnerName}'s Elingu plan ends tomorrow`, lead: `${learnerName}'s ${planName} plan ends on ${until}. Renew today so nothing is interrupted.` },
    ended: { subject: `${learnerName}'s Elingu plan has ended`, lead: `${learnerName}'s ${planName} plan ended on ${until}, so ${learnerName} is back on the Free plan. Renew to get it all back.` }
  }[stage];
  const html = shell({
    title: lines.subject, preheader: lines.lead,
    bodyHtml: `<p style="margin:0 0 14px;">${esc(lines.lead)}</p>${amount ? `<p style="margin:0 0 6px;color:#475569;">One more period costs ${esc(currency)} ${esc(Number(amount).toLocaleString('en-US'))}. Paying early adds to the end date, so no days are lost.</p>` : ''}${button(`${BASE_URL()}/parent/portal`, 'Renew in the parent portal')}`,
    footerHtml: `You get a reminder like this when a paid plan is about to end. <a href="${esc(BASE_URL())}/privacy" style="color:#64748B;">Privacy notice</a>`
  });
  return { subject: lines.subject, html, text: `${lines.subject}\n\n${lines.lead}\n\nRenew: ${BASE_URL()}/parent/portal\n` };
}

// ───────────────────────── sending, with limits ─────────────────────────
const STATE_FILE = () => path.join(require('./dataDir').DATA_DIR, 'notifications.json');
function readState() { return require('./secureJson').readJson(STATE_FILE(), { days: {}, weekly: {}, reminders: {}, receipts: {} }, 'notificationService'); }
function writeState(s) {
  // keep the file small: forget counters older than 14 days
  const keep = Object.keys(s.days).sort().slice(-14); const d = {}; keep.forEach(k => { d[k] = s.days[k]; }); s.days = d;
  require('./secureJson').writeJson(STATE_FILE(), s, 'notificationService');
}
const nairobiParts = (d = new Date()) => {
  const f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Nairobi', weekday: 'short', hour: '2-digit', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(d);
  const o = {}; f.forEach(p => { o[p.type] = p.value; });
  return { weekday: o.weekday, hour: Number(o.hour) % 24, day: `${o.year}-${o.month}-${o.day}` };
};
function isoWeekKey(d = new Date()) {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const dow = (t.getUTCDay() + 6) % 7; t.setUTCDate(t.getUTCDate() - dow + 3);
  const week1 = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
  const wk = 1 + Math.round(((t - week1) / 86400000 - 3 + ((week1.getUTCDay() + 6) % 7)) / 7);
  return `${t.getUTCFullYear()}-W${String(wk).padStart(2, '0')}`;
}
const dailyCap = () => Math.max(0, parseInt(process.env.ELINGU_EMAIL_DAILY_CAP || '40', 10) || 0);
const enabled = () => process.env.ELINGU_NOTIFICATIONS === 'on' && process.env.NODE_ENV !== 'test';

async function deliver(to, mail, description, send) {
  const emailService = require('./emailService');
  const sender = send || emailService.sendViaEmail;
  return sender({ to, subject: mail.subject, html: mail.html, description });
}

/** Receipt for a verified payment. Sent once per receipt number, never blocked by the daily cap. */
async function sendReceipt({ parent, learnerName, planName, amount, currency, receipt, paidUntil, billingCycle }, { send } = {}) {
  if (!parent || !isRealEmail(parent.email) || !receipt) return { skipped: 'no email or receipt' };
  const state = readState();
  const key = String(receipt).trim().toUpperCase();
  if (state.receipts[key]) return { skipped: 'already sent' };
  const mail = renderReceipt({ learnerName, planName, amount, currency, receipt: key, paidUntil, billingCycle });
  const r = await deliver(parent.email, mail, 'Payment receipt', send);
  if (r && r.success) { state.receipts[key] = new Date().toISOString(); const t = nairobiParts().day; state.days[t] = (state.days[t] || 0) + 1; writeState(state); }
  return r;
}

/** One pass of the Friday summary. Respects the weekly "once" rule, unsubscribes and the daily cap. */
async function runWeeklyDigest({ send, now = new Date(), force = false, only = null } = {}) {
  if (!force && !enabled()) return { skipped: 'notifications are off' };
  const parentStore = require('./parentStore');
  const studentStore = require('./studentStore');
  const teacherStore = require('./teacherStore');
  const gamification = require('./gamification');
  const state = readState();
  const today = nairobiParts(now).day; const week = isoWeekKey(now);
  let sent = 0, skipped = 0;
  for (const parent of parentStore.getAllParents()) {
    if (only && parent.id !== only) continue;
    if (!parent.verified || !isRealEmail(parent.email) || (parent.emailPrefs && parent.emailPrefs.weeklyDigest === false)) { skipped++; continue; }
    if (state.weekly[parent.id] === week) continue;
    if ((state.days[today] || 0) >= dailyCap()) return { sent, skipped, stopped: 'daily cap reached; will continue on the next pass' };
    const cards = [];
    for (const childId of (parent.children || [])) {
      const s = studentStore.getStudentById(childId);
      if (!s) continue;
      const tier = studentStore.resolveStudentTier(s).subscriptionTier;
      const portalTier = (tier === 'standard' || tier === 'premium' || tier === 'pilot') ? tier : 'free';
      cards.push({ handle: s.handle, card: weeklyCard.build({ handle: s.handle, tier: portalTier, activity: studentStore.getChildActivitySummary(s.id), missions: teacherStore.getStudentMissionSummaries(s.id), week: gamification.weekStats(s) }) });
    }
    if (!cards.length) continue;
    const r = await deliver(parent.email, renderDigest({ parentId: parent.id, cards }), 'Friday summary', send);
    if (r && r.success) { state.weekly[parent.id] = week; state.days[today] = (state.days[today] || 0) + 1; sent++; writeState(state); }
  }
  return { sent, skipped };
}

/** One pass of plan-ending reminders (7 days before, 1 day before, and after it ended). */
async function runRenewalReminders({ send, now = new Date(), force = false, only = null } = {}) {
  if (!force && !enabled()) return { skipped: 'notifications are off' };
  const parentStore = require('./parentStore');
  const studentStore = require('./studentStore');
  const pricingConfig = require('./pricingConfig');
  const state = readState();
  const today = nairobiParts(now).day;
  let sent = 0;
  for (const parent of parentStore.getAllParents()) {
    if (only && parent.id !== only) continue;
    if (!parent.verified || !isRealEmail(parent.email) || (parent.emailPrefs && parent.emailPrefs.reminders === false)) continue;
    for (const childId of (parent.children || [])) {
      const s = studentStore.getStudentById(childId);
      if (!s) continue;
      const r = studentStore.resolveStudentTier(s, { now });
      const sub = r.subscription;
      if (!sub || !sub.paidUntil) continue;
      const endMs = new Date(sub.paidUntil).getTime();
      const daysLeft = Math.ceil((endMs - now.getTime()) / 86400000);
      let stage = null;
      if (daysLeft <= -1 && daysLeft >= -10) stage = 'ended';
      else if (daysLeft >= 0 && daysLeft <= 1) stage = 'ending_1';
      else if (daysLeft >= 2 && daysLeft <= 7) stage = 'ending_7';
      if (!stage) continue;
      const planTier = (r.subscriptionTier === 'standard' || r.subscriptionTier === 'premium') ? r.subscriptionTier : (s.subscriptionTier === 'premium' ? 'premium' : 'standard');
      const key = `${parent.id}|${s.id}|${sub.paidUntil}|${stage}`;
      if (state.reminders[key]) continue;
      if ((state.days[today] || 0) >= dailyCap()) { writeState(state); return { sent, stopped: 'daily cap reached' }; }
      let price = null;
      try { price = pricingConfig.resolvePricingForStudent(s, planTier, 'monthly'); } catch (e) { /* the email works without a price */ }
      const mail = renderReminder({ learnerName: s.handle, planName: planTier === 'premium' ? 'Premium' : 'Standard', stage, paidUntil: sub.paidUntil, amount: price && price.amount, currency: price && price.currency });
      const res = await deliver(parent.email, mail, 'Plan reminder', send);
      if (res && res.success) { state.reminders[key] = new Date().toISOString(); state.days[today] = (state.days[today] || 0) + 1; sent++; writeState(state); }
    }
  }
  return { sent };
}

/** Starts the hourly check. Friday from 16:00 Kenyan time (until Sunday night, so a big list can finish) and a daily reminder pass from 08:00. */
function startScheduler() {
  if (!enabled()) { console.log('📧 [notifications] scheduled emails are OFF (set ELINGU_NOTIFICATIONS=on to enable).'); return; }
  console.log(`📧 [notifications] scheduled emails are ON (daily cap ${dailyCap()}).`);
  const tick = async () => {
    try {
      const n = nairobiParts();
      const inDigestWindow = (n.weekday === 'Fri' && n.hour >= 16) || n.weekday === 'Sat' || n.weekday === 'Sun';
      if (inDigestWindow) { const r = await runWeeklyDigest(); if (r.sent) console.log(`[notifications] Friday summary: ${r.sent} sent`); }
      if (n.hour >= 8) { const r = await runRenewalReminders(); if (r.sent) console.log(`[notifications] reminders: ${r.sent} sent`); }
    } catch (err) { console.error('[notifications] pass failed:', err.message); }
  };
  setTimeout(tick, 60 * 1000).unref();
  setInterval(tick, 60 * 60 * 1000).unref();
}

module.exports = {
  renderDigest, renderReceipt, renderReminder, sendReceipt, runWeeklyDigest, runRenewalReminders, startScheduler,
  unsubscribeToken, verifyUnsubscribeToken, unsubscribeUrl, isoWeekKey, nairobiParts, isRealEmail
};
