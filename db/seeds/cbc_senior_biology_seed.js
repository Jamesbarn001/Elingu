// KICD Senior School Biology, Grade 11 (Oct 2025 design) and Grade 12 (Mar 2026 design).
// Strands and sub-strands follow docs/audits/kicd_verified_from_site.md.

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps = [], workedExample = '') {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: primerTitle,
      tagline,
      body,
      formula,
      visualBadge,
      realWorldContext,
      explanationSteps: steps,
      workedExample
    },
    socraticPrompt,
    formulaBadge: formula,
    examFocus
  };
}

const NOTE = '';

const CBC_SENIOR_BIOLOGY_MAPS = [
  {
    curriculum: 'CBC',
    grade: 11,
    subject: 'Biology',
    code: 'BIO-G11',
    trackPathway: 'STEM',
    title: 'CBE Grade 11 (Senior STEM) Biology Metro Line',
    stations: [
      {
        id: 'cbc_g11_bio_s1',
        number: 1,
        title: '1.0 Cell Biology and Biodiversity',
        strand: 'Strand 1.0: Cell Biology and Biodiversity',
        icon: 'BIO',
        status: 'available',
        summary: 'Classification, ecology, and cell division.' + NOTE,
        subtopics: [
          stop('cbc_g11_bio_s1_1', '1.1 Taxonomy I', 'Sorting Living Things into Groups',
            'Classification groups organisms by shared features, from kingdom down to species',
            'Taxonomy is the science of naming and grouping organisms. A species is a group of organisms that can breed with each other and produce fertile offspring. Similar species are grouped into a genus, similar genera into a family, then order, class, phylum and kingdom. Each organism gets a two-part Latin name (binomial nomenclature): genus first with a capital letter, species second in lower case, for example Zea mays for maize. Grouping uses observable features such as body structure, how the organism feeds, and how it reproduces.',
            'Kingdom > Phylum > Class > Order > Family > Genus > Species',
            'Classification ladder',
            'Maize (Zea mays) and beans (Phaseolus vulgaris) belong to different families, so a farmer intercropping them is mixing a grass with a legume whose root nodules add nitrogen to the soil.',
            'Why would two animals that look alike but cannot produce fertile offspring together be placed in different species?',
            'Using a dichotomous key; writing binomial names correctly (italic or underlined, genus capitalised).',
            [
              'Step 1: Observe features (body covering, number of legs, seed type). Reason: only features you can check give a repeatable grouping.',
              'Step 2: Pick a feature that splits the specimens into two groups, for example has a backbone or has none. Reason: a key works by repeated two-way choices.',
              'Step 3: Repeat on each group until one organism is left. Reason: the last remaining organism is identified by the path taken.',
              'Step 4: Write the name as genus then species. Reason: this two-part name is the same worldwide.'
            ],
            'Key for four organisms: housefly, tilapia, maize, goat. 1a Makes its own food and has roots: maize (a plant). 1b Feeds on other organisms: go to 2. 2a Has no backbone and 6 legs: housefly. 2b Has a backbone: go to 3. 3a Has gills and fins: tilapia (Oreochromis niloticus). 3b Has hair and milk glands: goat (Capra hircus). Check: each organism ends at exactly one answer and no two organisms share a path, which is how you test that a key works.'),
          stop('cbc_g11_bio_s1_2', '1.2 Ecology', 'Living Things and Their Surroundings',
            'Energy enters ecosystems from the sun and is lost at each feeding step',
            'Ecology studies how organisms interact with each other and with their environment. A habitat is where an organism lives. A population is all individuals of one species in an area; a community is all the populations living together; an ecosystem is the community plus the non-living factors (water, soil, light, temperature). A food chain shows who eats whom, starting with a producer (a green plant that makes food by photosynthesis). On average only about 10 percent of energy passes to the next level, because the rest is used in respiration, lost as heat, or left in waste.',
            'Energy passed on is about 10% of the level below',
            'Energy pyramid',
            'In Amboseli, grass feeds zebra and wildebeest, which feed lions. There are far fewer lions than wildebeest because little energy reaches the top of the chain.',
            'If you removed all the grass from Amboseli, what would happen to the lions, and why does it take a few steps to happen?',
            'Drawing food webs; pyramids of numbers and energy; sampling with quadrats and transects.',
            [
              'Step 1: Identify the producer. Reason: all energy in the chain starts from it.',
              'Step 2: Arrange consumers in feeding order using arrows pointing to the eater. Reason: arrows show the direction of energy flow.',
              'Step 3: Estimate energy at each level using 10 percent. Reason: most energy is lost as heat and waste.',
              'Step 4: Predict what happens if one level changes. Reason: each level depends on the one below it.'
            ],
            'Grass holds 10,000 kJ per square metre. Zebra level: 10% of 10,000 = 1,000 kJ. Lion level: 10% of 1,000 = 100 kJ. Check: 100 / 10,000 = 1%, so lions get 1% of the grass energy, which is why a savanna holds few lions. Common mistake: drawing the arrow from the eater to the food; the arrow shows energy moving toward the eater.'),
          stop('cbc_g11_bio_s1_3', '1.3 Taxonomy II', 'The Major Groups of Organisms',
            'Kingdoms differ in cell type, nutrition and body organisation',
            'The five-kingdom system divides life into Monera (bacteria, cells with no nucleus), Protoctista (single-celled organisms with a nucleus, such as Plasmodium and amoeba), Fungi (absorb food from dead matter, for example mushrooms), Plantae (make food by photosynthesis, cell walls of cellulose) and Animalia (feed on other organisms, no cell walls). Within animals, arthropods have jointed legs and an external skeleton; vertebrates have a backbone and are split into fish, amphibians, reptiles, birds and mammals. Mammals have hair and feed their young on milk.',
            'Kingdoms: Monera, Protoctista, Fungi, Plantae, Animalia',
            'Kingdom comparison table',
            'Plasmodium (a protoctist) causes malaria; tilapia in Lake Victoria is a bony fish; cattle kept by the Maasai are mammals.',
            'A mushroom grows from the ground but is not green. Which kingdom would you place it in, and what feature decides it?',
            'Distinguishing classes of vertebrates and arthropods by features.',
            [
              'Step 1: Ask if the cells have a nucleus. Reason: no nucleus means Monera.',
              'Step 2: Ask if the organism is single-celled or many-celled. Reason: single-celled with a nucleus points to Protoctista.',
              'Step 3: For many-celled organisms, ask how it gets food. Reason: absorbing from dead matter is Fungi, making its own is Plantae, eating others is Animalia.'
            ],
            'Place a bat. Many-celled, nucleus present, eats other organisms, no cell wall: Animalia. Has a backbone: vertebrate. Has hair and feeds young on milk: mammal, even though it flies. Common mistake: calling a bat a bird because it flies; flying is not the deciding feature.'),
          stop('cbc_g11_bio_s1_4', '1.4 Cell Division', 'How Cells Make More Cells',
            'Mitosis makes identical cells; meiosis makes sex cells with half the chromosomes',
            'A chromosome is a thread of DNA carrying genes. Human body cells have 46 chromosomes (23 pairs); this full number is called diploid (2n). Mitosis is division that produces two cells identical to the parent, used for growth and repair. Meiosis is division in the sex organs that produces four cells each with half the number (haploid, n), so that fertilisation restores the full number. Mitosis stages: prophase (chromosomes become visible), metaphase (they line up in the middle), anaphase (copies are pulled apart), telophase (two nuclei form).',
            'Mitosis: 2n -> 2 cells of 2n.  Meiosis: 2n -> 4 cells of n',
            'Mitosis and meiosis stages',
            'A maize root tip grows by mitosis; each maize kernel forms after fertilisation joins one set of chromosomes from each parent plant.',
            'If sex cells kept the full 46 chromosomes, what number would a child have, and why would that be a problem?',
            'Drawing and labelling stages; comparing mitosis and meiosis in a table.',
            [
              'Step 1: Before division the DNA is copied. Reason: each new cell needs a full set.',
              'Step 2: In mitosis the copies separate once. Reason: this gives two identical cells.',
              'Step 3: In meiosis there are two divisions. Reason: this halves the number and gives four cells.',
              'Step 4: Fertilisation joins two haploid cells. Reason: it restores the diploid number.'
            ],
            'Human: sperm n = 23, egg n = 23. Zygote = 23 + 23 = 46 = 2n, so the number stays constant across generations. If meiosis did not halve the number, the next generation would have 92 and the one after 184, which could not continue.')
        ]
      },
      {
        id: 'cbc_g11_bio_s2',
        number: 2,
        title: '2.0 Anatomy and Physiology of Plants',
        strand: 'Strand 2.0: Anatomy and Physiology of Plants',
        icon: 'PLT',
        status: 'available',
        summary: 'Reproduction, growth and excretion in flowering plants.' + NOTE,
        subtopics: [
          stop('cbc_g11_bio_s2_1', '2.1 Reproduction in Plants', 'From Flower to Seed',
            'Pollination moves pollen to the stigma; fertilisation makes the seed',
            'Sexual reproduction in flowering plants needs pollen (carrying the male cell, made in the anther) to reach the stigma, the top of the female part. This transfer is pollination. A pollen tube then grows down the style to the ovule in the ovary, and the male nucleus fuses with the egg nucleus: fertilisation. The ovule becomes the seed and the ovary becomes the fruit. Asexual (vegetative) reproduction uses one parent and gives identical offspring, for example runners, tubers and cuttings.',
            'Pollination -> pollen tube -> fertilisation -> seed + fruit',
            'Flower longitudinal section',
            'Maize is wind pollinated: tassels shed pollen onto the silks. Poor pollination gives cobs with missing kernels. Sweet potato vines are planted as cuttings.',
            'Why do cobs from a maize plant growing alone often have gaps in the kernels?',
            'Labelling a flower; comparing wind and insect pollination; advantages of vegetative propagation.',
            [
              'Step 1: Pollen is released from the anther. Reason: it carries the male cell.',
              'Step 2: Pollen lands on a compatible stigma. Reason: only the right species allows germination of pollen.',
              'Step 3: A pollen tube grows to the ovule. Reason: the male nucleus must reach the egg.',
              'Step 4: Fertilisation occurs. Reason: the fused cell becomes the embryo.'
            ],
            'Maize: each silk is a style joined to one ovule, and one kernel forms per silk that receives pollen. A cob with 500 silks of which 400 are pollinated gives about 400 kernels. Check: the 100 missing kernels equal the 100 silks that never received pollen. Common mistake: saying pollination and fertilisation are the same; pollination is arrival of pollen, fertilisation is fusion of nuclei.'),
          stop('cbc_g11_bio_s2_2', '2.2 Growth and Development in Plants', 'Seed to Mature Plant',
            'Germination needs water, oxygen and warmth; growth is controlled by hormones',
            'Germination is the start of growth of the embryo in a seed. A seed needs water (to activate enzymes), oxygen (for respiration) and a suitable temperature; light is not needed by most seeds. Stored food in the cotyledons or endosperm supplies energy until the first leaves can photosynthesise. Growth is best measured as an increase in dry mass, because fresh mass changes with water content. Auxins are plant hormones that make shoot cells elongate on the shaded side so the shoot bends toward light.',
            'Germination needs: water + oxygen + suitable temperature',
            'Bean germination stages',
            'Bean seeds planted in dry soil do not germinate until the rains come; seeds planted too deep or in waterlogged soil may lack oxygen.',
            'You test three bean tubes: wet and warm, dry and warm, wet and in a fridge. Which fail, and what does each failure show?',
            'Designing a germination experiment with a control; growth curves.',
            [
              'Step 1: The seed absorbs water. Reason: enzymes work only in water.',
              'Step 2: Enzymes digest stored starch to sugar. Reason: the embryo can use sugar for respiration.',
              'Step 3: The radicle emerges, then the plumule. Reason: the root anchors first and takes up water.',
              'Step 4: Leaves open and photosynthesis starts. Reason: the stored food is running out.'
            ],
            'Dry mass of 10 seedlings: day 0 = 2.0 g, day 5 = 1.6 g, day 12 = 2.4 g. Dry mass falls at first because stored food is used in respiration faster than new food is made, then rises once the leaves photosynthesise. Common mistake: using fresh mass, which rises early just from absorbing water and does not show real growth.'),
          stop('cbc_g11_bio_s2_3', '2.3 Excretion in Plants', 'How Plants Get Rid of Waste',
            'Plants excrete oxygen, carbon dioxide, water vapour and stored waste products',
            'Excretion is the removal of waste products of metabolism (the chemical reactions in cells). Plants have no special excretory organs. Oxygen from photosynthesis and carbon dioxide from respiration leave by diffusion through stomata (tiny pores in leaves). Water vapour is lost by transpiration. Other wastes such as tannins, resins, latex and alkaloids are stored in old leaves, bark and fruit, or lost when leaves fall.',
            'Waste gases leave by diffusion through stomata',
            'Stomata and waste pathways',
            'Latex from euphorbia plants, tannins in tea leaves and caffeine in coffee are plant waste or defence products that people use.',
            'Why can a plant afford to store waste in leaves that later fall off, when an animal cannot do the same?',
            'Distinguishing excretion from egestion and secretion.',
            [
              'Step 1: Identify the waste from each process. Reason: photosynthesis makes oxygen, respiration makes carbon dioxide.',
              'Step 2: Gases diffuse through open stomata from high to low concentration. Reason: diffusion needs no energy.',
              'Step 3: Solid wastes are stored in vacuoles or old tissue. Reason: this keeps them away from living cell activity.'
            ],
            'In daylight, photosynthesis exceeds respiration, so the net waste gas is oxygen. At night there is no photosynthesis, so the net waste gas is carbon dioxide. Common mistake: saying plants only give out oxygen; they respire all the time.')
        ]
      },
      {
        id: 'cbc_g11_bio_s3',
        number: 3,
        title: '3.0 Anatomy and Physiology of Animals',
        strand: 'Strand 3.0: Anatomy and Physiology of Animals',
        icon: 'ANI',
        status: 'available',
        summary: 'Reproduction, growth and development, excretion and homeostasis in animals.' + NOTE,
        subtopics: [
          stop('cbc_g11_bio_s3_1', '3.1 Reproduction in Animals', 'Making New Individuals',
            'Fertilisation joins sperm and egg; mammals develop the embryo inside the mother',
            'Animal reproduction is usually sexual: a male gamete (sperm) fuses with a female gamete (egg). Fertilisation can be external (tilapia: eggs and sperm released in water) or internal (mammals). After internal fertilisation the zygote divides and implants in the uterus. The placenta lets oxygen and nutrients pass from the mother\'s blood to the baby\'s blood by diffusion, without the two bloods mixing. The human menstrual cycle is about 28 days and ovulation (release of an egg) occurs around day 14.',
            'Ovulation about day 14 of a 28-day cycle',
            'Human reproductive system and placenta',
            'Female tilapia in Lake Victoria hold the fertilised eggs in the mouth to protect them; cattle kept by the Maasai usually have one calf, supported by the placenta for about nine months.',
            'Why does a tilapia release many eggs, while a cow usually has one calf?',
            'Labelling male and female systems; the menstrual cycle graph; functions of the placenta.',
            [
              'Step 1: Sperm reach the egg. Reason: fertilisation needs contact.',
              'Step 2: The zygote divides by mitosis into a ball of cells. Reason: it must grow before implanting.',
              'Step 3: The embryo implants in the uterus lining. Reason: it needs a blood supply.',
              'Step 4: The placenta forms. Reason: it feeds the foetus and removes its waste.'
            ],
            'Cycle begins on day 1 (start of bleeding). Ovulation is about day 14, which is 14 days before the next period starts in a 28-day cycle. If the egg is fertilised within a day or two, implantation happens about a week later, roughly day 20 to 22. Common mistake: believing the mother and baby share blood; only substances diffuse across the placenta.'),
          stop('cbc_g11_bio_s3_2', '3.2 Growth and Development in Animals', 'From Zygote to Adult',
            'Growth patterns differ; hormones control development',
            'Growth is a permanent increase in size and mass. Development is the change in form and function as the organism matures. Some insects show complete metamorphosis: egg, larva, pupa, adult (mosquito, housefly). Others show incomplete metamorphosis with no pupa: egg, nymph, adult (locust, cockroach). Growth of many animals plotted against time gives an S-shaped curve. In humans, puberty is triggered by sex hormones.',
            'Complete: egg - larva - pupa - adult.  Incomplete: egg - nymph - adult',
            'Metamorphosis cycle',
            'The Anopheles mosquito has aquatic larvae and pupae, so draining stagnant water breaks the cycle and reduces malaria. Locust nymphs are targeted during swarms.',
            'Why does removing puddles near homes reduce malaria cases?',
            'Comparing types of metamorphosis; interpreting growth curves.',
            [
              'Step 1: Identify the life stages in order. Reason: the stages decide where control can work.',
              'Step 2: Note which stage feeds and which does not. Reason: the pupa does not feed.',
              'Step 3: Find the stage most vulnerable. Reason: mosquito larvae and pupae live in water, so treating water stops them.'
            ],
            'Housefly at about 25 C: egg 1 day, larva 5 days, pupa 5 days, then adult. Egg to adult = 1 + 5 + 5 = 11 days. A locust passes through several nymph stages with no pupa. Common mistake: calling a locust nymph a larva; a larva does not resemble the adult, a nymph does.'),
          stop('cbc_g11_bio_s3_3', '3.3 Excretion and Homeostasis in Animals', 'Keeping the Body Steady',
            'The kidney filters blood and controls water; negative feedback holds conditions constant',
            'Homeostasis is keeping the internal environment (temperature, water, blood sugar) within narrow limits. It works by negative feedback: when a value moves away from normal, the body acts to bring it back. The kidney removes urea (made in the liver from excess amino acids), controls water by changing urine concentration, and filters blood in tiny units called nephrons. The hormone ADH increases water reabsorption in dehydration, so less, more concentrated urine is made. The skin loses heat by sweating and widening of skin blood vessels; in cold, shivering and narrowing of skin blood vessels conserve heat.',
            'Negative feedback: change away from normal -> response back to normal',
            'Nephron and feedback loop',
            'A herder walking long distances in a dry area passes little dark urine: the body conserves water through ADH.',
            'After a long run in the heat you pass little dark urine. Which hormone explains this and what does the body gain?',
            'Structure of the kidney and nephron; temperature control; blood glucose control by insulin.',
            [
              'Step 1: Receptors detect a change. Reason: the body must sense a problem first.',
              'Step 2: A control centre (brain or pancreas) compares it with normal. Reason: only a deviation triggers action.',
              'Step 3: Effectors act (sweat glands, kidney, liver). Reason: they reverse the change.',
              'Step 4: The value returns to normal and the response eases. Reason: this is the feedback.'
            ],
            'Blood glucose rises after a meal. The pancreas releases insulin; the liver turns glucose into glycogen; blood glucose falls back toward normal. When it falls too low, glucagon reverses this. Common mistake: saying the kidney makes urea; the liver makes it and the kidney removes it.')
        ]
      }
    ]
  },
  {
    curriculum: 'CBC',
    grade: 12,
    subject: 'Biology',
    code: 'BIO-G12',
    trackPathway: 'STEM',
    title: 'CBE Grade 12 (Senior STEM) Biology Metro Line',
    stations: [
      {
        id: 'cbc_g12_bio_s1',
        number: 1,
        title: '1.0 Cell Biology and Biodiversity',
        strand: 'Strand 1.0: Cell Biology and Biodiversity',
        icon: 'BIO',
        status: 'available',
        summary: 'Genetics and evolution.' + NOTE,
        subtopics: [
          stop('cbc_g12_bio_s1_1', '1.1 Genetics', 'How Traits Are Inherited',
            'Alleles are paired; a monohybrid cross follows one gene through a generation',
            'A gene is a section of DNA that codes for a trait. Different versions of a gene are called alleles. Each individual has two alleles per gene, one from each parent. A dominant allele (capital letter) shows in the phenotype (the observable trait) even if only one copy is present; a recessive allele (small letter) shows only when both copies are recessive. Genotype is the pair of alleles: homozygous (AA or aa) or heterozygous (Aa). A Punnett square lists every possible combination of gametes from the two parents.',
            'Monohybrid cross Aa x Aa gives 1 AA : 2 Aa : 1 aa (3 dominant : 1 recessive)',
            'Punnett square',
            'Sickle cell: HbA is the normal allele and HbS the sickle allele. Heterozygotes (HbA HbS) are carriers who are partly protected from severe malaria, which keeps HbS common in malaria areas such as the Lake Victoria region.',
            'Two parents each carry one sickle allele and are healthy. What chance does each child have of sickle cell disease, and how would you show it?',
            'Setting out crosses with gamete symbols; stating genotype and phenotype ratios; pedigree interpretation.',
            [
              'Step 1: Choose letters (A for normal, a for sickle) and write each parent\'s genotype. Reason: you must know the alleles to predict gametes.',
              'Step 2: Write the gametes each parent can pass on, one allele each. Reason: gametes are haploid, so each carries one allele.',
              'Step 3: Fill the Punnett square with every combination. Reason: each pairing is equally likely.',
              'Step 4: Count genotypes and convert to a phenotype ratio. Reason: the counts give the probability.',
              'Step 5: Check the total is 4 boxes. Reason: it catches missed boxes.'
            ],
            'Cross: Aa x Aa (A = normal, a = sickle, shown simply for a recessive condition). Gametes of parent 1: A or a. Gametes of parent 2: A or a.\n\n        A     a\n  A    AA    Aa\n  a    Aa    aa\n\nGenotypes: 1 AA : 2 Aa : 1 aa. Phenotypes (A dominant): 3 unaffected : 1 aa. Probability of aa = 1/4 = 25%. Check: 1/4 + 2/4 + 1/4 = 4/4 = 1. For two sickle cell carriers (HbA HbS x HbA HbS): 25% HbS HbS (disease), 50% carriers, 25% HbA HbA. Common mistake: thinking that after one affected child the next three will be healthy; each child has the same 25% chance independently.'),
          stop('cbc_g12_bio_s1_2', '1.2 Evolution', 'How Populations Change Over Time',
            'Natural selection favours inherited traits that help survival and reproduction',
            'Evolution is the gradual change in the inherited features of a population over many generations. Variation arises from mutation (a random change in DNA) and from sexual reproduction mixing alleles. Natural selection works because more offspring are born than survive. Individuals with traits that suit their environment survive longer, reproduce more, and pass those alleles on. Evidence includes fossils, comparative anatomy (homologous structures such as the forelimb of humans, bats and whales), and DNA similarity. Selection acts on populations over generations, not on individuals changing in their lifetime.',
            'Variation + selection pressure + inheritance = change in allele frequency',
            'Natural selection cycle',
            'Resistance of Anopheles mosquitoes to insecticides spreads because the few resistant mosquitoes survive spraying and breed. The sickle cell allele stays common where malaria is common.',
            'If a farmer sprays a pesticide that kills nearly all pests, why may the next generation be harder to kill?',
            'Explaining selection with variation, selection pressure, survival, inheritance; evidence for evolution.',
            [
              'Step 1: There is variation in the population. Reason: without differences selection has nothing to work on.',
              'Step 2: A pressure acts (drought, drug, predator). Reason: it decides which traits help.',
              'Step 3: Individuals with helpful traits survive and breed more. Reason: they leave more offspring.',
              'Step 4: Their alleles become more common. Reason: offspring inherit them.'
            ],
            'Pest population: 1,000 insects, 10 carry a resistance allele (1%). Spray kills all 990 non-resistant insects and no resistant ones, leaving 10 survivors, all resistant. These breed, so the next generation is nearly all resistant: the resistant share went from 1% to close to 100%. Common mistake: saying the insects learned to resist; the alleles already existed before spraying.')
        ]
      },
      {
        id: 'cbc_g12_bio_s2',
        number: 2,
        title: '2.0 Anatomy and Physiology of Plants',
        strand: 'Strand 2.0: Anatomy and Physiology of Plants',
        icon: 'PLT',
        status: 'available',
        summary: 'Response and coordination, support and movement in plants.' + NOTE,
        subtopics: [
          stop('cbc_g12_bio_s2_1', '2.1 Response and Coordination', 'How Plants Respond to Stimuli',
            'Plants respond by growth; hormones such as auxin coordinate the response',
            'A stimulus is a change in the environment; a response is the reaction. Plants respond by growth rather than by moving the whole body. A tropism is a growth response toward or away from a stimulus: phototropism (light), geotropism (gravity), hydrotropism (water). Auxin is made at the shoot tip and moves to the side away from light, where it makes cells elongate more. The shaded side grows longer, so the shoot bends toward the light. In roots, high auxin slows growth, so roots bend down.',
            'Auxin on shaded side -> more elongation -> shoot bends toward light',
            'Phototropism diagram',
            'Bean seedlings on a classroom window sill bend toward the window; a maize stalk flattened by wind grows upright again at its tip.',
            'If you cover the tip of a shoot with foil and light it from one side, what happens and what does that show?',
            'Experiments with tip removal and foil caps; explaining the role of auxin.',
            [
              'Step 1: Light falls on one side. Reason: this is the stimulus.',
              'Step 2: Auxin moves to the shaded side. Reason: light causes redistribution of auxin, not its destruction.',
              'Step 3: Shaded cells elongate more. Reason: auxin promotes cell elongation in shoots.',
              'Step 4: The shoot curves toward the light. Reason: unequal growth bends it.'
            ],
            'Three seedlings lit from the right. A: tip intact, bends right. B: tip cut off, does not bend, which shows the tip makes the growth signal. C: tip covered with foil, does not bend, which shows light is detected at the tip. Common mistake: saying the plant moves toward light; the bending is caused by unequal growth.'),
          stop('cbc_g12_bio_s2_2', '2.2 Support and Movement', 'How Plants Stand Up and Move',
            'Turgor pressure and woody tissue hold plants upright',
            'Plants have no skeleton. Herbaceous plants (non-woody) are supported by turgor: water fills the vacuole and pushes the cell contents against the wall, making cells firm. If water is lost the cells become flaccid and the plant wilts. Woody plants are supported by xylem walls strengthened with lignin, a hard substance. Collenchyma and sclerenchyma are supporting tissues. Most plant movement is slow growth movement, but some, such as the closing of Mimosa leaves, are quick changes in turgor in certain cells.',
            'Turgor pressure + lignin = support',
            'Turgid and flaccid cells',
            'Kale (sukuma wiki) wilts in the midday sun and revives when sprinkled with water; eucalyptus trunks stay upright because of lignified wood.',
            'Why does a well-watered kale plant stand up straight at dawn but droop at noon?',
            'Wilting and recovery; explaining support in herbaceous and woody plants.',
            [
              'Step 1: Water enters cells by osmosis. Reason: cell sap has lower water potential than soil water.',
              'Step 2: The vacuole swells and presses on the wall. Reason: this creates turgor pressure.',
              'Step 3: Turgid cells push against each other. Reason: this stiffens the stem.',
              'Step 4: If water loss exceeds uptake the cells go flaccid. Reason: pressure drops and the stem sags.'
            ],
            'Midday: transpiration loses water faster than roots absorb it, so cells become flaccid and kale wilts. Evening: transpiration falls, roots catch up, cells become turgid again, and kale recovers. Common mistake: saying plants stand because of the cell wall alone; without water pressure a thin wall cannot hold the stem up.')
        ]
      },
      {
        id: 'cbc_g12_bio_s3',
        number: 3,
        title: '3.0 Anatomy and Physiology of Animals',
        strand: 'Strand 3.0: Anatomy and Physiology of Animals',
        icon: 'ANI',
        status: 'available',
        summary: 'Response and coordination, support and movement in animals.' + NOTE,
        subtopics: [
          stop('cbc_g12_bio_s3_1', '3.1 Response and Coordination', 'Nerves and Hormones',
            'The nervous system acts fast; the endocrine system acts slowly and lasts longer',
            'A stimulus is detected by a receptor, passed along neurones (nerve cells) as electrical impulses to the brain or spinal cord (the central nervous system), and an effector (a muscle or gland) responds. A reflex arc is a fast automatic response using three neurones: sensory, relay (in the spinal cord) and motor. It does not wait for the brain to decide, which saves time. Hormones are chemicals made by glands and carried in blood to target organs; for example adrenaline prepares the body for action by raising heart rate. Compared with nerves, hormones act more slowly and their effects last longer.',
            'Stimulus -> receptor -> sensory neurone -> relay neurone -> motor neurone -> effector',
            'Reflex arc',
            'A herder touching a hot cooking pot pulls his hand away before feeling pain; a goat startled by a predator is flooded with adrenaline.',
            'Why do you pull your hand from a hot pot before you feel the pain?',
            'Labelling a reflex arc; comparing nervous and hormonal coordination.',
            [
              'Step 1: Receptors in the skin detect heat. Reason: they change the stimulus into an impulse.',
              'Step 2: The sensory neurone carries it to the spinal cord. Reason: the cord is the nearest processing point.',
              'Step 3: The relay neurone passes it to a motor neurone. Reason: this connects input to output.',
              'Step 4: The motor neurone makes a muscle contract. Reason: the hand is withdrawn.',
              'Step 5: The brain is told afterward. Reason: you feel pain after the response has already started.'
            ],
            'Fast nerve impulses can travel about 100 metres per second. For a 1 m path, time = distance / speed = 1 / 100 = 0.01 s, so the response is almost instant. A hormone such as adrenaline must travel in the blood and takes seconds to act. Common mistake: saying a reflex goes through the brain first; the spinal cord handles it.'),
          stop('cbc_g12_bio_s3_2', '3.2 Support and Movement', 'Skeleton and Muscles',
            'Muscles pull on bones across joints; muscles work in pairs',
            'The skeleton supports the body, protects organs (the skull protects the brain, the ribs protect the lungs) and allows movement. Bones are joined at joints; at a synovial joint (knee, elbow) a fluid reduces friction. Ligaments join bone to bone; tendons join muscle to bone. Muscles can only pull by contracting, never push, so they work in antagonistic pairs: when the biceps contracts the elbow bends and the triceps relaxes; when the triceps contracts the arm straightens and the biceps relaxes. Fish swim when the muscle blocks on each side of the backbone contract alternately.',
            'Biceps contracts + triceps relaxes = arm bends',
            'Antagonistic muscle pair',
            'Maasai herders walk long distances and jump high using strong leg muscles pulling on the long bones; tilapia swim by side-to-side body waves.',
            'If muscles can only pull, how can the same arm both bend and straighten?',
            'Antagonistic pairs; difference between ligaments and tendons; support in fish and insects.',
            [
              'Step 1: A nerve impulse reaches the biceps. Reason: muscle contracts only when stimulated.',
              'Step 2: The biceps shortens and pulls the forearm up. Reason: its tendon is attached to a forearm bone.',
              'Step 3: The triceps relaxes. Reason: otherwise it would resist the movement.',
              'Step 4: To straighten, the roles swap. Reason: muscles only pull, so the opposite muscle is needed.'
            ],
            'Lifting a bag by bending the elbow: biceps contracts, triceps relaxes. Putting it down slowly: biceps relaxes gradually while the triceps stays slightly tense to control the speed. Common mistake: mixing up ligaments and tendons; tendon = muscle to bone, ligament = bone to bone.')
        ]
      }
    ]
  }
];

module.exports = CBC_SENIOR_BIOLOGY_MAPS;
