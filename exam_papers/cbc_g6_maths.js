const { mcq, num, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_cbc_g6_maths_set1',
  curriculum: 'CBC',
  grade: 6,
  gradeRange: [4, 6],
  subject: 'Mathematics',
  scale: 'CBC',
  title: 'Grade 6 Mathematics — Practice Paper 1',
  series: 'Elingu practice paper, KPSEA style',
  durationMinutes: 45,
  instructions: 'Answer all questions. Part 1: choose the correct answer. Part 2: type your answer. Show your working for questions worth 2 or 3 marks.'
}, [
  {
    title: 'Part 1 — Choose the correct answer',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Place value', 'What is the value of the digit 6 in 36 428?', ['600', '6 000', '60 000', '60'], 'B', 'In 36 428 the 6 is in the thousands place, so its value is 6 000.'),
      mcq('Multiples', 'Which of these numbers is a multiple of 7?', ['45', '49', '52', '58'], 'B', '7 × 7 = 49.'),
      mcq('Rounding', 'Round 4 567 to the nearest hundred.', ['4 500', '4 570', '4 600', '5 000'], 'C', 'The tens digit is 6, so round the hundreds up: 4 600.'),
      mcq('Fractions', 'Which fraction is equal to 3/6?', ['1/3', '1/2', '2/3', '3/4'], 'B', 'Divide the top and bottom by 3: 3/6 = 1/2.'),
      mcq('Decimals', 'Which of these decimals is the largest?', ['0.5', '0.45', '0.405', '0.54'], 'D', 'Compare to 2 decimal places: 0.50, 0.45, 0.41 and 0.54. The largest is 0.54.'),
      mcq('Perimeter', 'A square has sides of 9 cm. What is its perimeter?', ['18 cm', '27 cm', '36 cm', '81 cm'], 'C', 'Perimeter = 4 × 9 = 36 cm.'),
      mcq('Shapes', 'How many faces does a cube have?', ['4', '6', '8', '12'], 'B', 'A cube has 6 square faces.'),
      mcq('Time', 'How many minutes are there in 2 hours 15 minutes?', ['115', '125', '135', '215'], 'C', '2 × 60 = 120, and 120 + 15 = 135 minutes.'),
      mcq('Numbers', 'Which number is written as XIV in Roman numerals?', ['4', '14', '16', '19'], 'B', 'X = 10 and IV = 4, so XIV = 14.'),
      mcq('LCM', 'What is the lowest common multiple (LCM) of 4 and 6?', ['10', '12', '24', '2'], 'B', 'Multiples of 4: 4, 8, 12. Multiples of 6: 6, 12. The first shared is 12.'),
      mcq('Angles', 'Which of these angles is an acute angle?', ['85°', '90°', '120°', '180°'], 'A', 'An acute angle is less than 90°.'),
      mcq('Averages', 'What is the mean of 2, 4 and 6?', ['3', '4', '5', '6'], 'B', '(2 + 4 + 6) ÷ 3 = 12 ÷ 3 = 4.')
    ]
  },
  {
    title: 'Part 2 — Write your answer',
    instructions: 'Type your answer. Show your working for 2- and 3-mark questions.',
    questions: [
      num('Addition', 'Work out 345 + 678.', 1023, 1, { explanation: '345 + 678 = 1 023.' }),
      num('Subtraction', 'Work out 1 000 − 468.', 532, 1, { explanation: '1 000 − 468 = 532.' }),
      num('Multiplication', 'Work out 24 × 15.', 360, 2, { method: [{ any: ['240', '120'] }], explanation: '24 × 10 = 240 and 24 × 5 = 120. 240 + 120 = 360.' }),
      num('Division', 'Work out 756 ÷ 6.', 126, 2, { method: [{ any: ['6 x 100', '600', '156'] }], explanation: '756 ÷ 6 = 126 (6 × 126 = 756).' }),
      num('Fractions', 'Find 3/4 of 80.', 60, 2, { method: [{ any: ['20'] }, { any: ['80/4', '80 / 4', '80 ÷ 4'] }], explanation: '1/4 of 80 = 20, so 3/4 = 3 × 20 = 60.' }),
      num('Area', 'A rectangular garden is 9 m long and 6 m wide. Find its area.', 54, 2, { unit: ['m2'], method: [{ any: ['9 x 6', '9 * 6', '9×6'] }], explanation: 'Area = length × width = 9 × 6 = 54 m².' }),
      num('Measures', 'Change 2.5 kg into grams.', 2500, 1, { unit: ['g'], explanation: '1 kg = 1 000 g, so 2.5 kg = 2 500 g.' }),
      num('Money', 'Mama Wanjiru bought 3 kg of sugar at KES 160 per kg. She paid with KES 1 000. How much change did she get?', 520, 3, { method: [{ any: ['480'] }, { any: ['1000 - 480', '1000-480', '1 000 - 480'] }], explanation: '3 × 160 = 480. Change = 1 000 − 480 = KES 520.' }),
      num('Time', 'A train leaves at 8:45 am and arrives at 11:20 am. How many minutes did the journey take?', 155, 2, { unit: ['min'], method: [{ any: ['2 hours', '2h', '2 h', '135'] }], explanation: '8:45 to 11:00 is 2 h 15 min and 11:00 to 11:20 is 20 min. Total 2 h 35 min = 155 minutes.' }),
      num('Percentages', 'Find 15% of 200.', 30, 2, { method: [{ any: ['10%', '20', '15/100', '0.15'] }], explanation: '10% of 200 = 20 and 5% = 10, so 15% = 30.' }),
      num('Multiplication', 'A bus carries 52 passengers. How many passengers can 7 such buses carry?', 364, 2, { method: [{ any: ['52 x 7', '52 * 7', '52×7', '350', '14'] }], explanation: '52 × 7 = 364.' }),
      num('Fractions', 'Simplify 12/16. Give your answer as a fraction or a decimal.', 0.75, 2, { tolerance: 0.001, alternatives: ['3/4'], sample: '3/4', displayAnswer: '3/4', method: [{ any: ['4'] }], explanation: 'Divide the top and bottom by 4: 12/16 = 3/4.' }),
      num('Perimeter', 'A rectangle is 14 cm long and 9 cm wide. Find its perimeter.', 46, 2, { unit: ['cm'], method: [{ any: ['14 + 9', '14+9', '23'] }], explanation: 'Perimeter = 2 × (14 + 9) = 2 × 23 = 46 cm.' })
    ]
  }
]);
