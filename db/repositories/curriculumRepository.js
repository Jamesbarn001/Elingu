// ══════════════════════════════════════════════════════════════
// CURRICULUM REPOSITORY (Relational Data-Access Layer)
// 100% Database-Driven: Zero Hardcoded In-Memory Roadmaps
// Enforces zero cross-curriculum leakage and prevents substring collisions.
// ══════════════════════════════════════════════════════════════

const db = require('../client');

let seedingPromise = null;

/**
 * Automatically ensures relational curriculum tables are seeded if empty.
 */
async function ensureCurriculumSeeded() {
  try {
    const res = await db.query(`SELECT COUNT(*) AS cnt FROM curricula`);
    const count = res.rows && res.rows[0] ? Number(res.rows[0].cnt || res.rows[0].count || 0) : 0;
    if (count === 0) {
      if (!seedingPromise) {
        const { seed } = require('../seed_curriculum');
        seedingPromise = seed().catch(err => {
          console.error('[curriculumRepository] Automatic seeding error:', err);
          seedingPromise = null;
        });
      }
      await seedingPromise;
    }
  } catch (err) {
    // If table doesn't exist yet, seed initializes schema & tables
    if (!seedingPromise) {
      const { seed } = require('../seed_curriculum');
      seedingPromise = seed().catch(e => {
        seedingPromise = null;
      });
    }
    await seedingPromise;
  }
}

/**
 * Match a requested subject against database subject records for a specific grade.
 * FIX: Strictly prevents substring collision where 'Science' matched 'Computer Science'.
 */
function resolveBestSubjectMatch(candidates, querySubj) {
  if (!candidates || candidates.length === 0) return null;
  const q = (querySubj || '').trim().toLowerCase();

  // 1. Exact case-insensitive match
  const exact = candidates.find(c => c.name.toLowerCase() === q);
  if (exact) return exact;

  // 2. Strict Subject Category Partitioning
  const isComputerQuery = q.includes('comp');
  const isMathQuery = q.includes('math');
  const isKiswahiliQuery = q.includes('kiswahili');
  const isEnglishQuery = q.includes('eng');
  const isScienceQuery = q.includes('sci') && !isComputerQuery;

  if (isScienceQuery) {
    // Must match general/integrated science and NEVER computer science/studies
    const sciMatch = candidates.find(c => {
      const cName = c.name.toLowerCase();
      return !cName.includes('comp') && (
        cName === 'science' ||
        cName.includes('integrated science') ||
        cName.includes('science & technology') ||
        cName.includes('lower secondary science') ||
        cName.includes('checkpoint science') ||
        cName.includes('science')
      );
    });
    if (sciMatch) return sciMatch;
  }

  if (isComputerQuery) {
    const compMatch = candidates.find(c => c.name.toLowerCase().includes('comp'));
    if (compMatch) return compMatch;
  }

  if (isMathQuery) {
    const mathMatch = candidates.find(c => c.name.toLowerCase().includes('math'));
    if (mathMatch) return mathMatch;
  }

  if (isKiswahiliQuery) {
    const kiswMatch = candidates.find(c => c.name.toLowerCase().includes('kiswahili'));
    if (kiswMatch) return kiswMatch;
  }

  if (isEnglishQuery) {
    const engMatch = candidates.find(c => c.name.toLowerCase().includes('english'));
    if (engMatch) return engMatch;
  }

  // 3. General word / prefix match
  const generalMatch = candidates.find(c => {
    const cName = c.name.toLowerCase();
    return cName.includes(q) || q.includes(cName);
  });
  if (generalMatch) return generalMatch;

  return null;
}

/**
 * Retrieve the full hierarchical Learn Map for a curriculum, grade, and subject.
 * Parameterized SQL join guarantees CBE and British records NEVER intermingle.
 */
async function getCurriculumMap(curriculum = 'CBC', grade = 8, subject = 'Mathematics') {
  await ensureCurriculumSeeded();

  const currUpper = (curriculum || 'CBC').toUpperCase();
  const normCurr = (currUpper === 'BRITISH' || currUpper === 'IGCSE' || currUpper === 'CAIE') ? 'BRITISH' : 'CBC';
  const rawGrade = String(grade || (normCurr === 'BRITISH' ? 10 : 8));
  const gradeDigitsMatch = rawGrade.match(/\d+/);
  const numGrade = gradeDigitsMatch ? gradeDigitsMatch[0] : rawGrade;
  const rawSubj = (subject || 'Mathematics').trim();

  // 1. Fetch available subjects for this curriculum & grade
  const subjectsSql = `
    SELECT sub.id, sub.name, sub.code, g.display_title AS grade_title
    FROM curriculum_subjects sub
    JOIN grades_or_years g ON sub.grade_id = g.id
    JOIN curricula c ON g.curriculum_id = c.id
    WHERE c.id = $1 AND g.code = $2
    ORDER BY sub.id ASC
  `;
  const subjRes = await db.query(subjectsSql, [normCurr, numGrade]);
  let candidates = subjRes.rows || [];

  let matchedSubj = resolveBestSubjectMatch(candidates, rawSubj);

  // If no match in this grade, check if the subject exists in another grade of THIS curriculum
  if (!matchedSubj) {
    const allCurrSubjsSql = `
      SELECT sub.id, sub.name, sub.code, g.code AS grade_code, g.display_title AS grade_title
      FROM curriculum_subjects sub
      JOIN grades_or_years g ON sub.grade_id = g.id
      JOIN curricula c ON g.curriculum_id = c.id
      WHERE c.id = $1
      ORDER BY g.order_index ASC
    `;
    const allRes = await db.query(allCurrSubjsSql, [normCurr]);
    const allCandidates = allRes.rows || [];
    matchedSubj = resolveBestSubjectMatch(allCandidates, rawSubj);
  }

  if (!matchedSubj) {
    return null;
  }

  // 2. Query Strands and Sub-Strands for the resolved subject
  const sql = `
    SELECT 
      c.id AS curriculum_id,
      c.name AS curriculum_name,
      c.governing_body,
      g.code AS grade_code,
      g.display_title AS grade_title,
      sub.id AS subject_id,
      sub.name AS subject_name,
      s.id AS strand_id,
      s.strand_number,
      s.title AS strand_title,
      s.strand_label,
      s.icon,
      s.status AS strand_status,
      s.description AS strand_description,
      s.order_index AS strand_order,
      ss.id AS sub_strand_id,
      ss.subtopic_title,
      ss.concept_primer,
      ss.socratic_inquiry_prompt,
      ss.formula_hint,
      ss.exam_focus,
      ss.status,
      ss.order_index AS stop_order
    FROM curriculum_subjects sub
    JOIN grades_or_years g ON sub.grade_id = g.id
    JOIN curricula c ON g.curriculum_id = c.id
    JOIN learning_strands s ON s.subject_id = sub.id
    JOIN sub_strands ss ON ss.strand_id = s.id
    WHERE sub.id = $1
    ORDER BY s.order_index ASC, ss.order_index ASC
  `;

  const res = await db.query(sql, [matchedSubj.id]);
  if (!res.rows || res.rows.length === 0) {
    return null;
  }

  // 3. Construct normalized hierarchical JSON structure
  const stationsMap = new Map();

  for (const row of res.rows) {
    if (!stationsMap.has(row.strand_id)) {
      let strandLabel = row.strand_label;
      if (normCurr === 'BRITISH') {
        // Strict Terminology Guard: Cambridge NEVER uses "Strand"
        if (!strandLabel || strandLabel.toLowerCase().includes('strand')) {
          strandLabel = `Topic ${row.strand_number}`;
        }
      } else {
        if (!strandLabel) {
          strandLabel = `Strand ${row.strand_number}`;
        }
      }

      stationsMap.set(row.strand_id, {
        id: row.strand_id,
        number: row.strand_number,
        title: row.strand_title,
        strand: strandLabel,
        icon: row.icon || '📚',
        status: row.strand_status || 'available',
        summary: row.strand_description || '',
        orderIndex: row.strand_order,
        subtopics: []
      });
    }

    const station = stationsMap.get(row.strand_id);
    const primerObj = db.fromJson(row.concept_primer, {});

    station.subtopics.push({
      id: row.sub_strand_id,
      title: row.subtopic_title,
      status: row.status || 'available', // Fully unlocked
      conceptPrimer: primerObj,
      socraticPrompt: row.socratic_inquiry_prompt,
      formulaBadge: row.formula_hint || primerObj.formula || null,
      examFocus: row.exam_focus || null
    });
  }

  const stations = Array.from(stationsMap.values()).sort((a, b) => a.orderIndex - b.orderIndex);
  const gradeCode = res.rows[0].grade_code;

  return {
    curriculum: normCurr,
    grade: isNaN(Number(gradeCode)) ? gradeCode : Number(gradeCode),
    subject: res.rows[0].subject_name,
    title: `${normCurr === 'BRITISH' ? 'Cambridge' : 'CBE'} ${res.rows[0].grade_title} ${res.rows[0].subject_name} Metro Line`,
    stations
  };
}

/**
 * Retrieve a single Sub-Strand (Study Stop) by its unique identifier.
 */
async function getSubtopicById(subtopicId) {
  if (!subtopicId) return null;
  await ensureCurriculumSeeded();

  const sql = `
    SELECT 
      ss.id,
      ss.subtopic_title,
      ss.concept_primer,
      ss.socratic_inquiry_prompt,
      ss.formula_hint,
      ss.exam_focus,
      ss.status,
      s.id AS strand_id,
      s.strand_number,
      s.title AS strand_title,
      s.strand_label,
      s.icon,
      s.description AS strand_description,
      sub.name AS subject_name,
      g.code AS grade,
      c.id AS curriculum
    FROM sub_strands ss
    JOIN learning_strands s ON ss.strand_id = s.id
    JOIN curriculum_subjects sub ON s.subject_id = sub.id
    JOIN grades_or_years g ON sub.grade_id = g.id
    JOIN curricula c ON g.curriculum_id = c.id
    WHERE ss.id = $1
  `;

  const res = await db.query(sql, [subtopicId]);
  if (!res.rows || res.rows.length === 0) {
    return null;
  }

  const r = res.rows[0];
  const primerObj = db.fromJson(r.concept_primer, {});
  const isBritish = r.curriculum === 'BRITISH';
  let strandLabel = r.strand_label;
  if (isBritish && (!strandLabel || strandLabel.toLowerCase().includes('strand'))) {
    strandLabel = `Topic ${r.strand_number}`;
  } else if (!strandLabel) {
    strandLabel = `Strand ${r.strand_number}`;
  }

  return {
    subtopic: {
      id: r.id,
      title: r.subtopic_title,
      status: r.status || 'available',
      conceptPrimer: primerObj,
      socraticPrompt: r.socratic_inquiry_prompt,
      formulaBadge: r.formula_hint || primerObj.formula || null,
      examFocus: r.exam_focus
    },
    station: {
      id: r.strand_id,
      number: r.strand_number,
      title: r.strand_title,
      strand: strandLabel,
      icon: r.icon || '📚',
      summary: r.strand_description || ''
    },
    gradeMap: {
      curriculum: r.curriculum,
      grade: isNaN(Number(r.grade)) ? r.grade : Number(r.grade),
      subject: r.subject_name
    }
  };
}

/**
 * Upsert Helpers for Seeding and CMS Content Governance
 */
async function upsertCurriculum({ id, name, governingBody, gradingScale }) {
  await db.query(`
    INSERT INTO curricula (id, name, governing_body, grading_scale, created_at)
    VALUES ($1, $2, $3, $4, $5)
    ON CONFLICT(id) DO UPDATE SET
      name = EXCLUDED.name,
      governing_body = EXCLUDED.governing_body,
      grading_scale = EXCLUDED.grading_scale
  `, [id, name, governingBody, gradingScale, new Date().toISOString()]);
}

async function upsertGrade({ id, curriculumId, stageTier, code, displayTitle, orderIndex }) {
  await db.query(`
    INSERT INTO grades_or_years (id, curriculum_id, stage_tier, code, display_title, order_index)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT(id) DO UPDATE SET
      curriculum_id = EXCLUDED.curriculum_id,
      stage_tier = EXCLUDED.stage_tier,
      code = EXCLUDED.code,
      display_title = EXCLUDED.display_title,
      order_index = EXCLUDED.order_index
  `, [id, curriculumId, stageTier, String(code), displayTitle, orderIndex]);
}

async function upsertSubject({ id, gradeId, name, code, isElective = 0, trackPathway = null }) {
  await db.query(`
    INSERT INTO curriculum_subjects (id, grade_id, name, code, is_elective, track_pathway)
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT(id) DO UPDATE SET
      grade_id = EXCLUDED.grade_id,
      name = EXCLUDED.name,
      code = EXCLUDED.code,
      is_elective = EXCLUDED.is_elective,
      track_pathway = EXCLUDED.track_pathway
  `, [id, gradeId, name, code || null, isElective ? 1 : 0, trackPathway]);
}

async function upsertStrand({ id, subjectId, strandNumber, title, strandLabel, icon, status = 'available', description, orderIndex }) {
  await db.query(`
    INSERT INTO learning_strands (id, subject_id, strand_number, title, strand_label, icon, status, description, order_index)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT(id) DO UPDATE SET
      subject_id = EXCLUDED.subject_id,
      strand_number = EXCLUDED.strand_number,
      title = EXCLUDED.title,
      strand_label = EXCLUDED.strand_label,
      icon = EXCLUDED.icon,
      status = EXCLUDED.status,
      description = EXCLUDED.description,
      order_index = EXCLUDED.order_index
  `, [id, subjectId, strandNumber, title, strandLabel || null, icon || '📚', status, description || '', orderIndex]);
}

async function upsertSubStrand({ id, strandId, subtopicTitle, conceptPrimer, socraticInquiryPrompt, formulaHint, examFocus, status = 'available', orderIndex }) {
  await db.query(`
    INSERT INTO sub_strands (id, strand_id, subtopic_title, concept_primer, socratic_inquiry_prompt, formula_hint, exam_focus, status, order_index)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    ON CONFLICT(id) DO UPDATE SET
      strand_id = EXCLUDED.strand_id,
      subtopic_title = EXCLUDED.subtopic_title,
      concept_primer = EXCLUDED.concept_primer,
      socratic_inquiry_prompt = EXCLUDED.socratic_inquiry_prompt,
      formula_hint = EXCLUDED.formula_hint,
      exam_focus = EXCLUDED.exam_focus,
      status = EXCLUDED.status,
      order_index = EXCLUDED.order_index
  `, [
    id, strandId, subtopicTitle,
    db.toJson(conceptPrimer, {}),
    socraticInquiryPrompt,
    formulaHint || null,
    examFocus || null,
    status,
    orderIndex
  ]);
}

/**
 * Levels (grades / year groups) and, for one level, its subjects. 100% database-driven, so the "explore first"
 * screen never needs hardcoded lists.
 */
async function getCatalogue(curriculum = 'CBC', grade = null) {
  await ensureCurriculumSeeded();
  const currUpper = String(curriculum || 'CBC').toUpperCase();
  const normCurr = (currUpper === 'BRITISH' || currUpper === 'IGCSE' || currUpper === 'CAIE') ? 'BRITISH' : 'CBC';

  const gradesRes = await db.query(
    `SELECT code, display_title, stage_tier, order_index FROM grades_or_years WHERE curriculum_id = $1 ORDER BY order_index ASC`,
    [normCurr]
  );
  const grades = (gradesRes.rows || []).map(r => ({
    grade: Number(r.code),
    title: r.display_title,
    stage: r.stage_tier
  }));

  let subjects = [];
  const gradeDigits = grade !== null && grade !== undefined ? String(grade).match(/\d+/) : null;
  if (gradeDigits) {
    const subjRes = await db.query(
      `SELECT sub.name, sub.code, sub.is_elective, sub.track_pathway
       FROM curriculum_subjects sub
       JOIN grades_or_years g ON sub.grade_id = g.id
       WHERE g.curriculum_id = $1 AND g.code = $2
       ORDER BY sub.id ASC`,
      [normCurr, gradeDigits[0]]
    );
    const seen = new Set();
    subjects = (subjRes.rows || []).filter(r => !seen.has(r.name) && seen.add(r.name)).map(r => ({
      name: r.name,
      code: r.code || null,
      elective: Number(r.is_elective) === 1,
      pathway: r.track_pathway || null
    }));
  }
  return { curriculum: normCurr, grades, subjects };
}

/**
 * Bring the database's curriculum up to date with the built-in content (db/seeds).
 * The old rule only seeded when the tables were EMPTY, so a database seeded once with a smaller curriculum never received
 * the topics added later. Now a fingerprint of the built-in content is stored; when it changes, the seeder runs again.
 * The seeder only inserts or updates rows by id (nothing is deleted), so learner progress, saved spaces and mastery are safe.
 */
async function ensureSeedCurrent() {
  const crypto = require('crypto');
  const { ALL_CURRICULUM_SEEDS } = require('../seeds');
  const hash = crypto.createHash('sha256').update(JSON.stringify(ALL_CURRICULUM_SEEDS) + '|seed-v1').digest('hex');
  await db.initSchema();
  let stored = null;
  try {
    const r = await db.query('SELECT content_hash FROM curriculum_seed_state WHERE id = $1', ['curriculum']);
    stored = r.rows[0] ? r.rows[0].content_hash : null;
  } catch (e) { /* table not there yet: seed below */ }
  if (stored === hash) return { seeded: false };
  const { seed } = require('../seed_curriculum');
  const result = await seed();
  await db.query(
    'INSERT INTO curriculum_seed_state (id, content_hash, seeded_at) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET content_hash = EXCLUDED.content_hash, seeded_at = EXCLUDED.seeded_at',
    ['curriculum', hash, new Date().toISOString()]
  );
  return Object.assign({ seeded: true }, result);
}

module.exports = {
  ensureSeedCurrent,
  getCatalogue,
  getCurriculumMap,
  getSubtopicById,
  upsertCurriculum,
  upsertGrade,
  upsertSubject,
  upsertStrand,
  upsertSubStrand,
  ensureCurriculumSeeded
};
