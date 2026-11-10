// CBC Junior School Integrated Science, Grade 7 (KICD design, revised 2024).
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
const S5 = [];
const S2 = [];
const S3 = [];

S1.push(stop(
  'cbc_g7_sci_s1_3',
  '1.1 Introduction to Integrated Science',
  'Asking Questions and Testing Answers Fairly',
  'Science is a way of finding out how the world works by observing, testing and measuring, and it joins ideas from biology, chemistry and physics',
  'Science is the organised study of nature using observation and experiment. Integrated Science means we do not split knowledge into separate boxes: living things (biology), materials and their changes (chemistry), and forces and energy (physics) all work together. A maize plant in a shamba is a good example: it is alive (biology), it takes in dissolved minerals from the soil (chemistry), and it uses the energy of sunlight (physics). Scientists use a scientific method. First you observe something and ask a question. Then you form a hypothesis, which is a testable guess that explains what you saw. Then you design an experiment, collect data (measurements and observations), analyse the data and draw a conclusion that says whether the hypothesis is supported. Results must be reported honestly, even if they disagree with your guess. In an experiment a variable is anything that can change. The independent variable is the one you change on purpose. The dependent variable is the one you measure to see the effect. Controlled variables are everything else, which you keep the same so that the test is fair. Science helps us in daily life: it explains why food spoils, how medicines work and how to farm better, and it must be used responsibly, with care for people and the environment.',
  'Fair test: change ONE variable, measure ONE variable, keep all others the same',
  'Flow: Observe -> Question -> Hypothesis -> Experiment -> Results -> Conclusion',
  'A farmer in Nyeri tries two amounts of manure on separate rows of beans to see which gives more pods; the farmer is using the scientific method without calling it that.',
  'You want to know whether sugar dissolves faster in hot water or cold water. What must be the same in both cups so the comparison is fair?',
  'Assessment focus: the branches of science and how they link, steps of the scientific method, identifying independent, dependent and controlled variables, and planning a fair test.',
  [
    'Step 1: Observe and ask a question, for example "Does sugar dissolve faster in hot water?" Reason: every investigation starts from something you noticed and want to explain.',
    'Step 2: State a hypothesis: "Sugar dissolves faster as the water gets hotter." Reason: a hypothesis can be tested and shown right or wrong; a vague wish cannot.',
    'Step 3: Choose the variables. Independent: water temperature. Dependent: time to dissolve. Controlled: mass of sugar, volume of water, stirring. Reason: if two things change at once you cannot tell which caused the result.',
    'Step 4: Carry out the test and record every measurement in a table. Reason: written data can be checked by others and is not changed by faulty memory.',
    'Step 5: Repeat the test and average the results. Reason: one reading may be spoiled by a small mistake; the average is more reliable.',
    'Step 6: Conclude whether the data support the hypothesis. Reason: the conclusion must follow from the evidence, not from what we hoped to find.'
  ],
  'Question: Three cups of hot water are each given 5 g of sugar. The times taken to dissolve are 42 s, 40 s and 44 s. In three cups of cold water the times are 95 s, 101 s and 98 s. Find the average for each and compare. Working: hot average = (42 + 40 + 44) / 3 = 126 / 3 = 42 s. Cold average = (95 + 101 + 98) / 3 = 294 / 3 = 98 s. Difference = 98 - 42 = 56 s. Conclusion: sugar dissolved faster in hot water, so the hypothesis is supported. Common mistake: changing two things at once, for example using more sugar in the hot cup, which makes the result meaningless.'
));

S1.push(stop(
  'cbc_g7_sci_s1_1',
  '1.2 Laboratory Safety',
  'Working Safely: Rules, Hazard Symbols and First Aid',
  'Laboratory accidents are prevented by knowing the hazards, reading the symbols and following the rules every time',
  'A laboratory is a room set up for experiments. It contains things that can hurt us if misused: flames, hot objects, glass, chemicals and electricity. A hazard is anything that can cause harm. Safety rules reduce the risk. Basic rules: work only when the teacher is present; do not eat, drink or taste anything; tie back long hair and wear protective clothing; walk, do not run; read labels before using a chemical; wash your hands after the practical; report every spill or injury at once. Never smell a gas directly; waft a little of it towards your nose with your hand. Hazard symbols are printed on containers. Flammable (a flame) means it catches fire easily, so keep it away from flames. Corrosive (a hand and a surface being eaten away) means it burns skin and damages materials. Toxic (a skull and crossbones) means it can kill if swallowed or breathed in. Harmful or irritant (an exclamation mark) means it can cause rashes or sickness. Oxidising (a flame over a circle) helps other things burn. Explosive (an exploding bomb) can blow up. The Bunsen burner is a gas burner for heating. It has a chimney, a collar with an air-hole, a gas inlet and a base. With the air-hole closed the flame is yellow, bright and sooty; it is the luminous flame, it is cooler and it is the safety flame because it is easy to see. With the air-hole open, air mixes with the gas, burning is complete and the flame is blue and quiet and hot; it is the non-luminous flame used for heating. Heat a test tube with its mouth pointing away from everyone, using a holder, and keep moving it gently. First aid: for a small burn, hold the area under cool running water for at least ten minutes; for chemicals in the eye, rinse with plenty of clean water and get help; for cuts, press with a clean cloth. Know where the fire extinguisher, the sand bucket and the first aid box are kept.',
  'Open air-hole: complete burning, blue, hot. Closed air-hole: incomplete burning, yellow, sooty, cooler',
  'Hazard symbols: flammable, corrosive, toxic, harmful, oxidising, explosive; Bunsen burner flame',
  'The same care applies at home when you handle a charcoal jiko, paraffin, bleach or pesticides used in the shamba, which carry the same hazard symbols.',
  'Why do we light a Bunsen burner with the air-hole closed and only open it when we are ready to heat?',
  'Assessment focus: naming hazard symbols and what they mean, stating laboratory rules, labelling the Bunsen burner and comparing luminous with non-luminous flames, and first aid actions.',
  [
    'Step 1: Check that the tubing is joined firmly to the gas tap and the burner, and the area is clear of paper and bottles. Reason: a loose or cracked pipe leaks gas, which can catch fire.',
    'Step 2: Close the air-hole, light a match and hold it beside the top of the chimney before turning the gas on. Reason: the gas must meet the flame as soon as it comes out, so it does not build up in the room.',
    'Step 3: Turn on the gas slowly. A yellow luminous flame forms. Reason: with little air the gas burns incompletely, giving a visible flame that is easy to see.',
    'Step 4: To heat, open the air-hole until the flame is blue and quiet. Reason: more air gives complete burning, so more heat and no soot on the apparatus.',
    'Step 5: Hold the test tube in a holder at a slant, move it gently, and point the mouth away from people. Reason: liquid can spit out as it boils, and moving it spreads the heat evenly.',
    'Step 6: When finished, close the air-hole to make the flame yellow again, then turn off the gas at the tap. Reason: a yellow flame is easy to see, so nobody touches a burner that is still lit.'
  ],
  'Scenario: a learner sees a bottle with a skull and crossbones and another with a flame symbol. Working: the first is toxic, so never taste or inhale it, and use it only as the teacher directs; the second is flammable, so keep it far from the Bunsen burner. Burner check: a yellow flame that leaves black soot on a beaker is the luminous flame; opening the air-hole makes it blue and removes the soot, showing complete burning. Common mistake: believing the blue flame is cooler because it looks faint. It is the hotter one; the yellow flame is the cooler flame, and the soot is unburnt carbon.'
));

S1.push(stop(
  'cbc_g7_sci_s1_4',
  '1.3 Laboratory apparatus and instruments',
  'Choosing and Reading the Right Instrument',
  'Each piece of apparatus has one job, and a measurement is only as good as the instrument chosen and the way it is read',
  'Apparatus means the equipment used in an experiment; an instrument is apparatus that measures something. Common items and their uses: a beaker holds and heats liquids and is only roughly marked; a conical flask is used for swirling and titration; a test tube holds small amounts for reactions and heating; a measuring cylinder measures the volume of a liquid accurately; a pipette or burette delivers exact small volumes; a filter funnel with filter paper separates a solid from a liquid; an evaporating dish is used to boil off a liquid to leave a solid; a tripod stand, gauze and the Bunsen burner support and heat containers; a spatula lifts solid chemicals; a dropper adds drops; a thermometer measures temperature in degrees Celsius; a stopwatch measures time in seconds; a beam balance or electronic balance measures mass in grams or kilograms; a metre rule and tape measure measure length. Volume is measured in cubic centimetres (cm3) or millilitres (mL); 1 mL equals 1 cm3, and 1000 mL equals 1 litre. To read a measuring cylinder, place it on a flat table and put your eye level with the liquid surface. The surface of water curves downwards, and this curve is called the meniscus. Read the bottom of the meniscus. The smallest division on the scale tells you how precisely you can read; always write the unit. The volume of an irregular solid such as a stone can be found by displacement: the stone pushes aside its own volume of water, so the volume is the rise in the water level. A thermometer bulb must be fully in the liquid and must not touch the glass, and a lab thermometer must never be used to stir. Apparatus must be handled and cleaned with care, and glass that is cracked must be reported, not used.',
  'Volume of solid = final water level - initial water level; 1 mL = 1 cm3',
  'Measuring cylinder with eye at the bottom of the meniscus, beaker, conical flask, test tube, funnel',
  'A mama mboga measuring cooking oil with a small cup is doing the same job as a measuring cylinder; a clinic nurse uses a thermometer and a scale to check a child, and both must be read correctly to give a true result.',
  'Why would reading the top of the meniscus, or looking down at the cylinder from above, give a wrong volume?',
  'Assessment focus: naming apparatus and stating its use, reading volumes, temperature and mass with correct units, measuring the volume of an irregular solid by displacement, and handling apparatus.',
  [
    'Step 1: Choose the instrument for the job: a measuring cylinder for volume of a liquid, not a beaker. Reason: a beaker has coarse markings, so its readings are not exact.',
    'Step 2: Place the cylinder on a flat surface and pour in water to a convenient mark, for example 50 cm3. Reason: a tilted cylinder gives a slanted surface and a wrong reading.',
    'Step 3: Bring your eye level with the surface and read the bottom of the meniscus. Reason: looking from above or below shifts the apparent reading (parallax error).',
    'Step 4: Tie the stone to a thread and lower it gently until it is fully covered. Reason: dropping it can crack the glass and splash water out, and the stone must be completely under the surface so it pushes aside its full volume.',
    'Step 5: Read the new level and subtract the first reading. Reason: the rise equals the volume of water pushed aside, which equals the volume of the stone.',
    'Step 6: Write the answer with its unit and wash and return the apparatus. Reason: a number without a unit has no meaning, and clean equipment is ready for the next group.'
  ],
  'Question: A cylinder holds 50 cm3 of water. After a stone is lowered in, the level reads 68 cm3. The stone has a mass of 45 g. Find its volume and its density. Working: volume = 68 - 50 = 18 cm3. Density = mass / volume = 45 / 18 = 2.5 g per cm3. Check the scale: if the cylinder is marked every 2 cm3, a reading must be a number on or half way between the marks, such as 68 cm3. Common mistake: reading the top edge of the water where it climbs up the glass instead of the bottom of the curve, or forgetting to subtract the starting level.'
));

S5.push(stop(
  'cbc_g7_sci_s1_2',
  '2.1 Mixtures',
  'Mixing Substances and Getting Them Apart Again',
  'A mixture is two or more substances that are not chemically joined, so they can be separated by physical methods that use a difference in their properties',
  'Matter is anything that has mass and takes up space. A substance is a single kind of matter, such as pure water or salt. A mixture contains two or more substances that are just mixed together: each keeps its own properties and they can be in any proportion. Air, soil, sea water, milk and ugali with sukuma wiki are mixtures. In a homogeneous mixture the parts are evenly spread and look like one substance, for example salt dissolved in water. This is called a solution: the solid that dissolves is the solute, the liquid that dissolves it is the solvent. In a heterogeneous mixture you can see the different parts, for example sand in water or soil and stones. Because nothing new is made when a mixture forms, we separate it by physical means that use a difference in a property. Filtration separates an insoluble solid from a liquid: the liquid passes through the filter paper as the filtrate and the solid stays behind as the residue; it works because solid particles are too big for the tiny holes. Decantation is pouring off the liquid after a solid has settled. Evaporation heats a solution until the solvent leaves as vapour, leaving the solute; crystallisation stops heating early and lets the solution cool slowly so that crystals form. Simple distillation collects the solvent as well: the solution is boiled, the vapour passes into a cooled condenser, becomes liquid again (the distillate) and drips into a flask; it works because the solvent boils at a lower temperature than the solute. Water enters the condenser jacket at the bottom and leaves at the top so the jacket stays full and the cooling is steady. Sublimation separates a solid that turns to gas on heating (such as ammonium chloride) from one that does not (such as sand). A separating funnel separates two liquids that do not mix, such as oil and water, because the denser liquid sinks. Magnets pick out iron from non-magnetic solids. Winnowing uses wind to blow chaff from grain. Sieving separates particles of different sizes. Chromatography separates coloured substances, such as the inks in a marker, because they travel at different speeds up wet paper.',
  'Mixture = substances NOT chemically joined; separate by a physical difference (size, solubility, boiling point, density, magnetism)',
  'Filtration apparatus and a simple distillation set-up with a condenser; salt pans',
  'Salt is obtained near Malindi and Gongoni by letting sea water evaporate in shallow pans in the sun; mothers winnow maize and beans; filtering muddy water through cloth and then boiling it makes it safer to drink.',
  'Muddy salty water is poured through filter paper. Which will be found in the filtrate and which on the paper, and how would you get the salt out of the filtrate?',
  'Assessment focus: mixture versus substance, solution terms, choosing and describing a separation method with its principle, and drawing filtration and distillation set-ups.',
  [
    'Step 1: Identify the substances and decide which property differs. In a mixture of sand, salt and iron filings: iron is magnetic, salt dissolves, sand does not. Reason: separation always works by exploiting a difference.',
    'Step 2: Pass a magnet over the dry mixture to remove the iron filings. Reason: only iron is attracted, so this step costs nothing and does not disturb the rest.',
    'Step 3: Add water and stir. Reason: salt dissolves in water and sand does not, so the salt moves into solution.',
    'Step 4: Pour through filter paper in a funnel. Sand stays as residue, salt solution passes as filtrate. Reason: sand grains are bigger than the holes in the paper; dissolved salt particles are tiny.',
    'Step 5: Heat the filtrate in an evaporating dish until a few crystals appear, then leave it to cool. Reason: stopping before it is dry avoids spitting hot salt and gives well-formed crystals.',
    'Step 6: Dry and weigh each part. Reason: the masses should add up to the starting mass, which checks that nothing was lost.'
  ],
  'Question: 30 g of a mixture of sand, salt and iron filings is separated. The magnet removes 6 g of iron. After adding water and filtering, the dried sand has a mass of 9 g. Find the mass of salt and its percentage in the mixture. Working: mass of salt = 30 - 6 - 9 = 15 g. Percentage of salt = 15 / 30 x 100 = 50 percent. Check: 6 + 9 + 15 = 30 g, the same as the start. Common mistake: using filtration to separate salt from water; the salt is dissolved and passes through the filter paper, so evaporation or distillation is needed. Another mistake is calling a mixture a compound; in a mixture nothing new is formed.'
));

S5.push(stop(
  'cbc_g7_sci_s5_1',
  '2.2 Acids, bases and indicators',
  'Sorting Substances by How They Behave in Water',
  'Acids taste sour and turn blue litmus red, bases feel soapy and turn red litmus blue, and an indicator changes colour to tell them apart',
  'Acids are substances that dissolve in water to give solutions with a sour taste and a pH below 7. Natural acids include citric acid in lemons and oranges, ethanoic acid (vinegar), lactic acid in sour milk and tartaric acid in tamarind. Laboratory acids such as hydrochloric, sulphuric and nitric acid are strong and corrosive and must be handled only by the teacher. A base is a substance that reacts with an acid to form a salt and water. A base that dissolves in water is called an alkali. Alkalis feel soapy and taste bitter; examples are soap solution, wood ash solution, baking soda solution, toothpaste, milk of magnesia and ammonia. The pH scale runs from 0 to 14: below 7 is acidic, exactly 7 is neutral (pure water), above 7 is alkaline. The further from 7, the stronger the acid or alkali. An indicator is a substance that shows by its colour whether a solution is acid, alkaline or neutral. Litmus is red in acid, blue in alkali and purple in neutral solution. Universal indicator gives a range of colours (red or orange for strong and weak acids, green for neutral, blue to purple for alkalis) and so can show the pH. Many plants make natural indicators: red cabbage and hibiscus flowers give coloured extracts that change colour in acids and in alkalis. To make one, chop the petals or leaves, soak them in warm water and strain the coloured liquid. Never taste chemicals to test them. Neutralisation is the reaction of an acid with a base to give a salt and water only: acid + base -> salt + water. Example: hydrochloric acid + sodium hydroxide -> sodium chloride + water. It has useful applications: an antacid tablet (a base) neutralises excess stomach acid causing indigestion; farmers add agricultural lime to acidic soil so that crops such as maize grow better; toothpaste neutralises acids made by bacteria in the mouth.',
  'pH below 7 acid; pH 7 neutral; pH above 7 alkaline. Acid + base -> salt + water',
  'pH scale from 0 to 14 with universal indicator colours; red cabbage indicator in four test tubes',
  'Lemon juice and vinegar are acids in the kitchen; wood ash and soap are alkaline; a farmer in Kericho or Meru who finds the soil too acidic adds lime; indigestion tablets are bases.',
  'Both lemon juice and tea can taste sharp or bitter, so why is tasting never a safe or reliable test for an acid or a base?',
  'Assessment focus: properties and examples of acids and bases, using litmus, universal indicator and natural indicators, reading the pH scale, preparing a plant indicator, and neutralisation uses.',
  [
    'Step 1: Collect a few safe household liquids in clean labelled cups: lemon juice, vinegar, tap water, soap solution, baking soda solution. Reason: they are safe to touch and cover acids, neutral and alkaline cases.',
    'Step 2: Make the indicator: chop red cabbage or hibiscus petals, soak in warm water for ten minutes, strain. Reason: the coloured pigment dissolves into the water and is the indicator.',
    'Step 3: Put a little of each liquid in a clean test tube and add a few drops of the indicator. Reason: a clean tube and a small, equal volume keep the test fair.',
    'Step 4: Record the colour of each. Red cabbage: red or pink in acids, purple in neutral, blue to green in alkalis. Reason: the pigment molecule changes shape with acid or alkali, and so changes colour.',
    'Step 5: Classify each liquid and arrange them from most acidic to most alkaline. Reason: the deeper the colour change, the further the pH is from 7.',
    'Step 6: Mix drops of vinegar into the baking soda solution until the indicator turns purple, then stop. Reason: the colour at neutral shows the acid and base have cancelled out.'
  ],
  'Question: Red cabbage indicator is added to four solutions. P turns red, Q turns purple, R turns blue-green, S turns pink. Classify them and say which is closest to neutral. Working: red and pink mean acid, so P and S are acids; purple means neutral, so Q is neutral and closest to pH 7; blue-green means alkaline, so R is an alkali. Second part: a solution of pH 2 and one of pH 5 are both acids; the pH 2 solution is stronger because it is further below 7 (7 - 2 = 5 compared with 7 - 5 = 2). Common mistake: thinking that a bigger pH number means a stronger acid; a smaller number is more acidic. Another is saying neutralisation gives only water; it also gives a salt.'
));

S2.push(stop(
  'cbc_g7_sci_s2_2',
  '3.1 Human reproductive system',
  'Growing Up and How a New Life Begins',
  'The reproductive organs make gametes, and when a sperm fertilises an egg a new person starts to grow; puberty is the body getting ready for this',
  'Reproduction is the process by which living things produce young ones of their own kind, so that the species continues. Humans reproduce sexually: a male gamete (sperm) joins a female gamete (egg or ovum). Fertilisation is the joining of the two, and the new cell is called a zygote. The male reproductive system: the testes (inside the scrotum, which keeps them slightly cooler than the body) produce sperm and the hormone testosterone; the sperm duct carries sperm; glands add fluids that nourish sperm, and sperm plus fluids form semen; the urethra in the penis carries semen out (and urine at other times). The female reproductive system: the two ovaries produce eggs and the hormone oestrogen; an oviduct (Fallopian tube) carries each egg to the uterus (womb) and is where fertilisation happens; the uterus is a muscular organ with a soft lining in which the embryo grows; the cervix is the narrow neck of the uterus; the vagina is the passage that receives sperm and is the birth canal. Puberty is the time, usually between about 9 and 16 years, when hormones start the changes of becoming an adult. In boys: a deeper voice, hair on the face, underarms and pubic area, wider shoulders, and sperm production begins. In girls: breasts develop, hips widen, hair grows in the underarms and pubic area, and menstruation begins. Both also grow quickly and may have pimples and mood changes, which is normal and passes. The menstrual cycle is a repeating cycle of about 28 days (it varies from person to person). Day 1 is the first day of bleeding; the uterus lining sheds as a period for about 3 to 7 days; an egg is released from an ovary about 14 days before the next period (ovulation); the lining thickens again. If the egg is fertilised it sinks into the thickened lining (implantation) and the period stops, which is pregnancy. The embryo is nourished through the placenta and umbilical cord, and surrounded by amniotic fluid, for about 40 weeks until birth. Good hygiene is important: wash the genital area daily with clean water and mild soap, change sanitary pads often and wear clean dry underwear. Sexually transmitted infections (STIs), such as HIV, are caught through unprotected sex; the surest protection is abstaining until adulthood. Young people should talk to a parent, guardian, teacher or health worker they trust about changes and worries.',
  'Egg + sperm -> zygote; menstrual cycle about 28 days; ovulation about 14 days before the next period; pregnancy about 40 weeks',
  'Side views of the male and female reproductive systems with labels; the 28-day cycle on a calendar',
  'Clinics and health centres across Kenya give free advice and antenatal care; the school health programme teaches hygiene and how to manage a period using pads and clean water, and learners can ask the school guidance teacher about any change.',
  'Why is it helpful to understand that puberty changes are caused by hormones, and that they come at different ages for different people?',
  'Assessment focus: labelling and stating functions of the male and female organs, fertilisation, changes at puberty, the menstrual cycle, development and care of the foetus, personal hygiene and STI prevention.',
  [
    'Step 1: At puberty the pituitary gland in the brain releases hormones that tell the testes or ovaries to start working. Reason: hormones are chemical messengers carried in the blood to specific organs.',
    'Step 2: The testes make sperm continuously, and from about every month an ovary releases one egg. Reason: gametes carry half the genetic information, so that the zygote receives a full set.',
    'Step 3: The egg moves down the oviduct. If sperm are present, one sperm joins the egg there. Reason: the oviduct is narrow and lined with tiny hairs that move the egg along, and the joining of nuclei is fertilisation.',
    'Step 4: The zygote divides many times as it travels, and a ball of cells settles in the uterus lining. Reason: the thick, blood-rich lining feeds the embryo.',
    'Step 5: The placenta forms and joins the embryo to its mother through the umbilical cord. Reason: dissolved food and oxygen pass from mother to baby, and wastes pass back, although the two blood supplies stay separate.',
    'Step 6: After about 40 weeks the uterus muscles contract and the baby is born through the cervix and vagina. Reason: the contractions push the baby out; the cord is then cut and the baby breathes air.'
  ],
  'Question: A girl\'s period begins on 3 March and her cycle is regular at 28 days. When does her next period start, and about when is the egg released? How many days is a pregnancy of 40 weeks? Working: next period = 3 March + 28 days = 31 March (March has 31 days; 3 + 28 = 31). Ovulation is about 14 days before the next period: 31 - 14 = 17 March. Pregnancy: 40 weeks x 7 days = 280 days. Common mistake: thinking the egg is released on day 1 of the period; it is released roughly in the middle of the cycle. Another is saying the baby\'s blood and the mother\'s blood mix; they do not, only dissolved substances cross the placenta.'
));

S2.push(stop(
  'cbc_g7_sci_s2_1',
  '3.2 Human Excretory System',
  'Getting Rid of Waste and Keeping the Water Balance',
  'The kidneys filter the blood to make urine, and the skin and lungs also remove wastes, so the body keeps its water and chemicals in balance',
  'Excretion is the removal from the body of the waste products of the body\'s own chemical reactions (metabolism). This is different from egestion, which is passing out food that was never absorbed (faeces). The excretory organs are: the lungs, which remove carbon dioxide and some water vapour when we breathe out; the skin, which removes sweat, a mixture of water, salts and a little urea; and the kidneys, the main organs, which remove urea and excess water and salts as urine. Urea is a waste made in the liver when the body breaks down proteins. The urinary system has two kidneys at the back of the abdomen, one on each side. Blood arrives from the renal artery. Each kidney contains about a million tiny filtering tubes called nephrons. In a nephron, blood pressure forces water, urea, salts and glucose out of the blood; then the body takes back all the glucose, most of the water and the salts it needs; what remains is urine. Cleaned blood leaves through the renal vein. Urine flows down two tubes called ureters to the bladder, a muscular bag that stores it, and leaves the body through the urethra. The kidneys also keep the water and salt level steady: on a hot day you sweat more and make less, darker urine; if you drink a lot, you make more, paler urine. The skin has three layers: the epidermis (outer, protective, waterproofing), the dermis (contains sweat glands, blood vessels, nerve endings, hair roots) and fat below. Sweating cools the body: when sweat evaporates it takes heat away. To keep the system healthy: drink enough clean water, do not hold urine for long, wash daily with clean water and soap, eat less salt, and see a health worker for pain when passing urine or blood in the urine. Kidney stones and urinary infections (UTIs) are common problems; they are helped by drinking water and treated at a health facility.',
  'Blood -> kidney (nephrons) -> ureter -> bladder -> urethra; daily water intake = water lost',
  'Labelled kidney, ureter, bladder and urethra; section of skin with a sweat gland',
  'On a hot day around Lake Victoria or the Kenyan coast you sweat more and need to drink more; people working outdoors in the sun should drink clean water regularly to protect the kidneys.',
  'Why is passing faeces not called excretion, even though it is also a way of getting rid of material from the body?',
  'Assessment focus: excretion versus egestion, excretory organs and their products, the path of urine, structure of the skin, water balance, and care of the excretory organs.',
  [
    'Step 1: Cells carry out respiration and break down proteins, producing carbon dioxide, water and urea. Reason: these are waste products of metabolism, and some are poisonous if they build up.',
    'Step 2: The blood carries urea and the others to the kidneys through the renal artery. Reason: the blood is the transport system of the body.',
    'Step 3: In each nephron, water, urea, salts and glucose are filtered out under pressure. Reason: filtering is quick and removes everything small, including useful substances.',
    'Step 4: Glucose, useful salts and most of the water are taken back into the blood. Reason: the body must keep what it needs; only excess and waste should go.',
    'Step 5: The remaining urine drains down the ureters to the bladder, which stores it until it is passed out through the urethra. Reason: storage lets us choose a convenient time to empty.',
    'Step 6: Meanwhile the skin releases sweat and the lungs release carbon dioxide. Reason: these are extra routes by which the body removes waste and heat.'
  ],
  'Question: A learner takes in 2.5 litres of water in a day (drink and food). She loses 1.5 litres in urine, 0.4 litres in sweat, 0.4 litres as water vapour in breath and 0.2 litres in faeces. Is her water balance steady? Working: total loss = 1.5 + 0.4 + 0.4 + 0.2 = 2.5 litres. Intake is 2.5 litres, so intake minus loss = 2.5 - 2.5 = 0 and the balance is steady. On a hot day the sweat loss rises to, say, 1.0 litre, so total loss = 1.5 + 1.0 + 0.4 + 0.2 = 3.1 litres; to stay balanced she needs to drink 3.1 - 2.5 = 0.6 litres more, and the kidneys will make less urine to help. Common mistake: saying the kidneys make urea; urea is made in the liver and removed by the kidneys. Another is calling sweating only a cooling process; it also excretes some urea and salts.'
));

S3.push(stop(
  'cbc_g7_sci_s3_1',
  '4.1 Electrical Energy',
  'Circuits: How Electric Current Is Made to Flow',
  'Current flows only round a complete loop with a source, a path of conductors and a load, and the way the parts are joined decides how the circuit behaves',
  'Electrical energy is the energy carried by electric charges moving through a circuit. An electric current is the flow of charge, and it flows from a source of energy through a conducting path. Sources include dry cells and batteries (a battery is two or more cells joined), solar panels, generators and the mains supply from KPLC. A simple electric circuit needs a source (cell), connecting wires, a load that uses the energy (a bulb), and a switch that opens or closes the path. Current flows only when the circuit is closed, that is, a complete unbroken loop. When the switch is open the loop is broken and the bulb goes off. Circuit symbols let us draw circuits quickly: a cell is a long thin line and a short thick line, a battery is two or more cells, a bulb is a circle with a cross, a switch is a gap with a lever, a connecting wire is a straight line, and an ammeter is a circle with the letter A. A conductor lets current pass easily; metals such as copper, aluminium and iron, and graphite, are conductors. An insulator does not; plastic, rubber, glass, dry wood and dry cloth are insulators. Wires are made of copper and covered in plastic for this reason. Components can be joined in two ways. In a series circuit they are in a single loop: the same current passes through each, and if one bulb breaks, all go off. Adding more bulbs in series makes each dimmer. In a parallel circuit components are on separate branches: each bulb gets the full push of the cell, so each shines brightly, and if one bulb goes off, the others stay on. This is why houses are wired in parallel. Cells joined in series (positive to negative) add their pushes together: three 1.5 V cells give 4.5 V. Electrical energy is paid for by KPLC in units called kilowatt hours (kWh): energy in kWh = power in kW x time in hours. Safety: never touch bare wires, never use water near sockets or appliances, never fly kites or climb poles near power lines, never poke metal into a socket, and only use cables with intact insulation. Static electricity is a build-up of electric charge on a surface, for example when a comb rubbed on dry hair picks up bits of paper; lightning is a very large natural discharge, so during a thunderstorm stay indoors and away from trees and open ground.',
  'Energy (kWh) = power (kW) x time (h); cells in series: total voltage = sum of the cells',
  'Circuit diagram with symbols for cell, switch, bulb and ammeter; series and parallel branches',
  'KPLC power in homes is supplied in parallel so that one bulb failing does not turn off the lights; solar home lighting kits use a panel, a battery and bulbs; the kWh unit appears on the token or the bill.',
  'In a string of old festive lights wired in series, one bulb goes and the whole string goes dark. What does that tell you about the path of the current?',
  'Assessment focus: parts and symbols of a simple circuit, conductors and insulators, series versus parallel, combining cells, electrical safety and cost of electrical energy.',
  [
    'Step 1: Draw the circuit with symbols: cell, switch, bulb, joined by wire in one loop. Reason: symbols are quick and understood by everyone.',
    'Step 2: Close the switch. Reason: current can flow only if the loop is complete.',
    'Step 3: The chemical energy of the cell pushes charge round the loop, and the bulb filament changes electrical energy into light and heat. Reason: the load is the part that transforms the energy.',
    'Step 4: Test objects by placing them in the gap of the circuit: if the bulb lights, the object is a conductor. Reason: only a conductor completes the loop.',
    'Step 5: Add a second bulb: in series on the same loop (both dim) or in a separate branch (both bright). Reason: in series the push is shared; in parallel each branch has its own full push.',
    'Step 6: Compare what happens when you unscrew one bulb. Reason: series breaks the single loop; in parallel the other branch remains complete.'
  ],
  'Question: Three 1.5 V cells are joined in series to light a bulb. What is the total voltage? A 60 W bulb (0.06 kW) is used for 5 hours a day. How much energy in kWh does it use in a day, and what does it cost in 30 days at KSh 20 per kWh (a price chosen for the example)? Working: voltage = 1.5 + 1.5 + 1.5 = 4.5 V. Energy per day = 0.06 x 5 = 0.3 kWh. In 30 days = 0.3 x 30 = 9 kWh. Cost = 9 x 20 = KSh 180. Common mistake: joining cells positive to positive in a series chain, which cancels their push; and thinking that current is used up by the bulb. The bulb transforms energy, while the current is the same all the way round a series loop.'
));

S3.push(stop(
  'cbc_g7_sci_s3_2',
  '4.2 Magnetism',
  'Poles, Attraction and Repulsion',
  'A magnet has two poles, like poles repel and unlike poles attract, and only a few materials are attracted to a magnet',
  'A magnet is an object that attracts certain materials and, when free to turn, lines up north-south. Magnetism is this property. Magnetic materials are attracted by a magnet: iron, steel, nickel and cobalt. Non-magnetic materials are not attracted: wood, plastic, glass, paper, copper, aluminium and rubber. Every magnet has two ends, called poles, where the pull is strongest: the north-seeking pole (N) and south-seeking pole (S). The law of magnetism: like poles repel, and unlike poles attract. If you break a magnet in two, each piece has both a north and a south pole; a single pole cannot exist alone. The space around a magnet where its force can be felt is the magnetic field. It can be shown by sprinkling iron filings on paper over a magnet, or by plotting with a small compass: the lines curve from N to S outside the magnet and are most crowded at the poles, where the field is strongest. A compass is a small magnet on a pivot; its needle points to the Earth\'s magnetic north because the Earth behaves like a giant magnet. Making magnets: stroke a piece of steel many times in one direction with one pole of a magnet; or place steel inside a coil of wire carrying direct current (an electromagnet, which is stronger and can be switched off). Demagnetising: hammering, dropping or heating a magnet, or placing it in a coil carrying alternating current, scrambles the tiny magnetic groups inside and weakens it. Storage: keep bar magnets in pairs with unlike poles together and soft iron pieces (keepers) across the ends, away from heat and from hammering. Uses: compasses for navigation, magnetic catches on fridge doors, loudspeakers, electric bells, cranes in scrap yards to lift iron and steel, and separating iron from other waste. Keep magnets away from phones, credit cards and computer disks, since they can corrupt stored data.',
  'Like poles repel; unlike poles attract. Only iron, steel, nickel and cobalt are magnetic.',
  'Bar magnet with field lines and iron filings pattern; compass needle',
  'A compass guides hikers on Mount Kenya or Hell\'s Gate; scrapyards in Nairobi use big electromagnets to lift steel; the magnets in a radio loudspeaker or a fridge door seal.',
  'Why is repulsion, rather than attraction, the only sure test that an iron bar is a magnet?',
  'Assessment focus: magnetic and non-magnetic materials, the law of poles, field patterns, making and demagnetising magnets, storage and uses.',
  [
    'Step 1: Bring a known magnet near the object. If it is attracted, the object is magnetic or a magnet. Reason: both unmagnetised iron and a magnet are attracted to a magnet.',
    'Step 2: Bring one pole of the known magnet near each end of the object in turn. If either end is pushed away, the object is a magnet. Reason: only like poles can repel, and unmagnetised iron is never repelled.',
    'Step 3: Hang the magnet from a thread or float it on a cork. Reason: a free magnet turns until its N pole points north, which names its poles.',
    'Step 4: Sprinkle iron filings on paper over a bar magnet and tap the paper gently. Reason: each filing becomes a small magnet and lines up along the field, so the pattern becomes visible.',
    'Step 5: Stroke a steel needle in one direction with one end of a magnet. Reason: this lines up the tiny magnetic groups in the steel and makes it a magnet with poles at its ends.',
    'Step 6: Cut a magnet in two and test both halves. Reason: each half is a full magnet with its own two poles, showing poles come in pairs.'
  ],
  'Question: A bar P is attracted to both ends of bar Q, and bar R is repelled by one end of Q. Which bars are magnets? Working: R is repelled by Q, and repulsion occurs only between like poles of two magnets, so both Q and R are magnets. P is attracted to both ends of Q; a magnet attracts both ends of an unmagnetised iron bar, so P is magnetic but need not be a magnet; it may be just iron. Second part: a magnet is cut into 2 pieces, and then each piece is cut again; there are 4 pieces and 4 north poles and 4 south poles. Common mistake: believing that attraction proves a bar is a magnet. Another is thinking that all metals are magnetic; copper and aluminium are not.'
));

const st = (id, number, title, strandNo, strandName, icon, summary, subtopics) => ({
  id,
  number,
  title,
  strand: 'Strand ' + strandNo + ': ' + strandName,
  icon,
  status: 'available',
  summary,
  subtopics
});

const INTEGRATED_SCIENCE_G7_MAPS = [
  {
    curriculum: 'CBC',
    grade: 7,
    subject: 'Integrated Science',
    code: 'ISCI-G7',
    trackPathway: 'Core',
    title: 'CBE Grade 7 (Junior School) Integrated Science Metro Line',
    description: 'Strands follow the KICD Grade 7 Integrated Science design (revised 2024).',
    stations: [
      st('cbc_g7_sci_s1', 1, '1.0 Scientific Investigation', '1.0', 'Scientific Investigation', 'Lab', 'The scientific method, safe working in the laboratory, and choosing and reading apparatus.', S1),
      st('cbc_g7_sci_s5', 2, '2.0 Mixtures, Elements and Compounds', '2.0', 'Mixtures, Elements and Compounds', 'Matter', 'Mixtures and how to separate them, and acids, bases and indicators.', S5),
      st('cbc_g7_sci_s2', 3, '3.0 Living things and the Environment', '3.0', 'Living things and the Environment', 'Life', 'The human reproductive system and the human excretory system.', S2),
      st('cbc_g7_sci_s3', 4, '4.0 Force and Energy', '4.0', 'Force and Energy', 'Energy', 'Electric circuits and electrical energy, and magnetism.', S3)
    ]
  }
];

module.exports = { maps: INTEGRATED_SCIENCE_G7_MAPS, retiredIds: [] };
