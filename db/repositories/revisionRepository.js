// ══════════════════════════════════════════════════════════════
// REVISION REPOSITORY (Relational Data-Access Layer)
// Past examination papers, question stems, examiner rubrics [M1, A1, B1],
// and zero-leakage assessment queries.
// ══════════════════════════════════════════════════════════════

const db = require('../client');

/**
 * Stage-Tier Mapping for Educational Contexts
 */
function resolveStageTier(curriculum, grade) {
  const normCurr = (curriculum || 'CBC').toUpperCase() === 'BRITISH' ? 'BRITISH' : 'CBC';
  const numGrade = Number(grade) || 8;

  if (normCurr === 'CBC') {
    if (numGrade <= 6) return 'UPPER_PRIMARY';
    if (numGrade <= 9) return 'JSS';
    return 'SENIOR_SCHOOL';
  } else {
    if (numGrade <= 9) return 'CHECKPOINT';
    return 'IGCSE';
  }
}

/**
 * Retrieve revision papers filtered by curriculum, grade, and subject.
 * Parameterized query enforces strict curriculum partition.
 */
async function getRevisionPapers(curriculum = 'CBC', grade = 8, subject = 'Mathematics') {
  const normCurr = (curriculum || 'CBC').toUpperCase() === 'BRITISH' ? 'BRITISH' : 'CBC';
  const numGrade = Number(grade) || 8;
  const targetStage = resolveStageTier(normCurr, numGrade);
  const normSubj = (subject || 'Mathematics').toLowerCase();

  const sql = `
    SELECT 
      p.id,
      p.curriculum_id AS curriculum,
      g.code AS grade,
      g.stage_tier,
      p.subject_name AS subject,
      p.exam_board AS "examBoard",
      p.paper_code AS "paperCode",
      p.series,
      p.title,
      p.duration_minutes AS "durationMinutes",
      p.total_marks AS "totalMarks",
      p.calculator_allowed AS "calculatorAllowed",
      COUNT(q.id) AS "questionCount"
    FROM assessment_papers p
    JOIN grades_or_years g ON p.grade_id = g.id
    LEFT JOIN assessment_questions q ON q.paper_id = p.id
    WHERE p.curriculum_id = $1
      AND (LOWER(p.subject_name) = $2 OR LOWER(p.subject_name) LIKE $3)
    GROUP BY p.id, p.curriculum_id, g.code, g.stage_tier, p.subject_name, p.exam_board, 
             p.paper_code, p.series, p.title, p.duration_minutes, p.total_marks, p.calculator_allowed
    ORDER BY p.id ASC
  `;

  const res = await db.query(sql, [normCurr, normSubj, `%${normSubj}%`]);
  if (!res.rows || res.rows.length === 0) return [];

  // Filter papers that match the educational stage tier (KPSEA vs KJSEA vs KSSEA vs Checkpoint vs IGCSE)
  // or close grade level
  return res.rows.filter(r => {
    const isStageMatch = r.stage_tier === targetStage;
    const isGradeClose = Math.abs(Number(r.grade) - numGrade) <= 1;
    return isStageMatch || isGradeClose;
  }).map(r => ({
    id: r.id,
    curriculum: r.curriculum,
    grade: Number(r.grade) || numGrade,
    subject: r.subject,
    examBoard: r.examBoard,
    paperCode: r.paperCode,
    series: r.series,
    title: r.title,
    durationMinutes: Number(r.durationMinutes) || 90,
    totalMarks: Number(r.totalMarks) || 50,
    calculatorAllowed: Boolean(r.calculatorAllowed),
    questionCount: Number(r.questionCount) || 0
  }));
}

/**
 * Retrieve paper details and its questions.
 */
async function getPaperById(paperId) {
  if (!paperId) return null;

  const paperRes = await db.query(`
    SELECT 
      p.id,
      p.curriculum_id AS curriculum,
      g.code AS grade,
      p.subject_name AS subject,
      p.exam_board AS "examBoard",
      p.paper_code AS "paperCode",
      p.series,
      p.title,
      p.duration_minutes AS "durationMinutes",
      p.total_marks AS "totalMarks",
      p.calculator_allowed AS "calculatorAllowed"
    FROM assessment_papers p
    JOIN grades_or_years g ON p.grade_id = g.id
    WHERE p.id = $1
  `, [paperId]);

  if (!paperRes.rows || paperRes.rows.length === 0) return null;
  const paper = paperRes.rows[0];

  const qRes = await db.query(`
    SELECT id, number, topic, marks, stem, formula_hint AS "formulaHint"
    FROM assessment_questions
    WHERE paper_id = $1
    ORDER BY order_index ASC, number ASC
  `, [paperId]);

  return {
    id: paper.id,
    curriculum: paper.curriculum,
    grade: Number(paper.grade) || 8,
    subject: paper.subject,
    examBoard: paper.examBoard,
    paperCode: paper.paperCode,
    series: paper.series,
    title: paper.title,
    durationMinutes: Number(paper.durationMinutes) || 90,
    totalMarks: Number(paper.totalMarks) || 50,
    calculatorAllowed: Boolean(paper.calculatorAllowed),
    questions: (qRes.rows || []).map(q => ({
      id: q.id,
      number: q.number,
      topic: q.topic,
      marks: q.marks,
      stem: q.stem,
      formulaHint: q.formulaHint
    }))
  };
}

/**
 * Retrieve Question Examiner X-Ray (Mark scheme, examiner pitfalls, and model answer).
 */
async function getQuestionExaminerXray(questionId) {
  if (!questionId) return null;

  const res = await db.query(`
    SELECT 
      q.id AS "questionId",
      q.number,
      q.topic,
      q.marks,
      q.stem,
      q.formula_hint AS "formulaHint",
      q.rubric_marks AS "rubricMarks",
      q.examiner_pitfalls AS "examinerPitfalls",
      q.model_answer AS "modelAnswer",
      p.paper_code AS "paperCode",
      p.series,
      p.calculator_allowed AS "calculatorAllowed",
      p.curriculum_id AS curriculum
    FROM assessment_questions q
    JOIN assessment_papers p ON q.paper_id = p.id
    WHERE q.id = $1
  `, [questionId]);

  if (!res.rows || res.rows.length === 0) return null;
  const r = res.rows[0];

  const rubrics = db.fromJson(r.rubricMarks, []);
  const pitfalls = db.fromJson(r.examinerPitfalls, []);

  return {
    questionId: r.questionId,
    number: r.number,
    topic: r.topic,
    marks: r.marks,
    stem: r.stem,
    formulaHint: r.formulaHint,
    paperCode: r.paperCode,
    series: r.series,
    curriculum: r.curriculum,
    calculatorAllowed: Boolean(r.calculatorAllowed),
    rubricMarks: rubrics,
    markBreakdown: rubrics,
    examinerPitfalls: pitfalls,
    examinerNotes: pitfalls,
    keywords: [],
    modelAnswer: r.modelAnswer
  };
}

/**
 * Evaluate Student Typed Working & Final Answer against Examiner Rubrics
 */
async function evaluateWorking(questionId, studentWorking = '', studentFinalAnswer = '') {
  const xray = await getQuestionExaminerXray(questionId);
  if (!xray) return null;

  const combinedWorking = `${studentWorking}\n${studentFinalAnswer}`.trim();
  const awardedMarks = [];
  let totalScore = 0;

  for (const criteria of xray.rubricMarks) {
    let match = false;
    if (criteria.requiredMatch) {
      try {
        const regex = typeof criteria.requiredMatch === 'string'
          ? new RegExp(criteria.requiredMatch, 'i')
          : criteria.requiredMatch;
        match = regex.test(combinedWorking);
      } catch (e) {
        match = combinedWorking.toLowerCase().includes(String(criteria.description).toLowerCase());
      }
    }

    if (match) {
      awardedMarks.push({
        code: criteria.code,
        type: criteria.type,
        awarded: true,
        reason: `Earned [${criteria.code}] — ${criteria.description}`
      });
      totalScore += 1;
    } else {
      awardedMarks.push({
        code: criteria.code,
        type: criteria.type,
        awarded: false,
        reason: `Missed [${criteria.code}] — Requires clear working showing: ${criteria.description}`
      });
    }
  }

  // Pitfall check
  const activePitfalls = [];
  for (const pit of xray.examinerPitfalls) {
    if (pit.toLowerCase().includes('bracket') && !studentWorking.includes('(') && !studentWorking.includes(')')) {
      activePitfalls.push('Caution: Ensure you expand brackets fully on both sides before collecting like terms.');
    }
    if (pit.toLowerCase().includes('accuracy') && studentFinalAnswer && studentFinalAnswer.includes('.')) {
      activePitfalls.push('Examiner Note: Round to 3 significant figures or exact fraction unless otherwise stated.');
    }
  }

  const isFullMarks = totalScore === xray.marks;
  const advice = isFullMarks
    ? `🌟 Full Marks! (${totalScore}/${xray.marks}). Your working demonstrates clear mathematical rigor and conforms to official ${xray.curriculum} mark criteria.`
    : `You earned ${totalScore} out of ${xray.marks} marks. Review the method marks [M1] and accuracy marks [A1] in the Examiner X-Ray to see how to capture full credit.`;

  return {
    success: true,
    questionId,
    score: totalScore,
    awardedMarks: totalScore,
    totalMarks: xray.marks,
    percentage: Math.round((totalScore / xray.marks) * 100),
    markResults: awardedMarks.map(m => ({
      code: m.code,
      type: m.type,
      awarded: m.awarded,
      description: m.reason,
      feedback: m.reason
    })),
    pitfallsNoted: activePitfalls.length > 0 ? activePitfalls : xray.examinerPitfalls.slice(0, 2),
    examinerNotes: activePitfalls.length > 0 ? activePitfalls : xray.examinerPitfalls,
    examinerAdvice: advice,
    qualitativeFeedback: advice,
    modelAnswer: xray.modelAnswer
  };
}

/**
 * Upsert Helpers for Seeding and Dynamic Past Paper Ingestion
 */
async function upsertPaper({ id, curriculumId, gradeId, subjectName, examBoard, paperCode, series, title, durationMinutes, totalMarks, calculatorAllowed }) {
  await db.query(`
    INSERT INTO assessment_papers (id, curriculum_id, grade_id, subject_name, exam_board, paper_code, series, title, duration_minutes, total_marks, calculator_allowed, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
    ON CONFLICT(id) DO UPDATE SET
      curriculum_id = EXCLUDED.curriculum_id,
      grade_id = EXCLUDED.grade_id,
      subject_name = EXCLUDED.subject_name,
      exam_board = EXCLUDED.exam_board,
      paper_code = EXCLUDED.paper_code,
      series = EXCLUDED.series,
      title = EXCLUDED.title,
      duration_minutes = EXCLUDED.duration_minutes,
      total_marks = EXCLUDED.total_marks,
      calculator_allowed = EXCLUDED.calculator_allowed
  `, [
    id, curriculumId, gradeId, subjectName, examBoard, paperCode, series, title,
    durationMinutes || 90, totalMarks || 50, calculatorAllowed ? 1 : 0, new Date().toISOString()
  ]);
}

async function upsertQuestion({ id, paperId, number, topic, marks, stem, formulaHint, rubricMarks, examinerPitfalls, modelAnswer, orderIndex }) {
  // Convert RegExp patterns to strings for JSON persistence
  const serializedRubrics = (rubricMarks || []).map(r => ({
    code: r.code,
    type: r.type,
    description: r.description,
    requiredMatch: r.requiredMatch instanceof RegExp ? r.requiredMatch.source : String(r.requiredMatch || '')
  }));

  await db.query(`
    INSERT INTO assessment_questions (id, paper_id, number, topic, marks, stem, formula_hint, rubric_marks, examiner_pitfalls, model_answer, order_index)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    ON CONFLICT(id) DO UPDATE SET
      paper_id = EXCLUDED.paper_id,
      number = EXCLUDED.number,
      topic = EXCLUDED.topic,
      marks = EXCLUDED.marks,
      stem = EXCLUDED.stem,
      formula_hint = EXCLUDED.formula_hint,
      rubric_marks = EXCLUDED.rubric_marks,
      examiner_pitfalls = EXCLUDED.examiner_pitfalls,
      model_answer = EXCLUDED.model_answer,
      order_index = EXCLUDED.order_index
  `, [
    id, paperId, number, topic, marks, stem, formulaHint || null,
    db.toJson(serializedRubrics, []),
    db.toJson(examinerPitfalls || [], []),
    modelAnswer || null,
    orderIndex
  ]);
}

module.exports = {
  getRevisionPapers,
  getPaperById,
  getQuestionExaminerXray,
  evaluateWorking,
  upsertPaper,
  upsertQuestion
};
