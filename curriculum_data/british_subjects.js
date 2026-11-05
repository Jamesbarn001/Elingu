// ══════════════════════════════════════════════════════════════
// CAMBRIDGE INTERNATIONAL EDUCATION (CAIE) — SUBJECT ROADMAPS
// Covers Checkpoint (Years 7-9) and IGCSE (Years 10-11)
// Physics 0625, Chemistry 0620, Biology 0610, Computer Science 0478, English 0500
// ══════════════════════════════════════════════════════════════

const BRITISH_SUBJECT_MAPS = {
  Physics: {
    10: {
      curriculum: 'BRITISH',
      grade: 10,
      subject: 'Physics',
      title: 'Cambridge IGCSE Physics (0625) Metro Line',
      stations: [
        {
          id: 'cie_y10_phy_s1',
          number: 1,
          title: 'Motion, Forces & Energy',
          strand: 'Topic 1: Mechanics',
          icon: '⚙️',
          status: 'available',
          summary: 'Speed, velocity, acceleration, terminal velocity, Newton\'s laws, and energy conservation.',
          subtopics: [
            {
              id: 'cie_y10_phy_s1_1',
              title: 'Terminal Velocity & Drag Forces on Falling Bodies',
              status: 'available',
              conceptPrimer: {
                title: 'The Equilibrium of Weight and Fluid Drag',
                tagline: 'When drag equals weight, resultant force becomes zero and acceleration ceases',
                body: 'When a skydiver leaps from an airplane: (1) Initially, only weight acts downwards, causing maximum acceleration (g ≈ 9.8 m/s²). (2) As speed increases, air resistance (drag) increases proportionally. (3) Resultant force downwards decreases, reducing acceleration. (4) Eventually, upward drag equals downward weight. Resultant force is zero, and the body continues falling at a constant maximum velocity called terminal velocity.',
                explanationSteps: [
                  'Phase 1: Speed = 0 → Drag = 0 → Resultant Force = W → Acceleration = g.',
                  'Phase 2: Speed increases → Drag increases → Resultant Force (W - Drag) decreases → Acceleration decreases.',
                  'Phase 3: Drag = W → Resultant Force = 0 → Acceleration = 0 → Speed is Constant (Terminal Velocity).'
                ],
                workedExample: 'Speed-time graph of skydiver: Curve starts steep at (0,0), gradually flattens as drag grows, levels off to a horizontal line at terminal velocity (approx 55 m/s), drops sharply when parachute opens, and levels to a new, much lower safe terminal velocity (5 m/s).',
                formula: 'Resultant Force (F) = Weight (mg) - Drag (D) = ma',
                visualBadge: '🪂 Terminal Velocity Force Equilibrium Diagram',
                realWorldContext: 'Parachute design, automotive aerodynamics, and raindrops falling without causing destruction.'
              },
              socraticPrompt: 'Why does an elephant and a feather fall with the exact same acceleration in a vacuum chamber, but fall at vastly different speeds in our atmosphere?',
              examFocus: 'CAIE 0625 Paper 4 Extended: Explaining terminal velocity in terms of balanced forces and sketching the velocity-time graph.'
            }
          ]
        }
      ]
    }
  },

  Chemistry: {
    10: {
      curriculum: 'BRITISH',
      grade: 10,
      subject: 'Chemistry',
      title: 'Cambridge IGCSE Chemistry (0620) Metro Line',
      stations: [
        {
          id: 'cie_y10_chem_s1',
          number: 1,
          title: 'Stoichiometry & The Mole Concept',
          strand: 'Topic 3: Quantitative Chemistry',
          icon: '⚖️',
          status: 'available',
          summary: 'Relative formula mass (Mr), molar gas volume (24 dm³), empirical formulae, and percentage yield.',
          subtopics: [
            {
              id: 'cie_y10_chem_s1_1',
              title: 'The Mole Concept & Reacting Masses',
              status: 'available',
              conceptPrimer: {
                title: 'Counting Atoms by Weighing Grams',
                tagline: 'One mole of any substance contains exactly 6.02 × 10²³ particles (Avogadro\'s constant)',
                body: 'Atoms are far too tiny to count one by one. The mole bridges the subatomic scale and the laboratory balance. One mole of carbon-12 weighs exactly 12 grams. To find the moles of any substance, divide its mass in grams by its relative formula mass (Mr). The balanced chemical equation gives the exact mole ratio in which substances react.',
                explanationSteps: [
                  'Step 1: Calculate relative formula mass Mr using the Periodic Table (e.g. H2O: 2(1) + 16 = 18 g/mol).',
                  'Step 2: Calculate moles: Moles = Mass (g) ÷ Mr.',
                  'Step 3: Use the stoichiometric ratio from the balanced equation to predict moles of product, then convert back to grams.'
                ],
                workedExample: 'Calculate mass of CO2 produced when 10g of CaCO3 decomposes: CaCO3 → CaO + CO2.\nMr(CaCO3) = 40 + 12 + 3(16) = 100. Moles of CaCO3 = 10g / 100 = 0.1 mol.\nFrom equation, 1 mol CaCO3 produces 1 mol CO2 → 0.1 mol CO2.\nMr(CO2) = 12 + 2(16) = 44. Mass of CO2 = 0.1 mol × 44 g/mol = 4.4 grams.',
                formula: 'Moles = Mass (g) / Mr  |  Volume of Gas at r.t.p. = Moles × 24 dm³',
                visualBadge: '⚖️ The Mole Conversion Triangle',
                realWorldContext: 'Pharmaceutical synthesis dosing, industrial fertilizer manufacturing, and emissions calculations.'
              },
              socraticPrompt: 'If 2 moles of hydrogen gas react with 1 mole of oxygen gas to make water (2H2 + O2 → 2H2O), what volume of water vapor is produced at room temperature and pressure if you start with 48 dm³ of hydrogen?',
              examFocus: 'CAIE 0625/0620 Paper 4: Show clear step-by-step working with units. Marks are awarded for method [M1] and final answer with units [A1].'
            }
          ]
        }
      ]
    }
  },

  Biology: {
    10: {
      curriculum: 'BRITISH',
      grade: 10,
      subject: 'Biology',
      title: 'Cambridge IGCSE Biology (0610) Metro Line',
      stations: [
        {
          id: 'cie_y10_bio_s1',
          number: 1,
          title: 'Plant Nutrition & Photosynthesis Rate Factors',
          strand: 'Topic 6: Plant Nutrition',
          icon: '🌿',
          status: 'available',
          summary: 'Chloroplast structure, light intensity, carbon dioxide concentration, and limiting factors.',
          subtopics: [
            {
              id: 'cie_y10_bio_s1_1',
              title: 'Limiting Factors of Photosynthesis',
              status: 'available',
              conceptPrimer: {
                title: 'The Law of the Bottleneck in Plant Production',
                tagline: 'The rate of a physiological process is limited by the factor that is in shortest supply',
                body: 'Photosynthesis requires light, carbon dioxide, and warmth for enzymes. A limiting factor is the one parameter that directly controls the rate when all other conditions are abundant. If a plant has blazing sunshine but only 0.04% CO2, increasing light further will not increase the rate of photosynthesis—CO2 has become the bottleneck.',
                explanationSteps: [
                  'Step 1: On a rate graph, when the line is rising steeply, the factor on the x-axis is the limiting factor.',
                  'Step 2: When the curve levels off to a plateau, that factor is no longer limiting; another factor (temperature or CO2) has become the bottleneck.',
                  'Step 3: Greenhouse growers maximize commercial crop yields by simultaneously controlling all three factors.'
                ],
                workedExample: 'Investigating aquatic plant (Elodea): Count oxygen bubbles per minute as a lamp is moved closer (1/d² relationship). The rate rises proportionally until the plateau, proving light was initially limiting, but temperature or CO2 then took over.',
                formula: '6CO2 + 6H2O ⎯[Light & Chlorophyll]→ C6H12O6 + 6O2',
                visualBadge: '📊 Multi-Curve Limiting Factor Plateau Graph',
                realWorldContext: 'Commercial greenhouse farming at Lake Naivasha (roses and vegetables) using automated CO2 burners.'
              },
              socraticPrompt: 'On a freezing but brightly sunny morning in July, what is the primary factor limiting the rate of photosynthesis in Kenyan highland crops, and why?',
              examFocus: 'CAIE 0610 Paper 4: Explaining plateau regions on graphs using the exact syllabus phrase "something other than [factor X] is now the limiting factor".'
            }
          ]
        }
      ]
    }
  },

  ComputerScience: {
    10: {
      curriculum: 'BRITISH',
      grade: 10,
      subject: 'Computer Science',
      title: 'Cambridge IGCSE Computer Science (0478) Metro Line',
      stations: [
        {
          id: 'cie_y10_cs_s1',
          number: 1,
          title: 'Data Representation: Binary, Hexadecimal & Logic Gates',
          strand: 'Topic 1: Data Representation',
          icon: '💾',
          status: 'available',
          summary: 'Base-2 and base-16 number systems, two\'s complement, logic gates: AND, OR, NOT, NAND, NOR, XOR.',
          subtopics: [
            {
              id: 'cie_y10_cs_s1_1',
              title: 'Hexadecimal Representation & Memory Addressing',
              status: 'available',
              conceptPrimer: {
                title: 'Human-Readable Shorthand for Binary Bytes',
                tagline: 'One hexadecimal digit represents exactly 4 binary bits (one nibble)',
                body: 'Binary strings like 1111101011001110 are cumbersome and error-prone for humans to read. Hexadecimal (base-16) uses symbols 0-9 and A-F (where A=10, B=11, C=12, D=13, E=14, F=15). Because 16 = 2⁴, any 8-bit byte can be neatly compressed into two hexadecimal digits (e.g. 1111 1010 = FA₁₆).',
                explanationSteps: [
                  'Step 1: Split the binary byte into two 4-bit nibbles (e.g., 1101 and 0110).',
                  'Step 2: Convert each nibble to decimal value: 1101 = 8+4+0+1 = 13 (which is "D" in hex); 0110 = 0+4+2+0 = 6.',
                  'Step 3: Combine: 11010110₂ = D6₁₆.'
                ],
                workedExample: 'HTML Color Codes: #FF0000 = Red 255 (FF), Green 0 (00), Blue 0 (00).\nMAC Address: 00:1A:2B:3C:4D:5E provides unique hardware identifier.',
                formula: 'Nibble (4 bits) → 1 Hex Digit (0–F) | Byte (8 bits) → 2 Hex Digits',
                visualBadge: '🔢 Binary-to-Hex Splitter Grid',
                realWorldContext: 'Debugging low-level memory dumps, MAC addresses on Wi-Fi routers, and web design color hex codes.'
              },
              socraticPrompt: 'Why do computer engineers prefer using hexadecimal codes over decimal numbers when examining memory addresses and error crash logs?',
              examFocus: 'CAIE 0478 Paper 1: Converting between binary, denary, and hexadecimal without calculation errors.'
            }
          ]
        }
      ]
    }
  }
};

module.exports = BRITISH_SUBJECT_MAPS;
