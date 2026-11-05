// ════════════════════════════════════════════════════════════
// EXAM MARKING — pure functions (no I/O, no AI), so every result is repeatable and unit-testable.
//
// Question types:
//   mcq      one correct option (letter A–D)
//   numeric  a number (accepts 3.5, 7/2, 3 1/2, "KES 1,500", "x = 4", "35%"), with tolerance and optional units
//   short    words/phrases: marked against "marking points", each with accepted alternatives
//
// What this is NOT: a replacement for a human examiner. Long, open answers are not marked here; the results screen
// shows the model answer so learners can self-check those.
// ════════════════════════════════════════════════════════════

const SUPERSCRIPTS = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
const VULGAR = { '½': '1/2', '¼': '1/4', '¾': '3/4', '⅓': '1/3', '⅔': '2/3', '⅕': '1/5', '⅖': '2/5', '⅗': '3/5', '⅘': '4/5', '⅛': '1/8' };

function normalizeText(input) {
  let s = String(input === undefined || input === null ? '' : input).normalize('NFKD');
  s = s.replace(/[̀-ͯ]/g, '');                 // accents
  s = s.replace(/[−–—]/g, '-');           // unicode minus / dashes
  s = s.toLowerCase();
  s = s.replace(/[“”"`’‘']/g, '');
  s = s.replace(/[^\p{L}\p{N}\s./%+\-*=^<>()]/gu, ' ');
  return s.replace(/\s+/g, ' ').trim();
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Does `text` (already normalised) contain this phrase as whole words? Simple plural/verb-ending tolerance. */
function containsPhrase(text, phrase) {
  const p = normalizeText(phrase);
  if (!p) return false;
  const re = new RegExp('(^|[^\\p{L}\\p{N}])' + escapeRegex(p) + '(s|es|ed|ing)?($|[^\\p{L}\\p{N}])', 'u');
  return re.test(text);
}

const UNIT_ALIASES = {
  centimetres: 'cm', centimeters: 'cm', centimetre: 'cm', centimeter: 'cm', cm: 'cm',
  metres: 'm', meters: 'm', metre: 'm', meter: 'm', m: 'm',
  kilometres: 'km', kilometers: 'km', kilometre: 'km', kilometer: 'km', km: 'km',
  millimetres: 'mm', millimeters: 'mm', mm: 'mm',
  grams: 'g', gram: 'g', g: 'g', kilograms: 'kg', kilogram: 'kg', kg: 'kg', kgs: 'kg',
  litres: 'l', liters: 'l', litre: 'l', liter: 'l', l: 'l', millilitres: 'ml', ml: 'ml',
  seconds: 's', second: 's', secs: 's', sec: 's', s: 's', minutes: 'min', minute: 'min', min: 'min', mins: 'min', hours: 'h', hour: 'h', hrs: 'h', hr: 'h', h: 'h',
  degrees: '°', degree: '°', '°': '°', deg: '°',
  newtons: 'n', newton: 'n', n: 'n', joules: 'j', joule: 'j', j: 'j', watts: 'w', watt: 'w', w: 'w',
  volts: 'v', volt: 'v', v: 'v', amps: 'a', amperes: 'a', ampere: 'a', amp: 'a', a: 'a', ohms: 'ohm', ohm: 'ohm',
  kes: 'kes', ksh: 'kes', shillings: 'kes', shilling: 'kes', sh: 'kes', usd: 'usd',
  cm2: 'cm2', cm3: 'cm3', m2: 'm2', m3: 'm3', km2: 'km2', percent: '%', '%': '%'
};

function canonicalUnit(u) {
  if (!u) return '';
  const k = normalizeText(u).replace(/[\s.]/g, '').replace('²', '2').replace('³', '3').replace(/\^/g, '').replace('squared', '2').replace('cubed', '3');
  const sq = k.replace(/^sq/, '');
  return UNIT_ALIASES[k] || (k.startsWith('sq') && UNIT_ALIASES[sq] ? UNIT_ALIASES[sq] + '2' : k);
}

/**
 * Parse a number out of free text. Returns { value, unit, ok }.
 * Accepts: 12, -3.5, 1,500, 1 500, 7/2, 3 1/2, ½, 35%, KES 1500, 4cm, x = 4, 4 cm2
 */
function parseNumber(input) {
  let s = String(input === undefined || input === null ? '' : input);
  for (const [k, v] of Object.entries(VULGAR)) s = s.split(k).join(' ' + v);
  for (const [k, v] of Object.entries(SUPERSCRIPTS)) s = s.split(k).join(v);
  s = s.normalize('NFKD').replace(/[−–—]/g, '-').trim().toLowerCase();
  s = s.replace(/^[a-z]\s*=\s*/, '').replace(/^answer\s*[:=]?\s*/, '');
  // currency prefix
  let unit = '';
  const cur = /^(kes|ksh|ksh\.|usd|\$|sh\.?)\s*/.exec(s);
  if (cur) { unit = canonicalUnit(cur[1].replace('$', 'usd')); s = s.slice(cur[0].length); }
  s = s.replace(/(\d)[,\s](?=\d{3}(\D|$))/g, '$1');      // thousands separators
  const mixed = /^(-?\d+)\s+(\d+)\s*\/\s*(\d+)(?=\D|$)\s*(.*)$/.exec(s);
  const frac = /^(-?\d+)\s*\/\s*(\d+)(?=\D|$)\s*(.*)$/.exec(s);
  const dec = /^(-?\+?\d*\.?\d+(?:e-?\d+)?)\s*(.*)$/.exec(s);
  let value = null; let rest = '';
  if (mixed) {
    const w = Number(mixed[1]); const n = Number(mixed[2]); const d = Number(mixed[3]);
    if (!d) return { ok: false };
    value = (w < 0 ? -1 : 1) * (Math.abs(w) + n / d); rest = mixed[4];
  } else if (frac) {
    const d = Number(frac[2]); if (!d) return { ok: false };
    value = Number(frac[1]) / d; rest = frac[3];
  } else if (dec) {
    value = Number(dec[1]); rest = dec[2];
  }
  if (value === null || Number.isNaN(value)) return { ok: false };
  rest = rest.replace(/^[\s.]+/, '').replace(/[.\s]+$/, '').trim();
  if (rest) unit = canonicalUnit(rest) || unit;
  return { ok: true, value, unit };
}

function markNumeric(q, resp) {
  const raw = String(resp.answer || '').trim();
  const out = { awarded: 0, status: 'blank', note: '' };
  if (!raw) return out;
  const given = parseNumber(raw);
  const accepted = [q.answer, ...(q.alternatives || [])];
  const tol = q.tolerance !== undefined ? q.tolerance : 1e-9;
  const acceptedUnits = (q.unit ? [].concat(q.unit) : []).map(canonicalUnit);
  let correct = false;
  if (given.ok) {
    correct = accepted.some(a => {
      const av = typeof a === 'number' ? a : parseNumber(a).value;
      return av !== null && av !== undefined && Math.abs(given.value - av) <= (q.relativeTolerance ? Math.abs(av) * q.relativeTolerance : tol);
    });
  }
  if (correct) {
    out.awarded = q.marks;
    out.status = 'correct';
    if (acceptedUnits.length && given.unit && !acceptedUnits.includes(given.unit)) {
      out.awarded = 0; out.status = 'incorrect'; out.note = 'The number is right but the unit is not. Check the unit.';
    } else if (q.unitRequired && acceptedUnits.length && !given.unit) {
      out.awarded = Math.max(0, q.marks - 1);
      out.status = out.awarded === q.marks ? 'correct' : 'partial';
      out.note = 'Remember to give the unit with your answer.';
    }
    return out;
  }
  // method marks: only from typed working, never more than (marks - 1)
  if (q.marks > 1 && Array.isArray(q.method) && q.method.length) {
    const text = normalizeText((resp.working || '') + ' ' + raw);
    let m = 0;
    for (const step of q.method) {
      const hit = [].concat(step.any || []).some(t => text.includes(normalizeText(String(t))));
      if (hit) m += step.marks || 1;
    }
    out.awarded = Math.min(m, q.marks - 1);
    if (out.awarded > 0) { out.status = 'partial'; out.note = 'Method marks for your working; the final answer is not correct.'; return out; }
  }
  out.status = 'incorrect';
  return out;
}

function markShort(q, resp) {
  const raw = String(resp.answer || '').trim();
  const out = { awarded: 0, status: 'blank', note: '', matched: [] };
  if (!raw) return out;
  const text = normalizeText(raw.slice(0, 700));
  // exact accepted answers (for single-word / short-phrase questions)
  const squash = (v) => normalizeText(v).replace(/\s+/g, '');
  if (Array.isArray(q.accept) && q.accept.some(a => squash(a) === squash(raw))) {
    out.awarded = q.marks; out.status = 'correct'; return out;
  }
  if (Array.isArray(q.forbid) && q.forbid.some(f => containsPhrase(text, f))) {
    out.status = 'incorrect'; out.note = 'Part of your answer contradicts the idea needed.'; return out;
  }
  let got = 0;
  (q.points || []).forEach((pt, i) => {
    const alts = [].concat(pt.any || []);
    const allOf = [].concat(pt.all || []);
    const hit = (alts.length ? alts.some(a => containsPhrase(text, a)) : true) && (allOf.length ? allOf.every(a => containsPhrase(text, a)) : true) && (alts.length || allOf.length);
    if (hit) { got += pt.marks || 1; out.matched.push(i); }
  });
  out.awarded = Math.min(got, q.marks);
  out.status = out.awarded === q.marks ? 'correct' : (out.awarded > 0 ? 'partial' : 'incorrect');
  return out;
}

function markMcq(q, resp) {
  const a = String(resp.answer || '').trim().toUpperCase().replace(/[^A-D]/g, '').slice(0, 1);
  if (!a) return { awarded: 0, status: 'blank', note: '' };
  return a === String(q.answer).toUpperCase()
    ? { awarded: q.marks, status: 'correct', note: '' }
    : { awarded: 0, status: 'incorrect', note: '' };
}

/** Mark one question. resp = { answer, working } */
function markQuestion(q, resp = {}) {
  let r;
  if (q.type === 'mcq') r = markMcq(q, resp);
  else if (q.type === 'numeric') r = markNumeric(q, resp);
  else r = markShort(q, resp);
  r.awarded = Math.max(0, Math.min(q.marks, r.awarded));
  return r;
}

// Indicative bands. Real boards set grade boundaries per exam series, so these are labelled "indicative" everywhere.
const BANDS = {
  IGCSE: [[85, 'A*'], [75, 'A'], [65, 'B'], [55, 'C'], [45, 'D'], [35, 'E'], [25, 'F'], [15, 'G'], [0, 'U']],
  CBC: [[75, 'EE — Exceeding Expectations'], [50, 'ME — Meeting Expectations'], [25, 'AE — Approaching Expectations'], [0, 'BE — Below Expectations']],
  CHECKPOINT: [[80, 'Excellent'], [60, 'Secure'], [40, 'Developing'], [0, 'Beginning']]
};

function bandFor(scale, percentage) {
  const table = BANDS[scale] || BANDS.CBC;
  return (table.find(([min]) => percentage >= min) || table[table.length - 1])[1];
}

/**
 * Mark a whole paper. `answers` = { [questionId]: { answer, working } }.
 * Returns the full result including the mark scheme (only ever send this AFTER the attempt is submitted).
 */
function markPaper(paper, answers = {}) {
  const questions = paper.questions.map(q => {
    const resp = answers[q.id] || {};
    const r = markQuestion(q, resp);
    return {
      id: q.id, number: q.number, section: q.section || null, topic: q.topic, type: q.type, marks: q.marks, stem: q.stem,
      awarded: r.awarded, status: r.status, note: r.note || '',
      studentAnswer: String(resp.answer || '').slice(0, 700),
      correctAnswer: q.type === 'mcq'
        ? `${q.answer}. ${(q.options || [])['ABCD'.indexOf(q.answer)] || ''}`.trim()
        : (q.displayAnswer || (q.type === 'numeric' ? String(q.answer) + (q.unit ? ' ' + [].concat(q.unit)[0] : '') : q.modelAnswer)),
      explanation: q.explanation || q.modelAnswer || ''
    };
  });
  const total = paper.questions.reduce((s, q) => s + q.marks, 0);
  const score = questions.reduce((s, q) => s + q.awarded, 0);
  const percentage = total ? Math.round((score / total) * 1000) / 10 : 0;

  const topics = {};
  for (const q of questions) {
    const t = topics[q.topic] || (topics[q.topic] = { topic: q.topic, awarded: 0, available: 0 });
    t.awarded += q.awarded; t.available += q.marks;
  }
  const topicBreakdown = Object.values(topics)
    .map(t => ({ ...t, percentage: t.available ? Math.round((t.awarded / t.available) * 100) : 0 }))
    .sort((a, b) => a.percentage - b.percentage);

  return {
    score, total, percentage,
    band: bandFor(paper.scale, percentage),
    bandIsIndicative: true,
    questions,
    topicBreakdown,
    reviseNext: topicBreakdown.filter(t => t.percentage < 60).slice(0, 4).map(t => t.topic),
    answered: questions.filter(q => q.status !== 'blank').length,
    correctCount: questions.filter(q => q.status === 'correct').length
  };
}

module.exports = { normalizeText, containsPhrase, parseNumber, markQuestion, markPaper, bandFor, BANDS };
