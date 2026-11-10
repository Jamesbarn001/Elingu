'use strict';
// CBC SENIOR SCHOOL ESSENTIAL MATHEMATICS, GRADE 11
// Three strands and eleven sub-strands, following the KICD Essential Mathematics
// Grade 11 design (see docs/audits/kicd_verified_from_site.md). Plain text only.

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

const S1 = [], S2 = [], S3 = [];

S1.push(P('cbc_g11_ess_s1_1', '1.1 Quadratic Equations', {
  pt: 'Turning a Land or Money Problem into a Quadratic Equation and Solving It',
  tag: 'Write the unknown, build the equation from the facts, then find the two values that make it true',
  body: 'A quadratic equation is an equation in which the highest power of the unknown is 2, so it can be written as ax^2 + bx + c = 0 with a not equal to 0. A root (or solution) is a value of the unknown that makes the equation true. Quadratics appear whenever two lengths are multiplied to make an area, because length times width gives a product of two quantities that both contain the unknown. A product can only be zero if at least one factor is zero, so if (x + p)(x + q) = 0 then x = -p or x = -q. This is why factorising works: we rewrite the equation as a product equal to zero and read off the roots. When factorising is hard, the formula x = (-b +/- sqrt(b^2 - 4ac)) / (2a) gives the roots directly. In an applied problem, always reject a root that makes no sense, such as a negative length.',
  f: 'ax^2 + bx + c = 0  |  x = (-b +/- sqrt(b^2 - 4ac)) / (2a)',
  vis: 'A rectangle labelled w by w + 3 with the area written inside',
  ctx: 'A farmer in Nakuru has a rectangular maize plot of 40 square metres. The length is 3 m more than the width and she must know the sides to buy fencing wire.',
  q: 'If the width of a plot is w metres and the length is 3 metres longer, how would you write the area, and what must the area equal?',
  exam: 'Forming a quadratic from a word problem about area or consecutive numbers, solving by factorising or the formula, and rejecting the root that has no meaning.',
  steps: [
    'Let the unknown be a letter with units, for example width = w metres, because an equation needs a clear symbol to describe the situation.',
    'Write the other quantities in terms of w, for example length = w + 3, because the facts of the problem connect them.',
    'Form the equation from the given relationship, area = length x width, so w(w + 3) = 40, because the problem states what the area must equal.',
    'Expand and move everything to one side so that the other side is zero: w^2 + 3w - 40 = 0, because only a product equal to zero lets us split into separate factors.',
    'Factorise: find two numbers that multiply to -40 and add to +3, which are 8 and -5, so (w + 8)(w - 5) = 0, because the numbers must give the middle term and the constant.',
    'Set each factor to zero and solve, because a product is zero only when one factor is zero.',
    'Reject any root that does not fit the situation and check the remaining one in the original statement, because a width cannot be negative.'
  ],
  ex: [
    'Problem: The length of a rectangular plot is 3 m more than its width. Its area is 40 m^2. Find its dimensions and the length of fencing wire needed for one round of the boundary.',
    'Let width = w m, then length = (w + 3) m.',
    'Area: w(w + 3) = 40, so w^2 + 3w = 40 and w^2 + 3w - 40 = 0.',
    'Factorise: (w + 8)(w - 5) = 0, since 8 x (-5) = -40 and 8 + (-5) = 3.',
    'So w = -8 or w = 5. A width cannot be negative, so w = 5 m.',
    'Length = 5 + 3 = 8 m. Check: 5 x 8 = 40 m^2.',
    'Perimeter = 2(5 + 8) = 26 m of wire for one round.',
    'Common mistake: giving both roots as answers, or writing w(w + 3) = 0 instead of 40 and then wrongly concluding w = 40 or w = 37. A quadratic must equal zero before you split into factors.'
  ]
}));

S1.push(P('cbc_g11_ess_s1_2', '1.2 Matrices', {
  pt: 'Organising Sales in a Matrix, Multiplying, and Using the Inverse',
  tag: 'A matrix is a table of numbers that can be multiplied to combine quantities and prices in one step',
  body: 'A matrix is a rectangular arrangement of numbers in rows and columns. Its order is rows x columns, so a matrix with 2 rows and 2 columns has order 2 x 2. To multiply two matrices, the number of columns of the first must equal the number of rows of the second. Each entry of the answer is found by multiplying a row of the first matrix by a column of the second, entry by entry, and adding. This is exactly how you find total takings: quantity times price, added up. For a 2 x 2 matrix A = [[a, b], [c, d]], the determinant is ad - bc. If the determinant is not zero, the inverse is (1 / det) x [[d, -b], [-c, a]]. Multiplying A by its inverse gives the identity matrix, which leaves any matrix unchanged, so the inverse can undo A and solve simultaneous equations.',
  f: 'det A = ad - bc  |  A^-1 = (1 / (ad - bc)) [[d, -b], [-c, a]]',
  vis: 'A quantity table on the left, a price column in the middle, and a total column on the right',
  ctx: 'Mama Mboga sells bunches of sukuma wiki and kilograms of tomatoes. On two days she records how many she sold and the money she collected, but she forgot the unit prices.',
  q: 'If she sold 3 bunches of sukuma and 2 kg of tomatoes, and the prices were KES 20 and KES 80, how would you find her takings without drawing a table?',
  exam: 'Multiplying a 2 x 2 matrix by a column matrix, finding the determinant and inverse, and using the inverse to solve a pair of simultaneous equations from a word problem.',
  steps: [
    'Write the quantities in a matrix with one row per day and one column per item, because each row then lines up with the prices column.',
    'Check the orders: a 2 x 2 matrix times a 2 x 1 column is allowed, because the columns of the first (2) equal the rows of the second (2).',
    'Multiply row by column: first row x price column = (sukuma x price) + (tomatoes x price), because that is total money for that day.',
    'To find unknown prices, write A p = t, where A is the quantity matrix, p the unknown price column and t the takings column, because that is the matrix form of the two equations.',
    'Find the determinant ad - bc and confirm it is not zero, because a zero determinant means no inverse exists.',
    'Form the inverse by swapping a and d, changing the signs of b and c, and dividing by the determinant, because this gives the matrix that undoes A.',
    'Multiply both sides by the inverse: p = A^-1 t, because A^-1 A is the identity and leaves p alone.'
  ],
  ex: [
    'Problem: On Monday Mama Mboga sold 3 bunches of sukuma and 2 kg of tomatoes and collected KES 220. On Tuesday she sold 4 bunches and 5 kg and collected KES 480. Find the price of a bunch and of a kilogram.',
    'Let price of a bunch = x and price of a kg = y (KES). Equations: 3x + 2y = 220 and 4x + 5y = 480.',
    'Matrix form: [[3, 2], [4, 5]] [x, y] = [220, 480].',
    'Determinant: 3 x 5 - 2 x 4 = 15 - 8 = 7.',
    'Inverse: (1/7) [[5, -2], [-4, 3]].',
    'x = (1/7)(5 x 220 + (-2) x 480) = (1100 - 960)/7 = 140/7 = 20.',
    'y = (1/7)((-4) x 220 + 3 x 480) = (-880 + 1440)/7 = 560/7 = 80.',
    'Answer: a bunch of sukuma is KES 20 and a kilogram of tomatoes is KES 80. Check Monday: 3(20) + 2(80) = 60 + 160 = 220.',
    'Common mistake: multiplying A by the takings on the wrong side, writing t A^-1 instead of A^-1 t. Matrix multiplication is not commutative, so the inverse must stand on the left.'
  ]
}));

S1.push(P('cbc_g11_ess_s1_3', '1.3 Variations', {
  pt: 'Direct, Inverse and Joint Variation',
  tag: 'Find the constant once from one case, then use it for every other case',
  body: 'Variation describes how one quantity changes when others change. In direct variation, y varies directly as x, written y = kx: when x doubles, y doubles. In inverse variation, y varies inversely as x, written y = k/x: when x doubles, y halves, because their product stays fixed. In joint variation, y varies as the product of two quantities, written y = kxz. The letter k is the constant of proportionality, a fixed number for that situation. Because k does not change, you can find it once from a single complete set of values and then use it to find any other value. Always check that your answer moves in the sensible direction: more workers should mean fewer days, not more.',
  f: 'Direct: y = kx  |  Inverse: y = k/x  |  Joint: y = kxz',
  vis: 'Two small graphs side by side, a straight line through the origin and a falling curve',
  ctx: 'A builder in Kisumu prices mabati roofing sheets by the number of sheets and their length, and decides how many workers to hire to finish a roof on time.',
  q: 'If 12 workers finish a roof in 10 days, would 8 workers take more or fewer days, and what stays the same in both cases?',
  exam: 'Writing the variation equation, finding k from given values, using it to find an unknown, and recognising whether the situation is direct, inverse or joint.',
  steps: [
    'Decide the type of variation by asking what happens to one quantity when the other grows, because that tells you whether to write y = kx or y = k/x.',
    'Write the equation with k, for example C = knl for a cost that depends on the number n and the length l, because k represents the unchanging price rate.',
    'Substitute the given complete set of values and solve for k, because one known case fixes the constant.',
    'Write the equation again with the numerical k, because this is the rule for the whole situation.',
    'Substitute the new values and calculate the unknown, because the same rule governs the new case.',
    'State the answer with units and check the direction is sensible, because a wrong type of variation gives answers that go the wrong way.'
  ],
  ex: [
    'Problem: The cost C of mabati sheets varies jointly as the number of sheets n and the length l of each sheet in metres. 8 sheets of length 3 m cost KES 9 600. Find the cost of 15 sheets of length 2.5 m.',
    'Equation: C = knl.',
    'Find k: 9 600 = k x 8 x 3 = 24k, so k = 9 600 / 24 = 400.',
    'Rule: C = 400nl.',
    'New case: C = 400 x 15 x 2.5 = 400 x 37.5 = 15 000.',
    'Answer: KES 15 000.',
    'Inverse example: 12 workers take 10 days, so workers x days = 120 is fixed. With 8 workers: days = 120 / 8 = 15 days. Fewer workers means more days, as expected.',
    'Common mistake: using direct variation for workers and days, which would give 6.7 days and wrongly claim fewer workers finish faster.'
  ]
}));

S1.push(P('cbc_g11_ess_s1_4', '1.4 Sequence and Series', {
  pt: 'Arithmetic and Geometric Sequences and Their Sums',
  tag: 'A sequence adds or multiplies by a fixed number each step, and a series is the total of its terms',
  body: 'A sequence is a list of numbers in a definite order, and each number is a term. A series is the sum of the terms. In an arithmetic progression (AP), each term is found by adding a fixed number d, the common difference, so the nth term is a + (n - 1)d, where a is the first term. In a geometric progression (GP), each term is found by multiplying by a fixed number r, the common ratio, so the nth term is ar^(n - 1). The sum of the first n terms of an AP is (n/2)(2a + (n - 1)d), which comes from pairing the first and last terms, which always add to the same total. The sum of a GP is a(r^n - 1)/(r - 1) when r is not 1.',
  f: 'AP: Tn = a + (n - 1)d, Sn = (n/2)(2a + (n - 1)d)  |  GP: Tn = ar^(n-1), Sn = a(r^n - 1)/(r - 1)',
  vis: 'Bars of equal step height for an AP beside bars that double for a GP',
  ctx: 'A SACCO member saves KES 500 in January and raises the monthly amount by KES 100 each month, while a chama doubles the contribution each round.',
  q: 'If you save 500 in month 1 and 600 in month 2, how much will you save in month 12, and how can you get it without writing all the terms?',
  exam: 'Identifying an AP or GP from the first terms, finding the nth term, and finding the sum of n terms in a savings or growth problem.',
  steps: [
    'Subtract consecutive terms; if the difference is always the same it is an AP, and if the ratio of consecutive terms is always the same it is a GP, because these are the defining tests.',
    'Write down a, and d or r, from the first two terms, because every formula uses them.',
    'Use Tn to find a particular term, substituting n, because the formula counts n - 1 steps from the first term.',
    'Choose the correct sum formula for the type, because AP and GP sums are built differently.',
    'Substitute carefully, calculating powers before multiplying, because order of operations matters.',
    'State the result with units and check it against a rough estimate, because the total of an increasing series must exceed n times the first term.'
  ],
  ex: [
    'Problem: (a) A member saves KES 500 in month 1, and each month saves KES 100 more than the month before. Find the amount saved in month 12 and the total saved in 12 months. (b) A chama contributes KES 100 in round 1 and doubles it every round. Find the total after 8 rounds.',
    '(a) This is an AP with a = 500, d = 100, n = 12.',
    'T12 = 500 + 11 x 100 = 500 + 1 100 = 1 600.',
    'S12 = (12/2)(2 x 500 + 11 x 100) = 6 x (1 000 + 1 100) = 6 x 2 100 = 12 600.',
    'Check by pairing: (500 + 1 600) = 2 100, and there are 6 such pairs, so 6 x 2 100 = 12 600.',
    '(b) This is a GP with a = 100, r = 2, n = 8.',
    'S8 = 100(2^8 - 1)/(2 - 1) = 100 x 255 = 25 500.',
    'Answer: (a) KES 1 600 in month 12 and KES 12 600 in total; (b) KES 25 500.',
    'Common mistake: using n instead of n - 1 for the nth term, giving T12 = 500 + 12 x 100 = 1 700, which is the 13th term.'
  ]
}));

S2.push(P('cbc_g11_ess_s2_1', '2.1 Approximations and Errors', {
  pt: 'Limits of Accuracy, Absolute Error and Percentage Error',
  tag: 'Every measurement hides a small uncertainty, and calculations can pile it up',
  body: 'Measurements are never exact. A length recorded as 12.4 m to the nearest 0.1 m could really be anything from 12.35 m up to just below 12.45 m. These are the lower limit and upper limit, found by taking half of the accuracy unit (0.05) away from and adding to the recorded value. The absolute error is the largest possible difference between the true value and the recorded one, so for a single measurement it is half the accuracy unit. The relative error is the absolute error divided by the recorded value, and multiplying by 100 gives the percentage error. When you multiply two measured values, the smallest answer comes from the two lower limits and the largest from the two upper limits, because all quantities are positive.',
  f: 'Absolute error = half the accuracy unit  |  Percentage error = (absolute error / value) x 100',
  vis: 'A number line with the recorded value in the middle and the lower and upper limits marked either side',
  ctx: 'A surveyor measures a plot in Eldoret with a tape marked to 0.1 m and the land buyer needs to know how far the calculated area could be from the true area before agreeing the price.',
  q: 'If a rod is recorded as 12.4 m to the nearest tenth of a metre, what is the shortest and the longest it could really be?',
  exam: 'Writing lower and upper limits, finding the greatest and least possible area or perimeter, and calculating the absolute and percentage error.',
  steps: [
    'Identify the accuracy unit, such as 0.1 m, because it sets how much the recorded value may differ from the truth.',
    'Take half the unit, 0.05 m, because rounding to the nearest unit allows an error of half a unit either way.',
    'Subtract it for the lower limit and add it for the upper limit, because the true value lies between them.',
    'For a product, multiply the lower limits for the least value and the upper limits for the greatest, because all lengths are positive.',
    'Absolute error of the calculation = (greatest - least) / 2, because the calculated value sits in the middle of the range.',
    'Percentage error = absolute error / calculated value x 100, because it shows how big the error is compared to the answer.'
  ],
  ex: [
    'Problem: A plot is measured as 12.4 m by 8.6 m, each to the nearest 0.1 m. Find the least and greatest possible area, and the percentage error in the calculated area.',
    'Length limits: 12.4 - 0.05 = 12.35 and 12.4 + 0.05 = 12.45. Width limits: 8.6 - 0.05 = 8.55 and 8.6 + 0.05 = 8.65.',
    'Calculated area = 12.4 x 8.6 = 106.64 m^2.',
    'Least area = 12.35 x 8.55 = 105.5925 m^2.',
    'Greatest area = 12.45 x 8.65 = 107.6925 m^2.',
    'Absolute error = (107.6925 - 105.5925) / 2 = 2.1 / 2 = 1.05 m^2.',
    'Percentage error = 1.05 / 106.64 x 100 = 0.98% (2 decimal places: 0.98).',
    'Common mistake: using 0.1 instead of 0.05 for the limits, which doubles the width of the error range.'
  ]
}));

S2.push(P('cbc_g11_ess_s2_2', '2.2 Distance, Time and Speed', {
  pt: 'Average Speed and Relative Speed',
  tag: 'Average speed is total distance divided by total time, never the average of the speeds',
  body: 'Speed is the distance covered in one unit of time, so speed = distance / time, and from this distance = speed x time and time = distance / speed. Units must match: kilometres with hours gives km/h, and metres with seconds gives m/s. Average speed is the total distance divided by the total time taken, including any part where the vehicle was slower. It is not the mean of the two speeds, because the vehicle spends more time at the slower speed. When two bodies move towards each other, their gaps close at the sum of their speeds, called the relative speed. When they move the same way, the gap changes at the difference of their speeds.',
  f: 'Speed = distance / time  |  Average speed = total distance / total time',
  vis: 'A journey line split into two sections, each labelled with its distance and speed',
  ctx: 'A matatu from Nairobi to Nakuru drives slowly through Kikuyu and faster on the highway, and the owner wants to know the average speed for the whole trip to plan fuel.',
  q: 'If a matatu does 60 km at 60 km/h and 120 km at 90 km/h, why is its average speed not 75 km/h?',
  exam: 'Calculating times for each part of a journey, finding average speed, and using relative speed for vehicles meeting or overtaking.',
  steps: [
    'Split the journey into parts where the speed is constant, because the formula applies to each part separately.',
    'Find the time for each part using time = distance / speed, because average speed needs the total time.',
    'Add the distances and add the times, because average speed uses totals.',
    'Divide the total distance by the total time, because that is the definition of average speed.',
    'For two vehicles moving towards each other, add the speeds and divide the gap by it to find the meeting time, because the distance between them closes at the combined speed.',
    'Check the units and the size of the answer, because average speed must lie between the lowest and highest speeds.'
  ],
  ex: [
    'Problem: (a) A matatu travels 60 km at 60 km/h, then 120 km at 90 km/h. Find its average speed. (b) Two buses leave towns 450 km apart at the same time and drive towards each other at 80 km/h and 70 km/h. When do they meet?',
    '(a) Time for part 1 = 60 / 60 = 1 hour.',
    'Time for part 2 = 120 / 90 = 1.333 hours (1 hour 20 minutes).',
    'Total distance = 60 + 120 = 180 km. Total time = 1 + 1.333 = 2.333 hours.',
    'Average speed = 180 / 2.333 = 77.14 km/h (2 decimal places). It lies between 60 and 90, as it should, and it is more than the simple mean of 75 because the matatu spends fewer hours at the slower speed.',
    '(b) Relative speed = 80 + 70 = 150 km/h.',
    'Time to meet = 450 / 150 = 3 hours.',
    'Distance covered by the first bus = 80 x 3 = 240 km. Check: 70 x 3 = 210 and 240 + 210 = 450 km.',
    'Common mistake: finding average speed as (60 + 90) / 2 = 75 km/h, which ignores the fact that less time is spent at the faster speed.'
  ]
}));

S2.push(P('cbc_g11_ess_s2_3', '2.3 Commercial Arithmetic II', {
  pt: 'Compound Interest, Depreciation and Hire Purchase',
  tag: 'Interest earns interest, depreciation shrinks value by a percentage each year, and hire purchase costs more than cash',
  body: 'Compound interest is interest that is added to the principal each period, so the next interest is earned on the new, larger amount. If the principal P earns a rate r percent per period for n periods, the amount is A = P(1 + r/100)^n. The interest is A - P. When the rate is given per year but interest is added every quarter, divide the rate by 4 and multiply the years by 4. Depreciation is the loss in value of an item, such as a motorbike, and with a yearly percentage rate it is a compound change with the multiplier (1 - r/100). Hire purchase lets a buyer pay a deposit now and fixed instalments later; the hire purchase price is the deposit plus all the instalments, and it is usually higher than the cash price because the seller charges for waiting.',
  f: 'A = P(1 + r/100)^n  |  Depreciated value = P(1 - r/100)^n  |  Hire purchase price = deposit + (instalment x number)',
  vis: 'A growing bar chart of yearly amounts beside a shrinking bar chart of yearly values',
  ctx: 'A teacher in Machakos puts KES 150 000 in a SACCO fixed deposit that pays interest quarterly, and she is also paying for a motorbike that loses value each year.',
  q: 'If KES 1 000 earns 10% in the first year, how much will earn interest in the second year, and why is it more than 1 000?',
  exam: 'Calculating the amount and interest under compound interest with different compounding periods, depreciation, and comparing cash and hire purchase prices.',
  steps: [
    'Identify P, the yearly rate and how often interest is added, because the number of periods depends on that.',
    'Adjust the rate to the period: 12% per year added every quarter is 12 / 4 = 3% per quarter, because the rate must match the compounding period.',
    'Count the periods: 2 years of quarters is 2 x 4 = 8, because the exponent counts each time interest is added.',
    'Find the growth multiplier 1 + r/100 (or 1 - r/100 for depreciation), because it turns one period of change into a single multiplication.',
    'Raise the multiplier to the power of the number of periods and multiply by P, because each period multiplies again.',
    'For hire purchase, add the deposit to all instalments and subtract the cash price, because the difference is the extra cost of paying later.'
  ],
  ex: [
    'Problem: (a) A teacher invests KES 150 000 at 12% per year, with interest added every quarter. Find the amount and the interest after 2 years. (b) A motorbike costing KES 180 000 depreciates by 15% each year. Find its value after 3 years. (c) A cash price of KES 60 000 may be paid by a deposit of KES 12 000 and 12 monthly instalments of KES 5 000. Find the extra cost.',
    '(a) Quarterly rate = 12 / 4 = 3%. Periods = 2 x 4 = 8.',
    'A = 150 000 x 1.03^8 = 150 000 x 1.26677 = KES 190 015.51.',
    'Interest = 190 015.51 - 150 000 = KES 40 015.51.',
    '(b) Multiplier = 1 - 0.15 = 0.85. Value = 180 000 x 0.85^3 = 180 000 x 0.614125 = KES 110 542.50.',
    '(c) Hire purchase price = 12 000 + 12 x 5 000 = 12 000 + 60 000 = KES 72 000.',
    'Extra cost = 72 000 - 60 000 = KES 12 000, which is 12 000 / 60 000 x 100 = 20% of the cash price.',
    'Common mistake: using 12% for each quarter, or using 2 periods instead of 8. Always convert the rate and the time to the same period.'
  ]
}));

S2.push(P('cbc_g11_ess_s2_4', '2.4 Rotation', {
  pt: 'Rotating a Shape About a Centre',
  tag: 'A rotation turns every point through the same angle about a fixed centre and keeps the shape and size',
  body: 'A rotation is a transformation that turns a figure through a given angle about a fixed point called the centre of rotation. Anticlockwise turns are positive and clockwise turns are negative. Every point stays the same distance from the centre, so lengths and angles do not change, and the image is congruent to the object. To find a rotation, you need three things: the centre, the angle and the direction. About the origin, a 90 degree anticlockwise turn sends (x, y) to (-y, x) and a 180 degree turn sends (x, y) to (-x, -y). About another centre (a, b), first measure each point relative to the centre by subtracting (a, b), apply the turn, then add (a, b) back. Because the point has moved around a circle, the centre lies on the perpendicular bisector of the line joining any point to its image.',
  f: 'About the origin, 90 degrees anticlockwise: (x, y) goes to (-y, x)  |  180 degrees: (x, y) goes to (-x, -y)',
  vis: 'A triangle on a grid with arcs showing each vertex swinging around the centre',
  ctx: 'A signboard on a roadside near Thika is turned by a quarter turn about its fixing pole so that it faces the matatu stage, and every corner of the board moves along a circle around the pole.',
  q: 'If you turn a door a quarter turn about its hinge, which point of the door does not move, and how far from the hinge does the handle stay?',
  exam: 'Finding the image of a point or triangle under a rotation about the origin or another centre, and describing a rotation given the object and image.',
  steps: [
    'Mark the centre and write the angle and direction, because all three are needed to define the turn.',
    'For each vertex, subtract the centre from its coordinates to get its position relative to the centre, because the turn rule is simplest about the origin.',
    'Apply the rule for the angle: 90 degrees anticlockwise sends (u, v) to (-v, u), because it swings the point a quarter of a circle.',
    'Add the centre back to the result, because that moves the point from relative coordinates to the grid.',
    'Join the image points in the same order as the object, because that keeps the shape the same way round.',
    'Check that each image point is the same distance from the centre as its object point, because rotation preserves distance from the centre.'
  ],
  ex: [
    'Problem: Triangle ABC has A(2, 1), B(5, 1), C(5, 3). Find the image under a rotation of 90 degrees anticlockwise about the centre P(1, 0).',
    'Subtract the centre (1, 0): A gives (1, 1), B gives (4, 1), C gives (4, 3).',
    'Apply (u, v) to (-v, u): A gives (-1, 1), B gives (-1, 4), C gives (-3, 4).',
    'Add the centre back (1, 0): A\' = (0, 1), B\' = (0, 4), C\' = (-2, 4).',
    'Check distances: PA^2 = 1 + 1 = 2 and PA\'^2 = (0 - 1)^2 + 1^2 = 2. PB^2 = 16 + 1 = 17 and PB\'^2 = 1 + 16 = 17. Check side AB = 3 and A\'B\' = 3.',
    'Answer: A\'(0, 1), B\'(0, 4), C\'(-2, 4).',
    'Common mistake: forgetting to add the centre back, or turning clockwise when the question says anticlockwise.'
  ]
}));

S2.push(P('cbc_g11_ess_s2_5', '2.5 Scale Drawing', {
  pt: 'Reading and Making Scale Drawings and Maps',
  tag: 'A scale shrinks every length by the same factor, but areas shrink by the square of that factor',
  body: 'A scale drawing is a smaller picture of a real object in which every length is reduced by the same ratio. A scale of 1 : 500 means 1 cm on the drawing represents 500 cm, which is 5 m, in real life. To convert a drawing length to a real length, multiply by the scale number; to convert a real length to a drawing length, divide by it. Keep the units the same before comparing, and change to convenient units at the end. Because area is length multiplied by length, the area scale is the square of the length scale. So with a scale of 1 : 500, 1 cm^2 on the drawing represents 500 x 500 = 250 000 cm^2 in reality. Angles are never changed by scaling, which is why a scale drawing can be used to find bearings.',
  f: 'Real length = drawing length x scale number  |  Area scale = (length scale)^2',
  vis: 'A rectangle drawn on squared paper with its diagonal measured and labelled',
  ctx: 'A land surveyor in Kajiado draws a 40 m by 25 m plot at a scale of 1 : 500 so that buyers can see the layout and the distance between the corners on one page.',
  q: 'If 1 cm on a plan stands for 5 m on the ground, how long must you draw a 40 m boundary?',
  exam: 'Calculating drawing lengths from real lengths and the reverse, drawing a plan, and finding distances and areas from a map scale.',
  steps: [
    'Write the scale as 1 : n and interpret it as 1 cm stands for n cm, because the ratio is between the same units.',
    'Convert n cm into metres or kilometres for convenience, because 500 cm = 5 m.',
    'Divide each real length by the length that 1 cm stands for to get the drawing length, because every real length is reduced by the same factor.',
    'Draw the shape accurately with a ruler and set square, because accuracy decides the quality of measured answers.',
    'Measure any required distance on the drawing and multiply back by the scale, because the drawing and the ground are in proportion.',
    'For areas, multiply by the square of the scale, because both length and width are scaled.'
  ],
  ex: [
    'Problem: A rectangular plot is 40 m by 25 m. It is drawn to a scale of 1 : 500. (a) Find the drawing dimensions. (b) The diagonal on the drawing is measured. Find the real diagonal. (c) A farm on a map of scale 1 : 50 000 covers 3 cm^2. Find the real area in hectares.',
    '(a) 1 cm stands for 500 cm = 5 m. Length = 40 / 5 = 8 cm and width = 25 / 5 = 5 cm.',
    '(b) Drawing diagonal = sqrt(8^2 + 5^2) = sqrt(89) = 9.43 cm. Real diagonal = 9.43 x 5 = 47.17 m. Check directly: sqrt(40^2 + 25^2) = sqrt(2 225) = 47.17 m.',
    '(c) 1 cm on the map stands for 50 000 cm = 500 m. So 1 cm^2 stands for 500 x 500 = 250 000 m^2 = 25 hectares (1 hectare = 10 000 m^2).',
    'Real area = 3 x 25 = 75 hectares.',
    'Common mistake: multiplying the area by the scale number itself (3 x 500) instead of by its square, which gives a very small area.'
  ]
}));

S3.push(P('cbc_g11_ess_s3_1', '3.1 Statistics II', {
  pt: 'Mean, Median and Mode of Grouped Data',
  tag: 'When data is grouped, use the middle of each class to stand for its members',
  body: 'Grouped data is data sorted into classes with a frequency for each, where frequency is the number of values in a class. The exact values are lost, so we estimate. The class mid-point is the average of the lower and upper class boundaries and stands for every value in the class. The estimated mean is the sum of (frequency x mid-point) divided by the total frequency. The modal class is the class with the highest frequency. The median is the middle value, so we find the class that contains the value at position n/2 using the cumulative frequency, and then interpolate inside it: median = L + ((n/2 - F) / f) x w, where L is the lower class boundary, F is the cumulative frequency before the class, f is the class frequency and w is the class width. The mean is affected by extreme values, while the median is not.',
  f: 'Mean = sum(f x mid-point) / sum(f)  |  Median = L + ((n/2 - F) / f) x w',
  vis: 'A frequency table with columns for class, mid-point, frequency, f x mid-point and cumulative frequency',
  ctx: 'A cooperative in Embu records how many bags of maize 40 farmers delivered in a season and the manager wants a typical delivery to set the lorry capacity.',
  q: 'If a class reads 30 to 39 bags, which single value would you use to stand for all the farmers in it, and why not 30?',
  exam: 'Building a table with mid-points, calculating the estimated mean, finding the median class and median, and identifying the modal class.',
  steps: [
    'Write each class with its frequency and find the total frequency n, because all averages depend on it.',
    'Find the mid-point of each class, because it represents all values in the class.',
    'Multiply each mid-point by its frequency and add, because this estimates the sum of all values.',
    'Divide that sum by n for the estimated mean, because mean is total divided by count.',
    'Build the cumulative frequency and find the class containing the n/2 value, because the median splits the data in half.',
    'Use class boundaries (29.5 to 39.5 for 30 to 39) and interpolate for the median, because values are assumed to be spread evenly inside the class.'
  ],
  ex: [
    'Problem: Bags of maize delivered by 40 farmers: 10-19: 4, 20-29: 9, 30-39: 14, 40-49: 8, 50-59: 5. Find the modal class, estimated mean and median.',
    'Total frequency n = 4 + 9 + 14 + 8 + 5 = 40.',
    'Mid-points: 14.5, 24.5, 34.5, 44.5, 54.5.',
    'f x mid-point: 58, 220.5, 483, 356, 272.5. Sum = 1 390.',
    'Mean = 1 390 / 40 = 34.75 bags.',
    'Modal class = 30-39 bags (frequency 14).',
    'Cumulative frequencies: 4, 13, 27, 35, 40. n/2 = 20 lies in 30-39, boundaries 29.5 to 39.5, F = 13, f = 14, w = 10.',
    'Median = 29.5 + ((20 - 13) / 14) x 10 = 29.5 + 5 = 34.5 bags.',
    'Common mistake: using the class limit 30 instead of the boundary 29.5, or using the lowest value of each class instead of the mid-point.'
  ]
}));

S3.push(P('cbc_g11_ess_s3_2', '3.2 Probability II', {
  pt: 'Dependent Events and Tree Diagrams',
  tag: 'When items are not put back, the second chance depends on what happened first',
  body: 'Probability is a number from 0 to 1 that measures how likely an event is, found as the number of favourable outcomes divided by the total number of equally likely outcomes. Two events are independent if one does not change the probability of the other, as with two coin tosses, and then P(A and B) = P(A) x P(B). Events are dependent if the first changes what is left for the second, as when you pick items without replacement. Then the second probability is calculated from the new totals. A tree diagram lists every path of outcomes, with the probability on each branch. You multiply along a path to get the probability of that combination, and you add the probabilities of different paths when any of them will do. The probabilities of all the paths together add up to 1.',
  f: 'P(A and B) = P(A) x P(B given A)  |  P(not A) = 1 - P(A)',
  vis: 'A two-stage tree diagram with branch probabilities and the path products at the ends',
  ctx: 'Mama Mboga picks two mangoes from a basket of 6 ripe and 4 unripe ones without looking and without putting the first one back.',
  q: 'If the first mango picked is ripe, how many ripe mangoes and how many mangoes in total are left for the second pick?',
  exam: 'Drawing a tree diagram for selection with and without replacement, and calculating probabilities of both, exactly one and at least one outcome.',
  steps: [
    'Count the total number of items and the number of each type, because every branch probability is a fraction of these.',
    'Draw the first stage of branches and write their probabilities, which add to 1.',
    'For the second stage, reduce the totals by the item already taken (without replacement), because the first pick changes what remains.',
    'Multiply along each path, because the probability of both events happening is the product.',
    'Add the products of all paths that fit the question, because separate paths are different ways of getting the result.',
    'Check that all paths add to 1, or use 1 - P(none) for "at least one", because it is a quick and reliable check.'
  ],
  ex: [
    'Problem: A basket has 6 ripe (R) and 4 unripe (U) mangoes. Two are picked one after the other without replacement. Find P(both ripe), P(one of each) and P(at least one ripe).',
    'First pick: P(R) = 6/10, P(U) = 4/10.',
    'After R is taken: 5 ripe and 4 unripe remain out of 9. After U is taken: 6 ripe and 3 unripe remain out of 9.',
    'P(RR) = 6/10 x 5/9 = 30/90 = 1/3.',
    'P(RU) = 6/10 x 4/9 = 24/90. P(UR) = 4/10 x 6/9 = 24/90.',
    'P(one of each) = 24/90 + 24/90 = 48/90 = 8/15.',
    'P(UU) = 4/10 x 3/9 = 12/90. Check: 30 + 24 + 24 + 12 = 90, so total = 1.',
    'P(at least one ripe) = 1 - P(UU) = 1 - 12/90 = 78/90 = 13/15.',
    'Common mistake: keeping the denominator at 10 for the second pick (6/10 x 5/10), which wrongly assumes the first mango was put back.'
  ]
}));

const MAP = {
  curriculum: 'CBC',
  grade: 11,
  subject: 'Essential Mathematics',
  code: 'ESS-G11',
  trackPathway: 'STEM',
  title: 'CBE Grade 11 (Senior School) Essential Mathematics Metro Line',
  description: 'Grade 11 Essential Mathematics with three strands and eleven sub-strands, following the KICD Essential Mathematics Grade 11 design.',
  notes: 'Strand and sub-strand names follow the KICD Grade 11 Essential Mathematics design.',
  stations: [
    {
      id: 'cbc_g11_ess_s1',
      number: 1,
      title: '1.0 Numbers and Algebra',
      strand: 'Strand 1: Numbers and Algebra',
      status: 'available',
      summary: 'Quadratic equations, matrices, variations, and sequences and series.',
      subtopics: S1
    },
    {
      id: 'cbc_g11_ess_s2',
      number: 2,
      title: '2.0 Measurements and Geometry',
      strand: 'Strand 2: Measurements and Geometry',
      status: 'available',
      summary: 'Approximations and errors, distance, time and speed, commercial arithmetic, rotation and scale drawing.',
      subtopics: S2
    },
    {
      id: 'cbc_g11_ess_s3',
      number: 3,
      title: '3.0 Statistics and Probability',
      strand: 'Strand 3: Statistics and Probability',
      status: 'available',
      summary: 'Grouped data statistics and probability of dependent events.',
      subtopics: S3
    }
  ]
};

module.exports = { maps: [MAP], retiredIds: [] };
