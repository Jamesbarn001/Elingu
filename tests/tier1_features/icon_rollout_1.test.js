// Icon rollout pass 1: dock, sidebar, Brain Deck home, header chips and the explore screen use the SVG sprite.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const sliceBetween = (src, start, end) => {
  const a = src.indexOf(start);
  const b = src.indexOf(end, a + 1);
  if (a < 0 || b < 0) throw new Error('markers not found: ' + start);
  return src.slice(a, b);
};
const OLD_NAV_EMOJI = ['🧠', '📝', '🎯', '🧭', '⭐', '🌌', '🛡️', '⚙️', '🔢', '💼', '🤝', '📚', '🗣️', '🔬', '🌍', '⚛️', '🧪', '🧬', '💻', '📜', '🗺️', '🎭', '🎨', '⚽', '📋', '⚡', '✨'];
const html = read('public/index.html');
const dock = sliceBetween(html, '<nav class="mobile-bottom-dock"', '</nav>');
const sidebar = sliceBetween(html, '<nav class="sidebar-nav">', '</aside>');

module.exports = {
  'TC-ICON1-01: Mobile dock uses sprite icons and no emoji': async (ctx) => {
    const uses = dock.match(/<use href="\/icons\.svg#i-[a-z0-9-]+"/g) || [];
    ctx.assertEqual(uses.length, 5, 'five dock icons');
    for (const e of OLD_NAV_EMOJI) ctx.assert(!dock.includes(e), 'dock still has ' + e);
    ctx.assert(/class="i" aria-hidden="true"/.test(dock), 'decorative icons are aria-hidden');
  },

  'TC-ICON1-02: Sidebar navigation uses sprite icons and no old nav emoji': async (ctx) => {
    const uses = sidebar.match(/<use href="\/icons\.svg#i-[a-z0-9-]+"/g) || [];
    ctx.assert(uses.length >= 25, 'sidebar has sprite icons, got ' + uses.length);
    for (const e of OLD_NAV_EMOJI) ctx.assert(!sidebar.includes(e), 'sidebar still has ' + e);
    for (const t of ['Brain Deck', 'My Spaces', 'Explore & Support', 'My Subjects', 'Compulsory', 'STEM', 'Humanities']) ctx.assert(sidebar.includes(t), 'label kept: ' + t);
  },

  'TC-ICON1-03: Home deck and header render icons lazily with no emoji decoration': async (ctx) => {
    const deck = sliceBetween(html, 'async function renderStudyDeck()', 'async function fetchDailySpark');
    ctx.assert(/_ic\('target'\)|_ic\('zap'\)/.test(deck), 'deck uses the lazy _ic helper');
    ctx.assert(/subjectIcon/.test(deck), 'subject pills use subjectIcon');
    for (const e of ['☀️', '🌿', '⚡', '🎯', '🧪', '📖']) ctx.assert(!deck.includes(e), 'deck still has ' + e);
    ctx.assert(/function _ic\(name, cls\) \{ return window\.ico \?/.test(html), 'safe fallback when window.ico is missing');
    const header = sliceBetween(html, '<header>', '</header>');
    ctx.assert(!header.includes('🔔') && !header.includes('🌙') && !header.includes('⭐'), 'header chips use icons');
    ctx.assert(header.includes('aria-label="Toggle Dark / Light Mode"'), 'icon-only theme button has aria-label');
  },

  'TC-ICON1-04: Every icon id used in the touched files exists in icons.svg': async (ctx) => {
    const sprite = read('public/icons.svg');
    const have = new Set((sprite.match(/id="i-[a-z0-9-]+"/g) || []).map((s) => s.slice(4, -1)));
    const used = new Set();
    for (const f of ['public/index.html', 'public/explore.js', 'public/play.js']) {
      const src = read(f);
      (src.match(/icons\.svg#i-[a-z0-9-]+/g) || []).forEach((m) => used.add(m.replace('icons.svg#', '')));
      (src.match(/\b(?:ic|_ic|ico|window\.ico)\('[a-z0-9-]+'/g) || []).forEach((m) => used.add('i-' + m.split("'")[1]));
    }
    for (const id of used) ctx.assert(have.has(id), id + ' missing from icons.svg');
    // names produced by subjectIcon must exist too
    const icons = read('public/icons.js');
    (icons.match(/\], '([a-z0-9-]+)'\]/g) || []).forEach((m) => ctx.assert(have.has('i-' + m.match(/'([^']+)'/g).pop().slice(1, -1)), 'subjectIcon id missing: ' + m));
  },

  'TC-ICON1-05: Explore screen has no flags, lock or book emoji': async (ctx) => {
    const js = read('public/explore.js');
    for (const e of ['🇰🇪', '🇬🇧', '🔒', '📖', '⏳', '🌳']) ctx.assert(!js.includes(e), 'explore.js still has ' + e);
    ctx.assert(/window\.ico \? window\.ico/.test(js), 'explore uses ico lazily');
  },

  'TC-ICON1-06: Avatars and celebrations were left alone': async (ctx) => {
    ctx.assert(html.includes("const avatar = s.avatar || '🦁';"), 'deck avatar fallback kept');
    ctx.assert(html.includes('<div class="deck-avatar">${avatar}</div>'), 'deck avatar still rendered as emoji');
    ctx.assert(html.includes('<span id="activeStudentAvatar">🦁</span>'), 'header avatar kept');
    ctx.assert(html.includes('<span class="stat-icon" style="font-size: 1rem; line-height: 1;">🔥</span>'), 'streak flame kept');
    const play = read('public/play.js');
    ctx.assert(play.includes("['🎉', '⭐', '✨', '🌟', '🎊']") && play.includes("'🎉 Level '"), 'confetti and level-up kept');
  },
};
