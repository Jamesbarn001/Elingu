#!/usr/bin/env node
// scripts/exam_papers.js — look after the practice papers that live in the database.
//
//   node scripts/exam_papers.js list                       every paper: id, status, who last wrote it, number of questions
//   node scripts/exam_papers.js export <paper-id> > p.json write one paper (questions, answers, mark scheme) as JSON
//   node scripts/exam_papers.js import p.json [--draft]    add or replace a paper from JSON (checked first; --draft keeps it hidden)
//   node scripts/exam_papers.js publish <paper-id>         show a paper to learners
//   node scripts/exam_papers.js hide <paper-id>            stop showing a paper (it is kept)
//   node scripts/exam_papers.js reseed [--force]           copy built-in papers that are missing; --force also resets seed copies
//
// It talks to whichever database your environment points at (DATABASE_URL in .env means the live one, otherwise a local file).
// A running app reads papers when it starts, so restart it afterwards, or use the admin "reload" call.
//
// A paper that fails the self-check (every sample answer must earn full marks, a blank must earn nothing, marks must add up)
// is refused on import and is never served.

require('dotenv').config();
const fs = require('fs');
const bank = require('../examBank');
const db = require('../db');

async function main() {
  const [cmd, arg] = process.argv.slice(2);
  const flags = new Set(process.argv.slice(2).filter(a => a.startsWith('--')));
  await db.initSchema();

  if (cmd === 'list') {
    const rows = await bank.list();
    rows.forEach(r => console.log(`${String(r.status).padEnd(10)} ${String(r.source).padEnd(9)} ${String(r.curriculum).padEnd(7)} ${String(r.subject).padEnd(20)} ${String(r.questions).padStart(3)} q  ${r.id}`));
    console.log(`\n${rows.length} papers`);
  } else if (cmd === 'export' && arg) {
    const paper = await bank.getPaperFromDb(arg);
    if (!paper) { console.error('No such paper: ' + arg); process.exit(1); }
    process.stdout.write(JSON.stringify(paper, null, 2) + '\n');
  } else if (cmd === 'import' && arg) {
    const paper = JSON.parse(fs.readFileSync(arg, 'utf8'));
    const problems = bank.validatePaper(paper);
    if (problems.length) {
      console.error('This paper did not pass the self-check, so nothing was saved:');
      problems.forEach(p => console.error('  - ' + p));
      process.exit(2);
    }
    await bank.savePaper(paper, { source: 'imported', status: flags.has('--draft') ? 'draft' : 'published' });
    console.log(`Saved ${paper.id} (${paper.questions.length} questions, ${flags.has('--draft') ? 'hidden draft' : 'published'}).`);
  } else if ((cmd === 'publish' || cmd === 'hide') && arg) {
    const ok = await bank.setStatus(arg, cmd === 'publish' ? 'published' : 'draft');
    console.log(ok ? `${arg} is now ${cmd === 'publish' ? 'published' : 'hidden'}.` : 'No such paper: ' + arg);
  } else if (cmd === 'reseed') {
    console.log(await bank.seed({ force: flags.has('--force') }));
  } else {
    console.log(fs.readFileSync(__filename, 'utf8').split('\n').slice(1, 14).map(l => l.replace(/^\/\/ ?/, '')).join('\n'));
  }
  await db.close();
}

main().catch(err => { console.error(err.message); process.exit(1); });
