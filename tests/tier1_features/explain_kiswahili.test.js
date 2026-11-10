// Tier 1: on-demand "Explain in Kiswahili" (route, glossary, client file)
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const glossary = require('../../kiswahiliGlossary');

const ROOT = path.resolve(__dirname, '..', '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

module.exports = {
  'TC-EXSW-01: The route needs a learner token': async (ctx) => {
    const r = await ctx.api('/api/tutor/explain-sw', { method: 'POST', noAuth: true, body: { text: 'Add 2 and 3.' } });
    ctx.assertEqual(r.status, 401);
  },

  'TC-EXSW-02: An unverified learner is refused': async (ctx) => {
    const handle = 'Exsw' + Date.now().toString().slice(-6);
    const reg = await ctx.api('/api/students/profile', { method: 'POST', body: { handle, pin: '7351', email: `exsw${Date.now()}@example.com`, parentConsent: true, quickSignup: true, grade: 7, exploredSubject: 'Mathematics' } });
    ctx.assertEqual(reg.status, 200);
    const r = await ctx.api('/api/tutor/explain-sw', { method: 'POST', body: { studentId: reg.data.student.id, text: 'Add 2 and 3.' } });
    ctx.assert(r.status === 401 || r.status === 403, 'unverified learner must not use the translator, got ' + r.status);
  },

  'TC-EXSW-03: Text is validated (missing, empty, over 2000 characters)': async (ctx) => {
    const s = await ctx.createVerifiedStudent('Exsw');
    for (const text of [undefined, '   ', 'a'.repeat(2001), 12345]) {
      const r = await ctx.api('/api/tutor/explain-sw', { method: 'POST', body: { studentId: s.id, text } });
      ctx.assertEqual(r.status, 400, 'bad text should be 400: ' + String(text).slice(0, 20));
    }
  },

  'TC-EXSW-04: A valid request returns Kiswahili text or a friendly 503, never invented text': async (ctx) => {
    const s = await ctx.createVerifiedStudent('Exsw');
    const r = await ctx.api('/api/tutor/explain-sw', { method: 'POST', body: { studentId: s.id, text: 'The sum of 2 and 3 is 5.' } });
    ctx.assert(r.status === 200 || r.status === 503, 'status ' + r.status);
    if (r.status === 200) ctx.assert(r.data.success === true && typeof r.data.text === 'string' && r.data.text.length > 0);
    else ctx.assert(r.data.success === false && /not available/.test(r.data.error) && !r.data.text);
  },

  'TC-EXSW-05: Phone numbers never reach the model (cleaned before callLLM, which cleans again)': async (ctx) => {
    // The server runs in another process, so callLLM cannot be intercepted here; check the route wiring and the cleaner.
    const src = read('server.js');
    const i = src.indexOf("app.post('/api/tutor/explain-sw'");
    ctx.assert(i > 0, 'route exists');
    const body = src.slice(i, i + 2500);
    ctx.assert(/requireStudent\(req, res/.test(body), 'uses requireStudent');
    ctx.assert(/piiGuard\.knownFor\(student\)/.test(body) && /pii: known/.test(body), 'passes pii to callLLM');
    ctx.assert(/piiGuard\.redact\(text\.trim\(\), known\)/.test(body), 'text redacted before the call');
    const piiGuard = require('../../piiGuard');
    const out = piiGuard.redact('Call 0712 345 678 now. 2 + 3 = 5', piiGuard.knownFor({ handle: 'Amani' }));
    ctx.assert(out.indexOf('0712 345 678') === -1 && out.indexOf('2 + 3 = 5') !== -1, out);
  },

  'TC-EXSW-06: Glossary has only filled entries and keeps unconfirmed terms out': async (ctx) => {
    const keys = Object.keys(glossary.GLOSSARY);
    ctx.assert(keys.length >= 10);
    keys.forEach(k => ctx.assert(typeof glossary.GLOSSARY[k] === 'string' && glossary.GLOSSARY[k].trim() && k.trim(), 'empty entry ' + k));
    ['surd', 'conjugate', 'numerator', 'denominator'].forEach(k => ctx.assert(!(k in glossary.GLOSSARY), k + ' must stay English'));
    const p = glossary.buildTranslatorPrompt(8);
    ctx.assert(/nambari/.test(p) && /unchanged/.test(p) && /emoji/.test(p));
  },

  'TC-EXSW-07: explain.js parses and exposes attach': async (ctx) => {
    const code = read('public/explain.js');
    new vm.Script(code, { filename: 'explain.js' });
    ctx.assert(/ElinguExplain\s*=\s*\{\s*attach/.test(code));
    ctx.assert(/elingu_student_token/.test(code) && /aria-label/.test(code) && /44px/.test(code));
    ctx.assert(!/innerHTML/.test(code), 'text is set with textContent only');
  }
};
