'use strict';
// Prerequisite-ladder (v2) primers. Content lives in db/seeds/primer_ladders.js, keyed by sub-topic id,
// and is merged at read time so lesson seeds do not change. See docs/audits/teaching_depth_report.md.

const EMOJI_RE = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
const warned = new Set();

function loadAll() {
  try { return require('./db/seeds/primer_ladders'); } catch (e) { return {}; }
}

const nonEmpty = (v) => typeof v === 'string' && v.trim().length > 0;

function validateLadder(ladder) {
  const errors = [];
  const err = (m) => errors.push(m);
  if (!ladder || typeof ladder !== 'object' || Array.isArray(ladder)) return { ok: false, errors: ['ladder must be an object'] };
  if (ladder.ladderVersion !== 2) err('ladderVersion must be 2');
  const pre = ladder.prerequisites;
  if (!Array.isArray(pre) || pre.length < 1 || pre.length > 5) err('prerequisites must have 1 to 5 items');
  else {
    const ids = new Set();
    pre.forEach((p, i) => {
      const w = `prerequisites[${i}]`;
      if (!p || typeof p !== 'object') return err(`${w} must be an object`);
      if (!nonEmpty(p.id)) err(`${w}.id missing`); else if (ids.has(p.id)) err(`${w}.id duplicated`); else ids.add(p.id);
      if (!nonEmpty(p.name)) err(`${w}.name missing`);
      if (!nonEmpty(p.fromScratch)) err(`${w}.fromScratch missing`);
      if (!nonEmpty(p.everydayAnalogy)) err(`${w}.everydayAnalogy missing`);
      if (!Array.isArray(p.workedExample) || p.workedExample.length < 1 || !p.workedExample.every(nonEmpty)) err(`${w}.workedExample must be a non-empty list of strings`);
      if (!p.checkQuestion || !nonEmpty(p.checkQuestion.q) || !nonEmpty(p.checkQuestion.answer)) err(`${w}.checkQuestion needs q and answer`);
    });
  }
  const n = ladder.newIdea;
  if (!n || typeof n !== 'object') err('newIdea missing');
  else {
    ['whyNeeded', 'fromScratch', 'everydayAnalogy'].forEach(k => { if (!nonEmpty(n[k])) err(`newIdea.${k} missing`); });
    const we = n.workedExample;
    if (!we || !nonEmpty(we.problem)) err('newIdea.workedExample.problem missing');
    else if (!Array.isArray(we.steps) || we.steps.length < 1) err('newIdea.workedExample.steps must be non-empty');
    else we.steps.forEach((s, i) => {
      if (!s || !nonEmpty(s.do)) err(`newIdea.workedExample.steps[${i}].do missing`);
      if (!s || !nonEmpty(s.why)) err(`newIdea.workedExample.steps[${i}].why missing`);
    });
    if (!Array.isArray(n.commonMistakes) || n.commonMistakes.length < 1 || !n.commonMistakes.every(m => m && nonEmpty(m.mistake) && nonEmpty(m.howToSpotIt))) err('newIdea.commonMistakes needs items with mistake and howToSpotIt');
    if (!Array.isArray(n.check) || n.check.length !== 2) err('newIdea.check must have exactly 2 questions');
    else n.check.forEach((c, i) => { if (!c || !nonEmpty(c.q) || !nonEmpty(c.answer)) err(`newIdea.check[${i}] needs q and answer`); });
  }
  if (ladder.glossary !== undefined) {
    if (!Array.isArray(ladder.glossary) || !ladder.glossary.every(g => g && nonEmpty(g.en))) err('glossary entries need en');
  }
  try { if (EMOJI_RE.test(JSON.stringify(ladder))) err('ladder must not contain emoji'); } catch (e) { err('ladder is not serialisable'); }
  return { ok: errors.length === 0, errors };
}

// Returns a validated ladder or null. Never throws; an invalid ladder is logged once and ignored.
function getLadder(subtopicId, source) {
  try {
    if (!subtopicId) return null;
    const all = source || loadAll();
    const ladder = all && Object.prototype.hasOwnProperty.call(all, subtopicId) ? all[subtopicId] : null;
    if (!ladder) return null;
    const v = validateLadder(ladder);
    if (!v.ok) {
      if (!warned.has(subtopicId)) { warned.add(subtopicId); console.warn(`[primerLadder] ignoring invalid ladder for ${subtopicId}: ${v.errors.join('; ')}`); }
      return null;
    }
    return ladder;
  } catch (e) { return null; }
}

// Browser-safe copy: check questions only, never answers, acceptable variants or hints.
function publicLadder(ladder) {
  if (!ladder) return null;
  const copy = JSON.parse(JSON.stringify(ladder));
  (copy.prerequisites || []).forEach(p => {
    if (p.checkQuestion) p.checkQuestion = { q: p.checkQuestion.q };
  });
  if (copy.newIdea && Array.isArray(copy.newIdea.check)) {
    copy.newIdea.check = copy.newIdea.check.map(c => ({ q: c.q, marks: c.marks }));
  }
  return copy;
}

// Accepts a sub-topic response ({subtopic:{id}}), a subtopic ({id}) or an id. Returns the same object plus `ladder` (or null).
function applyLadders(input, source) {
  if (typeof input === 'string') return getLadder(input, source);
  if (!input || typeof input !== 'object') return input;
  const id = (input.subtopic && input.subtopic.id) || input.id;
  return Object.assign({}, input, { ladder: publicLadder(getLadder(id, source)) });
}

// Compact tutor block (server side: includes answers so the tutor can judge replies).
function buildLadderPromptBlock(ladder) {
  if (!ladder) return '';
  const L = [];
  L.push('PREREQUISITE LADDER FOR THIS TOPIC (check one at a time, simplest first):');
  ladder.prerequisites.forEach((p, i) => {
    L.push(`P${i + 1} ${p.name}: check question "${p.checkQuestion.q}" (correct answer: ${p.checkQuestion.answer})`);
    L.push(`   From scratch: ${p.fromScratch}`);
    L.push(`   Everyday picture: ${p.everydayAnalogy}`);
  });
  const n = ladder.newIdea;
  L.push(`THE NEW IDEA. Why it is needed: ${n.whyNeeded}`);
  L.push(`From scratch: ${n.fromScratch}`);
  L.push(`Everyday picture: ${n.everydayAnalogy}${n.analogyLimit ? ` (where it stops being true: ${n.analogyLimit})` : ''}`);
  L.push(`WORKED EXAMPLE: ${n.workedExample.problem}`);
  n.workedExample.steps.forEach((s, i) => L.push(`  ${i + 1}. ${s.do} (why: ${s.why})${s.result ? ` => ${s.result}` : ''}`));
  L.push('COMMON MISTAKES:');
  n.commonMistakes.forEach(m => L.push(`- ${m.mistake}. Spot it: ${m.howToSpotIt}`));
  L.push('FINAL CHECKS (do not reveal answers first): ' + n.check.map((c, i) => `C${i + 1} "${c.q}" (answer: ${c.answer})`).join('; '));
  L.push('');
  L.push('LADDER PROTOCOL:');
  L.push('1. Check one prerequisite at a time. Ask only the check question for the first unconfirmed prerequisite; one question per message.');
  L.push('2. If the learner answers correctly in their own words, say exactly what was right and why (no stock praise), then move to the next prerequisite. After the last one, pose the problem that needs the new idea before naming it.');
  L.push('3. If they are wrong, say "I don\'t know" or write nothing usable, stay calm: teach that prerequisite from scratch with its everyday picture and worked steps (give the reason for each step), then ask a different check question.');
  L.push('4. Do not teach the new idea while a prerequisite is unconfirmed. If the learner insists on seeing it, show the worked example, then ask them to do a final check to confirm they can reproduce it.');
  L.push('5. Declare [STATUS: MASTERED] only after the learner explains the new idea and its steps in their own words and handles the final checks. No emoji.');
  return L.join('\n');
}

module.exports = { validateLadder, getLadder, applyLadders, publicLadder, buildLadderPromptBlock };
