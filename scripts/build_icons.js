#!/usr/bin/env node
// Builds public/icons.svg (one <symbol id="i-NAME"> per icon) from Lucide SVG sources.
// Lucide is ISC licensed (see public/vendor/LICENSE-lucide.txt). No runtime dependency: dev-time script only.
//
// Usage:  node scripts/build_icons.js <path-to-lucide-static/icons>
//   or    LUCIDE_ICONS_DIR=<path> node scripts/build_icons.js
//   (falls back to node_modules/lucide-static/icons if present)
// Built against lucide-static 1.70.0. Fails on any missing name (Lucide renames icons between versions).
const fs = require('fs');
const path = require('path');

// Names come from docs/audits/ui_icon_report.md section 3.6, plus graduation-cap and leaf (emoji table rows 19, 25).
// Substitutions: none were needed (every name existed in 1.70.0). `brand-tree` is a custom logo symbol and is
// intentionally NOT built here (no hand-drawn paths); add it from the real logo later.
const ICONS = [
  // navigation
  'brain', 'file-pen-line', 'target', 'compass', 'bookmark', 'route', 'shield-check', 'trending-up',
  'sliders-horizontal', 'settings', 'bell', 'moon', 'sun', 'search', 'house', 'menu', 'x', 'plus', 'ellipsis',
  'arrow-left', 'arrow-right', 'chevron-right', 'chevron-down', 'log-out', 'user-round', 'users-round', 'school',
  // subjects
  'calculator', 'sigma', 'triangle-right', 'flask-conical', 'atom', 'dna', 'microscope', 'heart-pulse',
  'book-open-text', 'book-open', 'feather', 'languages', 'globe', 'scroll-text', 'church', 'landmark', 'laptop',
  'code-xml', 'briefcase-business', 'chart-column', 'sprout', 'palette', 'music', 'clapperboard', 'pen-tool',
  'dumbbell', 'hand-heart', 'wrench', 'test-tubes', 'thermometer', 'timer', 'scale', 'graduation-cap', 'leaf',
  // status
  'lock', 'lock-open', 'check', 'circle-check', 'circle-x', 'triangle-alert', 'info', 'hourglass', 'clock',
  'loader', 'wifi-off', 'refresh-cw', 'eye', 'eye-off', 'badge-check',
  // actions
  'mail', 'send', 'printer', 'pencil', 'pen-line', 'copy', 'download', 'trash-2', 'save', 'key-round', 'mic',
  'volume-2', 'file-text', 'clipboard-list', 'calendar', 'map-pin', 'message-circle', 'lightbulb', 'smartphone',
  'banknote', 'handshake', 'map', 'play', 'circle-help',
  // rewards
  'flame', 'snowflake', 'zap', 'star', 'trophy', 'medal', 'award', 'crown', 'party-popper'
];
// If a name is missing in a future Lucide version, map it here: { wanted: 'nearest-existing' }
const SUBSTITUTIONS = {};

function main() {
  const dir = process.argv[2] || process.env.LUCIDE_ICONS_DIR || path.join(__dirname, '..', 'node_modules', 'lucide-static', 'icons');
  if (!fs.existsSync(dir)) { console.error('Lucide icons dir not found: ' + dir); process.exit(1); }
  const missing = [];
  const symbols = [];
  for (const name of ICONS) {
    const src = SUBSTITUTIONS[name] || name;
    const file = path.join(dir, src + '.svg');
    if (!fs.existsSync(file)) { missing.push(name); continue; }
    const raw = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');
    const m = raw.match(/<svg[^>]*>([\s\S]*?)<\/svg>/);
    if (!m) { missing.push(name + ' (unparseable)'); continue; }
    const inner = m[1].replace(/\s*\n\s*/g, '').replace(/\s{2,}/g, ' ').trim();
    symbols.push('<symbol id="i-' + name + '" viewBox="0 0 24 24">' + inner + '</symbol>');
  }
  if (missing.length) { console.error('Missing icons: ' + missing.join(', ')); process.exit(1); }
  const out = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n' + symbols.join('\n') + '\n</svg>\n';
  const dest = path.join(__dirname, '..', 'public', 'icons.svg');
  fs.writeFileSync(dest, out);
  console.log('Wrote ' + dest + ' (' + symbols.length + ' icons, ' + Buffer.byteLength(out) + ' bytes)');
}
main();
