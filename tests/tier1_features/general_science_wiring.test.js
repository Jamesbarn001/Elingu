// KICD Senior School "General Science" (Grades 10-12) can be chosen and studied like the other STEM subjects.
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

module.exports = {
  'TC-GSCI-01: General Science is in the sidebar, the STEM pickers and the server lists, and hidden from Cambridge learners': async (ctx) => {
    const html = read('public/index.html');
    ctx.assert(/id="nav-general-science" data-subject="General Science"/.test(html), 'sidebar entry');
    ctx.assert(/subject === 'General Science'\) return \{ key: 'general_science'/.test(html), 'subject details');
    ctx.assert(!/const STEM_KEYS = \['physics', 'chemistry', 'biology', 'computer'\];/.test(html), 'every STEM key list includes general_science');
    ctx.assert(/cbcOnlyIds = \[[^\]]*'nav-general-science'/.test(html), 'Cambridge learners never see it');
    ctx.assert(/STEM: \[\s*\{ subject: 'Physics' \},\s*\{ subject: 'General Science' \}/.test(html), 'sign-up STEM picker offers it');
    const srv = read('server.js');
    ctx.assert(/ACTIVE_SS_SUBJECTS = \[[^\]]*'General Science'/.test(srv), 'server allow-list');
    ctx.assert(/STEM: \['Physics', 'Chemistry', 'Biology', 'General Science'/.test(srv), 'parent subject picker');
  }
};
