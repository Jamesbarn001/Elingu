// A database seeded earlier with a smaller curriculum is brought up to date at start-up, without losing anything.
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const root = path.join(__dirname, '..', '..');

function run(code) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'elingu-cur-'));
  const env = Object.assign({}, process.env, { NODE_ENV: 'test', USE_SQLITE: 'true', ELINGU_DATA_DIR: dir, DATABASE_URL: '' });
  const out = spawnSync(process.execPath, ['-e', code], { cwd: root, env, encoding: 'utf8', timeout: 120000 });
  const line = out.stdout.trim().split('\n').filter(l => l.startsWith('{')).pop();
  if (!line) throw new Error('no result: ' + out.stderr.slice(-400));
  return JSON.parse(line);
}

module.exports = {
  'TC-CUR-01: An out-of-date curriculum is refreshed once, keeps what was there, and a second start does nothing': async (ctx) => {
    const r = run(`
      const db = require('./db'); const repo = require('./db/repositories/curriculumRepository');
      const count = async (t) => Number((await db.query('SELECT COUNT(*) AS c FROM ' + t)).rows[0].c);
      (async () => {
        await db.initSchema();
        const first = await repo.ensureSeedCurrent();
        const full = { subjects: await count('curriculum_subjects'), strands: await count('learning_strands'), stops: await count('sub_strands') };
        // pretend this database was seeded long ago with a smaller curriculum: remove most topics and forget the fingerprint
        await db.query("DELETE FROM sub_strands WHERE id NOT IN (SELECT id FROM sub_strands ORDER BY id LIMIT 10)");
        await db.query("DELETE FROM learning_strands WHERE id NOT IN (SELECT strand_id FROM sub_strands)");
        await db.query("DELETE FROM curriculum_seed_state");
        const small = { strands: await count('learning_strands'), stops: await count('sub_strands') };
        // a note written by a learner-facing feature on an existing topic must survive: mark one existing row
        const keep = (await db.query('SELECT id FROM sub_strands ORDER BY id LIMIT 1')).rows[0].id;
        const second = await repo.ensureSeedCurrent();
        const restored = { subjects: await count('curriculum_subjects'), strands: await count('learning_strands'), stops: await count('sub_strands') };
        const stillThere = (await db.query('SELECT id FROM sub_strands WHERE id = $1', [keep])).rows.length;
        const third = await repo.ensureSeedCurrent();
        console.log(JSON.stringify({ firstSeeded: first.seeded, full, small, secondSeeded: second.seeded, restored, stillThere, thirdSeeded: third.seeded }));
        process.exit(0);
      })();`);
    ctx.assertEqual(r.firstSeeded, true, 'a new database is seeded');
    ctx.assert(r.small.stops === 10 && r.small.stops < r.full.stops, 'the test really made the database small');
    ctx.assertEqual(r.secondSeeded, true, 'an out-of-date database is refreshed');
    ctx.assertEqual(r.restored.stops, r.full.stops, 'every topic is back');
    ctx.assertEqual(r.restored.strands, r.full.strands);
    ctx.assertEqual(r.stillThere, 1, 'existing rows are kept');
    ctx.assertEqual(r.thirdSeeded, false, 'the next start does not repeat the work');
  },

  'TC-CUR-02: The app refreshes the curriculum when it starts and survives a failure': async (ctx) => {
    const src = fs.readFileSync(path.join(root, 'server.js'), 'utf8');
    ctx.assert(/ensureSeedCurrent\(\)/.test(src), 'start-up calls the refresh');
    ctx.assert(/could not refresh the curriculum \(the app keeps running/.test(src), 'a failure does not stop the app');
    const repo = fs.readFileSync(path.join(root, 'db', 'repositories', 'curriculumRepository.js'), 'utf8');
    ctx.assert(!/DELETE FROM/.test(repo), 'the refresh never deletes curriculum rows');
  },

  'TC-CUR-04: My Subjects is a dropdown under Brain Deck that opens, closes, remembers, and works with the keyboard': async (ctx) => {
    const html = fs.readFileSync(path.join(root, 'public', 'index.html'), 'utf8');
    const play = fs.readFileSync(path.join(root, 'public', 'play.js'), 'utf8');
    ctx.assert(/id="deckChevron"[^>]*aria-expanded/.test(html), 'a chevron button next to Brain Deck');
    ctx.assert(/subjects-collapsed \.nav-item\[data-subject\][\s\S]{0,400}position: absolute !important/.test(html), 'closing takes the rows out of the layout (inline display rules cannot override it)');
    ctx.assert(/id="sidebarSubjectsTitle" role="button" tabindex="0"/.test(html), 'the My Subjects title is a keyboard-reachable button');
    ctx.assert(/ElinguSidebar\.openSubjects\(\)/.test(html), 'choosing Brain Deck opens the list');
    ctx.assert(/elingu_subjects_open/.test(play) && /setAttribute\('aria-expanded'/.test(play), 'remembers the choice and tells screen readers');
    ctx.assert(/'My Subjects': 'Masomo Yangu'/.test(fs.readFileSync(path.join(root, 'public', 'i18n.js'), 'utf8')), 'translated');
  },

  'TC-CUR-03: The map for Grade 10 Chemistry has all the built-in topics': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=10&subject=Chemistry');
    ctx.assertEqual(res.status, 200);
    const stops = res.data.map.stations.reduce((n, s) => n + s.subtopics.length, 0);
    ctx.assert(res.data.map.stations.length >= 3 && stops >= 8, 'stations ' + res.data.map.stations.length + ', topics ' + stops);
  }
};
