const { mcq, short, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_cbc_g8_science_set1',
  curriculum: 'CBC',
  grade: 8,
  gradeRange: [7, 9],
  subject: 'Integrated Science',
  scale: 'CBC',
  title: 'Grade 8 Integrated Science — Practice Paper 1',
  series: 'Elingu practice paper, KJSEA style',
  durationMinutes: 45,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: write short answers in your own words. Spelling is not marked, but use the correct science words.'
}, [
  {
    title: 'Section A — Choose the correct answer',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Cells', 'What is the basic unit of life?', ['A tissue', 'A cell', 'An organ', 'An organ system'], 'B', 'All living things are made of cells. Cells make up tissues, tissues make up organs.'),
      mcq('Photosynthesis', 'Which gas do green plants take in from the air for photosynthesis?', ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'], 'C', 'Plants take in carbon dioxide and give out oxygen during photosynthesis.'),
      mcq('States of matter', 'Which state of matter has a fixed volume but no fixed shape?', ['Solid', 'Liquid', 'Gas', 'Plasma'], 'B', 'A liquid takes the shape of its container but its volume stays the same.'),
      mcq('Mixtures', 'Which of these is a mixture?', ['Pure water', 'Salt dissolved in water', 'Oxygen', 'Iron'], 'B', 'Salt solution contains two substances mixed together. The others are single pure substances.'),
      mcq('Separating mixtures', 'Which method would you use to get salt from salty water?', ['Evaporation', 'Filtration', 'Using a magnet', 'Sieving'], 'A', 'Heating the solution makes the water evaporate and leaves the salt behind.'),
      mcq('Forces', 'What is the SI unit of force?', ['Joule', 'Watt', 'Newton', 'Pascal'], 'C', 'Force is measured in newtons (N).'),
      mcq('Energy', 'Which energy change happens in a solar panel?', ['Chemical to heat', 'Electrical to light', 'Heat to sound', 'Light to electrical'], 'D', 'A solar panel changes light energy from the sun into electrical energy.'),
      mcq('Light', 'In a uniform material such as air, light travels in…', ['straight lines', 'curves', 'circles', 'zigzags'], 'A', 'Light travels in straight lines. This is why shadows have sharp edges.'),
      mcq('Electricity', 'Which material is a good conductor of electricity?', ['Rubber', 'Copper', 'Dry wood', 'Plastic'], 'B', 'Metals such as copper let electric current pass easily.'),
      mcq('Human body', 'Which part of the blood carries oxygen around the body?', ['Red blood cells', 'White blood cells', 'Platelets', 'Plasma water'], 'A', 'Red blood cells contain haemoglobin, which carries oxygen.'),
      mcq('Digestion', 'Where does most absorption of digested food into the blood take place?', ['Stomach', 'Mouth', 'Small intestine', 'Large intestine'], 'C', 'The small intestine has villi that give a large surface area for absorption.'),
      mcq('Classification', 'Which of these animals is a vertebrate?', ['Earthworm', 'Grasshopper', 'Tilapia fish', 'Snail'], 'C', 'A tilapia has a backbone. The others do not.'),
      mcq('Sound', 'The pitch of a sound depends on its…', ['amplitude', 'frequency', 'speed', 'echo'], 'B', 'Higher frequency gives a higher pitch. Amplitude affects loudness.'),
      mcq('Chemical change', 'Iron rusts when it is in contact with…', ['oxygen only', 'water only', 'nitrogen and water', 'oxygen and water'], 'D', 'Rusting needs both oxygen and water.'),
      mcq('Food chains', 'An animal that eats only plants is called a…', ['herbivore', 'carnivore', 'omnivore', 'decomposer'], 'A', 'Herbivores, such as zebras and cows, feed only on plants.')
    ]
  },
  {
    title: 'Section B — Short answers',
    instructions: 'Write your answer in a few words or one or two sentences.',
    questions: [
      short('Materials', 'State two properties of metals.',
        [{ any: ['conduct electricity', 'conducts electricity', 'good conductor of electricity', 'electrical conductor'] }, { any: ['conduct heat', 'conducts heat', 'good conductor of heat', 'heat conductor'] }, { any: ['shiny', 'lustre', 'lustrous'] }, { any: ['malleable', 'hammered into shape'] }, { any: ['ductile', 'drawn into wires'] }],
        2, 'Any two: they conduct electricity; they conduct heat; they are shiny; they are malleable; they are ductile.', 'They conduct electricity and they are shiny'),
      term('States of matter', 'What is the name of the process in which water vapour changes into liquid water?', ['condensation'], 1, 'Condensation: a gas cools and turns into a liquid.'),
      term('Human body', 'Name the organ system that transports blood around the body.', ['circulatory system', 'circulatory'], 1, 'The circulatory system (heart, blood vessels and blood).'),
      short('Light', 'Explain why the Moon appears to shine in the night sky.',
        [{ any: ['reflect', 'reflects', 'reflected', 'reflecting'] }, { any: ['sun', 'sunlight', "sun's light"] }],
        2, 'The Moon does not make its own light. It reflects light from the Sun.', 'It reflects light from the sun'),
      short('Environment', 'Give two ways of saving water at home.',
        [{ any: ['close the tap', 'turn off the tap', 'close taps', 'switch off the tap', 'not leave the tap running'] }, { any: ['rainwater', 'harvest rain', 'collect rain', 'rain water'] }, { any: ['reuse water', 're-use water', 'recycle water', 'grey water', 'greywater', 'reuse the water'] }, { any: ['fix leaks', 'repair leaks', 'mend leaking', 'leaking pipes', 'leaking taps'] }, { any: ['short shower', 'shorter showers', 'bucket'] }],
        2, 'Any two: close taps when not in use; harvest rainwater; reuse water for plants; repair leaking pipes; take shorter showers.', 'Close the tap when brushing and harvest rainwater'),
      short('Plants', 'State two functions of the roots of a plant.',
        [{ any: ['absorb water', 'absorbs water', 'take in water', 'takes in water', 'water absorption'] }, { any: ['mineral salts', 'minerals', 'nutrients'] }, { any: ['anchor', 'anchors', 'hold the plant', 'support', 'fix the plant'] }],
        2, 'Roots absorb water and mineral salts from the soil, and they anchor the plant in the ground.', 'They absorb water and anchor the plant'),
      short('Human body', 'What is the main job of white blood cells?',
        [{ any: ['fight infection', 'fight infections', 'fight germs', 'fight disease', 'fight bacteria', 'defend', 'protect against', 'kill germs', 'destroy germs', 'immunity', 'immune'] }],
        1, 'White blood cells defend the body by fighting germs that cause infections.', 'They fight germs'),
      short('Photosynthesis', 'Write the word equation for photosynthesis.',
        [{ all: ['carbon dioxide', 'water'] }, { all: ['glucose', 'oxygen'] }],
        2, 'Carbon dioxide + water → glucose + oxygen (in the presence of light and chlorophyll).', 'carbon dioxide + water -> glucose + oxygen'),
      short('Electricity', 'A new battery is connected to a bulb but the bulb does not light. Give one possible reason.',
        [{ any: ['broken circuit', 'open circuit', 'gap in the circuit', 'loose connection', 'not connected', 'bulb is blown', 'bulb has blown', 'faulty bulb', 'fused', 'broken wire', 'switch is open', 'switch is off', 'switch off', 'broken filament', 'the circuit is not complete', 'incomplete circuit', 'circuit is broken', 'broken circuit'] }],
        1, 'The circuit is not complete (a loose wire, an open switch) or the bulb is blown.', 'The circuit is broken'),
      short('Environment', 'Explain why plastic waste should not be burnt.',
        [{ any: ['toxic', 'poisonous', 'harmful', 'pollut', 'poison'] }, { any: ['gas', 'gases', 'smoke', 'fumes', 'air'] }],
        2, 'Burning plastic gives off poisonous gases and smoke that pollute the air and harm people and animals.', 'It gives off toxic smoke that pollutes the air')
    ]
  }
]);
