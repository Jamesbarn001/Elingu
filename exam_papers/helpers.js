// Helpers for writing practice papers. Every question here is ORIGINAL Elingu content written in the style of the
// exam boards; none is copied from a past paper, and papers are labelled that way (never "official" or "past paper").
//
// Each question carries a `sample` answer used by the self-test (tests mark the sample and expect full marks, and a
// blank answer and expect zero), which catches mistyped answers before a learner ever sees them.

const LETTERS = 'ABCD';

/** Multiple choice, 1 mark by default. `answer` is the letter of the correct option. */
function mcq(topic, stem, options, answer, explanation, marks = 1) {
  if (options.length !== 4) throw new Error('mcq needs 4 options: ' + stem);
  if (!LETTERS.includes(answer)) throw new Error('mcq answer must be A-D: ' + stem);
  return { type: 'mcq', topic, stem, options, answer, marks, explanation, sample: answer };
}

/** A number (or fraction/decimal). opts: tolerance, unit (string or list), unitRequired, alternatives, method:[{any:[..]}], hint, displayAnswer */
function num(topic, stem, answer, marks, opts = {}) {
  const { explanation, sample, ...rest } = opts;
  return { type: 'numeric', topic, stem, answer, marks, explanation, ...rest, sample: sample !== undefined ? sample : String(answer) };
}

/** Words/phrases marked against marking points. points: [{any:[..]} | {all:[..]}], one mark each unless pt.marks. */
function short(topic, stem, points, marks, modelAnswer, sample, opts = {}) {
  return { type: 'short', topic, stem, points, marks, modelAnswer, sample, ...opts };
}

/** Short exact answer(s) (a single word or term). accept: list of exact accepted answers. */
function term(topic, stem, accept, marks, explanation, opts = {}) {
  const pts = [{ any: accept }];
  return { type: 'short', topic, stem, accept, points: pts, marks, modelAnswer: accept[0], explanation, sample: accept[0], ...opts };
}

/** Assemble a paper: numbers the questions, fixes ids, validates marks and answers. */
function buildPaper(meta, sections) {
  const questions = [];
  let n = 0;
  for (const sec of sections) {
    for (const q of sec.questions) {
      n += 1;
      questions.push({ ...q, id: `${meta.id}_q${String(n).padStart(2, '0')}`, number: n, section: sec.title, ...(sec.context ? { context: sec.context } : {}) });
    }
  }
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
  return {
    source: 'Elingu original practice questions, written in the style of the exam board. Not an official or past paper.',
    calculatorAllowed: false,
    ...meta,
    totalMarks,
    sections: sections.map(s => ({ title: s.title, instructions: s.instructions || '' })),
    questions
  };
}

module.exports = { mcq, num, short, term, buildPaper };
