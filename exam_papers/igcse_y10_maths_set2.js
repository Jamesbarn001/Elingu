const { num, term, short, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_igcse_y10_maths_set2',
  curriculum: 'BRITISH',
  grade: 10,
  gradeRange: [10, 11],
  subject: 'Mathematics',
  scale: 'IGCSE',
  title: 'IGCSE Mathematics (Year 10) — Practice Paper 2',
  series: 'Elingu practice paper, Cambridge IGCSE style',
  durationMinutes: 80,
  calculatorAllowed: true,
  instructions: 'Answer all questions. Type your final answer. For questions worth 2 or more marks, show your working in the working box: method marks (M) are given for correct working even if the final answer is wrong. A calculator is allowed. Give non-exact answers to 3 significant figures unless told otherwise.'
}, [
  {
    title: 'Section A — Number and algebra',
    instructions: 'Show your working for questions worth 2 or more marks.',
    questions: [
      num('Percentages', 'Calculate 15% of 240.', 36, 1, { explanation: '10% = 24 and 5% = 12, so 15% = 36.' }),
      num('Fractions and decimals', 'Write 3/8 as a decimal.', 0.375, 1, { tolerance: 1e-6, explanation: '3 ÷ 8 = 0.375.' }),
      num('Indices', 'Evaluate 2⁻².', 0.25, 1, { alternatives: ['1/4'], tolerance: 1e-6, explanation: '2⁻² = 1/2² = 1/4 = 0.25.' }),
      term('Standard form', 'Write 52 000 in standard form.', ['5.2 x 10^4', '5.2 × 10^4', '5.2 * 10^4', '5.2e4', '5.2 x 104', '5.2 104', '5.2 10^4'], 1, '52 000 = 5.2 × 10⁴.'),
      num('Equations', 'Solve 3(x − 4) = 2x + 1.', 13, 2, { method: [{ any: ['3x - 12', '3x-12'] }], explanation: '3x − 12 = 2x + 1, so x = 13.' }),
      term('Rearranging', 'Make x the subject of y = 3x + 2.', ['x = (y - 2)/3', 'x=(y-2)/3', '(y - 2)/3', '(y-2)/3', 'x = (y-2)/3', 'x = (y - 2) / 3', '(y-2)÷3'], 2, 'Subtract 2: y − 2 = 3x. Divide by 3: x = (y − 2)/3.'),
      term('Factorising', 'Factorise x² + 5x + 6.', ['(x + 2)(x + 3)', '(x + 3)(x + 2)', '(x+2)(x+3)', '(x+3)(x+2)'], 2, 'Two numbers that multiply to 6 and add to 5 are 2 and 3: (x + 2)(x + 3).'),
      short('Quadratics', 'Solve x² − 4x − 5 = 0. Give both solutions.', [{ any: ['5'] }, { any: ['-1'] }], 2, '(x − 5)(x + 1) = 0, so x = 5 or x = −1.', 'x = 5 or x = -1'),
      term('Indices', 'Simplify (3x²)(4x³).', ['12x^5', '12x5', '12 x^5', '12x⁵'], 2, '3 × 4 = 12 and x² × x³ = x⁵, giving 12x⁵.'),
      term('Expanding', 'Expand and simplify (x + 4)(x − 4).', ['x^2 - 16', 'x2 - 16', 'x² − 16', 'x^2-16', 'x2-16'], 1, 'Difference of two squares: x² − 16.'),
      num('Straight lines', 'Write down the gradient of the line y = −2x + 7.', -2, 1, { explanation: 'The gradient is the coefficient of x: −2.' }),
      term('Coordinates', 'Find the midpoint of the line joining (2, 4) and (8, 10).', ['(5,7)', '5,7', '(5, 7)'], 2, 'Midpoint = ((2 + 8)/2, (4 + 10)/2) = (5, 7).'),
      num('Percentages', 'The price of an item rises from $80 to $100. Calculate the percentage increase.', 25, 2, { unit: ['%'], method: [{ any: ['20/80', '20 / 80', '20 ÷ 80', '20'] }], explanation: 'Increase = 20. (20 ÷ 80) × 100 = 25%.' }),
      num('Ratio', 'Share $240 in the ratio 3 : 5. Find the smaller share, in dollars.', 90, 2, { method: [{ any: ['8'] }, { any: ['30'] }], explanation: '3 + 5 = 8 parts. One part = 240 ÷ 8 = 30. The smaller share = 3 × 30 = 90.' }),
      num('Compound change', 'A car worth $12 000 loses 10% of its value each year. Find its value after 2 years, in dollars.', 9720, 3, { method: [{ any: ['10800'] }, { any: ['0.9', '90%'] }], explanation: 'After year 1: 12 000 × 0.9 = 10 800. After year 2: 10 800 × 0.9 = 9 720.' }),
      num('Sequences', 'Find the sum of the first 5 terms of the sequence 4, 7, 10, 13, 16, …', 50, 2, { method: [{ any: ['4 + 7', '4+7', '13', '16'] }], explanation: '4 + 7 + 10 + 13 + 16 = 50.' }),
      num('Inequalities', 'Find the smallest integer x that satisfies 2x + 3 > 11.', 5, 1, { explanation: '2x > 8, so x > 4. The smallest integer is 5.' })
    ]
  },
  {
    title: 'Section B — Geometry, statistics and probability',
    instructions: 'Show your working for questions worth 2 or more marks.',
    questions: [
      num('Distance', 'Find the distance between the points (1, 2) and (4, 6).', 5, 2, { method: [{ any: ['3^2', '4^2', '9 + 16', '9+16', '25'] }], explanation: '√(3² + 4²) = √25 = 5.' }),
      num('Trigonometry', 'Write down the value of tan 45°.', 1, 1, { explanation: 'tan 45° = 1.' }),
      num('Trigonometry', 'A right-angled triangle has hypotenuse 10 cm and an angle of 30°. Find the length of the side opposite the 30° angle.', 5, 2, { unit: ['cm'], method: [{ any: ['sin 30', 'sin30', '10 x 0.5', '10 * 0.5', '10 × 0.5'] }], explanation: 'opposite = hypotenuse × sin 30° = 10 × 0.5 = 5 cm.' }),
      num('Arc length', 'A sector of a circle has radius 9 cm and angle 40°. Find the arc length, correct to 3 significant figures.', 6.28, 2, { tolerance: 0.01, unit: ['cm'], method: [{ any: ['40/360', '1/9', '40 / 360'] }, { any: ['2 x pi', '2π', '2 * pi', '18π', '18 pi'] }], explanation: 'Arc = (40/360) × 2π × 9 = 2π = 6.28 cm.' }),
      num('Volume', 'Calculate the volume of a sphere of radius 3 cm, correct to 3 significant figures.', 113, 2, { tolerance: 0.6, unit: ['cm3'], method: [{ any: ['4/3', '36π', '36 pi'] }, { any: ['pi', 'π'] }], explanation: 'V = (4/3)πr³ = (4/3) × π × 27 = 36π = 113.1 cm³.' }),
      num('Area', 'Calculate the area of a circle of diameter 10 cm, correct to 3 significant figures.', 78.5, 2, { tolerance: 0.06, unit: ['cm2'], method: [{ any: ['r = 5', 'radius = 5', '5^2', '25', '5²'] }], explanation: 'Radius 5 cm. Area = π × 5² = 25π = 78.5 cm².' }),
      num('Bearings', 'The bearing of B from A is 070°. Find the bearing of A from B.', 250, 1, { unit: ['°'], explanation: 'Back bearing = 070° + 180° = 250°.' }),
      num('Speed', 'Change 54 km/h to metres per second.', 15, 2, { unit: ['m/s', 'ms-1'], method: [{ any: ['54000', '54 000', '3600', '1000'] }], explanation: '54 km/h = 54 000 m ÷ 3 600 s = 15 m/s.' }),
      num('Probability', 'A bag contains 4 red and 6 blue counters. Two counters are taken without replacement. Find the probability that both are red.', 0.1333, 3, { tolerance: 0.001, alternatives: ['2/15', '12/90'], sample: '2/15', method: [{ any: ['4/10', '0.4'] }, { any: ['3/9', '1/3'] }], explanation: 'P(first red) = 4/10 and P(second red) = 3/9. Multiply: 12/90 = 2/15 ≈ 0.133.' }),
      num('Statistics', 'Scores 1, 2 and 3 occur with frequencies 2, 3 and 5. Find the mean score.', 2.3, 3, { tolerance: 0.001, method: [{ any: ['23'] }, { any: ['10'] }], explanation: 'Total score = 1×2 + 2×3 + 3×5 = 2 + 6 + 15 = 23. Total frequency = 10. Mean = 2.3.' }),
      num('Statistics', 'Find the median of 3, 9, 4, 12, 7 and 5.', 6, 2, { method: [{ any: ['3, 4, 5, 7, 9, 12', '3 4 5 7 9 12'] }], explanation: 'In order: 3, 4, 5, 7, 9, 12. The median is the mean of the middle two: (5 + 7) ÷ 2 = 6.' }),
      num('Sets', 'In a group of 30 students, n(A) = 14, n(B) = 12 and n(A ∩ B) = 5. How many students are in neither A nor B?', 9, 3, { method: [{ any: ['14 + 12 - 5', '14+12-5', '21'] }], explanation: 'n(A ∪ B) = 14 + 12 − 5 = 21. Neither = 30 − 21 = 9.' }),
      num('Polygons', 'Find the exterior angle of a regular 12-sided polygon.', 30, 1, { unit: ['°'], explanation: '360 ÷ 12 = 30°.' })
    ]
  }
]);
