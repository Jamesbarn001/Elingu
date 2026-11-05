// ══════════════════════════════════════════════════════════════
// ELINGU CURRICULUM & ASSESSMENT DATABASE SEEDER
// Populates normalized relational tables with verified KICD & CAIE content
// Pure database seeder: Zero circular dependencies with curriculumMapService
// ══════════════════════════════════════════════════════════════

const db = require('./client');
const curriculumRepo = require('./repositories/curriculumRepository');
const revisionRepo = require('./repositories/revisionRepository');
const { ALL_CURRICULUM_SEEDS } = require('./seeds');
const examRevisionService = require('../examRevisionService');

async function seed() {
  console.log('🌱 Starting Elingu Relational Curriculum & Assessment Seeding...\n');

  // 1. Initialize schema
  await db.initSchema();
  try {
    await db.query(`ALTER TABLE learning_strands ADD COLUMN strand_label VARCHAR(255);`);
  } catch (e) { /* Column may already exist */ }
  try {
    await db.query(`ALTER TABLE learning_strands ADD COLUMN icon VARCHAR(32) DEFAULT '📚';`);
  } catch (e) { /* Column may already exist */ }
  try {
    await db.query(`ALTER TABLE learning_strands ADD COLUMN status VARCHAR(32) DEFAULT 'available';`);
  } catch (e) { /* Column may already exist */ }

  console.log('✅ Relational schema verified.');

  // 2. Curricula (Strict Boundary Definition)
  await curriculumRepo.upsertCurriculum({
    id: 'CBC',
    name: 'Competency-Based Education (Kenya)',
    governingBody: 'KICD / KNEC',
    gradingScale: '4-Level Competency (EE, ME, AE, BE)'
  });

  await curriculumRepo.upsertCurriculum({
    id: 'BRITISH',
    name: 'Cambridge Assessment International Education',
    governingBody: 'CAIE',
    gradingScale: 'Letter Grades (A*-G / 9-1)'
  });
  console.log('✅ Curricula boundaries created (CBC, BRITISH).');

  // 3. Grades & Year Groups
  const grades = [
    // CBC Spectrum (Grades 6-12)
    { id: 'cbc_g6', curriculumId: 'CBC', stageTier: 'UPPER_PRIMARY', code: '6', displayTitle: 'Grade 6 (Upper Primary)', orderIndex: 1 },
    { id: 'cbc_g7', curriculumId: 'CBC', stageTier: 'JSS', code: '7', displayTitle: 'Grade 7 (Junior School)', orderIndex: 2 },
    { id: 'cbc_g8', curriculumId: 'CBC', stageTier: 'JSS', code: '8', displayTitle: 'Grade 8 (Junior School)', orderIndex: 3 },
    { id: 'cbc_g9', curriculumId: 'CBC', stageTier: 'JSS', code: '9', displayTitle: 'Grade 9 (Junior School Capstone)', orderIndex: 4 },
    { id: 'cbc_g10', curriculumId: 'CBC', stageTier: 'SENIOR_SCHOOL', code: '10', displayTitle: 'Grade 10 (Senior STEM)', orderIndex: 5 },
    { id: 'cbc_g11', curriculumId: 'CBC', stageTier: 'SENIOR_SCHOOL', code: '11', displayTitle: 'Grade 11 (Senior STEM)', orderIndex: 6 },
    { id: 'cbc_g12', curriculumId: 'CBC', stageTier: 'SENIOR_SCHOOL', code: '12', displayTitle: 'Grade 12 (Senior STEM KSSEA)', orderIndex: 7 },

    // British Spectrum (Years 7-11)
    { id: 'cie_y7', curriculumId: 'BRITISH', stageTier: 'CHECKPOINT', code: '7', displayTitle: 'Year 7 (Checkpoint Stage 7)', orderIndex: 10 },
    { id: 'cie_y8', curriculumId: 'BRITISH', stageTier: 'CHECKPOINT', code: '8', displayTitle: 'Year 8 (Checkpoint Stage 8)', orderIndex: 11 },
    { id: 'cie_y9', curriculumId: 'BRITISH', stageTier: 'CHECKPOINT', code: '9', displayTitle: 'Year 9 (Checkpoint Stage 9)', orderIndex: 12 },
    { id: 'cie_y10', curriculumId: 'BRITISH', stageTier: 'IGCSE', code: '10', displayTitle: 'Year 10 (IGCSE Extended)', orderIndex: 13 },
    { id: 'cie_y11', curriculumId: 'BRITISH', stageTier: 'IGCSE', code: '11', displayTitle: 'Year 11 (IGCSE Extended)', orderIndex: 14 }
  ];

  for (const g of grades) {
    await curriculumRepo.upsertGrade(g);
  }
  console.log(`✅ ${grades.length} Grades & Year Groups registered.`);

  // 4. Seed Declarative Curriculum Maps from db/seeds
  let seededSubjects = 0;
  let seededStrands = 0;
  let seededStops = 0;

  for (const item of ALL_CURRICULUM_SEEDS) {
    const gr = item.grade;
    const curr = (item.curriculum || 'CBC').toUpperCase() === 'BRITISH' ? 'BRITISH' : 'CBC';
    const subj = item.subject;
    const gradeId = curr === 'CBC' ? `cbc_g${gr}` : `cie_y${gr}`;
    const subjId = item.subjectId || `${gradeId}_${subj.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

    await curriculumRepo.upsertSubject({
      id: subjId,
      gradeId,
      name: subj,
      code: item.code || (curr === 'BRITISH' && subj === 'Mathematics' && gr >= 10 ? '0580' : null),
      isElective: item.isElective || 0,
      trackPathway: item.trackPathway || (gr >= 10 && curr === 'CBC' ? 'STEM' : (gr >= 10 ? 'IGCSE' : 'Core'))
    });
    seededSubjects++;

    const stations = item.stations || [];
    for (let sIdx = 0; sIdx < stations.length; sIdx++) {
      const st = stations[sIdx];
      const strandId = st.id || `${subjId}_st${st.number || (sIdx + 1)}`;
      const strandLabel = st.strand || (curr === 'BRITISH' ? `Topic ${st.number || (sIdx + 1)}` : `Strand ${st.number || (sIdx + 1)}`);

      await curriculumRepo.upsertStrand({
        id: strandId,
        subjectId: subjId,
        strandNumber: st.number || (sIdx + 1),
        title: st.title,
        strandLabel,
        icon: st.icon || '📚',
        status: st.status || 'available',
        description: st.summary || '',
        orderIndex: sIdx + 1
      });
      seededStrands++;

      const subtopics = st.subtopics || [];
      for (let stopIdx = 0; stopIdx < subtopics.length; stopIdx++) {
        const stop = subtopics[stopIdx];
        await curriculumRepo.upsertSubStrand({
          id: stop.id,
          strandId,
          subtopicTitle: stop.title,
          conceptPrimer: stop.conceptPrimer || {},
          socraticInquiryPrompt: stop.socraticPrompt || '',
          formulaHint: stop.formulaBadge || stop.conceptPrimer?.formula || null,
          examFocus: stop.examFocus || null,
          status: stop.status || 'available',
          orderIndex: stopIdx + 1
        });
        seededStops++;
      }
    }
  }

  console.log(`✅ Seeded ${seededSubjects} Subjects, ${seededStrands} Learning Strands/Topics, and ${seededStops} Sub-Strands/Stops.`);

  // 5. Seed Assessment Papers & Questions from examRevisionService
  const papers = examRevisionService.REVISION_PAPERS;
  let seededQuestions = 0;

  for (const p of papers) {
    const gradeId = p.curriculum.toUpperCase() === 'CBC' ? `cbc_g${p.grade}` : `cie_y${p.grade}`;
    await revisionRepo.upsertPaper({
      id: p.id,
      curriculumId: p.curriculum.toUpperCase(),
      gradeId,
      subjectName: p.subject,
      examBoard: p.examBoard,
      paperCode: p.paperCode,
      series: p.series,
      title: p.title,
      durationMinutes: p.durationMinutes,
      totalMarks: p.totalMarks,
      calculatorAllowed: p.calculatorAllowed
    });

    for (let qIdx = 0; qIdx < (p.questions || []).length; qIdx++) {
      const q = p.questions[qIdx];
      await revisionRepo.upsertQuestion({
        id: q.id,
        paperId: p.id,
        number: q.number,
        topic: q.topic,
        marks: q.marks,
        stem: q.stem,
        formulaHint: q.formulaHint || null,
        rubricMarks: q.rubricMarks || q.markBreakdown || [],
        examinerPitfalls: q.examinerPitfalls || q.examinerNotes || [],
        modelAnswer: q.modelAnswer,
        orderIndex: qIdx + 1
      });
      seededQuestions++;
    }
  }
  console.log(`✅ Seeded ${papers.length} Past Papers and ${seededQuestions} Question Rubrics.`);

  console.log('\n🎉 Curriculum & Assessment Database Migration & Seeding Complete!');
  return { seededSubjects, seededStrands, seededStops, seededPapers: papers.length, seededQuestions };
}

if (require.main === module) {
  seed().then(() => {
    process.exit(0);
  }).catch(err => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
}

module.exports = { seed };
