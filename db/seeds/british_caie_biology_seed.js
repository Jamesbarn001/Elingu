// ══════════════════════════════════════════════════════════════
// CAMBRIDGE IGCSE BIOLOGY (0610), YEARS 10 & 11
// Full topic map: all 21 topics of the 0610 syllabus (2026-2028 content list).
//
// Not an official Cambridge publication; topic
// names and numbers follow the public syllabus so teachers can cross-check.
//
// Replaces the two Biology maps in british_caie_seed.js. Station and
// sub-topic ids from those maps are kept (cie_y10_bio_s1..s3, cie_y11_bio_s1..s2
// and their sub-topics) so learner progress is never lost.
//
// Terminology: Cambridge UI uses "Unit / Topic / Content Area". The station
// field `strand` is the database column name only; its text is "Topic N: ...".
// Station `icon` is intentionally omitted (plain text only in this file); the
// seeder falls back to its default icon.
// ══════════════════════════════════════════════════════════════

// Same builder and output shape as stop() in british_caie_seed.js.
function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps = [], workedExample = '') {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: primerTitle,
      tagline,
      body,
      formula: formula || null,
      visualBadge,
      realWorldContext,
      explanationSteps: steps,
      workedExample
    },
    socraticPrompt,
    formulaBadge: formula || null,
    examFocus
  };
}

// Object-style wrapper so each primer field is named at the call site.
function P(id, title, o) {
  return stop(
    id, title, o.pt, o.tag, o.body, o.f || null, o.vis || 'Labelled diagram', o.ctx, o.q, o.exam,
    o.steps.map((s, i) => `Step ${i + 1}: ${s}`),
    o.ex
  );
}


const BIOLOGY_Y10 = {
  curriculum: 'BRITISH',
  grade: 10,
  subject: 'Biology',
  code: '0610',
  trackPathway: 'IGCSE',
  title: 'Cambridge IGCSE Biology (0610) Metro Line',
  description: `Year 10 covers Topics 1 to 8 of the Cambridge IGCSE Biology (0610) syllabus content list for 2026-2028: living organisms and classification, cells, movement into and out of cells, biological molecules, enzymes, plant nutrition, human nutrition and transport in plants. Core and Supplement content are both included and flagged in each exam focus line.`,
  notes: `Written to follow the public 0610 content list.`,
  stations: [
    // ───────────── Topic 1 ─────────────
    {
      id: 'cie_y10_bio_s4',
      number: 1,
      title: 'Topic 1: Characteristics and classification of living organisms',
      strand: 'Topic 1: Characteristics and classification of living organisms',
      status: 'available',
      summary: 'What makes something alive, how species are named and sorted into groups, dichotomous keys, the five kingdoms and the main animal and plant groups.',
      subtopics: [
        P('cie_y10_bio_s4_1', '1.1 Characteristics of living organisms', {
          pt: 'Seven things every living organism does',
          tag: 'A living organism moves, respires, senses, grows, reproduces, excretes and takes in nutrition.',
          body: `Biologists need a test for "alive", because a flame also grows and moves but is not alive. The test is a checklist of seven processes. Movement is an action by the organism or part of it that changes its position or place (a plant turning a leaf towards light counts). Respiration is the chemical reactions inside cells that break down nutrient molecules to release energy for metabolism, which just means all the chemical reactions in a body. Sensitivity is the ability to detect and respond to changes in the surroundings or inside the body. Growth is a permanent increase in size and dry mass (dry mass is what is left after the water is removed, so a swollen sponge has not grown). Reproduction is the processes that make more of the same kind of organism. Excretion is removing the waste products of metabolism and substances in excess of requirements. Nutrition is taking in materials for energy, growth and development.`,
          ex: `Compare a maize seedling and a stone on a windowsill. After a week the seedling has bent towards the window (sensitivity), has new leaves that weigh more when dried (growth), takes in water and minerals (nutrition) and gives off oxygen and water vapour (excretion and respiration). The stone does none of these, so it fails the checklist.`,
          q: `A matatu moves, burns fuel and releases fumes from its exhaust. Which of the seven characteristics does it seem to show, and which ones can you find no evidence for?`,
          ctx: `Farmers at a market can tell a live chicken from a dead one by checking these same signs: movement, response to touch and breathing.`,
          exam: `Syllabus 1.1 (Core). Learn each definition in the syllabus wording; mark schemes reward the precise definition, for example growth as a permanent increase in size and dry mass.`,
          steps: [
            `Remember the seven words: movement, respiration, sensitivity, growth, reproduction, excretion, nutrition.`,
            `For each word, write a one-line definition using the syllabus wording.`,
            `Test an object by asking, for each characteristic, what evidence you could actually observe.`
          ]
        }),
        P('cie_y10_bio_s4_2', '1.2 Concept and uses of classification systems', {
          pt: 'Sorting living things into groups and naming them',
          tag: 'Organisms are grouped by shared features, and every species has a two-part scientific name.',
          body: `There are millions of kinds of organism, so scientists sort them into groups by the features they share, the way a shop sorts goods into shelves. The basic group is the species: a group of organisms that can reproduce to produce fertile offspring (offspring that can themselves reproduce). Local names change between languages and regions, so scientists use the binomial system, an internationally agreed system where the scientific name has two parts: the genus (written with a capital letter) and the species (small letter), in italics or underlined, for example Homo sapiens. A dichotomous key is a tool for identifying an organism using a series of paired statements about features you can see; each answer sends you to another question or to a name. Supplement: classification systems aim to reflect evolutionary relationships. The sequence of bases in DNA is used to classify organisms, and groups that share a more recent ancestor (closer relatives) have more similar base sequences than groups that share only a distant ancestor.`,
          ex: `A key for three animals: 1a Has feathers: go to 2. 1b No feathers: go to 3. 2a Cannot fly: ostrich. 2b Can fly: eagle. 3: Has hair and gives milk: lion. At each pair you can only follow one statement, which is what makes the key work.`,
          q: `The same animal may be called different names in Kiswahili, Kikuyu and English. Why would scientists in different countries find it hard to share findings using only those names, and how does a two-part name fix this?`,
          ctx: `Kenya Wildlife Service rangers and researchers use scientific names so that records of species in Tsavo or the Mara match records from other countries.`,
          exam: `Syllabus 1.2. Core: species definition, binomial system, constructing and using dichotomous keys. Supplement: DNA base sequences show how closely related groups are.`,
          steps: [
            `Define a species by whether its members can breed and make fertile offspring.`,
            `Write a scientific name as genus (capital) then species (lower case).`,
            `To build a key, choose one clear observable difference per step that splits the group into two.`
          ]
        }),
        P('cie_y10_bio_s4_3', '1.3 Features of organisms', {
          pt: 'The five kingdoms and the main groups inside them',
          tag: 'Features such as cell walls, chlorophyll and number of legs place an organism in its group.',
          body: `The largest groups are kingdoms. The syllabus uses five: animal, plant, fungus, prokaryote and protoctist. Plants have cellulose cell walls, chloroplasts and make their food by photosynthesis. Animals have no cell walls or chloroplasts and take in food. Fungi (for example mushrooms and mould) are made of thread-like hyphae and feed on dead or waste material. Prokaryotes (bacteria) are single cells with no nucleus. Protoctists are mostly single-celled organisms that do have a nucleus, such as Amoeba. Core: animals are split into vertebrates (animals with a backbone: mammals, birds, reptiles, amphibians and fish) and arthropods (animals with jointed legs and a hard outer skeleton: myriapods with many legs, insects with six legs and three body parts, arachnids with eight legs and two body parts, and crustaceans with more than four pairs of legs). Supplement: plants include ferns, which reproduce with spores and have fronds, and flowering plants, which are dicotyledons (two seed leaves, net-like leaf veins) or monocotyledons (one seed leaf, parallel leaf veins). Viruses are not placed in a kingdom here; the syllabus asks only that you know a virus has a protein coat and genetic material.`,
          ex: `Maize leaves have parallel veins and each seed has one seed leaf, so maize is a monocotyledon. A bean leaf has a branching net of veins and the bean seed splits into two halves, so beans are dicotyledons. A mosquito has six legs and three body parts, so it is an insect, which makes it an arthropod.`,
          q: `A scientist finds an organism with a hard outer skeleton, jointed legs, eight legs and a body in two parts. Which kingdom and which arthropod group does it belong to, and what feature settled each decision?`,
          ctx: `Sorting insects, arachnids and crustaceans is practical in Kenya: ticks and spiders are arachnids, while the crabs along the coast are crustaceans.`,
          exam: `Syllabus 1.3. Core: kingdom features for animals and plants; vertebrate and arthropod groups; classify using those features. Supplement: all five kingdoms, ferns and the two groups of flowering plants, virus features.`,
          steps: [
            `Ask first whether the organism has a nucleus, then whether it has a cell wall and chloroplasts, to choose the kingdom.`,
            `For an animal, check for a backbone to decide between vertebrates and arthropods.`,
            `Within a group, count legs and body parts, or check skin, feathers and hair, to choose the class.`
          ]
        })
      ]
    },

    // ───────────── Topic 2 ─────────────
    {
      id: 'cie_y10_bio_s5',
      number: 2,
      title: 'Topic 2: Organisation of the organism',
      strand: 'Topic 2: Organisation of the organism',
      status: 'available',
      summary: 'Plant, animal and bacterial cell structure, specialised cells, levels of organisation, and calculating magnification and real size.',
      subtopics: [
        P('cie_y10_bio_s5_1', '2.1a Cell structure: plant, animal and bacterial cells', {
          pt: 'What is inside a cell and what each part does',
          tag: 'Every cell has a membrane, cytoplasm and ribosomes, but plant and bacterial cells add other structures.',
          body: `A cell is the smallest unit of a living organism that can carry out the characteristics of life. Animal cells have a cell membrane (controls what enters and leaves), cytoplasm (jelly-like fluid where many reactions happen), a nucleus (holds the DNA and controls the cell), ribosomes (make proteins) and mitochondria (where respiration releases energy). Plant cells have all of these and also a cellulose cell wall (strengthens the cell), chloroplasts (contain chlorophyll for photosynthesis) and often a large vacuole (a sap-filled space). A bacterial cell has a cell wall, cell membrane, cytoplasm and ribosomes, but no nucleus: its DNA is a circular loop lying in the cytoplasm, and it may also contain small extra rings of DNA called plasmids. New cells are produced when existing cells divide.`,
          ex: `Look at an onion skin under a microscope: you see box-like cells with a clear wall and a nucleus, but no green chloroplasts because onion skin is below ground and gets no light. A cheek cell scraped from the inside of the mouth has a nucleus and membrane but no wall, so it looks round and soft-edged.`,
          q: `Both a leaf cell and a cheek cell contain mitochondria. What does that tell you about whether each cell needs energy, and why do you think only the leaf cell also needs chloroplasts?`,
          ctx: `Yoghurt (maziwa lala) is made by bacteria; these tiny cells have plasmids and circular DNA but no nucleus.`,
          exam: `Syllabus 2.1 (Core). Be able to label cell diagrams and give one function for each listed structure; compare plant, animal and bacterial cells in a table.`,
          steps: [
            `List the structures found in every cell: membrane, cytoplasm, ribosomes.`,
            `Add the extras for plant cells: cell wall, chloroplasts, vacuole.`,
            `For a bacterial cell, replace the nucleus with circular DNA and mention plasmids.`
          ]
        }),
        P('cie_y10_bio_s5_2', '2.1b Specialised cells and levels of organisation', {
          pt: 'From cells to whole organisms',
          tag: 'Specialised cells have a shape that suits their job, and cells build up into tissues, organs and systems.',
          body: `A specialised cell has a structure that fits one function. Ciliated cells have tiny hairs (cilia) that move mucus along the trachea and bronchi. Root hair cells have a long thin extension that absorbs water and minerals. Palisade mesophyll cells are packed with chloroplasts for photosynthesis. Neurones are long and carry electrical impulses. Red blood cells carry oxygen. Sperm and egg cells (gametes) are involved in reproduction. Cells of one type grouped together form a tissue (for example muscle tissue). Different tissues working together form an organ (the stomach), several organs working together form an organ system (the digestive system), and all the systems together make up the organism.`,
          ex: `The heart is an organ made of cardiac muscle tissue, blood vessel tissue and nerve tissue. The heart is part of the circulatory system, which also includes blood vessels and blood. One person is the organism that contains all of these.`,
          q: `If you wanted to design a cell to carry electrical messages from your toe to your spinal cord, what shape would it need, and which cell from the list does that?`,
          ctx: `A runner in the Iten training camps relies on specialised muscle cells, red blood cells and neurones all working together in different organ systems.`,
          exam: `Syllabus 2.1.5 to 2.1.7 (Core). Link each specialised cell to its function in one clear statement, and use the terms cell, tissue, organ, organ system, organism correctly.`,
          steps: [
            `Match each cell to its job from the syllabus list.`,
            `Explain how one feature of the cell helps it do that job.`,
            `Put the levels in order from smallest to largest: cell, tissue, organ, organ system, organism.`
          ]
        }),
        P('cie_y10_bio_s5_3', '2.2 Size of specimens and magnification', {
          pt: 'Using magnification to work out real sizes',
          tag: 'Magnification equals image size divided by actual size.',
          body: `A microscope or a photograph can make a tiny cell look bigger. Magnification tells you how many times bigger the picture is than the real thing: magnification = image size / actual size. You can rearrange this to find the real size: actual size = image size / magnification. Measure the image with a ruler in millimetres. Supplement: very small specimens are measured in micrometres (um), and 1 mm = 1000 um, so to change mm into um multiply by 1000 and to change um into mm divide by 1000. Always use the same unit for the image and the actual size before dividing.`,
          ex: `A drawing of a cell is 45 mm wide and the magnification is x300. Actual size = 45 / 300 = 0.15 mm. In micrometres that is 0.15 x 1000 = 150 um.`,
          q: `An image of a red blood cell measures 36 mm on your page, and the real cell is 0.006 mm wide. Without a calculator, estimate the magnification, and then check it with the formula.`,
          f: 'magnification = image size / actual size',
          vis: 'Formula triangle: image size on top, actual size and magnification below',
          ctx: `A lab technician at a hospital in Nairobi reading a malaria slide needs to know how big the parasite appears compared with the red blood cell.`,
          exam: `Syllabus 2.2. Core: use the formula with mm. Supplement: convert between mm and um. Show working and include units.`,
          steps: [
            `Measure the image and write the units (mm).`,
            `Choose the formula version: magnification, image size or actual size.`,
            `Convert units if needed (mm to um by multiplying by 1000), then calculate.`
          ]
        })
      ]
    },

    // ───────────── Topic 3 (existing station s2) ─────────────
    {
      id: 'cie_y10_bio_s2',
      number: 3,
      title: 'Topic 3: Movement into and out of cells',
      strand: 'Topic 3: Movement into and out of cells',
      status: 'available',
      summary: 'Diffusion and its factors, osmosis and water potential, turgor and plasmolysis, and active transport using carrier proteins.',
      subtopics: [
        P('cie_y10_bio_s2_2', '3.1 Diffusion', {
          pt: 'Particles spreading out from where there are many to where there are few',
          tag: 'Diffusion is the net movement of particles down a concentration gradient, caused by their random movement.',
          body: `Particles of gases, liquids and dissolved substances are always moving randomly because they have kinetic energy (energy of movement). Because of this random movement, particles spread out from a region where there are many of them (higher concentration) to a region where there are fewer (lower concentration). This is diffusion: the net movement of particles down a concentration gradient. "Net" means more particles go one way than the other. No energy from the cell is needed, because the energy comes from the particles' own kinetic energy. Some substances move into and out of cells by diffusion through the cell membrane, for example oxygen into cells and carbon dioxide out. Diffusion is faster with a larger surface area, a higher temperature, a steeper concentration gradient and a shorter distance.`,
          ex: `If you open a pot of cooking onions in one corner of a house, people in the next room smell them a minute later. Onion particles spread from the pot (high concentration) into the air in the room (low concentration). In an investigation, a dye drop spreads faster in warm water than cold water because the particles move faster.`,
          q: `In an alveolus in the lung there is a high oxygen concentration inside the air sac and a low oxygen concentration in the blood. Which way will oxygen move, and what would happen if the blood already had as much oxygen as the air?`,
          ctx: `A drop of tea in hot chai spreads and colours the milk faster than in cold milk, which is diffusion speeding up with temperature.`,
          exam: `Syllabus 3.1 (Core). Use the exact definition with "net movement", "higher to lower concentration" and "down a concentration gradient". Practical: factors are surface area, temperature, concentration gradient and distance.`,
          steps: [
            `Identify which region has the higher concentration of the particles.`,
            `State that particles move down the gradient, from higher to lower concentration, by random movement.`,
            `Explain that no cell energy is needed because the kinetic energy of the particles drives it.`
          ]
        }),
        P('cie_y10_bio_s2_1', '2.1 Water Potential & Plant Turgor vs Plasmolysis', {
          pt: 'Net Movement of Water Down Water Potential Gradients',
          tag: 'Water moves by osmosis through a partially permeable membrane from dilute to concentrated solution.',
          body: `Osmosis is a special case of diffusion for water. A partially permeable membrane lets small molecules such as water through but blocks bigger dissolved molecules. Osmosis is the net movement of water molecules from a region of higher water potential (a dilute solution) to a region of lower water potential (a concentrated solution) through a partially permeable membrane. Water diffuses in and out of cells by osmosis through the cell membrane. When a plant cell is placed in dilute solution or pure water, water enters, the vacuole swells and the cell becomes turgid; the pressure of the water pushing outwards on the cell wall (turgor pressure) supports the plant. In a concentrated solution water leaves, the cell becomes flaccid and then the cytoplasm pulls away from the wall, which is plasmolysis. Animal cells have no wall, so in pure water they can burst.`,
          ex: `Cut three identical potato strips. Put one in distilled water, one in weak sugar solution, one in strong sugar solution. After 30 minutes the strip in distilled water has gained mass and feels firm (water entered by osmosis), the strong-solution strip has lost mass and is limp (water left). A graph of percentage change in mass against concentration crosses zero where the potato and solution have equal water potential.`,
          q: `Why do red blood cells burst (lyse) in distilled water, whereas plant cells become firm (turgid) without bursting?`,
          ctx: `Sukuma wiki wilts on a hot afternoon when water leaves its cells faster than the roots can replace it; sprinkling it with water makes the cells turgid again.`,
          exam: `Syllabus 3.2. Core: osmosis in dialysis tubing and plant tissue, turgor support. Supplement: water potential definition, turgid, flaccid, plasmolysis, uptake and loss of water by organisms. Interpret potato mass-change graphs.`,
          steps: [
            `Decide which solution has higher water potential: the more dilute one.`,
            `Say that water moves by osmosis from higher to lower water potential through the partially permeable membrane.`,
            `For a plant cell, link the direction of movement to turgid, flaccid or plasmolysed.`
          ]
        }),
        P('cie_y10_bio_s2_3', '3.3 Active transport', {
          pt: 'Moving particles uphill using energy',
          tag: 'Active transport moves particles against a concentration gradient using energy from respiration.',
          body: `Diffusion and osmosis move things down a gradient and need no energy from the cell. Sometimes a cell needs to take in a substance that is already more concentrated inside than outside. This is active transport: the movement of particles through a cell membrane from a region of lower concentration to a region of higher concentration (against the concentration gradient), using energy from respiration. Supplement: protein carriers in the membrane pick up the molecules or ions and move them across. This is important for uptake of mineral ions by root hairs from the soil, where the ion concentration in the soil is lower than inside the root cell, and for absorbing glucose in the gut. Cells doing a lot of active transport have many mitochondria to supply the energy.`,
          ex: `A root hair cell contains a much higher nitrate concentration than the soil water around it. Nitrate still enters, because carrier proteins use energy from respiration to pull ions in. If the roots are deprived of oxygen (waterlogged soil), respiration slows and nitrate uptake falls even though the gradient has not changed.`,
          q: `Imagine a flooded maize field where roots cannot get oxygen. Why might the maize leaves turn yellow even though the soil is full of nitrate?`,
          vis: 'Diagram: carrier protein in a membrane moving ions up a gradient',
          ctx: `Farmers in low-lying areas near Lake Victoria see crops struggle after flooding, partly because roots cannot respire to power ion uptake.`,
          exam: `Syllabus 3.3. Core: definition including "against a concentration gradient" and "energy from respiration". Supplement: importance (ion uptake by root hairs) and protein carriers.`,
          steps: [
            `Compare concentration inside and outside the cell.`,
            `If the movement is from low to high concentration, it is active transport.`,
            `Name the energy source (respiration) and, at Supplement level, the protein carriers.`
          ]
        })
      ]
    },

    // ───────────── Topics 4 and 5 (existing station s3) ─────────────
    {
      id: 'cie_y10_bio_s3',
      number: 4,
      title: 'Topics 4 and 5: Biological molecules and enzymes',
      strand: 'Topic 4: Biological molecules; Topic 5: Enzymes',
      status: 'available',
      summary: 'Carbohydrates, fats, proteins, food tests, DNA structure, and enzymes as biological catalysts affected by temperature and pH.',
      subtopics: [
        P('cie_y10_bio_s3_2', '4.1a Carbohydrates, fats, proteins and food tests', {
          pt: 'The building blocks of food and how to test for them',
          tag: 'Large molecules are built from small ones, and colour tests show which are present.',
          body: `Carbohydrates, fats and proteins are the main food molecules. Carbohydrates and fats contain the elements carbon, hydrogen and oxygen; proteins contain carbon, hydrogen, oxygen and nitrogen. Each large molecule is made from smaller ones joined together: starch, glycogen and cellulose are made from many glucose molecules; proteins are made from amino acids; fats and oils are made from fatty acids and glycerol. Food tests: iodine solution turns from brown to blue-black with starch. Benedict's solution, heated, turns from blue through green and yellow to brick-red with reducing sugars. Biuret reagent turns from blue to purple (violet) with protein. For fats and oils, mix the food with ethanol, then pour the clear liquid into water; a cloudy white emulsion shows fats or oils. DCPIP is a blue dye that is decolourised (loses its colour) by vitamin C.`,
          ex: `Crush a piece of boiled sweet potato in water and add iodine: the colour changes to blue-black, so starch is present. Add Benedict's solution to a ripe banana extract and heat in a water bath: it goes brick-red, so reducing sugar is present, which is why ripe bananas taste sweet.`,
          q: `You are given three unlabelled solutions: starch, glucose and protein. Which tests would you use, and what would you expect to see in each case?`,
          vis: 'Table: reagent, starting colour, positive result colour',
          ctx: `Testing maize flour (unga), milk and groundnuts shows how different foods are rich in carbohydrate, protein or fat.`,
          exam: `Syllabus 4.1 (Core). Learn each reagent, conditions (heat for Benedict's) and the colour change. Describe results precisely.`,
          steps: [
            `Name the elements: carbohydrates and fats C, H, O; proteins also N.`,
            `Match each large molecule to its small units.`,
            `Learn the reagent, any heating, and the positive colour for each test.`
          ]
        }),
        P('cie_y10_bio_s3_3', '4.1b DNA structure', {
          pt: 'The double helix and base pairing',
          tag: 'DNA is two strands coiled into a double helix, held together by pairs of bases: A with T and C with G.',
          body: `DNA is the chemical that stores genetic information in cells. Each DNA molecule is made of two strands coiled together to form a double helix. Each strand carries chemicals called bases. Bonds between pairs of bases hold the two strands together. The bases always pair up in the same way: A with T, and C with G. You do not need to know the full names of the bases. Because pairing is fixed, if you know the sequence of bases on one strand you can work out the sequence on the other. This fixed pairing is also what lets DNA be copied accurately when a cell divides.`,
          ex: `One strand reads A T T C G A. The matching strand must read T A A G C T, because A pairs with T and C pairs with G.`,
          q: `If one strand of a DNA molecule is ATGCC, what is the sequence of the strand it is paired with, and which feature of base pairing allowed you to work that out?`,
          vis: 'Diagram: double helix with base pairs shown as rungs',
          ctx: `DNA tests used in paternity cases and wildlife forensic work in Kenya depend on comparing sequences of bases.`,
          exam: `Syllabus 4.1.4 (Supplement). Give: two strands, double helix, bases, bonds between bases, A-T and C-G pairing.`,
          steps: [
            `Picture the molecule as a twisted ladder (double helix).`,
            `Remember that the rungs are pairs of bases.`,
            `Apply the rule: A with T, C with G.`
          ]
        }),
        P('cie_y10_bio_s3_1', '3.1 Enzyme Active Sites, Temperature & pH Denaturation', {
          pt: 'Biological Catalysts with Complementary 3D Conformations',
          tag: 'Enzymes are proteins that speed up reactions in living things and are not used up.',
          body: `A catalyst is a substance that increases the rate of a chemical reaction and is not changed by the reaction. Enzymes are proteins that function as biological catalysts, and they are involved in all metabolic reactions. Without them, reactions in the body would be far too slow to sustain life. Each enzyme has an active site, a small part with a particular shape. The substrate is the molecule the enzyme acts on, and its shape is complementary to the active site, so it fits, forming an enzyme-substrate complex; the reaction happens and products are released, and the enzyme is unchanged. Because only one shape fits, enzymes are specific. A rise in temperature gives particles more kinetic energy, so substrate and enzyme collide more often and with more energy, and the rate rises up to the optimum temperature. Above it the enzyme loses its shape: the active site no longer fits the substrate, the enzyme is denatured and cannot work. Extreme pH also changes the shape of the active site and denatures the enzyme.`,
          ex: `Biological washing powder contains enzymes that digest fat and protein stains. It works well in a 30 C wash because that is close to the enzymes' optimum. In boiling water the enzymes are denatured, and the powder stops removing stains.`,
          q: `Why does enzyme activity drop to zero when boiled, but only slow down without permanent damage when chilled to 0 C?`,
          f: 'Enzyme + Substrate -> Enzyme-Substrate Complex -> Enzyme + Products',
          vis: 'Diagram: lock-and-key model of the active site',
          ctx: `Biological washing powders and the amylase in your saliva both rely on enzymes working near their optimum conditions.`,
          exam: `Syllabus 5.1. Core: catalyst, active site shape, effect of temperature and pH, optimum, denaturation. Supplement: explain using kinetic energy, shape and fit, effective collisions, specificity. Use "active site" and "denatured" in answers.`,
          steps: [
            `On a rate graph, find the optimum where the curve peaks.`,
            `Explain the rise with temperature using kinetic energy and more frequent effective collisions.`,
            `Explain the fall after the peak: the active site changes shape and the enzyme is denatured.`
          ]
        })
      ]
    },

    // ───────────── Topic 6 (existing station s1) ─────────────
    {
      id: 'cie_y10_bio_s1',
      number: 5,
      title: 'Topic 6: Plant nutrition',
      strand: 'Topic 6: Plant nutrition',
      status: 'available',
      summary: 'Photosynthesis, what plants do with the sugars, mineral ions, limiting factors, and leaf structure.',
      subtopics: [
        P('cie_y10_bio_s1_2', '6.1a Photosynthesis: raw materials, products and uses', {
          pt: 'How plants make their own food',
          tag: 'Plants use light energy to turn carbon dioxide and water into glucose and oxygen.',
          body: `Plants do not eat. They make carbohydrates from raw materials using energy from light; this is photosynthesis. The word equation is carbon dioxide + water -> glucose + oxygen, in the presence of light and chlorophyll. Chlorophyll is a green pigment found in chloroplasts, and it transfers energy from light into energy in chemicals, used to make carbohydrates. Supplement: the balanced equation is 6CO2 + 6H2O -> C6H12O6 + 6O2. The glucose is then used in several ways: as starch, an energy store; as cellulose, to build cell walls; in respiration, to release energy; as sucrose, for transport in the phloem; and in nectar to attract insects for pollination. Plants also need ions from the soil: nitrate ions to make amino acids (for proteins) and magnesium ions to make chlorophyll. Without magnesium leaves turn yellow.`,
          ex: `To show that a plant needs light, cover part of a leaf with black paper for 24 hours, then boil the leaf in ethanol to remove chlorophyll and add iodine. The covered part stays brown (no starch), the exposed part turns blue-black (starch). A control, an uncovered leaf from the same plant, makes the result fair.`,
          q: `If a farmer grows tomatoes in soil that has plenty of water and light but is very low in nitrate, what would you expect to happen to the plant's growth, and why?`,
          f: '6CO2 + 6H2O -> C6H12O6 + 6O2 (light, chlorophyll)',
          vis: 'Diagram: leaf with arrows for CO2 and light in, O2 out',
          ctx: `Maize in a farmer's shamba in Kakamega stores glucose as starch in the grain, which becomes the flour for ugali.`,
          exam: `Syllabus 6.1. Core: word equation, chlorophyll, uses of carbohydrates, importance of nitrate and magnesium, controlled investigations (starch test, hydrogencarbonate indicator). Supplement: balanced equation.`,
          steps: [
            `Write the raw materials on the left, products on the right, with light and chlorophyll above the arrow.`,
            `List the five fates of the carbohydrate made.`,
            `Link nitrate to amino acids and magnesium to chlorophyll.`
          ]
        }),
        P('cie_y10_bio_s1_1', '1.1 Limiting Factors of Photosynthesis', {
          pt: 'The Law of the Bottleneck in Plant Production',
          tag: 'The rate of photosynthesis is limited by whichever factor is in shortest supply.',
          body: `Photosynthesis needs light, carbon dioxide and a suitable temperature (because enzymes are involved). If one of these is in short supply, it controls the rate no matter how much of the others you add. That factor is the limiting factor. On a graph of rate against light intensity the line rises while light is limiting. When it levels off into a plateau, light is no longer limiting: something else, such as carbon dioxide concentration or temperature, has become the limiting factor. Temperature affects the rate because enzymes work best at an optimum; too high and they are denatured. In an investigation with an aquatic plant such as Elodea, you can count oxygen bubbles per minute as a lamp is moved nearer.`,
          ex: `A greenhouse grower raises light and finds the rate of photosynthesis rises, then flattens. At the flat part she adds carbon dioxide and the rate rises again, so carbon dioxide was the limiting factor on the plateau. On a cold sunny morning in the highlands, temperature is more likely to be limiting.`,
          q: `On a freezing but brightly sunny morning, what is the main factor limiting the rate of photosynthesis in crops, and why will adding more light not help?`,
          vis: 'Graph: rate of photosynthesis against light intensity with a plateau',
          ctx: `Rose and vegetable farms at Lake Naivasha use greenhouses where light, warmth and carbon dioxide can be controlled.`,
          exam: `Syllabus 6.1 Core 8 and Supplement 11. On plateau graphs write: "something other than [factor] is now the limiting factor", and name the likely factor.`,
          steps: [
            `Where the line rises steeply, the factor on the x-axis is limiting.`,
            `Where the line is flat, that factor is no longer limiting; another factor is.`,
            `Decide which other factor is most likely limiting in the described conditions.`
          ]
        }),
        P('cie_y10_bio_s1_3', '6.2 Leaf structure', {
          pt: 'A leaf built for photosynthesis',
          tag: 'Leaves are thin and flat with a large surface area, and each layer has a job.',
          body: `Most leaves have a large surface area to absorb light and are thin so that light reaches all cells and gases only travel a short distance. In the leaf of a dicotyledonous plant, from top to bottom: the cuticle (a waxy layer that reduces water loss), the upper epidermis (a transparent protective layer), palisade mesophyll (tightly packed cells full of chloroplasts, near the top where light is strongest), spongy mesophyll (loosely packed cells with air spaces between them so carbon dioxide can diffuse in), the lower epidermis, and stomata in the lower surface. Stomata are tiny pores, each opened and closed by a pair of guard cells, letting gases move in and out. Vascular bundles contain xylem (brings water) and phloem (carries sugars away).`,
          ex: `Carbon dioxide enters through a stoma, diffuses through an air space to a palisade cell, and is used in photosynthesis. Oxygen made in the chloroplasts diffuses back out the same way. If the stomata were sealed with petroleum jelly, photosynthesis would slow because little carbon dioxide could enter.`,
          q: `Why do palisade cells sit near the top of the leaf while the air spaces are lower down? What would be lost if the leaf were twice as thick?`,
          vis: 'Diagram: leaf cross section with labelled layers',
          ctx: `Sukuma wiki and kale (thin, broad leaves) show the large, thin shape; a pine needle shows a very different compromise.`,
          exam: `Syllabus 6.2 (Core). Label cuticle, epidermis, palisade, spongy mesophyll, air spaces, guard cells, stomata, vascular bundles, and link each feature to function.`,
          steps: [
            `Draw the layers in order from top to bottom.`,
            `Give one function per layer.`,
            `Explain how thinness and air spaces help gas exchange.`
          ]
        })
      ]
    },

    // ───────────── Topic 7 ─────────────
    {
      id: 'cie_y10_bio_s6',
      number: 6,
      title: 'Topic 7: Human nutrition',
      strand: 'Topic 7: Human nutrition',
      status: 'available',
      summary: 'A balanced diet, the digestive system, physical and chemical digestion, and absorption in the small intestine.',
      subtopics: [
        P('cie_y10_bio_s6_1', '7.1 Diet', {
          pt: 'What a balanced diet contains and why',
          tag: 'A balanced diet has the right amounts of all nutrients; missing one can cause a deficiency disease.',
          body: `A balanced diet contains all the nutrients in the right amounts for your age, size and activity. Carbohydrates (maize, rice, bread) give energy. Fats and oils give energy and insulation. Proteins (meat, beans, eggs, fish) are needed for growth and repair. Vitamin C (fruits such as oranges and guavas) is needed for healthy skin and gums; lack of it causes scurvy. Vitamin D (fish oil, eggs, and made in skin in sunlight) helps the body absorb calcium for bones; lack of it causes rickets, where bones are soft and bend. Calcium (milk, small fish eaten whole) makes bones and teeth strong. Iron (red meat, dark leafy vegetables) is needed to make haemoglobin in red blood cells. Fibre (roughage, in vegetables and whole grains) helps food move through the gut. Water is needed for all body chemistry and for transport.`,
          ex: `A child eats only ugali with no vegetables, fruit, beans or milk for months. We would expect problems linked to a lack of protein, vitamin C, iron and calcium. Adding sukuma wiki, beans and milk would improve the balance.`,
          q: `A teenager eats mostly white bread and soda. Which nutrients might be missing, and which deficiency diseases from the syllabus could develop if this continues for a long time?`,
          ctx: `A typical plate of ugali, sukuma wiki and beans gives carbohydrate, fibre, vitamin C, iron and protein together.`,
          exam: `Syllabus 7.1 (Core). Know the source and importance of each nutrient listed (vitamins C and D, calcium and iron only), and the causes of scurvy and rickets.`,
          steps: [
            `Name the nutrient group and give a food source.`,
            `State its importance in the body.`,
            `Link a missing nutrient to its disease: vitamin C to scurvy, vitamin D to rickets.`
          ]
        }),
        P('cie_y10_bio_s6_2', '7.2 Digestive system', {
          pt: 'The route food takes through the body',
          tag: 'Food is ingested, digested, absorbed, assimilated and the leftovers are egested.',
          body: `Digestion happens along the alimentary canal, a long tube from mouth to anus: mouth, oesophagus, stomach, small intestine (duodenum then ileum) and large intestine (colon, rectum, anus). Associated organs, which food does not pass through but which help digestion, are the salivary glands, pancreas, liver and gall bladder. Five processes: ingestion is taking food and drink into the body; digestion is the breakdown of food; absorption is the movement of nutrients from the intestines into the blood; assimilation is the uptake and use of nutrients by cells; egestion is removing undigested food as faeces. Do not confuse egestion with excretion: faeces were never part of the body's cells, whereas excretion removes waste made by metabolism.`,
          ex: `Trace a bite of chapati: ingested at the mouth, chewed and moved down the oesophagus, churned in the stomach, digested and absorbed in the small intestine, water absorbed in the colon, and the remaining fibre egested as faeces.`,
          q: `Food never enters the liver or pancreas, yet both are listed with the digestive system. What might they contribute, if food does not pass through them?`,
          vis: 'Diagram: alimentary canal with associated organs labelled',
          ctx: `Fibre from sukuma wiki is not digested but is egested, which is why it helps prevent constipation.`,
          exam: `Syllabus 7.2 (Core). Label the organs and match each of ingestion, digestion, absorption, assimilation and egestion to the correct organs.`,
          steps: [
            `List the alimentary canal organs in order.`,
            `Add the associated organs separately.`,
            `Match each of the five processes to where it mainly happens.`
          ]
        }),
        P('cie_y10_bio_s6_3', '7.3 Physical digestion', {
          pt: 'Breaking food into smaller pieces without changing the molecules',
          tag: 'Teeth and stomach muscles increase the surface area of food for enzymes.',
          body: `Physical digestion is the breakdown of food into smaller pieces without any chemical change to the food molecules. Its purpose is to increase the surface area of food so that enzymes in chemical digestion can reach more of it. Teeth do most of this. Incisors are chisel-shaped and cut and bite food. Canines are pointed and tear it. Premolars and molars are broad and flat and crush and grind. A tooth has hard enamel on the outside, dentine below it, a central pulp containing nerves and blood vessels, and cement that fixes the root into the jawbone; the teeth are embedded in bone and gums. The stomach also helps by contracting its muscular wall to churn the food. Supplement: bile, made in the liver and stored in the gall bladder, emulsifies fats and oils, breaking large droplets into many small ones, which increases the surface area for chemical digestion by lipase.`,
          ex: `Imagine a sugar cube and the same amount of powdered sugar in two cups of water: the powder dissolves much faster because more surface is exposed. In the same way, chewed food is digested faster than swallowed lumps.`,
          q: `If you swallowed meat in large chunks rather than chewing it, why would digestion by enzymes take longer, even though the enzymes themselves are the same?`,
          vis: 'Diagram: tooth cross section with enamel, dentine, pulp, cement',
          ctx: `Sugarcane chewing in Western Kenya makes strong use of molars to grind the fibre.`,
          exam: `Syllabus 7.3. Core: types and structure of teeth, role of stomach. Supplement: bile emulsification increases surface area.`,
          steps: [
            `Define physical digestion: smaller pieces, no chemical change.`,
            `Match tooth type to job: cut, tear, crush.`,
            `Explain the purpose: more surface area for enzymes (and for bile, emulsifying fats).`
          ]
        }),
        P('cie_y10_bio_s6_4', '7.4 Chemical digestion', {
          pt: 'Enzymes that break large molecules into small soluble ones',
          tag: 'Amylase, proteases and lipase break starch, protein and fat into molecules small enough to absorb.',
          body: `Large food molecules such as starch, protein and fat are insoluble and too big to pass through the gut wall. Chemical digestion breaks them down into small soluble molecules that can be absorbed. Amylase breaks starch into simple reducing sugars; proteases break protein into amino acids; lipase breaks fats and oils into fatty acids and glycerol. Amylase is secreted in the mouth by salivary glands and by the pancreas, and works in the mouth and small intestine. Protease is made in the stomach and by the pancreas, and works in the stomach and small intestine. Lipase is made by the pancreas and works in the small intestine. Hydrochloric acid in gastric juice kills harmful microorganisms in food and gives the acidic pH that stomach protease needs. Supplement: amylase breaks starch to maltose, then maltase breaks maltose to glucose on the membranes of the cells lining the small intestine; pepsin works in the acid of the stomach, trypsin works in the alkaline conditions of the small intestine; bile is alkaline and neutralises the acidic mixture entering the duodenum.`,
          ex: `Chew a piece of plain bread for a minute without swallowing: it begins to taste sweet. Salivary amylase is breaking starch to sugar. The stomach has pepsin and acid, so protein in the beans you ate is split into smaller chains there, then trypsin and other proteases complete the job in the small intestine.`,
          q: `Pepsin works best in acid, and trypsin works best in alkaline conditions. What could explain why they are made to work in different parts of the gut, and what changes the pH between stomach and small intestine?`,
          vis: 'Table: enzyme, substrate, product, where made, where it acts',
          ctx: `Lactose-intolerant people lack an enzyme (lactase) to digest the sugar in milk, so milk upsets their digestion.`,
          exam: `Syllabus 7.4. Core: three enzyme types with substrates and products, place of secretion and action, role of hydrochloric acid. Supplement: maltose and maltase, pepsin and trypsin pH, role of bile.`,
          steps: [
            `Write each enzyme with its substrate and product.`,
            `Say where each is secreted and where it acts.`,
            `Explain how pH suits the enzyme: acid in stomach, alkaline (helped by bile) in small intestine.`
          ]
        }),
        P('cie_y10_bio_s6_5', '7.5 Absorption', {
          pt: 'How digested food gets into the blood',
          tag: 'The small intestine is lined with villi that give it a huge surface area for absorption.',
          body: `The small intestine is where nutrients are absorbed. Most water is also absorbed in the small intestine, and some is absorbed from the colon. Absorption is quicker when the surface is large. The inner wall of the small intestine is folded into tiny finger-like projections called villi, and the cells covering the villi have even tinier projections called microvilli. Together they greatly increase the internal surface area. Each villus is thin-walled and has a network of blood capillaries just under the surface. Capillaries take up glucose and amino acids into the blood. Each villus also contains a lacteal, a lymph vessel that absorbs fatty acids and glycerol. Because a villus is only a cell or two thick and has a rich blood supply, nutrients cross quickly and are carried away, keeping the concentration gradient steep.`,
          ex: `A smooth tube 7 metres long would have a small inner surface. Folded into villi and microvilli, the surface area becomes many times larger, so far more glucose can be absorbed each minute.`,
          q: `Why is it an advantage that the blood keeps flowing through the capillaries in the villi, taking glucose away, rather than staying still?`,
          vis: 'Diagram: one villus with capillary network and lacteal',
          ctx: `Severe diarrhoea reduces absorption of water and nutrients, which is why oral rehydration solution is given to children.`,
          exam: `Syllabus 7.5. Core: small intestine absorbs nutrients; water absorbed in small intestine and colon. Supplement: villi and microvilli surface area, villus structure, capillaries and lacteals.`,
          steps: [
            `State the site of absorption: the small intestine.`,
            `Describe the villus: thin wall, capillaries, lacteal.`,
            `Explain how surface area and blood flow keep absorption quick.`
          ]
        })
      ]
    },

    // ───────────── Topic 8 ─────────────
    {
      id: 'cie_y10_bio_s7',
      number: 7,
      title: 'Topic 8: Transport in plants',
      strand: 'Topic 8: Transport in plants',
      status: 'available',
      summary: 'Xylem and phloem, water uptake by root hairs, transpiration and translocation.',
      subtopics: [
        P('cie_y10_bio_s7_1', '8.1 Xylem and phloem', {
          pt: 'The two transport tubes of a plant',
          tag: 'Xylem carries water and mineral ions up; phloem carries sucrose and amino acids around.',
          body: `Plants have two types of vessel running through roots, stems and leaves. Xylem transports water and mineral ions and also provides support. Phloem transports sucrose and amino acids. In sections of non-woody dicotyledonous plants, the vascular bundles are in different positions: in the root, xylem forms a central star or cross shape with phloem between its arms; in the stem, bundles form a ring near the outside; in the leaf, bundles form the veins, with xylem towards the upper surface and phloem below it. Supplement: xylem vessels are suited to their function by thick walls strengthened with lignin, no cell contents (so water flows freely), and cells joined end to end with no cross walls forming a long continuous tube.`,
          ex: `Put a white flower in water coloured with red ink. After some hours the petals show red veins, because dye moves up the xylem. A section of the stem under a microscope shows the stained xylem vessels in a ring.`,
          q: `If a ring of bark (including the phloem) were removed all the way round a stem, the leaves above would stay alive for a while. Which tube is still working, and what is no longer being delivered to the roots below?`,
          vis: 'Diagram: positions of xylem and phloem in root, stem and leaf',
          ctx: `Farmers who accidentally ring a tree trunk when clearing land find the tree later dies, because sugars cannot reach the roots.`,
          exam: `Syllabus 8.1. Core: functions and positions of xylem and phloem. Supplement: how xylem structure (lignin, no contents, continuous tube) fits its function.`,
          steps: [
            `Match xylem to water, ions and support; phloem to sucrose and amino acids.`,
            `Recall positions in a root, stem and leaf diagram.`,
            `Link xylem features to function.`
          ]
        }),
        P('cie_y10_bio_s7_2', '8.2 Water uptake', {
          pt: 'How water gets into the plant and to the leaves',
          tag: 'Root hair cells have a large surface area and water follows a set path to the leaf.',
          body: `Root hair cells are specialised cells on the surface of young roots. Each has a long, thin extension, which gives the root a large surface area for absorbing water and mineral ions from the soil. The path water takes is: root hair cell, root cortex cells, xylem, then up the stem to the leaf and into the mesophyll cells. Water enters the root hair cell by osmosis, because the soil water has a higher water potential than the cell sap. A suitable stain, such as red ink or eosin in the water, can show where the water travels through the above-ground parts of a plant, because the stain colours the xylem.`,
          ex: `Pull up a bean seedling and look at the roots with a hand lens: a fuzzy zone of fine hairs near the tip. Put the seedling stem in stain for an hour, cut across the stem, and the ring of coloured dots shows the xylem vessels carrying water.`,
          q: `If a root hair cell were short and round instead of long and thin, how would the amount of water absorbed per day change, and why?`,
          ctx: `Replanting tree seedlings from nurseries into the field is done carefully to avoid damaging the root hairs, which would reduce water uptake.`,
          exam: `Syllabus 8.2 (Core). Identify root hair cells, state the function and the water pathway in order.`,
          steps: [
            `Describe the root hair cell: long extension, large surface area.`,
            `State the pathway: root hair, cortex, xylem, mesophyll.`,
            `Describe how a stain is used to show the pathway.`
          ]
        }),
        P('cie_y10_bio_s7_3', '8.3 Transpiration', {
          pt: 'Water vapour lost from leaves and the pull that draws water up',
          tag: 'Evaporation from leaf cells pulls a continuous column of water up the xylem.',
          body: `Transpiration is the loss of water vapour from leaves. Water evaporates from the surface of the mesophyll cells into the air spaces inside the leaf, then diffuses out through the stomata as water vapour. Transpiration is faster when it is hot (more evaporation), when it is windy (wind carries away the vapour, keeping the gradient steep), and when the air is dry (low humidity). It is slower in cool, still, humid air. Supplement: the rate of water loss is related to the large internal surface area provided by the connected air spaces and to the size and number of stomata. As water leaves the leaf, it pulls more water up the xylem: this is the transpiration pull. Water molecules are held together by forces of attraction, so a continuous column of water is pulled up from the roots. If water is lost faster than it can be replaced, cells lose turgor and the plant wilts.`,
          ex: `Set up two identical leafy shoots on a potometer: one in a still room, one in front of a fan. The bubble in the fan potometer moves faster, showing wind raises the transpiration rate.`,
          q: `On a hot, dry, windy afternoon the leaves of a plant droop but recover at night. What does this tell you about the balance between water loss and uptake during the day, and what happens to the cells to cause the droop?`,
          vis: 'Diagram: path of water from root to stomata with transpiration pull arrows',
          ctx: `Maize leaves curl in the dry weather of the Rift Valley to reduce water loss when the soil is dry.`,
          exam: `Syllabus 8.3. Core: definition, path, effect of temperature and wind. Supplement: air spaces and stomata, transpiration pull, humidity, wilting.`,
          steps: [
            `Describe the path: evaporation from mesophyll cell walls, diffusion through air spaces, out via stomata.`,
            `Explain how heat, wind and humidity change the gradient.`,
            `Explain that the loss pulls the water column up because water molecules stick together.`
          ]
        }),
        P('cie_y10_bio_s7_4', '8.4 Translocation', {
          pt: 'Moving sugars from where they are made to where they are needed',
          tag: 'Translocation moves sucrose and amino acids in phloem from sources to sinks.',
          body: `Translocation is the movement of sucrose and amino acids in phloem from sources to sinks. A source is a part of the plant that releases sucrose or amino acids, for example a leaf making sugar by photosynthesis. A sink is a part that uses or stores them, for example growing shoot tips, roots, fruits and storage organs. A part of the plant can be a source at one time and a sink at another. A potato tuber, for example, is a sink when it fills with starch during the growing season, but a source when it sprouts the next spring and releases sugar to the new shoot.`,
          ex: `A sweet potato vine makes sugar in its leaves during the day. That sucrose travels down the phloem into the tuber to be stored, so the tuber is a sink. When the tuber later sprouts, stored carbohydrate is moved to the new shoot, so the same tuber is now a source.`,
          q: `In which part of a growing maize plant would you expect to find the biggest sink for sucrose when the cob is filling with grain, and which part is the main source?`,
          ctx: `Mango fruits become sweeter as they ripen because sugars are moved into them from the leaves.`,
          exam: `Syllabus 8.4 (Supplement). Define translocation, source and sink, and give an example where one organ is both at different times.`,
          steps: [
            `Define source (releases) and sink (uses or stores).`,
            `Identify the sources and sinks in a given plant.`,
            `Explain why a storage organ can switch roles over the season.`
          ]
        })
      ]
    }
  ]
};

const BIOLOGY_Y11 = {
  curriculum: 'BRITISH',
  grade: 11,
  subject: 'Biology',
  code: '0610',
  trackPathway: 'IGCSE',
  title: 'Cambridge IGCSE Biology (0610) Year 11 Exam Units',
  description: `Year 11 covers Topics 9 to 21 of the Cambridge IGCSE Biology (0610) syllabus content list for 2026-2028: transport in animals, diseases and immunity, gas exchange, respiration, excretion, coordination and response, drugs, reproduction, inheritance, variation and selection, organisms and their environment, human influences on ecosystems, and biotechnology and genetic modification. Core and Supplement content are both included and flagged in each exam focus line.`,
  notes: `Written to follow the public 0610 content list.`,
  stations: [
    // ───────────── Topic 9 (existing station s1) ─────────────
    {
      id: 'cie_y11_bio_s1',
      number: 1,
      title: 'Topic 9: Transport in animals',
      strand: 'Topic 9: Transport in animals',
      status: 'available',
      summary: 'Circulatory systems, heart structure and function, coronary heart disease, blood vessels and blood.',
      subtopics: [
        P('cie_y11_bio_s1_1', '4.1 Mammalian Heart Anatomy, Valve Mechanics & Double Circulation', {
          pt: 'Systemic vs Pulmonary Circuits & Coronary Blood Supply',
          tag: 'Blood passes through the heart twice for every complete circuit of the body.',
          body: `A circulatory system is a system of blood vessels with a pump (the heart) and valves to ensure one-way flow of blood. A fish has a single circulation: blood goes from the heart to the gills and then straight on to the body, then back to the heart. A mammal has a double circulation: the right side of the heart pumps deoxygenated blood to the lungs (pulmonary circuit) and the left side pumps oxygenated blood to the rest of the body (systemic circuit). The advantage is that blood returning from the lungs is pumped again, at higher pressure, so it reaches the body quickly and delivers oxygen faster, while the lung circuit can stay at lower pressure that does not damage delicate lung capillaries. The heart has a muscular wall, a septum that separates left and right sides (keeping oxygenated and deoxygenated blood apart), two atria (receive blood) and two ventricles (pump blood out). Blood flows from the atria to the ventricles through atrioventricular valves, and leaves the ventricles through semilunar valves, which stop blood flowing backwards. The left ventricle wall is thicker than the right because it pumps blood around the whole body at high pressure, whereas the right only pumps to the nearby lungs. Ventricle walls are thicker than atrial walls because ventricles pump further. Coronary arteries supply the heart muscle itself.`,
          ex: `Trace one red blood cell: vena cava -> right atrium -> right ventricle -> pulmonary artery -> lungs (picks up oxygen) -> pulmonary vein -> left atrium -> left ventricle -> aorta -> body. It has passed through the heart twice in one complete circuit.`,
          q: `Why is the muscular wall of the left ventricle significantly thicker than that of the right ventricle?`,
          f: 'Pulmonary circuit: Right ventricle -> Pulmonary artery -> Lungs -> Pulmonary vein -> Left atrium',
          vis: 'Flowchart: four-chamber heart with valves and vessels labelled',
          ctx: `Heart surgery in Kenyan hospitals often deals with faulty valves or blocked coronary arteries.`,
          exam: `Syllabus 9.1 and 9.2. Core: circulatory system, heart structures, arteries away and veins towards. Supplement: single versus double circulation, advantages, valves, wall thickness, septum, how the heart works. Be able to trace blood through named structures.`,
          steps: [
            `Start at the vena cava and move through right atrium, right ventricle, pulmonary artery, lungs.`,
            `Return via pulmonary vein, left atrium, left ventricle, and out through the aorta.`,
            `Explain wall thickness by comparing the distance and pressure needed for each ventricle.`
          ]
        }),
        P('cie_y11_bio_s1_2', '9.2 Heart activity, exercise and coronary heart disease', {
          pt: 'Monitoring the heart and keeping it healthy',
          tag: 'Exercise raises heart rate, and blocked coronary arteries cause coronary heart disease.',
          body: `Heart activity can be monitored by an ECG (electrocardiogram), by measuring pulse rate, and by listening to the sounds of the valves closing. During physical activity the muscles respire faster and need more oxygen and glucose and must get rid of carbon dioxide; the heart beats faster to deliver blood more quickly. After exercise heart rate gradually returns to normal. Coronary heart disease (CHD) happens when the coronary arteries become blocked, for example by fatty deposits, so the heart muscle does not get enough oxygen and may stop working properly. Risk factors include diet (too much saturated fat), lack of exercise, stress, smoking, genetic predisposition (a family tendency), age and sex. A balanced diet low in saturated fat, regular exercise and not smoking reduce the risk.`,
          ex: `Measure your pulse for 15 seconds sitting down and multiply by 4: say 72 beats per minute. Run on the spot for 2 minutes and measure again: perhaps 130. Measure each minute afterwards to see recovery time. A fitter person usually has a lower resting rate and recovers faster.`,
          q: `Two people have the same family history of heart disease. One smokes and rarely exercises; the other does not smoke and plays football three times a week. Which risk factors can each person change and which can they not?`,
          vis: 'Graph: heart rate before, during and after exercise',
          ctx: `Rising rates of lifestyle diseases in Nairobi are linked to diets high in fried food and to less exercise.`,
          exam: `Syllabus 9.2. Core: monitoring methods, investigation of heart rate and exercise, CHD and risk factors, diet and exercise. Supplement: explain why exercise raises heart rate.`,
          steps: [
            `Link exercise to higher respiration and demand for oxygen.`,
            `Explain that a faster heart rate supplies blood faster.`,
            `Describe CHD as a blocked coronary artery and list risk factors.`
          ]
        }),
        P('cie_y11_bio_s1_3', '9.3 Blood vessels', {
          pt: 'Arteries, veins and capillaries',
          tag: 'Each type of blood vessel has a structure that matches the pressure and job of the blood in it.',
          body: `Arteries carry blood away from the heart at high pressure. They have thick, muscular, elastic walls and a narrow lumen (the space in the middle). Veins carry blood back to the heart at low pressure. They have thinner walls, a wider lumen and valves that stop blood flowing backwards. Capillaries are the smallest vessels, with walls one cell thick, and they allow exchange of substances between blood and body cells. Supplement: thick walls in arteries withstand and maintain high pressure; thin walls and a very narrow diameter in capillaries let substances diffuse quickly and bring blood close to every cell. Main vessels to identify: vena cava and aorta (heart), pulmonary artery and pulmonary vein (heart and lungs), renal artery and vein (kidney), and the hepatic artery, hepatic veins and hepatic portal vein (liver; the portal vein carries blood from the intestines to the liver).`,
          ex: `When you cut a finger, bright red blood spurting in pulses suggests an artery; dark blood flowing smoothly suggests a vein. At the heart, a doctor can feel the pulse because the arteries stretch with each beat.`,
          q: `Why would valves be needed in veins in the legs, but not in the aorta?`,
          vis: 'Diagram: cross sections of artery, vein and capillary',
          ctx: `Long hours standing, like a mama mboga at her stall, can make leg veins swell when valves become weak.`,
          exam: `Syllabus 9.3. Core: structure of the three vessels, capillary function, name main vessels. Supplement: relate structure to pressure, and the hepatic vessels.`,
          steps: [
            `Compare wall thickness, lumen and valves for the three vessels.`,
            `Link each feature to blood pressure or exchange.`,
            `Name the vessels attached to the heart, lungs, kidney and liver.`
          ]
        }),
        P('cie_y11_bio_s1_4', '9.4 Blood', {
          pt: 'What blood is made of and what each part does',
          tag: 'Blood is a tissue of red cells, white cells, platelets and plasma, each with a function.',
          body: `Blood has four components. Red blood cells carry oxygen, using the pigment haemoglobin. White blood cells defend the body, by phagocytosis (engulfing and digesting pathogens) and by making antibodies. Platelets are fragments of cells that help blood to clot. Plasma is the pale yellow liquid in which cells are carried; it also transports ions, nutrients, urea, hormones and carbon dioxide. Clotting plugs a wound and so prevents blood loss and prevents pathogens entering. Supplement: lymphocytes make antibodies, and phagocytes engulf pathogens by phagocytosis. In clotting, a soluble protein called fibrinogen is converted to insoluble fibrin, which forms a mesh that traps red cells and seals the cut. Under a microscope red cells have no nucleus and are biconcave discs, while white cells are larger and have a nucleus.`,
          ex: `When you scrape your knee, bleeding slows and a scab forms in minutes. Platelets trigger the change of fibrinogen into fibrin threads which trap cells and form a clot, then a scab protects the wound from pathogens while it heals.`,
          q: `A person loses a lot of blood after an accident. Which function of blood is affected first, and why would losing plasma as well as red cells be a problem?`,
          vis: 'Photomicrograph key: red cells, lymphocyte and phagocyte',
          ctx: `Blood donation drives at schools in Kenya collect whole blood, from which red cells, plasma and platelets can be separated.`,
          exam: `Syllabus 9.4. Core: components and functions, clotting roles. Supplement: lymphocytes and phagocytes, fibrinogen to fibrin.`,
          steps: [
            `List the four components.`,
            `Give a one-line function for each.`,
            `Describe clotting as fibrinogen turning to fibrin.`
          ]
        })
      ]
    },

    // ───────────── Topic 10 ─────────────
    {
      id: 'cie_y11_bio_s3',
      number: 2,
      title: 'Topic 10: Diseases and immunity',
      strand: 'Topic 10: Diseases and immunity',
      status: 'available',
      summary: 'Pathogens and transmission, body defences, controlling the spread of disease, active and passive immunity, vaccination and cholera.',
      subtopics: [
        P('cie_y11_bio_s3_1', '10.1a Pathogens, transmission and body defences', {
          pt: 'How diseases spread and how the body and society stop them',
          tag: 'A transmissible disease is passed from host to host by direct or indirect contact.',
          body: `A pathogen is a disease-causing organism, for example a bacterium, virus or fungus. A transmissible disease is one where the pathogen can be passed from one host to another. Pathogens are transmitted directly, by direct contact including through blood and other body fluids, or indirectly, from contaminated surfaces, food, animals and air. The body has defences: the skin (a barrier), hairs in the nose and mucus (trap particles and microbes), stomach acid (kills microbes in food), and white blood cells. Spread of disease is controlled by a clean water supply, hygienic food preparation, good personal hygiene, waste disposal and sewage treatment.`,
          ex: `A cholera outbreak after floods often happens because latrines overflow into drinking water. Boiling or treating drinking water, washing hands after using a toilet, and covering food each cut a route of transmission.`,
          q: `Think of a school where many learners fall ill with stomach infections. List three indirect ways the pathogen could have spread and one measure that would stop each.`,
          vis: 'Diagram: routes of transmission and the barrier that blocks each',
          ctx: `Handwashing stations (kibuyu or tippy-taps) at schools are a low-cost way of breaking transmission routes.`,
          exam: `Syllabus 10.1 (Core). Define pathogen and transmissible disease, name routes of transmission, list defences, and explain how hygiene controls spread.`,
          steps: [
            `Define pathogen and transmissible disease.`,
            `Sort the routes into direct and indirect.`,
            `Match each control measure to the route it blocks.`
          ]
        }),
        P('cie_y11_bio_s3_2', '10.1b Immunity: antibodies, vaccination and passive immunity', {
          pt: 'How the body learns to defend itself',
          tag: 'Antibodies bind specific antigens, vaccination gives long-term immunity and passive immunity is short-term.',
          body: `Each pathogen has its own antigens, molecules on its surface with specific shapes. Lymphocytes make antibodies, proteins with a shape complementary to one particular antigen so they bind to it. Antibodies either destroy the pathogen directly or mark it for destruction by phagocytes. Active immunity is defence by antibody production in your own body, gained after an infection or by vaccination. Vaccination: weakened pathogens or their antigens are put into the body; the antigens stimulate an immune response from lymphocytes, which produce antibodies; and memory cells are produced, which give long-term immunity because they respond quickly if the same pathogen returns. Vaccination controls the spread of a disease because many immune people means few places for the pathogen to survive. Passive immunity is short-term defence by antibodies acquired from another individual, such as across the placenta or in breast milk. No memory cells are made in passive immunity, so protection fades. This is why breast-feeding is important for infants.`,
          ex: `A baby is born with antibodies from the mother, which protect for the first months. The baby is then given vaccines (such as for measles and polio) so its own lymphocytes learn the antigens and make memory cells for lasting protection.`,
          q: `Why can a person catch measles only once in most cases, while they might catch the common cold many times?`,
          vis: 'Diagram: antigen, antibody shapes and memory cells after vaccination',
          ctx: `Kenya's childhood immunisation schedule gives vaccines at clinics so that children develop memory cells before they meet the real pathogens.`,
          exam: `Syllabus 10.1 Supplement 6 to 15. Distinguish active and passive immunity, explain how vaccination works, and say that memory cells are not produced in passive immunity.`,
          steps: [
            `Link each antibody to one specific antigen shape.`,
            `Describe vaccination in order: antigens in, lymphocytes respond, antibodies and memory cells made.`,
            `Contrast active immunity (own antibodies, long-term) with passive (borrowed antibodies, short-term).`
          ]
        }),
        P('cie_y11_bio_s3_3', '10.1c Cholera', {
          pt: 'How one bacterium causes severe diarrhoea',
          tag: 'The cholera bacterium makes a toxin that causes water to leave the blood into the gut.',
          body: `Cholera is a disease caused by a bacterium transmitted in contaminated water. Supplement: the cholera bacterium produces a toxin (poison). The toxin causes the cells lining the small intestine to secrete chloride ions into the gut. This lowers the water potential in the gut, so water moves into the gut by osmosis. The result is diarrhoea, dehydration and loss of ions from the blood. Treatment gives fluids and salts to replace what was lost. Control relies on a clean water supply and sewage treatment.`,
          ex: `A patient with cholera can lose several litres of water in a day. Oral rehydration solution contains salts and glucose so that water is absorbed again, replacing the lost fluid.`,
          q: `Chloride ions are moved into the gut, but it is the water that causes the diarrhoea. Using what you know about osmosis, explain how moving ions can cause water to follow.`,
          ctx: `Cholera outbreaks in Kenya have been linked to crowded areas with poor access to clean water.`,
          exam: `Syllabus 10.1 Core (cholera as a bacterial disease in contaminated water) and Supplement 17 (toxin, chloride ions, osmotic water movement).`,
          steps: [
            `Say how cholera is transmitted: contaminated water.`,
            `Explain the toxin effect: chloride ions secreted into the gut.`,
            `Use osmosis to explain the water loss and its consequences.`
          ]
        })
      ]
    },

    // ───────────── Topic 11 ─────────────
    {
      id: 'cie_y11_bio_s4',
      number: 3,
      title: 'Topic 11: Gas exchange in humans',
      strand: 'Topic 11: Gas exchange in humans',
      status: 'available',
      summary: 'Gas exchange surfaces, the breathing system, ventilation, inspired and expired air, exercise and breathing, and protection of the airways.',
      subtopics: [
        P('cie_y11_bio_s4_1', '11.1a Gas exchange surfaces and the breathing system', {
          pt: 'Where oxygen enters the blood',
          tag: 'Gas exchange surfaces are large, thin, well supplied with blood and well ventilated.',
          body: `Gas exchange is the movement of oxygen into the blood and carbon dioxide out. A good gas exchange surface has a large surface area, a thin surface (a short distance for diffusion), a good blood supply (to carry gases away and keep the gradient steep) and good ventilation with air. The breathing system parts: air enters through the larynx and trachea, which divides into two bronchi, one to each lung; these branch into smaller bronchioles ending in alveoli (tiny air sacs) surrounded by capillaries. The lungs sit inside the thorax, protected by the ribs and powered by the diaphragm and intercostal muscles. Supplement: cartilage in the wall of the trachea keeps it open when you breathe in.`,
          ex: `Oxygen in the air in an alveolus is at a higher concentration than in the blood arriving in the capillary. It diffuses across the thin wall into the blood, while carbon dioxide diffuses the other way. There are about 300 million alveoli in a pair of adult lungs, giving a very large total surface area.`,
          q: `Smoking damages the walls of the alveoli so that several join into one larger space. How would this change the surface area, and what effect would it have on a person who exercises?`,
          vis: 'Diagram: breathing system with alveolus and capillary enlarged',
          ctx: `Athletes training at altitude in Iten breathe thinner air, which is why gas exchange efficiency matters.`,
          exam: `Syllabus 11.1 (Core). Label the breathing system, list the four features of a gas exchange surface, and apply them to alveoli. Supplement: cartilage in the trachea.`,
          steps: [
            `List the four features of a gas exchange surface.`,
            `Label the path of air: trachea, bronchi, bronchioles, alveoli.`,
            `Explain how each feature of the alveoli matches the four features.`
          ]
        }),
        P('cie_y11_bio_s4_2', '11.1b Ventilation and the composition of air', {
          pt: 'How breathing moves air in and out',
          tag: 'Changes in thorax volume change pressure, and air moves from high to low pressure.',
          body: `Ventilation is moving air in and out of the lungs. Breathing in: the external intercostal muscles contract and move the ribs up and out, and the diaphragm contracts and flattens. These actions increase the volume of the thorax, which lowers the pressure inside, so air at higher atmospheric pressure flows in. Breathing out: the internal intercostal muscles can contract to move ribs down and in, the diaphragm relaxes and rises into a dome, volume decreases, pressure rises above the outside, and air flows out. Inspired (breathed-in) air has about 21% oxygen, 0.04% carbon dioxide and variable water vapour. Expired (breathed-out) air has less oxygen, about 4% carbon dioxide and more water vapour, because cells use oxygen in respiration and produce carbon dioxide and water. Limewater turns cloudy when carbon dioxide is bubbled through, so it shows expired air has more carbon dioxide.`,
          ex: `Place your hands on your lower ribs and breathe in deeply: you feel the ribs move up and out. Bubble breath through limewater in one tube and air from a pump through limewater in another: the breath tube clouds faster.`,
          q: `If a person had a hole in the chest wall that let air into the space around the lungs, why would the lungs not fill properly when the diaphragm contracts?`,
          vis: 'Diagram: rib cage and diaphragm in breathing in and breathing out',
          ctx: `Using the limewater test, a school lab can show that exhaled air has more carbon dioxide than the air in the classroom.`,
          exam: `Syllabus 11.1. Core: composition of inspired and expired air, limewater test. Supplement: role of ribs, intercostal muscles and diaphragm in volume and pressure changes.`,
          steps: [
            `Describe muscle actions: ribs up and out, diaphragm flattens.`,
            `State that volume increases and pressure falls.`,
            `State that air moves from higher pressure outside to lower pressure inside.`
          ]
        }),
        P('cie_y11_bio_s4_3', '11.1c Exercise, breathing and protecting the airways', {
          pt: 'Why you pant after running and how the lungs stay clean',
          tag: 'Higher carbon dioxide in the blood makes the brain increase the rate and depth of breathing.',
          body: `During physical activity muscle cells respire faster, producing more carbon dioxide. The extra carbon dioxide in the blood is detected by the brain, which sends signals that increase the rate and depth of breathing, supplying oxygen faster and removing carbon dioxide faster. You can investigate by counting breaths per minute and chest expansion before and after exercise. Supplement: the airways are protected from pathogens and particles. Goblet cells make mucus, which traps dust and microorganisms; ciliated cells have tiny hairs (cilia) that sweep the mucus up and away from the lungs towards the throat, where it is swallowed or coughed out.`,
          ex: `A learner breathes 15 times per minute at rest and 35 times per minute after a 400 m run. Her breaths are also deeper. The blood carbon dioxide level went up, and her brain increased breathing to remove it.`,
          q: `Cigarette smoke damages cilia. Using the roles of goblet cells and cilia, explain why smokers often have a persistent cough.`,
          vis: 'Diagram: goblet cell and ciliated cells in the trachea lining',
          ctx: `Dust from roads and cooking smoke in poorly ventilated kitchens are particles that the mucus and cilia must remove.`,
          exam: `Syllabus 11.1. Core: investigate breathing rate and depth with exercise. Supplement: carbon dioxide detection by the brain, goblet cells, mucus and cilia.`,
          steps: [
            `Link exercise to more carbon dioxide made.`,
            `Say the brain detects it and increases rate and depth of breathing.`,
            `Describe how mucus traps particles and cilia move it away.`
          ]
        })
      ]
    },

    // ───────────── Topic 12 ─────────────
    {
      id: 'cie_y11_bio_s5',
      number: 4,
      title: 'Topic 12: Respiration',
      strand: 'Topic 12: Respiration',
      status: 'available',
      summary: 'Uses of energy, aerobic respiration, anaerobic respiration in yeast and muscles, and removing the oxygen debt.',
      subtopics: [
        P('cie_y11_bio_s5_1', '12.1 Respiration and the uses of energy', {
          pt: 'Why living things need energy all the time',
          tag: 'Respiration releases energy that living organisms use for every life process.',
          body: `Respiration is a set of chemical reactions in cells that release energy from nutrient molecules such as glucose. The energy is used for muscle contraction, protein synthesis (building proteins), cell division, active transport, growth, the passage of nerve impulses, and the maintenance of a constant body temperature. Respiration is not the same as breathing: breathing moves air in and out of the lungs, whereas respiration happens inside cells. Temperature affects respiration because it is controlled by enzymes: yeast respires faster in warm water (up to an optimum) than in cold water, which you can show by counting carbon dioxide bubbles produced by a yeast-and-sugar mixture at different temperatures.`,
          ex: `Mix dried yeast with sugar solution at 20 C, 35 C and 70 C in three tubes. The 35 C tube bubbles fastest, the 20 C tube more slowly, and the 70 C tube hardly at all because the enzymes have been denatured.`,
          q: `A newborn goat kid shivers as soon as it is born in a cold night. Which use of energy from respiration is this, and why does the kid need it?`,
          vis: 'Table: use of energy and a body example for each',
          ctx: `Yeast is used in making mandazi dough and traditional brews, relying on its respiration being warm and active.`,
          exam: `Syllabus 12.1 (Core). List the seven uses of energy, and describe an investigation into temperature and yeast respiration.`,
          steps: [
            `State what respiration is and where it occurs.`,
            `List the uses of energy.`,
            `Describe how temperature changes yeast respiration rate through enzymes.`
          ]
        }),
        P('cie_y11_bio_s5_2', '12.2 Aerobic respiration', {
          pt: 'Releasing energy from glucose using oxygen',
          tag: 'Aerobic respiration uses oxygen to break down glucose into carbon dioxide and water.',
          body: `Aerobic respiration is the chemical reactions in cells that use oxygen to break down nutrient molecules to release energy. The word equation is glucose + oxygen -> carbon dioxide + water. Supplement: the balanced symbol equation is C6H12O6 + 6O2 -> 6CO2 + 6H2O. This is why we breathe in oxygen and breathe out carbon dioxide and water vapour. Most of the reactions occur in the mitochondria. Aerobic respiration releases much more energy per glucose molecule than anaerobic respiration.`,
          ex: `Count atoms to check the equation: left side has 6 carbon, 12 hydrogen and 6 + 12 = 18 oxygen atoms (6 in glucose, 12 in 6 O2). Right side has 6 CO2 (6 carbon, 12 oxygen) and 6 H2O (12 hydrogen, 6 oxygen), giving 18 oxygen atoms. It balances.`,
          q: `Photosynthesis and aerobic respiration use the same chemicals. Compare the two equations and describe how they are opposites.`,
          f: 'C6H12O6 + 6O2 -> 6CO2 + 6H2O (+ energy)',
          vis: 'Equation diagram with glucose, oxygen, carbon dioxide, water',
          ctx: `A long-distance runner's cells run on aerobic respiration for most of a race, which is why steady breathing matters.`,
          exam: `Syllabus 12.2. Core: definition and word equation. Supplement: balanced chemical equation. Do not confuse respiration with breathing.`,
          steps: [
            `Write the word equation.`,
            `Convert to the balanced symbol equation and check the atoms.`,
            `Link the oxygen used and carbon dioxide produced to breathing.`
          ]
        }),
        P('cie_y11_bio_s5_3', '12.3 Anaerobic respiration and oxygen debt', {
          pt: 'Releasing energy without oxygen',
          tag: 'Anaerobic respiration releases far less energy and makes alcohol and carbon dioxide in yeast, or lactic acid in muscle.',
          body: `Anaerobic respiration is the chemical reactions in cells that break down nutrient molecules to release energy without using oxygen. It releases much less energy per glucose molecule than aerobic respiration. In yeast: glucose -> alcohol + carbon dioxide (Supplement balanced equation: C6H12O6 -> 2C2H5OH + 2CO2). In human muscles during vigorous exercise: glucose -> lactic acid. Lactic acid builds up in muscles and blood and causes an oxygen debt (extra oxygen needed afterwards). Supplement: the oxygen debt is removed after exercise by continued fast heart rate, which transports lactic acid in the blood from the muscles to the liver; continued deeper and faster breathing to supply oxygen; and aerobic respiration of the lactic acid in the liver.`,
          ex: `After a 100 m sprint you keep breathing hard for a minute or two even though you have stopped. The deep breaths are paying the oxygen debt: the liver is using oxygen to break down the lactic acid that built up.`,
          q: `Bread dough rises when yeast respires anaerobically in it. Which product of the reaction makes the bubbles, and what happens to the alcohol made when the bread is baked?`,
          vis: 'Diagram: aerobic and anaerobic pathways side by side',
          ctx: `Yeast fermentation also makes traditional brews, and mandazi or bread dough rises in the same way.`,
          exam: `Syllabus 12.3. Core: definition, word equations in yeast and muscle, much less energy. Supplement: balanced equation, oxygen debt and how it is removed.`,
          steps: [
            `State that no oxygen is used and less energy is released.`,
            `Give the product for yeast (alcohol and carbon dioxide) and muscle (lactic acid).`,
            `Outline how the oxygen debt is repaid.`
          ]
        })
      ]
    },

    // ───────────── Topic 13 ─────────────
    {
      id: 'cie_y11_bio_s6',
      number: 5,
      title: 'Topic 13: Excretion in humans',
      strand: 'Topic 13: Excretion in humans',
      status: 'available',
      summary: 'Excretion by lungs and kidneys, the urinary system, the nephron, and the liver and urea.',
      subtopics: [
        P('cie_y11_bio_s6_1', '13.1a Excretion, the liver and urea', {
          pt: 'Removing waste made by the body',
          tag: 'Excretion removes waste products of metabolism, including carbon dioxide and urea.',
          body: `Excretion is removing the waste products of metabolism and substances in excess of requirements. Carbon dioxide is excreted through the lungs. The kidneys excrete urea, excess water and excess ions. Supplement: the liver assimilates amino acids by converting them into proteins. Excess amino acids cannot be stored, so the liver carries out deamination: removing the nitrogen-containing part of the amino acid to form urea. The rest of the molecule can be used in respiration. Urea is carried in the blood to the kidneys. Excretion of urea is important because urea is toxic: if it builds up in the blood it harms the body.`,
          ex: `A person eats a large meal of meat, containing more protein than the body needs. Excess amino acids are deaminated in the liver, urea is made, and the kidneys remove it in the urine, which is why urine contains urea.`,
          q: `Egestion removes faeces and excretion removes urea. Explain why faeces are egested, not excreted.`,
          vis: 'Flow diagram: amino acids -> liver -> urea -> kidney -> urine',
          ctx: `Dehydration in hot weather makes urine darker because urea is more concentrated when less water is lost.`,
          exam: `Syllabus 13.1. Core: excretion organs. Supplement: liver and assimilation, deamination, why urea must be excreted.`,
          steps: [
            `Define excretion and name the excretory products and organs.`,
            `Explain deamination: nitrogen part removed to make urea.`,
            `Explain that urea is toxic and the kidneys excrete it.`
          ]
        }),
        P('cie_y11_bio_s6_2', '13.1b The urinary system and the nephron', {
          pt: 'How the kidney filters blood and makes urine',
          tag: 'The nephron filters the blood and then reabsorbs what the body needs, leaving urine.',
          body: `The urinary system: two kidneys make urine; ureters carry it to the bladder, which stores it; the urethra carries it out. A section through a kidney shows an outer cortex and an inner medulla. The working unit of the kidney is the nephron, with its blood vessels. Supplement: in the glomerulus (a knot of capillaries), blood pressure forces water, glucose, urea and ions out of the blood into the nephron: filtration. As this liquid passes along the tube of the nephron, all of the glucose, some of the ions and most of the water are reabsorbed back into the blood. What is left, containing urea, excess water and excess ions, is urine. (Detailed mechanisms are not required.) Because the amount of water reabsorbed varies, a dehydrated person makes small volumes of concentrated urine.`,
          ex: `Think of a sieve and a shop: the glomerulus is the sieve that lets small molecules through (including useful glucose); the rest of the nephron is the shop that takes back the useful items (all the glucose) and leaves behind waste (urea). If glucose appeared in urine, the reabsorption was not complete, which can be a sign of diabetes.`,
          q: `If protein appears in the urine of a patient, the filter is probably damaged. Using the fact that proteins are large molecules, why is it unusual to find protein in urine?`,
          vis: 'Diagram: kidney section and a nephron with glomerulus',
          ctx: `Kidney function tests at county hospitals check urine for protein and glucose as early warning signs.`,
          exam: `Syllabus 13.1. Core: identify kidneys, ureters, bladder, urethra. Supplement: kidney cortex and medulla, filtration in the glomerulus, selective reabsorption, urine formation.`,
          steps: [
            `Trace urine: kidney, ureter, bladder, urethra.`,
            `State what is filtered at the glomerulus.`,
            `State what is reabsorbed: all glucose, some ions and most water.`
          ]
        })
      ]
    },

    // ───────────── Topic 14 ─────────────
    {
      id: 'cie_y11_bio_s7',
      number: 6,
      title: 'Topic 14: Coordination and response',
      strand: 'Topic 14: Coordination and response',
      status: 'available',
      summary: 'The nervous system, reflex arcs and synapses, the eye, hormones, homeostasis and tropic responses.',
      subtopics: [
        P('cie_y11_bio_s7_1', '14.1a Nervous system and reflex arcs', {
          pt: 'Electrical messages that coordinate the body',
          tag: 'Neurones carry electrical impulses, and a reflex arc gives a fast automatic response.',
          body: `Electrical impulses travel along neurones. The central nervous system (CNS) is the brain and spinal cord. The peripheral nervous system (PNS) is the nerves outside the brain and spinal cord. The nervous system coordinates and regulates body functions. There are three kinds of neurone: sensory (carry impulses from receptors to the CNS), relay (inside the CNS) and motor (carry impulses from the CNS to effectors, which are muscles or glands). A simple reflex arc: stimulus -> receptor -> sensory neurone -> relay neurone -> motor neurone -> effector -> response. A reflex action is an automatic and rapid way of integrating and coordinating stimuli with the responses of effectors (muscles and glands) without needing conscious thought.`,
          ex: `Touch a hot sufuria handle: receptors in your skin send an impulse along a sensory neurone to the spinal cord, a relay neurone passes it to a motor neurone, and your arm muscle (effector) pulls your hand away. The reflex is complete before the brain registers pain.`,
          q: `Why is it an advantage for the pathway of a reflex to go through the spinal cord rather than all the way to the brain and back?`,
          vis: 'Diagram: reflex arc with receptor, three neurones and effector',
          ctx: `Blinking when dust blows into your eyes on a dry road is a protective reflex.`,
          exam: `Syllabus 14.1 (Core). Describe CNS and PNS, identify the three neurone types, and name each part of a reflex arc in order.`,
          steps: [
            `Name the parts of the reflex arc in order.`,
            `Identify each neurone type from a diagram.`,
            `Explain why a reflex is rapid and automatic.`
          ]
        }),
        P('cie_y11_bio_s7_2', '14.1b Synapses', {
          pt: 'How an impulse crosses the gap between neurones',
          tag: 'At a synapse a chemical, the neurotransmitter, carries the message across the gap.',
          body: `A synapse is a junction between two neurones. The two neurones do not touch: there is a tiny synaptic gap. Supplement: the synapse contains vesicles with neurotransmitter molecules in the first neurone and receptor proteins on the next neurone. Events: (a) an impulse arrives and stimulates the release of neurotransmitter from the vesicles into the gap; (b) the neurotransmitter molecules diffuse across the gap; (c) they bind with receptor proteins on the next neurone; (d) an impulse is then stimulated in the next neurone. Because neurotransmitter is only released on one side and receptors are only on the other side, impulses travel in one direction only.`,
          ex: `Think of a relay baton passed across a river by a boat: the first runner cannot cross, so a boat (neurotransmitter) takes the baton. The baton can only go one way because the receiving runner only waits on the far bank.`,
          q: `If a drug blocked the receptor proteins on the second neurone, what would happen to the impulse, even though neurotransmitter was still being released?`,
          vis: 'Diagram: synapse with vesicles, gap and receptors',
          ctx: `Many medicines and some poisons act at synapses, which is one reason these small gaps matter in medicine.`,
          exam: `Syllabus 14.1 Supplement 8 to 10. Describe the structure and the four events at a synapse, and state why transmission is one-way.`,
          steps: [
            `Label vesicles, gap and receptors.`,
            `Order the four events.`,
            `Explain one-way transmission.`
          ]
        }),
        P('cie_y11_bio_s7_3', '14.2a Sense organs and the eye', {
          pt: 'How the eye detects and controls light',
          tag: 'The eye focuses light on the retina, and the iris controls how much light enters.',
          body: `Sense organs are groups of receptor cells responding to specific stimuli: light, sound, touch, temperature and chemicals. In the eye: the cornea refracts (bends) light; the iris controls how much light enters the pupil (the hole); the lens focuses light on to the retina; the retina contains light receptors, some sensitive to light of different colours; the optic nerve carries impulses to the brain. The blind spot is where the optic nerve leaves the retina and there are no receptors. The pupil reflex protects the retina: in bright light the pupil gets smaller, in dim light it gets larger. Supplement: this works by antagonistic muscles in the iris. In bright light the circular muscles contract and the radial muscles relax, making the pupil smaller; in dim light the radial muscles contract and the circular muscles relax, making the pupil larger.`,
          ex: `Walk from a bright street into a dim shop: at first you cannot see, then your pupils widen and details appear. Walking back outside makes you squint as your pupils narrow.`,
          q: `Why would it be dangerous for the retina if the pupil stayed wide open in bright midday sun on the equator?`,
          vis: 'Diagram: eye with cornea, iris, pupil, lens, retina, optic nerve',
          ctx: `Sunglasses are common near the equator, where the sun's light is very bright, to supplement the pupil reflex.`,
          exam: `Syllabus 14.2. Core: label the eye, functions, pupil reflex. Supplement: antagonistic circular and radial muscles.`,
          steps: [
            `Label the structures and state one function each.`,
            `Describe the pupil change in bright and dim light.`,
            `At Supplement level, name which muscles contract.`
          ]
        }),
        P('cie_y11_bio_s7_4', '14.2b Accommodation, rods and cones', {
          pt: 'Focusing near and far, and seeing in dim light and colour',
          tag: 'The lens changes shape to focus, and rods and cones detect dim light and colour.',
          body: `Accommodation is changing the shape of the lens to focus on near or distant objects. Supplement: to view a near object, the ciliary muscles contract, the tension in the suspensory ligaments falls, and the lens becomes thicker (more rounded) and refracts light more strongly. To view a distant object, the ciliary muscles relax, the suspensory ligaments become tight, and the lens is pulled thinner so it refracts light less. The retina has two types of receptor cell. Rods are more sensitive to dim light, so they are used for night vision. Cones are for colour vision: there are three kinds, absorbing light of different colours. Cones are concentrated at the fovea, the small area opposite the lens where vision is sharpest, so it has a high density of cones. Rods are spread around the rest of the retina.`,
          ex: `Look at your phone screen, then look at a tree across the road. For the phone, your lens thickens; for the tree, it flattens. At night you notice colours disappear because only rods work in very dim light.`,
          q: `Why can you see a bright red matatu clearly at midday but at midnight objects look grey?`,
          vis: 'Diagram: lens shape, ciliary muscle and suspensory ligaments for near and far',
          ctx: `Reading for long periods under dim light causes tired eyes because the ciliary muscles work hard to keep a near focus.`,
          exam: `Syllabus 14.2 Supplement 6 to 9. Explain accommodation with the exact sequence ciliary muscle, ligaments, lens shape, refraction; and the roles of rods, cones and the fovea.`,
          steps: [
            `For near objects: ciliary muscles contract, ligaments slacken, lens thicker.`,
            `For distant objects: the opposite.`,
            `Match rods to dim light and cones to colour, with the fovea as the sharpest area.`
          ]
        }),
        P('cie_y11_bio_s7_5', '14.3 Hormones', {
          pt: 'Chemical messengers carried in the blood',
          tag: 'A hormone is made by a gland, travels in the blood and changes the activity of target organs.',
          body: `A hormone is a chemical substance produced by a gland and carried by the blood, which alters the activity of one or more specific target organs. Endocrine glands and their hormones: adrenal glands make adrenaline, the pancreas makes insulin, testes make testosterone, and ovaries make oestrogen. Adrenaline is secreted in "fight or flight" situations and increases breathing rate, heart rate and pupil diameter. Supplement: adrenaline also increases the blood glucose concentration, and glucagon is secreted by the pancreas. Compare control systems: nervous control is fast and its effects are short-lived; hormonal control is slower but its effects last longer.`,
          ex: `A cow suddenly charges at you in a field. Within seconds your heart pounds, you breathe faster and your pupils widen: adrenaline from the adrenal glands is preparing your body to run or fight. The effect fades after some minutes, but longer than a reflex.`,
          q: `If you touch a hot pan, your hand moves away instantly, but the shaky feeling after a scare lasts minutes. Which system causes each, and why does the speed differ?`,
          vis: 'Table: nervous and hormonal control compared',
          ctx: `Before a school race, nervous learners feel their heart pounding because adrenaline is released.`,
          exam: `Syllabus 14.3. Core: hormone definition, four glands and hormones, adrenaline effects, speed and duration comparison. Supplement: glucagon and adrenaline raising blood glucose.`,
          steps: [
            `Define a hormone with gland, blood and target organ.`,
            `Match each gland to its hormone.`,
            `Compare speed and duration of nervous and hormonal control.`
          ]
        }),
        P('cie_y11_bio_s7_6', '14.4a Homeostasis and blood glucose control', {
          pt: 'Keeping the internal environment steady',
          tag: 'Negative feedback brings a changed value back to its set point, as insulin and glucagon do for blood glucose.',
          body: `Homeostasis is the maintenance of a constant internal environment. Insulin decreases blood glucose concentration. Supplement: homeostatic control works by negative feedback: when a value moves away from its set point, the body responds to reverse the change. After a meal, blood glucose rises; the pancreas releases insulin, which makes the liver take up glucose and store it (as glycogen), so blood glucose falls. If blood glucose falls too low, the pancreas releases glucagon, which makes the liver release glucose into the blood, so it rises. In Type 1 diabetes, the pancreas does not make enough insulin, so blood glucose stays too high. Treatment is injections of insulin, together with diet and monitoring.`,
          ex: `A learner eats a large portion of sweet tea and mandazi. Blood glucose rises, insulin is released, the liver stores the glucose and the level returns to normal. If she fasts, glucose slowly falls and glucagon releases stored glucose.`,
          q: `Why would a person with Type 1 diabetes who injects insulin but then skips a meal be at risk of their blood glucose falling too low?`,
          vis: 'Diagram: negative feedback loop for blood glucose with set point',
          ctx: `Diabetes clinics in Kenyan hospitals teach patients to match insulin doses to what they eat.`,
          exam: `Syllabus 14.4. Core: homeostasis, insulin lowers blood glucose. Supplement: negative feedback and set point, liver role, insulin and glucagon, treating Type 1 diabetes.`,
          steps: [
            `Identify the change away from the set point.`,
            `Name the hormone released and the organ that responds.`,
            `Show that the response reverses the change, which is negative feedback.`
          ]
        }),
        P('cie_y11_bio_s7_7', '14.4b Temperature control in the skin', {
          pt: 'How mammals keep a constant body temperature',
          tag: 'Sweating, shivering, hair position and changes to skin blood vessels keep body temperature steady.',
          body: `Supplement: structures in the skin include hairs, hair erector muscles, sweat glands, receptors, sensory neurones, blood vessels and fatty tissue. The brain monitors blood temperature and sends signals. When you are too hot: sweat glands release sweat, whose evaporation takes heat from the skin; arterioles (small arteries) supplying skin capillaries widen, which is vasodilation, so more blood flows near the surface and loses heat. When you are too cold: you shiver (muscles contract and release heat), sweating stops, and the arterioles narrow, which is vasoconstriction, so less blood flows near the surface. Fatty tissue gives insulation, and hair erector muscles raise hairs to trap a layer of air (more useful in furry animals).`,
          ex: `After running, your face looks red because blood vessels in the skin have widened to lose heat, and you sweat. On a cold highland morning in Nyahururu your skin looks pale and you shiver as vasoconstriction reduces heat loss and muscles generate heat.`,
          q: `Many people think vasoconstriction means blood vessels move closer to the skin surface when you are cold. Why is that wrong, and what actually happens to the diameter of the vessels?`,
          vis: 'Diagram: skin section showing hair, sweat gland, arterioles and capillaries',
          ctx: `Highland Kenya's cold mornings and the Lake Turkana heat show how both extremes need control.`,
          exam: `Syllabus 14.4 Supplement 6 to 8. Describe sweating, shivering, insulation, vasodilation and vasoconstriction. Remember vessels widen or narrow; they do not move.`,
          steps: [
            `State what the brain detects and what it triggers.`,
            `For heat: sweating and vasodilation.`,
            `For cold: shivering and vasoconstriction.`
          ]
        }),
        P('cie_y11_bio_s7_8', '14.5 Tropic responses', {
          pt: 'How plants grow towards or away from a stimulus',
          tag: 'Auxin made in the shoot tip controls growth in response to light and gravity.',
          body: `A tropism is a growth response to a stimulus. Gravitropism is a response in which parts of a plant grow towards or away from gravity; phototropism is a response in which parts of a plant grow towards or away from the direction of light. Shoots grow towards light (positive phototropism) and away from gravity; roots grow towards gravity. Supplement: these are examples of chemical control of plant growth. Auxin is made in the shoot tip and diffuses through the plant. It is unequally distributed in response to light and gravity. In a shoot, auxin stimulates cell elongation, so the side with more auxin grows longer. With light from one side, auxin collects on the shaded side, so that side elongates more and the shoot bends towards the light.`,
          ex: `Place a seedling on a windowsill: after a day the shoot bends towards the window. Auxin gathered on the shaded side, cells there elongated, and the shoot curved towards the light.`,
          q: `If you cut off the tip of a shoot and then shine light from one side, would you expect it to bend towards the light? What does this say about where auxin is made?`,
          vis: 'Diagram: shoot bending towards light, auxin on the shaded side',
          ctx: `Maize seedlings in a shaded part of the field lean towards the open sunlight.`,
          exam: `Syllabus 14.5. Core: definitions, investigations of shoots and roots. Supplement: role of auxin, shoot tip, unequal distribution, cell elongation.`,
          steps: [
            `State the stimulus and the direction of growth.`,
            `Say auxin is made in the tip and moves to the shaded or lower side.`,
            `Link more auxin to more cell elongation and bending.`
          ]
        })
      ]
    },

    // ───────────── Topic 15 ─────────────
    {
      id: 'cie_y11_bio_s8',
      number: 7,
      title: 'Topic 15: Drugs',
      strand: 'Topic 15: Drugs',
      status: 'available',
      summary: 'Drugs, antibiotics, and antibiotic resistance.',
      subtopics: [
        P('cie_y11_bio_s8_1', '15.1 Drugs and antibiotics', {
          pt: 'What drugs do and why antibiotics must be used carefully',
          tag: 'Antibiotics kill bacteria but not viruses, and misuse helps resistant bacteria survive.',
          body: `A drug is any substance taken into the body that modifies or affects chemical reactions in the body. Antibiotics are used for the treatment of bacterial infections. Antibiotics kill bacteria but do not affect viruses, so they do not help against flu or colds. Some bacteria are resistant to antibiotics, which reduces the effectiveness of antibiotics. Supplement: using antibiotics only when essential limits the development of resistant bacteria such as MRSA. Within a population of bacteria a few may have a random mutation that makes them resistant. If antibiotics are used, the non-resistant bacteria die and the resistant ones survive and reproduce, so resistance becomes more common. Using antibiotics only when needed, and finishing the course, reduces this selection.`,
          ex: `A patient stops taking antibiotics after 3 days because she feels better. The weakest bacteria were killed, but a few resistant ones remain; they multiply, and the next infection is harder to treat.`,
          q: `A parent asks a clinic for antibiotics for a child's cough that a doctor says is caused by a virus. Why would antibiotics not help, and what harm could giving them cause?`,
          vis: 'Diagram: bacteria population before and after antibiotic, resistant bacteria surviving',
          ctx: `Buying antibiotics without a prescription at a chemist and taking half a course contributes to resistance in the community.`,
          exam: `Syllabus 15.1. Core: definition of a drug, antibiotics treat bacterial infections, resistance reduces effectiveness, do not affect viruses. Supplement: explain how limited use reduces resistant bacteria such as MRSA.`,
          steps: [
            `Define drug and antibiotic.`,
            `State that antibiotics affect bacteria and not viruses.`,
            `Explain how resistance spreads when antibiotics are overused.`
          ]
        })
      ]
    },

    // ───────────── Topic 16 ─────────────
    {
      id: 'cie_y11_bio_s9',
      number: 8,
      title: 'Topic 16: Reproduction',
      strand: 'Topic 16: Reproduction',
      status: 'available',
      summary: 'Asexual and sexual reproduction, flowers and pollination, fertilisation and germination, the human reproductive system, pregnancy, sex hormones and sexually transmitted infections.',
      subtopics: [
        P('cie_y11_bio_s9_1', '16.1 Asexual reproduction', {
          pt: 'One parent, identical offspring',
          tag: 'Asexual reproduction needs only one parent and makes genetically identical offspring.',
          body: `Asexual reproduction is a process that results in the production of genetically identical offspring from one parent. There is no fusion of gametes, so there is no new mixing of genes. Examples include bacteria dividing in two, and plants such as strawberries or sweet potatoes growing new plants from runners or cuttings. Supplement: for a population in the wild, advantages are that it is fast, needs only one individual and no pollinators or mates, so a well-adapted organism can spread quickly; the disadvantage is that there is no variation, so if the environment changes or a disease arrives all the offspring may be affected. For crop production, farmers gain identical plants with the best features (for example bananas from suckers), but a single disease can wipe out the entire crop.`,
          ex: `A farmer cuts a stem of a sweet potato vine and plants it. The new plant has exactly the same genes as the parent, so it will give the same type of tuber, but if a disease attacks that variety, all copies are equally at risk.`,
          q: `Why might a farmer prefer to propagate the best banana plant by cuttings or suckers rather than from seed, and what risk does this create for the whole farm?`,
          vis: 'Diagram: parent plant with runners producing identical plantlets',
          ctx: `Banana suckers and sweet potato vines are cheap ways to spread a good variety across a farm.`,
          exam: `Syllabus 16.1. Core: definition and identifying examples. Supplement: discuss advantages and disadvantages for wild populations and for crops.`,
          steps: [
            `State one parent and genetically identical offspring.`,
            `Identify examples from diagrams or text.`,
            `Weigh advantages (fast, one parent) against disadvantages (no variation).`
          ]
        }),
        P('cie_y11_bio_s9_2', '16.2 Sexual reproduction', {
          pt: 'Two gametes fuse to make something new',
          tag: 'Sexual reproduction fuses the nuclei of two gametes, producing offspring that differ from each other.',
          body: `Sexual reproduction involves the fusion of the nuclei of two gametes (sex cells) to form a zygote, and the production of offspring that are genetically different from each other. Fertilisation is the fusion of the nuclei of gametes. Supplement: the nuclei of gametes are haploid (half the normal number of chromosomes) and the nucleus of a zygote is diploid (the full number, because it receives one set from each parent). Advantages for a wild population: variation means some individuals may survive if the environment changes or a disease appears. Disadvantages: it needs two parents (to find a mate) and is slower. For crop production: variation can give new useful varieties, but offspring may lose the best features of the parents and it takes longer.`,
          ex: `In humans each gamete has 23 chromosomes. When a sperm fuses with an egg, the zygote has 46 chromosomes. The child gets half its genes from each parent but is not identical to either.`,
          q: `Brothers and sisters from the same parents look different from each other, yet identical twins look nearly the same. How does this show that mixing gametes leads to variation, and what must be true about the origin of identical twins?`,
          vis: 'Diagram: haploid gametes fusing to give a diploid zygote',
          ctx: `Cattle breeders in the Kenyan highlands use sexual reproduction to produce a variety of calves to choose from.`,
          exam: `Syllabus 16.2. Core: definitions of sexual reproduction and fertilisation. Supplement: haploid and diploid, advantages and disadvantages.`,
          steps: [
            `Define sexual reproduction and fertilisation.`,
            `Say gametes are haploid and the zygote is diploid.`,
            `Compare variation with asexual reproduction.`
          ]
        }),
        P('cie_y11_bio_s9_3', '16.3a Flowers and pollination', {
          pt: 'The parts of a flower and how pollen gets moved',
          tag: 'Pollination is the transfer of pollen from an anther to a stigma.',
          body: `Insect-pollinated flower parts and functions: sepals protect the bud; petals are often brightly coloured to attract insects; stamens are the male parts, each with an anther (makes pollen grains) on a filament; carpels are the female parts, each with a stigma (receives pollen), style, and ovary containing ovules (which contain the egg cells). A wind-pollinated flower has small dull petals, large feathery stigmas hanging outside and anthers dangling outside to release lots of light pollen. Pollen grains from insect-pollinated flowers are sticky or spiky, while wind-pollinated pollen is smooth and light. Pollination is the transfer of pollen grains from an anther to a stigma. Supplement: self-pollination is transfer to the stigma of the same flower or another flower on the same plant; cross-pollination is transfer to a flower on a different plant of the same species. Self-pollination gives less variation and does not rely on pollinators; cross-pollination gives more variation and a better chance of coping with change but depends on insects or wind.`,
          ex: `Maize is wind-pollinated: tassels at the top shed light pollen that drifts down onto the silks (stigmas). A bean flower is insect-pollinated: bright petals and nectar attract bees which carry sticky pollen between flowers.`,
          q: `A farmer grows maize in a single long row instead of in blocks. Why might pollination be poor, and what does it tell you about how maize depends on wind?`,
          vis: 'Diagram: insect-pollinated flower, labelled, beside a wind-pollinated one',
          ctx: `Beekeeping near fruit and vegetable farms in Kenya increases pollination and crop yield.`,
          exam: `Syllabus 16.3. Core: label flower, functions, wind versus insect adaptations, pollination. Supplement: self- and cross-pollination and their effects.`,
          steps: [
            `Label stamen (anther, filament) and carpel (stigma, style, ovary, ovule).`,
            `Compare insect-pollinated and wind-pollinated features.`,
            `Define self-pollination and cross-pollination.`
          ]
        }),
        P('cie_y11_bio_s9_4', '16.3b Fertilisation and germination in plants', {
          pt: 'From pollen grain to seed to seedling',
          tag: 'A pollen tube carries the pollen nucleus to an ovule, and seeds need water, oxygen and warmth to germinate.',
          body: `After pollination, a pollen grain on the stigma grows a pollen tube down through the style to the ovary and into an ovule (Supplement). Fertilisation occurs when a pollen nucleus fuses with a nucleus in an ovule. The ovule then develops into a seed. Germination is the start of growth of a seed into a seedling. Seeds need water (to activate enzymes and soften the seed coat), oxygen (for respiration to release energy) and a suitable temperature (enzymes work best at certain temperatures). Light is not needed for most seeds to germinate. You can investigate by setting up tubes with a seed in each condition: no water, no oxygen (boiled, cooled water covered with oil), cold, and all conditions present.`,
          ex: `Five bean seeds on damp cotton wool on a warm shelf germinate. Seeds in a dry dish do not (no water), seeds in a fridge do not (too cold), and seeds submerged in boiled water covered by oil do not (no oxygen).`,
          q: `Farmers in Kenya plant maize at the start of the rains rather than during the dry season. Which of the three germination requirements are they making sure of?`,
          vis: 'Diagram: pollen tube growing through style to ovule',
          ctx: `Planting dates in Kenya are timed around the long and short rains, so seeds find water and warmth.`,
          exam: `Syllabus 16.3. Core: fertilisation as fusion of pollen nucleus with ovule nucleus, conditions for germination. Supplement: pollen tube growth into the ovule.`,
          steps: [
            `Describe the pollen tube path: stigma, style, ovary, ovule.`,
            `State fertilisation as fusion of nuclei.`,
            `List water, oxygen and suitable temperature and explain each.`
          ]
        }),
        P('cie_y11_bio_s9_5', '16.4a Human reproductive systems and gametes', {
          pt: 'The structures, gametes and how fertilisation happens in humans',
          tag: 'Sperm and egg cells have features that suit their jobs, and fertilisation is the fusion of their nuclei.',
          body: `Male system: testes make sperm and testosterone; the scrotum holds the testes outside the body; sperm ducts carry sperm; the prostate gland adds fluid; the urethra carries semen (or urine) out through the penis. Female system: ovaries make egg cells; oviducts carry the egg and are where fertilisation usually occurs; the uterus is where the fetus develops; the cervix is the ring of muscle at the bottom of the uterus; the vagina receives sperm. Fertilisation is the fusion of the nuclei from a male gamete (sperm) and a female gamete (egg cell). Supplement: sperm are adapted by a flagellum (tail) for swimming, mitochondria for energy, and enzymes in the acrosome to digest the egg's outer layer. Egg cells are adapted by energy stores and a jelly coat that changes at fertilisation to stop more sperm entering. Compared: eggs are larger, have a more complex structure, cannot move on their own, and are made in much smaller numbers than sperm.`,
          ex: `Millions of sperm are released, but only one fuses with the egg. After a sperm enters, the jelly coat changes so no other sperm can get in, which prevents the zygote having too many chromosomes.`,
          q: `Why do you think the body makes millions of sperm but only one egg per month, when each sperm is so much smaller?`,
          vis: 'Diagram: male and female reproductive systems side by side',
          ctx: `Health talks in schools use these diagrams so learners understand how their bodies work.`,
          exam: `Syllabus 16.4. Core: identify parts and functions, fertilisation. Supplement: adaptive features of sperm and egg, comparison of gametes.`,
          steps: [
            `Name the parts of each system and one function each.`,
            `Describe fertilisation as fusion of nuclei.`,
            `Link each gamete feature to its role.`
          ]
        }),
        P('cie_y11_bio_s9_6', '16.4b Pregnancy: embryo, placenta and fetus', {
          pt: 'How a fetus is supported before birth',
          tag: 'The placenta lets nutrients, gases and wastes pass between the blood of mother and fetus without the bloods mixing.',
          body: `After fertilisation the zygote divides to form an embryo, a ball of cells, which implants in the lining of the uterus. In the fetus the umbilical cord connects fetus and placenta, the placenta is where exchange happens, the amniotic sac surrounds the fetus, and the amniotic fluid inside it cushions and protects the fetus from knocks. Supplement: the placenta lets dissolved nutrients and oxygen pass from mother to fetus, and carbon dioxide and excretory products (such as urea) pass from fetus to mother, between the blood of the two. The bloods do not mix. Some pathogens and toxins can pass across the placenta and affect the fetus. For example, the HIV virus, some other infections, alcohol and nicotine can cross.`,
          ex: `A pregnant woman is advised to avoid alcohol and tobacco and to attend antenatal clinics, because harmful substances in her blood can cross the placenta, and the clinic can check on fetal health and give vaccines.`,
          q: `Why is it important that the blood of the mother and the fetus come close together in the placenta but never actually mix?`,
          vis: 'Diagram: fetus, placenta, umbilical cord, amniotic sac in the uterus',
          ctx: `Antenatal clinics at Kenyan health centres give advice and tests during pregnancy.`,
          exam: `Syllabus 16.4. Core: early development, parts and functions in fetal development. Supplement: placenta exchange and substances that cross it.`,
          steps: [
            `Describe zygote to embryo to implantation.`,
            `Label umbilical cord, placenta, amniotic sac and fluid with functions.`,
            `Say what passes across the placenta and what can be harmful.`
          ]
        }),
        P('cie_y11_bio_s9_7', '16.5 Sex hormones in humans', {
          pt: 'Hormones in puberty and the menstrual cycle',
          tag: 'Testosterone and oestrogen drive puberty, and FSH, LH, oestrogen and progesterone control the menstrual cycle.',
          body: `Testosterone (from the testes) and oestrogen (from the ovaries) bring about and regulate secondary sexual characteristics during puberty, such as a deeper voice and facial hair in boys and breast development and wider hips in girls. The menstrual cycle is a roughly monthly cycle of changes in the ovaries (an egg matures and is released at ovulation) and in the lining of the uterus (it thickens to prepare for a possible embryo, and breaks down and is shed in menstruation if there is no pregnancy). Supplement: oestrogen and progesterone are produced in the ovaries during the cycle, and in pregnancy progesterone is also made by the placenta. FSH (follicle stimulating hormone) from the pituitary gland causes an egg to mature; LH (luteinising hormone) from the pituitary gland triggers ovulation; oestrogen helps build up the uterus lining; progesterone maintains it.`,
          ex: `If an egg is fertilised and implants, progesterone stays high and the lining is kept, so periods stop during pregnancy. If not, progesterone falls and the lining breaks down, so menstruation happens.`,
          q: `Why is it important for a pregnancy that progesterone keeps the lining of the uterus in place rather than letting it break down?`,
          vis: 'Graph: hormone levels and uterus lining thickness across a 28-day cycle',
          ctx: `Puberty education in schools covers these changes to help learners understand what is happening in their bodies.`,
          exam: `Syllabus 16.5. Core: roles of testosterone and oestrogen, menstrual cycle changes. Supplement: sites of production and the roles of FSH, LH, progesterone and oestrogen.`,
          steps: [
            `Link testosterone and oestrogen to secondary sexual characteristics.`,
            `Describe changes in the ovary and uterus lining across the cycle.`,
            `Match FSH, LH, oestrogen and progesterone to their role.`
          ]
        }),
        P('cie_y11_bio_s9_8', '16.6 Sexually transmitted infections', {
          pt: 'HIV, AIDS and how the spread of infections is controlled',
          tag: 'HIV is a pathogen that causes an STI and may lead to AIDS; spread is controlled by prevention and treatment.',
          body: `A sexually transmitted infection (STI) is an infection that is transmitted through sexual contact. Human immunodeficiency virus (HIV) is a pathogen that causes an STI. HIV infection may lead to AIDS, in which the immune system is so weakened that the body cannot fight other infections. HIV is transmitted by sexual contact, through blood (for example sharing needles, or unscreened blood transfusions), and from mother to child (across the placenta, at birth or through breast milk). The spread of STIs is controlled by using condoms, by limiting the number of partners, by testing and treating infections early (treatment can reduce the risk of passing HIV on), by screening blood used for transfusion, by not sharing needles, and by education.`,
          ex: `In a clinic, a person who tests positive for HIV is given medicine that keeps the virus at a very low level, so they can stay healthy and have a much lower chance of passing it on. Testing and early treatment are control measures.`,
          q: `HIV is not spread by hugging or sharing a plate. Using what you know about how it is transmitted, explain why this is so.`,
          vis: 'Table: routes of HIV transmission and a control measure for each',
          ctx: `Health clinics and school health programmes across Kenya give free, confidential testing and information about HIV.`,
          exam: `Syllabus 16.6 (Core). Define STI, name HIV as a cause, state that HIV may lead to AIDS, describe transmission, and explain control measures.`,
          steps: [
            `Define STI and name HIV.`,
            `List the routes of HIV transmission.`,
            `Match each route to a control measure.`
          ]
        })
      ]
    },

    // ───────────── Topic 17 (existing station s2) ─────────────
    {
      id: 'cie_y11_bio_s2',
      number: 9,
      title: 'Topic 17: Inheritance',
      strand: 'Topic 17: Inheritance',
      status: 'available',
      summary: 'Chromosomes, genes and proteins, mitosis and stem cells, meiosis, and monohybrid inheritance including codominance, blood groups and sex linkage.',
      subtopics: [
        P('cie_y11_bio_s2_2', '17.1 Chromosomes, genes and proteins', {
          pt: 'How DNA carries instructions for building proteins',
          tag: 'A gene is a length of DNA that codes for a protein, and DNA controls the cell by controlling which proteins it makes.',
          body: `Chromosomes are made of DNA, which contains genetic information in the form of genes. A gene is a length of DNA that codes for a protein. An allele is an alternative form of a gene. In humans sex is determined by the sex chromosomes: females have XX and males have XY. Supplement: the sequence of bases in a gene determines the sequence of amino acids used to make a specific protein, and different amino acid sequences give different shapes to protein molecules. DNA controls cell function by controlling the production of proteins, including enzymes, membrane carriers and receptors for neurotransmitters. To make a protein: the gene stays in the nucleus; a copy of the gene, messenger RNA (mRNA), is made in the nucleus and moves to the cytoplasm; the mRNA passes through ribosomes; the ribosome assembles amino acids into a protein, in the order set by the mRNA bases. Most body cells contain the same genes, but a cell only uses (expresses) the genes for the proteins it needs. A haploid nucleus has one set of chromosomes, a diploid nucleus has two sets; a human diploid cell has 23 pairs (46 chromosomes).`,
          ex: `A pancreas cell and a muscle cell contain the same genes. The pancreas cell switches on the insulin gene and makes insulin; the muscle cell does not use that gene, but switches on genes for muscle proteins instead.`,
          q: `If DNA stays in the nucleus but ribosomes are in the cytoplasm, how does the instruction in a gene reach the ribosome?`,
          f: 'DNA (gene) -> mRNA -> ribosome -> protein',
          vis: 'Flow diagram: gene in nucleus, mRNA copy, ribosome, protein',
          ctx: `Sickle cell anaemia, common in malaria areas around Lake Victoria, comes from a change in one gene that changes one protein, haemoglobin.`,
          exam: `Syllabus 17.1. Core: chromosomes, genes, alleles, inheritance of sex. Supplement: base sequence determines amino acid sequence, role of mRNA, haploid and diploid.`,
          steps: [
            `Place genes within DNA within chromosomes.`,
            `Describe mRNA carrying a copy of the gene to the ribosome.`,
            `Explain that base order sets amino acid order, which sets protein shape.`
          ]
        }),
        P('cie_y11_bio_s2_3', '17.2 Mitosis and stem cells', {
          pt: 'Making identical cells for growth and repair',
          tag: 'Mitosis gives two genetically identical cells, and stem cells can become specialised.',
          body: `Mitosis is nuclear division giving rise to genetically identical cells (the stages are not required). Before mitosis the chromosomes are replicated exactly (copied). During mitosis the copies separate, so each daughter cell keeps the same chromosome number as the parent cell. Mitosis is used for growth, repair of damaged tissues, replacement of cells and asexual reproduction. Stem cells are unspecialised cells that divide by mitosis to produce daughter cells that can become specialised for specific functions, for example in bone marrow they can become different blood cells.`,
          ex: `A cut on your arm heals as skin cells near the wound divide by mitosis, each producing two identical skin cells. A human cell with 46 chromosomes makes two cells each with 46.`,
          q: `If mitosis produced cells with half the chromosomes each time, what would happen to the tissue after several rounds of division?`,
          vis: 'Diagram: chromosomes copied, then separated into two identical nuclei',
          ctx: `Bone marrow donation, in which stem cells are transferred, treats some blood diseases.`,
          exam: `Syllabus 17.2. Core: mitosis definition, roles, replication before mitosis. Supplement as listed: stem cells. Remember the daughter cells are genetically identical.`,
          steps: [
            `State that chromosomes are copied first.`,
            `State the copies separate so number is maintained.`,
            `List the four roles and define stem cells.`
          ]
        }),
        P('cie_y11_bio_s2_4', '17.3 Meiosis', {
          pt: 'Halving the chromosome number to make gametes',
          tag: 'Meiosis is a reduction division that makes gametes with half the chromosome number.',
          body: `Meiosis is involved in the production of gametes. It is a reduction division in which the chromosome number is halved from diploid to haploid, resulting in genetically different cells. (The stages are not required.) This halving matters because at fertilisation two gametes fuse; if gametes were diploid the chromosome number would double in every generation. Meiosis therefore keeps the species number constant, and the genetic differences it creates are one source of variation.`,
          ex: `A human body cell has 46 chromosomes. Meiosis in a testis makes sperm with 23 each. A sperm (23) fuses with an egg (23) to form a zygote with 46 again.`,
          q: `Mitosis keeps the chromosome number the same while meiosis halves it. What would go wrong over generations if gametes were made by mitosis instead?`,
          vis: 'Diagram: one diploid cell making four different haploid gametes',
          ctx: `Plant breeders rely on meiosis in maize and wheat to mix genes and produce new varieties.`,
          exam: `Syllabus 17.3 (Supplement). State that meiosis makes gametes, describe it as a reduction division giving genetically different cells.`,
          steps: [
            `Say meiosis is used for gametes.`,
            `Say chromosome number halves from diploid to haploid.`,
            `Say the cells are genetically different.`
          ]
        }),
        P('cie_y11_bio_s2_1', '5.1 Monohybrid Inheritance & Sex-Linked Genetic Crosses', {
          pt: 'Predicting Offspring Genotypes and Phenotypes via Punnett Squares',
          tag: 'Sex-linked conditions (e.g. red-green colour blindness) are carried on the X chromosome.',
          body: `Inheritance is the transmission of genetic information from generation to generation. Genotype is the genetic make-up of an organism (the alleles present); phenotype is the observable features. A homozygous individual has two identical alleles of a gene; a heterozygous individual has two different alleles. A dominant allele is expressed if it is present; a recessive allele is only expressed when no dominant allele is present. A heterozygous individual will not be pure-breeding. To predict offspring, write the parents' genotypes, the possible gametes from each, and fill in a Punnett square. A cross Aa x Aa gives AA, Aa, Aa and aa, a 3:1 ratio of dominant to recessive phenotype; Aa x aa gives 1:1. Supplement: a sex-linked characteristic is one where the gene is on a sex chromosome (here the X), so it is more common in one sex. Red-green colour blindness is an example. In males (XY) a single recessive allele on the X is expressed because the Y has no matching allele; females (XX) need two recessive alleles to be colour blind.`,
          ex: `A woman who is a carrier (X^B X^b) and a man with normal vision (X^B Y) have children. Punnett square: daughters X^B X^B or X^B X^b (all normal vision, half carriers); sons X^B Y or X^b Y (half colour blind). So half of the sons are expected to be colour blind.`,
          q: `Why are males significantly more likely to inherit red-green colour blindness than females?`,
          f: 'Aa x Aa gives AA : Aa : Aa : aa, so 3 dominant : 1 recessive',
          vis: 'Diagram: 2 x 2 Punnett square with alleles',
          ctx: `Genetic counselling for sickle cell and haemophilia in families uses the same crosses to estimate chances.`,
          exam: `Syllabus 17.4. Core: terms and monohybrid crosses with 1:1 and 3:1 ratios. Supplement: sex linkage and colour blindness. Always show parent genotypes, gametes, offspring genotypes and the ratio.`,
          steps: [
            `Choose letters for alleles and state which is dominant.`,
            `List gametes from each parent and fill the Punnett square.`,
            `Read off genotype and phenotype ratios and state the probability.`
          ]
        }),
        P('cie_y11_bio_s2_5', '17.4 Pedigrees, test crosses, codominance and blood groups', {
          pt: 'Reading family trees and solving harder crosses',
          tag: 'Pedigree diagrams, test crosses and codominance extend the basic monohybrid cross.',
          body: `A pedigree diagram is a family tree showing who has a characteristic; you can interpret it to work out which allele is dominant and who must be heterozygous (two unaffected parents with an affected child must both carry a recessive allele). Supplement: a test cross is used to find an unknown genotype: cross the individual showing the dominant phenotype with a homozygous recessive. If any offspring show the recessive phenotype, the unknown is heterozygous; if all show the dominant, it is probably homozygous dominant. Codominance is where both alleles in a heterozygote contribute to the phenotype. ABO blood groups are an example: the alleles are I^A, I^B and I^o, with I^A and I^B codominant and both dominant over I^o. Group A is I^A I^A or I^A I^o, group B is I^B I^B or I^B I^o, group AB is I^A I^B, group O is I^o I^o.`,
          ex: `A mother of blood group A (I^A I^o) and a father of group B (I^B I^o) can have children of group A, B, AB or O, each with a probability of 1/4. A child of group O from these parents shows that both carried I^o.`,
          q: `Two parents with normal skin have a child with albinism. What must be true of the parents' genotypes, and what is the probability of a second child being affected?`,
          vis: 'Diagram: pedigree with squares and circles, shaded for affected',
          ctx: `Blood group matching is essential before transfusions in hospitals.`,
          exam: `Syllabus 17.4. Core: interpret pedigree diagrams. Supplement: test cross, codominance, ABO blood groups, genetic diagrams with codominance.`,
          steps: [
            `On a pedigree, find unaffected parents with an affected child to show the allele is recessive.`,
            `For a test cross, cross the unknown with homozygous recessive.`,
            `For ABO, write all genotypes and gametes carefully using I^A, I^B and I^o.`
          ]
        })
      ]
    },

    // ───────────── Topic 18 ─────────────
    {
      id: 'cie_y11_bio_s10',
      number: 10,
      title: 'Topic 18: Variation and selection',
      strand: 'Topic 18: Variation and selection',
      status: 'available',
      summary: 'Continuous and discontinuous variation, mutation, adaptive features, natural selection and selective breeding.',
      subtopics: [
        P('cie_y11_bio_s10_1', '18.1 Variation and mutation', {
          pt: 'Why individuals of one species differ',
          tag: 'Variation is differences between individuals of a species, caused by genes, the environment, or both.',
          body: `Variation is differences between individuals of the same species. Continuous variation gives a range of phenotypes between two extremes, for example body length and body mass; it is caused by both genes and the environment. Discontinuous variation gives a limited number of phenotypes with no intermediates, for example ABO blood groups and seed shape or colour in peas; it is usually caused by genes only. Mutation is genetic change, and it is the way new alleles are formed. Ionising radiation and some chemicals increase the rate of mutation. Supplement: a gene mutation is a random change in the base sequence of DNA. Sources of genetic variation in populations are mutation, meiosis, random mating and random fertilisation.`,
          ex: `Measure the heights of everyone in your class: you get a range with most people in the middle, which is continuous variation (genes and diet both affect height). Ask each person their blood group: you get only A, B, AB or O, with nothing in between, which is discontinuous.`,
          q: `Two maize plants of the same variety are grown in different fields; one is taller. How can you tell whether the difference is from genes or the environment?`,
          vis: 'Graphs: bell-shaped curve for continuous, separate bars for discontinuous',
          ctx: `Farmers notice that maize of the same seed grows differently on different soils.`,
          exam: `Syllabus 18.1. Core: definitions and examples of continuous and discontinuous variation, mutation, causes. Supplement: gene mutation as random change in base sequence, four sources of variation.`,
          steps: [
            `Classify the variation: range, or distinct groups.`,
            `Say whether genes only, or genes and environment.`,
            `Explain mutation as the origin of new alleles.`
          ]
        }),
        P('cie_y11_bio_s10_2', '18.2 Adaptive features', {
          pt: 'Features that help an organism survive in its habitat',
          tag: 'An adaptive feature is an inherited feature that helps an organism survive and reproduce in its environment.',
          body: `An adaptive feature is an inherited feature that helps an organism to survive and reproduce in its environment. To interpret images, look at body shape, covering, colour, mouth parts, and link each to the habitat. Supplement: hydrophytes are plants that live in water, and have features such as thin or absent cuticle, large air spaces for floating, and stomata on the upper surface (leaves float). Xerophytes are plants adapted to dry places, with features such as a thick waxy cuticle, small or needle-like leaves with less surface area, sunken stomata or hairs trapping moisture, and deep or widespread roots.`,
          ex: `A cactus has spines instead of leaves, a thick stem storing water and a waxy surface, so it loses little water in a desert. A water lily has air spaces in leaves so they float, and stomata on top so they can exchange gases with the air.`,
          q: `An acacia in the Kenyan savannah has small leaves, deep roots and thorns. Pick one feature and explain how it helps survive in a dry habitat.`,
          vis: 'Table: feature, how it helps, habitat',
          ctx: `Acacia and aloe plants in the dry parts of Kenya are good examples of xerophytes.`,
          exam: `Syllabus 18.2. Core: definition and interpreting images. Supplement: adaptations of hydrophytes and xerophytes. Always link feature to benefit.`,
          steps: [
            `Name the feature you can see.`,
            `State what problem the habitat presents.`,
            `Explain how the feature helps solve it.`
          ]
        }),
        P('cie_y11_bio_s10_3', '18.3 Natural selection and selective breeding', {
          pt: 'How populations change and how humans guide that change',
          tag: 'Individuals better suited to their environment are more likely to survive, reproduce and pass on their alleles.',
          body: `Natural selection: (a) there is genetic variation in a population; (b) more offspring are produced than can survive; (c) there is a struggle for survival, including competition for resources; (d) individuals better adapted to the environment have a greater chance of reproducing; (e) these individuals pass on their alleles to the next generation. Selective breeding is selection by humans of individuals with desirable features, crossing them to produce the next generation, and selecting offspring that show the desired features; repeating this over many generations improves crop plants and domesticated animals. Supplement: adaptation is the process, resulting from natural selection, by which populations become more suited to their environment over many generations. Development of antibiotic-resistant bacteria is an example of natural selection. Natural selection is controlled by the environment, whereas artificial selection (selective breeding) is controlled by humans.`,
          ex: `Dairy farmers choose cows that give the most milk and breed them together. In their calves, those with high yield are chosen again. After many generations, average milk yield rises well above that of the original herd.`,
          q: `In a field a few beetles are green and others brown, and birds eat more of the brown ones on green grass. After many generations what would you expect, and which part of the natural selection steps is acting?`,
          vis: 'Flow diagram: variation, struggle, survival of the fittest, offspring with alleles',
          ctx: `Improved maize, cattle and chicken breeds in Kenya come from generations of selective breeding.`,
          exam: `Syllabus 18.3. Core: natural selection points (a) to (e), selective breeding. Supplement: adaptation, antibiotic resistance, natural versus artificial selection.`,
          steps: [
            `Start from variation in the population.`,
            `Explain which individuals survive and reproduce, passing on their alleles.`,
            `Compare with selective breeding where humans choose.`
          ]
        })
      ]
    },

    // ───────────── Topic 19 ─────────────
    {
      id: 'cie_y11_bio_s11',
      number: 11,
      title: 'Topic 19: Organisms and their environment',
      strand: 'Topic 19: Organisms and their environment',
      status: 'available',
      summary: 'Energy flow, food chains and webs, ecological pyramids, nutrient cycles and population growth.',
      subtopics: [
        P('cie_y11_bio_s11_1', '19.1-19.2a Energy flow, food chains and food webs', {
          pt: 'Who eats whom and where the energy goes',
          tag: 'The Sun is the principal energy source, and food chains show energy passing from producers to consumers.',
          body: `The Sun is the principal source of energy input to biological systems. Plants capture light energy and store it as chemical energy in organic molecules; this energy passes along food chains, and is eventually transferred to the environment (as heat). A food chain shows the transfer of energy from one organism to the next, beginning with a producer, an organism that makes its own organic nutrients, usually by photosynthesis. A consumer gets its energy by feeding on other organisms: a primary consumer eats producers (a herbivore, an animal that eats plants), a secondary consumer eats primary consumers, and so on (tertiary, quaternary); a carnivore eats other animals. A decomposer gets its energy from dead or waste organic material. A food web is a network of interconnected food chains. Supplement: a trophic level is the position of an organism in a food chain; producers, primary consumers, secondary consumers, tertiary consumers and quaternary consumers are trophic levels. Humans can affect food webs by overharvesting a food species, or by introducing foreign species to a habitat.`,
          ex: `Grass -> zebra -> lion. The grass is the producer (trophic level 1), the zebra a primary consumer and herbivore (level 2), the lion a secondary consumer and carnivore (level 3). When the zebra and lion die, decomposers get energy from their bodies.`,
          q: `In a food web, if overfishing removes most of the Nile perch, what might happen to the numbers of the small fish it feeds on, and then to the algae those small fish eat?`,
          vis: 'Diagram: food web with arrows showing energy transfer',
          ctx: `The Maasai Mara food web, with grass, wildebeest, lions and vultures, shows chains linking into a web.`,
          exam: `Syllabus 19.1 and 19.2. Core: define producer, consumer, herbivore, carnivore, decomposer, build food chains and webs, human impacts. Supplement: trophic levels. Arrows point in the direction of energy flow.`,
          steps: [
            `Draw arrows pointing from the food to the feeder.`,
            `Label producers, then consumer levels.`,
            `Predict what happens up and down the chain if one organism changes.`
          ]
        }),
        P('cie_y11_bio_s11_2', '19.2b Ecological pyramids and energy efficiency', {
          pt: 'Why there are few top predators and why crops are efficient food',
          tag: 'Only a small part of the energy at one trophic level reaches the next.',
          body: `Pyramids show each trophic level as a bar. A pyramid of numbers shows how many organisms are at each level; a pyramid of biomass shows the dry mass of living material at each level; a pyramid of energy shows the energy at each level over a period of time. Supplement: a pyramid of biomass is better than numbers because it does not mislead when one tree supports many insects, and a pyramid of energy is better than both because it always has a pyramid shape and shows energy transfer directly. Energy transfer from one trophic level to the next is not efficient: energy is lost as heat from respiration, in movement, in waste (faeces and urine), and in parts not eaten (such as bones, roots). Since so much is lost at each step, there is too little energy to support more than four or five trophic levels. For the same reason, it is more energy efficient for humans to eat crop plants directly than to eat livestock fed on crop plants, because feeding through the extra level loses energy.`,
          ex: `If a field of grass has 10 000 units of energy and about 10% passes on each time, the cattle get about 1000 units and the humans eating beef get about 100. Humans eating the grass-based food (like maize) directly would get far more of the original energy.`,
          q: `Why do you rarely find a food chain with seven or eight links in nature?`,
          vis: 'Diagram: pyramid of energy with decreasing bars',
          ctx: `Land use decisions in Kenya about growing food crops or grazing livestock involve this energy efficiency.`,
          exam: `Syllabus 19.2 Supplement 11 to 19. Draw and interpret pyramids, discuss advantages of biomass and energy pyramids, explain energy loss and why chains are short.`,
          steps: [
            `Describe what each pyramid measures.`,
            `List ways energy is lost between levels.`,
            `Use the loss to explain short chains and why eating plants is more efficient.`
          ]
        }),
        P('cie_y11_bio_s11_3', '19.3 Nutrient cycles', {
          pt: 'How carbon and nitrogen are recycled',
          tag: 'Carbon and nitrogen pass between living things and the environment in cycles.',
          body: `The carbon cycle: carbon dioxide is taken from the air by photosynthesis and made into organic molecules; feeding passes carbon along food chains; respiration by all organisms returns carbon dioxide to the air; decomposition of dead material returns carbon dioxide too; fossil fuels formed from long-dead organisms; combustion (burning) of fossil fuels and wood releases carbon dioxide. Supplement: the nitrogen cycle. Decomposition of plant and animal protein by decomposers makes ammonium ions; nitrification by bacteria turns ammonium into nitrate; nitrogen fixation by lightning and by bacteria turns nitrogen gas from the air into nitrogen compounds usable by plants; plants absorb nitrate ions and use them to make amino acids and proteins; animals get nitrogen by feeding and digesting proteins; deamination in animals makes urea; denitrification by bacteria turns nitrate back into nitrogen gas. Microorganisms are therefore essential in decomposition, nitrification, nitrogen fixation and denitrification.`,
          ex: `Beans and other legumes grow nodules on their roots housing bacteria which fix nitrogen, so a field planted with beans after maize receives extra nitrogen compounds, which is why farmers rotate crops.`,
          q: `Waterlogged soil has less oxygen and favours denitrifying bacteria. What would happen to the nitrate in the soil, and what would this do to crop growth?`,
          vis: 'Diagram: carbon cycle arrows; nitrogen cycle arrows',
          ctx: `Intercropping maize with beans and using compost help return carbon and nitrogen to the soil in small farms.`,
          exam: `Syllabus 19.3. Core: carbon cycle processes. Supplement: nitrogen cycle stages and the role of microorganisms (no bacterial names required).`,
          steps: [
            `Draw the carbon cycle with photosynthesis taking carbon in and respiration, decomposition and combustion putting it back.`,
            `Add the nitrogen steps in order.`,
            `Name the microorganism process at each step.`
          ]
        }),
        P('cie_y11_bio_s11_4', '19.4 Populations', {
          pt: 'How populations grow and what limits them',
          tag: 'A population in limited space follows an S-shaped (sigmoid) growth curve, set by limiting factors.',
          body: `A population is a group of organisms of one species living in the same area at the same time. A community is all the populations of different species in an ecosystem. An ecosystem is a unit containing the community of organisms and their environment, interacting together. Factors affecting the rate of population growth are food supply, competition, predation and disease. A population growing in an environment with limited resources follows a sigmoid curve with four phases: lag (slow growth, few individuals to reproduce), exponential or log (rapid growth, resources plentiful), stationary (births equal deaths, because limiting factors balance growth) and death (resources run out, deaths exceed births). Supplement: explain each phase, using limiting factors such as food, space and disease for the stationary phase.`,
          ex: `Ten bacteria are put in a nutrient broth. For a few hours growth is slow (lag), then numbers double rapidly (exponential), then flatten as food runs low (stationary), and finally decline as nutrients run out and waste builds up (death).`,
          q: `Why is growth slow at the start of the curve even though there is plenty of food?`,
          vis: 'Graph: sigmoid growth curve with lag, exponential, stationary, death phases',
          ctx: `Water hyacinth spreading on Lake Victoria shows exponential growth before limiting factors such as nutrients and control measures slow it.`,
          exam: `Syllabus 19.4. Core: define population, community, ecosystem; factors; identify phases on a sigmoid curve; interpret graphs. Supplement: explain each phase using limiting factors.`,
          steps: [
            `Define the terms population, community, ecosystem.`,
            `Name the four phases in order.`,
            `Give the limiting factor behind each phase.`
          ]
        })
      ]
    },

    // ───────────── Topic 20 ─────────────
    {
      id: 'cie_y11_bio_s12',
      number: 12,
      title: 'Topic 20: Human influences on ecosystems',
      strand: 'Topic 20: Human influences on ecosystems',
      status: 'available',
      summary: 'Food supply, habitat destruction, pollution and conservation.',
      subtopics: [
        P('cie_y11_bio_s12_1', '20.1 Food supply', {
          pt: 'How humans produce more food and what it costs',
          tag: 'Machines, fertilisers, pesticides and selective breeding raise yields, with trade-offs.',
          body: `Humans have increased food production by using agricultural machinery (larger areas of land and greater efficiency), chemical fertilisers (to improve yields), insecticides (to improve quality and yield), herbicides (to reduce competition with weeds) and selective breeding (to improve crop plants and livestock). A monoculture is large-scale growing of a single crop. Advantages: easier to plant, tend and harvest with machines, and high yield for the area. Disadvantages: pests and disease spread quickly, soil nutrients are used up, fertilisers and pesticides may harm other wildlife, and habitats are removed. Intensive livestock production keeps many animals indoors or in small spaces. Advantages: more food from less land and lower cost. Disadvantages: animal welfare concerns, spread of disease, pollution from waste, and use of antibiotics.`,
          ex: `A tea estate in Kericho is a monoculture with high output per hectare, but pest outbreaks can spread through every plant, and fertiliser runoff can affect nearby streams.`,
          q: `A farmer replaces diverse small plots with one large field of maize. List one benefit and one risk of the change.`,
          vis: 'Table: method, advantage, disadvantage',
          ctx: `Large wheat farms in Narok and tea estates in Kericho show the benefits and risks of monoculture.`,
          exam: `Syllabus 20.1 (Core). List the five ways of increasing food production and weigh advantages and disadvantages of monocultures and intensive livestock production.`,
          steps: [
            `Name each method and say how it raises yield.`,
            `State advantages of monocultures and intensive livestock.`,
            `State the disadvantages.`
          ]
        }),
        P('cie_y11_bio_s12_2', '20.2 Habitat destruction', {
          pt: 'Why habitats are lost and what follows',
          tag: 'Biodiversity falls when habitats are cleared, polluted or changed.',
          body: `Biodiversity is the number of different species that live in an area. Habitats are destroyed to make room for housing, crop and livestock production, to extract natural resources (such as timber, minerals and oil) and through freshwater and marine pollution. By altering food webs and food chains, humans can have a negative impact on habitats. Deforestation, the clearing of forest, is an example of habitat destruction. Its undesirable effects include reduced biodiversity, extinction of species, loss of soil (roots no longer hold it, and rain washes it away), flooding (less water is absorbed and held by plants), and an increase of carbon dioxide in the atmosphere (fewer trees to take it in by photosynthesis, and burning or decay of the wood releases it).`,
          ex: `When a hillside forest above a river is cleared for farms, heavy rain washes soil into the river, the river floods downstream, fish and invertebrates are buried or die, and the area now supports fewer species.`,
          q: `Why does removing trees increase the carbon dioxide level in the air in two different ways?`,
          vis: 'Flow diagram: deforestation leading to five effects',
          ctx: `The Mau Forest is a water catchment, and clearing it affects rivers that feed lakes and farms downstream.`,
          exam: `Syllabus 20.2 (Core). Define biodiversity, list reasons for habitat destruction, and give the five effects of deforestation.`,
          steps: [
            `Define biodiversity.`,
            `List the reasons for habitat loss.`,
            `Describe the five consequences of deforestation.`
          ]
        }),
        P('cie_y11_bio_s12_3', '20.3 Pollution', {
          pt: 'Sewage, fertiliser, plastics and greenhouse gases',
          tag: 'Pollutants harm ecosystems; eutrophication shows how extra nitrate can end up killing fish.',
          body: `Untreated sewage and excess fertiliser entering water supply extra nutrients and can cause problems for aquatic ecosystems. Non-biodegradable plastics do not decay, so they build up in water and on land, harming wildlife that eat or are tangled in them. Methane and carbon dioxide cause the enhanced greenhouse effect: extra gases trap more heat near the Earth, leading to climate change. Supplement: eutrophication happens in stages: (1) more nitrate and other ions become available in the water; (2) producers (algae and water plants) grow faster; (3) they die in large numbers and are decomposed; (4) the aerobic respiration of the increasing number of decomposers uses up the dissolved oxygen; (5) the dissolved oxygen is reduced; (6) organisms that need dissolved oxygen, such as fish, die.`,
          ex: `Fertiliser washes from farms into a dam. Algae bloom and turn the water green, then die. Bacteria decomposing them use so much oxygen that fish suffocate. This is eutrophication.`,
          q: `Adding fertiliser helps plants grow on land, yet in water it can kill fish. Trace the chain of events that explains this.`,
          vis: 'Flow diagram: eutrophication in six steps',
          ctx: `Fertiliser and sewage runoff into Lake Victoria have helped water hyacinth and algae to spread.`,
          exam: `Syllabus 20.3. Core: effects of sewage, fertiliser, plastics, methane and carbon dioxide. Supplement: eutrophication stages in order.`,
          steps: [
            `Name the pollutant and its source.`,
            `Describe its direct effect.`,
            `For eutrophication, give the six links in order.`
          ]
        }),
        P('cie_y11_bio_s12_4', '20.4 Conservation', {
          pt: 'Protecting resources and species for the future',
          tag: 'Sustainable resources are used no faster than they are replaced, and conservation protects endangered species.',
          body: `A sustainable resource is produced as rapidly as it is removed from the environment so that it does not run out. Forests and fish stocks can be conserved and managed sustainably. Organisms become endangered or extinct because of climate change, habitat destruction, hunting, overharvesting, pollution and introduced species. Endangered species can be conserved by monitoring and protecting species and habitats, education, captive breeding programmes and seed banks. Supplement: forests can be conserved by education, protected areas, quotas and replanting. Fish stocks by education, closed seasons, protected areas, controlled net types and mesh size, quotas and monitoring. Reasons for conservation: maintaining or increasing biodiversity, reducing extinction, protecting vulnerable ecosystems, and maintaining ecosystem functions such as nutrient cycling and resource provision (food, drugs, fuel and genes). Artificial insemination (AI) and in vitro fertilisation (IVF) are used in captive breeding. If a population shrinks, genetic variation falls, which increases the risk to the species.`,
          ex: `Net mesh size: if nets with a larger mesh let young fish escape, they grow up and breed, so the fish stock is sustained. A closed season, when fishing is stopped for a time, lets fish breed without being caught.`,
          q: `Why is it better for the long-term supply of fish that small fish are allowed to escape the nets, even though this reduces today's catch?`,
          vis: 'Table: resource, threat, conservation method',
          ctx: `Kenya's national parks and community conservancies are examples of protected areas.`,
          exam: `Syllabus 20.4. Core: sustainability, causes of endangerment, conservation methods. Supplement: forest and fish conservation, reasons, AI and IVF, effects of reduced genetic variation.`,
          steps: [
            `Define sustainable resource.`,
            `Match each threat with one conservation action.`,
            `Explain why small populations are at risk.`
          ]
        })
      ]
    },

    // ───────────── Topic 21 ─────────────
    {
      id: 'cie_y11_bio_s13',
      number: 13,
      title: 'Topic 21: Biotechnology and genetic modification',
      strand: 'Topic 21: Biotechnology and genetic modification',
      status: 'available',
      summary: 'Why bacteria are useful, uses of yeast and enzymes, fermenters, and genetic modification.',
      subtopics: [
        P('cie_y11_bio_s13_1', '21.1 Bacteria in biotechnology', {
          pt: 'Why bacteria are the workhorses of biotechnology',
          tag: 'Bacteria reproduce rapidly and can make complex molecules, with few ethical concerns.',
          body: `Biotechnology is the use of living organisms, or substances from them, to make useful products. Bacteria are useful in biotechnology and genetic modification because they have a rapid reproduction rate (so large numbers are obtained quickly) and an ability to make complex molecules such as proteins. Supplement: other reasons are that there are few ethical concerns over their manipulation and growth, compared with using animals, and the presence of plasmids, small rings of DNA that can carry a gene from another organism and be passed on.`,
          ex: `One bacterium that divides every 20 minutes can produce more than 16 million bacteria in 8 hours (2 raised to 24). A tank of such bacteria can make a lot of a human protein in a day.`,
          q: `Why would growing bacteria to make insulin raise fewer ethical objections than collecting insulin from large numbers of animals?`,
          vis: 'Diagram: bacterium with chromosome and plasmid',
          ctx: `Yoghurt and cheese-making use bacteria, a familiar and long-established biotechnology.`,
          exam: `Syllabus 21.1. Core: rapid reproduction and ability to make complex molecules. Supplement: discuss ethical concerns and plasmids.`,
          steps: [
            `State fast reproduction and complex molecules.`,
            `Add few ethical concerns.`,
            `Add plasmids as carriers of genes.`
          ]
        }),
        P('cie_y11_bio_s13_2', '21.2 Biotechnology: yeast, enzymes and fermenters', {
          pt: 'Using microbes and enzymes to make products',
          tag: 'Yeast respiration, added enzymes and controlled fermenters give biofuels, food, drinks and medicines.',
          body: `Yeast in anaerobic respiration produces ethanol, which is used for biofuels, and carbon dioxide, which makes bread dough rise. Enzymes are used in industry: pectinase breaks down pectin in fruit, increasing the juice yield and making it clearer; biological washing powders contain enzymes (proteases, lipases) that break down stains at lower temperatures. Supplement: lactase is used to make lactose-free milk, by converting lactose into glucose and galactose. Fermenters are large containers in which bacteria and fungi are grown to make useful products on a large scale, including insulin, penicillin and mycoprotein (a protein-rich food from fungus). Conditions that must be controlled in a fermenter are temperature (for enzyme activity), pH (so enzymes work), oxygen (for aerobic respiration), nutrient supply (for growth) and waste products (which could poison the culture).`,
          ex: `A brewer and a bread maker both use yeast. In the brewery the ethanol is wanted; in the bakery the carbon dioxide is wanted and the ethanol evaporates during baking. A fermenter making penicillin is kept at a fixed temperature and pH, and stirred so oxygen reaches all the fungus.`,
          q: `If the temperature of a fermenter rises well above the optimum, what happens to the enzymes of the microbes and to the amount of product made?`,
          vis: 'Diagram: fermenter with inputs, stirrer, temperature and pH control',
          ctx: `Mandazi and bread dough rise using yeast, while lactose-free milk helps people who cannot digest the sugar in milk.`,
          exam: `Syllabus 21.2. Core: yeast in biofuels and bread, pectinase, biological washing powders. Supplement: lactase, large-scale production in fermenters, fermenter conditions.`,
          steps: [
            `Match each organism or enzyme to its product.`,
            `Describe fermenters as large-scale growing containers.`,
            `Explain why each controlled condition is needed.`
          ]
        }),
        P('cie_y11_bio_s13_3', '21.3 Genetic modification', {
          pt: 'Moving a gene from one organism to another',
          tag: 'Genetic modification changes an organism by removing, changing or inserting individual genes.',
          body: `Genetic modification is changing the genetic material of an organism by removing, changing or inserting individual genes. Examples: inserting human genes into bacteria to produce human proteins such as insulin; inserting genes into crop plants to give resistance to herbicides, resistance to insect pests, or improved nutritional qualities. Supplement: outline of making a human protein in bacteria: (a) the human gene is cut from human DNA using restriction enzymes, which leave sticky ends; (b) the bacterial plasmid is cut with the same restriction enzymes, leaving complementary sticky ends; (c) the human gene is inserted into the plasmid, and DNA ligase joins them to make a recombinant plasmid; (d) the recombinant plasmids are put into bacteria; (e) the bacteria multiply; (f) the bacteria express the human gene and make the human protein. Advantages of genetically modified crops (for example soya, maize and rice) include higher yields, less pesticide use and better nutrition; disadvantages include possible effects on other species, cost and concerns over safety and ownership of seeds.`,
          ex: `Cut a recipe out of one book and paste it into another using scissors and glue: restriction enzymes are the scissors, ligase is the glue, and the plasmid is the book the recipe is pasted into. Bacteria then follow the new recipe and make the protein.`,
          q: `Maize that makes its own insecticide could cut the amount of spraying a farmer needs. What are one possible benefit and one possible concern for the environment and for farmers?`,
          vis: 'Flow diagram: human gene cut, plasmid cut, ligase joins, bacteria multiply',
          ctx: `Kenya has debated genetically modified crops such as maize; learners can weigh benefits against concerns with evidence.`,
          exam: `Syllabus 21.3. Core: definition and examples. Supplement: the stages with restriction enzymes, sticky ends, ligase and recombinant plasmid; advantages and disadvantages of GM crops.`,
          steps: [
            `Define genetic modification.`,
            `Order the stages: cut gene, cut plasmid, join, insert, multiply, express.`,
            `Weigh advantages and disadvantages for GM crops.`
          ]
        })
      ]
    }
  ]
};

const BRITISH_CAIE_BIOLOGY_MAPS = [BIOLOGY_Y10, BIOLOGY_Y11];

module.exports = BRITISH_CAIE_BIOLOGY_MAPS;
