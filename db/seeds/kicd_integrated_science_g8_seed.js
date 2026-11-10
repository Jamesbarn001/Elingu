// CBC Junior School Integrated Science, Grade 8 (KICD design, July 2024).
// Strands and sub-strands follow the KICD summary table (docs/audits/kicd_verified_from_site.md).
// Id cbc_g8_sci_s1_1 (separation by distillation) keeps its teaching ladder and sits under 1.2 Physical and chemical changes.

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps, workedExample) {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: { title: primerTitle, tagline, body, formula, visualBadge, realWorldContext, explanationSteps: steps, workedExample },
    socraticPrompt,
    formulaBadge: formula,
    examFocus
  };
}

const S1 = [];
const S2 = [];
const S3 = [];

S1.push(stop(
  'cbc_g8_sci_s1_2',
  '1.1 Elements and Compounds',
  'Atoms, Elements and Compounds',
  'An element has one kind of atom; a compound has different kinds of atom joined chemically in a fixed ratio',
  'All matter is made of very small particles called atoms. An element is a pure substance made of only one kind of atom, and it cannot be broken into simpler substances by chemical means. Examples are iron (Fe), copper (Cu), oxygen (O), carbon (C) and sodium (Na). Each element has a symbol of one or two letters; the first letter is always capital and the second small, so Co is cobalt but CO is carbon and oxygen. Elements are grouped as metals (shiny, conduct heat and electricity, can be hammered into shape, such as iron and aluminium) and non-metals (usually dull, poor conductors, brittle as solids, such as sulfur and carbon). A compound is a pure substance made when atoms of two or more different elements join chemically in a fixed ratio. Water is H2O: every molecule has 2 hydrogen atoms and 1 oxygen atom. Carbon dioxide is CO2 and common salt is NaCl. A compound has properties very different from the elements in it: sodium is a soft metal and chlorine is a poisonous gas, yet NaCl is the safe salt in your food. A compound can only be split by a chemical reaction, while a mixture (such as soil and water) can be separated by physical means and has no fixed ratio. The small number written lower right of a symbol (the 2 in H2O) tells how many atoms of that element are in one molecule; with no number the count is 1.',
  'Formula: the subscript number counts atoms of that element, e.g. C6H12O6 has 6 C + 12 H + 6 O = 24 atoms',
  'Atoms of one kind (element) | different atoms joined in a fixed ratio (compound)',
  'Water from the tap is H2O, the salt in your sukuma wiki is NaCl, the charcoal in a jiko is mostly carbon (C), and the iron sheets on a roof are mostly the element iron, which slowly combines with oxygen to form rust, a compound.',
  'Hydrogen burns and oxygen helps things burn, yet water, which is made of both, puts out fires. What does this tell you about what happens to the properties of elements when they form a compound?',
  'Assessment focus: symbols of the first 20 elements, telling elements from compounds and mixtures, reading a formula to count atoms, and comparing a compound with its elements.',
  [
    'Step 1: Look at the substance and ask whether it is one substance or several mixed. Reason: only pure substances can be elements or compounds; a mixture such as air is not either.',
    'Step 2: If it is pure, check whether it contains one kind of atom or more. Reason: one kind of atom means an element; two or more kinds chemically joined means a compound.',
    'Step 3: Write the formula using symbols with a capital first letter. Reason: Co (cobalt) and CO (carbon monoxide) are different substances, so capitals matter.',
    'Step 4: Read each subscript to count atoms. Reason: the subscript shows the fixed ratio in which atoms join, which is what makes the compound that compound.',
    'Step 5: Multiply out any bracket or coefficient before adding. Reason: a number in front, as in 3H2O, multiplies the whole formula.'
  ],
  'Question: Glucose is C6H12O6. How many atoms are in one molecule, and which elements make it? Line 1: carbon C = 6 atoms. Line 2: hydrogen H = 12 atoms. Line 3: oxygen O = 6 atoms. Line 4: total = 6 + 12 + 6 = 24 atoms, made of 3 elements. Second part: how many atoms are in 3H2O? Each H2O has 2 + 1 = 3 atoms, and there are 3 molecules, so 3 x 3 = 9 atoms (6 hydrogen and 3 oxygen). Common mistake: calling air or salty water a compound because it looks uniform. They are mixtures: their parts are not joined in a fixed ratio and can be separated physically.'
));

S1.push(stop(
  'cbc_g8_sci_s1_1',
  '1.2 Physical and chemical changes',
  'Physical and Chemical Changes, and Separating Mixtures',
  'A physical change makes no new substance and can often be reversed; a chemical change makes new substances',
  'A physical change alters the form or state of a substance but no new substance is made. Melting ice, dissolving sugar in tea, bending a wire and boiling water are physical changes; the particles stay the same and the change can usually be reversed. A chemical change (a chemical reaction) makes one or more new substances with different properties. Burning charcoal, rusting iron, cooking an egg, milk turning sour and baking a cake are chemical changes. Signs of a chemical change are a new colour, a gas given off, a temperature change not caused by heating, light, or a solid forming; but the only sure test is that a new substance exists and cannot easily be turned back. Because mixtures are only physically mingled, they are separated by physical changes that use a difference in a property. Filtration separates an insoluble solid from a liquid. Evaporation recovers a dissolved solid, such as salt from sea water. Simple distillation recovers the liquid itself: it is boiled, the vapour is cooled in a condenser, and pure liquid drips into a receiver. Fractional distillation separates liquids with different boiling points, for example ethanol (78 degrees C) and water (100 degrees C): the heated mixture gives vapour richer in the lower-boiling liquid, which rises up the fractionating column and condenses first at the top, while the higher-boiling liquid condenses on the column and drips back. Crude oil is separated into petrol, kerosene and diesel the same way. Paper chromatography separates coloured substances because each travels up the paper at its own speed, depending on how well it dissolves in the solvent and how strongly it sticks to the paper. The retention factor Rf compares how far a spot moved with how far the solvent moved.',
  'Rf = distance moved by the spot / distance moved by the solvent front (no units, always between 0 and 1)',
  'Physical: same substance, new form | Chemical: new substance | Separation uses a difference in property',
  'Salt farmers at Kilifi and Malindi evaporate sea water to get salt. Water in a pot dries up when you boil it (physical), but maize flour turns to hard ugali on cooking and charcoal turns to ash on a jiko (chemical). Kenyan refineries separate crude oil into fuels by fractional distillation.',
  'When you boil water, bubbles rise and steam escapes, and when you burn wood, gases escape too. How could you decide which of the two made a new substance?',
  'Assessment focus: classifying changes as physical or chemical with a reason, choosing a separation method for a given mixture, explaining fractional distillation, and calculating and interpreting Rf from a chromatogram.',
  [
    'Step 1: Ask what the substance is before and after the change. Reason: a chemical change always leaves a different substance, a physical change does not.',
    'Step 2: Check whether the change can easily be reversed. Reason: cooling steam gives water again, but ash cannot be turned back into wood, so it points to the type of change.',
    'Step 3: For a mixture, find a property that differs between the parts (size, solubility, boiling point, colour attraction). Reason: separation by physical means only works by exploiting a difference.',
    'Step 4: Pick the method that uses that difference: filtration for particle size, evaporation for dissolved solid, distillation for boiling point, chromatography for dissolved colours. Reason: each method is built around one difference.',
    'Step 5: Check the result: pure liquid has a steady boiling point, and a pure dye gives one spot. Reason: a mixture shows a range of boiling points or several spots.'
  ],
  'Question: In a chromatography test on black ink, the solvent front moved 8.0 cm from the starting line. One dye spot moved 6.0 cm and another moved 2.0 cm. Find Rf for each. Line 1: Rf = distance of spot / distance of solvent. Line 2: first spot: 6.0 / 8.0 = 0.75. Line 3: second spot: 2.0 / 8.0 = 0.25. Line 4: two different Rf values mean the ink holds at least two different dyes, so it is a mixture. Distillation example: a mixture of ethanol (boils at 78 degrees C) and water (100 degrees C) is heated slowly. Ethanol boils off first, so while the thermometer reads near 78 the distillate is mostly ethanol; when the reading climbs toward 100 degrees C, the receiver is changed because water is now coming over. Because the two liquids mix fully, a single distillation never gives 100 percent pure ethanol, so the column is used to improve the separation. Safety: ethanol is flammable, so at school only the teacher heats it, on a water bath and never over a naked flame. Learners can safely do chromatography of felt-pen ink with water on filter paper, and evaporate salt solution in a warm place. Common mistake: drawing the starting line in ink or letting the solvent level cover the line, which washes the dyes into the solvent; use pencil and keep the solvent level below the line.'
));

S1.push(stop(
  'cbc_g8_sci_s1_3',
  '1.3 Classes of fire',
  'The Fire Triangle and Choosing the Right Extinguisher',
  'A fire needs fuel, oxygen and heat; remove one and it goes out, but the right method depends on what is burning',
  'Fire is combustion: a fast chemical reaction in which a fuel combines with oxygen and gives out heat and light. Three things must be present together, and these make the fire triangle: fuel (something that can burn), oxygen (from the air) and heat (enough to start it, called the ignition temperature). Remove any one side and the fire goes out. Taking away fuel is starving, taking away oxygen is smothering, and taking away heat is cooling. Fires are put into classes by the type of fuel, because the wrong extinguisher can make a fire worse. Class A fires are solids such as wood, paper, cloth and grass; water cools them well. Class B fires are flammable liquids such as petrol, paraffin and paint; water makes them spread because the liquid floats and burns on top, so foam, dry powder or carbon dioxide is used. Class C fires are flammable gases such as cooking gas (LPG); the first step is to switch off the gas supply. Class D fires are metals such as magnesium, which need special dry powder or dry sand. Electrical fires (often called Class E) involve live equipment; water conducts electricity and can shock the person using it, so switch off the power if it is safe, and use carbon dioxide or dry powder. Class F fires are hot cooking oils and fats; water is dangerous because it sinks, turns to steam suddenly and throws burning oil out, so use a fire blanket or a wet chemical extinguisher. Extinguishers are colour banded: red body for water, cream for foam, blue for dry powder, black for carbon dioxide.',
  'Fire = fuel + oxygen + heat | remove one side to extinguish: starve (fuel), smother (oxygen), cool (heat)',
  'Triangle with Fuel, Oxygen, Heat | Class A solids, B liquids, C gases, D metals, electrical, F oils',
  'Kerosene and charcoal stoves in homes, LPG cylinders in kitchens, petrol stations in towns, and electrical faults on KPLC wiring are real fire risks. A wet sack or fire blanket over a pan of burning oil smothers it, and sand is used on small fuel fires.',
  'A pan of cooking oil catches fire on the jiko. Which side of the fire triangle can you remove most safely, and why is pouring water the worst choice?',
  'Assessment focus: naming the three sides of the fire triangle, matching each class of fire to a safe extinguisher with a reason, and explaining starving, smothering and cooling.',
  [
    'Step 1: Stay safe: shout a warning, leave the area, and call for help (in Kenya, 999 or 112). Reason: your life matters more than property, and a small fire grows quickly.',
    'Step 2: Decide what is burning (solid, liquid, gas, metal, electrical or oil). Reason: the fuel decides which extinguisher is safe.',
    'Step 3: Match the method to the class: water or sand for solids, foam or powder for liquids, switch off for gas, switch off power then CO2 or powder for electrical, blanket for oil. Reason: each method removes the right side of the triangle without causing harm.',
    'Step 4: Only fight a small fire, with an exit behind you. Reason: a trained adult is safer, and large fires produce poisonous smoke.',
    'Step 5: After it is out, check for re-ignition and report it. Reason: hot fuel can restart the fire.'
  ],
  'Question: Match the fire to a safe method and say which side of the triangle is removed. (a) Dry grass burning on a shamba: water or beating with a wet sack; this removes heat. (b) Petrol burning on the ground: foam or dry powder; this covers the surface and removes oxygen, while water would spread the burning petrol. (c) Cooking oil in a pan: switch off the heat and cover with a fire blanket or a tight lid; this removes oxygen. (d) A smoking socket with a phone charger plugged in: switch off at the mains if safe, then use a CO2 extinguisher; water could carry current to you. Check: in each case exactly one side of the triangle is removed, which is why the fire goes out. Safety: no learner lights a real fire in class; the teacher may show a candle covered by a glass, which goes out when the oxygen is used up. Common mistake: believing water puts out every fire. It works by cooling, which is wrong for oil, petrol and live electrical fires.'
));

S2.push(stop(
  'cbc_g8_sci_s2_1',
  '2.1 The Cell',
  'The Cell: The Unit of Life',
  'All living things are made of cells, each with parts that do particular jobs',
  'A cell is the smallest unit of a living thing that can carry out the processes of life. Cells are too small to see with the eye, so we use a light microscope. Its total magnification is the eyepiece lens power multiplied by the objective lens power. Both plant and animal cells have a cell membrane (a thin skin that controls what enters and leaves), cytoplasm (a jelly where chemical reactions happen), a nucleus (holds the instructions, called genes, and controls the cell) and mitochondria (release energy from food by respiration; seen only with stronger microscopes). Plant cells also have a cell wall of cellulose outside the membrane (gives shape and strength), a large permanent vacuole filled with cell sap (stores water and keeps the cell firm) and, in the green parts, chloroplasts that contain chlorophyll and make food by photosynthesis. Animal cells have no cell wall or chloroplasts and may have only small vacuoles. Cells that do the same job form a tissue, tissues form an organ (such as the heart or a leaf), and organs working together form a system. Cells are specialised: a red blood cell has no nucleus, so it has room for haemoglobin to carry oxygen; a root hair cell has a long thin extension that increases the surface for taking in water; a nerve cell is long to carry messages; a palisade leaf cell is packed with chloroplasts. Structure always matches function.',
  'Total magnification = eyepiece x objective | Actual size = size in drawing / magnification',
  'Plant cell: wall, membrane, nucleus, cytoplasm, vacuole, chloroplast | Animal cell: no wall, vacuole or chloroplast',
  'The green leaves of kale (sukuma wiki) in your shamba are full of chloroplast-containing cells, while the meat you eat is animal cells without them. Root hair cells in maize take in water from the soil, and red blood cells carry oxygen when a runner trains at altitude in Iten.',
  'Why would a cell wall be useful to a tall maize stalk but a problem to a cell in your leg muscle that must change shape?',
  'Assessment focus: labelling and comparing plant and animal cells, giving the function of each part, calculating magnification and actual size, and linking specialised cells to their jobs.',
  [
    'Step 1: Place a thin sample on a slide with a drop of water, add a cover slip at an angle. Reason: a thin layer lets light pass through, and an angled cover slip avoids trapping air bubbles.',
    'Step 2: Start with the lowest-power objective and focus with the coarse knob, then the fine knob. Reason: the low power has a wide field to find the sample, and focusing away from the slide stops the lens hitting it.',
    'Step 3: Switch to a higher objective, refocus with the fine knob only. Reason: the lens is closer to the slide at high power, so coarse focus could break it.',
    'Step 4: Draw what you see with a sharp pencil, label with straight lines, and note the magnification. Reason: a labelled drawing records the structures you can name.',
    'Step 5: Compare with the other cell type and list differences. Reason: wall, large vacuole and chloroplasts are the key differences between plant and animal cells.'
  ],
  'Question: A learner uses a x10 eyepiece and a x40 objective. A cell is drawn 6.0 cm long. Find magnification and the real length of the cell. Line 1: total magnification = 10 x 40 = x400. Line 2: actual size = drawing size / magnification = 6.0 cm / 400. Line 3: 6.0 / 400 = 0.015 cm. Line 4: 0.015 cm = 0.15 mm = 150 micrometres (1 mm = 1000 micrometres). Check: 150 micrometres x 400 = 60 000 micrometres = 6.0 cm. Safe practical: a thin piece of onion skin or leaf in water, observed under a microscope with the teacher handling any stain. Common mistake: saying plant cells have no cell membrane because they have a wall. All cells have a membrane; the wall is an extra layer outside it.'
));

S2.push(stop(
  'cbc_g8_sci_s2_2',
  '2.2 Movement of materials in and out of the cell',
  'Diffusion, Osmosis and Active Transport',
  'Materials cross the cell membrane by diffusion and osmosis without energy, and by active transport using energy',
  'Cells must take in food, water and oxygen and get rid of wastes, so materials must move across the cell membrane. The membrane is partially permeable: it lets small particles such as water through but holds back large ones. Diffusion is the movement of particles from a region where they are many (high concentration) to where they are few (low concentration), until they are spread evenly. It happens because particles move randomly all the time, and it needs no energy from the cell. Oxygen moves into cells and carbon dioxide moves out by diffusion; a drop of ink spreading in water and the smell of cooking drifting through a house are the same process. Osmosis is the diffusion of water only, through a partially permeable membrane, from a region of high water concentration (a dilute solution) to a region of low water concentration (a concentrated solution). A plant cell placed in pure water takes in water and becomes firm (turgid), held from bursting by its cell wall. In a strong salt or sugar solution it loses water, the membrane pulls away from the wall and the cell becomes limp (flaccid); this is plasmolysis. An animal cell has no wall, so in pure water it can burst, and in strong solution it shrinks. Active transport moves particles against the concentration difference, from low to high, and needs energy from respiration; root hair cells use it to take mineral salts, such as nitrates, from the soil when the soil has fewer than the cell. Factors that speed diffusion: a bigger concentration difference, higher temperature, a larger surface area and a shorter distance.',
  'Diffusion and osmosis: high to low concentration, no energy | Active transport: low to high, uses energy | % change in length = (new - old) / old x 100',
  'Diffusion/osmosis: down the gradient | Active transport: against the gradient with energy',
  'Wilting vegetables in the sun at the market revive when sprinkled with water as their cells take water in by osmosis. Farmers know that too much fertiliser burns crops because the strong solution in the soil draws water out of root cells. Salting meat to preserve it (nyama choma and dried fish) works by drawing water from bacteria cells.',
  'Why do wilted spinach leaves become crisp when soaked in clean water, but a slug sprinkled with salt shrivels?',
  'Assessment focus: defining diffusion, osmosis and active transport, predicting what happens to cells in different solutions, and calculating percentage change in a potato experiment.',
  [
    'Step 1: Decide which side has the higher concentration of the substance (for osmosis, of water). Reason: net movement is always from the side with more to the side with less.',
    'Step 2: Check whether a membrane is involved and what can pass through it. Reason: osmosis needs a partially permeable membrane, and only water is said to move in osmosis.',
    'Step 3: State the direction of net movement. Reason: particles move both ways, but more move down the gradient, so the net result is toward the lower concentration.',
    'Step 4: Predict the effect on the cell: swelling and turgid, or shrinking and flaccid. Reason: water gain or loss changes the volume of the vacuole and cytoplasm.',
    'Step 5: If movement is from low to high concentration, name it active transport and say it needs energy. Reason: moving against the gradient cannot happen by chance alone.'
  ],
  'Question: Two potato strips are each 5.0 cm long. One is left in distilled water and measures 5.3 cm after 30 minutes. The other is left in strong salt solution and measures 4.7 cm. Find the percentage change for each. Line 1: percentage change = (new length - old length) / old length x 100. Line 2: water strip: (5.3 - 5.0) / 5.0 x 100 = 0.3 / 5.0 x 100 = +6 percent. Line 3: salt strip: (4.7 - 5.0) / 5.0 x 100 = -0.3 / 5.0 x 100 = -6 percent. Line 4: the strip in water gained water by osmosis because the potato cells have a lower water concentration than pure water; the strip in salt lost water because the salt solution had a lower water concentration than the cells. Line 5: somewhere between the two, a solution with no change would match the cell sap. Safe practical: use clean potato and salt or sugar solution only; wash hands afterwards and never taste the strips. Common mistake: saying salt moves into the potato. In this test it is water that moves, and the salt solution outside cannot cross the membrane easily.'
));

S2.push(stop(
  'cbc_g8_sci_s2_3',
  '2.3 Reproduction in human beings',
  'How Humans Reproduce: From Gametes to Birth',
  'A sperm cell and an egg cell join at fertilisation to start a new human life',
  'Reproduction is how living things make new individuals of their own kind. In humans it uses two sex cells called gametes. The male reproductive system makes sperm cells in the testes, which hang in a bag called the scrotum so they stay slightly cooler than body temperature. Sperm travel along the sperm duct, mix with fluids from glands to form semen, and leave the body through the urethra in the penis. The female system has two ovaries that store and release egg cells (ova), two oviducts (fallopian tubes) where fertilisation usually happens, a uterus (womb) where a baby grows, and a vagina. During puberty (about ages 10 to 15) hormones cause changes: in girls the breasts develop, hips widen and menstruation begins; in boys the voice deepens, shoulders broaden and sperm production starts. In girls a menstrual cycle of about 28 days happens: an egg is released from an ovary about day 14 (ovulation), the uterus lining thickens to receive it, and if no egg is fertilised the lining breaks down and leaves the body as a period of about 3 to 7 days. Fertilisation is when a sperm nucleus joins an egg nucleus, forming a zygote that divides into a ball of cells and sinks into the thick uterus lining (implantation). The developing baby, called an embryo and later a foetus, is fed through the placenta, an organ where blood of mother and baby come close and exchange food and oxygen (not mixing). The umbilical cord links baby to placenta and the amniotic fluid cushions the baby. Pregnancy lasts about 40 weeks from the mother\'s last period and ends in birth. A healthy pregnancy needs good food, rest, clinic visits and no alcohol, smoking or unprescribed drugs. Sexually transmitted infections such as HIV are passed by unprotected sex; the sure way to avoid them is abstinence, and a person who is worried should go to a health worker.',
  'Gametes: sperm (male) + egg (female) -> zygote -> embryo -> foetus -> baby | Pregnancy about 280 days from last period',
  'Testes -> sperm duct -> urethra | Ovary -> oviduct (fertilisation) -> uterus (implantation, growth)',
  'Antenatal clinics in every county give pregnant mothers iron tablets, tetanus injections and check growth. Breast milk is the best first food for a baby for the first six months. Puberty talks in school help learners understand body changes as normal.',
  'The placenta lets food and oxygen pass from mother to baby but keeps their blood separate. Why would it be a problem if the two bloods simply mixed?',
  'Assessment focus: naming and giving the function of male and female reproductive parts, describing fertilisation, implantation and development, the menstrual cycle, changes at puberty, and care in pregnancy.',
  [
    'Step 1: Sperm are made in the testes and egg cells are released from an ovary. Reason: gametes carry half the genetic instructions from each parent.',
    'Step 2: Sperm swim through the uterus into an oviduct to reach an egg. Reason: fertilisation needs a sperm to meet the egg, which is released only about once a month.',
    'Step 3: A sperm nucleus joins the egg nucleus, forming a zygote. Reason: the zygote has a full set of instructions from both parents.',
    'Step 4: The zygote divides as it moves down and implants in the thick uterus lining. Reason: the lining supplies food and oxygen for the embryo.',
    'Step 5: The placenta and umbilical cord feed the foetus for about 40 weeks until birth. Reason: the foetus cannot breathe or eat for itself, so substances pass across the placenta.'
  ],
  'Question: A mother\'s last period began on 1 March 2025. About when is the baby due? Line 1: pregnancy lasts about 40 weeks counted from the last period start. Line 2: 40 x 7 = 280 days. Line 3: from 1 March, 280 days later is 6 December 2025 (March to November has 275 days, plus 5 more days). Line 4: since ovulation and fertilisation happen around day 14 of the cycle, the baby has actually grown for about 280 - 14 = 266 days, or 38 weeks. Line 5: only about 5 percent of babies are born exactly on the due date, so it is a guide. Common mistake: believing the placenta mixes the mother\'s blood with the baby\'s blood. They stay in separate vessels, and food, oxygen and wastes pass across thin walls by diffusion.'
));

S3.push(stop(
  'cbc_g8_sci_s3_1',
  '3.1 Transformation of Energy',
  'Energy Changes Form but Is Never Lost',
  'Energy cannot be created or destroyed; it is changed from one form to another, and some always becomes waste heat',
  'Energy is the ability to do work or cause change, and it is measured in joules (J). It exists in forms: kinetic (energy of movement), potential (stored energy due to position, such as water in a high tank, or due to stretching), chemical (stored in food, fuel and batteries), heat (thermal), light, sound, electrical and nuclear. Energy transformation means changing from one form to another. A solar panel changes light to electrical energy; a bulb changes electrical to light and heat; a jiko changes the chemical energy in charcoal to heat and light; a speaker changes electrical to sound; a dam changes the potential energy of water to kinetic energy in the turbine, then to electrical energy in the generator. The law of conservation of energy states that energy is never created or destroyed, only changed from one form to another; the total stays the same. In every change, some energy becomes heat spread into the surroundings and cannot be used again, so it is called wasted energy. Efficiency compares the useful energy out with the total energy put in. Sources are renewable (they are replaced naturally: sun, wind, flowing water, geothermal, biomass) or non-renewable (used faster than they form: coal, petroleum, natural gas). Kenya produces much of its electricity from geothermal (Olkaria), hydro (Seven Forks) and wind (Lake Turkana), which are low in air pollution and renewable.',
  'Efficiency (%) = useful energy out / total energy in x 100 | Total energy in = useful out + wasted',
  'Energy chain: Sun -> plant (chemical) -> food -> muscles (kinetic) -> heat',
  'Geothermal wells at Olkaria in Naivasha, the wind farm at Lake Turkana, solar home lighting in rural homes, and the energy chain from the sun to maize to ugali to a runner are everyday Kenyan examples.',
  'A phone charger feels warm after charging for an hour. Where did that heat come from, and was the energy lost forever or just changed?',
  'Assessment focus: naming energy forms, writing energy chains, stating the law of conservation, calculating efficiency, and comparing renewable and non-renewable sources.',
  [
    'Step 1: Identify the form of energy at the start and at the end. Reason: a transformation is only described once both ends are named.',
    'Step 2: Write the chain with arrows, such as chemical -> heat -> kinetic -> electrical. Reason: this shows each step so none is missed.',
    'Step 3: Name the useful output and the wasted energy. Reason: the wasted heat is part of the total and must be counted.',
    'Step 4: Check that useful + wasted = total in. Reason: this is the law of conservation of energy, and it shows an error in the numbers if it fails.',
    'Step 5: Divide useful by total and multiply by 100 for efficiency. Reason: the percentage tells you how well the device uses energy, and it can never exceed 100 percent.'
  ],
  'Question: A small electric motor in a water pump takes in 500 J of electrical energy. It lifts water, which gains 350 J, and the rest is heat and sound. Find the wasted energy and the efficiency. Line 1: energy wasted = total in - useful out = 500 - 350 = 150 J. Line 2: check useful + wasted = 350 + 150 = 500 J, which equals the energy in. Line 3: efficiency = 350 / 500 x 100. Line 4: 350 / 500 = 0.7, and 0.7 x 100 = 70 percent. Line 5: the 150 J is not destroyed, it warmed the motor and air. Energy chain for the pump: electrical -> kinetic (motor) -> potential (raised water), with heat and sound as waste. Common mistake: saying energy is used up. Energy is not used up; it is changed into other forms, usually less useful ones such as spread-out heat.'
));

S3.push(stop(
  'cbc_g8_sci_s3_2',
  '3.2 Pressure',
  'Pressure in Solids, Liquids and Gases',
  'Pressure is the force pressing on each unit of area; the same force on a smaller area gives more pressure',
  'Force is a push or a pull, measured in newtons (N). Weight is the force of gravity on an object; on Earth about 10 N for each kilogram (the gravitational field strength g is about 10 N/kg). Pressure is the force acting normally (at right angles) on a surface divided by the area of that surface. Its unit is the pascal (Pa), where 1 Pa = 1 N per square metre (N/m2). A small area gives large pressure: a sharp knife cuts easily because the whole force is pushed through a very thin edge, and a nail enters wood point first for the same reason. A wide area gives small pressure: a camel has broad feet that do not sink in sand, and a tractor uses wide tyres on soft shamba soil. Liquids also press on the walls and bottom of their container, and the pressure increases with depth and with density, but it does not depend on the shape of the container. At one depth the pressure acts equally in all directions. A dam wall is thicker at the bottom for this reason. Pressure in a liquid equals depth x density x g. Gases press as well: air has weight, so the atmosphere presses on us, about 100 000 Pa at sea level, and this pressure decreases as you climb higher, such as up Mount Kenya, because less air is above you. We feel no crushing because the fluids inside our bodies push outwards with the same pressure. Drinking through a straw works because sucking lowers the pressure in the straw and the atmosphere pushes the drink up.',
  'Pressure = Force / Area (P = F/A) | Liquid pressure = depth x density x g (P = hρg)',
  'Same force, small area = high pressure | Same force, big area = low pressure | Pressure grows with depth',
  'A person in high heels or a thin stiletto sinks into soft ground more than in flat shoes, a hydraulic jack lifts a matatu using liquid pressure, a water tank on a high stand gives good pressure at the tap, and a diver or swimmer feels more pressure on the ears at the bottom of Lake Victoria than near the surface.',
  'A woman stands on soft mud first in a pair of heels and then barefoot. Her weight is the same both times. Why does she sink more in the heels?',
  'Assessment focus: calculating pressure from force and area, explaining everyday examples of high and low pressure, and calculating liquid pressure from depth.',
  [
    'Step 1: Find the force pressing on the surface (for weight, mass in kg x 10 N/kg). Reason: pressure is built from force, and weight is the force of gravity.',
    'Step 2: Find the area in contact, using area = length x width in metres. Reason: the unit pascal needs area in m2, so convert cm to m first.',
    'Step 3: Divide force by area. Reason: pressure is force on each unit of area.',
    'Step 4: State the unit as Pa (N/m2). Reason: unit checks catch mistakes, and a force alone is in N, not Pa.',
    'Step 5: For liquids, use depth x density x g with density in kg/m3. Reason: pressure builds up with the weight of liquid above that point.'
  ],
  'Question: A block of mass 2 kg (use g = 10 N/kg) has faces 20 cm by 10 cm, 10 cm by 5 cm and 20 cm by 5 cm. Find the pressure when it rests on its largest face and on its smallest face. Line 1: weight = 2 x 10 = 20 N. Line 2: largest face: 20 cm x 10 cm = 0.20 m x 0.10 m = 0.02 m2. Line 3: P = 20 / 0.02 = 1000 Pa. Line 4: smallest face: 10 cm x 5 cm = 0.10 m x 0.05 m = 0.005 m2. Line 5: P = 20 / 0.005 = 4000 Pa. The small face gives 4 times the pressure because its area is 4 times smaller. Liquid example: find the pressure due to water at 2 m depth in a tank (density 1000 kg/m3). P = 2 x 1000 x 10 = 20 000 Pa, in addition to the atmosphere above. Common mistake: using the area in cm2 with a force in newtons and still calling the answer Pa. Convert to m2 first, since 1 m2 = 10 000 cm2. Safe practical: press a pencil point-end and flat-end on plasticine with the same force; never press a sharp point on skin.'
));

const G8_INTEGRATED_SCIENCE_MAPS = [
  {
    curriculum: 'CBC',
    grade: 8,
    subject: 'Integrated Science',
    code: 'ISCI-G8',
    trackPathway: 'Core',
    title: 'CBE Grade 8 (Junior School) Integrated Science Metro Line',
    stations: [
      {
        id: 'cbc_g8_sci_s1',
        number: 1,
        title: '1.0 Mixtures, Elements and Compounds',
        strand: 'Strand 1.0: Mixtures, Elements and Compounds',
        icon: 'Matter',
        status: 'available',
        summary: 'Elements and compounds, physical and chemical changes with separation of mixtures, and classes of fire.',
        subtopics: S1
      },
      {
        id: 'cbc_g8_sci_s2',
        number: 2,
        title: '2.0 Living Things and the Environment',
        strand: 'Strand 2.0: Living Things and the Environment',
        icon: 'Life',
        status: 'available',
        summary: 'The cell, movement of materials in and out of the cell, and reproduction in human beings.',
        subtopics: S2
      },
      {
        id: 'cbc_g8_sci_s3',
        number: 3,
        title: '3.0 Force and Energy',
        strand: 'Strand 3.0: Force and Energy',
        icon: 'Energy',
        status: 'available',
        summary: 'Transformation of energy and pressure in solids, liquids and gases.',
        subtopics: S3
      }
    ]
  }
];

module.exports = { maps: G8_INTEGRATED_SCIENCE_MAPS, retiredIds: [] };
