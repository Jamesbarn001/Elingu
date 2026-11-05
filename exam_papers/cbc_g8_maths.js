const { mcq, num, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_cbc_g8_maths_set1',
  curriculum: 'CBC',
  grade: 8,
  gradeRange: [7, 9],
  subject: 'Mathematics',
  scale: 'CBC',
  title: 'Grade 8 Mathematics — Practice Paper 1',
  series: 'Elingu practice paper, KJSEA style',
  durationMinutes: 60,
  calculatorAllowed: false,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: type your final answer; for 2- and 3-mark questions also type your working, because you can earn method marks. You may not use a calculator.'
}, [
  {
    title: 'Section A — Choose the correct answer',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Integers', 'Work out −7 + 12.', ['−19', '−5', '5', '19'], 'C', 'Start at −7 and move 12 steps up the number line: you end at 5.'),
      mcq('Fractions', 'Which of these fractions is the largest?', ['3/4', '5/8', '7/10', '2/3'], 'A', 'As decimals: 0.75, 0.625, 0.7 and 0.667. The largest is 3/4.'),
      mcq('Indices', 'Simplify 2³ × 2⁴.', ['2¹²', '2⁷', '4⁷', '2¹'], 'B', 'When you multiply powers of the same base, add the powers: 3 + 4 = 7.'),
      mcq('Factors and multiples', 'What is the highest common factor (HCF) of 18 and 24?', ['3', '4', '6', '72'], 'C', 'Factors of 18: 1, 2, 3, 6, 9, 18. Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. The biggest shared one is 6.'),
      mcq('Algebra', 'Solve x + 9 = 4.', ['5', '−5', '13', '−13'], 'B', 'Subtract 9 from both sides: x = 4 − 9 = −5.'),
      mcq('Polygons', 'What is the size of each interior angle of a regular hexagon?', ['60°', '90°', '108°', '120°'], 'D', 'Interior angles sum to (6 − 2) × 180° = 720°. Divide by 6: 120°.'),
      mcq('Perimeter', 'A rectangle is 8 cm long and 5 cm wide. What is its perimeter?', ['13 cm', '26 cm', '40 cm', '80 cm'], 'B', 'Perimeter = 2 × (8 + 5) = 26 cm.'),
      mcq('Statistics', 'What is the mean of 4, 6, 8, 10 and 12?', ['6', '7', '8', '9'], 'C', 'The total is 40 and there are 5 numbers: 40 ÷ 5 = 8.'),
      mcq('Percentages', 'Write 0.35 as a percentage.', ['35%', '3.5%', '0.35%', '350%'], 'A', 'Multiply a decimal by 100 to get a percentage: 0.35 × 100 = 35%.'),
      mcq('Prime numbers', 'Which of these numbers is a prime number?', ['21', '27', '29', '33'], 'C', '21 = 3 × 7, 27 = 3 × 9 and 33 = 3 × 11. Only 29 has no factors except 1 and itself.'),
      mcq('Algebra', 'Find the value of 2a − 3b when a = 5 and b = 2.', ['1', '4', '16', '12'], 'B', '2 × 5 − 3 × 2 = 10 − 6 = 4.'),
      mcq('Symmetry', 'Which shape has exactly one line of symmetry?', ['An isosceles triangle (not equilateral)', 'A rectangle that is not a square', 'A square', 'An equilateral triangle'], 'A', 'A rectangle has 2 lines, a square 4 and an equilateral triangle 3. An isosceles triangle has just 1.')
    ]
  },
  {
    title: 'Section B — Write your answer',
    instructions: 'Type the final answer. Add your working in the working box to earn method marks.',
    questions: [
      num('Integers', 'Calculate (−6) × (−4) + (−5).', 19, 2, { method: [{ any: ['24'] }], explanation: '(−6) × (−4) = 24, then 24 + (−5) = 19.' }),
      num('Fractions', 'Work out 3/4 + 2/5. Give your answer as a fraction or a decimal.', 1.15, 2, { tolerance: 0.001, alternatives: ['23/20'], method: [{ any: ['15/20', '8/20'] }], sample: '23/20', displayAnswer: '23/20 (= 1 3/20 = 1.15)', explanation: 'Use a common denominator of 20: 15/20 + 8/20 = 23/20.' }),
      num('Indices', 'Evaluate 2⁵ ÷ 2².', 8, 2, { method: [{ any: ['2^3', '2³', '32'] }], explanation: '2⁵ ÷ 2² = 2³ = 8 (subtract the powers).' }),
      num('Ratio', 'Share KES 840 in the ratio 3 : 4. Find the larger share.', 480, 3, { unit: ['kes'], method: [{ any: ['120'] }, { any: ['7'] }], explanation: '3 + 4 = 7 parts. One part is 840 ÷ 7 = 120. The larger share is 4 × 120 = 480.' }),
      num('Percentages', 'Increase KES 2,500 by 12%.', 2800, 2, { unit: ['kes'], method: [{ any: ['300'] }], explanation: '12% of 2,500 = 300, so the new amount is 2,500 + 300 = 2,800.' }),
      num('Linear equations', 'Solve 5x − 7 = 18.', 5, 2, { method: [{ any: ['25'] }], explanation: 'Add 7: 5x = 25. Divide by 5: x = 5.' }),
      num('Linear equations', 'Solve 3(x + 2) = 21.', 5, 2, { method: [{ any: ['x+2=7', 'x + 2 = 7', '3x+6', '3x + 6'] }], explanation: 'Divide by 3: x + 2 = 7, so x = 5.' }),
      num('Linear equations', 'Solve 2x/3 = 8.', 12, 2, { method: [{ any: ['24'] }], explanation: 'Multiply both sides by 3: 2x = 24, so x = 12.' }),
      num('Area', 'A rectangle is 12 cm long and 7.5 cm wide. Find its area.', 90, 2, { unit: ['cm2'], unitRequired: false, explanation: 'Area = 12 × 7.5 = 90 cm².', method: [{ any: ['12 * 7.5', '12 x 7.5', '12×7.5'] }] }),
      num('Circles', 'A circle has radius 7 cm. Using π = 22/7, find its circumference.', 44, 2, { unit: ['cm'], method: [{ any: ['2 * 22/7 * 7', '2×22/7×7', '2 x 22/7 x 7', '2*22/7*7'] }], explanation: 'C = 2πr = 2 × 22/7 × 7 = 44 cm.' }),
      num('Area', 'A triangle has a base of 10 cm and a height of 6.4 cm. Find its area.', 32, 2, { unit: ['cm2'], method: [{ any: ['1/2', '0.5', '64'] }], explanation: 'Area = ½ × 10 × 6.4 = 32 cm².' }),
      num('Angles', 'Three angles on a straight line are x, 2x and 3x. Find the value of x in degrees.', 30, 2, { unit: ['°'], method: [{ any: ['6x', '180'] }], explanation: 'x + 2x + 3x = 6x = 180°, so x = 30°.' }),
      num('Pythagoras', 'A right-angled triangle has the two shorter sides 9 cm and 12 cm. Find the length of the longest side.', 15, 2, { unit: ['cm'], method: [{ any: ['225', '81 + 144', '81+144'] }], explanation: '9² + 12² = 81 + 144 = 225, and √225 = 15 cm.' }),
      num('Statistics', 'Find the median of 7, 3, 9, 5, 11, 3 and 8.', 7, 2, { method: [{ any: ['3 3 5 7 8 9 11', '3, 3, 5, 7, 8, 9, 11'] }], explanation: 'In order: 3, 3, 5, 7, 8, 9, 11. The middle (4th) value is 7.' }),
      num('Statistics', 'The mean mark of 5 tests is 64. A sixth test is marked 76. Find the new mean mark.', 66, 3, { method: [{ any: ['320'] }, { any: ['396'] }], explanation: 'Total of 5 tests = 5 × 64 = 320. With the sixth: 320 + 76 = 396. New mean = 396 ÷ 6 = 66.' }),
      num('Probability', 'A bag has 5 red, 3 blue and 2 green balls. One ball is picked at random. Find the probability that it is not red.', 0.5, 2, { alternatives: ['5/10', '1/2'], tolerance: 0.001, sample: '1/2', displayAnswer: '1/2 (= 5/10 = 0.5 = 50%)', method: [{ any: ['5/10', '10 balls', '3 + 2', '3+2'] }], explanation: 'There are 10 balls and 5 are not red, so the probability is 5/10 = 1/2.' }),
      num('Interest', 'Find the simple interest on KES 12,000 invested at 5% per year for 3 years.', 1800, 3, { unit: ['kes'], method: [{ any: ['600'] }, { any: ['12000 * 5 * 3', '12000×5×3', '12000 x 5 x 3', '12000*5*3'] }], explanation: 'Interest for one year = 5% of 12,000 = 600. For 3 years: 3 × 600 = 1,800.' }),
      num('Speed', 'A matatu travels 150 km in 2.5 hours. Find its average speed in km/h.', 60, 2, { unit: ['km/h', 'kph', 'kmh', 'km/hr', 'kilometres per hour'], method: [{ any: ['150 / 2.5', '150/2.5', '150 ÷ 2.5', '150÷2.5'] }], explanation: 'Speed = distance ÷ time = 150 ÷ 2.5 = 60 km/h.' })
    ]
  }
]);
