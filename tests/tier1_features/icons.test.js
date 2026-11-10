// ============================================================
// Tier 1 — Self-hosted icon foundation: sprite, helper, licence
// ============================================================
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

function loadHelper() {
  const sandbox = { window: {} };
  sandbox.globalThis = sandbox.window;
  vm.runInNewContext(read('public/icons.js'), sandbox.window);
  return sandbox.window;
}
const spriteIds = () => new Set([...read('public/icons.svg').matchAll(/<symbol id="([^"]+)"/g)].map((m) => m[1]));

module.exports = {
  'TC-ICO-01: The sprite exists, is under 60 KB and has at least 100 symbols': async (ctx) => {
    const p = path.join(ROOT, 'public', 'icons.svg');
    ctx.assert(fs.existsSync(p), 'public/icons.svg must exist');
    ctx.assert(fs.statSync(p).size < 60 * 1024, 'sprite must stay under 60 KB');
    ctx.assert(spriteIds().size >= 100, 'expected about 115 icons, got ' + spriteIds().size);
  },

  'TC-ICO-02: The sprite is well-formed (balanced tags) with no external URLs': async (ctx) => {
    const svg = read('public/icons.svg');
    const stack = [];
    const re = /<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g;
    let m;
    while ((m = re.exec(svg))) {
      if (m[4] === '/') continue;
      if (m[1] === '/') ctx.assertEqual(stack.pop(), m[2], 'mismatched closing tag </' + m[2] + '>');
      else stack.push(m[2]);
    }
    ctx.assertEqual(stack.length, 0, 'unclosed tags: ' + stack.join(','));
    const urls = svg.match(/https?:\/\/[^"'\s<>]+/g) || [];
    ctx.assertEqual(urls.filter((u) => u !== 'http://www.w3.org/2000/svg').length, 0, 'no external URLs allowed');
    ctx.assert(!/<script|onload=|href="http/i.test(svg), 'no scripts or external hrefs');
    const ids = [...svg.matchAll(/<symbol id="([^"]+)"/g)].map((x) => x[1]);
    ctx.assertEqual(new Set(ids).size, ids.length, 'symbol ids must be unique');
  },

  'TC-ICO-03: Every icon named by the helper tables exists in the sprite': async (ctx) => {
    const w = loadHelper();
    const ids = spriteIds();
    const wanted = new Set([...Object.values(w.ICO_ALIASES), ...w.ICO_SUBJECT_RULES.map((r) => r[1]), w.subjectIcon('zzz unknown')]);
    for (const n of wanted) ctx.assert(ids.has('i-' + n), 'missing symbol i-' + n);
    for (const n of ['house', 'brain', 'flame', 'lock', 'crown']) ctx.assert(ids.has('i-' + n), 'missing symbol i-' + n);
    ctx.assertEqual(w.subjectIcon('Computer Science'), 'laptop', 'Computer Science must not match Science');
    ctx.assertEqual(w.subjectIcon('Integrated Science'), 'microscope');
  },

  'TC-ICO-04: icons.js parses and ico() output is decorative by default and labelled on request': async (ctx) => {
    new vm.Script(read('public/icons.js'), { filename: 'icons.js' });
    const w = loadHelper();
    const out = w.ico('home');
    ctx.assert(out.includes('aria-hidden="true"'), 'decorative icon must be aria-hidden');
    ctx.assert(out.includes('/icons.svg#i-house'), 'home must resolve to the house symbol');
    const labelled = w.ico('lock', { label: 'Locked', cls: 'i-sm' });
    ctx.assert(labelled.includes('aria-label="Locked"') && !labelled.includes('aria-hidden'), 'label option sets aria-label');
    ctx.assert(labelled.includes('class="i i-sm"'), 'cls option is applied');
    ctx.assert(!w.ico('x"><script>').includes('<script'), 'name must be sanitised');
  },

  'TC-ICO-05: icons.css defines the .i rules with no animation, and the licence file exists': async (ctx) => {
    const css = read('public/icons.css');
    ctx.assert(/\.i\s*\{[^}]*1\.25em/.test(css) && /stroke-width:\s*1\.75/.test(css) && /fill:\s*none/.test(css), '.i base rules');
    ctx.assert(css.includes('.i-sm') && css.includes('.i-lg') && css.includes('prefers-reduced-motion'), 'size and motion rules');
    ctx.assert(!/@keyframes|animation:\s*[a-z]/i.test(css.replace(/animation:\s*none/g, '')), 'no animation');
    const lic = path.join(ROOT, 'public', 'vendor', 'LICENSE-lucide.txt');
    ctx.assert(fs.existsSync(lic) && /ISC License/.test(fs.readFileSync(lic, 'utf8')), 'ISC licence file must exist');
  }
};
