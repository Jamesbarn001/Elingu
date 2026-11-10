// The lesson view shows the "Start from the basics" ladder safely.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const html = fs.readFileSync(path.join(ROOT, 'public', 'index.html'), 'utf8');

module.exports = {
  'TC-LADV-01: The lesson view renders the ladder, escapes every value, and falls back to the old steps when there is none': async (ctx) => {
    const fn = html.slice(html.indexOf('function renderLadderHtml'), html.indexOf('function renderSplitStudioCockpit'));
    ctx.assert(fn.length > 500, 'renderLadderHtml exists');
    ctx.assert(/const e = escapeHtml;/.test(fn), 'values are escaped');
    ctx.assert(!/\.answer|acceptable|ifWrongHint/.test(fn), 'the view never reads answers or hints');
    ctx.assert(/renderLadderHtml\(data\.ladder\)/.test(html), 'the lesson view calls it with the API ladder');
    ctx.assert(/hasSteps && !\(data\.ladder && data\.ladder\.newIdea\)/.test(html), 'lessons without a ladder keep the old step list');
    ctx.assert(/<details/.test(fn) && /<summary/.test(fn), 'sections open and close without script');
  }
};
