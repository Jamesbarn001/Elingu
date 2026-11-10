// ══════════════════════════════════════════════════════════════
// KICD CBC GRADE 10 CORE MATHEMATICS
// Aligned to the KICD Core Mathematics Grade 10 design (July 2025):
// 3 strands, 9 sub-strands. Matching topics keep their existing ids and primer
// content; missing ones are new. Topics that belong to other grades or are not
// in the design are listed in retiredIds (hidden, never deleted):
// inequalities and algebraic fractions, area of triangles/polygons/sectors,
// surface area and volume of solids, vectors I, coordinate geometry.
// ══════════════════════════════════════════════════════════════

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps, workedExample) {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: { title: primerTitle, tagline, body, formula, visualBadge, realWorldContext, explanationSteps: steps, workedExample },
    socraticPrompt,
    formulaBadge: formula,
    examFocus
  };
}

const L = (...lines) => lines.join('\n');

const CBC_CORE_MATHS_G10_MAPS = [
  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Mathematics',
    code: 'MATH-G10',
    trackPathway: 'STEM',
    title: 'CBE Grade 10 (Senior STEM) Core Mathematics Metro Line',
    description: 'Grade 10 Core Mathematics aligned to the KICD Core Mathematics design (July 2025): 3 strands and 9 sub-strands.',
    stations: [
      {
        id: 'cbc_g10_math_s1',
        number: 1,
        title: '1.0 Numbers and Algebra',
        strand: 'Strand 1.0: Numbers and Algebra',
        icon: 'ALG',
        status: 'available',
        summary: 'Real numbers and surds, indices and logarithms, and quadratic expressions and equations.',
        subtopics: [
          stop('cbc_g10_math_s1_1', '1.1 Real Numbers', 'Rational Numbers, Surds and Rationalising Denominators', 'Difference of two squares eliminates the irrational root',
            L('Real numbers are every number on the number line. A rational number can be written as a fraction of two whole numbers, such as 3/4 or 0.5 or 7. An irrational number cannot, and its decimal digits never end and never repeat. A root that is irrational is called a surd: for example √2, √5 and √7 are surds, but √9 = 3 is not, because it is a whole number.',
              'A surd such as √5 means the positive number that gives 5 when multiplied by itself, so √5 x √5 = 5. Also √a x √b = √(ab).',
              'Leaving a surd in a denominator is untidy and hard to compute by hand, so we rationalise: we rewrite the fraction so the denominator is a rational number. When the denominator is a single surd like √3, multiply top and bottom by √3. When it is a sum or difference such as √5 + √2, we use its conjugate. The conjugate of a + b is a - b (same two terms, opposite sign in the middle). Multiplying a number by its conjugate gives a difference of two squares: (a + b)(a - b) = a² - b². With surds, the squares of the roots are whole numbers, so the roots vanish.'),
            'c / (√a + √b) = c(√a - √b) / (a - b)', 'Conjugate Cancellation', 'Exact surveyor distances and electrical impedance values left as exact surds before rounding.',
            'Why does multiplying (√5 + √2) by (√5 - √2) result in a whole number without any roots?',
            'Rationalising the denominator and writing the answer as a + b√c.',
            [
              'Step 1: Identify the denominator and write down its conjugate. Reason: the conjugate is the partner that turns the product into a difference of two squares.',
              'Step 2: Multiply the numerator and the denominator by the conjugate. Reason: multiplying top and bottom by the same non-zero number is multiplying by 1, so the value does not change.',
              'Step 3: Expand the denominator as a² - b². Reason: the middle terms cancel, and each square root squares to a whole number.',
              'Step 4: Expand the numerator term by term and simplify any surds. Reason: every term in one bracket must multiply every term in the other.',
              'Step 5: Divide through by the whole-number denominator if possible. Reason: this gives the final form a + b√c.'
            ],
            L('Rationalise 6 / (√5 + √2).',
              'The conjugate of √5 + √2 is √5 - √2.',
              '6 / (√5 + √2) = 6(√5 - √2) / [(√5 + √2)(√5 - √2)]',
              'Denominator: (√5)² - (√2)² = 5 - 2 = 3.',
              'Numerator: 6√5 - 6√2.',
              'So the fraction = (6√5 - 6√2) / 3 = 2√5 - 2√2.',
              'Check: 6 / (2.2361 + 1.4142) = 1.6437, and 2(2.2361) - 2(1.4142) = 1.6437. The values agree.',
              'Common mistake: writing the conjugate of √5 + √2 as -√5 - √2. Only the middle sign changes.')),
          stop('cbc_g10_math_s1_4', '1.2 Indices and Logarithms', 'Powers, Roots and Logarithms as Inverse Partners', 'A logarithm is the power you are looking for',
            L('An index (or power) tells how many times a number is multiplied by itself: 2^5 = 2 x 2 x 2 x 2 x 2 = 32. Here 2 is the base and 5 is the index.',
              'The laws of indices follow from counting factors. a^m x a^n = a^(m+n), because you write m copies then n copies of a. a^m / a^n = a^(m-n). (a^m)^n = a^(mn). a^0 = 1, because a^n / a^n = a^(n-n) = a^0 and any number divided by itself is 1. a^(-n) = 1 / a^n. a^(1/n) is the n-th root of a, so a^(m/n) = (n-th root of a)^m.',
              'A logarithm answers: to what power must the base be raised to give this number? We write log_a N = x to mean a^x = N. So log_2 32 = 5 because 2^5 = 32. Since a logarithm is a power, its laws copy the index laws: log(xy) = log x + log y; log(x/y) = log x - log y; log(x^n) = n log x; log_a a = 1 and log_a 1 = 0.'),
            'a^m x a^n = a^(m+n)   |   log_a N = x  means  a^x = N', 'Power and Log Switch', 'Money in a Sacco that doubles each year, and how many years it takes to reach a target.',
            'If 2^5 = 32, what is the question that log_2 32 is asking, and what is its answer?',
            'Evaluating indices with fractional and negative powers, solving index equations, and simplifying logarithms using the laws.',
            [
              'Step 1: Write every number with the same base where you can. Reason: the laws of indices only work when the bases match.',
              'Step 2: Apply the index law that fits (add when multiplying, subtract when dividing, multiply when raising a power to a power). Reason: each law is just counting repeated factors.',
              'Step 3: To solve an equation with the unknown in the index, make both sides powers of the same base and equate the indices. Reason: if a^x = a^y then x = y.',
              'Step 4: To evaluate a logarithm, rewrite it as a power: log_a N = x means a^x = N. Reason: a logarithm is only a different way to write an index.',
              'Step 5: To combine logs, use the product, quotient and power laws. Reason: they mirror the index laws, because logs are indices.'
            ],
            L('(a) Evaluate 8^(2/3).',
              '8 = 2^3, so 8^(2/3) = (2^3)^(2/3) = 2^(3 x 2/3) = 2^2 = 4.',
              '(b) Solve 3^x = 81.',
              '81 = 3^4, so 3^x = 3^4, hence x = 4.',
              '(c) Simplify log 4 + log 25 (base 10).',
              'log 4 + log 25 = log (4 x 25) = log 100 = 2, because 10^2 = 100.',
              '(d) A Sacco account of KES 1,000 doubles every year. After n years it is 1,000 x 2^n. When is it KES 32,000?',
              '2^n = 32, so n = log_2 32 = 5 years.',
              'Common mistake: writing log (a + b) = log a + log b. The product law is for log (ab), not log (a + b).')),
          stop('cbc_g10_math_s1_2', '1.3 Quadratic Expressions and Equations 1', 'Factorising and Completing the Square', 'Turning ax² + bx + c = 0 into (x + p)² = q',
            L('A quadratic expression has the form ax² + bx + c, where x is the unknown, a, b and c are numbers and a is not zero. A quadratic equation sets it equal to zero; its solutions are called roots.',
              'Expanding a product such as (x + 2)(x + 3) = x² + 5x + 6 multiplies every term of one bracket by every term of the other. Factorising is the reverse: find two numbers that multiply to c and add to b. If the product of two factors is zero, one of them must be zero, so each bracket set to zero gives a root.',
              'Not every quadratic factorises neatly. Completing the square always works. Because (x + p)² = x² + 2px + p², the number to add to x² + bx is (b/2)². Add it to both sides, write the left side as a squared bracket, take the square root of both sides (remembering plus and minus), and solve. Doing this once with letters gives the formula x = (-b ± √(b² - 4ac)) / (2a). The part b² - 4ac is the discriminant: if it is positive there are two roots, if zero one root, if negative no real roots.'),
            'x = (-b ± √(b² - 4ac)) / (2a)', 'Geometric Square Completion', 'Finding the width of a maize plot when its area and the difference of its sides are known.',
            'What does it tell you about the roots of an equation if the discriminant b² - 4ac is negative?',
            'Forming and solving quadratic equations from word problems, showing the method steps for completing the square.',
            [
              'Step 1: Write the equation as ax² + bx + c = 0. Reason: every method needs the zero on one side.',
              'Step 2: If a is not 1, divide every term by a. Reason: completing the square needs the coefficient of x² to be 1.',
              'Step 3: Move the constant to the right side. Reason: the left side must hold only the x terms so we can complete the square.',
              'Step 4: Add (b/2)² to both sides. Reason: this makes the left side a perfect square and keeps the equation balanced.',
              'Step 5: Write the left side as (x + b/2)² and take the square root of both sides, using plus and minus. Reason: both a positive and a negative number square to the same value.',
              'Step 6: Solve for x and reject any root that does not make sense in the problem. Reason: a length cannot be negative.'
            ],
            L('A rectangular maize plot is 4 m longer than it is wide, and its area is 21 square metres. Find its width.',
              'Let the width be x m. Then the length is (x + 4) m and x(x + 4) = 21.',
              'x² + 4x = 21, so x² + 4x - 21 = 0.',
              'Move the constant: x² + 4x = 21.',
              'Add (4/2)² = 4 to both sides: x² + 4x + 4 = 25.',
              'Left side: (x + 2)² = 25.',
              'Take roots: x + 2 = 5 or x + 2 = -5, so x = 3 or x = -7.',
              'A width cannot be negative, so x = 3 m and the length is 7 m.',
              'Check: 3 x 7 = 21. Factorising agrees: (x + 7)(x - 3) = x² + 4x - 21.',
              'Common mistake: forgetting the negative root, or forgetting to add (b/2)² to the right side as well.'))
        ]
      },
      {
        id: 'cbc_g10_math_s2',
        number: 2,
        title: '2.0 Measurements and Geometry',
        strand: 'Strand 2.0: Measurements and Geometry',
        icon: 'GEO',
        status: 'available',
        summary: 'Similarity and enlargement, reflection and congruence, rotation, and trigonometry of right-angled triangles.',
        subtopics: [
          stop('cbc_g10_math_s2_1', '2.1 Similarity and Enlargement', 'Dimensional Scaling Laws', 'Length doubles, area quadruples, volume octuples',
            L('Two shapes are similar if they have the same shape but not necessarily the same size: matching angles are equal and matching sides are in the same ratio. That ratio is the linear scale factor (LSF), for example 3 means every length is three times as long.',
              'An enlargement is a transformation that makes a similar image. It needs a centre (the fixed point) and a scale factor k. Every image point lies on the line from the centre through the object point, at k times the distance from the centre. If k is larger than 1 the image is bigger; if k is between 0 and 1 it is smaller; if k is negative the image is on the opposite side of the centre.',
              'Because area is length times length, the area scale factor is ASF = k². Because volume is length times length times length, the volume scale factor is VSF = k³. This is also why a model at scale 1:10 has 1/1000 of the volume of the real object.'),
            'ASF = (LSF)²,  VSF = (LSF)³', 'Enlargement Rays from a Centre', 'A scale model of a mabati-roofed water tank, or a ground plan drawn at 1:100.',
            'If a model water tank is built at 1:10 linear scale of a real tank, by what factor is its volume reduced?',
            'Finding the image of a shape under enlargement, and using area and volume scale factors.',
            [
              'Step 1: Find the scale factor k as image length divided by object length. Reason: it is the ratio of matching sides.',
              'Step 2: To enlarge a point P about centre C, find the vector from C to P and multiply it by k. Reason: the image lies on the same line from the centre, at k times the distance.',
              'Step 3: Add that new vector to C to get the image coordinates. Reason: the image position is the centre position plus the scaled displacement.',
              'Step 4: For area use k², for volume use k³. Reason: area has two lengths multiplied together and volume has three.'
            ],
            L('Enlarge triangle A(1, 2), B(4, 2), C(4, 4) with centre O(0, 0) and scale factor 3, then compare areas.',
              'A has vector (1, 2); times 3 gives A\'(3, 6).',
              'B has vector (4, 2); times 3 gives B\'(12, 6).',
              'C has vector (4, 4); times 3 gives C\'(12, 12).',
              'Area of ABC = 1/2 x base 3 x height 2 = 3.',
              'Area of A\'B\'C\' = 1/2 x base 9 x height 6 = 27.',
              '27 / 3 = 9 = 3², which confirms ASF = k².',
              'A different centre: enlarge P(2, 3) with centre (1, 1), k = 3. Vector from centre is (1, 2); times 3 is (3, 6); add (1, 1): P\'(4, 7).',
              'Common mistake: multiplying the area by k instead of k². A scale factor of 3 makes the area 9 times larger.')),
          stop('cbc_g10_math_s2_7', '2.2 Reflection and Congruence', 'Mirror Images and Identical Shapes', 'A reflection keeps every length and every angle',
            L('A reflection flips a shape across a line called the mirror line (or axis of reflection). The image is the same distance from the mirror line as the object, on the opposite side, and the line joining a point to its image is perpendicular to the mirror line.',
              'Useful rules for a point (x, y): in the x-axis it becomes (x, -y); in the y-axis (-x, y); in the line y = x it becomes (y, x); in the line y = -x it becomes (-y, -x); in a vertical line x = a it becomes (2a - x, y); in a horizontal line y = b it becomes (x, 2b - y).',
              'Two shapes are congruent if one fits exactly on the other: same size and same shape. A reflection produces a congruent image. Two triangles are congruent if they satisfy one of these: SSS (three sides equal), SAS (two sides and the angle between them equal), ASA (two angles and a side equal), or RHS (right angle, hypotenuse and one other side equal). Three equal angles alone (AAA) only prove similarity, not congruence.'),
            'In x = a:  (x, y) -> (2a - x, y)', 'Mirror Line Symmetry', 'A shop sign reflected in a mirror, or the two matching slopes of a mabati roof.',
            'If a point is 3 units to the left of a vertical mirror line, where is its image, and why must the line between them be perpendicular to the mirror?',
            'Finding image coordinates under reflection and proving triangles congruent with a stated reason.',
            [
              'Step 1: Identify the mirror line (x-axis, y-axis, y = x, x = a, and so on). Reason: the rule depends entirely on the line.',
              'Step 2: Measure the distance from the point to the mirror line. Reason: the image is the same distance away on the other side.',
              'Step 3: Apply the matching rule to each vertex. Reason: a shape is reflected by reflecting its corners.',
              'Step 4: Join the image points in the same order. Reason: this keeps the labelling A to A\' and avoids a twisted shape.',
              'Step 5: To prove congruence, state which three facts match and name the test (SSS, SAS, ASA or RHS). Reason: a mark is awarded for the reason, not only the conclusion.'
            ],
            L('Reflect triangle A(1, 1), B(3, 1), C(3, 4) in the line x = 2.',
              'Rule: (x, y) -> (2(2) - x, y) = (4 - x, y).',
              'A(1, 1) -> A\'(3, 1).',
              'B(3, 1) -> B\'(1, 1).',
              'C(3, 4) -> C\'(1, 4).',
              'Check distance: A is 1 unit left of the line, A\' is 1 unit right of it.',
              'Congruence: AB = 2 and A\'B\' = 2; BC = 3 and B\'C\' = 3; the angle at B is 90 degrees and so is the angle at B\'. Two sides and the included angle match (SAS), so the triangles are congruent.',
              'Common mistake: reflecting in x = 2 as if it were the y-axis, which gives (-x, y). The distance must be measured from the line x = 2.')),
          stop('cbc_g10_math_s2_8', '2.3 Rotation', 'Turning About a Fixed Centre', 'Every point turns through the same angle about the centre',
            L('A rotation turns a shape about a fixed point called the centre of rotation, through a stated angle and in a stated direction (clockwise or anticlockwise). Three things define it: the centre, the angle and the direction. The shape keeps its size, so the image is congruent to the object.',
              'Every point stays the same distance from the centre, so it moves along a circle. A positive angle means anticlockwise by convention.',
              'About the origin, a point (x, y) goes to: (-y, x) for 90 degrees anticlockwise; (-x, -y) for 180 degrees; (y, -x) for 90 degrees clockwise (which is 270 degrees anticlockwise). To rotate about another centre C, subtract C from the point, rotate about the origin, then add C back.'),
            '90 deg anticlockwise about O:  (x, y) -> (-y, x)', 'Rotating Vector from the Centre', 'A matatu steering wheel or a wheel of a boda boda turning about its axle.',
            'If you turn a point through 180 degrees about the origin, why does it matter little whether you turn clockwise or anticlockwise?',
            'Finding the image of a point or shape under rotation, and describing a rotation fully with centre, angle and direction.',
            [
              'Step 1: Write the centre, the angle and the direction. Reason: without all three the rotation is not defined.',
              'Step 2: Subtract the centre from the point to get its position relative to the centre. Reason: the rotation rules work about the origin.',
              'Step 3: Apply the rule, for example (x, y) -> (-y, x) for 90 degrees anticlockwise. Reason: this turns the vector by the stated angle.',
              'Step 4: Add the centre back. Reason: it returns the point to the real grid.',
              'Step 5: Check that the image is the same distance from the centre as the object. Reason: rotation never changes distance from the centre.'
            ],
            L('Rotate P(3, 1) through 90 degrees anticlockwise about C(1, 1).',
              'Relative position: (3 - 1, 1 - 1) = (2, 0).',
              'Rotate 90 degrees anticlockwise: (x, y) -> (-y, x) gives (0, 2).',
              'Add the centre back: (0 + 1, 2 + 1) = (1, 3).',
              'So P\'(1, 3).',
              'Check: distance from C to P is 2, distance from C to P\' is 2. The angle from CP (pointing right) to CP\' (pointing up) is 90 degrees anticlockwise.',
              'Common mistake: using (y, -x) and getting the clockwise result (1, -1) when the question says anticlockwise.')),
          stop('cbc_g10_math_s2_2', '2.4 Trigonometry 1', 'Sine, Cosine and Tangent in Right-Angled Triangles', 'Opposite, adjacent and hypotenuse: the ratios that never change',
            L('In a right-angled triangle, pick one acute angle, called θ. The hypotenuse is the longest side, opposite the right angle. The opposite side faces θ, and the adjacent side touches θ (and is not the hypotenuse).',
              'For any right-angled triangle with the same angle θ, the ratio of two sides is always the same, whatever the size. These ratios are named: sin θ = opposite / hypotenuse, cos θ = adjacent / hypotenuse, tan θ = opposite / adjacent. A memory aid is SOH CAH TOA.',
              'Exact values worth knowing: sin 30 = 1/2, cos 60 = 1/2, sin 45 = cos 45 = √2/2, tan 45 = 1, sin 60 = cos 30 = √3/2. Also sin²θ + cos²θ = 1 by Pythagoras. An angle of elevation is measured upward from the horizontal to the line of sight; an angle of depression is measured downward from the horizontal.'),
            'sin θ = O/H,  cos θ = A/H,  tan θ = O/A', 'Reference Triangle with Labelled Sides', 'Finding the height of a Safaricom mast, or the slope of a ladder, without climbing.',
            'If the angle of elevation of the top of a tree from 20 m away is 45 degrees, what is the height of the tree, and why does tan 45 help?',
            'Using SOH CAH TOA to find a missing side or angle, including angles of elevation and depression.',
            [
              'Step 1: Sketch the triangle and mark the right angle and the angle θ. Reason: a picture shows which side is which.',
              'Step 2: Label the sides opposite, adjacent and hypotenuse relative to θ. Reason: the labels depend on which angle you chose.',
              'Step 3: Choose the ratio that includes the side you know and the side you want. Reason: each ratio links exactly two sides.',
              'Step 4: Write the equation and solve. To find a side multiply or divide; to find an angle use the inverse function (sin⁻¹, cos⁻¹, tan⁻¹). Reason: the inverse undoes the ratio.',
              'Step 5: Check that the hypotenuse is the longest side. Reason: a quick test for a wrong answer.'
            ],
            L('(a) From a point 40 m from the base of a mast, the angle of elevation of its top is 35 degrees. Find the height.',
              'Known side: adjacent = 40. Wanted: opposite = h. The ratio with opposite and adjacent is tan.',
              'tan 35 = h / 40, so h = 40 x tan 35 = 40 x 0.7002 = 28.0 m.',
              '(b) A 5 m ladder reaches 4.5 m up a wall. Find the angle it makes with the ground.',
              'Known: opposite = 4.5, hypotenuse = 5, so use sine. sin θ = 4.5 / 5 = 0.9.',
              'θ = sin⁻¹(0.9) = 64.2 degrees.',
              'Check: the adjacent side is √(25 - 20.25) = √4.75 = 2.18 m, and cos 64.2 = 0.436, so 5 x 0.436 = 2.18 m. Agreed.',
              'Common mistake: calculator in radian mode, or using tan when the hypotenuse is given.'))
        ]
      },
      {
        id: 'cbc_g10_math_s3',
        number: 3,
        title: '3.0 Statistics and Probability',
        strand: 'Strand 3.0: Statistics and Probability',
        icon: 'STAT',
        status: 'available',
        summary: 'Grouped data, measures of centre and spread, and probability of single and combined events.',
        subtopics: [
          stop('cbc_g10_math_s3_2', '3.1 Statistics I', 'Summarising Grouped Data', 'The mean balances the total; the median splits the data in half',
            L('Raw data are the values as collected. When there are many, we group them into classes (for example 10 to under 20) and count how many fall in each class; that count is the frequency (f). The class midpoint (x) is the middle value of a class and stands in for every value in it.',
              'The mean of grouped data is the sum of f times x, divided by the sum of f. An assumed mean A cuts the arithmetic: use d = x - A, then mean = A + (sum of fd) / (sum of f). The median is the middle value; it is found from the cumulative frequency (cf), the running total of frequencies. The quartiles split the data into four equal parts: Q1 at n/4, Q2 (the median) at n/2, Q3 at 3n/4. The interquartile range is Q3 - Q1.',
              'Within the class that holds the required position, a value is estimated by: L + [(position - cf before) / f of the class] x class width, where L is the lower boundary of the class. An ogive is the graph of cumulative frequency against upper class boundaries; it is plotted at upper boundaries because the running total is only complete once the whole class has been counted.'),
            'Mean = A + Σfd / Σf   |   Median = L + [(n/2 - cf) / f] x i', 'Cumulative Frequency Curve', 'Daily customers at a Mama Mboga stall over 25 days.',
            'Why must a cumulative frequency curve be plotted using upper class boundaries rather than class midpoints?',
            'Calculating the mean using an assumed mean, estimating the median and quartiles, and reading values from an ogive.',
            [
              'Step 1: Find the midpoint x of each class. Reason: it is the best single value to represent the class.',
              'Step 2: Calculate fx, or d = x - A and fd with an assumed mean A. Reason: the products add up the estimated total.',
              'Step 3: Divide the total by the sum of frequencies. Reason: the mean is total divided by count.',
              'Step 4: Build the cumulative frequency column. Reason: it shows how many values lie at or below each class end.',
              'Step 5: Find the class containing position n/2 (or n/4, 3n/4) and apply the interpolation formula. Reason: we assume values are spread evenly inside the class.'
            ],
            L('Customers served at a stall over 25 days:',
              'Class 0-10: f = 4, 10-20: f = 6, 20-30: f = 10, 30-40: f = 5. Σf = 25.',
              'Midpoints x: 5, 15, 25, 35. Take assumed mean A = 25; d = -20, -10, 0, 10.',
              'fd = -80, -60, 0, 50; Σfd = -90.',
              'Mean = 25 + (-90 / 25) = 25 - 3.6 = 21.4. Direct check: Σfx = 20 + 90 + 250 + 175 = 535 and 535 / 25 = 21.4.',
              'cf: 4, 10, 20, 25.',
              'Median: position 12.5 lies in the class 20-30. Median = 20 + (12.5 - 10) / 10 x 10 = 22.5.',
              'Q1: position 6.25 in class 10-20: 10 + (6.25 - 4) / 6 x 10 = 13.75.',
              'Q3: position 18.75 in class 20-30: 20 + (18.75 - 10) / 10 x 10 = 28.75.',
              'Interquartile range = 28.75 - 13.75 = 15.',
              'Common mistake: plotting the ogive at midpoints, or using the class frequency instead of the cumulative frequency before the class.')),
          stop('cbc_g10_math_s3_3', '3.2 Probability 1', 'Measuring Uncertainty and Tree Diagrams', 'OR adds for exclusive events; AND multiplies for independent ones',
            L('Probability measures how likely an event is, as a number from 0 (impossible) to 1 (certain). For equally likely outcomes, P(event) = number of favourable outcomes / total number of outcomes. The set of all possible outcomes is the sample space.',
              'Two events are mutually exclusive if they cannot happen together, so P(A or B) = P(A) + P(B). Two events are independent if one does not change the chance of the other, so P(A and B) = P(A) x P(B). Events with and without replacement matter: if a drawn item is put back, the next draw is independent; if not, the total (and possibly the favourable count) is smaller on the second draw.',
              'A tree diagram lists every outcome of a sequence of stages. Multiply along a branch to get the probability of that path. Add the paths that belong to the event. The probability that an event does not happen is 1 minus P(event); this is useful for "at least one".'),
            'P(A or B) = P(A) + P(B)  |  P(A and B) = P(A) x P(B)', 'Two-Stage Tree Diagram', 'Drawing tomatoes from a box at Mama Mboga\'s stall, or checking tea packets for defects.',
            'When drawing two items from a bag without replacement, why do the denominators on the second set of branches decrease by 1?',
            'Constructing tree diagrams with and without replacement, and "at least one" probabilities.',
            [
              'Step 1: List the stages and the outcomes at each stage. Reason: the tree must show every possible path.',
              'Step 2: Write the probability on each branch; check they add to 1 at each split. Reason: one of the outcomes must happen.',
              'Step 3: For no replacement, reduce the total (and the matching count) for the second stage. Reason: the item drawn first has been removed.',
              'Step 4: Multiply along each path. Reason: the second event happens given the first, so AND means multiply.',
              'Step 5: Add the paths that make up the event, or use 1 minus the complement. Reason: separate paths cannot happen together, so OR means add.'
            ],
            L('A box has 5 ripe and 3 unripe tomatoes. Two are taken without replacement. Find P(both ripe) and P(at least one unripe).',
              'First draw: P(ripe) = 5/8, P(unripe) = 3/8.',
              'If the first was ripe, 4 ripe remain out of 7: P(ripe) = 4/7, P(unripe) = 3/7.',
              'If the first was unripe, 5 ripe remain out of 7: P(ripe) = 5/7, P(unripe) = 2/7.',
              'P(both ripe) = 5/8 x 4/7 = 20/56 = 5/14.',
              'P(at least one unripe) = 1 - 5/14 = 9/14.',
              'Check by adding paths: P(RU) = 5/8 x 3/7 = 15/56; P(UR) = 3/8 x 5/7 = 15/56; P(UU) = 3/8 x 2/7 = 6/56. Sum = 36/56 = 9/14. Agreed.',
              'Common mistake: keeping the denominator 8 on the second draw when no replacement is made.'))
        ]
      }
    ]
  }
];

const RETIRED_IDS = [
  'cbc_g10_math_s1_3',
  'cbc_g10_math_s2_3',
  'cbc_g10_math_s2_4',
  'cbc_g10_math_s3_1',
  'cbc_g10_math_s2_6'
];

module.exports = { maps: CBC_CORE_MATHS_G10_MAPS, retiredIds: RETIRED_IDS };
