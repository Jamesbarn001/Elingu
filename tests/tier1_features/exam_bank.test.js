// Practice papers come from the database; built-in files only seed it; edits are never overwritten; bad papers are not served.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const bank = require('../../examBank');
const files = require('../../exam_papers');
const db = require('../../db');

const root = path.join(__dirname, '..', '..');
function scratchEnv() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'elingu-exambank-'));
  return { dir, env: Object.assign({}, process.env, { NODE_ENV: 'test', USE_SQLITE: 'true', ELINGU_DATA_DIR: dir, DATABASE_URL: '' }) };
}
function runNode(code, env) {
  return spawnSync(process.execPath, ['-e', code], { cwd: root, env, encoding: 'utf8', timeout: 60000 });
}
const cleanPaper = (id, extra) => {
  const base = JSON.parse(JSON.stringify(files.papers[0]));
  return Object.assign(base, { id, title: 'Temporary test paper ' + id }, extra || {}, {
    questions: base.questions.map((q, i) => Object.assign({}, q, { id: id + '_q' + i }))
  });
};
async function remove(id) {
  await db.query('DELETE FROM exam_paper_questions WHERE paper_id = $1', [id]);
  await db.query('DELETE FROM exam_papers WHERE id = $1', [id]);
}

module.exports = {
  'TC-BANK-01: Every built-in paper is in the database and comes back exactly as written': async (ctx) => {
    const r = await bank.load();
    ctx.assertEqual(r.source, 'database');
    let same = 0;
    for (const p of files.papers) {
      const d = bank.byId(p.id);
      ctx.assert(d, 'in the database: ' + p.id);
      if (JSON.stringify(d) === JSON.stringify(p)) same++;
    }
    ctx.assertEqual(same, files.papers.length, 'database copies identical to the files');
    ctx.assert(bank.papers().length >= files.papers.length);
  },

  'TC-BANK-02: The running app lists the papers from the database, with no questions or answers': async (ctx) => {
    const res = await ctx.api('/api/exams/papers?curriculum=CBC&grade=8');
    ctx.assertEqual(res.status, 200);
    ctx.assert(res.data.papers.length >= 5, 'papers listed');
    const text = JSON.stringify(res.data);
    ctx.assert(!/"answer"|"sample"|"points"|"explanation"|"questions"/.test(text), 'the list carries no questions, answers or mark scheme');
  },

  'TC-BANK-03: A hidden (draft) paper is not served, a published one is': async (ctx) => {
    const id = 'tmp_draft_' + Date.now();
    await bank.savePaper(cleanPaper(id), { source: 'imported', status: 'draft' });
    await bank.load();
    ctx.assertEqual(bank.byId(id), undefined, 'draft hidden');
    await bank.setStatus(id, 'published');
    await bank.load();
    ctx.assert(bank.byId(id), 'published shows up');
    await remove(id);
    await bank.load();
    ctx.assertEqual(bank.byId(id), undefined, 'gone after removal');
  },

  'TC-BANK-04: A paper that fails the self-check is never served': async (ctx) => {
    const id = 'tmp_bad_' + Date.now();
    const bad = cleanPaper(id);
    bad.totalMarks = bad.totalMarks + 5;                       // marks no longer add up
    await bank.savePaper(bad, { source: 'imported', status: 'published' });
    const r = await bank.load();
    ctx.assertEqual(bank.byId(id), undefined, 'not served');
    ctx.assert(r.skipped.some(s => s.id === id), 'reported as skipped');
    await remove(id);
    await bank.load();
  },

  'TC-BANK-05: An owner\'s edit is never overwritten by the built-in copy, and a changed file refreshes an untouched copy': async (ctx) => {
    const { env } = scratchEnv();
    const code = `
      const bank = require('./examBank'); const db = require('./db'); const files = require('./exam_papers');
      (async () => {
        await db.initSchema();
        const first = await bank.seed();
        const id = files.papers[0].id;
        // an owner edits the title in the database
        await db.query("UPDATE exam_papers SET source = 'edited', title = 'Edited by the owner' WHERE id = $1", [id]);
        const second = await bank.seed();
        const row = (await db.query('SELECT title, source FROM exam_papers WHERE id = $1', [id])).rows[0];
        // another paper is untouched but its content hash is out of date (as if the file changed)
        const other = files.papers[1].id;
        await db.query("UPDATE exam_papers SET content_hash = 'old' WHERE id = $1", [other]);
        const third = await bank.seed();
        console.log(JSON.stringify({ first, second, title: row.title, source: row.source, third }));
        process.exit(0);
      })();`;
    const out = runNode(code, env);
    const line = out.stdout.trim().split('\n').pop();
    const r = JSON.parse(line);
    ctx.assertEqual(r.first.added, files.papers.length);
    ctx.assertEqual(r.second.added + r.second.refreshed, 0, 'second start changes nothing');
    ctx.assertEqual(r.title, 'Edited by the owner', 'the owner edit survived');
    ctx.assertEqual(r.third.refreshed, 1, 'an untouched copy follows its file');
  },

  'TC-BANK-06: The import tool refuses a broken paper and accepts a good one': async (ctx) => {
    const { dir, env } = scratchEnv();
    const bad = cleanPaper('tmp_cli_bad'); bad.totalMarks += 1;
    const good = cleanPaper('tmp_cli_good');
    fs.writeFileSync(path.join(dir, 'bad.json'), JSON.stringify(bad));
    fs.writeFileSync(path.join(dir, 'good.json'), JSON.stringify(good));
    const a = spawnSync(process.execPath, ['scripts/exam_papers.js', 'import', path.join(dir, 'bad.json')], { cwd: root, env, encoding: 'utf8', timeout: 60000 });
    ctx.assertEqual(a.status, 2, 'broken paper refused');
    ctx.assert(/did not pass the self-check/.test(a.stderr), 'says why');
    const b = spawnSync(process.execPath, ['scripts/exam_papers.js', 'import', path.join(dir, 'good.json'), '--draft'], { cwd: root, env, encoding: 'utf8', timeout: 60000 });
    ctx.assertEqual(b.status, 0, 'good paper accepted: ' + b.stderr);
    const l = spawnSync(process.execPath, ['scripts/exam_papers.js', 'list'], { cwd: root, env, encoding: 'utf8', timeout: 60000 });
    ctx.assert(/draft\s+imported[\s\S]*tmp_cli_good/.test(l.stdout), 'listed as a hidden imported draft');
  },

  'TC-BANK-07: The admin routes for practice papers need an admin sign-in': async (ctx) => {
    ctx.assertEqual((await ctx.api('/api/admin/exam-papers', { noAuth: true })).status, 401);
    ctx.assertEqual((await ctx.api('/api/admin/exam-papers/reload', { method: 'POST', noAuth: true })).status, 401);
    const src = fs.readFileSync(path.join(root, 'server.js'), 'utf8');
    ctx.assert(/require\('\.\/examBank'\)\.load\(\)/.test(src), 'the app reads the papers from the database when it starts');
  }
};
