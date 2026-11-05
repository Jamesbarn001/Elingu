// ════════════════════════════════════════════════════════════
// PRIVACY NOTICE & TERMS — plain-language pages (Kenya Data Protection Act 2019, s.29: tell people BEFORE collecting)
//
// Rules for editing this file:
//   • Say only what is true today. Do not claim certification, "compliance" or protection we cannot prove (AGENTS.md rule 6).
//   • When the wording changes in a way that matters to parents, bump CONSENT_TEXT_VERSION in studentStore.js.
//   • Write for a 12-year-old and a busy parent: short sentences, no legal fog.
// ════════════════════════════════════════════════════════════

const express = require('express');

function esc(v) {
  return String(v === undefined || v === null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function page(title, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)} — Elingu</title>
<meta name="robots" content="index,follow">
<style>
  :root { --green:#0D3A26; --ink:#1F2937; --muted:#4B5563; --bg:#FAF7F2; --line:#E5DED2; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--ink); font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif; line-height:1.65; }
  header { background:var(--green); color:#fff; padding:16px 20px; }
  header a { color:#fff; text-decoration:none; font-weight:700; letter-spacing:.3px; }
  main { max-width:760px; margin:0 auto; padding:24px 20px 60px; }
  h1 { font-size:1.7rem; margin:.2rem 0 .4rem; color:var(--green); }
  h2 { font-size:1.15rem; margin:1.8rem 0 .4rem; color:var(--green); }
  p, li { font-size:1rem; color:var(--ink); }
  ul { padding-left:1.2rem; }
  .meta { color:var(--muted); font-size:.9rem; }
  .box { background:#fff; border:1px solid var(--line); border-radius:12px; padding:14px 16px; margin:14px 0; }
  .kids { background:#ECFDF5; border:1px solid #A7F3D0; }
  a { color:#0B6B43; }
  nav.foot { margin-top:2.5rem; padding-top:1rem; border-top:1px solid var(--line); font-size:.9rem; color:var(--muted); }
</style>
</head>
<body>
<header><a href="/">🌳 Elingu</a></header>
<main>
${bodyHtml}
<nav class="foot"><a href="/privacy">Privacy notice</a> · <a href="/terms">Terms of use</a> · <a href="/">Back to Elingu</a></nav>
</main>
</body>
</html>`;
}

function privacyHtml({ version, contactEmail, encryptionOn }) {
  const contact = contactEmail
    ? `Email us at <a href="mailto:${esc(contactEmail)}">${esc(contactEmail)}</a>.`
    : 'Use the contact option in the Elingu parent portal, or ask your child’s school to contact us on your behalf.';
  return page('Privacy notice', `
<h1>Privacy notice</h1>
<p class="meta">Version ${esc(version)}. We update this page when something important changes.</p>

<div class="box kids">
  <strong>For learners:</strong> Elingu helps you think things through. To do that we need a nickname and a PIN, and your parent or guardian has to say yes
  before you can chat with the tutor. Please don't type your full name, phone number, home address or school name into the chat.
</div>

<h2>Who we are</h2>
<p>Elingu is a learning companion for Kenyan CBC and Cambridge (IGCSE / Checkpoint) learners. Elingu decides what data we collect and why, which makes us the "data controller" under the Kenya Data Protection Act, 2019. ${contact}</p>

<h2>What we collect, and why</h2>
<ul>
  <li><strong>Nickname, avatar, PIN (stored as a one-way hash)</strong> — to sign you in and show your name in the app.</li>
  <li><strong>Grade or year, curriculum, subjects, county (optional), age band</strong> — to give you the right lessons and examples.</li>
  <li><strong>Parent or guardian email or mobile number</strong> — to ask them to approve your account, send progress updates and help with PIN recovery.</li>
  <li><strong>Your messages to the tutor, and your progress</strong> (streaks, points, mission answers) — to answer you, remember where you stopped and show your parent how you are doing.</li>
  <li><strong>Payment details for subscriptions</strong> — M-Pesa phone number and receipt, or card payments handled by our payment provider. We do not store card numbers.</li>
  <li><strong>Safety alerts</strong> — if a message suggests a child may be in danger or distress, we keep that message and alert our safety team (and the school's safeguarding lead if the learner belongs to a school) so that someone can help. Children can always reach Childline Kenya on <strong>116</strong>, free of charge.</li>
</ul>
<p>We do <strong>not</strong> ask for national ID numbers, home addresses or biometric data from learners or parents.</p>

<h2>Why a parent or guardian must say yes</h2>
<p>The law requires a parent or guardian's consent before we process a child's data (section 33). After sign-up the child cannot use the tutor until the parent opens the link we send and confirms. We keep a record of that confirmation: when it happened, how, and which contact was used. A parent can withdraw consent at any time (see "Your rights").</p>

<h2>Who else receives data</h2>
<ul>
  <li><strong>AI providers.</strong> The messages you type are sent over the internet to an AI service so it can write the tutor's reply. Depending on the situation this is Google (Gemini), Groq, OpenAI or Anthropic (Claude), and their computers are outside Kenya. We choose providers that offer business terms, but we cannot control what you type, which is why we ask learners to keep personal details out of the chat. Before a message leaves our server we automatically remove phone numbers, email addresses and ID numbers, and your real name and school name if they appear. We do send your nickname (so the tutor can talk to you by name), your grade, your county (for local examples) and the subject. We do not send your age: the tutor assumes a usual age for your grade. If you use the microphone, the recording is sent to an AI service (Groq) to turn it into text; we do not keep the recording.</li>
  <li><strong>Email and SMS services</strong> that deliver our messages to parents.</li>
  <li><strong>Payment providers</strong> (Safaricom M-Pesa and Paystack) for subscriptions.</li>
  <li><strong>Your child's school</strong>, only if the learner joined through a school: teachers see classroom progress for their own classes.</li>
  <li>We do not sell personal data and we do not show advertising.</li>
</ul>

<h2>How we protect it</h2>
<ul>
  <li>PINs and passwords are stored as one-way hashes, so nobody can read them back.</li>
  ${encryptionOn
    ? '<li>Contact details, names and chat messages are encrypted when stored.</li>'
    : '<li>We are rolling out encryption of contact details, names and chat messages in storage.</li>'}
  <li>Access to accounts is protected by sign-in tokens, rate limits and lock-outs after repeated wrong PINs.</li>
  <li>No system is perfectly safe. If personal data is ever accessed by someone who should not have it and there is a real risk of harm, we will tell the Data Commissioner within 72 hours and tell the people affected.</li>
</ul>

<h2>How long we keep it</h2>
<ul>
  <li>Sign-ups that a parent never confirms are deleted after 48 hours.</li>
  <li>Active accounts are kept while the learner uses Elingu.</li>
  <li>If a parent or learner deletes an account, it is held for 30 days in case it was a mistake, then permanently erased.</li>
  <li>Payment records may be kept longer where the law requires it.</li>
</ul>

<h2>Your rights</h2>
<p>A parent or guardian (and a learner, with their parent) can ask us to: see the data we hold; correct it; delete it; stop or limit how we use it; take a copy; or withdraw consent. Parents can delete a learner's data from the parent portal. For anything else, ${contact.charAt(0).toLowerCase()}${contact.slice(1)}</p>
<p>If you are unhappy with how we handled your data you may complain to the <strong>Office of the Data Protection Commissioner</strong> in Kenya (<a href="https://www.odpc.go.ke" rel="noopener">odpc.go.ke</a>).</p>

<h2>Cookies and tracking</h2>
<p>We use your browser's local storage to keep you signed in and remember settings. We do not use advertising trackers.</p>
`);
}

function termsHtml({ version }) {
  return page('Terms of use', `
<h1>Terms of use</h1>
<p class="meta">Version ${esc(version)}.</p>

<h2>What Elingu is</h2>
<p>Elingu is a thinking companion. It asks questions to help you understand, rather than handing out answers. It is a study aid, not a replacement for your teacher, your textbooks or the official syllabus, and it can make mistakes. Always check important facts with your teacher.</p>

<h2>Accounts</h2>
<ul>
  <li>Learners under 18 need a parent or guardian to approve their account.</li>
  <li>Keep your PIN private. Don't share your account.</li>
  <li>Be kind. Don't use Elingu to bully, cheat in exams, or to put in someone else's personal details.</li>
</ul>

<h2>Plans and payments</h2>
<ul>
  <li>Prices are shown in Kenya Shillings or US Dollars before you pay. The price shown on the payment screen is the price you pay.</li>
  <li>Payments are made by M-Pesa or card. A plan starts once the payment is confirmed.</li>
</ul>

<h2>Safety</h2>
<p>If a message suggests a child may be at risk, we may alert our safety team and, where relevant, a school's safeguarding lead, even if this means the parent is not told straight away. Children can call Childline Kenya on <strong>116</strong> for free at any time.</p>

<h2>Our responsibility</h2>
<p>We work hard to keep Elingu available and accurate, but we cannot promise it will always be error-free or uninterrupted. Nothing in these terms limits any right you have under Kenyan law.</p>

<h2>Changes</h2>
<p>If these terms or our <a href="/privacy">privacy notice</a> change in an important way, we will tell parents and ask again where the law requires.</p>
`);
}

module.exports = function legalPages({ consentVersion, getContactEmail, isEncryptionOn }) {
  const router = express.Router();
  const ctx = () => ({ version: consentVersion, contactEmail: getContactEmail(), encryptionOn: isEncryptionOn() });
  router.get('/privacy', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300');
    res.type('html').send(privacyHtml(ctx()));
  });
  router.get('/terms', (req, res) => {
    res.set('Cache-Control', 'public, max-age=300');
    res.type('html').send(termsHtml(ctx()));
  });
  return router;
};
