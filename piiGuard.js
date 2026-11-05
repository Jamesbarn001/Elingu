// piiGuard.js — keeps a child's personal details out of what is sent to the AI provider.
//
// What stays: the learner's NICKNAME (so the tutor can speak to them by name), their grade, age, county and subject.
// What goes, before any text leaves our server for an AI company:
//   • phone numbers and email addresses anywhere in a message,
//   • National ID / passport numbers written with their label,
//   • the learner's real name (older accounts may still have one) and the name of their school, if the learner types them,
//   • the school name in the tutor's own instructions (only the kind of school is sent).
// The learner's saved conversation on our side is not changed: only the copy sent to the provider is cleaned.
//
// This is a safety net, not a promise that free text can never contain a secret: a child can still type something
// unusual. The notice at /privacy says so plainly.

const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9-]+(?:\.[A-Z0-9-]+)+/gi;
// Kenyan mobile numbers: 07xx xxx xxx, 01xx xxx xxx, +254 7xx xxx xxx, 2547xxxxxxxx (spaces or dashes allowed)
const KE_PHONE_RE = /(?<![\d])(?:\+?254[\s-]?|0)[17]\d{2}[\s-]?\d{3}[\s-]?\d{3}(?![\d])/g;
// Other international numbers: a plus sign and at least 10 digits
const INTL_PHONE_RE = /(?<![\w])\+\d[\d\s-]{8,16}\d(?![\d])/g;
// "national id 12345678", "ID no: 12345678", "passport A1234567"
const ID_RE = /\b(?:national\s*id|id\s*(?:number|no\.?)|passport(?:\s*(?:number|no\.?))?)\s*[:#-]?\s*[A-Z]?\d{6,10}\b/gi;

const stats = { texts: 0, redactions: 0 };

function escapeRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/** Words and phrases (real name, school name…) that must not leave the server, with what to show instead. */
function knownFor(student) {
  if (!student) return [];
  const handle = String(student.handle || '').trim().toLowerCase();
  const out = [];
  const add = (text, label, minLen) => {
    const t = String(text || '').trim();
    if (t.length >= (minLen || 3) && t.toLowerCase() !== handle) out.push({ text: t, label });
  };
  [student.realName, student.fullName].forEach(n => {
    if (!n) return;
    add(n, '[name removed]');
    String(n).split(/\s+/).forEach(part => add(part, '[name removed]', 4));
  });
  if (student.school) add(student.school, '[school]', 4);
  [student.email, student.studentEmail, student.parentEmail, student.phone, student.studentPhone, student.parentPhone].forEach(c => add(c, '[contact removed]', 6));
  return out;
}

function redact(text, known) {
  if (typeof text !== 'string' || !text) return text;
  stats.texts++;
  let n = 0;
  const swap = (re, label) => { text = text.replace(re, () => { n++; return label; }); };
  swap(EMAIL_RE, '[email removed]');
  swap(KE_PHONE_RE, '[phone number removed]');
  swap(INTL_PHONE_RE, '[phone number removed]');
  swap(ID_RE, '[ID removed]');
  (known || []).forEach(k => {
    if (!k || !k.text) return;
    const re = new RegExp('(?<![\\p{L}\\p{N}])' + escapeRe(k.text) + '(?![\\p{L}\\p{N}])', 'giu');
    swap(re, k.label || '[removed]');
  });
  stats.redactions += n;
  return text;
}

function redactMessages(messages, known) {
  if (!Array.isArray(messages)) return messages;
  return messages.map(m => (m && typeof m.content === 'string') ? Object.assign({}, m, { content: redact(m.content, known) }) : m);
}

/** One place that cleans everything going to a provider: the conversation and both instruction blocks. */
function prepareForProvider(messages, staticPrompt, dynamicPrompt, known) {
  return {
    messages: redactMessages(messages, known),
    staticPrompt: redact(staticPrompt || '', known),
    dynamicPrompt: redact(dynamicPrompt || '', known)
  };
}

/**
 * The tutor is never told a child's real age. It is told the usual age range for the grade or year instead, so it can pitch
 * words and examples well without knowing who the child is. (Kenyan CBC grades; Cambridge Years 7 to 11.)
 */
const USUAL_AGE = { CBC: { 6: '11-12', 7: '12-13', 8: '13-14', 9: '14-15', 10: '15-16', 11: '16-17', 12: '17-18' }, BRITISH: { 7: '11-12', 8: '12-13', 9: '13-14', 10: '14-15', 11: '15-16' } };
function usualAge(grade, isBritish) {
  const table = USUAL_AGE[isBritish ? 'BRITISH' : 'CBC'];
  return table[parseInt(grade, 10)] || '12-16';
}

/** The kind of school, never its name. */
function schoolKind(isBritish) { return isBritish ? 'international school' : 'Kenyan CBE school'; }

module.exports = { redact, redactMessages, prepareForProvider, knownFor, schoolKind, usualAge, stats };
