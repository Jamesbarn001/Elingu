// ============================================================
// Tier 1 — XSS / injection hardening regression tests (Phase 2 of the November 2026 audit)
// ============================================================

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const authUtils = require('../../authUtils');

function inlineScripts(html) {
  const re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}

module.exports = {
  'TC-XSS-01: Nicknames with markup, quotes or scripts are rejected at sign-up': async (ctx) => {
    for (const bad of ['<img src=x onerror=alert(1)>', "o'neil\"x", 'a;b', '</script>', 'x`y']) {
      const res = await ctx.api('/api/students/profile', {
        method: 'POST',
        body: { handle: bad, pin: ctx.uniquePin(), grade: 7, email: ctx.uniqueEmail('parent') }
      });
      ctx.assertEqual(res.status, 400, `nickname ${JSON.stringify(bad)} must be rejected`);
    }
    const ok = authUtils.validateNickname('Wanjiku_K 🦁');
    ctx.assertEqual(ok.valid, true, 'normal nicknames (with emoji) stay valid');
  },

  'TC-XSS-02: Display-text cleaner removes anything that can break out of HTML, attributes or JS strings': async (ctx) => {
    const cleaned = authUtils.cleanDisplayText(`</script><img src=x onerror="alert('1')"> & St. Mary's \\ \`x\``, 80);
    for (const ch of ['<', '>', '"', "'", '`', '\\', '&']) {
      ctx.assert(!cleaned.includes(ch), `cleaned text must not contain ${ch}`);
    }
    ctx.assertEqual(authUtils.cleanAvatar('<img>'), '🦁', 'markup is never accepted as an avatar');
  },

  'TC-XSS-03: Dashboard payload neutraliser keeps normal subject names but defuses markup': async (ctx) => {
    const out = authUtils.neutralizeMarkupDeep({ s: ['Science & Technology'], t: '<img src=x onerror=alert(1)>', e: "&#39;);alert(1)//" });
    ctx.assertEqual(out.s[0], 'Science & Technology');
    ctx.assert(!out.t.includes('<') && !out.t.includes('>'));
    ctx.assert(!out.e.includes("&#39;"), 'entities must not survive as live entities');
  },

  'TC-XSS-04: Reflected ?email= in the parent portal is HTML-escaped': async (ctx) => {
    const res = await ctx.api('/parent/portal?email=' + encodeURIComponent('"><script>alert(1)</script>'));
    ctx.assertEqual(res.status, 200);
    const html = typeof res.data === 'string' ? res.data : res.text;
    ctx.assert(!html.includes('"><script>alert(1)</script>'), 'raw payload must not appear in the page');
  },

  'TC-XSS-05: Every inline script in the rendered portals parses (one syntax error would break the whole page)': async (ctx) => {
    for (const route of ['/parent/portal', '/teacher/portal', '/admin', '/index.html']) {
      const res = await ctx.api(route);
      const html = typeof res.data === 'string' ? res.data : res.text;
      ctx.assert(html && html.length > 1000, `${route} must render`);
      inlineScripts(html).forEach((code, i) => {
        try { new vm.Script(code); } catch (e) { throw new Error(`${route}: inline script #${i + 1} has a syntax error: ${e.message}`); }
      });
    }
  },

  'TC-XSS-06: Student app loads its Space Engine in its own script (not inside the KaTeX tag)': async (ctx) => {
    const html = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'index.html'), 'utf8');
    const bad = [...html.matchAll(/<script[^>]*\ssrc=[^>]*>([\s\S]*?)<\/script>/g)].filter(x => x[1].trim() !== '');
    ctx.assertEqual(bad.length, 0, 'a <script src> tag must not contain inline code (browsers ignore it)');
    ctx.assert(html.includes('/vendor/katex/contrib/auto-render.min.js'), 'maths library must load from our own server');
    ctx.assert(inlineScripts(html).some(c => c.includes('function notifySpaceTurnActivity')), 'Space Engine must be in an executable inline script');
    ctx.assert(inlineScripts(html).some(c => c.includes('function renderSavedSpacesView')), 'My Spaces renderer must be in an executable inline script');
  },

  'TC-XSS-07: Chat renderer tolerates a missing maths library and sanitises AI-made SVG': async (ctx) => {
    const html = fs.readFileSync(path.join(__dirname, '..', '..', 'public', 'index.html'), 'utf8');
    ctx.assert(/typeof renderMathInElement === 'function'/.test(html), 'renderMathInElement must be guarded');
    ctx.assert(/function sanitizeSvgMarkup/.test(html), 'SVG sanitiser must exist');
    ctx.assert(/\$\{sanitizeSvgMarkup\(svgTokens\[i\]\)\}/.test(html), 'AI SVG must pass through the sanitiser before insertion');
    ctx.assert(/tabName === 'saved-spaces'/.test(html), 'My Spaces tab must be routed');
  },

  'TC-XSS-08: Teacher portal escapes record text and defuses CSV formulas': async (ctx) => {
    const src = fs.readFileSync(path.join(__dirname, '..', '..', 'teacherRoutes.js'), 'utf8');
    ctx.assert(src.includes('${esc(s.handle)}') || src.includes('\\${esc(s.handle)}'), 'learner names must be escaped');
    ctx.assert(src.includes('esc(m.title)'), 'mission titles must be escaped');
    ctx.assert(/\^\[=\+/.test(src), 'CSV cells starting with = + - @ must be neutralised');
  },

  'TC-XSS-09: Emails escape user-typed text': async (ctx) => {
    const src = fs.readFileSync(path.join(__dirname, '..', '..', 'emailService.js'), 'utf8');
    ctx.assert(src.includes('${esc(childHandle)}'), 'child nickname must be escaped in email HTML');
    ctx.assert(!/<strong[^>]*>\$\{childHandle\}/.test(src), 'no raw nickname inside email markup');
  }
};
