// examBank.js — where the app gets its practice papers from.
//
// The papers live in the database (tables exam_papers and exam_paper_questions), so they can be added, fixed or hidden
// without changing code. The files in exam_papers/ are the starting content: on start-up any paper that is missing from the
// database is copied in, and a copy that was never edited by an owner is refreshed when its file changes.
//
// The rest of the app asks this module (papers(), byId()) and gets answers straight away from memory; the database is
// read when the app starts and when load() is called again (the admin "reload" button, or the CLI then a restart).
// If the database cannot be read, the built-in papers are used so learners are never left without papers.

const crypto = require('crypto');
const db = require('./db');
const files = require('./exam_papers');
const { validatePaper } = require('./exam_papers/validate');

let cache = { papers: files.papers.slice(), byId: new Map(files.byId), source: 'files', loadedAt: null };

const hashOf = (paper) => crypto.createHash('sha256').update(JSON.stringify(paper)).digest('hex');
const now = () => new Date().toISOString();

function splitPaper(paper) {
  const { questions, ...meta } = paper;
  return { meta, questions: questions || [] };
}

function paperFromRows(row, questionRows) {
  const meta = db.fromJson(row.meta, {});
  return Object.assign({}, meta, { id: row.id, questions: questionRows.map(q => db.fromJson(q.data)) });
}

/** Write one paper (and all its questions) to the database, replacing any earlier copy of it. */
async function savePaper(paper, { source = 'seed', status = 'published' } = {}) {
  const { meta, questions } = splitPaper(paper);
  const range = paper.gradeRange || [paper.grade, paper.grade];
  const stamp = now();
  await db.query(
    `INSERT INTO exam_papers (id, curriculum, grade_min, grade_max, subject, title, series, status, source, content_hash, meta, created_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $12)
     ON CONFLICT (id) DO UPDATE SET curriculum = EXCLUDED.curriculum, grade_min = EXCLUDED.grade_min, grade_max = EXCLUDED.grade_max,
       subject = EXCLUDED.subject, title = EXCLUDED.title, series = EXCLUDED.series, status = EXCLUDED.status, source = EXCLUDED.source,
       content_hash = EXCLUDED.content_hash, meta = EXCLUDED.meta, updated_at = EXCLUDED.updated_at`,
    [paper.id, paper.curriculum, range[0], range[1], paper.subject, paper.title, paper.series || null, status, source, hashOf(paper), db.toJson(meta), stamp]
  );
  await db.query('DELETE FROM exam_paper_questions WHERE paper_id = $1', [paper.id]);
  // one statement per paper keeps start-up fast even on a remote database
  const CHUNK = 20;
  for (let i = 0; i < questions.length; i += CHUNK) {
    const part = questions.slice(i, i + CHUNK);
    const params = [];
    const rows = part.map((q, j) => {
      const b = params.length;
      params.push(q.id, paper.id, i + j, q.section || null, q.topic || null, q.type, q.marks, db.toJson(q));
      return `($${b + 1}, $${b + 2}, $${b + 3}, $${b + 4}, $${b + 5}, $${b + 6}, $${b + 7}, $${b + 8})`;
    });
    await db.query(`INSERT INTO exam_paper_questions (id, paper_id, position, section, topic, qtype, marks, data) VALUES ${rows.join(', ')}`, params);
  }
}

/** Copy built-in papers that the database does not have yet. Never overwrites a paper an owner edited or imported. */
async function seed({ force = false } = {}) {
  const out = { added: 0, refreshed: 0, kept: 0 };
  for (const paper of files.papers) {
    const r = await db.query('SELECT source, content_hash FROM exam_papers WHERE id = $1', [paper.id]);
    const row = r.rows[0];
    if (!row) { await savePaper(paper, { source: 'seed' }); out.added++; }
    else if (force || (row.source === 'seed' && row.content_hash !== hashOf(paper))) { await savePaper(paper, { source: 'seed' }); out.refreshed++; }
    else out.kept++;
  }
  return out;
}

/** Read every published paper from the database into memory. Papers that fail the self-check are not served. */
async function load() {
  try {
    await db.initSchema();
    const seeded = await seed();
    const prs = await db.query(`SELECT * FROM exam_papers WHERE status = 'published' ORDER BY id`);
    const qrs = await db.query('SELECT paper_id, position, data FROM exam_paper_questions ORDER BY paper_id, position');
    const byPaper = new Map();
    qrs.rows.forEach(q => { if (!byPaper.has(q.paper_id)) byPaper.set(q.paper_id, []); byPaper.get(q.paper_id).push(q); });
    const papers = [];
    const skipped = [];
    for (const row of prs.rows) {
      const paper = paperFromRows(row, byPaper.get(row.id) || []);
      const problems = validatePaper(paper);
      if (problems.length) { skipped.push({ id: row.id, problems: problems.slice(0, 3) }); continue; }
      papers.push(paper);
    }
    skipped.forEach(s => console.error(`[examBank] NOT serving ${s.id}: ${s.problems.join(' | ')}`));
    if (!papers.length) throw new Error('the database has no usable papers');
    cache = { papers, byId: new Map(papers.map(p => [p.id, p])), source: 'database', loadedAt: now() };
    console.log(`📝 [examBank] ${papers.length} practice papers loaded from the database (${seeded.added} added, ${seeded.refreshed} refreshed${skipped.length ? ', ' + skipped.length + ' skipped' : ''}).`);
    return { papers: papers.length, source: 'database', seeded, skipped };
  } catch (err) {
    console.error('[examBank] could not use the database, serving the built-in papers:', err.message);
    cache = { papers: files.papers.slice(), byId: new Map(files.byId), source: 'files', loadedAt: now() };
    return { papers: cache.papers.length, source: 'files', error: err.message };
  }
}

async function setStatus(id, status) {
  const r = await db.query('UPDATE exam_papers SET status = $1, updated_at = $2 WHERE id = $3', [status, now(), id]);
  return r.rowCount > 0;
}

async function list() {
  const r = await db.query(`SELECT p.id, p.curriculum, p.subject, p.title, p.status, p.source, p.grade_min, p.grade_max,
      (SELECT COUNT(*) FROM exam_paper_questions q WHERE q.paper_id = p.id) AS questions FROM exam_papers p ORDER BY p.curriculum, p.subject, p.id`);
  return r.rows;
}

async function getPaperFromDb(id) {
  const pr = await db.query('SELECT * FROM exam_papers WHERE id = $1', [id]);
  if (!pr.rows[0]) return null;
  const qr = await db.query('SELECT data FROM exam_paper_questions WHERE paper_id = $1 ORDER BY position', [id]);
  return paperFromRows(pr.rows[0], qr.rows);
}

module.exports = {
  papers: () => cache.papers,
  byId: (id) => cache.byId.get(id),
  status: () => ({ source: cache.source, loadedAt: cache.loadedAt, papers: cache.papers.length }),
  load, seed, savePaper, setStatus, list, getPaperFromDb, validatePaper
};
