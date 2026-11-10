'use strict';
// CBC JUNIOR SCHOOL MATHEMATICS, GRADE 9
// Five strands and nineteen sub-strands, following the KICD Mathematics Grade 9 design
// (see docs/audits/kicd_verified_from_site.md). Plain text only.

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps, workedExample) {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: { title: primerTitle, tagline, body, formula: formula || null, visualBadge, realWorldContext, explanationSteps: steps, workedExample },
    socraticPrompt,
    formulaBadge: formula || null,
    examFocus
  };
}

function P(id, title, o) {
  return stop(id, title, o.pt, o.tag, o.body, o.f || null, o.vis, o.ctx, o.q, o.exam,
    o.steps.map((s, i) => `Step ${i + 1}: ${s}`), o.ex.join('\n'));
}

const S1 = [], S2 = [], S3 = [], S4 = [], S5 = [];

S1.push(P('cbc_g9_math_s1_2', '1.1 Integers', {
  pt: 'Working with Positive and Negative Whole Numbers',
  tag: 'Integers extend the counting numbers to the left of zero, so we can record debts, losses and drops in temperature',
  body: 'An integer is a whole number that may be positive, negative or zero: ..., -3, -2, -1, 0, 1, 2, 3, ... On a number line, numbers to the right of zero are positive and numbers to the left are negative; a number further right is always greater. The absolute value of an integer is its distance from zero, so |-5| = 5. To add, move right for a positive number and left for a negative number. Subtracting a number is the same as adding its opposite, so 4 - (-3) = 4 + 3. For multiplication and division, two numbers with the same sign give a positive answer and two numbers with different signs give a negative answer. When an expression has several operations, work in this order: brackets first, then powers and roots, then multiplication and division from left to right, then addition and subtraction from left to right.',
  f: 'a - (-b) = a + b  |  (+)(+) = +, (-)(-) = +, (+)(-) = -',
  vis: 'A horizontal number line from -10 to 10 with arrows showing a jump left and a jump right',
  ctx: 'A Mama Mboga in Gikomba owes a supplier KES 600 (shown as -600) and then earns KES 1 500 in a day. A climber on Mt Kenya meets -6 degrees C at night and 5 degrees C at noon.',
  q: 'Why does taking away a debt of KES 200 from your account leave you with MORE money, and how would you write that as a sum?',
  exam: 'Evaluating expressions with mixed signs and brackets in the correct order, and word problems on temperature, altitude or money in debt.',
  steps: [
    'Rewrite every subtraction of a negative as an addition, for example 7 - (-2) = 7 + 2, because taking away a debt increases what you have.',
    'Decide the sign of each product or quotient: same signs give positive, different signs give negative, because two reversals of direction bring you back to the original direction.',
    'Work in the order brackets, powers, then multiplication and division left to right, because this order is the agreed rule that gives everyone the same answer.',
    'Finish with addition and subtraction from left to right, using the number line for the signs.',
    'Check that the sign and size of the answer make sense in the story, for example a loss should leave a lower amount.'
  ],
  ex: [
    'Problem A: Evaluate -12 x (-5) + 36 / (-4) - (-7).',
    'Multiplication: -12 x (-5) = +60 (same signs, 12 x 5 = 60).',
    'Division: 36 / (-4) = -9 (different signs, 36 / 4 = 9).',
    'Expression becomes 60 + (-9) - (-7) = 60 - 9 + 7.',
    '60 - 9 = 51, then 51 + 7 = 58.',
    'Problem B: At night on Mt Kenya the temperature is -6 degrees C. It rises by 11 degrees C by morning, then falls by 9 degrees C by evening.',
    '-6 + 11 = 5 degrees C, then 5 - 9 = -4 degrees C.',
    'Common mistake: writing 7 - (-2) = 5. Subtracting a negative is adding, so the answer is 9. Another is doing 36 / (-4) as +9.'
  ]
}));

S1.push(P('cbc_g9_math_s1_3', '1.2 Cubes and Cube Roots', {
  pt: 'Multiplying a Number by Itself Three Times, and Undoing It',
  tag: 'A cube is the volume-shaped power and a cube root is the side length that gives it',
  body: 'The cube of a number n is n x n x n, written n^3. It is called a cube because it is the volume of a cube whose edges are each n long. The cube root of a number is the number that, multiplied by itself three times, gives it; cube root of 27 is 3 because 3 x 3 x 3 = 27. Cubing and taking the cube root undo each other. Unlike squares, cubes of negative numbers are negative, because three negatives multiply to a negative: (-2)^3 = -8, so the cube root of -8 is -2. To find the cube root of a large number, break it into prime factors, group the factors in threes, and take one from each group. Cube roots of fractions are found by taking the cube root of the top and bottom separately.',
  f: 'n^3 = n x n x n  |  cube root of (a x a x a) = a',
  vis: 'A solid cube with every edge marked n and its volume written as n x n x n',
  ctx: 'A cube-shaped water tank in a Kisumu school holds 1.728 cubic metres. To fit it on the stand, the caretaker must know the length of one edge.',
  q: 'If a cube of side 4 cm is made of 1 cm blocks, how many blocks are needed, and how is that number related to 4?',
  exam: 'Finding cubes and cube roots by factorisation or from tables, cube roots of decimals and fractions, and edge length of a cube from its volume.',
  steps: [
    'Write the number as a product of prime factors, because every whole number has one unique set of prime factors.',
    'Group equal prime factors into threes, because a cube has each prime factor appearing a multiple of three times.',
    'Take one factor from each group of three, because a group of three equal factors is one number cubed.',
    'Multiply the chosen factors to get the cube root.',
    'Check by cubing your answer to confirm it returns the original number.'
  ],
  ex: [
    'Problem A: Find the cube root of 1 728.',
    '1 728 = 2 x 864 = 2 x 2 x 432 = 2 x 2 x 2 x 216 = 2 x 2 x 2 x 2 x 108 = ... = 2 x 2 x 2 x 2 x 2 x 2 x 3 x 3 x 3, so 1 728 = 2^6 x 3^3.',
    'Groups of three: (2 x 2 x 2)(2 x 2 x 2)(3 x 3 x 3).',
    'One from each group: 2 x 2 x 3 = 12.',
    'Check: 12 x 12 x 12 = 144 x 12 = 1 728.',
    'Problem B: A cube-shaped tank holds 1.728 m^3. The edge is the cube root of 1.728 = cube root of (1 728 / 1 000) = 12 / 10 = 1.2 m.',
    'Problem C: cube root of (-343 / 27) = (-7) / 3, because (-7)^3 = -343 and 3^3 = 27.',
    'Common mistake: calculating 4^3 as 4 x 3 = 12. The cube means 4 x 4 x 4 = 64. Another is thinking a negative number has no cube root; it does.'
  ]
}));

S1.push(P('cbc_g9_math_s1_1', '1.3 Indices and Logarithms', {
  pt: 'Powers, Their Laws, and Logarithms as the Opposite of a Power',
  tag: 'An index counts repeated multiplication and a logarithm asks which index gives a number',
  body: 'In a^n, a is the base and n is the index (or power); a^n means a multiplied by itself n times. The laws follow from counting: a^m x a^n = a^(m+n); a^m / a^n = a^(m-n); (a^m)^n = a^(mn). Dividing a^n by itself gives 1, which shows a^0 = 1 for a not zero. Continuing the pattern downward gives a^(-n) = 1 / a^n, and a^(1/n) is the nth root of a, so a^(m/n) = (nth root of a)^m. A logarithm reverses a power: log base a of N equals x exactly when a^x = N. So log base 2 of 8 is 3 because 2^3 = 8. Because logs are indices, the laws are: log(MN) = log M + log N; log(M/N) = log M - log N; log(M^k) = k log M. Very large or small numbers use standard form, A x 10^n with 1 <= A < 10, for example 4 500 000 = 4.5 x 10^6.',
  f: 'a^m x a^n = a^(m+n)  |  a^(-n) = 1/a^n  |  log_a N = x means a^x = N',
  vis: 'A doubling chain 1, 2, 4, 8, 16, 32 with each step labelled as an index',
  ctx: 'A promotion message is forwarded so the number of people who get it doubles every hour: after n hours there are 2^n people. How many hours to reach 1 024?',
  q: 'Why must 5^0 equal 1 if 5^3 divided by 5^3 is a number divided by itself?',
  exam: 'Simplifying and evaluating expressions with zero, negative and fractional indices, solving a^x = N, evaluating and combining logarithms, and standard form.',
  steps: [
    'Express every number with the same base where possible, for example 8 = 2^3, because the laws only apply to powers of one base.',
    'Apply the law that fits the operation: add indices when multiplying, subtract when dividing, multiply when raising a power to a power.',
    'Deal with negative and fractional indices: flip to a reciprocal for negative, take the root for the denominator of a fraction.',
    'To solve an index equation, write both sides as powers of the same base, then equate the indices, because equal powers of the same base have equal indices.',
    'To use logarithms, convert between log form and index form, then apply the log laws to combine terms.'
  ],
  ex: [
    'Problem A: Evaluate (8^(2/3) x 2^(-3)) / 4^(-1/2).',
    '8^(2/3) = (cube root of 8)^2 = 2^2 = 4.',
    '2^(-3) = 1 / 2^3 = 1/8.',
    'Numerator: 4 x 1/8 = 1/2.',
    '4^(-1/2) = 1 / (square root of 4) = 1/2.',
    'Result: (1/2) / (1/2) = 1.',
    'Problem B: Solve 2^(x+1) = 32. Write 32 = 2^5, so x + 1 = 5 and x = 4. Check: 2^5 = 32.',
    'Problem C: Evaluate log_2 8 + log_2 32 - log_2 4 = 3 + 5 - 2 = 6. By the laws: log_2 (8 x 32 / 4) = log_2 64 = 6, since 2^6 = 64.',
    'Problem D: The promotion doubles each hour: 2^n = 1 024 gives n = 10 hours, since 2^10 = 1 024.',
    'Common mistake: adding the bases, for example 2^3 x 2^4 = 4^7. The base stays 2 and the indices add: 2^7 = 128. Another is writing 2^(-3) as -8.'
  ]
}));

S1.push(P('cbc_g9_math_s1_4', '1.4 Compound Proportions and Rates of Work', {
  pt: 'When Several Quantities Change Together, and How Fast Jobs Get Done',
  tag: 'Compare each quantity to the unknown one at a time, as direct or inverse, then combine',
  body: 'Two quantities are in direct proportion when one increases by the same factor as the other: more maize costs more money. They are in inverse proportion when one increases while the other decreases by the same factor: more workers take fewer days. In a compound proportion problem, the answer depends on more than one quantity, for example the number of machines and the number of days. Method: start with the known amount, then multiply by one ratio for each quantity that changes, choosing each ratio so the answer moves in the correct direction (a direct link uses new / old; an inverse link uses old / new). Rate of work is the fraction of a job done in one unit of time. If a person finishes a job in t hours, the rate is 1/t of the job per hour. When people work together, their rates add. The time taken together is 1 divided by the combined rate.',
  f: 'Rate = 1 / time for whole job  |  Combined rate = sum of individual rates  |  Time together = 1 / combined rate',
  vis: 'Two tanks being filled by a thick pipe and a thin pipe with the fraction filled per hour written beside each',
  ctx: 'A factory in Thika makes bottles with machines; a contractor in Kitale puts up mabati roofing with workers; two taps fill a school tank.',
  q: 'If 5 workers take 12 days to dig a drain, why should 10 workers take 6 days and not 24 days?',
  exam: 'Compound proportion problems with two or more changing quantities, and the time two or more people or taps take working together or against each other.',
  steps: [
    'Write down the known situation and the unknown beside it, with units, because the same units must be compared.',
    'For each quantity that changes, decide whether it is direct or inverse to the unknown, because the ratio is turned over for inverse links.',
    'Multiply the known amount by each ratio, because each ratio shows the effect of one change.',
    'For rates of work, find each worker as a fraction of the job per hour and add the fractions, because work done adds up over the same time.',
    'Invert the combined rate to find the time, and check the time is shorter than the fastest worker alone.'
  ],
  ex: [
    'Problem A: 5 machines produce 2 000 bottles in 8 days. How many bottles will 10 machines produce in 6 days?',
    'More machines gives more bottles (direct): multiply by 10/5.',
    'Fewer days gives fewer bottles (direct): multiply by 6/8.',
    'Bottles = 2 000 x 10/5 x 6/8 = 2 000 x 2 x 0.75 = 3 000 bottles.',
    'Problem B: A tap fills a tank in 6 hours and a second tap fills it in 3 hours. How long do they take together?',
    'Rates: 1/6 and 1/3 of the tank per hour. Combined = 1/6 + 2/6 = 3/6 = 1/2 of the tank per hour.',
    'Time = 1 / (1/2) = 2 hours. Check: in 2 hours, 2/6 + 2/3 = 1/3 + 2/3 = 1 whole tank.',
    'Problem C: 8 workers finish a roof in 15 days. How long do 10 workers take? More workers means fewer days (inverse): 15 x 8/10 = 12 days.',
    'Common mistake: using a direct ratio for an inverse link, getting 15 x 10/8 = 18.75 days, which says more workers take longer. Always ask whether the answer should grow or shrink.'
  ]
}));

S2.push(P('cbc_g9_math_s2_2', '2.1 Matrices', {
  pt: 'Tables of Numbers You Can Add, Multiply and Reverse',
  tag: 'A matrix stores quantities in rows and columns so that totals can be found in one organised step',
  body: 'A matrix is a rectangular arrangement of numbers in rows (across) and columns (down), written inside brackets. Its order is rows x columns, so a matrix with 2 rows and 3 columns has order 2 x 3. Each number is an element. Matrices of the same order are added or subtracted by adding or subtracting elements in the same position. Multiplying by a number multiplies every element. To multiply two matrices, the number of columns of the first must equal the number of rows of the second; each element of the answer is found by multiplying along a row of the first by down a column of the second and adding. This is the same as quantity x price, added up. The identity matrix I = [[1, 0], [0, 1]] leaves any 2 x 2 matrix unchanged when multiplied. For A = [[a, b], [c, d]] the determinant is ad - bc. If it is not zero, the inverse is (1 / (ad - bc)) x [[d, -b], [-c, a]], and A multiplied by its inverse gives I. If the determinant is zero, there is no inverse.',
  f: 'det A = ad - bc  |  A^-1 = (1 / (ad - bc)) [[d, -b], [-c, a]]  |  A A^-1 = I',
  vis: 'A grid of rows and columns with a highlighted row and column crossing to give one element of the product',
  ctx: 'Two Mama Mbogas record how many bundles of sukuma and kilograms of tomatoes they bought on two days, and the prices per unit are written in one column to find each day total.',
  q: 'If you bought 3 bundles of sukuma at KES 20 and 2 kg of tomatoes at KES 30, which multiplications and which addition give your total, and what would a table of these look like?',
  exam: 'Order of a matrix, addition, subtraction and multiplication of matrices up to 2 x 2, determinant, and finding the inverse of a 2 x 2 matrix.',
  steps: [
    'State the order of each matrix (rows x columns), because adding needs equal orders and multiplying needs columns of the first equal to rows of the second.',
    'For addition or subtraction, combine elements in matching positions, because each position stands for the same item.',
    'For multiplication, take row by column: multiply matching elements and add, because each answer element is a total of quantity x price.',
    'To find an inverse, first compute the determinant ad - bc, because if it is zero no inverse exists.',
    'Swap a and d, change the signs of b and c, then divide every element by the determinant, because this rearrangement makes A times the result equal to the identity.',
    'Check by multiplying A by the inverse and confirming the identity matrix.'
  ],
  ex: [
    'Problem A: Day 1 and Day 2 orders (sukuma bundles, kg tomatoes) are given by A = [[3, 2], [1, 4]], with row 1 for Mama Achieng and row 2 for Mama Wanjiru. Prices are KES 20 per bundle and KES 30 per kg. Find each person total.',
    'Prices column = [[20], [30]]. A is 2 x 2 and the column is 2 x 1, so the product is 2 x 1.',
    'Row 1: 3 x 20 + 2 x 30 = 60 + 60 = 120.',
    'Row 2: 1 x 20 + 4 x 30 = 20 + 120 = 140.',
    'Totals: [[120], [140]], so Achieng spends KES 120 and Wanjiru spends KES 140.',
    'Problem B: Find the inverse of M = [[2, 1], [5, 3]].',
    'Determinant = 2 x 3 - 1 x 5 = 6 - 5 = 1.',
    'Inverse = (1 / 1) x [[3, -1], [-5, 2]] = [[3, -1], [-5, 2]].',
    'Check: [[2, 1], [5, 3]] x [[3, -1], [-5, 2]] = [[2x3 + 1x(-5), 2x(-1) + 1x2], [5x3 + 3x(-5), 5x(-1) + 3x2]] = [[1, 0], [0, 1]].',
    'Common mistake: multiplying matrices element by element (2 x 3 in the top left). Multiplication is row by column. Also, AB is usually not equal to BA.'
  ]
}));

S2.push(P('cbc_g9_math_s3_1', '2.2 Equation of a Straight Line', {
  pt: 'Gradient, Intercept and the Equation y = mx + c',
  tag: 'A straight line is fully described by how steep it is and where it crosses the vertical axis',
  body: 'On a graph, every point has coordinates (x, y). The gradient of a line is its steepness: the vertical change divided by the horizontal change between two points, m = (y2 - y1) / (x2 - x1). A positive gradient slopes up to the right, a negative gradient slopes down, a horizontal line has gradient 0. The y-intercept c is the value of y where the line crosses the y-axis (where x = 0). Every straight line can be written y = mx + c. The x-intercept is where y = 0. Parallel lines have equal gradients. Two lines are perpendicular when the product of their gradients is -1, so the gradient of a perpendicular line is the negative reciprocal. To draw a line, find two or more points that satisfy the equation, plot them and join them with a ruler.',
  f: 'm = (y2 - y1) / (x2 - x1)  |  y = mx + c  |  perpendicular: m1 x m2 = -1',
  vis: 'A grid with a line, a right-angled triangle showing rise and run along it, and the intercept marked on the y-axis',
  ctx: 'A matatu charges a fixed fare of KES 20 plus KES 5 for every kilometre, so the fare F = 5d + 20 is a straight line with gradient 5 and intercept 20. A ramp at a school has a gradient showing how steep it is.',
  q: 'If the fare is KES 20 when you board and rises by KES 5 each kilometre, which number is the gradient and which is the starting value on the graph?',
  exam: 'Finding the gradient from two points, writing the equation of a line, finding intercepts, parallel and perpendicular lines, drawing a line from its equation and reading a graph.',
  steps: [
    'Choose two points on the line and label them (x1, y1) and (x2, y2).',
    'Find the gradient m = (y2 - y1) / (x2 - x1), because gradient is rise over run and both must be taken in the same order.',
    'Substitute m and one point into y = mx + c, because the point must lie on the line.',
    'Solve for c, then write the equation y = mx + c.',
    'For the x-intercept, put y = 0 and solve; for the y-intercept, put x = 0.',
    'For a perpendicular line, flip the gradient and change its sign, because the product of perpendicular gradients is -1.'
  ],
  ex: [
    'Problem A: Find the equation of the line through (2, 3) and (6, 11).',
    'Gradient m = (11 - 3) / (6 - 2) = 8 / 4 = 2.',
    'Use (2, 3): 3 = 2 x 2 + c, so 3 = 4 + c and c = -1.',
    'Equation: y = 2x - 1. Check with (6, 11): 2 x 6 - 1 = 11, correct.',
    'x-intercept: put y = 0, 0 = 2x - 1, so x = 0.5. The line crosses the x-axis at (0.5, 0).',
    'Problem B: Find the equation of the line perpendicular to y = 2x - 1 through (4, 1).',
    'Gradient = -1 / 2, because 2 x (-1/2) = -1.',
    'Substitute: 1 = (-1/2)(4) + c, so 1 = -2 + c and c = 3. Equation: y = -x/2 + 3.',
    'Problem C: The matatu fare F = 5d + 20. For 12 km, F = 5 x 12 + 20 = KES 80.',
    'Common mistake: subtracting in a different order on top and bottom, for example (11 - 3) / (2 - 6) = -2. Take both differences in the same order. Another is reading the gradient from an equation written 2y = 4x + 6 without dividing by 2 first: y = 2x + 3.'
  ]
}));

S2.push(P('cbc_g9_math_s2_3', '2.3 Linear Inequalities', {
  pt: 'Solving "Less Than" and "More Than" Statements',
  tag: 'An inequality gives a whole range of answers, not one, and its sign flips when you multiply by a negative',
  body: 'An inequality compares two expressions using the signs < (less than), > (greater than), <= (less than or equal to) and >= (greater than or equal to). A linear inequality has the unknown to the power 1. Solving it uses the same steps as an equation: add or subtract the same number on both sides, multiply or divide both sides by the same number. There is one new rule: if you multiply or divide both sides by a NEGATIVE number, the inequality sign reverses, because negative numbers reverse order (2 < 3 but -2 > -3). The answer is a range of values, shown on a number line with an open circle for < or > (the end point is not included) and a closed circle for <= or >= (the end point is included). A combined inequality such as -2 < x <= 4 means x lies between the two values.',
  f: 'Multiply or divide by a negative: reverse the sign  |  a < x <= b',
  vis: 'A number line with an open circle at -2, a closed circle at 4 and the stretch between shaded',
  ctx: 'Mama Mboga has KES 2 000 and wants at least KES 300 left after buying bundles of sukuma at KES 50. A school requires a score of at least 40 marks to pass. A matatu carries at most 14 passengers.',
  q: 'You have KES 100 and each mandazi costs KES 15. How many can you buy, and is the answer one number or many?',
  exam: 'Solving and representing linear inequalities on a number line, combined inequalities, listing integer solutions, and forming an inequality from a word problem.',
  steps: [
    'Collect the unknown on one side and numbers on the other, using the same operation on both sides, because this keeps the statement true.',
    'If you multiply or divide by a negative number, reverse the inequality sign, because negatives reverse the order of numbers.',
    'Write the answer as x compared with a number.',
    'Draw the number line: open circle for < and >, closed circle for <= and >=, and shade the direction of the solutions.',
    'For a combined inequality, solve all three parts at once and list the whole numbers inside the range if asked.',
    'Check by substituting one value inside the range and one outside.'
  ],
  ex: [
    'Problem A: Solve 3x - 5 <= 10. Add 5: 3x <= 15. Divide by 3: x <= 5. Check x = 5: 15 - 5 = 10, which is allowed.',
    'Problem B: Solve -2x + 3 > 11. Subtract 3: -2x > 8. Divide by -2 and reverse the sign: x < -4. Check x = -5: 10 + 3 = 13 > 11, true.',
    'Problem C: List integers satisfying -3 < 2x + 1 <= 9. Subtract 1 from all parts: -4 < 2x <= 8. Divide by 2: -2 < x <= 4. Integers: -1, 0, 1, 2, 3, 4.',
    'Problem D: Mama Mboga has KES 2 000 and wants at least KES 300 left. With n bundles at KES 50: 2 000 - 50n >= 300. So -50n >= -1 700 and n <= 34. She can buy at most 34 bundles.',
    'Common mistake: dividing -2x > 8 by -2 and writing x > -4. The sign must reverse to x < -4. Another is shading toward the wrong side on the number line.'
  ]
}));

S3.push(P('cbc_g9_math_s3_2', '3.1 Area', {
  pt: 'Measuring Flat Surfaces: Polygons, Circles, Sectors and Combined Shapes',
  tag: 'Area counts how many unit squares cover a surface, and every formula comes from rectangles',
  body: 'Area is the amount of flat surface inside a shape, measured in square units such as cm^2 or m^2. A rectangle has area length x width. A parallelogram has area base x perpendicular height. A triangle is half a parallelogram, so its area is 1/2 x base x height. A trapezium has one pair of parallel sides a and b a distance h apart, and its area is 1/2 (a + b) x h. A circle of radius r has circumference 2 pi r and area pi r^2, where pi is about 22/7 or 3.14. A sector is a slice of a circle with centre angle theta, so its area is theta/360 x pi r^2. To find the area of a combined shape, split it into shapes you know, find each area, then add (or subtract a hole). Always keep the units the same, and give the unit squared.',
  f: 'Triangle = 1/2 b h  |  Trapezium = 1/2 (a + b) h  |  Circle = pi r^2  |  Sector = (theta/360) pi r^2',
  vis: 'A trapezium split into two triangles and a rectangle with measurements marked',
  ctx: 'A builder in Eldoret prices mabati roofing per square metre. A farmer fences a circular shamba. A football pitch has a centre circle and rectangular goal areas.',
  q: 'Why is the area of a triangle exactly half of the rectangle with the same base and height?',
  exam: 'Areas of triangles, quadrilaterals, circles and sectors, and composite shapes with holes or semicircles, with correct units.',
  steps: [
    'Sketch the shape and mark all lengths, converting to the same unit first, because areas cannot be added if units differ.',
    'Split a combined shape into rectangles, triangles, trapeziums, circles or parts of circles you know.',
    'Write the formula for each part and substitute, because the formula shows exactly which lengths are needed.',
    'Add the areas of parts that join, and subtract the area of any hole.',
    'State the answer with the unit squared, and check it is reasonable by comparing it with an enclosing rectangle.'
  ],
  ex: [
    'Problem A: A trapezium roof has parallel sides 8 m and 12 m and height 5 m. Area = 1/2 x (8 + 12) x 5 = 1/2 x 20 x 5 = 50 m^2. At KES 650 per m^2 the mabati costs 50 x 650 = KES 32 500.',
    'Problem B: A circular shamba has radius 7 m (use pi = 22/7). Area = 22/7 x 7 x 7 = 154 m^2.',
    'Problem C: Sector of radius 14 cm and angle 90 degrees. Area = 90/360 x 22/7 x 14 x 14 = 1/4 x 616 = 154 cm^2.',
    'Problem D: A shape is a 10 m by 6 m rectangle with a semicircle of diameter 6 m on one short side. Rectangle = 10 x 6 = 60 m^2. Radius = 3 m, semicircle = 1/2 x 22/7 x 3 x 3 = 99/7 = 14.14 m^2 (2 d.p.). Total = 60 + 14.14 = 74.14 m^2.',
    'Common mistake: using the slanted side instead of the perpendicular height in a triangle or parallelogram. Another is using the diameter as the radius in pi r^2.'
  ]
}));

S3.push(P('cbc_g9_math_s3_3', '3.2 Volume of Solids', {
  pt: 'Measuring Space Inside Prisms, Cylinders, Pyramids, Cones and Spheres',
  tag: 'A prism has volume base area x height; a pyramid or cone is one third of the matching prism',
  body: 'Volume is the amount of space inside a solid, measured in cubic units such as cm^3 or m^3. A prism has the same cross-section all along its length, so its volume is the area of the cross-section times the length (height). A cylinder is a prism with a circular base, so V = pi r^2 h. A pyramid with the same base and height as a prism has exactly one third of its volume, so V = 1/3 x base area x h. A cone is a pyramid with a circular base, V = 1/3 pi r^2 h. A sphere of radius r has V = 4/3 pi r^3. Capacity is the volume a container can hold: 1 000 cm^3 = 1 litre and 1 m^3 = 1 000 litres. Convert all lengths to the same unit before working.',
  f: 'Prism = base area x h  |  Cylinder = pi r^2 h  |  Pyramid = 1/3 base x h  |  Cone = 1/3 pi r^2 h  |  Sphere = 4/3 pi r^3',
  vis: 'A cylinder, a cone and a pyramid drawn with the same base and height beside each other',
  ctx: 'A cylindrical water tank on a roof in Nyeri, a conical pile of maize, a pyramid-shaped roof and a football (sphere).',
  q: 'If a cone and a cylinder have the same base and height, how many cones of maize would you need to fill the cylinder?',
  exam: 'Volumes of prisms, cylinders, pyramids, cones and spheres, capacity in litres, and finding a missing dimension.',
  steps: [
    'Identify the solid and write down its dimensions in one unit, because volume formulas use lengths in the same unit.',
    'Choose the formula and substitute carefully, using the radius, not the diameter.',
    'Calculate in stages, writing the base area first for prisms, pyramids and cones.',
    'Write the unit cubed.',
    'Convert to litres if capacity is asked: 1 m^3 = 1 000 litres.'
  ],
  ex: [
    'Problem A: A cylindrical tank has radius 0.7 m and height 2 m (use pi = 22/7). V = 22/7 x 0.7 x 0.7 x 2 = 22/7 x 0.98 = 3.08 m^3. Capacity = 3.08 x 1 000 = 3 080 litres.',
    'Problem B: A cone of maize has radius 3 m and height 7 m. V = 1/3 x 22/7 x 3 x 3 x 7 = 1/3 x 198 = 66 m^3.',
    'Problem C: A pyramid has a square base of side 6 m and height 5 m. Base area = 36 m^2. V = 1/3 x 36 x 5 = 60 m^3.',
    'Problem D: A ball of radius 3.5 cm. V = 4/3 x 22/7 x 3.5^3 = 4/3 x 22/7 x 42.875 = 179.67 cm^3 (2 d.p.).',
    'Common mistake: forgetting the 1/3 for a cone or pyramid, or using diameter for radius. Another is leaving a volume in cm^3 when litres were asked.'
  ]
}));

S3.push(P('cbc_g9_math_s3_4', '3.3 Mass, Volume, Weight and Density', {
  pt: 'How Heavy a Material Is for Its Size, and the Difference Between Mass and Weight',
  tag: 'Density is mass per unit volume, and weight is the pull of gravity on a mass',
  body: 'Mass is the amount of matter in an object and is measured in grams (g) and kilograms (kg). Weight is the force with which gravity pulls the object downward and is measured in newtons (N). On Earth, weight = mass x g, where g is about 10 N per kg (9.8 is more exact), so a 60 kg learner weighs about 600 N. Mass is the same everywhere; weight changes with gravity. Density is how much mass fits into each unit of volume: density = mass / volume, in g/cm^3 or kg/m^3. The three quantities are linked: mass = density x volume and volume = mass / density. Water has density 1 g/cm^3 which is 1 000 kg/m^3, and 1 g/cm^3 = 1 000 kg/m^3. An object floats in water if its density is less than that of water.',
  f: 'Density = mass / volume  |  Weight = mass x g  |  1 g/cm^3 = 1 000 kg/m^3',
  vis: 'A triangle with mass on top and density and volume below, to show which quantity to cover',
  ctx: 'A mason in Kisii compares a block of stone and a mabati sheet; a trader weighs sacks of maize in kg; a tank of water has a known mass.',
  q: 'Why does a small stone sink in water while a large piece of wood floats?',
  exam: 'Calculating density, mass or volume, converting between g/cm^3 and kg/m^3, mass versus weight, and problems on water in tanks.',
  steps: [
    'List what is given and what is needed, with units.',
    'Convert units so they match (for example g with cm^3, or kg with m^3), because density only makes sense with matching units.',
    'Choose the relationship: density = mass / volume, or rearrange it.',
    'Substitute and calculate, keeping the unit that results.',
    'For weight, multiply mass in kg by g, and give the answer in newtons.'
  ],
  ex: [
    'Problem A: A metal block has mass 540 g and volume 200 cm^3. Density = 540 / 200 = 2.7 g/cm^3.',
    'Problem B: Convert to kg/m^3: 2.7 g/cm^3 x 1 000 = 2 700 kg/m^3.',
    'Problem C: An iron piece of density 7.8 g/cm^3 has volume 50 cm^3. Mass = 7.8 x 50 = 390 g.',
    'Problem D: A tank holds 3.08 m^3 of water. Mass = 1 000 x 3.08 = 3 080 kg.',
    'Problem E: A learner of mass 60 kg has weight 60 x 10 = 600 N.',
    'Common mistake: writing weight in kg. Weight is a force in newtons. Another is dividing volume by mass instead of mass by volume.'
  ]
}));
S3.push(P('cbc_g9_math_s3_5', '3.4 Time, Distance and Speed', {
  pt: 'How Far, How Long and How Fast',
  tag: 'Speed is distance covered in one unit of time, and average speed uses total distance over total time',
  body: 'Speed is the distance travelled per unit of time: speed = distance / time. Common units are km/h and m/s. Rearranged, distance = speed x time and time = distance / speed. To change km/h to m/s, multiply by 1 000 and divide by 3 600, which is the same as dividing by 3.6. Time on a clock is given in the 24-hour system (14:30 is 2:30 pm); to find a journey time subtract the departure time from the arrival time, borrowing 60 minutes when needed. When a journey has several parts at different speeds, the average speed is NOT the average of the speeds. It is total distance divided by total time. When two vehicles travel toward each other, their speeds add to give the speed at which the gap closes; when one chases another in the same direction, the speeds subtract.',
  f: 'Speed = distance / time  |  Average speed = total distance / total time  |  km/h to m/s: divide by 3.6',
  vis: 'A distance-time graph with a steep line for fast travel and a flat stretch for a stop',
  ctx: 'A bus leaves Nairobi for Mombasa; two matatus drive toward each other on the Nakuru road; a runner at a school athletics day covers 100 m.',
  q: 'If you travel 60 km at 40 km/h and 60 km at 60 km/h, is your average speed 50 km/h? What do you need to find first?',
  exam: 'Speed, distance and time calculations, average speed for two-stage journeys, 24-hour time, relative speeds of two vehicles, and distance-time graphs.',
  steps: [
    'Write the units and convert time to hours (or minutes to seconds) so they agree with the speed units.',
    'Pick the formula for the unknown: speed, distance or time.',
    'For a multi-stage trip, find the time of each stage with time = distance / speed.',
    'Add the distances and add the times, then divide total distance by total time for average speed.',
    'For two vehicles meeting, divide the gap by the sum of the speeds; for a chase, divide the gap by the difference.'
  ],
  ex: [
    'Problem A: A bus leaves Nairobi at 06:30 and reaches Mombasa at 14:30, a distance of 480 km. Time = 14:30 - 06:30 = 8 h. Speed = 480 / 8 = 60 km/h.',
    'Problem B: A car does 60 km at 40 km/h and 60 km at 60 km/h. Time 1 = 60/40 = 1.5 h. Time 2 = 60/60 = 1 h. Total distance = 120 km, total time = 2.5 h. Average speed = 120 / 2.5 = 48 km/h (not 50).',
    'Problem C: Two matatus are 300 km apart and drive toward each other at 70 km/h and 80 km/h. Closing speed = 150 km/h. Time to meet = 300 / 150 = 2 h.',
    'Problem D: 72 km/h in m/s = 72 / 3.6 = 20 m/s.',
    'Common mistake: averaging the speeds (40 + 60) / 2. Always divide total distance by total time. Another is writing 2 h 30 min as 2.30 h; it is 2.5 h.'
  ]
}));

S3.push(P('cbc_g9_math_s3_6', '3.5 Money', {
  pt: 'Profit, Discount, Commission, Tax and Simple Interest',
  tag: 'Every money problem is a percentage of the right starting amount',
  body: 'Profit is selling price minus buying price when selling price is higher; loss is the opposite. Percentage profit = profit / buying price x 100, because profit is always compared with what was paid. A discount is a reduction in the marked price, percentage discount = discount / marked price x 100. Commission is a payment to a salesperson, a percentage of the value of what they sell. Value Added Tax (VAT) is a percentage tax added to the price of goods and services; at the standard Kenyan rate of 16 percent, a price of 100 before tax becomes 116. Simple interest is paid only on the amount first deposited or borrowed (the principal): I = P x R x T / 100, where R is the percentage rate per year and T is the time in years. The total amount is A = P + I.',
  f: 'Profit % = profit / cost x 100  |  Simple interest I = PRT / 100  |  Price with VAT = price x 1.16',
  vis: 'A price tag with the marked price crossed out, a percentage discount and the new price',
  ctx: 'A shopkeeper buys sugar and resells it; a shop gives a 15 percent discount; an agent earns commission selling plots; a savings group earns interest on a deposit.',
  q: 'A shirt bought for KES 800 is sold for KES 1 000. Is the profit percentage found from KES 1 000 or KES 800, and why?',
  exam: 'Profit and loss percentages, discount and selling price, commission, VAT calculations and simple interest.',
  steps: [
    'Identify the base amount, the one the percentage is taken from (cost for profit, marked price for discount, sales for commission, price before tax for VAT).',
    'Convert the percentage to a fraction or decimal, for example 16 percent = 0.16.',
    'Multiply the base by the decimal to find the amount of profit, discount, commission, tax or interest.',
    'Add or subtract to get the final price or amount.',
    'Check that the answer moves the right way: a discount should lower the price and VAT should raise it.'
  ],
  ex: [
    'Problem A: Bought at KES 800, sold at KES 1 000. Profit = 1 000 - 800 = KES 200. Profit % = 200 / 800 x 100 = 25 percent.',
    'Problem B: A phone marked at KES 4 000 has a 15 percent discount. Discount = 0.15 x 4 000 = KES 600. Selling price = 4 000 - 600 = KES 3 400.',
    'Problem C: An agent earns 5 percent commission on sales of KES 240 000. Commission = 0.05 x 240 000 = KES 12 000.',
    'Problem D: A fridge costs KES 5 000 before VAT. VAT at 16 percent = 0.16 x 5 000 = KES 800. Price paid = KES 5 800.',
    'Problem E: A group deposits KES 50 000 at 8 percent per year for 3 years. I = 50 000 x 8 x 3 / 100 = KES 12 000. Total = KES 62 000.',
    'Common mistake: finding profit percentage from the selling price (200/1 000 = 20 percent). It must be from the cost. Another is subtracting VAT when it should be added.'
  ]
}));

S3.push(P('cbc_g9_math_s3_7', '3.6 Approximations and Errors', {
  pt: 'Rounding, Estimating and Measuring How Wrong an Answer Can Be',
  tag: 'No measurement is exact, so we state how far from the true value it could be',
  body: 'To approximate a number is to replace it by a nearby, simpler one. We round to a number of decimal places (digits after the point) or significant figures (digits counted from the first non-zero digit). To round, look at the next digit: 5 or more rounds up, less than 5 leaves the digit unchanged. Estimating means rounding each number to one easy figure before calculating, to check that an answer is sensible. A measurement made to the nearest unit could be up to half a unit above or below. The absolute error is the size of the difference between the estimated and the true value. The relative error is absolute error divided by the true (or measured) value. The percentage error is relative error x 100. The limits of a measurement are measured value minus half the unit, and measured value plus half the unit.',
  f: 'Absolute error = |approx - true|  |  Relative error = absolute error / true value  |  Percentage error = relative error x 100',
  vis: 'A ruler with a length falling between two marks and the two limits marked',
  ctx: 'A tailor measures cloth to the nearest centimetre; a trader estimates a bill at the market; a teacher uses 22/7 for pi.',
  q: 'A length is measured as 12.4 cm to one decimal place. What is the smallest and largest value the true length could be?',
  exam: 'Rounding to decimal places and significant figures, estimation, absolute, relative and percentage errors, and limits of measurements.',
  steps: [
    'Decide the place to round to and look at the digit just after it.',
    'Round up if that digit is 5 or more; otherwise leave the digit.',
    'For error, find the true value and the approximation, then subtract to get the absolute error.',
    'Divide the absolute error by the true value for relative error, then multiply by 100 for percentage error.',
    'For limits, write half of the unit of measure and subtract it from, and add it to, the measurement.'
  ],
  ex: [
    'Problem A: Round 3.14159 to 3 significant figures: the digits are 3, 1, 4 and the next digit is 1, so the answer is 3.14.',
    'Problem B: A length of 12.4 cm is measured to 1 d.p. The unit is 0.1 cm so half is 0.05. Lower limit = 12.4 - 0.05 = 12.35 cm. Upper limit = 12.4 + 0.05 = 12.45 cm.',
    'Problem C: Absolute error is 0.05, relative error = 0.05 / 12.4 = 0.00403 (3 s.f.), percentage error = 0.403 percent.',
    'Problem D: Estimate 4.87 x 19.6. Round to 5 x 20 = 100. The exact answer is 95.452, so 100 is a reasonable estimate.',
    'Problem E: Using 22/7 = 3.142857 for pi = 3.141593. Absolute error = 0.001264. Percentage error = 0.001264 / 3.141593 x 100 = 0.0402 percent.',
    'Common mistake: counting the leading zeros as significant figures. 0.0305 to 2 s.f. is 0.031, because counting starts at the first non-zero digit, 3. Another is dividing the error by the approximation when told to use the true value.'
  ]
}));

S4.push(P('cbc_g9_math_s4_1', '4.1 Coordinates and Graphs', {
  pt: 'Locating Points, Finding Midpoints and Distances, and Drawing Graphs from Tables',
  tag: 'Every point has an address (x, y), and an equation turns a table of values into a picture',
  body: 'The Cartesian plane has a horizontal x-axis and a vertical y-axis that cross at the origin (0, 0). A point is written (x, y): move x units along the x-axis first (right if positive, left if negative), then y units up or down. The midpoint of the line joining (x1, y1) and (x2, y2) is the average of the coordinates, ((x1 + x2)/2, (y1 + y2)/2). The distance between the points comes from Pythagoras: the horizontal difference and the vertical difference are the two shorter sides of a right-angled triangle, so distance = square root of ((x2 - x1)^2 + (y2 - y1)^2). To draw the graph of an equation, make a table: choose values of x, calculate y, plot the pairs and join them. A linear equation gives a straight line; an equation containing x^2 gives a smooth U-shaped curve called a parabola. The x-values where the curve crosses the x-axis are the solutions of the equation when y = 0.',
  f: 'Midpoint = ((x1 + x2)/2, (y1 + y2)/2)  |  Distance = sqrt((x2 - x1)^2 + (y2 - y1)^2)',
  vis: 'A grid with two points joined by a line and a right-angled triangle drawn beneath it',
  ctx: 'A football pitch drawn on a grid with the corner flags as coordinates; a matatu route on a town map where a stage halfway between two towns is the midpoint.',
  q: 'If you stand at the origin and walk 3 steps east and 4 steps north, how far are you from the start in a straight line?',
  exam: 'Plotting points, midpoint and distance, completing tables of values and drawing linear and quadratic graphs, and reading values and roots from the graph.',
  steps: [
    'Draw both axes with an even scale and label them, because uneven scales distort the picture.',
    'Plot each point: x first, then y.',
    'For the midpoint, add the two x-values and halve, then do the same with the y-values.',
    'For distance, find the horizontal and vertical differences, square each, add and take the square root.',
    'For a graph, build a table of x and y values, plot all points and join them with a ruler (line) or a smooth curve.',
    'Read roots where the graph meets the x-axis (y = 0).'
  ],
  ex: [
    'Problem A: A(1, 2) and B(7, 10). Midpoint = ((1 + 7)/2, (2 + 10)/2) = (4, 6).',
    'Distance AB: horizontal difference = 7 - 1 = 6, vertical difference = 10 - 2 = 8. AB = sqrt(36 + 64) = sqrt(100) = 10 units.',
    'Problem B: Table for y = 2x + 1: x = -2, -1, 0, 1, 2 gives y = -3, -1, 1, 3, 5. Plot (-2, -3), (-1, -1), (0, 1), (1, 3), (2, 5) and join with a straight line.',
    'Problem C: Table for y = x^2 - 2x - 3: x = -2 gives 4 + 4 - 3 = 5; x = -1 gives 1 + 2 - 3 = 0; x = 0 gives -3; x = 1 gives 1 - 2 - 3 = -4; x = 2 gives 4 - 4 - 3 = -3; x = 3 gives 9 - 6 - 3 = 0; x = 4 gives 16 - 8 - 3 = 5.',
    'The curve crosses the x-axis at x = -1 and x = 3, so the roots of x^2 - 2x - 3 = 0 are -1 and 3. The lowest point is (1, -4).',
    'Common mistake: writing a point as (y, x). The order is always (x, y). Another is joining the points of a quadratic with straight segments instead of a smooth curve.'
  ]
}));

S4.push(P('cbc_g9_math_s4_2', '4.2 Scale Drawing', {
  pt: 'Shrinking the Real World onto Paper and Reading It Back',
  tag: 'A scale is a ratio that applies to every length in the drawing at once',
  body: 'A scale drawing is a drawing in which every length is the real length multiplied by the same fraction. The scale is written as a ratio drawing : real, for example 1 : 50 000 means 1 cm on paper stands for 50 000 cm in real life, which is 500 m. A ratio without units, such as 1 : 50 000, is called a representative fraction. To find the real length, multiply the drawing length by the scale number. To find the drawing length, divide the real length by the scale number. Always convert to the same unit first: 100 cm = 1 m and 100 000 cm = 1 km. Angles do not change in a scale drawing, only lengths do. Areas change by the square of the scale: if lengths are divided by 50, areas are divided by 50^2. To make a scale drawing, choose a scale that fits the paper, convert each length, draw with a ruler and protractor, and measure the unknown length or angle.',
  f: 'Real length = drawing length x scale number  |  1 km = 100 000 cm',
  vis: 'A floor plan of a room with a scale bar beneath it',
  ctx: 'A map of the road from Nakuru to Eldoret, a house plan drawn by a builder, and a school compound plan where one centimetre stands for 10 metres.',
  q: 'If 1 cm on a map stands for 5 km, what does 3 cm stand for, and what does 2 mm stand for?',
  exam: 'Converting between map and real distances, writing a scale as a ratio, drawing triangles and plans to scale and finding unknown lengths by measuring.',
  steps: [
    'Write the scale as drawing : real and make sure both sides use the same unit, because the ratio only works with matching units.',
    'To find a real length, multiply the measured drawing length by the scale number.',
    'To draw a length, divide the real length by the scale number.',
    'Construct the figure with a ruler and protractor, because accurate measuring gives accurate answers.',
    'Measure the unknown length, then convert it back to real life with the scale.'
  ],
  ex: [
    'Problem A: Scale 1 : 50 000. Two towns are 6 cm apart on the map. Real distance = 6 x 50 000 = 300 000 cm = 3 000 m = 3 km.',
    'Problem B: A room is 6 m by 4.5 m. Draw it at 1 : 50. 6 m = 600 cm, 600 / 50 = 12 cm. 4.5 m = 450 cm, 450 / 50 = 9 cm. The plan is 12 cm by 9 cm.',
    'Problem C: A map shows 2 cm for 5 km. 5 km = 500 000 cm. Scale = 2 : 500 000 = 1 : 250 000.',
    'Problem D: A right-angled field has sides 30 m and 40 m. At 1 : 1 000, the sides are 3 cm and 4 cm (30 m = 3 000 cm, 3 000 / 1 000 = 3). Drawing and measuring the hypotenuse gives 5 cm, so the real length is 5 x 1 000 = 5 000 cm = 50 m.',
    'Common mistake: forgetting to convert units, such as multiplying 6 cm by 50 000 and calling the result 300 000 km. Always say the unit, then convert to km. Another is applying the length scale to area instead of its square.'
  ]
}));

S4.push(P('cbc_g9_math_s4_3', '4.3 Similarity and Enlargement', {
  pt: 'Same Shape, Different Size',
  tag: 'Similar shapes have equal angles and sides in the same ratio; lengths scale by k, areas by k squared, volumes by k cubed',
  body: 'Two figures are similar if they have the same shape but not necessarily the same size: all matching angles are equal and all matching sides are in the same ratio. That ratio is the scale factor k. An enlargement is a transformation that produces a similar figure. It is defined by a centre and a scale factor k. Every point moves along a line through the centre so that its distance from the centre is multiplied by k. If k is greater than 1 the shape grows; if k is between 0 and 1 it shrinks. Lengths are multiplied by k, so areas are multiplied by k^2 and volumes by k^3. To enlarge from a centre, multiply the position vector of each point (relative to the centre) by k. Similar triangles are used to find unknown heights and distances indirectly.',
  f: 'k = image length / object length  |  Area ratio = k^2  |  Volume ratio = k^3',
  vis: 'A small triangle and a larger similar triangle with rays from the centre through matching corners',
  ctx: 'A photo at the studio enlarged to a poster; a tree and a stick casting shadows at the same time; a model house built to scale.',
  q: 'If every side of a square doubles, what happens to the number of small squares needed to cover it?',
  exam: 'Finding scale factors and missing sides of similar figures, using shadows to find heights, area and volume ratios, and drawing an enlargement with given centre and scale factor.',
  steps: [
    'Match corresponding sides and angles, because only matching parts are in the same ratio.',
    'Find k by dividing a side of the image by the matching side of the object.',
    'Multiply or divide other sides by k to find missing lengths.',
    'For area use k^2 and for volume k^3, because area has two dimensions and volume has three.',
    'To draw an enlargement, take each point vector from the centre, multiply it by k and plot the new point.'
  ],
  ex: [
    'Problem A: A photo 6 cm by 4 cm is enlarged by k = 2.5. New size = 15 cm by 10 cm. Old area = 24 cm^2, new area = 150 cm^2 = 24 x 2.5^2 = 24 x 6.25.',
    'Problem B: Triangle PQR has sides 3, 4, 5 and a similar triangle has shortest side 9. k = 9/3 = 3, so the other sides are 12 and 15.',
    'Problem C: At the same time a 1.5 m stick casts a 2 m shadow and a tree casts a 12 m shadow. The triangles are similar, so tree height / 12 = 1.5 / 2. Tree height = 12 x 1.5 / 2 = 9 m.',
    'Problem D: A cube of side 2 cm is enlarged to side 4 cm. k = 2, volumes 8 cm^3 and 64 cm^3: ratio 8 = 2^3.',
    'Problem E: Enlarge A(1, 2) from the origin with k = 3. Image = (3, 6). Enlarge B(3, 2) from the centre (1, 1) with k = 2: vector from centre = (2, 1), times 2 = (4, 2), so image = (1 + 4, 1 + 2) = (5, 3).',
    'Common mistake: doubling the area when the sides double. The area is multiplied by 2^2 = 4. Another is measuring the distance from the object instead of from the centre.'
  ]
}));

S4.push(P('cbc_g9_math_s2_1', '4.4 Trigonometry', {
  pt: 'Sine, Cosine and Tangent: Finding Sides and Angles in Right-Angled Triangles',
  tag: 'For a given angle the ratio of two sides never changes, whatever the size of the triangle',
  body: 'In a right-angled triangle, the longest side opposite the right angle is the hypotenuse. For a chosen acute angle theta, the opposite side faces theta and the adjacent side touches theta (and is not the hypotenuse). All right-angled triangles with the same theta are similar, so their side ratios are fixed. These ratios are sine, cosine and tangent: sin theta = opposite / hypotenuse, cos theta = adjacent / hypotenuse, tan theta = opposite / adjacent. A memory aid is SOH CAH TOA. A calculator in degree mode gives the ratio for an angle, and the inverse keys (sin^-1, cos^-1, tan^-1) give the angle from a ratio. An angle of elevation is measured upward from the horizontal to the line of sight; an angle of depression is measured downward from the horizontal. Both are equal to the angle inside the triangle between the horizontal and the sight line.',
  f: 'sin(theta) = O/H  |  cos(theta) = A/H  |  tan(theta) = O/A',
  vis: 'A right-angled triangle with the angle, opposite, adjacent and hypotenuse labelled and a person looking up at a mast',
  ctx: 'Finding the height of a telecommunication mast in Nairobi from the ground without climbing it, the length of a ladder leaning on a wall, and the slope of a ramp.',
  q: 'You stand 40 m from a mast and measure the angle to its top. Which two sides are involved, and which of sine, cosine or tangent connects them?',
  exam: 'Finding a side or an angle in a right-angled triangle, and angle of elevation and depression problems with a diagram.',
  steps: [
    'Draw the right-angled triangle and mark the angle, then label sides O, A and H relative to that angle, because the labels change with the angle.',
    'Decide which two sides are involved (one known, one unknown or both known) and pick the matching ratio from SOH CAH TOA.',
    'Write the equation, for example tan(35) = O / 40.',
    'Rearrange to isolate the unknown: multiply to find a side on top, divide to find a side underneath, use the inverse function to find an angle.',
    'Use a calculator in degree mode, round sensibly and state the units.',
    'Check that the hypotenuse is the longest side.'
  ],
  ex: [
    'Problem A: From 40 m from the foot of a mast, the angle of elevation of its top is 35 degrees. tan(35) = height / 40, so height = 40 x tan(35) = 40 x 0.7002 = 28.0 m.',
    'Problem B: A ladder 5 m long makes 60 degrees with the ground. The wall height is opposite the angle: sin(60) = h / 5, so h = 5 x 0.8660 = 4.33 m. The foot is adjacent: cos(60) = d / 5, so d = 2.5 m.',
    'Problem C: A triangle has opposite 7 cm and adjacent 24 cm. tan(theta) = 7 / 24 = 0.2917, theta = tan^-1(0.2917) = 16.3 degrees (1 d.p.). The hypotenuse is sqrt(49 + 576) = 25 cm.',
    'Problem D: Adjacent side 8 m, angle 40 degrees. cos(40) = 8 / H, so H = 8 / cos(40) = 8 / 0.7660 = 10.44 m.',
    'Common mistake: using tan when the hypotenuse is involved, or labelling opposite and adjacent from the wrong angle. Another is leaving the calculator in radian mode, which gives wrong values.'
  ]
}));

S5.push(P('cbc_g9_math_s5_1', '5.1 Data Interpretation (Grouped Data)', {
  pt: 'Summarising Large Sets of Numbers in Class Intervals',
  tag: 'When there are too many values to list, group them in classes and estimate the mean, median and mode from the table',
  body: 'Grouped data puts many values into class intervals, such as 10 - 19 or 20 - 29, with a frequency (the number of values in each class). Because the exact values are hidden, we use the class midpoint, the value halfway through the class, as its representative. The mean is estimated as the sum of (frequency x midpoint) divided by the total frequency. The modal class is the class with the highest frequency. The median class is the class containing the middle value; we find it from the cumulative frequency, the running total of frequencies. For whole-number data written as 10 - 19, the true class boundaries are 9.5 and 19.5, because any value from 9.5 up to 19.5 would round into the class. Median estimate = L + ((N/2 - C) / f) x w, where L is the lower boundary of the median class, N the total frequency, C the cumulative frequency before the class, f its frequency and w the class width.',
  f: 'Mean = sum(f x midpoint) / sum(f)  |  Median = L + ((N/2 - C)/f) x w',
  vis: 'A frequency table with columns for class, frequency, midpoint, f x midpoint and cumulative frequency',
  ctx: 'A teacher in Machakos records the marks of 30 learners in a test. A matatu stage manager records the daily number of passengers over a month.',
  q: 'If you only know that 6 learners scored between 20 and 29, what single mark would you use to stand for all six, and why?',
  exam: 'Completing a frequency table, finding the class midpoints, estimating the mean, finding the modal and median classes, and reading cumulative frequency.',
  steps: [
    'Write the classes and frequencies, and add the total frequency N.',
    'Find each class midpoint: (lowest + highest value) / 2, because the midpoint represents the whole class.',
    'Multiply frequency by midpoint for each class and add the column.',
    'Divide that total by N to estimate the mean.',
    'Make a cumulative frequency column and find which class holds the N/2 position to identify the median class.',
    'The modal class is the class with the greatest frequency.'
  ],
  ex: [
    'Problem: Marks of 30 learners: 10-19 (4), 20-29 (6), 30-39 (10), 40-49 (5), 50-59 (5). N = 4 + 6 + 10 + 5 + 5 = 30.',
    'Midpoints: 14.5, 24.5, 34.5, 44.5, 54.5.',
    'f x midpoint: 4 x 14.5 = 58; 6 x 24.5 = 147; 10 x 34.5 = 345; 5 x 44.5 = 222.5; 5 x 54.5 = 272.5. Sum = 1 045.',
    'Mean = 1 045 / 30 = 34.83 marks (2 d.p.).',
    'Cumulative frequencies: 4, 10, 20, 25, 30. N/2 = 15, which lies in the class 30-39 (cumulative frequency passes 15 there). Modal class = 30-39 (highest frequency, 10).',
    'Median estimate: L = 29.5, C = 10, f = 10, w = 10. Median = 29.5 + ((15 - 10)/10) x 10 = 29.5 + 5 = 34.5.',
    'Common mistake: dividing by the number of classes (5) instead of the total frequency (30). Another is using the class limit instead of the midpoint.'
  ]
}));

S5.push(P('cbc_g9_math_s5_2', '5.2 Probability', {
  pt: 'Measuring How Likely Something Is, from 0 to 1',
  tag: 'Probability is favourable outcomes over all equally likely outcomes; multiply for "and then", add for "or"',
  body: 'An experiment is an action with uncertain results, and each possible result is an outcome. The sample space S is the list of all outcomes. An event E is the set of outcomes we want. If all outcomes are equally likely, the probability of E is P(E) = n(E) / n(S). Probability is always between 0 (impossible) and 1 (certain). The probability that E does not happen is 1 - P(E). Two events are mutually exclusive if they cannot both happen, so P(A or B) = P(A) + P(B). Two events are independent if one does not change the other, so P(A and then B) = P(A) x P(B). When items are taken without replacement, the second probability changes because there are fewer items left. A tree diagram shows the branches of each stage with their probabilities; multiply along a path and add paths that give the wanted event.',
  f: 'P(E) = n(E) / n(S)  |  P(not E) = 1 - P(E)  |  independent: P(A and B) = P(A) x P(B)',
  vis: 'A tree diagram with two stages of branches labelled with fractions',
  ctx: 'A raffle draw at a school fair, drawing a sweet from a bag, throwing two dice in a board game, and the chance a football team wins the next match.',
  q: 'A bag has 5 red, 3 blue and 2 green balls. Before calculating, which colour is most likely, and how could you check?',
  exam: 'Probability of single events, complement, two events with and without replacement using a tree diagram or table, and independent and mutually exclusive events.',
  steps: [
    'List or count the sample space, making sure every outcome is equally likely.',
    'Count the outcomes in the event, then write the fraction favourable over total.',
    'For the complement, subtract from 1, because the event either happens or does not.',
    'For two stages, multiply along the branch; for "or" between different branches, add.',
    'If items are not replaced, reduce both the numerator (if the same type) and the denominator for the second stage.',
    'Check that the answer lies between 0 and 1 and simplify.'
  ],
  ex: [
    'Problem: A bag has 5 red, 3 blue and 2 green balls, 10 in all.',
    'P(red) = 5/10 = 1/2. P(not blue) = 1 - 3/10 = 7/10.',
    'With replacement, P(red then blue) = 5/10 x 3/10 = 15/100 = 3/20.',
    'Without replacement, P(red then blue) = 5/10 x 3/9 = 15/90 = 1/6, because after taking a red ball 9 remain, still 3 blue.',
    'Two fair dice: 36 equally likely outcomes. A total of 7 comes from (1,6), (2,5), (3,4), (4,3), (5,2), (6,1), which is 6 outcomes. P(7) = 6/36 = 1/6.',
    'Common mistake: adding when the events happen one after the other (it should be multiplying), and forgetting that without replacement the denominator drops. Another is giving a probability greater than 1.'
  ]
}));

const MAP = {
  curriculum: 'CBC',
  grade: 9,
  subject: 'Mathematics',
  code: 'MATH-G9',
  trackPathway: 'Core',
  title: 'CBE Grade 9 (Junior School Capstone) Mathematics Metro Line',
  description: 'Grade 9 Mathematics with five strands and nineteen sub-strands, following the KICD Mathematics Grade 9 design.',
  notes: 'Strand and sub-strand names follow the KICD Grade 9 Mathematics design.',
  stations: [
    { id: 'cbc_g9_math_s1', number: 1, title: '1.0 Numbers', strand: 'Strand 1: Numbers', status: 'available', summary: 'Integers, cubes and cube roots, indices and logarithms, compound proportions and rates of work.', subtopics: S1 },
    { id: 'cbc_g9_math_s2', number: 2, title: '2.0 Algebra', strand: 'Strand 2: Algebra', status: 'available', summary: 'Matrices, the equation of a straight line and linear inequalities.', subtopics: S2 },
    { id: 'cbc_g9_math_s3', number: 3, title: '3.0 Measurements', strand: 'Strand 3: Measurements', status: 'available', summary: 'Area, volume, density, speed, money, approximations and errors.', subtopics: S3 },
    { id: 'cbc_g9_math_s4', number: 4, title: '4.0 Geometry', strand: 'Strand 4: Geometry', status: 'available', summary: 'Coordinates and graphs, scale drawing, similarity and enlargement, trigonometry.', subtopics: S4 },
    { id: 'cbc_g9_math_s5', number: 5, title: '5.0 Data Handling and Probability', strand: 'Strand 5: Data Handling and Probability', status: 'available', summary: 'Grouped data and probability.', subtopics: S5 }
  ]
};

module.exports = { maps: [MAP], retiredIds: [] };
