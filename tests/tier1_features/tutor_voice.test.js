// ============================================================
// Tier 1 — Tutor voice: no mandated emoji, no stock praise, mastery only from the explicit tag
// (Static checks on the tutor prompt text in server.js. Emoji are allowed, just never required.)
// ============================================================
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const lines = fs.readFileSync(path.join(ROOT, 'server.js'), 'utf8').split('\n');

const EMOJI = '[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]';
const STOCK = /(spot on|brilliant|nice work|awesome(?: work)?|great observation|great job|safi sana|hongera)!/i;
const NEGATED = /(never|do not|don't|usitumie|no stock|not use|fake praise)/i;

module.exports = {
  'TC-TV-01: No prompt line forces an emoji': async (ctx) => {
    const bad = lines
      .map((l, i) => ({ l, n: i + 1 }))
      .filter(({ l }) => /emoji/i.test(l) && !/never use emoji/i.test(l) && /(mandatory|weka emoji|use emojis|sprinkl|place a .*emoji|emoji hook|kikiwa na emoji)/i.test(l));
    ctx.assertEqual(bad.length, 0, 'mandated emoji instruction at line(s) ' + bad.map(b => b.n).join(', '));
  },

  'TC-TV-02: No stock praise is listed as an example to copy': async (ctx) => {
    const bad = lines
      .map((l, i) => ({ l, n: i + 1 }))
      .filter(({ l }) => STOCK.test(l) && !NEGATED.test(l) && !/^\s*(\/\/|\*)/.test(l));
    ctx.assertEqual(bad.length, 0, 'stock praise without a prohibition at line(s) ' + bad.map(b => b.n).join(', '));
    const withEmoji = lines.map((l, i) => ({ l, n: i + 1 })).filter(({ l }) => new RegExp('(spot on|brilliant|nice work|awesome|great observation)[!.]?\s*' + EMOJI, 'iu').test(l));
    ctx.assertEqual(withEmoji.length, 0, 'praise-plus-emoji example at line(s) ' + withEmoji.map(b => b.n).join(', '));
  },

  'TC-TV-03: The prompt tells the tutor to praise specifically and to ask an easier step when the learner is stuck': async (ctx) => {
    const src = lines.join('\n');
    ctx.assert(/Never open a reply with stock praise/.test(src), 'static prompt must forbid stock praise openers');
    ctx.assert(/say exactly what they got right and why it works/i.test(src), 'praise must be specific');
    ctx.assert(/easier one-step question/i.test(src), 'stuck answers must get an easier one-step question');
    ctx.assert(!/celebrate (genuinely|their reasoning)/i.test(src), 'no "celebrate" instruction');
  },

  'TC-TV-04: Mastery is never inferred from praise words': async (ctx) => {
    const src = lines.join('\n');
    ctx.assert(!/spot on\|perfect reasoning/i.test(src), 'praise-word mastery regex must be gone');
    ctx.assert(!/you got it right\|well done reasoning/i.test(src), 'praise-word mastery regex must be gone');
    ctx.assert(src.includes('STATUS:\\s*(MASTERED|EXPLORING)'), 'explicit status tag parsing must remain');
  },

  'TC-TV-05: Fallback replies are neutral and Socratic': async (ctx) => {
    const src = lines.join('\n');
    ctx.assert(!/Spot on! 🌟/.test(src), 'canned "Spot on" fallback must be gone');
    ctx.assert(/Good question to ask\. Before we go to the answer/.test(src), 'neutral Socratic fallback must exist');
    ctx.assert(!/Interesting thought!/.test(src), 'filler praise fallback must be gone');
  },

  'TC-TV-06: Learner-facing Cambridge wording replaces "British" in the parent portal strings': async (ctx) => {
    const src = lines.join('\n');
    ctx.assert(!/British \/ IGCSE Family Pack/.test(src), 'old family pack label');
    ctx.assert(!/British Curriculum • Year/.test(src), 'old year label');
    ctx.assert(!/the British International \(Cambridge CAIE/.test(src), 'old tutor prompt wording');
  }
};
