// Registry of Elingu practice papers. Add a new paper file, require it here, and the tests will check it automatically.
const papers = [
  // CBC: Upper Primary (KPSEA style)
  require('./cbc_g6_maths'),
  // CBC: Junior School (KJSEA style)
  require('./cbc_g8_maths'),
  require('./cbc_g8_maths_set2'),
  require('./cbc_g8_science'),
  require('./cbc_g8_english'),
  require('./cbc_g8_kiswahili'),
  require('./cbc_g8_social'),
  // CBC: Senior School
  require('./cbc_g10_maths'),
  require('./cbc_g10_physics'),
  require('./cbc_g10_chemistry'),
  require('./cbc_g10_biology'),
  // Cambridge IGCSE (Year 10 and 11)
  require('./igcse_y10_maths'),
  require('./igcse_y10_maths_set2'),
  require('./igcse_y10_physics'),
  require('./igcse_y10_chemistry'),
  require('./igcse_y10_biology'),
  require('./igcse_y10_cs')
];

const ids = new Set();
for (const p of papers) {
  if (ids.has(p.id)) throw new Error('Duplicate paper id: ' + p.id);
  ids.add(p.id);
}

const byId = new Map(papers.map(p => [p.id, p]));

module.exports = { papers, byId };
