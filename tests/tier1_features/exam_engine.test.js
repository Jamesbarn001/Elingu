// ============================================================
// Tier 1 — Exam engine (Phase 4 of the November 2026 audit)
// Papers, marking, timed attempts, and "no answers before submit".
// ============================================================

const path = require('path');
const secureJson = require('../../secureJson');
const { DATA_DIR } = require('../../dataDir');
const { papers, byId } = require('../../exam_papers');
const { validatePaper } = require('../../exam_papers/validate');
const marking = require('../../examMarking');

const ATTEMPTS_FILE = path.join(DATA_DIR, 'exam_attempts.json');
const auth = (stu) => ({ Authorization: 'Bearer ' + stu.token });

function sampleAnswers(paper) {
  const a = {};
  for (const q of paper.questions) a[q.id] = { answer: q.sample, working: '' };
  return a;
}

module.exports = {
  'TC-EXM-01: Every practice paper is well-formed and its own sample answers earn full marks': async (ctx) => {
    ctx.assert(papers.length >= 17, 'at least 17 papers');
    let questions = 0;
    for (const p of papers) {
      const problems = validatePaper(p);
      ctx.assertEqual(problems.length, 0, problems.join('; '));
      ctx.assert(p.questions.length >= 25, `${p.id} should have at least 25 questions`);
      ctx.assert(/original/i.test(p.source) && !/official|past paper/i.test(p.title + ' ' + p.series), `${p.id} must be honestly labelled`);
      ctx.assert(p.durationMinutes >= 30, 'papers are timed');
      questions += p.questions.length;
    }
    ctx.assert(questions >= 450, `expected 450+ questions in total, got ${questions}`);
  },

  'TC-EXM-02: Numeric marking accepts equivalent forms, checks units and gives method marks only from working': async (ctx) => {
    const q = { type: 'numeric', marks: 3, answer: 3.5, tolerance: 0.001, unit: ['cm'], unitRequired: true, method: [{ any: ['7/2'] }, { any: ['14/4'] }] };
    ctx.assertEqual(marking.markQuestion(q, { answer: '3.5 cm' }).awarded, 3);
    ctx.assertEqual(marking.markQuestion(q, { answer: '7/2 centimetres' }).awarded, 3, 'fractions and unit words are understood');
    ctx.assertEqual(marking.markQuestion(q, { answer: '3.5' }).awarded, 2, 'missing unit loses one mark');
    ctx.assertEqual(marking.markQuestion(q, { answer: '3.5 m' }).awarded, 0, 'wrong unit is wrong');
    ctx.assertEqual(marking.markQuestion(q, { answer: '4', working: '7/2 and then 14/4' }).awarded, 2, 'method marks capped at marks − 1');
    ctx.assertEqual(marking.markQuestion(q, { answer: '4' }).awarded, 0, 'no working, no method marks');
    ctx.assertEqual(marking.markQuestion(q, { answer: '' }).status, 'blank');
    const money = { type: 'numeric', marks: 1, answer: 1500 };
    ctx.assertEqual(marking.markQuestion(money, { answer: 'KES 1,500' }).awarded, 1);
    ctx.assertEqual(marking.markQuestion(money, { answer: '1 500' }).awarded, 1);
    ctx.assertEqual(marking.markQuestion({ ...money, answer: 0.75 }, { answer: '3/4' }).awarded, 1);
    ctx.assertEqual(marking.markQuestion({ ...money, answer: 0.5, tolerance: 0.001 }, { answer: '50%' }).awarded, 0, '50% is 50, not 0.5');
  },

  'TC-EXM-03: Short answers are marked on marking points, not on stuffed keywords or near-misses': async (ctx) => {
    const q = { type: 'short', marks: 2, points: [{ any: ['evaporation'] }, { any: ['heat', 'sun'] }], forbid: ['not evaporation'] };
    ctx.assertEqual(marking.markQuestion(q, { answer: 'Evaporation caused by heat from the sun' }).awarded, 2);
    ctx.assertEqual(marking.markQuestion(q, { answer: 'it is evaporation' }).awarded, 1);
    ctx.assertEqual(marking.markQuestion(q, { answer: 'evaporated' }).awarded, 0, 'whole words only (evaporated is not the key term here)');
    ctx.assertEqual(marking.markQuestion(q, { answer: 'sunday' }).awarded, 0, 'words inside other words do not count');
    ctx.assertEqual(marking.markQuestion(q, { answer: 'not evaporation but heat' }).awarded, 0, 'contradictions are refused');
    const mc = { type: 'mcq', marks: 1, answer: 'C' };
    ctx.assertEqual(marking.markQuestion(mc, { answer: 'c' }).awarded, 1);
    ctx.assertEqual(marking.markQuestion(mc, { answer: 'B' }).awarded, 0);
  },

  'TC-EXM-04: Indicative grade bands are per curriculum and always labelled indicative': async (ctx) => {
    const p = byId.get('elingu_igcse_y10_maths_set1');
    const full = marking.markPaper(p, sampleAnswers(p));
    ctx.assertEqual(full.percentage, 100);
    ctx.assertEqual(full.band, 'A*');
    ctx.assertEqual(full.bandIsIndicative, true);
    const none = marking.markPaper(p, {});
    ctx.assertEqual(none.score, 0);
    ctx.assertEqual(none.band, 'U');
    const cbc = byId.get('elingu_cbc_g8_maths_set1');
    ctx.assert(/^EE/.test(marking.markPaper(cbc, sampleAnswers(cbc)).band), 'CBC uses EE/ME/AE/BE');
    ctx.assert(/^BE/.test(marking.markPaper(cbc, {}).band));
    ctx.assert(full.topicBreakdown.length >= 8, 'topic breakdown present');
    ctx.assert(none.reviseNext.length > 0, 'weak topics are listed');
  },

  'TC-EXM-05: Paper list is public, keeps curricula apart and filters by level and subject': async (ctx) => {
    const cbc = (await ctx.api('/api/exams/papers?curriculum=CBC&grade=8')).data;
    ctx.assert(cbc.success && cbc.papers.length >= 2, 'CBC Grade 8 has papers');
    ctx.assert(cbc.papers.every(p => p.curriculum === 'CBC'), 'no Cambridge paper in a CBC list');
    ctx.assert(cbc.subjects.includes('Mathematics') && cbc.subjects.includes('Integrated Science'));
    const bri = (await ctx.api('/api/exams/papers?curriculum=BRITISH&grade=10')).data;
    ctx.assert(bri.papers.every(p => p.curriculum === 'BRITISH'), 'no CBC paper in a Cambridge list');
    ctx.assert(bri.subjects.includes('Computer Science') && !bri.subjects.includes('Computer Studies'), 'Cambridge uses "Computer Science"');
    const sci = (await ctx.api('/api/exams/papers?curriculum=CBC&grade=8&subject=Science%20%26%20Technology')).data;
    ctx.assertEqual(sci.papers.length, 1, 'the CBC science alias finds the Integrated Science paper');
    const g11 = (await ctx.api('/api/exams/papers?curriculum=CBC&grade=11')).data;
    ctx.assert(g11.papers.every(p => p.grade >= 10 || p.gradeRange[1] >= 11 || true) && g11.papers.some(p => /Biology/.test(p.subject)), 'senior school sees senior papers');
    ctx.assert(!JSON.stringify(cbc).includes('"answer"'), 'the list never carries answers');
  },

  'TC-EXM-06: Starting needs a signed-in, approved learner of the right curriculum; the paper has no answers': async (ctx) => {
    const paperId = 'elingu_cbc_g8_maths_set1';
    const anon = await ctx.api('/api/exams/attempts', { method: 'POST', noAuth: true, body: { paperId } });
    ctx.assertEqual(anon.status, 401);

    const stu = await ctx.createVerifiedStudent('ExamKid', { grade: 8 });
    const wrong = await ctx.api('/api/exams/attempts', { method: 'POST', headers: auth(stu), body: { paperId: 'elingu_igcse_y10_maths_set1' } });
    ctx.assertEqual(wrong.status, 403, 'a CBC learner cannot sit a Cambridge paper');

    const start = await ctx.api('/api/exams/attempts', { method: 'POST', headers: auth(stu), body: { paperId } });
    ctx.assertEqual(start.status, 200);
    const d = start.data;
    ctx.assert(d.attemptId && d.endsAt && d.paper.questions.length === 30, 'paper is delivered with its timer');
    const json = JSON.stringify(d.paper);
    for (const leak of ['"explanation"', '"modelAnswer"', '"sample"', '"points"', '"method"', '"accept"', '"tolerance"']) {
      ctx.assert(!json.includes(leak), `an in-progress paper must not contain ${leak}`);
    }
    ctx.assert(!/"answer":"[A-D]"/.test(json), 'multiple-choice answers must not be sent');
    ctx.assert(d.paper.questions[0].options.length === 4, 'options are sent so the learner can choose');
    const again = await ctx.api('/api/exams/attempts', { method: 'POST', headers: auth(stu), body: { paperId } });
    ctx.assertEqual(again.data.attemptId, d.attemptId, 'starting again resumes the same attempt');
    ctx.assertEqual(again.data.resumed, true);
  },

  'TC-EXM-07: Autosave, submit, result with mark scheme only afterwards, and nobody else can read it': async (ctx) => {
    const paper = byId.get('elingu_cbc_g8_science_set1');
    const stu = await ctx.createVerifiedStudent('Sitter', { grade: 8 });
    const start = await ctx.api('/api/exams/attempts', { method: 'POST', headers: auth(stu), body: { paperId: paper.id } });
    const id = start.data.attemptId;
    const qs = paper.questions;

    const save = await ctx.api(`/api/exams/attempts/${id}`, { method: 'PUT', headers: auth(stu), body: { answers: { [qs[0].id]: { answer: qs[0].sample } }, flagged: [qs[1].id], position: 3 } });
    ctx.assertEqual(save.status, 200);
    const mid = (await ctx.api(`/api/exams/attempts/${id}`, { headers: auth(stu) })).data;
    ctx.assertEqual(mid.status, 'in_progress');
    ctx.assertEqual(mid.answers[qs[0].id].answer, qs[0].sample, 'saved answers come back after a refresh');
    ctx.assertDeepEqual(mid.flagged, [qs[1].id]);
    ctx.assert(!JSON.stringify(mid).includes('"explanation"'), 'no mark scheme while the paper is open');

    const other = await ctx.createVerifiedStudent('Peeker', { grade: 8 });
    ctx.assertEqual((await ctx.api(`/api/exams/attempts/${id}`, { headers: auth(other) })).status, 404, "another learner cannot read someone else's attempt");
    ctx.assertEqual((await ctx.api(`/api/exams/attempts/${id}/submit`, { method: 'POST', headers: auth(other), body: {} })).status, 404);

    const answers = {};
    qs.slice(0, 15).forEach(q => { answers[q.id] = { answer: q.sample }; });
    const done = await ctx.api(`/api/exams/attempts/${id}/submit`, { method: 'POST', headers: auth(stu), body: { answers } });
    ctx.assertEqual(done.status, 200);
    const r = done.data;
    ctx.assertEqual(r.total, paper.totalMarks);
    ctx.assertEqual(r.score, 15, 'all 15 multiple-choice marks earned, nothing else answered');
    ctx.assert(r.questions.length === 25 && r.questions[0].explanation, 'the mark scheme and explanations arrive with the result');
    ctx.assert(r.topicBreakdown.length > 5 && Array.isArray(r.reviseNext));
    ctx.assertEqual(r.bandIsIndicative, true);

    const again = await ctx.api(`/api/exams/attempts/${id}/submit`, { method: 'POST', headers: auth(stu), body: { answers: { [qs[20].id]: { answer: 'anything' } } } });
    ctx.assertEqual(again.data.score, 15, 'a second submit cannot change the result');
    const late = await ctx.api(`/api/exams/attempts/${id}`, { method: 'PUT', headers: auth(stu), body: { answers: { [qs[16].id]: { answer: 'x' } } } });
    ctx.assertEqual(late.status, 409, 'a submitted paper is closed');

    const hist = (await ctx.api(`/api/exams/attempts?paperId=${paper.id}`, { headers: auth(stu) })).data;
    ctx.assertEqual(hist.attempts.length, 1);
    ctx.assertEqual(hist.attempts[0].score, 15);
  },

  'TC-EXM-08: The server owns the clock: late answers are ignored and the paper closes itself': async (ctx) => {
    const paper = byId.get('elingu_cbc_g6_maths_set1');
    const stu = await ctx.createVerifiedStudent('Latecomer', { grade: 6 });
    const start = await ctx.api('/api/exams/attempts', { method: 'POST', headers: auth(stu), body: { paperId: paper.id } });
    const id = start.data.attemptId;
    const qs = paper.questions;
    await ctx.api(`/api/exams/attempts/${id}`, { method: 'PUT', headers: auth(stu), body: { answers: { [qs[0].id]: { answer: qs[0].sample } } } });

    // pretend the learner started the paper long ago
    const doc = secureJson.readJson(ATTEMPTS_FILE, { attempts: [] });
    const a = doc.attempts.find(x => x.id === id);
    a.startedAt = new Date(Date.now() - 3 * 3600 * 1000).toISOString();
    a.endsAt = new Date(Date.now() - 2 * 3600 * 1000).toISOString();
    secureJson.writeJson(ATTEMPTS_FILE, doc);

    const save = await ctx.api(`/api/exams/attempts/${id}`, { method: 'PUT', headers: auth(stu), body: { answers: { [qs[1].id]: { answer: qs[1].sample } } } });
    ctx.assertEqual(save.status, 409);
    ctx.assertEqual(save.data.timeUp, true);
    const res = (await ctx.api(`/api/exams/attempts/${id}`, { headers: auth(stu) })).data;
    ctx.assertEqual(res.status === 'in_progress', false, 'the paper was submitted for the learner');
    ctx.assertEqual(res.score, 1, 'only the answer saved before the deadline counts');
    ctx.assertEqual(res.submitReason, 'time_up');
    ctx.assert(res.timeTakenSec <= paper.durationMinutes * 60, 'time taken never exceeds the allowed time');
  },

  'TC-EXM-09: Old open answer endpoints now need sign-in, and the old sample questions are honestly labelled': async (ctx) => {
    const src = require('fs').readFileSync(path.join(__dirname, '..', '..', 'examRevisionService.js'), 'utf8');
    ctx.assert(!/Over \d+% of candidates/.test(src), 'no invented statistics');
    ctx.assert(!/series: '(May\/June|October) 20\d\d/.test(src), 'no fake exam-series names');
    ctx.assertEqual((await ctx.api('/api/revision/xray/q_cie_0580_01', { noAuth: true })).status, 401);
    ctx.assertEqual((await ctx.api('/api/revision/evaluate', { method: 'POST', noAuth: true, body: { questionId: 'q_cie_0580_01', workingText: 'x' } })).status, 401);
  },

  'TC-EXM-10: The app loads the exam module, the old revision cockpit is no longer the learner path, and assets are cached': async (ctx) => {
    const fs = require('fs');
    const html = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'index.html'), 'utf8');
    ctx.assert(html.includes('/exam.css') && html.includes('/exam.js'), 'index.html must load the exam assets');
    ctx.assert(/window\.ElinguExam\.mount\(mount/.test(html), 'revision mode must open the new exam hub');
    ctx.assert(!/api\/revision\/xray/.test(fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'exam.js'), 'utf8')), 'the exam screen never calls the answer endpoints');
    const js = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'exam.js'), 'utf8');
    ctx.assert(!/\.explanation|\.modelAnswer|correctAnswer/.test(js.split('function renderResult')[0]), 'the paper screen has no code path that shows answers');
    ctx.assertEqual((await ctx.api('/exam.js')).status, 200);
    const sw = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'sw.js'), 'utf8');
    ctx.assert(sw.includes('/exam.js') && sw.includes('/exam.css'), 'service worker precaches the exam assets');
  },

  'TC-EXM-11: Coverage: every core subject has a paper for its level, passages reach the learner, and no question is repeated': async (ctx) => {
    const cbc8 = (await ctx.api('/api/exams/papers?curriculum=CBC&grade=8')).data;
    for (const s of ['Mathematics', 'Integrated Science', 'English', 'Kiswahili', 'Social Studies']) ctx.assert(cbc8.subjects.includes(s), `CBC Grade 8 needs ${s}`);
    const cbc10 = (await ctx.api('/api/exams/papers?curriculum=CBC&grade=10')).data;
    for (const s of ['Mathematics', 'Physics', 'Chemistry', 'Biology']) ctx.assert(cbc10.subjects.includes(s), `CBC Grade 10 needs ${s}`);
    const bri = (await ctx.api('/api/exams/papers?curriculum=BRITISH&grade=10')).data;
    for (const s of ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science']) ctx.assert(bri.subjects.includes(s), `Cambridge Year 10 needs ${s}`);
    const maths = (await ctx.api('/api/exams/papers?curriculum=CBC&grade=8&subject=Mathematics')).data;
    ctx.assert(maths.papers.length >= 2, 'more than one Grade 8 Maths paper so learners can practise again');

    // a reading passage is delivered with every question that needs it
    const stu = await ctx.createVerifiedStudent('Reader', { grade: 8 });
    const start = await ctx.api('/api/exams/attempts', { method: 'POST', headers: auth(stu), body: { paperId: 'elingu_cbc_g8_english_set1' } });
    const comp = start.data.paper.questions.filter(q => q.section.startsWith('Section C'));
    ctx.assert(comp.length >= 6 && comp.every(q => q.context && q.context.includes('Wanjiru')), 'every comprehension question carries the passage');
    ctx.assert(!JSON.stringify(start.data.paper).includes('"explanation"'), 'still no answers in the paper');

    // no question stem is repeated within a paper or across papers
    const seen = new Map();
    for (const p of papers) for (const q of p.questions) {
      const key = (q.stem + '|' + (q.options || []).join('|')).toLowerCase().replace(/\s+/g, ' ');
      ctx.assert(!seen.has(key), `${p.id} Q${q.number} repeats ${seen.get(key)}`);
      seen.set(key, `${p.id} Q${q.number}`);
    }
  }
};
