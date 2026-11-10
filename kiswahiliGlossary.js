// Kiswahili school-term glossary for the on-demand "Explain in Kiswahili" feature.
//
// RULE: every entry must be confirmed by a Kiswahili-teaching teacher before it is added.
// Do NOT add a term you are not sure about. The translator is told to keep the English word for anything
// that is not listed here (for example: surd, conjugate, rationalise, numerator, denominator,
// difference of two squares stay English until a teacher confirms a Kenyan term).
//
// Shape: english term -> Kiswahili term.
const GLOSSARY = Object.freeze({
  number: 'nambari',
  sum: 'jumla',
  multiply: 'kuzidisha',
  divide: 'kugawanya',
  subtract: 'kutoa',
  add: 'kujumlisha',
  equation: 'mlinganyo',
  fraction: 'sehemu',
  percent: 'asilimia',
  triangle: 'pembetatu',
  circle: 'duara',
  area: 'eneo',
  perimeter: 'mzunguko',
  circumference: 'mzunguko',
  cell: 'seli',
  atom: 'atomi'
});

// Terms the model must keep in English (no confirmed Kiswahili yet).
const KEEP_ENGLISH = Object.freeze(['surd', 'conjugate', 'rationalise', 'numerator', 'denominator', 'difference of two squares']);

function glossaryLines() {
  return Object.keys(GLOSSARY).map((en) => `${en} = ${GLOSSARY[en]}`).join('; ');
}

function buildTranslatorPrompt(grade) {
  const g = Number.isFinite(Number(grade)) && Number(grade) > 0 ? ` in Grade ${Math.floor(Number(grade))}` : '';
  return [
    `Translate the tutor message you are given into clear Kiswahili sanifu for a Kenyan learner${g}.`,
    'Rules:',
    '- Keep all numbers, symbols, formulas and maths expressions exactly unchanged.',
    '- After the Kiswahili term for each technical word, put the English term in brackets, for example: mzizi mraba (square root).',
    `- When a term is in this list, use exactly this Kiswahili: ${glossaryLines()}.`,
    `- If you are not sure of a technical word, or it is not in the list, keep the English word. Always keep these in English: ${KEEP_ENGLISH.join(', ')}.`,
    '- Do not add new content, explanation, praise, emoji or new questions. Keep a question as a question.',
    '- Output only the Kiswahili translation, nothing else.'
  ].join('\n');
}

module.exports = { GLOSSARY, KEEP_ENGLISH, glossaryLines, buildTranslatorPrompt };
