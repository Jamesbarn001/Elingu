// ══════════════════════════════════════════════════════════════
// KICD CBC GRADE 10 PHYSICS
// Aligned to the KICD Grade 10 Physics design (July 2025):
// 4 strands, 13 sub-strands. Kept topics reuse their existing ids and primers;
// new topics are written from first principles. Removed from the older map
// (Grades 11-12 or not in the KICD list): linear motion/SUVAT, Newton's laws,
// geometric optics, magnetism, renewable energy.
// ══════════════════════════════════════════════════════════════

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps = [], workedExample = '') {
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
      explanationSteps: steps.length ? steps : [
        'Step 1: Identify the core scientific principle and physical quantities involved.',
        'Step 2: Connect the structural mechanism or formula to real-world observations.',
        'Step 3: Verify units, boundary conditions, and experimental controls.'
      ],
      workedExample: workedExample || `Practical Application: ${realWorldContext}`
    },
    socraticPrompt,
    formulaBadge: formula,
    examFocus
  };
}

const CBC_G10_PHYSICS_MAPS = [
  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Physics',
    code: 'PHY-G10',
    trackPathway: 'STEM',
    title: 'CBE Grade 10 (Senior STEM) Physics Metro Line',
    description: 'Grade 10 Physics aligned to the KICD Grade 10 design (July 2025), 4 strands and 13 sub-strands.',
    stations: [
      {
        id: 'cbc_g10_phy_s1',
        number: 1,
        title: '1.0 Mechanics and Thermal Physics',
        strand: 'Strand 1.0: Mechanics and Thermal Physics',
        icon: 'MECH',
        status: 'available',
        summary: 'Measurement, pressure, mechanical properties of materials, temperature and thermal expansion, moments, and energy, work, power and machines.',
        subtopics: [
          // KEEP cbc_g10_phy_s1_0 (primer content from existing seed; title aligned to KICD)
          stop(
            "cbc_g10_phy_s1_0",
            "1.1 Introduction to Physics",
            "Fundamental Base Quantities, Dimensional Consistency & Zero Error",
            "True Reading = Instrument Reading − Zero Error",
            "Physics quantifies nature using 7 SI base units (metre, kilogram, second, ampere, kelvin, mole, candela). Precision engineering measurements use Vernier callipers (±0.01 cm) and Micrometer screw gauges (±0.01 mm). Always check and subtract positive or negative zero error before recording.",
            "Micrometer Reading = Sleeve Main Scale (mm) + (Thimble Division × 0.01 mm) − Zero Error",
            "Vernier Calliper & Micrometer Thimble Scale",
            "Measuring piston cylinder tolerances and ball bearing diameters in automotive workshops in Industrial Area, Nairobi.",
            "If a micrometer screw gauge shows a positive zero error of +0.03 mm when closed, and reads 4.58 mm on a copper wire, what is the true diameter?",
            "KSSEA Physics Practical: Reading Vernier calliper and micrometer scales with zero-error correction.",
            ["Step 1: Identify the core scientific principle and physical quantities involved.","Step 2: Connect the structural mechanism or formula to real-world observations.","Step 3: Verify units, boundary conditions, and experimental controls."],
            "Practical Application: Measuring piston cylinder tolerances and ball bearing diameters in automotive workshops in Industrial Area, Nairobi."
          ),
          // KEEP cbc_g10_phy_s1_5 (primer content from existing seed; title aligned to KICD)
          stop(
            "cbc_g10_phy_s1_5",
            "1.2 Pressure",
            "Force per Unit Area & Hydrostatic Depth Pressure (P = hρg)",
            "Pressure in an incompressible enclosed fluid is transmitted equally in all directions",
            "Solid pressure is P = F / A (sharp knives concentrate force on tiny area; wide tractor tyres spread weight). Fluid pressure increases linearly with depth and density: P = hρg. Hydraulic machines (car brakes, hydraulic jacks) multiply force using Pascal's Principle: F₁/A₁ = F₂/A₂.",
            "P_solid = F ÷ A  |  P_fluid = hρg  |  Hydraulic Multiplier: F₂ = F₁ × (A₂ ÷ A₁)",
            "Hydraulic Lift Pistons & Dam Wall Cross-Section",
            "Why the concrete wall of Masinga Dam is built much thicker at the bottom bed than at the top crest.",
            "In a hydraulic car jack, if the small master piston has area 2 cm² and the large ram piston has area 100 cm², how much load can a 50 N effort lift?",
            "KSSEA Physics Paper 1: Calculating total absolute pressure under water (Atmospheric Pressure P₀ + hρg) and hydraulic mechanical advantage.",
            ["Step 1: Identify the core scientific principle and physical quantities involved.","Step 2: Connect the structural mechanism or formula to real-world observations.","Step 3: Verify units, boundary conditions, and experimental controls."],
            "Practical Application: Why the concrete wall of Masinga Dam is built much thicker at the bottom bed than at the top crest."
          ),
          stop(
            'cbc_g10_phy_s1_2',
            '1.3 Mechanical Properties of Materials',
            'Stress, Strain, Hooke\'s Law & Elasticity',
            'Stress is force per unit area; strain is fractional stretch; below the elastic limit, extension is proportional to load',
            'When you pull a material it stretches. The pull is a force F (newtons, N). Stress is the force shared over the cross-sectional area A (m2): stress = F / A, measured in pascals (Pa), where 1 Pa = 1 N/m2. Strain is how much longer it gets compared with its original length: strain = extension / original length. It is a ratio, so it has no units. Hooke\'s law says that for a spring (or wire) the extension x is proportional to the load F, F = kx, where k is the spring constant in N/m, as long as the elastic limit is not passed. Elastic means the material returns to its original length when the load is removed; plastic means it stays permanently stretched. Dividing stress by strain gives the Young modulus E, a number that describes how stiff a material is, independent of its size.',
            'Stress = F ÷ A  |  Strain = ΔL ÷ L  |  Hooke\'s Law: F = kx  |  Young Modulus E = Stress ÷ Strain',
            'Load-Extension Graph: Straight Line to the Elastic Limit, then a Curve',
            'Matatu suspension springs and steel cables on construction sites: engineers choose materials and thicknesses so loads stay well below the elastic limit.',
            'You hang a 2 kg and then a 4 kg load on the same spring and the extension doubles. What does that tell you about the relationship between force and extension, and what would you expect if the graph bent over?',
            'KSSEA Physics Practical: Plotting load against extension for a spring, finding the spring constant from the gradient, and identifying the elastic limit.',
            [
              'Step 1: Measure the original length L of the wire or spring with a rule before loading. Reason: strain compares the stretch with the starting length, so L must be known first.',
              'Step 2: Add a known load, calculate force F = mg (use g = 10 N/kg), and measure the new length. Reason: Hooke\'s law links force, not mass, to extension, so mass must be converted to weight.',
              'Step 3: Find the extension x = new length - original length. Reason: it is the change that is proportional to the force, not the total length.',
              'Step 4: Compute stress = F / A, using A = pi r^2 with the radius in metres. Reason: stress in pascals needs area in m2; using mm2 or cm2 gives wrong powers of ten.',
              'Step 5: Compute strain = x / L, then E = stress / strain. Reason: the ratio removes the effect of wire size, so E belongs to the material.',
              'Step 6: Add loads in steps and plot force against extension. Reason: the straight part has gradient k; where the line begins to curve the elastic limit has been passed.'
            ],
            'Worked example 1 (wire): A steel wire 2.0 m long and 1.0 mm in diameter carries a load of 50 N and stretches by 0.50 mm. Radius = 0.5 mm = 0.5 x 10^-3 m. Area A = pi x (0.5 x 10^-3)^2 = 7.85 x 10^-7 m2. Stress = 50 / 7.85 x 10^-7 = 6.37 x 10^7 Pa. Strain = 0.50 x 10^-3 / 2.0 = 2.5 x 10^-4. Young modulus E = 6.37 x 10^7 / 2.5 x 10^-4 = 2.55 x 10^11 Pa. Worked example 2 (spring): A spring extends by 8.0 cm = 0.080 m under a 4.0 N load, so k = 4.0 / 0.080 = 50 N/m. A 6.0 N load gives x = 6.0 / 50 = 0.12 m = 12 cm, provided the elastic limit is not exceeded. Common mistake: using the total length of the spring instead of the extension in F = kx, or leaving the diameter in millimetres when computing area in m2.'
          ),
          // KEEP cbc_g10_phy_s1_6 (primer content from existing seed; title aligned to KICD)
          stop(
            "cbc_g10_phy_s1_6",
            "1.4 Temperature and Thermal Expansion",
            "Conduction, Convection, Radiation & Calorimetry (Q = mcΔθ)",
            "Thermal energy raises kinetic energy during temperature rise and breaks bonds during latent phase change",
            "Matter expands when heated (bimetallic strips in thermostats, expansion gaps in railway tracks). Heat transfers via conduction (lattice vibrations & free electrons), convection (density-driven fluid currents), and infrared radiation (works across vacuum). Specific heat capacity (c) measures energy required to raise 1 kg by 1 K.",
            "Q = m × c × Δθ  |  Latent Heat: Q = m × L",
            "Calorimeter & Vacuum Flask Insulation Diagram",
            "Designing solar water heaters and evaporative charcoal coolers for preserving fresh farm produce in rural Kenya.",
            "Why does coastal Mombasa experience a smaller daily temperature range between day and night compared to inland Garissa?",
            "KSSEA Physics Section B: Electrical/mixtures calorimetry calculations (Heat Lost by Hot Body = Heat Gained by Cold Body).",
            ["Step 1: Identify the core scientific principle and physical quantities involved.","Step 2: Connect the structural mechanism or formula to real-world observations.","Step 3: Verify units, boundary conditions, and experimental controls."],
            "Practical Application: Designing solar water heaters and evaporative charcoal coolers for preserving fresh farm produce in rural Kenya."
          ),
          // KEEP cbc_g10_phy_s1_4 (primer content from existing seed; title aligned to KICD)
          stop(
            "cbc_g10_phy_s1_4",
            "1.5 Moments and Equilibrium",
            "Principle of Moments & Centre of Gravity Stability",
            "For rotational equilibrium, sum of clockwise moments equals sum of anticlockwise moments",
            "The moment of a force about a pivot is the product of the force and the perpendicular distance from the pivot to the line of action (M = F × d). A body is in complete equilibrium when resultant force is zero AND resultant moment about any point is zero. Lowering the centre of gravity and widening the base increases stability.",
            "Moment = Force (F) × Perpendicular Distance (d)  |  ΣClockwise Moments = ΣAnticlockwise Moments",
            "Balanced Metre Rule Fulcrum & Bus Stability",
            "Why double-decker buses and loaded lorries must store heavy cargo in the lower boot rather than on the roof carrier.",
            "Why is it much easier to loosen a tight wheel nut using a long-handled spanner than a short-handled spanner?",
            "KSSEA Physics Practical: Finding the mass of a metre rule using the Principle of Moments and locating the centre of gravity.",
            ["Step 1: Identify the core scientific principle and physical quantities involved.","Step 2: Connect the structural mechanism or formula to real-world observations.","Step 3: Verify units, boundary conditions, and experimental controls."],
            "Practical Application: Why double-decker buses and loaded lorries must store heavy cargo in the lower boot rather than on the roof carrier."
          ),
          stop(
            'cbc_g10_phy_s1_7',
            '1.6 Energy, Work, Power and Machines',
            'Work = Force x Distance, Power, Efficiency & Simple Machines',
            'Machines do not create energy; they let a small force act over a longer distance, and some energy is always wasted as heat',
            'Energy is the ability to do work and is measured in joules (J). Work is done when a force moves something in the direction of the force: work = force x distance moved, so 1 J = 1 N x 1 m. Power is the rate of doing work: power = work / time, in watts (1 W = 1 J/s). Two common stored or moving forms of energy are kinetic energy KE = 1/2 mv^2 and gravitational potential energy PE = mgh. A machine is a device that makes a job easier by changing the size or direction of the force. Mechanical advantage MA = load / effort. Velocity ratio VR = distance moved by effort / distance moved by load. Efficiency = useful work out / work put in x 100%, which equals MA / VR x 100%. Efficiency is always below 100% because friction turns some work into heat. A machine cannot give out more work than is put in; a lever or jack trades force for distance.',
            'Work = F × d  |  Power = W ÷ t  |  KE = ½mv²  |  PE = mgh  |  MA = Load ÷ Effort  |  VR = d(effort) ÷ d(load)  |  Efficiency = (Work out ÷ Work in) × 100%',
            'Wheelbarrow and Garage Jack: Effort Arm, Load Arm and Energy Losses',
            'A mechanic in a matatu garage using a long-handled lever to raise a vehicle corner; a farmer pushing a loaded wheelbarrow of maize; a charcoal seller lifting sacks onto a lorry with a ramp.',
            'If a machine lets you lift a heavy load with a small effort, where has the "extra" work gone, and why can you not get more work out than you put in?',
            'KSSEA Physics Paper 1: Calculating work, power, mechanical advantage, velocity ratio and efficiency of levers, pulleys and inclined planes.',
            [
              'Step 1: Write down the force on the load and the distance it moves, and the force of the effort and the distance it moves. Reason: all four values are needed to compare work in with work out.',
              'Step 2: Work out the useful work out = load x distance load moves. Reason: this is the work that actually does the job (raising the vehicle).',
              'Step 3: Work out the work in = effort x distance effort moves. Reason: this is the work you or the engine supplied.',
              'Step 4: Efficiency = work out / work in x 100%. Reason: the shortfall shows how much was wasted, mostly as heat from friction.',
              'Step 5: Find MA = load / effort and VR = effort distance / load distance, and check that efficiency = MA / VR x 100%. Reason: this confirms the two methods agree and shows that friction lowers MA below VR.',
              'Step 6: Power = work in / time taken. Reason: two people who do the same work in different times have different power.'
            ],
            'Worked example: A mechanic uses a lever to lift one corner of a car. An effort of 300 N moves down 0.50 m while the 1200 N load rises 0.10 m. Work out = 1200 x 0.10 = 120 J. Work in = 300 x 0.50 = 150 J. Efficiency = 120 / 150 x 100% = 80%. Check: MA = 1200 / 300 = 4; VR = 0.50 / 0.10 = 5; MA / VR x 100% = 4 / 5 x 100% = 80%. The wasted 150 - 120 = 30 J became heat at the pivot. If the push takes 4 s, input power = 150 / 4 = 37.5 W. Energy example: lifting a 20 kg sack through 1.5 m gives PE = mgh = 20 x 10 x 1.5 = 300 J. Common mistake: thinking a machine multiplies work. It multiplies force; work out is never greater than work in, and an efficiency over 100% means an arithmetic error.'
          )
        ]
      },
      {
        id: 'cbc_g10_phy_s2',
        number: 2,
        title: '2.0 Waves and Optics',
        strand: 'Strand 2.0: Waves and Optics',
        icon: 'WAVE',
        status: 'available',
        summary: 'Properties of mechanical and electromagnetic waves, and radioactivity and the stability of isotopes.',
        subtopics: [
          // KEEP cbc_g10_phy_s2_1 (primer content from existing seed; title aligned to KICD)
          stop(
            "cbc_g10_phy_s2_1",
            "2.1 Properties of Waves",
            "Oscillations, Wavelength, Frequency & The Universal Wave Equation",
            "Waves transfer energy without transferring matter; v = f × λ",
            "Transverse waves oscillate perpendicular to energy travel (light, water ripples); longitudinal waves oscillate parallel via compressions and rarefactions (sound). Wave speed (v) equals frequency (f) times wavelength (λ). Sound reflection produces echoes used in sonar depth sounding.",
            "v = f × λ  |  f = 1 ÷ T  |  Sonar Echo Distance: d = (v × t) ÷ 2",
            "Transverse vs Longitudinal Wave Profile",
            "Using ultrasonic pulse-echo sonar on Lake Victoria research vessels to map fish shoals and lakebed depth.",
            "When a light wave travels from air into glass, its speed decreases—which quantity remains strictly constant, its frequency or its wavelength?",
            "KSSEA Physics Paper 2: Extracting amplitude, period, and frequency from displacement-time and displacement-distance graphs.",
            ["Step 1: Identify the core scientific principle and physical quantities involved.","Step 2: Connect the structural mechanism or formula to real-world observations.","Step 3: Verify units, boundary conditions, and experimental controls."],
            "Practical Application: Using ultrasonic pulse-echo sonar on Lake Victoria research vessels to map fish shoals and lakebed depth."
          ),
          stop(
            'cbc_g10_phy_s2_3',
            '2.2 Radioactivity and Stability of Isotopes',
            'Isotopes, Alpha-Beta-Gamma Decay & Half-Life',
            'Unstable nuclei decay at random, but the time for half of a large sample to decay (the half-life) is fixed for each isotope',
            'Every atom has a nucleus made of protons and neutrons. The number of protons is the atomic number and fixes the element. Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons. Some combinations of protons and neutrons are unstable, so the nucleus changes by itself and gives out radiation. This is radioactive decay. Alpha (a helium nucleus, 2 protons and 2 neutrons) is stopped by paper; beta (a fast electron) is stopped by a few millimetres of aluminium; gamma (a high-energy electromagnetic wave) is reduced only by thick lead or concrete. Which nucleus decays next is random, so we cannot predict one atom. For a large number of atoms, however, the half-life is fixed: it is the time for the activity (decays per unit time) or the number of undecayed nuclei to fall to half. Background radiation from rocks, soil, cosmic rays and food is always present and must be subtracted from a measurement.',
            'Half-life: N = N₀ × (½)ⁿ where n = elapsed time ÷ half-life  |  Corrected count = Measured count − Background count',
            'Exponential Decay Curve with the Half-Life Marked',
            'Radiotherapy machines in cancer hospitals, smoke detectors in buildings, and food and equipment sterilisation use controlled radiation; people who handle sources use distance, shielding and short exposure times.',
            'If you hold a sample of one million unstable atoms, can you say which atom will decay next? Can you say how many will be left after one half-life, and why is one answer possible and the other not?',
            'KSSEA Physics Paper 2: Reading half-life from a decay curve, calculating remaining activity, identifying alpha, beta and gamma from penetration, and safe handling.',
            [
              'Step 1: Subtract the background count from every measurement. Reason: background radiation is not from your sample and would make the half-life look longer.',
              'Step 2: Read the half-life T from the question or from the time taken for the corrected count to halve on the graph. Reason: every half-life step has the same duration for a given isotope.',
              'Step 3: Divide the elapsed time by T to get the number of half-lives n. Reason: the sample is halved once per half-life, so n is the number of halvings.',
              'Step 4: Multiply the starting amount by 1/2, n times, that is N = N0 / 2^n. Reason: each half-life halves whatever remains, not the original amount.',
              'Step 5: State the answer with units (counts per minute, grams, or number of nuclei). Reason: the unit tells the reader what was measured.',
              'Step 6: Check that the answer is smaller than the start and that it is not zero. Reason: halving never reaches exactly zero in theory.'
            ],
            'Worked example: A sample of a radioactive isotope has a corrected activity of 640 counts per minute and a half-life of 6 hours. How much is left after 24 hours, and when does it fall to 80 counts per minute? Elapsed time / half-life = 24 / 6 = 4 half-lives. 640 -> 320 (6 h) -> 160 (12 h) -> 80 (18 h) -> 40 (24 h). So after 24 hours the activity is 40 counts per minute, which equals 640 / 2^4 = 640 / 16 = 40. The activity reaches 80 counts per minute after 3 half-lives, that is 18 hours (640 / 2^3 = 80). If the raw meter reading had been 650 counts per minute with a background of 10, the corrected value to use is 640. Common mistake: halving the time instead of the amount, or forgetting that after two half-lives one quarter (not zero) remains.'
          )
        ]
      },
      {
        id: 'cbc_g10_phy_s3',
        number: 3,
        title: '3.0 Electricity and Magnetism',
        strand: 'Strand 3.0: Electricity and Magnetism',
        icon: 'ELEC',
        status: 'available',
        summary: 'Electrostatics, current electricity, Ohm\'s law, EMF and internal resistance, and an introduction to electronics.',
        subtopics: [
          // KEEP cbc_g10_phy_s3_1 (primer content from existing seed; title aligned to KICD)
          stop(
            "cbc_g10_phy_s3_1",
            "3.1 Electrostatics",
            "Charge Conservation, Gold-Leaf Electroscope & Electric Fields",
            "Like charges repel; unlike charges attract; charge is never created or destroyed",
            "Like charges repel; unlike charges attract. Conductors allow free electron flow; insulators hold static charge. Charge is conserved: rubbing transfers electrons from one material to another, so one becomes negative and the other positive by the same amount.",
            "Charge conservation: Q(before) = Q(after)  |  Charge Q = I × t",
            "Gold-Leaf Electroscope & Electric Field Lines",
            "Lightning arrestors on tall buildings in Kisumu earthing the huge charge of a thunderstorm safely to the ground.",
            "Why can a plastic comb rubbed on dry hair pick up small pieces of paper, even though the paper has no net charge?",
            "KSSEA Physics Paper 2: Charging by friction and induction, and explaining the behaviour of a gold-leaf electroscope.",
            ["Step 1: Identify the core scientific principle and physical quantities involved.","Step 2: Connect the structural mechanism or formula to real-world observations.","Step 3: Verify units, boundary conditions, and experimental controls."],
            "Practical Application: Lightning arrestors on tall buildings in Kisumu earthing the huge charge of a thunderstorm safely to the ground."
          ),
          // KEEP cbc_g10_phy_s3_2 (primer content from existing seed; title aligned to KICD)
          stop(
            "cbc_g10_phy_s3_2",
            "3.2 Current Electricity",
            "Potential Difference, Resistivity & Lost Volts (E = V + Ir)",
            "Terminal voltage drops below EMF when current flows due to internal cell resistance",
            "Electric current is rate of flow of charge (I = Q/t). Ohm's Law states V = IR at constant temperature. Wire resistance is R = ρL/A. Real cells have internal resistance (r), so Electromotive Force E = I(R + r) = V + Ir, where Ir represents \"lost volts\" inside the battery.",
            "V = I × R  |  E = V + Ir  |  Series: R_T = R₁ + R₂  |  Parallel: 1/R_T = 1/R₁ + 1/R₂",
            "EMF & Internal Resistance V–I Graph (Slope = -r)",
            "Understanding why a car battery's headlights dim momentarily when the high-current starter motor is cranked.",
            "On a graph of terminal voltage V (y-axis) against current I (x-axis) for a dry cell, what do the y-intercept and gradient represent?",
            "KSSEA Physics Practical: Plotting V against I to determine the EMF (E) and internal resistance (r) of a dry cell.",
            ["Step 1: Identify the core scientific principle and physical quantities involved.","Step 2: Connect the structural mechanism or formula to real-world observations.","Step 3: Verify units, boundary conditions, and experimental controls."],
            "Practical Application: Understanding why a car battery's headlights dim momentarily when the high-current starter motor is cranked."
          ),
          stop(
            'cbc_g10_phy_s3_4',
            '3.3 Introduction to Electronics',
            'Resistors, Diodes & LEDs in a Simple Circuit',
            'A diode lets current pass one way only; an LED needs a series resistor to keep the current safe',
            'Electronics is the control of small electric currents using components. A resistor limits current and is measured in ohms. A diode is a component that conducts in one direction (forward bias) and blocks current the other way (reverse bias); a silicon diode needs about 0.7 V across it before it conducts. An LED (light-emitting diode) is a diode that gives out light when current flows forward through it, typically with about 2 V across it and a safe current of about 20 mA (0.020 A). If an LED is connected directly to a battery the current is too large and it burns out, so a resistor is connected in series to take up the extra voltage. Ohm\'s law gives its size: R = (supply voltage - LED voltage) / current. Diodes are used in rectification: turning alternating current (AC) into direct current (DC), as in a phone charger.',
            'V = I × R  |  Series resistor for LED: R = (V_supply − V_LED) ÷ I  |  Power in resistor: P = I²R',
            'LED, Series Resistor and Battery in a Circuit Diagram',
            'Solar lanterns and phone chargers sold across Kenya, where diodes and LEDs make light cheap and let rooftop solar panels charge batteries without back-flow at night.',
            'Why does an LED light when the battery is connected one way round but stay dark when you reverse it, and why does it still burn out if you leave out the resistor even when connected correctly?',
            'KSSEA Physics Paper 2: Drawing circuit symbols, calculating the series resistor for an LED, and explaining half-wave rectification with a diode.',
            [
              'Step 1: Note the supply voltage, the LED voltage and the LED safe current from the data. Reason: the resistor must carry the voltage that the LED does not use.',
              'Step 2: Connect the LED the correct way round (anode towards the positive terminal). Reason: a diode conducts only in forward bias; reversed, almost no current flows.',
              'Step 3: Subtract the LED voltage from the supply voltage. Reason: in a series circuit the voltages across the components add up to the supply, so this is the voltage left across the resistor.',
              'Step 4: Divide that voltage by the current in amperes (20 mA = 0.020 A). Reason: Ohm\'s law R = V / I needs current in amperes, not milliamperes.',
              'Step 5: Choose the nearest standard resistor at or above the answer. Reason: a slightly larger resistor keeps the current a little below the limit, which is safer than a smaller one.',
              'Step 6: Check power P = I^2 R against the resistor rating. Reason: a resistor with too small a power rating overheats.'
            ],
            'Worked example: A 6.0 V battery powers an LED that needs 2.0 V and a current of 20 mA. Voltage across the resistor = 6.0 - 2.0 = 4.0 V. Current = 20 mA = 0.020 A. R = 4.0 / 0.020 = 200 ohms. Power in the resistor P = I^2 R = (0.020)^2 x 200 = 0.0004 x 200 = 0.080 W, so a small 0.25 W resistor is adequate. Check: the 200 ohm resistor takes 0.020 x 200 = 4.0 V and the LED takes 2.0 V, totalling 6.0 V, the supply. Common mistake: using the full 6.0 V in R = V / I (giving 300 ohms, so the current is too small for full brightness and the LED voltage is ignored), or putting the LED in backwards and concluding it is faulty.'
          )
        ]
      },
      {
        id: 'cbc_g10_phy_s4',
        number: 4,
        title: '4.0 Environmental and Space Physics',
        strand: 'Strand 4.0: Environmental and Space Physics',
        icon: 'SPACE',
        status: 'available',
        summary: 'The greenhouse effect and climate change, and an introduction to space physics and satellite orbits.',
        subtopics: [
          stop(
            'cbc_g10_phy_s4_3',
            '4.1 Greenhouse Effect and Climate Change',
            'Natural Greenhouse Effect vs Enhanced Greenhouse Effect',
            'Greenhouse gases trap outgoing heat radiation; adding more of them warms the planet',
            'The Sun gives Earth energy as visible light, which warms the ground. The warm ground then gives out heat as infrared radiation. Greenhouse gases in the air (water vapour, carbon dioxide, methane, nitrous oxide) absorb some of this infrared and send part of it back down, so the surface is warmer than it would be otherwise. This is the natural greenhouse effect, and without it Earth\'s average surface temperature would be about -18 degrees C instead of about +15 degrees C. Burning fossil fuels and charcoal, clearing forests, and farming add extra carbon dioxide and methane, which strengthens the effect. This is the enhanced greenhouse effect, and it leads to climate change: rising average temperatures, melting ice, rising sea level, and more extreme floods and droughts. Weather is the day-to-day condition; climate is the long-term average over decades.',
            'Energy balance (steady temperature): Energy absorbed = Energy radiated  |  Percentage change = (change ÷ original) × 100%',
            'Incoming Sunlight, Outgoing Infrared and the Trapping Layer of Greenhouse Gases',
            'Flooding in Budalang\'i and Nairobi after heavy rains, drought in northern Kenya, shrinking Mount Kenya glaciers, and the use of charcoal jikos and wood fuel that cut tree cover and release carbon dioxide.',
            'If greenhouse gases are a natural part of the atmosphere and we need them, why does adding more of them cause a problem?',
            'KSSEA Physics Paper 2: Explaining the greenhouse effect, listing human causes and effects of global warming, and suggesting ways to reduce emissions.',
            [
              'Step 1: Describe the incoming energy: shortwave sunlight passes through the atmosphere and warms the ground. Reason: the atmosphere is mostly transparent to visible light.',
              'Step 2: Describe the outgoing energy: the warm ground emits longer-wavelength infrared. Reason: a cooler object emits at longer wavelengths than the Sun.',
              'Step 3: Show that greenhouse gases absorb part of the infrared and re-emit it in all directions, including back down. Reason: this keeps energy near the surface for longer.',
              'Step 4: Link the balance: the surface warms until the energy leaving matches the energy arriving. Reason: more trapping means a higher temperature is needed to restore balance.',
              'Step 5: Identify human activities that raise gas concentrations (fossil fuels, charcoal burning, deforestation, livestock methane). Reason: these add gas faster than plants and oceans can remove it.',
              'Step 6: Propose actions (clean cooking, tree planting, renewable power such as Olkaria geothermal). Reason: each reduces emissions or removes carbon dioxide from the air.'
            ],
            'Worked example (a): Carbon dioxide rose from about 280 parts per million before industry to about 420 parts per million today. Increase = 420 - 280 = 140 ppm. Percentage increase = 140 / 280 x 100% = 50%. Worked example (b), energy balance: sunlight at the top of the atmosphere is about 1361 W/m2 on a surface facing the Sun. Because Earth is a sphere, the average over the whole surface is 1361 / 4 = about 340 W/m2. About 30% is reflected by clouds and ice, so 70% is absorbed: 340 x 0.70 = 238 W/m2. At steady temperature Earth radiates 238 W/m2 back to space. Using the Stefan-Boltzmann law (power per square metre = 5.67 x 10^-8 x T^4), T^4 = 238 / 5.67 x 10^-8 = 4.2 x 10^9, so T = about 255 K = 255 - 273 = -18 degrees C. The real average is about +15 degrees C, so greenhouse gases supply about 33 degrees C of warming. Common mistake: confusing the greenhouse effect with the ozone hole. The ozone layer filters ultraviolet; greenhouse gases trap infrared. They are different problems.'
          ),
          // KEEP cbc_g10_phy_s4_2 (primer content from existing seed; title aligned to KICD)
          stop(
            "cbc_g10_phy_s4_2",
            "4.2 Introduction to Space Physics",
            "Gravitational Centripetal Balance, Geostationary Orbits & Stellar Evolution",
            "Gravity provides the centripetal force keeping Earth-observation satellites in stable orbit",
            "Satellites stay in orbit because gravitational attraction provides the required centripetal force: GMm/r² = mv²/r, giving orbital speed v = √(GM/r). Low Earth Orbit (LEO) satellites monitor agriculture and weather; Geostationary satellites orbit at ~35,786 km above the equator with a 24-hour period matching Earth's rotation.",
            "Orbital Speed: v = (2πr) ÷ T = √(GM ÷ r)",
            "Taifa-1 Earth Observation Satellite Orbit",
            "Kenya Space Agency's Taifa-1 observation satellite monitoring forest cover, floods, and crop yields from orbit, plus the Luigi Broglio Space Centre in Malindi.",
            "Why is Malindi on the Kenyan coast (near the Equator) an ideal geographical location for tracking and launching equatorial satellites?",
            "KSSEA Physics Paper 2: Distinguishing Low Earth Orbit (LEO) vs Geostationary satellites and tracing the life cycle of stars.",
            ["Step 1: Identify the core scientific principle and physical quantities involved.","Step 2: Connect the structural mechanism or formula to real-world observations.","Step 3: Verify units, boundary conditions, and experimental controls."],
            "Practical Application: Kenya Space Agency's Taifa-1 observation satellite monitoring forest cover, floods, and crop yields from orbit, plus the Luigi Broglio Space Centre in Malindi."
          )
        ]
      }
    ]
  }
];

module.exports = CBC_G10_PHYSICS_MAPS;
