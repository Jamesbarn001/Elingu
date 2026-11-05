const { mcq, short, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_cbc_g8_social_set1',
  curriculum: 'CBC',
  grade: 8,
  gradeRange: [7, 9],
  subject: 'Social Studies',
  scale: 'CBC',
  title: 'Grade 8 Social Studies — Practice Paper 1',
  series: 'Elingu practice paper, KJSEA style',
  durationMinutes: 45,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: write short answers in your own words.'
}, [
  {
    title: 'Section A — Choose the correct answer',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Kenya and its people', 'What is the capital city of Kenya?', ['Mombasa', 'Nairobi', 'Kisumu', 'Nakuru'], 'B', 'Nairobi is the capital and largest city.'),
      mcq('Physical features', 'What is the highest mountain in Kenya?', ['Mount Kenya', 'Mount Kilimanjaro', 'Mount Elgon', 'Mount Longonot'], 'A', 'Mount Kenya (5,199 m) is Kenya\'s highest mountain. Kilimanjaro is in Tanzania.'),
      mcq('History', 'On what date did Kenya become independent?', ['1 June 1963', '12 December 1964', '12 December 1963', '1 January 1960'], 'C', 'Kenya gained independence on 12 December 1963 (Jamhuri Day is 12 December, when Kenya became a republic in 1964).'),
      mcq('Governance', 'How many counties does Kenya have?', ['8', '42', '47', '50'], 'C', 'Kenya has 47 counties under the 2010 Constitution.'),
      mcq('Physical features', 'Which is the largest lake in Africa by area?', ['Lake Turkana', 'Lake Victoria', 'Lake Naivasha', 'Lake Nakuru'], 'B', 'Lake Victoria is the largest lake in Africa and is shared by Kenya, Uganda and Tanzania.'),
      mcq('Map work', 'The imaginary line at 0° latitude is called the…', ['Equator', 'Prime Meridian', 'Tropic of Cancer', 'Greenwich Line'], 'A', 'The Equator is 0° latitude and passes through Kenya.'),
      mcq('Physical features', 'Which of these lakes is NOT in the Great Rift Valley?', ['Lake Nakuru', 'Lake Baringo', 'Lake Victoria', 'Lake Naivasha'], 'C', 'Lake Victoria lies in a shallow depression between the two arms of the Rift Valley, not in the valley floor.'),
      mcq('Governance', 'In what year was the current Constitution of Kenya promulgated?', ['1963', '1992', '2002', '2010'], 'D', 'The Constitution of Kenya was promulgated on 27 August 2010.'),
      mcq('Economic activities', 'Which crop is grown on large estates in the highlands around Kericho?', ['Cotton', 'Tea', 'Sisal', 'Rice'], 'B', 'Kericho is famous for tea.'),
      mcq('Governance', 'For how many years is the President of Kenya elected at a time?', ['3', '4', '5', '7'], 'C', 'The President is elected for a five-year term.'),
      mcq('Transport', 'Which is Kenya\'s main seaport?', ['Mombasa', 'Lamu', 'Malindi', 'Kisumu'], 'A', 'The Port of Mombasa handles most of Kenya\'s imports and exports.'),
      mcq('Energy', 'Which of these is a renewable source of energy used in Kenya?', ['Coal', 'Diesel', 'Geothermal', 'Petrol'], 'C', 'Geothermal power at Olkaria in Naivasha is renewable.'),
      mcq('Map work', 'A map has a scale of 1 : 50 000. One centimetre on the map represents…', ['50 m', '500 m', '5 km', '50 km'], 'B', '50 000 cm = 500 m.'),
      mcq('Economic activities', 'What is the main economic activity in the dry areas of northern Kenya?', ['Fishing', 'Mining', 'Large-scale wheat farming', 'Nomadic pastoralism'], 'D', 'Communities in dry northern Kenya keep livestock such as camels, goats and cattle.'),
      mcq('Citizenship', 'Which of these is a responsibility of a good citizen?', ['Paying taxes honestly', 'Dumping waste in rivers', 'Skipping school', 'Ignoring the law'], 'A', 'Paying taxes and obeying the law are citizen responsibilities.')
    ]
  },
  {
    title: 'Section B — Short answers',
    instructions: 'Write your answer in a few words or a sentence.',
    questions: [
      short('Language', 'Name the two official languages of Kenya.', [{ any: ['kiswahili', 'swahili'] }, { any: ['english'] }], 2, 'English and Kiswahili.', 'English and Kiswahili'),
      short('Governance', 'State one function of the National Assembly.', [{ any: ['make laws', 'makes laws', 'pass laws', 'passes laws', 'law making', 'legislate', 'represent', 'oversee', 'approve the budget', 'budget', 'debate'] }], 1, 'It makes laws, represents the people, approves the budget and oversees the government.', 'It makes laws'),
      term('History', 'Name the first President of Kenya.', ['jomo kenyatta', 'kenyatta', 'mzee jomo kenyatta'], 1, 'Mzee Jomo Kenyatta, who led Kenya from 1963 until 1978.'),
      term('Physical features', 'Name the ocean that borders Kenya on the east.', ['indian ocean', 'the indian ocean'], 1, 'The Indian Ocean.'),
      short('Environment', 'State two causes of soil erosion.', [{ any: ['deforestation', 'cutting trees', 'clearing forests', 'cutting down trees'] }, { any: ['overgrazing', 'over grazing', 'too many animals'] }, { any: ['heavy rain', 'heavy rainfall', 'rainfall', 'running water'] }, { any: ['steep slopes', 'farming on slopes', 'cultivating on slopes', 'poor farming', 'ploughing up and down'] }], 2, 'Any two: deforestation, overgrazing, heavy rainfall, farming on steep slopes.', 'Deforestation and overgrazing'),
      short('Economic activities', 'Give one way in which tourism is important to Kenya.', [{ any: ['foreign exchange', 'income', 'jobs', 'employment', 'revenue', 'money'] }], 1, 'It earns foreign exchange, creates jobs and brings income.', 'It creates jobs'),
      term('Map work', 'Name the instrument used to find direction.', ['compass', 'a compass', 'magnetic compass'], 1, 'A compass shows north and so helps to find direction.'),
      short('Citizenship', 'State one right of every child in Kenya.', [{ any: ['education', 'food', 'shelter', 'health', 'healthcare', 'medical care', 'protection', 'name', 'nationality', 'play', 'be protected', 'basic nutrition'] }], 1, 'Children have the right to a name and nationality, education, food, shelter, healthcare and protection.', 'The right to education'),
      term('Physical features', 'Name the longest river in Kenya.', ['tana', 'river tana', 'the tana river'], 1, 'The Tana River is Kenya\'s longest river.'),
      short('Environment', 'State two ways of conserving the environment.', [{ any: ['plant trees', 'planting trees', 'afforestation', 'tree planting'] }, { any: ['recycle', 'recycling', 'reuse'] }, { any: ['avoid pollution', 'not pollute', 'reduce pollution', 'dispose waste properly', 'proper waste disposal', 'not dump waste', 'litter'] }, { any: ['protect forests', 'conserve forests', 'protect wildlife', 'conserve water', 'save water'] }], 2, 'Plant trees, recycle and reuse, dispose of waste properly, protect forests and wildlife, save water.', 'Plant trees and recycle')
    ]
  }
]);
