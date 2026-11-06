// ============================================================
// Tier 1 — Short sign-up: carry over explore choices, taste mode, "make it yours"
// ============================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const studentStore = require('../../studentStore');

const ROOT = path.resolve(__dirname, '..', '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

module.exports = {
  'TC-QSU-01: The short form (nickname, PIN, parent contact) creates a pending account with the explored subject and the set-up flag': async (ctx) => {
    const handle = ctx.uniqueHandle ? ctx.uniqueHandle('Quick') : 'Quick' + Date.now().toString().slice(-6);
    const res = await ctx.api('/api/students/profile', {
      method: 'POST',
      body: { handle, pin: '7351', email: `qsu${Date.now()}@example.com`, parentConsent: true, quickSignup: true, curriculum: 'CBC', grade: 7, exploredSubject: 'Mathematics' }
    });
    ctx.assertEqual(res.status, 200, 'short payload must be accepted: ' + JSON.stringify(res.data));
    const s = res.data.student;
    ctx.assertEqual(s.needsProfileSetup, true, 'the app should ask the optional questions later');
    ctx.assert(Array.isArray(s.selectedSubjects) && s.selectedSubjects.includes('Mathematics'), 'the explored subject must be kept');
    ctx.assert(res.data.awaitingParentApproval === true, 'the child must wait for the parent');
    ctx.assert(!res.data.sessionToken || res.data.awaitingParentApproval, 'no working session before approval');
    const chat = await ctx.api('/api/chat', { method: 'POST', body: { studentId: s.id, messages: [{ role: 'user', content: 'hi' }] } });
    ctx.assert(chat.status === 401 || chat.status === 403, 'chat stays locked until the parent approves');
  },

  'TC-QSU-02: A normal sign-up does not get the set-up flag, and an unknown explored subject is ignored': async (ctx) => {
    const a = await ctx.createVerifiedStudent('Normal');
    const row = studentStore.getStudentById(a.id);
    ctx.assert(!row.needsProfileSetup, 'long sign-up learners are not asked again');
    const handle = 'Bogus' + Date.now().toString().slice(-6);
    const res = await ctx.api('/api/students/profile', { method: 'POST', body: { handle, pin: '4821', email: `bog${Date.now()}@example.com`, parentConsent: true, quickSignup: true, grade: 7, exploredSubject: 'Not A Subject' } });
    ctx.assertEqual(res.status, 200);
    ctx.assert(!(res.data.student.selectedSubjects || []).includes('Not A Subject'), 'unknown subject names are not stored');
  },

  'TC-QSU-03: Finishing "make it yours" clears the flag and saves the county': async (ctx) => {
    const handle = 'Setup' + Date.now().toString().slice(-6);
    const reg = await ctx.api('/api/students/profile', { method: 'POST', body: { handle, pin: '7351', email: `set${Date.now()}@example.com`, parentConsent: true, quickSignup: true, grade: 7, exploredSubject: 'English' } });
    const id = reg.data.student.id;
    studentStore.setStudentParentVerified(id);
    const login = await ctx.api('/api/students/login', { method: 'POST', body: { handleOrEmail: handle, pin: '7351' } });
    ctx.assertEqual(login.status, 200);
    ctx.assertEqual(login.data.student.needsProfileSetup, true, 'signing in later must still carry the flag');
    const tok = login.data.sessionToken || (login.data.student && login.data.student.sessionToken);
    const status = await ctx.api('/api/students/verification-status?studentId=' + id, { headers: { Authorization: 'Bearer ' + tok } });
    ctx.assertEqual(status.data.student && status.data.student.needsProfileSetup, true, 'the approval hand-over must carry the flag');
    const put = await ctx.api('/api/students/profile', { method: 'PUT', body: { studentId: id, county: 'Kisumu', profileSetupDone: true } });
    ctx.assertEqual(put.status, 200, JSON.stringify(put.data));
    const row = studentStore.getStudentById(id);
    ctx.assert(!row.needsProfileSetup, 'flag cleared');
    ctx.assertEqual(row.county, 'Kisumu');
  },

  'TC-QSU-04: The short form, taste mode and set-up sheet are shipped and parse': async (ctx) => {
    const html = read('public/index.html');
    for (const must of ['hasQuickChoice', 'completeQuickSignUp', 'suggestNickname', 'btnSuggestNick', 'Start learning →']) ctx.assert(html.includes(must), 'index.html missing ' + must);
    const ex = read('public/explore.js');
    for (const must of ['showTaste', 'tasteShareLinks', 'startTastePoll', 'verification-status']) ctx.assert(ex.includes(must), 'explore.js missing ' + must);
    ctx.assert(read('public/play.js').includes('maybeProfileSetup'), 'play.js missing the set-up sheet');
    for (const f of ['public/explore.js', 'public/play.js', 'public/i18n.js']) new vm.Script(read(f), { filename: f });
    ctx.assert(read('public/explore.css').includes('.xp-taste-banner'), 'taste styles missing');
  },

  'TC-QSU-05: The message sent to a parent from taste mode carries no approval link or token': async (ctx) => {
    const ex = read('public/explore.js');
    const body = ex.slice(ex.indexOf('function tasteShareLinks'), ex.indexOf('function startTastePoll'));
    ctx.assert(!/token|verify\?|approve/i.test(body.replace(/Activate Account/g, '')), 'share text must not contain a token or approval URL');
    ctx.assert(/Activate Account/.test(body), 'it should point the parent at the message they already received');
  },

  'TC-QSU-06: Taste mode opens only two subjects and locks the tutor and papers': async (ctx) => {
    const ex = read('public/explore.js');
    ctx.assert(/prefer = \['Mathematics', 'English'\]/.test(ex), 'second subject is Mathematics, or English if they explored Mathematics');
    ctx.assert(/taste\.subjects\.push\(second\)/.test(ex) && !/taste\.subjects\.push\([^)]*\)[\s\S]{0,40}taste\.subjects\.push/.test(ex), 'only one extra subject is added');
    for (const lock of ['Ask the tutor', 'Practice papers', 'Save my progress and XP', 'All other subjects']) ctx.assert(ex.includes(lock), 'lock list missing ' + lock);
    ctx.assert(!/\/api\/chat|award|\/api\/exam/.test(ex.slice(ex.indexOf('taste mode:'))), 'taste mode must not call the tutor, rewards or exam routes');
  },

  'TC-QSU-07: Kiswahili exists for the new screens': async (ctx) => {
    const i18n = read('public/i18n.js');
    for (const s of ['Start learning →', 'Suggest a nickname', 'Waiting for your parent to say yes', 'Unlocks when your parent says yes', 'Make it yours', 'Which county are you in?']) ctx.assert(i18n.includes("'" + s + "'"), 'no Kiswahili for: ' + s);
    ctx.assert(i18n.includes('#playSetup'), 'set-up sheet must be inside the translated scope');
    ctx.assert(!/elingu-cache-v12-subjects/.test(read('public/sw.js')), 'cache version must be bumped');
  }
};
