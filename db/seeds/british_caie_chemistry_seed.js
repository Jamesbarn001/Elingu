// ==============================================================
// CAMBRIDGE IGCSE CHEMISTRY (0620) - FULL TOPIC MAP, Years 10 & 11
// Syllabus 2026-2028: all 12 topics and their sub-topics.
// STATUS: aligned to the 2026-2028 syllabus (concept primers cover a subject
// teacher's check before they are treated as final).
//
// Terminology: Cambridge "Topic" / "Unit" / "Content Area" only.
// Topic numbers and names follow the Cambridge 0620 syllabus.
//
// Integrator notes:
// - Register BRITISH_CAIE_CHEMISTRY_MAPS next to BRITISH_CAIE_MAPS and
//   remove the two old Chemistry maps from british_caie_seed.js.
// - Existing station ids (cie_y10_chem_s1..s3, cie_y11_chem_s1..s2) and
//   sub-topic ids (cie_y10_chem_s1_1, s2_1, s3_1, cie_y11_chem_s1_1,
//   s2_1) and their titles are kept so learner progress is not lost.
//   Their older "N.N" title prefixes do not match Cambridge numbering;
//   the Cambridge number is in the station `strand` label and in the
//   "(Syllabus x.y)" tag on new sub-topic titles.
// - Station cie_y10_chem_s3 holds Topic 5 (Chemical energetics) and also
//   Topic 6.2 Rate of reaction, because the kept sub-topic
//   cie_y10_chem_s3_1 is rate/collision theory. Topic 6 (6.1, 6.3, 6.4)
//   is station cie_y10_chem_s6.
// - Station cie_y11_chem_s1 holds Topic 7 (the kept sub-topic is 7.3 salt
//   preparation). Redox (6.4) is in station cie_y10_chem_s6.
// ==============================================================

const REVIEW_STATUS = 'Aligned to the Cambridge IGCSE Chemistry (0620) 2026-2028 content list';

// Every sub-topic supplies a real concept primer. There is no generic
// fallback: steps and workedExample are required.
function sub(id, title, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, explanationSteps, workedExample) {
  if (!id || !title || !body || !socraticPrompt || !workedExample || !Array.isArray(explanationSteps) || explanationSteps.length < 3) {
    throw new Error('Incomplete chemistry sub-topic: ' + id);
  }
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: title.replace(/^[\d.]+\s+/, '').replace(/\s*\(Syllabus[^)]*\)\s*$/, ''),
      tagline,
      body,
      formula: formula || null,
      visualBadge,
      realWorldContext,
      explanationSteps,
      workedExample
    },
    socraticPrompt,
    formulaBadge: formula || null,
    examFocus
  };
}

const CHEM_Y10_STATIONS = [
  // ------------------------------------------------------------
  // TOPIC 1: States of matter
  // ------------------------------------------------------------
  {
    id: 'cie_y10_chem_s4',
    number: 1,
    title: 'Topic 1: States of Matter',
    strand: 'Topic 1: States of matter',
    status: 'available',
    summary: 'Solids, liquids and gases, changes of state, heating and cooling curves, gas volume with temperature and pressure, and diffusion.',
    subtopics: [
      sub(
        'cie_y10_chem_s4_1',
        'Solids, Liquids and Gases, and Changes of State (Syllabus 1.1)',
        'The three states differ in how close the particles are, how they are arranged and how they move',
        'Everything is made of tiny particles that are always moving. In a solid the particles are packed close together in a fixed pattern and can only vibrate in place, so a solid keeps its shape and volume. In a liquid the particles are still close but are not in a fixed pattern; they slide past each other, so a liquid keeps its volume but takes the shape of its container. In a gas the particles are far apart, move fast in all directions and have almost no pull on each other, so a gas fills any container. Melting, boiling, evaporating, freezing and condensing are the changes between these states. (Supplement) During a change of state the temperature stays constant while energy goes into overcoming the attractions between particles, which is the flat part of a heating or cooling curve.',
        null,
        'Particle diagrams: solid (ordered, touching), liquid (touching, random), gas (far apart)',
        'Water heated in a sufuria on a jiko: ice or cold water warms up, then the temperature stops rising while it boils. Wet clothes drying on a line is evaporation. Ghee solidifying in a cool kitchen is freezing.',
        'A bottle of water, a block of ice and the steam from a kettle are all the same substance. What is different about the particles in each, and what do you think has to be added or taken away to move between them?',
        'Core 1.1.1-1.1.3: properties and structures of the three states and the names of the six changes. Supplement 1.1.5: explain changes of state and heating and cooling curves.',
        [
          'Step 1: Describe the particles in each state: how far apart, how arranged, how they move.',
          'Step 2: Name the change of state (melting, boiling, evaporating, freezing, condensing) and say whether energy goes in or comes out.',
          'Step 3: On a heating curve, a flat section means the substance is changing state: energy is breaking attractions between particles instead of raising the temperature.'
        ],
        'Heating ice from -10 degrees C: the temperature rises to 0 degrees C, then stays at 0 while the ice melts (flat section), rises again to 100 degrees C, stays at 100 while the water boils (second flat section), then the steam heats up further.'
      ),
      sub(
        'cie_y10_chem_s4_2',
        'Gas Volume, Temperature and Pressure (Syllabus 1.1)',
        'Gas particles hit the container walls; more energy or less space means more collisions',
        'A gas has no fixed volume, so its volume depends on conditions. Gas particles move quickly and keep hitting the walls of the container; those hits are what we call gas pressure. If the temperature rises, the particles move faster and hit the walls harder and more often, so at the same pressure the gas takes up more volume. If the pressure on a gas is increased, the particles are squeezed closer together, so the volume gets smaller. (Supplement) You should explain both effects using the kinetic particle theory, that is, by talking about speed of particles and how often they collide with the walls.',
        null,
        'Syringe with the end sealed: pushing the plunger squeezes the gas particles together',
        'A bicycle pump: blocking the nozzle and pushing the handle makes the air smaller in volume and harder to push. A tyre feels harder after a long drive because the air inside warms up.',
        'When you push the plunger of a sealed syringe, what happens to the space between gas particles, and why does the plunger push back harder the further you push?',
        'Core 1.1.4: effects of temperature and pressure on gas volume. Supplement 1.1.6: explain these effects with kinetic particle theory.',
        [
          'Step 1: State the change made (temperature up or down, or pressure up or down).',
          'Step 2: Say what this does to the speed of the particles or the space they have.',
          'Step 3: Link it to collisions with the walls and state the effect on volume (or pressure).'
        ],
        'A balloon left in a hot car gets bigger: the air particles gain energy, move faster, hit the rubber harder and more often, and push the rubber outward until the volume is larger.'
      ),
      sub(
        'cie_y10_chem_s4_3',
        'Diffusion (Syllabus 1.2)',
        'Particles spread out from a high concentration to a low concentration because they move randomly',
        'Diffusion is the net movement of particles from where there are many of them to where there are fewer, until they are spread evenly. It happens because particles are moving randomly all the time, so over time they mix without anything stirring them. Diffusion is fast in gases, slow in liquids and almost absent in solids, because gas particles are far apart and moving fast. (Supplement) Lighter gas particles move faster at the same temperature, so a gas with a smaller relative molecular mass diffuses faster. In the classic test, cotton wool with ammonia (Mr 17) and cotton wool with hydrochloric acid (Mr 36.5) are placed at opposite ends of a sealed tube. White ammonium chloride forms where the gases meet, closer to the hydrochloric acid end because ammonia travelled further.',
        null,
        'Tube with ammonia at one end and HCl at the other: white ring nearer the HCl end',
        'Smoke and cooking smells: the smell of nyama choma or a jiko starting up spreads across the compound before you can see anything moving.',
        'Why can you smell chapati cooking from the next room even though the air in between is not moving? What would change if the room were much colder?',
        'Core 1.2.1: explain diffusion using kinetic particle theory. Supplement 1.2.2: effect of relative molecular mass on rate of diffusion of gases.',
        [
          'Step 1: Say which region has more particles and which has fewer.',
          'Step 2: Explain that random particle motion gives a net movement down the concentration difference.',
          'Step 3: For two gases, the one with the smaller Mr diffuses faster (supplement).'
        ],
        'Ammonia (Mr 17) and hydrogen chloride (Mr 36.5) are released at opposite ends of a 100 cm tube. Ammonia diffuses faster, so the white ring of ammonium chloride forms closer to the hydrogen chloride end.'
      )
    ]
  },

  // ------------------------------------------------------------
  // TOPIC 2: Atoms, elements and compounds
  // ------------------------------------------------------------
  {
    id: 'cie_y10_chem_s2',
    number: 2,
    title: 'Topic 2: Atoms, elements and compounds',
    strand: 'Topic 2: Atoms, elements and compounds',
    status: 'available',
    summary: 'Elements, compounds and mixtures, atomic structure, isotopes, ionic bonding, covalent bonding, giant covalent structures and metallic bonding.',
    subtopics: [
      sub(
        'cie_y10_chem_s2_2',
        'Elements, Compounds and Mixtures (Syllabus 2.1)',
        'Elements have one kind of atom; compounds are chemically joined; mixtures are not',
        'An element contains only one kind of atom, such as iron, oxygen or carbon. A compound is made of two or more different elements chemically joined in a fixed ratio, and it has different properties from the elements it came from. A mixture is two or more substances that are only physically mixed, not joined, so they can be separated by physical methods and have no fixed ratio. Sodium is a soft, reactive metal and chlorine is a poisonous gas, but joined as sodium chloride they make table salt.',
        null,
        'Particle diagrams: element (one colour), compound (joined unlike atoms), mixture (separate groups)',
        'Salt from the coast or from the soda lakes is a compound (sodium chloride), but the brine it comes from is a mixture of salt, water and other substances, which is why it can be separated by evaporation.',
        'Iron filings and sulfur powder can be mixed and then separated again with a magnet. If you heat them together they form iron sulfide and the magnet no longer works. What does that tell you about the difference between a mixture and a compound?',
        'Core 2.1.1: differences between elements, compounds and mixtures.',
        [
          'Step 1: Ask how many kinds of atom are present. One kind means an element.',
          'Step 2: If more than one kind, ask whether they are chemically joined in a fixed ratio (compound) or just mixed (mixture).',
          'Step 3: Test it: can a physical method such as filtering or a magnet separate the parts?'
        ],
        'Air is a mixture (nitrogen, oxygen and others, no fixed ratio and not joined). Water, H2O, is a compound (hydrogen and oxygen joined in a ratio of 2 to 1). Oxygen, O2, is an element.'
      ),
      sub(
        'cie_y10_chem_s2_3',
        'Atomic Structure and Electronic Configuration (Syllabus 2.2)',
        'The nucleus holds protons and neutrons; electrons sit in shells around it',
        'An atom has a tiny central nucleus containing protons (relative charge +1, relative mass 1) and neutrons (charge 0, mass 1). Electrons (charge -1, mass about 1/1836) are in shells around the nucleus. The proton number (atomic number) is the number of protons and identifies the element. The mass number (nucleon number) is protons plus neutrons. In a neutral atom, electrons equal protons. Electrons fill shells from the inside: 2 in the first, 8 in the second, 8 in the third (up to proton number 20), written like 2,8,3 for aluminium. The number of outer-shell electrons equals the group number (Groups I to VII), the number of occupied shells equals the period number, and noble gases (Group VIII) have a full outer shell.',
        null,
        'Atom diagram: nucleus with p and n, electron shells 2, 8, 8',
        'Calcium in milk and bones is atom number 20: electrons 2,8,8,2. Its two outer electrons put it in Group II, and four occupied shells put it in Period 4.',
        'Sodium has 11 protons. If it is neutral, how many electrons does it have, and how would you share them out between the shells? What does the last number tell you about its group?',
        'Core 2.2.1-2.2.6: structure of the atom, relative charges and masses, proton and nucleon number, electronic configuration for proton numbers 1 to 20, and group and period.',
        [
          'Step 1: Protons = proton number. In a neutral atom, electrons = protons. Neutrons = mass number minus proton number.',
          'Step 2: Fill shells 2, then 8, then 8, then 2 more up to proton number 20.',
          'Step 3: Last number = group number (Groups I to VII); number of shells = period.'
        ],
        'Aluminium: proton number 13, mass number 27. Protons 13, electrons 13, neutrons 27 - 13 = 14. Electronic configuration 2,8,3, so Group III, Period 3.'
      ),
      sub(
        'cie_y10_chem_s2_4',
        'Isotopes (Syllabus 2.3)',
        'Isotopes are atoms of the same element with different numbers of neutrons',
        'Isotopes are atoms of the same element, with the same number of protons but different numbers of neutrons, so they have different mass numbers. Symbols show this: carbon-12 is 12/6 C and carbon-14 is 14/6 C, both with 6 protons but with 6 and 8 neutrons. (Supplement) Isotopes of one element have the same chemical properties because they have the same number of electrons and so the same electronic configuration. The relative atomic mass of an element is the weighted average of its isotopes. Chlorine is 75% chlorine-35 and 25% chlorine-37, so its relative atomic mass is (35 x 75 + 37 x 25) / 100 = 35.5.',
        null,
        'Two carbon atoms side by side with the same protons but different neutrons',
        'Carbon-14 is used to estimate the age of ancient wood and bone, for example. It works because carbon-14 and carbon-12 behave the same chemically but carbon-14 slowly decays.',
        'Chlorine-35 and chlorine-37 both have 17 protons. Which particle is different between them, and why does that not change how chlorine reacts?',
        'Core 2.3.1-2.3.2: define isotopes and interpret symbols. Supplement 2.3.3-2.3.4: same chemistry, and relative atomic mass from isotope abundances.',
        [
          'Step 1: Same proton number means same element; different neutron number means different isotope.',
          'Step 2: Read symbols: top number is the mass number, bottom is the proton number.',
          'Step 3: For relative atomic mass, multiply each mass by its percentage, add, and divide by 100.'
        ],
        'Magnesium is 79% Mg-24, 10% Mg-25 and 11% Mg-26. Relative atomic mass = (24 x 79 + 25 x 10 + 26 x 11) / 100 = (1896 + 250 + 286) / 100 = 24.3.'
      ),
      sub(
        'cie_y10_chem_s2_5',
        'Ions and Ionic Bonds (Syllabus 2.4)',
        'Metals lose electrons, non-metals gain them, and opposite charges attract strongly',
        'An atom becomes an ion when it loses or gains electrons. Metal atoms lose electrons to form positive ions (cations); non-metal atoms gain electrons to form negative ions (anions). An ionic bond is the strong electrostatic attraction between oppositely charged ions. In sodium chloride, sodium (2,8,1) gives one electron to chlorine (2,8,7); Na+ and Cl- both then have a full outer shell. Dot-and-cross diagrams show this transfer. (Supplement) Ionic compounds form a giant lattice of alternating positive and negative ions. This explains their properties: high melting and boiling points, because a lot of energy is needed to overcome the many strong attractions; they do not conduct when solid because the ions are fixed, but conduct when molten or dissolved because the ions are then free to move.',
        null,
        'Dot-and-cross diagram: Na gives one electron to Cl; lattice of alternating Na+ and Cl-',
        'Salt from Magadi and the coast is sodium chloride. Its high melting point (about 800 degrees C) is why a cooking fire cannot melt it, and why salt water conducts electricity but dry salt does not.',
        'Dry salt crystals do not light a bulb in a circuit, but salt dissolved in water does. What has changed about the ions, and why does that matter for carrying current?',
        'Core 2.4.1-2.4.4: ions, ionic bonds, Group I and Group VII dot-and-cross diagrams, properties. Supplement 2.4.5-2.4.7: lattice, bonds between metal and non-metal ions, explain properties.',
        [
          'Step 1: Work out the ions: metals lose electrons to reach a full outer shell, non-metals gain them.',
          'Step 2: Draw the transfer and write the charges. Balance so the total charge is zero.',
          'Step 3: Link properties to structure: strong attraction in a giant lattice means high melting point; free ions only when molten or aqueous means conduction there.'
        ],
        'Magnesium oxide: Mg (2,8,2) loses 2 electrons to become Mg2+; O (2,6) gains 2 to become O2-. One of each balances, so the formula is MgO. Its melting point is very high (about 2850 degrees C), because charges of 2+ and 2- attract very strongly.'
      ),
      sub(
        'cie_y10_chem_s2_6',
        'Simple Molecules and Covalent Bonds (Syllabus 2.5)',
        'Non-metal atoms share pairs of electrons to reach a full outer shell',
        'A covalent bond forms when two atoms share a pair of electrons, so each atom gets a full outer shell like a noble gas. Hydrogen, H2, shares one pair; oxygen, O2, shares two pairs (a double bond); nitrogen, N2, shares three pairs. In water, the oxygen shares one pair with each of two hydrogens; in methane, carbon shares four pairs. Dot-and-cross diagrams show only outer electrons. Simple molecular substances have low melting and boiling points and do not conduct electricity. (Supplement) The reason is that the weak forces are the intermolecular forces between separate molecules, not the strong covalent bonds inside them, so little energy is needed to separate molecules; and there are no free charged particles to carry current.',
        null,
        'Dot-and-cross diagrams: H2O, CH4, NH3, HCl, then O2, N2, CO2',
        'Cooking gas (propane and butane) and paraffin are made of simple molecules. They boil at low temperatures compared with salt, which is why gas escapes as a vapour from a cylinder when the valve is opened.',
        'Water has strong bonds between the hydrogen and oxygen atoms in each molecule, yet it boils at only 100 degrees C. Which bonds are being broken when water boils, and why does that need so little energy compared with melting salt?',
        'Core 2.5.1-2.5.3: covalent bond, dot-and-cross for H2, Cl2, H2O, CH4, NH3, HCl, and properties. Supplement 2.5.4-2.5.5: CH3OH, C2H4, O2, CO2, N2 and explain properties.',
        [
          'Step 1: Count outer electrons in each atom and how many more each needs for a full shell.',
          'Step 2: Share pairs until every atom is full; draw only the outer shell.',
          'Step 3: Explain low melting point as weak forces between molecules, not breaking covalent bonds; no conduction because no free charges.'
        ],
        'Ammonia, NH3: nitrogen has 5 outer electrons and needs 3 more; each hydrogen needs 1. Three shared pairs join N to three H atoms, and nitrogen keeps one non-bonding pair (lone pair).'
      ),
      sub(
        'cie_y10_chem_s2_1',
        '2.1 Giant Covalent Structures: Diamond, Graphite & Silicon(IV) Oxide',
        'Millions of atoms are joined by covalent bonds into one huge structure',
        'In a giant covalent structure there are no separate molecules: atoms are bonded to each other by strong covalent bonds in a continuous network. In diamond every carbon atom bonds to four others in a rigid 3D lattice, which makes diamond very hard with a very high melting point, and it does not conduct because all outer electrons are used in bonds. In graphite each carbon bonds to three others in flat layers; the layers are held to each other weakly so they slide over each other, making graphite soft and slippery. Each carbon in graphite has one spare electron that can move along the layer, so graphite conducts electricity. Graphite is used as a lubricant and as an electrode; diamond is used in cutting tools. (Supplement) Silicon(IV) oxide, SiO2 (sand), has a giant structure where each silicon bonds to four oxygens, so it is hard with a high melting point like diamond.',
        null,
        'Diamond: 4 bonds per carbon in 3D; graphite: 3 bonds per carbon in layers; SiO2 structure',
        'The pencil you write with has a graphite core: layers slide off onto paper. Drill tips for boreholes and rock cutting use diamond because it is the hardest material known.',
        'Diamond and graphite are both pure carbon, yet one cuts glass and the other marks paper and conducts electricity. What is different about how the atoms are bonded in each?',
        'Core 2.6.1-2.6.2: structures of graphite and diamond and relating them to uses. Supplement 2.6.3-2.6.4: SiO2 and its similarity to diamond.',
        [
          'Step 1: Count how many bonds each carbon makes and whether the structure is 3D or in layers.',
          'Step 2: Link the structure to properties: hardness, melting point, conduction.',
          'Step 3: Link properties to uses: graphite lubricant and electrode, diamond cutting tools.'
        ],
        'Why is graphite used as an electrode in electrolysis? It conducts because each carbon has a delocalised electron that can move, and it has a very high melting point and is unreactive enough to survive the cell.'
      ),
      sub(
        'cie_y10_chem_s2_7',
        'Metallic Bonding (Syllabus 2.7)',
        'Positive metal ions sit in a sea of delocalised electrons',
        'Metal atoms lose their outer electrons, which are no longer tied to any one atom; they are delocalised and move freely through the structure. What remains is a regular lattice of positive metal ions held together by electrostatic attraction to this sea of electrons. This explains why metals conduct electricity (the free electrons carry charge) and why they are malleable (can be hammered into shape) and ductile (can be drawn into wire): layers of ions can slide over each other without breaking the structure, because the electrons keep the ions bonded.',
        null,
        'Lattice of positive ions surrounded by a sea of free electrons',
        'Copper wire for electrical cables and aluminium sufuria are both shaped from metals by pressing or drawing without breaking. The jua kali craftsmen who hammer scrap metal into new tools rely on malleability.',
        'When a metal is bent with a hammer it changes shape but does not shatter. Why does a salt crystal shatter when hit, while a metal does not?',
        'Supplement 2.7.1-2.7.2: describe metallic bonding and explain electrical conductivity, malleability and ductility. (Core covers metal properties in 9.1.)',
        [
          'Step 1: Describe the structure: positive ions in a lattice, delocalised electrons around them.',
          'Step 2: Explain conduction: free electrons move and carry charge.',
          'Step 3: Explain malleability and ductility: layers slide, the electron sea keeps the ions held together.'
        ],
        'Copper in a wire: when voltage is applied, delocalised electrons drift through the lattice; when the wire is pulled thinner (drawn), layers of copper ions slide past each other and the bonding is maintained.'
      )
    ]
  },

  // ------------------------------------------------------------
  // TOPIC 3: Stoichiometry
  // ------------------------------------------------------------
  {
    id: 'cie_y10_chem_s1',
    number: 3,
    title: 'Topic 3: Stoichiometry',
    strand: 'Topic 3: Stoichiometry',
    status: 'available',
    summary: 'Formulae and equations, relative atomic and formula masses, the mole, gas volumes, solution concentrations, titration calculations, empirical formulae and percentage yield.',
    subtopics: [
      sub(
        'cie_y10_chem_s1_2',
        'Formulae and Chemical Equations (Syllabus 3.1)',
        'A balanced equation shows that atoms are not created or destroyed',
        'A formula says which atoms are in a substance and how many. A molecular formula gives the number and type of atoms in one molecule (water is H2O). An empirical formula is the simplest whole-number ratio of atoms or ions (ethene C2H4 has empirical formula CH2). (Supplement) For an ionic compound, balance the ion charges: Al3+ and O2- need two Al3+ (6+) and three O2- (6-), so the formula is Al2O3. A chemical equation shows reactants becoming products. A word equation uses names. A symbol equation uses formulae and must be balanced: the same number of each atom on both sides. State symbols show (s) solid, (l) liquid, (g) gas and (aq) dissolved in water. Ionic equations leave out spectator ions, for example Ag+(aq) + Cl-(aq) -> AgCl(s).',
        null,
        'Equation with atom counts: Mg + 2HCl -> MgCl2 + H2',
        'Rusting of a mabati roof, burning charcoal and cooking with gas can all be written as equations. For example charcoal burning in plenty of air: C(s) + O2(g) -> CO2(g).',
        'In 2Mg + O2 -> 2MgO, how many oxygen atoms are on each side? What would be wrong with writing Mg + O2 -> MgO?',
        'Core 3.1.1-3.1.4: formulae of elements and compounds, word and symbol equations with state symbols. Supplement 3.1.5-3.1.8: empirical formula, formula from ion charges, ionic equations.',
        [
          'Step 1: Write the correct formulae for each reactant and product. Never change a formula to balance.',
          'Step 2: Balance by changing the numbers in front of formulae until each atom type matches on both sides.',
          'Step 3: Add state symbols; for ionic equations, cancel ions that appear unchanged on both sides.'
        ],
        'Magnesium and hydrochloric acid: Mg(s) + 2HCl(aq) -> MgCl2(aq) + H2(g). Check: Mg 1 and 1, H 2 and 2, Cl 2 and 2. Ionic version: Mg(s) + 2H+(aq) -> Mg2+(aq) + H2(g).'
      ),
      sub(
        'cie_y10_chem_s1_3',
        'Relative Atomic and Formula Masses, and Reacting Masses (Syllabus 3.2)',
        'Relative masses compare every atom with one-twelfth of a carbon-12 atom',
        'Atoms are too small to weigh directly, so chemists compare them. Relative atomic mass, Ar, is the average mass of an element\'s isotopes compared with one-twelfth of the mass of a carbon-12 atom. Relative molecular mass, Mr, is the sum of the Ar values of all the atoms in the molecule; for ionic compounds we say relative formula mass. For example, water: 2 x 1 + 16 = 18. (Core) Reacting masses can be calculated in simple proportions using the equation without using the mole: the masses in an equation are in the same ratio as the relative masses.',
        null,
        'Mr addition of atoms in H2O, CO2, CaCO3',
        'To know how much lime (calcium oxide) can be made from a given mass of limestone for building or for the soil, a quarry or cement works uses reacting masses.',
        'In 2Mg + O2 -> 2MgO, magnesium (Ar 24) and oxygen (Ar 16) combine. If 48 g of magnesium makes 80 g of magnesium oxide, how much oxide would 12 g of magnesium make?',
        'Core 3.2.1-3.2.3: relative atomic mass, relative molecular mass, reacting masses in simple proportions (no moles). ',
        [
          'Step 1: Add the Ar values in the formula to get Mr.',
          'Step 2: Write the masses in the equation: 2Mg = 48, 2MgO = 80.',
          'Step 3: Scale by proportion to the mass you have.'
        ],
        'Mg is 24, so 2Mg = 48; MgO is 24 + 16 = 40, so 2MgO = 80. So 12 g of Mg (a quarter of 48) makes a quarter of 80 = 20 g of MgO.'
      ),
      sub(
        'cie_y10_chem_s1_1',
        '1.1 The Mole Concept & Reacting Masses',
        'The mole is a counting unit: one mole contains 6.02 x 10^23 particles',
        'Atoms and molecules are far too small and too many to count, so chemists count them in moles, the same way we count eggs in dozens. One mole contains 6.02 x 10^23 particles (the Avogadro constant), and the mass of one mole in grams equals the relative atomic or formula mass. So 1 mole of carbon (Ar 12) weighs 12 g, and 1 mole of water (Mr 18) weighs 18 g. Moles = mass in g / molar mass in g/mol. A balanced equation tells you the ratio of moles reacting, which lets you predict the mass of product from any mass of reactant.',
        'moles = mass (g) / molar mass (g/mol)  |  particles = moles x 6.02 x 10^23',
        'Mole triangle: mass at top, moles and molar mass at the bottom',
        'Cement and lime works heat limestone: CaCO3 -> CaO + CO2. Knowing moles lets the works predict how much lime and how much carbon dioxide they will get from a given load.',
        'If you have 10 g of calcium carbonate, CaCO3 (Mr 100), how many moles is that, and what does the equation CaCO3 -> CaO + CO2 tell you about how many moles of carbon dioxide are made?',
        'Supplement 3.3.2-3.3.3, 3.3.5: the mole, amount of substance from mass and molar mass, number of particles, reacting masses.',
        [
          'Step 1: Work out Mr from the Ar values.',
          'Step 2: Moles = mass / Mr. Use the equation ratio to find moles of the substance you want.',
          'Step 3: Convert moles back to mass (mass = moles x Mr) and include units.'
        ],
        '10 g CaCO3 is 10 / 100 = 0.1 mol. The equation gives 1:1 for CO2, so 0.1 mol CO2 is made. Mr of CO2 = 44, so mass = 0.1 x 44 = 4.4 g.'
      ),
      sub(
        'cie_y10_chem_s1_4',
        'Gas Volumes, Solutions and Limiting Reactants (Syllabus 3.3)',
        'At room temperature and pressure one mole of any gas takes up 24 dm3',
        'For gases, the volume of one mole at room temperature and pressure (r.t.p.) is 24 dm3, whatever the gas. So volume = moles x 24 dm3 (and 1 dm3 = 1000 cm3). For solutions, concentration is the amount of solute per dm3: mol/dm3 = moles / volume in dm3, and g/dm3 = mol/dm3 x Mr. To change cm3 to dm3, divide by 1000. A limiting reactant is the one that runs out first and so decides how much product is made.',
        'volume (dm3) = moles x 24  |  concentration (mol/dm3) = moles / volume (dm3)  |  g/dm3 = mol/dm3 x Mr',
        'Syringe collecting hydrogen over a magnesium and acid reaction',
        'Reacting zinc or magnesium with acid to make hydrogen, or baking soda in vinegar to make carbon dioxide, can be measured by collecting the gas in a syringe.',
        'You add 0.2 mol of magnesium to 0.3 mol of hydrochloric acid. The equation is Mg + 2HCl -> MgCl2 + H2. Which one runs out first, and how much hydrogen can you get?',
        'Supplement 3.3.4-3.3.5: molar gas volume 24 dm3, limiting reactants, gas volumes, solution volumes and concentrations in g/dm3 and mol/dm3. Core 3.3.1: concentration units.',
        [
          'Step 1: Convert everything to moles (volumes of solutions: cm3 / 1000 x concentration).',
          'Step 2: Compare with the equation ratio to find the limiting reactant.',
          'Step 3: Use the limiting reactant to find moles of product, then convert to volume (x 24) or mass.'
        ],
        'Mg + 2HCl: 0.2 mol Mg needs 0.4 mol HCl but only 0.3 mol is available, so HCl is limiting. 0.3 mol HCl makes 0.15 mol H2, which is 0.15 x 24 = 3.6 dm3.'
      ),
      sub(
        'cie_y10_chem_s1_5',
        'Titration Calculations (Syllabus 3.3)',
        'Titration data lets you find an unknown concentration from a known one',
        'In a titration you add one solution from a burette to a measured volume of another until they exactly react. If you know the concentration of one solution, the volumes, and the equation ratio, you can calculate the unknown concentration. Work in moles: moles = concentration x volume in dm3 for the solution you know, use the equation to find the moles of the other, then concentration = moles / volume.',
        'moles = concentration (mol/dm3) x volume (dm3)',
        'Burette, pipette and conical flask with indicator',
        'Water-quality and food laboratories use titrations, for example to check the acidity of vinegar (siki) or fruit juice.',
        'In HCl + NaOH -> NaCl + H2O, how many moles of NaOH react with each mole of HCl? How would the ratio change if the acid was sulfuric acid, H2SO4?',
        'Supplement 3.3.6: use titration data to calculate moles of solute, concentration or volume.',
        [
          'Step 1: Calculate moles of the solution you know: concentration x volume in dm3.',
          'Step 2: Use the equation ratio to find moles of the other reactant.',
          'Step 3: Divide by its volume in dm3 for concentration (or by concentration for volume).'
        ],
        '25.0 cm3 of NaOH needs 20.0 cm3 of 0.100 mol/dm3 HCl. Moles HCl = 0.100 x 0.0200 = 0.00200. Ratio 1:1, so NaOH is 0.00200 mol in 0.0250 dm3, concentration = 0.0800 mol/dm3.'
      ),
      sub(
        'cie_y10_chem_s1_6',
        'Empirical and Molecular Formulae, Percentage Yield and Purity (Syllabus 3.3)',
        'Masses of elements in a compound give the simplest ratio of atoms',
        'To find an empirical formula, divide the mass of each element by its Ar to get moles, then divide all by the smallest to get a simple whole-number ratio. The molecular formula is a whole-number multiple of the empirical formula, found by dividing Mr by the empirical formula mass. Percentage composition by mass = (mass of element in formula / Mr) x 100. Percentage yield = (actual yield / theoretical yield) x 100, and percentage purity = (mass of pure substance / mass of sample) x 100.',
        'percentage yield = actual / theoretical x 100  |  % composition = (Ar x atoms / Mr) x 100',
        'Table: element, mass, moles, ratio, empirical formula',
        'Iron ore (hematite) is mined and bought by iron content, so the percentage of Fe in the ore matters to the buyer.',
        'A reaction should make 4.4 g of a product but you collect 3.3 g. What fraction did you get, and what are some reasons you might not get 100%?',
        'Supplement 3.3.7-3.3.8: empirical and molecular formulae, percentage yield, composition and purity.',
        [
          'Step 1: Convert masses to moles by dividing by Ar.',
          'Step 2: Divide by the smallest number of moles to get a ratio; multiply up if it is not whole.',
          'Step 3: For yield or purity, state the actual and the theoretical (or total) value and divide.'
        ],
        'An iron oxide has 5.6 g Fe and 2.4 g O. Fe: 5.6 / 56 = 0.1 mol. O: 2.4 / 16 = 0.15 mol. Ratio 0.1 : 0.15 = 2 : 3, so the formula is Fe2O3. Yield example: 3.3 / 4.4 x 100 = 75%.'
      )
    ]
  },

  // ------------------------------------------------------------
  // TOPIC 4: Electrochemistry
  // ------------------------------------------------------------
  {
    id: 'cie_y10_chem_s5',
    number: 4,
    title: 'Topic 4: Electrochemistry',
    strand: 'Topic 4: Electrochemistry',
    status: 'available',
    summary: 'Electrolysis of molten and aqueous compounds, products at electrodes, half-equations, electroplating, and hydrogen-oxygen fuel cells.',
    subtopics: [
      sub(
        'cie_y10_chem_s5_1',
        'Electrolysis: Cells, Electrodes and Molten Compounds (Syllabus 4.1)',
        'Electrolysis uses electricity to break down an ionic compound',
        'Electrolysis is the decomposition of an ionic compound, when molten or in aqueous solution, by passing an electric current through it. The electrolyte is the molten or dissolved compound. The anode is the positive electrode and the cathode is the negative electrode. Positive ions (cations) move to the cathode and gain electrons; negative ions (anions) move to the anode and lose electrons. Metals or hydrogen form at the cathode and non-metals (other than hydrogen) form at the anode. For molten lead(II) bromide with inert electrodes, lead forms at the cathode and bromine at the anode. (Supplement) Electrons flow through the external wire from anode to cathode; ions carry the charge through the electrolyte. At the cathode reduction happens, Pb2+ + 2e- -> Pb; at the anode oxidation happens, 2Br- -> Br2 + 2e-.',
        null,
        'Cell diagram: battery, anode (+), cathode (-), electrolyte, ion movement',
        'Reactive metals such as sodium and aluminium are produced by electrolysis of their molten compounds because carbon cannot reduce them easily.',
        'Why can solid lead(II) bromide not be electrolysed, but molten lead(II) bromide can? What do the ions need to be able to do?',
        'Core 4.1.1-4.1.5: define electrolysis, anode, cathode, electrolyte, products for molten lead(II) bromide, predict products for molten binary compounds. Supplement 4.1.8, 4.1.11: charge transfer and half-equations.',
        [
          'Step 1: Identify the cations (go to cathode) and anions (go to anode).',
          'Step 2: Metal or hydrogen at the cathode; non-metal at the anode.',
          'Step 3: Write half-equations: cathode (reduction) gains electrons, anode (oxidation) loses electrons.'
        ],
        'Molten sodium chloride with inert electrodes: Na+ goes to the cathode, Na+ + e- -> Na (sodium metal); Cl- goes to the anode, 2Cl- -> Cl2 + 2e- (chlorine gas).'
      ),
      sub(
        'cie_y10_chem_s5_2',
        'Electrolysis of Aqueous Solutions (Syllabus 4.1)',
        'In water, hydrogen ions and hydroxide ions compete with the ions of the compound',
        'In an aqueous solution, water also supplies H+ and OH- ions, so there is a choice at each electrode. Core examples with inert electrodes: concentrated sodium chloride gives hydrogen at the cathode and chlorine at the anode, leaving sodium hydroxide solution; dilute sulfuric acid gives hydrogen at the cathode and oxygen at the anode (twice as much hydrogen by volume); copper(II) sulfate gives copper at the cathode and oxygen at the anode, and the blue colour fades. (Supplement) With copper electrodes in copper(II) sulfate, copper is deposited on the cathode and the copper anode dissolves, so the blue colour stays the same. Half-equations: Cu2+ + 2e- -> Cu; 2H+ + 2e- -> H2; 2Cl- -> Cl2 + 2e-; 4OH- -> 2H2O + O2 + 4e-. For a halide in concentrated solution the halogen forms at the anode; in very dilute solution oxygen tends to form instead.',
        null,
        'Three electrolysis cells: conc. NaCl, dilute H2SO4, CuSO4 with carbon and copper electrodes',
        'Chlorine and sodium hydroxide for water treatment and soap-making are produced industrially from concentrated salt solution.',
        'In copper(II) sulfate solution with carbon electrodes the blue colour fades, but with copper electrodes it stays the same. What is happening to the copper ions in each case?',
        'Core 4.1.3-4.1.4: products for concentrated aqueous sodium chloride and dilute sulfuric acid. Supplement 4.1.9-4.1.11: copper(II) sulfate with carbon and copper electrodes, halides, half-equations.',
        [
          'Step 1: List all ions present, including H+ and OH- from water.',
          'Step 2: Decide what forms at the cathode (metal if unreactive, otherwise hydrogen) and at the anode (halogen if halide, otherwise oxygen).',
          'Step 3: Say what happens to the electrodes and the solution (colour, pH) and write half-equations.'
        ],
        'Concentrated NaCl: cathode 2H+ + 2e- -> H2; anode 2Cl- -> Cl2 + 2e-. The Na+ and OH- stay in solution, so sodium hydroxide is left.'
      ),
      sub(
        'cie_y10_chem_s5_3',
        'Electroplating (Syllabus 4.1)',
        'Electroplating coats an object with a thin layer of metal using electrolysis',
        'Metal objects are electroplated to improve their appearance and to resist corrosion. The object to be plated is made the cathode. The anode is a piece of the plating metal. The electrolyte is a solution containing ions of the plating metal. When current flows, metal ions are reduced and deposited on the object, while the anode dissolves to keep the electrolyte concentration steady. For plating with copper, the cathode is the object, the anode is copper and the electrolyte is copper(II) sulfate.',
        null,
        'Electroplating cell: object at cathode, plating metal at anode, matching salt solution',
        'Chromium-plated car fittings, nickel-plated tools and silver-plated cutlery use this method.',
        'In a cell to plate a spoon with silver, which metal should the anode be, what should the spoon be connected to, and what ions must the solution contain?',
        'Core 4.1.6-4.1.7: why and how metals are electroplated.',
        [
          'Step 1: Object to be plated goes on the negative terminal (cathode).',
          'Step 2: Plating metal is the anode; electrolyte contains ions of the plating metal.',
          'Step 3: Cathode half-equation: metal ion + electrons -> metal atom, forming the coating.'
        ],
        'Copper-plating an iron key: key = cathode, copper = anode, electrolyte = copper(II) sulfate. At the key: Cu2+ + 2e- -> Cu. At the anode: Cu -> Cu2+ + 2e-.'
      ),
      sub(
        'cie_y10_chem_s5_4',
        'Hydrogen-Oxygen Fuel Cells (Syllabus 4.2)',
        'A fuel cell turns hydrogen and oxygen directly into electricity, with water as the only chemical product',
        'A hydrogen-oxygen fuel cell uses hydrogen and oxygen to produce electricity with water as the only chemical product. The overall reaction is 2H2 + O2 -> 2H2O. The reaction releases energy as electrical energy because the electrons are made to travel through an external circuit. (Supplement) Compared with a petrol engine, a fuel cell vehicle makes no carbon dioxide or other pollutants at the point of use and is more efficient. Disadvantages: hydrogen is flammable and difficult to store, it must itself be produced (which may use energy or fossil fuels), refuelling stations are few, and fuel cells are expensive.',
        null,
        'Fuel cell: hydrogen in, oxygen in, water out, electrons through the circuit',
        'Where hydrogen can be made using renewable electricity, such as geothermal or solar power, fuel cells offer a cleaner alternative to petrol and diesel in vehicles.',
        'If a petrol car and a hydrogen fuel cell car both travel 100 km, what leaves each exhaust? Where might the hydrogen have come from, and does that change how clean it is overall?',
        'Core 4.2.1: hydrogen-oxygen fuel cell and its product. Supplement 4.2.2: advantages and disadvantages compared with petrol engines.',
        [
          'Step 1: State inputs (hydrogen, oxygen) and output (electricity, water).',
          'Step 2: Give advantages: no pollution at use, efficient.',
          'Step 3: Give disadvantages: hydrogen storage and production, cost, refuelling infrastructure.'
        ],
        'Petrol: C8H18 + 12.5O2 -> 8CO2 + 9H2O (carbon dioxide released). Fuel cell: 2H2 + O2 -> 2H2O (only water).'
      )
    ]
  },

  // ------------------------------------------------------------
  // TOPIC 5: Chemical energetics (+ 6.2 Rate of reaction, see header note)
  // ------------------------------------------------------------
  {
    id: 'cie_y10_chem_s3',
    number: 5,
    title: 'Topic 5: Chemical energetics (with Topic 6.2: Rate of reaction)',
    strand: 'Topic 5: Chemical energetics (with Topic 6.2: Rate of reaction)',
    status: 'available',
    summary: 'Exothermic and endothermic reactions, reaction pathway diagrams, bond energies, and (Topic 6.2) factors affecting rate of reaction, investigating rate and collision theory.',
    subtopics: [
      sub(
        'cie_y10_chem_s3_2',
        'Exothermic and Endothermic Reactions, Reaction Pathway Diagrams (Syllabus 5.1)',
        'Exothermic reactions release energy to the surroundings; endothermic reactions take energy in',
        'An exothermic reaction transfers thermal energy to the surroundings, so the surroundings get hotter (burning, neutralisation, respiration). An endothermic reaction takes in thermal energy from the surroundings, so they get colder (thermal decomposition, dissolving ammonium nitrate). (Supplement) The energy change is the enthalpy change, delta H: negative for exothermic, positive for endothermic. On a reaction pathway diagram, reactants and products sit at different energy levels; for exothermic, products are lower than reactants; for endothermic, higher. The activation energy, Ea, is the minimum energy colliding particles need to react, shown as the hump above the reactants.',
        'delta H negative = exothermic  |  delta H positive = endothermic',
        'Two pathway diagrams: products below reactants (exo) and above (endo), with Ea and delta H labelled',
        'Burning charcoal and wood is exothermic: the heat cooks food and warms rooms. Cold packs for injuries use endothermic dissolving.',
        'When charcoal burns in a jiko the pot above gets hot. Where did that energy come from, and what does the reaction pathway diagram look like for it?',
        'Core 5.1.1-5.1.3: exothermic and endothermic, interpret pathway diagrams. Supplement 5.1.4-5.1.6: enthalpy change, activation energy, drawing and labelling pathway diagrams.',
        [
          'Step 1: Temperature of surroundings up = exothermic; down = endothermic.',
          'Step 2: On the diagram, mark reactants, products, delta H (difference) and Ea (hump up from reactants).',
          'Step 3: Sign of delta H: negative if products are lower, positive if higher.'
        ],
        'Neutralisation raises the temperature of a solution by several degrees: exothermic, delta H negative. Products are at a lower energy than the reactants and the energy difference was released to the surroundings.'
      ),
      sub(
        'cie_y10_chem_s3_3',
        'Bond Energies and Enthalpy Change Calculations (Syllabus 5.1)',
        'Breaking bonds takes in energy; making bonds gives it out',
        'Bond breaking is endothermic (energy is needed to pull atoms apart) and bond making is exothermic (energy is released when atoms join). The enthalpy change of a reaction is the energy to break all bonds in the reactants minus the energy released making all bonds in the products: delta H = energy in (bonds broken) - energy out (bonds made). If more energy is released making bonds than was needed to break them, delta H is negative (exothermic).',
        'delta H = sum of bond energies broken - sum of bond energies made',
        'Energy-in and energy-out columns for H2 + Cl2 -> 2HCl',
        'Choosing a fuel by how much energy it releases per mole is a bond-energy question, relevant to charcoal, cooking gas and paraffin.',
        'In H2 + Cl2 -> 2HCl, which bonds are broken and which are made? Do you expect more energy in or out overall?',
        'Supplement 5.1.7-5.1.8: bond breaking and making, calculating delta H from bond energies.',
        [
          'Step 1: Draw the molecules and list every bond broken, with its energy; add them.',
          'Step 2: List every bond made in the products, with its energy; add them.',
          'Step 3: delta H = broken - made. Include the sign and kJ/mol.'
        ],
        'H-H = 436, Cl-Cl = 243, H-Cl = 432 (kJ/mol). Broken: 436 + 243 = 679. Made: 2 x 432 = 864. delta H = 679 - 864 = -185 kJ/mol (exothermic).'
      ),
      sub(
        'cie_y10_chem_s3_4',
        'Rate of Reaction: Factors, Practical Methods and Graphs (Syllabus 6.2)',
        'Rate is how fast reactants are used up or products are made',
        'The rate of a reaction is how quickly reactants are used up or products formed. It increases with higher concentration of solutions, higher pressure of gases, larger surface area of a solid (smaller pieces), higher temperature, and adding a catalyst. A catalyst increases the rate of a reaction and is unchanged at the end; enzymes are biological catalysts. Rate can be measured by the loss in mass of a reaction vessel (a gas escapes) or the volume of gas collected in a gas syringe over time. On a graph of amount of product against time, a steeper line means a faster rate and the line levels off when a reactant has run out.',
        null,
        'Graph: amount of product against time for a fast and a slow reaction',
        'Split firewood burns faster than a big log, and fine charcoal lights faster than lumps, because there is more surface area exposed. Food stays fresh longer in a cool store because the reactions that spoil it are slower at lower temperature.',
        'Why does a heap of fine charcoal dust burn faster than a solid lump of the same mass? What is different about how much of the charcoal is touching the air?',
        'Core 6.2.1-6.2.4: effect of conditions on rate, catalysts, practical methods, interpret graphs. Supplement 6.2.6, 6.2.8: explain effects and evaluate practical methods.',
        [
          'Step 1: Identify the variable changed (concentration, pressure, surface area, temperature, catalyst).',
          'Step 2: Choose a way to measure rate: mass lost or gas volume per unit time.',
          'Step 3: Read graphs: steeper = faster; the plateau shows the reaction has finished.'
        ],
        'Marble chips (calcium carbonate) with hydrochloric acid release carbon dioxide. Smaller chips give a steeper line on a gas volume against time graph, but the same final volume if the same mass of marble is used.'
      ),
      sub(
        'cie_y10_chem_s3_1',
        '3.1 Reaction Kinetics & Maxwell-Boltzmann Collision Theory',
        'Reactions happen when particles collide with at least the activation energy',
        'Collision theory says that for a reaction to happen, particles must collide and have enough energy, at least the activation energy, Ea. More frequent collisions and a larger fraction of collisions that have enough energy mean a faster rate. Higher concentration or pressure puts more particles in the same volume, so collisions are more frequent. Larger surface area exposes more particles of a solid. Higher temperature makes particles move faster, so there are more collisions, and a larger fraction have energy of at least Ea; this second effect is the main reason a small rise in temperature speeds a reaction up a lot. A catalyst lowers the activation energy, so more collisions are successful. (The Maxwell-Boltzmann distribution curve in the title is an extension idea; the 0620 syllabus asks you to describe collision theory in words.)',
        null,
        'Energy profile with and without a catalyst: lower Ea hump',
        'Catalytic converters in car exhausts use a catalyst to speed up the conversion of harmful gases. Cooking at a higher heat speeds the reactions in food, and a pressure cooker speeds cooking by raising the temperature of the water.',
        'Why does a small rise in temperature often make a reaction go much faster? Think about two things: how often particles collide, and how many collisions have enough energy.',
        'Supplement 6.2.5-6.2.7: collision theory (particles per unit volume, collision frequency, kinetic energy, activation energy), explain the effects of conditions, a catalyst lowers Ea.',
        [
          'Step 1: State the change, then say whether it changes collision frequency or the fraction of particles with at least Ea.',
          'Step 2: Link to rate: more frequent successful collisions means a faster reaction.',
          'Step 3: For a catalyst, state that it provides a path with lower Ea.'
        ],
        'Doubling the concentration of acid: twice as many acid particles per volume, so collisions are more frequent and the rate increases. Raising temperature 10 degrees C: collisions are slightly more frequent but, more importantly, a larger fraction of particles have energy of at least Ea.'
      )
    ]
  },

  // ------------------------------------------------------------
  // TOPIC 6: Chemical reactions (6.1, 6.3, 6.4; 6.2 is in station s3)
  // ------------------------------------------------------------
  {
    id: 'cie_y10_chem_s6',
    number: 6,
    title: 'Topic 6: Chemical Reactions',
    strand: 'Topic 6: Chemical reactions',
    status: 'available',
    summary: 'Physical and chemical changes, reversible reactions and equilibrium, the Haber and Contact processes, and redox. (6.2 Rate of reaction is in the Topic 5 station.)',
    subtopics: [
      sub(
        'cie_y10_chem_s6_1',
        'Physical and Chemical Changes (Syllabus 6.1)',
        'A chemical change makes a new substance; a physical change does not',
        'In a physical change no new substance is made. Melting, boiling, dissolving and condensing are physical changes, and the substance can usually be recovered by reversing the process. In a chemical change one or more new substances are made. Signs include a colour change, a gas given off, a precipitate, a temperature change, or a light or sound, and a chemical change is usually difficult to reverse. Burning a candle has both: the wax melting is physical, but the wax burning to make carbon dioxide and water is chemical.',
        null,
        'Table comparing physical and chemical change with examples',
        'Cooking an egg or ugali is a chemical change (cannot be reversed). Dissolving sugar in tea is physical (it can be recovered by evaporating the water). Rusting a mabati sheet is chemical.',
        'Salt dissolves in water and you can get it back by evaporating the water. Wood burns to ash. Which of these two changes made a new substance, and how do you know?',
        'Core 6.1.1: identify physical and chemical changes and the differences between them.',
        [
          'Step 1: Ask whether a new substance has formed.',
          'Step 2: Look for evidence: gas, colour change, precipitate, energy change.',
          'Step 3: Ask whether it is easily reversed. If not, it is probably chemical.'
        ],
        'Sodium chloride dissolving: physical, evaporate the water and the salt returns. Magnesium burning in air to make magnesium oxide: chemical, new substance with different properties and cannot be turned back by cooling.'
      ),
      sub(
        'cie_y10_chem_s6_2',
        'Reversible Reactions and Equilibrium (Syllabus 6.3)',
        'In a reversible reaction in a closed system, forward and reverse rates become equal',
        'A reversible reaction can go in both directions, shown by a double arrow. Heating blue hydrated copper(II) sulfate drives off water to give white anhydrous copper(II) sulfate; adding water turns it blue again. Cobalt(II) chloride changes between blue (anhydrous) and pink (hydrated). (Supplement) In a closed system a reversible reaction reaches equilibrium when the rate of the forward reaction equals the rate of the reverse reaction, and the concentrations of reactants and products stop changing. The position of equilibrium moves with conditions: if the forward reaction is exothermic, raising temperature moves the position toward the reactants; increasing pressure moves it toward the side with fewer gas molecules; increasing the concentration of a reactant moves it toward the products; a catalyst speeds up both directions equally so does not change the position.',
        null,
        'Equilibrium arrows and rate graph where forward and reverse rates meet',
        'The white powder in a drying packet or cobalt chloride paper that turns from blue to pink when wet shows that water is present: the reversible reaction can be used as a test.',
        'Blue copper(II) sulfate crystals turn white when heated, and blue again when water is dropped on them. What does that tell you about whether the reaction is one-way?',
        'Core 6.3.1-6.3.2: reversible reactions, hydrated and anhydrous copper(II) sulfate and cobalt(II) chloride. Supplement 6.3.3-6.3.4: equilibrium and the effect of temperature, pressure, concentration and catalyst.',
        [
          'Step 1: In a closed system, equilibrium means forward rate equals reverse rate and concentrations are constant.',
          'Step 2: To predict a shift, ask which direction opposes the change made (heat added favours the endothermic direction).',
          'Step 3: A catalyst makes equilibrium arrive faster but does not change its position.'
        ],
        'N2 + 3H2 <=> 2NH3 is exothermic. Raising temperature shifts equilibrium to the left (less ammonia); raising pressure shifts it right (4 gas molecules to 2).'
      ),
      sub(
        'cie_y10_chem_s6_3',
        'The Haber Process (Syllabus 6.3)',
        'Ammonia is made from nitrogen and hydrogen at a compromise between yield and rate',
        'The Haber process makes ammonia: N2(g) + 3H2(g) <=> 2NH3(g). Nitrogen comes from the air and hydrogen from methane (natural gas). Typical conditions are 450 degrees C, 20 000 kPa (200 atm) and an iron catalyst. The reaction is exothermic, so a high temperature lowers the yield, but a low temperature makes the reaction too slow. 450 degrees C is a compromise that gives a reasonable rate and yield. High pressure favours ammonia (fewer gas molecules) and increases the rate, but very high pressure needs expensive, strong equipment and has safety risks, so 200 atm is used. The catalyst speeds up the reaction without changing the yield. Unreacted gases are recycled.',
        null,
        'Flow diagram: N2 + H2 compressor, reactor with iron catalyst, cooling to liquid ammonia, recycle',
        'Ammonia is used to make fertilisers, so farm yields of maize, tea and coffee depend on products of this process.',
        'Why do the factories not run the Haber process at a much lower temperature to get more ammonia from each pass? What would be lost?',
        'Supplement 6.3.5-6.3.7, 6.3.11: Haber process equation, sources, typical conditions, and explain the conditions using rate, equilibrium, safety and economics.',
        [
          'Step 1: Write the equation and name the sources of nitrogen (air) and hydrogen (methane).',
          'Step 2: State conditions: 450 degrees C, 200 atm, iron catalyst.',
          'Step 3: Justify each as a trade-off between rate, equilibrium yield, safety and cost.'
        ],
        'Temperature: lower gives higher yield but too slow; higher gives a fast rate but low yield. 450 degrees C balances them. Pressure: higher gives more ammonia and speed, but costs more and is more dangerous, so a moderate high pressure is used.'
      ),
      sub(
        'cie_y10_chem_s6_4',
        'The Contact Process (Syllabus 6.3)',
        'Sulfur dioxide is converted to sulfur trioxide on the way to making sulfuric acid',
        'In the Contact process, sulfur dioxide is converted to sulfur trioxide: 2SO2(g) + O2(g) <=> 2SO3(g). The sulfur dioxide comes from burning sulfur or roasting sulfide ores, and the oxygen from the air. Typical conditions are 450 degrees C, 200 kPa (2 atm) and a vanadium(V) oxide catalyst. The reaction is exothermic, so a moderate temperature is used for a good compromise between rate and yield. Pressure is only about 2 atm because the yield is already high at that pressure, so the extra cost and risk of high pressure are not worth it. The sulfur trioxide is then used to make sulfuric acid.',
        null,
        'Flow diagram: sulfur burner, catalyst chamber V2O5, absorption tower',
        'Sulfuric acid is used in lead-acid vehicle batteries, fertilisers and many industries.',
        'The Haber process uses 200 atm but the Contact process only 2 atm. What is it about the Contact reaction that makes high pressure unnecessary?',
        'Supplement 6.3.8-6.3.11: Contact process equation, sources, conditions and why these conditions are used.',
        [
          'Step 1: Write the equation, sources of SO2 and oxygen.',
          'Step 2: State conditions: 450 degrees C, 2 atm, vanadium(V) oxide catalyst.',
          'Step 3: Explain with rate, equilibrium yield, cost and safety.'
        ],
        'Using 2 atm instead of 200: the yield is already high at this pressure, so a very high pressure would add cost and danger for almost no extra product.'
      ),
      sub(
        'cie_y10_chem_s6_5',
        'Redox: Oxygen, Electrons and Oxidation Numbers (Syllabus 6.4)',
        'Oxidation and reduction always happen together',
        'A redox reaction involves oxidation and reduction at the same time. In terms of oxygen: oxidation is gain of oxygen and reduction is loss of oxygen. (Supplement) In terms of electrons: oxidation is loss of electrons, reduction is gain of electrons (remember OIL RIG: Oxidation Is Loss, Reduction Is Gain). Oxidation numbers help to track this: oxidation increases the oxidation number, reduction decreases it. Rules: uncombined elements are 0; a monatomic ion has its charge; the sum in a neutral compound is 0; the sum in an ion equals its charge. A Roman numeral in a name, such as iron(III), gives the oxidation number.',
        null,
        'Redox with oxidation numbers written above each atom',
        'Rusting of iron on a mabati roof is oxidation of iron. The extraction of iron from its ore is reduction.',
        'In Mg + CuO -> MgO + Cu, which substance gains oxygen and which loses it? Can you also say which one lost electrons?',
        'Core 6.4.1-6.4.5: Roman numerals, redox in terms of oxygen. Supplement 6.4.6-6.4.9: electrons and oxidation numbers.',
        [
          'Step 1: Identify gain or loss of oxygen, or of electrons.',
          'Step 2: Assign oxidation numbers using the four rules.',
          'Step 3: The substance whose number increases is oxidised; the one whose number decreases is reduced.'
        ],
        'Zn + Cu2+ -> Zn2+ + Cu. Zn goes from 0 to +2 (oxidised, loses 2 electrons). Cu goes from +2 to 0 (reduced, gains 2 electrons).'
      ),
      sub(
        'cie_y10_chem_s6_6',
        'Oxidising and Reducing Agents (Syllabus 6.4)',
        'The oxidising agent is reduced, and the reducing agent is oxidised',
        'An oxidising agent oxidises another substance and is itself reduced. A reducing agent reduces another substance and is itself oxidised. In Mg + CuO -> MgO + Cu, magnesium is the reducing agent (it takes the oxygen from copper oxide) and copper(II) oxide is the oxidising agent. Colour tests help identify them: acidified potassium manganate(VII) is purple and turns colourless when it is reduced by a reducing agent; aqueous potassium iodide is colourless and turns brown when an oxidising agent changes iodide to iodine.',
        null,
        'Two test tubes: purple KMnO4 becoming colourless, colourless KI becoming brown',
        'Bleach and chlorine tablets used to treat drinking water work as oxidising agents that kill microbes.',
        'If you add a mystery solution to acidified purple potassium manganate(VII) and it turns colourless, what does that tell you about the mystery solution?',
        'Supplement 6.4.10-6.4.13: colour tests with potassium manganate(VII) and potassium iodide, define and identify oxidising and reducing agents.',
        [
          'Step 1: Find which substance is oxidised and which is reduced.',
          'Step 2: The oxidised substance is the reducing agent; the reduced substance is the oxidising agent.',
          'Step 3: Use the colour tests: purple to colourless means a reducing agent; colourless to brown with iodide means an oxidising agent.'
        ],
        'Chlorine water added to potassium iodide solution: the iodide is oxidised to iodine (brown), so chlorine is the oxidising agent: Cl2 + 2I- -> 2Cl- + I2.'
      )
    ]
  }
];

const CHEM_Y11_STATIONS = [
  // ------------------------------------------------------------
  // TOPIC 7: Acids, bases and salts
  // ------------------------------------------------------------
  {
    id: 'cie_y11_chem_s1',
    number: 7,
    title: 'Topic 7: Acids, bases and salts',
    strand: 'Topic 7: Acids, bases and salts',
    status: 'available',
    summary: 'Properties of acids and bases, indicators and pH, strong and weak acids, acidic, basic and amphoteric oxides, preparing soluble and insoluble salts, solubility rules and hydrated salts. (Redox is in Topic 6.)',
    subtopics: [
      sub(
        'cie_y11_chem_s1_2',
        'Properties of Acids and Bases, Indicators and pH (Syllabus 7.1)',
        'Acids contain H+ ions, alkalis contain OH- ions, and they neutralise each other',
        'Acids react with metals to make a salt and hydrogen, with bases to make a salt and water, and with carbonates to make a salt, water and carbon dioxide. Bases are oxides or hydroxides of metals; alkalis are bases that dissolve in water. Bases also react with ammonium salts to release ammonia. Aqueous acids contain H+ ions; aqueous alkalis contain OH- ions. Indicators: litmus is red in acid and blue in alkali; methyl orange is red in acid and yellow in alkali; thymolphthalein is colourless in acid and blue in alkali. Universal indicator paper gives a colour for pH: low pH (red/orange) means strongly acidic, 7 (green) is neutral, high pH (blue/purple) is strongly alkaline. Neutralisation is H+(aq) + OH-(aq) -> H2O(l).',
        'H+(aq) + OH-(aq) -> H2O(l)',
        'pH scale with universal indicator colours from red to purple',
        'Antacid tablets neutralise excess stomach acid. Farmers add lime to acidic soil to raise its pH. Lemon juice and vinegar (siki) are acids; wood ash lye and soap are alkaline.',
        'If you add an antacid tablet (a base) to lemon juice, what do you expect to see and what would a piece of litmus paper show before and after?',
        'Core 7.1.1-7.1.8: reactions of acids and bases, indicators, H+ and OH- ions, pH and universal indicator, neutralisation.',
        [
          'Step 1: Identify the substance: acid (H+), base (metal oxide or hydroxide), alkali (soluble base).',
          'Step 2: Write the general equation: acid + metal -> salt + H2; acid + base -> salt + water; acid + carbonate -> salt + water + CO2.',
          'Step 3: Use indicators and pH to tell them apart.'
        ],
        'Hydrochloric acid with magnesium: Mg + 2HCl -> MgCl2 + H2 (fizzing, the tube warms up). With calcium carbonate: CaCO3 + 2HCl -> CaCl2 + H2O + CO2 (fizzing, gas turns limewater milky).'
      ),
      sub(
        'cie_y11_chem_s1_3',
        'Strong and Weak Acids; Proton Transfer (Syllabus 7.1)',
        'A strong acid is fully dissociated; a weak acid is only partly dissociated',
        'An acid is a proton donor (H+ donor) and a base is a proton acceptor. A strong acid is completely dissociated in water: HCl(aq) -> H+(aq) + Cl-(aq). A weak acid is only partially dissociated, so most of its molecules stay intact and the reaction is reversible: CH3COOH(aq) <=> H+(aq) + CH3COO-(aq). Strong and weak are about how much dissociation, not about concentration. At the same concentration, the strong acid has a lower pH and reacts faster (for example with magnesium).',
        'HCl(aq) -> H+(aq) + Cl-(aq)  |  CH3COOH(aq) <=> H+(aq) + CH3COO-(aq)',
        'Particle picture: HCl all split into ions; ethanoic acid mostly intact molecules with a few ions',
        'Vinegar (siki) contains ethanoic acid, a weak acid, safe to put on food. Dilute hydrochloric acid at the same concentration would be far more corrosive.',
        'Two acids have the same concentration. One has pH 1 and the other pH 3. Which is likely the weak acid, and what does that tell you about how many H+ ions it releases?',
        'Supplement 7.1.9-7.1.12: proton donors and acceptors, strong and weak acids, equations for hydrochloric and ethanoic acids.',
        [
          'Step 1: Define acid as proton donor, base as proton acceptor.',
          'Step 2: Strong: complete dissociation, one-way arrow. Weak: partial, reversible arrow.',
          'Step 3: Compare at equal concentration: strong acid has lower pH and reacts faster.'
        ],
        '0.1 mol/dm3 HCl has pH about 1 (fully dissociated). 0.1 mol/dm3 ethanoic acid has pH about 3 (only a small fraction dissociated). Same moles of acid, but fewer H+ ions in solution for the weak acid.'
      ),
      sub(
        'cie_y11_chem_s1_4',
        'Acidic, Basic and Amphoteric Oxides (Syllabus 7.2)',
        'Non-metal oxides tend to be acidic, metal oxides tend to be basic',
        'Oxides of non-metals, such as sulfur dioxide SO2 and carbon dioxide CO2, are acidic: they dissolve in water to make acidic solutions and react with bases. Oxides of metals, such as copper(II) oxide CuO and calcium oxide CaO, are basic: they react with acids to make a salt and water. (Supplement) Amphoteric oxides react with both acids and bases to make a salt and water. Aluminium oxide, Al2O3, and zinc oxide, ZnO, are amphoteric.',
        null,
        'Periodic table split: non-metal oxides acidic, metal oxides basic, a few amphoteric',
        'Limestone is heated to make quicklime (calcium oxide), a basic oxide used in cement and to treat acidic soil. Sulfur dioxide from burning fuels with sulfur forms acid rain.',
        'Calcium oxide reacts with hydrochloric acid, and sulfur dioxide reacts with sodium hydroxide. What does this tell you about whether each oxide is acidic or basic?',
        'Core 7.2.1: classify oxides as acidic or basic. Supplement 7.2.2-7.2.3: amphoteric oxides, Al2O3 and ZnO.',
        [
          'Step 1: Is the element a metal or a non-metal? This usually predicts basic or acidic.',
          'Step 2: Test: does it react with acids (basic), bases (acidic), or both (amphoteric)?',
          'Step 3: Write the salt and water formed.'
        ],
        'CaO + 2HCl -> CaCl2 + H2O (basic oxide). SO2 + 2NaOH -> Na2SO3 + H2O (acidic oxide). ZnO reacts with both HCl and NaOH, so it is amphoteric.'
      ),
      sub(
        'cie_y11_chem_s1_1',
        '4.1 Salt Preparation Methods: Titration, Excess Insoluble Base & Precipitation',
        'Choose a method by whether the reactants and the salt are soluble',
        'A salt is made when the H+ of an acid is replaced by a metal or ammonium ion. Method depends on solubility. To make a soluble salt from an insoluble solid (excess metal, insoluble base or insoluble carbonate): add the solid to the acid until no more reacts, so the acid is used up; filter off the unreacted solid; heat the filtrate to evaporate some water until crystals start to form at the edge (saturation); leave to cool and crystallise; filter, wash and dry the crystals. To make a soluble salt from an acid and an alkali: use a titration with an indicator to find the exact volumes, then repeat without the indicator, evaporate and crystallise. (Supplement) To make an insoluble salt: mix two solutions that contain its ions, filter off the precipitate, wash with distilled water and dry.',
        'acid + metal -> salt + hydrogen  |  acid + base -> salt + water  |  acid + carbonate -> salt + water + CO2',
        'Flowchart: add excess solid, filter, evaporate, crystallise, dry',
        'Fertiliser salts such as ammonium sulfate and potassium nitrate are made by these routes; crystallising salt from brine by evaporation is a similar idea.',
        'Why must copper(II) oxide be added in excess when making copper(II) sulfate from sulfuric acid? What would you find in the crystals if the acid was in excess instead?',
        'Core 7.3.1: preparation of soluble salts from alkali by titration, excess metal, excess insoluble base, excess insoluble carbonate. Supplement 7.3.4: insoluble salts by precipitation.',
        [
          'Step 1: Decide: is the salt soluble or insoluble? Is the other reactant a solution or an insoluble solid?',
          'Step 2: Follow the method: excess solid then filter, or titration then evaporate, or mix solutions then filter the precipitate.',
          'Step 3: Crystallise by partial evaporation and cooling, then dry between filter papers.'
        ],
        'Copper(II) sulfate: warm dilute sulfuric acid, add black CuO until some remains undissolved, filter the blue filtrate (CuO + H2SO4 -> CuSO4 + H2O), evaporate until saturated, cool and collect blue crystals.'
      ),
      sub(
        'cie_y11_chem_s1_5',
        'Solubility Rules, Precipitation and Hydrated Salts (Syllabus 7.3)',
        'Solubility rules predict which salts make a precipitate; hydrated crystals hold water in their structure',
        'General solubility rules: sodium, potassium and ammonium salts are soluble; nitrates are soluble; chlorides are soluble except those of lead and silver; sulfates are soluble except those of barium, calcium and lead; carbonates are insoluble except sodium, potassium and ammonium; hydroxides are insoluble except sodium, potassium, ammonium and calcium (partially). When two solutions are mixed and an insoluble salt is possible, it forms a precipitate. A hydrated substance is chemically combined with water, written with water of crystallisation such as CuSO4.5H2O (blue) or CoCl2.6H2O (pink); an anhydrous substance contains no water (white CuSO4, blue CoCl2).',
        'Pb2+(aq) + 2I-(aq) -> PbI2(s)',
        'Table: soluble and insoluble salts; blue hydrated copper sulfate becoming white',
        'Hard water scale in kettles and on taps is calcium carbonate that has come out of solution. In many parts of Kenya, borehole water with dissolved calcium forms this scale.',
        'You mix lead(II) nitrate solution with potassium iodide solution and a yellow solid appears. Using the solubility rules, can you work out which salt must be insoluble and why the other salt stayed in solution?',
        'Core 7.3.2-7.3.3: solubility rules, hydrated and anhydrous. Supplement 7.3.5: water of crystallisation.',
        [
          'Step 1: Write the ions in each solution and swap partners.',
          'Step 2: Check each possible new salt against the solubility rules.',
          'Step 3: If one is insoluble it is the precipitate; write the ionic equation with state symbols.'
        ],
        'Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq). Potassium nitrate is soluble (both potassium salts and nitrates are soluble) and lead(II) iodide is not, so yellow PbI2 precipitates.'
      )
    ]
  },

  // ------------------------------------------------------------
  // TOPIC 8: The Periodic Table
  // ------------------------------------------------------------
  {
    id: 'cie_y11_chem_s3',
    number: 8,
    title: 'Topic 8: The Periodic Table',
    strand: 'Topic 8: The Periodic Table',
    status: 'available',
    summary: 'Arrangement of elements, Group I alkali metals, Group VII halogens, transition elements and noble gases.',
    subtopics: [
      sub(
        'cie_y11_chem_s3_1',
        'Arrangement of Elements in the Periodic Table (Syllabus 8.1)',
        'Position in the table predicts an element\'s properties',
        'The Periodic Table arranges elements in order of increasing proton number in rows called periods and columns called groups. Across a period the character changes from metallic on the left to non-metallic on the right. Elements in the same group have similar chemical properties because they have the same number of outer electrons. For Groups I to VII, the group number equals the number of outer electrons, and the charge on the ion tends to follow it: Group I forms 1+, Group II forms 2+, Group VI forms 2-, Group VII forms 1-. The position of an element lets you predict its properties. (Supplement) You can identify trends in a group from given information about the elements.',
        null,
        'Periodic Table outline with periods, groups and metal and non-metal regions',
        'Lithium, sodium and potassium all react vigorously with water. Knowing sodium does so lets you predict potassium will, only more violently.',
        'Sodium and potassium have different numbers of protons and electrons, but both react vigorously with water. What do they have in common that explains this?',
        'Core 8.1.1-8.1.5: arrangement, metallic to non-metallic across a period, group number and ion charge, group similarities, predicting properties. Supplement 8.1.6: identify trends in groups.',
        [
          'Step 1: Find the element: its group gives outer electrons, its period gives the number of shells.',
          'Step 2: Use outer electrons to predict ion charge and reactions.',
          'Step 3: Use neighbours in the same group to predict the trend.'
        ],
        'Magnesium is Group II, so it has 2 outer electrons, forms Mg2+, and its oxide is MgO. Calcium is in the same group, so calcium oxide is CaO.'
      ),
      sub(
        'cie_y11_chem_s3_2',
        'Group I: The Alkali Metals (Syllabus 8.2)',
        'Going down Group I, the metals become more reactive',
        'The Group I metals lithium, sodium and potassium are relatively soft metals. Going down the group the melting point decreases, the density increases, and the reactivity increases. They react with cold water to make hydrogen and a metal hydroxide that dissolves to give an alkaline solution, for example 2Na + 2H2O -> 2NaOH + H2. Reactivity rises down the group because the outer electron is further from the nucleus and is lost more easily. (Supplement) You should be able to predict the properties of other Group I elements, such as rubidium and caesium, from the trends.',
        null,
        'Group I trends arrow: reactivity up as you go down; metals in water',
        'Sodium and potassium must be stored under oil because they react with moisture and oxygen in the air.',
        'Lithium fizzes gently on water, sodium fizzes quickly, and potassium catches fire. What is changing about the outer electron as you go down the group?',
        'Core 8.2.1: trends in melting point, density and reactivity. Supplement 8.2.2: predict properties of other Group I elements.',
        [
          'Step 1: State the trends: melting point down, density up, reactivity up.',
          'Step 2: Write the reaction with water: metal + water -> metal hydroxide + hydrogen.',
          'Step 3: Explain reactivity by the position of the outer electron and use the trends to predict a new element.'
        ],
        'Potassium is below sodium, so it reacts more vigorously with water: 2K + 2H2O -> 2KOH + H2, and the solution is alkaline (turns universal indicator purple).'
      ),
      sub(
        'cie_y11_chem_s3_3',
        'Group VII: The Halogens and Displacement Reactions (Syllabus 8.3)',
        'Going down Group VII, the halogens become less reactive',
        'The halogens chlorine, bromine and iodine are diatomic non-metals (Cl2, Br2, I2). At room temperature chlorine is a pale yellow-green gas, bromine a red-brown liquid and iodine a grey-black solid. Going down the group the density increases and the reactivity decreases. A more reactive halogen displaces a less reactive halogen from a solution of its halide: Cl2 + 2KBr -> 2KCl + Br2 (the colourless solution turns orange-brown), while iodine does not displace bromine or chlorine. (Supplement) You should be able to predict the properties of other Group VII elements from the trends.',
        'Cl2(aq) + 2Br-(aq) -> 2Cl-(aq) + Br2(aq)',
        'Test tubes with chlorine added to KBr and KI solutions and the colour changes',
        'Chlorine is used to treat drinking water and swimming pools, while iodine in table salt (iodised salt) helps prevent goitre.',
        'Chlorine water is added to potassium bromide solution and the solution turns orange. What has happened to the bromide ions, and what does it tell you about which halogen is more reactive?',
        'Core 8.3.1-8.3.3: trends, appearance at r.t.p., displacement. Supplement 8.3.4: predict properties of other Group VII elements.',
        [
          'Step 1: State the trend: reactivity decreases down the group.',
          'Step 2: Displacement: the more reactive halogen takes the place of the less reactive one in its halide.',
          'Step 3: Identify the halogen by the colour in solution (orange for bromine, brown for iodine) and write the ionic equation.'
        ],
        'Cl2 + 2KI -> 2KCl + I2: chlorine is more reactive than iodine, so it displaces iodine, giving a brown solution. Br2 + KCl gives no reaction because bromine is less reactive than chlorine.'
      ),
      sub(
        'cie_y11_chem_s3_4',
        'Transition Elements (Syllabus 8.4)',
        'Transition elements are dense, strong, coloured and often good catalysts',
        'Transition elements are metals in the middle block of the Periodic Table. They have high densities and high melting points, form coloured compounds, and often act as catalysts both as elements and in compounds. (Supplement) Their ions can have more than one oxidation number: iron forms iron(II), Fe2+, and iron(III), Fe3+, whose solutions have different colours (pale green and yellow-brown).',
        null,
        'Periodic Table with the transition block highlighted; coloured solutions',
        'Iron is the catalyst in the Haber process; vanadium(V) oxide in the Contact process; nickel in making margarine from vegetable oils. Copper compounds colour the blue of copper sulfate crystals.',
        'If sodium (Group I) and iron (a transition metal) are compared, which would you choose for a catalyst, a bridge or a cooking pot, and why?',
        'Core 8.4.1: properties of transition elements. Supplement 8.4.2: variable oxidation numbers, iron(II) and iron(III).',
        [
          'Step 1: List the properties: high density, high melting point, coloured compounds, catalysts.',
          'Step 2: Recognise variable oxidation numbers, for example Fe2+ and Fe3+.',
          'Step 3: Contrast with Group I: soft, low melting point, white compounds.'
        ],
        'Iron(II) sulfate is pale green; iron(III) chloride is yellow-brown. Both contain iron but in different oxidation states, which is why the colours differ.'
      ),
      sub(
        'cie_y11_chem_s3_5',
        'Noble Gases (Syllabus 8.5)',
        'A full outer shell makes the noble gases unreactive',
        'The Group VIII noble gases (helium, neon, argon and others) are unreactive, monatomic gases, meaning their particles are single atoms. They are unreactive because they have a full outer shell of electrons, so atoms have no need to gain, lose or share electrons. This also explains why other atoms react: they gain, lose or share electrons to get the same full shell as a noble gas.',
        null,
        'Electron shell diagrams of He, Ne, Ar with full outer shells',
        'Argon is used inside filament light bulbs so the hot filament does not burn. Helium is used in balloons because it is light and does not burn.',
        'Why does sodium easily lose one electron but argon does not take part in reactions at all? Think about the outer shell of each.',
        'Core 8.5.1: noble gases as unreactive monatomic gases, explained by electronic configuration.',
        [
          'Step 1: State that noble gases have full outer shells.',
          'Step 2: Link to unreactivity: no need to gain, lose or share electrons.',
          'Step 3: Say they exist as single atoms (monatomic), not molecules.'
        ],
        'Argon is 2,8,8: a full outer shell. It does not form compounds under normal conditions, so it is used to keep other substances from reacting with oxygen.'
      )
    ]
  },

  // ------------------------------------------------------------
  // TOPIC 9: Metals
  // ------------------------------------------------------------
  {
    id: 'cie_y11_chem_s4',
    number: 9,
    title: 'Topic 9: Metals',
    strand: 'Topic 9: Metals',
    status: 'available',
    summary: 'Properties and uses of metals, alloys, the reactivity series and displacement, rusting and its prevention, and the extraction of iron and aluminium.',
    subtopics: [
      sub(
        'cie_y11_chem_s4_1',
        'Physical and Chemical Properties of Metals (Syllabus 9.1)',
        'Metals conduct, bend, and form basic oxides; non-metals mostly do not',
        'Compared with non-metals, metals are generally good conductors of heat and electricity, malleable and ductile, and have high melting and boiling points. Non-metals generally have the opposite properties. Chemically, metals can react with dilute acids (to make a salt and hydrogen), with water (cold water or steam, to make a hydroxide or oxide and hydrogen), and with oxygen (to make a metal oxide). How vigorously they react depends on the metal.',
        null,
        'Table comparing metal and non-metal properties',
        'Aluminium and iron sufuria conduct heat from the jiko to the food; plastic handles do not conduct heat, so they are safe to hold.',
        'A cooking pot is metal and its handle is plastic or wood. Using what you know about conduction, why were these materials chosen?',
        'Core 9.1.1-9.1.2: compare physical properties of metals and non-metals; general reactions with dilute acids, water and oxygen.',
        [
          'Step 1: List the physical properties and compare with non-metals.',
          'Step 2: Write the general chemical reactions: metal + acid -> salt + hydrogen; metal + oxygen -> metal oxide.',
          'Step 3: Remember reactivity varies; see the reactivity series.'
        ],
        'Magnesium burns in oxygen: 2Mg + O2 -> 2MgO. Zinc with dilute hydrochloric acid: Zn + 2HCl -> ZnCl2 + H2.'
      ),
      sub(
        'cie_y11_chem_s4_2',
        'Uses of Metals (Syllabus 9.2)',
        'A metal is chosen for a job because of its properties',
        'Aluminium is used for aircraft because of its low density; for overhead electrical cables because of its low density and good electrical conductivity; and for food containers because of its resistance to corrosion. Copper is used in electrical wiring because of its good electrical conductivity and ductility.',
        null,
        'Cables, aircraft, food container, copper wire labelled with the property',
        'Overhead power lines across Kenya use aluminium; the wiring inside homes uses copper; the sufuria in the kitchen is aluminium.',
        'A power line stretches kilometres between pylons. Why would a light metal that conducts well be better than a heavy one?',
        'Core 9.2.1: uses of aluminium and copper related to their properties.',
        [
          'Step 1: Identify the property needed for the job.',
          'Step 2: Match the metal and name the property.',
          'Step 3: Justify the choice with a reason, not only a statement.'
        ],
        'Copper wiring: copper is an excellent conductor and ductile, so it can be drawn into thin wire and carry current with little energy loss.'
      ),
      sub(
        'cie_y11_chem_s4_3',
        'Alloys and Their Properties (Syllabus 9.3)',
        'Mixing metals with other elements can make them harder and stronger',
        'An alloy is a mixture of a metal with other elements. Brass is a mixture of copper and zinc. Stainless steel is a mixture of iron with other elements such as chromium, nickel and carbon. Alloys can be harder and stronger than pure metals and so are more useful. Stainless steel is used for cutlery because it is hard and resistant to rusting. (Supplement) In a pure metal, all atoms are the same size, so the layers can slide over each other easily. In an alloy, atoms of different sizes disrupt the regular layers so the layers can no longer slide, making the alloy harder and stronger.',
        null,
        'Pure metal with regular layers vs alloy with different-sized atoms blocking slipping',
        'Brass is used for door handles and musical instruments; stainless steel for knives, forks and water tanks.',
        'Pure copper is soft and bends easily. Brass, which is copper with some zinc, is harder. Using a picture of the atoms, how would you explain this?',
        'Core 9.3.1-9.3.4: alloys, brass, stainless steel, uses and representations. Supplement 9.3.5: explain hardness in terms of structure.',
        [
          'Step 1: Name the alloy and its components.',
          'Step 2: State the improved property (harder, stronger, resists rusting).',
          'Step 3: Explain: different-sized atoms stop layers sliding.'
        ],
        'Stainless steel cutlery: iron alone would rust and soften, but with chromium and nickel it is hard and does not rust.'
      ),
      sub(
        'cie_y11_chem_s4_4',
        'The Reactivity Series (Syllabus 9.4)',
        'The reactivity series ranks metals by how readily they react',
        'The reactivity series, from most to least reactive, is potassium, sodium, calcium, magnesium, aluminium, carbon, zinc, iron, hydrogen, copper, silver, gold. Potassium, sodium and calcium react with cold water; magnesium reacts with steam; magnesium, zinc and iron react with dilute hydrochloric acid, while copper, silver and gold do not. You can deduce an order of reactivity from experimental results such as the speed of bubbling or the temperature rise. (Supplement) Reactivity is the tendency to form positive ions: the more reactive the metal, the more easily it loses electrons.',
        null,
        'Ladder of metals with potassium at the top and gold at the bottom',
        'Gold, silver and copper are found as metals in nature and have been used for jewellery for thousands of years, while sodium is only found as compounds such as salt.',
        'Zinc reacts with hydrochloric acid and copper does not. What does this tell you about which is higher in the series, and how would you use that to rank a third metal?',
        'Core 9.4.1-9.4.3: order of the series, reactions with water, steam and acid, deducing order from results. Supplement 9.4.4: tendency to form positive ions.',
        [
          'Step 1: Learn the order.',
          'Step 2: Match reactions to position: top metals react with cold water, middle ones with steam or acid, bottom ones with neither.',
          'Step 3: Use observations (rate of bubbles) to rank metals.'
        ],
        'Reaction with dilute HCl: magnesium bubbles quickly, zinc bubbles more slowly, iron bubbles very slowly, copper does not react. Order of reactivity: Mg > Zn > Fe > Cu.'
      ),
      sub(
        'cie_y11_chem_s4_5',
        'Displacement Reactions and the Oxide Layer on Aluminium (Syllabus 9.4)',
        'A more reactive metal pushes a less reactive metal out of its compound',
        'In a displacement reaction a more reactive metal displaces a less reactive metal from a solution of its salt. For example, iron displaces copper from copper(II) sulfate: Fe + CuSO4 -> FeSO4 + Cu; the iron nail becomes coated with brown copper. This happens because the more reactive metal forms positive ions more readily. (Supplement) You should compare magnesium, zinc, iron, copper and silver with solutions of their ions. Aluminium is high in the series but appears unreactive because it is covered by a thin, tough layer of aluminium oxide that stops the metal underneath from reacting.',
        'Fe(s) + Cu2+(aq) -> Fe2+(aq) + Cu(s)',
        'Iron nail in blue copper sulfate becoming coated with copper',
        'An aluminium sufuria does not corrode quickly even though aluminium is a reactive metal, because of its oxide layer.',
        'An iron nail is put in copper(II) sulfate solution and becomes coated in brown solid. Which metal is more reactive, and where did the brown solid come from?',
        'Supplement 9.4.4-9.4.5: displacement reactions of Mg, Zn, Fe, Cu and Ag with aqueous ions, and the apparent unreactivity of aluminium.',
        [
          'Step 1: Compare positions in the reactivity series.',
          'Step 2: If the metal is higher than the metal in solution, displacement happens.',
          'Step 3: For aluminium, explain with the oxide layer.'
        ],
        'Zn + CuSO4 -> ZnSO4 + Cu works, because zinc is above copper. Cu + ZnSO4 gives no reaction.'
      ),
      sub(
        'cie_y11_chem_s4_6',
        'Corrosion of Metals: Rusting and Its Prevention (Syllabus 9.5)',
        'Iron rusts when it is in contact with both oxygen and water',
        'Rusting is the corrosion of iron and steel to form hydrated iron(III) oxide. It needs both oxygen (air) and water. Barrier methods such as painting, greasing and coating with plastic prevent rusting by excluding oxygen or water. (Supplement) Zinc protects iron in two ways when used in galvanising. It forms a barrier, and if the coating is scratched it provides sacrificial protection: zinc is more reactive than iron, so zinc loses electrons and corrodes in preference, and the iron is protected.',
        null,
        'Test tubes: nail in dry air, nail in boiled water under oil, nail in water and air',
        'Mabati (corrugated iron) roofs are galvanised, coated in zinc, which delays rusting; the roofs rust faster near the coast where salty moist air speeds up corrosion.',
        'A galvanised mabati sheet gets a deep scratch down to the iron, but the iron around the scratch does not rust for a long time. What is the zinc doing?',
        'Core 9.5.1-9.5.3: rusting conditions and barrier methods. Supplement 9.5.4-9.5.5: galvanising and sacrificial protection.',
        [
          'Step 1: State what is needed for rusting: oxygen and water.',
          'Step 2: Barrier methods keep one or both away.',
          'Step 3: Sacrificial protection: a more reactive metal loses electrons instead of iron.'
        ],
        'Boiled water with oil on top (no oxygen) and dry air with calcium chloride (no water) both keep a nail from rusting. Only a nail with air and water rusts.'
      ),
      sub(
        'cie_y11_chem_s4_7',
        'Extraction of Iron: The Blast Furnace (Syllabus 9.6)',
        'Carbon monoxide takes the oxygen from iron ore in a hot furnace',
        'How easily a metal is obtained from its ore depends on its position in the reactivity series: less reactive metals are easier to extract. Iron is extracted from hematite (iron(III) oxide) in the blast furnace. Coke (carbon) burns in hot air to give heat and carbon dioxide; the carbon dioxide is reduced by more coke to carbon monoxide; carbon monoxide reduces iron(III) oxide to iron; limestone decomposes to calcium oxide, which reacts with sand impurities to form slag. Equations: C + O2 -> CO2; C + CO2 -> 2CO; Fe2O3 + 3CO -> 2Fe + 3CO2; CaCO3 -> CaO + CO2; CaO + SiO2 -> CaSiO3.',
        'Fe2O3 + 3CO -> 2Fe + 3CO2',
        'Blast furnace diagram with raw materials in at the top, hot air at the bottom, slag and iron out',
        'The steel bars in Kenyan buildings and in railway lines are made from iron produced in this way.',
        'In the furnace, which substance is being oxidised and which reduced when iron(III) oxide changes to iron? What is the role of the limestone?',
        'Core 9.6.1-9.6.2: ease of extraction and the blast furnace. Supplement 9.6.4: equations for the extraction of iron.',
        [
          'Step 1: Raw materials in: hematite, coke, limestone, hot air.',
          'Step 2: Reactions: coke burns, makes CO, CO reduces Fe2O3, limestone makes slag.',
          'Step 3: Products: molten iron and slag, which are tapped separately.'
        ],
        'Fe2O3 loses oxygen (reduced) to CO, which gains oxygen to become CO2 (oxidised). CaCO3 -> CaO + CO2, then CaO + SiO2 -> CaSiO3 (slag) removes the sand.'
      ),
      sub(
        'cie_y11_chem_s4_8',
        'Extraction of Aluminium by Electrolysis (Syllabus 9.6)',
        'Aluminium is above carbon in the series, so it is extracted by electrolysis',
        'The main ore of aluminium is bauxite, purified to aluminium oxide. Aluminium is more reactive than carbon, so carbon cannot reduce it; instead it is extracted by electrolysis. (Supplement) Aluminium oxide has a very high melting point, so it is dissolved in molten cryolite, which lowers the temperature needed and saves energy. At the cathode aluminium forms: Al3+ + 3e- -> Al. At the carbon anode oxygen forms: 2O2- -> O2 + 4e-. The oxygen reacts with the hot carbon anodes to make carbon dioxide, so the anodes burn away and must be replaced regularly. Details of purifying bauxite are not required.',
        'cathode: Al3+ + 3e- -> Al  |  anode: 2O2- -> O2 + 4e-',
        'Electrolysis cell: carbon anodes, carbon-lined cathode, molten aluminium oxide in cryolite',
        'Aluminium is used for cooking pots, roofing sheets and window frames, but making it uses a great deal of electricity, so recycling aluminium cans and sufuria saves large amounts of energy.',
        'Why is cryolite added to the aluminium oxide, and why do the carbon anodes have to be replaced from time to time?',
        'Core 9.6.3: bauxite and electrolysis. Supplement 9.6.5: role of cryolite, anodes replaced, half-equations.',
        [
          'Step 1: Ore is bauxite; the metal is too reactive for carbon reduction, so electrolysis is used.',
          'Step 2: Dissolve aluminium oxide in molten cryolite to lower the operating temperature.',
          'Step 3: Write electrode equations and explain that oxygen reacts with the carbon anode.'
        ],
        'Anode: oxygen is made at about 950 degrees C and reacts with the carbon: C + O2 -> CO2, so the anode wears away and must be replaced.'
      )
    ]
  },

  // ------------------------------------------------------------
  // TOPIC 10: Chemistry of the environment
  // ------------------------------------------------------------
  {
    id: 'cie_y11_chem_s5',
    number: 10,
    title: 'Topic 10: Chemistry of the Environment',
    strand: 'Topic 10: Chemistry of the environment',
    status: 'available',
    summary: 'Water tests and treatment, fertilisers, composition of air, air pollutants, climate change, acid rain and photosynthesis.',
    subtopics: [
      sub(
        'cie_y11_chem_s5_1',
        'Water: Tests, Purity and Impurities (Syllabus 10.1)',
        'Pure water has a fixed melting point and boiling point; natural water carries many things',
        'Water can be tested for with anhydrous copper(II) sulfate, which turns from white to blue, and anhydrous cobalt(II) chloride, which turns from blue to pink. Pure water melts at 0 degrees C and boils at 100 degrees C (at standard pressure); impure water melts lower and boils higher and over a range. Distilled water is used in practical chemistry instead of tap water because it contains fewer chemical impurities. Water from natural sources can contain dissolved oxygen, metal compounds, plastics, sewage, harmful microbes, nitrates from fertilisers, and phosphates from fertilisers and detergents. Some are beneficial: dissolved oxygen for fish and other aquatic life, and some metal compounds as essential minerals. Some are harmful: some metal compounds are toxic, plastics harm aquatic life, sewage contains disease-causing microbes, and nitrates and phosphates lead to deoxygenation of water and damage to aquatic life.',
        null,
        'Anhydrous copper sulfate turning blue; cobalt chloride paper turning pink',
        'In Lake Victoria, run-off carrying fertiliser and sewage helps water hyacinth and algae grow thickly, using up oxygen the fish need. Boiling or treating water at home removes microbes but not chemicals like nitrates.',
        'How could you show that a clear liquid is water, and how could you tell whether it is pure water?',
        'Core 10.1.1-10.1.6: tests for water, purity, distilled water, impurities, beneficial and harmful substances.',
        [
          'Step 1: Test for water: anhydrous copper(II) sulfate white to blue; cobalt(II) chloride blue to pink.',
          'Step 2: Test purity by melting point and boiling point.',
          'Step 3: List impurities and say which are beneficial and which are harmful.'
        ],
        'A colourless liquid turns white copper(II) sulfate blue, so it contains water. It boils at 102 degrees C, not 100, so it is not pure: something is dissolved in it.'
      ),
      sub(
        'cie_y11_chem_s5_2',
        'Treatment of the Domestic Water Supply (Syllabus 10.1)',
        'Water is cleaned in stages: remove solids, remove tastes, kill microbes',
        'Treatment of domestic water has three main steps. Sedimentation and filtration remove solids: heavier particles settle, and the water passes through beds of sand and gravel. Carbon is used to remove tastes and odours. Chlorination kills microbes. The result is safe to drink though not pure water, because dissolved substances remain.',
        null,
        'Flow diagram: reservoir, settling tank, filter bed, carbon, chlorine, supply',
        'Municipal water works supplying Nairobi, Mombasa and other towns follow these steps. At home, chlorine tablets or boiling are used when water source is not treated.',
        'Filtering water through sand removes soil and bits. Why is chlorine still needed after filtration, and what kind of impurity does each step remove?',
        'Core 10.1.7: sedimentation, filtration, carbon and chlorination.',
        [
          'Step 1: Sedimentation then filtration remove solid particles.',
          'Step 2: Carbon removes tastes and odours.',
          'Step 3: Chlorination kills microbes.'
        ],
        'Muddy river water: after settling and filtering it looks clear, but it can still contain microbes that cause disease, so chlorine is added before the water is piped to homes.'
      ),
      sub(
        'cie_y11_chem_s5_3',
        'Fertilisers (Syllabus 10.2)',
        'NPK fertilisers add the elements plants need to grow',
        'Ammonium salts and nitrates are used as fertilisers because they supply nitrogen to plants. NPK fertilisers contain compounds of nitrogen (N), phosphorus (P) and potassium (K), which improve plant growth. If too much fertiliser washes into rivers and lakes it causes harm, as explained in the water section.',
        null,
        'NPK label on a fertiliser bag with each element and its role',
        'Farmers growing maize, tea or vegetables in Kenya use fertilisers from agrovets, and the bag usually shows the N, P and K content.',
        'A farmer notices maize leaves turning yellow and stunted growth. Which of the elements N, P and K might be lacking, and why must the fertiliser be dissolved or in a soluble form for plants to use it?',
        'Core 10.2.1-10.2.2: ammonium salts and nitrates as fertilisers, NPK.',
        [
          'Step 1: Name the three elements in NPK: nitrogen, phosphorus, potassium.',
          'Step 2: Say what each does for the crop (growth, roots, and so on).',
          'Step 3: Mention the risk of run-off into water.'
        ],
        'Ammonium nitrate, NH4NO3, supplies nitrogen as both ammonium and nitrate. It is made by neutralising ammonia with nitric acid: NH3 + HNO3 -> NH4NO3.'
      ),
      sub(
        'cie_y11_chem_s5_4',
        'Air Composition and Air Pollutants (Syllabus 10.3)',
        'Clean air is mostly nitrogen and oxygen; pollutants come from burning fuels and from waste',
        'Clean, dry air is approximately 78% nitrogen, 21% oxygen, and the remainder is a mixture of noble gases and carbon dioxide. Common pollutants and their sources: carbon dioxide from the complete combustion of carbon-containing fuels; carbon monoxide and particulates (soot) from incomplete combustion; methane from the decomposition of vegetation and waste gases from digestion in animals; oxides of nitrogen from car engines; sulfur dioxide from burning fossil fuels containing sulfur compounds. Effects: carbon dioxide and methane increase global warming and climate change; carbon monoxide is toxic; particulates raise the risk of respiratory problems and cancer; oxides of nitrogen cause acid rain, photochemical smog and respiratory problems; sulfur dioxide causes acid rain.',
        null,
        'Pie chart of air composition; table of pollutant, source and effect',
        'Charcoal and wood burning in a closed room produces carbon monoxide, a toxic gas that has no smell, so rooms must be ventilated. Vehicle exhaust in Nairobi traffic adds particulates and oxides of nitrogen.',
        'Why is it dangerous to burn charcoal in a closed room overnight, and which of the pollutants in the list would be produced?',
        'Core 10.3.1-10.3.3: composition of air, sources and effects of pollutants.',
        [
          'Step 1: Recall the composition of clean air.',
          'Step 2: Match each pollutant to its source.',
          'Step 3: State its adverse effect.'
        ],
        'Complete combustion: C + O2 -> CO2. Incomplete combustion (not enough oxygen): 2C + O2 -> 2CO, the toxic gas that also forms when charcoal burns indoors.'
      ),
      sub(
        'cie_y11_chem_s5_5',
        'Greenhouse Gases and Climate Change (Syllabus 10.3)',
        'Carbon dioxide and methane trap thermal energy that would otherwise escape to space',
        'Greenhouse gases such as carbon dioxide and methane absorb, reflect and emit thermal energy. This reduces the thermal energy lost to space, so the Earth warms: global warming, which leads to climate change. Strategies to reduce the effects of climate change include planting trees, reducing livestock farming, decreasing use of fossil fuels, and increasing use of hydrogen and renewable energy such as wind and solar.',
        null,
        'Sun, Earth, greenhouse gas layer with arrows of thermal energy',
        'Kenya generates a large share of its electricity from geothermal, hydro and wind power. Reducing the use of firewood and charcoal and planting trees helps reduce carbon dioxide.',
        'Planting trees takes in carbon dioxide while burning fossil fuels releases it. Why do both matter when thinking about the total amount of carbon dioxide in the air?',
        'Core 10.3.4. Supplement 10.3.7: how greenhouse gases cause global warming.',
        [
          'Step 1: Name the two gases: carbon dioxide and methane.',
          'Step 2: Explain: they absorb, reflect and emit thermal energy, reducing energy lost to space.',
          'Step 3: Give strategies and say how each helps.'
        ],
        'Replacing coal or petrol with solar, wind or hydrogen reduces carbon dioxide released. Planting trees removes carbon dioxide through photosynthesis.'
      ),
      sub(
        'cie_y11_chem_s5_6',
        'Acid Rain, Oxides of Nitrogen and Catalytic Converters (Syllabus 10.3)',
        'Sulfur dioxide and nitrogen oxides dissolve in rain; catalysts in car exhausts remove nitrogen oxides',
        'Acid rain is caused by sulfur dioxide and oxides of nitrogen. Strategies to reduce acid rain include using catalytic converters in vehicles, using low-sulfur fuels, and flue gas desulfurisation with calcium oxide, which reacts with sulfur dioxide before it escapes. (Supplement) Oxides of nitrogen form in car engines because the high temperature makes nitrogen and oxygen from the air react. Catalytic converters remove them, for example 2CO + 2NO -> 2CO2 + N2.',
        '2CO + 2NO -> 2CO2 + N2',
        'Catalytic converter in an exhaust pipe turning CO and NO into CO2 and N2',
        'Vehicles with catalytic converters produce less harmful exhaust gas; countries with strict emission rules require them.',
        'Nitrogen and oxygen in air do not react at room temperature, but they do inside a car engine. What is different about the engine, and what does a catalytic converter change the harmful gases into?',
        'Core 10.3.4: acid rain strategies. Supplement 10.3.8: formation of oxides of nitrogen and removal by catalytic converters.',
        [
          'Step 1: Name the pollutants causing acid rain: SO2 and oxides of nitrogen.',
          'Step 2: Explain formation of oxides of nitrogen: high temperature in the engine.',
          'Step 3: Describe removal: catalytic converter, 2CO + 2NO -> 2CO2 + N2; or flue gas desulfurisation using calcium oxide.'
        ],
        'In the converter, carbon monoxide and nitrogen monoxide react on the catalyst to make carbon dioxide and nitrogen, which are less harmful.'
      ),
      sub(
        'cie_y11_chem_s5_7',
        'Photosynthesis (Syllabus 10.3)',
        'Plants use light energy to turn carbon dioxide and water into glucose and oxygen',
        'Photosynthesis is the reaction between carbon dioxide and water to produce glucose and oxygen, in the presence of chlorophyll and using energy from light. Word equation: carbon dioxide + water -> glucose + oxygen. (Supplement) Symbol equation: 6CO2 + 6H2O -> C6H12O6 + 6O2. Photosynthesis removes carbon dioxide from the air and adds oxygen, which is why forests are important in balancing carbon dioxide.',
        '6CO2 + 6H2O -> C6H12O6 + 6O2',
        'Leaf diagram with CO2 and water in, glucose and oxygen out, sunlight arrow',
        'Maize, tea and trees on a farm take carbon dioxide from the air as they grow.',
        'A leaf covered with foil for a week does not make food. What is missing, and why does the plant need chlorophyll?',
        'Core 10.3.5-10.3.6: describe and word equation for photosynthesis. Supplement 10.3.9: symbol equation.',
        [
          'Step 1: State the reactants and products and the conditions: chlorophyll and light.',
          'Step 2: Write the word equation.',
          'Step 3: Write and balance the symbol equation (supplement).'
        ],
        '6CO2 + 6H2O -> C6H12O6 + 6O2. Check: 6 C, 12 H and 18 O on each side.'
      )
    ]
  },

  // ------------------------------------------------------------
  // TOPIC 11: Organic chemistry
  // ------------------------------------------------------------
  {
    id: 'cie_y11_chem_s2',
    number: 11,
    title: 'Topic 11: Organic chemistry',
    strand: 'Topic 11: Organic chemistry',
    status: 'available',
    summary: 'Formulae and homologous series, naming, fuels and fractional distillation, alkanes, alkenes, alcohols, carboxylic acids, polymers, plastics and proteins.',
    subtopics: [
      sub(
        'cie_y11_chem_s2_2',
        'Formulae, Functional Groups and Terminology (Syllabus 11.1)',
        'A homologous series is a family of compounds with the same functional group and similar properties',
        'Organic chemistry is the chemistry of carbon compounds. A displayed formula shows all the atoms and all the bonds. A homologous series is a family of similar compounds with similar chemical properties because they have the same functional group, which is an atom or group of atoms that determines the chemical properties. General formulae: alkanes CnH2n+2, alkenes CnH2n, alcohols CnH2n+1OH, carboxylic acids CnH2n+1COOH. A saturated compound has only single carbon-carbon bonds; an unsaturated compound has one or more carbon-carbon bonds that are not single. (Supplement) A structural formula unambiguously shows how atoms are arranged, such as CH3CH2OH. Structural isomers have the same molecular formula but different structural formulae, for example butane and methylpropane, both C4H10. Members of a series differ by a CH2 unit and show a trend in physical properties.',
        'Alkanes CnH2n+2 | Alkenes CnH2n | Alcohols CnH2n+1OH | Carboxylic acids CnH2n+1COOH',
        'Displayed formulae of methane, ethene, ethanol, ethanoic acid with functional groups circled',
        'Cooking gas, paraffin, petrol and alcohols in hand sanitiser are all organic compounds, each from a different family.',
        'Methane is CH4 and ethane is C2H6. What do you notice about the difference, and does the general formula CnH2n+2 predict the formula for propane?',
        'Core 11.1.1-11.1.6: displayed formulae, general formulae, functional group, homologous series, saturated and unsaturated. Supplement 11.1.7-11.1.9: structural formulae, isomers, series characteristics.',
        [
          'Step 1: Identify the functional group.',
          'Step 2: Use the general formula to find the molecular formula for n carbons.',
          'Step 3: Draw the displayed formula showing every bond; for isomers, rearrange the carbon skeleton.'
        ],
        'Propane: n = 3, C3H8. Butane C4H10 has two isomers: CH3CH2CH2CH3 and CH3CH(CH3)CH3.'
      ),
      sub(
        'cie_y11_chem_s2_3',
        'Naming Organic Compounds (Syllabus 11.2)',
        'The ending of the name tells you the family',
        'Names are built from the number of carbons and an ending that shows the family. Prefixes: meth- (1), eth- (2), prop- (3), but- (4). Endings: -ane for alkanes, -ene for alkenes, -ol for alcohols, -oic acid for carboxylic acids. So ethene is the two-carbon alkene and ethanol is the two-carbon alcohol. (Supplement) For unbranched compounds with up to four carbons, number the position of a double bond or alcohol group: but-1-ene and but-2-ene, propan-1-ol and propan-2-ol, butan-1-ol and butan-2-ol. Esters are named alcohol part first and acid part second, for example ethyl ethanoate from ethanol and ethanoic acid.',
        null,
        'Table of carbons 1-4 with names and displayed formulae in each family',
        'Reading labels: the ethanol in sanitiser, ethanoic acid in vinegar and methane in biogas are named by this system.',
        'Given the name propan-1-ol, can you work out how many carbons it has, what family it belongs to, and where the functional group sits?',
        'Core 11.2.1-11.2.2: name and draw the displayed formulae of methane, ethane, ethene, ethanol, ethanoic acid; identify type from name. Supplement 11.2.3-11.2.4: unbranched compounds up to four carbons and esters.',
        [
          'Step 1: Count carbons for the prefix.',
          'Step 2: Add the ending for the family.',
          'Step 3: For longer chains, number the carbon with the double bond or the OH group.'
        ],
        'But-2-ene: four carbons, double bond between carbons 2 and 3: CH3CH=CHCH3.'
      ),
      sub(
        'cie_y11_chem_s2_4',
        'Fuels and Fractional Distillation of Petroleum (Syllabus 11.3)',
        'Petroleum is separated by boiling point into fractions with different uses',
        'The fossil fuels are coal, natural gas and petroleum. Methane is the main constituent of natural gas. Hydrocarbons are compounds containing hydrogen and carbon only, and petroleum is a mixture of hydrocarbons. It is separated into fractions by fractional distillation: the crude oil is heated and the vapour rises up a column that is hotter at the bottom and cooler at the top. Going up the column: shorter chain length, lower boiling point, higher volatility and lower viscosity. Uses: refinery gas for heating and cooking; petrol for cars; naphtha as a chemical feedstock; kerosene (paraffin) for jet fuel; diesel oil for diesel engines; fuel oil for ships and home heating; lubricating oil for lubricants, waxes and polishes; bitumen for making roads.',
        null,
        'Fractionating column: gases at top, bitumen at the bottom with each fraction labelled',
        'Cooking gas (LPG), kerosene for lamps and stoves, petrol for cars, diesel for matatus, buses and lorries, and bitumen for tarmac roads all come from petroleum. Kenya imports refined products, as crude oil is refined elsewhere.',
        'Bitumen is thick and black while petrol flows easily. Using what you know about chain length, how do you explain the difference?',
        'Core 11.3.1-11.3.7: fossil fuels, hydrocarbons, fractional distillation, trends in fractions and their uses.',
        [
          'Step 1: Heat crude oil; vapours rise; each fraction condenses where the column temperature is below its boiling point.',
          'Step 2: Down the column: longer chains, higher boiling points, more viscous.',
          'Step 3: Match each fraction to its use.'
        ],
        'Refinery gas (shortest chains, lowest boiling point) rises to the top; bitumen (longest chains, highest boiling point) stays at the bottom.'
      ),
      sub(
        'cie_y11_chem_s2_5',
        'Alkanes (Syllabus 11.4)',
        'Alkanes are saturated hydrocarbons that mainly burn or are substituted by chlorine',
        'Alkanes have single covalent bonds and are saturated hydrocarbons. They are generally unreactive except in combustion and substitution by chlorine. (Supplement) In a substitution reaction one atom or group of atoms is replaced by another. Alkanes react with chlorine in a photochemical reaction: ultraviolet light provides the activation energy. For monosubstitution of methane: CH4 + Cl2 -> CH3Cl + HCl.',
        'CH4 + Cl2 -> CH3Cl + HCl (UV light)',
        'Methane with chlorine and a UV light symbol; displayed formula of chloromethane',
        'Methane in biogas (made from cow dung or farm waste) is burned for cooking and lighting in many Kenyan homes and schools.',
        'Alkanes are so unreactive that they hardly react with acids, yet they burn well. What does this tell you about how reactive the C-H and C-C bonds are, and what does the chlorine reaction need to get started?',
        'Core 11.4.1-11.4.2: bonding and properties of alkanes. Supplement 11.4.3-11.4.4: substitution, photochemical reaction with chlorine.',
        [
          'Step 1: Recognise alkanes as saturated with only single bonds.',
          'Step 2: Complete combustion gives carbon dioxide and water.',
          'Step 3: With chlorine and UV light, one hydrogen at a time is substituted by chlorine.'
        ],
        'CH4 + 2O2 -> CO2 + 2H2O (complete combustion). CH3CH3 + Cl2 -> CH3CH2Cl + HCl (UV light).'
      ),
      sub(
        'cie_y11_chem_s2_6',
        'Alkenes and Cracking (Syllabus 11.5)',
        'Alkenes have a C=C double bond, making them reactive and unsaturated',
        'Alkenes contain a carbon-carbon double bond and are unsaturated hydrocarbons. They are made by cracking: larger alkane molecules are broken into smaller, more useful ones, using high temperature and a catalyst. Cracking is done because small molecules are in greater demand as fuels and because the alkenes formed are used to make plastics and other chemicals. For example C10H22 -> C8H18 + C2H4. A test for unsaturation: aqueous bromine (orange) is decolourised by an alkene but not by an alkane. (Supplement) In an addition reaction only one product is formed. Alkenes add bromine, hydrogen (with a nickel catalyst) and steam (with an acid catalyst): ethene + steam -> ethanol.',
        'C10H22 -> C8H18 + C2H4  |  C2H4 + Br2 -> C2H4Br2',
        'Cracking: long chain splits into shorter alkane and alkene; bromine water test',
        'Oil refineries crack the heavier fractions because there is more demand for petrol and for ethene to make plastics.',
        'You shake two samples with orange bromine water. One stays orange and the other turns colourless. Which is the alkene, and what reaction took place?',
        'Core 11.5.1-11.5.4: alkenes, cracking and why, test with aqueous bromine. Supplement 11.5.5-11.5.6: addition reactions with bromine, hydrogen and steam.',
        [
          'Step 1: Identify the C=C double bond as unsaturated.',
          'Step 2: Cracking: large alkane to smaller alkane plus alkene; balance carbon and hydrogen.',
          'Step 3: Addition: the double bond opens and atoms add, giving one product.'
        ],
        'C2H4 + H2 -> C2H6 (nickel catalyst); C2H4 + H2O -> C2H5OH (acid catalyst, steam); C2H4 + Br2 -> CH2BrCH2Br (bromine water is decolourised).'
      ),
      sub(
        'cie_y11_chem_s2_7',
        'Alcohols (Syllabus 11.6)',
        'Ethanol can be made by fermentation or from ethene and steam',
        'Ethanol is made in two ways. Fermentation: aqueous glucose is fermented by yeast at 25 to 35 degrees C in the absence of oxygen: C6H12O6 -> 2C2H5OH + 2CO2. Catalytic addition of steam to ethene: at 300 degrees C and 6000 kPa (60 atm) with an acid catalyst. Ethanol burns to make carbon dioxide and water, and it is used as a solvent and as a fuel. (Supplement) Fermentation uses renewable sugar, low temperatures and simple equipment, but it is slow, makes impure ethanol in batches and needs the product to be separated. Hydration of ethene is fast, makes pure ethanol and is continuous, but it depends on ethene from non-renewable petroleum and uses high temperature and pressure.',
        'C6H12O6 -> 2C2H5OH + 2CO2  |  C2H4 + H2O -> C2H5OH',
        'Two routes to ethanol: fermenter with yeast; reactor for ethene and steam',
        'Ethanol can be made by fermenting sugar-cane molasses; it is used as a solvent and in hand sanitiser, and can be blended with petrol as a fuel.',
        'Why is the fermentation of glucose done in the absence of oxygen, and why does the mixture need to be kept warm but not hot?',
        'Core 11.6.1-11.6.3: manufacture of ethanol, combustion, uses. Supplement 11.6.4: advantages and disadvantages of the two methods.',
        [
          'Step 1: Fermentation: glucose, yeast, 25 to 35 degrees C, no oxygen.',
          'Step 2: Hydration: ethene and steam, 300 degrees C, 60 atm, acid catalyst.',
          'Step 3: Compare: renewable and slow versus non-renewable and fast.'
        ],
        'C2H5OH + 3O2 -> 2CO2 + 3H2O (ethanol burns completely). Yeast enzymes stop working above about 40 degrees C, so fermentation is kept warm but not hot.'
      ),
      sub(
        'cie_y11_chem_s2_8',
        'Carboxylic Acids and Esters (Syllabus 11.7)',
        'Ethanoic acid behaves as a weak acid and can form esters with alcohols',
        'Ethanoic acid reacts as an acid: with metals (making hydrogen and an ethanoate salt), with bases (salt and water) and with carbonates (salt, water and carbon dioxide). For example, with magnesium it gives magnesium ethanoate, (CH3COO)2Mg. (Supplement) Ethanoic acid is made by oxidising ethanol, either with acidified aqueous potassium manganate(VII) or by bacterial oxidation, as in vinegar production. A carboxylic acid reacts with an alcohol with an acid catalyst to make an ester and water: ethanoic acid + ethanol <=> ethyl ethanoate + water.',
        'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O',
        'Displayed formulae of ethanoic acid, ethanol and ethyl ethanoate with the ester link highlighted',
        'Vinegar (siki) is dilute ethanoic acid made by bacteria oxidising ethanol, which is why wine or fermented juice left open to air turns sour. Esters give fruit sweets and perfumes their smells.',
        'Ethanoic acid reacts with sodium carbonate and gas bubbles come off. What is the gas, and how would you prove it?',
        'Core 11.7.1: reactions of ethanoic acid. Supplement 11.7.2-11.7.3: formation of ethanoic acid by oxidation and formation of esters.',
        [
          'Step 1: Treat ethanoic acid like other acids, naming the salt as an ethanoate.',
          'Step 2: Make it by oxidising ethanol.',
          'Step 3: Alcohol + carboxylic acid -> ester + water, with an acid catalyst.'
        ],
        '2CH3COOH + Na2CO3 -> 2CH3COONa + H2O + CO2 (sodium ethanoate). Ethanol + ethanoic acid -> ethyl ethanoate + water.'
      ),
      sub(
        'cie_y11_chem_s2_1',
        '5.1 Addition Polymerisation vs Condensation Polymerisation (Nylon & PET)',
        'Polymers are long chains built from many small monomer molecules',
        'Polymers are large molecules built from many smaller molecules called monomers. In addition polymerisation, many alkene monomers join by opening their C=C double bonds, and no other product forms; for example many ethene molecules form poly(ethene). (Supplement) In condensation polymerisation, two different monomers join and a small molecule such as water is lost each time a link forms. Polyamides such as nylon come from a dicarboxylic acid and a diamine, with an amide linkage. Polyesters such as PET come from a dicarboxylic acid and a diol, with an ester linkage. To find a repeat unit of an addition polymer, draw the monomer with the double bond opened, with open bonds at each end.',
        'n CH2=CH2 -> [-CH2-CH2-]n',
        'Ethene molecules joining into poly(ethene); amide and ester linkages drawn out',
        'Poly(ethene) makes plastic bags and sheeting, nylon is used in ropes and fabrics, PET is used in drink bottles and polyester clothing.',
        'In addition polymerisation nothing is lost, but in condensation polymerisation a small molecule is released each time. How could you tell the type from the repeat unit alone?',
        'Core 11.8.1-11.8.2: polymers and poly(ethene). Supplement 11.8.6-11.8.10: repeat units, addition and condensation polymers, nylon and PET.',
        [
          'Step 1: Addition: monomer has C=C; the repeat unit is the monomer with the double bond opened.',
          'Step 2: Condensation: two monomers with two functional groups each join and lose a small molecule.',
          'Step 3: Name the linkage: amide for nylon, ester for PET.'
        ],
        'Propene, CH3CH=CH2, forms poly(propene) with repeat unit -[CH(CH3)-CH2]-. Nylon: a diamine and a dicarboxylic acid join with loss of water at each amide link.'
      ),
      sub(
        'cie_y11_chem_s2_9',
        'Plastics and the Environment (Syllabus 11.8)',
        'Plastics are made from polymers and are long-lasting, which creates disposal problems',
        'Plastics are made from polymers. Their properties affect how they are disposed of: most do not break down naturally, so they remain in the environment for a very long time. Environmental challenges include disposal in landfill sites, accumulation in oceans, and the formation of toxic gases when they are burned. (Supplement) PET can be converted back into monomers and re-polymerised, which is a form of recycling.',
        null,
        'Pictures of landfill, ocean plastic, burning plastic with the problem labelled',
        'Kenya banned single-use plastic carrier bags in 2017 because they blocked drains and harmed animals and soil. Collecting and recycling PET bottles keeps them out of landfills and rivers.',
        'Plastic does not rot in landfill like food scraps. What property of the polymer chain might explain this, and what are the dangers of burning plastic to get rid of it?',
        'Core 11.8.3-11.8.5: plastics, disposal, environmental challenges. Supplement 11.8.11: PET conversion to monomers.',
        [
          'Step 1: State that plastics come from polymers.',
          'Step 2: List the problems: landfill, oceans, toxic gases from burning.',
          'Step 3: Mention recycling options such as PET back to monomers.'
        ],
        'Burning some plastics releases toxic gases, so open burning of rubbish harms health; collecting and recycling is better.'
      ),
      sub(
        'cie_y11_chem_s2_10',
        'Proteins as Natural Polyamides (Syllabus 11.8)',
        'Proteins are natural polymers made of amino acid monomers',
        'Proteins are natural polyamides formed from amino acid monomers. Each amino acid has an amine group (NH2) at one end and a carboxylic acid group (COOH) at the other, with a side chain R that differs between amino acids. When amino acids join, the NH2 of one reacts with the COOH of the next and a water molecule is lost, forming an amide link. This is condensation polymerisation, the same type of link as in nylon.',
        null,
        'Amino acid structure and two amino acids joined with water lost',
        'Beans, meat, eggs and milk supply the proteins the body needs, and the digestive system breaks them back into amino acids.',
        'Nylon and proteins both contain amide links. What does that tell you about how each is formed, and which one is made by living things?',
        'Supplement 11.8.12-11.8.13: proteins as natural polyamides, amino acid structure, and the structure of proteins.',
        [
          'Step 1: Recognise the amino acid: NH2 group and COOH group on one molecule.',
          'Step 2: Link two amino acids by the amide bond; a water molecule is lost.',
          'Step 3: Repeat to form a long protein chain.'
        ],
        'Amino acid 1 (-COOH) + amino acid 2 (-NH2) -> amide link (-CO-NH-) + H2O. Repeating gives the protein chain.'
      )
    ]
  },

  // ------------------------------------------------------------
  // TOPIC 12: Experimental techniques and chemical analysis
  // ------------------------------------------------------------
  {
    id: 'cie_y11_chem_s6',
    number: 12,
    title: 'Topic 12: Experimental Techniques and Chemical Analysis',
    strand: 'Topic 12: Experimental techniques and chemical analysis',
    status: 'available',
    summary: 'Experimental design and apparatus, acid-base titrations, chromatography, separation and purification, and tests for ions and gases.',
    subtopics: [
      sub(
        'cie_y11_chem_s6_1',
        'Experimental Design, Apparatus and Key Terms (Syllabus 12.1)',
        'Choose apparatus for the measurement needed, and use the right vocabulary',
        'Apparatus for measuring: stop-watches for time, thermometers for temperature, balances for mass, burettes and volumetric pipettes for accurate volumes of liquids, measuring cylinders for approximate volumes, and gas syringes for gas volumes. Choose by how accurate the measurement must be, and be ready to give advantages and disadvantages of a method. Terms: a solvent dissolves a solute; a solute is dissolved in a solvent; a solution is a mixture of one or more solutes in a solvent; a saturated solution holds the maximum solute at a given temperature; the residue is what remains after evaporation, distillation, filtration or similar; the filtrate is the liquid that has passed through a filter.',
        null,
        'Pictures of the seven pieces of apparatus labelled with what they measure',
        'Measuring spoons and balances in a kitchen follow the same idea: choose the tool to the accuracy required.',
        'You need exactly 25.0 cm3 of a solution for a titration. Why would you choose a volumetric pipette over a measuring cylinder?',
        'Core 12.1.1-12.1.3: name apparatus for time, temperature, mass and volume, advantages and disadvantages of methods, and definitions of solvent, solute, solution, saturated solution, residue, filtrate.',
        [
          'Step 1: Decide what quantity must be measured and how accurately.',
          'Step 2: Pick the apparatus: pipette or burette for accurate volume, cylinder for approximate.',
          'Step 3: Use the correct terms when describing the method.'
        ],
        'Sand and salt in water: salt is the solute, water the solvent, salt water the solution. After filtering, the sand is the residue and the salt solution is the filtrate.'
      ),
      sub(
        'cie_y11_chem_s6_2',
        'Acid-Base Titrations (Syllabus 12.2)',
        'A titration finds the exact volume of one solution that reacts with another',
        'A titration uses a burette to add one solution slowly to a measured volume of another, usually measured with a volumetric pipette and placed in a conical flask. A suitable indicator is added to the flask. The end-point is when the indicator just changes colour, showing the reaction is complete. The titration is repeated until results agree closely, and the average (mean) of the concordant results is used in calculations.',
        null,
        'Burette above a conical flask on a white tile',
        'Checking acid in fruit juice or soil acidity in a laboratory uses titration.',
        'Why do you add the final few drops very slowly, and why is the flask placed on a white tile?',
        'Core 12.2.1-12.2.2: describe an acid-base titration and end-point.',
        [
          'Step 1: Use the pipette to put a fixed volume in the flask; add indicator.',
          'Step 2: Add from the burette slowly until the colour changes permanently (end-point).',
          'Step 3: Record the burette volume; repeat; use results that agree closely.'
        ],
        'Titrating sodium hydroxide with hydrochloric acid using methyl orange: yellow changes to orange-red at the end-point.'
      ),
      sub(
        'cie_y11_chem_s6_3',
        'Chromatography and Rf Values (Syllabus 12.3)',
        'Substances travel different distances up the paper depending on how soluble they are',
        'Paper chromatography separates mixtures of soluble coloured substances. A spot of the mixture is placed on a pencil line, the paper is placed in a solvent, and the solvent rises up the paper carrying the substances with it. Different substances travel different distances. A pure substance gives one spot; an impure one gives more than one. Unknown substances can be identified by comparing with known substances. (Supplement) Colourless substances can be separated and then made visible with a locating agent. Rf = distance travelled by substance / distance travelled by solvent.',
        'Rf = distance travelled by substance / distance travelled by solvent',
        'Chromatogram with baseline, solvent front and spots',
        'Food scientists use chromatography to check which dyes are in sweets and drinks; forensic labs use it on ink.',
        'Why must the start line be drawn in pencil and not ink, and why must the solvent level be below the start line?',
        'Core 12.3.1-12.3.2: chromatography and interpreting chromatograms. Supplement 12.3.3-12.3.4: locating agents and the Rf equation.',
        [
          'Step 1: Draw a pencil line, spot the sample, stand the paper in solvent below the line.',
          'Step 2: Remove when the solvent has nearly reached the top; mark the solvent front.',
          'Step 3: Measure distances and calculate Rf, or compare spots to known substances.'
        ],
        'A spot travels 3.0 cm while the solvent travels 6.0 cm: Rf = 3.0 / 6.0 = 0.50.'
      ),
      sub(
        'cie_y11_chem_s6_4',
        'Separation and Purification (Syllabus 12.4)',
        'Choose a method according to what is different about the substances',
        'Methods: using a suitable solvent to dissolve one component; filtration to separate an insoluble solid from a liquid; crystallisation to obtain a dissolved solid from solution; simple distillation to separate a solvent from a solution (for example pure water from salt water); fractional distillation to separate liquids with different boiling points (for example ethanol and water, or the fractions of petroleum). A pure substance has a sharp melting point and boiling point; an impure one melts over a range and at a lower temperature, and boils higher. To suggest a method, look at the properties of the substances.',
        null,
        'Apparatus for filtration, simple distillation and fractional distillation',
        'Salt-making by evaporating sea water or brine, as at the coast, uses crystallisation. Sand and salt can be separated by dissolving the salt, filtering and evaporating the filtrate.',
        'You have a mixture of sand and salt. In what order would you use dissolve, filter and evaporate, and which part ends up as the residue?',
        'Core 12.4.1-12.4.3: separation methods, choosing methods, melting and boiling points for purity.',
        [
          'Step 1: List the properties that differ: solubility, particle size, boiling point.',
          'Step 2: Pick the method that uses that difference.',
          'Step 3: Check purity by melting or boiling point.'
        ],
        'Salt water: simple distillation gives pure water as the distillate and leaves salt behind. Ethanol and water: fractional distillation because both are liquids with different boiling points (78 and 100 degrees C).'
      ),
      sub(
        'cie_y11_chem_s6_5',
        'Tests for Anions (Syllabus 12.5)',
        'Each negative ion has its own test with a clear observation',
        'Carbonate, CO3 2-: add dilute acid; fizzing, and the gas turns limewater milky (carbon dioxide). Chloride, bromide and iodide: acidify with dilute nitric acid, then add aqueous silver nitrate; chloride gives a white precipitate, bromide cream, iodide yellow. Nitrate, NO3-: add aqueous sodium hydroxide and aluminium foil and warm; ammonia gas is given off and turns damp red litmus blue. Sulfate, SO4 2-: acidify with dilute nitric acid then add aqueous barium nitrate; white precipitate. Sulfite, SO3 2-: add acidified aqueous potassium manganate(VII); the purple colour goes colourless.',
        null,
        'Table: anion, reagent, positive result',
        'Water-testing kits in laboratories use these tests to find chloride, sulfate and nitrate in drinking water and borehole water.',
        'A white solid dissolves in water and gives a white precipitate with acidified silver nitrate. Which ion does it contain, and why was nitric acid added first?',
        'Core 12.5.1: tests for carbonate, halides, nitrate, sulfate and sulfite.',
        [
          'Step 1: Add the correct reagent (acid, silver nitrate, barium nitrate, aluminium and alkali).',
          'Step 2: Record the observation exactly: colour of precipitate, gas, colour change.',
          'Step 3: Name the ion using the observation.'
        ],
        'Sulfate test: acidified barium nitrate gives white barium sulfate: Ba2+(aq) + SO4 2-(aq) -> BaSO4(s).'
      ),
      sub(
        'cie_y11_chem_s6_6',
        'Tests for Cations with Sodium Hydroxide and Ammonia (Syllabus 12.5)',
        'Metal hydroxide precipitates have characteristic colours and different solubility in excess',
        'Add aqueous sodium hydroxide, then excess, and aqueous ammonia, then excess. Aluminium Al3+: white precipitate soluble in excess sodium hydroxide; with ammonia, white precipitate insoluble in excess. Ammonium NH4+: no precipitate; warming with sodium hydroxide gives ammonia gas that turns damp red litmus blue. Calcium Ca2+: white precipitate insoluble in excess sodium hydroxide; with ammonia no precipitate or very slight. Chromium(III) Cr3+: green precipitate soluble in excess sodium hydroxide; with ammonia green precipitate insoluble in excess. Copper(II) Cu2+: light blue precipitate insoluble in excess sodium hydroxide; with ammonia light blue precipitate that dissolves in excess to give a dark blue solution. Iron(II) Fe2+: green precipitate, insoluble in excess. Iron(III) Fe3+: red-brown precipitate, insoluble in excess. Zinc Zn2+: white precipitate soluble in excess sodium hydroxide and in excess ammonia.',
        null,
        'Table of cations with the colour of precipitate and result in excess NaOH and NH3',
        'Tests like these are used in analysis of soil, water and industrial effluent for metals.',
        'A pale blue precipitate dissolves in excess ammonia to give a dark blue solution. Which cation does that point to, and what do the precipitate colours help to tell apart: iron(II) and iron(III)?',
        'Core 12.5.2: tests for Al3+, NH4+, Ca2+, Cr3+, Cu2+, Fe2+, Fe3+ and Zn2+ with aqueous sodium hydroxide and ammonia.',
        [
          'Step 1: Add a few drops of sodium hydroxide, note the precipitate colour.',
          'Step 2: Add excess and note whether it dissolves; repeat with ammonia.',
          'Step 3: Compare with the table to name the cation.'
        ],
        'Zinc and aluminium both give a white precipitate with sodium hydroxide that dissolves in excess; in excess ammonia the zinc precipitate dissolves but the aluminium does not, so ammonia tells them apart.'
      ),
      sub(
        'cie_y11_chem_s6_7',
        'Tests for Gases and Flame Tests (Syllabus 12.5)',
        'Gas tests and flame colours give quick identification',
        'Gas tests: ammonia turns damp red litmus paper blue; carbon dioxide turns limewater milky; chlorine bleaches damp litmus paper; hydrogen gives a squeaky pop with a lighted splint; oxygen relights a glowing splint; sulfur dioxide turns acidified aqueous potassium manganate(VII) from purple to colourless. Flame tests: lithium gives a red flame; sodium yellow; potassium lilac; calcium orange-red; barium light green; copper(II) blue-green.',
        null,
        'Table of gases with the test and result; flame colours for six metals',
        'Fireworks get their colours from metal ions heated in a flame, and the same effect identifies metals in the laboratory.',
        'How would you prove that the gas given off when zinc reacts with acid is hydrogen, and what would you see?',
        'Core 12.5.3-12.5.4: gas tests and flame tests.',
        [
          'Step 1: Collect the gas in a tube or test it at the mouth of the tube.',
          'Step 2: Apply the correct test and note the result.',
          'Step 3: For flame tests, use a clean loop or splint, and note the colour.'
        ],
        'Hydrogen: a lighted splint at the mouth of the tube gives a squeaky pop. Oxygen: a glowing splint relights. Carbon dioxide: bubbling through limewater turns it cloudy white.'
      )
    ]
  }
];

const BRITISH_CAIE_CHEMISTRY_MAPS = [
  {
    curriculum: 'BRITISH',
    grade: 10,
    subject: 'Chemistry',
    code: '0620',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Chemistry (0620) Metro Line - Topics 1 to 6',
    reviewStatus: REVIEW_STATUS,
    stations: CHEM_Y10_STATIONS
  },
  {
    curriculum: 'BRITISH',
    grade: 11,
    subject: 'Chemistry',
    code: '0620',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Chemistry (0620) Year 11 Exam Units - Topics 7 to 12',
    reviewStatus: REVIEW_STATUS,
    stations: CHEM_Y11_STATIONS
  }
];

module.exports = BRITISH_CAIE_CHEMISTRY_MAPS;
