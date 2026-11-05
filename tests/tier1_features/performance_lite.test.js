// Phase 6: low-end phones and slow networks.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

module.exports = {
  'TC-PERF-01: Pages and API replies are compressed for slow connections': async (ctx) => {
    const res = await fetch(`${ctx.getBaseUrl()}/`, { headers: { 'Accept-Encoding': 'gzip' } });
    ctx.assertEqual(res.headers.get('content-encoding'), 'gzip', 'HTML must be gzip compressed');
    const cc = res.headers.get('cache-control') || '';
    ctx.assert(/no-store/.test(cc), 'HTML must stay no-store (rule 8)');
  },

  'TC-PERF-02: Fonts and maths library are served from our own server, immutable-cached': async (ctx) => {
    for (const u of ['/fonts.css', '/vendor/katex/katex.min.js', '/vendor/katex/contrib/auto-render.min.js', '/vendor/fonts/dm-sans-latin-400-normal.woff2']) {
      const res = await fetch(`${ctx.getBaseUrl()}${u}`);
      ctx.assertEqual(res.status, 200, u + ' must be served');
    }
    const f = await fetch(`${ctx.getBaseUrl()}/vendor/fonts/dm-sans-latin-400-normal.woff2`);
    ctx.assert(/immutable/.test(f.headers.get('cache-control') || ''), 'vendor files must be cached long-term');
  },

  'TC-PERF-03: No third-party CDN or font host is referenced by any page': async (ctx) => {
    for (const f of ['public/index.html', 'server.js', 'teacherRoutes.js', 'adminRoutes.js', 'public/sw.js']) {
      const src = read(f);
      ctx.assert(!/fonts\.googleapis|fonts\.gstatic|cdnjs\.cloudflare|cdn\.jsdelivr|unpkg\.com/.test(src), f + ' must not call a third-party host');
    }
  },

  'TC-PERF-04: Heavy design files are not shipped inside public/': async (ctx) => {
    const big = [];
    (function walk(d) {
      for (const n of fs.readdirSync(d)) {
        const p = path.join(d, n);
        const st = fs.statSync(p);
        if (st.isDirectory()) walk(p);
        else if (!/index\.html$/.test(n) && st.size > 300 * 1024) big.push(path.relative(root, p) + ' ' + st.size);
      }
    })(path.join(root, 'public'));
    ctx.assertEqual(big.length, 0, 'public/ files over 300 KB: ' + big.join(', '));
  },

  'TC-PERF-05: Lite mode exists, with a learner switch and data-saver detection': async (ctx) => {
    const html = read('public/index.html');
    ctx.assert(/ElinguLite/.test(html) && /saveData/.test(html), 'lite mode detection must exist');
    ctx.assert(/document\.hidden/.test(html), 'polling must pause when the tab is hidden');
    const play = read('public/play.js');
    ctx.assert(/Data saver/.test(play) && /Save lessons for offline/.test(play), 'Me panel must offer data saver and offline save');
    ctx.assert(/html\.lite/.test(read('public/play.css')), 'lite CSS must exist');
  },

  'TC-PERF-06: Service worker races the network and never fakes offline success': async (ctx) => {
    const sw = read('public/sw.js');
    ctx.assert(/withTimeout/.test(sw) && /SHELL_TIMEOUT_MS/.test(sw), 'page shell needs a timeout race');
    ctx.assert(/elingu-lessons-v1/.test(sw), 'saved lessons need their own cache');
    ctx.assert(/status: 503/.test(sw) && /offline: true/.test(sw), 'unsaved content must return an honest 503');
    ctx.assert(!/fake|simulated/i.test(sw), 'no fake responses');
  },

  'TC-PERF-07: Curriculum endpoints used by "Save lessons for offline" respond': async (ctx) => {
    const cat = await ctx.api('/api/curriculum/catalogue?curriculum=CBC&grade=8');
    ctx.assert(cat.data && cat.data.success, 'catalogue must respond');
    const map = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=8&subject=Mathematics');
    ctx.assert(map.data && map.data.success && Array.isArray(map.data.map.stations), 'map must have stations');
  }
};
