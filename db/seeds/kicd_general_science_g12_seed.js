// CBC Senior School General Science, Grade 12.
// Strands and sub-strands follow the KICD Grade 12 General Science design (see docs/audits/kicd_verified_from_site.md).

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps, workedExample) {
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

const LIFE = [
  stop(
    'cbc_g12_gensci_s1_1',
    '1.1 The Ecosystems',
    'Living Things, Their Surroundings and the Flow of Energy',
    'An ecosystem is a community plus its environment; energy flows through it once while matter is recycled',
    'An ecosystem is all the living organisms in an area (the community) together with the non-living factors around them (soil, water, light, temperature), interacting as one unit. A pond, a forest, a farm and a termite mound are all ecosystems. Living members are either producers (green plants and algae that make food by photosynthesis), consumers (animals that feed on other organisms: herbivores, carnivores, omnivores) or decomposers (bacteria and fungi that break down dead matter and release nutrients back to the soil). A food chain shows who feeds on whom, with arrows pointing in the direction energy moves, for example grass -> zebra -> lion. Several linked chains form a food web. Each step is a trophic level. Energy enters from the Sun and is passed on, but at each level most is lost as heat from respiration, as movement, and as parts not eaten or not digested, so only about 10 percent passes to the next level. This is why food chains are short and why there are far fewer lions than zebras. Matter behaves differently: carbon, nitrogen and water are used again and again in cycles, because decomposers return them to the environment. Abiotic factors such as rainfall and soil pH decide which organisms can live in a place.',
    'Energy passed to next level is about 10 percent of the energy at the level below',
    'Food web with arrows and an energy pyramid',
    'In the Maasai Mara, grass supports wildebeest and zebra, which support lions and hyenas, while vultures and termites decompose what is left. On a Kenyan farm, maize, a cow and a farmer form a short, efficient chain.',
    'If energy only travels one way through an ecosystem, what keeps the Sun-fed system running, and what stops the nutrients from running out?',
    'Assessment focus: building food chains and webs, naming trophic levels, calculating energy at each level using the 10 percent rule, explaining why chains are short, and describing the role of decomposers.',
    [
      'Step 1: Identify the producer at the start of the chain. Reason: only producers capture light energy and turn it into chemical energy that all other organisms depend on.',
      'Step 2: Draw arrows from the food to the feeder. Reason: the arrow shows the direction in which energy and matter move, not "who eats whom" in reverse.',
      'Step 3: Label each organism as primary, secondary or tertiary consumer. Reason: this fixes its trophic level, which tells you how far the energy has travelled.',
      'Step 4: Apply about 10 percent transfer from one level to the next. Reason: the rest is lost as heat, movement and undigested material.',
      'Step 5: Show where decomposers act on every level. Reason: they release mineral nutrients so producers can grow again, closing the matter cycle.'
    ],
    'Question: Grass in a paddock receives and stores 20 000 kJ of energy. Using the 10 percent rule, how much reaches a hawk in the chain grass -> grasshopper -> lizard -> hawk? Working: grass (producer) 20 000 kJ. Grasshopper (primary consumer) = 10 percent of 20 000 = 2 000 kJ. Lizard (secondary consumer) = 10 percent of 2 000 = 200 kJ. Hawk (tertiary consumer) = 10 percent of 200 = 20 kJ. So the hawk gets 20 kJ, which is 0.1 percent of the grass energy. Common mistake: saying energy is "used up" or destroyed; it is changed to heat and lost to the surroundings, and another mistake is drawing arrows from the eater to the eaten.'
  ),
  stop(
    'cbc_g12_gensci_s1_2',
    '1.2 Cell Division',
    'How Cells Make More Cells',
    'Mitosis makes identical body cells for growth and repair; meiosis makes gametes with half the chromosomes',
    'Every living thing grows by making new cells, and a new cell can only come from an existing cell dividing. The instructions for a cell are stored in DNA, which is packaged into structures called chromosomes inside the nucleus. A human body cell has 46 chromosomes arranged as 23 pairs, one of each pair from each parent. This full set is called diploid (2n). Before dividing, the cell copies all its DNA so each chromosome has two identical halves. In mitosis, the copies are pulled apart into two nuclei, and the cell splits to give two daughter cells that are genetically identical to the parent and also diploid. Mitosis is used for growth, replacing worn cells (skin, gut lining), repairing wounds and asexual reproduction. In meiosis, the cell divides twice and makes four cells, each with only one chromosome from every pair, called haploid (n). Meiosis happens only in the reproductive organs, and it makes gametes (sperm and egg). Meiosis also shuffles genes, because each pair separates at random, so the gametes differ from each other, which is a source of variation. At fertilisation a haploid sperm and haploid egg fuse to restore the diploid number. Uncontrolled mitosis is what happens in cancer.',
    'Mitosis: 2n -> 2 cells (2n). Meiosis: 2n -> 4 cells (n)',
    'Side-by-side flow of mitosis and meiosis with chromosome counts',
    'A cut on the knee heals because skin cells divide by mitosis. Farmers breeding Friesian cattle rely on meiosis in the parents to produce varied calves, while tissue-culture banana seedlings are produced by repeated mitosis so they are identical to the parent plant.',
    'Why would a sperm with 46 chromosomes cause a problem at fertilisation?',
    'Assessment focus: comparing mitosis and meiosis, stating chromosome numbers in each cell type, linking each type of division to its function, and explaining how meiosis creates variation.',
    [
      'Step 1: Copy the DNA (each chromosome becomes two identical strands). Reason: each daughter cell must receive a full set of instructions.',
      'Step 2: In mitosis, line up the chromosomes and pull the two strands of each to opposite ends. Reason: this gives each new nucleus exactly the same set as the parent.',
      'Step 3: Divide the cytoplasm to make two cells. Reason: the cell must be physically separated to become two working units.',
      'Step 4: In meiosis, first separate the pairs of chromosomes, then separate the strands. Reason: two divisions reduce the chromosome number from 2n to n in four cells.',
      'Step 5: At fertilisation, join two haploid gametes. Reason: this restores the diploid number so it stays constant from generation to generation.'
    ],
    'Question: A maize plant has 20 chromosomes in its leaf cells. How many chromosomes are in (a) each cell after mitosis, (b) each pollen grain, (c) the zygote, and (d) how many cells result from 5 rounds of mitosis starting from one cell? Working: (a) mitosis keeps the number, so 20. (b) pollen is a gamete made by meiosis, so half: 10. (c) fertilisation joins 10 + 10 = 20. (d) each round doubles the number: 2^5 = 32 cells. Common mistake: saying mitosis halves the number of chromosomes, or that meiosis gives two cells instead of four.'
  ),
  stop(
    'cbc_g12_gensci_s1_3',
    '1.3 Introduction to Genetics',
    'How Traits Are Passed From Parents to Offspring',
    'Genes come in versions called alleles; a dominant allele shows when present, a recessive one only when two copies are inherited',
    'Genetics is the study of how characteristics are inherited. A gene is a section of DNA that carries the instruction for a particular trait, such as blood group or seed shape. Because chromosomes come in pairs, each individual has two copies of every gene, one from each parent. The different versions of a gene are alleles. If the two alleles are the same, the individual is homozygous for that gene; if they differ, it is heterozygous. The genotype is the pair of alleles, and the phenotype is the visible or measurable trait that results. A dominant allele (written with a capital letter) shows in the phenotype even when only one copy is present; a recessive allele (small letter) shows only when both copies are recessive. Each gamete carries just one allele of each gene because meiosis separates the pair. To predict offspring, write the parents genotypes, list the possible gametes, and combine them in a Punnett square. Sickle cell disease is a Kenyan example: the allele HbS causes the disease only when two copies are inherited, so HbA HbA is normal, HbA HbS is a carrier with mild or no symptoms, and HbS HbS has the disease. Carriers are partly protected from severe malaria, which is why the allele remains common near Lake Victoria and the coast.',
    'Probability of an offspring genotype = chance of one gamete x chance of the other gamete',
    'Punnett square with parental gametes along the edges',
    'In western Kenya and coastal areas many families have carriers of sickle cell. Two carrier parents can have a child with the disease, which is why genetic counselling is offered. Crossing tall and short bean plants gives the same patterns.',
    'Two parents both look healthy, yet their child has a recessive disease. What must be true about the parents genotypes?',
    'Assessment focus: defining gene, allele, dominant, recessive, genotype and phenotype, drawing a monohybrid cross, giving ratios and probabilities, and interpreting the sickle cell example.',
    [
      'Step 1: Choose letters and state which allele is dominant. Reason: a capital letter for dominant and the same small letter for recessive keeps the working clear.',
      'Step 2: Write each parent genotype. Reason: the offspring can only receive what the parents carry.',
      'Step 3: List the gametes each parent can make, one allele per gamete. Reason: meiosis separates the allele pair.',
      'Step 4: Fill a Punnett square, combining every male gamete with every female gamete. Reason: each combination is equally likely at fertilisation.',
      'Step 5: Read off genotypes, phenotypes and the ratio. Reason: the question asks about the traits seen, not only the letters.'
    ],
    'Question: Two carrier parents (HbA HbS) have a child. What is the chance the child has sickle cell disease, and what is the chance the child is a carrier? Working: each parent makes gametes HbA (half) and HbS (half). Combinations: HbA HbA, HbA HbS, HbS HbA, HbS HbS, each 1 out of 4. Disease (HbS HbS) = 1/4 = 25 percent. Carrier (HbA HbS or HbS HbA) = 2/4 = 50 percent. Normal (HbA HbA) = 25 percent. Common mistake: believing that if one child has the disease, the next three must be healthy; each child is an independent 1 in 4 chance.'
  ),
  stop(
    'cbc_g12_gensci_s1_4',
    '1.4 Evolution and Biodiversity',
    'Why Life on Earth Is So Varied and How It Changes',
    'Variation plus a struggle to survive causes natural selection, and over many generations a population changes',
    'Biodiversity is the variety of living things in an area, counted as the number of species, the genetic variety within each species, and the variety of ecosystems. Evolution is the gradual change in the inherited features of a population over many generations. The best-supported explanation is natural selection, which has four parts. First, members of a species show variation, caused by mutations (random changes in DNA) and by the shuffling of genes in meiosis. Second, more offspring are born than the environment can support, so there is competition for food, water and mates. Third, individuals with features that suit the environment survive and reproduce more (survival of the fittest means best fitted, not strongest). Fourth, they pass the useful alleles to their young, so these alleles become more common in the next generation. Evidence for evolution includes fossils, similar bone structures in different animals (homologous structures), and DNA similarities. A modern example is antibiotic resistance: a few bacteria carry a mutation that lets them survive a drug, they multiply when others are killed, and the whole population becomes resistant. Loss of habitat, pollution, over-hunting and invasive species reduce biodiversity, and when a species disappears completely it is extinct. Conservation through national parks, seed banks and community conservancies protects biodiversity.',
    'Natural selection = variation + competition + survival of the fit + inheritance',
    'Population before and after selection, showing the shift in allele frequency',
    'Kenya is a biodiversity hotspot: the Mara, the Aberdare forests, the coral reefs and Lake Nakuru support thousands of species. Misuse of antibiotics, for example not completing a dose, helps resistant bacteria spread.',
    'If a patient stops antibiotics after two days because they feel better, which bacteria are left alive and what do they pass on?',
    'Assessment focus: defining biodiversity and evolution, explaining natural selection in four steps with an example, giving evidence for evolution, and describing threats and conservation of biodiversity.',
    [
      'Step 1: Identify the variation in the population. Reason: with no variation, selection has nothing to act on.',
      'Step 2: Name the environmental pressure (drug, drought, predator). Reason: the pressure decides which feature gives an advantage.',
      'Step 3: Show which individuals survive and reproduce. Reason: survival to reproduce is what passes alleles on.',
      'Step 4: State that the useful allele is inherited by the offspring. Reason: only inherited features can change a population, not features gained in life.',
      'Step 5: Describe the population after many generations. Reason: evolution is a change in the population, not in a single individual.'
    ],
    'Question: A population of 1 000 000 bacteria includes 1 that is resistant to an antibiotic. Treatment kills all the non-resistant ones. If the survivor divides every 20 minutes, how many bacteria are there after 10 hours? Working: 10 hours = 600 minutes, so 600 / 20 = 30 divisions. Each division doubles the number, so 2^30 = 1 073 741 824, about 1.07 x 10^9. All of them are resistant, because they are copies of the survivor. Common mistake: saying the bacteria "learned" or "decided" to become resistant; the mutation was already there by chance and selection only favoured it.'
  ),
  stop(
    'cbc_g12_gensci_s1_5',
    '1.5 Skeletal and Muscular System',
    'Support, Protection and Movement',
    'Bones form levers, and muscles that work in opposing pairs pull them across joints to cause movement',
    'The skeleton is the framework of bones that gives the body shape, supports it, protects soft organs (the skull protects the brain, the rib cage protects the heart and lungs), makes blood cells in bone marrow, stores calcium and, with muscles, allows movement. Bones meet at joints. In a hinge joint (elbow, knee) movement is in one direction like a door hinge; in a ball-and-socket joint (shoulder, hip) movement is in many directions. At movable joints, bones are held by ligaments (strong, slightly elastic tissue joining bone to bone), the ends are covered with smooth cartilage and cushioned by synovial fluid so there is little friction. Muscles are attached to bones by tendons (inelastic cords joining muscle to bone). A muscle can only pull by contracting; it cannot push. So movement at a joint needs antagonistic pairs: when the biceps contracts, the forearm bends up (flexion) while the triceps relaxes; when the triceps contracts, the arm straightens (extension) while the biceps relaxes. The bone acts as a lever, the joint as the pivot (fulcrum), the muscle supplies the effort, and the weight carried is the load. Muscles get energy from respiration; exercise strengthens muscles and bone, while a diet with enough calcium, vitamin D and protein keeps them healthy.',
    'Moment of a force = force x perpendicular distance from the pivot',
    'Arm as a lever with biceps and triceps labelled',
    'Athletes from Iten and Eldoret run long distances using powerful leg muscles and tendons. Rickets in children, from a shortage of vitamin D or calcium, bends the leg bones. A fractured bone is held in a cast so that it heals in the right position.',
    'Why can a muscle bend your arm but never straighten it by itself?',
    'Assessment focus: functions of the skeleton, types of joints, ligaments versus tendons, antagonistic muscle action during flexion and extension, and simple lever calculations on the arm.',
    [
      'Step 1: Locate the joint and the two bones that meet there. Reason: movement happens only where bones are joined by a movable joint.',
      'Step 2: Identify the two muscles of the antagonistic pair. Reason: because muscles only pull, one muscle is needed for each direction.',
      'Step 3: Contract one muscle and relax the other. Reason: the contracting muscle shortens and pulls the bone through its tendon, while the relaxed one is stretched.',
      'Step 4: Treat the bone as a lever with the joint as the pivot. Reason: this lets you compare the effort and the load by taking moments.',
      'Step 5: Reverse the muscle roles to return the limb. Reason: the first muscle cannot push the bone back.'
    ],
    'Question: A person holds a 20 N weight in the hand, 30 cm from the elbow. The biceps tendon is attached 4 cm from the elbow. Ignoring the weight of the forearm, what force must the biceps exert for the arm to stay still? Working: for balance, clockwise moment = anticlockwise moment about the elbow. Load moment = 20 N x 0.30 m = 6.0 N m. Biceps moment = F x 0.04 m. So F = 6.0 / 0.04 = 150 N. The biceps force is 7.5 times the weight, which shows the arm is a lever that favours speed and range of movement over force. Common mistake: mixing up ligaments and tendons, or forgetting to convert cm to m.'
  )
];

const MATTER = [
  stop(
    'cbc_g12_gensci_s2_1',
    '2.1 Carbon and its Oxides',
    'One Element, Many Forms, Two Important Gases',
    'Carbon exists as diamond and graphite, and burns to carbon dioxide in plenty of air or poisonous carbon monoxide in too little',
    'Carbon is a non-metal in Group 14 with four outer electrons, so it forms four covalent bonds. Allotropes are different forms of the same element in the same state. In diamond each carbon is bonded to four others in a rigid 3-D network, which makes it the hardest natural substance and a non-conductor, useful for cutting tools. In graphite each carbon bonds to three others in flat layers that slide over each other, with one free electron per atom, so graphite is soft, slippery and conducts electricity; it is used in pencils, lubricants and electrodes. Amorphous carbon such as charcoal and soot has no regular structure. When carbon or a carbon fuel burns in plenty of air (complete combustion) it forms carbon dioxide: C + O2 -> CO2. In limited air (incomplete combustion) it forms carbon monoxide: 2C + O2 -> 2CO, a colourless, odourless gas that binds to haemoglobin and stops it carrying oxygen. Carbon dioxide is denser than air, does not support burning, and is slightly soluble, giving weak carbonic acid. It turns limewater milky because calcium carbonate forms. In the lab, it is made from marble and dilute hydrochloric acid: CaCO3 + 2HCl -> CaCl2 + H2O + CO2. Uses include fire extinguishers, fizzy drinks and dry ice. CO2 trapped in the atmosphere absorbs heat, so more of it from burning fuels strengthens the greenhouse effect and warms the climate.',
    'C + O2 -> CO2 (plenty of air); 2C + O2 -> 2CO (limited air)',
    'Diamond and graphite structures, and a limewater test',
    'Charcoal jikos burning in a closed room produce carbon monoxide, which causes deaths every year, so cooking must be in a ventilated place. Soda and tonic drinks are fizzy because of dissolved carbon dioxide, and burning of forests and fuel raises the level in the air.',
    'Why does the same element, carbon, give a diamond that cuts glass and graphite that writes on paper?',
    'Assessment focus: structure and properties of diamond and graphite, complete versus incomplete combustion, preparing and testing carbon dioxide, dangers of carbon monoxide, and carbon dioxide and global warming.',
    [
      'Step 1: Describe how each carbon atom is bonded in the allotrope. Reason: the arrangement of bonds decides hardness and conductivity.',
      'Step 2: Link properties to structure (4 bonds gives hardness; layers and free electrons give softness and conduction). Reason: this is the only reliable way to explain differences.',
      'Step 3: For burning, state how much air is available. Reason: plenty of oxygen gives CO2, little oxygen gives CO.',
      'Step 4: Write and balance the equation. Reason: the mole ratio gives the mass or volume of gas produced.',
      'Step 5: Test the gas by bubbling it through limewater. Reason: CO2 reacts to form insoluble calcium carbonate, so the clear liquid turns milky.'
    ],
    'Question: 6.0 g of carbon (Ar = 12) burns completely. What mass and volume (at r.t.p., 24 dm^3 per mole) of carbon dioxide forms, and what mass of carbon monoxide would form if it burned incompletely? Working: moles of C = 6.0 / 12 = 0.50 mol. Complete: C + O2 -> CO2, ratio 1 : 1, so 0.50 mol CO2. Mr of CO2 = 12 + 32 = 44, mass = 0.50 x 44 = 22 g. Volume = 0.50 x 24 = 12 dm^3. Incomplete: 2C + O2 -> 2CO, ratio 1 : 1, so 0.50 mol CO, Mr 28, mass = 14 g. Common mistake: saying carbon monoxide has no effect because it is "just another carbon gas", or confusing the limewater test result: it turns milky, it does not go colourless.'
  ),
  stop(
    'cbc_g12_gensci_s2_2',
    '2.2 Alkanol, Alkanoic Acids and Esters',
    'Ethanol, Vinegar and Fruity Smells',
    'Alcohols contain the -OH group, acids the -COOH group, and an alcohol plus an acid make an ester and water',
    'Organic compounds are compounds of carbon. A functional group is the part of a molecule that decides how it reacts. Alkanols (alcohols) contain the -OH group and have names ending in -ol: methanol CH3OH, ethanol C2H5OH. Alkanoic (carboxylic) acids contain -COOH and end in -oic acid: methanoic acid HCOOH, ethanoic acid CH3COOH. Ethanol is made by fermentation, in which yeast enzymes break down glucose without oxygen: C6H12O6 -> 2C2H5OH + 2CO2. It burns cleanly, C2H5OH + 3O2 -> 2CO2 + 3H2O, and is a solvent and fuel. Oxidising ethanol, for example by air and bacteria in wine left open or by acidified potassium dichromate, gives ethanoic acid. Ethanoic acid is a weak acid: it turns blue litmus red, reacts with carbonates to give carbon dioxide, and reacts with reactive metals to give hydrogen. When an alkanol and an alkanoic acid are warmed with a little concentrated sulfuric acid (catalyst), they join with loss of water in esterification: ethanol + ethanoic acid <-> ethyl ethanoate + water. Esters have sweet, fruity smells and are used as flavourings, perfumes and solvents. Methanol is poisonous, and drinking illicit ethanol that contains methanol can cause blindness and death.',
    'ethanol + ethanoic acid <-> ethyl ethanoate + water (conc. H2SO4)',
    'Structural formulas of ethanol, ethanoic acid and ethyl ethanoate',
    'Traditional brews such as busaa and chang\'aa rely on fermentation, and unsafe home distilling has caused poisoning in Kenya. Vinegar used in kachumbari and for pickling is dilute ethanoic acid, and ethanol is also blended in some fuels and sold as a sanitiser.',
    'What do ethanol, vinegar and the smell of ripe banana have in common at the molecular level?',
    'Assessment focus: naming and drawing alkanols, alkanoic acids and esters, fermentation and combustion equations, reactions of ethanoic acid, and the esterification reaction with conditions.',
    [
      'Step 1: Find the functional group (-OH, -COOH or -COO-). Reason: it tells you the family and the reactions.',
      'Step 2: Count the carbons to get the stem (meth-, eth-, prop-). Reason: this gives the name and the formula.',
      'Step 3: Write the balanced equation for the process (fermentation, oxidation, esterification). Reason: the coefficients let you calculate amounts.',
      'Step 4: State the condition (yeast and no air, an oxidising agent, or warm with concentrated sulfuric acid). Reason: each reaction needs its own condition.',
      'Step 5: Convert between mass and moles using Mr. Reason: this gives the theoretical yield.'
    ],
    'Question: 180 g of glucose (Mr 180) is fermented completely. What mass of ethanol (Mr 46) is made, what volume of carbon dioxide at r.t.p. (24 dm^3 per mole), and what is the mass if only 50 percent of the theoretical yield is obtained? Working: moles of glucose = 180 / 180 = 1.0 mol. Equation ratio glucose : ethanol : CO2 = 1 : 2 : 2. Ethanol = 2.0 mol, mass = 2.0 x 46 = 92 g. CO2 = 2.0 mol, volume = 2.0 x 24 = 48 dm^3. At 50 percent yield, ethanol = 0.50 x 92 = 46 g. Common mistake: forgetting the coefficient 2 and giving 46 g as the theoretical yield, or leaving out the water when writing the esterification equation.'
  ),
  stop(
    'cbc_g12_gensci_s2_3',
    '2.3 Detergents',
    'Why Soap Cleans and Why Hard Water Spoils It',
    'A detergent molecule has a water-loving head and a grease-loving tail, which lifts grease off surfaces into the water',
    'A detergent is a substance that helps water remove dirt and grease. Water alone does not wet grease well because grease is non-polar. A detergent molecule has two ends: a hydrophilic (water-loving) head that is charged and dissolves in water, and a hydrophobic (water-hating) tail, a long hydrocarbon chain, that dissolves in grease. In washing, the tails push into the grease and the heads stay in the water, so the grease is broken into tiny droplets surrounded by heads, which are carried away by rinsing. Soap is a soap detergent, made by saponification: heating a fat or oil with a strong alkali such as sodium hydroxide gives soap (the sodium salt of a long-chain acid) and glycerol. A soapless detergent is made from petroleum chemicals. Hard water contains dissolved calcium and magnesium ions. Soap reacts with them to form an insoluble scum, so more soap is wasted before lather forms: 2C17H35COONa + Ca2+ -> (C17H35COO)2Ca + 2Na+. Soapless detergents form soluble calcium salts, so they lather in hard water and cause no scum. However, many soapless detergents are not broken down by bacteria (non-biodegradable) and may cause foaming and pollution in rivers, while phosphates in them cause algal growth.',
    'fat + sodium hydroxide -> soap + glycerol; soap + Ca2+ -> scum',
    'Detergent molecule with head and tail surrounding a grease droplet',
    'Bar soap for washing clothes in rivers, such as the Nairobi River, lets detergent and grease enter the water, and in hard-water areas like parts of Kajiado and Machakos soap makes scum and needs more water. Boiling removes temporary hardness, but permanent hardness needs softening.',
    'If grease and water do not mix, how does a molecule with one end in each manage to take the grease away?',
    'Assessment focus: the structure and cleaning action of detergents, making soap by saponification, comparing soap and soapless detergents, and explaining scum and hardness of water.',
    [
      'Step 1: Draw the detergent as a head and a tail. Reason: cleaning is explained by the two different ends.',
      'Step 2: Place the tail in the grease and the head in the water. Reason: like dissolves like, so each end goes where it is comfortable.',
      'Step 3: Agitate to break the grease into droplets. Reason: the heads on the outside keep the droplets apart so they do not rejoin.',
      'Step 4: Rinse away the droplets in the water. Reason: the grease leaves with the water.',
      'Step 5: In hard water, expect Ca2+ to precipitate soap as scum. Reason: the calcium salt of the soap acid is insoluble, so the soap is used up.'
    ],
    'Question: Hard water contains 0.010 mol of calcium ions. What mass of sodium stearate soap (C17H35COONa) is used up forming scum before any lather forms? Working: 2C17H35COONa + Ca2+ -> (C17H35COO)2Ca + 2Na+, so 2 mol soap per 1 mol Ca2+. Moles of soap = 2 x 0.010 = 0.020 mol. Mr of C17H35COONa = (18 x 12) + 35 + (2 x 16) + 23 = 216 + 35 + 32 + 23 = 306. Mass = 0.020 x 306 = 6.12 g. Common mistake: saying that soapless detergents make water soft; they only avoid forming scum, the water is still hard.'
  ),
  stop(
    'cbc_g12_gensci_s2_4',
    '2.4 Polymers',
    'Long Chains Built From Small Units',
    'A polymer is a very long molecule made by joining many small monomers, by addition or by condensation',
    'A monomer is a small molecule that can join to others, and a polymer is the long molecule that results, with a very high relative molecular mass. Natural polymers include starch (made from glucose), proteins (made from amino acids), cellulose and rubber. Synthetic polymers are made in industry. In addition polymerisation the monomers contain a C=C double bond; the double bond opens and the monomers link end to end, and nothing else is made. Ethene gives poly(ethene), used for carrier bags and sacks; propene gives poly(propene), used for ropes and crates; chloroethene gives PVC, used for pipes. In condensation polymerisation two different functional groups react each time and a small molecule, usually water, is lost; nylon (a polyamide) and polyester are examples, made from monomers with two reactive groups. Plastics are useful because they are light, cheap, waterproof and do not rust, but most synthetic polymers are non-biodegradable, so they remain in soil and water for hundreds of years, block drains, harm animals and release poisonous fumes if burnt. Kenya banned single-use plastic carrier bags in 2017. The responses are reduce, reuse and recycle, and use biodegradable materials such as paper or cassava-based bags.',
    'n monomers -> polymer; Mr of polymer = n x Mr of monomer (addition)',
    'Ethene molecules joining to form poly(ethene)',
    'Plastic jerrycans, water tanks, polythene sacks and nylon ropes are in every Kenyan home. Plastic waste in Nairobi river and drains causes flooding, and recycling firms collect bottles to make fibre and fencing posts.',
    'If a plastic bag can last hundreds of years in the soil, what does that tell us about its bonds and about the microbes around it?',
    'Assessment focus: monomer and polymer, addition versus condensation polymerisation, drawing the repeat unit, uses of common polymers, and environmental effects of plastics.',
    [
      'Step 1: Identify the monomer and look for a C=C double bond. Reason: a double bond means addition polymerisation is possible.',
      'Step 2: Open the double bond so each carbon can bond to the next monomer. Reason: this gives the long saturated chain.',
      'Step 3: Draw the repeat unit in brackets with the letter n. Reason: the polymer is that unit repeated many times.',
      'Step 4: For two different functional groups, show the small molecule lost. Reason: this identifies condensation polymerisation.',
      'Step 5: Relate the properties to uses and to disposal problems. Reason: the same strong bonds that make plastics durable also stop them decaying.'
    ],
    'Question: A sample of poly(ethene) has a relative molecular mass of 14 000. How many ethene units (C2H4) does one molecule contain, and how many moles of polymer molecules form from 2.8 kg of ethene? Working: Mr of C2H4 = (2 x 12) + (4 x 1) = 28. Number of units = 14 000 / 28 = 500. In addition polymerisation no mass is lost, so 2.8 kg of ethene makes 2.8 kg (2 800 g) of polymer, which is 2 800 / 14 000 = 0.20 mol of polymer molecules. Common mistake: saying that addition polymers lose water, or that poly(ethene) contains a double bond; the double bond is used up in forming the chain.'
  ),
  stop(
    'cbc_g12_gensci_s2_5',
    '2.5 Electrolysis',
    'Using Electricity to Break Down Compounds',
    'Electrolysis uses direct current to decompose an ionic compound when its ions are free to move',
    'Electrolysis is the decomposition of an ionic compound, in molten form or in solution, by passing an electric current through it. The liquid that conducts and is decomposed is the electrolyte. It conducts because its ions are free to move; a solid ionic compound does not conduct because the ions are fixed in a lattice. The current enters and leaves through electrodes. The electrode connected to the positive terminal of the battery is the anode and the one connected to the negative terminal is the cathode. Positive ions (cations) are attracted to the cathode, where they gain electrons (reduction); negative ions (anions) go to the anode, where they lose electrons (oxidation). Molten sodium chloride gives sodium at the cathode and chlorine at the anode. For aqueous solutions, water also supplies H+ and OH- ions, so the products depend on the ions present: an unreactive metal such as copper or silver is formed at the cathode, but with a reactive metal such as sodium or potassium hydrogen forms instead. At the anode, halide ions give the halogen, otherwise oxygen forms. Applications include electroplating (coating an object with a thin layer of metal to prevent rusting or improve looks), purifying copper and extracting aluminium. The amount of substance formed depends on the charge passed: charge Q = current I x time t, and one mole of electrons carries 96 500 coulombs.',
    'Q = I x t; moles of electrons = Q / 96 500',
    'Electrolysis cell with anode, cathode, electrolyte and battery',
    'Jewellery and cutlery are silver- or gold-plated, and steel buckets and nuts are zinc-coated (galvanised) to resist rust. Electrical wires in Kenya\'s homes are made from copper purified by electrolysis, and aluminium sufuria are made from metal extracted by electrolysis.',
    'Why does solid salt not conduct electricity, yet salt water and molten salt do?',
    'Assessment focus: terms (electrode, electrolyte, anode, cathode), products at each electrode, half-equations, applications such as electroplating, and calculating mass from current and time.',
    [
      'Step 1: List all the ions in the electrolyte, including those from water. Reason: any of them could be discharged.',
      'Step 2: Send cations to the cathode and anions to the anode. Reason: opposite charges attract.',
      'Step 3: Decide which ion is discharged at each electrode using the less reactive metal and the halide rule. Reason: the ion that gains or loses electrons more easily is the one that is discharged.',
      'Step 4: Write the half-equations, for example Cu2+ + 2e- -> Cu. Reason: it shows how many electrons are needed per atom.',
      'Step 5: Use Q = I x t and the moles of electrons to find the amount of product. Reason: charge measures how many electrons passed.'
    ],
    'Question: A current of 2.0 A flows through copper(II) sulfate solution for 30 minutes using copper electrodes. What mass of copper is deposited on the cathode? (Ar Cu = 63.5, one mole of electrons = 96 500 C) Working: t = 30 x 60 = 1 800 s. Q = 2.0 x 1 800 = 3 600 C. Moles of electrons = 3 600 / 96 500 = 0.0373 mol. Cu2+ + 2e- -> Cu, so moles of Cu = 0.0373 / 2 = 0.01865 mol. Mass = 0.01865 x 63.5 = 1.18 g. Common mistake: leaving time in minutes instead of converting to seconds, or saying that electrons flow through the electrolyte; in the solution the ions carry the current.'
  )
];

const PHYSICAL = [
  stop(
    'cbc_g12_gensci_s3_1',
    '3.1 Electrostatics',
    'Charges at Rest',
    'Rubbing moves electrons from one material to another; like charges repel and unlike charges attract',
    'Everything is made of atoms with positive protons in the nucleus and negative electrons around it. Normally the charges balance and an object is neutral. Electric charge is measured in coulombs (C). Only electrons move in solids. When two different insulators are rubbed together, electrons pass from one to the other: the material that gains electrons becomes negative and the one that loses them becomes positive. Charging by friction is how a plastic comb or a balloon picks up paper. Charge on one electron is 1.6 x 10^-19 C, so any charge is a whole number of electrons. The law of charges says that like charges repel and unlike charges attract. A neutral object is also attracted to a charged one by induction: the charged object pushes like charges away to the far side and pulls opposite charges close, so the near side is attracted more strongly. Conductors (metals) let charge flow; insulators (plastic, dry air, glass) do not. A gold-leaf electroscope detects charge: a charged rod brought near the cap makes the leaf and the stem carry the same charge, so the leaf rises as they repel. Earthing means connecting a conductor to the ground so that charge flows away safely. Lightning is a huge discharge between clouds and the ground; a lightning conductor, a thick metal strip into the ground, gives a safe path. Static electricity is useful in photocopiers and in spraying paint and pesticides, and dangerous when sparks ignite fuel vapour, so fuel tankers trail an earthing chain.',
    'Q = n x e, where e = 1.6 x 10^-19 C',
    'Charged rod and electroscope with leaf diverging',
    'Rubbing a plastic ruler on dry hair lets it pick up small pieces of paper. Lightning strikes are common in western Kenya (Kericho, Kisii), and many schools and homes there have lightning arresters. Tankers on Kenyan roads trail a chain so charge does not build up.',
    'You rub a balloon on your hair and it sticks to the wall. Where did the charge come from, and why does a neutral wall attract it?',
    'Assessment focus: how charging by friction and induction works, the law of charges, using an electroscope, uses and dangers of static electricity, lightning conductors and earthing, and calculations with Q = ne.',
    [
      'Step 1: Say which material loses and which gains electrons. Reason: only electrons move, so the charge on each object follows from the electron transfer.',
      'Step 2: Label the signs: the gaining material is negative and the losing material is positive. Reason: an excess of electrons is negative charge, a shortage is positive.',
      'Step 3: Apply the law of charges to predict attraction or repulsion. Reason: like charges repel and unlike charges attract.',
      'Step 4: For a neutral object, think of induction. Reason: the near side gets the opposite charge, which is closer, so the attraction beats the repulsion.',
      'Step 5: Provide a path to earth where sparks are dangerous. Reason: it lets the charge leak away instead of building up.'
    ],
    'Question: A plastic ruler gains a charge of -3.2 x 10^-9 C when rubbed. How many electrons did it gain, and what is its sign? Working: the number of electrons n = Q / e = 3.2 x 10^-9 / 1.6 x 10^-19 = 2.0 x 10^10 electrons. The ruler gained electrons, so it is negative. The cloth lost the same number, so it is +3.2 x 10^-9 C. Common mistake: saying that positive charges move from the cloth to the ruler; in solids only electrons transfer.'
  ),
  stop(
    'cbc_g12_gensci_s3_2',
    '3.2 Current Electricity',
    'Current, Voltage and Resistance in Circuits',
    'Voltage pushes charge round a circuit; resistance limits the current; V = I x R',
    'An electric current is the flow of charge. In metals it is the flow of electrons, measured in amperes (A): 1 A is 1 coulomb of charge passing a point each second, so I = Q / t. A cell or battery pushes charge round the circuit; the energy it gives to each coulomb is the potential difference (voltage), measured in volts (V), and the same word is used for the energy that each coulomb loses in a component. Resistance, in ohms, measures how much a component opposes the current. Ohm\'s law says that for a metal at constant temperature the current is proportional to the voltage, so V = I x R. An ammeter measures current and is connected in series (in the same path); a voltmeter measures potential difference and is connected in parallel (across the component). In a series circuit the same current passes through every component, the voltages add up to the battery voltage and the resistances add: R = R1 + R2. In a parallel circuit each branch has the same voltage, the currents add up to the total current, and the total resistance is smaller than the smallest branch: 1/R = 1/R1 + 1/R2. If one lamp in a series string fails, all go out; in a parallel circuit the others stay on, which is why houses are wired in parallel. The resistance of a wire rises with length and falls with thicker cross-section.',
    'V = I x R; I = Q / t; series R = R1 + R2; parallel 1/R = 1/R1 + 1/R2',
    'Circuit diagram with ammeter in series and voltmeter in parallel',
    'Christmas lights on a single string once failed together because they were in series. A solar home system in a rural home powers lamps and a phone charger in parallel, so each works alone. Thin extension cables overheat because high current meets resistance.',
    'If you add more lamps in parallel to a battery, does the battery supply more current or less? Why?',
    'Assessment focus: definitions of current, voltage and resistance, using Ohm\'s law, series and parallel circuit rules, and finding currents and voltages in mixed circuits.',
    [
      'Step 1: Draw the circuit and mark which parts are in series and which in parallel. Reason: the rules for current and voltage depend on the arrangement.',
      'Step 2: Combine the parallel resistors first, then add the series ones. Reason: this gives the total resistance of the whole circuit.',
      'Step 3: Find the total current from I = V / R. Reason: the battery voltage drives the current through the total resistance.',
      'Step 4: Find the voltage across each part with V = I x R. Reason: in series the current is shared, and the voltage divides in proportion to resistance.',
      'Step 5: Check that the branch currents add up to the total and the voltages to the battery voltage. Reason: this catches arithmetic mistakes.'
    ],
    'Question: A 12 V battery is connected to a 4 ohm resistor in series with a parallel pair of 6 ohm and 3 ohm resistors. Find the total current and the current in each of the parallel resistors. Working: for the parallel pair, 1/R = 1/6 + 1/3 = 1/6 + 2/6 = 3/6 = 1/2, so R = 2 ohm. Total R = 4 + 2 = 6 ohm. Total current I = 12 / 6 = 2.0 A. Voltage across the 4 ohm resistor = 2.0 x 4 = 8 V, so the parallel pair has 12 - 8 = 4 V. Current in the 6 ohm = 4 / 6 = 0.67 A, and in the 3 ohm = 4 / 3 = 1.33 A. The total 0.67 + 1.33 = 2.0 A agrees. Common mistake: adding parallel resistances like series ones, or putting an ammeter in parallel.'
  ),
  stop(
    'cbc_g12_gensci_s3_3',
    '3.3 Mains Electricity',
    'Power, Wiring and Safety in the Home',
    'Mains power is supplied at 240 V a.c.; the fuse, earth wire and correct wiring protect people and appliances',
    'Mains electricity is the supply from the national grid to homes. In Kenya it is alternating current (a.c.) at about 240 V and 50 Hz, which means the current reverses direction 50 times each second; a battery gives direct current (d.c.) in one direction. A three-pin plug connects an appliance by three wires: the live wire (brown) carries the 240 V, the neutral wire (blue) completes the circuit, and the earth wire (green and yellow) connects the metal case to the ground. The fuse is placed on the live side; it is a thin wire that melts if the current is too high, breaking the circuit. If a loose live wire touched a metal case, a large current would flow through the earth wire, blow the fuse and make the case safe. Power is the rate of using energy: P = I x V in watts. Electrical energy used is E = P x t; at home it is measured in kilowatt-hours (kWh), where 1 kWh is the energy used by a 1 kW device in one hour. Choose a fuse slightly above the normal working current, for example a 3 A, 5 A or 13 A fuse. Other safety measures are circuit breakers, insulated cables, never touching switches with wet hands and not overloading a socket with many appliances. A short circuit is a low-resistance path that lets a very large current flow and can start a fire.',
    'P = I x V; E = P x t (kWh); cost = kWh x tariff',
    'Three-pin plug with live, neutral and earth wires',
    'Overloaded multi-plug sockets are a leading cause of house fires in Kenyan estates, and illegal connections cause electrocutions. Kenya Power bills are charged per kWh used, and prepaid tokens are bought by units.',
    'Why does a fuse go in the live wire and not the neutral wire?',
    'Assessment focus: a.c. versus d.c., wires of a three-pin plug and their colours, the function of fuse and earth, calculating power, current, fuse size and cost of electricity, and safety rules.',
    [
      'Step 1: Write down the power rating and the supply voltage. Reason: both are needed to find the current.',
      'Step 2: Find the current with I = P / V. Reason: P = I x V rearranged gives the working current.',
      'Step 3: Pick the nearest standard fuse above the working current. Reason: it must carry normal current but melt on overload.',
      'Step 4: Find energy in kWh as power in kW times time in hours. Reason: that is the unit the electricity meter and the bill use.',
      'Step 5: Multiply the kWh by the cost per unit. Reason: this gives the money cost.'
    ],
    'Question: An electric kettle is rated 2 400 W on 240 V mains. Find (a) the current, (b) a suitable fuse from 3 A, 5 A and 13 A, and (c) the cost of using it for 30 minutes if electricity costs KSh 25 per kWh. Working: (a) I = P / V = 2 400 / 240 = 10 A. (b) The fuse must be above 10 A, so 13 A. (c) Energy = 2.4 kW x 0.5 h = 1.2 kWh. Cost = 1.2 x 25 = KSh 30. Common mistake: using the power in watts with hours to get kWh without dividing by 1 000, or choosing a 5 A fuse that would blow every time the kettle is on.'
  ),
  stop(
    'cbc_g12_gensci_s3_4',
    '3.4 Projectile Motion',
    'Motion Under Gravity in Two Directions',
    'A projectile moves at constant speed sideways while gravity changes its speed downwards, and the two motions are independent',
    'A projectile is any object thrown or launched that then moves only under gravity, such as a ball kicked off a ledge or water from a hose. The key idea is that motion in the horizontal direction and motion in the vertical direction are independent and can be treated separately. Horizontally, ignoring air resistance, nothing pushes the object sideways, so its horizontal velocity stays constant and distance = speed x time. Vertically, gravity pulls it down with a constant acceleration g = 10 m/s^2 (more exactly 9.8 m/s^2 near the Earth\'s surface). For an object that starts moving horizontally from height h, the starting vertical velocity is zero, so the time to fall is found from h = 1/2 g t^2, and this time is the same as for an object simply dropped from that height. The horizontal distance travelled (the range) is the horizontal speed times that time. The vertical velocity at landing is v = g t, and the final speed combines both parts by Pythagoras: speed = square root of (vx^2 + vy^2). The path is a curve called a parabola. For an object launched at an angle, the starting speed is split into horizontal and vertical parts, and the object rises until its vertical velocity is zero, then falls. A greater launch speed gives a larger range, and in a real situation air resistance reduces both range and height.',
    'h = 1/2 g t^2; range = vx x t; v = g t; speed = square root of (vx^2 + vy^2)',
    'Parabolic path with horizontal and vertical components',
    'A football kicked high by a goalkeeper in a stadium, a javelin thrown at Kasarani, and water leaving a hosepipe all follow parabolic paths. A stone thrown horizontally from a bridge over the Athi River hits the water at a time set only by the height of the bridge.',
    'If one ball is dropped and another is thrown sideways from the same height at the same moment, which one hits the ground first?',
    'Assessment focus: separating horizontal and vertical motion, calculating time of fall, range and landing speed for a horizontal launch, and explaining the shape of the path and the effect of air resistance.',
    [
      'Step 1: Split the motion into horizontal and vertical parts. Reason: they do not affect each other, so each is simple on its own.',
      'Step 2: Use the vertical part to find the time of fall, h = 1/2 g t^2. Reason: only gravity acts vertically, and the starting vertical speed is zero.',
      'Step 3: Use the same time in the horizontal part, range = vx x t. Reason: time is the only quantity shared by both motions.',
      'Step 4: Find the vertical speed at landing, vy = g t. Reason: gravity increases the downward speed steadily.',
      'Step 5: Combine vx and vy by Pythagoras for the final speed. Reason: speed is the size of the combined velocity.'
    ],
    'Question: A ball is kicked horizontally at 15 m/s from the edge of a 20 m high cliff (take g = 10 m/s^2, ignore air resistance). Find the time in the air, the horizontal distance from the cliff where it lands, and its speed on landing. Working: 20 = 1/2 x 10 x t^2, so t^2 = 4 and t = 2.0 s. Range = 15 x 2.0 = 30 m. Vertical speed vy = 10 x 2.0 = 20 m/s. Landing speed = square root of (15^2 + 20^2) = square root of (225 + 400) = square root of 625 = 25 m/s. Common mistake: using the horizontal speed in the time-of-fall equation, or thinking that a faster horizontal throw takes longer to land.'
  ),
  stop(
    'cbc_g12_gensci_s3_5',
    '3.5 Electromagnetic Spectrum',
    'The Family of Waves That Travel Through Empty Space',
    'All electromagnetic waves travel at 3 x 10^8 m/s in a vacuum and differ in frequency and wavelength',
    'Electromagnetic (EM) waves are waves made of changing electric and magnetic fields. They are transverse waves, they carry energy, and, unlike sound, they need no medium, so they cross the vacuum of space from the Sun to the Earth. In a vacuum all of them travel at the same speed, c = 3 x 10^8 m/s. A wave is described by its frequency f (waves per second, in hertz) and wavelength (distance between crests, in metres), with speed = frequency x wavelength, so a higher frequency means a shorter wavelength. The EM spectrum, from the lowest frequency to the highest, is: radio waves, microwaves, infrared, visible light (red to violet), ultraviolet, X-rays and gamma rays. Photon energy rises with frequency, so the high-frequency end is the more dangerous. Uses: radio waves for broadcasting and mobile phones, microwaves for cooking and satellite communication, infrared for remote controls, thermal cameras and heating, visible light for sight and photography, ultraviolet for sterilising and detecting fake notes, X-rays for imaging bones, and gamma rays for killing cancer cells and sterilising equipment. Dangers: too much microwave heating burns tissue, ultraviolet causes sunburn and skin cancer, and X-rays and gamma rays damage cells and can cause cancer, so exposure is limited by shielding such as lead. Light is the only part we see.',
    'c = f x wavelength, with c = 3 x 10^8 m/s',
    'Spectrum bar from radio to gamma with wavelength and frequency arrows',
    'FM radio stations, mobile networks and Wi-Fi in Kenya use radio waves and microwaves. Hospitals use X-rays to look for fractures, and sunscreen and a hat protect against ultraviolet at the high altitude and near the equator.',
    'Radio waves and X-rays both travel at the same speed in space. So what makes them so different in what they do to us?',
    'Assessment focus: the order of the spectrum, common properties, calculations with c = f x wavelength, uses and hazards of each region, and comparing EM waves with sound.',
    [
      'Step 1: Recall the order from radio to gamma and which end has the greater frequency. Reason: properties and hazards change steadily along the spectrum.',
      'Step 2: Write the wave equation c = f x wavelength with c = 3 x 10^8 m/s. Reason: all EM waves have the same speed in a vacuum.',
      'Step 3: Rearrange for the unknown and convert units (MHz to Hz, nm to m). Reason: the equation works only in hertz and metres.',
      'Step 4: Calculate and check that higher frequency gives shorter wavelength. Reason: a quick check on the size of the answer.',
      'Step 5: Link the region to its use or hazard by its energy. Reason: higher-energy waves can ionise and damage cells.'
    ],
    'Question: (a) An FM radio station broadcasts at 100 MHz. Find the wavelength. (b) Ultraviolet light has a wavelength of 300 nm. Find its frequency. Working: (a) 100 MHz = 100 x 10^6 = 1.0 x 10^8 Hz. Wavelength = c / f = 3 x 10^8 / 1.0 x 10^8 = 3.0 m. (b) 300 nm = 300 x 10^-9 = 3.0 x 10^-7 m. f = c / wavelength = 3 x 10^8 / 3.0 x 10^-7 = 1.0 x 10^15 Hz. The UV has a far higher frequency and shorter wavelength than the radio wave, as expected. Common mistake: leaving MHz or nm in the equation without converting, or saying that sound is an electromagnetic wave.'
  )
];

const CBC_GENERAL_SCIENCE_G12_MAP = {
  curriculum: 'CBC',
  grade: 12,
  subject: 'General Science',
  code: 'GSC-G12',
  trackPathway: 'STEM',
  title: 'CBE Grade 12 (Senior STEM) General Science Metro Line',
  description: 'Strands follow the KICD Grade 12 General Science design.',
  stations: [
    {
      id: 'cbc_g12_gensci_s1',
      number: 1,
      title: '1.0 Life Science',
      strand: 'Strand 1.0: Life Science',
      icon: 'Life',
      status: 'available',
      summary: 'Ecosystems, cell division, genetics, evolution and the skeleton and muscles.',
      subtopics: LIFE
    },
    {
      id: 'cbc_g12_gensci_s2',
      number: 2,
      title: '2.0 Matter and Chemical Reactions',
      strand: 'Strand 2.0: Matter and Chemical Reactions',
      icon: 'Matter',
      status: 'available',
      summary: 'Carbon and its oxides, organic compounds, detergents, polymers and electrolysis.',
      subtopics: MATTER
    },
    {
      id: 'cbc_g12_gensci_s3',
      number: 3,
      title: '3.0 Natural Physical Science',
      strand: 'Strand 3.0: Natural Physical Science',
      icon: 'Physical',
      status: 'available',
      summary: 'Static and current electricity, mains safety, projectile motion and the electromagnetic spectrum.',
      subtopics: PHYSICAL
    }
  ]
};

module.exports = { maps: [CBC_GENERAL_SCIENCE_G12_MAP], retiredIds: [] };
