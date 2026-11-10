// CBC Junior School Integrated Science, Grade 9 (KICD design, July 2024).
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
  'cbc_g9_sci_s1_1',
  '1.1 Structure of the atom',
  'Protons, Neutrons, Electrons and Electron Shells',
  'An atom has a small dense nucleus of protons and neutrons, with electrons in shells around it',
  'Everything around you is made of tiny particles called atoms. An atom has a centre called the nucleus, which holds two kinds of particles: protons (positive charge, relative mass 1) and neutrons (no charge, relative mass 1). Around the nucleus, electrons (negative charge, almost no mass) move in regions called energy levels or shells. An atom has no overall charge because it has equal numbers of protons and electrons. The atomic number (Z) is the number of protons; it identifies the element, so every atom with 6 protons is carbon. The mass number (A) is the number of protons plus neutrons, so neutrons = A - Z. Atoms of the same element with different numbers of neutrons are called isotopes. Electrons fill shells from the inside out. The first shell holds at most 2 electrons, the second at most 8, and for the first 20 elements the third shell takes 8 before the fourth starts. We write the arrangement as numbers; for example sodium (Z = 11) is 2.8.1. The electrons in the outermost shell are the valence electrons; they decide how the element reacts. The number of valence electrons gives the group of the element (groups 1 to 7; 8 outer electrons is group 8), and the number of occupied shells gives its period. An atom with a full outer shell (helium 2, neon 2.8, argon 2.8.8) is very stable and unreactive. Other atoms gain, lose or share electrons to reach a full outer shell, which is why chemical bonds form.',
  'Neutrons = Mass number (A) - Atomic number (Z)  |  Electrons in a neutral atom = Z',
  'Bohr diagram: nucleus with p and n, circles for shells holding 2, 8, 8 electrons',
  'Table salt used in every Kenyan kitchen is sodium chloride: sodium has 1 outer electron and chlorine has 7, so sodium gives one electron to chlorine and both reach a full outer shell. Neon lights in shop signs glow because neon is a stable gas with a full outer shell.',
  'Argon (2.8.8) hardly reacts with anything, but sodium (2.8.1) reacts violently with water. What in their electron arrangements could explain this difference?',
  'Assessment focus: finding protons, neutrons and electrons from Z and A, writing electron arrangements for elements 1 to 20, drawing shell diagrams, and stating the group and period from the arrangement.',
  [
    'Step 1: Read the atomic number Z. Reason: Z is the number of protons, and in a neutral atom the number of electrons is the same.',
    'Step 2: Find neutrons using A - Z. Reason: the mass number counts protons and neutrons together, so removing the protons leaves the neutrons.',
    'Step 3: Place electrons in shells: 2 in the first, then up to 8 in the second, then up to 8 in the third. Reason: electrons fill the lowest-energy shell nearest the nucleus first.',
    'Step 4: Count the electrons in the last occupied shell. Reason: these valence electrons give the group number.',
    'Step 5: Count the occupied shells. Reason: the number of shells equals the period number.'
  ],
  'Question: An element has atomic number 12 and mass number 24. Find its protons, neutrons and electrons, its electron arrangement, group and period. Working: protons = Z = 12. Electrons in a neutral atom = 12. Neutrons = A - Z = 24 - 12 = 12. Fill shells: first shell 2, remaining 10; second shell 8, remaining 2; third shell takes 2. Arrangement 2.8.2. Valence electrons = 2, so group 2. Three occupied shells, so period 3. The element is magnesium. It tends to lose its 2 outer electrons to become Mg2+ with arrangement 2.8. Common mistake: writing 12 electrons as 2.10 by putting too many in the second shell. The second shell holds only 8. Another mistake is to assume neutrons always equal protons; that happens to be true here but not for chlorine-35 (17 protons, 18 neutrons).'
));

S1.push(stop(
  'cbc_g9_sci_s1_2',
  '1.2 Metals and Alloys',
  'Why Mixing Metals Makes Stronger Materials',
  'An alloy is a mixture of a metal with other elements, giving properties better than the pure metal alone',
  'Metals have properties that come from their structure: a regular lattice of positive ions surrounded by a sea of free electrons. These electrons let metals conduct electricity and heat, and the layers of ions can slide over each other without breaking, so metals are malleable (can be hammered into sheets) and ductile (can be drawn into wires). Metals are also shiny and usually have high melting points and densities. But pure metals are often too soft or corrode too easily. Pure iron rusts, and pure copper and aluminium bend easily. An alloy is a mixture of a metal with one or more other elements, made by melting them together and letting the mixture cool. The added atoms are a different size from the host atoms, so they disturb the regular layers and the layers cannot slide as easily; this makes the alloy harder and stronger. Common alloys: brass is copper and zinc (taps, door handles, musical instruments); bronze is copper and tin (statues, medals, bells); steel is iron with a little carbon (reinforcement bars, tools); stainless steel is iron with chromium and nickel (kitchen sinks, knives, because it does not rust); duralumin is aluminium with copper and magnesium (light and strong, used in aircraft). Solder is a low-melting alloy used to join wires. Rusting needs both oxygen and water. It can be prevented by painting, oiling, galvanising (coating with zinc, as in mabati roofing sheets) or alloying.',
  'Alloy = metal + other element(s), melted together and cooled',
  'Layers of identical atoms sliding; an alloy with different-sized atoms blocking the layers',
  'Mabati roofing sheets are iron coated with zinc so they last for years in the rain; sufuria are made from aluminium; bridge and building steel use alloys because pure metals would bend or rust.',
  'If copper is soft and zinc is soft, why is brass, which is made from only those two metals, much harder than either?',
  'Assessment focus: properties of metals, naming alloys with their components and uses, explaining why alloys are stronger than pure metals, and methods of preventing rusting.',
  [
    'Step 1: Start with the pure metal and list its weakness. Reason: an alloy is made to fix a specific weakness, such as softness or rusting.',
    'Step 2: Melt the metal and mix in the second element. Reason: in the liquid the atoms mix evenly, which a solid mixture could not do.',
    'Step 3: Cool the mixture to a solid. Reason: the different-sized atoms become trapped in the lattice.',
    'Step 4: Explain the effect: the layers cannot slide easily. Reason: this is what makes the alloy harder than the pure metal.',
    'Step 5: Match the alloy to its use by its property. Reason: engineers choose a material for what it does, such as stainless steel for kitchens because it resists rust.'
  ],
  'Question: A 200 g brass ornament is 70 per cent copper by mass and the rest zinc. Find the mass of each metal. Working: copper = 70 / 100 x 200 = 140 g. Zinc = 100 - 70 = 30 per cent, and 30 / 100 x 200 = 60 g. Check: 140 g + 60 g = 200 g. Would you use pure copper or brass for a water tap? Brass: it is harder, resists wear and is cheaper. Common mistake: saying an alloy is a compound. An alloy is a mixture, so its parts are not chemically joined and can be mixed in different amounts; brass can range from about 60 to 90 per cent copper. Another mistake is thinking alloys improve every property; some alloys conduct electricity less well than the pure metal.'
));

S1.push(stop(
  'cbc_g9_sci_s1_3',
  '1.3 Water hardness',
  'Hard and Soft Water: Causes, Effects and Softening',
  'Hard water contains dissolved calcium and magnesium salts, which stop soap from lathering and leave scale in kettles',
  'Rain water is almost pure, but as water flows over and through rocks it dissolves minerals. Water that contains dissolved calcium and magnesium salts (such as calcium hydrogencarbonate, calcium sulphate and magnesium chloride) is called hard water. Water without these salts is soft water. Hardness is tested with soap solution: soft water gives a lather quickly, while hard water first forms a grey, sticky scum (the calcium and magnesium ions react with soap to make an insoluble solid) and lathers only after more soap is added. Hardness is of two kinds. Temporary hardness is caused by calcium or magnesium hydrogencarbonate; it is removed by boiling, which decomposes the hydrogencarbonate into insoluble calcium carbonate (scale or fur), water and carbon dioxide. Permanent hardness is caused by calcium or magnesium sulphate or chloride; boiling does not remove it. Water can be softened by adding washing soda (sodium carbonate), which makes the calcium ions form insoluble calcium carbonate that settles out, or by passing the water through an ion-exchange resin, which swaps calcium and magnesium ions for sodium ions. Disadvantages of hardness: it wastes soap, leaves scum on clothes and basins, and forms scale that blocks pipes and makes kettles and boilers waste fuel. Advantages: the calcium helps build teeth and bones, and many people like the taste.',
  'Temporary hardness: calcium hydrogencarbonate + heat -> calcium carbonate + water + carbon dioxide',
  'Test tubes with soap: lather in soft water, scum in hard water; scale inside a kettle',
  'In parts of Kenya with limestone or borehole water a white crust forms inside kettles and on jiko pots; washing in hard water uses extra soap, so many households add washing soda or use detergents.',
  'Two samples are boiled. Sample A lathers easily afterwards, while sample B still forms scum. What does this tell you about the dissolved salts in each?',
  'Assessment focus: the soap test, the difference between temporary and permanent hardness, the equation for boiling, softening methods, and advantages and disadvantages of hard water.',
  [
    'Step 1: Put equal volumes of each water sample in test tubes and add soap solution drop by drop, shaking each time. Reason: counting drops gives a fair comparison between samples.',
    'Step 2: Record how many drops are needed before a lasting lather forms. Reason: more drops means more soap was used up by calcium and magnesium ions, so the water is harder.',
    'Step 3: Boil a fresh portion, cool it and test again. Reason: boiling removes temporary hardness only.',
    'Step 4: Compare the drops before and after boiling. Reason: a big drop in soap needed shows temporary hardness; little change shows permanent hardness.',
    'Step 5: Add washing soda to a hard sample and test once more. Reason: sodium carbonate removes both kinds by precipitating the calcium as carbonate.'
  ],
  'Question: Sample X needs 2 cm^3 of soap solution for a lasting lather before boiling and 2 cm^3 after boiling. Sample Y needs 10 cm^3 before boiling and 3 cm^3 after. Which has temporary hardness and which permanent? Working: X: change = 2 - 2 = 0 cm^3, so boiling made no difference; X has no temporary hardness and, needing so little soap, is soft. Y: change = 10 - 3 = 7 cm^3, so 7 out of 10 parts (70 per cent) of its hardness was removed by boiling and is temporary; the remaining 3 cm^3 is permanent hardness. Common mistake: saying hard water is harmful to drink. It is safe; the problems are wasted soap and scale. Another mistake is to say boiling softens all hard water, which works only for temporary hardness. Safety: do the boiling with an adult or teacher, keep the face away from the flame, and do not drink the test samples.'
));

S2.push(stop(
  'cbc_g9_sci_s2_1',
  '2.1 Nutrition in plants',
  'Photosynthesis: How Green Plants Make Their Own Food',
  'Plants use light, carbon dioxide and water to make glucose and release oxygen',
  'Nutrition is how a living thing obtains and uses food. Plants are autotrophs: they make their own food by photosynthesis. In photosynthesis, a green plant uses light energy, absorbed by the green pigment chlorophyll in the chloroplasts, to join carbon dioxide and water into glucose, and releases oxygen. Word equation: carbon dioxide + water -> glucose + oxygen, in light and chlorophyll. Balanced symbol equation: 6CO2 + 6H2O -> C6H12O6 + 6O2. Raw materials enter the leaf as follows: carbon dioxide diffuses in through small pores called stomata, mostly on the lower surface; water is absorbed by the roots and carried up the xylem. The leaf is adapted for the job: it is broad and thin so light and carbon dioxide reach cells quickly; the palisade cells just under the top surface hold most chloroplasts; the spongy layer has air spaces for gas movement; guard cells open and close the stomata; the waxy cuticle cuts water loss. The glucose is used for respiration, or changed to starch for storage, or to sucrose that the phloem carries to other parts, or to cellulose, proteins and oils. Plants also need minerals from the soil: nitrates for proteins and magnesium for chlorophyll. Photosynthesis needs light, chlorophyll, carbon dioxide and water; if any is missing it stops. Starch is stored where glucose is made, so testing a leaf for starch shows whether photosynthesis took place. Plants also respire all the time, so at night they only take in oxygen.',
  '6CO2 + 6H2O -> C6H12O6 + 6O2 (light, chlorophyll)',
  'Leaf cross-section: cuticle, palisade layer, spongy layer, stomata with guard cells',
  'A maize or sukuma wiki plant in a shamba grows by building its dry matter from carbon dioxide in the air and water in the soil; a farmer who plants too closely makes the leaves shade each other and the yield falls because less light reaches each leaf.',
  'A plant is kept in a dark cupboard for 3 days and its leaf then shows no starch. What has stopped, and why does this prove light is needed?',
  'Assessment focus: the word and symbol equations, raw materials and their entry routes, leaf adaptations, the starch test and controls, and factors limiting photosynthesis.',
  [
    'Step 1: Destarch the plant by keeping it in darkness for 2 days. Reason: any starch left from before would give a false result.',
    'Step 2: Set up the test (for example cover part of a leaf with black paper) and place the plant in bright light for several hours. Reason: only the covered part lacks light, so it is a fair comparison.',
    'Step 3: Remove the leaf and dip it in hot water for about 1 minute. Reason: this kills the cells and softens the leaf so iodine can enter.',
    'Step 4: Place the leaf in a test tube of ethanol standing in a beaker of hot water, off the flame. Reason: ethanol removes the green chlorophyll so the colour change can be seen, and ethanol is flammable so it must never be heated directly.',
    'Step 5: Rinse the leaf in water and add iodine solution. Reason: iodine turns blue-black where starch is present and stays brown where it is not.'
  ],
  'Question: Show that the equation 6CO2 + 6H2O -> C6H12O6 + 6O2 balances, and find the mass of glucose made when 264 g of carbon dioxide is used (C = 12, H = 1, O = 16). Working: atoms left: C 6, O 12 + 6 = 18, H 12. Atoms right: C 6, H 12, O 6 + 12 = 18. So it balances. Mass of 6CO2 = 6 x (12 + 32) = 6 x 44 = 264 g. Mass of one glucose C6H12O6 = 72 + 12 + 96 = 180 g. So 264 g of CO2 gives 180 g of glucose (along with 6 x 32 = 192 g of oxygen). Check: 264 + 108 (water: 6 x 18) = 372 g in, and 180 + 192 = 372 g out. Common mistake: saying plants take in oxygen for photosynthesis, or that the oxygen released comes from carbon dioxide. Plants release oxygen made from water, and they take in carbon dioxide. Another mistake is to say that plants respire only at night; they respire day and night, but in daylight photosynthesis makes more oxygen than respiration uses.'
));

S2.push(stop(
  'cbc_g9_sci_s2_2',
  '2.2 Nutrition in animals',
  'Teeth, Digestion and Absorption of Food',
  'Teeth break food into pieces and enzymes break it into small soluble molecules that blood can absorb',
  'Animals cannot make their own food; they are heterotrophs and must eat. Nutrition in animals has five stages: ingestion (taking food in), digestion (breaking large insoluble molecules into small soluble ones), absorption (small molecules pass into the blood), assimilation (cells use them) and egestion (removal of undigested waste). Mechanical digestion starts with the teeth. Humans have four types: incisors (chisel-shaped, bite and cut), canines (pointed, tear), premolars and molars (broad, ridged, grind). Each half jaw of an adult has 2 incisors, 1 canine, 2 premolars and 3 molars; this is written as the dental formula 2:1:2:3. Chemical digestion uses enzymes, which are biological catalysts: each works on one type of food. Amylase in saliva and from the pancreas breaks starch into sugars (maltose then glucose). Protease in the stomach (pepsin) and the small intestine breaks proteins into amino acids. Lipase breaks fats into fatty acids and glycerol. The path of food: mouth, oesophagus (muscles push food by peristalsis), stomach (acid kills germs, pepsin digests protein), small intestine (duodenum receives bile from the liver, which does not digest but breaks fat into droplets and neutralises acid, and enzymes from the pancreas; the ileum absorbs), large intestine (absorbs water) and anus. The ileum is long, folded, and lined with tiny finger-like villi that give a large surface area; each villus has thin walls and a rich blood supply for fast absorption. A balanced diet has carbohydrates, proteins, fats, vitamins, minerals, water and fibre in the right amounts. Food tests: iodine for starch (blue-black), Benedict\'s solution with heating for reducing sugars (blue to orange-red), biuret for protein (violet), and a brown paper mark for fats.',
  'Dental formula (one half jaw) = I 2 : C 1 : PM 2 : M 3  |  Total teeth = (2+1+2+3) x 2 x 2',
  'Diagram of the alimentary canal, a villus, and the four tooth types',
  'A meal of ugali, sukuma wiki and fish gives starch, vitamins and protein; the ugali starch begins to be digested by amylase in your mouth, which is why a piece of ugali held in the mouth tastes slightly sweet after a while.',
  'Why can glucose pass into the blood from the ileum, while a whole piece of ugali cannot?',
  'Assessment focus: types and functions of teeth with the dental formula, the parts of the alimentary canal, enzyme and substrate pairs, adaptations of the ileum, food tests and balanced diet.',
  [
    'Step 1: Chewing breaks food into smaller pieces with the teeth. Reason: smaller pieces have a larger surface area, so enzymes act faster.',
    'Step 2: Saliva with amylase mixes with food and the tongue forms a bolus that is swallowed. Reason: this starts starch digestion and makes the food slippery to pass down.',
    'Step 3: In the stomach, acid and pepsin act on proteins. Reason: acid kills germs and gives the right acidity for pepsin to work.',
    'Step 4: In the small intestine, bile and pancreatic enzymes finish digestion. Reason: starch, proteins and fats must all become small soluble molecules (glucose, amino acids, fatty acids and glycerol).',
    'Step 5: The villi absorb these small molecules into the blood. Reason: only small soluble molecules can pass through the thin villus wall, and the blood carries them away so more can diffuse in.'
  ],
  'Question: Use the dental formula 2:1:2:3 to find the number of teeth in a full adult set, and say what the number would be for a child with no molars. Working: one half of one jaw has 2 + 1 + 2 + 3 = 8 teeth. There are 2 halves in the upper jaw and 2 halves in the lower jaw, which is 4 halves. So 8 x 4 = 32 teeth. A child with no molars has 2 + 1 + 2 = 5 per half jaw, and 5 x 4 = 20 teeth. Which enzyme acts first on a bite of ugali? Amylase, because ugali is mainly starch. Common mistake: saying that bile contains enzymes. Bile is made by the liver, stored in the gall bladder, and contains no enzymes; it only emulsifies fats. Another mistake is to say that digestion takes place in the large intestine. Digestion is finished in the small intestine; the large intestine absorbs water. Safety: do the Benedict test with a hot water bath and a teacher, wear goggles, and do not taste any food used in the tests.'
));

S2.push(stop(
  'cbc_g9_sci_s2_3',
  '2.3 Reproduction in plants',
  'Flowers, Pollination, Fertilisation, Seeds and Germination',
  'Flowering plants reproduce sexually through pollen and ovules, and many also reproduce asexually from parts of the parent',
  'Reproduction is how living things make new individuals of their own kind. In sexual reproduction two sex cells (gametes) join; in asexual reproduction one parent makes offspring identical to itself. The flower is the reproductive organ of a flowering plant. Its parts: sepals (protect the bud), petals (often coloured to attract insects), stamens (male: the anther makes pollen grains containing the male gamete, on a filament) and the carpel (female: stigma that receives pollen, style, and ovary containing ovules, each holding a female gamete). Pollination is the transfer of pollen from an anther to a stigma. It is self-pollination if it is on the same plant and cross-pollination if it is to another plant of the same kind. Insect-pollinated flowers have bright petals, scent, nectar and sticky pollen. Wind-pollinated flowers (like maize and grasses) are small and dull, with feathery stigmas and large amounts of light pollen. After landing, the pollen grain grows a pollen tube down the style to the ovule, and the male gamete joins the female gamete. This is fertilisation. The fertilised ovule becomes the seed, and the ovary becomes the fruit. The petals and other parts usually wither. Seeds are spread (dispersed) away from the parent by wind (light or winged seeds), animals (hooked fruits stick to fur, fleshy fruits are eaten), water, or by explosion of dry pods. Dispersal lessens competition for light and water. A seed germinates (starts to grow) when it has water, oxygen and a suitable warmth; light is not needed for most seeds. The seed first uses stored food in its cotyledons; the radicle (first root) grows down and the plumule (first shoot) grows up. Asexual (vegetative) reproduction needs no seeds: Irish potatoes grow from tubers, bananas from suckers, sweet potatoes from vines, and sugarcane from stem cuttings. The offspring are identical to the parent, and are quick, but with no variety a disease can spread easily.',
  'Germination percentage = (seeds that germinated / seeds planted) x 100',
  'Longitudinal section of a flower and a germinating bean seed',
  'A farmer in Kenya plants only sprouting tubers for Irish potatoes (asexual) but buys certified maize seed that comes from controlled cross-pollination; bees carrying pollen from flower to flower raise the yield of crops such as avocado and sunflower.',
  'A farmer sees plenty of flowers on a pawpaw tree but few fruits. Suggest where in the process of reproduction something may have gone wrong.',
  'Assessment focus: labelling a flower, adaptations for insect and wind pollination, the steps from pollination to seed, conditions for germination and how to test them, seed dispersal, and vegetative reproduction.',
  [
    'Step 1: Pollen grains are carried from an anther to a stigma by wind, insects or other agents. Reason: the male gamete is inside the pollen and cannot move on its own to the ovule.',
    'Step 2: The pollen grain grows a tube through the style to the ovule. Reason: this provides a path for the male gamete to reach the female gamete.',
    'Step 3: The male and female gametes fuse. Reason: fertilisation gives a fertilised cell that develops into the embryo in the seed.',
    'Step 4: The ovule becomes the seed and the ovary becomes the fruit. Reason: the fruit protects the seeds and helps to disperse them.',
    'Step 5: In suitable conditions the seed absorbs water and germinates. Reason: water activates enzymes that turn stored food into energy and materials for the young root and shoot.'
  ],
  'Question: A learner sows 40 bean seeds in each of three trays. Tray A has damp soil and warmth, tray B has dry soil and warmth, and tray C has damp soil but is kept in a refrigerator. After 7 days 34 seeds germinate in A, none in B and 2 in C. Find the germination percentage for A and explain B and C. Working: percentage for A = 34 / 40 x 100 = 85 per cent. B: no germination because there was no water, so the enzymes in the seed could not start work. C: very few germinated because the temperature was too low for the enzymes to work well. The conclusion: seeds need water and a suitable warmth. To test for oxygen another tray would have its seeds under boiled water with oil on top. Common mistake: saying pollination and fertilisation are the same. Pollination is the arrival of pollen at the stigma; fertilisation is the joining of the gametes, which happens later in the ovule. Another mistake is to say that seeds need light and soil to germinate; most only need water, oxygen and warmth.'
));

S2.push(stop(
  'cbc_g9_sci_s2_4',
  '2.4 The interdependence of life',
  'Ecosystems, Food Webs and How Living Things Depend on Each Other',
  'Organisms in an ecosystem depend on each other and on the environment through feeding, cycles and relationships',
  'An ecosystem is a community of living things (biotic factors) interacting with each other and with their non-living surroundings (abiotic factors such as light, temperature, water, soil and air). A habitat is the place where an organism lives. Living things depend on each other in many ways. Feeding: producers (green plants) make food by photosynthesis; consumers eat other organisms (primary consumers eat plants, secondary consumers eat primary consumers); decomposers (bacteria and fungi) break down dead remains and release minerals back to the soil. A food chain shows a single feeding path, with arrows pointing the way energy flows: grass -> zebra -> lion. A food web joins many chains, so that if one organism disappears the others can switch to different food. Energy comes from the sun. At each step only about 10 per cent of the energy passes to the next level; the rest is used in respiration, lost as heat or movement, or left in parts not eaten. This is why food chains are short, and why there are fewer lions than zebras. Other relationships: predation (predator kills prey; the numbers of predator and prey rise and fall together), competition (organisms need the same limited resource), and symbiosis, a close living together: mutualism where both benefit (nitrogen-fixing bacteria in the root nodules of beans and legumes), parasitism where the parasite benefits and the host is harmed (tapeworm, ticks, malaria Plasmodium in the human, spread by the female Anopheles mosquito), and commensalism where one benefits and the other is not affected (egrets that follow buffalo). Materials are recycled: in the carbon cycle plants take in carbon dioxide, animals and plants return it by respiration, and burning and decay also release it. Human actions such as cutting forests, pollution and over-fishing upset these links.',
  'Energy passed on = about 10% of the energy at the level below',
  'Savanna food web with arrows, and an energy pyramid',
  'In the Maasai Mara the grass, wildebeest, lions and vultures form a web; around Lake Victoria the introduction of the Nile perch cut the numbers of many small fish species, showing how a change at one point affects the whole web.',
  'If all the lions in a park were removed, what could happen to the zebras, and then to the grass?',
  'Assessment focus: drawing and reading food chains and webs, naming trophic levels, energy loss along a chain, population change, types of symbiosis with examples, and the effect of human activity.',
  [
    'Step 1: Identify the producer at the start of the chain. Reason: all the energy in the chain began as sunlight captured by plants.',
    'Step 2: Draw arrows from the food to the feeder. Reason: the arrow shows the direction in which energy and matter move.',
    'Step 3: Label each organism as producer, primary, secondary or tertiary consumer. Reason: this shows its trophic level, which tells how far it is from the sun.',
    'Step 4: Estimate the energy at each step, taking about 10 per cent. Reason: most energy is lost as heat and in waste at each step.',
    'Step 5: Predict what happens when one population changes. Reason: every organism in a web is linked, so a change spreads to the others.'
  ],
  'Question: In the chain grass -> grasshopper -> frog -> snake, the grass has 10 000 kJ of energy. Taking 10 per cent passed on at each step, find the energy available to the snake. Working: grasshopper = 10 / 100 x 10 000 = 1000 kJ. Frog = 10 / 100 x 1000 = 100 kJ. Snake = 10 / 100 x 100 = 10 kJ. So the snake receives 10 kJ out of 10 000 kJ, which is 0.1 per cent. Why is a fifth consumer rare? After the snake only 1 kJ would remain, too little to support a population. Common mistake: drawing arrows from the eater to the food (lion -> zebra); the arrow shows energy flow so it goes from zebra to lion. Another mistake is saying that decomposers are not part of the food web; they recycle minerals so producers can keep growing. A further mistake is to confuse parasitism with predation: a parasite usually lives on or in the host and does not kill it quickly.'
));

S3.push(stop(
  'cbc_g9_sci_s3_1',
  '3.1 Curved Mirrors',
  'Concave and Convex Mirrors, Ray Diagrams and Uses',
  'A concave mirror converges parallel rays to a focus, while a convex mirror spreads them and gives a wide view',
  'A curved mirror is part of the surface of a sphere. A concave mirror curves inwards like the inside of a spoon; a convex mirror bulges outwards like the back of a spoon. Terms: the pole (P) is the centre of the mirror surface; the centre of curvature (C) is the centre of the sphere the mirror is cut from; the radius of curvature (R) is the distance PC; the principal axis is the line through P and C; the principal focus (F) is the point where rays parallel to the axis meet after reflection (concave, a real focus) or seem to come from (convex, a virtual focus behind the mirror); the focal length (f) is the distance PF, and f = R / 2. To draw an image we use two rays from the top of the object. For a concave mirror: (1) a ray parallel to the axis reflects through F; (2) a ray through F reflects parallel to the axis; (3) a ray through C returns along itself. Where the reflected rays cross is the top of the image. Concave mirror images: object beyond C gives a real, inverted, smaller image between C and F; object at C gives a real, inverted image of the same size at C; object between C and F gives a real, inverted, bigger image beyond C; object at F gives reflected rays that are parallel, so no image forms; object between F and the pole gives a virtual, upright, magnified image behind the mirror. A real image can be shown on a screen; a virtual image cannot. A convex mirror always gives a virtual, upright, smaller image behind the mirror, whatever the object distance. Uses: concave mirrors are in shaving and make-up mirrors (the face is within the focal length so the image is magnified), in torches, car headlamps and solar cookers (a bulb at F gives a parallel beam, or sunlight is gathered at F), and dentists\' mirrors. Convex mirrors are used as driving mirrors and shop security mirrors because they give a wide field of view, although objects look smaller and therefore farther away.',
  'f = R / 2  |  1/f = 1/u + 1/v  |  magnification m = v / u',
  'Ray diagrams: concave with the object beyond C, between C and F, inside F; convex mirror',
  'Matatu side mirrors are convex so the driver can see a wide road behind, which is why the mirror warns that objects look farther than they are; a solar cooker or a torch uses a concave reflector; supermarket aisles in Nairobi use convex mirrors in corners so staff can see the whole floor.',
  'A shaving mirror makes your face look big only when you hold it close. What happens to the image if you move the mirror farther away than its centre of curvature?',
  'Assessment focus: defining pole, C, F, R and f, drawing the three principal rays, describing images for each object position, the relation f = R / 2, and uses of each mirror.',
  [
    'Step 1: Draw the principal axis, the mirror, and mark P, F and C (C at twice the distance of F). Reason: the three rays can only be drawn from these points.',
    'Step 2: Draw the object as an upright arrow and choose a point at its tip. Reason: the position of the tip fixes the size, height and position of the image.',
    'Step 3: Draw a ray from the tip parallel to the axis that reflects through F. Reason: parallel rays meet at the focus of a concave mirror.',
    'Step 4: Draw a ray from the tip through C that reflects back along itself. Reason: a ray along a radius hits the mirror at 90 degrees, so it reflects straight back.',
    'Step 5: Mark where the two reflected rays cross, and describe the image as real or virtual, upright or inverted, bigger or smaller. Reason: all rays from the tip meet at this one point, which is the tip of the image.'
  ],
  'Question: A concave mirror has radius of curvature 30 cm. An object stands 40 cm in front of it. Find the focal length, the image distance and the magnification, and describe the image. Working: f = R / 2 = 30 / 2 = 15 cm. Using 1/f = 1/u + 1/v with u = 40 cm: 1/v = 1/15 - 1/40 = 8/120 - 3/120 = 5/120, so v = 120 / 5 = 24 cm. Magnification m = v / u = 24 / 40 = 0.6. The object (40 cm) is beyond C (30 cm), so the image is real, inverted and smaller (0.6 times the object), and lies between F (15 cm) and C (30 cm), which agrees with v = 24 cm. Common mistake: saying the image is where the rays seem to cross for every case. Real images form where light really crosses; virtual images are behind the mirror where the rays only seem to come from. Another mistake is taking R as the focal length. Remember f is half of R.'
));

S3.push(stop(
  'cbc_g9_sci_s3_2',
  '3.2 Waves',
  'Wave Motion: Types, Properties and the Wave Equation',
  'A wave carries energy from one place to another without carrying matter with it',
  'A wave is a disturbance that transfers energy from one place to another without moving the material along. A cork on Lake Victoria bobs up and down as waves pass; it does not travel with the wave. Mechanical waves need a material (medium) to travel through, such as water, a rope or air (sound). Electromagnetic waves, such as light, radio waves and X-rays, can travel through empty space. There are two types by direction of vibration. In a transverse wave the particles vibrate at right angles to the direction the wave travels (water waves, a rope shaken sideways, light). In a longitudinal wave the particles vibrate back and forth along the direction of travel, forming compressions and rarefactions (sound, a spring pushed and pulled). Wave measurements: amplitude (A) is the maximum displacement from the rest position and shows the energy; wavelength (lambda, in metres) is the distance between two neighbouring crests or two successive compressions; frequency (f, in hertz) is the number of complete waves passing a point in each second; period (T, in seconds) is the time for one complete wave, T = 1 / f; speed (v) is the distance a crest moves in each second. Since in one period the wave moves one wavelength, v = f x lambda. Waves show behaviours: reflection (bouncing off a surface, giving an echo for sound), refraction (change of direction when the speed changes, as when water waves move from deep to shallow water), and diffraction (spreading when passing through a gap). Sound speed in air is about 340 m/s, much slower than light, which is about 300 000 000 m/s; this is why you see lightning before you hear the thunder.',
  'v = f x lambda  |  T = 1 / f',
  'Transverse wave with crest, trough, wavelength and amplitude; longitudinal wave with compressions',
  'You see lightning first and hear thunder later because light travels much faster than sound; radio stations are broadcast on frequencies in MHz, such as FM stations heard on a matatu radio; fishermen on Lake Victoria feel the boat rise and fall as waves pass under it without being carried along.',
  'When a wave passes a floating cork, the cork moves up and down but does not move along with the wave. What does this tell you about what a wave really carries?',
  'Assessment focus: transverse and longitudinal waves with examples, labelling wavelength and amplitude, the relations v = f lambda and T = 1/f, and the behaviours of waves.',
  [
    'Step 1: Identify the quantities given, converting units to metres, seconds and hertz. Reason: the equation only works when the units agree.',
    'Step 2: Find the frequency by counting the waves passing a point in a measured time. Reason: frequency is waves per second.',
    'Step 3: Find the period using T = 1 / f. Reason: the period and the frequency are reciprocals.',
    'Step 4: Read the wavelength as the distance between two neighbouring crests. Reason: this is the length of one complete wave.',
    'Step 5: Calculate the speed from v = f x lambda. Reason: in one second, f waves pass, each of length lambda.'
  ],
  'Question: A learner at the shore of Lake Victoria counts 8 waves passing a post in 20 seconds. The distance between neighbouring crests is 3 m. Find the frequency, period and speed of the waves. Working: frequency f = 8 / 20 = 0.4 Hz. Period T = 1 / 0.4 = 2.5 s. Speed v = f x lambda = 0.4 x 3 = 1.2 m/s. Check with distance and time: in 2.5 s one crest moves 3 m, and 3 / 2.5 = 1.2 m/s. Second example: a sound of frequency 680 Hz travels at 340 m/s in air, so its wavelength is lambda = v / f = 340 / 680 = 0.5 m. Common mistake: confusing amplitude with wavelength; amplitude is a height from the rest line to a crest, while wavelength is a length along the wave. Another mistake is saying that a wave moves the water along with it; the water only moves up and down. Safety: do wave experiments with a rope, a slinky or a water tray away from edges, and never go near the water of a lake or river alone.'
));

const INTEGRATED_SCIENCE_G9_MAPS = [
  {
    curriculum: 'CBC',
    grade: 9,
    subject: 'Integrated Science',
    code: 'ISCI-G9',
    trackPathway: 'Core',
    title: 'CBE Grade 9 (Junior School Capstone) Integrated Science Metro Line',
    description: 'Strands follow the KICD Grade 9 Integrated Science design (July 2024).',
    stations: [
      {
        id: 'cbc_g9_sci_s1',
        number: 1,
        title: '1.0 Mixtures, Elements and Compounds',
        strand: 'Strand 1.0: Mixtures, Elements and Compounds',
        icon: 'Chemistry',
        status: 'available',
        summary: 'Structure of the atom, metals and alloys, and water hardness.',
        subtopics: S1
      },
      {
        id: 'cbc_g9_sci_s2',
        number: 2,
        title: '2.0 Living Things and Their Environment',
        strand: 'Strand 2.0: Living Things and Their Environment',
        icon: 'Life',
        status: 'available',
        summary: 'Nutrition in plants and animals, reproduction in plants, and the interdependence of life.',
        subtopics: S2
      },
      {
        id: 'cbc_g9_sci_s3',
        number: 3,
        title: '3.0 Force and Energy',
        strand: 'Strand 3.0: Force and Energy',
        icon: 'Energy',
        status: 'available',
        summary: 'Concave and convex curved mirrors, and the properties of waves.',
        subtopics: S3
      }
    ]
  }
];

module.exports = { maps: INTEGRATED_SCIENCE_G9_MAPS, retiredIds: [] };
