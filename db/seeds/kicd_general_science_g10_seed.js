// CBC Senior School General Science, Grade 10 (STEM pathway).
// Strands and sub-strands follow the KICD Grade 10 General Science design
// (see docs/audits/kicd_verified_from_site.md).

function stop(id, title, o) {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: o.pt,
      tagline: o.tag,
      body: o.body,
      formula: o.formula,
      visualBadge: o.badge,
      realWorldContext: o.ctx,
      explanationSteps: o.steps,
      workedExample: o.ex
    },
    socraticPrompt: o.q,
    formulaBadge: o.formula,
    examFocus: o.exam
  };
}

const S1 = [
  stop('cbc_g10_gensci_s1_1', '1.1 Introduction to General Science', {
    pt: 'How Scientists Find Things Out',
    tag: 'Science is a method: ask a question, test it fairly, measure, and let the evidence decide',
    body: 'General Science brings together biology (living things), chemistry (matter and how it changes) and physics (forces, energy, waves). All three use the same method, called the scientific method. You begin with an observation, turn it into a testable question, and propose a hypothesis, which is a possible explanation that an experiment could show to be wrong. In an experiment you change one factor on purpose, the independent variable, measure the effect, the dependent variable, and keep everything else the same, the controlled variables. Keeping everything else the same is what makes the test fair: if two things changed, you could not tell which one caused the result. A control is a set-up in which the factor is left unchanged, so you have something to compare with. You repeat the experiment and take an average, because a single reading may be a fluke. Results are recorded in a table, drawn as a graph, and used to draw a conclusion that says whether the hypothesis is supported. Safety is part of method: wear protective clothing, know the hazard symbols (flammable, corrosive, toxic), and never taste chemicals. Measurements need correct units, such as grams (g) for mass, cm^3 for volume, seconds (s) for time and degrees Celsius for temperature.',
    formula: 'mean = sum of readings / number of readings',
    badge: 'Cycle: observe, question, hypothesis, experiment, results, conclusion',
    ctx: 'A farmer in Kitale who wants to know whether a new fertiliser raises maize yield must plant two plots that differ only in the fertiliser. That is a controlled experiment.',
    steps: [
      'Step 1: State a question that can be measured, for example "Does the amount of light change how fast bean seedlings grow?". Reason: a vague question cannot be tested.',
      'Step 2: Write a hypothesis. Reason: it tells you what result would support it and what result would disprove it.',
      'Step 3: Pick one independent variable, one dependent variable and list the controlled variables. Reason: only one change at a time lets you link cause to effect.',
      'Step 4: Set up a control and repeat the test at least three times. Reason: the control gives a baseline and repeats reveal chance errors.',
      'Step 5: Record readings in a table with units, then calculate the mean. Reason: an average is more reliable than one reading.',
      'Step 6: Draw a conclusion that refers to the data, and say what could be improved. Reason: conclusions must follow from evidence, not from what you hoped to see.'
    ],
    ex: 'Question: A learner grows bean seedlings in the dark and in light. After 7 days the heights (cm) in light are 12, 14, 13 and in the dark are 20, 22, 21. Find the mean of each and state the variables. Working: light mean = (12 + 14 + 13) / 3 = 39 / 3 = 13 cm. Dark mean = (20 + 22 + 21) / 3 = 63 / 3 = 21 cm. Independent variable: light (present or absent). Dependent variable: seedling height. Controlled variables: type of seed, water, temperature, soil, time. Conclusion: seedlings in the dark were 8 cm taller on average (21 - 13), because dark-grown seedlings stretch towards a light source. This does not show that darkness is good for plants; the dark seedlings are thin and pale. Common mistake: changing two things at once, for example putting the dark seedlings in a cold cupboard, so the result cannot be explained.',
    q: 'If you wanted to find out whether one brand of soap kills germs better than another, what must you keep the same in both tests, and why?',
    exam: 'Identifying independent, dependent and controlled variables; planning a fair test; calculating a mean; reading tables and graphs; naming hazard symbols and safety rules.'
  }),
  stop('cbc_g10_gensci_s1_2', '1.2 The Cell', {
    pt: 'The Cell: the Unit of Life',
    tag: 'Every living thing is made of cells, and each part of a cell has a job',
    body: 'A cell is the smallest unit of a living thing that can carry out the processes of life. Most cells are too small to see, so we use a light microscope, which magnifies by passing light through a thin specimen and two sets of lenses. Total magnification is the eyepiece power multiplied by the objective power. All cells have a cell membrane, a thin layer that controls what enters and leaves; cytoplasm, a jelly-like fluid in which chemical reactions happen; and a nucleus, which holds the genetic material (DNA) and controls the cell. Mitochondria are the sites of aerobic respiration, releasing energy. Ribosomes make proteins. Plant cells also have a cell wall made of cellulose that gives support, a large vacuole filled with cell sap, and chloroplasts containing chlorophyll for photosynthesis. Animal cells have no cell wall and no chloroplasts. Cells with a similar job group into a tissue (for example muscle tissue), tissues into an organ (the heart), organs into an organ system (the circulatory system), and systems into an organism. This order is called the levels of organisation. Specialised cells have shapes that suit their jobs: a root hair cell has a long thin extension that increases surface area for absorbing water, a red blood cell has no nucleus so it can carry more haemoglobin, and a nerve cell is long to carry impulses.',
    formula: 'total magnification = eyepiece x objective;  real size = image size / magnification',
    badge: 'Labelled plant cell and animal cell side by side',
    ctx: 'Doctors in county hospitals look at a blood smear under a microscope to count red blood cells when checking for anaemia, or to find malaria parasites.',
    steps: [
      'Step 1: Identify whether the cell has a cell wall, chloroplasts and a large vacuole. Reason: these three features are present in plant cells and absent in animal cells.',
      'Step 2: Match each organelle to its job (nucleus controls, mitochondria release energy, ribosomes make protein). Reason: structure fits function, so the job explains the presence of the part.',
      'Step 3: To find magnification, multiply eyepiece by objective. Reason: the objective forms a magnified image which the eyepiece then magnifies again.',
      'Step 4: To find real size, divide the image size by the magnification, then convert units. Reason: magnification tells how many times larger the image is than the real object.'
    ],
    ex: 'Question: A learner uses a x10 eyepiece and x40 objective. A cell in a drawing measures 2.0 mm across. What is its real width in micrometres? Working: total magnification = 10 x 40 = 400. Real size = 2.0 mm / 400 = 0.005 mm. Since 1 mm = 1000 micrometres, 0.005 x 1000 = 5 micrometres. Common mistake: dividing by 40 only, or forgetting to convert mm to micrometres. Another mistake is saying animal cells have no nucleus; they do, but mature human red blood cells lack one.',
    q: 'Why would a cell that works hard, such as a muscle cell, contain many more mitochondria than a skin cell?',
    exam: 'Labelling plant and animal cells; functions of organelles; calculating magnification and real size; levels of organisation; linking a specialised cell to its function.'
  }),
  stop('cbc_g10_gensci_s1_3', '1.3 Nutrition in Animals', {
    pt: 'Food, Digestion and Absorption',
    tag: 'Digestion breaks large insoluble food molecules into small soluble ones that blood can carry',
    body: 'Nutrition is how an organism obtains and uses food. Animals are heterotrophs: they cannot make their own food and must eat. A balanced diet contains carbohydrates and fats for energy, proteins for growth and repair, vitamins and mineral salts in small amounts for health, water, and fibre (roughage) to keep food moving through the gut. Food tests identify them: iodine solution turns blue-black with starch; Benedict\'s solution, heated, turns from blue to orange-red with reducing sugars such as glucose; the biuret test turns purple with protein; ethanol followed by water gives a cloudy white emulsion with fat. Digestion is the breakdown of large insoluble molecules into small soluble ones that can pass through the gut wall. It has a mechanical part (teeth chewing, muscles churning) and a chemical part carried out by enzymes. An enzyme is a protein that speeds up a specific reaction and is not used up. Amylase in saliva and from the pancreas breaks starch into sugars; protease in the stomach and small intestine breaks protein into amino acids; lipase breaks fats into fatty acids and glycerol. The stomach adds hydrochloric acid, which kills microbes and gives the right pH for stomach protease. Bile, made in the liver and stored in the gall bladder, emulsifies fat, breaking big droplets into small ones so lipase can work faster. The small intestine absorbs digested food through villi, finger-like folds with thin walls, a rich blood supply and a huge surface area. The large intestine absorbs water. Undigested material leaves as faeces by egestion.',
    formula: 'starch -> sugars (amylase);  protein -> amino acids (protease);  fat -> fatty acids + glycerol (lipase)',
    badge: 'Alimentary canal from mouth to anus with glands labelled',
    ctx: 'Many adults in Kenya are lactose intolerant: they lack the enzyme lactase, so milk sugar passes undigested into the large intestine and causes discomfort. Ugali with sukuma wiki and beans gives starch, vitamins and protein together.',
    steps: [
      'Step 1: In the mouth, teeth cut and grind food while saliva amylase starts breaking starch. Reason: smaller pieces give enzymes more surface to act on.',
      'Step 2: In the stomach, muscles churn food with acid and protease. Reason: acid kills microbes and gives the low pH that stomach protease needs.',
      'Step 3: In the small intestine, bile emulsifies fat and pancreatic and intestinal enzymes finish digesting all three food groups. Reason: this is where most digestion happens, in a neutral to slightly alkaline medium.',
      'Step 4: Digested molecules diffuse and are absorbed through the villi into the blood. Reason: only small soluble molecules can cross the thin wall, and the rich blood supply keeps the concentration gradient steep.',
      'Step 5: In the large intestine water is absorbed and the remains are egested. Reason: the body must recover the water used in digestive juices.'
    ],
    ex: 'Question: A learner tests a food sample. Iodine gives blue-black. Benedict\'s test (heated) stays blue. Biuret gives purple. Which nutrients are present? Working: blue-black with iodine means starch is present. Benedict\'s staying blue means no reducing sugar. Purple biuret means protein is present. Conclusion: starch and protein, no reducing sugar; fat was not tested. Second part: if 200 g of the food contains 40 g of fat, the percentage of fat = 40 / 200 x 100 = 20 percent. Common mistake: saying bile contains enzymes. Bile has none; it only emulsifies fat. Another mistake is treating digestion and absorption as the same thing: digestion is breakdown, absorption is movement into the blood.',
    q: 'If you chew a piece of bread slowly for two minutes it begins to taste sweet. What does this tell you about what is happening in your mouth?',
    exam: 'Food tests and results; the role of each enzyme and the organ that makes it; the role of bile and acid; adaptations of villi; sources and deficiency diseases.'
  }),
  stop('cbc_g10_gensci_s1_4', '1.4 Transport in Plants', {
    pt: 'Water and Food Movement in Plants',
    tag: 'Water is pulled up the xylem by evaporation from leaves, and sugars travel in the phloem',
    body: 'A plant is too big for substances to reach every cell by simple diffusion, so it has transport tissues. Xylem vessels are long, hollow tubes of dead cells strengthened with a woody substance called lignin; they carry water and dissolved mineral salts from the roots upward. Phloem tubes are living cells that carry sucrose and amino acids made in leaves to growing points and storage organs; this is called translocation. Water enters the root hairs by osmosis. Osmosis is the net movement of water molecules from a region of high water concentration (dilute solution) to a region of low water concentration (concentrated solution) through a partially permeable membrane. Root hair cell sap is more concentrated than soil water, so water moves in. Minerals enter by diffusion and active transport (movement against a concentration gradient using energy from respiration). Water then moves across the root into the xylem. In the leaf, water evaporates from the surface of the mesophyll cells and diffuses out of the stomata, small pores controlled by guard cells. This loss of water vapour is transpiration. As water leaves, it pulls more water up the xylem in an unbroken column, because water molecules stick together. This is the transpiration pull. Transpiration is faster in hot, dry, windy and bright conditions, and slower in cool, humid, still air. It cools the plant and brings minerals up, but too much loss makes a plant wilt. A potometer measures the rate of water uptake as a measure of transpiration.',
    formula: 'rate of uptake = distance moved by bubble (mm) / time (min)',
    badge: 'Stem cross-section showing xylem and phloem; potometer',
    ctx: 'Maize wilts in Machakos during a dry spell because water loss from the leaves exceeds uptake from dry soil. Farmers use mulch to reduce evaporation from the soil.',
    steps: [
      'Step 1: Water enters root hairs by osmosis. Reason: the sap inside is more concentrated than the soil water, so water moves in down its concentration gradient.',
      'Step 2: Water crosses the root and enters the xylem. Reason: xylem is a continuous system of hollow tubes that reaches the leaves.',
      'Step 3: Water evaporates from leaf cells and leaves through the stomata. Reason: this removes water at the top and creates the pull.',
      'Step 4: Cohesion pulls the water column upward. Reason: water molecules attract one another, so water behind follows water in front.',
      'Step 5: Sugars made in the leaves move in the phloem to roots, fruits and growing tips. Reason: those parts cannot photosynthesise enough, but need food.'
    ],
    ex: 'Question: In a potometer, an air bubble moves 36 mm in 12 minutes in still air. A fan is switched on and the bubble moves 60 mm in 12 minutes. Compare the rates. Working: still air rate = 36 / 12 = 3 mm per minute. With fan rate = 60 / 12 = 5 mm per minute. The increase = 5 - 3 = 2 mm per minute, which is 2/3 x 100 = 67 percent faster. Explanation: moving air carries water vapour away from the leaf surface, keeping the concentration gradient steep, so more water evaporates. Common mistake: saying that the plant "sucks" water with its roots, or that xylem carries sugars. Xylem carries water and minerals; phloem carries sugars.',
    q: 'If you cut a leafy stem and stand it in red-dyed water, where in the stem would you expect to see the red colour, and what does that tell you?',
    exam: 'Structure and function of xylem and phloem; osmosis in root hairs; factors affecting transpiration; potometer calculations; wilting.'
  }),
  stop('cbc_g10_gensci_s1_5', '1.5 Respiration', {
    pt: 'Releasing Energy from Food',
    tag: 'Respiration is the chemical release of energy from glucose in every living cell',
    body: 'Respiration is the chemical process in living cells that releases energy from food, usually glucose. It is not the same as breathing, which is the movement of air in and out of the lungs. The energy is stored in a molecule called ATP, which cells use for movement, building molecules, keeping warm and active transport. Aerobic respiration uses oxygen and takes place mostly in mitochondria. Glucose and oxygen are changed into carbon dioxide and water, releasing a large amount of energy. Anaerobic respiration happens without oxygen and releases much less energy because the glucose is only partly broken down. In animal muscles working very hard, glucose is changed to lactic acid; a build-up causes cramps and the extra oxygen needed to remove it later is the oxygen debt, which is why you keep breathing hard after a sprint. In yeast and some plant cells, anaerobic respiration produces ethanol and carbon dioxide, which is called fermentation. It is used to make bread rise, since the carbon dioxide bubbles make dough expand, and to brew beer and traditional drinks. Respiration can be shown experimentally: limewater turns milky with carbon dioxide, and a temperature rise in a flask of germinating seeds shows that heat is released. Gaseous exchange gets oxygen to cells and carbon dioxide away, but respiration happens inside the cells.',
    formula: 'glucose + oxygen -> carbon dioxide + water + energy;  glucose -> lactic acid + a little energy;  glucose -> ethanol + carbon dioxide + a little energy',
    badge: 'Comparison of aerobic and anaerobic pathways with energy yield',
    ctx: 'Marathon runners from Iten train at high altitude, where air has less oxygen, to improve how efficiently their muscles use oxygen. Mandazi dough rises because yeast respires and releases carbon dioxide.',
    steps: [
      'Step 1: Glucose from digested food reaches cells in the blood. Reason: glucose is the fuel; cells cannot use starch directly.',
      'Step 2: With oxygen present, glucose is fully broken down in mitochondria. Reason: oxygen allows the complete breakdown, which releases the most energy.',
      'Step 3: Carbon dioxide and water are produced as waste. Reason: all the carbon and hydrogen atoms in the glucose have to go somewhere; carbon dioxide leaves by the lungs.',
      'Step 4: If oxygen is short, muscle cells switch to anaerobic respiration. Reason: this gives quick but small amounts of energy when oxygen supply cannot keep up.',
      'Step 5: Lactic acid is later broken down using extra oxygen. Reason: this is the oxygen debt repaid after exercise.'
    ],
    ex: 'Question: Yeast is added to a sugar solution in a flask, with a delivery tube leading into limewater. Describe and explain what is seen after 30 minutes at 35 degrees Celsius. Working: bubbles of gas appear and the limewater turns milky. The gas is carbon dioxide, produced by anaerobic respiration (fermentation) of sugar by yeast. Ethanol is also produced, which is why the flask smells of alcohol. At 5 degrees Celsius the change is much slower because enzymes work slowly in the cold, and above about 60 degrees Celsius the yeast stops because its enzymes are destroyed. Common mistake: writing that respiration is breathing, or that plants respire only at night. Plants respire all the time; in daylight photosynthesis hides it.',
    q: 'After a hard sprint you are still breathing fast for a minute. If respiration happens in the cells, why does your chest keep working?',
    exam: 'Aerobic versus anaerobic respiration (word equations); oxygen debt; fermentation experiments; distinguishing respiration from breathing; uses of yeast.'
  }),
  stop('cbc_g10_gensci_s1_6', '1.6 Plant Growth and Development', {
    pt: 'From Seed to Plant',
    tag: 'A seed holds an embryo and a food store; water, oxygen and warmth wake it',
    body: 'A seed contains an embryo (a tiny plant with a young root called the radicle and a young shoot called the plumule) and a food store in the cotyledons or endosperm, all covered by a protective seed coat. Germination is the start of growth of the embryo into a seedling. It needs three conditions: water, which softens the seed coat and activates enzymes; oxygen, for aerobic respiration to release energy; and a suitable temperature, because enzymes work best in a warm range. Light is not needed for germination, but is needed afterwards for photosynthesis. During germination the stored starch is digested to sugar by enzymes, and the sugar is respired or used to build new cells. Because the seedling cannot photosynthesise until leaves open, the dry mass of the seed actually falls at first and only rises once leaves are making food. Some seeds are dormant, meaning they do not germinate even in good conditions until a period has passed, which prevents seedlings growing in an unsuitable season. Growth is a permanent increase in size, produced by cell division at growing points called meristems (at root and shoot tips) and then cell enlargement. Plants respond to light and gravity: shoots grow towards light (positive phototropism) and roots grow downward (positive gravitropism). These responses are controlled by plant hormones called auxins. Seeds are dispersed by wind, water, animals or explosion, so that offspring do not compete with the parent plant.',
    formula: 'percentage germination = (seeds germinated / seeds sown) x 100',
    badge: 'Longitudinal section of a bean seed; stages of germination',
    ctx: 'Farmers soak maize or bean seed overnight before planting in the long rains, and sow when soil is moist and warm, so that germination is uniform.',
    steps: [
      'Step 1: The seed absorbs water through the seed coat. Reason: water activates enzymes and swells the embryo.',
      'Step 2: Enzymes digest stored starch to sugar. Reason: the embryo can only use soluble sugar to respire and grow.',
      'Step 3: Respiration with oxygen releases energy. Reason: this energy drives cell division and growth.',
      'Step 4: The radicle emerges first, then the plumule. Reason: the root anchors the seedling and begins absorbing water before the shoot rises.',
      'Step 5: Leaves open and photosynthesis begins. Reason: the stored food is limited, so the seedling must start making its own.'
    ],
    ex: 'Question: A learner sows 50 bean seeds in each of four dishes. After 6 days the number germinated is: moist and warm 46, moist and cold (fridge) 4, dry and warm 0, moist with the seeds underwater 3. Calculate the percentage germination in the first dish and give conclusions. Working: 46 / 50 x 100 = 92 percent. Conclusions: dry and warm gave 0 percent so water is needed; the cold dish gave 4 / 50 x 100 = 8 percent so a suitable temperature is needed; the underwater dish gave 3 / 50 x 100 = 6 percent because dissolved oxygen is too low, so oxygen is needed. Common mistake: saying seeds need light or soil to germinate; they need neither.',
    q: 'A seed in dry storage can stay alive for years. What must change inside it before it starts to grow, and what supplies the energy?',
    exam: 'Conditions for germination and controlled experiments; parts of a seed; percentage germination; tropisms; seed dormancy and dispersal.'
  }),
  stop('cbc_g10_gensci_s1_7', '1.7 Microorganisms', {
    pt: 'Useful and Harmful Microbes',
    tag: 'Microorganisms are living things too small to see unaided; some feed us, some make us ill',
    body: 'Microorganisms (microbes) are organisms visible only under a microscope. The main groups are bacteria (single cells with no true nucleus), fungi (such as yeast and moulds), viruses (not cells at all, and able to reproduce only inside host cells), and protozoa (single-celled animal-like organisms such as Plasmodium, the malaria parasite, and Entamoeba, which causes amoebic dysentery). Many microbes are useful. Yeast ferments sugar to make bread rise and to brew. Lactobacillus bacteria turn milk sugar into lactic acid, making yoghurt and mala (fermented milk), and the acid keeps the milk from spoiling. Bacteria and fungi decomposers break down dead material and recycle nutrients to the soil. Other microbes cause disease and are called pathogens. Cholera and typhoid (bacteria) are spread by contaminated water and food. Influenza, HIV and measles are caused by viruses. Malaria is carried by female Anopheles mosquitoes, which are called vectors. Antibiotics kill bacteria but do not work against viruses; misuse allows resistant bacteria to survive and multiply. Microbes grow fastest in warm, moist places with food, so food is preserved by lowering temperature (refrigeration), removing water (drying, salting), adding acid (pickling), or heating (pasteurisation, which heats milk to about 72 degrees Celsius for 15 seconds). Hygiene such as hand washing, boiling or treating drinking water, and vaccination prevents spread. A vaccine contains a weakened or dead form of a pathogen, which trains the immune system to recognise it without causing illness.',
    formula: 'bacterial numbers double each generation: N = starting number x 2^(number of divisions)',
    badge: 'Bacterium, yeast cell and virus drawn to different scales',
    ctx: 'Boiling or chlorinating water prevents cholera outbreaks in informal settlements. Sleeping under treated mosquito nets breaks the malaria cycle by keeping vectors away from people.',
    steps: [
      'Step 1: Identify the type of microbe, since this decides the treatment. Reason: antibiotics act on bacteria, not on viruses.',
      'Step 2: Trace how the pathogen travels (water, food, air, vector, contact). Reason: control measures work by cutting that route.',
      'Step 3: Apply the matching control (treat water, wash hands, vaccinate, use nets). Reason: breaking one link in the chain stops transmission.',
      'Step 4: For food, remove one of the things the microbe needs: warmth, moisture or food, or add acid. Reason: without these, bacteria cannot multiply.'
    ],
    ex: 'Question: One bacterium divides every 20 minutes under ideal conditions. How many bacteria are there after 3 hours, and why does refrigerating milk help? Working: 3 hours = 180 minutes, so 180 / 20 = 9 divisions. Number = 1 x 2^9 = 512. Cold slows the enzymes of bacteria, so divisions are much less frequent and the milk stays safe for longer. Common mistake: saying that cooling kills bacteria. Refrigeration slows their growth; it does not kill them. Another mistake is taking antibiotics for a cold, which is caused by a virus.',
    q: 'Why does a bottle of milk left on the table turn sour in a day, yet the same milk in a fridge lasts several days?',
    exam: 'Groups of microorganisms with examples; useful and harmful roles; disease transmission and control; food preservation methods; antibiotics versus vaccines.'
  })
];

const S2 = [
  stop('cbc_g10_gensci_s2_1', '2.1 The Periodic Table', {
    pt: 'Reading the Periodic Table',
    tag: 'An element\'s place in the table follows from its electrons, and its place predicts how it behaves',
    body: 'All matter is made of atoms. An atom has a nucleus containing protons (positive charge) and neutrons (no charge), with electrons (negative charge) moving around it in energy levels called shells. The atomic number is the number of protons, and it identifies the element. In a neutral atom the number of electrons equals the number of protons. The mass number is protons plus neutrons. Electrons fill shells from the inside: the first shell holds up to 2, the second up to 8, and the third is treated as holding up to 8 for the first 20 elements. This arrangement is written like 2.8.1 for sodium. The outermost shell is the valence shell, and the electrons in it decide how an element reacts. The Periodic Table arranges elements by increasing atomic number. A horizontal row is a period, and the period number equals the number of occupied shells. A vertical column is a group, and for Groups 1 to 7 the group number equals the number of outer electrons; Group 0 (or 8) elements have full shells. Elements in a group have similar properties because they have the same number of outer electrons. Across a period, elements change from metals on the left to non-metals on the right. Metals tend to lose outer electrons to form positive ions; non-metals tend to gain electrons to form negative ions. The table lets us predict properties and also formulas.',
    formula: 'protons = atomic number;  neutrons = mass number - atomic number;  period = number of shells;  group = outer electrons',
    badge: 'Periodic table with periods, groups and metal/non-metal divide shaded',
    ctx: 'Kenya mines soda ash at Lake Magadi (sodium compounds) and fluorspar at Kerio Valley. Knowing the group lets chemists predict how such elements behave without testing each one.',
    steps: [
      'Step 1: Find the atomic number, which equals the number of protons and, in a neutral atom, of electrons. Reason: it is the element\'s identity.',
      'Step 2: Fill electron shells in the order 2, 8, 8. Reason: each shell can hold only a limited number of electrons and inner shells fill first.',
      'Step 3: Count the occupied shells to get the period, and the outer electrons to get the group. Reason: that is how the table is built.',
      'Step 4: Use the group to predict behaviour: one to three outer electrons suggests a metal that loses them; five to seven suggests a non-metal that gains them. Reason: atoms react to reach a full outer shell.'
    ],
    ex: 'Question: An atom has atomic number 19 and mass number 39. Find its protons, neutrons, electron arrangement, group and period, and predict the ion it forms. Working: protons = 19. Neutrons = 39 - 19 = 20. Electrons = 19 in a neutral atom, arranged 2.8.8.1. There are 4 shells, so period 4. One outer electron, so Group 1. The element is potassium. It loses the one outer electron to leave a full shell, forming K+ with 18 electrons and 19 protons, a net charge of +1. Common mistake: counting the mass number as the number of electrons, or saying the group number is the number of shells.',
    q: 'Lithium, sodium and potassium all react vigorously with water. What do their atoms have in common that would explain this?',
    exam: 'Protons, neutrons and electrons from atomic and mass numbers; electron arrangement of the first 20 elements; group and period from arrangement; metals and non-metals; ion charges.'
  }),
  stop('cbc_g10_gensci_s2_2', '2.2 Chemical Families', {
    pt: 'Alkali Metals, Halogens and Noble Gases',
    tag: 'Elements in one group react alike, with trends that grow steadily down the group',
    body: 'A chemical family is a group of elements with similar properties because they have the same number of outer electrons. Group 1, the alkali metals (lithium, sodium, potassium), have one outer electron. They are soft metals, kept under oil, that react with water to give an alkaline solution of the metal hydroxide and hydrogen gas. Reactivity increases down the group because the outer electron is further from the nucleus in each larger atom, so it is held less strongly and lost more easily. Lithium fizzes, sodium melts into a ball and darts about, and potassium burns with a lilac flame. Group 7, the halogens (fluorine, chlorine, bromine, iodine), have seven outer electrons and need one more to fill the shell. They exist as molecules of two atoms (Cl2). Going down the group they change from a pale green gas (chlorine), to a red-brown liquid (bromine), to a grey-black solid (iodine). Reactivity decreases down the group, because a smaller atom attracts the incoming electron more strongly. A more reactive halogen displaces a less reactive one from its salt solution: chlorine will displace bromine from potassium bromide. Group 0, the noble gases (helium, neon, argon), have full outer shells and are almost completely unreactive. They are used where inertness is needed: helium in balloons, argon in light bulbs to protect the filament, neon in signs.',
    formula: '2Na + 2H2O -> 2NaOH + H2;   Cl2 + 2KBr -> 2KCl + Br2',
    badge: 'Group 1, 7 and 0 columns with trend arrows',
    ctx: 'Sodium chloride from salt pans at Magadi and the coast is a compound of an alkali metal and a halogen. Chlorine is used to disinfect swimming pools and municipal water.',
    steps: [
      'Step 1: Identify the group from the number of outer electrons. Reason: this fixes the family and the type of reaction.',
      'Step 2: Predict what the atom does with outer electrons: Group 1 loses one, Group 7 gains one, Group 0 does nothing. Reason: atoms seek a full outer shell.',
      'Step 3: Apply the trend: reactivity rises down Group 1 and falls down Group 7. Reason: the pull of the nucleus on the outer electron weakens as shells are added.',
      'Step 4: Write the balanced equation and, if needed, work in moles. Reason: the equation gives the exact ratio of reactants and products.'
    ],
    ex: 'Question: 2.3 g of sodium (relative atomic mass 23) reacts completely with water. What volume of hydrogen forms at room temperature, where 1 mole of gas occupies 24 dm^3? Working: moles of Na = 2.3 / 23 = 0.10 mol. The equation 2Na + 2H2O -> 2NaOH + H2 gives 2 mol Na for 1 mol H2, so moles of H2 = 0.05 mol. Volume = 0.05 x 24 = 1.2 dm^3 (1200 cm^3). The solution turns red litmus blue and pH about 14 because NaOH is an alkali. Common mistake: using the ratio 1 : 1 and getting 2.4 dm^3. Another mistake is saying that reactivity of halogens increases down the group.',
    q: 'If chlorine is bubbled into a solution of potassium iodide and the solution turns brown, which halogen was released and why could chlorine do this?',
    exam: 'Properties and trends of Groups 1, 7 and 0; reactions of alkali metals with water; displacement reactions of halogens; uses of noble gases; mole calculations from simple equations.'
  }),
  stop('cbc_g10_gensci_s2_3', '2.3 Chemical Bonding', {
    pt: 'How Atoms Join',
    tag: 'Atoms bond by giving, taking or sharing electrons to reach a full outer shell',
    body: 'A chemical bond is the attraction that holds atoms together in a substance. Atoms form bonds to reach the stable arrangement of a full outer shell, like a noble gas. In ionic bonding a metal atom transfers its outer electrons to a non-metal atom. The metal becomes a positive ion and the non-metal a negative ion, and the opposite charges attract strongly. Sodium (2.8.1) gives one electron to chlorine (2.8.7), forming Na+ and Cl-, which pack into a regular lattice. Ionic compounds have high melting points, are brittle, and conduct electricity only when molten or dissolved, because then the ions are free to move. In covalent bonding two non-metal atoms share pairs of electrons. Each shared pair is one bond. In water, oxygen shares one pair with each of two hydrogen atoms. Simple covalent substances exist as small molecules, with weak forces between molecules, so they have low melting and boiling points and do not conduct electricity. Some covalent substances, such as diamond, form giant structures with very high melting points. In metallic bonding, metal atoms release their outer electrons into a shared sea that moves freely among the positive ions. This explains why metals conduct electricity and heat, and why they can be bent and hammered without breaking, since layers of ions slide while the electron sea holds them together. To write the formula of an ionic compound, balance the charges so the total is zero.',
    formula: 'ionic: metal + non-metal (electron transfer);  covalent: non-metal + non-metal (sharing);  formula: total + charge = total - charge',
    badge: 'Dot-and-cross diagrams of NaCl, H2O and a metallic lattice',
    ctx: 'Aluminium cooking pots (Kenya has a large aluminium sufuria industry) work because metallic bonding conducts heat well and lets the metal be shaped. Common salt dissolves in water to give a solution that conducts, as ions are free.',
    steps: [
      'Step 1: Decide whether each atom is a metal or non-metal. Reason: metal with non-metal gives ionic, two non-metals give covalent, metal alone gives metallic.',
      'Step 2: Work out how many electrons each atom must lose, gain or share to complete its outer shell. Reason: the stable full shell is the goal.',
      'Step 3: Write the ion charges or the number of shared pairs. Reason: they decide the formula.',
      'Step 4: Balance the charges to find the ratio of ions. Reason: a compound has no overall charge.',
      'Step 5: Link structure to properties (melting point, conduction, solubility). Reason: the type of bond explains the behaviour.'
    ],
    ex: 'Question: Write the formula of aluminium oxide and calculate its relative formula mass (Al = 27, O = 16). Explain why it conducts only when molten. Working: aluminium (2.8.3) loses 3 electrons to form Al3+; oxygen (2.6) gains 2 to form O2-. To balance, find the lowest common multiple of 3 and 2, which is 6: two Al3+ give +6 and three O2- give -6. Formula Al2O3. Relative formula mass = (2 x 27) + (3 x 16) = 54 + 48 = 102. In the solid the ions are held in fixed positions, but when molten they are free to move and carry charge. Common mistake: swapping charges and writing AlO instead of Al2O3, or saying that electrons move through molten salt to carry current. It is ions that carry current.',
    q: 'Why can a copper wire carry electricity in the solid state while solid salt cannot?',
    exam: 'Dot-and-cross diagrams; writing formulae from ion charges; comparing properties of ionic, covalent and metallic substances; explaining conductivity by structure; calculating relative formula mass.'
  }),
  stop('cbc_g10_gensci_s2_4', '2.4 Acids, Bases and Salts', {
    pt: 'Acids, Alkalis and the Salts They Make',
    tag: 'Acids give hydrogen ions, alkalis give hydroxide ions, and they cancel to make a salt and water',
    body: 'An acid is a substance that produces hydrogen ions (H+) when dissolved in water. It tastes sour (never taste in the laboratory), turns blue litmus red and has a pH below 7. Common examples are hydrochloric acid, sulfuric acid, ethanoic acid (in vinegar) and citric acid (in lemons). A base is a substance that reacts with an acid to form a salt and water. A base that dissolves in water is called an alkali; it produces hydroxide ions (OH-), feels soapy, turns red litmus blue and has a pH above 7. Sodium hydroxide and ammonia solution are alkalis. The pH scale runs from 0 to 14: below 7 is acidic, 7 is neutral (pure water), above 7 is alkaline. Universal indicator changes colour across the scale: red for strong acids, green for neutral, purple for strong alkalis. A strong acid is fully split into ions in water; a weak acid is only partly split. Neutralisation is the reaction of an acid with a base: acid + base -> salt + water. A salt is a compound formed when the hydrogen of an acid is replaced by a metal or by ammonium. Acids also react with metals to give a salt and hydrogen, and with carbonates to give a salt, water and carbon dioxide. Salts that dissolve are made by reacting an acid with excess metal, base or carbonate, filtering off the unreacted excess, and evaporating the filtrate to crystallise. Insoluble salts are made by precipitation, mixing two solutions and filtering the solid formed. Names of salts come from the acid: hydrochloric gives chlorides, sulfuric gives sulfates, nitric gives nitrates.',
    formula: 'acid + base -> salt + water;  acid + metal -> salt + H2;  acid + carbonate -> salt + water + CO2',
    badge: 'pH scale with colours and everyday substances',
    ctx: 'Farmers add agricultural lime (calcium carbonate or oxide) to acidic soils in the tea-growing highlands of Kericho and Nandi to neutralise acidity. Antacid tablets neutralise excess stomach acid, and toothpaste is slightly alkaline to neutralise acids from bacteria.',
    steps: [
      'Step 1: Test the solution with indicator or pH paper to classify it as acid, neutral or alkali. Reason: the reaction depends on which it is.',
      'Step 2: Identify the reactant pair: acid with metal, base or carbonate. Reason: each pair gives a different set of products.',
      'Step 3: Name the salt from the metal or base and the acid used. Reason: the first part of the name comes from the base, the second from the acid.',
      'Step 4: Add the solid in excess, then filter. Reason: excess guarantees all the acid has reacted, and filtering removes the unreacted solid.',
      'Step 5: Heat the filtrate to saturation, then cool to crystallise. Reason: evaporating water leaves the dissolved salt behind as crystals.'
    ],
    ex: 'Question: Write the equation for magnesium carbonate reacting with dilute hydrochloric acid, and find the volume of carbon dioxide from 8.4 g of magnesium carbonate at room temperature (Mg = 24, C = 12, O = 16; 1 mol gas = 24 dm^3). Working: MgCO3 + 2HCl -> MgCl2 + H2O + CO2. Relative formula mass of MgCO3 = 24 + 12 + 48 = 84. Moles = 8.4 / 84 = 0.10 mol. One mole of carbonate gives one mole of CO2, so 0.10 mol CO2. Volume = 0.10 x 24 = 2.4 dm^3. The gas turns limewater milky. Common mistake: saying the pH of a neutral solution is 0 or 14; neutral is 7. Another mistake is writing that neutralisation makes only a salt, forgetting the water.',
    q: 'A bee sting is acidic and a wasp sting is alkaline. What kind of household substance would you use for each, and why?',
    exam: 'pH scale and indicators; strong versus weak acids; neutralisation equations; naming salts; preparing a soluble salt and an insoluble salt; simple mole calculations.'
  }),
  stop('cbc_g10_gensci_s2_5', '2.5 Rates of Reactions', {
    pt: 'How Fast Reactions Go',
    tag: 'A reaction speeds up when particles collide more often and with more energy',
    body: 'The rate of a reaction is how fast reactants are used up or products are formed. It is measured as change in amount divided by time, for example cm^3 of gas per second or grams of product per minute. Collision theory explains rate: for a reaction to happen, particles must collide, and they must collide with enough energy (the activation energy). Anything that increases the number of successful collisions per second raises the rate. Higher concentration (or pressure for gases) packs more particles into the same volume, so collisions are more frequent. A higher temperature gives particles more kinetic energy, so they move faster, collide more often, and a larger fraction have enough energy to react; this is the biggest effect. A larger surface area, found by crushing a solid into powder, exposes more particles to the other reactant at once, so more collisions happen. A catalyst provides an alternative route with lower activation energy; it is not used up and does not change the amount of product. Enzymes are biological catalysts. To measure a rate, you can collect gas in a syringe, track loss in mass on a balance, or time how long a cloudy mixture takes to hide a cross drawn under the flask. A graph of product against time starts steep and flattens as the reactants are used, and the reaction is finished when the line becomes level. The steeper the graph, the faster the reaction. Importantly, changing the rate does not change the final amount of product, unless the quantity of reactants is changed.',
    formula: 'rate = amount of product formed / time taken (e.g. cm^3 per second)',
    badge: 'Particle collision diagram and gas-volume against time curves',
    ctx: 'Food keeps longer in a refrigerator because the lower temperature slows the reactions of bacteria and decay. Cooking in a pressure cooker (jiko-friendly in many Kenyan homes) speeds cooking of beans because the higher temperature makes reactions faster.',
    steps: [
      'Step 1: Decide what to measure (gas volume, mass lost, time for a change). Reason: a rate needs a quantity and a time.',
      'Step 2: Change one factor only, such as temperature, and keep the rest constant. Reason: otherwise you cannot say which factor changed the rate.',
      'Step 3: Record the measurement at regular times and plot a graph. Reason: the slope of the line shows the rate at each moment.',
      'Step 4: Explain with collision theory: more frequent and more energetic collisions. Reason: this links observation to particle behaviour.'
    ],
    ex: 'Question: Marble chips react with dilute hydrochloric acid. At 20 degrees Celsius, 30 cm^3 of carbon dioxide is collected in the first 60 seconds. At 40 degrees Celsius the same volume is collected in 30 seconds. Find each rate and explain. Working: rate at 20 degrees = 30 / 60 = 0.5 cm^3 per second. Rate at 40 degrees = 30 / 30 = 1.0 cm^3 per second, which is twice as fast. At the higher temperature, particles move faster and more of them have at least the activation energy, so more collisions are successful each second. The total volume of gas from the same mass of marble stays the same, as the amount of reactant has not changed. Common mistake: saying that particles collide harder only, ignoring frequency, or saying that a catalyst is used up. Another mistake is saying that a catalyst increases the yield.',
    q: 'Why does a heap of firewood take a long time to burn, yet the same wood chopped into thin splinters catches fire almost at once?',
    exam: 'Explaining factors affecting rate using collision theory; calculating rate from data; interpreting rate graphs; role of catalysts and enzymes; designing a fair test for rate.'
  })
];

const S3 = [
  stop('cbc_g10_gensci_s3_1', '3.1 Turning Effect of Force', {
    pt: 'Moments and Balance',
    tag: 'A force turns an object about a pivot, and the turning effect grows with both force and distance',
    body: 'A force can push, pull, change speed or change shape, and it can also turn an object about a fixed point called the pivot (or fulcrum). The turning effect is called the moment of the force. It depends on two things: the size of the force and the perpendicular distance from the pivot to the line along which the force acts. Moment = force x perpendicular distance, measured in newton metres (N m). That is why a door is hard to open when you push near the hinge and easy when you push at the handle, and why a long spanner loosens a tight nut more easily than a short one. Moments turn either clockwise or anticlockwise. The principle of moments states that when an object is balanced (in equilibrium), the sum of the clockwise moments about any pivot equals the sum of the anticlockwise moments. A see-saw, a beam balance, a wheelbarrow, scissors and a crowbar all work by this principle; they are levers. The centre of gravity of an object is the point where its whole weight appears to act. An object is stable when its centre of gravity is low and above a wide base, which is why a lorry carrying heavy goods low down is less likely to tip than a tall, top-heavy one. If the line of action of the weight falls outside the base, the object topples.',
    formula: 'moment (N m) = force (N) x perpendicular distance (m);  clockwise moments = anticlockwise moments',
    badge: 'See-saw with forces and distances marked from the pivot',
    ctx: 'A wheelbarrow used on a farm in Nakuru lets one person lift a heavy load because the load is close to the wheel (pivot) and the handles are far away, giving a large distance for a small effort force.',
    steps: [
      'Step 1: Mark the pivot on a diagram. Reason: moments are always taken about a chosen point.',
      'Step 2: For each force, measure the perpendicular distance from the pivot to its line of action. Reason: only the perpendicular distance counts; a force along the line through the pivot has no turning effect.',
      'Step 3: Multiply force by distance for each force, and sort into clockwise and anticlockwise. Reason: the two directions oppose each other.',
      'Step 4: For balance, set the totals equal and solve. Reason: that is the principle of moments.'
    ],
    ex: 'Question: A uniform see-saw is pivoted at its centre. A child weighing 300 N sits 2.0 m from the pivot. Where must a 400 N child sit on the other side to balance it? Working: anticlockwise moment = 300 x 2.0 = 600 N m. Let the distance of the 400 N child be d. Clockwise moment = 400 x d. For balance 400 x d = 600, so d = 600 / 400 = 1.5 m. The heavier child sits closer to the pivot. Common mistake: using the length of the beam instead of the distance from the pivot, or writing the unit as N/m instead of N m.',
    q: 'Why is it easier to cut a thick branch with long-handled pruning shears than with short ones?',
    exam: 'Calculating moments; applying the principle of moments to beams and levers; classifying levers; centre of gravity and stability.'
  }),
  stop('cbc_g10_gensci_s3_2', '3.2 Linear Motion', {
    pt: 'Describing Motion in a Straight Line',
    tag: 'Speed, velocity and acceleration describe how position and speed change with time',
    body: 'Linear motion is motion along a straight line. Distance is the total length of path travelled and is a scalar, meaning it has size only. Displacement is the straight-line distance from the start in a stated direction, a vector, which has size and direction. Speed is the distance travelled per unit time, measured in metres per second (m/s) or kilometres per hour (km/h). Velocity is speed in a given direction. Average speed is total distance divided by total time. Acceleration is the rate of change of velocity, measured in m/s^2; if an object speeds up by 2 m/s every second its acceleration is 2 m/s^2. Slowing down is a negative acceleration, also called deceleration. For uniform acceleration, v = u + at, where u is the starting (initial) velocity, v the final velocity, a the acceleration and t the time. A distance-time graph shows position against time: a flat line means the object is at rest, a straight sloping line means constant speed, and a steeper line means a faster speed; the gradient equals the speed. On a velocity-time graph the gradient equals the acceleration and the area under the line equals the distance travelled. Free fall near the Earth, ignoring air resistance, has acceleration about 10 m/s^2 downward.',
    formula: 'speed = distance / time;  a = (v - u) / t;  v = u + at;  distance = area under v-t graph',
    badge: 'Distance-time and velocity-time graphs for a journey',
    ctx: 'Matatu drivers on the Nairobi-Mombasa highway are legally limited to a maximum speed; the speed governor keeps the vehicle below that limit. The Standard Gauge Railway train accelerates smoothly from rest, then travels at near constant speed.',
    steps: [
      'Step 1: Write down the known quantities with units, and convert to metres and seconds if needed. Reason: mixed units give wrong answers.',
      'Step 2: Choose the formula that links the known quantities to the unknown. Reason: each formula relates a specific set of variables.',
      'Step 3: Substitute and calculate, paying attention to signs. Reason: slowing down gives a negative acceleration.',
      'Step 4: For a graph, find the gradient for speed or acceleration, and the area for distance. Reason: these are the meanings of slope and area.'
    ],
    ex: 'Question: A train accelerates uniformly from rest to 20 m/s in 8 s, then moves at constant speed for 10 s. Find the acceleration and total distance. Working: a = (20 - 0) / 8 = 2.5 m/s^2. Distance while accelerating = area of the triangle on the v-t graph = 1/2 x 8 x 20 = 80 m. Distance at constant speed = 20 x 10 = 200 m. Total distance = 80 + 200 = 280 m. Total time = 18 s, so average speed = 280 / 18 = 15.6 m/s (to 3 s.f.). Common mistake: using the final speed times the full time for the accelerating part, which would give 160 m instead of 80 m. Another mistake is confusing a horizontal line on a distance-time graph (at rest) with a horizontal line on a velocity-time graph (constant speed).',
    q: 'A car\'s speedometer reads 60 km/h at one moment and 80 km/h ten seconds later. What can you say about its acceleration, and what extra information would you need to find the distance covered?',
    exam: 'Speed, velocity and acceleration calculations; v = u + at; reading distance-time and velocity-time graphs; distinguishing scalar and vector quantities; unit conversion between km/h and m/s.'
  }),
  stop('cbc_g10_gensci_s3_3', '3.3 Waves', {
    pt: 'Waves Carry Energy, Not Matter',
    tag: 'A wave is a repeating disturbance that transfers energy; speed equals frequency times wavelength',
    body: 'A wave is a disturbance that transfers energy from one place to another without moving the material permanently along with it. In a transverse wave the particles vibrate at right angles to the direction the wave travels; examples are light, other electromagnetic waves and ripples on water. In a longitudinal wave the particles vibrate along the direction of travel, forming regions of compression and rarefaction; sound is the main example, and it needs a material medium and cannot travel through a vacuum. Light and other electromagnetic waves can travel through a vacuum. Key terms: the amplitude is the maximum displacement from the rest position and relates to the energy, which is loudness for sound and brightness for light; the wavelength (symbol lambda) is the distance between two matching points, for example crest to crest, in metres; the frequency is the number of complete waves per second, in hertz (Hz); the period is the time for one wave, T = 1 / f. The wave speed is v = f x wavelength. Waves show reflection (bouncing off a surface, with angle of incidence equal to angle of reflection), refraction (change of direction when the speed changes in a new medium) and diffraction (spreading around an obstacle or through a gap). In sound, the pitch rises with frequency, and loudness rises with amplitude. Humans hear about 20 Hz to 20 000 Hz. Echoes are reflected sound and are used in ultrasound scans and in fishing sonar on Lake Victoria.',
    formula: 'v = f x wavelength;  T = 1 / f;  distance = speed x time',
    badge: 'Transverse wave with amplitude and wavelength labelled; longitudinal wave',
    ctx: 'Ultrasound scans at maternity clinics use high-frequency sound reflected from the baby. Radio stations such as Radio Maisha broadcast using electromagnetic waves, and mobile phone masts use microwaves.',
    steps: [
      'Step 1: Identify the type of wave by the direction of vibration relative to travel. Reason: it decides whether it can travel through a vacuum and what it looks like.',
      'Step 2: Read amplitude, wavelength and frequency from the diagram or data. Reason: these define the wave.',
      'Step 3: Use v = f x wavelength, with all quantities in SI units. Reason: the equation holds only if units match.',
      'Step 4: For echoes, remember the sound travels to the surface and back. Reason: the distance covered is twice the distance to the reflecting surface.'
    ],
    ex: 'Question: A sound wave of frequency 500 Hz travels in air at 340 m/s. Find its wavelength and period. A learner shouts and hears an echo from a cliff after 1.0 s. How far away is the cliff? Working: wavelength = v / f = 340 / 500 = 0.68 m. Period T = 1 / 500 = 0.002 s. Echo: distance travelled = 340 x 1.0 = 340 m, but this is there and back, so the cliff is 340 / 2 = 170 m away. Common mistake: giving 340 m as the distance to the cliff. Another mistake is saying that sound can travel in a vacuum, or that a louder sound travels faster; loudness depends on amplitude and does not change the speed.',
    q: 'During a thunderstorm you see lightning and hear thunder several seconds later. What does that delay tell you about the speed of light compared with sound?',
    exam: 'Transverse versus longitudinal waves; v = f x wavelength; period and frequency; amplitude and loudness; reflection, refraction and diffraction; echo calculations.'
  }),
  stop('cbc_g10_gensci_s3_4', '3.4 Magnetism and Electromagnetic Induction', {
    pt: 'Magnets, Fields and Generating Electricity',
    tag: 'Moving a magnet near a coil, or a coil near a magnet, pushes an electric current through the wire',
    body: 'A magnet attracts magnetic materials such as iron, steel, cobalt and nickel. Every magnet has two poles, north and south. Like poles repel and unlike poles attract. The space around a magnet where its force acts is the magnetic field, drawn as lines running from the north pole to the south pole outside the magnet; where the lines are closest the field is strongest. A permanent magnet keeps its magnetism, while a temporary magnet such as soft iron loses it when the magnetising source is removed. An electric current in a wire also produces a magnetic field. Coiling the wire into a solenoid, and adding a soft iron core, gives an electromagnet, which can be switched on and off and made stronger with more turns or more current. Electromagnets are used in electric bells, cranes in scrapyards and relays. Electromagnetic induction is the production of a voltage (an e.m.f.) in a conductor when the magnetic field through it changes. This happens when a magnet moves into or out of a coil, or when a wire cuts across field lines. A stronger magnet, more turns of wire and faster motion all raise the induced voltage. If the movement stops, the voltage falls to zero. A generator (dynamo) spins a coil in a magnetic field and produces alternating current. A transformer uses induction to change an alternating voltage: the primary coil carries alternating current that makes a changing field in an iron core, which induces a voltage in the secondary coil. Transformers work only with alternating current.',
    formula: 'transformer: Vp / Vs = Np / Ns;  ideal transformer: Vp x Ip = Vs x Is',
    badge: 'Bar magnet field lines; coil with magnet and galvanometer; transformer',
    ctx: 'Electricity from Olkaria geothermal plants and from Kenya\'s hydro stations is generated by spinning coils in magnetic fields. Step-up transformers raise the voltage for the national grid, and step-down transformers lower it to 240 V before it enters homes.',
    steps: [
      'Step 1: Identify what is changing: the magnet, the coil or the current. Reason: induction needs a changing magnetic field through the coil.',
      'Step 2: Predict the voltage: moving faster, a stronger magnet or more turns gives a larger voltage. Reason: induced voltage depends on how quickly field lines are cut.',
      'Step 3: For a transformer, compare the number of turns on each coil. Reason: the voltage ratio equals the turns ratio.',
      'Step 4: Use power conservation for an ideal transformer, voltage times current in equals voltage times current out. Reason: a transformer cannot create energy, so if voltage steps up, current steps down.'
    ],
    ex: 'Question: A transformer has 1200 turns on the primary coil and 120 turns on the secondary. The primary is connected to 240 V a.c. The secondary current is 2.0 A. Find the secondary voltage and the primary current (assume ideal). Working: Vs = Vp x Ns / Np = 240 x 120 / 1200 = 24 V, so it is a step-down transformer. Power out = 24 x 2.0 = 48 W. For an ideal transformer, power in is 48 W, so Ip = 48 / 240 = 0.20 A. Common mistake: connecting a transformer to a battery (direct current) and expecting an output. A steady current gives a steady field, no change in field, and so no induced voltage.',
    q: 'If you push a magnet into a coil connected to a sensitive meter, the needle jumps; if you hold the magnet still inside the coil, it returns to zero. What does that tell you about what causes the current?',
    exam: 'Poles, field lines and magnetic materials; making and strengthening electromagnets; factors affecting induced e.m.f.; generator and transformer principles; transformer calculations.'
  })
];

function station(n, title, strandName, icon, summary, subs) {
  return { id: 'cbc_g10_gensci_s' + n, number: n, title, strand: 'Strand ' + title.split(' ')[0] + ': ' + strandName, icon, status: 'available', summary, subtopics: subs };
}

const GENSCI_G10_MAP = {
  curriculum: 'CBC',
  grade: 10,
  subject: 'General Science',
  code: 'GSC-G10',
  trackPathway: 'STEM',
  title: 'CBE Grade 10 (Senior STEM) General Science Metro Line',
  description: 'Strands follow the KICD Grade 10 General Science design.',
  stations: [
    station(1, '1.0 Life Science', 'Life Science', 'BIO', 'Scientific method, cells, nutrition, transport, respiration, plant growth and microorganisms.', S1),
    station(2, '2.0 Matter and Chemical Reactions', 'Matter and Chemical Reactions', 'CHEM', 'The periodic table, chemical families, bonding, acids, bases and salts, and rates of reaction.', S2),
    station(3, '3.0 Natural Physical Science', 'Natural Physical Science', 'PHY', 'Moments, linear motion, waves, magnetism and electromagnetic induction.', S3)
  ]
};

module.exports = { maps: [GENSCI_G10_MAP], retiredIds: [] };
