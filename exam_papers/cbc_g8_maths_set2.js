const { mcq, num, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_cbc_g8_maths_set2',
  curriculum: 'CBC',
  grade: 8,
  gradeRange: [7, 9],
  subject: 'Mathematics',
  scale: 'CBC',
  title: 'Grade 8 Mathematics — Practice Paper 2',
  series: 'Elingu practice paper, KJSEA style',
  durationMinutes: 60,
  calculatorAllowed: false,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: type your final answer; for 2- and 3-mark questions also type your working, because you can earn method marks. You may not use a calculator.'
}, [
  {
    title: 'Section A — Choose the correct answer',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Integers', 'Work out −3 − (−8).', ['5', '−11', '11', '−5'], 'A', 'Subtracting a negative is adding: −3 + 8 = 5.'),
      mcq('Fractions', 'Which fraction is equal to 0.6?', ['3/5', '2/5', '6/5', '1/6'], 'A', '0.6 = 6/10 = 3/5.'),
      mcq('Roots', 'What is √81?', ['7', '8', '9', '10'], 'C', '9 × 9 = 81.'),
      mcq('Multiples', 'What is the lowest common multiple (LCM) of 6 and 8?', ['12', '14', '24', '48'], 'C', 'Multiples of 6: 6, 12, 18, 24. Multiples of 8: 8, 16, 24. The first shared is 24.'),
      mcq('Algebra', 'Solve 4x = 36.', ['x = 9', 'x = 32', 'x = 40', 'x = 144'], 'A', 'Divide both sides by 4: x = 9.'),
      mcq('Polygons', 'How many sides does an octagon have?', ['6', '7', '8', '10'], 'C', 'Octa means eight.'),
      mcq('Factors', 'Which of these numbers is a factor of 36?', ['7', '9', '11', '13'], 'B', '36 ÷ 9 = 4, so 9 is a factor.'),
      mcq('Percentages', 'What is 25% of 80?', ['8', '20', '25', '40'], 'B', '25% is a quarter: 80 ÷ 4 = 20.'),
      mcq('Area', 'What is the area of a square with sides of 7 cm?', ['14 cm²', '28 cm²', '49 cm²', '77 cm²'], 'C', '7 × 7 = 49 cm².'),
      mcq('Statistics', 'What is the mode of 2, 3, 3, 5 and 7?', ['2', '3', '5', '7'], 'B', 'The mode is the most frequent value: 3 appears twice.')
    ]
  },
  {
    title: 'Section B — Write your answer',
    instructions: 'Type the final answer. Add your working to earn method marks.',
    questions: [
      num('Integers', 'Work out (−9) × 6.', -54, 1, { explanation: 'A negative times a positive is negative: 9 × 6 = 54, so the answer is −54.' }),
      num('Fractions', 'Work out 5/6 − 1/3.', 0.5, 2, { alternatives: ['1/2', '3/6'], tolerance: 0.001, sample: '1/2', method: [{ any: ['2/6', '5/6 - 2/6', '5/6-2/6'] }], explanation: '1/3 = 2/6, so 5/6 − 2/6 = 3/6 = 1/2.' }),
      num('Indices', 'Work out 3² × 3³.', 243, 2, { method: [{ any: ['3^5', '3⁵', '9 x 27', '9 * 27', '9×27'] }], explanation: '3² × 3³ = 3⁵ = 243.' }),
      num('Decimals', 'Work out 2.4 × 1.5.', 3.6, 2, { tolerance: 0.001, method: [{ any: ['24 x 15', '24 * 15', '24×15', '360'] }], explanation: '24 × 15 = 360, then divide by 100 for two decimal places: 3.6.' }),
      num('Percentages', 'A shirt costs KES 1 200. It is sold at a 20% discount. Find the sale price.', 960, 2, { unit: ['kes'], method: [{ any: ['240'] }, { any: ['80%', '0.8', '0.80'] }], explanation: '20% of 1 200 = 240. Sale price = 1 200 − 240 = KES 960.' }),
      num('Ratio', 'Share 48 sweets in the ratio 5 : 3. How many sweets are in the larger share?', 30, 2, { method: [{ any: ['8'] }, { any: ['6'] }], explanation: '5 + 3 = 8 parts. One part = 48 ÷ 8 = 6. The larger share = 5 × 6 = 30.' }),
      num('Linear equations', 'Solve 7x − 4 = 31.', 5, 2, { method: [{ any: ['35'] }], explanation: 'Add 4: 7x = 35. Divide by 7: x = 5.' }),
      num('Linear equations', 'Solve (x − 3) / 2 = 6.', 15, 2, { method: [{ any: ['12', 'x - 3 = 12', 'x-3=12'] }], explanation: 'Multiply by 2: x − 3 = 12, so x = 15.' }),
      num('Perimeter', 'A rectangle is 15.5 cm long and 9 cm wide. Find its perimeter.', 49, 2, { unit: ['cm'], method: [{ any: ['15.5 + 9', '15.5+9', '24.5'] }], explanation: 'Perimeter = 2 × (15.5 + 9) = 2 × 24.5 = 49 cm.' }),
      num('Area', 'A parallelogram has base 12 cm and perpendicular height 7 cm. Find its area.', 84, 2, { unit: ['cm2'], method: [{ any: ['12 x 7', '12 * 7', '12×7', 'base x height'] }], explanation: 'Area = base × height = 12 × 7 = 84 cm².' }),
      num('Volume', 'Find the volume of a cuboid 6 cm long, 5 cm wide and 4 cm high.', 120, 2, { unit: ['cm3'], method: [{ any: ['6 x 5', '6 * 5', '6×5', '30'] }], explanation: 'V = 6 × 5 × 4 = 120 cm³.' }),
      num('Circles', 'Using π = 22/7, find the area of a circle of radius 7 cm.', 154, 2, { unit: ['cm2'], method: [{ any: ['22/7 x 49', '22/7 * 49', '22/7×49', '49', 'πr'] }], explanation: 'Area = πr² = 22/7 × 7 × 7 = 154 cm².' }),
      num('Angles', 'The angles of a triangle are 2x, 3x and 4x. Find the size of the largest angle in degrees.', 80, 3, { unit: ['°'], method: [{ any: ['9x', '180'] }, { any: ['x = 20', 'x=20', '20'] }], explanation: '2x + 3x + 4x = 9x = 180°, so x = 20°. The largest angle is 4 × 20° = 80°.' }),
      num('Statistics', 'Find the mean of 12, 15, 9, 20 and 14.', 14, 2, { method: [{ any: ['70'] }], explanation: 'Total = 70, and 70 ÷ 5 = 14.' }),
      num('Probability', 'A fair die is rolled once. Find the probability of getting an even number.', 0.5, 2, { alternatives: ['1/2', '3/6'], tolerance: 0.001, sample: '1/2', method: [{ any: ['2, 4, 6', '2,4,6', '3/6', '3 out of 6', '6'] }], explanation: 'Even numbers: 2, 4 and 6. So 3 out of 6 = 1/2.' }),
      num('Speed', 'A bus travels 180 km in 3 hours. Find its average speed in km/h.', 60, 2, { unit: ['km/h', 'kph', 'kmh', 'km/hr'], method: [{ any: ['180/3', '180 / 3', '180 ÷ 3'] }], explanation: 'Speed = 180 ÷ 3 = 60 km/h.' }),
      num('Time', 'Change 3/4 of an hour into minutes.', 45, 1, { unit: ['min'], explanation: '3/4 × 60 = 45 minutes.' }),
      num('Profit', 'A trader buys an item for KES 800 and sells it for KES 1 000. Find the percentage profit.', 25, 2, { unit: ['%'], method: [{ any: ['200'] }, { any: ['200/800', '200 / 800', '200 ÷ 800'] }], explanation: 'Profit = 200. Percentage profit = 200 ÷ 800 × 100 = 25%.' }),
      num('Polygons', 'Find the size of each interior angle of a regular pentagon.', 108, 2, { unit: ['°'], method: [{ any: ['540', '72', '360/5', '360 / 5'] }], explanation: 'Each exterior angle is 360 ÷ 5 = 72°, so each interior angle is 180 − 72 = 108°.' }),
      num('Pythagoras', 'A right-angled triangle has shorter sides of 5 cm and 12 cm. Find the length of the longest side.', 13, 2, { unit: ['cm'], method: [{ any: ['169', '25 + 144', '25+144'] }], explanation: '5² + 12² = 25 + 144 = 169 and √169 = 13 cm.' })
    ]
  }
]);
