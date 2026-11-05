const { mcq, short, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_cbc_g10_biology_set1',
  curriculum: 'CBC',
  grade: 10,
  gradeRange: [10, 12],
  subject: 'Biology',
  scale: 'CBC',
  title: 'Grade 10 Biology — Practice Paper 1',
  series: 'Elingu practice paper, Senior School style',
  durationMinutes: 50,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: write short answers using correct biological words.'
}, [
  {
    title: 'Section A — Choose the correct answer',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Cell biology', 'Which organelle is known as the "powerhouse" of the cell?', ['Nucleus', 'Mitochondrion', 'Ribosome', 'Vacuole'], 'B', 'Mitochondria release energy from glucose during respiration.'),
      mcq('Cell biology', 'Which part of a cell controls its activities?', ['Nucleus', 'Cell wall', 'Chloroplast', 'Cell membrane'], 'A', 'The nucleus contains the DNA that controls the cell.'),
      mcq('Transport in cells', 'Diffusion is the movement of particles from…', ['low to high concentration using energy', 'a region of low to high concentration down a gradient', 'high to low concentration', 'one cell to a different cell only'], 'C', 'Particles move from a region of high concentration to low concentration, without using energy.'),
      mcq('Enzymes', 'Enzymes are…', ['sugars', 'fats', 'minerals', 'biological catalysts'], 'D', 'Enzymes are proteins that speed up reactions without being used up.'),
      mcq('Genetics', 'Which molecule carries the instructions for inheritance?', ['DNA', 'Starch', 'Glucose', 'Haemoglobin'], 'A', 'DNA is found in the chromosomes in the nucleus.'),
      mcq('Cell biology', 'The cell wall of a plant cell is made mainly of…', ['protein', 'cellulose', 'fat', 'starch'], 'B', 'Cellulose gives the plant cell wall its strength.'),
      mcq('Transport in cells', 'Osmosis is the movement of…', ['glucose across a membrane', 'oxygen into the blood', 'water across a partially permeable membrane', 'salts out of a cell'], 'C', 'Osmosis is the net movement of water through a partially permeable membrane from a dilute to a concentrated solution.'),
      mcq('Gas exchange', 'Where does gas exchange take place in the lungs?', ['Alveoli', 'Trachea', 'Bronchi', 'Diaphragm'], 'A', 'Alveoli are tiny air sacs with thin walls and many capillaries.'),
      mcq('Circulation', 'Which blood vessels carry blood away from the heart?', ['Veins', 'Arteries', 'Capillaries', 'Venules'], 'B', 'Arteries carry blood away from the heart at high pressure.'),
      mcq('Nutrition', 'Which nutrient is needed mainly for growth and repair of the body?', ['Carbohydrates', 'Fats', 'Proteins', 'Water'], 'C', 'Proteins are used to build and repair cells.'),
      mcq('Nutrition', 'Iodine solution is used to test for starch. A positive result is…', ['red', 'green', 'orange', 'blue-black'], 'D', 'Iodine turns from brown-orange to blue-black when starch is present.'),
      mcq('Plant transport', 'Which plant tissue carries water from the roots to the leaves?', ['Xylem', 'Phloem', 'Epidermis', 'Cambium'], 'A', 'Xylem vessels carry water and mineral salts upwards.'),
      mcq('Plant biology', 'What is the main function of stomata?', ['Absorbing water', 'Gas exchange', 'Storing starch', 'Making seeds'], 'B', 'Stomata let carbon dioxide in and oxygen and water vapour out.'),
      mcq('Genetics', 'How many chromosomes are in a normal human body cell?', ['23', '44', '46', '48'], 'C', 'Human body cells have 23 pairs: 46 chromosomes.'),
      mcq('Digestion', 'Which enzyme in saliva begins the digestion of starch?', ['Pepsin', 'Lipase', 'Trypsin', 'Amylase'], 'D', 'Salivary amylase breaks starch down into sugars.')
    ]
  },
  {
    title: 'Section B — Short answers',
    instructions: 'Write your answers in a few words or one or two sentences.',
    questions: [
      short('Transport in cells', 'Define diffusion.',
        [{ any: ['movement of particles', 'movement of molecules', 'particles move', 'molecules move', 'net movement', 'movement of substances'] }, { any: ['high concentration', 'higher concentration'] }, { any: ['low concentration', 'lower concentration'] }],
        2, 'Diffusion is the net movement of particles from a region of higher concentration to a region of lower concentration.', 'The movement of particles from high concentration to low concentration'),
      term('Plant biology', 'Name the process by which plants lose water vapour through their stomata.', ['transpiration'], 1, 'Transpiration: evaporation of water from leaves through the stomata.'),
      short('Human body', 'State two functions of the skeleton.',
        [{ any: ['support', 'supports', 'shape'] }, { any: ['protect', 'protects', 'protection'] }, { any: ['movement', 'move', 'muscles attach', 'attachment'] }, { any: ['blood cells', 'make blood', 'produce blood'] }],
        2, 'Support, protection of organs, movement, and making blood cells in bone marrow.', 'It supports the body and protects organs'),
      short('Respiration', 'Write the word equation for aerobic respiration.',
        [{ all: ['glucose', 'oxygen'] }, { all: ['carbon dioxide', 'water'] }],
        2, 'Glucose + oxygen → carbon dioxide + water (+ energy released).', 'glucose + oxygen -> carbon dioxide + water + energy'),
      short('Gas exchange', 'State two features of the alveoli that make them good for gas exchange.',
        [{ any: ['thin wall', 'thin walls', 'thin membrane', 'one cell thick', 'very thin'] }, { any: ['large surface area', 'big surface area', 'many alveoli', 'lots of alveoli'] }, { any: ['moist', 'wet surface'] }, { any: ['blood supply', 'many capillaries', 'network of capillaries', 'capillaries'] }],
        2, 'Thin walls (short diffusion distance), a very large surface area, a moist lining, and a rich blood supply.', 'They have thin walls and a large surface area'),
      short('Nutrition', 'Explain why a balanced diet is important.',
        [{ any: ['all nutrients', 'all the nutrients', 'right amounts', 'correct amounts', 'proper amounts', 'all food groups', 'variety'] }, { any: ['health', 'healthy', 'growth', 'energy', 'deficiency', 'disease', 'diseases', 'repair'] }],
        2, 'A balanced diet gives the body all the nutrients in the right amounts for energy, growth and repair, and prevents deficiency diseases.', 'It gives all the nutrients in the right amounts for growth and health'),
      term('Nutrition', 'Which vitamin deficiency causes scurvy?', ['vitamin c', 'c', 'ascorbic acid'], 1, 'Lack of vitamin C causes scurvy (bleeding gums, slow healing).'),
      short('Genetics', 'What is a gene?',
        [{ any: ['section of dna', 'part of dna', 'length of dna', 'piece of dna', 'segment of dna', 'portion of dna', 'unit of inheritance', 'unit of heredity', 'sequence of dna'] }],
        1, 'A gene is a section of DNA that codes for a particular characteristic (a protein).', 'A section of DNA that codes for a characteristic'),
      term('Human body', 'Name the organ in which urea is made from excess amino acids.', ['liver', 'the liver'], 1, 'The liver breaks down excess amino acids and makes urea.'),
      short('Plant biology', 'Explain why most leaves are broad and thin.',
        [{ any: ['large surface area', 'big surface area', 'absorb light', 'absorb more light', 'capture light', 'trap light', 'more light'] }, { any: ['thin', 'short distance', 'gases diffuse', 'diffusion', 'diffuse quickly', 'light reaches'] }],
        2, 'A broad leaf has a large surface area to absorb light, and a thin leaf means gases diffuse quickly and light reaches all the cells.', 'Broad for a large surface area to absorb light and thin so gases diffuse quickly')
    ]
  }
]);
