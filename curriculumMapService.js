// ══════════════════════════════════════════════════════════════
// ELINGU TOPIC METRO ROADMAP SERVICE (100% DATABASE-DRIVEN)
// Pure relational database service querying curriculumRepository.
// Zero hardcoded in-memory ROADMAP_STORE fallbacks in application code.
// Dual-curriculum: Kenyan CBE (Grades 6–12) & British Cambridge (Years 7–11).
// ══════════════════════════════════════════════════════════════

const curriculumRepo = require('./db/repositories/curriculumRepository');

/**
 * Retrieve curriculum map for curriculum, grade, and subject.
 * Queries authoritative relational database with zero cross-curriculum leakage.
 *
 * @param {string} curriculum - 'CBC' or 'BRITISH'
 * @param {number|string} grade - 6-12 for CBC, 7-11 for BRITISH
 * @param {string} subject - Subject name e.g. 'Mathematics', 'Biology', 'Computer Studies', 'Science'
 * @returns {Promise<object|null>} Hierarchical metro map object with stations and subtopics
 */
async function getCurriculumMap(curriculum, grade, subject) {
  return curriculumRepo.getCurriculumMap(curriculum, grade, subject);
}

/**
 * Find a specific subtopic study stop by its unique identifier.
 *
 * @param {string} subtopicId - e.g. 'cbc_g8_math_s1_1', 'bri_y10_math_s2_1', 'cie_y10_cs_s1_1'
 * @returns {Promise<object|null>} Subtopic details including conceptPrimer, socraticPrompt, and station metadata
 */
async function getSubtopicById(subtopicId) {
  return curriculumRepo.getSubtopicById(subtopicId);
}

/** Levels and subjects for the "explore first" screen. */
async function getCatalogue(curriculum, grade) {
  return curriculumRepo.getCatalogue(curriculum, grade);
}

module.exports = {
  getCatalogue,
  getCurriculumMap,
  getSubtopicById
};
