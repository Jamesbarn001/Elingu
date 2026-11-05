const { mcq, num, short, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_igcse_y10_biology_set1',
  curriculum: 'BRITISH',
  grade: 10,
  gradeRange: [10, 11],
  subject: 'Biology',
  scale: 'IGCSE',
  title: 'IGCSE Biology (Year 10) — Practice Paper 1',
  series: 'Elingu practice paper, Cambridge IGCSE style',
  durationMinutes: 60,
  calculatorAllowed: true,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: type your answer using correct biological terms. A calculator is allowed.'
}, [
  {
    title: 'Section A — Multiple choice',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Characteristics of living things', 'Which of these is NOT a characteristic of all living organisms?', ['Respiration', 'Excretion', 'Dissolving', 'Reproduction'], 'C', 'Living things move, respire, are sensitive, grow, reproduce, excrete and need nutrition. Dissolving is not one of them.'),
      mcq('Cell structure', 'In which part of a plant cell does photosynthesis take place?', ['Nucleus', 'Chloroplast', 'Mitochondrion', 'Vacuole'], 'B', 'Chloroplasts contain chlorophyll and carry out photosynthesis.'),
      mcq('Enzymes', 'An enzyme is denatured by…', ['a high temperature', 'a low temperature only', 'adding water', 'adding substrate'], 'A', 'High temperatures change the shape of the active site, so the enzyme stops working.'),
      mcq('Cell division', 'Mitosis produces…', ['four genetically different cells', 'two genetically identical daughter cells', 'gametes', 'one cell with half the chromosomes'], 'B', 'Mitosis is used for growth and repair and gives two identical cells.'),
      mcq('Cell division', 'Meiosis is the type of cell division that produces…', ['gametes', 'skin cells', 'blood cells', 'identical clones'], 'A', 'Meiosis halves the chromosome number to make gametes.'),
      mcq('Inheritance', 'How many chromosomes are there in a normal human gamete (sperm or egg)?', ['23', '46', '48', '92'], 'A', 'Gametes are haploid: 23 chromosomes.'),
      mcq('Respiration', 'Which products are made when yeast respires anaerobically?', ['Lactic acid', 'Ethanol and carbon dioxide', 'Water and oxygen', 'Glucose'], 'B', 'Yeast fermentation: glucose → ethanol + carbon dioxide.'),
      mcq('Respiration', 'Which product is made during anaerobic respiration in human muscles?', ['Lactic acid', 'Ethanol', 'Starch', 'Carbon monoxide'], 'A', 'Muscles make lactic acid when there is not enough oxygen.'),
      mcq('Blood', 'Which blood component helps the blood to clot?', ['Red blood cells', 'Platelets', 'Plasma proteins only', 'White blood cells'], 'B', 'Platelets help to form a clot at a wound.'),
      mcq('Circulation', 'Which type of blood vessel has valves to stop the backflow of blood?', ['Arteries', 'Veins', 'Capillaries', 'Aorta'], 'B', 'Veins carry blood at low pressure and have valves.'),
      mcq('Disease', 'Malaria is spread by…', ['contaminated water', 'the female Anopheles mosquito', 'sneezing', 'tsetse flies'], 'B', 'Malaria is caused by Plasmodium and passed on by the female Anopheles mosquito.'),
      mcq('Plant transport', 'Gases enter and leave a leaf through small pores called…', ['stomata', 'xylem', 'root hairs', 'guard nuclei'], 'A', 'Stomata open and close and allow gas exchange.'),
      mcq('Coordination', 'In which organ is the hormone insulin made?', ['Liver', 'Pancreas', 'Kidney', 'Stomach'], 'B', 'The pancreas makes insulin, which lowers blood glucose.'),
      mcq('Inheritance', 'A plant with genotype Tt has a tall phenotype when T (tall) is dominant. What is the genotype Tt called?', ['Homozygous dominant', 'Homozygous recessive', 'Heterozygous', 'Haploid'], 'C', 'Tt has two different alleles, so it is heterozygous.'),
      mcq('Evolution', 'Natural selection means that…', ['all organisms survive equally', 'organisms best adapted to their environment are more likely to survive and reproduce', 'organisms choose to change', 'mutations are always harmful'], 'B', 'Better-adapted individuals survive and pass on their useful alleles.')
    ]
  },
  {
    title: 'Section B — Short answers and calculations',
    instructions: 'Type your answer.',
    questions: [
      num('Microscopy', 'A cell is 40 mm long in a drawing. Its actual length is 0.2 mm. Calculate the magnification of the drawing.', 200, 2, { method: [{ any: ['40/0.2', '40 / 0.2', '40 ÷ 0.2', 'image', 'actual'] }], explanation: 'Magnification = image size ÷ actual size = 40 ÷ 0.2 = 200 (×200).' }),
      short('Transport', 'Define osmosis.', [{ any: ['water', 'water molecules'] }, { any: ['partially permeable membrane', 'semi-permeable membrane', 'selectively permeable membrane', 'semipermeable membrane', 'partially permeable'] }, { any: ['dilute', 'high water potential', 'higher water potential', 'low concentration of solute'] }], 2, 'The net movement of water molecules through a partially permeable membrane from a region of higher water potential (dilute solution) to a region of lower water potential (concentrated solution).', 'Water moves through a partially permeable membrane from a dilute solution to a more concentrated one'),
      short('Food tests', 'Describe how to test a food sample for glucose.', [{ any: ['benedict', "benedict's", 'benedicts'] }, { any: ['heat', 'warm', 'boil', 'water bath'] }, { any: ['brick-red', 'brick red', 'orange', 'red precipitate', 'orange-red'] }], 2, "Add Benedict's solution and heat in a water bath. A brick-red (orange-red) precipitate shows glucose is present.", "Add Benedict's solution and heat it: it turns brick-red"),
      num('Genetics', 'Two heterozygous tall plants (Tt × Tt) are crossed. What is the probability that an offspring is short (tt)?', 0.25, 2, { alternatives: ['1/4'], tolerance: 0.001, sample: '1/4', method: [{ any: ['tt', 'punnett', 'T t', 'TT'] }], explanation: 'The offspring are TT, Tt, Tt and tt, so the chance of tt is 1 in 4 = 1/4.' }),
      term('Digestion', 'Name the enzyme in saliva that breaks down starch.', ['amylase', 'salivary amylase'], 1, 'Amylase breaks starch into maltose.'),
      short('Human organs', 'State two functions of the liver.', [{ any: ['urea', 'deamination', 'breaks down amino acids'] }, { any: ['detoxify', 'detoxification', 'breaks down toxins', 'breaks down alcohol', 'breaks down drugs', 'poisons'] }, { any: ['bile'] }, { any: ['store glycogen', 'stores glycogen', 'glycogen', 'stores iron', 'stores vitamins'] }], 2, 'Makes urea, detoxifies poisons and drugs, makes bile, stores glycogen, iron and vitamins.', 'It makes bile and stores glycogen'),
      short('Breathing', 'Explain why breathing rate increases during exercise.', [{ any: ['more respiration', 'muscles respire more', 'respire faster', 'increased respiration', 'more energy', 'carbon dioxide increases', 'more carbon dioxide', 'build-up of carbon dioxide'] }, { any: ['more oxygen', 'oxygen is needed', 'supply oxygen', 'remove carbon dioxide', 'remove co2', 'get rid of carbon dioxide', 'get rid of co2'] }], 2, 'Muscles respire faster, so they need more oxygen and make more carbon dioxide. Breathing faster supplies oxygen and removes carbon dioxide.', 'The muscles respire more so more oxygen is needed and carbon dioxide must be removed'),
      term('Plant transport', 'Name the process by which plants lose water vapour from their leaves.', ['transpiration'], 1, 'Transpiration: evaporation of water from the leaves, mainly through the stomata.'),
      short('Disease', 'State two ways of preventing the spread of malaria.', [{ any: ['mosquito net', 'mosquito nets', 'bed net', 'bed nets', 'insecticide treated nets'] }, { any: ['drain', 'stagnant water', 'standing water', 'remove breeding sites', 'breeding sites'] }, { any: ['insecticide', 'spray', 'spraying'] }, { any: ['repellent', 'repellents', 'cover skin', 'long sleeves'] }], 2, 'Sleep under mosquito nets, drain standing water where mosquitoes breed, spray insecticides, and use repellents.', 'Use mosquito nets and drain stagnant water'),
      num('Ecology', 'In the food chain grass → grasshopper → frog → snake, the grass contains 10 000 kJ of energy. Assuming 10% of energy is passed on at each stage, how much energy reaches the frog, in kJ?', 100, 2, { unit: ['kj'], method: [{ any: ['1000', '10%', '0.1', '10/100'] }], explanation: 'Grass → grasshopper: 10% of 10 000 = 1 000 kJ. Grasshopper → frog: 10% of 1 000 = 100 kJ.' }),
      term('Hormones', 'Name the hormone that lowers blood glucose concentration.', ['insulin'], 1, 'Insulin makes the liver store glucose as glycogen.'),
      short('Human impact', 'State one effect of deforestation.', [{ any: ['soil erosion', 'loss of habitat', 'loss of habitats', 'less carbon dioxide', 'less photosynthesis', 'climate change', 'global warming', 'extinction', 'loss of biodiversity', 'flooding', 'less rainfall', 'desertification', 'leaching'] }], 1, 'Soil erosion, loss of habitats and biodiversity, more carbon dioxide in the air, flooding and changes to rainfall.', 'Soil erosion'),
      num('Inheritance', 'How many chromosomes are there in a human zygote?', 46, 1, { explanation: 'A zygote forms when a 23-chromosome sperm fuses with a 23-chromosome egg: 46.' }),
      short('Adaptation', 'State one way in which a root hair cell is adapted for absorbing water.', [{ any: ['large surface area', 'big surface area', 'long projection', 'long thin projection', 'thin wall', 'thin cell wall', 'increases surface area', 'increase surface area', 'many mitochondria', 'active transport'] }], 1, 'It has a long, thin projection that gives a large surface area, and a thin wall.', 'It has a large surface area')
    ]
  }
]);
