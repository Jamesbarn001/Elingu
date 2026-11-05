// ════════════════════════════════════════════════════════════
// EXAM PAPERS & ATTEMPTS — timed, server-timed, answer-safe
//
// Rules this file enforces:
//   • The mark scheme, model answers and explanations are NEVER sent while an attempt is in progress. They arrive only
//     in the result after the paper is submitted (so the "X-ray" cannot be used as an answer key).
//   • The clock belongs to the server. The browser shows a countdown, but answers saved after the deadline (plus a short
//     grace period for slow networks) are ignored.
//   • Only a signed-in learner whose parent has approved the account can start or read an attempt, and only their own.
// ════════════════════════════════════════════════════════════

const express = require('express');
const crypto = require('crypto');
const path = require('path');
const secureJson = require('./secureJson');
const { DATA_DIR } = require('./dataDir');
const bank = require('./examBank');   // practice papers come from the database (see examBank.js)
const { markPaper } = require('./examMarking');

const ATTEMPTS_FILE = path.join(DATA_DIR, 'exam_attempts.json');
const GRACE_MS = 30 * 1000;
const MAX_ATTEMPTS_PER_STUDENT = 100;

// ── paper catalogue ───────────────────────────────────────────
const SUBJECT_ALIASES = {
  'core mathematics': 'mathematics', 'essential mathematics': 'mathematics', 'maths': 'mathematics',
  'science & technology': 'integrated science', 'science and technology': 'integrated science', 'science': 'integrated science',
  'computer studies': 'computer science'
};
function normSubject(s) {
  const k = String(s || '').trim().toLowerCase();
  return SUBJECT_ALIASES[k] || k;
}
function normCurriculum(c) {
  const u = String(c || 'CBC').toUpperCase();
  return (u === 'BRITISH' || u === 'IGCSE' || u === 'CAIE') ? 'BRITISH' : 'CBC';
}

function summary(p) {
  return {
    id: p.id, curriculum: p.curriculum, grade: p.grade, subject: p.subject, title: p.title, series: p.series,
    durationMinutes: p.durationMinutes, totalMarks: p.totalMarks, questionCount: p.questions.length,
    calculatorAllowed: !!p.calculatorAllowed, scale: p.scale,
    sections: p.sections.map(s => s.title)
  };
}

function papersFor({ curriculum, grade, subject }) {
  const c = normCurriculum(curriculum);
  const g = Number(grade) || null;
  const s = subject ? normSubject(subject) : null;
  return bank.papers().filter(p => {
    if (p.curriculum !== c) return false;                                   // never mix curricula
    if (g && !(g >= p.gradeRange[0] && g <= p.gradeRange[1])) return false;
    if (s && normSubject(p.subject) !== s) return false;
    return true;
  });
}

/** A paper as the learner sees it while sitting it: no answers, no mark scheme. */
function publicPaper(p) {
  return {
    ...summary(p),
    instructions: p.instructions || '',
    sectionInfo: p.sections,
    questions: p.questions.map(q => ({
      id: q.id, number: q.number, section: q.section, topic: q.topic, type: q.type, marks: q.marks,
      context: q.context,   // a reading passage or data shared by several questions
      stem: q.stem,
      options: q.type === 'mcq' ? q.options : undefined,
      answerFormat: q.type === 'numeric' ? (q.unit ? 'number and unit' : 'number') : (q.type === 'short' ? 'words' : 'choice'),
      allowWorking: q.type === 'numeric' && q.marks > 1
    }))
  };
}

// ── attempt store (encrypted like every other personal-data file) ──
function loadAll() { return secureJson.readJson(ATTEMPTS_FILE, { attempts: [] }, 'exams'); }
function saveAll(doc) {
  // keep the newest attempts per learner so the file cannot grow forever
  const perStudent = new Map();
  doc.attempts.sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt));
  doc.attempts = doc.attempts.filter(a => {
    const n = (perStudent.get(a.studentId) || 0) + 1;
    perStudent.set(a.studentId, n);
    return n <= MAX_ATTEMPTS_PER_STUDENT;
  });
  secureJson.writeJson(ATTEMPTS_FILE, doc, 'exams');
}

function cleanAnswers(paper, input) {
  const out = {};
  if (!input || typeof input !== 'object') return out;
  const valid = new Set(paper.questions.map(q => q.id));
  for (const [qid, v] of Object.entries(input).slice(0, 120)) {
    if (!valid.has(qid) || !v || typeof v !== 'object') continue;
    const answer = String(v.answer === undefined || v.answer === null ? '' : v.answer).slice(0, 700);
    const working = String(v.working === undefined || v.working === null ? '' : v.working).slice(0, 1500);
    if (answer || working) out[qid] = { answer, working };
  }
  return out;
}

function finalize(attempt, paper, reason) {
  const result = markPaper(paper, attempt.answers);
  attempt.status = 'submitted';
  attempt.submittedAt = new Date().toISOString();
  attempt.submitReason = reason;
  attempt.timeTakenSec = Math.min(
    Math.round((new Date(attempt.submittedAt) - new Date(attempt.startedAt)) / 1000),
    paper.durationMinutes * 60
  );
  attempt.result = result;
  return result;
}

function attemptSummary(a, paper) {
  return {
    id: a.id, paperId: a.paperId, title: paper ? paper.title : a.paperId, subject: paper ? paper.subject : null,
    status: a.status, startedAt: a.startedAt, submittedAt: a.submittedAt || null,
    score: a.result ? a.result.score : null, total: a.result ? a.result.total : (paper ? paper.totalMarks : null),
    percentage: a.result ? a.result.percentage : null, band: a.result ? a.result.band : null
  };
}

function resultPayload(a, paper) {
  return {
    attempt: attemptSummary(a, paper),
    scale: paper.scale,
    timeTakenSec: a.timeTakenSec,
    submitReason: a.submitReason,
    ...a.result
  };
}

module.exports = function examRoutes({ requireStudent, rateLimit, onSubmitted }) {
  const router = express.Router();
  const limit = (max, windowMs = 60 * 1000) => rateLimit({
    windowMs, max, standardHeaders: true, legacyHeaders: false,
    skip: () => process.env.NODE_ENV === 'test',
    message: { error: 'Too many requests. Please slow down a little.' }
  });

  // Public: what papers exist (no questions' answers, no questions at all).
  router.get('/api/exams/papers', (req, res) => {
    const list = papersFor(req.query);
    const subjects = [...new Set(papersFor({ curriculum: req.query.curriculum, grade: req.query.grade }).map(p => p.subject))];
    res.json({ success: true, papers: list.map(summary), subjects });
  });

  router.post('/api/exams/attempts', limit(20), (req, res) => {
    const student = requireStudent(req, res, null);
    if (!student) return;
    const paper = bank.byId(String((req.body || {}).paperId || ''));
    if (!paper) return res.status(404).json({ error: 'Paper not found.' });
    if (paper.curriculum !== normCurriculum(student.curriculum || (student.schoolLevel === 'IGCSE' || student.schoolLevel === 'CHECKPOINT' ? 'BRITISH' : 'CBC'))) {
      return res.status(403).json({ error: 'This paper belongs to a different curriculum.' });
    }

    const doc = loadAll();
    const now = Date.now();
    // Close any of this learner's attempts that ran out of time while they were away.
    for (const a of doc.attempts) {
      if (a.studentId === student.id && a.status === 'in_progress' && now > new Date(a.endsAt).getTime() + GRACE_MS) {
        const p = bank.byId(a.paperId);
        if (p) finalize(a, p, 'time_up');
      }
    }
    let attempt = doc.attempts.find(a => a.studentId === student.id && a.paperId === paper.id && a.status === 'in_progress');
    let resumed = true;
    if (!attempt) {
      resumed = false;
      attempt = {
        id: 'att_' + crypto.randomBytes(8).toString('hex'),
        studentId: student.id,
        paperId: paper.id,
        status: 'in_progress',
        startedAt: new Date(now).toISOString(),
        endsAt: new Date(now + paper.durationMinutes * 60 * 1000).toISOString(),
        answers: {},
        flagged: [],
        position: 0
      };
      doc.attempts.push(attempt);
    }
    saveAll(doc);
    res.json({
      success: true, resumed,
      attemptId: attempt.id,
      startedAt: attempt.startedAt, endsAt: attempt.endsAt, serverNow: new Date().toISOString(),
      answers: attempt.answers, flagged: attempt.flagged, position: attempt.position,
      paper: publicPaper(paper)
    });
  });

  router.put('/api/exams/attempts/:id', limit(180), (req, res) => {
    const student = requireStudent(req, res, null);
    if (!student) return;
    const doc = loadAll();
    const attempt = doc.attempts.find(a => a.id === req.params.id && a.studentId === student.id);
    if (!attempt) return res.status(404).json({ error: 'Attempt not found.' });
    if (attempt.status !== 'in_progress') return res.status(409).json({ error: 'This paper has already been submitted.', submitted: true });
    const paper = bank.byId(attempt.paperId);
    const late = Date.now() > new Date(attempt.endsAt).getTime() + GRACE_MS;
    if (late) {
      finalize(attempt, paper, 'time_up');
      saveAll(doc);
      return res.status(409).json({ error: 'Time is up. Your paper was submitted.', timeUp: true, submitted: true });
    }
    const body = req.body || {};
    attempt.answers = { ...attempt.answers, ...cleanAnswers(paper, body.answers) };
    // a cleared answer arrives as empty strings: remove it
    for (const [qid, v] of Object.entries(body.answers || {})) {
      if (v && !String(v.answer || '').trim() && !String(v.working || '').trim()) delete attempt.answers[qid];
    }
    if (Array.isArray(body.flagged)) attempt.flagged = body.flagged.filter(id => paper.questions.some(q => q.id === id)).slice(0, 120);
    if (Number.isInteger(body.position)) attempt.position = Math.max(0, Math.min(paper.questions.length - 1, body.position));
    saveAll(doc);
    res.json({ success: true, savedAt: new Date().toISOString(), endsAt: attempt.endsAt, serverNow: new Date().toISOString() });
  });

  router.post('/api/exams/attempts/:id/submit', limit(20), (req, res) => {
    const student = requireStudent(req, res, null);
    if (!student) return;
    const doc = loadAll();
    const attempt = doc.attempts.find(a => a.id === req.params.id && a.studentId === student.id);
    if (!attempt) return res.status(404).json({ error: 'Attempt not found.' });
    const paper = bank.byId(attempt.paperId);
    if (attempt.status === 'submitted') return res.json({ success: true, alreadySubmitted: true, ...resultPayload(attempt, paper) });
    // answers sent with the submit count only if they arrive before the deadline (plus grace)
    if (Date.now() <= new Date(attempt.endsAt).getTime() + GRACE_MS) {
      attempt.answers = { ...attempt.answers, ...cleanAnswers(paper, (req.body || {}).answers) };
    }
    finalize(attempt, paper, Date.now() > new Date(attempt.endsAt).getTime() ? 'time_up' : 'submitted_by_learner');
    saveAll(doc);
    const celebrate = onSubmitted ? onSubmitted(student, attempt.id, attempt.result) : null;
    res.json({ success: true, ...resultPayload(attempt, paper), celebrate });
  });

  router.get('/api/exams/attempts', (req, res) => {
    const student = requireStudent(req, res, null);
    if (!student) return;
    const doc = loadAll();
    const list = doc.attempts
      .filter(a => a.studentId === student.id && (!req.query.paperId || a.paperId === req.query.paperId))
      .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
      .slice(0, 50)
      .map(a => attemptSummary(a, bank.byId(a.paperId)));
    res.json({ success: true, attempts: list });
  });

  router.get('/api/exams/attempts/:id', (req, res) => {
    const student = requireStudent(req, res, null);
    if (!student) return;
    const doc = loadAll();
    const attempt = doc.attempts.find(a => a.id === req.params.id && a.studentId === student.id);
    if (!attempt) return res.status(404).json({ error: 'Attempt not found.' });
    const paper = bank.byId(attempt.paperId);
    if (attempt.status === 'submitted') return res.json({ success: true, ...resultPayload(attempt, paper) });
    res.json({
      success: true, status: 'in_progress', attemptId: attempt.id, endsAt: attempt.endsAt, serverNow: new Date().toISOString(),
      answers: attempt.answers, flagged: attempt.flagged, position: attempt.position, paper: publicPaper(paper)
    });
  });

  return router;
};

module.exports._internals = { papersFor, publicPaper, summary };
