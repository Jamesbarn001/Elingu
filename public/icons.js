/* Tiny icon helper. window.ico(name, opts) returns an SVG string using the /icons.svg sprite.
   opts: { cls: 'i-sm', label: 'Accessible name' } (a string opts is treated as cls).
   window.subjectIcon(subjectName) returns an icon name. */
(function (global) {
  'use strict';
  var ALIASES = { home: 'house', 'delete': 'trash-2', trash: 'trash-2', help: 'circle-help', more: 'ellipsis',
    warning: 'triangle-alert', success: 'circle-check', error: 'circle-x', user: 'user-round', users: 'users-round',
    streak: 'flame', xp: 'zap', premium: 'crown', offline: 'wifi-off', loading: 'loader', progress: 'trending-up',
    learn: 'brain', practice: 'file-pen-line', missions: 'target', explore: 'compass' };
  var ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return ESC[c]; }); }
  function ico(name, opts) {
    if (typeof opts === 'string') opts = { cls: opts };
    opts = opts || {};
    var n = String(name || '').toLowerCase().replace(/[^a-z0-9-]/g, '');
    n = ALIASES[n] || n;
    var cls = 'i' + (opts.cls ? ' ' + esc(opts.cls) : '');
    var a11y = opts.label ? 'role="img" aria-label="' + esc(opts.label) + '"' : 'aria-hidden="true"';
    return '<svg class="' + cls + '" ' + a11y + ' focusable="false"><use href="/icons.svg#i-' + n + '"/></svg>';
  }
  // Ordered: first match wins, so specific names precede generic ones ("Computer Science" before "Science").
  var SUBJECT_RULES = [
    [/computer|computing|\bict\b|coding/, 'laptop'],
    [/additional math|advanced math|further math/, 'sigma'],
    [/geometry/, 'triangle-right'],
    [/math/, 'calculator'],
    [/chem/, 'flask-conical'],
    [/physic/, 'atom'],
    [/human bio|health/, 'heart-pulse'],
    [/biolog/, 'dna'],
    [/science|virtual lab/, 'microscope'],
    [/fasihi/, 'feather'],
    [/kiswahili|swahili/, 'languages'],
    [/literature/, 'book-open'],
    [/english/, 'book-open-text'],
    [/social/, 'users-round'],
    [/geograph|global|citizenship/, 'globe'],
    [/histor/, 'scroll-text'],
    [/christian|\bcre\b|religio/, 'church'],
    [/civic|cambridge/, 'landmark'],
    [/business/, 'briefcase-business'],
    [/econom|data/, 'chart-column'],
    [/agricult/, 'sprout'],
    [/music|dance/, 'music'],
    [/theatre|theater|film|drama/, 'clapperboard'],
    [/graphic|design/, 'pen-tool'],
    [/\bart|creative/, 'palette'],
    [/sport|recreation|physical/, 'dumbbell'],
    [/community|service/, 'hand-heart'],
    [/technical|technology/, 'wrench']
  ];
  function subjectIcon(subjectName) {
    var s = String(subjectName || '').toLowerCase();
    for (var i = 0; i < SUBJECT_RULES.length; i++) if (SUBJECT_RULES[i][0].test(s)) return SUBJECT_RULES[i][1];
    return 'book-open';
  }
  global.ico = ico;
  global.subjectIcon = subjectIcon;
  global.ICO_ALIASES = ALIASES;
  global.ICO_SUBJECT_RULES = SUBJECT_RULES;
})(typeof window !== 'undefined' ? window : globalThis);
