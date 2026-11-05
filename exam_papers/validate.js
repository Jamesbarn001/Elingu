// Self-check for practice papers: structure, unique ids, and "the sample answer earns full marks, a blank earns none".
const { markQuestion } = require('../examMarking');

function validatePaper(paper) {
  const problems = [];
  const ids = new Set();
  let total = 0;
  for (const q of paper.questions) {
    const tag = `${paper.id} Q${q.number}`;
    if (ids.has(q.id)) problems.push(`${tag}: duplicate id`);
    ids.add(q.id);
    if (!q.stem || !q.topic) problems.push(`${tag}: missing stem or topic`);
    if (!(q.marks >= 1)) problems.push(`${tag}: marks must be >= 1`);
    total += q.marks;
    if (q.type === 'mcq' && (!q.options || q.options.length !== 4)) problems.push(`${tag}: mcq needs 4 options`);
    if (q.type === 'short' && !(q.points && q.points.length)) problems.push(`${tag}: short question needs marking points`);
    const full = markQuestion(q, { answer: q.sample, working: '' });
    if (full.awarded !== q.marks) problems.push(`${tag}: sample answer ${JSON.stringify(q.sample)} scored ${full.awarded}/${q.marks}`);
    const blank = markQuestion(q, { answer: '' });
    if (blank.awarded !== 0 || blank.status !== 'blank') problems.push(`${tag}: blank answer must score 0`);
    if (q.type === 'numeric') {
      const wrong = markQuestion(q, { answer: String((Number(q.answer) || 1) * 7 + 3) });
      if (wrong.awarded === q.marks) problems.push(`${tag}: a clearly wrong number scored full marks`);
    }
    if (!q.explanation && !q.modelAnswer) problems.push(`${tag}: needs an explanation or model answer`);
  }
  if (total !== paper.totalMarks) problems.push(`${paper.id}: totalMarks ${paper.totalMarks} != sum ${total}`);
  return problems;
}

module.exports = { validatePaper };
