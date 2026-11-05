// ============================================================
// Tier 1 — Feature: 100% Database-Driven Curriculum Architecture Verification
// Verifies authentic KICD CBC and Cambridge CAIE Syllabi from Relational Database:
// - KICD Grade 10 Biology (3 strands, 10 sub-strands)
// - KICD Grade 10 Computer Studies (3 strands, 17 sub-strands)
// - KICD Grade 10 Chemistry (3 strands, 8 sub-strands)
// - KICD Grade 10 Physics (4 strands, 13 sub-strands)
// - KICD Grade 10 Core Mathematics (3 strands, 11 sub-strands) & Kenyan analogies
// - KICD Grade 10 Kiswahili (Unified dual-track: 7 stations)
// - Cambridge IGCSE Computer Science 0478 (10 Dedicated Unit Stations)
// - Cambridge IGCSE Sciences (0610, 0620, 0625) & Mathematics (0580) across Y10 & Y11
// - Cambridge Lower Secondary Science (0893) & Substring collision isolation (Science vs CompSci)
// - Strict Terminology Guard: Cambridge never uses "Strand", CBE uses "Strand"
// ============================================================

const assert = require('assert');
const db = require('../../db');

module.exports = {
  'TC-DBC-01: KICD Grade 10 Biology Learn Map matches official 3 Strands & 10 Sub-strands': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=10&subject=Biology');
    assert.strictEqual(res.status, 200, 'Biology map endpoint should return HTTP 200');
    const data = res.data;
    assert.strictEqual(data.success, true);
    assert.ok(data.map, 'Must contain curriculum map');
    assert.strictEqual(data.map.curriculum, 'CBC');
    assert.strictEqual(data.map.grade, 10);
    assert.strictEqual(data.map.subject, 'Biology');

    // 3 Official Strands
    const stations = data.map.stations;
    assert.strictEqual(stations.length, 3, 'Grade 10 Biology must have exactly 3 official strands');
    assert.ok(stations[0].title.includes('Cell Biology and Biodiversity'), 'Strand 1 must be Cell Biology');
    assert.ok(stations[1].title.includes('Anatomy and Physiology of Plants'), 'Strand 2 must be Plant Anatomy');
    assert.ok(stations[2].title.includes('Anatomy and Physiology of Animals'), 'Strand 3 must be Animal Anatomy');

    // Total 10 Sub-strands (4 in Strand 1, 3 in Strand 2, 3 in Strand 3)
    assert.strictEqual(stations[0].subtopics.length, 4, 'Strand 1 must have 4 sub-strands (1.1-1.4)');
    assert.strictEqual(stations[1].subtopics.length, 3, 'Strand 2 must have 3 sub-strands (2.1-2.3)');
    assert.strictEqual(stations[2].subtopics.length, 3, 'Strand 3 must have 3 sub-strands (3.1-3.3)');

    const totalStops = stations.reduce((acc, s) => acc + s.subtopics.length, 0);
    assert.strictEqual(totalStops, 10, 'Grade 10 Biology must have exactly 10 official sub-strands');

    // Verify concept primer and relatable Kenyan context in osmosis
    const osmosisStop = stations[0].subtopics.find(st => st.title.includes('1.3'));
    assert.ok(osmosisStop, 'Sub-strand 1.3 must exist');
    assert.ok(osmosisStop.conceptPrimer.realWorldContext.includes('Mama Mboga'), 'Must feature Mama Mboga fresh water sukuma wiki analogy');
    assert.ok(osmosisStop.conceptPrimer.formula, 'Must have water potential formula');
  },

  'TC-DBC-02: KICD Grade 10 Computer Studies mirrors 3 Strands & 17 Sub-strands': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=10&subject=Computer%20Studies');
    assert.strictEqual(res.status, 200);
    const data = res.data;
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.map.curriculum, 'CBC');
    assert.strictEqual(data.map.grade, 10);

    const stations = data.map.stations;
    assert.strictEqual(stations.length, 3, 'Grade 10 Computer Studies must have 3 main strands');
    assert.ok(stations[0].title.includes('Foundation of Computer Studies'), 'Strand 1 must be Foundation of CS');
    assert.ok(stations[1].title.includes('Computer Networking'), 'Strand 2 must be Computer Networking');
    assert.ok(stations[2].title.includes('Software Development'), 'Strand 3 must be Software Development');

    // 7 in Strand 1, 4 in Strand 2, 6 in Strand 3 = 17 total
    assert.strictEqual(stations[0].subtopics.length, 7, 'Strand 1 must have 7 sub-strands (1.1-1.7)');
    assert.strictEqual(stations[1].subtopics.length, 4, 'Strand 2 must have 4 sub-strands (2.1-2.4)');
    assert.strictEqual(stations[2].subtopics.length, 6, 'Strand 3 must have 6 sub-strands (3.1-3.6)');

    const totalCSStops = stations.reduce((acc, s) => acc + s.subtopics.length, 0);
    assert.strictEqual(totalCSStops, 17, 'Grade 10 Computer Studies must have exactly 17 interactive stops');
  },

  'TC-DBC-03: KICD Grade 10 Chemistry matches 3 Strands & 8 Sub-strands': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=10&subject=Chemistry');
    assert.strictEqual(res.status, 200);
    const stations = res.data.map.stations;
    assert.strictEqual(stations.length, 3, 'Chemistry must have 3 strands');
    assert.ok(stations[0].title.includes('Inorganic Chemistry'), 'Strand 1 must be Inorganic');
    assert.ok(stations[1].title.includes('Physical Chemistry'), 'Strand 2 must be Physical');
    assert.ok(stations[2].title.includes('Organic Chemistry'), 'Strand 3 must be Organic');

    // 5 in S1, 2 in S2, 1 in S3 = 8 total
    assert.strictEqual(stations[0].subtopics.length, 5, 'Inorganic must have 5 sub-strands (1.1-1.5)');
    assert.strictEqual(stations[1].subtopics.length, 2, 'Physical must have 2 sub-strands (2.1-2.2)');
    assert.strictEqual(stations[2].subtopics.length, 1, 'Organic must have 1 sub-strand (3.1)');
    const totalChemStops = stations.reduce((acc, s) => acc + s.subtopics.length, 0);
    assert.strictEqual(totalChemStops, 8, 'Grade 10 Chemistry must have exactly 8 sub-strands');
  },

  'TC-DBC-04: KICD Grade 10 Physics matches 4 Strands & 13 Sub-strands': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=10&subject=Physics');
    assert.strictEqual(res.status, 200);
    const stations = res.data.map.stations;
    assert.strictEqual(stations.length, 4, 'Physics must have 4 strands');
    assert.ok(stations[0].title.includes('Mechanics and Thermal Physics'));
    assert.ok(stations[1].title.includes('Waves and Optics'));
    assert.ok(stations[2].title.includes('Electricity and Magnetism'));
    assert.ok(stations[3].title.includes('Environmental and Space Physics'));

    // 6 in S1, 2 in S2, 3 in S3, 2 in S4 = 13 total
    assert.strictEqual(stations[0].subtopics.length, 6, 'Mechanics must have 6 sub-strands (1.1-1.6)');
    assert.strictEqual(stations[1].subtopics.length, 2, 'Waves must have 2 sub-strands (2.1-2.2)');
    assert.strictEqual(stations[2].subtopics.length, 3, 'Electricity must have 3 sub-strands (3.1-3.3)');
    assert.strictEqual(stations[3].subtopics.length, 2, 'Space must have 2 sub-strands (4.1-4.2)');
    const totalPhyStops = stations.reduce((acc, s) => acc + s.subtopics.length, 0);
    assert.strictEqual(totalPhyStops, 13, 'Grade 10 Physics must have exactly 13 sub-strands');
  },

  'TC-DBC-05: KICD Grade 10 Core Mathematics & Kenyan everyday analogies': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=10&subject=Mathematics');
    assert.strictEqual(res.status, 200);
    const stations = res.data.map.stations;
    assert.strictEqual(stations.length, 3, 'Mathematics must have 3 strands');
    assert.ok(stations[0].title.includes('Numbers and Algebra'));
    assert.ok(stations[1].title.includes('Measurements and Geometry'));
    assert.ok(stations[2].title.includes('Statistics and Probability'));

    // Verify Grade 8 Directed Numbers Lake Victoria Diver analogy
    const resG8 = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=8&subject=Mathematics');
    const s1G8 = resG8.data.map.stations[0];
    const primerStr = JSON.stringify(s1G8);
    assert.ok(primerStr.includes('Lake Victoria') || primerStr.includes('diver') || primerStr.includes('Mama Mboga'), 'Must contain relatable Kenyan analogy');
  },

  'TC-DBC-06: KICD Grade 10 Kiswahili unified dual-track (7 stations)': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=10&subject=Kiswahili');
    assert.strictEqual(res.status, 200);
    const stations = res.data.map.stations;
    assert.strictEqual(stations.length, 7, 'Grade 10 Kiswahili must have 7 unified dual-track stations');

    // Verify both Lugha and Fasihi tracks are present
    const lugha = stations.filter(s => s.title.includes('Lugha'));
    const fasihi = stations.filter(s => s.title.includes('Fasihi'));
    assert.strictEqual(lugha.length, 4, 'Must have 4 Kiswahili Lugha stations (Kusikiliza, Kusoma, Kuandika, Sarufi)');
    assert.strictEqual(fasihi.length, 3, 'Must have 3 Fasihi ya Kiswahili stations (Simulizi, Ushairi, Bunilizi)');
  },

  'TC-DBC-07: Cambridge IGCSE Computer Science (0478) has 10 Dedicated Unit Stations': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=BRITISH&grade=10&subject=Computer%20Science');
    assert.strictEqual(res.status, 200);
    const data = res.data;
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.map.curriculum, 'BRITISH');
    assert.strictEqual(data.map.grade, 10);
    assert.strictEqual(data.map.stations.length, 10, 'Cambridge CS must have exactly 10 dedicated unit stations');

    const expectedTitles = [
      'Data Representation',
      'Data Transmission',
      'Hardware',
      'Software',
      'The Internet and its Uses',
      'Automated and Emerging Technologies',
      'Algorithm Design and Problem-Solving',
      'Programming',
      'Databases',
      'Boolean Logic'
    ];

    expectedTitles.forEach((title, idx) => {
      assert.ok(data.map.stations[idx].title.includes(title), `Station ${idx + 1} must include ${title}`);
    });
  },

  'TC-DBC-08: Cambridge IGCSE Sciences & Mathematics phased across Year 10 & Year 11': async (ctx) => {
    // 1. Year 10 Physics
    const phy10 = await ctx.api('/api/curriculum/map?curriculum=BRITISH&grade=10&subject=Physics');
    assert.strictEqual(phy10.status, 200);
    assert.ok(phy10.data.map.stations.length >= 3);
    const termVel = phy10.data.map.stations[0].subtopics.find(st => st.id === 'cie_y10_phy_s1_1');
    assert.ok(termVel, 'Must contain terminal velocity subtopic cie_y10_phy_s1_1');

    // 2. Year 11 Physics
    const phy11 = await ctx.api('/api/curriculum/map?curriculum=BRITISH&grade=11&subject=Physics');
    assert.strictEqual(phy11.status, 200);
    assert.ok(phy11.data.map.stations.length >= 2);

    // 3. Year 10 Chemistry Mole Concept
    const chem10 = await ctx.api('/api/curriculum/map?curriculum=BRITISH&grade=10&subject=Chemistry');
    assert.strictEqual(chem10.status, 200);
    const mole = chem10.data.map.stations[0].subtopics.find(st => st.id === 'cie_y10_chem_s1_1');
    assert.ok(mole, 'Must contain mole concept subtopic cie_y10_chem_s1_1');

    // 4. Year 10 Mathematics 0580 Surds & Quadratics
    const math10 = await ctx.api('/api/curriculum/map?curriculum=BRITISH&grade=10&subject=Mathematics');
    assert.strictEqual(math10.status, 200);
    const surds = math10.data.map.stations[0].subtopics.find(st => st.id === 'bri_y10_math_s1_1');
    assert.ok(surds, 'Must contain surds subtopic bri_y10_math_s1_1');
  },

  'TC-DBC-09: Substring Collision Isolation: Querying Science in British returns Science not CS': async (ctx) => {
    // Querying 'Science' in British Year 8 must return Lower Secondary Science (0893), NEVER Computer Science!
    const res = await ctx.api('/api/curriculum/map?curriculum=BRITISH&grade=8&subject=Science');
    assert.strictEqual(res.status, 200);
    const data = res.data;
    assert.strictEqual(data.map.subject, 'Science', 'Subject must be Science, not Computer Science');
    assert.ok(!data.map.title.includes('Computer Science'), 'Title must not include Computer Science');
    assert.ok(data.map.stations.length >= 3, 'Must have Stage 8 Science stations');

    // Verify content areas
    assert.ok(data.map.stations.some(s => s.strand.includes('Biology')), 'Must have Biology content area');
    assert.ok(data.map.stations.some(s => s.strand.includes('Chemistry')), 'Must have Chemistry content area');
    assert.ok(data.map.stations.some(s => s.strand.includes('Physics')), 'Must have Physics content area');
  },

  'TC-DBC-10: Strict Terminology Guard: Cambridge never uses Strand; CBC strictly uses Strand': async (ctx) => {
    // 1. Inspect Cambridge maps
    const cambridgeSubjects = [
      { grade: 10, subj: 'Computer Science' },
      { grade: 10, subj: 'Physics' },
      { grade: 10, subj: 'Chemistry' },
      { grade: 10, subj: 'Biology' },
      { grade: 10, subj: 'Mathematics' },
      { grade: 8, subj: 'Science' }
    ];

    for (const item of cambridgeSubjects) {
      const res = await ctx.api(`/api/curriculum/map?curriculum=BRITISH&grade=${item.grade}&subject=${encodeURIComponent(item.subj)}`);
      assert.strictEqual(res.status, 200);
      for (const st of res.data.map.stations) {
        assert.ok(!st.strand.includes('Strand'), `Cambridge ${item.subj} station '${st.strand}' must NEVER contain 'Strand'`);
        assert.ok(
          st.strand.includes('Unit') || st.strand.includes('Topic') || st.strand.includes('Content Area'),
          `Cambridge station '${st.strand}' must use Unit, Topic, or Content Area`
        );
      }
    }

    // 2. Inspect CBC maps
    const cbcSubjects = [
      { grade: 10, subj: 'Biology' },
      { grade: 10, subj: 'Computer Studies' },
      { grade: 10, subj: 'Physics' },
      { grade: 8, subj: 'Mathematics' }
    ];

    for (const item of cbcSubjects) {
      const res = await ctx.api(`/api/curriculum/map?curriculum=CBC&grade=${item.grade}&subject=${encodeURIComponent(item.subj)}`);
      assert.strictEqual(res.status, 200);
      for (const st of res.data.map.stations) {
        assert.ok(st.strand.includes('Strand'), `CBC station '${st.strand}' must use 'Strand'`);
      }
    }
  },

  'TC-DBC-11: 100% Database-Driven: Relational tables contain all authoritative records': async (ctx) => {
    // Query direct database tables
    const curriculaRes = await db.query('SELECT COUNT(*) AS cnt FROM curricula');
    assert.ok(Number(curriculaRes.rows[0].cnt) >= 2, 'Must have at least CBC and BRITISH in curricula table');

    const subjectsRes = await db.query('SELECT COUNT(*) AS cnt FROM curriculum_subjects');
    assert.ok(Number(subjectsRes.rows[0].cnt) >= 50, 'Must have 50+ subjects in curriculum_subjects table');

    const strandsRes = await db.query('SELECT COUNT(*) AS cnt FROM learning_strands');
    assert.ok(Number(strandsRes.rows[0].cnt) >= 150, 'Must have 150+ strands in learning_strands table');

    const subStrandsRes = await db.query('SELECT COUNT(*) AS cnt FROM sub_strands');
    assert.ok(Number(subStrandsRes.rows[0].cnt) >= 200, 'Must have 200+ sub_strands in sub_strands table');
  },

  'TC-DBC-12: KICD Grade 10 English official match: 4 Strands & 19 Sub-strands': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=10&subject=English');
    assert.strictEqual(res.status, 200, 'English map endpoint should return HTTP 200');
    const data = res.data;
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.map.curriculum, 'CBC');
    assert.strictEqual(data.map.grade, 10);
    assert.strictEqual(data.map.subject, 'English');

    const stations = data.map.stations;
    assert.strictEqual(stations.length, 4, 'Grade 10 English must have exactly 4 strands');
    assert.ok(stations[0].title.includes('Listening and Speaking'), 'Strand 1 must be Listening and Speaking');
    assert.ok(stations[1].title.includes('Reading'), 'Strand 2 must be Reading');
    assert.ok(stations[2].title.includes('Grammar in Use'), 'Strand 3 must be Grammar in Use');
    assert.ok(stations[3].title.includes('Writing'), 'Strand 4 must be Writing');

    assert.strictEqual(stations[0].subtopics.length, 5, 'Listening & Speaking must have 5 sub-strands (1.1-1.5)');
    assert.strictEqual(stations[1].subtopics.length, 5, 'Reading must have 5 sub-strands (2.1-2.5)');
    assert.strictEqual(stations[2].subtopics.length, 4, 'Grammar in Use must have 4 sub-strands (3.1-3.4)');
    assert.strictEqual(stations[3].subtopics.length, 5, 'Writing must have 5 sub-strands (4.1-4.5)');

    const totalEngStops = stations.reduce((acc, s) => acc + s.subtopics.length, 0);
    assert.strictEqual(totalEngStops, 19, 'Grade 10 English must have exactly 19 official sub-strands');
  },

  'TC-DBC-13: Curriculum alias routing: IGCSE & CAIE route to British Cambridge syllabus': async (ctx) => {
    // Calling with curriculum='IGCSE' should retrieve Cambridge, NEVER CBC!
    const res = await ctx.api('/api/curriculum/map?curriculum=IGCSE&grade=10&subject=Biology');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.data.map.curriculum, 'BRITISH', 'IGCSE alias must map to BRITISH');
    assert.ok(res.data.map.title.includes('Cambridge'), 'Title must be Cambridge');
    for (const st of res.data.map.stations) {
      assert.ok(!st.strand.includes('Strand'), 'Cambridge must never use Strand');
    }
  },

  'TC-DBC-14: Grade string normalization: Year 10 and Grade 10 resolve accurately': async (ctx) => {
    const resBri = await ctx.api('/api/curriculum/map?curriculum=BRITISH&grade=Year%2010&subject=Physics');
    assert.strictEqual(resBri.status, 200);
    assert.strictEqual(resBri.data.map.grade, 10);
    assert.ok(resBri.data.map.stations.length > 0);

    const resCBC = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=Grade%2010&subject=Chemistry');
    assert.strictEqual(resCBC.status, 200);
    assert.strictEqual(resCBC.data.map.grade, 10);
    assert.ok(resCBC.data.map.stations.length > 0);
  }
};
