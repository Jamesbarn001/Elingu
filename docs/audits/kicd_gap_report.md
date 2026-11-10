# KICD vs seeded CBC content: gap report

Audit date: 2026-11-09. Scope: `db/seeds/*` maps with `curriculum === 'CBC'` (43 maps; loaded via `require('./db/seeds/index.js').ALL_CURRICULUM_SEEDS`). Read-only audit; no seed or data files were touched.

## 0. Verification status (read first)

**No official KICD PDF could be read.** Every `kicd.ac.ke/wp-content/uploads/...pdf` URL I tried returned HTTP 404 from this machine (checked with curl and WebFetch), including the Grade 10 Chemistry, Biology, Physics, Mathematics, General Science and ICT designs and the Grade 7/9 Integrated Science and Grade 9 Mathematics designs. The KICD index pages (`/cbc-materials/curriculum-designs/grade-ten/`, `.../grade-eleven/`, `.../grade-nine-designs/` etc.) load, but their per-subject lists contain no links in the served HTML, so no PDF could be discovered from them.

What I did read are **secondary summaries** of the KICD designs (the "strands and sub-strands covered" blurb on resource sites such as mwalimufocus.co.ke and revisekenya.com, which reproduce the design's summary table). I label these "secondary summary". They are not the PDFs. Rows with no readable source are marked **could not verify**. I did not use memory to fill in KICD content.

## (a) Summary table: subject x grade

"Seeded" = strands / sub-topics in the seed. Status key: complete = matches the secondary summary; partial = seed has fewer strands/sub-strands than the summary, or a much shallower map; missing = no seed map; unverified = no readable official or secondary list.

| Subject | Grade | Seeded (strands/sub-topics) | Official (secondary summary) | Status |
|---|---|---|---|---|
| Chemistry | 10 | 3 / 8 | 3 / 8 (Inorganic 1.1-1.5, Physical 2.1-2.2, Organic 3.1) | complete vs summary |
| Chemistry | 11 | none | could not verify (no Grade 11 Chemistry design found; index page https://kicd.ac.ke/cbc-materials/curriculum-designs/grade-eleven/ lists "Pure Sciences" but no readable links) | missing (seed) / unverified (official) |
| Chemistry | 12 | none | could not verify (https://kicd.ac.ke/cbc-materials/curriculum-designs/grade-twelve/ , no readable links) | missing / unverified |
| Biology | 10 | 3 / 10 | 3 / 10 (1.1-1.4, 2.1-2.3, 3.1-3.3) | complete vs summary |
| Biology | 11, 12 | none | could not verify | missing / unverified |
| Physics | 10 | 4 / 13 | 4 / 13 listed (1.1-1.6, 2.1-2.2, 3.1-3.3, 4.1-4.2) | partial: sub-topic counts match but several titles differ and Radioactivity / Electronics are absent (see b) |
| Physics | 11, 12 | none | could not verify | missing / unverified |
| Mathematics (Core, STEM) | 10 | 3 / 11 | conflicting secondary info: one page lists 3 strands / 9 sub-strands (Real Numbers; Indices and Logarithms; Quadratic Expressions and Equations I; Similarity and Enlargement; Reflection and Congruence; Rotation; Trigonometry I; Statistics I; Probability I); a search snippet cites Core sub-strands 2.7 Surface Area and Volume, 2.8 Vectors 1, 2.9 Linear Motion that are not in that list | unverified (conflict) |
| Essential Mathematics | 10 | 2 / 2 | 3 / 13 (1.1 Real Numbers, 1.2 Indices, 1.3 Quadratic Equations I; 2.1 Similarity and Enlargement, 2.2 Reflection, 2.3 Trigonometry, 2.4 Area of Polygons, 2.5 Areas of Parts of a Circle, 2.6 Surface Area of Solids, 2.7 Volume and Capacity, 2.8 Commercial Arithmetic I; 3.1 Statistics I, 3.2 Probability I) | partial: seed strand structure does not match |
| Mathematics | 11, 12 | 3 / 4 and 3 / 3 | could not verify | partial (shallow) / unverified |
| Mathematics | 9 | 3 / 3 | could not verify (URL tried, 404: https://kicd.ac.ke/wp-content/uploads/2024/06/Mathematics-Grade-9-Design-Formatted-April-2024.pdf) | unverified; shallow (1 sub-topic per strand) |
| Mathematics | 6, 7, 8 | 4/6, 4/5, 4/6 | could not verify | unverified |
| Integrated Science | 9 | 3 / 3 | 3 / 9 (Mixtures, Elements and Compounds: Structure of the Atom, Metals and Alloys, Water Hardness; Living Things and Their Environment: Nutrition in Plants, Nutrition in Animals, Reproduction in Plants, The Interdependence of Life; Force and Energy: Curved Mirrors, Waves) | partial: 1 combined sub-topic per strand; Water Hardness and Reproduction in Plants not covered |
| Integrated Science | 7, 8 | 3 / 4 each | could not verify (https://kicd.ac.ke/wp-content/uploads/2024/02/GRADE.7.INTEGRATED.SCIENCE.pdf 404; Grade 8 teacher.co.ke mirror returned an image, not text) | unverified |
| Science & Technology | 6 | 3 / 4 | could not verify | unverified |
| English | 7, 8, 9, 10 | 4/4, 3/4, 3/3, 4/19 | could not verify (Grade 10 design is a Google Drive link I did not open: https://www.revisekenya.com/grade-10-curriculum-designs-kicd/) | unverified |
| Kiswahili | 7, 8, 9, 10 | 3/3, 4/5, 2/2, 7/8 | could not verify | unverified |
| Social Studies | 7, 8, 9 | 3 / 3 each | could not verify (https://kicd.ac.ke/wp-content/uploads/2024/03/Social-Studies-Grade-9-Formatted-19.3.2024.pdf 404) | unverified |
| Business Studies | 10 | 1 / 1 | could not verify | unverified; clearly shallow |
| Computer Studies | 10 | 3 / 17 | could not verify (https://kicd.ac.ke/wp-content/uploads/2024/07/ICT-Grade-10-Design-9th-July-2024.pdf 404) | unverified (seed looks rich) |
| Geography; History and Citizenship | 10 | 1 / 1 each | could not verify | unverified; shallow |
| Community Service Learning | 10 | 1 / 1 | could not verify | unverified |
| Agriculture & Nutrition; Pre-Technical Studies; Religious Education; Creative Arts & Sports | 7, 8, 9 | 1-2 strands, 1-2 sub-topics, identical in all three grades | could not verify | unverified; identical content across grades suggests placeholders |
| All subjects | 4, 5 | none | could not verify (https://kicd.ac.ke/cbc-materials/curriculum-designs/grade-four-designs/ and .../grade-five-designs/ not readable) | missing |
| Grade 6 subjects other than Mathematics and Science & Technology | 6 | none | could not verify | missing |
| Grade 11-12 subjects other than Mathematics | 11, 12 | none | could not verify | missing |

## (b) Per-subject gap lists

Only gaps that the secondary summaries support are listed by name. Everything else is flagged as unknown.

**Chemistry**
- Grade 10: seed matches the summary at strand and sub-strand count (3/8): 1.1 Introduction to Chemistry, 1.2 The Atom, 1.3 The Periodic Table, 1.4 Chemical Bonding, 1.5 Periodicity, 2.1 Acids and Bases, 2.2 Introduction to Salts, 3.1 Introduction to Organic Chemistry. One secondary page showed Organic as a strand with no numbered sub-strands, so 3.1 should be checked against the PDF.
- Grades 11 and 12: no seed map and no readable official list. This is the likely cause of the "very few Chemistry topics" report: a learner past Grade 10 sees nothing, and Grade 10 itself is only 8 sub-topics because the Grade 10 design (per the summary) has 8.
- Seed titles go beyond the summary names: 1.3 ("Alkali Metals, Alkaline Earths & Halogens"), 1.5 ("Trends Across Period 3") and 2.2 ("Mole Concept, Gas Volume & Volumetric Titration"). Mole concept and titration are not named in the Grade 10 summary, so they may be extensions or belong to a later grade. Cannot tell without the PDF.

**Physics (Grade 10)**
- Not in seed: 2.2 Radioactivity and Stability of Isotopes; 3.3 Introduction to Electronics (seed 3.3 is Magnetism and Electromagnetism).
- Summary sub-strands with no clear seed equivalent: 1.2 Pressure (seed has it as 1.5), 1.3 Mechanical Properties of Materials, 1.6 Energy, Work, Power and Machines, 4.1 Greenhouse Effect and Climate Change (seed 4.1 is Renewable Energy Systems).
- Seed sub-topics not in the summary: Linear Motion/SUVAT, Newton's Laws and momentum, Magnetism and Electromagnetism, Capacitors.
- Grades 11, 12: no seed, unverified.

**Biology (Grade 10)**: all 10 summary sub-strands are present. Grades 11, 12: no seed, unverified.

**Mathematics**
- Grade 10 Core: cannot confirm; summaries conflict. Seed topics (surds, completing the square, sine/cosine rule, vectors I, coordinate geometry, grouped data) are not all in the 9-sub-strand summary. If that summary is correct, the seed has content outside the design, and is missing Rotation and Reflection/Congruence.
- Grade 10 Essential Mathematics: seed 2 strands / 2 sub-topics vs 3 strands / 13 sub-strands in the summary. Missing: Real Numbers, Indices, Quadratic Equations I, Similarity and Enlargement, Reflection, Trigonometry, Area of Polygons, Areas of Parts of a Circle, Surface Area of Solids, Volume and Capacity, Statistics I, Probability I. Commercial Arithmetic I loosely overlaps the seeded consumer numeracy topic.
- Grades 9, 11, 12 (3/3, 3/4, 3/3) and 6-8: one or two sub-topics per strand; official lists unreadable.

**Integrated Science (Grade 9)**: seed has 3 strands with 1 combined sub-topic each. Per the summary the sub-strands are Structure of the Atom, Metals and Alloys, Water Hardness, Nutrition in Plants, Nutrition in Animals, Reproduction in Plants, The Interdependence of Life, Curved Mirrors, Waves. Not covered: Water Hardness, Reproduction in Plants. Grades 7, 8 unverified.

**English, Kiswahili, Social Studies, Business Studies, Computer Studies, Geography, History and Citizenship, CSL, other Junior School subjects**: no readable official list. Internal evidence only (not KICD): English G8/G9 and Kiswahili G9 have fewer strands than neighbouring grades; Social Studies G7-9 and four Junior School foundation subjects have identical content in each grade; several G10 Social Sciences subjects have a single topic.

## (c) Prioritised fill-in list

1. **Obtain the real KICD PDFs first** (blocker). The kicd.ac.ke upload URLs return 404. Try the KICD grade pages in a normal browser (download links appear to render client-side), or the Google Drive copies linked from https://www.revisekenya.com/grade-10-curriculum-designs-kicd/ (Grade 10 Physics, Biology, Mathematics, English, Kiswahili, Business, Computer Science). Do not write seed content before this.
2. **Mathematics**: resolve the Grade 10 Core vs Essential mismatch; add the Essential Mathematics structure (13 sub-strands per summary); deepen Grades 6-9, 11, 12.
3. **Integrated Science**: split Grade 9 into the 9 sub-strands above; verify Grades 7, 8.
4. **English** and 5. **Kiswahili**: verify against Grade 7-10 designs; fix G8/G9 strand gaps.
6. **Chemistry, Biology, Physics**: add Grade 11 and 12 maps (largest learner-visible gap; Chemistry first). Physics Grade 10: add Radioactivity and Electronics, reconcile titles.
7. **Social Studies** (G7-9 are identical copies), **Business Studies**, **Computer Studies** (verify only), then Geography, History and Citizenship and remaining Junior School subjects.
8. Grades 4, 5, rest of Grade 6, and Grades 11-12 for all pathways, if in scope.

## (d) Naming issues

Based on file names and listing labels seen in search results, not on reading the designs:
- "Computer Studies" (seed, G10): the KICD file is `ICT-Grade-10-Design-9th-July-2024.pdf` and the Grade 10 download index labels it "Computer Science". Confirm the official title.
- "Religious Education" (G7-9): KICD files are split by religion (e.g. `GRADE.9.IRE_.edit_.pdf`); the seed has one generic map ("Stewardship of Creation, Moral Values & Social Justice") that likely matches no single design.
- "Agriculture & Nutrition": file names seen are `GRADE.9.AGRICULTURE.NUTRITION.pdf` and `Agriculture-Grade-9-Formatted-April-2024.pdf`; the official title may be "Agriculture". Unconfirmed.
- "Creative Arts & Sports": file name is `Creative-Arts-Sports-Grade-9...`; "and" vs "&" unverified.
- KICD also has a "General Science Grade 10" design (`General-Science-Grade-10-June-2024.pdf`, listed in search results, not read). The seed has no General Science map.
- Business Studies, History and Citizenship, Science & Technology: titles not verified.
- Seed sub-topic titles are descriptive extensions of official sub-strand names, so exact-name lookups against KICD will not match.
- Seed `trackPathway: 'Core'` for Grades 6-9 is an app convention, not a KICD term.

## (e) Sources

Read (secondary summaries, not the PDFs):
- Chemistry G10: https://mwalimufocus.co.ke/curriculum-designs/7074/grade-10-chemistry-curriculum-design ; https://www.revisekenya.com/chemistry-grade-10-notes
- Biology G10: https://mwalimufocus.co.ke/curriculum-designs/7071/grade-10-biology-curriculum-design
- Physics G10: https://mwalimufocus.co.ke/curriculum-designs/7102/grade-10-physics-curriculum-design
- Core Mathematics G10: https://mwalimufocus.co.ke/curriculum-designs/7078/grade-10-core-mathematics-curriculum-design
- Essential Mathematics G10: https://mwalimufocus.co.ke/curriculum-designs/7081/grade-10-essential-mathematics-curriculum-design
- Integrated Science G9: https://mwalimufocus.co.ke/curriculum-designs/7061/grade-9-rationalized-integrated-science-curriculum-design
- Grade 10 download index (links only, not opened): https://www.revisekenya.com/grade-10-curriculum-designs-kicd/

Official KICD URLs tried (404 or no links; nothing verified from them):
- https://kicd.ac.ke/wp-content/uploads/2024/07/Chemistry-Grade-10-June-2024.pdf , General-Science-Grade-10-June-2024.pdf , Mathematics-Grade-10-June-2024.pdf , Biology-Grade-10-June-2024.pdf , ICT-Grade-10-Design-9th-July-2024.pdf (same folder)
- https://kicd.ac.ke/wp-content/uploads/2024/06/Integrated-Science-Grade-9-Design-Formatted-April-2024.pdf , Mathematics-Grade-9-Design-Formatted-April-2024.pdf , Integrated-Science-Grade-7-Design-Formatted-April-2024.pdf (same folder)
- https://kicd.ac.ke/wp-content/uploads/2024/02/GRADE.7.INTEGRATED.SCIENCE.pdf , GRADE.9.MATHEMATICS.pdf (same folder); https://kicd.ac.ke/wp-content/uploads/2024/01/GRADE.9.INTEGRATED.SCIENCE.pdf
- https://kicd.ac.ke/wp-content/uploads/2024/03/Social-Studies-Grade-9-Formatted-19.3.2024.pdf
- Index pages (load, no download links in served HTML): https://kicd.ac.ke/cbc-materials/curriculum-designs/ and its grade-ten, grade-eleven, grade-twelve, grade-seven-designs, grade-eight-designs, grade-nine-designs, grade-six-designs sub-pages.
