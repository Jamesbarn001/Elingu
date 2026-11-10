// CBC Senior School General Science, Grade 11 (KICD design, October 2025).
// Strands and sub-strands follow the KICD summary table (docs/audits/kicd_verified_from_site.md).

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

const S1 = [];
const S2 = [];
const S3 = [];

S1.push(stop(
  'cbc_g11_gensci_s1_1',
  '1.1 Transport in Animals',
  'How Blood Carries Materials Around the Body',
  'The heart pumps blood through closed vessels so that every cell receives oxygen and food and loses wastes',
  'A cell deep inside the body cannot get oxygen or glucose by diffusion alone, because diffusion is only fast over very short distances. Large animals therefore have a transport system. In humans it is a closed circulatory system: the blood stays inside tubes called blood vessels and is pushed round by the heart, a muscular pump. There are three kinds of vessel. Arteries carry blood away from the heart at high pressure; they have thick, elastic walls. Veins carry blood back to the heart at low pressure; they have thinner walls and valves that stop backflow. Capillaries are tiny vessels with walls one cell thick, linking arteries to veins; exchange of oxygen, glucose, carbon dioxide and wastes between blood and cells happens here. The heart has four chambers: two thin-walled atria receive blood and two thick-walled ventricles pump it out. The circulation is double: the right side pumps blood to the lungs (pulmonary circulation) to pick up oxygen, and the left side pumps oxygen-rich blood to the whole body (systemic circulation). The left ventricle wall is thickest because it must push blood the farthest. Blood itself is a tissue: plasma (a watery liquid carrying dissolved food, carbon dioxide, hormones and urea), red blood cells (contain haemoglobin, which carries oxygen; no nucleus, so more room for haemoglobin), white blood cells (destroy germs) and platelets (help clots form when a vessel is cut).',
  'Pulse rate = number of beats / time in minutes',
  'Path of blood: body -> right atrium -> right ventricle -> lungs -> left atrium -> left ventricle -> body',
  'A doctor at a Kenyan health centre counts your pulse at the wrist to find your heart rate; blood donation drives in schools use blood groups and the fact that red cells carry oxygen to save accident victims.',
  'If you cut your finger the blood flows slowly and steadily, but a cut artery sprays in pulses. What difference between the two vessels explains this?',
  'Assessment focus: naming and describing the heart chambers and vessels, tracing the path of blood, linking structure to function, and the roles of blood components.',
  [
    'Step 1: Blood leaves the left ventricle through the aorta, the main artery. Reason: the left ventricle has thick muscle to give the high pressure needed to reach the whole body.',
    'Step 2: Arteries branch into capillaries in the tissues. Reason: capillary walls are one cell thick, so oxygen and glucose pass out and carbon dioxide passes in over a very short distance.',
    'Step 3: Capillaries join to form veins, which return blood to the right atrium. Reason: veins have valves to stop blood flowing backwards at low pressure.',
    'Step 4: The right ventricle pumps blood to the lungs. Reason: in the lungs the blood loses carbon dioxide and takes up oxygen.',
    'Step 5: Oxygen-rich blood returns to the left atrium and the cycle repeats. Reason: this double circulation keeps oxygen-rich and oxygen-poor blood separate, so tissues get blood with the most oxygen.'
  ],
  'Question: A student counts 18 pulse beats in 15 seconds at rest. What is the heart rate in beats per minute, and how much blood is pumped per minute if each beat pumps 70 cm^3? Working: there are 60 / 15 = 4 lots of 15 seconds in a minute, so rate = 18 x 4 = 72 beats per minute. Blood pumped = 72 x 70 = 5040 cm^3 = 5.04 dm^3 per minute. Common mistake: saying arteries always carry oxygen-rich blood. The pulmonary artery carries oxygen-poor blood to the lungs, and the pulmonary vein carries oxygen-rich blood back. Arteries and veins are named by direction relative to the heart, not by oxygen content.'
));

S1.push(stop(
  'cbc_g11_gensci_s1_2',
  '1.2 Gaseous Exchange',
  'Getting Oxygen In and Carbon Dioxide Out',
  'Gases cross the thin, moist, richly supplied walls of the alveoli by diffusion',
  'Every cell releases energy from food by respiration, which uses oxygen and produces carbon dioxide. Gaseous exchange is the swapping of these two gases between the body and the surrounding air. Breathing is different: it is the movement of air in and out of the lungs. Air enters through the nose (hairs and mucus trap dust, and the air is warmed and moistened), passes down the trachea (held open by C-shaped rings of cartilage), then into two bronchi, many smaller bronchioles, and ends in millions of tiny air sacs called alveoli. Alveoli are ideal for exchange: their walls are one cell thick, they are moist so gases can dissolve, they are surrounded by a dense network of capillaries, and together they give a very large surface area. Gases move by diffusion, from high concentration to low concentration. Air in the alveoli has more oxygen than the blood arriving, so oxygen diffuses into the blood; the blood has more carbon dioxide, so carbon dioxide diffuses out into the alveoli. Inhaling: the intercostal muscles contract to lift the ribs up and out, and the diaphragm contracts and flattens; the chest volume increases, the pressure inside falls below atmospheric pressure and air rushes in. Exhaling is the reverse. Inhaled air is about 21 percent oxygen and 0.04 percent carbon dioxide; exhaled air is about 16 percent oxygen and 4 percent carbon dioxide.',
  'Breathing rate = breaths counted / time in minutes',
  'Alveolus wrapped in capillaries with arrows for oxygen in and carbon dioxide out',
  'Smoking coats the airways with tar and damages alveoli, and smoke from indoor charcoal and firewood stoves irritates the lungs; people living at high altitude, as around Mount Kenya, breathe faster because the air has less oxygen per breath.',
  'Why would a lung with the alveoli joined into one big bag be a poor design, even if the total volume were the same?',
  'Assessment focus: describing alveolus adaptations, the mechanism of breathing, comparing inhaled and exhaled air, and experiments with lime water.',
  [
    'Step 1: The diaphragm and intercostal muscles contract. Reason: this raises the ribs and flattens the diaphragm, enlarging the chest.',
    'Step 2: Chest volume rises, so air pressure inside falls below the outside pressure. Reason: for a fixed amount of gas, larger volume means lower pressure.',
    'Step 3: Air flows in down the pressure difference to the alveoli. Reason: air always moves from higher to lower pressure.',
    'Step 4: Oxygen dissolves in the moisture of the alveolar wall and diffuses into the capillary blood. Reason: oxygen is more concentrated in the alveolus than in the arriving blood.',
    'Step 5: Carbon dioxide diffuses the other way and is breathed out when the muscles relax. Reason: blood arriving from the tissues carries more carbon dioxide than the alveolar air.'
  ],
  'Question: At rest a person takes 15 breaths per minute, each moving 500 cm^3 of air. Of the inhaled air, 21 percent is oxygen and exhaled air contains 16 percent oxygen. How much oxygen is absorbed per minute? Working: air moved per minute = 15 x 500 = 7500 cm^3. Oxygen absorbed = 7500 x (21 - 16)/100 = 7500 x 0.05 = 375 cm^3 per minute. Common mistake: saying exhaled air contains no oxygen. Only about a quarter of the oxygen is used, which is why mouth-to-mouth resuscitation works. Also, breathing (moving air) must not be confused with respiration (releasing energy in cells).'
));

S1.push(stop(
  'cbc_g11_gensci_s1_3',
  '1.3 Human Reproduction',
  'From Gametes to a New Person',
  'Fertilisation joins a sperm and an egg, and the embryo is nourished through the placenta until birth',
  'Reproduction is how living things make new individuals of their own kind. In humans, sexual reproduction uses special sex cells called gametes: sperm from the male and egg (ovum) from the female. Each gamete carries half the normal number of chromosomes (23), so that when they fuse the new cell, the zygote, has the full 46. The male system: the testes make sperm and the hormone testosterone; sperm travel along the sperm duct, mix with fluids from glands to form semen, and leave through the urethra in the penis. The female system: the ovaries release one egg about every 28 days (ovulation); the egg is swept into the oviduct, where fertilisation takes place; the zygote divides as it moves to the uterus and implants in its thick lining. The placenta then forms: its blood vessels lie close to the maternal blood, so oxygen and food diffuse to the baby and carbon dioxide and urea diffuse back, through the umbilical cord, while the two blood supplies never mix. The amniotic fluid cushions the foetus. Pregnancy lasts about 40 weeks. The menstrual cycle is the monthly build-up of the uterine lining; if no egg is fertilised the lining breaks down and is lost as menstruation. Puberty is the stage when hormones trigger the sexual features: oestrogen in girls and testosterone in boys. Sexually transmitted infections such as HIV and syphilis are passed through unprotected sex; abstinence and correct condom use reduce risk, and mothers living with HIV can take medicine to protect their babies.',
  'Gestation about 40 weeks; cycle about 28 days; ovulation about day 14',
  'Diagram of female reproductive system and a foetus attached by the umbilical cord and placenta',
  'Antenatal clinics in Kenyan county hospitals monitor the mother and baby; the Ministry of Health promotes exclusive breastfeeding for six months because breast milk has antibodies and the right nutrients.',
  'The mother and baby blood never mix, yet the baby gets oxygen from the mother. How can that happen?',
  'Assessment focus: labelling the reproductive systems, fertilisation to birth, role of the placenta, the menstrual cycle, and prevention of STIs.',
  [
    'Step 1: An ovary releases an egg and it enters the oviduct. Reason: the oviduct lining has cilia that move the egg towards the uterus.',
    'Step 2: Sperm deposited in the vagina swim through the uterus; one sperm nucleus fuses with the egg nucleus in the oviduct. Reason: this is fertilisation, restoring 46 chromosomes in the zygote.',
    'Step 3: The zygote divides repeatedly into a ball of cells and implants in the uterus lining. Reason: the lining is rich in blood vessels and supplies the embryo with food.',
    'Step 4: The placenta develops and links the embryo to the mother by the umbilical cord. Reason: its large surface area and thin barrier allow diffusion of oxygen and nutrients in and wastes out.',
    'Step 5: After about 40 weeks the uterus muscles contract and the baby is born. Reason: birth contractions push the baby through the cervix and vagina.'
  ],
  'Question: A woman has a regular 28-day cycle, and day 1 is the first day of menstruation. On which day does ovulation occur, and for roughly how long is she most likely to conceive? Working: ovulation occurs about 14 days before the next menstruation, so on day 14 (28 - 14). The egg survives about 1 day and sperm can survive about 3 days, so conception is most likely from about day 11 to day 15. Common mistake: believing the egg is fertilised in the uterus (it is in the oviduct) or that the mother and baby blood mix in the placenta (only dissolved substances cross).'
));

S1.push(stop(
  'cbc_g11_gensci_s1_4',
  '1.4 Response and Coordination',
  'Detecting Changes and Reacting to Them',
  'A stimulus is detected, information is processed, and an effector produces a response that keeps the body working',
  'Living things must respond to changes in their surroundings to survive. A change that an organism can detect is called a stimulus (for example heat, light, a sound or a pin prick). The reaction to it is the response. Coordination is the way the parts of the body work together to produce a suitable response. Animals coordinate through two systems: the nervous system (fast electrical signals along nerves, short-lived effects) and the endocrine system (chemical messengers called hormones carried in the blood, slower but longer-lasting effects). The pathway of a response is: stimulus, receptor (a cell or organ that detects the stimulus, such as the eye or skin), coordinator (brain or spinal cord, which decides), effector (a muscle that contracts or a gland that secretes) and response. Plants also respond, but without nerves: they use hormones called auxins. A growth response to a stimulus is a tropism. Shoots grow towards light (positive phototropism) because auxin moves to the shaded side and makes those cells elongate more, bending the shoot toward the light. Roots grow downwards (positive geotropism, or gravitropism) in the direction of gravity and towards water (hydrotropism). Another important response is homeostasis, keeping the internal conditions steady: for example, when body temperature rises, the skin makes sweat and its blood vessels widen to lose heat, and when it falls, we shiver and the vessels narrow to keep heat.',
  'Stimulus -> receptor -> coordinator -> effector -> response',
  'Flow diagram of stimulus to response and a shoot bending towards light',
  'A potted plant left on a window sill leans towards the window; farmers use this idea when seedlings in a nursery bed grow crooked if shaded on one side; sweating during a hot day on the Kenyan coast cools the body.',
  'If you cover only the tip of a shoot with foil, it no longer bends to the light. What does that tell you about where the stimulus is detected?',
  'Assessment focus: terms stimulus, response, receptor and effector, comparing nervous and hormonal coordination, tropisms and temperature control.',
  [
    'Step 1: Identify the stimulus, the change in the surroundings. Reason: without a stimulus there is no response to explain.',
    'Step 2: Name the receptor that detects it. Reason: every response starts with a specialised cell or organ that is sensitive to that kind of change.',
    'Step 3: Name the coordinator that processes the signal. Reason: the brain or spinal cord decides which response is suitable.',
    'Step 4: Name the effector, a muscle or gland. Reason: only effectors can carry out an action.',
    'Step 5: Describe the response and say how it helps survival. Reason: a response is useful only if it protects the body or improves its chances of finding food, water or safety.'
  ],
  'Question: A seedling is grown in a box with a hole on its left side only. After three days the shoot bends to the left. Explain. Working: light enters from the left, which is the stimulus. Auxin in the shoot tip moves to the right side, away from the light. Cells on the right elongate more than those on the left, so the shoot curves to the left, towards the light. This is positive phototropism, and its advantage is that the leaves receive more light for photosynthesis. Common mistake: saying the plant moves toward light because it "wants" to, or that more auxin always means more growth in every organ. Roots respond differently from shoots to the same hormone.'
));

S1.push(stop(
  'cbc_g11_gensci_s1_5',
  '1.5 Human Nervous System',
  'Nerves, Brain and Reflex Actions',
  'Nerve cells carry electrical impulses between the brain, the spinal cord and the body, and a reflex arc gives a fast automatic response',
  'The nervous system is the body communication network. It has two parts: the central nervous system (CNS), made of the brain and spinal cord, and the peripheral nervous system, the nerves that link the CNS to all body parts. The unit of the nervous system is the neurone (nerve cell). It has a cell body with a nucleus, and long fibres that carry an electrical signal called an impulse. A sensory neurone carries impulses from a receptor to the CNS; a relay neurone passes the impulse inside the CNS; a motor neurone carries it from the CNS to an effector. Neurones do not touch; there is a tiny gap called a synapse. At a synapse the impulse is carried across by a chemical (neurotransmitter), which diffuses across the gap and starts a new impulse in the next neurone. The brain has main parts: the cerebrum (thinking, memory, voluntary actions, interpreting senses), the cerebellum (balance and coordination of movement), the medulla oblongata (controls involuntary actions such as heartbeat and breathing) and the hypothalamus (monitors temperature). A voluntary action, such as writing, is decided by the brain. A reflex action is a fast, automatic, involuntary response to a stimulus, such as pulling your hand away from a hot sufuria. It follows a reflex arc: receptor, sensory neurone, relay neurone in the spinal cord, motor neurone, effector. It is fast because the signal does not need to go through the thinking part of the brain, and it protects the body from harm.',
  'Reflex arc: receptor -> sensory neurone -> relay neurone -> motor neurone -> effector',
  'Reflex arc diagram through the spinal cord with the synapses marked',
  'A person who touches a hot charcoal jiko pulls the hand back before feeling the pain; alcohol and drugs slow the nervous system, which is one reason drunk driving causes accidents on Kenyan roads.',
  'You pulled your hand away before you felt the burn. What does that tell you about where the decision was made?',
  'Assessment focus: structure and function of neurones, the reflex arc, voluntary versus reflex actions, and the functions of the parts of the brain.',
  [
    'Step 1: Receptors in the skin detect the heat (stimulus). Reason: they convert the heat energy into an electrical impulse.',
    'Step 2: A sensory neurone carries the impulse to the spinal cord. Reason: the CNS must receive information before it can respond.',
    'Step 3: A relay neurone passes the impulse across synapses to a motor neurone. Reason: the spinal cord connects the incoming signal to the outgoing path without waiting for the brain.',
    'Step 4: The motor neurone carries the impulse to the arm muscle (the effector). Reason: only motor neurones connect the CNS to muscles and glands.',
    'Step 5: The muscle contracts and the hand is withdrawn. Reason: a quick response reduces the damage, and the brain is informed afterwards, which is why pain is felt a moment later.'
  ],
  'Question: A nerve impulse travels at 100 m/s in a motor neurone. How long does it take to travel 1.2 m from the spinal cord to a foot muscle? Working: time = distance / speed = 1.2 / 100 = 0.012 s, which is 12 milliseconds. Common mistake: saying a reflex is "no nerves involved". A reflex uses a full arc of neurones, but the brain is bypassed in producing the response. Also, do not confuse the sensory neurone (towards the CNS) with the motor neurone (away from the CNS).'
));

S1.push(stop(
  'cbc_g11_gensci_s1_6',
  '1.6 Sensory and Endocrine System',
  'Sense Organs and Hormones',
  'Sense organs convert stimuli into impulses, while glands release hormones into the blood to control slower body changes',
  'A sense organ contains receptors that respond to one type of stimulus. The eye detects light. Light passes the cornea and lens, which together bend (refract) it to a focus on the retina at the back; the retina has rod cells (dim light, no colour) and cone cells (bright light, colour), and the optic nerve carries impulses to the brain. The iris controls the pupil: in bright light the pupil gets smaller to protect the retina, and in dim light it widens. To focus on near objects the lens becomes thicker (the ciliary muscles contract); for far objects it becomes thinner. This adjusting is called accommodation. The ear detects sound and balance. Sound waves make the eardrum vibrate; three small bones pass and amplify the vibration to the cochlea in the inner ear, whose receptor cells send impulses along the auditory nerve. The semicircular canals detect movement of the head and help balance. The skin has receptors for touch, pressure, pain and temperature. The tongue has taste buds (sweet, sour, salt, bitter) and the nose has smell receptors. The endocrine system is made of glands that release hormones directly into the blood. A hormone acts only on its target organs. Insulin from the pancreas lowers blood glucose by causing the liver to store glucose as glycogen; glucagon does the opposite. Adrenaline from the adrenal glands prepares the body for fight or flight (faster heartbeat, wider pupils, more glucose to the blood). Thyroxine controls metabolic rate, the pituitary gland releases growth hormone and controls other glands, and oestrogen, progesterone and testosterone control the reproductive system. Diabetes mellitus occurs when the body does not make enough insulin or cannot respond to it, so blood glucose stays too high.',
  'Nervous: fast and short-lived; hormonal: slower and long-lasting',
  'Cross-section of the eye and a table of glands with their hormones',
  'Short-sightedness is common in school children and is corrected using spectacles; blood glucose tests at Kenyan clinics detect diabetes; fright at a sudden loud noise makes the heart pound because of adrenaline.',
  'Why does it take a moment for your eyes to see in a dark room after coming in from bright sunlight?',
  'Assessment focus: parts of the eye and ear with functions, pupil reflex and accommodation, endocrine glands and hormones, and comparing hormonal and nervous control.',
  [
    'Step 1: In bright light the iris circular muscles contract. Reason: this makes the pupil smaller, so less light reaches and damages the retina.',
    'Step 2: In dim light the iris radial muscles contract, widening the pupil. Reason: more light is needed to stimulate the rods.',
    'Step 3: To view a near object the ciliary muscles contract and the lens becomes fatter. Reason: a fatter lens bends light more, so the close object focuses on the retina.',
    'Step 4: After a meal blood glucose rises and the pancreas releases insulin. Reason: insulin makes the liver and muscles take up glucose and store it as glycogen.',
    'Step 5: Blood glucose falls back to normal, and insulin release stops. Reason: this negative feedback keeps the glucose level steady around 4 to 6 mmol/dm^3.'
  ],
  'Question: Compare the nervous and hormonal systems for a student who is startled by a snake and later takes a meal. Working: the sight of the snake causes a nervous response in milliseconds along neurones (fast, short lasting, to a specific muscle), and the adrenal glands then release adrenaline into the blood, whose effects (rapid heartbeat) last minutes. After the meal, insulin is released over minutes and its effect lasts hours. Common mistake: saying hormones travel along nerves. Hormones travel in the blood and reach every organ, but only target organs with the right receptors respond.'
));

S2.push(stop(
  'cbc_g11_gensci_s2_1',
  '2.1 Salts II',
  'Choosing a Method to Make a Salt',
  'The solubility of a salt decides which preparation method works',
  'A salt is a compound formed when the hydrogen of an acid is replaced by a metal ion or the ammonium ion. Sulfuric acid gives sulfates, hydrochloric acid gives chlorides and nitric acid gives nitrates. To make a salt you must first know whether it dissolves in water. Useful solubility rules: all nitrates, all sodium, potassium and ammonium salts are soluble; most chlorides are soluble except silver chloride and lead(II) chloride (the latter dissolves in hot water); most sulfates are soluble except barium sulfate, lead(II) sulfate and calcium sulfate (slightly); most carbonates are insoluble except those of sodium, potassium and ammonium. Method 1, for a soluble salt from an insoluble base, metal or carbonate: add the solid to the warm acid until no more reacts (the solid is in excess), filter off the leftover, then evaporate part of the water and let the solution crystallise. Method 2, for a soluble salt from a soluble base (alkali): neutralise by titration with an indicator to find the exact volumes, then repeat without the indicator and crystallise. Method 3, for an insoluble salt: precipitation. Mix two soluble solutions whose ions form the insoluble salt, filter, wash with distilled water and dry. Heating also changes salts: most carbonates (except sodium and potassium) decompose to the oxide and carbon dioxide, for example CaCO3 -> CaO + CO2, and nitrates give oxygen and either the nitrite or the oxide. Many crystals contain water of crystallisation, fixed water in the crystal, such as blue CuSO4.5H2O, which turns to white anhydrous CuSO4 on heating.',
  'CuO + H2SO4 -> CuSO4 + H2O  |  Pb(NO3)2 + 2KI -> PbI2 + 2KNO3',
  'Flow chart choosing a method: soluble or insoluble, base or alkali',
  'Epsom salt (magnesium sulfate) is used in Kenyan homes for soaking sore feet; copper sulfate is sprayed on coffee and potatoes to control fungus; the Lake Magadi soda ash is mainly sodium carbonate.',
  'To make a soluble salt from an acid and an insoluble base, why do we add the base in excess rather than add exactly the amount needed?',
  'Assessment focus: solubility rules, choosing the method, describing each method in order, thermal decomposition, and water of crystallisation.',
  [
    'Step 1: Decide if the wanted salt is soluble using the solubility rules. Reason: a soluble salt is made by evaporation and an insoluble salt by precipitation.',
    'Step 2: For a soluble salt from an insoluble base, warm the acid and add the base until some stays undissolved. Reason: the excess shows that all the acid has reacted, so only the salt is left in solution.',
    'Step 3: Filter off the excess solid. Reason: the unreacted base is solid, and the filtrate is a pure salt solution.',
    'Step 4: Heat the filtrate to make it about one-third volume, then cool slowly. Reason: crystals form from a saturated solution; heating to dryness could decompose the hydrated crystals.',
    'Step 5: Filter, wash the crystals with a little cold distilled water and dry between filter papers. Reason: washing removes remaining solution while cold water dissolves little crystal.'
  ],
  'Question: 4.0 g of copper(II) oxide reacts with excess dilute sulfuric acid, then the solution is crystallised as CuSO4.5H2O. What is the maximum mass of crystals? (Cu 64, S 32, O 16, H 1) Working: CuO has Mr = 64 + 16 = 80, so moles = 4.0 / 80 = 0.050 mol. The equation shows 1 mol CuO gives 1 mol CuSO4, which becomes 1 mol CuSO4.5H2O. Mr of CuSO4.5H2O = 64 + 32 + 64 + 5 x 18 = 250. Mass = 0.050 x 250 = 12.5 g. Common mistake: forgetting the water of crystallisation in the formula mass, or trying to make an insoluble salt such as barium sulfate by evaporation; it must be precipitated.'
));

S2.push(stop(
  'cbc_g11_gensci_s2_2',
  '2.2 The Mole',
  'Counting Particles by Weighing',
  'A mole is 6.02 x 10^23 particles, and its mass in grams equals the relative formula mass',
  'Atoms and molecules are far too small to count one by one, so chemists count them in huge fixed groups, as a shopkeeper counts eggs in trays of 30. One such group is a mole: 6.02 x 10^23 particles (the Avogadro constant), which may be atoms, molecules or ions. The relative atomic mass (Ar) compares the mass of an atom to a standard, and the relative formula mass (Mr) is the sum of the Ar values in the formula. One mole of a substance has a mass in grams equal to its Mr; this is the molar mass in g/mol. So 1 mol of carbon (Ar 12) is 12 g, and 1 mol of water (Mr 18) is 18 g. One mole of any gas occupies about 24 dm^3 at room temperature and pressure. For solutions the concentration in mol/dm^3 is the number of moles dissolved in each dm^3, where 1 dm^3 = 1000 cm^3. The percentage of an element in a compound is (mass of that element in one formula / Mr) x 100, an application that matters for fertilisers and food labels.',
  'moles = mass / Mr = gas volume (dm^3) / 24 = concentration (mol/dm^3) x volume (dm^3)',
  'Mole map linking mass, gas volume, concentration and number of particles',
  'Farmers buy fertiliser by nitrogen content: urea, CO(NH2)2, is about 46 percent nitrogen, so a 50 kg bag contains about 23 kg of nitrogen. Pharmacists make up solutions by moles in the same way.',
  'A packet holds 100 g of chalk. If you knew only the mass of one chalk particle, what else would you need to count the particles?',
  'Assessment focus: converting between mass, moles, particles, gas volume and concentration, and percentage composition.',
  [
    'Step 1: Write the formula and work out Mr by adding Ar values. Reason: Mr converts grams to moles.',
    'Step 2: Convert the quantity given into moles (mass / Mr, volume / 24, or concentration x volume). Reason: moles are the common currency of chemistry.',
    'Step 3: Multiply moles by 6.02 x 10^23 if the number of particles is wanted. Reason: one mole always holds that many particles.',
    'Step 4: Convert from moles to the unit requested. Reason: the question asks for grams, dm^3 or percent, not moles.',
    'Step 5: Check units, particularly cm^3 to dm^3 (divide by 1000). Reason: the most frequent errors in mole work are unit errors.'
  ],
  'Question: Find the number of moles and molecules in 36 g of water, and the percentage of nitrogen in urea CO(NH2)2. (H 1, C 12, N 14, O 16) Working: Mr of H2O = 2 + 16 = 18; moles = 36 / 18 = 2.0 mol; molecules = 2.0 x 6.02 x 10^23 = 1.204 x 10^24. For urea, Mr = 12 + 16 + 2 x (14 + 2) = 60; nitrogen mass in one formula = 2 x 14 = 28; percentage = 28 / 60 x 100 = 46.7 percent. Common mistake: using the atomic mass of one atom when the formula has two (for N2 the Mr is 28, not 14), or forgetting that 1 dm^3 is 1000 cm^3.'
));

S2.push(stop(
  'cbc_g11_gensci_s2_3',
  '2.3 Hydrocarbons',
  'Compounds of Carbon and Hydrogen Only',
  'Hydrocarbons burn to give energy, and their family patterns predict their reactions',
  'A hydrocarbon is a compound containing only carbon and hydrogen. Carbon atoms can join in chains, so there are a great many. A homologous series is a family of compounds with the same general formula and similar chemical properties, each member differing from the next by CH2. Alkanes are saturated (only single C-C bonds), general formula CnH(2n+2): methane CH4, ethane C2H6, propane C3H8, butane C4H10. They are fairly unreactive but burn: in plenty of air they give carbon dioxide and water (complete combustion); in limited air they give carbon monoxide, a poisonous gas, or soot (incomplete combustion). They also react with chlorine in sunlight by substitution, where a hydrogen atom is replaced by a chlorine atom. Alkenes are unsaturated (contain a C=C double bond), general formula CnH2n: ethene C2H4, propene C3H6. They are more reactive: they decolourise bromine water (brown to colourless) by addition across the double bond, which is the test for unsaturation. Alkenes also join together into polymers such as poly(ethene). Alkynes contain a C-C triple bond, CnH(2n-2): ethyne C2H2, used in welding. Crude oil is separated by fractional distillation into petrol, kerosene, diesel and bitumen, which differ in boiling point because their chain lengths differ: the longer the chain, the higher the boiling point. Burning fossil fuels releases carbon dioxide, which adds to global warming.',
  'Alkanes CnH(2n+2) | Alkenes CnH2n | Alkynes CnH(2n-2)',
  'Structural formulae of methane, ethane, ethene and the bromine water test',
  'Kenyan homes use LPG (propane and butane) for cooking, petrol and diesel move matatus and trucks, and kerosene lights rural homes; biogas is mostly methane from decaying cow dung; burning charcoal in a closed room can release deadly carbon monoxide.',
  'Why does burning in a closed room with little air produce a poisonous gas that burning in an open space does not?',
  'Assessment focus: naming and drawing the first members, general formulae, complete and incomplete combustion, the bromine water test, and fractional distillation.',
  [
    'Step 1: Count the carbon atoms to give the name stem (1 meth, 2 eth, 3 prop, 4 but). Reason: the stem tells the chain length.',
    'Step 2: Check for a double bond to choose the ending (-ane or -ene). Reason: the type of bond decides the family and its chemistry.',
    'Step 3: Write the combustion equation: hydrocarbon + oxygen -> carbon dioxide + water. Reason: complete combustion sends all carbon to CO2 and all hydrogen to H2O.',
    'Step 4: Balance carbon, then hydrogen, then oxygen. Reason: balancing in this order is the quickest, and oxygen is usually the last atom type left.',
    'Step 5: Use the mole ratio from the equation. Reason: the coefficients link moles of fuel to moles of products.'
  ],
  'Question: Propane burns completely: C3H8 + 5O2 -> 3CO2 + 4H2O. What volume of carbon dioxide forms at room temperature from 4.4 g of propane? (C 12, H 1; 1 mol gas = 24 dm^3) Working: Mr of propane = 3 x 12 + 8 = 44; moles = 4.4 / 44 = 0.10 mol. The ratio of propane to CO2 is 1 : 3, so moles of CO2 = 0.30 mol; volume = 0.30 x 24 = 7.2 dm^3. Common mistake: calling an alkene saturated (it has a double bond, so it is unsaturated), or writing alkane formulae that break the CnH(2n+2) rule, such as C3H6 for propane.'
));

S3.push(stop(
  'cbc_g11_gensci_s3_1',
  '3.1 Thin Lenses',
  'How Lenses Bend Light to Form Images',
  'A converging lens brings parallel rays to a focus, and the position of the object decides the kind of image',
  'A lens is a piece of transparent material, usually glass, with curved surfaces that refracts (bends) light. A convex lens is thicker in the middle and is converging: it bends parallel rays together to meet at the principal focus (F). A concave lens is thinner in the middle and is diverging: it spreads parallel rays apart, so they seem to come from a focus on the incoming side. The focal length f is the distance from the centre of the lens to the principal focus. To find an image, draw two rays from the top of the object: one parallel to the principal axis, which refracts through F; and one through the optical centre, which goes straight on. Where they meet is the image. A real image can be caught on a screen; a virtual image cannot. A convex lens gives a real, inverted image when the object is further than f from the lens, and a virtual, upright, magnified image when the object is nearer than f (the magnifying glass). A concave lens always gives a virtual, upright, smaller image. For numerical work, 1/f = 1/u + 1/v, where u is the object distance and v the image distance (real is positive). Magnification m = v/u = image height / object height. Uses include the camera (real, smaller image on a film or sensor), the projector (real, enlarged image), and spectacles: convex lenses correct long-sightedness and concave lenses correct short-sightedness. The power of a lens is P = 1/f with f in metres, measured in dioptres.',
  '1/f = 1/u + 1/v  |  m = v/u  |  P = 1/f (f in m)',
  'Ray diagram of a convex lens with object beyond F and a real inverted image',
  'Optometrists in Kenyan towns test eyesight and prescribe spectacles in dioptres; a hand lens is used to focus sunlight to light a fire; the camera of a mobile phone uses a small convex lens to form a real image on its sensor.',
  'Why can a magnifying glass make print look bigger when held close to the page, but turn the view upside down when held at arm length?',
  'Assessment focus: ray diagrams for convex and concave lenses, the lens formula and magnification, image properties and uses, and correcting eye defects.',
  [
    'Step 1: Draw the principal axis, the lens, and mark F on both sides. Reason: all the rays are drawn relative to these fixed points.',
    'Step 2: Draw the object at the correct distance and a ray from its top parallel to the axis, bending through F after the lens. Reason: a ray parallel to the axis is refracted through the principal focus.',
    'Step 3: Draw a ray from the top of the object through the optical centre without bending. Reason: at the centre the two surfaces are parallel, so the ray emerges in the same direction.',
    'Step 4: Mark the image where the rays meet, and describe it (real or virtual, upright or inverted, larger or smaller). Reason: the properties follow from the picture.',
    'Step 5: Check with the formula 1/f = 1/u + 1/v. Reason: a calculation confirms the position and size drawn.'
  ],
  'Question: An object is 15 cm in front of a convex lens of focal length 10 cm. Find the image distance and the magnification. Working: 1/v = 1/f - 1/u = 1/10 - 1/15 = 3/30 - 2/30 = 1/30, so v = 30 cm on the other side of the lens. Magnification m = v/u = 30 / 15 = 2. The image is real, inverted and twice as large as the object. Common mistake: drawing the ray through the centre bent, or placing the object nearer than f and expecting a real image. Also, the power of a 10 cm lens is 1 / 0.10 = 10 dioptres; the focal length must be converted to metres first.'
));

S3.push(stop(
  'cbc_g11_gensci_s3_2',
  "3.2 Newton's Laws of Motion",
  'Why Things Start, Stop and Change Speed',
  'Force changes motion: no net force means no change, and the size of the net force sets the acceleration',
  'A force is a push or pull measured in newtons (N). When several forces act, the net (resultant) force is what matters. Newton\'s first law: an object stays at rest, or moves at constant speed in a straight line, unless a net force acts on it. This property is inertia, the reluctance to change motion; the more mass an object has, the more inertia. This is why passengers lurch forward when a matatu brakes suddenly, and why seat belts are required. Newton\'s second law: the net force equals mass times acceleration, F = ma. Acceleration is the change of velocity in each second, in m/s^2. The same force gives a small mass a big acceleration and a large mass a small one, and the acceleration is in the direction of the net force. Newton\'s third law: when object A pushes on object B, B pushes back on A with an equal and opposite force. The two forces act on different objects, so they do not cancel. A rocket moves because it pushes gas down and the gas pushes the rocket up; a swimmer moves by pushing water backwards. Weight is the force of gravity on a mass: W = mg, where g is about 10 N/kg near Earth (9.8 more exactly). Mass (kg) does not change with place; weight (N) does. Friction is a force opposing motion between surfaces in contact; it is why a moving object slows down when the pushing force is removed, not because "force is needed to keep moving".',
  'F = ma  |  W = mg  |  a = (v - u)/t',
  'Free-body diagram of a car with driving force, friction, weight and normal reaction',
  'A lorry on the Mombasa road needs a bigger braking force than a car to stop in the same distance because its mass is much larger; road safety campaigns stress seat belts and speed limits for this reason.',
  'A book rests on a table: weight pulls it down and the table pushes up. Are those two forces a third-law pair? Why or why not?',
  'Assessment focus: statements and applications of the three laws, calculating with F = ma and W = mg, resultant force, inertia and friction.',
  [
    'Step 1: Draw all the forces on the object as arrows. Reason: seeing every force avoids forgetting friction or weight.',
    'Step 2: Find the net force by subtracting opposite forces along the same line. Reason: only the net force changes the motion.',
    'Step 3: If the net force is zero, state that the velocity is constant (first law). Reason: balanced forces mean no acceleration, which includes constant motion, not just rest.',
    'Step 4: Otherwise use a = F/m to find the acceleration. Reason: Newton\'s second law links net force and mass to acceleration.',
    'Step 5: For interactions, name the equal and opposite pair acting on the other object (third law). Reason: forces always occur in pairs on two different bodies.'
  ],
  'Question: A car of mass 1200 kg is driven forward by an engine force of 3000 N against friction of 600 N. Find the acceleration and the speed after 5 s from rest. Working: net force = 3000 - 600 = 2400 N. Acceleration a = F / m = 2400 / 1200 = 2 m/s^2. Speed v = u + at = 0 + 2 x 5 = 10 m/s. Common mistake: using the engine force alone and ignoring friction, or saying that a constant speed needs a constant net force. At constant speed the net force is zero.'
));

S3.push(stop(
  'cbc_g11_gensci_s3_3',
  '3.3 Uniform Circular Motion',
  'Motion in a Circle at Constant Speed',
  'An object moving in a circle at steady speed is still accelerating, because its direction keeps changing, and this needs a force towards the centre',
  'Uniform circular motion is motion along a circle at constant speed. The speed is constant but the velocity is not, because velocity includes direction and the direction changes all the time. A changing velocity is an acceleration, so the object is accelerating even at constant speed. This acceleration, and the force that causes it, point towards the centre of the circle; the force is called the centripetal force (centre-seeking). It is not a new kind of force: it is whichever real force supplies the pull to the centre, such as the tension in a string, friction between tyres and road, or gravity for a satellite. The period T is the time for one complete circle, in seconds; the frequency f = 1/T is the number of circles per second, in hertz (Hz). For a circle of radius r, the distance round is the circumference 2 pi r, so the speed is v = 2 pi r / T. The centripetal acceleration is a = v^2 / r, and the centripetal force is F = m v^2 / r. If the force disappears, the object moves off in a straight line along the tangent (first law), not outwards along the radius. The force grows with the square of the speed, so doubling the speed needs four times the force; this is why vehicles must slow down at sharp bends, and why banked roads are built.',
  'v = 2 pi r / T  |  a = v^2 / r  |  F = m v^2 / r',
  'Circle with velocity arrows along the tangent and force arrows towards the centre',
  'A matatu taking a sharp corner at high speed can skid or overturn because friction cannot supply enough centripetal force; the clothes spin dryer and the centrifuge in a hospital laboratory use circular motion, and the Moon is held in orbit by gravity.',
  'If a stone whirled on a string is released, which way does it go: outwards from the circle, along the tangent, or inwards? What does the first law say?',
  'Assessment focus: period and frequency, speed around a circle, direction of velocity and force, calculating centripetal force, and real examples.',
  [
    'Step 1: Find the period T from the number of turns in a measured time. Reason: T = time / number of turns gives the time for one circuit.',
    'Step 2: Calculate the circumference 2 pi r. Reason: this is the distance travelled in one period.',
    'Step 3: Divide the distance by the time to give the speed, v = 2 pi r / T. Reason: speed is distance over time.',
    'Step 4: Use a = v^2 / r for the acceleration. Reason: it relates the change of direction to the speed and radius.',
    'Step 5: Multiply by the mass to find the centripetal force, F = m v^2 / r. Reason: Newton\'s second law gives the net force towards the centre.'
  ],
  'Question: A 0.20 kg stone on a string is whirled in a horizontal circle of radius 0.50 m, completing one circle every 0.50 s. Find the speed, acceleration and tension. Working: v = 2 x 3.14 x 0.50 / 0.50 = 6.28 m/s. Acceleration a = v^2 / r = 6.28^2 / 0.50 = 78.9 m/s^2 towards the centre. The tension supplies the force: F = ma = 0.20 x 78.9 = 15.8 N. Common mistake: drawing an outward "centrifugal" force as a real force on the object, or saying that constant speed means no acceleration.'
));

S3.push(stop(
  'cbc_g11_gensci_s3_4',
  '3.4 Heating Effect of Current',
  'Electrical Energy Turned into Heat',
  'When current flows through a resistor, electrical energy is converted to heat at a rate P = VI',
  'An electric current is a flow of charge, and as the charges (electrons) move through a metal they collide with its atoms, which makes the atoms vibrate more and the wire hotter. This is the heating effect of a current. The quantities are: current I in amperes (A), voltage V in volts (V), resistance R in ohms, and the relation V = IR (Ohm\'s law). Electrical power P is the energy transferred each second, in watts (W): P = VI = I^2 R = V^2 / R. The electrical energy used is E = P x t, where t is in seconds for joules, or P in kilowatts and t in hours for kilowatt-hours (kWh), the unit on electricity bills. Heating elements in kettles, irons and electric cookers use a wire of high resistance and high melting point (such as nichrome) so that it glows hot without melting. The filament of an old bulb is tungsten, which melts at over 3000 degrees Celsius. A fuse is a short piece of thin wire placed in the live wire; if the current exceeds its rating, the wire heats and melts, cutting off the supply before the cables overheat and start a fire. Fuse ratings are chosen slightly above the normal current of the appliance, for example 13 A in a Kenyan three-pin plug. Heat energy needed to warm a substance is Q = mc(change in temperature), where c is the specific heat capacity; for water c is 4200 J/(kg degree Celsius). Joule heating also wastes energy in long cables, so electricity is transmitted at very high voltage to keep the current small.',
  'P = VI  |  E = Pt  |  Q = mc(delta T)',
  'Circuit with a heating element, fuse and switch in the live wire',
  'Electric kettles, irons and water heaters in Kenyan homes use this effect; faulty wiring and overloaded extension sockets cause fires, which is why Kenya Power advises correct fuses and certified electricians.',
  'Why does the thin element of a kettle glow hot while the thick cable that supplies it stays cool, though the same current flows through both?',
  'Assessment focus: calculating power, energy and cost, explaining heating in wires, properties of heating elements, and the working and rating of fuses.',
  [
    'Step 1: List the quantities given (voltage, power, time, mass). Reason: this shows which formula applies.',
    'Step 2: Find the current from I = P / V. Reason: the fuse and cable must suit this current.',
    'Step 3: Choose a fuse slightly above the working current. Reason: a fuse that is too large will not protect, and one that is too small blows on normal use.',
    'Step 4: Find the heat needed using Q = mc(delta T) and the time using t = Q / P. Reason: electrical energy supplied equals the heat gained if there is no loss.',
    'Step 5: Convert to kWh for cost. Reason: bills are charged per kWh.'
  ],
  'Question: A 2000 W kettle runs from a 240 V supply and heats 1.0 kg of water from 20 degrees Celsius to 100 degrees Celsius. Find the current, a suitable fuse, the heating time and the cost at KSh 25 per kWh. (c = 4200 J/(kg degree Celsius); ignore heat losses) Working: current I = P / V = 2000 / 240 = 8.3 A, so a 13 A fuse suits. Heat Q = mc(delta T) = 1.0 x 4200 x 80 = 336 000 J. Time t = Q / P = 336 000 / 2000 = 168 s. Energy = 2 kW x (168 / 3600) h = 0.0933 kWh, so cost = 0.0933 x 25 = KSh 2.33. Common mistake: using a 3 A fuse (it would blow at once) or mixing watts with kilowatts when computing kWh.'
));

const GENERAL_SCIENCE_G11_MAPS = [
  {
    curriculum: 'CBC',
    grade: 11,
    subject: 'General Science',
    code: 'GSC-G11',
    trackPathway: 'STEM',
    title: 'CBE Grade 11 (Senior STEM) General Science Metro Line',
    description: 'Strands follow the KICD Grade 11 General Science design (October 2025).',
    stations: [
      {
        id: 'cbc_g11_gensci_s1',
        number: 1,
        title: '1.0 Life Science',
        strand: 'Strand 1.0: Life Science',
        icon: 'Life',
        status: 'available',
        summary: 'Transport, gaseous exchange, reproduction, coordination and the nervous, sensory and endocrine systems in humans.',
        subtopics: S1
      },
      {
        id: 'cbc_g11_gensci_s2',
        number: 2,
        title: '2.0 Matter and Chemical Reactions',
        strand: 'Strand 2.0: Matter and Chemical Reactions',
        icon: 'Matter',
        status: 'available',
        summary: 'Making salts, counting particles with the mole, and the hydrocarbon families.',
        subtopics: S2
      },
      {
        id: 'cbc_g11_gensci_s3',
        number: 3,
        title: '3.0 Natural Physical Science',
        strand: 'Strand 3.0: Natural Physical Science',
        icon: 'Physical',
        status: 'available',
        summary: 'Lenses, forces and motion, circular motion and the heating effect of electric current.',
        subtopics: S3
      }
    ]
  }
];

module.exports = { maps: GENERAL_SCIENCE_G11_MAPS, retiredIds: [] };
