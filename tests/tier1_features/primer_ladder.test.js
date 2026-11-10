// ============================================================
// Tier 1 - Prerequisite-ladder (v2) primers: validation, numeric check, API shape, tutor prompt block
// ============================================================
const fs = require('fs');
const path = require('path');
const primerLadder = require('../../primerLadder');
const LADDERS = require('../../db/seeds/primer_ladders');

const ROOT = path.resolve(__dirname, '..', '..');
const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
const SURDS = 'cbc_g10_math_s1_1';
const close = (a, b) => Math.abs(a - b) < 1e-9;

function hasKey(obj, key) {
  if (Array.isArray(obj)) return obj.some(v => hasKey(v, key));
  if (obj && typeof obj === 'object') return Object.keys(obj).some(k => k === key || hasKey(obj[k], key));
  return false;
}

module.exports = {
  'TC-LAD-01: Every shipped ladder validates, is marked as a draft, and has no emoji': async (ctx) => {
    const ids = Object.keys(LADDERS);
    ctx.assert(ids.length >= 3, 'expected at least 3 ladders');
    ctx.assert(ids.includes(SURDS), 'surds ladder must be present');
    for (const id of ids) {
      const v = primerLadder.validateLadder(LADDERS[id]);
      ctx.assert(v.ok, `${id} invalid: ${v.errors.join('; ')}`);
      ctx.assert(!/draft/i.test(JSON.stringify(LADDERS[id])), id + ' must not carry a draft label (learners and the testing teacher read these)');
      ctx.assert(!EMOJI.test(JSON.stringify(LADDERS[id])), `${id} contains emoji`);
      ctx.assert(primerLadder.getLadder(id), `${id} should be returned by getLadder`);
    }
  },

  'TC-LAD-02: Ladder ids exist in the curriculum seeds (none invented)': async (ctx) => {
    const { ALL_CURRICULUM_SEEDS } = require('../../db/seeds');
    const text = JSON.stringify(ALL_CURRICULUM_SEEDS);
    for (const id of Object.keys(LADDERS)) ctx.assert(text.includes(`"${id}"`), `${id} not found in seeds`);
  },

  'TC-LAD-03: An invalid ladder is ignored without throwing': async (ctx) => {
    const bad = { ladderVersion: 2, prerequisites: [], newIdea: {} };
    const v = primerLadder.validateLadder(bad);
    ctx.assert(!v.ok && v.errors.length > 0, 'bad ladder must fail validation');
    ctx.assert(!primerLadder.validateLadder(null).ok && !primerLadder.validateLadder('x').ok, 'non-objects fail');
    const withTwoChecks = JSON.parse(JSON.stringify(LADDERS[SURDS]));
    withTwoChecks.newIdea.check.pop();
    ctx.assert(!primerLadder.validateLadder(withTwoChecks).ok, 'check must have exactly 2 questions');
    const noWhy = JSON.parse(JSON.stringify(LADDERS[SURDS]));
    delete noWhy.newIdea.workedExample.steps[0].why;
    ctx.assert(!primerLadder.validateLadder(noWhy).ok, 'every step needs a why');
    const withEmoji = JSON.parse(JSON.stringify(LADDERS[SURDS]));
    withEmoji.newIdea.whyNeeded += ' \u{1F389}';
    ctx.assert(!primerLadder.validateLadder(withEmoji).ok, 'emoji is rejected');
    let result;
    const orig = console.warn; console.warn = () => {};
    try { result = primerLadder.getLadder('bad_id', { bad_id: bad }); } finally { console.warn = orig; }
    ctx.assertEqual(result, null, 'invalid ladder returns null');
    ctx.assertEqual(primerLadder.getLadder('no_such_id'), null);
    ctx.assertEqual(primerLadder.getLadder(undefined), null);
    ctx.assertEqual(primerLadder.applyLadders({ id: 'no_such_id' }).ladder, null);
  },

  'TC-LAD-04: The surds worked example is numerically correct': async (ctx) => {
    const l = LADDERS[SURDS];
    const r5 = Math.sqrt(5), r2 = Math.sqrt(2), r6 = Math.sqrt(6);
    ctx.assert(close(r5 * r5, 5) && close(r2 * r2, 2), 'sqrt facts');
    ctx.assert(close((r5 + r2) * (r5 - r2), 3), 'denominator becomes 3');
    ctx.assert(close(6 / (r5 + r2), 2 * r5 - 2 * r2), '6/(sqrt5+sqrt2) = 2sqrt5 - 2sqrt2');
    ctx.assert(Math.abs(6 / (r5 + r2) - 1.644) < 0.001, 'sanity-check value 1.644');
    ctx.assert(close(4 / (r6 - r2), r6 + r2), '4/(sqrt6-sqrt2) = sqrt6+sqrt2');
    ctx.assert(close((Math.sqrt(7) - Math.sqrt(3)) * (Math.sqrt(7) + Math.sqrt(3)), 4), 'product is 4');
    ctx.assert(close(2 / 5, 6 / 15), 'prerequisite P4 check');
    // x^2 + 3x - 4 expansion of (x+4)(x-1) at x = 7
    ctx.assert((7 + 4) * (7 - 1) === 49 + 21 - 4, 'prerequisite P2 check');
    const steps = l.newIdea.workedExample.steps;
    ctx.assert(steps[steps.length - 1].result.includes('2√5 - 2√2'), 'final step states the answer');
    ctx.assert(steps.some(s => s.result === '3'), 'a step states the denominator 3');
    ctx.assert(l.newIdea.check[0].answer.includes('7 - 3 = 4') && l.newIdea.check[1].answer.includes('√6 + √2'), 'check answers');
  },

  'TC-LAD-05: Completing-the-square example is numerically correct': async (ctx) => {
    const roots = [-1, -5];
    for (const x of roots) ctx.assertEqual(x * x + 6 * x + 5, 0, `root ${x}`);
    for (const x of [7, 3]) ctx.assertEqual(x * x - 10 * x + 21, 0, `check root ${x}`);
    const ex = LADDERS.cbc_g10_math_s1_2.newIdea.workedExample.steps.map(s => s.result).join(' ');
    ctx.assert(ex.includes('(x + 3)² = 4') && ex.includes('x = -1 or x = -5'), 'worked example text');
  },

  'TC-LAD-06: The subtopic API returns the ladder with questions but no answers': async (ctx) => {
    const res = await ctx.api('/api/curriculum/subtopic/' + SURDS);
    ctx.assertEqual(res.status, 200);
    ctx.assert(res.data.subtopic && res.data.subtopic.id === SURDS, 'existing fields stay');
    ctx.assert(res.data.subtopic.conceptPrimer, 'existing conceptPrimer stays');
    const lad = res.data.ladder;
    ctx.assert(lad && Array.isArray(lad.prerequisites) && lad.prerequisites.length >= 3, 'ladder present');
    ctx.assert(lad.prerequisites.every(p => p.checkQuestion && p.checkQuestion.q), 'prerequisite questions present');
    ctx.assertEqual(lad.newIdea.check.length, 2);
    ctx.assert(lad.newIdea.check.every(c => c.q), 'final check questions present');
    ctx.assert(!hasKey(lad, 'answer'), 'no answer fields reach the browser');
    ctx.assert(!hasKey(lad, 'ifWrongHint') && !hasKey(lad, 'acceptable'), 'no hints or accepted answers');
    const raw = JSON.stringify(lad);
    ctx.assert(!raw.includes('because √7 is defined as the number that gives 7'), 'answer text not leaked');
    const other = await ctx.api('/api/curriculum/subtopic/cbc_g6_math_s1_1');
    ctx.assertEqual(other.status, 200);
    ctx.assertEqual(other.data.ladder, null, 'topics without a ladder get ladder: null');
  },

  'TC-LAD-07: The tutor prompt block exists for a ladder and is absent otherwise': async (ctx) => {
    const block = primerLadder.buildLadderPromptBlock(primerLadder.getLadder(SURDS));
    ctx.assert(block.includes('PREREQUISITE LADDER'), 'header');
    ctx.assert(block.includes('What a square root is'), 'prerequisite names');
    ctx.assert(block.includes('one at a time'), 'one prerequisite at a time');
    ctx.assert(block.includes('from scratch'), 'teach from scratch on a gap');
    ctx.assert(block.includes('[STATUS: MASTERED]') && block.includes('own words'), 'mastery rule');
    ctx.assert(block.includes('Multiplying only the bottom'), 'common mistakes');
    ctx.assert(block.includes('2√5 - 2√2'), 'worked example');
    ctx.assert(!EMOJI.test(block), 'no emoji in block');
    ctx.assertEqual(primerLadder.buildLadderPromptBlock(null), '', 'empty when no ladder');
    const src = fs.readFileSync(path.join(ROOT, 'server.js'), 'utf8');
    ctx.assert(src.includes('buildLadderPromptBlock(primerLadder.getLadder(subtopicId))'), 'socratic-reason uses the block');
    ctx.assert(src.includes('primerLadder.getLadder(stop.id)'), 'getDatabaseSyllabusContext uses the ladder');
  }
};
