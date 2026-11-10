// Landing on Home after sign-in, and the collapsible Brain Deck group.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..', '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

module.exports = {
  'TC-HOME-01: A late "load my old chat" reply can never paint over Home': async (ctx) => {
    const html = read('public/index.html');
    ctx.assert(/function renderStudyDeck[\s\S]{0,1400}window\.__viewMode = 'home'/.test(html), 'Home must mark itself as the current view');
    ctx.assert(/function setSubject\(subject, subView\) \{\s*window\.__viewMode = 'subject'/.test(html), 'choosing a subject leaves Home');
    const fn = html.slice(html.indexOf('async function loadStudentSessionForSubject'), html.indexOf('// ── STREAM & MISSION CLIENT LOGIC'));
    ctx.assert(/await res\.json\(\);[\s\S]{0,300}__viewMode === 'home'\) return;[\s\S]*log\.innerHTML = ''/.test(fn), 'the guard must come before the chat is drawn');
  },

  'TC-HOME-02: Brain Deck opens or closes the whole group, My Subjects has its own toggle, both start closed': async (ctx) => {
    const js = read('public/play.js');
    new vm.Script(js);
    for (const must of ['elingu_deck_open', 'elingu_subjects_open', 'deck-collapsed', 'subjects-collapsed', 'applyDeck(d === \'1\', false)', 'applySubjects(s === \'1\', false)']) ctx.assert(js.includes(must), 'play.js missing ' + must);
    const html = read('public/index.html');
    for (const sel of ['.sidebar-nav.deck-collapsed #sidebarSubjectsTitle', '.sidebar-nav.deck-collapsed .sidebar-saved-spaces-anchor']) ctx.assert(html.includes(sel), 'CSS must hide ' + sel);
    ctx.assert(/aria-expanded/.test(js), 'toggle state is announced to screen readers');
  }
};
