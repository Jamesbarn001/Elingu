// Kiswahili / English message catalogue (public/i18n.js).
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const gamification = require('../../gamification');
const root = path.join(__dirname, '..', '..');

function loadI18n(alertSink) {
  const store = {};
  const sandbox = {
    window: {}, navigator: { languages: ['en'] }, NodeFilter: { SHOW_TEXT: 4 },
    localStorage: { getItem: k => store[k] || null, setItem: (k, v) => { store[k] = v; } },
    document: { readyState: 'loading', addEventListener() {}, documentElement: {}, querySelectorAll: () => [] },
    alert: function (m) { if (alertSink) alertSink.push(m); },
    CustomEvent: function () {}, MutationObserver: function () { this.observe = () => {}; this.disconnect = () => {}; }
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(root, 'public', 'i18n.js'), 'utf8'), sandbox);
  return sandbox.ElinguI18n;
}

module.exports = {
  'TC-LANG-01: Swaps whole sentences, changing parts, and leaves unknown text in English': async (ctx) => {
    const i = loadI18n();
    const sw = (s) => i._translate('sw', s);
    ctx.assertEqual(sw('Practice'), 'Mazoezi');
    ctx.assertEqual(sw('Level 3 · Sprout'), 'Kiwango 3 · Chipukizi');
    ctx.assertEqual(sw('🌱 New badge: First step'), '🌱 Beji mpya: Hatua ya kwanza');
    ctx.assertEqual(sw('  Practice  '), '  Mazoezi  ', 'spaces around the text are kept');
    ctx.assertEqual(sw('Question 7'), 'Swali 7');
    ctx.assertEqual(sw('Grade 6 · here is a taste of your first lesson.'), 'Gredi 6 · huu ni onja la somo lako la kwanza.', 'the longer sentence wins over the short pattern');
    ctx.assertEqual(sw('Some brand new sentence nobody translated'), 'Some brand new sentence nobody translated');
    ctx.assertEqual(i._translate('en', 'Practice'), 'Practice', 'English is never changed');
    ctx.assertEqual(sw(''), '');
  },

  'TC-LANG-02: Every translation is filled in and keeps the same changing parts as its English': async (ctx) => {
    const i = loadI18n();
    const bad = [];
    Object.keys(i._catalogue).forEach((k) => {
      const v = i._catalogue[k];
      if (typeof v !== 'string' || !v.trim()) { bad.push('empty: ' + k); return; }
      const a = (k.match(/\{\w+\}/g) || []).sort().join(','), b = (v.match(/\{\w+\}/g) || []).sort().join(',');
      if (a !== b) bad.push('placeholders differ: ' + k);
      if (/<[a-z]/i.test(v)) bad.push('markup in translation: ' + k);
    });
    ctx.assertEqual(bad.length, 0, bad.join(' | '));
    ctx.assert(Object.keys(i._catalogue).length > 150, 'catalogue has real coverage');
  },

  'TC-LANG-03: Every badge and level the server can award has a Kiswahili name': async (ctx) => {
    const i = loadI18n();
    const missing = [];
    gamification.BADGES.forEach(b => { if (!i._catalogue[b.name]) missing.push(b.name); if (!i._catalogue[b.how]) missing.push(b.how); });
    gamification.LEVELS.forEach(l => { if (!i._catalogue[l.name]) missing.push(l.name); });
    ctx.assertEqual(missing.length, 0, 'untranslated: ' + missing.join(', '));
  },

  'TC-LANG-04: The language files are loaded, cached offline, and a choice is offered': async (ctx) => {
    const html = fs.readFileSync(path.join(root, 'public', 'index.html'), 'utf8');
    ctx.assert(html.indexOf('/i18n.js') !== -1 && html.indexOf('/i18n.js') < html.indexOf('/explore.js'), 'i18n.js loads before the screens it translates');
    ctx.assert(/'\/i18n\.js'/.test(fs.readFileSync(path.join(root, 'public', 'sw.js'), 'utf8')), 'cached for offline use');
    ctx.assert(/switcher\(\)/.test(fs.readFileSync(path.join(root, 'public', 'explore.js'), 'utf8')), 'explore screen offers the language choice');
    ctx.assert(/switcher\(\)/.test(fs.readFileSync(path.join(root, 'public', 'play.js'), 'utf8')), 'Me screen offers the language choice');
    const res = await fetch(ctx.getBaseUrl() + '/i18n.js');
    ctx.assertEqual(res.status, 200);
  },

  'TC-LANG-06: Sign-up and log-in pop-up messages and screens are translated, with a language choice on the form': async (ctx) => {
    const shown = [];
    const i = loadI18n(shown);
    i.set('sw', false);
    // the alert('...') messages written in the sign-up code
    const html = fs.readFileSync(path.join(root, 'public', 'index.html'), 'utf8');
    const start = html.indexOf('async function goToSignUpStep2()');
    const block = html.slice(start, start + 9000);
    const msgs = [...block.matchAll(/alert\('([^'\\]+)'\)/g)].map(m => m[1]);
    ctx.assert(msgs.length >= 5, 'found the sign-up alert messages (' + msgs.length + ')');
    const missing = msgs.filter(m => i._translate('sw', m) === m);
    ctx.assertEqual(missing.length, 0, 'sign-up messages without Kiswahili: ' + missing.join(' | '));
    // a message is shown in Kiswahili once the learner has chosen it
    ctx.assertEqual(i.t('Please choose a learner nickname.'), 'Tafadhali chagua jina la utani la mwanafunzi.');
    ctx.assert(html.indexOf('data-lang-slot') !== -1, 'language choice is on the sign-up form');
    ctx.assert(/#figmaAuthOverlay/.test(fs.readFileSync(path.join(root, 'public', 'i18n.js'), 'utf8')), 'sign-up screen is inside the translated area');
  },

  'TC-LANG-07: Every server message that has a Kiswahili version still exists on the server': async (ctx) => {
    const i = loadI18n();
    const files = ['server.js', 'examRoutes.js', 'studentStore.js', 'gamification.js', 'authUtils.js', 'parentStore.js', 'paymentStore.js', 'teacherRoutes.js', 'teacherStore.js'];
    // join the files, and drop the backslash in \' and \" so a message written with an escaped quote still matches
    const src = files.map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n').replace(/\\(['"])/g, '$1');
    const stale = [];
    i._serverKeys.forEach(k => {
      k.split(/\{\w+\}/).map(x => x.trim()).filter(x => x.length >= 8).forEach(chunk => { if (src.indexOf(chunk) === -1) stale.push(chunk); });
    });
    ctx.assertEqual(stale.length, 0, 'translated, but no longer written by the server (reworded?): ' + stale.join(' | '));
    ctx.assert(i._serverKeys.length > 200, 'server messages are covered');
  },

  'TC-LANG-08: A real server error reaches the learner in Kiswahili': async (ctx) => {
    const i = loadI18n();
    const bad = await ctx.api('/api/students/login', { method: 'POST', body: { handleOrEmail: ctx.uniqueHandle('Nobody'), pin: '2483' } });
    ctx.assert(bad.data && bad.data.error, 'server answered with an error');
    ctx.assert(i._translate('sw', bad.data.error) !== bad.data.error, 'untranslated server error: ' + bad.data.error);
    const noPin = await ctx.api('/api/students/login', { method: 'POST', body: { handleOrEmail: 'x' } });
    ctx.assert(i._translate('sw', noPin.data.error) !== noPin.data.error, 'untranslated server error: ' + noPin.data.error);
    const reset = await ctx.api('/api/students/request-otp', { method: 'POST', body: { identifier: ctx.uniqueHandle('Ghost') } });
    ctx.assert(reset.data && reset.data.error, 'server answered with an error for an unknown account');
    ctx.assert(i._translate('sw', reset.data.error) !== reset.data.error, 'untranslated server error: ' + reset.data.error);
  },

  'TC-LANG-09: The parent portal loads the language engine, offers the switch, and makes no compliance claim': async (ctx) => {
    const res = await fetch(ctx.getBaseUrl() + '/parent/portal');
    const html = await res.text();
    ctx.assert(html.indexOf('/i18n.js') !== -1, 'portal loads i18n.js');
    ctx.assert(html.indexOf('data-i18n-scope') !== -1 && html.indexOf('data-lang-slot') !== -1, 'portal is translated and has the language switch');
    ctx.assert(!/complies fully|Zero-PII/i.test(html), 'no compliance claim in the portal');
    const i = loadI18n();
    ['Sign In to Family Portal →', 'This week', 'Change Family Password', 'Payment Successful!', 'Continue to secure payment 🔒', 'Upgrade Plan'].forEach(k => ctx.assert(i._catalogue[k], 'portal sentence has Kiswahili: ' + k));
    ctx.assertEqual(i._translate('sw', 'Amani studied on 3 days this week, mostly Maths and English.'), 'Amani alisoma siku 3 wiki hii, hasa Maths and English.');
    ctx.assertEqual(i._translate('sw', 'Try tonight: Ask Amani to explain Ratios to you in their own words. Teaching it is the best check.'), 'Jaribu usiku huu: Mwombe Amani akueleze Ratios kwa maneno yake mwenyewe. Kufundisha ndiyo njia bora ya kuangalia.');
    ctx.assertEqual(i._translate('sw', 'Incorrect Family Password. 4 attempt(s) remaining.'), 'Nenosiri la Familia si sahihi. Majaribio 4 yamebaki.');
  },

  'TC-LANG-10: The teacher portal loads the language engine, offers the switch, and translates its main sentences': async (ctx) => {
    const res = await fetch(ctx.getBaseUrl() + '/teacher/portal');
    const html = await res.text();
    ctx.assert(html.indexOf('/i18n.js') !== -1, 'portal loads i18n.js');
    ctx.assert(html.indexOf('<body data-i18n-scope>') !== -1 && html.indexOf('data-lang-slot') !== -1, 'portal is translated and has the language switch');
    ctx.assert(html.indexOf('KUJ-ADMIN') === -1, 'the old guessable school-code example is gone');
    const i = loadI18n();
    ['Teacher Sign In', 'Safeguarding inbox', 'Staff waiting for approval', 'Faculty Governance Roster', 'Authorize Action ✓', 'Log Out'].forEach(k => ctx.assert(i._catalogue[k], 'teacher sentence has Kiswahili: ' + k));
    ctx.assertEqual(i._translate('sw', 'EE (Exceeding): 35%'), 'EE (Anazidi matarajio): 35%');
    ctx.assertEqual(i._translate('sw', 'Amina Head (Headteacher)'), 'Amina Head (Mwalimu Mkuu)');
    ctx.assertEqual(i._translate('sw', 'Grade 7 East (12 learners)'), 'Gredi 7 East (wanafunzi 12)');
  },

  'TC-LANG-05: Dock and navigation labels used by the app all have a translation': async (ctx) => {
    const i = loadI18n();
    const html = fs.readFileSync(path.join(root, 'public', 'index.html'), 'utf8');
    const labels = [...html.matchAll(/class="dock-label">([^<]+)</g)].map(m => m[1].trim());
    ctx.assertEqual(labels.length, 5);
    labels.forEach(l => ctx.assert(i._catalogue[l], 'dock label has Kiswahili: ' + l));
  }
};
