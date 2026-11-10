// ══════════════════════════════════════════════════════════════
// ELINGU UNIFIED CURRICULUM SEED DATA REGISTRY
// Combines authentic official KICD CBC & Cambridge CAIE Syllabi:
// - CBC STEM (Biology, Computer Studies, Chemistry, Physics, Science)
// - CBC Mathematics (Grades 6–12)
// - CBC Languages, Humanities & Applied Subjects (English, Kiswahili, Social Studies, etc.)
// - Cambridge CAIE (IGCSE CS, Physics, Chem, Bio, Maths; Lower Secondary Science, Maths, English)
// ══════════════════════════════════════════════════════════════

const cbcStemSeedsBase = require('./cbc_stem_seed');
// Grades 11-12 Chemistry, Biology and Physics (KICD drafts, read from the KICD site; see docs/audits/kicd_verified_from_site.md)
const cbcSeniorSeeds = [
  ...require('./cbc_senior_chemistry_seed'),
  ...require('./cbc_senior_biology_seed'),
  ...require('./cbc_senior_physics_seed')
];
// Grade 10 Physics follows the KICD design: matching topics kept, missing ones added, the rest retired (hidden, never deleted).
const cbcG10PhysicsPath = './cbc_g10_physics_seed';
let cbcG10Physics = null;
try { cbcG10Physics = require(cbcG10PhysicsPath); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
const PHYSICS_G10_RETIRED = cbcG10Physics
  ? ['cbc_g10_phy_s1_1', 'cbc_g10_phy_s1_3', 'cbc_g10_phy_s2_2', 'cbc_g10_phy_s3_3', 'cbc_g10_phy_s4_1']
  : [];
const cbcStemSeeds = cbcG10Physics
  ? [...cbcStemSeedsBase.filter(m => !(m.subject === 'Physics' && String(m.grade) === '10')), ...cbcG10Physics]
  : cbcStemSeedsBase;
const cbcMathSeedsBase = require('./cbc_math_seed');
// Core Mathematics Grades 10-12 follow the KICD designs (read from the KICD site). Each file exports { maps, retiredIds }.
// A grade's old map is replaced only when its new file exists; retired topics are hidden, never deleted.
const CORE_MATHS_FILES = { 10: './cbc_core_maths_g10_seed', 11: './cbc_core_maths_g11_seed', 12: './cbc_core_maths_g12_seed' };
const coreMathsMaps = [];
const coreMathsRetired = [];
const coreMathsGrades = new Set();
for (const [grade, file] of Object.entries(CORE_MATHS_FILES)) {
  let mod = null;
  try { mod = require(file); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
  if (!mod) continue;
  coreMathsGrades.add(String(grade));
  coreMathsMaps.push(...mod.maps);
  coreMathsRetired.push(...(mod.retiredIds || []));
}
const cbcMathSeeds = [
  ...cbcMathSeedsBase.filter(m => !(m.subject === 'Mathematics' && coreMathsGrades.has(String(m.grade)))),
  ...coreMathsMaps
];
const RETIRED_SUBTOPIC_IDS = [...PHYSICS_G10_RETIRED, ...coreMathsRetired];
const cbcLanguagesOtherSeeds = require('./cbc_languages_other_seed');
const britishCaieBaseSeeds = require('./british_caie_seed');
// Full-syllabus Biology (0610) and Chemistry (0620) replace the short maps in british_caie_seed.js (same station/sub-topic ids are kept inside).
const britishCaieBiologySeeds = require('./british_caie_biology_seed');
const britishCaieChemistrySeeds = require('./british_caie_chemistry_seed');
const REPLACED_CAIE_SUBJECTS = new Set(['Biology', 'Chemistry']);
const britishCaieSeeds = [
  ...britishCaieBaseSeeds.filter(m => !REPLACED_CAIE_SUBJECTS.has(m.subject)),
  ...britishCaieBiologySeeds,
  ...britishCaieChemistrySeeds
];

// Any file db/seeds/kicd_*_seed.js exports { maps, retiredIds }. Each map REPLACES the existing map with the same curriculum, subject and
// grade (or is added when none exists); retiredIds are hidden from the roadmap, never deleted.
const fs = require('fs');
const path = require('path');
const kicdMaps = [];
const kicdRetired = [];
for (const f of fs.readdirSync(__dirname).filter(n => /^kicd_.*_seed.js$/.test(n)).sort()) {
  const mod = require(path.join(__dirname, f));
  kicdMaps.push(...(mod.maps || []));
  kicdRetired.push(...(mod.retiredIds || []));
}
const sameMap = (a, b) => a.curriculum === b.curriculum && a.subject === b.subject && String(a.grade) === String(b.grade);
const withKicd = (list) => [...list.filter(m => !kicdMaps.some(k => sameMap(k, m))), ...kicdMaps];

const ALL_CURRICULUM_SEEDS_BASE = [
  ...cbcStemSeeds,
  ...cbcSeniorSeeds,
  ...cbcMathSeeds,
  ...cbcLanguagesOtherSeeds,
  ...britishCaieSeeds
];
const ALL_CURRICULUM_SEEDS = withKicd(ALL_CURRICULUM_SEEDS_BASE);

module.exports = {
  ALL_CURRICULUM_SEEDS,
  RETIRED_SUBTOPIC_IDS: [...RETIRED_SUBTOPIC_IDS, ...kicdRetired],
  cbcSeniorSeeds,
  cbcStemSeeds,
  cbcMathSeeds,
  cbcLanguagesOtherSeeds,
  britishCaieSeeds
};
