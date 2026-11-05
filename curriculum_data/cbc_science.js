// ══════════════════════════════════════════════════════════════
// KICD COMPETENCY-BASED EDUCATION (CBE) — SCIENCE & STEM ROADMAP
// Covers JSS Integrated Science (Grade 8) and Senior School STEM (Grade 10):
// Physics, Chemistry, Biology, and Computer Studies
// ══════════════════════════════════════════════════════════════

const CBC_SCIENCE_MAPS = {
  // ────────────────────────────────────────────────────────────
  // GRADE 8: INTEGRATED SCIENCE (JUNIOR SCHOOL JSS)
  // ────────────────────────────────────────────────────────────
  IntegratedScience: {
    8: {
      curriculum: 'CBC',
      grade: 8,
      subject: 'Integrated Science',
      title: 'Grade 8 Integrated Science Metro Line',
      stations: [
        {
          id: 'cbc_g8_sci_s1',
          number: 1,
          title: 'Mixtures, Elements & Chemical Reactions',
          strand: 'Strand 1: Matter & Chemistry',
          icon: '⚗️',
          status: 'available',
          summary: 'Pure substances vs mixtures, fractional distillation, chromatography, and acid-base indicators.',
          subtopics: [
            {
              id: 'cbc_g8_sci_s1_1',
              title: 'Separation Techniques: Fractional Distillation & Chromatography',
              status: 'available',
              conceptPrimer: {
                title: 'Exploiting Differences in Physical Properties',
                tagline: 'Substances in a mixture can be separated without chemical reactions because their boiling points or solubilities differ',
                body: 'Mixtures consist of two or more substances physically mingled together, not chemically bonded. Fractional distillation separates miscible liquids (like water and ethanol, or crude oil fractions) because each compound boils and turns to vapor at a distinct temperature. Chromatography separates pigments based on how fast they dissolve in a moving solvent versus cling to absorbent paper.',
                explanationSteps: [
                  'Step 1: Identify the key difference in physical properties (e.g. Ethanol boils at 78°C; Water boils at 100°C).',
                  'Step 2: Heat the mixture: The lower-boiling liquid vaporizes first and rises up the fractionating column.',
                  'Step 3: Cool and condense: The vapor passes into the Liebig condenser, turns back into pure liquid, and is collected.'
                ],
                workedExample: 'Separating water and ethanol: Heat at 78°C. Ethanol vaporizes, condenses in the condenser, and collects in the beaker. Water remains in the flask until temperature rises to 100°C.',
                formula: 'Difference in Boiling Point (ΔTb) → Separation by Distillation',
                visualBadge: '🧪 Fractionating Column Model',
                realWorldContext: 'Refining crude oil into petrol, diesel and kerosene, and purifying herbal medicines in Kenya.'
              },
              socraticPrompt: 'Why does ethanol vapor reach the top of the fractionating column before water vapor when both liquids are heated together in the same flask?',
              examFocus: 'KJSEA Science Practical Assessment: Interpreting paper chromatograms and labeling parts of a distillation apparatus.'
            },
            {
              id: 'cbc_g8_sci_s1_2',
              title: 'Acids, Bases & Natural Plant Indicators',
              status: 'available',
              conceptPrimer: {
                title: 'The Chemical Spectrum of Sour and Bitter',
                tagline: 'Acids release hydrogen ions in solution; bases accept them or release hydroxide ions',
                body: 'Common acids like lemon juice (citric acid) and vinegar (ethanoic acid) taste sour and turn blue litmus paper red (pH < 7). Bases like wood ash extract and baking soda feel slippery, taste bitter, and turn red litmus blue (pH > 7). Natural plant extracts, such as red cabbage leaves or hibiscus flowers, contain anthocyanin dyes that dramatically shift color at different pH levels.',
                explanationSteps: [
                  'Step 1: Prepare the indicator by crushing hibiscus petals or red cabbage in warm water to extract pigment.',
                  'Step 2: Add indicator to test substance: Pink/red indicates an acid; Green/yellow indicates a base.',
                  'Step 3: Neutralization: When an acid and base react in equal measure, they produce neutral salt and water (pH 7).'
                ],
                workedExample: 'Testing soil acidity: Shake red soil with water and add hibiscus indicator. If it turns bright red, the soil is too acidic and needs agricultural lime (calcium hydroxide base) to neutralize it.',
                formula: 'Acid + Base → Salt + Water (Neutralization)',
                visualBadge: '🌈 pH Color Scale 0-14',
                realWorldContext: 'Balancing soil pH for tea and maize farming in the Rift Valley and Central Kenya.'
              },
              socraticPrompt: 'If a farmer notices her tea crops are turning yellow due to overly acidic soil, what natural substance can she add, and what chemical reaction takes place?',
              examFocus: 'KJSEA Model Item: Classifying common household liquids into acids, bases, or neutral solutions.'
            }
          ]
        },
        {
          id: 'cbc_g8_sci_s2',
          number: 2,
          title: 'Human Organ Systems: Circulation & Respiration',
          strand: 'Strand 2: Living Things & Physiology',
          icon: '🫀',
          status: 'available',
          summary: 'The double circulatory system, heart structure, gaseous exchange in alveoli, and healthy lifestyles.',
          subtopics: [
            {
              id: 'cbc_g8_sci_s2_1',
              title: 'Double Circulation & The Structure of the Heart',
              status: 'available',
              conceptPrimer: {
                title: 'Two Continuous Loops in One Pump',
                tagline: 'Blood passes through the heart twice for every single complete circuit of the body',
                body: 'Humans have a double circulatory system: (1) Pulmonary circuit pumps deoxygenated blood from the right ventricle to the lungs to pick up oxygen and release carbon dioxide. (2) Systemic circuit pumps oxygen-rich blood from the thick muscular left ventricle throughout the entire body. The septum prevents oxygenated and deoxygenated blood from mixing.',
                explanationSteps: [
                  'Loop 1 (Pulmonary): Body → Vena Cava → Right Atrium → Right Ventricle → Pulmonary Artery → Lungs.',
                  'Loop 2 (Systemic): Lungs → Pulmonary Vein → Left Atrium → Left Ventricle → Aorta → Body Tissues.',
                  'Step 3: Valves ensure blood only flows in one direction, preventing dangerous backflow under pressure.'
                ],
                workedExample: 'Why is the left ventricle wall thicker than the right? The right only pumps blood a few centimeters to the lungs, while the left must pump blood all the way down to your toes and up to your brain against gravity!',
                formula: 'Right Side = Lungs (Deoxygenated) | Left Side = Body (Oxygenated)',
                visualBadge: '❤️ Figure-8 Double Circulatory Loop',
                realWorldContext: 'Understanding athletic stamina in Kenyan marathon runners and cardiovascular fitness.'
              },
              socraticPrompt: 'What would happen to a person\'s energy levels if there were a hole in the septum separating the left and right ventricles?',
              examFocus: 'KJSEA Living World: Labeling heart chambers, valves, and identifying which blood vessels carry oxygenated blood.'
            }
          ]
        }
      ]
    }
  },

  // ────────────────────────────────────────────────────────────
  // GRADE 10: SENIOR SCHOOL STEM PATHWAY
  // ────────────────────────────────────────────────────────────
  Physics: {
    10: {
      curriculum: 'CBC',
      grade: 10,
      subject: 'Physics',
      title: 'Grade 10 Physics Metro Line',
      stations: [
        {
          id: 'cbc_g10_phy_s1',
          number: 1,
          title: 'Linear Motion & Newton\'s Laws',
          strand: 'Strand 1: Mechanics',
          icon: '🚀',
          status: 'available',
          summary: 'Velocity-time graphs, equations of uniformly accelerated motion, and Newton\'s three laws.',
          subtopics: [
            {
              id: 'cbc_g10_phy_s1_1',
              title: 'Equations of Uniformly Accelerated Motion (SUVAT)',
              status: 'available',
              conceptPrimer: {
                title: 'Predicting the Trajectory of Moving Bodies',
                tagline: 'When acceleration is constant, velocity, displacement, and time are locked in exact mathematical harmony',
                body: 'Displacement (s), initial velocity (u), final velocity (v), acceleration (a), and time (t) define all linear motion. By starting from the fundamental definitions of velocity (v = u + at) and average velocity under constant acceleration, we derive equations that predict stopping distances and rocket flight without guessing.',
                explanationSteps: [
                  'Step 1: Equation 1 (Velocity definition): v = u + at',
                  'Step 2: Equation 2 (Displacement from average velocity): s = ut + ½at²',
                  'Step 3: Equation 3 (Time-independent formula): v² = u² + 2as'
                ],
                workedExample: 'A matatu traveling at 20 m/s brakes with deceleration a = -4 m/s².\nStopping distance: v² = u² + 2as → 0 = (20)² + 2(-4)s → 8s = 400 → s = 50 meters.',
                formula: 'v = u + at  |  s = ut + ½at²  |  v² = u² + 2as',
                visualBadge: '📈 Velocity-Time Area Integral Model',
                realWorldContext: 'Vehicle braking safety distances, runway design at JKIA, and standard speed governor regulations.'
              },
              socraticPrompt: 'If a car doubles its speed from 20 m/s to 40 m/s, what happens to its minimum stopping distance under the same braking force? (Hint: inspect v² = u² + 2as)',
              examFocus: 'KSSEA Physics: Calculating stopping distance and extracting acceleration and distance from velocity-time graphs.'
            }
          ]
        }
      ]
    }
  },

  Chemistry: {
    10: {
      curriculum: 'CBC',
      grade: 10,
      subject: 'Chemistry',
      title: 'Grade 10 Chemistry Metro Line',
      stations: [
        {
          id: 'cbc_g10_chem_s1',
          number: 1,
          title: 'Atomic Structure, Bonding & The Periodic Table',
          strand: 'Strand 1: Inorganic Chemistry',
          icon: '⚛️',
          status: 'available',
          summary: 'Subatomic particles, electron configuration, ionic vs covalent bonding, and periodic trends.',
          subtopics: [
            {
              id: 'cbc_g10_chem_s1_1',
              title: 'Ionic vs Covalent Bonding & Lattice Properties',
              status: 'available',
              conceptPrimer: {
                title: 'The Pursuit of Stable Electron Octets',
                tagline: 'Atoms bond to achieve low-energy noble gas electron configurations by transferring or sharing electrons',
                body: 'Metals have few valence electrons and lose them easily to form positive cations. Non-metals gain electrons to form negative anions. The strong electrostatic attraction between these oppositely charged ions forms a giant ionic lattice (high melting point, conducts electricity only when molten or aqueous). When non-metals interact, they share pairs of electrons to form covalent bonds.',
                explanationSteps: [
                  'Step 1: Check valence electrons: Metal (e.g. Na: 2.8.1) + Non-metal (e.g. Cl: 2.8.7).',
                  'Step 2: Transfer: Na loses 1e⁻ to become Na⁺; Cl gains 1e⁻ to become Cl⁻ (both achieve 2.8 and 2.8.8 stable octets).',
                  'Step 3: Properties: Solid crystals hold ions firmly in place; when melted or dissolved, ions become mobile charge carriers.'
                ],
                workedExample: 'Sodium Chloride (NaCl) vs Water (H2O):\nNaCl: Ionic solid, melting point ~801°C, conducts in water.\nH2O: Covalent molecule, weak intermolecular forces, boiling point 100°C, poor electrical conductor.',
                formula: 'Cation (M⁺) + Anion (X⁻) → Ionic Lattice (M⁺X⁻)',
                visualBadge: '🌐 3D Crystal Lattice vs Shared Molecular Orbitals',
                realWorldContext: 'Electrolytes in hydration drinks, salt mining at Lake Magadi, and silicone polymers.'
              },
              socraticPrompt: 'Why does solid table salt (NaCl) not conduct electricity, but the moment you dissolve it in a cup of water, it conducts readily?',
              examFocus: 'KSSEA Chemistry Paper 1: Drawing dot-and-cross diagrams and explaining electrical conductivity via mobile ions.'
            }
          ]
        }
      ]
    }
  },

  Biology: {
    10: {
      curriculum: 'CBC',
      grade: 10,
      subject: 'Biology',
      title: 'Grade 10 Biology Metro Line',
      stations: [
        {
          id: 'cbc_g10_bio_s1',
          number: 1,
          title: 'Cell Physiology & Membrane Transport',
          strand: 'Strand 1: Cell Biology',
          icon: '🔬',
          status: 'available',
          summary: 'Diffusion, osmosis, active transport, and water relations in plant and animal tissues.',
          subtopics: [
            {
              id: 'cbc_g10_bio_s1_1',
              title: 'Osmosis & Water Potential in Living Cells',
              status: 'available',
              conceptPrimer: {
                title: 'The Net Movement of Free Water Molecules',
                tagline: 'Water moves down its own water potential gradient across a selectively permeable membrane',
                body: 'Osmosis is a special case of diffusion. Pure water has the highest water potential (0 kPa). Adding solutes lowers water potential. When a plant cell is placed in pure water (hypotonic solution), water enters by osmosis until the protoplast pushes against the rigid cellulose cell wall, creating turgor pressure that keeps plants upright. In concentrated salt solution (hypertonic), water leaves, causing plasmolysis (wilting).',
                explanationSteps: [
                  'Step 1: Compare water potentials: High water potential (dilute) vs Low water potential (concentrated).',
                  'Step 2: Water flows from high to low water potential through selectively permeable cell membranes.',
                  'Step 3: Plant cells become turgid (supported) or flaccid/plasmolysed; Animal cells lack cell walls and may burst (haemolyse) or shrivel (crenate).'
                ],
                workedExample: 'Potato cylinder experiment: A potato cylinder placed in pure distilled water gains mass and becomes stiff (turgid). A cylinder placed in 20% sucrose solution loses mass and becomes limp (plasmolysed).',
                formula: 'Water Potential (Ψ) = Solute Potential (Ψs) + Pressure Potential (Ψp)',
                visualBadge: '💧 Selective Osmotic Membrane Chamber',
                realWorldContext: 'Plant wilting in drought, preserving meat with salt, and oral rehydration therapy.'
              },
              socraticPrompt: 'Why does a freshwater fish place in seawater dehydrate and die even though it is surrounded by vast quantities of water?',
              examFocus: 'KSSEA Biology Practical: Explaining percentage changes in length and mass of plant tissues in varying sucrose concentrations.'
            }
          ]
        }
      ]
    }
  },

  ComputerStudies: {
    10: {
      curriculum: 'CBC',
      grade: 10,
      subject: 'Computer Studies',
      title: 'Grade 10 Computer Studies Metro Line',
      stations: [
        {
          id: 'cbc_g10_comp_s1',
          number: 1,
          title: 'Algorithms, Data Structures & Python Programming',
          strand: 'Strand 1: Computation & Software',
          icon: '💻',
          status: 'available',
          summary: 'Pseudocode, flowcharts, trace tables, variables, conditional statements, and iterative loops.',
          subtopics: [
            {
              id: 'cbc_g10_comp_s1_1',
              title: 'Algorithm Design: Flowcharts & Trace Tables',
              status: 'available',
              conceptPrimer: {
                title: 'Step-by-Step Blueprint for Problem Solving',
                tagline: 'An algorithm is a finite, unambiguous sequence of instructions to transform inputs into outputs',
                body: 'Before writing code, computer scientists design algorithms using standard flowchart symbols (oval for start/stop, parallelogram for input/output, rectangle for process, and diamond for decision). A trace table is a dry-run tool that tracks variable values at every step to catch logic bugs before execution.',
                explanationSteps: [
                  'Step 1: Define Inputs, Processing steps, and Expected Output (IPO model).',
                  'Step 2: Use decision diamonds for branching: IF condition is TRUE follow Path A, ELSE follow Path B.',
                  'Step 3: Test with boundary data in a trace table: verify loop counters, edge values (0, negatives), and termination.'
                ],
                workedExample: 'Sum of first N positive integers:\n1. Total = 0, Counter = 1\n2. WHILE Counter <= N: Total = Total + Counter, Counter = Counter + 1\n3. Output Total.',
                formula: 'Input → Transformative Logic (Selection & Iteration) → Deterministic Output',
                visualBadge: '🔷 Flowchart Decision Diamond & Trace Table',
                realWorldContext: 'M-Pesa transaction processing, traffic light automation, and search ranking algorithms.'
              },
              socraticPrompt: 'What happens to a computer program if a while loop does not contain an instruction that changes the condition being tested?',
              examFocus: 'KSSEA Computer Studies Paper 1: Completing trace tables for nested loops and converting flowcharts to clean pseudocode.'
            }
          ]
        }
      ]
    }
  }
};

module.exports = CBC_SCIENCE_MAPS;
