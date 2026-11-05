// ============================================================
// Tier 1 — Gamification (Phase 5): server-side XP ledger, Brain Spark, streak freeze, league, navigation
// ============================================================

const fs = require('fs');
const path = require('path');
const gam = require('../../gamification');
const studentStore = require('../../studentStore');
const secureJson = require('../../secureJson');
const { DATA_DIR } = require('../../dataDir');
const { byId } = require('../../exam_papers');

const ROOT = path.resolve(__dirname, '..', '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const auth = (stu) => ({ Authorization: 'Bearer ' + stu.token });
const me = async (ctx, stu) => (await ctx.api('/api/gamification/me', { headers: auth(stu) })).data;

module.exports = {
  'TC-GAM-01: Only the server awards points: no browser endpoint, no points for logging in, editing a profile or starting a quest': async (ctx) => {
    const html = read('public/index.html');
    ctx.assert(!html.includes('/api/students/award-points'), 'the browser must not call a points endpoint');
    ctx.assert(!/points:\s*(10|15|50|5)\s*,/.test(html), 'no hard-coded client point rewards remain');
    ctx.assert(!/\.points\s*=\s*\(activeStudent\.points/.test(html), 'the browser never adds to the points total');
    const src = read('studentStore.js');
    ctx.assert(!/Award 5 points per turn/.test(src), 'chatting no longer pays a flat 5 points per message');
    const stu = await ctx.createVerifiedStudent('Pointless');
    const before = studentStore.getStudentById(stu.id, true).points;
    studentStore.recordDailyTurn(stu.id);
    studentStore.recordDailyTurn(stu.id);
    ctx.assertEqual(studentStore.getStudentById(stu.id, true).points, before, 'sending messages alone earns no points');
  },

  'TC-GAM-02: Effort is rewarded a little, once, and is capped each day': async (ctx) => {
    const stu = await ctx.createVerifiedStudent('Trier');
    const student = studentStore.getStudentById(stu.id, true);
    const first = gam.onChatTurn(student);
    ctx.assertEqual(first.awarded, 3, 'the first lesson of the day earns 3 XP');
    ctx.assertEqual(gam.onChatTurn(student).awarded, 0, 'the same day pays only once');
    let total = 3;
    for (let i = 0; i < 12; i++) total += gam.award(student, { type: 'spark_try', refId: 'cap:' + i, xp: 2, kind: 'effort' }).awarded;
    ctx.assertEqual(total, gam.EFFORT_CAP_PER_DAY, 'effort XP stops at the daily cap');
    const s = await me(ctx, stu);
    ctx.assertEqual(s.xp, gam.EFFORT_CAP_PER_DAY);
    ctx.assertEqual(s.effortToday.used, gam.EFFORT_CAP_PER_DAY);
  },

  'TC-GAM-03: A marked exam earns XP for marks (once), with a level-up and badges returned for celebration': async (ctx) => {
    const paper = byId.get('elingu_cbc_g8_science_set1');
    const stu = await ctx.createVerifiedStudent('Sitter2', { grade: 8 });
    const start = await ctx.api('/api/exams/attempts', { method: 'POST', headers: auth(stu), body: { paperId: paper.id } });
    const answers = {};
    paper.questions.forEach(q => { answers[q.id] = { answer: q.sample }; });
    const done = await ctx.api(`/api/exams/attempts/${start.data.attemptId}/submit`, { method: 'POST', headers: auth(stu), body: { answers } });
    ctx.assertEqual(done.status, 200);
    const c = done.data.celebrate;
    ctx.assert(c && c.awarded >= 50, 'full marks earn the marks XP plus the strong-paper bonus plus effort');
    ctx.assert(c.levelUp && c.levelUp.to >= 2, 'crossing 50 XP is a level up');
    const ids = c.newBadges.map(b => b.id);
    ctx.assert(ids.includes('exam_1') && ids.includes('exam_70') && ids.includes('exam_90'), 'exam badges are earned');
    const s = await me(ctx, stu);
    ctx.assertEqual(s.xp, c.awarded, 'summary matches what was awarded');
    const again = await ctx.api(`/api/exams/attempts/${start.data.attemptId}/submit`, { method: 'POST', headers: auth(stu), body: {} });
    ctx.assertEqual((await me(ctx, stu)).xp, s.xp, 'handing in again never pays twice');
  },

  'TC-GAM-04: Mastery pays once per concept and unlocks a badge': async (ctx) => {
    const stu = await ctx.createVerifiedStudent('Master');
    const student = studentStore.getStudentById(stu.id, true);
    ctx.assertEqual(gam.onMastery(student, 'cbc_g8_math_s1_1').awarded, 25);
    ctx.assertEqual(gam.onMastery(student, 'cbc_g8_math_s1_1').awarded, 0, 'same concept, no second payment');
    const s = await me(ctx, stu);
    ctx.assert(s.mastered.includes('cbc_g8_math_s1_1'), 'the roadmap can show it as mastered');
    ctx.assert(s.badges.find(b => b.id === 'mastery_1').earned);
    // mastery XP needs a signed-in learner, the tutor's explicit MASTERED verdict, and a real explanation (not phrase-guessing)
    const server = read('server.js');
    ctx.assert(/explicitMastery/.test(server) && /cleanInput\.length >= 25/.test(server) && /verifyStudentRequestAuth\(req, null\)/.test(server.slice(server.indexOf('explicitMastery') - 600, server.indexOf('explicitMastery') + 200)), 'mastery XP is guarded');
  },

  'TC-GAM-05: Brain Spark gives 3 fixed questions, never reveals answers early, marks on the server, and each answer counts once': async (ctx) => {
    const stu = await ctx.createVerifiedStudent('Sparky', { grade: 8 });
    const d = (await ctx.api('/api/gamification/spark', { headers: auth(stu) })).data;
    ctx.assertEqual(d.total, 3);
    ctx.assert(!JSON.stringify(d.questions).includes('explanation') && d.questions.every(q => q.options.length === 4 && !('answer' in q)), 'no answers in the questions');
    const d2 = (await ctx.api('/api/gamification/spark', { headers: auth(stu) })).data;
    ctx.assertDeepEqual(d2.questions.map(q => q.id), d.questions.map(q => q.id), 'the same three all day');

    const correctLetter = (q) => { for (const p of require('../../exam_papers').papers) { const x = p.questions.find(k => k.id === q.id); if (x) return x.answer; } };
    const q0 = d.questions[0];
    const r0 = (await ctx.api('/api/gamification/spark/answer', { method: 'POST', headers: auth(stu), body: { index: 0, choice: correctLetter(q0) } })).data;
    ctx.assertEqual(r0.correct, true);
    ctx.assertEqual(r0.celebrate.awarded, 5, 'a correct answer is worth 5 XP');
    const dup = await ctx.api('/api/gamification/spark/answer', { method: 'POST', headers: auth(stu), body: { index: 0, choice: 'A' } });
    ctx.assertEqual(dup.status, 400, 'no second try at the same question');

    const q1 = d.questions[1];
    const wrong = 'ABCD'.split('').find(l => l !== correctLetter(q1));
    const r1 = (await ctx.api('/api/gamification/spark/answer', { method: 'POST', headers: auth(stu), body: { index: 1, choice: wrong } })).data;
    ctx.assertEqual(r1.correct, false);
    ctx.assertEqual(r1.celebrate.awarded, 2, 'a wrong answer still earns a little effort XP');
    ctx.assertEqual((await ctx.api('/api/gamification/spark/answer', { method: 'POST', headers: auth(stu), body: { index: 9, choice: 'A' } })).status, 400);
    ctx.assertEqual((await ctx.api('/api/gamification/spark', { noAuth: true })).status, 401, 'needs a signed-in learner');
  },

  'TC-GAM-06: A perfect Brain Spark earns the bonus and a badge': async (ctx) => {
    const stu = await ctx.createVerifiedStudent('Perfect', { grade: 8 });
    const d = (await ctx.api('/api/gamification/spark', { headers: auth(stu) })).data;
    const papers = require('../../exam_papers').papers;
    let last;
    for (const q of d.questions) {
      let ans; for (const p of papers) { const x = p.questions.find(k => k.id === q.id); if (x) ans = x.answer; }
      last = (await ctx.api('/api/gamification/spark/answer', { method: 'POST', headers: auth(stu), body: { index: q.index, choice: ans } })).data;
    }
    ctx.assertEqual(last.celebrate.awarded, 10, 'the last correct answer pays 5 + the 5 XP perfect bonus');
    ctx.assert(last.celebrate.newBadges.some(b => b.id === 'spark_3'));
    ctx.assertEqual((await me(ctx, stu)).xp, 20, '3 × 5 + 5 bonus');
  },

  'TC-GAM-07: A streak freeze forgives exactly one missed day and is earned every 7 days': async (ctx) => {
    const file = path.join(DATA_DIR, 'students.json');
    const set = (id, patch) => { const doc = secureJson.readJson(file, { students: [] }); Object.assign(doc.students.find(s => s.id === id), patch); secureJson.writeJson(file, doc); };
    const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);

    const a = await ctx.createVerifiedStudent('Freezer');
    set(a.id, { streak: 5, freezes: 1, dailyTurnDate: daysAgo(2) });
    studentStore.recordDailyTurn(a.id);
    let st = studentStore.getStudentById(a.id, true);
    ctx.assertEqual(st.streak, 6, 'one missed day is forgiven');
    ctx.assertEqual(st.freezes, 0, 'and the freeze is used up');

    const b = await ctx.createVerifiedStudent('NoFreeze');
    set(b.id, { streak: 5, freezes: 0, dailyTurnDate: daysAgo(2) });
    studentStore.recordDailyTurn(b.id);
    ctx.assertEqual(studentStore.getStudentById(b.id, true).streak, 1, 'without a freeze a missed day resets the streak');

    const c = await ctx.createVerifiedStudent('ThreeDays');
    set(c.id, { streak: 5, freezes: 1, dailyTurnDate: daysAgo(3) });
    studentStore.recordDailyTurn(c.id);
    ctx.assertEqual(studentStore.getStudentById(c.id, true).streak, 1, 'a freeze covers one day only');

    const d = await ctx.createVerifiedStudent('Seven');
    set(d.id, { streak: 6, freezes: 0, dailyTurnDate: daysAgo(1) });
    studentStore.recordDailyTurn(d.id);
    st = studentStore.getStudentById(d.id, true);
    ctx.assertEqual(st.streak, 7);
    ctx.assertEqual(st.freezes, 1, 'a 7-day streak earns a freeze');
    const e = await ctx.createVerifiedStudent('Capped');
    set(e.id, { streak: 13, freezes: 2, dailyTurnDate: daysAgo(1) });
    studentStore.recordDailyTurn(e.id);
    ctx.assertEqual(studentStore.getStudentById(e.id, true).freezes, 2, 'freezes are capped at 2');
  },

  'TC-GAM-08: The class league is opt-in, nickname-only, and limited to your own class': async (ctx) => {
    const file = path.join(DATA_DIR, 'students.json');
    const lone = await ctx.createVerifiedStudent('NoClass');
    const none = (await ctx.api('/api/gamification/league', { headers: auth(lone) })).data;
    ctx.assertEqual(none.available, false, 'learners outside a class have no league');

    const klass = 'SCH_' + Date.now();
    const a = await ctx.createVerifiedStudent('LeagueA');
    const b = await ctx.createVerifiedStudent('LeagueB');
    const c = await ctx.createVerifiedStudent('LeagueC');
    const other = await ctx.createVerifiedStudent('OtherClass');
    const doc = secureJson.readJson(file, { students: [] });
    for (const [stu, stream] of [[a, '8E'], [b, '8E'], [c, '8E'], [other, '8W']]) { const r = doc.students.find(s => s.id === stu.id); r.schoolId = klass; r.stream = stream; }
    secureJson.writeJson(file, doc);

    const first = (await ctx.api('/api/gamification/league', { headers: auth(a) })).data;
    ctx.assertEqual(first.optedIn, false, 'nobody is on the board until they choose to join');
    await ctx.api('/api/gamification/league', { method: 'POST', headers: auth(a), body: { optIn: true } });
    await ctx.api('/api/gamification/league', { method: 'POST', headers: auth(b), body: { optIn: true } });
    await ctx.api('/api/gamification/league', { method: 'POST', headers: auth(other), body: { optIn: true } });
    gam.award(studentStore.getStudentById(b.id, true), { type: 'exam', refId: 'lg1', xp: 30 });

    const board = (await ctx.api('/api/gamification/league', { headers: auth(a) })).data;
    ctx.assertEqual(board.participants, 2, 'only opted-in classmates appear');
    ctx.assertEqual(board.board[0].xp, 30);
    ctx.assert(board.board.every(r => !('id' in r) && !('email' in r) && r.handle), 'nicknames and avatars only');
    ctx.assert(!board.board.some(r => r.handle === c.handle || r.handle === other.handle), 'not-joined and other-class learners never show');
    ctx.assertEqual(board.myRank, 2);
    const left = (await ctx.api('/api/gamification/league', { method: 'POST', headers: auth(a), body: { optIn: false } })).data;
    ctx.assertEqual(left.optedIn, false, 'leaving is one tap');
  },

  'TC-GAM-09: Mission answers need the learner themself, and the first correct answer earns XP once': async (ctx) => {
    const stu = await ctx.createVerifiedStudent('Mission');
    const anon = await ctx.api('/api/mission/interact', { method: 'POST', noAuth: true, body: { missionId: 'm', studentId: stu.id, itemId: 'i', answer: '1' } });
    ctx.assertEqual(anon.status, 401, 'no token, no answers');
    const other = await ctx.createVerifiedStudent('Imposter');
    const cross = await ctx.api('/api/mission/interact', { method: 'POST', headers: auth(other), body: { missionId: 'm', studentId: stu.id, itemId: 'i', answer: '1' } });
    ctx.assertEqual(cross.status, 403, 'a learner cannot answer on behalf of another');
    const student = studentStore.getStudentById(stu.id, true);
    ctx.assertEqual(gam.onMissionItemCorrect(student, 'mis1', 'it1').awarded, 5);
    ctx.assertEqual(gam.onMissionItemCorrect(student, 'mis1', 'it1').awarded, 0, 'once per question');
  },

  'TC-GAM-10: Navigation, accessibility and honesty fixes are in the app': async (ctx) => {
    const html = read('public/index.html');
    const dock = html.slice(html.indexOf('id="mobileBottomDock"'), html.indexOf('</nav>', html.indexOf('id="mobileBottomDock"')));
    for (const label of ['Learn', 'Practice', 'Missions', 'Explore', 'Me']) ctx.assert(dock.includes(`>${label}<`), `phone dock has ${label}`);
    ctx.assertEqual((dock.match(/class="dock-tab/g) || []).length, 5, 'exactly five phone tabs');
    ctx.assert(!/user-scalable\s*=\s*no|maximum-scale/i.test(html.match(/<meta name="viewport"[^>]*>/)[0]), 'pinch-zoom is allowed');
    ctx.assert(!html.includes('Loading interactive puzzle sequence'), 'no fake chess loading message');
    ctx.assert(!html.includes('Offline Ready (100% Cached)'), 'no false offline claim');
    ctx.assert(!html.includes('Anti-Bullying Support</div>') || html.includes('tel:116'), 'SafeBox cards do something real');
    const css = read('public/play.css');
    ctx.assert(css.includes(':focus-visible') && css.includes('prefers-reduced-motion'), 'focus rings and reduced motion');
    ctx.assert(/--text-muted:\s*#6B5B4B/i.test(css), 'muted text has readable contrast');
    ctx.assert(html.includes('prefers-color-scheme'), 'follows the device light/dark setting on a first visit');
    ctx.assert(read('public/sw.js').includes('/play.js'), 'service worker precaches the play module');
    ctx.assertEqual((await ctx.api('/play.js')).status, 200);
  }
};
