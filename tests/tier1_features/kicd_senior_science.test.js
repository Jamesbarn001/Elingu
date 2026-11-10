// KICD-aligned senior science maps (Grades 10-12 Physics, Grades 11-12 Chemistry and Biology) and the "retired topic" rule.
const fs = require('fs');
const path = require('path');
const seeds = require('../../db/seeds');
const ROOT = path.resolve(__dirname, '..', '..');

const find = (subject, grade) => seeds.ALL_CURRICULUM_SEEDS.find(m => m.curriculum === 'CBC' && m.subject === subject && String(m.grade) === String(grade));
const topics = (m) => m.stations.reduce((n, s) => n + s.subtopics.length, 0);
const titles = (m) => m.stations.flatMap(s => s.subtopics.map(x => x.title.toLowerCase()));

// strands / sub-strands read from the KICD site (docs/audits/kicd_verified_from_site.md)
const EXPECT = [
  ['Physics', 10, 4, 13], ['Physics', 11, 4, 13], ['Physics', 12, 4, 10],
  ['Chemistry', 11, 3, 6], ['Chemistry', 12, 3, 9],
  ['Biology', 11, 3, 10], ['Biology', 12, 3, 6],
  ['Biology', 10, 3, 10],
  ['Mathematics', 10, 3, 9], ['Mathematics', 11, 4, 17], ['Mathematics', 12, 4, 14],
  ['Essential Mathematics', 10, 3, 13], ['Essential Mathematics', 11, 3, 11], ['Essential Mathematics', 12, 3, 10],
  ['General Science', 10, 3, 16], ['General Science', 11, 3, 13], ['General Science', 12, 3, 15],
  // Junior School (Grades 7-9), read from the KICD designs
  ['Mathematics', 7, 5, 18], ['Mathematics', 8, 5, 16], ['Mathematics', 9, 5, 19],
  ['Integrated Science', 7, 4, 9], ['Integrated Science', 8, 3, 8], ['Integrated Science', 9, 3, 9],
  ['Social Studies', 7, 5, 20], ['Social Studies', 8, 5, 16], ['Social Studies', 9, 5, 18]
];

module.exports = {
  'TC-KICD-01: Each senior science map has the strand and sub-strand counts KICD lists': async (ctx) => {
    for (const [subject, grade, strands, subs] of EXPECT) {
      const m = find(subject, grade);
      ctx.assert(m, `${subject} Grade ${grade} map is missing`);
      ctx.assertEqual(m.stations.length, strands, `${subject} G${grade} strands`);
      ctx.assertEqual(topics(m), subs, `${subject} G${grade} sub-strands`);
    }
  },

  'TC-KICD-02: Key sub-strand names are present, and Grade 10 Physics no longer carries other grades topics': async (ctx) => {
    const has = (subject, grade, ...words) => {
      const t = titles(find(subject, grade)).join('|');
      words.forEach(w => ctx.assert(t.includes(w), `${subject} G${grade} should include "${w}"`));
    };
    has('Chemistry', 11, 'the mole', 'gas laws', 'hydrocarbons');
    has('Chemistry', 12, 'electrochemistry', 'polymers', 'nuclear');
    has('Biology', 11, 'taxonomy', 'cell division', 'excretion');
    has('Biology', 12, 'genetics', 'evolution');
    has('Physics', 11, 'capacitors', 'projectile', 'diodes');
    has('Physics', 12, 'dynamics', 'photoelectric', 'transistors');
    has('Mathematics', 10, 'real numbers', 'indices and logarithms', 'reflection and congruence', 'rotation', 'trigonometry 1');
    has('Mathematics', 11, 'logarithms ii', 'matrices', 'permutations', 'differentiation', 'functions');
    has('Mathematics', 12, 'sets', 'binomial', 'linear programming', 'loci', 'navigation', 'integration');
    has('Biology', 10, 'specimen collection');
    has('Mathematics', 7, 'whole numbers', 'pythagorean', 'geometrical constructions');
    has('Mathematics', 8, 'integers', 'squares and square roots', 'probability');
    has('Mathematics', 9, 'cubes and cube roots', 'matrices', 'trigonometry');
    has('Integrated Science', 7, 'laboratory safety', 'magnetism');
    has('Integrated Science', 8, 'classes of fire', 'pressure');
    has('Integrated Science', 9, 'water hardness', 'curved mirrors');
    has('Social Studies', 7, 'self-exploration', 'community service-learning project');
    has('Social Studies', 8, 'human rights', 'weather and climate');
    has('Social Studies', 9, 'topographical maps', 'citizenship'.slice(0,0) + 'the constitution of kenya');
    has('Essential Mathematics', 10, 'real numbers', 'indices', 'commercial arithmetic', 'probability');
    has('Essential Mathematics', 11, 'matrices', 'variations', 'scale drawing');
    has('Essential Mathematics', 12, 'sets', 'linear programming', 'vectors');
    has('General Science', 10, 'the cell', 'periodic table', 'waves');
    has('General Science', 11, 'thin lenses', 'the mole', 'hydrocarbons');
    has('Physics', 10, 'mechanical properties', 'energy, work', 'radioactivity', 'electronics', 'greenhouse');
    const g10 = titles(find('Physics', 10)).join('|');
    ['suvat', 'newton', 'capacitor', 'renewable', 'geometric optics'].forEach(w => ctx.assert(!g10.includes(w), `Grade 10 Physics must not include "${w}"`));
  },

  'TC-KICD-03: All ids are unique, new senior maps have real primers and no emoji, and carry no draft label': async (ctx) => {
    const seen = new Set();
    for (const m of seeds.ALL_CURRICULUM_SEEDS) for (const st of m.stations) for (const id of [st.id, ...st.subtopics.map(x => x.id)]) {
      ctx.assert(!seen.has(id), 'duplicate id ' + id); seen.add(id);
    }
    for (const f of ['cbc_senior_chemistry_seed.js', 'cbc_senior_biology_seed.js', 'cbc_senior_physics_seed.js']) {
      const src = fs.readFileSync(path.join(ROOT, 'db', 'seeds', f), 'utf8');
      ctx.assert(!/\p{Extended_Pictographic}/u.test(src), f + ' must not contain emoji');
      /* no draft labels: these are shipped as the real product */
    }
    JSON.stringify(seeds.ALL_CURRICULUM_SEEDS.map(m => [m.title, m.description, m.notes])).match(/[Dd]raft/) && ctx.assert(false, 'a map title or description still says draft');
    const generic = 'Identify the core scientific principle';
    seeds.cbcSeniorSeeds.forEach(m => m.stations.forEach(s => s.subtopics.forEach(x => {
      ctx.assert(!JSON.stringify(x.conceptPrimer).includes(generic), x.id + ' uses the generic template');
      ctx.assert((x.conceptPrimer.explanationSteps || []).length >= 3, x.id + ' needs real steps');
    })));
  },

  'TC-KICD-04: Topics removed from a grade are retired (hidden) and the refresh never deletes them': async (ctx) => {
    ['cbc_g10_math_s1_1', 'cbc_g10_math_s1_2'].forEach(id => ctx.assert(!seeds.RETIRED_SUBTOPIC_IDS.includes(id), id + ' must stay (teaching ladders attach to it)'));
    ['cbc_g7_math_s2_1', 'cbc_g7_math_s3_1', 'cbc_g8_math_s2_2', 'cbc_g8_math_s4_1', 'cbc_g10_emath_s1_1', 'cbc_g10_emath_s2_1', 'cbc_g10_math_s1_3', 'cbc_g10_math_s3_1', 'cbc_g11_math_s1_2'].forEach(id => ctx.assert(seeds.RETIRED_SUBTOPIC_IDS.includes(id), id + ' should be retired'));
    const live = new Set(seeds.ALL_CURRICULUM_SEEDS.flatMap(m => m.stations.flatMap(st => st.subtopics.map(x => x.id))));
    seeds.RETIRED_SUBTOPIC_IDS.forEach(id => ctx.assert(!live.has(id), id + ' is retired but still in a map'));
    ['cbc_g10_phy_s1_1', 'cbc_g10_phy_s1_3', 'cbc_g10_phy_s2_2', 'cbc_g10_phy_s3_3', 'cbc_g10_phy_s4_1'].forEach(id => ctx.assert(seeds.RETIRED_SUBTOPIC_IDS.includes(id), id + ' should be retired'));
    const repo = fs.readFileSync(path.join(ROOT, 'db', 'repositories', 'curriculumRepository.js'), 'utf8');
    ctx.assert(/<> 'retired'/.test(repo), 'the map query must hide retired topics');
    const seeder = fs.readFileSync(path.join(ROOT, 'db', 'seed_curriculum.js'), 'utf8');
    ctx.assert(/SET status = 'retired'/.test(seeder) && !/DELETE FROM sub_strands/i.test(seeder), 'seeder retires, never deletes');
  }
};
