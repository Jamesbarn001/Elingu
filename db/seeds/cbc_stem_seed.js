// ══════════════════════════════════════════════════════════════
// KICD CBC STEM SEED DATA (Grades 6–10)
// Official KICD Rationalized Strands & Sub-strands for:
// - Grade 10 Biology (3 Strands, 10 Sub-strands)
// - Grade 10 Computer Studies (3 Strands, 17 Sub-strands)
// - Grade 10 Chemistry (3 Strands, 8 Sub-strands)
// - Grade 10 Physics (4 Strands, 13 Sub-strands)
// - Grades 6–9 Science & Technology / Integrated Science
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

const CBC_STEM_MAPS = [
  // ────────────────────────────────────────────────────────────
  // KICD GRADE 10 BIOLOGY (Exact Official KICD Table: 3 Strands, 10 Sub-strands)
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Biology',
    code: 'BIO-G10',
    trackPathway: 'STEM',
    title: 'CBE Grade 10 (Senior STEM) Biology Metro Line',
    stations: [
      {
        id: 'cbc_g10_bio_s1',
        number: 1,
        title: '1.0 Cell Biology and Biodiversity',
        strand: 'Strand 1.0: Cell Biology and Biodiversity',
        icon: '🔬',
        status: 'available',
        summary: 'Introduction to Biology, scientific investigations, cell structure, specialization, osmosis, and chemicals of life.',
        subtopics: [
          stop(
            'cbc_g10_bio_s1_0',
            '1.1 Introduction to Biology & Branches of Life Sciences',
            'The Science of Living Systems',
            'From molecular genetics to East African savannah ecology',
            'Biology investigates the structure, function, growth, origin, evolution, and distribution of living organisms. Key branches include Botany, Zoology, Genetics, Ecology, Microbiology, and Biotechnology—forming the foundation of medicine, agriculture, and conservation.',
            'Characteristics of Life: Nutrition • Respiration • Excretion • Growth • Reproduction • Irritability • Movement',
            '🌿 Tree of Biological Sciences',
            'Applying biotechnology at KALRO (Kenya Agricultural and Livestock Research Organization) to breed drought-resistant maize.',
            'Why is a virus considered to be on the borderline between living and non-living things?',
            'KSSEA Biology Section A: Relating specialized branches of biology to careers in health, agriculture, and environmental management.'
          ),
          stop(
            'cbc_g10_bio_s1_2',
            '1.2 Scientific Investigations & Microscopy in Biology',
            'Magnification, Resolution & Controlled Inquiry',
            'Seeing the invisible world with calibrated lenses and fair tests',
            'Biological investigations follow the scientific method: observation, hypothesis, controlled experiment, data collection, and conclusion. Light microscopes use glass lenses to magnify specimens, while electron microscopes use electron beams for high-resolution ultrastructure.',
            'Magnification (M) = Image Size (I) ÷ Actual Size (A)  |  1 mm = 1,000 μm',
            '🔬 Light & Electron Microscope Scale',
            'Diagnosing malaria parasites (Plasmodium) in blood smears at county referral hospital laboratories.',
            'If a plant cell measures 50 μm in reality and appears 25 mm long in a drawing, what is the linear magnification of the drawing?',
            'KSSEA Biology Practical: Converting millimetres to micrometres (×1000) before applying M = I / A.'
          ),
          stop(
            'cbc_g10_bio_s1_1',
            '1.3 Cell Structure, Specialization & Cell Physiology (Osmosis)',
            'The Net Movement of Free Water Molecules',
            'Water moves down its water potential gradient across a selectively permeable membrane',
            'Cells are the basic structural and functional units of life. Organelles like mitochondria (ATP synthesis), chloroplasts (photosynthesis), and ribosomes (protein synthesis) perform specialized roles. Across the selectively permeable cell membrane, water moves by osmosis from a dilute solution (high water potential) to a concentrated solution (low water potential).',
            'Water Potential (Ψ) = Solute Potential (Ψs) + Pressure Potential (Ψp)',
            '💧 Selective Osmotic Membrane Chamber',
            'Sukuma wiki (kale) leaves wilting in hot afternoon sun and crisping back up when sprinkled with fresh water by Mama Mboga.',
            'Why does a freshwater tilapia placed in salty ocean water dehydrate and die even though it is surrounded by water?',
            'KSSEA Biology Practical: Explaining percentage changes in length and mass of potato cylinders in varying sucrose concentrations.',
            [
              'Step 1: Compare water potentials: High water potential (dilute/hypotonic) vs Low water potential (concentrated/hypertonic).',
              'Step 2: Water flows from high to low water potential through selectively permeable cell membranes.',
              'Step 3: Plant cells become turgid in pure water or plasmolysed in concentrated solution; animal cells haemolyse or crenate.'
            ],
            'Potato cylinder experiment: A cylinder in distilled water gains mass and becomes firm (turgid). A cylinder in 20% sucrose loses mass and becomes limp (plasmolysed).'
          ),
          stop(
            'cbc_g10_bio_s1_4',
            '1.4 Chemicals of Life: Carbohydrates, Lipids, Proteins & Enzymes',
            'Biological Macromolecules & Catalytic Specificity',
            'Enzymes lower activation energy via complementary active-site geometry',
            'Living tissues are built from carbohydrates (monosaccharides, disaccharides, polysaccharides), lipids (triglycerides and phospholipids), proteins (amino acid chains), water, and nucleic acids. Enzymes are biological catalysts made of globular proteins whose 3D active site matches a specific substrate (Lock-and-Key model) and denatures at extreme temperature or pH.',
            'Enzyme (E) + Substrate (S) ⇌ ES Complex → Enzyme (E) + Product (P)',
            '🔐 Enzyme Lock-and-Key Denaturation Curve',
            'Using papain enzymes from pawpaw leaves to tenderize nyama choma meat and testing food nutrients in school practicals.',
            'Why does boiling salivary amylase at 100°C permanently stop it from digesting starch even after you cool the tube back to 37°C?',
            'KSSEA Biology Practical: Food test reagents—Iodine (starch → blue-black), Benedict\'s (reducing sugars → brick-red), Biuret (proteins → purple).'
          )
        ]
      },
      {
        id: 'cbc_g10_bio_s2',
        number: 2,
        title: '2.0 Anatomy and Physiology of Plants',
        strand: 'Strand 2.0: Anatomy and Physiology of Plants',
        icon: '🌿',
        status: 'available',
        summary: 'Autotrophic nutrition in plants, leaf adaptations, xylem/phloem transport, transpiration, and plant respiration.',
        subtopics: [
          stop(
            'cbc_g10_bio_s2_1',
            '2.1 Nutrition in Plants: Photosynthesis & Leaf Adaptations',
            'Solar Energy Capture in Chloroplasts',
            'Light stage splits water in grana; Dark stage fixes carbon dioxide in stroma',
            'Photosynthesis converts light energy into chemical bond energy in glucose. During the Light-Dependent Stage in the granum, chlorophyll absorbs photons to split water (photolysis) into H⁺ ions, ATP, and O₂ gas. In the Light-Independent (Carbon Fixation) Stage in the stroma, H⁺ and ATP reduce CO₂ into simple sugars.',
            '6CO₂ + 6H₂O ⎯[Light & Chlorophyll]→ C₆H₁₂O₆ + 6O₂',
            '🍃 Leaf Cross-Section & Chloroplast Grana',
            'Maximizing tea bush yields in Kericho and greenhouse vegetable production in Naivasha.',
            'Why are palisade mesophyll cells packed vertically near the upper epidermis of a leaf while spongy mesophyll cells have large air spaces below?',
            'KSSEA Biology Paper 1: Distinguishing photolysis in the grana from carbon dioxide fixation in the stroma.'
          ),
          stop(
            'cbc_g10_bio_s2_2',
            '2.2 Transport in Plants: Xylem, Phloem & Transpiration Pull',
            'Vascular Bundles & Cohesive Water Columns',
            'Xylem pulls water upward by transpiration; Phloem translocates sugars bidirectionally',
            'Roots absorb water by osmosis and mineral ions by active transport through root hair cells. Xylem vessels are dead, lignified hollow tubes that conduct water upward driven by transpiration pull, cohesion-adhesion forces, and root pressure. Phloem sieve tubes are living cells with companion cells that translocate manufactured sucrose from leaves to sinks.',
            'Transpiration Rate ∝ Temperature, Wind Speed, Light  |  Inversely ∝ Humidity',
            '🌱 Potometer & Vascular Bundle Diagram',
            'Xerophytic adaptations of acacia and baobab trees surviving prolonged dry seasons in Turkana and Tsavo.',
            'Why does a bubble in a potometer move faster on a windy, sunny afternoon than on a calm, humid morning?',
            'KSSEA Biology Practical: Setting up a potometer under water to prevent airlocks in xylem vessels.'
          ),
          stop(
            'cbc_g10_bio_s2_3',
            '2.3 Gaseous Exchange and Respiration in Plants',
            'Stomatal Guard Cells, Lenticels & Cellular ATP',
            'Turgor changes in bean-shaped guard cells regulate stomatal aperture',
            'Plants exchange gases through stomata on leaves, lenticels on woody stems, and epidermis of roots. Guard cells have thicker inner cellulose walls; when they accumulate K⁺ ions and sugar, water enters by osmosis, making them turgid and curving open the stoma. Plants respire continuously day and night to generate ATP.',
            'Aerobic: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + 38 ATP  |  Anaerobic (Plants): C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + 2 ATP',
            '👄 Guard Cell Turgor Aperture Model',
            'Waterlogged maize roots switching to anaerobic respiration and producing ethanol that can damage root tissues.',
            'Why do most terrestrial plants in hot Kenyan lowlands close their stomata at midday even though sunshine is at its peak?',
            'KSSEA Biology Section B: Explaining the potassium ion (K⁺) and osmotic mechanism of stomatal opening and closing.'
          )
        ]
      },
      {
        id: 'cbc_g10_bio_s3',
        number: 3,
        title: '3.0 Anatomy and Physiology of Animals',
        strand: 'Strand 3.0: Anatomy and Physiology of Animals',
        icon: '🫀',
        status: 'available',
        summary: 'Holozoic nutrition, mammalian dentition, enzymatic digestion, circulatory systems, and gaseous exchange in animals.',
        subtopics: [
          stop(
            'cbc_g10_bio_s3_1',
            '3.1 Nutrition in Animals: Mammalian Dentition & Human Digestion',
            'Mechanical Breakdown, Peristalsis & Villi Absorption',
            'Specialized teeth and pH-specific enzymes dismantle complex food into absorbable monomers',
            'Herbivores, carnivores, and omnivores exhibit specialized dental formulas (incisors, canines, premolars, molars). In the human alimentary canal, salivary amylase begins starch digestion in the mouth (pH 7), pepsin digests proteins in the acidic stomach (pH 2 via HCl), and pancreatic enzymes (amylase, trypsin, lipase) plus bile salts act in the duodenum. Digested nutrients are absorbed across the microvilli of the ileum.',
            'Dental Formula (Adult Human): I 2/2, C 1/1, PM 2/2, M 3/3 = 32 teeth',
            '🦷 Mammalian Skull Dentition & Ileum Villus',
            'Comparing the diastema and ridged molars of a grazing cow in Nakuru with the carnassial teeth of a Tsavo lion.',
            'How does the ileum maximize the rate of absorption of glucose and amino acids into the hepatic portal vein?',
            'KSSEA Biology Essay: Tracing the complete enzymatic digestion and absorption of a meal of ugali (starch) and sukuma wiki with beef (protein & lipid).'
          ),
          stop(
            'cbc_g10_bio_s3_2',
            '3.2 Transport in Animals: Mammalian Heart & Double Circulation',
            'High-Pressure Systemic & Low-Pressure Pulmonary Loops',
            'Blood passes through the four-chambered heart twice per complete body circuit',
            'Mammals possess a closed double circulatory system. Deoxygenated blood enters the right atrium via the vena cava, passes through the tricuspid valve to the right ventricle, and is pumped to the lungs via the pulmonary artery. Oxygenated blood returns via the pulmonary vein to the left atrium, passes through the bicuspid valve into the thick-walled left ventricle, and is pumped through the aorta to the body.',
            'Cardiac Output = Heart Rate (beats/min) × Stroke Volume (mL/beat)',
            '🫀 Four-Chamber Mammalian Heart & Oxygen Dissociation',
            'High-altitude red blood cell and haemoglobin adaptations in elite Kenyan marathon runners training in Iten.',
            'Why is the muscular myocardium wall of the left ventricle three times thicker than that of the right ventricle?',
            'KSSEA Biology Paper 1: Distinguishing arteries, veins, and capillaries, and explaining blood clotting via prothrombin → thrombin → fibrin.'
          ),
          stop(
            'cbc_g10_bio_s3_3',
            '3.3 Gaseous Exchange and Respiration in Animals',
            'Counter-Current Gill Flow, Tracheoles & Alveolar Diffusion',
            'Thin, moist, richly vascularized respiratory surfaces maximize Fick\'s Law diffusion',
            'Insects use spiracles and tracheoles; bony fish use gill filaments with counter-current blood flow to maintain a steep concentration gradient across the entire lamella; mammals use millions of alveoli ventilated by the diaphragm and intercostal muscles. During inhalation, external intercostal muscles contract, the diaphragm flattens, thoracic volume increases, and pressure drops below atmospheric pressure.',
            'Fick\'s Law: Diffusion Rate ∝ (Surface Area × ΔConcentration) ÷ Membrane Thickness',
            '🫁 Alveolar Capillary Gas Exchange & Ribcage Bell-Jar',
            'Understanding how counter-current flow in Lake Victoria Nile perch gills extracts over 80% of dissolved oxygen from water.',
            'Why is counter-current flow of blood and water across fish gills far more efficient than parallel flow?',
            'KSSEA Biology Structured Item: Comparing the mechanics of inhalation and exhalation in the mammalian ribcage and diaphragm.'
          )
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // KICD GRADE 10 COMPUTER STUDIES (Exact Official KICD Table: 3 Strands, 17 Sub-strands)
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Computer Studies',
    code: 'COMP-G10',
    trackPathway: 'STEM',
    title: 'CBE Grade 10 (Senior STEM) Computer Studies Metro Line',
    stations: [
      {
        id: 'cbc_g10_comp_s1',
        number: 1,
        title: '1.0 Foundation of Computer Studies',
        strand: 'Strand 1.0: Foundation of Computer Studies',
        icon: '🖥️',
        status: 'available',
        summary: 'Evolution of computers, von Neumann architecture, I/O devices, storage, CPU Fetch-Decode-Execute cycle, OS, and setup.',
        subtopics: [
          stop(
            'cbc_g10_comp_s1_1_evo',
            '1.1 Evolution of Computers',
            'From Mechanical Abacus to Fifth-Generation AI Systems',
            'Each hardware generation shrunk transistor geometry while multiplying processing speed',
            'Computing evolved from mechanical calculators (Pascaline, Babbage\'s Analytical Engine) through five electronic generations: 1st Gen (Vacuum Tubes, ENIAC), 2nd Gen (Transistors), 3rd Gen (Integrated Circuits), 4th Gen (VLSI Microprocessors), and 5th Gen (ULSI, Parallel Processing & Artificial Intelligence).',
            'Vacuum Tubes (1G) → Transistors (2G) → ICs (3G) → Microprocessors (4G) → AI/Quantum (5G)',
            '🕰️ Five Generations Hardware Timeline',
            'Tracing how mobile banking in Kenya evolved from mainframe bank ledgers to smartphone USSD and AI fraud detection.',
            'Why did replacing vacuum tubes with solid-state transistors dramatically reduce both heat dissipation and computer room size?',
            'KSSEA Computer Studies: Comparing power consumption, reliability, and switching speed across the five generations.'
          ),
          stop(
            'cbc_g10_comp_s1_2',
            '1.2 Computer Architecture',
            'The von Neumann Stored-Program Blueprint',
            'Instructions and data share a common memory space connected by system buses',
            'Modern computers use the von Neumann architecture comprising the Central Processing Unit (Control Unit, Arithmetic Logic Unit, Registers), Main Memory (RAM/ROM), Input/Output interfaces, and the three system buses: Address Bus (unidirectional), Data Bus (bidirectional), and Control Bus.',
            'System Bus = Address Bus (Location) + Data Bus (Payload) + Control Bus (Timing/R-W)',
            '🏛️ von Neumann Bus Architecture Diagram',
            'Understanding why widening a computer\'s data bus from 32-bit to 64-bit doubles the volume of data moved per clock tick.',
            'Why is the Address Bus strictly unidirectional while the Data Bus must be bidirectional?',
            'KSSEA Computer Studies Paper 1: Drawing and labeling the von Neumann architecture and bus directions.'
          ),
          stop(
            'cbc_g10_comp_s1_3',
            '1.3 Input/Output (I/O) Devices',
            'Bridging Human Signals and Binary Machine Logic',
            'Input transducers digitize physical events; output actuators render binary results',
            'Input devices convert human actions or environmental measurements into binary data (keyboards, optical scanners, barcode/QR readers, biometric sensors, microphones). Output devices convert processed binary data into human-perceptible forms (OLED displays, laser/inkjet/3D printers, speakers, actuators).',
            'Physical Signal → ADC/Input Sensor → Binary Processing → DAC/Output Actuator',
            '🖨️ Input Sensors & Output Actuators Matrix',
            'QR code scanners at supermarket checkouts in Nairobi and biometric fingerprint registration systems.',
            'In an automated greenhouse in Naivasha, why do soil moisture sensors require an Analogue-to-Digital Converter (ADC) before feeding data to the microprocessor?',
            'KSSEA Computer Studies: Selecting appropriate I/O devices for specialized user scenarios including assistive accessibility.'
          ),
          stop(
            'cbc_g10_comp_s1_4',
            '1.4 Computer Storage',
            'PrimaryVolatile Memory vs Secondary Non-Volatile Media',
            'Trading access speed against capacity and persistence up the memory hierarchy',
            'Primary storage (RAM and ROM) is directly accessible by the CPU. RAM is volatile read-write memory for active programs; ROM is non-volatile firmware (BIOS/UEFI). Secondary storage (NVMe SSDs using NAND flash, magnetic HDDs, optical discs) provides permanent mass storage.',
            '1 KB = 1024 B  |  1 MB = 1024 KB  |  1 GB = 1024 MB  |  1 TB = 1024 GB',
            '💾 Memory Hierarchy Pyramid (Registers → Cache → RAM → SSD)',
            'Upgrading a school lab computer from a mechanical spinning HDD to a solid-state drive (SSD) for instant boot times.',
            'Why does a computer lose unsaved document edits during a sudden power blackout, yet its startup BIOS instructions remain intact?',
            'KSSEA Computer Studies: Calculating file capacities in binary multiples and comparing SSD flash cells vs magnetic platters.'
          ),
          stop(
            'cbc_g10_comp_s1_5',
            '1.5 Central Processing Unit (CPU)',
            'The Fetch-Decode-Execute Cycle & Special Purpose Registers',
            'Program Counter, MAR, MDR, CIR, and Accumulator orchestrate every instruction',
            'The CPU executes instructions via the continuous Fetch-Decode-Execute (FDE) cycle: (1) Fetch: PC holds the next instruction address → copied to MAR → instruction fetched via Data Bus into MDR → copied to CIR; PC increments. (2) Decode: Control Unit interprets the opcode in CIR. (3) Execute: ALU performs arithmetic/logic and stores results in the Accumulator (ACC).',
            'PC → MAR → [Memory Read] → MDR → CIR → CU Decode → ALU & ACC',
            '⚙️ CPU Register & FDE Clock Cycle Stepper',
            'Comparing clock speed (GHz), core count, and cache size when selecting laptops for software development.',
            'What happens inside the Program Counter (PC) and Memory Address Register (MAR) during the Fetch stage of an instruction?',
            'KSSEA Computer Studies Section B: Tracing register contents step-by-step through a complete Fetch-Decode-Execute cycle.'
          ),
          stop(
            'cbc_g10_comp_s1_6',
            '1.6 Operating Systems (OS)',
            'Resource Manager, Process Scheduler & User Interface',
            'The OS kernel arbitrates CPU time, memory pages, device interrupts, and file security',
            'The Operating System manages hardware and software resources. Core functions include Process Management (multitasking & scheduling), Memory Management (paging & virtual memory), File Management, I/O & Interrupt Handling, Security/Access Control, and providing a User Interface (CLI vs GUI).',
            'Hardware ↔ OS Kernel (Memory / Process / File / Device Drivers) ↔ Applications ↔ User',
            '🎛️ OS Kernel Ring & Interrupt Handler',
            'Running Linux servers at Konza Technopolis data centers vs Android on smartphones.',
            'How does an Operating System allow a computer with only 8 GB of physical RAM to run multiple heavy applications simultaneously without crashing?',
            'KSSEA Computer Studies: Explaining hardware/software interrupts and how virtual memory swaps pages to disk.'
          ),
          stop(
            'cbc_g10_comp_s1_7',
            '1.7 Computer Setup, Ergonomics & Maintenance',
            'Hardware Assembly, Port Interfaces, UPS Protection & E-Waste Safety',
            'Safe electrostatic handling, clean power conditioning, and proper cable interfacing',
            'Setting up a computer workstation requires connecting power through a surge protector or Uninterruptible Power Supply (UPS), interfacing display ports (HDMI/DisplayPort), USB peripherals, and network links, configuring BIOS/OS settings, and observing ergonomic posture and WEEE e-waste disposal protocols.',
            'Mains AC → Surge Protector / UPS Battery Backup → PSU (DC Rails) → Motherboard',
            '🔌 Workstation Port Map & UPS Safety Rig',
            'Protecting school computer laboratories from voltage fluctuations and brownouts using online UPS units.',
            'Why is an Uninterruptible Power Supply (UPS) essential for a desktop workstation in an area with frequent power surges?',
            'KSSEA Practical Assessment: Identifying motherboard ports (HDMI, RJ-45, USB-C, Audio) and troubleshooting boot-up POST beep codes.'
          )
        ]
      },
      {
        id: 'cbc_g10_comp_s2',
        number: 2,
        title: '2.0 Computer Networking',
        strand: 'Strand 2.0: Computer Networking',
        icon: '🌐',
        status: 'available',
        summary: 'Data communication modes, bounded and unbounded transmission media, network elements, and network topologies.',
        subtopics: [
          stop(
            'cbc_g10_comp_s2_1',
            '2.1 Data Communication',
            'Simplex, Half-Duplex, Full-Duplex & Bandwidth',
            'Moving encoded signals reliably across communication channels',
            'Data communication is the exchange of digital or analogue signals between devices over a transmission channel. Modes of transmission include Simplex (one-way only, e.g. FM radio broadcast), Half-Duplex (two-way, one at a time, e.g. police walkie-talkie), and Full-Duplex (simultaneous two-way, e.g. fibre-optic phone call).',
            'Simplex (A → B)  |  Half-Duplex (A ↔ B alternating)  |  Full-Duplex (A ⇄ B simultaneous)',
            '📡 Signal Transmission Mode Channels',
            'Comparing a police walkie-talkie ("Over!") with a live WhatsApp voice call over Safaricom 5G.',
            'Why is a walkie-talkie classified as half-duplex while a mobile telephone conversation is full-duplex?',
            'KSSEA Computer Studies: Distinguishing serial vs parallel transmission, baud rate vs bit rate (bps), and attenuation.'
          ),
          stop(
            'cbc_g10_comp_s2_2',
            '2.2 Data Transmission Media',
            'Guided (Twisted Pair, Coaxial, Fibre Optic) vs Unguided Wireless Spectrum',
            'Total internal reflection in glass fibre carries terabits immune to electromagnetic noise',
            'Bounded (guided) media carry signals along physical conductors: Unshielded/Shielded Twisted Pair (UTP/STP copper), Coaxial cable, and Fibre-Optic cable (light pulses via total internal reflection). Unbounded (unguided) wireless media broadcast through space: Radio waves (Wi-Fi/Bluetooth), Microwaves (terrestrial & satellite), and Infrared.',
            'Fibre Optic: Light pulses (Total Internal Reflection) → High Bandwidth, Zero EMI',
            '🔦 Fibre Optic Total Internal Reflection Core',
            'Submarine fibre-optic cables (TEAMS, SEACOM) landing at Mombasa to connect East Africa to global high-speed internet.',
            'Why do undersea intercontinental internet cables use glass optical fibres rather than thick copper wires?',
            'KSSEA Computer Studies: Comparing UTP, coaxial, fibre optic, and microwave links on cost, bandwidth, attenuation, and EMI immunity.'
          ),
          stop(
            'cbc_g10_comp_s2_3',
            '2.3 Computer Network Elements',
            'NICs, Switches, Routers, Modems, Gateways & IP/MAC Addressing',
            'Switches forward frames by MAC address within a LAN; Routers route packets by IP across networks',
            'Building a functional network requires Data Terminal Equipment (DTE), Network Interface Cards (NIC with burned-in 48-bit MAC address), Network Switches (intelligently forward frames to target port), Routers (connect different networks and route IP packets), Modems, Wireless Access Points (WAP), and Network Operating Software.',
            'MAC Address = 48-bit Hex Hardware ID (LAN Switch)  |  IP Address = Logical Routing ID (WAN Router)',
            '🖧 LAN Switch vs WAN Router Packet Flow',
            'Designing a school campus Local Area Network (LAN) connecting the computer lab, administration block, and library.',
            'Why is a network switch much faster and more secure than a legacy passive hub when 30 students are transferring files simultaneously?',
            'KSSEA Computer Studies Paper 1: Stating the exact role of a NIC, Switch, Router, Repeater, and Firewall in a network diagram.'
          ),
          stop(
            'cbc_g10_comp_s2_4',
            '2.4 Network Topologies',
            'Star, Bus, Ring, Mesh & Hybrid Physical and Logical Layouts',
            'Star topology isolates cable faults to a single node through a central switch',
            'Network topology defines the physical layout and logical data flow of connected nodes. In a Bus topology, all nodes share one backbone cable with terminators. In a Ring topology, tokens pass sequentially. In a Star topology, every node connects via dedicated cable to a central switch. In a Mesh topology, redundant links provide high fault tolerance.',
            'Full Mesh Links = n(n - 1) ÷ 2',
            '⭐ Star, Bus, Ring & Mesh Topology Schematics',
            'Choosing a Star topology with a central Gigabit switch for a county hospital electronic medical records system.',
            'If a single workstation cable is accidentally cut in a Star topology versus a Bus backbone topology, how does each network respond?',
            'KSSEA Computer Studies: Drawing labeled topology diagrams and evaluating fault tolerance, cabling cost, and scalability.'
          )
        ]
      },
      {
        id: 'cbc_g10_comp_s3',
        number: 3,
        title: '3.0 Software Development',
        strand: 'Strand 3.0: Software Development',
        icon: '💻',
        status: 'available',
        summary: 'Programming paradigms, algorithm design with flowcharts and trace tables, identifiers, operators, control structures, containers, and functions.',
        subtopics: [
          stop(
            'cbc_g10_comp_s3_1',
            '3.1 Computer Programming Concepts',
            'Low-Level Machine/Assembly vs High-Level Languages & Translators',
            'Compilers translate whole programs ahead of time; Interpreters execute line by line',
            'Programming languages bridge human logic and CPU binary machine code (1GL). Assembly language (2GL) uses mnemonics (ADD, MOV) translated by an Assembler. High-level languages (3GL like Python, C, Java) are portable and readable, requiring either a Compiler (produces standalone executable) or an Interpreter (executes statement-by-statement).',
            'Source Code (.py / .c) ⎯[Compiler / Interpreter]→ Machine Object Code (10110100₂)',
            '🔄 Compiler vs Interpreter Translation Pipeline',
            'Writing Python scripts for data analysis vs compiled C++ firmware for M-KOPA solar smart meters.',
            'Why is an interpreter often preferred while debugging new code, whereas a compiler is preferred for distributing finished commercial software?',
            'KSSEA Computer Studies: Comparing Machine Code, Assembly, and High-Level Languages, and contrasting Compilers vs Interpreters.'
          ),
          stop(
            'cbc_g10_comp_s1_1',
            '3.2 Program Development: Algorithms, Flowcharts & Trace Tables',
            'Step-by-Step Blueprint for Problem Solving',
            'An algorithm is a finite, unambiguous sequence of instructions to transform inputs into outputs',
            'Program development follows problem definition, algorithm design (pseudocode and standard flowchart symbols: oval for Start/Stop, parallelogram for Input/Output, rectangle for Process, diamond for Decision), coding, dry-running with trace tables, testing with normal/boundary/erroneous data, and documentation.',
            'Input → Transformative Logic (Sequence, Selection & Iteration) → Deterministic Output',
            '🔷 Flowchart Decision Diamond & Trace Table',
            'M-Pesa transaction validation: checking PIN match, sufficient balance + tariff fee, deducting amount, and sending SMS receipt.',
            'What happens to a computer program if a WHILE loop does not contain an instruction that updates the variable being tested in the condition?',
            'KSSEA Computer Studies Paper 1: Completing trace tables for nested loops and converting flowcharts to structured pseudocode.',
            [
              'Step 1: Define Inputs, Processing steps, and Expected Output (IPO model).',
              'Step 2: Use decision diamonds for branching: IF condition is TRUE follow Path A, ELSE follow Path B.',
              'Step 3: Dry-run with boundary data in a trace table: verify loop counters, edge values (0, negatives), and termination.'
            ],
            'Sum of first N positive integers:\n1. Total = 0, Counter = 1\n2. WHILE Counter <= N: Total = Total + Counter, Counter = Counter + 1\n3. Output Total.'
          ),
          stop(
            'cbc_g10_comp_s3_3',
            '3.3 Identifiers, Data Types and Operators',
            'Variables, Constants, Primitive Types & Operator Precedence',
            'Clear identifier naming and strict type safety prevent arithmetic and logic bugs',
            'Identifiers name variables, constants, and functions (must start with a letter/underscore, no spaces or reserved keywords). Core data types include Integer (int), Floating-point/Real (float), String (str), and Boolean (bool). Operators include Arithmetic (+, -, *, /, //, %, **), Relational (==, !=, <, >, <=, >=), and Logical (AND, OR, NOT).',
            'Floor Division: 17 // 5 = 3  |  Modulus (Remainder): 17 % 5 = 2',
            '🧮 Data Types & Modulus Remainder Engine',
            'Using the modulus operator (number % 2 == 0) to check even/odd vehicle number plates or split shillings into coin denominations.',
            'In Python, why does `"25" + "10"` evaluate to `"2510"` whereas `25 + 10` evaluates to `35`?',
            'KSSEA Computer Studies: Evaluating compound expressions combining arithmetic, relational, and Boolean operators (NOT > AND > OR).'
          ),
          stop(
            'cbc_g10_comp_s3_4',
            '3.4 Control Structures: Selection & Iteration',
            'Branching (IF-ELIF-ELSE) and Looping (FOR & WHILE)',
            'Count-controlled FOR loops run a known number of times; Condition-controlled WHILE loops run until a sentinel changes',
            'Control structures direct the order of statement execution. Sequence runs top-to-bottom. Selection (IF...ELIF...ELSE / CASE) chooses a branch based on a Boolean condition. Iteration repeats a block: FOR loops iterate over a definite range or sequence; WHILE loops evaluate a condition before each pass.',
            'FOR i IN range(start, stop, step)  |  WHILE condition_is_true: execute_body()',
            '🔁 Selection Branch & Loop Iteration Cycle',
            'Grading student KJSEA/KSSEA scores automatically using IF-ELIF-ELSE competency bands (EE, ME, AE, BE).',
            'When writing an IF-ELIF-ELSE grading ladder for scores 0–100, why does the order in which you test `score >= 80` vs `score >= 50` matter?',
            'KSSEA Computer Studies Paper 2 Practical: Writing bug-free nested loops and conditional validation blocks.'
          ),
          stop(
            'cbc_g10_comp_s3_5',
            '3.5 Containers: Lists, Tuples, Sets & Dictionaries',
            'Structured Data Collections & Zero-Based Indexing',
            'Lists are mutable ordered sequences; Tuples are immutable; Dictionaries map unique keys to values',
            'Containers store multiple data items under a single identifier. In Python: Lists `[a, b, c]` are ordered, zero-indexed (`list[0]`), and mutable (append, sort, pop). Tuples `(x, y)` are ordered and immutable. Dictionaries `{"key": value}` provide fast O(1) lookup by key.',
            'Zero-Based Index: first item = arr[0],  last item = arr[n - 1]',
            '📦 Indexed Array & Key-Value Dictionary Vault',
            'Storing county names and their 001–047 county codes in a Python dictionary for instant lookup.',
            'If a list `counties = ["Mombasa", "Kwale", "Kilifi", "Tana River"]` has 4 elements, why does `counties[4]` raise an `IndexError`?',
            'KSSEA Computer Studies: Iterating through 1D lists and dictionaries to compute totals, maximums, and filtered search results.'
          ),
          stop(
            'cbc_g10_comp_s3_6',
            '3.6 Functions & Modular Programming',
            'Parameters, Arguments, Return Values & Variable Scope',
            'Decompose complex systems into reusable, testable black-box functions',
            'Functions encapsulate a specific task into a named reusable block (`def func_name(params):`). Parameters are placeholders in the function definition; arguments are actual values passed on call. `return` sends a computed result back to the caller. Local variables exist only inside the function; global variables exist across the module.',
            'def calculate_vat(amount, rate=0.16):\n    return amount * rate',
            '🧩 Modular Function Black-Box (Inputs → Logic → Return)',
            'Creating a reusable `calculate_mpesa_tariff(amount)` function called across billing, checkout, and receipt modules.',
            'What is the difference between a function that uses `print(result)` versus a function that uses `return result` when you want to use that result in a later calculation?',
            'KSSEA Computer Studies Paper 2: Writing modular functions with parameters, return statements, and local variable scope.'
          )
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // KICD GRADE 10 CHEMISTRY (Exact Official KICD Table: 3 Strands, 8 Sub-strands)
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Chemistry',
    code: 'CHEM-G10',
    trackPathway: 'STEM',
    title: 'CBE Grade 10 (Senior STEM) Chemistry Metro Line',
    stations: [
      {
        id: 'cbc_g10_chem_s1',
        number: 1,
        title: '1.0 Inorganic Chemistry',
        strand: 'Strand 1.0: Inorganic Chemistry',
        icon: '⚛️',
        status: 'available',
        summary: 'Introduction to Chemistry, atomic structure, isotopes, the Periodic Table, chemical bonding, and Period 3 trends.',
        subtopics: [
          stop(
            'cbc_g10_chem_s1_0',
            '1.1 Introduction to Chemistry & Laboratory Apparatus',
            'Matter, Pure Substances & Volumetric Precision',
            'Accurate measurement with burettes, pipettes, and analytical balances underpins chemical science',
            'Chemistry studies the composition, structure, properties, and transformations of matter. Quantitative accuracy requires selecting the right volumetric apparatus: pipettes (exact fixed volumes like 25.0 cm³), burettes (variable titrations to ±0.05 cm³), and volumetric flasks.',
            'Percentage Purity = (Mass of Pure Substance ÷ Total Mass of Impure Sample) × 100%',
            '🧪 Burette Meniscus & Volumetric Apparatus',
            'Quality control testing of soda ash (sodium carbonate) purity at Lake Magadi before export.',
            'Why do we use a pipette rather than a measuring cylinder when transferring exactly 25.0 cm³ of alkali for a titration?',
            'KSSEA Chemistry Practical: Reading the bottom of the meniscus at eye level to eliminate parallax error.'
          ),
          stop(
            'cbc_g10_chem_s1_2',
            '1.2 The Atom: Subatomic Particles, Isotopes & Electron Configuration',
            'Protons Define Identity; Neutrons Define Isotopes; Electrons Define Reactivity',
            'Relative Atomic Mass (RAM) is the weighted average of naturally occurring isotopes',
            'An atom consists of a dense positively charged nucleus (protons +1, neutrons 0) surrounded by shells of negatively charged electrons (-1). Atomic number (Z) is the proton count; Mass number (A) = protons + neutrons. Isotopes are atoms of the same element with equal protons but different numbers of neutrons.',
            'RAM = Σ (Isotope Mass × % Abundance) ÷ 100',
            '⚛️ Nuclear Isotope & s, p Orbital Model',
            'Calculating the Relative Atomic Mass of Chlorine (35.5) from 75% Cl-35 and 25% Cl-37.',
            'Why do isotopes of carbon (Carbon-12 and Carbon-14) exhibit identical chemical reactions despite having different atomic masses?',
            'KSSEA Chemistry Paper 1: Calculating Relative Atomic Mass from isotopic abundances and writing electron configurations.'
          ),
          stop(
            'cbc_g10_chem_s1_3',
            '1.3 The Periodic Table: Alkali Metals, Alkaline Earths & Halogens',
            'Group Valency & Reactivity Trends Down Groups I, II and VII',
            'Metals become more reactive down a group; Non-metals (Halogens) become less reactive down a group',
            'Period number equals the number of occupied electron shells; Group number equals valence electrons. Down Group I (Alkali metals: Li, Na, K), atomic radius increases and outer electron shielding increases, making the single valence electron easier to lose (reactivity increases). Down Group VII (Halogens: F, Cl, Br, I), attracting an extra electron becomes harder (reactivity decreases).',
            'Halogen Displacement: Cl₂(aq) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)',
            '📊 Periodic Table Group Reactivity Vectors',
            'Extracting sodium chloride and trona at Lake Magadi and using chlorine for municipal water treatment in Nairobi.',
            'Why does potassium react explosively with cold water with a lilac flame while lithium fizzes gently at the surface?',
            'KSSEA Chemistry Section B: Explaining opposite reactivity trends in Group I vs Group VII using atomic radius and nuclear attraction.'
          ),
          stop(
            'cbc_g10_chem_s1_1',
            '1.4 Chemical Bonding: Ionic, Covalent & Metallic Structures',
            'The Pursuit of Stable Electron Octets',
            'Atoms bond to achieve low-energy noble gas configurations by transferring, sharing, or delocalizing electrons',
            'Ionic bonding transfers valence electrons from metals to non-metals, forming a giant electrostatic crystal lattice (high melting point, conducts electricity only when molten or aqueous via mobile ions). Covalent bonding shares electron pairs between non-metals (simple molecular like H₂O/CO₂ vs giant covalent like diamond/graphite/SiO₂). Metallic bonding features positive metal ions in a sea of delocalized electrons.',
            'Cation (M⁺) + Anion (X⁻) → Giant Ionic Lattice  |  Graphite: 3 covalent bonds + 1 delocalized e⁻ per C',
            '🌐 3D Crystal Lattice vs Shared Molecular Orbitals',
            'Why graphite conducts electricity in dry cells while diamond cuts rock drill bits in geothermal wells at Olkaria.',
            'Why does solid table salt (NaCl) fail to conduct electricity, yet the moment you dissolve it in water it conducts readily?',
            'KSSEA Chemistry Paper 1: Drawing dot-and-cross diagrams and contrasting diamond vs graphite and simple molecular vs giant lattices.'
          ),
          stop(
            'cbc_g10_chem_s1_5',
            '1.5 Periodicity: Trends Across Period 3 (Na to Ar)',
            'Increasing Nuclear Charge Across a Single Shell',
            'Across Period 3, atomic radius shrinks and bonding shifts from metallic to giant covalent to simple molecular',
            'Moving left to right across Period 3 (Na, Mg, Al, Si, P, S, Cl, Ar), protons are added to the nucleus while electrons enter the same third shell. Effective nuclear pull increases, drawing the shell closer (atomic radius decreases). Oxides shift from basic (Na₂O, MgO) to amphoteric (Al₂O₃) to acidic (SiO₂, P₄O₁₀, SO₂, Cl₂O₇).',
            'Amphoteric Al₂O₃: Reacts with BOTH acids (forming Al³⁺ salts) and alkalis (forming aluminates)',
            '📈 Period 3 Melting Point & Atomic Radius Profile',
            'Using aluminium alloys for overhead Kenya Power transmission cables due to high conductivity and protective oxide layer.',
            'Why does Aluminium Oxide (Al₂O₃) dissolve in both hydrochloric acid and sodium hydroxide, whereas Magnesium Oxide only dissolves in acid?',
            'KSSEA Chemistry Structured Question: Explaining the sharp drop in melting point between Silicon (giant covalent) and Phosphorus (simple molecular P₄).'
          )
        ]
      },
      {
        id: 'cbc_g10_chem_s2',
        number: 2,
        title: '2.0 Physical Chemistry',
        strand: 'Strand 2.0: Physical Chemistry',
        icon: '⚖️',
        status: 'available',
        summary: 'Acids, bases, pH scale, salt preparation methods, the Mole concept, Avogadro constant, and titration stoichiometry.',
        subtopics: [
          stop(
            'cbc_g10_chem_s2_1',
            '2.1 Acids, Bases and Salts: pH, Strength & Salt Preparation',
            'Proton Donors, Complete vs Partial Ionisation & Solubility Rules',
            'Strong acids ionise completely in water; weak acids establish a reversible equilibrium',
            'Acids are proton (H⁺) donors; bases are proton acceptors. Strong acids (HCl, H₂SO₄, HNO₃) dissociate 100% in water; weak acids (ethanoic acid CH₃COOH) dissociate partially. Soluble salts are prepared by titration (acid + alkali) or reacting acid with excess metal/insoluble base/carbonate; insoluble salts (AgCl, BaSO₄, PbSO₄) are prepared by ionic precipitation.',
            'Ionic Neutralisation: H⁺(aq) + OH⁻(aq) → H₂O(l)  |  Precipitation: Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)',
            '🧫 Titration & Double Decomposition Salt Chart',
            'Treating acidic highland tea soils with agricultural lime (CaO / Ca(OH)₂) and manufacturing fertilizers.',
            'At equal 0.1 M concentration, why does hydrochloric acid have a pH of 1.0 while ethanoic acid has a pH of 2.9?',
            'KSSEA Chemistry Practical: Selecting the exact preparation method for soluble vs insoluble salts and writing ionic equations.'
          ),
          stop(
            'cbc_g10_chem_s2_2',
            '2.2 The Mole Concept, Gas Volume & Volumetric Titration',
            'Counting Subatomic Particles by Weighing Grams',
            'One mole contains 6.02 × 10²³ particles and occupies 24.0 dm³ at r.t.p.',
            'The mole links mass, particle count, gas volume, and solution molarity (M = mol/dm³). Empirical formula gives the simplest whole-number ratio of atoms; molecular formula gives the exact number of atoms in one molecule. Back and direct titrations determine unknown concentrations using balanced stoichiometric mole ratios.',
            'Moles (n) = Mass (g) ÷ Molar Mass (Mr) = Concentration (M) × Volume (dm³) = Gas Vol ÷ 24 dm³',
            '⚖️ Stoichiometric Mole Triangle & Burette',
            'Calculating exact limestone (CaCO₃) tonnage needed to produce clinker at Bamburi and Athi River cement plants.',
            'If 25.0 cm³ of 0.1 M NaOH is completely neutralised by 12.5 cm³ of H₂SO₄ (2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O), what is the molarity of the acid?',
            'KSSEA Chemistry Paper 1 & 3: Determining empirical formulas from percentage composition and solving volumetric titration problems.'
          )
        ]
      },
      {
        id: 'cbc_g10_chem_s3',
        number: 3,
        title: '3.0 Organic Chemistry',
        strand: 'Strand 3.0: Organic Chemistry',
        icon: '🧪',
        status: 'available',
        summary: 'Homologous series, IUPAC nomenclature, structural isomerism, and reactions of Alkanes, Alkenes, and Alkynes.',
        subtopics: [
          stop(
            'cbc_g10_chem_s3_1',
            '3.1 Introduction to Organic Chemistry: Hydrocarbons (Alkanes, Alkenes & Alkynes)',
            'Tetravalent Carbon Chains, Functional Groups & Unsaturation',
            'Alkanes are saturated (C–C) and undergo substitution; Alkenes/Alkynes are unsaturated (C=C / C≡C) and undergo addition',
            'Carbon forms four covalent bonds and catenates into chains and rings. A homologous series shares a general formula, functional group, and consecutive CH₂ difference. Alkanes (CₙH₂ₙ₊₂) burn cleanly and react with halogens under UV light (substitution). Alkenes (CₙH₂ₙ, C=C double bond) and Alkynes (CₙH₂ₙ₋₂, C≡C triple bond) decolourise bromine water rapidly via addition reactions.',
            'Alkanes: CₙH₂ₙ₊₂  |  Alkenes: CₙH₂ₙ  |  Alkynes: CₙH₂ₙ₋₂',
            '🔬 Bromine Water Unsaturation Test & Isomer Models',
            'Fractional distillation of crude oil into LPG cooking gas (propane/butane), petrol, kerosene, and bitumen for Kenyan roads.',
            'How can you chemically distinguish between a colourless gas jar of ethane and a colourless gas jar of ethene in the laboratory?',
            'KSSEA Chemistry Paper 2: Drawing structural isomers of C₄H₁₀ and C₄H₈, IUPAC naming, and addition polymerisation of ethene to poly(ethene).'
          )
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // KICD GRADE 10 PHYSICS (Exact Official KICD Table: 4 Strands, 13 Sub-strands)
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Physics',
    code: 'PHY-G10',
    trackPathway: 'STEM',
    title: 'CBE Grade 10 (Senior STEM) Physics Metro Line',
    stations: [
      {
        id: 'cbc_g10_phy_s1',
        number: 1,
        title: '1.0 Mechanics and Thermal Physics',
        strand: 'Strand 1.0: Mechanics and Thermal Physics',
        icon: '🚀',
        status: 'available',
        summary: 'Precision measurements, SUVAT equations of motion, Newton\'s laws, moments, fluid pressure, and thermal physics.',
        subtopics: [
          stop(
            'cbc_g10_phy_s1_0',
            '1.1 Introduction to Physics, SI Units & Vernier/Micrometer Precision',
            'Fundamental Base Quantities, Dimensional Consistency & Zero Error',
            'True Reading = Instrument Reading − Zero Error',
            'Physics quantifies nature using 7 SI base units (metre, kilogram, second, ampere, kelvin, mole, candela). Precision engineering measurements use Vernier callipers (±0.01 cm) and Micrometer screw gauges (±0.01 mm). Always check and subtract positive or negative zero error before recording.',
            'Micrometer Reading = Sleeve Main Scale (mm) + (Thimble Division × 0.01 mm) − Zero Error',
            '📏 Vernier Calliper & Micrometer Thimble Scale',
            'Measuring piston cylinder tolerances and ball bearing diameters in automotive workshops in Industrial Area, Nairobi.',
            'If a micrometer screw gauge shows a positive zero error of +0.03 mm when closed, and reads 4.58 mm on a copper wire, what is the true diameter?',
            'KSSEA Physics Practical: Reading Vernier calliper and micrometer scales with zero-error correction.'
          ),
          stop(
            'cbc_g10_phy_s1_1',
            '1.2 Linear Motion & Equations of Uniformly Accelerated Motion (SUVAT)',
            'Predicting the Trajectory of Moving Bodies',
            'Gradient of v–t graph is acceleration; area under v–t graph is total displacement',
            'Displacement (s), initial velocity (u), final velocity (v), acceleration (a), and time (t) govern linear kinematics. Under constant acceleration, three equations link all five variables. Free-falling bodies near Earth accelerate downward at g ≈ 9.8 m/s² (or 10 m/s²).',
            'v = u + at  |  s = ut + ½at²  |  v² = u² + 2as',
            '📈 Velocity-Time Area Integral Model',
            'Matatu braking safety distances on Thika Superhighway and SGR train acceleration profiles.',
            'If a vehicle doubles its speed from 20 m/s to 40 m/s, by what factor does its minimum braking distance increase under the same braking force?',
            'KSSEA Physics Paper 1: Extracting acceleration and total distance from multi-stage trapezoidal velocity-time graphs.'
          ),
          stop(
            'cbc_g10_phy_s1_3',
            '1.3 Newton\'s Laws of Motion, Impulse & Conservation of Momentum',
            'Inertia, Resultant Force (F = ma) & Elastic/Inelastic Collisions',
            'Total linear momentum before collision equals total momentum after collision in an isolated system',
            'Newton\'s 1st Law defines inertia. Newton\'s 2nd Law states that resultant force equals rate of change of momentum (F = (mv - mu)/t = ma). Crumple zones and airbags increase impact time (t) to reduce peak impact force (F). Newton\'s 3rd Law pairs equal and opposite action-reaction forces.',
            'F = ma  |  Impulse (Ft) = Δ(mv)  |  m₁u₁ + m₂u₂ = m₁v₁ + m₂v₂',
            '💥 Momentum Collision & Crumple Zone Impulse Curve',
            'Why seatbelts and crumple zones save lives in highway collisions by extending the time taken to bring passengers to rest.',
            'Why does a goalkeeper pull their hands backward while catching a fast-moving football Penalty kick?',
            'KSSEA Physics Section B: Solving recoil and coalescence collision problems using Conservation of Linear Momentum.'
          ),
          stop(
            'cbc_g10_phy_s1_4',
            '1.4 Turning Effect of Forces, Moments & Equilibrium',
            'Principle of Moments & Centre of Gravity Stability',
            'For rotational equilibrium, sum of clockwise moments equals sum of anticlockwise moments',
            'The moment of a force about a pivot is the product of the force and the perpendicular distance from the pivot to the line of action (M = F × d). A body is in complete equilibrium when resultant force is zero AND resultant moment about any point is zero. Lowering the centre of gravity and widening the base increases stability.',
            'Moment = Force (F) × Perpendicular Distance (d)  |  ΣClockwise Moments = ΣAnticlockwise Moments',
            '⚖️ Balanced Metre Rule Fulcrum & Bus Stability',
            'Why double-decker buses and loaded lorries must store heavy cargo in the lower boot rather than on the roof carrier.',
            'Why is it much easier to loosen a tight wheel nut using a long-handled spanner than a short-handled spanner?',
            'KSSEA Physics Practical: Finding the mass of a metre rule using the Principle of Moments and locating the centre of gravity.'
          ),
          stop(
            'cbc_g10_phy_s1_5',
            '1.5 Pressure in Solids and Fluids (Pascal\'s Principle & Hydraulics)',
            'Force per Unit Area & Hydrostatic Depth Pressure (P = hρg)',
            'Pressure in an incompressible enclosed fluid is transmitted equally in all directions',
            'Solid pressure is P = F / A (sharp knives concentrate force on tiny area; wide tractor tyres spread weight). Fluid pressure increases linearly with depth and density: P = hρg. Hydraulic machines (car brakes, hydraulic jacks) multiply force using Pascal\'s Principle: F₁/A₁ = F₂/A₂.',
            'P_solid = F ÷ A  |  P_fluid = hρg  |  Hydraulic Multiplier: F₂ = F₁ × (A₂ ÷ A₁)',
            '🏗️ Hydraulic Lift Pistons & Dam Wall Cross-Section',
            'Why the concrete wall of Masinga Dam is built much thicker at the bottom bed than at the top crest.',
            'In a hydraulic car jack, if the small master piston has area 2 cm² and the large ram piston has area 100 cm², how much load can a 50 N effort lift?',
            'KSSEA Physics Paper 1: Calculating total absolute pressure under water (Atmospheric Pressure P₀ + hρg) and hydraulic mechanical advantage.'
          ),
          stop(
            'cbc_g10_phy_s1_6',
            '1.6 Thermal Expansion, Heat Transfer & Specific Heat Capacity',
            'Conduction, Convection, Radiation & Calorimetry (Q = mcΔθ)',
            'Thermal energy raises kinetic energy during temperature rise and breaks bonds during latent phase change',
            'Matter expands when heated (bimetallic strips in thermostats, expansion gaps in railway tracks). Heat transfers via conduction (lattice vibrations & free electrons), convection (density-driven fluid currents), and infrared radiation (works across vacuum). Specific heat capacity (c) measures energy required to raise 1 kg by 1 K.',
            'Q = m × c × Δθ  |  Latent Heat: Q = m × L',
            '🔥 Calorimeter & Vacuum Flask Insulation Diagram',
            'Designing solar water heaters and evaporative charcoal coolers for preserving fresh farm produce in rural Kenya.',
            'Why does coastal Mombasa experience a smaller daily temperature range between day and night compared to inland Garissa?',
            'KSSEA Physics Section B: Electrical/mixtures calorimetry calculations (Heat Lost by Hot Body = Heat Gained by Cold Body).'
          )
        ]
      },
      {
        id: 'cbc_g10_phy_s2',
        number: 2,
        title: '2.0 Waves and Optics',
        strand: 'Strand 2.0: Waves and Optics',
        icon: '🌊',
        status: 'available',
        summary: 'Transverse vs longitudinal waves, wave equation v = fλ, sound echoes, reflection, refraction, Snell\'s law, and lenses.',
        subtopics: [
          stop(
            'cbc_g10_phy_s2_1',
            '2.1 Properties of Mechanical and Electromagnetic Waves',
            'Oscillations, Wavelength, Frequency & The Universal Wave Equation',
            'Waves transfer energy without transferring matter; v = f × λ',
            'Transverse waves oscillate perpendicular to energy travel (light, water ripples); longitudinal waves oscillate parallel via compressions and rarefactions (sound). Wave speed (v) equals frequency (f) times wavelength (λ). Sound reflection produces echoes used in sonar depth sounding.',
            'v = f × λ  |  f = 1 ÷ T  |  Sonar Echo Distance: d = (v × t) ÷ 2',
            '〰️ Transverse vs Longitudinal Wave Profile',
            'Using ultrasonic pulse-echo sonar on Lake Victoria research vessels to map fish shoals and lakebed depth.',
            'When a light wave travels from air into glass, its speed decreases—which quantity remains strictly constant, its frequency or its wavelength?',
            'KSSEA Physics Paper 2: Extracting amplitude, period, and frequency from displacement-time and displacement-distance graphs.'
          ),
          stop(
            'cbc_g10_phy_s2_2',
            '2.2 Geometric Optics: Reflection, Refraction & Thin Lenses',
            'Snell\'s Law, Critical Angle & Total Internal Reflection',
            'Light bends toward the normal entering a denser medium; beyond critical angle C, it reflects 100% internally',
            'Refraction occurs because light changes speed across media boundaries: n = sin i / sin r = c₁ / c₂ = Real Depth / Apparent Depth. When light travels from optically denser to less dense medium at an angle of incidence exceeding critical angle c (sin c = 1/n), Total Internal Reflection (TIR) occurs. Converging and diverging lenses form images governed by 1/f = 1/u + 1/v.',
            'Snell\'s Law: n = sin i ÷ sin r  |  Critical Angle: sin c = 1 ÷ n  |  Lens Formula: 1/f = 1/u + 1/v',
            '💎 Prism Total Internal Reflection & Ray Diagram',
            'Medical endoscopes and Safaricom fibre-optic cables transmitting laser pulses across Kenya with zero light leakage.',
            'Why does a straight stick partially submerged in a bucket of clear water appear bent upward toward the surface?',
            'KSSEA Physics Practical: Determining refractive index of a glass block using pins and focal length of a convex lens.'
          )
        ]
      },
      {
        id: 'cbc_g10_phy_s3',
        number: 3,
        title: '3.0 Electricity and Magnetism',
        strand: 'Strand 3.0: Electricity and Magnetism',
        icon: '⚡',
        status: 'available',
        summary: 'Electrostatics, capacitance, current electricity, Ohm\'s law, EMF and internal resistance, and electromagnetism.',
        subtopics: [
          stop(
            'cbc_g10_phy_s3_1',
            '3.1 Electrostatics, Electric Fields & Capacitors',
            'Charge Conservation, Gold-Leaf Electroscope & Parallel-Plate Capacitance',
            'Capacitors store electrostatic energy in an electric field; C = Q / V',
            'Like charges repel; unlike charges attract. Conductors allow free electron flow; insulators hold static charge. A capacitor consists of two conducting plates separated by a dielectric insulator. Capacitance increases with plate area (A), permittivity (ε), and decreases with plate separation (d).',
            'Q = C × V  |  E = ½CV²  |  Parallel: C_T = C₁ + C₂  |  Series: 1/C_T = 1/C₁ + 1/C₂',
            '⚡ Parallel-Plate Capacitor & Field Lines',
            'Lightning arrestors on tall buildings in Kisumu and flash capacitors in camera strobes and power supplies.',
            'Why does inserting a ceramic dielectric sheet between the plates of a capacitor increase its capacitance?',
            'KSSEA Physics Paper 2: Calculating equivalent capacitance and charge stored in combined series-parallel capacitor networks.'
          ),
          stop(
            'cbc_g10_phy_s3_2',
            '3.2 Current Electricity, Ohm\'s Law & Internal Resistance',
            'Potential Difference, Resistivity & Lost Volts (E = V + Ir)',
            'Terminal voltage drops below EMF when current flows due to internal cell resistance',
            'Electric current is rate of flow of charge (I = Q/t). Ohm\'s Law states V = IR at constant temperature. Wire resistance is R = ρL/A. Real cells have internal resistance (r), so Electromotive Force E = I(R + r) = V + Ir, where Ir represents "lost volts" inside the battery.',
            'V = I × R  |  E = V + Ir  |  Series: R_T = R₁ + R₂  |  Parallel: 1/R_T = 1/R₁ + 1/R₂',
            '🔋 EMF & Internal Resistance V–I Graph (Slope = -r)',
            'Understanding why a car battery\'s headlights dim momentarily when the high-current starter motor is cranked.',
            'On a graph of terminal voltage V (y-axis) against current I (x-axis) for a dry cell, what do the y-intercept and gradient represent?',
            'KSSEA Physics Practical: Plotting V against I to determine the EMF (E) and internal resistance (r) of a dry cell.'
          ),
          stop(
            'cbc_g10_phy_s3_3',
            '3.3 Magnetism and Electromagnetism (Fleming\'s Left-Hand Rule)',
            'Magnetic Flux Patterns, Solenoids & The DC Electric Motor Effect',
            'A current-carrying conductor perpendicular to a magnetic field experiences a catapult force F = BIL',
            'Magnetic field lines run from North to South. Right-Hand Grip Rule predicts field direction around wires and solenoids. When a wire carrying current I sits inside a magnetic field B, the interacting fields produce a mechanical force F = BIL (Fleming\'s Left-Hand Rule: Thumb = Force/Motion, First finger = Field, Second finger = Current).',
            'Force on Conductor: F = B × I × L × sinθ',
            '🧲 Fleming\'s Left-Hand Rule & DC Motor Split-Ring Commutator',
            'Electric traction motors in electric boda-bodas and Nairobi electric commuter buses.',
            'What is the exact role of the split-ring commutator and carbon brushes in a direct-current (DC) electric motor?',
            'KSSEA Physics Paper 2: Applying Fleming\'s Left-Hand Rule to predict coil rotation and loudspeaker cone vibration.'
          )
        ]
      },
      {
        id: 'cbc_g10_phy_s4',
        number: 4,
        title: '4.0 Environmental and Space Physics',
        strand: 'Strand 4.0: Environmental and Space Physics',
        icon: '🌍',
        status: 'available',
        summary: 'Geothermal, solar, wind and hydro energy physics in Kenya, climate physics, orbital mechanics, and astrophysics.',
        subtopics: [
          stop(
            'cbc_g10_phy_s4_1',
            '4.1 Renewable Energy Systems: Geothermal, Solar & Hydro Physics',
            'Energy Conversion Chains & Grid Efficiency',
            'Transforming geothermal steam enthalpy, gravitational head, and solar photons into AC grid power',
            'Kenya leads Africa in renewable energy: Olkaria Geothermal plants convert underground volcanic steam enthalpy into turbine kinetic energy and electrical energy; Seven Forks Hydro dams convert gravitational potential energy (P = ρgh × Q); Lake Turkana Wind Farm harnesses kinetic wind power (P ∝ v³); solar PV panels use the photovoltaic effect.',
            'Hydro Power: P = (mgh) ÷ t = ρQvgh  |  Efficiency = (Useful Power Out ÷ Total Power In) × 100%',
            '🌋 Olkaria Geothermal & Seven Forks Hydro Energy Chain',
            'Generating over 85% of Kenya\'s national electricity grid from Rift Valley geothermal steam and Tana River hydro dams.',
            'Why does doubling the wind speed across a turbine at Lake Turkana Wind Power increase the available kinetic power by a factor of eight?',
            'KSSEA Physics Section B: Analyzing energy transformations and efficiency calculations in geothermal, hydroelectric, and solar PV systems.'
          ),
          stop(
            'cbc_g10_phy_s4_2',
            '4.2 Introduction to Astrophysics & Satellite Orbits',
            'Gravitational Centripetal Balance, Geostationary Orbits & Stellar Evolution',
            'Gravity provides the centripetal force keeping Earth-observation satellites in stable orbit',
            'Satellites stay in orbit because gravitational attraction provides the required centripetal force: GMm/r² = mv²/r, giving orbital speed v = √(GM/r). Low Earth Orbit (LEO) satellites monitor agriculture and weather; Geostationary satellites orbit at ~35,786 km above the equator with a 24-hour period matching Earth\'s rotation.',
            'Orbital Speed: v = (2πr) ÷ T = √(GM ÷ r)',
            '🛰️ Taifa-1 Earth Observation Satellite Orbit',
            'Kenya Space Agency\'s Taifa-1 observation satellite monitoring forest cover, floods, and crop yields from orbit, plus the Luigi Broglio Space Centre in Malindi.',
            'Why is Malindi on the Kenyan coast (near the Equator) an ideal geographical location for tracking and launching equatorial satellites?',
            'KSSEA Physics Paper 2: Distinguishing Low Earth Orbit (LEO) vs Geostationary satellites and tracing the life cycle of stars.'
          )
        ]
      }
    ]
  },

  // ────────────────────────────────────────────────────────────
  // KICD GRADES 6, 7, 8, 9 — INTEGRATED SCIENCE / SCIENCE & TECHNOLOGY
  // Official Rationalized KICD Strands:
  // 1.0 Mixtures, Elements and Compounds
  // 2.0 Living Things and Their Environment
  // 3.0 Force and Energy
  // ────────────────────────────────────────────────────────────
  {
    curriculum: 'CBC',
    grade: 6,
    subject: 'Science & Technology',
    code: 'SCI-G6',
    trackPathway: 'Core',
    title: 'CBE Grade 6 (Upper Primary) Science & Technology Metro Line',
    stations: [
      {
        id: 'cbc_g6_sci_s1',
        number: 1,
        title: '1.0 Living Things and Their Environment',
        strand: 'Strand 1.0: Living Things and Their Environment',
        icon: '🌱',
        status: 'available',
        summary: 'Parts of a plant, root systems, invertebrates, and the human circulatory and reproductive systems.',
        subtopics: [
          stop(
            'cbc_g6_sci_s1_1',
            '1.1 Plants, Roots & Photosynthesis Basics',
            'Taproots vs Fibrous Roots & Leaf Food Factory',
            'Roots anchor plants and absorb water; leaves trap sunlight to make food',
            'Dicotyledonous plants (beans, mango, acacia) have a main taproot with lateral branches; monocotyledonous plants (maize, grass, Napier) have fibrous roots. Leaves transpire water vapour through stomata and manufacture food using sunlight, water, and carbon dioxide.',
            'Water + Carbon Dioxide ⎯[Sunlight]→ Plant Food + Oxygen',
            '🌿 Taproot vs Fibrous Root Comparison',
            'Comparing uprooted bean stalks and maize stalks on a school demonstration farm.',
            'How can you tell whether a plant has a taproot or a fibrous root system just by looking at the veins on its leaves?',
            'KPSEA Science Model Item: Matching leaf venation (parallel vs network) to root system types.'
          ),
          stop(
            'cbc_g6_sci_s1_2',
            '1.2 The Human Circulatory System: Heart, Blood & Vessels',
            'Pumping Oxygen and Nutrients Around the Body',
            'Arteries carry blood away from the heart; veins return blood with valves',
            'The circulatory system consists of the heart, blood vessels (arteries, veins, capillaries), and blood (red cells carry oxygen, white cells fight germs, platelets clot wounds, plasma transports nutrients and hormones).',
            'Arteries (Away, Thick Elastic Walls) • Capillaries (Exchange) • Veins (Valves, Back to Heart)',
            '🫀 Human Heart & Blood Components Chart',
            'Checking pulse rate at the wrist before and after running around the school field.',
            'Why do veins have one-way pocket valves inside them while arteries do not need them?',
            'KPSEA Science Item: Identifying the function of red blood cells, white blood cells, platelets, and plasma.'
          )
        ]
      },
      {
        id: 'cbc_g6_sci_s2',
        number: 2,
        title: '2.0 Matter and Its Properties',
        strand: 'Strand 2.0: Matter',
        icon: '🧊',
        status: 'available',
        summary: 'States of matter, thermal expansion and contraction in solids, liquids, and gases, and air composition.',
        subtopics: [
          stop(
            'cbc_g6_sci_s2_1',
            '2.1 Changes of State & Thermal Expansion of Matter',
            'Heating Expands, Cooling Contracts',
            'Particles vibrate faster and push further apart when heated',
            'Matter exists as solid, liquid, or gas. Adding heat causes melting (solid → liquid), evaporation/boiling (liquid → gas), or sublimation. Solids, liquids, and gases expand when heated and contract when cooled.',
            'Solid ⇄ [Melting / Freezing] ⇄ Liquid ⇄ [Evaporation / Condensation] ⇄ Gas',
            '🌡️ Ball-and-Ring Expansion & Water Cycle',
            'Why Kenya Power electricians leave overhead power lines slightly sagging on hot afternoons.',
            'What would happen to taut electric power cables at night when temperatures drop sharply if they were strung tightly during a hot afternoon?',
            'KPSEA Science Assessment: Labeling melting, evaporation, condensation, freezing, and sublimation on a state triangle.'
          )
        ]
      },
      {
        id: 'cbc_g6_sci_s3',
        number: 3,
        title: '3.0 Force and Energy',
        strand: 'Strand 3.0: Force and Energy',
        icon: '⚙️',
        status: 'available',
        summary: 'Friction force, light reflection and transparent/translucent/opaque materials, and slopes as simple machines.',
        subtopics: [
          stop(
            'cbc_g6_sci_s3_1',
            '3.1 Force of Friction, Light & Simple Inclined Planes',
            'Useful vs Nuisance Friction & Ramp Effort Reduction',
            'Ramps reduce effort force by spreading the climb over a longer distance',
            'Friction opposes motion between surfaces in contact. Treads on shoes and tyres increase useful friction; grease, oil, and ball bearings reduce unwanted friction. An inclined plane (ramp) is a simple machine that reduces the effort needed to raise a heavy load.',
            'Steeper Ramp = More Effort, Shorter Distance  |  Gentler Ramp = Less Effort, Longer Distance',
            '📐 Loading Ramp & Shoe Tread Friction',
            'Using a wooden plank ramp to roll heavy drums of cooking oil onto a pickup truck.',
            'Why is it easier to push a heavy wheelbarrow up a long gentle ramp than to lift it straight up onto a lorry?',
            'KPSEA Science Practical: Ways of increasing and reducing friction in everyday machines.'
          )
        ]
      }
    ]
  },

  // GRADE 7 INTEGRATED SCIENCE
  {
    curriculum: 'CBC',
    grade: 7,
    subject: 'Integrated Science',
    code: 'ISCI-G7',
    trackPathway: 'Core',
    title: 'CBE Grade 7 (Junior School) Integrated Science Metro Line',
    stations: [
      {
        id: 'cbc_g7_sci_s1',
        number: 1,
        title: '1.0 Scientific Investigation & Mixtures, Elements and Compounds',
        strand: 'Strand 1.0: Mixtures, Elements and Compounds',
        icon: '🧪',
        status: 'available',
        summary: 'Laboratory hazard symbols, Bunsen burner flames, laboratory apparatus, mixtures, and acid-base plant indicators.',
        subtopics: [
          stop(
            'cbc_g7_sci_s1_1',
            '1.1 Laboratory Safety, Hazard Symbols & The Bunsen Burner',
            'Luminous vs Non-Luminous Flames & Safe Scientific Practice',
            'Open air-hole produces a hot, clean blue non-luminous flame for heating',
            'The Bunsen burner mixes flammable gas with air. When the collar air-hole is closed, incomplete combustion produces a yellow, wavy, sooty luminous flame (for visibility). When the air-hole is open, complete combustion produces a roaring blue non-luminous flame with three zones (hottest at the tip of the inner blue cone).',
            'Air-Hole Open → Complete Combustion → Hot Blue Non-Luminous Flame (No Soot)',
            '🔥 Bunsen Burner Flame Zones & Hazard Badges',
            'Operating gas burners safely in Junior School science laboratories across Kenya.',
            'Why do we always light a Bunsen burner with the air-hole closed, then open it when heating a beaker of water?',
            'KJSEA Integrated Science: Labeling parts of a Bunsen burner and comparing luminous vs non-luminous flames.'
          ),
          stop(
            'cbc_g7_sci_s1_2',
            '1.2 Mixtures, Separation Methods & Plant Acid-Base Indicators',
            'Filtration, Evaporation, Crystallisation, Simple Distillation & Hibiscus Indicators',
            'Physical separation methods exploit differences in particle size, solubility, and boiling point',
            'Solid-liquid and liquid-liquid mixtures are separated by filtration, decantation, evaporation, crystallisation, sublimation (iodine/ammonium chloride), solvent extraction (oil from nuts), and chromatography. Natural flower extracts (hibiscus, red cabbage) act as pH indicators.',
            'Soluble Solid + Liquid → Evaporation/Crystallisation (Salt) or Simple Distillation (Pure Water)',
            '⚗️ Liebig Condenser & Hibiscus pH Chart',
            'Extracting edible oil from groundnuts or macadamia nuts using solvent extraction and solar evaporation of salt in Malindi.',
            'During simple distillation, why must cold tap water enter the Liebig condenser at the bottom jacket inlet and exit at the top?',
            'KJSEA Science Practical: Designing a step-by-step procedure to separate a mixture of sand, common salt, and ammonium chloride.'
          )
        ]
      },
      {
        id: 'cbc_g7_sci_s2',
        number: 2,
        title: '2.0 Living Things and Their Environment',
        strand: 'Strand 2.0: Living Things and Their Environment',
        icon: '🧬',
        status: 'available',
        summary: 'Human reproductive system, adolescence changes, and the human excretory system (skin and kidneys).',
        subtopics: [
          stop(
            'cbc_g7_sci_s2_1',
            '2.1 The Human Excretory System: Skin and Kidneys',
            'Homeostatic Filtration of Metabolic Waste',
            'Kidneys filter urea, excess water, and salts from blood to form urine',
            'Excretion removes toxic metabolic wastes produced by chemical reactions inside body cells (urea, carbon dioxide, excess water and salts). The skin excretes sweat via sweat glands for thermoregulation; the kidneys filter blood through nephrons, passing urine down the ureters to the bladder.',
            'Renal Artery (Dirty Blood) → Kidney Nephrons → Ureter → Urinary Bladder → Urethra',
            '🫘 Human Urinary System & Skin Cross-Section',
            'Staying hydrated and preventing kidney stones and skin infections in hot climates.',
            'Why is egestion (passing undigested fibre faeces) NOT classified as excretion in biology?',
            'KJSEA Integrated Science: Labeling the kidney, ureter, bladder, urethra, and skin layers (epidermis, dermis, sweat gland).'
          )
        ]
      },
      {
        id: 'cbc_g7_sci_s3',
        number: 3,
        title: '3.0 Force and Energy',
        strand: 'Strand 3.0: Force and Energy',
        icon: '⚡',
        status: 'available',
        summary: 'Static electricity, simple electric circuits, conductors vs insulators, and magnetism.',
        subtopics: [
          stop(
            'cbc_g7_sci_s3_1',
            '3.1 Simple Electric Circuits, Conductors & Magnetism',
            'Closed Loops, Series vs Parallel Bulbs & Magnetic Poles',
            'Parallel circuits supply full cell voltage to each branch independently',
            'Current flows only through a complete closed loop of conductors (copper, aluminium, graphite). In a series circuit, if one bulb blows, the circuit breaks. In a parallel circuit, each bulb has its own branch and stays bright if another bulb is switched off. Magnetic poles follow the law of magnetism: like poles repel, unlike poles attract.',
            'Series: Single Path (Shared Voltage)  |  Parallel: Independent Branches (Full Voltage)',
            '💡 Domestic Parallel Circuit & Bar Magnet Field',
            'Why domestic lighting in Kenyan homes and solar home systems is wired in parallel rather than in series.',
            'Why is the surest test for whether a metal bar is a permanent magnet repulsion rather than attraction?',
            'KJSEA Integrated Science: Drawing standard circuit symbols (cell, battery, switch, bulb, ammeter) and testing conductors.'
          )
        ]
      }
    ]
  },

  // GRADE 8 INTEGRATED SCIENCE (Preserving IDs cbc_g8_sci_s1_1, cbc_g8_sci_s1_2, cbc_g8_sci_s2_1 + Strand 3.0 Force & Energy)
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
        icon: '⚗️',
        status: 'available',
        summary: 'Elements and compounds, kinetic theory of matter, fractional distillation, chromatography, acids, bases, and fire control.',
        subtopics: [
          stop(
            'cbc_g8_sci_s1_1',
            '1.1 Separation Techniques: Fractional Distillation & Chromatography',
            'Exploiting Differences in Physical Properties',
            'Substances in a mixture separate without chemical reactions because their boiling points or solubilities differ',
            'Mixtures consist of two or more substances physically mingled together, not chemically bonded. Fractional distillation separates miscible liquids (like water and ethanol, or crude oil fractions) because each compound boils at a distinct temperature. Paper chromatography separates pigments based on solubility in a mobile solvent versus attraction to stationary absorbent paper.',
            'Difference in Boiling Point (ΔTb) → Separation by Fractional Distillation',
            '🧪 Fractionating Column & Chromatogram Model',
            'Refining crude oil into petrol, diesel, and kerosene, and purifying herbal extracts in Kenya.',
            'Why does ethanol vapor (b.p. 78°C) reach the top of the fractionating column before water vapor (b.p. 100°C) when heated together?',
            'KJSEA Science Practical Assessment: Interpreting paper chromatograms and labeling glass beads in a fractionating column.',
            [
              'Step 1: Identify the key difference in physical properties (e.g. Ethanol boils at 78°C; Water boils at 100°C).',
              'Step 2: Heat the mixture: The lower-boiling liquid vaporizes first and rises up the fractionating column.',
              'Step 3: Cool and condense: The vapor passes into the Liebig condenser, turns back into pure liquid, and is collected.'
            ],
            'Separating water and ethanol: Heat at 78°C. Ethanol vaporizes, condenses in the Liebig condenser, and collects in the receiver flask.'
          ),
          stop(
            'cbc_g8_sci_s1_2',
            '1.2 Elements, Compounds, Acids, Bases & Fire Triangle',
            'Chemical Symbols, Neutralisation & Breaking the Fire Triangle',
            'Removing heat, fuel, or oxygen extinguishes any class of fire',
            'Elements are pure substances made of one kind of atom (H, O, Na, Fe, Cu); compounds consist of two or more elements chemically combined (H₂O, NaCl, CO₂). Acids (pH < 7) react with bases (pH > 7) to form salt and water. Combustion requires Fuel, Oxygen, and Heat (the Fire Triangle).',
            'Acid + Base → Salt + Water  |  Fire Triangle = Fuel + Oxygen + Heat',
            '🌈 pH Scale 0–14 & Fire Extinguisher Classes',
            'Balancing soil pH for tea and maize farming in the Rift Valley and selecting CO₂ vs foam extinguishers for electrical fires.',
            'Why is it dangerous to pour water onto a burning cooking oil pan or a live electrical switchboard fire?',
            'KJSEA Model Item: Writing chemical symbols of the first 20 elements and matching fire classes to extinguisher types.'
          )
        ]
      },
      {
        id: 'cbc_g8_sci_s2',
        number: 2,
        title: '2.0 Living Things and Their Environment',
        strand: 'Strand 2.0: Living Things and Their Environment',
        icon: '🫀',
        status: 'available',
        summary: 'Plant and animal cell structure under the light microscope, osmosis and diffusion, human circulation, and respiration.',
        subtopics: [
          stop(
            'cbc_g8_sci_s2_1',
            '2.1 Cell Structure, Osmosis & Double Circulation in the Heart',
            'Two Continuous Loops in One Biological Pump',
            'Plant cells have cellulose walls and chloroplasts; Mammalian blood passes through the heart twice per circuit',
            'Plant cells possess a rigid cellulose cell wall, large central sap vacuole, and chloroplasts, whereas animal cells have only a flexible cell membrane. In human physiology, the double circulatory system separates the pulmonary circuit (Right Ventricle → Lungs → Left Atrium) from the high-pressure systemic circuit (Left Ventricle → Aorta → Body → Right Atrium).',
            'Pulmonary: RV → Lungs → LA  |  Systemic: LV → Body → RA',
            '❤️ Figure-8 Double Circulatory Loop & Cell Organelles',
            'Understanding athletic stamina in Kenyan marathon runners and how plant root hairs absorb water by osmosis.',
            'Why is the muscular wall of the left ventricle significantly thicker than that of the right ventricle?',
            'KJSEA Living World: Comparing plant and animal cells under a microscope and labeling heart chambers and valves.'
          )
        ]
      },
      {
        id: 'cbc_g8_sci_s3',
        number: 3,
        title: '3.0 Force and Energy',
        strand: 'Strand 3.0: Force and Energy',
        icon: '⚙️',
        status: 'available',
        summary: 'Transformation of energy, renewable energy appliances, pressure in solids and liquids, and simple machines.',
        subtopics: [
          stop(
            'cbc_g8_sci_s3_1',
            '3.1 Pressure in Solids & Liquids and Energy Transformations',
            'Force per Unit Area (P = F/A) & Conservation of Energy',
            'Energy cannot be created or destroyed, only transformed from one form to another',
            'Pressure in solids equals Force divided by Area (P = F/A in N/m² or Pascals). In liquids, pressure increases with depth (P = hρg) and acts equally in all directions at a given depth. Simple machines and electrical appliances transform chemical, solar, or mechanical energy into light, heat, and kinetic energy.',
            'Pressure (P) = Force (F) ÷ Area (A)  |  Efficiency = (MA ÷ VR) × 100%',
            '🏗️ Dam Depth Pressure Jets & Pulley Rig',
            'Cranes lifting shipping containers at the Port of Mombasa and gravity-fed elevated water tanks in schools.',
            'If a tin can has three identical holes punched at the top, middle, and bottom and is filled with water, why does the bottom jet shoot farthest horizontally?',
            'KJSEA Practical Science: Calculating pressure exerted by rectangular blocks resting on different faces.'
          )
        ]
      }
    ]
  },

  // GRADE 9 INTEGRATED SCIENCE (KJSEA Capstone)
  {
    curriculum: 'CBC',
    grade: 9,
    subject: 'Integrated Science',
    code: 'ISCI-G9',
    trackPathway: 'Core',
    title: 'CBE Grade 9 (Junior School Capstone) Integrated Science Metro Line',
    stations: [
      {
        id: 'cbc_g9_sci_s1',
        number: 1,
        title: '1.0 Mixtures, Elements and Compounds',
        strand: 'Strand 1.0: Mixtures, Elements and Compounds',
        icon: '⚛️',
        status: 'available',
        summary: 'Structure of the atom, electron arrangement (first 20 elements), alloys, water hardness, and chemical word equations.',
        subtopics: [
          stop(
            'cbc_g9_sci_s1_1',
            '1.1 Structure of the Atom, Electron Arrangement & Alloys',
            'Protons, Neutrons, Electron Shells (2.8.8.2) & Metallic Alloys',
            'Valence electrons determine chemical group, valency, and reactivity',
            'Atoms contain protons and neutrons in the nucleus (Mass Number A = Z + N) and electrons in shells (maximum 2 in first shell, 8 in second, 8 in third for the first 20 elements). Metals and alloys (brass, bronze, stainless steel, duralumin) combine strength, corrosion resistance, and conductivity.',
            'Mass Number (A) = Atomic Number (Z) + Neutrons (N)',
            '⚛️ Bohr Shell Diagrams (H to Ca) & Alloy Lattice',
            'Using duralumin in aircraft bodies and galvanized corrugated iron (mabati) sheets for durable Kenyan roofing.',
            'An element has atomic number 12 and mass number 24. What is its electron configuration, which group and period does it belong to, and how many neutrons does it have?',
            'KJSEA Grade 9 Capstone: Drawing dot/cross electron configurations for elements Z = 1 to 20 and explaining temporary vs permanent water hardness.'
          )
        ]
      },
      {
        id: 'cbc_g9_sci_s2',
        number: 2,
        title: '2.0 Living Things and Their Environment',
        strand: 'Strand 2.0: Living Things and Their Environment',
        icon: '🌿',
        status: 'available',
        summary: 'Nutrition in plants (photosynthesis conditions) and animals (dentition and digestive enzymes), reproduction in plants, and ecology.',
        subtopics: [
          stop(
            'cbc_g9_sci_s2_1',
            '2.1 Photosynthesis, Digestion & Ecosystem Food Webs',
            'Energy Flow from Producers to Consumers and Decomposers',
            'Green plants fix solar energy; trophic pyramids transfer ~10% of energy per level',
            'Leaves are adapted for photosynthesis (broad lamina, waxy cuticle, palisade chloroplasts, stomata). Testing a leaf for starch requires boiling in water (kill cells), boiling in ethanol in a water bath (remove chlorophyll safely), rinsing in warm water (soften), and adding iodine solution. In ecosystems,biotic and abiotic factors interact through food chains and webs.',
            'Solar Energy → Producers (Plants) → Primary Consumers (Herbivores) → Secondary Consumers',
            '🦁 Mara Savannah Food Web & Starch Leaf Test',
            'Modeling predator-prey population balance between wildebeest, zebras, lions, and savannah grass in the Maasai Mara.',
            'When testing a variegated leaf for starch, why must the tube of methylated spirit (ethanol) be heated inside a hot water bath rather than directly over a naked Bunsen flame?',
            'KJSEA Grade 9 Practical: Explaining every step of the leaf starch test and constructing terrestrial and aquatic food webs.'
          )
        ]
      },
      {
        id: 'cbc_g9_sci_s3',
        number: 3,
        title: '3.0 Force and Energy',
        strand: 'Strand 3.0: Force and Energy',
        icon: '🔭',
        status: 'available',
        summary: 'Concave and convex curved mirrors, mechanical and electromagnetic waves, and domestic electricity.',
        subtopics: [
          stop(
            'cbc_g9_sci_s3_1',
            '3.1 Curved Mirrors (Concave & Convex) and Wave Motion',
            'Principal Focus, Ray Diagrams & Wide-Field Convex Rear-View Mirrors',
            'Convex mirrors always form upright, diminished images over a wide field of view',
            'Concave (converging) mirrors reflect parallel rays through a real principal focus F (used in solar concentrators, shaving mirrors, car headlamps). Convex (diverging) mirrors diverge rays from a virtual focus behind the mirror, always producing an upright, diminished virtual image with a wide field of view.',
            'Focal Length (f) = Radius of Curvature (R) ÷ 2  |  Wave Speed: v = f × λ',
            '🪞 Concave & Convex Mirror Ray Diagrams',
            'Side-view driving mirrors on matatus and security mirrors in Nairobi supermarkets using convex mirrors.',
            'Why do vehicle side mirrors carry the warning "Objects in mirror are closer than they appear"?',
            'KJSEA Grade 9 Capstone: Drawing ray diagrams for concave and convex mirrors and calculating wave speed v = fλ.'
          )
        ]
      }
    ]
  }
];

module.exports = CBC_STEM_MAPS;
