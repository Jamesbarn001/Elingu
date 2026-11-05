#!/usr/bin/env node
// scripts/send_test_emails.js — send ONE sample of each parent email (Friday summary, receipt, plan reminder) to ONE address you choose,
// so you can see them in a real inbox. It uses made-up family data (no real child's information) and sends exactly 3 emails.
//
//   node scripts/send_test_emails.js --to you@example.com --yes
//
// Run it with a scratch data folder so nothing touches your real database:
//   ELINGU_DATA_DIR=./scratch-mail node scripts/send_test_emails.js --to you@example.com --yes

require('dotenv').config();
const weeklyCard = require('../weeklyCard');
const svc = require('../notificationService');
const emailService = require('../emailService');

const arg = (name) => { const i = process.argv.indexOf(name); return i > -1 ? process.argv[i + 1] : null; };
const to = arg('--to');

async function main() {
  if (!to || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to)) { console.error('Give one address: --to you@example.com'); process.exit(1); }
  if (!process.argv.includes('--yes')) { console.error(`This will send 3 sample emails to ${to}. Add --yes to go ahead.`); process.exit(1); }
  if (process.env.NODE_ENV === 'test' || process.env.DISABLE_EXTERNAL_EMAIL === 'true') { console.error('Emails are switched off in this environment (test mode).'); process.exit(1); }

  const card = weeklyCard.build({
    handle: 'Amani', tier: 'standard',
    activity: { subjectsExplored: ['Mathematics', 'Integrated Science'], recentTopics: [{ subject: 'Mathematics', topic: 'Fractions and ratio', turnCount: 9 }, { subject: 'Integrated Science', topic: 'States of matter', turnCount: 4 }] },
    missions: [{ status: 'completed', title: 'Ratio exit ticket', subject: 'Mathematics', cbeLevel: 'ME', missedQuestions: [{ concept: 'Sharing in a ratio', outcome: 'needed_multiple_attempts' }], exactScore: { scorePercent: 70, hintsUsedCount: 2 } }],
    week: { activeDays: 4, xp: 85, masteredTotal: 3 }
  });
  const inTenDays = new Date(Date.now() + 5 * 86400000).toISOString();
  const mails = [
    ['Friday summary', svc.renderDigest({ parentId: 'par_sample', cards: [{ handle: 'Amani', card }] })],
    ['Receipt', svc.renderReceipt({ learnerName: 'Amani', planName: 'Premium Scholar', amount: 1499, currency: 'KES', receipt: 'SAMPLE12345', paidUntil: new Date(Date.now() + 30 * 86400000).toISOString(), billingCycle: 'monthly' })],
    ['Plan reminder', svc.renderReminder({ learnerName: 'Amani', planName: 'Premium', stage: 'ending_7', paidUntil: inTenDays, amount: 1499, currency: 'KES' })]
  ];
  for (const [label, mail] of mails) {
    const r = await emailService.sendViaEmail({ to, subject: '[SAMPLE] ' + mail.subject, html: mail.html, description: label });
    console.log(`${label}: ${r && r.success ? 'sent via ' + r.provider : 'FAILED ' + (r && r.error)}`);
  }
}
main().catch(e => { console.error(e.message); process.exit(1); });
