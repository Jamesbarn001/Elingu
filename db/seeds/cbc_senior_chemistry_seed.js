// ══════════════════════════════════════════════════════════════
// CBC Senior School Chemistry, Grades 11 and 12.
// Strands and sub-strands follow the KICD summary pages read from kicd.ac.ke
// (see docs/audits/kicd_verified_from_site.md). Those KICD documents are DRAFTS
// (Grade 11: Oct 2025, Grade 12: Mar 2026). These maps are a draft for teacher
// review and are not official or approved material.
// ══════════════════════════════════════════════════════════════

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

const CBC_SENIOR_CHEMISTRY_MAPS = [
  // ────────────────────────────────────────────────────────────
  // GRADE 11 CHEMISTRY (KICD design, Oct 2025)
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 11,
    subject: 'Chemistry',
    code: 'CHEM-G11',
    trackPathway: 'STEM',
    title: 'CBE Grade 11 (Senior STEM) Chemistry Metro Line',
    description: 'Strands follow the KICD Grade 11 Chemistry design (Oct 2025).',
    stations: [
      {
        id: 'cbc_g11_chem_s1',
        number: 1,
        title: '1.0 Inorganic Chemistry',
        strand: 'Strand 1.0: Inorganic Chemistry',
        icon: 'Inorganic',
        status: 'available',
        summary: 'The mole as a counting unit and the properties and preparation of common non-metals.',
        subtopics: [
          stop(
            'cbc_g11_chem_s1_1',
            '1.1 The Mole',
            'Counting Particles by Weighing',
            'A mole is a fixed number of particles, 6.02 x 10^23, and its mass in grams equals the relative formula mass',
            'Atoms and molecules are far too small to count one by one, so chemists count them in huge, fixed groups, in the same way a shopkeeper counts eggs in trays of 30. One such group is called a mole. A mole is 6.02 x 10^23 particles (this number is the Avogadro constant); the particles can be atoms, molecules or ions. The relative atomic mass (Ar) of an element is the mass of its atom compared with an agreed standard, and the relative formula mass (Mr) is the sum of the Ar values of all atoms in the formula. The key link is that one mole of any substance has a mass in grams equal to its Mr, so 1 mole of carbon (Ar 12) weighs 12 g. This is called the molar mass, with unit g/mol. A mole of any gas also occupies the same volume under the same conditions: 24 dm^3 at room temperature and pressure (r.t.p.). For solutions, concentration in mol/dm^3 tells how many moles are dissolved in each dm^3 (1 dm^3 = 1000 cm^3).',
            'moles = mass / Mr = volume of gas (dm^3) / 24 = concentration (mol/dm^3) x volume (dm^3)',
            'Mole triangle linking mass, gas volume, concentration and particle number',
            'Cement works at Bamburi and Athi River heat limestone (calcium carbonate); the tonnage of limestone needed for a tonne of lime comes from mole ratios.',
            'A packet holds 100 g of chalk. If you knew only the mass of one chalk particle, what else would you need to know to count the particles?',
            'Assessment focus: converting between mass, gas volume, concentration and number of particles, and using the balanced equation ratio.',
            [
              'Step 1: Write the balanced equation. Reason: the coefficients give the mole ratio, which is the only link between different substances.',
              'Step 2: Work out Mr of the substance you are given by adding Ar values. Reason: Mr converts grams to moles.',
              'Step 3: Convert the given quantity to moles (mass / Mr, or volume / 24, or concentration x volume). Reason: moles are the common currency of every reaction.',
              'Step 4: Use the equation ratio to find moles of the wanted substance. Reason: the equation says how many moles react with how many.',
              'Step 5: Convert the answer from moles to the unit asked for. Reason: the question wants grams, dm^3 or particles, not moles.'
            ],
            'Question: 5.0 g of calcium carbonate reacts with excess hydrochloric acid. CaCO3 + 2HCl -> CaCl2 + H2O + CO2. What volume of carbon dioxide forms at r.t.p., and how many CO2 molecules is that? Working: Mr of CaCO3 = 40 + 12 + (3 x 16) = 100. Moles of CaCO3 = 5.0 / 100 = 0.050 mol. The ratio CaCO3 : CO2 is 1 : 1, so moles of CO2 = 0.050 mol. Volume = 0.050 x 24 = 1.2 dm^3. Molecules = 0.050 x 6.02 x 10^23 = 3.01 x 10^22. Common mistake: using the mass 5.0 directly in the ratio, or forgetting to convert cm^3 to dm^3 (divide by 1000) when a solution volume is given.'
          ),
          stop(
            'cbc_g11_chem_s1_2',
            '1.2 Non-metals',
            'Oxygen, Hydrogen, Chlorine, Sulfur and Nitrogen',
            'Non-metals tend to gain or share electrons, so their reactions are shaped by how many electrons each one needs',
            'A non-metal is an element that is usually a poor conductor of heat and electricity and, as a solid, is brittle. Non-metal atoms have nearly full outer shells, so they react by gaining electrons (to form negative ions) or by sharing electrons (covalent bonds). Oxygen supports burning and is made in the laboratory by decomposing hydrogen peroxide with manganese(IV) oxide as a catalyst (a catalyst speeds up a reaction without being used up). Hydrogen is the lightest gas and burns with a squeaky pop. Chlorine is a green, poisonous gas that bleaches damp litmus paper because it forms chloric(I) acid in water; it is made in the lab by oxidising concentrated hydrochloric acid with manganese(IV) oxide. Sulfur burns to form sulfur dioxide, a gas that dissolves in rain to make acid rain. Nitrogen makes up about 78 percent of air and is very unreactive because its two atoms share a strong triple bond. Oxides of non-metals are generally acidic, meaning they dissolve in water to give acids.',
            'Cl2 prep: MnO2 + 4HCl -> MnCl2 + Cl2 + 2H2O  |  2H2O2 -> 2H2O + O2 (MnO2 catalyst)',
            'Gas preparation set-up with delivery tube and collection method',
            'Chlorine disinfects municipal water in Nairobi; sulfur dioxide is used to preserve some dried fruit; nitrogen is pumped into some food packs to keep them fresh.',
            'Why would a gas that is poorly soluble in water and lighter than air be collected differently from a gas that is very soluble and heavier than air?',
            'Assessment focus: laboratory preparation and test for each gas, collection method, and balanced equations with simple mole calculations.',
            [
              'Step 1: Decide the reagents from the electron change needed (for chlorine, an oxidising agent must remove electrons from chloride ions). Reason: the reaction only runs if something accepts the electrons.',
              'Step 2: Choose the collection method from the gas properties: over water if poorly soluble, upward delivery if denser than air, downward if lighter. Reason: the gas must not dissolve or escape.',
              'Step 3: Add a drying or washing stage where needed (for chlorine, water then concentrated sulfuric acid). Reason: it removes hydrogen chloride and water vapour that would contaminate the product.',
              'Step 4: Test the gas (glowing splint relights for oxygen, squeaky pop for hydrogen, damp blue litmus bleached for chlorine). Reason: a test confirms identity from the property, not from the name on the bottle.'
            ],
            'Question: 8.7 g of manganese(IV) oxide is heated with excess concentrated hydrochloric acid. MnO2 + 4HCl -> MnCl2 + Cl2 + 2H2O. What volume of chlorine forms at r.t.p.? Working: Mr of MnO2 = 55 + (2 x 16) = 87. Moles = 8.7 / 87 = 0.10 mol. Ratio MnO2 : Cl2 is 1 : 1, so 0.10 mol Cl2. Volume = 0.10 x 24 = 2.4 dm^3. Common mistake: collecting chlorine over water; it is quite soluble and reacts with water, so it is collected by upward delivery (it is denser than air) after drying.'
          )
        ]
      },
      {
        id: 'cbc_g11_chem_s2',
        number: 2,
        title: '2.0 Physical Chemistry',
        strand: 'Strand 2.0: Physical Chemistry',
        icon: 'Physical',
        status: 'available',
        summary: 'Solubility and preparation of salts, the gas laws, and the factors that control how fast reactions go.',
        subtopics: [
          stop(
            'cbc_g11_chem_s2_1',
            '2.1 Salts',
            'Solubility Rules and Choosing a Preparation Method',
            'The solubility of a salt decides which method makes it: titration, excess solid, or precipitation',
            'A salt is a compound formed when the hydrogen of an acid is replaced by a metal or ammonium ion, for example sodium chloride from hydrochloric acid. A salt is soluble if a useful amount dissolves in water, and insoluble if almost none does. Memorise the pattern: all sodium, potassium and ammonium salts are soluble; all nitrates are soluble; most chlorides are soluble except silver and lead chloride; most sulfates are soluble except barium, lead and calcium sulfate; most carbonates are insoluble except those of sodium, potassium and ammonium. The method depends on this: a soluble salt from a soluble base (alkali) is made by titration; a soluble salt from an insoluble base, metal or carbonate is made by adding the solid in excess to the acid and filtering; an insoluble salt is made by precipitation, mixing two soluble salts so the ions swap partners and the insoluble product drops out as a solid (a precipitate). An ionic equation shows only the ions that actually join, leaving out spectator ions that stay unchanged in solution.',
            'Precipitation: Pb2+(aq) + 2I-(aq) -> PbI2(s)  |  acid + carbonate -> salt + water + CO2',
            'Decision flow chart from solubility to preparation method',
            'Salt production in the Mombasa and Malindi salt pans relies on sodium chloride being soluble and crystallising as seawater evaporates.',
            'If you wanted to make copper(II) sulfate crystals and you have copper(II) oxide, which is insoluble in water, how could you be sure all the acid had been used up?',
            'Assessment focus: choosing a method from solubility, writing ionic equations, and stating the purpose of each practical step.',
            [
              'Step 1: Check the solubility of the wanted salt. Reason: if it is insoluble it forms a solid directly and can be filtered, so precipitation is possible.',
              'Step 2: If soluble, check whether the starting base is soluble. Reason: with an insoluble base you can add excess and filter off the leftover; with a soluble alkali you cannot see excess, so you must titrate.',
              'Step 3: Add the excess solid in small portions until no more reacts. Reason: the leftover solid proves all the acid has gone.',
              'Step 4: Filter, then evaporate part of the water and cool. Reason: filtering removes the unreacted solid; slow crystallisation gives pure crystals.'
            ],
            'Question: 50 cm^3 of 0.20 mol/dm^3 lead(II) nitrate is mixed with excess potassium iodide solution. What mass of lead(II) iodide forms? Working: Pb(NO3)2 + 2KI -> PbI2 + 2KNO3. Moles of Pb2+ = 0.050 dm^3 x 0.20 = 0.010 mol. Ratio Pb(NO3)2 : PbI2 is 1 : 1, so 0.010 mol PbI2. Mr of PbI2 = 207 + (2 x 127) = 461. Mass = 0.010 x 461 = 4.61 g. Common mistake: using 50 as the volume without converting to dm^3, which gives an answer 1000 times too large.'
          ),
          stop(
            'cbc_g11_chem_s2_2',
            '2.2 Gas Laws',
            'How Pressure, Volume and Temperature Relate in a Gas',
            'For a fixed amount of gas, pressure x volume / absolute temperature stays constant',
            'A gas is made of particles moving randomly in straight lines and colliding with the walls of their container; those collisions are what we call pressure (force per unit area, measured in pascals, Pa, or kPa). Boyle\'s law: at constant temperature, squeezing a gas into a smaller volume packs the particles closer so they hit the walls more often, so pressure rises: P1V1 = P2V2. Charles\'s law: at constant pressure, heating the gas makes particles move faster and push the walls outward, so volume rises in proportion to the temperature measured on the Kelvin scale: V1/T1 = V2/T2. The Kelvin scale starts at absolute zero (-273 degrees Celsius) and is found by adding 273 to the Celsius value. Combining both: P1V1/T1 = P2V2/T2. Always use Kelvin, never Celsius, because ratios only work from a true zero. Gas volumes can use any one unit on both sides (cm^3 or dm^3) as long as it is the same.',
            'P1V1 = P2V2 (constant T)  |  V1/T1 = V2/T2 (constant P)  |  P1V1/T1 = P2V2/T2',
            'Piston cylinder diagram and P-V and V-T graphs',
            'A bicycle pump heats up and the tyre gets harder because pumping compresses air; LPG cooking gas cylinders hold gas under pressure.',
            'When you push the plunger of a sealed syringe in halfway, what should happen to the number of collisions per second on the walls, and why?',
            'Assessment focus: choosing the correct law, converting to Kelvin, and sketching or interpreting P-V and V-T graphs.',
            [
              'Step 1: List what is given for the start and end states and which quantity stays constant. Reason: the constant quantity decides which law applies.',
              'Step 2: Convert every temperature to Kelvin by adding 273. Reason: gas volume is proportional to Kelvin temperature, not Celsius.',
              'Step 3: Write the formula and rearrange for the unknown before substituting. Reason: it avoids slips when numbers are in the way.',
              'Step 4: Substitute, calculate, and ask whether the direction makes sense (more pressure should mean less volume). Reason: this catches an upside-down fraction.'
            ],
            'Question: 2.0 dm^3 of gas at 100 kPa and 27 degrees Celsius is compressed to 200 kPa and heated to 127 degrees Celsius. Find the new volume. Working: T1 = 27 + 273 = 300 K; T2 = 127 + 273 = 400 K. V2 = P1V1T2 / (T1P2) = (100 x 2.0 x 400) / (300 x 200) = 80 000 / 60 000 = 1.33 dm^3. Check: doubling pressure alone would halve the volume to 1.0 dm^3; heating from 300 K to 400 K multiplies it by 4/3, giving 1.33 dm^3. Common mistake: substituting 27 and 127 directly without converting to Kelvin.'
          ),
          stop(
            'cbc_g11_chem_s2_3',
            '2.3 Reaction Rates',
            'Collision Theory and the Factors that Speed Reactions',
            'A reaction goes faster when more successful collisions happen each second',
            'The rate of a reaction is how quickly reactants are used up or products appear, measured as change in amount (or concentration) divided by the time taken. For particles to react they must collide, and the collision must carry at least a minimum energy called the activation energy; a collision that does this is a successful collision. Rate increases when: concentration or gas pressure is higher (more particles in the same space, so more collisions each second); the solid is in smaller pieces (a larger surface area is exposed to the other reactant); the temperature is higher (particles move faster, so more collisions and a larger fraction have enough energy); or a catalyst is used (it provides a different route with a lower activation energy). On a graph of product formed against time, a steeper line means a faster rate and the line flattens when one reactant is used up.',
            'rate = change in quantity / time taken  |  rate = (c1 - c2) / t',
            'Rate curves for different concentrations and temperatures',
            'Charcoal in a jiko burns faster when fanned (more oxygen) and when broken into small pieces; milk sours faster in a warm kitchen than in a fridge.',
            'Why does a heap of wood shavings burn fiercely while a whole log of the same mass burns slowly?',
            'Assessment focus: explaining each factor with collision theory, reading rate graphs, and calculating average rate.',
            [
              'Step 1: Identify exactly what changes (concentration, surface area, temperature or catalyst). Reason: each factor affects collisions in a different way.',
              'Step 2: State the effect on the number of particles meeting each second, or on the fraction with enough energy. Reason: this is the actual cause of a rate change, and answers that skip it lose marks.',
              'Step 3: For calculations, find the change in concentration or volume and divide by the time. Reason: rate is a change per unit time.',
              'Step 4: Check that units match what was asked, for example mol/dm^3/s or cm^3/min. Reason: a rate without units is incomplete.'
            ],
            'Question: In a reaction the concentration of a reactant falls from 0.80 mol/dm^3 to 0.50 mol/dm^3 in 30 seconds. Find the average rate. Working: change = 0.80 - 0.50 = 0.30 mol/dm^3. Rate = 0.30 / 30 = 0.010 mol/dm^3/s. Gas-collection variant: 48 cm^3 of gas collected in 2 minutes gives 48 / 2 = 24 cm^3/min. Common mistake: saying "the particles collide harder" for temperature without stating that more particles also reach the activation energy; and giving the reason for concentration as "the reaction is more crowded" without linking it to collision frequency.'
          )
        ]
      },
      {
        id: 'cbc_g11_chem_s3',
        number: 3,
        title: '3.0 Organic Chemistry',
        strand: 'Strand 3.0: Organic Chemistry',
        icon: 'Organic',
        status: 'available',
        summary: 'Hydrocarbons: alkanes, alkenes and alkynes, their naming, isomers and reactions.',
        subtopics: [
          stop(
            'cbc_g11_chem_s3_1',
            '3.1 Hydrocarbons',
            'Alkanes, Alkenes and Alkynes',
            'Carbon forms four bonds, and whether a molecule has only single bonds or a double or triple bond decides its reactions',
            'A hydrocarbon is a compound made only of carbon and hydrogen. Carbon atoms form four covalent bonds (a bond is a shared pair of electrons) and can join to each other in chains. In an alkane every carbon-carbon bond is a single bond, so the molecule is saturated, meaning it holds as many hydrogen atoms as it can; formula CnH(2n+2), for example methane CH4, ethane C2H6, propane C3H8, butane C4H10. An alkene has one carbon-carbon double bond, so it is unsaturated; formula CnH(2n), for example ethene C2H4. An alkyne has a triple bond; formula CnH(2n-2), for example ethyne C2H2. Names come from the number of carbons (meth-1, eth-2, prop-3, but-4, pent-5) plus the ending -ane, -ene or -yne. Isomers are compounds with the same molecular formula but different structures: butane and methylpropane are both C4H10. Alkanes burn and react with chlorine in sunlight by substitution (a hydrogen is replaced); alkenes and alkynes undergo addition, where the double bond opens to add atoms, which decolourises bromine water.',
            'CnH(2n+2) alkane  |  CnH(2n) alkene  |  CnH(2n-2) alkyne  |  alkene + Br2 -> dibromoalkane',
            'Ball and stick models of ethane, ethene and ethyne with bromine water test',
            'LPG cooking gas is mainly propane and butane; ethyne burns in welding torches in jua kali workshops.',
            'If a gas decolourises orange-brown bromine water immediately in the dark but another gas does not, what does that tell you about their bonds?',
            'Assessment focus: naming, drawing isomers, the bromine water test, and combustion calculations.',
            [
              'Step 1: Count the carbons in the longest chain to get the stem name. Reason: the stem tells the chain length.',
              'Step 2: Check for double or triple bonds to choose the ending -ane, -ene or -yne. Reason: the ending signals saturated or unsaturated behaviour.',
              'Step 3: For combustion, write the balanced equation (carbons become CO2, hydrogens become H2O, then balance oxygen last). Reason: oxygen appears in two products, so balancing it last avoids repeated corrections.',
              'Step 4: Use mole ratios as in the mole topic. Reason: the equation gives the ratio between fuel burnt and gas produced.'
            ],
            'Question: 2.2 g of propane burns completely: C3H8 + 5O2 -> 3CO2 + 4H2O. What volume of CO2 forms at r.t.p.? Working: Mr of C3H8 = (3 x 12) + 8 = 44. Moles = 2.2 / 44 = 0.050 mol. Ratio C3H8 : CO2 = 1 : 3, so moles CO2 = 0.15 mol. Volume = 0.15 x 24 = 3.6 dm^3. Common mistake: drawing butane and methylpropane as different molecular formulas, or counting a chain drawn bent as a different isomer when it is the same chain turned around.'
          )
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // GRADE 12 CHEMISTRY (KICD design, Mar 2026)
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 12,
    subject: 'Chemistry',
    code: 'CHEM-G12',
    trackPathway: 'STEM',
    title: 'CBE Grade 12 (Senior STEM) Chemistry Metro Line',
    description: 'Strands follow the KICD Grade 12 Chemistry design (Mar 2026).',
    stations: [
      {
        id: 'cbc_g12_chem_s1',
        number: 1,
        title: '1.0 Inorganic Chemistry',
        strand: 'Strand 1.0: Inorganic Chemistry',
        icon: 'Inorganic',
        status: 'available',
        summary: 'Large-scale manufacture of key inorganic chemicals, and carbon and the extraction of metals.',
        subtopics: [
          stop(
            'cbc_g12_chem_s1_1',
            '1.1 Industrial manufacture of inorganic chemicals',
            'Sulfuric Acid, Ammonia and Sodium Carbonate',
            'Industry picks temperature, pressure and catalyst to balance how fast a reaction goes against how much product it gives',
            'Many important chemicals are made on a scale of thousands of tonnes. In a reversible reaction (one that can go both ways, shown by a double arrow) the amount of product at equilibrium depends on conditions, while the speed depends on conditions too, so factories compromise. Sulfuric acid is made by the Contact process: sulfur burns to sulfur dioxide, which is turned to sulfur trioxide over a vanadium(V) oxide catalyst at about 450 degrees Celsius and 1 to 2 atmospheres, and the trioxide is absorbed in concentrated sulfuric acid then diluted. Ammonia is made by the Haber process: N2 + 3H2 <=> 2NH3 at about 450 degrees Celsius, 200 atmospheres, with an iron catalyst; ammonia is used for fertilisers. Sodium carbonate (soda ash) is made in the Solvay process from brine and limestone, while Kenya also obtains it from natural trona at Lake Magadi. In an exothermic reversible reaction, a lower temperature gives more product but is slow, so a moderate temperature with a catalyst is chosen.',
            'S + O2 -> SO2;  2SO2 + O2 <=> 2SO3 (V2O5)  |  N2 + 3H2 <=> 2NH3 (Fe)  |  % yield = actual / theoretical x 100',
            'Flow diagrams of the Contact and Haber processes',
            'Lake Magadi produces soda ash from trona; fertiliser plants and many Kenyan farms depend on ammonia-based fertilisers; sulfuric acid is used in car batteries.',
            'If raising the temperature makes a reaction faster but pushes the equilibrium towards the reactants, how would you decide what temperature to use?',
            'Assessment focus: conditions and reasons for each process, equilibrium compromise, and percentage yield calculations.',
            [
              'Step 1: Write the balanced equations for each stage. Reason: stage-by-stage ratios give the overall mole relationship.',
              'Step 2: Note whether the forward reaction is exothermic and whether gas moles decrease. Reason: these two facts decide the direction in which temperature and pressure push the equilibrium.',
              'Step 3: State the compromise and catalyst chosen. Reason: a catalyst gives speed without altering the equilibrium position.',
              'Step 4: Apply percentage yield = actual / theoretical x 100 to the mass or mole result. Reason: no real plant reaches the theoretical amount.'
            ],
            'Question: A plant burns 1000 kg of sulfur to make sulfuric acid, S -> SO2 -> SO3 -> H2SO4, with an overall 90 percent yield. What mass of H2SO4 is made? Working: each S atom ends up in one H2SO4, so moles S : moles H2SO4 = 1 : 1. Ar of S = 32; Mr of H2SO4 = 2 + 32 + 64 = 98. Theoretical mass = 1000 x 98 / 32 = 3062.5 kg. Actual = 3062.5 x 0.90 = 2756 kg (to 4 s.f.). Common mistake: saying a catalyst increases the yield; it only reaches equilibrium faster.'
          ),
          stop(
            'cbc_g12_chem_s1_2',
            '1.2 Carbon and extraction of metals',
            'Allotropes of Carbon, Reduction and Electrolysis',
            'A metal is extracted from its ore by the method that matches how strongly the metal holds on to oxygen',
            'Carbon exists in different forms called allotropes, meaning different arrangements of the same element: diamond (each carbon bonded to four others, very hard), graphite (layers that slide and conduct electricity), and amorphous carbon such as charcoal and soot. An ore is a rock containing enough of a metal compound to be worth extracting. Reduction means removing oxygen from a compound (or adding electrons). The reactivity series lists metals from most to least reactive; a metal below carbon can be reduced by heating its oxide with carbon or carbon monoxide, while metals above carbon, like aluminium, need electrolysis (breaking down a molten compound using electricity). Iron is extracted in a blast furnace: coke burns to give carbon monoxide, which reduces iron(III) oxide: Fe2O3 + 3CO -> 2Fe + 3CO2. Limestone is added to remove sand as slag. Zinc coating protects iron from rusting, as in galvanised mabati.',
            'Fe2O3 + 3CO -> 2Fe + 3CO2  |  Al2O3 (molten) -> 2Al + 3/2 O2 by electrolysis',
            'Blast furnace cross-section with temperature zones',
            'Charcoal is amorphous carbon from wood; mabati roofing sheets are iron coated with zinc; scrap-metal recyclers in Nairobi remelt iron and aluminium.',
            'Why can charcoal reduce lead oxide but cannot reduce aluminium oxide?',
            'Assessment focus: blast furnace reactions, why each method suits each metal, and mass calculations from ore.',
            [
              'Step 1: Place the metal in the reactivity series. Reason: its position decides the cheapest method.',
              'Step 2: If it is below carbon, use heating with carbon or carbon monoxide; if above, use electrolysis. Reason: carbon can only take oxygen from less reactive metals.',
              'Step 3: Write the reduction equation and balance it. Reason: the ratio of ore to metal comes straight from the coefficients.',
              'Step 4: Convert between masses with Mr values. Reason: this gives the mass of metal expected from the ore.'
            ],
            'Question: What mass of iron forms from 160 kg of iron(III) oxide? Working: Mr of Fe2O3 = (2 x 56) + (3 x 16) = 160. Moles = 160 / 160 = 1 (in kmol, taking kg with kg/kmol). Ratio Fe2O3 : Fe = 1 : 2, so 2 kmol Fe. Mass = 2 x 56 = 112 kg. Common mistake: writing the ratio as 1 : 1, forgetting that one formula unit of Fe2O3 contains two iron atoms.'
          )
        ]
      },
      {
        id: 'cbc_g12_chem_s2',
        number: 2,
        title: '2.0 Physical Chemistry',
        strand: 'Strand 2.0: Physical Chemistry',
        icon: 'Physical',
        status: 'available',
        summary: 'Heat changes, electrochemistry, and nuclear chemistry.',
        subtopics: [
          stop(
            'cbc_g12_chem_s2_1',
            '2.1 Energy changes in physical and chemical processes',
            'Enthalpy, Exothermic and Endothermic Change',
            'Breaking bonds takes in energy and making bonds gives it out; the difference is the heat change',
            'Energy is stored in chemical bonds. A process that gives out heat to the surroundings is exothermic (the temperature rises) and one that takes heat in is endothermic (the temperature falls). The heat change at constant pressure is called the enthalpy change, symbol delta H, with unit kJ/mol; it is negative for exothermic change and positive for endothermic change. Physical processes also have energy changes: melting and evaporating take in energy, condensing and freezing give it out. To measure it, a reaction is carried out in an insulated cup and the temperature change of the water is recorded. The heat gained by the water is q = m x c x delta T, where m is mass of water in grams, c is the specific heat capacity of water (4.2 J/g/K, the heat needed to warm 1 g by 1 K) and delta T is the temperature rise. Dividing q by the moles that reacted gives the heat per mole.',
            'q = m c deltaT  |  deltaH = -q / n  (exothermic)',
            'Energy level diagrams for exothermic and endothermic change',
            'Burning charcoal and cooking gas releases heat; the cold pack in a first-aid kit works by an endothermic dissolving process.',
            'When ice melts in your hand, is heat moving from your hand to the ice, or from the ice to your hand, and what sign should its enthalpy change have?',
            'Assessment focus: energy level diagrams, calorimetry calculations, and sign of delta H.',
            [
              'Step 1: Measure the starting temperature, mix, and record the highest (or lowest) temperature. Reason: delta T is what shows how much heat moved.',
              'Step 2: Calculate q = m x c x delta T using the mass of the whole solution. Reason: the heat is spread through all the liquid, not just one reagent.',
              'Step 3: Find moles of the limiting reactant (the one that runs out first). Reason: heat released depends on the amount that reacted.',
              'Step 4: Divide q by moles, convert J to kJ, and give a negative sign if the temperature rose. Reason: delta H is defined per mole, and the sign records direction.'
            ],
            'Question: 50 cm^3 of 1.0 mol/dm^3 HCl is mixed with 50 cm^3 of 1.0 mol/dm^3 NaOH; the temperature rises by 6.8 K. Find delta H of neutralisation. Working: total mass = 100 g (taking 1 g per cm^3). q = 100 x 4.2 x 6.8 = 2856 J. Moles of HCl = 0.050 x 1.0 = 0.050 mol. Heat per mole = 2856 / 0.050 = 57 120 J = 57.1 kJ/mol. Temperature rose, so delta H = -57.1 kJ/mol. Common mistake: using only 50 g as the mass, or leaving out the minus sign for an exothermic reaction.'
          ),
          stop(
            'cbc_g12_chem_s2_2',
            '2.2 Electrochemistry',
            'Electrolysis, Faraday and Electrochemical Cells',
            'Electric charge passed equals moles of electrons, and each mole of electrons deposits a fixed amount of a metal',
            'Electrochemistry is the study of how chemical change and electricity are linked. An electrolyte is a molten or dissolved ionic compound that conducts because its ions are free to move. In electrolysis, electricity drives a non-spontaneous reaction: positive ions (cations) move to the negative electrode (cathode) and gain electrons, which is reduction, while negative ions (anions) move to the positive electrode (anode) and lose electrons, which is oxidation. Charge Q in coulombs equals current I in amperes times time t in seconds. One mole of electrons carries 96 500 coulombs (the Faraday constant). A cell works the other way: a spontaneous reaction produces a voltage, and the cell EMF equals E(cathode) minus E(anode) using standard electrode potentials. For Zn and Cu, E(Cu2+/Cu) = +0.34 V and E(Zn2+/Zn) = -0.76 V, so the EMF is 0.34 - (-0.76) = 1.10 V. Electroplating coats an object by making it the cathode in a solution of the plating metal.',
            'Q = I t  |  moles of e- = Q / 96 500  |  EMF = E(cathode) - E(anode)',
            'Electrolysis cell with electrode half-equations',
            'Zinc coating of mabati is done by galvanising; brine electrolysis makes chlorine and sodium hydroxide; car batteries and phone batteries are cells.',
            'If you double the current but run the electrolysis for half the time, what happens to the mass of metal deposited, and why?',
            'Assessment focus: half-equations, predicting products, Faraday calculations, and cell EMF from electrode potentials.',
            [
              'Step 1: Write the half-equation at each electrode, such as Cu2+ + 2e- -> Cu at the cathode. Reason: it shows how many electrons each atom needs.',
              'Step 2: Calculate Q = I x t with time converted to seconds. Reason: the Faraday constant uses coulombs.',
              'Step 3: Divide Q by 96 500 to get moles of electrons. Reason: this converts charge to chemical amount.',
              'Step 4: Use the half-equation ratio to get moles of metal, then multiply by Ar. Reason: the ratio between electrons and metal atoms sets how much metal forms.'
            ],
            'Question: A current of 2.0 A flows for 30 minutes through copper(II) sulfate solution. What mass of copper is deposited? (Ar Cu = 63.5.) Working: t = 30 x 60 = 1800 s. Q = 2.0 x 1800 = 3600 C. Moles of electrons = 3600 / 96 500 = 0.0373 mol. Cu2+ + 2e- -> Cu, so moles Cu = 0.0373 / 2 = 0.01865 mol. Mass = 0.01865 x 63.5 = 1.18 g. Common mistake: leaving the time in minutes, giving an answer 60 times too small, or forgetting to halve the electron moles for a 2+ ion.'
          ),
          stop(
            'cbc_g12_chem_s2_3',
            '2.3 Nuclear chemistry',
            'Radioactivity, Decay Equations and Half-life',
            'Unstable nuclei change by emitting radiation, and the time for half of them to decay is fixed',
            'The nucleus is the centre of an atom, made of protons (positive) and neutrons (no charge). Atoms of the same element with different numbers of neutrons are isotopes. Some isotopes are unstable, so their nuclei break down spontaneously and release radiation; this is radioactive decay. Alpha decay emits an alpha particle, a helium nucleus (2 protons, 2 neutrons), so the mass number drops by 4 and the atomic number by 2. Beta decay emits an electron from the nucleus (a neutron becomes a proton), so the mass number stays the same and the atomic number rises by 1. Gamma rays are high-energy waves with no mass or charge. In a nuclear equation the mass numbers (top) must add up equal on both sides, and so must the atomic numbers (bottom). The half-life is the time for half of the radioactive atoms in a sample to decay; it does not depend on how much you start with. Uses include cancer radiotherapy, tracers in medicine and dating of ancient material.',
            'alpha: A-4, Z-2  |  beta: A same, Z+1  |  N = N0 x (1/2)^(t / half-life)',
            'Decay chain and exponential decay curve',
            'Hospitals use radiation sources to treat cancer and sterilise instruments; carbon-14 content is used to date wood and bones in archaeological sites.',
            'If a sample has a half-life of 5 years, will it be completely gone after 10 years? What fraction remains?',
            'Assessment focus: balancing nuclear equations, half-life calculations, uses and safety.',
            [
              'Step 1: Identify the particle emitted (alpha, beta or gamma). Reason: each changes the mass and atomic numbers differently.',
              'Step 2: Balance top and bottom numbers separately. Reason: both mass number and atomic number are conserved.',
              'Step 3: For half-life, divide the total time by the half-life to count the number of half-lives. Reason: each half-life halves the remainder.',
              'Step 4: Halve the starting amount that many times. Reason: decay is repeated halving, not subtraction of a fixed amount.'
            ],
            'Question A: uranium-238 (atomic number 92) undergoes alpha decay. Name the product. Working: mass number 238 - 4 = 234; atomic number 92 - 2 = 90, which is thorium. 238/92 U -> 234/90 Th + 4/2 He. Question B: 80 g of a radioisotope with half-life 5 years; how much remains after 15 years? Working: 15 / 5 = 3 half-lives. 80 -> 40 -> 20 -> 10 g. Remaining = 10 g. Common mistake: thinking that after two half-lives everything has decayed; after two half-lives one quarter remains.'
          )
        ]
      },
      {
        id: 'cbc_g12_chem_s3',
        number: 3,
        title: '3.0 Organic Chemistry',
        strand: 'Strand 3.0: Organic Chemistry',
        icon: 'Organic',
        status: 'available',
        summary: 'Alkanols, alkanoic acids, soaps and detergents, and polymers.',
        subtopics: [
          stop(
            'cbc_g12_chem_s3_1',
            '3.1 Alkanols',
            'Alcohols: Structure, Fermentation and Reactions',
            'The -OH group makes alkanols behave differently from the hydrocarbons they come from',
            'An alkanol (alcohol) is an organic compound with the hydroxyl group, -OH, attached to a carbon chain. The general formula is CnH(2n+1)OH: methanol CH3OH, ethanol C2H5OH, propanol C3H7OH. A functional group is the atom or group that gives a family of compounds its characteristic reactions. The -OH group can form hydrogen bonds between molecules, so alkanols have higher boiling points than alkanes of similar size and the small ones dissolve in water. Ethanol is made by fermentation: yeast enzymes convert glucose to ethanol and carbon dioxide, C6H12O6 -> 2C2H5OH + 2CO2, without air. Ethanol burns cleanly: C2H5OH + 3O2 -> 2CO2 + 3H2O. It reacts with sodium to give hydrogen and sodium ethoxide, and with an acid in the presence of concentrated sulfuric acid to form an ester. It can be oxidised to ethanoic acid. Methanol is highly poisonous and can cause blindness or death if drunk.',
            'C6H12O6 -> 2C2H5OH + 2CO2  |  2C2H5OH + 2Na -> 2C2H5ONa + H2',
            'Fermentation set-up with limewater and fractional distillation',
            'Ethanol from sugar cane molasses at sugar factories in western Kenya is used for fuel blending and for surgical spirit; methanol contamination in illicit brews has caused deaths.',
            'Why does ethanol dissolve in water easily while hexane does not, even though both are made mostly of carbon and hydrogen?',
            'Assessment focus: naming, fermentation, reactions with sodium and combustion, and percentage yield.',
            [
              'Step 1: Identify the -OH and the carbon chain length to name the alkanol. Reason: the chain length gives the stem and the -OH gives the ending -anol.',
              'Step 2: For fermentation, keep the mixture warm (about 35 degrees Celsius) and without air. Reason: yeast enzymes work best near this temperature, and air would oxidise ethanol to ethanoic acid.',
              'Step 3: Separate ethanol from the mixture by fractional distillation. Reason: ethanol boils at 78 degrees Celsius, lower than water, so it distils first.',
              'Step 4: Use the equation ratio and Mr values for yield. Reason: 1 mole of glucose gives 2 moles of ethanol.'
            ],
            'Question: 90 g of glucose is fermented with 80 percent yield. What mass of ethanol is collected? Working: Mr of glucose = (6 x 12) + 12 + (6 x 16) = 180; moles = 90 / 180 = 0.50 mol. Ratio glucose : ethanol = 1 : 2, so 1.0 mol ethanol theoretically. Mr of ethanol = 24 + 6 + 16 = 46. Theoretical mass = 46 g. Actual = 46 x 0.80 = 36.8 g. Common mistake: forgetting the factor 2 from the equation, giving 23 g as the theoretical mass.'
          ),
          stop(
            'cbc_g12_chem_s3_2',
            '3.2 Alkanoic acid',
            'Carboxylic Acids, Acid Reactions and Esters',
            'The -COOH group makes alkanoic acids weak acids that also form sweet-smelling esters with alcohols',
            'An alkanoic acid (carboxylic acid) contains the carboxyl group, -COOH. Examples are methanoic acid HCOOH and ethanoic acid CH3COOH, which is the acid in vinegar. These are weak acids, meaning only a small fraction of their molecules release H+ ions in water, but they still show typical acid reactions: with a metal they give a salt and hydrogen, with a carbonate they give a salt, water and carbon dioxide (fizzing), and with a base they neutralise to a salt and water. The salt of ethanoic acid is an ethanoate. An alkanoic acid reacts reversibly with an alkanol, using a few drops of concentrated sulfuric acid as a catalyst, to form an ester and water: CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O. Esters are volatile liquids with fruity smells and are used in flavourings and perfumes. Ethanoic acid is made from ethanol by oxidation, which is why wine left open turns sour.',
            'CH3COOH + C2H5OH <=> CH3COOC2H5 + H2O  |  2CH3COOH + Na2CO3 -> 2CH3COONa + H2O + CO2',
            'Reflux apparatus for esterification',
            'Vinegar (ethanoic acid) is used in food preservation and pickling; ester flavourings give fruity flavours to sweets and soda.',
            'If vinegar fizzes when poured onto baking soda but ethanoic acid does not give a very low pH, what two things does that tell you about the acid?',
            'Assessment focus: acid reactions, ester formation and naming (alkyl alkanoate), and gas volume calculations.',
            [
              'Step 1: Identify the -COOH group and name the acid from the longest chain including the carboxyl carbon. Reason: that carbon counts in the chain length.',
              'Step 2: For esterification, heat the acid and alcohol with a few drops of concentrated sulfuric acid under reflux. Reason: reflux condenses vapour back so nothing is lost while heating; the acid catalyses a slow reversible reaction.',
              'Step 3: Name the ester with the alcohol part first (ethyl) then the acid part (ethanoate). Reason: the alcohol supplies the alkyl group and the acid supplies the alkanoate.',
              'Step 4: For gas calculations, write the balanced equation and apply mole ratios. Reason: the amount of gas depends on the ratio, not the mass of acid alone.'
            ],
            'Question: 6.0 g of ethanoic acid reacts with excess sodium carbonate: 2CH3COOH + Na2CO3 -> 2CH3COONa + H2O + CO2. What volume of CO2 forms at r.t.p.? Working: Mr of CH3COOH = 24 + 4 + 32 = 60. Moles = 6.0 / 60 = 0.10 mol. Ratio acid : CO2 = 2 : 1, so CO2 = 0.050 mol. Volume = 0.050 x 24 = 1.2 dm^3. Common mistake: using a 1 : 1 ratio, which gives 2.4 dm^3, or calling ethanoic acid a strong acid because it has the same reactions as one.'
          ),
          stop(
            'cbc_g12_chem_s3_3',
            '3.3 Detergents',
            'Soap, Saponification and Soapless Detergents',
            'A detergent molecule has a water-loving head and a grease-loving tail, which lets it lift grease into water',
            'A fat or oil is an ester of glycerol (a molecule with three -OH groups) and long-chain fatty acids. Soap is made by saponification, boiling a fat or oil with a strong alkali such as sodium hydroxide, which gives glycerol and the sodium salt of the fatty acid; that salt is the soap, for example sodium stearate, C17H35COONa. A soap or detergent ion has two ends: a hydrophilic head (water-attracting, the charged COO- end) and a hydrophobic tail (water-repelling, the long hydrocarbon chain which dissolves in grease). In washing the tails surround a grease spot while the heads stay in water, which breaks the grease into tiny droplets that rinse away. Hard water contains dissolved calcium and magnesium ions; these react with soap to form an insoluble scum: 2C17H35COO- + Ca2+ -> (C17H35COO)2Ca. Soapless detergents (synthetic ones made from petroleum or other sources) have sulfonate or sulfate heads, and their calcium salts are soluble, so they do not form scum in hard water. Detergents that do not break down easily can pollute rivers and lakes.',
            'fat + 3NaOH -> glycerol + 3 sodium salts of fatty acids (soap)  |  Ca2+ + 2 soap- -> scum',
            'Micelle diagram of a detergent around a grease droplet',
            'Local soap-making uses oil, caustic soda and sometimes soda ash from Magadi; boreholes in parts of Kenya give hard water that wastes soap.',
            'Why does soap lather poorly in hard water but a soapless detergent still lathers?',
            'Assessment focus: saponification equation, how cleansing works, hard-water scum, and comparing soap with soapless detergents.',
            [
              'Step 1: Identify the fat or oil and the alkali, and write that heating with alkali splits the ester. Reason: alkali breaks the ester bonds to give glycerol and fatty-acid salts.',
              'Step 2: Add concentrated salt solution to the mixture to make soap separate out (salting out). Reason: soap is less soluble in salty water, so it floats as a solid layer.',
              'Step 3: Explain cleaning using head and tail. Reason: this is the mechanism that explains why it works on grease.',
              'Step 4: For hard water, show the calcium ion removing the soap ions as scum. Reason: this explains wasted soap and the dull grey film left on clothes and baths.'
            ],
            'Question: Hard water contains 0.010 mol of Ca2+. What mass of sodium stearate, C17H35COONa, is wasted forming scum? Working: ratio Ca2+ : stearate ion = 1 : 2, so 0.020 mol of stearate. Mr of C17H35COONa = (18 x 12) + 35 + 32 + 23 = 306. Mass = 0.020 x 306 = 6.12 g. Common mistake: saying the hydrophilic head dissolves grease; it is the hydrophobic tail that goes into the grease, while the head stays in the water.'
          ),
          stop(
            'cbc_g12_chem_s3_4',
            '3.4 Polymers',
            'Addition and Condensation Polymerisation',
            'A polymer is a very long molecule built by joining many small molecules called monomers',
            'A monomer is a small molecule that can join to many others, and a polymer is the long chain that results. In addition polymerisation, monomers that contain a carbon-carbon double bond open that bond and link up with nothing lost; ethene forms poly(ethene), chloroethene forms poly(chloroethene) known as PVC, and propene forms poly(propene). The repeat unit is shown in brackets with n outside: n CH2=CH2 -> -(CH2-CH2)n-. In condensation polymerisation, two different monomers each with two reactive end groups join, and a small molecule, usually water, is lost at every join. Nylon is made from a diamine and a dicarboxylic acid and has amide links; polyester has ester links. Natural polymers include proteins (amino acids with amide links) and starch (glucose units). The relative molecular mass of an addition polymer is the monomer mass multiplied by the number of units. Most plastics do not decompose in soil, so disposal and recycling matter.',
            'n CH2=CH2 -> -(CH2-CH2)n-  |  Mr(polymer) = n x Mr(monomer)',
            'Chain growth diagram and repeat unit',
            'Kenya banned single-use plastic carrier bags in 2017 because poly(ethene) bags did not break down and blocked drains; nylon is used in ropes and fishing nets on Lake Victoria.',
            'If a monomer has a double bond, what does the polymer lose when it forms, and what stays the same?',
            'Assessment focus: drawing repeat units, addition versus condensation, and calculating polymer molecular mass.',
            [
              'Step 1: Look for a C=C double bond in the monomer. Reason: it signals addition polymerisation; the double bond opens to make the chain.',
              'Step 2: Draw the monomer with the double bond changed to a single bond and two open bonds at the ends. Reason: those open bonds link to neighbouring units.',
              'Step 3: For condensation polymers, identify the two end groups and the small molecule lost. Reason: it tells you the link type (ester or amide).',
              'Step 4: Multiply the monomer mass by n for the polymer mass. Reason: nothing is lost in addition polymerisation, so mass adds up exactly.'
            ],
            'Question: PVC is made from chloroethene, C2H3Cl. A chain contains 800 monomer units. What is its relative molecular mass? Working: Mr of C2H3Cl = (2 x 12) + 3 + 35.5 = 62.5. Mr of polymer = 800 x 62.5 = 50 000. Common mistake: drawing the repeat unit with the double bond still present; in the polymer all carbon-carbon bonds are single, and a condensation polymer must not be described as losing no atoms.'
          )
        ]
      }
    ]
  }
];

module.exports = CBC_SENIOR_CHEMISTRY_MAPS;
