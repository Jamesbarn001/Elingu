const { mcq, num, short, term, buildPaper } = require('./helpers');

module.exports = buildPaper({
  id: 'elingu_cbc_g10_maths_set1',
  curriculum: 'CBC',
  grade: 10,
  gradeRange: [10, 12],
  subject: 'Mathematics',
  scale: 'CBC',
  title: 'Grade 10 Mathematics — Practice Paper 1',
  series: 'Elingu practice paper, Senior School style',
  durationMinutes: 75,
  calculatorAllowed: true,
  instructions: 'Answer all questions. Section A: choose one answer. Section B: type your final answer and, for 2- and 3-mark questions, your working (method marks). A calculator is allowed.'
}, [
  {
    title: 'Section A — Choose the correct answer',
    instructions: 'Each question is worth 1 mark.',
    questions: [
      mcq('Logarithms', 'What is the value of log₁₀ 1000?', ['1', '2', '3', '10'], 'C', '10³ = 1000, so log₁₀ 1000 = 3.'),
      mcq('Surds', 'Simplify √48.', ['4√3', '6√2', '8√3', '12√4'], 'A', '√48 = √(16 × 3) = 4√3.'),
      mcq('Quadratics', 'Solve x² − 7x + 12 = 0.', ['x = 3 or x = 4', 'x = −3 or x = −4', 'x = 2 or x = 6', 'x = 1 or x = 12'], 'A', '(x − 3)(x − 4) = 0, so x = 3 or x = 4.'),
      mcq('Sequences', 'What is the 5th term of the arithmetic sequence 3, 7, 11, …?', ['15', '19', '23', '27'], 'B', 'a = 3, d = 4. The 5th term = 3 + 4 × 4 = 19.'),
      mcq('Trigonometry', 'What is the exact value of sin 30°?', ['1/2', '√3/2', '1', '√2/2'], 'A', 'sin 30° = 1/2.'),
      mcq('Coordinate geometry', 'What is the distance between (0, 0) and (3, 4)?', ['3', '4', '5', '7'], 'C', '√(3² + 4²) = √25 = 5.'),
      mcq('Straight lines', 'What is the gradient of the line y = 2x + 5?', ['5', '2', '7', '1/2'], 'B', 'In y = mx + c the gradient is m = 2.'),
      mcq('Algebra', 'Which expression is equal to (a + b)²?', ['a² + b²', 'a² + 2ab + b²', '2a + 2b', 'a² − 2ab + b²'], 'B', '(a + b)(a + b) = a² + ab + ab + b² = a² + 2ab + b².'),
      mcq('Mensuration', 'What is the volume of a cube of side 3 cm?', ['9 cm³', '18 cm³', '27 cm³', '54 cm³'], 'C', '3 × 3 × 3 = 27 cm³.'),
      mcq('Statistics', 'What is the median of 3, 7, 1, 9 and 5?', ['3', '5', '7', '9'], 'B', 'In order: 1, 3, 5, 7, 9. The middle value is 5.')
    ]
  },
  {
    title: 'Section B — Write your answer',
    instructions: 'Show your working for questions worth 2 or more marks.',
    questions: [
      num('Indices', 'Evaluate 2⁻³.', 0.125, 1, { alternatives: ['1/8'], tolerance: 1e-6, explanation: '2⁻³ = 1/2³ = 1/8 = 0.125.' }),
      num('Logarithms', 'Solve log₂ x = 5.', 32, 1, { explanation: 'log₂ x = 5 means x = 2⁵ = 32.' }),
      num('Sequences', 'Find the sum of the first 10 terms of the arithmetic sequence 2, 5, 8, …', 155, 3, { method: [{ any: ['29'] }, { any: ['10/2', '5 x', '5 *', 'n/2'] }], explanation: 'a = 2, d = 3. The 10th term is 2 + 9 × 3 = 29. Sum = (10 ÷ 2)(2 + 29) = 5 × 31 = 155.' }),
      num('Sequences', 'Find the sum to infinity of the geometric sequence 8, 4, 2, 1, …', 16, 2, { method: [{ any: ['1/2', '0.5', 'r = 0.5', 'r=0.5'] }], explanation: 'a = 8, r = 1/2. S∞ = a ÷ (1 − r) = 8 ÷ 0.5 = 16.' }),
      short('Quadratics', 'Solve x² − 5x − 14 = 0. Give both solutions.', [{ any: ['7'] }, { any: ['-2'] }], 2, '(x − 7)(x + 2) = 0, so x = 7 or x = −2.', 'x = 7 or x = -2'),
      num('Coordinate geometry', 'A triangle has vertices (0, 0), (6, 0) and (0, 8). Find its area.', 24, 2, { method: [{ any: ['1/2', '0.5', '½', '6 x 8', '6 * 8', '48'] }], explanation: 'Base 6, height 8. Area = ½ × 6 × 8 = 24 square units.' }),
      num('Trigonometry', 'In a right-angled triangle the side opposite angle θ is 5 cm and the hypotenuse is 13 cm. Find θ to 1 decimal place.', 22.6, 2, { tolerance: 0.06, unit: ['°'], method: [{ any: ['sin', '5/13', '5 / 13'] }], explanation: 'sin θ = 5/13, so θ = sin⁻¹(5/13) = 22.6°.' }),
      term('Vectors', 'Given a = (3, 2) and b = (−1, 5), write down a + b as a column or coordinate pair.', ['(2,7)', '2,7', '(2, 7)'], 2, 'a + b = (3 − 1, 2 + 5) = (2, 7).'),
      num('Vectors', 'Find the magnitude of the vector (6, 8).', 10, 1, { explanation: '√(6² + 8²) = √100 = 10.' }),
      num('Compound interest', 'KES 50 000 is invested at 10% per year compound interest. Find the amount after 2 years.', 60500, 2, { method: [{ any: ['55000', '1.1', '1.10'] }], explanation: 'After year 1: 55 000. After year 2: 55 000 × 1.1 = 60 500.' }),
      num('Probability', 'Two fair coins are tossed. Find the probability that both show heads.', 0.25, 2, { alternatives: ['1/4'], tolerance: 0.001, sample: '1/4', method: [{ any: ['1/2 x 1/2', '1/2 * 1/2', '0.5 x 0.5', '0.5 * 0.5', '1/2×1/2'] }], explanation: '1/2 × 1/2 = 1/4.' }),
      num('Statistics', 'Find the mean of 12, 15, 18, 20 and 35.', 20, 1, { explanation: 'Total = 100, and 100 ÷ 5 = 20.' }),
      num('Simultaneous equations', 'Solve 3x + 2y = 16 and x − y = 2. Find the value of x.', 4, 3, { method: [{ any: ['y + 2', 'y+2', 'x = y'] }, { any: ['5y', '10', '3y + 6', '3y+6'] }], explanation: 'From x − y = 2, x = y + 2. Then 3(y + 2) + 2y = 16, so 5y + 6 = 16, y = 2 and x = 4.' }),
      num('Mensuration', 'Find the total surface area of a cuboid 5 cm by 4 cm by 3 cm.', 94, 2, { unit: ['cm2'], method: [{ any: ['20', '15', '12', '2 x', '2 *', '2('] }], explanation: 'Areas of faces: 5×4 = 20, 5×3 = 15, 4×3 = 12. Total = 2 × (20 + 15 + 12) = 94 cm².' }),
      num('Mensuration', 'A cone has radius 3 cm and height 4 cm. Using π = 3.14, find its volume.', 37.68, 2, { tolerance: 0.05, unit: ['cm3'], method: [{ any: ['1/3', '0.333', '3.14 x 9', '3.14 * 9', '113.04'] }], explanation: 'V = ⅓πr²h = ⅓ × 3.14 × 9 × 4 = 37.68 cm³.' }),
      term('Standard form', 'Write 0.00305 in standard form.', ['3.05 x 10^-3', '3.05 × 10^-3', '3.05 * 10^-3', '3.05e-3', '3.05 x 10-3', '3.05 10-3', '3.05 10^-3'], 1, '0.00305 = 3.05 × 10⁻³.'),
      term('Sequences', 'Find the nth term of the sequence 7, 11, 15, 19, …', ['4n + 3', '4n+3', '3 + 4n', '3+4n'], 2, 'The common difference is 4, so the nth term starts 4n. 4 × 1 = 4 and 7 − 4 = 3, so the nth term is 4n + 3.'),
      term('Factorising', 'Factorise 2x² + 7x + 3.', ['(2x + 1)(x + 3)', '(x + 3)(2x + 1)', '(2x+1)(x+3)', '(x+3)(2x+1)'], 2, '2x² + 6x + x + 3 = 2x(x + 3) + 1(x + 3) = (2x + 1)(x + 3).'),
      term('Expanding', 'Expand and simplify (2x − 3)².', ['4x^2 - 12x + 9', '4x2 - 12x + 9', '4x^2-12x+9', '4x2-12x+9', '9 - 12x + 4x^2', '9-12x+4x^2'], 2, '(2x − 3)(2x − 3) = 4x² − 6x − 6x + 9 = 4x² − 12x + 9.'),
      num('Pythagoras', 'A 6.5 m ladder leans against a wall and reaches 6 m up the wall. How far is the foot of the ladder from the wall?', 2.5, 2, { unit: ['m'], method: [{ any: ['42.25', '6.5^2', '6.5²', '36'] }], explanation: '6.5² − 6² = 42.25 − 36 = 6.25, and √6.25 = 2.5 m.' })
    ]
  }
]);
