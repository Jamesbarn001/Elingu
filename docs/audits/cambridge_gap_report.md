# Cambridge (CAIE) seed gap report

Audited: `db/seeds/british_caie_seed.js` (curriculum `BRITISH`, Years 7-11) against public Cambridge syllabuses.
Date: 2026-11-09. Read-only audit; nothing else in the repo was changed.

Method note: seed comparison is at topic-title level (the `title` and `strand` fields of each seeded node). Sub-topic (`subtopics[]`) depth was NOT compared line by line, so "covered" means "a seeded topic addresses this syllabus topic area", not "every learning objective is present".

## 1. What the seeds contain

| Subject (code) | Year | Seeded topics (title) |
|---|---|---|
| Chemistry 0620 | 10 | 1.0 Stoichiometry & Mole; 2.0 Atoms, Elements & Bonding; 3.0 Energetics & Reaction Rates |
| Chemistry 0620 | 11 | 4.0 Acids, Bases, Salts & Redox; 5.0 Organic Chemistry & Polymers |
| Physics 0625 | 10 | 1.0 Motion, Forces & Energy; 2.0 Thermal Physics; 3.0 Waves and Light |
| Physics 0625 | 11 | 4.0 Electricity & Magnetism; 5.0 Nuclear & Space Physics |
| Biology 0610 | 10 | 1.0 Plant Nutrition & Photosynthesis; 2.0 Cell Physiology (osmosis, diffusion, active transport); 3.0 Biological Molecules & Enzymes |
| Biology 0610 | 11 | 4.0 Human Physiology (circulation, heart); 5.0 Genetics & Inheritance (monohybrid, meiosis) |
| Mathematics 0580 | 10 | 1.0 Number Theory & Surds; 2.0 Algebra & Functions; 3.0 Coordinate Geometry & Circle Theorems |
| Mathematics 0580 | 11 | 4.0 Mensuration; 5.0 3D Trig & Vector Geometry; 6.0 Transformation Matrices & Vector Columns; 7.0 Probability & Cumulative Frequency |
| Computer Science 0478 | 10 | 10 units, 1.0 Data Representation to 10.0 Boolean Logic (no Year 11 node) |
| Mathematics 0862 (Checkpoint) | 7 / 8 / 9 | 3 topics each (Number, Algebra, Geometry & Measure) |
| Science 0893 (Checkpoint) | 7 / 8 / 9 | 3 topics each (Biology, Chemistry, Physics Content Areas) |
| English 0861 (Checkpoint) | 7 / 8 / 9 | 2 topics each (Reading, Writing) |

Not seeded at all: IGCSE English First Language 0500, English Second Language 0510 (no English node for Years 10-11).

## 2. Summary table: syllabus x year

Syllabus topic counts are the numbered top-level topics in the Cambridge subject content. Seeded count = seeded Y10 + Y11 nodes. Status: OK = syllabus topic list fully mapped; GAP = topics missing; UNVERIFIED = could not read the syllabus.

| Syllabus | Version read | Syllabus topics | Seeded Y10 | Seeded Y11 | Status |
|---|---|---|---|---|---|
| Chemistry 0620 | 2026-2028 | 12 | 3 | 2 | GAP: about 7 of 12 topics have no seeded node |
| Physics 0625 | 2026-2028 | 6 | 3 | 2 | Partial: all 6 areas touched (5 and 6 merged in one node); depth unchecked, 2-3 topics per year is thin |
| Biology 0610 | 2026-2028 | 21 | 3 | 2 | GAP: about 15 of 21 topics have no seeded node |
| Mathematics 0580 | 2025-2027 | 9 | 3 | 4 | Partial: 7 nodes cover roughly 7 of 9 areas; Number, Algebra, Statistics are thin; includes out-of-syllabus matrices (see below) |
| Computer Science 0478 | 2026-2028 | 10 | 10 | 0 | OK at topic level (10 of 10 match); all in Year 10, nothing for Year 11 |
| English First Language 0500 | not read | unknown | 0 | 0 | UNVERIFIED and not seeded |
| English Second Language 0510 | not read | unknown | 0 | 0 | UNVERIFIED and not seeded |
| Lower Secondary Maths 0862, Stages 7-9 | page only | 3 strands | 3/3/3 | n/a | UNVERIFIED at stage-topic level |
| Lower Secondary Science 0893, Stages 7-9 | page only | 6 strands | 3/3/3 | n/a | UNVERIFIED at stage-topic level |
| Lower Secondary English 0861, Stages 7-9 | page only | 4 skill areas | 2/2/2 | n/a | UNVERIFIED at stage-topic level |

## 3. Per-syllabus missing topics

Syllabus headings below are quoted from the Cambridge syllabus PDFs (see Sources).

### Chemistry 0620 (12 topics)
Seeded coverage: 2 Atoms/elements/compounds (seed 2.0), 3 Stoichiometry (seed 1.0), 5 Chemical energetics and 6.2 Rate of reaction (seed 3.0), 6.4 Redox and 7 Acids, bases and salts (seed 4.0), 11 Organic chemistry (seed 5.0).
Missing:
- 1 States of matter (1.1 Solids, liquids and gases; 1.2 Diffusion)
- 4 Electrochemistry (4.1 Electrolysis; 4.2 Hydrogen)
- 6.1 Physical and chemical changes; 6.3 Reversible reactions and equilibrium
- 8 The Periodic Table (8.1 to 8.5: arrangement, Group I, Group VII, transition elements, noble gases)
- 9 Metals (9.1 to 9.6: properties, uses, alloys, reactivity series, corrosion, extraction)
- 10 Chemistry of the environment (10.1 Water, 10.2 Fertilisers, 10.3 Air quality and climate)
- 12 Experimental techniques and chemical analysis (12.1 to 12.5: experimental design, acid-base titration, chromatography, separation and purification, identification of ions and gases)
- Within 11: check 11.3 Fuels, 11.7 Carboxylic acids at sub-topic level (not compared)

### Physics 0625 (6 topics)
Topics: 1 Motion, forces and energy (1.1-1.8); 2 Thermal physics (2.1-2.3); 3 Waves (3.1 General properties, 3.2 Light, 3.3 Electromagnetic spectrum, 3.4 Sound); 4 Electricity and magnetism (4.1-4.5); 5 Nuclear physics (5.1-5.2); 6 Space physics (6.1-6.2).
All six areas have a seeded node, so no whole topic is missing. Risks to check at sub-topic level: 1.4 Density, 1.8 Pressure, 3.3 Electromagnetic spectrum, 4.4 Electrical safety, and 6 Space physics being merged into Nuclear. Seed 3.0 is titled "Waves and Light" and may not cover 3.3 and 3.4 fully (not verified).

### Biology 0610 (21 topics)
Seeded coverage: 3 Movement into and out of cells (seed 2.0), 4 Biological molecules and 5 Enzymes (seed 3.0), 6 Plant nutrition (seed 1.0), 9 Transport in animals (seed 4.0), 17 Inheritance (seed 5.0).
Missing (16): 1 Characteristics and classification of living organisms; 2 Organisation of the organism (cell structure, size of specimens); 7 Human nutrition; 8 Transport in plants; 10 Diseases and immunity; 11 Gas exchange in humans; 12 Respiration; 13 Excretion in humans; 14 Coordination and response; 15 Drugs; 16 Reproduction; 18 Variation and selection; 19 Organisms and their environment; 20 Human influences on ecosystems; 21 Biotechnology and genetic modification. (Topic 17 mitosis and 17.1 chromosomes/genes/proteins: check whether seed 5.0 covers them.)

### Mathematics 0580 (9 topics, Core and Extended)
Topics: 1 Number; 2 Algebra and graphs; 3 Coordinate geometry; 4 Geometry; 5 Mensuration; 6 Trigonometry; 7 Transformations and vectors; 8 Probability; 9 Statistics.
Seeded coverage: 1 (partly: only surds and number theory), 2 (partly), 3, 4 (circle theorems), 5, 6, 7 (vectors), 8, 9 (cumulative frequency, histograms).
Thin or missing within topics:
- Number: ratio and proportion, rates, percentages incl. compound interest, limits of accuracy, standard form, estimation, sets, time, money, calculator use, exponential growth and decay (C1.2 to C1.17, E1.17)
- Algebra: inequalities, sequences, indices II, proportion (E2.8), algebraic fractions, differentiation (E2.12), functions (E2.13), graphs in practical situations, sketching curves
- Geometry: constructions, scale drawings, similarity, symmetry, angles (C4.2 to C4.6)
- Statistics: classifying data, averages and spread, charts, scatter diagrams (C9.1 to C9.5)
- Probability: conditional probability (E8.4)
- Out of syllabus: seed 6.0 "Transformation Matrices & Vector Column Arithmetic" teaches 2x2 matrices. The text of the 0580 2025-2027 syllabus contains no occurrence of "matri*" (grep count 0). Matrices appear to be outside 0580 for these exam years. Recommend the owner confirm and either drop, relabel as extension, or move to Additional Mathematics 0606 (0606 not read).
- The 0580 page also lists a 2028-2030 syllabus; I read 2025-2027 as the current one for 2026-2027 teaching.

### Computer Science 0478 (10 topics)
All 10 seeded units match the Cambridge units in name and order (1 Data representation to 10 Boolean logic). Only gap: all 10 are tagged Year 10; the course is a two-year course and nothing is placed in Year 11. Sub-topic depth not compared.

### English First Language 0500 and Second Language 0510
Could not verify. Pages https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-first-language-english-0500/ and https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-english-as-a-second-language-0510/ both returned HTTP 500 on two attempts (an alternate -0990 URL also 500). No syllabus PDF was read. Seeds have no IGCSE English content for Years 10-11 at all.

### Cambridge Lower Secondary (Stages 7-9)
Could not verify stage-level topics. The public subject pages (https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/mathematics, /science, /english) describe only the framework structure and did not expose the per-stage learning objectives or framework PDFs in the text retrieved (the framework is a separate document, not found on those pages). What was readable:
- Maths 0862: three strands (Number; Algebra, Geometry and Measure; Statistics and Probability), plus "thinking and working mathematically". The seeds have Number, Algebra, Geometry & Measure; Statistics and Probability is absent from Stages 7-9.
- Science 0893: six strands (Biology, Chemistry, Physics, Earth and Space, Thinking and Working Scientifically, Science in Context). Seeds have Biology, Chemistry, Physics; Earth and Space, Thinking and Working Scientifically and Science in Context are absent.
- English 0861: four skill areas (reading, writing, speaking, listening). Seeds have Reading and Writing; Speaking and Listening are absent.
Caveat on wording: Cambridge's own Lower Secondary pages use the word "strands" for these, so the "never Strand" rule applies cleanly to IGCSE but should be rechecked for Checkpoint/Lower Secondary UI labels (see section 5).

## 4. Prioritised fill-in list

1. Biology 0610: add the 15-16 missing topics (largest gap; 6 of 21 covered). Start with 1, 2, 7, 11, 12, 14, 16, 19 (high exam weight and foundations for Year 10), then 8, 10, 13, 15, 18, 20, 21.
2. Chemistry 0620: add 1 States of matter, 4 Electrochemistry, 8 Periodic Table, 9 Metals, 10 Chemistry of the environment, 12 Experimental techniques and analysis, and 6.1/6.3. Seven of twelve topics are missing.
3. Mathematics 0580: fill Number (ratio, percentages, standard form, limits of accuracy, sets), Algebra (inequalities, sequences, proportion, functions, differentiation), Geometry basics, Statistics. Resolve the matrices node against the syllabus.
4. Physics 0625: split seed 5.0 into Nuclear physics and Space physics (6.1, 6.2); audit sub-topics for 1.4, 1.8, 3.3, 3.4, 4.4.
5. English 0500 / 0510: obtain the syllabus (pages returned HTTP 500; retry later or have the owner supply the PDF), then seed. Needed for Years 10-11.
6. Computer Science 0478: decide a Year 10/Year 11 split (all 10 units are in Year 10).
7. Lower Secondary: obtain the framework document per stage; add Statistics and Probability (Maths), Earth and Space etc. (Science), Speaking and Listening (English).
8. Topic numbering: seeded `strand` labels use their own numbering (for example Chemistry "Topic 4: Energetics & Rates" is syllabus topic 5; "Topic 5: Acids, Bases & Salts" is syllabus 7; "Topic 6: Organic Chemistry" is syllabus 11; Maths "Topic 4: Mensuration" is syllabus 5). Learners comparing with Cambridge documents will see mismatched numbers. Align numbering to the syllabus when filling gaps. Also Chemistry Y10 order is Topic 3 before Topic 2 in the file (lines 465, 494).

## 5. Naming and label findings (not changed)

Rules applied: Cambridge UI uses Unit/Topic/Content Area, never Strand; 0478 is Computer Science; Years 10-11 shown as "Cambridge IGCSE", Years 7-9 as "Cambridge Lower Secondary / Checkpoint".

### 5a. Learner-facing "British" wording
| File:line | Current | Suggested |
|---|---|---|
| public/index.html:6706 | `🇬🇧 British (IGCSE)` (sign-up curriculum button) | `Cambridge (IGCSE & Lower Secondary)` |
| public/index.html:12229 | `Year ${grade} • British IGCSE` | `Year ${grade} • Cambridge IGCSE` for 10-11, `Year ${grade} • Cambridge Lower Secondary` for 7-9 |
| public/i18n.js:219 | `🇬🇧 British (IGCSE)` (+ Swahili) | match 6706 |
| public/i18n.js:416 | `British International (IGCSE) curriculum` | `Cambridge IGCSE curriculum` |
| public/i18n.js:603, 606, 608, 729 | `British / IGCSE Family Pack`, `British learners` | `Cambridge Family Pack` / `Cambridge learners`; keys in server.js must be changed in step |
| public/i18n.js:1015 | `British International Curriculum (Cambridge Checkpoint & IGCSE)` | `Cambridge Lower Secondary / Checkpoint & IGCSE` |
| server.js:8186 | `🇬🇧 British / IGCSE (n)` tab (parent portal) | `🇬🇧 Cambridge (n)` |
| server.js:8655 | `British Curriculum • Year ..` | `Cambridge IGCSE • Year ..` or `Cambridge Lower Secondary / Checkpoint • Year ..` |
| server.js:8770, 8772 | `British / IGCSE Family Pack (... Up to 3 British Learners ...)` | `Cambridge Family Pack (... Up to 3 Cambridge Learners ...)` |
| server.js:8857, 8875, 8880, 8882 | `British / IGCSE Family Pack`, `(British / IGCSE Year ..)`, `British / IGCSE` learners | same replacement |
| server.js:6197 | `British & International IGCSE schools` (marketing copy, learner/parent-visible page) | `Cambridge IGCSE & international schools` |
| server.js:548, 569, 592, 594 | AI tutor prompt text `British International (Cambridge CAIE / Pearson Edexcel)`, `BRITISH INTERNATIONAL / IGCSE`, `British International (...)` | `Cambridge IGCSE / Lower Secondary (Checkpoint)`; also remove "Pearson Edexcel" if only Cambridge is in scope |
| server.js:458 | `For British Curriculum (Cambridge CAIE ... & Pearson Edexcel ...)` (tutor prompt) | `For Cambridge IGCSE` |
| public/index.html:10541 | `Cambridge & Edexcel Practical Lab` (lab greeting) | `Cambridge Practical Lab` |

Internal identifiers (`curriculum === 'BRITISH'`, `isBritishStudent`, `signupCurriculumBritish`, `step2BritishSection`, db comments in `db/seed_curriculum.js:57`, `curriculumMapService.js:5`, `curriculumContextBritish.js`) are not learner-facing and can stay for now; renaming them is a data migration risk (stored student records use `BRITISH`).

### 5b. "Strand" in Cambridge contexts
| File:line | Issue | Suggested |
|---|---|---|
| public/i18n.js:1059 | `Cambridge Syllabus Topic / Strand` | `Cambridge Syllabus Topic` (Swahili: remove "Mkondo") |
| public/index.html:11381 | `${st.strand || ('Strand ' + (idx + 1))}` metro-line tag; fallback prints "Strand N" if a seeded node lacks `strand` | change fallback to `Topic N` (all current BRITISH seeds set `strand` as Unit/Topic/Content Area) |
| server.js:7543, 7589, 7595, 7601, 7758, 7767, 7775, 7783 | `Strand: ...` labels in the parent report; check whether British children reach these branches | for Cambridge children use `Topic: ...` |
| server.js:6324 | `Class-level Strand Mastery` (teacher/school marketing) | `Topic Mastery` when shown to Cambridge schools |
| db/seed_curriculum.js:96 | already uses `Topic N` for BRITISH (correct); `Strand N` only for CBC | no change |
| db/seeds/british_caie_seed.js:14 | file comment says the seed never uses "Strand" (correct; labels are Unit/Topic/Content Area) | no change |
| db/seeds/british_caie_seed.js (Science/Maths Checkpoint) | `Content Area 1: Biology` etc.; Cambridge Lower Secondary pages say "strands" for these | confirm preferred term with the owner |
| public/index.html:7702-8771 (many `... Strand` sample prompts) | these are KICD/CBC cards (Kenyan context: jembe, M-Pesa, KCSE-level calculus); not Cambridge, left alone | verify they are never shown to BRITISH learners |
| server.js:421, 558 | CBC branch only (Mstari / "Strand") | none; line 558 already switches to "Topic" for British |

### 5c. "Computer Studies"
`Computer Studies` appears only in CBC (KICD Grade 10) content: curriculumContext.js:360, curriculumMapService.js:16 (doc comment), db/seeds/cbc_stem_seed.js (title/strand/summary lines 5, 216-424). The Cambridge seed uses `Computer Science` for 0478 correctly. No change needed except: curriculumMapService.js:16 doc comment lists 'Computer Studies' as a general example, which is fine for CBC.

## 6. Sources (all fetched 2026-11-09)

Read in full (PDF text extracted):
- IGCSE Chemistry 0620, 2026-2028: https://www.cambridgeinternational.org/Images/697205-2026-2028-syllabus.pdf
- IGCSE Physics 0625, 2026-2028: https://www.cambridgeinternational.org/Images/697209-2026-2028-syllabus.pdf
- IGCSE Biology 0610, 2026-2028: https://www.cambridgeinternational.org/Images/697203-2026-2028-syllabus.pdf
- IGCSE Mathematics 0580, 2025-2027: https://www.cambridgeinternational.org/Images/662466-2025-2027-syllabus.pdf
- IGCSE Computer Science 0478, 2026-2028: https://www.cambridgeinternational.org/Images/697167-2026-2028-syllabus.pdf

Programme pages used to find the PDFs: https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-{chemistry-0620,physics-0625,biology-0610,mathematics-0580,computer-science-0478}/

Read at page level only (structure, no stage topics):
- https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/mathematics
- https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/science
- https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/english

Could not verify (HTTP 500 on every attempt):
- https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-first-language-english-0500/
- https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-english-as-a-second-language-0510/
- https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-first-language-english-0990/ (tried as an alternate)
- https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/ and /cambridge-lower-secondary-mathematics/ (the former loaded but listed only subject pages; the latter 500)

Limitations: Core versus Extended tier and Supplement markers were not mapped to seeded content; sub-topic depth not compared; Additional Mathematics 0606 not read; the 2029+ syllabus versions were not read.
