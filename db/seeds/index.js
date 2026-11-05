// ══════════════════════════════════════════════════════════════
// ELINGU UNIFIED CURRICULUM SEED DATA REGISTRY
// Combines authentic official KICD CBC & Cambridge CAIE Syllabi:
// - CBC STEM (Biology, Computer Studies, Chemistry, Physics, Science)
// - CBC Mathematics (Grades 6–12)
// - CBC Languages, Humanities & Applied Subjects (English, Kiswahili, Social Studies, etc.)
// - Cambridge CAIE (IGCSE CS, Physics, Chem, Bio, Maths; Lower Secondary Science, Maths, English)
// ══════════════════════════════════════════════════════════════

const cbcStemSeeds = require('./cbc_stem_seed');
const cbcMathSeeds = require('./cbc_math_seed');
const cbcLanguagesOtherSeeds = require('./cbc_languages_other_seed');
const britishCaieSeeds = require('./british_caie_seed');

const ALL_CURRICULUM_SEEDS = [
  ...cbcStemSeeds,
  ...cbcMathSeeds,
  ...cbcLanguagesOtherSeeds,
  ...britishCaieSeeds
];

module.exports = {
  ALL_CURRICULUM_SEEDS,
  cbcStemSeeds,
  cbcMathSeeds,
  cbcLanguagesOtherSeeds,
  britishCaieSeeds
};
