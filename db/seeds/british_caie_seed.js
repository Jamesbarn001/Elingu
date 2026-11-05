// ══════════════════════════════════════════════════════════════
// CAMBRIDGE ASSESSMENT INTERNATIONAL EDUCATION (CAIE) SEED DATA
// Comprehensive Relational Database Seed for:
// - Cambridge IGCSE Computer Science (0478) — 10 Dedicated Unit Stations
// - Cambridge IGCSE Physics (0625) — Years 10 & 11
// - Cambridge IGCSE Chemistry (0620) — Years 10 & 11
// - Cambridge IGCSE Biology (0610) — Years 10 & 11
// - Cambridge IGCSE Mathematics (0580) — Years 10 & 11
// - Cambridge Lower Secondary Science (0893) — Stages 7, 8, 9
// - Cambridge Lower Secondary Mathematics (0862) — Stages 7, 8, 9
// - Cambridge Lower Secondary English (0861) — Stages 7, 8, 9
//
// STRICT TERMINOLOGY GUARD: Strictly uses "Unit" / "Topic" / "Content Area"
// NEVER uses the word "Strand" for Cambridge CAIE curricula.
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
      formula: formula || null,
      visualBadge,
      realWorldContext,
      explanationSteps: steps.length ? steps : [
        'Step 1: Identify the underlying scientific, computational, or mathematical law.',
        'Step 2: Connect theoretical models and definitions to experimental data or code.',
        'Step 3: Check units, precision, and alignment with CAIE examiner mark schemes.'
      ],
      workedExample: workedExample || `Model CAIE Application: ${realWorldContext} (${formula || 'N/A'})`
    },
    socraticPrompt,
    formulaBadge: formula || null,
    examFocus
  };
}

const BRITISH_CAIE_MAPS = [
  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE IGCSE COMPUTER SCIENCE (0478) — 10 DEDICATED STATIONS
  // ══════════════════════════════════════════════════════════════
  {
    curriculum: 'BRITISH',
    grade: 10,
    subject: 'Computer Science',
    code: '0478',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Computer Science (0478) Metro Line',
    stations: [
      {
        id: 'cie_y10_cs_u1',
        number: 1,
        title: '1.0 Data Representation: Binary, Hexadecimal & Data Types',
        strand: 'Unit 1: Data Representation',
        icon: '💾',
        status: 'available',
        summary: 'Base-2, base-16 conversions, two\'s complement, ASCII/Unicode character sets, bitmap graphics, and sound sampling.',
        subtopics: [
          stop(
            'cie_y10_cs_s1_1',
            '1.1 Hexadecimal Representation & Memory Addressing',
            'Human-Readable Shorthand for Binary Bytes',
            'One hexadecimal digit represents exactly 4 binary bits (one nibble)',
            'Binary strings like 1111101011001110 are cumbersome and error-prone for humans to read. Hexadecimal (base-16) uses symbols 0-9 and A-F (where A=10, B=11, C=12, D=13, E=14, F=15). Because 16 = 2⁴, any 8-bit byte can be neatly compressed into two hexadecimal digits (e.g. 1111 1010 = FA₁₆).',
            'Nibble (4 bits) → 1 Hex Digit (0–F) | Byte (8 bits) → 2 Hex Digits',
            '🔢 Binary-to-Hex Splitter Grid',
            'Debugging low-level memory dumps, MAC addresses on Wi-Fi routers, and web design HTML color hex codes (#FF5733).',
            'Why do computer engineers prefer using hexadecimal codes over decimal numbers when examining memory addresses and error crash logs?',
            'CAIE 0478 Paper 1: Converting between binary, denary, and hexadecimal without calculation errors.',
            [
              'Step 1: Split the binary byte into two 4-bit nibbles (e.g., 1101 and 0110).',
              'Step 2: Convert each nibble to decimal value: 1101 = 8+4+0+1 = 13 (which is "D" in hex); 0110 = 0+4+2+0 = 6.',
              'Step 3: Combine: 11010110₂ = D6₁₆.'
            ],
            'HTML Color Codes: #FF0000 = Red 255 (FF), Green 0 (00), Blue 0 (00).'
          ),
          stop(
            'cie_y10_cs_u1_2',
            '1.2 Two\'s Complement & Binary Arithmetic',
            'Signed Integer Representation in 8-bit Registers',
            'The most significant bit (MSB) carries negative weight (-128 in an 8-bit byte)',
            'To represent negative numbers in binary, two\'s complement is used. To convert a positive number into negative two\'s complement: find the binary representation, invert all bits (one\'s complement), and add 1.',
            'Range for n bits: -2^(n-1) to +2^(n-1) - 1  (For 8 bits: -128 to +127)',
            '⚡ Binary Addition & Overflow Indicator',
            'Microcontroller arithmetic logic units performing subtraction via integer addition.',
            'What happens in an 8-bit register when you add binary 01111111 (+127) and 00000001 (+1)?',
            'CAIE 0478 Paper 1: Identifying register overflow error and converting negative integers into two\'s complement.'
          )
        ]
      },
      {
        id: 'cie_y10_cs_u2',
        number: 2,
        title: '2.0 Data Transmission: Packets, Methods & Error Detection',
        strand: 'Unit 2: Data Transmission',
        icon: '📡',
        status: 'available',
        summary: 'Packet structure, serial vs parallel, simplex/duplex, and error checking mechanisms (parity, checksums, ARQ).',
        subtopics: [
          stop(
            'cie_y10_cs_u2_1',
            '2.1 Packet Switching & Transmission Modes',
            'Dissecting Network Payloads Across Global Backbones',
            'Packets contain a header (IP sender/receiver, packet number), payload, and trailer (checksum)',
            'Data transmitted across networks is split into packets. Packet switching routes packets independently along optimal network paths, reassembling them in correct sequence at the destination using sequence numbers in packet headers.',
            'Packet = Header (Source/Dest IP, Sequence) + Payload + Trailer (Error Check)',
            '📦 Packet Routing Flowchart',
            'Streaming video packets across submarine fibre-optic cables from Mombasa to international internet exchanges.',
            'Why is packet switching more resilient against network link failures than dedicated circuit switching?',
            'CAIE 0478 Paper 1: Distinguishing between serial vs parallel transmission and describing packet structure.'
          )
        ]
      },
      {
        id: 'cie_y10_cs_u3',
        number: 3,
        title: '3.0 Hardware: Von Neumann Architecture & Storage Technologies',
        strand: 'Unit 3: Hardware',
        icon: '🖥️',
        status: 'available',
        summary: 'CPU registers (PC, MAR, MDR, CIR, ACC), system buses (Data, Address, Control), F-D-E cycle, and primary vs secondary storage.',
        subtopics: [
          stop(
            'cie_y10_cs_u3_1',
            '3.1 The Von Neumann CPU Architecture & Fetch-Decode-Execute Cycle',
            'Stored-Program Concept & Dedicated Micro-Registers',
            'Data and program instructions share the same memory space and buses',
            'The central processing unit executes instructions through the Fetch-Decode-Execute cycle: PC holds next instruction address; copied to MAR; fetched via Data Bus into MDR; copied into CIR; decoded by CU; executed using ALU and ACC.',
            'Fetch: PC → MAR → Memory → MDR → CIR  |  Decode: CU  |  Execute: ALU/ACC',
            '⚙️ Von Neumann Bus Topology',
            'Modern multi-core smartphone and desktop processors processing billions of cycles per second.',
            'If the program counter (PC) is incremented before an instruction executes, what happens to the PC when a branch or jump instruction occurs?',
            'CAIE 0478 Paper 1: Trace the exact register transfers during the Fetch stage of the machine cycle.'
          )
        ]
      },
      {
        id: 'cie_y10_cs_u4',
        number: 4,
        title: '4.0 Software: Operating Systems & Language Translators',
        strand: 'Unit 4: Software',
        icon: '📀',
        status: 'available',
        summary: 'System vs application software, OS roles (memory, multi-tasking, hardware interrupt management), compilers, and interpreters.',
        subtopics: [
          stop(
            'cie_y10_cs_u4_1',
            '4.1 Compilers, Interpreters & Assemblers',
            'Bridging High-Level Code to Raw Machine Microcode',
            'Compilers translate entire source code at once into an executable; interpreters translate line-by-line',
            'High-level languages (Python, Java) must be translated into binary machine code. Compilers produce an independent executable binary file (.exe), optimizing speed. Interpreters translate and execute statement-by-statement, speeding up debugging.',
            'Source Code ⎯[Compiler]→ Object Code (.exe)  vs  Source Code ⎯[Interpreter]→ Direct Execution',
            '🔄 Translation Pipeline Diagram',
            'Compiling embedded avionics flight software vs interpreting interactive web scripts in a browser.',
            'Why would a software developer use an interpreter during code development but distribute the compiled version to end users?',
            'CAIE 0478 Paper 1: Comparing benefits and drawbacks of compilers versus interpreters in exam table scenarios.'
          )
        ]
      },
      {
        id: 'cie_y10_cs_u5',
        number: 5,
        title: '5.0 The Internet and its Uses: Protocols & Cyber Security',
        strand: 'Unit 5: The Internet and its Uses',
        icon: '🌐',
        status: 'available',
        summary: 'Web browsers, DNS resolution, IP addressing, cookies, malware, phishing, pharming, and brute-force mitigation.',
        subtopics: [
          stop(
            'cie_y10_cs_u5_1',
            '5.1 DNS Resolution, IP Addressing & Web Protocols',
            'Translating Human Domain Names into 32-bit and 128-bit IP Addresses',
            'Domain Name Servers resolve URLs like www.cambridge.org to routable IP addresses',
            'When a user types a URL, the browser queries local cache then recursive DNS servers to locate the numerical IP address. HTTPS uses SSL/TLS encryption certificates to encrypt transmission over TCP port 443.',
            'URL → DNS Request → IP Address Lookup → HTTPS Handshake (TLS) → Encrypted HTTP Payload',
            '🔒 SSL/TLS Handshake Diagram',
            'Securing online mobile banking portals and preventing man-in-the-middle packet sniffing.',
            'What is the fundamental difference between phishing and pharming in terms of how the user is deceived?',
            'CAIE 0478 Paper 1: Explaining how pharming redirects legitimate DNS requests to fraudulent copycat websites.'
          )
        ]
      },
      {
        id: 'cie_y10_cs_u6',
        number: 6,
        title: '6.0 Automated and Emerging Technologies: Sensors, Actuators & AI',
        strand: 'Unit 6: Automated and Emerging Technologies',
        icon: '🤖',
        status: 'available',
        summary: 'Sensor-microprocessor feedback loops, automated greenhouse control, robotics, machine learning, and expert systems.',
        subtopics: [
          stop(
            'cie_y10_cs_u6_1',
            '6.1 Automated Closed-Loop Control Systems',
            'Sensors, Analog-to-Digital Converters (ADC) and Actuators',
            'Microprocessors take ADC sensor readings, compare against preset thresholds, and trigger actuators',
            'Automated systems continuously monitor environmental parameters. Sensors produce continuous analog signals which are digitized by an ADC. The microprocessor compares readings against target values; if out of range, signals are sent to actuators (heaters, pumps, valves).',
            'Sensor (Analog) → ADC → Microprocessor (Comparison) → Actuator (Physical Action)',
            '🔁 Closed-Loop Feedback Flowchart',
            'Automated industrial aquaculture aerators and automated climate control in Lake Naivasha floriculture greenhouses.',
            'Why can a microprocessor not connect directly to an analog temperature sensor without an ADC interface?',
            'CAIE 0478 Paper 1: Describing the complete step-by-step control loop for an automated system.'
          )
        ]
      },
      {
        id: 'cie_y10_cs_u7',
        number: 7,
        title: '7.0 Algorithm Design and Problem-Solving: Flowcharts & Pseudocode',
        strand: 'Unit 7: Algorithm Design and Problem-Solving',
        icon: '📐',
        status: 'available',
        summary: 'Structure diagrams, flowchart symbols, standard algorithms (linear search, bubble sort, totalling, counting, extremes).',
        subtopics: [
          stop(
            'cie_y10_cs_u7_1',
            '7.1 Linear Search, Bubble Sort & Trace Tables',
            'Algorithmic Complexity & Stepwise Variable Tracing',
            'Trace tables track every variable value mutation per loop iteration to uncover logic bugs',
            'Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if in wrong order until no swaps are needed. Linear search checks every element from index 0 to n-1 sequentially.',
            'Bubble Sort: For i = 1 to n-1: For j = 1 to n-i: If A[j] > A[j+1] Then Swap(A[j], A[j+1])',
            '📊 Bubble Sort Pass Trace Grid',
            'Sorting student scores and searching database records in school management information systems.',
            'How can a bubble sort algorithm be optimized to terminate early if the array becomes sorted before all passes are complete?',
            'CAIE 0478 Paper 2: Completing dry-run trace tables with columns for variables, conditions, and output.'
          )
        ]
      },
      {
        id: 'cie_y10_cs_u8',
        number: 8,
        title: '8.0 Programming: High-Level Syntax, Arrays & File Handling',
        strand: 'Unit 8: Programming',
        icon: '💻',
        status: 'available',
        summary: 'Variables, constants, selection (IF, CASE), iteration (FOR, WHILE, REPEAT-UNTIL), 1D/2D arrays, procedures, and functions.',
        subtopics: [
          stop(
            'cie_y10_cs_u8_1',
            '8.1 Modular Programming: Functions, Procedures & Parameter Passing',
            'Scope of Identifiers, Value vs Reference Parameters & Return Values',
            'Functions return a single computed value; procedures carry out tasks and do not return values',
            'Modular programming breaks complex programs into reusable subroutines. Local variables exist only within the subroutine scope; global variables are accessible throughout the program. Parameters pass values into subroutines by value or reference.',
            'FUNCTION CalculateTax(income: REAL) RETURNS REAL  vs  PROCEDURE PrintReceipt(cart: ARRAY)',
            '🧩 Modular Routine Call Stack',
            'Banking transaction transaction modules calculating currency conversions and logging audit records.',
            'Why is it considered superior software engineering practice to use local parameters rather than global variables inside subroutines?',
            'CAIE 0478 Paper 2: Writing syntactically valid pseudocode subroutines with clear parameter definitions.'
          )
        ]
      },
      {
        id: 'cie_y10_cs_u9',
        number: 9,
        title: '9.0 Databases: Relational Structure & SQL Query Formulation',
        strand: 'Unit 9: Databases',
        icon: '🗄️',
        status: 'available',
        summary: 'Entities, attributes, primary keys, foreign keys, data types, and declarative SQL queries (SELECT, FROM, WHERE, ORDER BY).',
        subtopics: [
          stop(
            'cie_y10_cs_u9_1',
            '9.1 Structured Query Language (SQL) Data Extraction',
            'Filtering, Sorting & Projecting Tabular Records',
            'SELECT specifies columns; FROM specifies table; WHERE sets filter conditions; ORDER BY sorts ascending or descending',
            'Relational databases store records in tables with unique primary keys. SQL is the universal declarative language to query records: SELECT Name, Score FROM Students WHERE Grade = 10 AND Passed = TRUE ORDER BY Score DESC.',
            'SELECT [fields] FROM [table] WHERE [conditions] ORDER BY [field] ASC|DESC;',
            '🗃️ Relational Table Projection Model',
            'E-commerce order querying and student grading records retrieval in national educational databases.',
            'What is the difference in SQL between using AND versus OR when combining multiple WHERE criteria?',
            'CAIE 0478 Paper 2: Writing exact SQL statements to extract matching records from an exam scenario database table.'
          )
        ]
      },
      {
        id: 'cie_y10_cs_u10',
        number: 10,
        title: '10.0 Boolean Logic: Logic Gates, Circuits & Truth Tables',
        strand: 'Unit 10: Boolean Logic',
        icon: '🔀',
        status: 'available',
        summary: 'NOT, AND, OR, NAND, NOR, XOR logic gates, constructing multi-gate circuit diagrams, and evaluating 3-input truth tables.',
        subtopics: [
          stop(
            'cie_y10_cs_u10_1',
            '10.1 Logic Gate Truth Tables & Boolean Expressions',
            'Combinational Logic Synthesis & Gate Output Verification',
            'XOR produces 1 only when inputs differ; NAND produces 0 only when all inputs are 1',
            'Logic gates are the physical building blocks of digital electronic circuits. Multi-gate circuits combine inputs A, B, and C through AND, OR, NOT, NAND, NOR, and XOR gates. Truth tables systematically list all 2ⁿ input combinations (8 rows for 3 inputs) and track intermediate wire outputs.',
            'X = (A AND B) OR (NOT (B XOR C))',
            '⚡ 3-Input Logic Gate Circuit Diagram',
            'Industrial safety interlocks where a machine blade only operates when safety guards are down AND emergency stop is NOT pressed.',
            'Why are NAND and NOR gates known as "universal gates" in hardware engineering?',
            'CAIE 0478 Paper 1: Completing 8-row truth tables for complex logic circuits and writing Boolean expressions.'
          )
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE IGCSE PHYSICS (0625) — YEARS 10 & 11
  // ══════════════════════════════════════════════════════════════
  {
    curriculum: 'BRITISH',
    grade: 10,
    subject: 'Physics',
    code: '0625',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Physics (0625) Metro Line',
    stations: [
      {
        id: 'cie_y10_phy_s1',
        number: 1,
        title: '1.0 Motion, Forces & Energy: Kinematics & Terminal Velocity',
        strand: 'Topic 1: Mechanics',
        icon: '⚙️',
        status: 'available',
        summary: 'Speed, velocity, acceleration, terminal velocity, Newton\'s laws, Hooke\'s law, and energy conservation.',
        subtopics: [
          stop(
            'cie_y10_phy_s1_1',
            '1.1 Terminal Velocity & Drag Forces on Falling Bodies',
            'The Equilibrium of Weight and Fluid Drag',
            'When drag equals weight, resultant force becomes zero and acceleration ceases',
            'When a skydiver leaps from an airplane: (1) Initially, only weight acts downwards, causing maximum acceleration (g ≈ 9.8 m/s²). (2) As speed increases, air resistance (drag) increases proportionally. (3) Resultant force downwards decreases, reducing acceleration. (4) Eventually, upward drag equals downward weight. Resultant force is zero, and the body continues falling at a constant maximum velocity called terminal velocity.',
            'Resultant Force (F) = Weight (mg) - Drag (D) = ma',
            '🪂 Terminal Velocity Force Equilibrium Diagram',
            'Parachute design, automotive aerodynamics, and raindrops falling without causing destruction.',
            'Why does an elephant and a feather fall with the exact same acceleration in a vacuum chamber, but fall at vastly different speeds in our atmosphere?',
            'CAIE 0625 Paper 4 Extended: Explaining terminal velocity in terms of balanced forces and sketching the velocity-time graph.',
            [
              'Phase 1: Speed = 0 → Drag = 0 → Resultant Force = W → Acceleration = g.',
              'Phase 2: Speed increases → Drag increases → Resultant Force (W - Drag) decreases → Acceleration decreases.',
              'Phase 3: Drag = W → Resultant Force = 0 → Acceleration = 0 → Speed is Constant (Terminal Velocity).'
            ],
            'Speed-time graph of skydiver: Curve starts steep at (0,0), gradually flattens as drag grows, levels off to horizontal at terminal velocity.'
          )
        ]
      },
      {
        id: 'cie_y10_phy_s2',
        number: 2,
        title: '2.0 Thermal Physics: Kinetic Particle Theory & Specific Heat Capacity',
        strand: 'Topic 2: Thermal Physics',
        icon: '🔥',
        status: 'available',
        summary: 'Kinetic model, Brownian motion, thermal expansion, specific heat capacity (c), latent heat, and conduction/convection/radiation.',
        subtopics: [
          stop(
            'cie_y10_phy_s2_1',
            '2.1 Specific Heat Capacity & Thermal Energy Transfers',
            'Quantifying Energy Required to Raise Temperatures',
            'ΔE = mcΔθ determines temperature rises based on substance heat capacity',
            'Specific heat capacity (c) is the energy required to raise the temperature of 1 kg of a substance by 1 °C. Water has an extraordinarily high c (4,200 J/kg°C), making it ideal as an engine coolant and buffering coastal climates.',
            'ΔE = m × c × Δθ  |  Power × time = m × c × Δθ',
            '🌡️ Calorimeter Heat Transfer Apparatus',
            'Car radiator cooling systems and coastal breeze convection currents caused by temperature differential between land and sea.',
            'Why does the sand on a tropical beach become burning hot at noon while the ocean water right beside it remains cool?',
            'CAIE 0625 Paper 4: Calculating specific heat capacity from electrical heater power and temperature rise graphs.'
          )
        ]
      },
      {
        id: 'cie_y10_phy_s3',
        number: 3,
        title: '3.0 Waves and Light: Reflection, Refraction & Sound Waves',
        strand: 'Topic 3: Waves and Light',
        icon: '🌊',
        status: 'available',
        summary: 'Wave properties (v = fλ), Snell\'s law, total internal reflection, critical angle, and electromagnetic spectrum.',
        subtopics: [
          stop(
            'cie_y10_phy_s3_1',
            '3.1 Snell\'s Law, Refraction & Total Internal Reflection (TIR)',
            'Bending of Light Waves Across Refractive Boundary Interfaces',
            'Light slows down and bends towards normal when entering denser optical mediums',
            'Refraction occurs because light changes speed across different media. Snell\'s law relates angles of incidence (i) and refraction (r) to refractive index n: n = sin(i) / sin(r). When the angle of incidence inside the denser medium exceeds the critical angle c, total internal reflection occurs with zero refracted light.',
            'n = sin(i) / sin(r)  |  sin(c) = 1 / n  |  v = c / n',
            '💎 Critical Angle & Fibre-Optic TIR Model',
            'Endoscopy in keyhole surgery and high-speed fibre-optic broadband telecommunication.',
            'Why must light be travelling inside an optically denser medium towards a less dense medium for total internal reflection to be possible?',
            'CAIE 0625 Paper 4: Calculating refractive index, critical angles, and completing ray diagrams through glass prisms.'
          )
        ]
      }
    ]
  },
  {
    curriculum: 'BRITISH',
    grade: 11,
    subject: 'Physics',
    code: '0625',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Physics (0625) Year 11 Exam Units',
    stations: [
      {
        id: 'cie_y11_phy_s1',
        number: 1,
        title: '4.0 Electricity and Magnetism: Circuits, Induction & Transformers',
        strand: 'Topic 4: Electricity & Magnetism',
        icon: '⚡',
        status: 'available',
        summary: 'Current, voltage, Ohm\'s law (V=IR), series/parallel circuits, Fleming\'s left-hand rule, and electromagnetic induction.',
        subtopics: [
          stop(
            'cie_y11_phy_s1_1',
            '4.1 Electromagnetic Induction & Electrical Power Transformers',
            'Generating EMF from Relative Motion Between Magnetic Fields and Conductors',
            'Changing magnetic flux linkage induces an electromotive force (EMF) across coils',
            'Electromagnetic induction occurs when magnetic flux lines are cut by a moving conductor or changing current. Transformers use mutual induction between primary and secondary coils wound on a soft iron core to step voltages up or down with minimal power loss (Vp/Vs = Np/Ns).',
            'Vp / Vs = Np / Ns  |  For 100% efficiency: Vp × Ip = Vs × Is',
            '🔌 Step-Up & Step-Down Transformer Cores',
            'High-voltage national grid transmission lines stepping power up to 400 kV to minimize I²R thermal transmission losses.',
            'Why is high alternating voltage (AC) preferred over low voltage when transmitting electricity across hundreds of kilometres of national grid cable?',
            'CAIE 0625 Paper 4: Applying transformer turns equations and explaining energy efficiency in the electrical grid.'
          )
        ]
      },
      {
        id: 'cie_y11_phy_s2',
        number: 2,
        title: '5.0 Nuclear and Space Physics: Radioactivity, Half-Life & Astrophysics',
        strand: 'Topic 5: Nuclear & Space Physics',
        icon: '🪐',
        status: 'available',
        summary: 'Alpha, beta, gamma decay equations, half-life decay curves, solar system dynamics, and redshift/Big Bang cosmology.',
        subtopics: [
          stop(
            'cie_y11_phy_s2_1',
            '5.1 Radioactive Decay Modes, Half-Life & Nuclear Equations',
            'Spontaneous Nuclear Disintegration & Exponential Half-Life Decay',
            'Alpha emission reduces nucleon number by 4 and atomic number by 2; Beta emission increases atomic number by 1',
            'Radioactivity is the random emission of radiation from unstable atomic nuclei. Alpha (helium nucleus ⁴₂He), Beta (high-speed electron ⁰₋₁e), and Gamma (high-energy electromagnetic photon) have varying ionising and penetrating powers. Half-life is the time taken for half the radioactive nuclei in a sample to decay.',
            'N(t) = N0 × (1/2)^(t / t_half)  |  ⁴₂He (Alpha)  |  ⁰₋₁e (Beta)',
            '☢️ Decay Curve & Half-Life Halving Steps',
            'Radiometric carbon-14 dating of archaeological fossils and radioactive iodine-131 tracers in thyroid medicine.',
            'If a sample of radon gas has an initial count rate of 800 counts per minute and a half-life of 4 days, what will its count rate be after 12 days?',
            'CAIE 0625 Paper 4: Balancing nuclear decay equations and calculating half-life from background-corrected count rate graphs.'
          )
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE IGCSE CHEMISTRY (0620) — YEARS 10 & 11
  // ══════════════════════════════════════════════════════════════
  {
    curriculum: 'BRITISH',
    grade: 10,
    subject: 'Chemistry',
    code: '0620',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Chemistry (0620) Metro Line',
    stations: [
      {
        id: 'cie_y10_chem_s1',
        number: 1,
        title: '1.0 Stoichiometry & The Mole Concept',
        strand: 'Topic 3: Quantitative Chemistry',
        icon: '⚖️',
        status: 'available',
        summary: 'Relative formula mass (Mr), molar gas volume (24 dm³), empirical formulae, and percentage yield.',
        subtopics: [
          stop(
            'cie_y10_chem_s1_1',
            '1.1 The Mole Concept & Reacting Masses',
            'Counting Atoms by Weighing Grams',
            'One mole of any substance contains exactly 6.02 × 10²³ particles (Avogadro\'s constant)',
            'Atoms are far too tiny to count one by one. The mole bridges the subatomic scale and the laboratory balance. One mole of carbon-12 weighs exactly 12 grams. To find the moles of any substance, divide its mass in grams by its relative formula mass (Mr). The balanced chemical equation gives the exact mole ratio in which substances react.',
            'Moles = Mass (g) / Mr  |  Volume of Gas at r.t.p. = Moles × 24 dm³',
            '⚖️ The Mole Conversion Triangle',
            'Pharmaceutical synthesis dosing, industrial fertilizer manufacturing, and emissions calculations.',
            'If 2 moles of hydrogen gas react with 1 mole of oxygen gas to make water (2H2 + O2 → 2H2O), what volume of water vapor is produced at room temperature and pressure if you start with 48 dm³ of hydrogen?',
            'CAIE 0620 Paper 4: Show clear step-by-step working with units. Marks are awarded for method [M1] and final answer with units [A1].',
            [
              'Step 1: Calculate relative formula mass Mr using the Periodic Table (e.g. H2O: 2(1) + 16 = 18 g/mol).',
              'Step 2: Calculate moles: Moles = Mass (g) ÷ Mr.',
              'Step 3: Use stoichiometric ratio from balanced equation to predict moles of product, then convert to grams.'
            ],
            'Decomposition of 10g CaCO3: CaCO3 → CaO + CO2 produces 4.4g CO2 gas.'
          )
        ]
      },
      {
        id: 'cie_y10_chem_s2',
        number: 2,
        title: '2.0 Atoms, Elements & Chemical Bonding: Ionic, Covalent & Giant Structures',
        strand: 'Topic 2: Atoms and Bonding',
        icon: '⚛️',
        status: 'available',
        summary: 'Electronic structure, isotopes, ionic lattices, simple covalent molecules, diamond, graphite, silicon dioxide, and metallic bonding.',
        subtopics: [
          stop(
            'cie_y10_chem_s2_1',
            '2.1 Giant Covalent Structures: Diamond, Graphite & Silicon(IV) Oxide',
            'Allotropes of Carbon and Physical Property Correlation',
            'Diamond has tetrahedral sp³ bonds (hard, insulator); graphite has layers with delocalized electrons (conducts electricity, lubricates)',
            'In diamond, every carbon atom bonds covalently to 4 other carbons in a rigid 3D tetrahedral lattice, giving extreme hardness and no free electrons. In graphite, each carbon bonds to 3 others in flat hexagonal layers with weak intermolecular forces between layers and delocalized electrons free to drift along layers, conducting electricity.',
            'Diamond: 4 covalent bonds/C (Insulator, Hard)  vs  Graphite: 3 covalent bonds/C + 1 delocalized e⁻ (Conductor, Slippery)',
            '💎 Diamond vs Graphite Crystal Lattice',
            'Diamond cutting tips on heavy industrial drills; graphite electrodes in aluminum smelting cells.',
            'Why does graphite conduct electricity whereas diamond, which is made of the identical element (carbon), acts as an electrical insulator?',
            'CAIE 0620 Paper 4: Relating macroscopic properties (melting point, electrical conductivity, hardness) directly to bonding models.'
          )
        ]
      },
      {
        id: 'cie_y10_chem_s3',
        number: 3,
        title: '3.0 Chemical Energetics & Reaction Rates: Collision Theory & Catalysis',
        strand: 'Topic 4: Energetics & Rates',
        icon: '🧪',
        status: 'available',
        summary: 'Exothermic and endothermic profile diagrams, activation energy (Ea), collision frequency, surface area, and catalysts.',
        subtopics: [
          stop(
            'cie_y10_chem_s3_1',
            '3.1 Reaction Kinetics & Maxwell-Boltzmann Collision Theory',
            'Effective Molecular Collisions & Activation Energy Barriers',
            'Reactions occur when particles collide with energy greater than or equal to the activation energy (Ea)',
            'Collision theory states that particles must collide with sufficient kinetic energy (≥ Ea) and correct orientation to react. Increasing temperature shifts the particle energy distribution so a much higher fraction possess E ≥ Ea, drastically increasing collision frequency and successful reaction rate.',
            'Rate = Change in Concentration / Time  |  ΔH = Bond Breaking Energy - Bond Forming Energy',
            '📈 Energy Profile Diagram with Activation Energy (Ea)',
            'Catalytic converters in automobile exhausts converting toxic carbon monoxide and nitrogen oxides into CO2 and N2.',
            'Why does a modest 10 °C rise in temperature often double the rate of a chemical reaction even though average particle speed only increases by ~2%?',
            'CAIE 0620 Paper 4: Explaining reaction rates using the precise syllabus phrase "greater fraction of particles have energy equal to or exceeding activation energy".'
          )
        ]
      }
    ]
  },
  {
    curriculum: 'BRITISH',
    grade: 11,
    subject: 'Chemistry',
    code: '0620',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Chemistry (0620) Year 11 Exam Units',
    stations: [
      {
        id: 'cie_y11_chem_s1',
        number: 1,
        title: '4.0 Acids, Bases, Salts & Redox Reactions',
        strand: 'Topic 5: Acids, Bases & Salts',
        icon: '⚗️',
        status: 'available',
        summary: 'Proton transfer, strong vs weak acids, preparing soluble and insoluble salts, and oxidation states (OIL RIG).',
        subtopics: [
          stop(
            'cie_y11_chem_s1_1',
            '4.1 Salt Preparation Methods: Titration, Excess Insoluble Base & Precipitation',
            'Choosing the Correct Route for Pure Dry Salt Crystals',
            'Soluble salts from soluble acid+alkali require titration; insoluble salts require precipitation filtration',
            'Salt synthesis requires matching the solubility of reactants and products: (1) Insoluble base + acid: Add metal oxide/carbonate in excess, filter unreacted solid, heat filtrate to saturation, crystallise. (2) Acid-alkali titration: Determine exact neutralisation volume with indicator, repeat without indicator. (3) Precipitation: Mix two soluble solutions, filter insoluble precipitate.',
            'Acid + Base → Salt + Water  |  Acid + Metal → Salt + H2  |  Acid + Carbonate → Salt + H2O + CO2',
            '🧂 Salt Crystallisation Flowchart',
            'Manufacturing ammonium nitrate and potassium sulfate fertilizers for high-yield agriculture.',
            'Why must excess copper(II) oxide powder be added when making copper(II) sulfate crystals from dilute sulfuric acid?',
            'CAIE 0620 Paper 4: Writing full step-by-step experimental procedures for preparing pure dry hydrated crystals.'
          )
        ]
      },
      {
        id: 'cie_y11_chem_s2',
        number: 2,
        title: '5.0 Organic Chemistry & Polymers: Hydrocarbons, Alcohols & Polymerisation',
        strand: 'Topic 6: Organic Chemistry',
        icon: '🛢️',
        status: 'available',
        summary: 'Homologous series, alkanes (cracking, substitution), alkenes (addition), alcohols, carboxylic acids, and addition vs condensation polymers.',
        subtopics: [
          stop(
            'cie_y11_chem_s2_1',
            '5.1 Addition Polymerisation vs Condensation Polymerisation (Nylon & PET)',
            'Monomer Linkages & Condensation Elimination of Small Molecules',
            'Addition polymers involve opening C=C double bonds; condensation polymers release small molecules (H2O or HCl)',
            'Addition polymerisation opens the carbon-carbon double bond in alkene monomers (e.g. ethene to polyethene) without forming by-products. Condensation polymerisation reacts two bifunctional monomers (e.g. dicarboxylic acid + diamine to form nylon polyamide, or diacid + diol to form polyester), eliminating a small molecule like water per linkage.',
            'Addition: n(CH2=CH2) → -[CH2-CH2]-n  |  Polyester: -[O-R-O-CO-R\'-CO]-n + (2n-1)H2O',
            '🧵 Polyamide Peptide Linkage vs Ester Linkage',
            'PET plastic bottle recycling and synthetic nylon fabrics in sportswear manufacturing.',
            'What functional groups must be present on monomers to synthesize a polyester such as Terylene?',
            'CAIE 0620 Paper 4: Drawing repeating units of polymers and identifying the amide or ester linkage.'
          )
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE IGCSE BIOLOGY (0610) — YEARS 10 & 11
  // ══════════════════════════════════════════════════════════════
  {
    curriculum: 'BRITISH',
    grade: 10,
    subject: 'Biology',
    code: '0610',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Biology (0610) Metro Line',
    stations: [
      {
        id: 'cie_y10_bio_s1',
        number: 1,
        title: '1.0 Plant Nutrition & Photosynthesis Rate Factors',
        strand: 'Topic 6: Plant Nutrition',
        icon: '🌿',
        status: 'available',
        summary: 'Chloroplast structure, light intensity, carbon dioxide concentration, and limiting factors.',
        subtopics: [
          stop(
            'cie_y10_bio_s1_1',
            '1.1 Limiting Factors of Photosynthesis',
            'The Law of the Bottleneck in Plant Production',
            'The rate of a physiological process is limited by the factor that is in shortest supply',
            'Photosynthesis requires light, carbon dioxide, and warmth for enzymes. A limiting factor is the one parameter that directly controls the rate when all other conditions are abundant. If a plant has blazing sunshine but only 0.04% CO2, increasing light further will not increase the rate of photosynthesis—CO2 has become the bottleneck.',
            '6CO2 + 6H2O ⎯[Light & Chlorophyll]→ C6H12O6 + 6O2',
            '📊 Multi-Curve Limiting Factor Plateau Graph',
            'Commercial greenhouse farming at Lake Naivasha (roses and vegetables) using automated CO2 burners.',
            'On a freezing but brightly sunny morning in July, what is the primary factor limiting the rate of photosynthesis in Kenyan highland crops, and why?',
            'CAIE 0610 Paper 4: Explaining plateau regions on graphs using the exact syllabus phrase "something other than [factor X] is now the limiting factor".',
            [
              'Step 1: On a rate graph, when the line is rising steeply, the factor on the x-axis is the limiting factor.',
              'Step 2: When curve levels to a plateau, that factor is no longer limiting; another factor has become the bottleneck.',
              'Step 3: Greenhouse growers maximize commercial crop yields by simultaneously controlling all three factors.'
            ],
            'Investigating aquatic plant (Elodea): Count oxygen bubbles per minute as a lamp is moved closer (1/d² relationship).'
          )
        ]
      },
      {
        id: 'cie_y10_bio_s2',
        number: 2,
        title: '2.0 Cell Physiology: Osmosis, Diffusion & Active Transport',
        strand: 'Topic 3: Movement in and out of Cells',
        icon: '🔬',
        status: 'available',
        summary: 'Diffusion gradients, osmosis across partially permeable membranes, water potential (Ψ), and active transport via carrier proteins.',
        subtopics: [
          stop(
            'cie_y10_bio_s2_1',
            '2.1 Water Potential & Plant Turgor vs Plasmolysis',
            'Net Movement of Water Down Water Potential Gradients',
            'Water diffuses from high water potential (dilute) to low water potential (concentrated) across partial membranes',
            'Plant cells in pure water absorb water by osmosis. The vacuole swells, pushing the cytoplasm against the rigid cellulose cell wall, generating turgor pressure that supports the upright plant stem. In concentrated sugar solution, water leaves the vacuole, causing the cytoplasm to pull away from the cell wall (plasmolysis).',
            'Water Potential (Ψ) = Pure water has highest Ψ (0 kPa); dissolved solutes make Ψ negative',
            '🌱 Turgid vs Plasmolysed Plant Cell Diagram',
            'Sukuma wiki wilting in hot afternoon sun when soil water potential is too negative and transpiration exceeds root uptake.',
            'Why do animal red blood cells burst (lyse) in distilled water, whereas plant cells become firm (turgid) without bursting?',
            'CAIE 0610 Paper 4: Interpreting potato cylinder percentage mass and length change graphs across sucrose molarities.'
          )
        ]
      },
      {
        id: 'cie_y10_bio_s3',
        number: 3,
        title: '3.0 Biological Molecules & Enzymes: Lock-and-Key Mechanism',
        strand: 'Topic 5: Enzymes and Molecules',
        icon: '🧬',
        status: 'available',
        summary: 'Carbohydrates, lipids, proteins, food test reagents (Benedict\'s, Biuret, Iodine, Ethanol), and enzyme denaturation kinetics.',
        subtopics: [
          stop(
            'cie_y10_bio_s3_1',
            '3.1 Enzyme Active Sites, Temperature & pH Denaturation',
            'Biological Catalysts with Complementary 3D Conformations',
            'Excessive heat causes rapid molecular vibration that breaks hydrogen bonds, permanently denaturing the active site',
            'Enzymes are globular proteins that speed up metabolic reactions without being consumed. Substrate molecules fit into the enzyme active site like a key into a lock. At high temperatures beyond the optimum (approx 40 °C), excessive kinetic energy breaks weak hydrogen bonds maintaining the tertiary structure, permanently altering active site shape (denaturation).',
            'Enzyme + Substrate ⇄ Enzyme-Substrate Complex → Enzyme + Products',
            '🔒 Lock-and-Key Complementary Fit Model',
            'Biological washing powder enzymes digesting fat and protein food stains at gentle wash temperatures (30 °C).',
            'Why does enzyme activity drop to zero when boiled, but only slow down without permanent damage when chilled to 0 °C?',
            'CAIE 0610 Paper 4: Explaining enzyme graphs using specific terms: kinetic energy, collision frequency, active site, and denatured.'
          )
        ]
      }
    ]
  },
  {
    curriculum: 'BRITISH',
    grade: 11,
    subject: 'Biology',
    code: '0610',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Biology (0610) Year 11 Exam Units',
    stations: [
      {
        id: 'cie_y11_bio_s1',
        number: 1,
        title: '4.0 Human Physiology: Double Circulation & Cardiac Dynamics',
        strand: 'Topic 9: Transport in Animals',
        icon: '❤️',
        status: 'available',
        summary: 'Mammalian heart anatomy, coronary heart disease, valves, double circulation, arteries, veins, and capillaries.',
        subtopics: [
          stop(
            'cie_y11_bio_s1_1',
            '4.1 Mammalian Heart Anatomy, Valve Mechanics & Double Circulation',
            'Systemic vs Pulmonary Circuits & Coronary Blood Supply',
            'Blood passes through the heart twice for every complete circuit of the body',
            'The mammalian heart has four chambers. The right side pumps deoxygenated blood to the lungs at low pressure (pulmonary circuit). Oxygenated blood returns to the left atrium and is pumped by the thick muscular left ventricle into the aorta at high pressure to supply all body tissues (systemic circuit). Atrioventricular and semilunar valves prevent backflow.',
            'Pulmonary Circuit: Right Ventricle → Pulmonary Artery → Lungs → Pulmonary Vein → Left Atrium',
            '🫀 4-Chamber Heart Cross-Section Flowchart',
            'Preventing and treating atherosclerosis and coronary heart disease (CHD) with arterial bypass surgery and angioplasty stents.',
            'Why is the muscular wall of the left ventricle significantly thicker than that of the right ventricle?',
            'CAIE 0610 Paper 4: Tracing blood flow through named valves and explaining the physiological benefits of double circulation.'
          )
        ]
      },
      {
        id: 'cie_y11_bio_s2',
        number: 2,
        title: '5.0 Genetics and Inheritance: Monohybrid Crosses & Meiosis',
        strand: 'Topic 17: Inheritance',
        icon: '🧬',
        status: 'available',
        summary: 'DNA structure, alleles, dominant vs recessive traits, codominance, sex linkage, Punnett squares, and genetic variation.',
        subtopics: [
          stop(
            'cie_y11_bio_s2_1',
            '5.1 Monohybrid Inheritance & Sex-Linked Genetic Crosses',
            'Predicting Offspring Genotypes and Phenotypes via Punnett Squares',
            'Sex-linked conditions (e.g. red-green color blindness) are carried on the X chromosome',
            'Alleles are alternative forms of a gene. A dominant allele expresses in heterozygotes; recessive alleles require homozygosity. In sex linkage, females possess XX chromosomes and males possess XY. Because the Y chromosome is smaller and carries fewer gene loci, males with a single recessive allele on their single X chromosome express the trait.',
            'Phenotypic Ratio of Heterozygous Cross (Aa × Aa): 3 Dominant : 1 Recessive',
            '📊 2×2 Punnett Square Grid with Alleles',
            'Genetic counselling for sickle cell anaemia and haemophilia inheritance probabilities in expectant families.',
            'Why are biological males significantly more likely to inherit red-green color blindness than biological females?',
            'CAIE 0610 Paper 4: Constructing genetic diagrams showing parental genotypes, gametes, offspring genotypes, and phenotypic ratios.'
          )
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE IGCSE MATHEMATICS (0580) — YEARS 10 & 11
  // ══════════════════════════════════════════════════════════════
  {
    curriculum: 'BRITISH',
    grade: 10,
    subject: 'Mathematics',
    code: '0580',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Mathematics (0580) Metro Line',
    stations: [
      {
        id: 'bri_y10_math_s1',
        number: 1,
        title: '1.0 Number Theory & Surds: Non-Calculator Foundations',
        strand: 'Topic 1: Number & Surds',
        icon: '🔢',
        status: 'available',
        summary: 'Surds, fractional indices, rationalising denominators, standard form, and 2025 Non-Calculator Paper 2 rules.',
        subtopics: [
          stop(
            'bri_y10_math_s1_1',
            '1.1 Surds Simplification & Rationalising Denominators',
            'Exact Arithmetic Without Decimal Approximations',
            'Multiply numerator and denominator by the conjugate radical (√a ∓ √b) to eliminate surds from denominators',
            'Surds are irrational roots that cannot be expressed as exact fractions. When working on Cambridge non-calculator papers, answers must be in exact simplified surd form (a√b). To rationalise a fraction with a denominator like (√5 - 1), multiply both numerator and denominator by its conjugate (√5 + 1) using difference of two squares.',
            '√(a × b) = √a × √b  |  (√a + √b)(√a - √b) = a - b',
            '📐 Conjugate Rationalisation Square Model',
            'Exact structural load calculations and trigonometric proof derivations where decimal truncation induces rounding errors.',
            'Why does multiplying (3 + √2) by (3 - √2) always produce a rational whole number without any square root remaining?',
            'CAIE 0580 Paper 2 (Non-Calculator): Show complete intermediate algebraic steps when rationalising expressions.'
          )
        ]
      },
      {
        id: 'bri_y10_math_s2',
        number: 2,
        title: '2.0 Algebra & Functions: Quadratics & Completing the Square',
        strand: 'Topic 2: Algebra & Functions',
        icon: '📈',
        status: 'available',
        summary: 'Expanding brackets, factorising quadratics, completing the square: a(x+p)² + q, vertex coordinates, and quadratic inequalities.',
        subtopics: [
          stop(
            'bri_y10_math_s2_1',
            '2.1 Completing the Square & Identifying Quadratic Turning Points',
            'Rewriting Parabolic Equations into Vertex Form',
            'x² + bx + c = (x + b/2)² - (b/2)² + c reveals the exact vertex coordinates (-b/2, c - b²/4)',
            'Completing the square converts standard form ax² + bx + c into vertex form a(x + p)² + q. This reveals the exact minimum or maximum turning point of the curve without calculus, and provides an algebraic method to solve quadratic equations.',
            'x² + bx + c = (x + b/2)² - (b/2)² + c  |  Turning Point = (-p, q)',
            '📈 Parabolic Vertex Turning Point Diagram',
            'Trajectory optimization in projectile ballistics and revenue maximization in financial microeconomics.',
            'How can you immediately tell from the completed square form y = 3(x - 4)² + 7 whether the parabola has a minimum or maximum turning point?',
            'CAIE 0580 Paper 4 Extended: Expressing quadratics in the form (x+p)²+q and deducing the line of symmetry x = -p.'
          ),
          stop(
            'bri_y10_math_s2_2',
            '2.2 The Quadratic Formula & The Discriminant (b² - 4ac)',
            'Classifying Roots of Quadratic Equations',
            'The discriminant Δ = b² - 4ac dictates whether there are two distinct real roots, one repeated root, or no real roots',
            'When a quadratic cannot be easily factorised, the quadratic formula x = (-b ± √(b² - 4ac)) / (2a) yields exact solutions. The term under the radical, b² - 4ac, determines the nature of the roots: Δ > 0 indicates two real intersections with the x-axis; Δ = 0 indicates tangency (one repeated root); Δ < 0 means the curve never intersects the x-axis.',
            'x = (-b ± √(b² - 4ac)) / (2a)  |  Discriminant Δ = b² - 4ac',
            '⚡ Parabola-X-Axis Intersection Model',
            'Damped oscillation physics and finding break-even points in commercial business modelling.',
            'If the discriminant b² - 4ac of a quadratic equation is negative, what does that indicate geometrically about the graph of y = ax² + bx + c?',
            'CAIE 0580 Paper 4: Giving answers correct to 2 decimal places or in exact surd form using the quadratic formula.'
          )
        ]
      },
      {
        id: 'bri_y10_math_s3',
        number: 3,
        title: '3.0 Coordinate Geometry & Circle Theorems: Proof & Tangents',
        strand: 'Topic 3: Coordinate Geometry & Theorems',
        icon: '📐',
        status: 'available',
        summary: 'Angle at centre is twice angle at circumference, angles in same segment, cyclic quadrilaterals, alternate segment theorem, and tangent perpendicularity.',
        subtopics: [
          stop(
            'bri_y10_math_s3_1',
            '3.1 Cambridge Circle Theorems & Geometric Proof Statements',
            'Rigorous Angle Deductions on Circular Geometry',
            'Opposite angles in cyclic quadrilaterals sum to 180°; angle between tangent and chord equals angle in alternate segment',
            'Circle theorems allow deductive calculation of unknown angles in circle configurations: (1) Angle subtended at centre is twice the angle subtended at the circumference by the same arc. (2) Angle in a semicircle is a right angle (90°). (3) Angles in the same segment are equal. (4) Opposite angles of a cyclic quadrilateral sum to 180°. (5) The angle between a tangent and a chord equals the angle in the alternate segment.',
            'Angle at Centre = 2 × Angle at Circumference  |  Cyclic Quad: A + C = 180°',
            '⭕ Multi-Theorem Circle Proof Diagram',
            'GPS triangulation geometry and satellite orbital horizon visual calculations.',
            'If a triangle is inscribed in a circle with one of its sides serving as the diameter of the circle, what must the angle opposite that side be, and which theorem proves it?',
            'CAIE 0580 Paper 4: Candidates must cite the exact official theorem reason for every angle calculation (e.g. "angles in same segment are equal").'
          )
        ]
      }
    ]
  },
  {
    curriculum: 'BRITISH',
    grade: 11,
    subject: 'Mathematics',
    code: '0580',
    trackPathway: 'IGCSE',
    title: 'Cambridge IGCSE Mathematics (0580) Year 11 Exam Units',
    stations: [
      {
        id: 'bri_y11_math_s1',
        number: 1,
        title: '4.0 Advanced Mensuration: Arcs, Sectors & Composite Solids',
        strand: 'Topic 4: Mensuration',
        icon: '🍰',
        status: 'available',
        summary: 'Arc length (θ/360 × 2πr), sector area (θ/360 × πr²), surface area and volume of cones, spheres, pyramids, and frustums.',
        subtopics: [
          stop(
            'bri_y11_math_s1_1',
            '4.1 Sector Area, Arc Length & Volume of Frustums',
            'Subtended Angles and Composite Solid Geometry',
            'Frustum Volume = Volume of original large cone - Volume of removed small cone',
            'Sector calculations scale the properties of circles by the angle fraction (θ / 360°). When a cone is sliced parallel to its base, a frustum is created. To compute frustum volume, use linear scale factors (k) to find the dimensions of the original cone, then subtract the smaller top cone volume from the large cone volume.',
            'Arc Length = (θ/360) × 2πr  |  Sector Area = (θ/360) × πr²  |  Cone Volume = 1/3 πr²h',
            '🍦 Cone Frustum Decomposition Model',
            'Calculating concrete requirements for cooling towers and volume of coffee brewing filter cones.',
            'If the top cone sliced off a large cone has a height that is half the height of the original cone, what fraction of the original volume was removed?',
            'CAIE 0580 Paper 4: Multi-step problems combining trigonometry to find missing slant heights with volume calculations.'
          )
        ]
      },
      {
        id: 'bri_y11_math_s2',
        number: 2,
        title: '5.0 3D Trigonometry & Vector Geometry: Sine/Cosine Rules & Bearings',
        strand: 'Topic 5: Trigonometry & Vectors',
        icon: '🧭',
        status: 'available',
        summary: 'Sine rule (a/sinA = b/sinB), cosine rule (a² = b² + c² - 2bc cosA), 3D Pythagoras, 3-figure bearings, and vector proofs.',
        subtopics: [
          stop(
            'bri_y11_math_s2_1',
            '5.1 The Sine & Cosine Rules for Non-Right-Angled Triangles',
            'Solving Oblique Triangles with Trigonometric Laws',
            'Use Cosine Rule when given SAS or SSS; use Sine Rule when given AAS or SSA',
            'For triangles without a 90° angle, conventional right-angled trigonometry cannot be directly applied. The Sine Rule (a/sin A = b/sin B = c/sin C) solves triangles when an angle and its opposite side are known. The Cosine Rule (a² = b² + c² - 2bc cos A) solves triangles when two sides and the included angle (SAS) or all three sides (SSS) are known.',
            'a² = b² + c² - 2bc cos(A)  |  cos(A) = (b² + c² - a²) / (2bc)  |  Area = 1/2 ab sin(C)',
            '📐 Oblique Triangle Angle-Side Mapping',
            'Aviation flight paths taking crosswind vector drift into account and marine vessel navigation along 3-figure bearings.',
            'When using the Sine Rule to calculate an unknown angle, under what circumstances can the ambiguous case (obtuse angle) arise?',
            'CAIE 0580 Paper 4: Combining bearings (measured clockwise from North with 3 digits, e.g. 065°) with the Cosine Rule.'
          )
        ]
      },
      {
        id: 'bri_y11_math_s3',
        number: 3,
        title: '6.0 Transformation Matrices & Vector Column Arithmetic',
        strand: 'Topic 6: Vectors & Matrices',
        icon: '🔄',
        status: 'available',
        summary: '2×2 transformation matrices (reflections, rotations, enlargements, shears), matrix multiplication, and geometric vector collinearity proofs.',
        subtopics: [
          stop(
            'bri_y11_math_s3_1',
            '6.1 2×2 Transformation Matrices & Invariant Points',
            'Mapping Geometric Vertices via Matrix Multiplication',
            'The columns of a transformation matrix show where the base unit vectors (1,0) and (0,1) land',
            'A 2×2 matrix transforms coordinate points (x, y) into new images (x\', y\') through row-by-column matrix multiplication. To identify the matrix representing a reflection in the x-axis, rotation by 90° clockwise, or enlargement by scale factor k from origin (k, 0; 0, k), track the transformed positions of unit vectors i = (1, 0) and j = (0, 1).',
            '[x\'; y\'] = [a, b; c, d] × [x; y]  |  Enlargement = [k, 0; 0, k]',
            '🔁 Coordinate Grid Unit Vector Transformation',
            '3D computer graphics rendering pipelines and robotics joint coordinate transformations.',
            'What is the 2×2 matrix that represents a reflection in the line y = x, and what happens to the point (3, 7) under this transformation?',
            'CAIE 0580 Paper 4: Finding the inverse matrix and identifying single matrix equivalents for combined transformations.'
          )
        ]
      },
      {
        id: 'bri_y11_math_s4',
        number: 4,
        title: '7.0 Probability & Cumulative Frequency: Ogives & Histograms',
        strand: 'Topic 7: Statistics & Probability',
        icon: '📊',
        status: 'available',
        summary: 'Tree diagrams, conditional probability without replacement, cumulative frequency curves (medians, IQR), and histograms with frequency density.',
        subtopics: [
          stop(
            'bri_y11_math_s4_1',
            '7.1 Cumulative Frequency Curves & Interquartile Range (IQR)',
            'Median, Quartiles & Spread Analysis from Cumulative Ogives',
            'Interquartile Range (IQR = Q3 - Q1) measures the spread of the middle 50% of data, unaffected by extreme outliers',
            'A cumulative frequency curve is constructed by plotting cumulative totals against the upper class boundary of each interval. From the smooth curve, read: Median (50th percentile), Lower Quartile Q1 (25th percentile), and Upper Quartile Q3 (75th percentile). The IQR (Q3 - Q1) provides a robust measure of statistical dispersion.',
            'IQR = Upper Quartile (Q3) - Lower Quartile (Q1)  |  Frequency Density = Frequency / Class Width',
            '📈 Cumulative Frequency S-Curve (Ogive)',
            'Standardized exam grade boundary determination and hospital patient waiting time analytics.',
            'Why is the Interquartile Range preferred over the full range when comparing the spread of salaries in a large company?',
            'CAIE 0580 Paper 4: Estimating percentiles and interpreting histograms with unequal class intervals using frequency density.'
          )
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE LOWER SECONDARY SCIENCE (0893) — STAGES 7, 8, 9
  // ══════════════════════════════════════════════════════════════
  {
    curriculum: 'BRITISH',
    grade: 7,
    subject: 'Science',
    code: '0893',
    trackPathway: 'CHECKPOINT',
    title: 'Cambridge Checkpoint Science Stage 7 Metro Line',
    stations: [
      {
        id: 'cie_y7_sci_u1',
        number: 1,
        title: '1.0 Cells and Organisms: Cellular Specialisation & Microorganisms',
        strand: 'Content Area 1: Biology',
        icon: '🔬',
        status: 'available',
        summary: 'Plant and animal cell organelles, specialized cells (ciliated, root hair), microorganisms, and biological classification.',
        subtopics: [
          stop(
            'cie_y7_sci_u1_1',
            '1.1 Plant vs Animal Cell Ultrastructure & Adaptations',
            'Cellular Components Under the Light Microscope',
            'Chloroplasts, permanent vacuole, and cellulose cell wall are unique to plant cells',
            'All living organisms are composed of cells. Animal and plant cells share cell membranes, cytoplasm, nucleus, and mitochondria. Plant cells uniquely possess a rigid cellulose cell wall for structural support, a large permanent sap vacuole for turgor, and chloroplasts containing chlorophyll to trap sunlight for photosynthesis.',
            'Plant Cell = Animal Cell Organelles + Cell Wall + Chloroplasts + Permanent Vacuole',
            '🔬 Plant vs Animal Cell Comparison Diagram',
            'Agricultural yield diagnostics and understanding cellular pathology in medical science.',
            'Why do root hair cells in plant roots lack chloroplasts even though they are plant cells?',
            'Cambridge Checkpoint Science: Identifying organelles on micrographs and stating functions of specialized cells.'
          )
        ]
      },
      {
        id: 'cie_y7_sci_u2',
        number: 2,
        title: '2.0 States of Matter: Particle Model & Physical Changes',
        strand: 'Content Area 2: Chemistry',
        icon: '🧪',
        status: 'available',
        summary: 'Solid, liquid, gas particle arrangements, kinetic energy, changes of state, diffusion, gas pressure, and solutions.',
        subtopics: [
          stop(
            'cie_y7_sci_u2_1',
            '2.1 The Particle Model, Changes of State & Diffusion Rates',
            'Thermal Energy & Molecular Kinetic Vibration',
            'Particles in a gas move randomly at high speed with vast spaces between them',
            'In solids, particles vibrate in fixed regular arrangements held by strong intermolecular forces. Adding thermal energy increases kinetic energy: melting turns solids to liquids where particles slide past each other; boiling converts liquids to gases where particles move freely at high speeds. Diffusion is the net movement of particles from high to low concentration.',
            'Solid ⎯[Melting]→ Liquid ⎯[Boiling]→ Gas  |  Diffusion Rate ∝ Temperature / Particle Mass',
            '🧊 Solid, Liquid, Gas Particle Box Models',
            'Aerosol spray dispersal and perfume diffusing across a ventilated room.',
            'Why does potassium manganate(VII) crystals dissolve and diffuse much faster in hot water than in iced water?',
            'Cambridge Checkpoint Science: Explaining gas pressure and state changes using the particle kinetic theory.'
          )
        ]
      },
      {
        id: 'cie_y7_sci_u3',
        number: 3,
        title: '3.0 Forces and Motion: Balanced Forces, Gravity & Friction',
        strand: 'Content Area 3: Physics',
        icon: '⚖️',
        status: 'available',
        summary: 'Contact vs non-contact forces, balanced/unbalanced resultant forces, friction, mass vs weight (W=mg), and speed calculations.',
        subtopics: [
          stop(
            'cie_y7_sci_u3_1',
            '3.1 Balanced vs Unbalanced Forces & Mass vs Weight',
            'Resultant Force Dictates Acceleration or Constant Speed',
            'Mass is the amount of matter in kg (constant); Weight is gravitational force in Newtons (W = mg)',
            'Force is measured in Newtons (N). When opposing forces acting on an object are equal in magnitude, resultant force is zero: the object remains stationary or moves at steady speed in a straight line. Unbalanced resultant forces cause acceleration, deceleration, or direction change. Mass remains constant everywhere, while weight depends on local gravitational field strength.',
            'Weight (W) = Mass (m) × Gravity (g)  |  Resultant Force = F1 - F2',
            '⚖️ Free-Body Force Arrow Diagram',
            'Measuring lunar lander weights on the Moon (g = 1.6 N/kg) vs on Earth (g = 9.8 N/kg).',
            'If an astronaut has a mass of 60 kg on Earth, what is their mass and weight on the Moon where gravity is 1.6 N/kg?',
            'Cambridge Checkpoint Science: Distinguishing mass and weight and drawing accurate force arrows on objects.'
          )
        ]
      }
    ]
  },
  {
    curriculum: 'BRITISH',
    grade: 8,
    subject: 'Science',
    code: '0893',
    trackPathway: 'CHECKPOINT',
    title: 'Cambridge Checkpoint Science Stage 8 Metro Line',
    stations: [
      {
        id: 'cie_y8_sci_u1',
        number: 1,
        title: '1.0 Human Biology & Ecosystems: Respiration & Food Webs',
        strand: 'Content Area 1: Biology',
        icon: '🫁',
        status: 'available',
        summary: 'Aerobic vs anaerobic respiration, human gas exchange system, ecosystems, food webs, and bioaccumulation of toxins.',
        subtopics: [
          stop(
            'cie_y8_sci_u1_1',
            '1.1 Aerobic Respiration, Gas Exchange & Energy Release',
            'Cellular Chemical Energy Release Inside Mitochondria',
            'Respiration is a chemical reaction inside cells that releases ATP energy; breathing is mechanical ventilation',
            'Aerobic respiration occurs inside cell mitochondria, combining glucose with oxygen to release chemical energy (ATP), producing carbon dioxide and water as waste products. The human gas exchange system (alveoli) provides a huge surface area, thin 1-cell walls, and rich blood capillary supply to maximize oxygen diffusion.',
            'Glucose + Oxygen → Carbon Dioxide + Water (+ Energy)  |  C6H12O6 + 6O2 → 6CO2 + 6H2O',
            '🫁 Alveoli Capillary Gas Exchange Model',
            'Athletic stamina training in high-altitude environments in the Kenyan Rift Valley.',
            'Why is it scientifically inaccurate to say that humans "breathe in oxygen and breathe out carbon dioxide"?',
            'Cambridge Checkpoint Science: Writing word equations for aerobic respiration and explaining how alveoli are adapted for diffusion.'
          )
        ]
      },
      {
        id: 'cie_y8_sci_u2',
        number: 2,
        title: '2.0 Chemical Reactions: Periodic Table, Elements & Compounds',
        strand: 'Content Area 2: Chemistry',
        icon: '⚗️',
        status: 'available',
        summary: 'Metals vs non-metals, Group 1 alkali metals, Group 7 halogens, word equations, conservation of mass, and exothermic reactions.',
        subtopics: [
          stop(
            'cie_y8_sci_u2_1',
            '2.1 Group 1 Alkali Metals & Group 7 Halogens Periodicity',
            'Chemical Reactivity Patterns in the Periodic Table',
            'Group 1 metals become more reactive down the group; Group 7 halogens become less reactive down the group',
            'Elements in the Periodic Table are arranged in order of atomic number. Group 1 alkali metals (Li, Na, K) have 1 outer electron which is lost easily during reactions; as atomic radius increases down the group, outer electrons are further from the nucleus and shielded, making them easier to lose and increasing reactivity.',
            'Group 1: Reactivity increases down  |  Group 7: Reactivity decreases down',
            '⚡ Alkali Metal Water Reaction Bath',
            'Sodium metal stored safely under mineral oil in chemistry laboratories to prevent reaction with atmospheric moisture.',
            'Why does potassium react violently with water, producing lilac flames, while lithium only fizzes gently on the surface?',
            'Cambridge Checkpoint Science: Predicting physical and chemical properties of elements from Periodic Table positions.'
          )
        ]
      },
      {
        id: 'cie_y8_sci_u3',
        number: 3,
        title: '3.0 Light and Sound: Reflection, Refraction & Wave Properties',
        strand: 'Content Area 3: Physics',
        icon: '🔦',
        status: 'available',
        summary: 'Ray model of light, law of reflection, refraction through glass blocks, dispersion into spectrum, sound pitch and amplitude.',
        subtopics: [
          stop(
            'cie_y8_sci_u3_1',
            '3.1 Ray Model of Light: Law of Reflection & Refraction Index',
            'Angles Measured to the Normal Line',
            'Angle of incidence (i) equals angle of reflection (r) on smooth mirror surfaces',
            'Light travels in straight lines. When a light ray strikes a plane mirror, the angle of incidence equals the angle of reflection, both measured from the normal (a line perpendicular to the surface at the point of contact). When passing from air into glass, light slows down and refracts towards the normal.',
            'Law of Reflection: Angle of Incidence (i) = Angle of Reflection (r)',
            '🪞 Ray Box & Mirror Normal Diagram',
            'Periscope mirrors in naval submarines and retroreflectors on bicycle pedals and road signs.',
            'If a light ray strikes a plane mirror at an angle of 35° to the mirror surface, what is the angle of reflection from the normal line?',
            'Cambridge Checkpoint Science: Drawing accurate normal lines and measuring angles of incidence and reflection.'
          )
        ]
      }
    ]
  },
  {
    curriculum: 'BRITISH',
    grade: 9,
    subject: 'Science',
    code: '0893',
    trackPathway: 'CHECKPOINT',
    title: 'Cambridge Checkpoint Science Stage 9 Metro Line',
    stations: [
      {
        id: 'cie_y9_sci_u1',
        number: 1,
        title: '1.0 Genes and Evolution: Inheritance, DNA & Natural Selection',
        strand: 'Content Area 1: Biology',
        icon: '🧬',
        status: 'available',
        summary: 'Chromosomes, genes, DNA double helix, environmental vs inherited variation, Charles Darwin\'s natural selection, and extinction.',
        subtopics: [
          stop(
            'cie_y9_sci_u1_1',
            '1.1 Natural Selection, Adaptations & Antibiotic Resistance',
            'Survival of the Fittest Through Heritable Genetic Variation',
            'Organisms with advantageous genetic variations are more likely to survive, reproduce, and pass on favorable alleles',
            'Within any population, random genetic mutations create phenotypic variation. When environmental selection pressures (predators, drought, diseases) arise, individuals with beneficial adaptations survive longer and reproduce more successfully (differential survival). Over many generations, the frequency of favorable alleles increases.',
            'Mutation → Phenotypic Variation → Selection Pressure → Differential Reproduction → Allele Frequency Shift',
            '🦒 Darwinian Natural Selection Flowchart',
            'Bacteria developing antibiotic resistance in hospital wards due to overuse and incomplete courses of antibiotics.',
            'How did peppered moths in industrial England demonstrate natural selection in action during the rise of coal pollution?',
            'Cambridge Checkpoint Science: Explaining natural selection step-by-step and linking it to environmental adaptations.'
          )
        ]
      },
      {
        id: 'cie_y9_sci_u2',
        number: 2,
        title: '2.0 Reactivity and Rates: The Reactivity Series & Displacement',
        strand: 'Content Area 2: Chemistry',
        icon: '💥',
        status: 'available',
        summary: 'Metal reactivity series, metal displacement reactions, extracting metals with carbon, and rates of reaction factors.',
        subtopics: [
          stop(
            'cie_y9_sci_u2_1',
            '2.1 Metal Displacement Reactions & The Reactivity Series',
            'More Reactive Metals Displace Less Reactive Metals from Compounds',
            'A metal will displace another metal from its salt solution only if it is higher in the reactivity series',
            'The reactivity series lists metals in order of their tendency to lose electrons and form positive ions: K > Na > Ca > Mg > Al > (C) > Zn > Fe > (H) > Cu > Ag > Au. A more reactive metal (e.g. zinc) placed into a copper(II) sulfate solution will displace copper, turning the blue solution colourless and depositing reddish-brown copper metal.',
            'Zn (s) + CuSO4 (aq) → ZnSO4 (aq) + Cu (s)',
            '🧪 Metal Displacement Color Change Tube',
            'Sacrificial zinc anodes protecting steel ship hulls and underground pipelines from marine corrosion.',
            'Why will adding a piece of copper wire to magnesium sulfate solution produce no reaction whatsoever?',
            'Cambridge Checkpoint Science: Predicting displacement reaction outcomes and writing word and symbol equations.'
          )
        ]
      },
      {
        id: 'cie_y9_sci_u3',
        number: 3,
        title: '3.0 Electricity & Energy: Series/Parallel Circuits & Ohm\'s Law',
        strand: 'Content Area 3: Physics',
        icon: '💡',
        status: 'available',
        summary: 'Current in series vs parallel circuits, potential difference, resistance (V=IR), electromagnets, and electrical energy resources.',
        subtopics: [
          stop(
            'cie_y9_sci_u3_1',
            '3.1 Series vs Parallel Circuits & Resistance (V = IR)',
            'Current Division & Voltage Distribution in Electrical Networks',
            'In parallel circuits, potential difference across each branch is identical; total current is the sum of branch currents',
            'Electric current (I) is the rate of flow of charge, measured in Amperes with an ammeter in series. Potential difference (V) is the work done per unit charge, measured in Volts with a voltmeter in parallel. In series circuits, current is identical everywhere. In parallel circuits, current splits across branches, and each branch receives full mains voltage.',
            'Resistance (R) = Voltage (V) / Current (I)  |  Parallel: V1 = V2 = V_total',
            '💡 Series vs Parallel Light Bulb Circuits',
            'Domestic home lighting where each light bulb operates independently on a parallel circuit.',
            'Why do all other lights in your house stay on when one light bulb in the kitchen burns out?',
            'Cambridge Checkpoint Science: Calculating current and voltage in parallel networks and applying V = IR.'
          )
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE LOWER SECONDARY MATHEMATICS (0862) — STAGES 7, 8, 9
  // ══════════════════════════════════════════════════════════════
  {
    curriculum: 'BRITISH',
    grade: 7,
    subject: 'Mathematics',
    code: '0862',
    trackPathway: 'CHECKPOINT',
    title: 'Cambridge Checkpoint Mathematics Stage 7 Metro Line',
    stations: [
      {
        id: 'bri_y7_math_s1',
        number: 1,
        title: '1.0 Number Theory: Primes, Factors & Venn Diagrams',
        strand: 'Content Area 1: Number',
        icon: '🔢',
        status: 'available',
        summary: 'Prime factorisation, HCF and LCM, directed numbers, and Venn diagrams for set intersections.',
        subtopics: [
          stop(
            'bri_y7_math_s1_1',
            '1.1 Prime Factor Decomposition, HCF & LCM with Venn Diagrams',
            'Expressing Integers as Unique Products of Primes',
            'Every composite number can be uniquely factorized into prime factors (Fundamental Theorem of Arithmetic)',
            'To find the Highest Common Factor (HCF) and Lowest Common Multiple (LCM) of two numbers, express each as a product of prime factors. Place common prime factors in the central intersection of a Venn diagram. HCF is the product of numbers in the intersection; LCM is the product of all numbers across both sets.',
            'HCF = Product of intersection primes  |  LCM = Product of all diagram primes',
            '🥧 Two-Set Venn Diagram with Prime Factors',
            'Synchronizing automated manufacturing cycles and scheduling traffic light sequence timings.',
            'How can you use the prime factorizations of 24 (2³ × 3) and 36 (2² × 3²) to find both their HCF and LCM in under 30 seconds?',
            'Cambridge Checkpoint 0862: Expressing numbers in index form as products of prime factors.'
          )
        ]
      },
      {
        id: 'bri_y7_math_s2',
        number: 2,
        title: '2.0 Algebra: Expressions, Formulae & Linear Equations',
        strand: 'Content Area 2: Algebra',
        icon: '📐',
        status: 'available',
        summary: 'Simplifying algebraic expressions, collecting like terms, expanding brackets, and solving linear equations.',
        subtopics: [
          stop(
            'bri_y7_math_s2_1',
            '2.1 Solving Two-Step Linear Equations & Balancing Inverse Operations',
            'Systematic Equation Balancing',
            'Whatever operation you apply to one side of an equation, apply identically to the other side',
            'An equation is a balanced statement with an equals sign. To solve for an unknown variable x, reverse operations in reverse BODMAS order: undo addition or subtraction first, then undo multiplication or division to isolate the variable.',
            'ax + b = c → ax = c - b → x = (c - b) / a',
            '⚖️ Two-Pan Equation Balance Scale',
            'Calculating unknown charges on utility bills and solving unit cost accounting problems.',
            'In the equation 3x - 7 = 14, why must you add 7 to both sides before dividing by 3?',
            'Cambridge Checkpoint 0862: Solving equations with brackets and fractional terms.'
          )
        ]
      },
      {
        id: 'bri_y7_math_s3',
        number: 3,
        title: '3.0 Geometry & Measure: Angles, Parallel Lines & Polygons',
        strand: 'Content Area 3: Geometry & Measure',
        icon: '📐',
        status: 'available',
        summary: 'Angles at a point, on a straight line, alternate and corresponding angles on parallel lines, and triangle angle sum.',
        subtopics: [
          stop(
            'bri_y7_math_s3_1',
            '3.1 Angle Properties of Parallel Lines: Alternate & Corresponding',
            'Z-Angles, F-Angles and Co-Interior Angle Relationships',
            'Alternate angles form a Z and are equal; corresponding angles form an F and are equal',
            'When a transversal line intersects two parallel lines, three key angle relationships are formed: (1) Corresponding angles (F-angles) are equal. (2) Alternate angles (Z-angles) are equal. (3) Co-interior angles (C-angles) sum to 180°.',
            'Alternate Angles = Equal  |  Corresponding Angles = Equal  |  Co-Interior Sum = 180°',
            '📐 Parallel Transversal Angle Map',
            'Architectural roof truss triangulation and railway track alignment engineering.',
            'If two parallel lines are crossed by a transversal and one interior angle is 68°, what is its co-interior companion angle?',
            'Cambridge Checkpoint 0862: Citing correct geometric reasons when finding missing angles.'
          )
        ]
      }
    ]
  },
  {
    curriculum: 'BRITISH',
    grade: 8,
    subject: 'Mathematics',
    code: '0862',
    trackPathway: 'CHECKPOINT',
    title: 'Cambridge Checkpoint Mathematics Stage 8 Metro Line',
    stations: [
      {
        id: 'bri_y8_math_s1',
        number: 1,
        title: '1.0 Number: Laws of Indices & Standard Form',
        strand: 'Content Area 1: Number',
        icon: '🔢',
        status: 'available',
        summary: 'Multiplication and division index laws, zero index, powers of 10, and scientific standard form (A × 10ⁿ).',
        subtopics: [
          stop(
            'bri_y8_math_s1_1',
            '1.1 Standard Form & Laws of Indices for Integer Powers',
            'Scientific Notation for Extreme Astronomical and Microscopic Quantities',
            'Standard form expresses numbers as A × 10ⁿ where 1 ≤ A < 10 and n is an integer',
            'Indices represent repeated multiplication: aᵐ × aⁿ = aᵐ⁺ⁿ, aᵐ ÷ aⁿ = aᵐ⁻ⁿ, and (aᵐ)ⁿ = aᵐⁿ. Any nonzero number raised to power 0 equals 1. Standard form writes very large or very small numbers compactly in the format A × 10ⁿ, facilitating calculations without trailing zeroes.',
            'aᵐ × aⁿ = aᵐ⁺ⁿ  |  a⁰ = 1  |  A × 10ⁿ  where 1 ≤ A < 10',
            '🌌 Standard Form Scale (Nanometres to Light Years)',
            'Calculating distance to distant galaxies in astrophysics and diameter of viruses in molecular nanotechnology.',
            'Why is 45 × 10⁶ not considered to be written in correct standard scientific form, and how should it be correctly written?',
            'Cambridge Checkpoint 0862: Multiplying and dividing numbers in standard form without calculator.'
          )
        ]
      },
      {
        id: 'bri_y8_math_s2',
        number: 2,
        title: '2.0 Algebra: Linear Graphs & Gradient (y = mx + c)',
        strand: 'Content Area 2: Algebra',
        icon: '📈',
        status: 'available',
        summary: 'Cartesian coordinates, gradient m = (y2-y1)/(x2-x1), y-intercept c, plotting straight lines, and parallel gradients.',
        subtopics: [
          stop(
            'bri_y8_math_s2_1',
            '2.1 Slope-Intercept Form: Gradient (m) & Y-Intercept (c)',
            'Geometric Meaning of Linear Equations',
            'm represents steepness (rise over run); c represents vertical axis crossing point (0, c)',
            'The linear equation y = mx + c defines a straight line. The gradient m measures the rate of vertical rise divided by horizontal run: m = (y2 - y1) / (x2 - x1). Positive m slopes upwards from left to right; negative m slopes downwards. Parallel lines share identical gradients.',
            'Gradient m = (y2 - y1) / (x2 - x1)  |  y = mx + c',
            '📈 Coordinate Grid Slope Triangle',
            'Interpreting fixed charges and per-kilometer rates on transport taxi fare meters.',
            'What is the gradient of a horizontal line parallel to the x-axis, and what is the gradient of a vertical line?',
            'Cambridge Checkpoint 0862: Finding the equation of a straight line from a given Cartesian graph.'
          )
        ]
      },
      {
        id: 'bri_y8_math_s3',
        number: 3,
        title: '3.0 Geometry & Measure: Bearings & Scale Drawings',
        strand: 'Content Area 3: Geometry & Measure',
        icon: '🧭',
        status: 'available',
        summary: '3-figure bearings from North, scale diagrams, map scales (1:50,000), circles (circumference & area), and prism volumes.',
        subtopics: [
          stop(
            'bri_y8_math_s3_1',
            '3.1 Three-Figure Bearings & Back Bearings Calculation',
            'Clockwise Angular Navigation from True North',
            'Bearings must be measured clockwise from North and written with 3 digits (e.g. 045°)',
            'Bearings specify directions for navigation: (1) Measured from North. (2) Clockwise direction. (3) Written with 3 figures (e.g. 072°, 215°). The back bearing (reverse bearing) is found by adding 180° if the forward bearing is less than 180°, or subtracting 180° if it is greater than 180°.',
            'Back Bearing = Forward Bearing ± 180°',
            '🧭 Compass Rose with 3-Figure Bearings',
            'Aircraft pilots navigating approach vectors into Jomo Kenyatta International Airport.',
            'If a ship sails on a bearing of 078° from Port A to Port B, on what bearing must it sail to return from Port B to Port A?',
            'Cambridge Checkpoint 0862: Constructing accurate scale drawings using protractor and ruler.'
          )
        ]
      }
    ]
  },
  {
    curriculum: 'BRITISH',
    grade: 9,
    subject: 'Mathematics',
    code: '0862',
    trackPathway: 'CHECKPOINT',
    title: 'Cambridge Checkpoint Mathematics Stage 9 Metro Line',
    stations: [
      {
        id: 'bri_y9_math_s1',
        number: 1,
        title: '1.0 Number: Fractional & Negative Indices & Rational Numbers',
        strand: 'Content Area 1: Number',
        icon: '🔢',
        status: 'available',
        summary: 'Negative indices (a⁻ⁿ = 1/aⁿ), fractional indices (a^(1/n) = ⁿ√a), bounds, and percentage increase/decrease.',
        subtopics: [
          stop(
            'bri_y9_math_s1_1',
            '1.1 Negative & Fractional Indices Evaluation',
            'Roots and Reciprocals in Exponential Notation',
            'Negative index means reciprocal; fractional index denominator indicates the root degree',
            'Negative indices represent reciprocals: a⁻ⁿ = 1 / aⁿ (e.g. 5⁻² = 1/25). Fractional indices represent roots: a^(1/n) = ⁿ√a, and a^(m/n) = (ⁿ√a)ᵐ (e.g. 27^(2/3) = (∛27)² = 3² = 9). These rules unify roots and powers under one coherent algebraic framework.',
            'a⁻ⁿ = 1 / aⁿ  |  a^(m/n) = (ⁿ√a)ᵐ  |  (a/b)⁻ⁿ = (b/a)ⁿ',
            '🔢 Root and Reciprocal Number Tree',
            'Calculating radioactive half-life fractions and compound depreciation asset valuations.',
            'What is the exact fractional value of 16^(-3/4) evaluated without using a calculator?',
            'Cambridge Checkpoint 0862: Evaluating numerical expressions involving negative and fractional powers.'
          )
        ]
      },
      {
        id: 'bri_y9_math_s2',
        number: 2,
        title: '2.0 Algebra: Simultaneous Equations & Quadratic Factorisation',
        strand: 'Content Area 2: Algebra',
        icon: '📐',
        status: 'available',
        summary: 'Simultaneous linear equations (elimination & substitution), factorising monic quadratics x²+bx+c, and subject of formula.',
        subtopics: [
          stop(
            'bri_y9_math_s2_1',
            '2.1 Solving Simultaneous Linear Equations by Elimination & Substitution',
            'Finding Coordinates of Line Intersection',
            'Multiply one or both equations to match coefficients, then add or subtract to eliminate one variable',
            'Simultaneous linear equations have two variables that satisfy both equations simultaneously. The elimination method scales equations so the coefficients of x or y match: if signs match, subtract; if signs differ, add. The substitution method expresses one variable in terms of the other and substitutes into the second equation.',
            'ax + by = c  and  dx + ey = f  → (x, y) intersection',
            '⚖️ Simultaneous Equation Algebraic Balancing',
            'Determining break-even quantities where production cost equals revenue in business planning.',
            'When using elimination to solve 2x + 3y = 12 and 5x - 3y = 9, why should you add the two equations together instead of subtracting?',
            'Cambridge Checkpoint 0862: Setting up and solving pairs of simultaneous equations from word problems.'
          )
        ]
      },
      {
        id: 'bri_y9_math_s3',
        number: 3,
        title: '3.0 Geometry: Pythagoras\' Theorem & Trigonometry (SOH CAH TOA)',
        strand: 'Content Area 3: Geometry & Trigonometry',
        icon: '📐',
        status: 'available',
        summary: 'Pythagoras\' theorem (a²+b²=c²), sine, cosine, tangent in right-angled triangles, angles of elevation and depression.',
        subtopics: [
          stop(
            'bri_y9_math_s3_1',
            '3.1 Pythagoras\' Theorem & SOH CAH TOA in Right-Angled Triangles',
            'Connecting Sides and Angles in Right Triangles',
            'sin(θ) = Opp/Hyp, cos(θ) = Adj/Hyp, tan(θ) = Opp/Adj',
            'In any right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides (a² + b² = c²). Trigonometric ratios relate acute angles to side length ratios: Sine = Opposite / Hypotenuse, Cosine = Adjacent / Hypotenuse, Tangent = Opposite / Adjacent.',
            'a² + b² = c²  |  sin θ = O/H  |  cos θ = A/H  |  tan θ = O/A',
            '📐 SOH CAH TOA Right Triangle Model',
            'Measuring heights of tall trees or buildings using inclinometer angles of elevation.',
            'A 10-meter ladder leans against a vertical wall, making a 60° angle with the ground. Which trigonometric ratio gives the height the ladder reaches on the wall?',
            'Cambridge Checkpoint 0862: Selecting the correct trigonometric ratio to find unknown sides and angles.'
          )
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // CAMBRIDGE LOWER SECONDARY ENGLISH (0861) — STAGES 7, 8, 9
  // ══════════════════════════════════════════════════════════════
  {
    curriculum: 'BRITISH',
    grade: 7,
    subject: 'English',
    code: '0861',
    trackPathway: 'CHECKPOINT',
    title: 'Cambridge Checkpoint English Stage 7 Metro Line',
    stations: [
      {
        id: 'cie_y7_eng_u1',
        number: 1,
        title: '1.0 Reading: Explicit vs Implicit Meaning & Narrative Devices',
        strand: 'Unit 1: Reading',
        icon: '📖',
        status: 'available',
        summary: 'Identifying facts vs inferences, characterisation, setting, sensory imagery, and authorial intention in prose.',
        subtopics: [
          stop(
            'cie_y7_eng_u1_1',
            '1.1 Explicit Comprehension & Deductive Inference',
            'Reading Between the Lines for Subtext',
            'Explicit meaning is directly stated; implicit meaning requires deduction from clues and context',
            'Comprehension requires distinguishing between what a writer states explicitly on the page and what is implied through word choice, character actions, and tone. When asked for implicit meaning, quote precise evidence and explain the logical inference.',
            'Point + Evidence (Quote) + Explanation of Subtext',
            '🔍 Detective Inference Magnifying Glass',
            'Analyzing editorial articles and courtroom witness statements for underlying biases.',
            'How does an author imply that a character is nervous without ever writing the word "nervous"?',
            'Cambridge Checkpoint 0861: Explaining how specific words create atmosphere and convey implied attitude.'
          )
        ]
      },
      {
        id: 'cie_y7_eng_u2',
        number: 2,
        title: '2.0 Writing: Narrative Architecture & Sentence Variety',
        strand: 'Unit 2: Writing',
        icon: '✍️',
        status: 'available',
        summary: 'Exposition, rising action, climax, resolution, sensory descriptions, dialogue punctuation, and paragraphing.',
        subtopics: [
          stop(
            'cie_y7_eng_u2_1',
            '2.1 Narrative Structure & Dynamic Pacing',
            'Freytag\'s Pyramid and Controlling Tension',
            'Vary sentence lengths: short sentences accelerate pace and shock; complex sentences build rich sensory immersion',
            'Compelling stories use structured plot progression: exposition establishes characters and setting; inciting incident triggers conflict; rising action builds suspense toward the climax; falling action and resolution resolve tension.',
            'Exposition → Inciting Incident → Rising Action → Climax → Resolution',
            '📈 Narrative Tension Arc Curve',
            'Writing engaging short stories and narrative travel journalism essays.',
            'Why does an author switch to abrupt, single-clause sentences during moments of high action or danger?',
            'Cambridge Checkpoint 0861: Using varied sentence openings and accurate dialogue punctuation.'
          )
        ]
      }
    ]
  },
  {
    curriculum: 'BRITISH',
    grade: 8,
    subject: 'English',
    code: '0861',
    trackPathway: 'CHECKPOINT',
    title: 'Cambridge Checkpoint English Stage 8 Metro Line',
    stations: [
      {
        id: 'cie_y8_eng_u1',
        number: 1,
        title: '1.0 Reading: Rhetorical Analysis & Persuasive Devices',
        strand: 'Unit 1: Reading',
        icon: '📖',
        status: 'available',
        summary: 'Rhetorical questions, emotive language, hyperbole, statistics, rule of three, and evaluating bias in speeches.',
        subtopics: [
          stop(
            'cie_y8_eng_u1_1',
            '1.1 Persuasive Rhetoric & Authorial Viewpoint',
            'The Art of Persuasion: Ethos, Pathos, and Logos',
            'Persuasive writers strategically blend emotional appeal (pathos), authority (ethos), and logical data (logos)',
            'Non-fiction and persuasive texts employ rhetorical devices to sway audiences: rhetorical questions engage the reader\'s conscience, emotive vocabulary triggers sympathy or indignation, while triplets (rule of three) make slogans memorable.',
            'Persuasion = Ethos (Credibility) + Pathos (Emotion) + Logos (Logic)',
            '🏛️ The Rhetorical Triangle',
            'Analyzing public health campaigns, environmental speeches, and advocacy journalism.',
            'Why is a speech that combines both factual statistics and personal emotional anecdotes more persuasive than statistics alone?',
            'Cambridge Checkpoint 0861: Analyzing how writers use persuasive language techniques to influence reader opinions.'
          )
        ]
      },
      {
        id: 'cie_y8_eng_u2',
        number: 2,
        title: '2.0 Writing: Argumentative Essays & Formal Register',
        strand: 'Unit 2: Writing',
        icon: '✍️',
        status: 'available',
        summary: 'Thesis statements, topic sentences, counter-arguments, refutation, formal discourse markers, and concluding impact.',
        subtopics: [
          stop(
            'cie_y8_eng_u2_1',
            '2.1 Argumentative Essay Architecture & Counter-Argument Refutation',
            'Balancing Multiple Perspectives with Cohesive Transitions',
            'Introduce opposing viewpoints fairly before systematically dismantling them with superior evidence',
            'Argumentative writing presents a reasoned stance on controversial issues. A strong essay begins with a clear thesis statement, supports arguments with evidence in structured paragraphs (PEEL: Point, Evidence, Explanation, Link), acknowledges counter-arguments, and refutes them with logic.',
            'Introduction (Thesis) → Argument 1 → Argument 2 → Counter-Argument & Rebuttal → Conclusion',
            '⚖️ Argumentative Weight Scale Diagram',
            'Writing formal policy recommendations, debates, and editorial columns.',
            'Why does acknowledging and refuting a counter-argument strengthen an essay more than ignoring opposing views?',
            'Cambridge Checkpoint 0861: Writing balanced arguments with formal vocabulary and varied connective discourse markers.'
          )
        ]
      }
    ]
  },
  {
    curriculum: 'BRITISH',
    grade: 9,
    subject: 'English',
    code: '0861',
    trackPathway: 'CHECKPOINT',
    title: 'Cambridge Checkpoint English Stage 9 Metro Line',
    stations: [
      {
        id: 'cie_y9_eng_u1',
        number: 1,
        title: '1.0 Reading: Critical Literary Evaluation & Comparing Texts',
        strand: 'Unit 1: Reading',
        icon: '📖',
        status: 'available',
        summary: 'Comparative textual analysis, structural analysis, motif tracking, analyzing subtext, and evaluating synthesis.',
        subtopics: [
          stop(
            'cie_y9_eng_u1_1',
            '1.1 Comparative Analysis & Synthesis of Dual Perspectives',
            'Comparing Thematic Treatments Across Diverse Genres',
            'Synthesize points of comparison (similarities and contrasts) using comparative connective signposts',
            'Stage 9 readers analyze two texts addressing a common theme. Comparative essays weave discussions of both texts within each paragraph, contrasting tone, stylistic choices, and structural choices rather than writing two separate unconnected reviews.',
            'Comparative Matrix: Theme X in Text A vs Theme X in Text B',
            '🔄 Comparative Venn Synthesis Framework',
            'Reviewing historical memoirs alongside modern documentary accounts of global events.',
            'What comparative connectives are most effective for contrasting subtle differences between two authors\' attitudes?',
            'Cambridge Checkpoint 0861: Synthesizing information and comparing stylistic effects across two unseen passages.'
          )
        ]
      },
      {
        id: 'cie_y9_eng_u2',
        number: 2,
        title: '2.0 Writing: Discursive Writing & Stylistic Sophistication',
        strand: 'Unit 2: Writing',
        icon: '✍️',
        status: 'available',
        summary: 'Explorative and discursive writing, subtle nuance, varied registers, rhetorical sophistication, and polished syntax.',
        subtopics: [
          stop(
            'cie_y9_eng_u2_1',
            '2.1 Discursive Exploratory Writing & Register Precision',
            'Nuanced Examination of Complex Contemporary Topics',
            'Discursive essays explore multiple facets of an issue with impartiality before reaching a judicious synthesis',
            'Unlike argumentative writing that seeks to persuade the reader to one side, discursive writing explores various dimensions of a topic with intellectual curiosity and balance. Sophisticated vocabulary, semicolon-linked clauses, and rhetorical maturity distinguish top-band responses.',
            'Exploratory Question → Perspective A Analysis → Perspective B Analysis → Synthesis & Judgment',
            '🧭 Multi-Directional Discursive Compass',
            'Drafting thought leadership articles, ethical technology critiques, and philosophical inquiry essays.',
            'How does discursive writing differ in tone and intent from persuasive argumentative writing?',
            'Cambridge Checkpoint 0861: Demonstrating mature control of register, vocabulary, and syntactic complexity.'
          )
        ]
      }
    ]
  }
];

module.exports = BRITISH_CAIE_MAPS;
