// ============================================================
// Tier 1 — Feature 21: Revision Studio & Examiner Mark-Scheme X-Ray Engine
// Verification Suite: Past papers, Question stems, Examiner X-Ray [M1/A1/B1], and Socratic Working Evaluation
// ============================================================

const assert = require('assert');

module.exports = {
  'TC-REV-01: Past papers endpoint returns CBE model papers with non-calculator flag': async (ctx) => {
    const res = await ctx.api('/api/revision/papers?curriculum=CBC&grade=8&subject=Mathematics');
    assert.strictEqual(res.status, 200, 'Endpoint should return HTTP 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true, 'Response must have success: true');
    assert.ok(Array.isArray(data.papers), 'Must return papers array');
    assert.ok(data.papers.length > 0, 'Should have at least 1 CBC paper');

    const p = data.papers[0];
    assert.strictEqual(p.curriculum, 'CBC', 'Paper curriculum must be CBC');
    assert.strictEqual(p.calculatorAllowed, false, 'CBE Grade 8 Maths must enforce non-calculator rule');
    assert.ok(p.paperCode, 'Must include paper code');
    assert.ok(p.title, 'Must include title');
  },

  'TC-REV-02: Past papers endpoint returns Cambridge IGCSE 0580 Paper 4': async (ctx) => {
    const res = await ctx.api('/api/revision/papers?curriculum=BRITISH&grade=10&subject=Mathematics');
    assert.strictEqual(res.status, 200, 'Endpoint should return HTTP 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true, 'Response must have success: true');
    assert.ok(Array.isArray(data.papers), 'Must return papers array');
    
    const p = data.papers.find(item => item.paperCode.includes('0580/42') || item.id.includes('p4'));
    assert.ok(p, 'Should find Cambridge 0580 paper');
    assert.strictEqual(p.examBoard, 'CAIE', 'Exam board must be CAIE');
    assert.strictEqual(p.calculatorAllowed, true, 'IGCSE Paper 4 allows calculators');
  },

  'TC-REV-03: Single paper lookup returns questions with marks and hints': async (ctx) => {
    const paperId = 'cie_0580_2024_mj_p4';
    const res = await ctx.api(`/api/revision/paper/${paperId}`);
    assert.strictEqual(res.status, 200, 'Should return HTTP 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true, 'Success must be true');
    assert.ok(data.paper, 'Must return paper object');
    assert.strictEqual(data.paper.id, paperId, 'Paper ID must match');
    assert.ok(Array.isArray(data.paper.questions) && data.paper.questions.length > 0, 'Must have questions');

    const q = data.paper.questions[0];
    assert.ok(q.stem, 'Question must have problem stem');
    assert.ok(q.marks >= 3, 'Question must have marks >= 3');
    assert.ok(q.formulaHint, 'Question must have formula hint');
  },

  'TC-REV-04: Question Examiner X-Ray mark scheme reveals [M1], [A1], [B1] and pitfalls': async (ctx) => {
    const questionId = 'q_cie_0580_01';
    // Answers are no longer open to the public: a signed-in, parent-approved learner is required.
    const anon = await ctx.api(`/api/revision/xray/${questionId}`, { noAuth: true });
    assert.strictEqual(anon.status, 401, 'X-Ray must require sign-in');
    const stu = await ctx.createVerifiedStudent('Xray');
    const res = await ctx.api(`/api/revision/xray/${questionId}`, { headers: { Authorization: 'Bearer ' + stu.token } });
    assert.strictEqual(res.status, 200, 'Should return HTTP 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true, 'Success must be true');
    assert.ok(data.xray, 'Must return xray object');
    assert.strictEqual(data.xray.questionId, questionId, 'Question ID must match');

    const rubric = data.xray.markBreakdown;
    assert.ok(Array.isArray(rubric), 'Mark breakdown must be an array');
    
    // Check for M1 (Method), A1 (Accuracy), B1 (Independent)
    const hasM1 = rubric.some(r => r.code === 'M1');
    const hasA1 = rubric.some(r => r.code === 'A1');
    assert.ok(hasM1, 'Must include M1 method mark');
    assert.ok(hasA1, 'Must include A1 accuracy mark');
    assert.ok(data.xray.examinerNotes, 'Must include examiner pitfall notes');
    assert.ok(data.xray.modelAnswer, 'Must include model answer with inline mark annotations');
  },

  'TC-REV-05: Socratic student working evaluation awards method and accuracy marks': async (ctx) => {
    const questionId = 'q_cie_0580_01'; // 5x - 7 < 3(x + 5) => x < 11
    
    const stu = await ctx.createVerifiedStudent('Eval');
    const auth = { Authorization: 'Bearer ' + stu.token };
    // Test full-mark response
    const resFull = await ctx.api('/api/revision/evaluate', {
      method: 'POST',
      headers: auth,
      body: {
        questionId,
        workingText: '5x - 7 < 3x + 15\n2x < 22',
        finalAnswer: 'x < 11'
      }
    });

    assert.strictEqual(resFull.status, 200, 'Evaluation should return 200 OK');
    assert.strictEqual(resFull.data.success, true, 'Success must be true');
    assert.strictEqual(resFull.data.awardedMarks, 4, 'Full-mark student should get 4/4 marks');
    assert.strictEqual(resFull.data.percentage, 100, 'Percentage should be 100%');
    assert.ok(resFull.data.qualitativeFeedback.includes('Full Marks'), 'Should provide commendation feedback');

    // Test partial-mark response (method mark earned, but final answer incorrect)
    const resPartial = await ctx.api('/api/revision/evaluate', {
      method: 'POST',
      headers: auth,
      body: {
        questionId,
        workingText: '5x - 7 < 3x + 15',
        finalAnswer: 'x > 11' // Flipped sign mistakenly
      }
    });

    assert.strictEqual(resPartial.status, 200, 'Evaluation should return 200 OK');
    assert.ok(resPartial.data.awardedMarks >= 1, 'Should award method mark for expanding bracket');
    assert.ok(resPartial.data.awardedMarks < 4, 'Should deduct accuracy mark for wrong sign');
  },

  'TC-REV-06: Zero Curriculum Leakage & Stage-Appropriate Assessment Papers': async (ctx) => {
    // 1. CBC Upper Primary (Grade 6) returns KPSEA paper
    const resG6 = await ctx.api('/api/revision/papers?curriculum=CBC&grade=6&subject=Mathematics');
    assert.strictEqual(resG6.status, 200);
    assert.ok(resG6.data.papers.length > 0, 'Grade 6 should have KPSEA paper');
    assert.ok(resG6.data.papers.every(p => p.curriculum === 'CBC' && p.examBoard === 'KNEC'), 'Zero British leakage in CBC G6');

    // 2. CBC Senior School (Grade 11) returns KSSEA paper
    const resG11 = await ctx.api('/api/revision/papers?curriculum=CBC&grade=11&subject=Mathematics');
    assert.strictEqual(resG11.status, 200);
    assert.ok(resG11.data.papers.length > 0, 'Grade 11 should have KSSEA paper');
    assert.ok(resG11.data.papers.every(p => p.curriculum === 'CBC' && p.examBoard === 'KNEC'), 'Zero British leakage in CBC G11');

    // 3. British Lower Secondary Checkpoint (Year 8) returns Checkpoint paper
    const resY8 = await ctx.api('/api/revision/papers?curriculum=BRITISH&grade=8&subject=Mathematics');
    assert.strictEqual(resY8.status, 200);
    assert.ok(resY8.data.papers.length > 0, 'Year 8 should have Checkpoint paper');
    assert.ok(resY8.data.papers.every(p => p.curriculum === 'BRITISH' && p.examBoard === 'CAIE'), 'Zero CBE leakage in British Year 8');

    // 4. British Upper Secondary IGCSE (Year 10) returns 0580 Paper 2 and Paper 4
    const resY10 = await ctx.api('/api/revision/papers?curriculum=BRITISH&grade=10&subject=Mathematics');
    assert.strictEqual(resY10.status, 200);
    assert.ok(resY10.data.papers.length >= 2, 'Year 10 should have Paper 2 & Paper 4');
    assert.ok(resY10.data.papers.every(p => p.curriculum === 'BRITISH' && p.examBoard === 'CAIE'), 'Zero CBE leakage in British Year 10');
  }
};
