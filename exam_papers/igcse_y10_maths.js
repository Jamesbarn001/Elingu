const { num, term, short, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_igcse_y10_maths_set1',
  curriculum: 'BRITISH',
  grade: 10,
  gradeRange: [10, 11],
  subject: 'Mathematics',
  scale: 'IGCSE',
  title: 'IGCSE Mathematics (Year 10) — Practice Paper 1',
  series: 'Elingu practice paper, Cambridge IGCSE style',
  durationMinutes: 75,
  calculatorAllowed: true,
  instructions: 'Answer all questions. Type your final answer. For questions worth 2 or more marks, show your working in the working box: method marks (M) are given for correct working even if the final answer is wrong. A calculator is allowed. Give non-exact answers to 3 significant figures unless told otherwise.'
}, [
  {
    title: 'Section A — Number, algebra and sequences',
    instructions: 'Show your working for questions worth 2 or more marks.',
    questions: [
      num('Number', 'Calculate 3.6 × 0.25.', 0.9, 1, { explanation: '3.6 × 0.25 = 0.9 (a quarter of 3.6).' }),
      term('Standard form', 'Write 0.000472 in standard form.', ['4.72 x 10^-4', '4.72 × 10^-4', '4.72 * 10^-4', '4.72e-4', '4.72 x 10^(-4)', '4.72 x 10-4', '4.72 10-4', '4.72 10^-4'], 1, '0.000472 = 4.72 × 10⁻⁴ (move the decimal point 4 places to the right).'),
      num('Percentages', 'The price of a bag is reduced by 15% to give a sale price of $85. Calculate the original price in dollars.', 100, 2, { method: [{ any: ['0.85', '85/85', '85 / 0.85', '85/0.85', '85 ÷ 0.85', '100 - 15', '100-15'] }], explanation: 'The sale price is 85% of the original, so original = 85 ÷ 0.85 = 100.' }),
      num('Compound interest', '$2000 is invested at 4% per year compound interest. Find the total value after 2 years, in dollars.', 2163.2, 3, { tolerance: 0.01, method: [{ any: ['1.04', '2080'] }, { any: ['1.04^2', '1.04 ^ 2', '1.04²', '2000 x 1.04', '2000 * 1.04', '2000×1.04'] }], explanation: '2000 × 1.04² = 2000 × 1.0816 = 2163.20.' }),
      num('Solving equations', 'Solve 2x + 5 = 17.', 6, 2, { method: [{ any: ['2x = 12', '2x=12', '12'] }], explanation: 'Subtract 5: 2x = 12. Divide by 2: x = 6.' }),
      term('Expanding', 'Expand and simplify (x + 3)(x − 2).', ['x^2 + x - 6', 'x2 + x - 6', 'x² + x − 6', '-6 + x + x^2', 'x^2 +x -6'], 2, '(x + 3)(x − 2) = x² − 2x + 3x − 6 = x² + x − 6.'),
      term('Factorising', 'Factorise x² − 9.', ['(x + 3)(x - 3)', '(x - 3)(x + 3)', '(x+3)(x-3)', '(x-3)(x+3)'], 2, 'Difference of two squares: x² − 3² = (x + 3)(x − 3).'),
      term('Expanding', 'Expand and simplify 3(2x − 5) − 2(x − 4).', ['4x - 7', '4x − 7', '-7 + 4x'], 2, '6x − 15 − 2x + 8 = 4x − 7.'),
      num('Simultaneous equations', 'x + y = 10 and x − y = 4. Find the value of x.', 7, 2, { method: [{ any: ['2x = 14', '2x=14', '14'] }], explanation: 'Add the equations: 2x = 14, so x = 7 (and y = 3).' }),
      short('Quadratics', 'Solve x² − 5x + 6 = 0. Give both solutions.', [{ any: ['2'] }, { any: ['3'] }], 2, '(x − 2)(x − 3) = 0 so x = 2 or x = 3.', 'x = 2 or x = 3'),
      term('Sequences', 'Find the nth term of the sequence 5, 8, 11, 14, …', ['3n + 2', '3n+2', '2 + 3n', '2+3n'], 2, 'The sequence goes up by 3, so it starts 3n. 3 × 1 = 3 and 5 − 3 = 2, so the nth term is 3n + 2.'),
      num('Sequences', 'Use your answer to find the 10th term of the sequence 5, 8, 11, 14, …', 32, 1, { explanation: '3 × 10 + 2 = 32.' }),
      term('Inequalities', 'Solve the inequality 3x − 4 > 11.', ['x > 5', 'x>5', '5 < x', '5<x'], 2, 'Add 4: 3x > 15. Divide by 3: x > 5.'),
      num('Indices', 'Find the value of x when 2ˣ = 64.', 6, 1, { explanation: '2⁶ = 64, so x = 6.' }),
      num('Number', 'Calculate √144 + 3².', 21, 1, { explanation: '12 + 9 = 21.' })
    ]
  },
  {
    title: 'Section B — Geometry, measures and statistics',
    instructions: 'Show your working for questions worth 2 or more marks.',
    questions: [
      num('Trigonometry', 'Given that sin x = 0.5 and x is acute, find x in degrees.', 30, 1, { unit: ['°'], explanation: 'sin⁻¹(0.5) = 30°.' }),
      num('Trigonometry', 'tan x = 0.75 and x is acute. Find x, correct to 1 decimal place, in degrees.', 36.9, 2, { tolerance: 0.05, unit: ['°'], method: [{ any: ['tan-1', 'tan^-1', 'inverse tan', 'arctan', '0.75'] }], explanation: 'x = tan⁻¹(0.75) = 36.87…° ≈ 36.9°.' }),
      num('Area', 'A sector of a circle has radius 6 cm and angle 60°. Find its area correct to 3 significant figures.', 18.8, 3, { tolerance: 0.06, unit: ['cm2'], method: [{ any: ['60/360', '1/6', '60 / 360'] }, { any: ['pi', 'π', '36'] }], explanation: 'Area = (60/360) × π × 6² = 6π = 18.85… ≈ 18.8 cm² (18.85 is also accepted).' }),
      num('Volume', 'A cylinder has radius 4 cm and height 10 cm. Calculate its volume correct to 3 significant figures.', 503, 3, { tolerance: 0.6, unit: ['cm3'], method: [{ any: ['pi', 'π', '16'] }, { any: ['4^2', '4²', '16 x 10', '16*10', '160'] }], explanation: 'V = πr²h = π × 4² × 10 = 160π = 502.65… ≈ 503 cm³.' }),
      num('Area', 'A trapezium has parallel sides of 8 cm and 12 cm and a height of 5 cm. Find its area.', 50, 2, { unit: ['cm2'], method: [{ any: ['1/2', '0.5', '(8+12)', '(8 + 12)', '20'] }], explanation: 'Area = ½ × (8 + 12) × 5 = 50 cm².' }),
      num('Speed', 'Change 72 km/h into metres per second.', 20, 2, { unit: ['m/s', 'ms-1', 'metres per second'], method: [{ any: ['72000', '3600', '1000'] }], explanation: '72 km/h = 72 000 m ÷ 3 600 s = 20 m/s.' }),
      num('Coordinate geometry', 'Find the gradient of the straight line through (1, 2) and (5, 10).', 2, 2, { method: [{ any: ['8/4', '(10-2)', '10 - 2', '10−2', '4'] }], explanation: 'Gradient = (10 − 2) ÷ (5 − 1) = 8 ÷ 4 = 2.' }),
      num('Proportion', '8 workers take 15 days to finish a job. How many days would 12 workers take, working at the same rate?', 10, 2, { method: [{ any: ['120'] }], explanation: 'Total work = 8 × 15 = 120 worker-days. With 12 workers: 120 ÷ 12 = 10 days.' }),
      num('Sets', 'n(A) = 12, n(B) = 9 and n(A ∩ B) = 4. Find n(A ∪ B).', 17, 2, { method: [{ any: ['12 + 9', '12+9', '21'] }], explanation: 'n(A ∪ B) = 12 + 9 − 4 = 17.' }),
      num('Time', 'Change 3.5 hours into minutes.', 210, 1, { unit: ['min'], explanation: '3.5 × 60 = 210 minutes.' }),
      num('Statistics', 'Find the range of 4, 9, 2, 15 and 7.', 13, 1, { explanation: 'Range = largest − smallest = 15 − 2 = 13.' }),
      num('Statistics', 'The mean of five numbers is 8. Four of the numbers are 5, 7, 9 and 12. Find the fifth number.', 7, 2, { method: [{ any: ['40'] }, { any: ['33'] }], explanation: 'Total = 5 × 8 = 40. The four numbers add to 33, so the fifth is 7.' }),
      num('Angles', 'Each exterior angle of a regular polygon is 40°. How many sides does the polygon have?', 9, 2, { method: [{ any: ['360'] }], explanation: 'Exterior angles add up to 360°, so the number of sides = 360 ÷ 40 = 9.' }),
      num('Pythagoras', 'A rectangle is 24 cm by 7 cm. Find the length of its diagonal.', 25, 2, { unit: ['cm'], method: [{ any: ['625', '576 + 49', '576+49', '24^2', '24²'] }], explanation: '24² + 7² = 576 + 49 = 625 and √625 = 25 cm.' }),
      num('Probability', 'The probability that it rains on a day is 0.3. Find the probability that it does not rain on two days in a row.', 0.49, 3, { tolerance: 0.001, method: [{ any: ['0.7'] }, { any: ['0.7 x 0.7', '0.7 * 0.7', '0.7×0.7', '0.7^2', '0.7²'] }], explanation: 'P(no rain) = 0.7 each day. Two days: 0.7 × 0.7 = 0.49.' })
    ]
  }
]);
