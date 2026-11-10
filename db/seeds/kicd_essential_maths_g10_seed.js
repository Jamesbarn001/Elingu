'use strict';
// CBC SENIOR SCHOOL ESSENTIAL MATHEMATICS, GRADE 10
// Three strands and thirteen sub-strands, following the KICD Essential Mathematics
// Grade 10 design (see docs/audits/kicd_verified_from_site.md).
// Replaces the earlier two-topic Grade 10 Essential Mathematics map (code ESS-G10).
// No existing topic matches a KICD sub-strand, so both old topics are retired.
// Plain text only: no emoji.

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps, workedExample) {
  return {
    id, title, status: 'available',
    conceptPrimer: { title: primerTitle, tagline, body, formula: formula || null, visualBadge, realWorldContext, explanationSteps: steps, workedExample },
    socraticPrompt, formulaBadge: formula || null, examFocus
  };
}

function P(id, title, o) {
  return stop(id, title, o.pt, o.tag, o.body, o.f || null, o.vis, o.ctx, o.q, o.exam,
    o.steps.map((s, i) => `Step ${i + 1}: ${s}`), o.ex.join('\n'));
}

const S1 = [], S2 = [], S3 = [];

const MAP = {
  curriculum: 'CBC',
  grade: 10,
  subject: 'Essential Mathematics',
  code: 'ESS-G10',
  trackPathway: 'STEM',
  title: 'CBE Grade 10 (Senior School) Essential Mathematics Metro Line',
  description: 'Grade 10 Essential Mathematics with three strands and thirteen sub-strands, following the KICD Essential Mathematics Grade 10 design.',
  notes: 'Strand and sub-strand names follow the KICD Grade 10 Essential Mathematics design.',
  stations: [
    { id: 'cbc_g10_ess_s1', number: 1, title: '1.0 Numbers and Algebra', strand: 'Strand 1: Numbers and Algebra', status: 'available',
      summary: 'Real numbers, indices and quadratic equations used in everyday money and land problems.', subtopics: S1 },
    { id: 'cbc_g10_ess_s2', number: 2, title: '2.0 Measurements and Geometry', strand: 'Strand 2: Measurements and Geometry', status: 'available',
      summary: 'Similarity, reflection, trigonometry, areas, surface areas, volumes and commercial arithmetic.', subtopics: S2 },
    { id: 'cbc_g10_ess_s3', number: 3, title: '3.0 Statistics and Probability', strand: 'Strand 3: Statistics and Probability', status: 'available',
      summary: 'Collecting and summarising data, and measuring chance.', subtopics: S3 }
  ]
};

// ===== CHUNK S1 =====
S1.push(P('cbc_g10_ess_s1_1', '1.1 Real Numbers', {
  pt: 'Sorting Numbers and Calculating with Fractions and Decimals',
  tag: 'Every number you meet in money and measuring belongs to a family; knowing the family tells you how to calculate',
  body: 'Real numbers are all the numbers that can be placed on a number line. They come in families. Natural numbers are the counting numbers 1, 2, 3 and so on. Whole numbers add 0. Integers add the negatives, such as -5 for a debt or a temperature below zero. Rational numbers are any numbers that can be written as a fraction a/b of two integers with b not zero, so 3/4, 0.25, -2 and 0.333... (which repeats forever) are all rational. Irrational numbers cannot be written as such a fraction; their decimals never end and never repeat. Examples are sqrt(2) and pi. When you calculate with fractions you must use a common denominator for adding and subtracting, because you can only add pieces of the same size. For mixed numbers it is safest to change to improper fractions first. Answers are then rounded sensibly: to the nearest shilling for money, and to a stated number of decimal places or significant figures for measurements.',
  f: 'a/b + c/d = (ad + bc)/bd   |   mixed number a b/c = (ac + b)/c',
  vis: 'A number line with the families of real numbers nested like rings',
  ctx: 'Wanjiku has 2 3/4 acres of land in Nyeri. She plants maize on part of it and beans on another part, and must know how much is left for kales. Prices at the market, such as KES 12.50, are decimals; sharing a bill among friends gives fractions.',
  q: 'A matatu fare is KES 45 and four friends share the cost of one trip equally. Is the share a whole number, an integer, or a rational number, and how do you know?',
  exam: 'Classifying numbers as natural, whole, integer, rational or irrational; working with mixed numbers and decimals in a practical problem; rounding to decimal places or significant figures.',
  steps: [
    'Decide which family each number belongs to, because the family tells you whether it can be written as an exact fraction.',
    'Change every mixed number to an improper fraction by multiplying the whole part by the denominator and adding the numerator, because then each quantity is a single fraction.',
    'Find the lowest common denominator of the fractions, because only pieces of the same size can be added or subtracted.',
    'Rewrite each fraction over that denominator, multiplying top and bottom by the same number, because this keeps its value unchanged.',
    'Add or subtract the numerators and keep the denominator, because the size of the pieces does not change.',
    'Simplify, convert to a decimal if useful, and give the units, because an answer in acres or shillings must say what it measures.'
  ],
  ex: [
    'Problem: Wanjiku has 2 3/4 acres. She plants maize on 1 1/5 acres and beans on 5/8 acre. How much land is left? Then state the family of the answer.',
    'Improper fractions: 2 3/4 = (2 x 4 + 3)/4 = 11/4. 1 1/5 = (1 x 5 + 1)/5 = 6/5. The beans area is 5/8.',
    'Lowest common denominator of 4, 5 and 8 is 40.',
    '11/4 = 110/40. 6/5 = 48/40. 5/8 = 25/40.',
    'Left = 110/40 - 48/40 - 25/40 = (110 - 48 - 25)/40 = 37/40 acre.',
    'As a decimal: 37 divided by 40 = 0.925 acre. Check: 2.75 - 1.2 - 0.625 = 0.925, which agrees.',
    'Answer: 37/40 acre (0.925 acre) is left. It is a rational number because it is a fraction of two integers.',
    'Common mistake: adding or subtracting the denominators as well, writing 1/4 + 1/5 = 2/9. The pieces are different sizes, so a common denominator must be found first.'
  ]
}));

S1.push(P('cbc_g10_ess_s1_2', '1.2 Indices', {
  pt: 'Powers, the Laws of Indices and Standard Form',
  tag: 'An index tells you how many times a number multiplies itself, and the laws save you from writing it all out',
  body: 'In 2^5 the number 2 is the base and 5 is the index (also called the power or exponent). It means 2 is multiplied by itself 5 times: 2 x 2 x 2 x 2 x 2 = 32. From this meaning the laws follow. Multiplying powers of the same base: 2^3 x 2^2 = (2x2x2) x (2x2) = 2^5, so you add the indices. Dividing: 2^5 divided by 2^2 leaves 2^3, so you subtract. A power of a power, (2^3)^2 = 2^3 x 2^3 = 2^6, so you multiply. A zero index gives 1, because 2^3 divided by 2^3 = 2^0 and any number divided by itself is 1. A negative index means a reciprocal: a^-n = 1/a^n. A fractional index means a root: a^(1/2) is the square root of a, and a^(m/n) is the nth root of a, raised to the power m. Very large and very small numbers are written in standard form, A x 10^n with A between 1 and 10.',
  f: 'a^m x a^n = a^(m+n)  |  a^m / a^n = a^(m-n)  |  (a^m)^n = a^(mn)  |  a^0 = 1  |  a^-n = 1/a^n  |  a^(m/n) = (nth root of a)^m',
  vis: 'A doubling chain 1, 2, 4, 8, 16 with the index counted under each term',
  ctx: 'A WhatsApp message is forwarded by each person who gets it to 3 new people. The number of people reached in round n is 3^n. Large figures such as national budget amounts are written in standard form when the numbers are too long.',
  q: 'If one person tells 3 people and each of them tells 3 more, how many people hear in the second round, and what index shortcut gives that count?',
  exam: 'Simplifying and evaluating expressions with positive, zero, negative and fractional indices; solving simple equations such as 3^(x+1) = 81; writing numbers in standard form.',
  steps: [
    'Write every number as a power of a common base where you can (for example 16 = 2^4), because the laws only work when the bases are the same.',
    'Apply the multiplication law by adding indices, and the division law by subtracting them, because these come from counting the repeated factors.',
    'Deal with brackets using the power of a power law, multiplying the indices, because you are repeating the whole group.',
    'Turn negative indices into reciprocals and fractional indices into roots, because that is what they mean.',
    'Evaluate the remaining numbers and simplify, because the final answer should be a single number or the simplest form.',
    'To solve an equation, write both sides as powers of the same base and equate the indices, because equal powers of the same base must have equal indices.'
  ],
  ex: [
    'Problem A: Evaluate 16^(3/4) x 2^-3 divided by 4^0. Problem B: Solve 3^(x+1) = 81.',
    'A, first term: 16^(3/4) = (4th root of 16)^3 = 2^3 = 8.',
    'A, second term: 2^-3 = 1/2^3 = 1/8.',
    'A, third term: 4^0 = 1.',
    'A: 8 x (1/8) divided by 1 = 1.',
    'B: write 81 as a power of 3: 81 = 3 x 3 x 3 x 3 = 3^4.',
    'So 3^(x+1) = 3^4, which gives x + 1 = 4, so x = 3. Check: 3^(3+1) = 3^4 = 81, which is correct.',
    'Answers: A = 1 and B: x = 3.',
    'Common mistake: multiplying the bases as well as adding the indices, for example writing 2^3 x 2^2 = 4^5. The base stays 2, so the answer is 2^5 = 32.'
  ]
}));

S1.push(P('cbc_g10_ess_s1_3', '1.3 Quadratic Equations', {
  pt: 'Forming and Solving Quadratic Equations by Factorising and by Formula',
  tag: 'When a problem involves a length multiplied by another length, a quadratic equation is waiting',
  body: 'A quadratic equation is an equation in which the highest power of the unknown is 2, written in the standard form ax^2 + bx + c = 0, where a is not zero. Because the unknown is squared, a quadratic usually has two solutions, called roots. The key idea for solving by factorising is that if two numbers multiply to give 0, then at least one of them must be 0. So when the equation is written as (x - p)(x - q) = 0, either x - p = 0 or x - q = 0. To factorise x^2 + bx + c, find two numbers that multiply to c and add to b. When factorising is difficult, the quadratic formula always works. The part b^2 - 4ac, called the discriminant, tells you how many real roots there are: positive means two, zero means one, negative means none. In word problems a root that makes a length negative is rejected, because a length cannot be negative.',
  f: 'ax^2 + bx + c = 0   |   x = (-b +/- sqrt(b^2 - 4ac)) / 2a',
  vis: 'A rectangular plot with width x and length x + 5 labelled on the sides',
  ctx: 'A farmer in Kitale has a rectangular maize plot whose length is 5 m more than its width and whose area is 84 square metres. To buy the right length of fencing wire he must find the dimensions.',
  q: 'If two numbers multiply to give zero, what must be true of at least one of them, and why does that help us solve (x - 3)(x + 2) = 0?',
  exam: 'Forming a quadratic equation from a word problem and solving it by factorising or formula, then rejecting the root that does not fit the context.',
  steps: [
    'Let the unknown be x and write every other quantity in terms of x, because an equation needs just one unknown.',
    'Form the equation from the relationship given, such as area = length x width, because that statement is what links the quantities.',
    'Expand and move everything to one side so that the equation reads ax^2 + bx + c = 0, because the methods need the standard form.',
    'Factorise by finding two numbers that multiply to c and add to b, because they split the middle term.',
    'Set each bracket equal to zero and solve, because a product is zero only when one factor is zero.',
    'Reject any root that does not make sense, such as a negative length, then use the valid root to find all the required quantities and check by substituting.'
  ],
  ex: [
    'Problem: The length of a rectangular plot is 5 m more than its width. Its area is 84 m^2. Find the dimensions and the length of fencing wire needed for one round of fence.',
    'Let the width be x m. The length is (x + 5) m.',
    'Area: x(x + 5) = 84, so x^2 + 5x = 84, so x^2 + 5x - 84 = 0.',
    'Find two numbers that multiply to -84 and add to 5: 12 and -7 (12 x -7 = -84 and 12 + -7 = 5).',
    '(x + 12)(x - 7) = 0, so x = -12 or x = 7.',
    'A width cannot be negative, so x = 7. Width = 7 m, length = 7 + 5 = 12 m.',
    'Check: 7 x 12 = 84 m^2, correct.',
    'Perimeter = 2(7 + 12) = 2 x 19 = 38 m of wire for one round.',
    'Common mistake: giving both roots as dimensions, or forgetting to move the 84 to the left so that the right side is zero before factorising.'
  ]
}));

// ===== END S1 =====
// ===== CHUNK S2 =====
S2.push(P('cbc_g10_ess_s2_1', '2.1 Similarity and Enlargement', {
  pt: 'Scale Factors, Similar Shapes and Enlargement',
  tag: 'Similar shapes keep their angles and grow their lengths by one scale factor; areas grow by that factor squared',
  body: 'Two shapes are similar if they have the same shape but not necessarily the same size: all matching angles are equal, and all matching lengths are in the same ratio. That ratio is the linear scale factor k, found as (length on the new shape) divided by (matching length on the original). An enlargement is the transformation that makes a similar shape. It needs a centre of enlargement and a scale factor. Every point moves along the straight line from the centre, so that its distance from the centre is multiplied by k. If k is bigger than 1 the shape grows, if k is between 0 and 1 it shrinks. Lengths are multiplied by k, but area is a length times a length, so areas are multiplied by k^2, and volumes, which are three lengths multiplied, by k^3. A map or a house plan drawn to a scale such as 1:500 is an enlargement or reduction with k = 1/500.',
  f: 'k = new length / original length   |   area ratio = k^2   |   volume ratio = k^3',
  vis: 'A small triangle and a larger triangle joined by rays from a centre of enlargement',
  ctx: 'A surveyor draws a plan of a shamba in Machakos to scale 1:500, so every 1 cm on paper stands for 500 cm (5 m) on the ground. Photocopying a document at 150 percent is an enlargement with k = 1.5.',
  q: 'If you double both the length and the width of a rectangular garden, does its area double? Try it with a 3 m by 2 m garden before answering.',
  exam: 'Finding the scale factor of similar figures, finding unknown lengths, using area and volume ratios, and drawing or describing an enlargement with a given centre and scale factor.',
  steps: [
    'Match the corresponding sides of the two shapes, because only matching sides give the scale factor.',
    'Divide a length on the new shape by the matching length on the original to get k, because k is the multiplier that turns one into the other.',
    'Multiply any other original length by k to find its partner, because all lengths scale together.',
    'For areas, multiply by k^2, and for volumes, by k^3, because area and volume involve two and three lengths.',
    'To enlarge a point from a centre, find the vector from the centre to the point and multiply it by k, because the point moves along the line from the centre.',
    'Check by measuring one more length or by recomputing the area from the new lengths, because a second route catches slips.'
  ],
  ex: [
    'Problem: Triangle ABC has sides 6 cm, 8 cm and 10 cm. Triangle PQR is similar, with the side matching 6 cm equal to 9 cm. Find the other sides and the area of each triangle. Then enlarge the point A(2, 1) with scale factor 3 about the origin and about the point (1, 1).',
    'Scale factor: k = 9 divided by 6 = 1.5.',
    'Other sides: 8 x 1.5 = 12 cm and 10 x 1.5 = 15 cm.',
    'Triangle ABC is right-angled (6^2 + 8^2 = 100 = 10^2), so its area = 1/2 x 6 x 8 = 24 cm^2.',
    'Area of PQR = 24 x k^2 = 24 x 2.25 = 54 cm^2. Check: 1/2 x 9 x 12 = 54 cm^2.',
    'About the origin: A(2, 1) goes to (3 x 2, 3 x 1) = (6, 3).',
    'About (1, 1): the vector from the centre to A is (2 - 1, 1 - 1) = (1, 0). Multiply by 3 to get (3, 0). Add to the centre: (1 + 3, 1 + 0) = (4, 1).',
    'Answers: sides 9 cm, 12 cm, 15 cm; areas 24 cm^2 and 54 cm^2; images (6, 3) and (4, 1).',
    'Common mistake: multiplying the area by k instead of k^2, giving 24 x 1.5 = 36 cm^2, which fails the direct check.'
  ]
}));

S2.push(P('cbc_g10_ess_s2_2', '2.2 Reflection', {
  pt: 'Reflecting Points and Shapes in a Mirror Line',
  tag: 'A reflection flips a shape to the other side of a mirror line, keeping its size and the same distance from the line',
  body: 'A reflection is a transformation that produces a mirror image. The mirror line is also called the line of reflection. Three facts define a reflection. First, each point and its image are the same perpendicular distance from the mirror line, on opposite sides. Second, the line joining a point to its image is perpendicular to the mirror line, and the mirror line passes through its midpoint. Third, the shape and size do not change, only the orientation (the order of the labels runs the opposite way round), so a reflection is an isometry. A point on the mirror line is its own image, called invariant. On a coordinate grid: reflection in the x-axis changes (x, y) to (x, -y); in the y-axis, (x, y) to (-x, y); in the line y = x, (x, y) to (y, x); in a vertical line x = a, (x, y) to (2a - x, y), and in a horizontal line y = b, (x, y) to (x, 2b - y).',
  f: 'x-axis: (x, y) -> (x, -y)   |   y-axis: (x, y) -> (-x, y)   |   y = x: (x, y) -> (y, x)   |   x = a: (x, y) -> (2a - x, y)',
  vis: 'A triangle on a grid with its mirror image on the other side of a vertical dotted line',
  ctx: 'The reflection of a matatu in a standing pool of water, the symmetrical pattern on a kikoi, and the left and right halves of a mabati roof plan are all mirror images across a line.',
  q: 'If you stand 3 m in front of a mirror, how far behind the mirror does your image appear to be, and what does that say about where the mirror line lies?',
  exam: 'Finding images of points and triangles under reflection in given lines such as the axes, y = x, x = a or y = b; finding the equation of the mirror line from an object and its image.',
  steps: [
    'Draw or write the mirror line, because every distance is measured to it.',
    'For each vertex, measure the perpendicular distance to the mirror line, because the image is exactly that far on the other side.',
    'Mark the image point at that distance, on the line perpendicular to the mirror, because the join of point and image is perpendicular to the mirror.',
    'Join the image points in the same order as the original, labelling them A\', B\', C\', because this keeps track of which vertex goes where.',
    'To find the mirror line from a pair of points, find the midpoint of the point and its image and the direction perpendicular to their join, because the mirror is the perpendicular bisector.',
    'Check that the image has the same side lengths as the object, because a reflection does not change size.'
  ],
  ex: [
    'Problem: Triangle ABC has vertices A(1, 1), B(4, 1) and C(4, 3). Find its image A\'B\'C\' in the line x = 2, and then the image of A in the line y = x.',
    'For a vertical line x = a with a = 2, the rule is (x, y) goes to (2a - x, y) = (4 - x, y).',
    'A(1, 1): (4 - 1, 1) = (3, 1). Distance check: A is 1 unit left of the line and A\' is 1 unit right.',
    'B(4, 1): (4 - 4, 1) = (0, 1). C(4, 3): (4 - 4, 3) = (0, 3).',
    'Image: A\'(3, 1), B\'(0, 1), C\'(0, 3).',
    'Check side lengths: AB = 3 and A\'B\' = 3; BC = 2 and B\'C\' = 2. The sizes agree.',
    'Midpoint of AA\' = ((1 + 3)/2, (1 + 1)/2) = (2, 1), which lies on the line x = 2, as it must.',
    'Reflection of A(1, 1) in y = x: swap the coordinates to get (1, 1). It lies on the mirror line, so it is invariant.',
    'Common mistake: counting the distance from the y-axis instead of the actual mirror line, or forgetting that the image must be the same distance on the opposite side.'
  ]
}));

S2.push(P('cbc_g10_ess_s2_3', '2.3 Trigonometry', {
  pt: 'Sine, Cosine and Tangent in Right-Angled Triangles',
  tag: 'The ratios of the sides of a right-angled triangle depend only on its angle, so an angle lets you find a length you cannot measure',
  body: 'In a right-angled triangle, the hypotenuse is the longest side, opposite the right angle. For a chosen angle, the opposite side is the one facing it, and the adjacent side is the one that touches it (other than the hypotenuse). All right-angled triangles with the same angle are similar, so the ratios of their sides are fixed. These ratios are named: sine = opposite divided by hypotenuse, cosine = adjacent divided by hypotenuse, tangent = opposite divided by adjacent. A calculator gives the ratio from the angle, and the inverse keys give the angle from a ratio. An angle of elevation is measured upward from the horizontal to the line of sight; an angle of depression is measured downward from the horizontal. Always make sure the calculator is in degree mode.',
  f: 'sin x = opposite / hypotenuse   |   cos x = adjacent / hypotenuse   |   tan x = opposite / adjacent',
  vis: 'A ladder leaning against a wall with the angle at the ground and the three sides labelled',
  ctx: 'A technician from KPLC wants the height of an electricity pole without climbing it. He stands a measured distance away and uses the angle of elevation of the top. A builder in Thika checks that a 5 m ladder reaches a window safely.',
  q: 'If a ladder leans more steeply against a wall, does the angle with the ground get bigger or smaller, and what happens to the height it reaches?',
  exam: 'Choosing the correct ratio, finding a missing side or angle, and solving angle of elevation and depression problems with a diagram.',
  steps: [
    'Draw and label a clear right-angled triangle, marking the angle used, because most mistakes come from mislabelled sides.',
    'Label the sides opposite, adjacent and hypotenuse relative to that angle, because the ratio names depend on the chosen angle.',
    'Pick the ratio that links the side you know and the side you want, using SOH CAH TOA, because only one ratio uses exactly those two sides.',
    'Write the equation, then solve for the unknown by multiplying or dividing, because a ratio is a fraction and must be rearranged.',
    'Use inverse sin, cos or tan if the angle is needed, because they undo the ratio.',
    'Add any extra height such as eye level, round sensibly and give the units, because the angle is measured from the eye, not the ground.'
  ],
  ex: [
    'Problem A: A 5 m ladder makes an angle of 65 degrees with the ground. How high up the wall does it reach and how far is its foot from the wall? Problem B: From a point 15 m from the foot of a pole, with eye height 1.5 m, the angle of elevation of the top is 38 degrees. Find the height of the pole.',
    'A: the hypotenuse is 5 m. The height is opposite the 65 degree angle: sin 65 = h/5, so h = 5 x sin 65 = 5 x 0.9063 = 4.53 m.',
    'A: the foot distance is adjacent: cos 65 = d/5, so d = 5 x cos 65 = 5 x 0.4226 = 2.11 m.',
    'A check: 4.53^2 + 2.11^2 = 20.52 + 4.45 = 24.97, close to 5^2 = 25 (rounding).',
    'B: the horizontal distance is adjacent (15 m) and the height above the eye is opposite: tan 38 = h/15, so h = 15 x tan 38 = 15 x 0.7813 = 11.72 m.',
    'B: add eye height: 11.72 + 1.5 = 13.22 m.',
    'Answers: A: 4.53 m up and 2.11 m out; B: the pole is 13.22 m high (2 decimal places).',
    'Common mistake: forgetting to add the height of the eye to the answer, or using the calculator in radian mode so that sin 65 gives 0.827 instead of 0.906.'
  ]
}));

S2.push(P('cbc_g10_ess_s2_4', '2.4 Area of Polygons', {
  pt: 'Areas of Triangles, Quadrilaterals and Composite Plots',
  tag: 'Cut any polygon into rectangles and triangles, find each area, and add',
  body: 'A polygon is a closed flat shape with straight sides. Area is the amount of flat surface it covers, measured in square units such as square metres. Core formulas: rectangle = length x width; parallelogram = base x perpendicular height; triangle = 1/2 x base x perpendicular height (a triangle is half of a parallelogram); trapezium = 1/2 x (sum of the parallel sides) x perpendicular height (the average of the two parallel sides, times the distance between them); rhombus or kite = 1/2 x product of the diagonals. Another formula for a triangle when two sides and the angle between them are known is 1/2 ab sin C. The height must be perpendicular to the base, never the slanted side. For an irregular plot, divide it into shapes whose formulas you know, find each area, and add. Units: 10 000 square metres make one hectare, and one acre is about 4 047 square metres.',
  f: 'triangle = 1/2 bh   |   trapezium = 1/2 (a + b)h   |   parallelogram = bh   |   triangle = 1/2 ab sin C',
  vis: 'A trapezium shaped plot with parallel sides and the perpendicular height drawn as a dashed line',
  ctx: 'A trapezium-shaped plot in Kakamega needs fertiliser, and the quantity depends on area. A fundi tiling a floor in Mombasa, or fencing a polygon-shaped compound, must first find the area to estimate cost.',
  q: 'Why is the area of a triangle exactly half of a rectangle with the same base and height? Sketch it before answering.',
  exam: 'Applying the area formulas to triangles, parallelograms, trapeziums, kites and composite shapes, converting units, and costing a job from the area.',
  steps: [
    'Sketch the shape and mark every given length, because a picture shows which parts are bases and which are heights.',
    'Split an irregular shape into rectangles, triangles and trapeziums, because each has a formula.',
    'Identify the base and the perpendicular height of each piece, because a slanted side is not the height.',
    'Substitute into the formula and calculate each area with its units, because units confirm the formula was applied correctly.',
    'Add the areas (or subtract any hole), because the total area is the sum of the parts.',
    'Use the total area to answer the question, such as cost, by multiplying by the rate per square metre, because the rate is given per unit area.'
  ],
  ex: [
    'Problem: A plot is a trapezium with parallel sides 40 m and 28 m, and the perpendicular distance between them is 20 m. Fertiliser is applied at 1 kg for every 10 m^2 and costs KES 95 per kg. Find the area, the amount of fertiliser and the cost.',
    'Area = 1/2 x (40 + 28) x 20 = 1/2 x 68 x 20 = 34 x 20 = 680 m^2.',
    'Fertiliser: 680 divided by 10 = 68 kg.',
    'Cost: 68 x 95 = KES 6 460.',
    'Check the area by splitting into a 28 m by 20 m rectangle and a triangle with base 40 - 28 = 12 m and height 20 m: 28 x 20 = 560, and 1/2 x 12 x 20 = 120, so 560 + 120 = 680 m^2, which agrees.',
    'Answer: area 680 m^2, 68 kg of fertiliser, cost KES 6 460.',
    'Common mistake: using the slanted side instead of the perpendicular height, or forgetting the 1/2 in the trapezium and triangle formulas.'
  ]
}));

S2.push(P('cbc_g10_ess_s2_5', '2.5 Area of part of a circle', {
  pt: 'Arc Length, Sectors and Segments',
  tag: 'A sector is a fraction of a circle, and its angle tells you which fraction',
  body: 'A circle of radius r has circumference 2 x pi x r and area pi x r^2, where pi is about 3.142 (or 22/7). A sector is the part of a circle between two radii, like a slice of pizza. A full turn is 360 degrees, so a sector with angle theta is the fraction theta/360 of the whole circle. This gives the arc length (the curved edge) and the sector area by multiplying the whole circumference and the whole area by that same fraction. A segment is the part of a circle cut off by a chord (a straight line joining two points on the circle). The area of a segment is the area of the sector minus the area of the triangle formed by the two radii and the chord. The triangle has area 1/2 x r^2 x sin(theta). The perimeter of a sector is the arc length plus the two radii.',
  f: 'arc = (theta/360) x 2 pi r   |   sector = (theta/360) x pi r^2   |   segment = sector - 1/2 r^2 sin(theta)',
  vis: 'A circle with a shaded sector and, beside it, a shaded segment cut by a chord',
  ctx: 'A garden sprinkler in a Naivasha flower farm waters a sector of ground. A farmer fencing the curved edge needs the arc length, and the cost of watering depends on the area covered.',
  q: 'A sprinkler turns through only a third of a full turn. What fraction of the full circle does it water, and how does that fraction change the area formula?',
  exam: 'Finding arc length, perimeter and area of a sector and area of a segment, with the angle given in degrees, and applying them to a practical plot.',
  steps: [
    'Write down the radius and the angle at the centre, because the sector depends on both.',
    'Form the fraction theta/360, because it tells how much of the full circle is used.',
    'Multiply the full circumference by that fraction for the arc length, because the arc is the same fraction of the boundary.',
    'Multiply the full area by that fraction for the sector area, because the sector is the same fraction of the area.',
    'For a perimeter, add the two radii to the arc, because the sector is bounded by the arc and two straight edges.',
    'For a segment, subtract the triangle area 1/2 r^2 sin(theta) from the sector area, because the triangle is the part of the sector that is not the segment.'
  ],
  ex: [
    'Problem: A sprinkler waters a sector of radius 12 m with angle 120 degrees. Find the area watered, the length of the curved edge and the perimeter. Then find the area of the segment cut by a chord in a circle of radius 10 m with angle 60 degrees. Use pi = 3.1416.',
    'Fraction: 120/360 = 1/3.',
    'Area watered = 1/3 x 3.1416 x 12^2 = 1/3 x 3.1416 x 144 = 150.80 m^2.',
    'Arc length = 1/3 x 2 x 3.1416 x 12 = 25.13 m.',
    'Perimeter = 25.13 + 12 + 12 = 49.13 m.',
    'Segment: sector area = 60/360 x 3.1416 x 100 = 52.36 square units.',
    'Triangle = 1/2 x 10 x 10 x sin 60 = 50 x 0.8660 = 43.30.',
    'Segment = 52.36 - 43.30 = 9.06 square units.',
    'Common mistake: using the diameter in place of the radius in the formulas, or forgetting to add the two radii when asked for the perimeter of a sector.'
  ]
}));

S2.push(P('cbc_g10_ess_s2_6', '2.6 Surface area of solids', {
  pt: 'Surface Area of Prisms, Cylinders, Cones and Pyramids',
  tag: 'Surface area is the area of the skin of a solid: open it out flat and add up the faces',
  body: 'A solid is a three-dimensional shape. Its surface area is the total area of all its faces, measured in square units. The best way to find it is to imagine the solid cut open and laid flat; this flat pattern is called a net. A cuboid has six rectangular faces: 2(lw + lh + wh). A prism has two identical end faces and rectangular side faces, so its surface area is twice the end area plus perimeter of the end times the length. A cylinder opened out gives two circles and a rectangle whose length is the circumference: 2 pi r^2 + 2 pi r h (an open cylinder has only one circle). A cone has a circular base and a curved face of area pi r l, where l is the slant height, found from l^2 = r^2 + h^2. A pyramid has a base plus triangular faces. Surface area is used to find how much paint, cloth or mabati is needed.',
  f: 'cuboid = 2(lw + lh + wh)   |   closed cylinder = 2 pi r^2 + 2 pi r h   |   cone = pi r^2 + pi r l   |   l^2 = r^2 + h^2',
  vis: 'A cylinder cut open into its two circles and one rectangle',
  ctx: 'A plastic water tank in a homestead in Embu is cylindrical. Before painting the outside, the owner works out the surface area. A fundi buying mabati for a roof does the same with the sloping rectangles.',
  q: 'If you cut open a tin of beans and unroll the label, what shape is the label, and which measurement of the tin is its length?',
  exam: 'Finding surface areas of cuboids, prisms, cylinders (open and closed), cones and pyramids, including slant height, and costing material.',
  steps: [
    'Identify the solid and list its faces, because each face is a flat or curved shape with its own formula.',
    'Decide whether any face is missing, such as the lid of an open tank, because a missing face is not painted or covered.',
    'Find any missing length, such as the slant height from Pythagoras, because the formulas use specific lengths.',
    'Calculate each face area with its units, because it is easy to lose track of the faces.',
    'Add all the faces, because surface area is the total.',
    'Use the total in the question, such as the quantity of paint divided by the coverage per litre, and round up if you must buy whole units, because you cannot buy part of a tin.'
  ],
  ex: [
    'Problem: An open cylindrical tank has radius 0.7 m and height 1.2 m. The outside, including the base, is to be painted. One litre of paint covers 8 m^2 and costs KES 650. Find the surface area, the paint needed and the cost. Use pi = 22/7.',
    'Faces: one circular base and one curved side. There is no lid.',
    'Base = pi r^2 = 22/7 x 0.7 x 0.7 = 22/7 x 0.49 = 1.54 m^2.',
    'Curved side = 2 pi r h = 2 x 22/7 x 0.7 x 1.2 = 5.28 m^2.',
    'Total = 1.54 + 5.28 = 6.82 m^2.',
    'Paint: 6.82 divided by 8 = 0.8525 litres, so one whole litre must be bought.',
    'Cost = 1 x KES 650 = KES 650.',
    'Common mistake: using the closed-cylinder formula and adding a second circle for a lid that does not exist, which gives 8.36 m^2.'
  ]
}));

S2.push(P('cbc_g10_ess_s2_7', '2.7 Volume and Capacity', {
  pt: 'Volume of Prisms, Cylinders, Cones and Pyramids; Capacity',
  tag: 'Volume is the space inside a solid: base area times height for a prism, and one third of that for a cone or pyramid',
  body: 'Volume is the amount of space a solid occupies, measured in cubic units such as cubic centimetres (cm^3) or cubic metres (m^3). Capacity is the volume of liquid a container can hold, measured in litres. The link is: 1 litre = 1000 cm^3, and 1 m^3 = 1000 litres. For any prism (a solid with the same cross-section all the way through) the volume is the area of the cross-section times the length. So a cuboid is l x w x h and a cylinder is pi r^2 h. A cone or a pyramid fills exactly one third of the prism with the same base and height, so its volume is 1/3 x base area x height. Careful with units: all lengths must be in the same unit before multiplying, and converting a cubic unit needs the conversion factor cubed.',
  f: 'prism = base area x height   |   cylinder = pi r^2 h   |   cone = 1/3 pi r^2 h   |   pyramid = 1/3 x base area x h   |   1 m^3 = 1000 litres',
  vis: 'A cylinder and a cone with the same base and height, three cones filling one cylinder',
  ctx: 'A water tank in a rural home, a heap of sand delivered by lorry in Machakos, and a kiosk selling water by the cubic metre all rely on volume and capacity.',
  q: 'If a tank holds 1.8 cubic metres, and a jerrycan holds 20 litres, how many jerrycans can it fill, and which conversion did you use first?',
  exam: 'Calculating volumes of prisms, cylinders, cones and pyramids, converting between cubic units and litres, and solving problems about filling, emptying and loads.',
  steps: [
    'Write down the formula for the solid and the measurements given, because the right formula depends on the shape.',
    'Make all lengths the same unit, because mixing metres and centimetres gives wrong answers.',
    'Find the base (or cross-section) area first, then multiply by the height, because volume is area times height.',
    'For a cone or pyramid, take one third of the result, because it fills a third of the matching prism.',
    'Convert to litres using 1 m^3 = 1000 litres or 1000 cm^3 = 1 litre if capacity is asked, because capacity is stated in litres.',
    'Use the result for the practical question, such as cost per cubic metre or number of trips, and round trips up, because a part trip is still a trip.'
  ],
  ex: [
    'Problem A: The cylindrical tank of radius 0.7 m and height 1.2 m is filled with water. Find its capacity in litres and the cost at KES 60 per cubic metre. Problem B: A conical heap of sand has radius 3 m and height 4 m. A lorry carries 7 m^3 per trip. How many trips? Use pi = 22/7 for A and 3.1416 for B.',
    'A: volume = pi r^2 h = 22/7 x 0.49 x 1.2 = 22/7 x 0.588 = 1.848 m^3.',
    'A: capacity = 1.848 x 1000 = 1848 litres.',
    'A: cost = 1.848 x 60 = KES 110.88.',
    'B: volume = 1/3 x 3.1416 x 3^2 x 4 = 1/3 x 3.1416 x 36 = 37.70 m^3.',
    'B: trips = 37.70 divided by 7 = 5.39, so 6 trips are needed.',
    'Answers: A: 1848 litres and KES 110.88; B: 6 trips.',
    'Common mistake: forgetting the 1/3 for a cone, which gives 113.10 m^3, or writing 1 m^3 = 100 litres instead of 1000 litres.'
  ]
}));

S2.push(P('cbc_g10_ess_s2_8', '2.8 Commercial Arithmetic I', {
  pt: 'Profit, Discount, VAT, Commission and Simple Interest',
  tag: 'Every deal in a shop or a SACCO is a percentage of a starting amount: find the amount, then apply the percentage',
  body: 'Commercial arithmetic is the mathematics of buying, selling and lending. Profit = selling price minus buying price, and loss is the reverse. Percentage profit = (profit / buying price) x 100, always based on the buying price. A discount is a reduction off the marked price, found as a percentage of the marked price. Value Added Tax (VAT) is a tax added to the selling price of goods and services; the standard rate in Kenya is 16 percent, so a price with VAT is 116 percent of the price without it. Commission is a payment to an agent, calculated as a percentage of the sales made. Simple interest is money paid for borrowing: I = PRT/100, where P is the principal (the amount borrowed), R is the rate per year in percent and T is the time in years. The total repaid is P + I.',
  f: '% profit = profit / cost price x 100   |   I = PRT/100   |   price with VAT = price x 1.16   |   commission = rate x sales',
  vis: 'A price tag with the marked price, discount and VAT stacked as a bar',
  ctx: 'A shopkeeper in Eldoret sells a fridge, a mobile money agent earns commission on transactions, and a SACCO member borrows money to expand a business and pays back with interest.',
  q: 'If a shirt costs KES 800 and is sold for KES 1000, is the profit percentage 20 or 25 percent, and what amount did you divide by?',
  exam: 'Calculating profit, loss, discount, commission, VAT and simple interest, and working out the percentage based on the correct starting amount.',
  steps: [
    'Identify the starting amount for each percentage, because profit is based on cost price and discount on marked price.',
    'Convert the percentage to a decimal by dividing by 100, because percent means per hundred.',
    'Multiply the starting amount by that decimal to find the change, because the percentage is a part of the starting amount.',
    'Add or subtract the change as needed, because discount lowers a price and VAT raises it.',
    'In a multi-step problem, apply the steps in the order stated, because a discount before VAT gives a different total from VAT before a discount.',
    'State the final answer in KES with the correct rounding, because money is rounded to the cent or the shilling.'
  ],
  ex: [
    'Problem A: A television has a marked price of KES 20 000 before VAT. A 5 percent discount is given and then 16 percent VAT is added. Find the final price. Problem B: A trader buys goods for KES 15 000 and sells them for KES 18 750. Find the percentage profit. Problem C: A SACCO lends KES 60 000 at 12 percent per year simple interest for 2.5 years. Find the interest and the total repaid.',
    'A: discount = 5/100 x 20 000 = KES 1 000, so the price is 20 000 - 1 000 = KES 19 000.',
    'A: VAT = 16/100 x 19 000 = KES 3 040. Final price = 19 000 + 3 040 = KES 22 040.',
    'B: profit = 18 750 - 15 000 = KES 3 750. Percentage profit = 3 750 / 15 000 x 100 = 25 percent.',
    'C: I = PRT/100 = 60 000 x 12 x 2.5 / 100 = KES 18 000.',
    'C: total repaid = 60 000 + 18 000 = KES 78 000. Over 30 months this is 78 000 / 30 = KES 2 600 per month.',
    'Common mistake: calculating percentage profit on the selling price, which gives 3 750 / 18 750 = 20 percent instead of 25 percent.'
  ]
}));

// ===== END S2 =====
// ===== CHUNK S3 =====
S3.push(P('cbc_g10_ess_s3_1', '3.1 Statistics I', {
  pt: 'Collecting, Organising and Summarising Data with Mean, Median, Mode and Range',
  tag: 'One number can stand for a whole list, but you must choose the average that tells the truth',
  body: 'Statistics is the collection, organising and interpreting of data. Data is information, such as daily sales or the heights of plants. To make sense of it, we summarise it with an average (a typical value) and a measure of spread. The mean is the sum of all values divided by how many there are. The median is the middle value when the data is arranged in order; for an even number of values it is the mean of the two middle ones. The mode is the value that appears most often. The range is the largest value minus the smallest, and measures spread. When data is in a frequency table, with each value x and the number of times it occurs f, the mean is the sum of f x x divided by the sum of f. The mean uses every value, so one extreme value pulls it; the median is not affected by extreme values, so it can be a better typical value when the data has an unusually large or small entry.',
  f: 'mean = sum of values / number of values   |   mean from a table = sum(fx) / sum(f)   |   range = largest - smallest',
  vis: 'A bar chart of daily sales with the mean drawn as a horizontal line',
  ctx: 'Mama Mboga records her daily takings for a week to decide how much stock to buy. A matatu sacco records passengers per trip. A teacher records test marks of a class.',
  q: 'If six days of takings are about KES 1000 and one day, market day, is KES 1800, does the mean describe a normal day well? What could you use instead?',
  exam: 'Calculating mean, median, mode and range from a list and from a frequency table, choosing the most suitable average, and interpreting the results.',
  steps: [
    'List the data and count the values, because every average depends on the count.',
    'Arrange the values in order from smallest to largest, because the median and the range need the order.',
    'Add all values and divide by the count to get the mean, because the mean shares the total equally.',
    'Find the middle value for the median, using the mean of the two middle values when the count is even, because the median splits the data into two equal halves.',
    'Find the most frequent value for the mode, and subtract smallest from largest for the range, because these measure popularity and spread.',
    'For a frequency table, multiply each value by its frequency before adding, because each value occurs f times; then divide by the total frequency.'
  ],
  ex: [
    'Problem A: Mama Mboga takes KES 1200, 950, 1400, 1150, 950, 1800 and 1000 over seven days. Find the mean, median, mode and range. Problem B: 20 customers buy mandazi. 5 buy 1, 8 buy 2, 4 buy 3 and 3 buy 4. Find the mean number bought.',
    'A: total = 1200 + 950 + 1400 + 1150 + 950 + 1800 + 1000 = 8 450. Mean = 8 450 / 7 = KES 1 207.14.',
    'A: in order: 950, 950, 1000, 1150, 1200, 1400, 1800. The middle (4th of 7) value is the median = KES 1 150.',
    'A: mode = KES 950 (appears twice). Range = 1 800 - 950 = KES 850.',
    'A: the mean (1 207) is higher than the median (1 150) because the KES 1 800 day pulls it up.',
    'B: sum of f x x = 5 x 1 + 8 x 2 + 4 x 3 + 3 x 4 = 5 + 16 + 12 + 12 = 45. Sum of f = 5 + 8 + 4 + 3 = 20.',
    'B: mean = 45 / 20 = 2.25 mandazi per customer.',
    'Common mistake: finding the median without putting the data in order first, or dividing sum(fx) by the number of rows in the table (4) instead of the total frequency (20).'
  ]
}));

S3.push(P('cbc_g10_ess_s3_2', '3.2 Probability I', {
  pt: 'Measuring Chance: Simple, Complementary, Mutually Exclusive and Independent Events',
  tag: 'Probability is a number from 0 to 1 that measures how likely something is, found by counting favourable outcomes',
  body: 'Probability measures how likely an event is to happen. An experiment is an action with uncertain results, such as picking a mango from a box; each possible result is an outcome; an event is a set of outcomes we are interested in. When all outcomes are equally likely, the probability of an event is P(event) = number of favourable outcomes / total number of outcomes. A probability is always between 0 (impossible) and 1 (certain). The complement of an event is that it does not happen, and P(not A) = 1 - P(A). Two events are mutually exclusive if they cannot happen together, and then P(A or B) = P(A) + P(B). Two events are independent if one does not affect the other, and then P(A and B) = P(A) x P(B). When an item is picked and put back (with replacement), the next pick is independent of the first; when it is not put back, the total changes.',
  f: 'P(A) = favourable / total   |   P(not A) = 1 - P(A)   |   P(A or B) = P(A) + P(B) (exclusive)   |   P(A and B) = P(A) x P(B) (independent)',
  vis: 'A box of mangoes labelled ripe, unripe and rotten with a probability line from 0 to 1',
  ctx: 'A fruit seller picks mangoes from a crate, a raffle at a harambee draws one ticket, and a farmer predicts rain. In each, probability helps decide.',
  q: 'A box holds 20 mangoes, 12 of them ripe. If you pick one without looking, is the chance of ripe closer to 0, to 1/2 or to 1, and how did you decide?',
  exam: 'Finding probabilities by counting, using the complement, applying the addition rule to exclusive events and the product rule to independent events, with and without replacement.',
  steps: [
    'List the outcomes and count the total, because the denominator is every possible outcome.',
    'Count the favourable outcomes for the event, because they form the numerator.',
    'Write the probability as a fraction, simplify and, if useful, convert to a decimal or percentage, because the value must be between 0 and 1.',
    'Use the complement 1 - P(A) when it is easier to count what does not happen, because the two add to 1.',
    'For "A or B" with exclusive events, add the probabilities; for "A and B" with independent events, multiply them, because that is how the counting works out.',
    'For picks without replacement, reduce both the count of that item and the total before the second pick, because the box has changed.'
  ],
  ex: [
    'Problem: A crate has 12 ripe, 5 unripe and 3 rotten mangoes (20 in all). One mango is picked at random. Find P(ripe), P(not ripe), P(ripe or unripe). Then two mangoes are picked, with the first replaced, and later without replacement. Find P(both ripe) each way.',
    'Total outcomes = 12 + 5 + 3 = 20.',
    'P(ripe) = 12/20 = 3/5 = 0.6.',
    'P(not ripe) = 1 - 0.6 = 0.4. Check: (5 + 3)/20 = 8/20 = 0.4.',
    'P(ripe or unripe) = 12/20 + 5/20 = 17/20 = 0.85 (the events are mutually exclusive).',
    'Both ripe, with replacement: 12/20 x 12/20 = 144/400 = 0.36.',
    'Both ripe, without replacement: 12/20 x 11/19 = 132/380 = 33/95 = 0.347 (3 decimal places).',
    'Common mistake: using 12/20 again for the second pick when the mango was not put back, or adding probabilities for an "and" event instead of multiplying.'
  ]
}));

// ===== END S3 =====

module.exports = {
  maps: [MAP],
  retiredIds: ['cbc_g10_emath_s1_1', 'cbc_g10_emath_s2_1']
};
