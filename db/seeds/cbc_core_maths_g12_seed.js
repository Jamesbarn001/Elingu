'use strict';
// ══════════════════════════════════════════════════════════════
// CBC SENIOR SCHOOL CORE MATHEMATICS, GRADE 12
// Four strands and fourteen sub-strands, following the KICD Core Mathematics
// Grade 12 design (see docs/audits/kicd_verified_from_site.md).
// Replaces the short Grade 12 map in cbc_math_seed.js (same code MATH-G12).
// Kept ids: cbc_g12_math_s1_1 (4.2), cbc_g12_math_s2_1 (4.1), cbc_g12_math_s3_1 (2.7).
// Plain text only: no emoji.
// ══════════════════════════════════════════════════════════════

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps, workedExample) {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: primerTitle,
      tagline,
      body,
      formula: formula || null,
      visualBadge,
      realWorldContext,
      explanationSteps: steps,
      workedExample
    },
    socraticPrompt,
    formulaBadge: formula || null,
    examFocus
  };
}

function P(id, title, o) {
  return stop(
    id, title, o.pt, o.tag, o.body, o.f || null, o.vis, o.ctx, o.q, o.exam,
    o.steps.map((s, i) => `Step ${i + 1}: ${s}`),
    o.ex.join('\n')
  );
}

const MAP = {
  curriculum: 'CBC',
  grade: 12,
  subject: 'Mathematics',
  code: 'MATH-G12',
  trackPathway: 'STEM',
  title: 'CBE Grade 12 (Senior School) Core Mathematics Metro Line',
  description: 'Grade 12 Core Mathematics with four strands and fourteen sub-strands, following the KICD Core Mathematics Grade 12 design.',
  notes: 'Strand and sub-strand names follow the KICD Grade 12 Core Mathematics design.',
  stations: [
    // ───────────────────────── STRAND 1: NUMBERS AND ALGEBRA ─────────────────────────
    {
      id: 'cbc_g12_math_s2',
      number: 1,
      title: '1.0 Numbers and Algebra',
      strand: 'Strand 1: Numbers and Algebra',
      status: 'available',
      summary: 'Sets and Venn diagrams, binomial expansions, compound proportions, rates of work and mixtures, and linear programming.',
      subtopics: [
        P('cbc_g12_math_s2_2', '1.1 Sets', {
          pt: 'Counting with Venn Diagrams, Including Three Sets',
          tag: 'Count each region once: add the sets, then take away what was counted twice',
          body: 'A set is a collection of distinct objects. The universal set, written with the symbol for xi, is everything under discussion. n(A) means the number of elements in set A. The union A U B is everything in A or B or both. The intersection A n B is only what is in both. The complement A\' is everything in the universal set that is not in A. A Venn diagram draws each set as a closed shape, and every region of the picture is a different group of elements. When two sets overlap, the elements in the overlap are counted once inside n(A) and once inside n(B), so adding n(A) + n(B) counts them twice. That is why n(A U B) = n(A) + n(B) - n(A n B). For three sets, the same reasoning gives an extra correction at the middle.',
          f: 'n(A U B) = n(A) + n(B) - n(A n B)  |  n(A U B U C) = n(A) + n(B) + n(C) - n(A n B) - n(B n C) - n(A n C) + n(A n B n C)',
          vis: 'Three overlapping circles inside a rectangle, with the middle region filled first',
          ctx: 'A county agricultural officer surveys 65 farmers in Kiambu on which crops they plant: maize, beans, kale. Many plant two or three, so simply adding the three crop totals would count the same farmer several times.',
          q: 'If 30 learners play football and 20 play volleyball, and 8 play both, how many play at least one game, and why is the answer not 50?',
          exam: 'Drawing a three-set Venn diagram from given totals, filling it from the middle region outward, and finding the number in exactly one, exactly two or none of the sets.',
          steps: [
            'Draw a rectangle for the universal set and one overlapping circle for each set, because every possible combination of memberships needs its own region.',
            'Fill the region common to all three sets first, because the other overlaps are defined by subtracting from it.',
            'Fill each region that is in exactly two sets: take the given pair total and subtract the middle region, because the pair total already includes the middle.',
            'Fill each region that is in exactly one set: take the set total and subtract the three regions already inside that circle, because the set total counts every region in its circle.',
            'Add all the regions inside the circles to get n(A U B U C), then subtract from n of the universal set to get those in none, because everything outside the circles belongs to no set.',
            'Check that all regions, including the outside, add to the universal total, because a Venn diagram must account for every element once.'
          ],
          ex: [
            'Problem: Of 65 farmers, 34 plant maize (M), 28 plant beans (B) and 22 plant kale (K). 12 plant maize and beans, 9 plant beans and kale, 8 plant maize and kale, and 5 plant all three. Find how many plant exactly one crop and how many plant none.',
            'Middle region (all three): 5.',
            'Maize and beans only: 12 - 5 = 7. Beans and kale only: 9 - 5 = 4. Maize and kale only: 8 - 5 = 3.',
            'Maize only: 34 - 5 - 7 - 3 = 19. Beans only: 28 - 5 - 7 - 4 = 12. Kale only: 22 - 5 - 4 - 3 = 10.',
            'Exactly one crop: 19 + 12 + 10 = 41.',
            'Inside the circles: 5 + 7 + 4 + 3 + 19 + 12 + 10 = 60. Check with the formula: 34 + 28 + 22 - 12 - 9 - 8 + 5 = 60.',
            'None of the crops: 65 - 60 = 5.',
            'Answer: 41 farmers plant exactly one crop and 5 plant none.',
            'Common mistake: writing 12 in the maize-and-beans region. The 12 includes the 5 who plant all three, so only 7 belong in that region alone.'
          ]
        }),
        P('cbc_g12_math_s2_3', '1.2 Binomial Expansions', {
          pt: 'Expanding (a + b) to the Power n with Pascal\'s Triangle',
          tag: 'The coefficients come from Pascal\'s triangle, the powers run down one and up the other',
          body: 'A binomial is an expression with two terms, such as (1 + 2x). Expanding (a + b)^n means multiplying it by itself n times and collecting like terms. Doing this for small n shows a pattern. The powers of a fall from n to 0 while the powers of b rise from 0 to n, so every term has total power n. The coefficients are the row of Pascal\'s triangle, where each number is the sum of the two above it: row 5 is 1, 5, 10, 10, 5, 1. The coefficient of the term with b^r can also be written C(n, r) = n! / (r!(n - r)!), which counts the ways to choose r of the n brackets to supply a b. When b is a small number, the first few terms give a very good approximation of a power.',
          f: '(a + b)^n = a^n + C(n,1)a^(n-1)b + C(n,2)a^(n-2)b^2 + ... + b^n  |  C(n,r) = n! / (r!(n-r)!)',
          vis: 'Pascal\'s triangle with one row highlighted',
          ctx: 'A SACCO member deposits KES 1 000 that grows by 2% each year. After 5 years the amount is 1 000 x (1.02)^5, and the binomial expansion shows how the 2% grows into the final figure term by term.',
          q: 'In (a + b)^3, how many different ways can you pick b from exactly two of the three brackets, and what does that tell you about the coefficient of a b^2?',
          exam: 'Expanding (a + bx)^n for n up to 6, finding a stated term, and using the first terms to approximate a power such as (1.02)^5 to a given number of decimal places.',
          steps: [
            'Write the row of Pascal\'s triangle for the power n, because it gives the coefficients in order.',
            'Write the powers of the first term falling from n to 0 and the powers of the second term rising from 0 to n, because each term must have total power n.',
            'Put each whole term in brackets before raising to a power, for example (2x)^2 = 4x^2, because the number and the letter are both squared.',
            'Multiply coefficient, first part and second part for each term, because a term is the product of all three.',
            'For an approximation, replace x by its small value and add terms until the next term cannot change the required decimal places, because the terms shrink quickly.'
          ],
          ex: [
            'Problem: Expand (1 + 2x)^5 up to the term in x^3, and use x = 0.01 to estimate (1.02)^5 to 4 decimal places.',
            'Row 5 of Pascal\'s triangle: 1, 5, 10, 10, 5, 1.',
            'Term 1: 1 x 1^5 x (2x)^0 = 1.',
            'Term 2: 5 x 1^4 x (2x)^1 = 10x.',
            'Term 3: 10 x 1^3 x (2x)^2 = 10 x 4x^2 = 40x^2.',
            'Term 4: 10 x 1^2 x (2x)^3 = 10 x 8x^3 = 80x^3.',
            'So (1 + 2x)^5 = 1 + 10x + 40x^2 + 80x^3 + ...',
            'Put x = 0.01, so 1 + 2x = 1.02: 1 + 10(0.01) + 40(0.0001) + 80(0.000001) = 1 + 0.1 + 0.004 + 0.00008 = 1.10408.',
            'The next term is 80x^4 = 0.0000008, too small to change the fourth decimal place.',
            'Answer: (1.02)^5 is approximately 1.1041 (4 decimal places).',
            'Common mistake: forgetting to raise the number in 2x to the power, writing 10 x 1 x 2x^2 = 20x^2 instead of 10 x (2x)^2 = 40x^2.'
          ]
        }),
        P('cbc_g12_math_s2_4', '1.3 Compound Proportions, Rates of Work and Mixtures', {
          pt: 'Combining Several Proportions, Work Rates and Mixing Prices',
          tag: 'Change one quantity at a time and decide whether each change makes the answer bigger or smaller',
          body: 'Two quantities are in direct proportion when doubling one doubles the other, and in inverse proportion when doubling one halves the other. A compound proportion involves more than one such relationship at once. The method is to start with the known answer and multiply by one fraction for each quantity that changes, choosing the fraction that makes the answer larger or smaller as common sense demands. A rate of work is the fraction of a job done in one unit of time. If a pump fills a tank in 6 hours, its rate is 1/6 of the tank per hour. When machines work together their rates add. A mixture of two ingredients with different prices per kilogram has a mean price per kilogram equal to the total cost divided by the total mass.',
          f: 'Rate = 1 / (time for whole job)  |  Combined rate = sum of rates  |  Mixture price = total cost / total mass',
          vis: 'Two pumps feeding one tank, and two heaps of tea leaves being blended',
          ctx: 'A Kericho tea blender mixes two grades of tea bought at different prices per kilogram and must decide the selling price per kilogram that gives a 20% profit.',
          q: 'If 8 workers need 9 days for a job, will 12 workers need more or fewer days, and by what fraction should you multiply 9?',
          exam: 'Compound proportion with workers, days and amount of work; two or more pipes or workers filling or completing a job together; finding the price of a mixture or the ratio in which two items must be mixed to get a given price.',
          steps: [
            'Write what is known in one line: the quantities and the time or amount that go with them, because every later fraction is applied to this starting answer.',
            'For each quantity that changes, decide direct or inverse by asking whether the answer should grow or shrink, because that fixes which way the fraction is written.',
            'Multiply the starting answer by one fraction for each changed quantity, because the effects of independent changes multiply.',
            'For rates of work, write each rate as 1 over its time, add the rates, then invert the total to get the combined time, because rates of independent workers add but times do not.',
            'For mixtures, find the total cost of each ingredient (mass x price per kg), add them, and divide by the total mass, because the mean price is cost per kilogram of the whole.',
            'To find a mixing ratio from a target price, set up the total cost equal to the target price times the total mass and solve for the ratio, because the cost of the mixture must match.'
          ],
          ex: [
            'Part A, compound proportion. 8 workers dig 6 plots in 9 days. How many days for 12 workers to dig 10 plots?',
            'More workers means fewer days: multiply by 8/12. More plots means more days: multiply by 10/6.',
            'Days = 9 x (8/12) x (10/6) = 9 x 0.6667 x 1.6667 = 10 days.',
            'Part B, rates of work. Pump A fills a tank in 6 hours, pump B in 12 hours. Together:',
            'Rate of A = 1/6 per hour, rate of B = 1/12 per hour. Combined rate = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4 per hour.',
            'Time together = 1 / (1/4) = 4 hours.',
            'Part C, mixtures. 30 kg of tea at KES 200 per kg is mixed with 20 kg at KES 250 per kg.',
            'Total cost = 30 x 200 + 20 x 250 = 6 000 + 5 000 = 11 000. Total mass = 50 kg. Mean cost = 11 000 / 50 = KES 220 per kg.',
            'Selling for 20% profit: 220 x 1.2 = KES 264 per kg.',
            'Mixing ratio for KES 230: let x kg of the KES 200 tea mix with y kg of the KES 250 tea. 200x + 250y = 230(x + y), so 20y = 30x, and x : y = 2 : 3. Check: 200(2) + 250(3) = 1 150 = 230 x 5.',
            'Common mistake: adding the times for the pumps (6 + 12 = 18 hours). Together they are faster than either alone, so the answer must be less than 6 hours. Add the rates, not the times.'
          ]
        }),
        P('cbc_g12_math_s2_5', '1.4 Linear Programming', {
          pt: 'Choosing the Best Plan Inside a Region of Constraints',
          tag: 'The best value of a linear objective always lies at a corner of the feasible region',
          body: 'Linear programming finds the best way to use limited resources. A constraint is a limit written as a linear inequality, such as x + y <= 10 for an area of 10 acres. Plotting all constraints and shading the points that satisfy every one of them leaves the feasible region, a polygon whose corners are called vertices. The objective function is the quantity to be made as large or as small as possible, for example profit P = 8 000x + 6 000y. Because the objective is a straight-line function, its largest and smallest values on the polygon occur at a vertex, never in the middle. So we find every vertex, evaluate the objective at each, and pick the best. A vertex is found by solving the two boundary-line equations that meet there simultaneously.',
          f: 'Objective: P = ax + by  |  Evaluate P at each vertex of the feasible region',
          vis: 'Shaded polygon on a graph with the objective line sliding to the farthest vertex',
          ctx: 'A farmer in Nakuru has 10 acres and enough labour for 14 units of work. Maize and beans earn different profit per acre and need different labour, so she must decide how many acres of each to plant.',
          q: 'If the profit line 8 000x + 6 000y = 40 000 is moved parallel to itself further from the origin, where does it last touch the shaded region, and why is that never the middle?',
          exam: 'Forming inequalities from a word problem, drawing and shading the feasible region on a graph, reading the vertices, and finding the maximum profit or minimum cost.',
          steps: [
            'Define x and y clearly with units, because the inequalities must refer to named quantities.',
            'Translate each limit into an inequality, including x >= 0 and y >= 0, because quantities of crops cannot be negative.',
            'Draw each boundary line by finding two points on it, and shade the side that satisfies the inequality, because the feasible region is where all shadings overlap.',
            'Find the vertices of the region by reading the graph and confirming them by solving the pairs of boundary equations, because a graph reading can be slightly off.',
            'Substitute each vertex into the objective function, because the optimum is at a vertex.',
            'State the best vertex and the value of the objective with units, because the question asks for a decision, not only a number.'
          ],
          ex: [
            'Problem: A farmer plants x acres of maize and y acres of beans. Land: at most 10 acres. Labour: maize needs 2 units per acre and beans 1 unit per acre, with 14 units available. Profit is KES 8 000 per acre of maize and KES 6 000 per acre of beans. Find the plan giving maximum profit.',
            'Inequalities: x + y <= 10 (land), 2x + y <= 14 (labour), x >= 0, y >= 0. Objective: P = 8 000x + 6 000y.',
            'Land line x + y = 10 passes through (10, 0) and (0, 10). Labour line 2x + y = 14 passes through (7, 0) and (0, 14).',
            'Vertices: (0, 0); (7, 0) on the x-axis where 2x + y = 14; (0, 10) on the y-axis where x + y = 10 (the labour limit 14 is not reached there); and the point where both lines meet.',
            'Meeting point: subtract x + y = 10 from 2x + y = 14 to get x = 4, so y = 6. The vertex is (4, 6).',
            'P(0, 0) = 0. P(7, 0) = 56 000. P(0, 10) = 60 000. P(4, 6) = 8 000(4) + 6 000(6) = 32 000 + 36 000 = 68 000.',
            'Answer: plant 4 acres of maize and 6 acres of beans for a maximum profit of KES 68 000.',
            'Common mistake: choosing the vertex that looks highest on the graph, or a point inside the region such as (5, 5). Always evaluate every vertex.'
          ]
        })
      ]
    },

    // ───────────────────────── STRAND 2: MEASUREMENTS AND GEOMETRY ─────────────────────────
    {
      id: 'cbc_g12_math_s3',
      number: 2,
      title: '2.0 Measurements and Geometry',
      strand: 'Strand 2: Measurements and Geometry',
      status: 'available',
      summary: 'Matrices and the area of transformed shapes, approximations and error bounds, loci, three-dimensional geometry, trigonometry (III), vectors II and navigation.',
      subtopics: [
        P('cbc_g12_math_s3_2', '2.1 Matrices and Transformations Area', {
          pt: 'The Determinant as the Area Scale Factor',
          tag: 'A transformation matrix multiplies every area by the size of its determinant',
          body: 'A transformation moves every point of a shape to a new place. A 2 x 2 matrix [[a, b], [c, d]] sends a point (x, y) to (ax + by, cx + dy). The determinant of the matrix is ad - bc. Imagine the unit square with corners (0,0), (1,0), (0,1), (1,1), which has area 1. The matrix sends it to a parallelogram whose area is |ad - bc|, so the determinant tells how much the matrix stretches area. Because every shape can be built from tiny unit squares, the area of the image equals |determinant| x area of the object. A negative determinant means the shape is also flipped, as in a reflection, but the area is the positive number. A determinant of zero squashes the shape onto a line, so the area is zero.',
          f: 'Area of image = |det| x area of object  |  det [[a,b],[c,d]] = ad - bc',
          vis: 'Unit square sheared into a parallelogram, with its area labelled |ad - bc|',
          ctx: 'A surveyor enlarges a map of a shamba. A scale factor of k on lengths changes areas by k squared, which is the determinant of the enlargement matrix [[k, 0], [0, k]].',
          q: 'A matrix has determinant 5. If a triangle of area 3 is transformed by it, what area should the image have, and what would a determinant of 0 do to the triangle?',
          exam: 'Finding the image of a triangle or quadrilateral under a given matrix, and using the determinant to find an area; finding the object area from the image area.',
          steps: [
            'Write the matrix and compute its determinant ad - bc, because the determinant is the area scale factor.',
            'Find the area of the object by the base-and-height method or the coordinate formula, because the scale factor multiplies this.',
            'Multiply the object area by the absolute value of the determinant, because area cannot be negative.',
            'To find the image corners, multiply the matrix by each position vector in turn, because the matrix acts on one point at a time.',
            'Check by finding the area of the image directly from its corners, because the two methods must agree.'
          ],
          ex: [
            'Problem: Triangle ABC has A(1, 1), B(4, 1) and C(1, 3). It is transformed by the matrix M = [[3, 1], [1, 2]]. Find the image and its area.',
            'Determinant: 3 x 2 - 1 x 1 = 6 - 1 = 5.',
            'Area of the object: base AB = 3, height AC = 2, so area = (1/2) x 3 x 2 = 3 square units.',
            'Area of the image = 5 x 3 = 15 square units.',
            'Image of A: (3 x 1 + 1 x 1, 1 x 1 + 2 x 1) = (4, 3).',
            'Image of B: (3 x 4 + 1 x 1, 1 x 4 + 2 x 1) = (13, 6).',
            'Image of C: (3 x 1 + 1 x 3, 1 x 1 + 2 x 3) = (6, 7).',
            'Check: area from the corners A\'(4, 3), B\'(13, 6), C\'(6, 7) = (1/2)|(13 - 4)(7 - 3) - (6 - 4)(6 - 3)| = (1/2)|36 - 6| = 15. It agrees.',
            'Common mistake: using the determinant without the absolute value. A determinant of -5 still gives an area scale factor of 5.'
          ]
        }),
        P('cbc_g12_math_s3_3', '2.2 Approximations', {
          pt: 'Absolute, Relative and Percentage Error and Their Bounds',
          tag: 'A measurement given to a stated accuracy lies between a lower and an upper bound',
          body: 'Every measurement is rounded, so it is only approximately true. A length given as 12.4 cm to the nearest 0.1 cm could really be anywhere from 12.35 cm up to just below 12.45 cm: the lower bound is half a unit below and the upper bound half a unit above. The absolute error is the difference between the true and the approximate value, and its largest possible size is half the unit of rounding. The relative error is the absolute error divided by the approximate value, and the percentage error is the relative error multiplied by 100. When measurements are combined, the biggest possible result uses the upper bounds of values being multiplied, and the smallest uses the lower bounds. For subtraction and division, the upper bound of the first is paired with the lower bound of the second to get the biggest result.',
          f: 'Absolute error = |true - approximate|  |  Relative error = absolute error / approximate value  |  Percentage error = relative error x 100%',
          vis: 'Number line showing 12.35, 12.4 and 12.45 with shaded tolerance',
          ctx: 'A tailor at Gikomba measures a cloth 12.4 m by 7.5 m, each to the nearest 0.1 m. The area she quotes to a customer could be higher or lower than the true area.',
          q: 'A rod measured as 12.4 cm to the nearest 0.1 cm: what are the smallest and largest values the true length can have, and why is it half of 0.1 on each side?',
          exam: 'Finding bounds of a measurement, the maximum and minimum area or perimeter, and the percentage error in a calculated result.',
          steps: [
            'Identify the unit of rounding (for example 0.1 cm) and halve it, because the true value is within half a unit of the stated one.',
            'Write the lower and upper bounds of each measurement as the stated value minus and plus half a unit, because those are the extremes.',
            'For a product, multiply lower bounds for the minimum and upper bounds for the maximum, because larger inputs give a larger product.',
            'Find the absolute error as the largest difference between the calculated value and either bound, because the error is measured from the stated result.',
            'Divide by the calculated value and multiply by 100 for the percentage error, because percentage error compares the error to the size of the result.'
          ],
          ex: [
            'Problem: A rectangle measures 12.4 cm by 7.5 cm, each to the nearest 0.1 cm. Find the least and greatest possible area and the percentage error in the calculated area.',
            'Half the rounding unit = 0.05. Length is between 12.35 and 12.45. Width is between 7.45 and 7.55.',
            'Calculated area = 12.4 x 7.5 = 93.0 cm^2.',
            'Least area = 12.35 x 7.45 = 92.0075 cm^2.',
            'Greatest area = 12.45 x 7.55 = 93.9975 cm^2.',
            'Greatest absolute error = 93.9975 - 93.0 = 0.9975 cm^2 (the lower side gives 93.0 - 92.0075 = 0.9925, which is smaller).',
            'Percentage error = (0.9975 / 93.0) x 100 = 1.07% (to 2 decimal places).',
            'Common mistake: working out the area bounds from 12.4 +/- 0.1. Half the rounding unit is 0.05, not 0.1.'
          ]
        }),
        P('cbc_g12_math_s3_4', '2.3 Loci', {
          pt: 'Sets of Points That Obey a Rule',
          tag: 'A locus is the path of all points satisfying one condition, and intersecting loci pins down a position',
          body: 'A locus (plural loci) is the set of all points that satisfy a given condition. Four basic loci are used. Points a fixed distance from a point form a circle. Points a fixed distance from a line form two parallel lines, one on each side. Points equidistant from two fixed points form the perpendicular bisector of the line joining them. Points equidistant from two intersecting lines form the bisector of the angle between them. To find a position that obeys two conditions at once, draw each locus and mark where they cross. In constructions, use compasses and a ruler, and keep the construction arcs visible. When coordinates are given, each locus has an equation and the crossing is found by solving them together.',
          f: 'Circle: distance = r  |  Perpendicular bisector: PA = PB  |  Angle bisector: equal distance to both lines',
          vis: 'Rectangle with a perpendicular bisector line and a circle drawn from a corner crossing at the required point',
          ctx: 'A borehole is to be dug on a rectangular plot so that it is equally far from two corner beacons and a fixed distance from a third. The place that satisfies both rules is where two loci cross.',
          q: 'If a goat is tied to a post with a 10 m rope, what shape does it trace, and what extra rule would you need to say exactly where on that shape the goat stands?',
          exam: 'Constructing loci with a ruler and compasses, shading regions defined by several loci, and finding the position that satisfies two conditions.',
          steps: [
            'State each condition in words as a standard locus, for example equidistant from A and B, because that tells you which construction to use.',
            'Draw or construct each locus lightly, with construction arcs showing, because the marks are part of the answer.',
            'Mark the point or points where the loci cross, because each crossing satisfies all the conditions.',
            'If coordinates are given, write each locus as an equation and solve them together, because that gives the position exactly.',
            'Check the point against each original condition, because a locus that is drawn badly can give a wrong crossing.'
          ],
          ex: [
            'Problem: Rectangular plot ABCD has A(0, 0), B(12, 0), C(12, 8), D(0, 8) in metres. A borehole P is equidistant from A and B and 10 m from A. Find P.',
            'Equidistant from A and B: the perpendicular bisector of AB, the line x = 6.',
            'Exactly 10 m from A: the circle x^2 + y^2 = 100.',
            'Substitute x = 6: 36 + y^2 = 100, so y^2 = 64 and y = 8 (y = -8 lies outside the plot).',
            'P = (6, 8), the midpoint of side DC.',
            'Check: PA = sqrt(6^2 + 8^2) = sqrt(100) = 10 and PB = sqrt((12 - 6)^2 + 8^2) = 10. Both conditions hold.',
            'Common mistake: stopping at the construction without checking that the crossing lies inside the plot. Only points inside the plot are valid.'
          ]
        }),
        P('cbc_g12_math_s3_5', '2.4 Three dimensional Geometry', {
          pt: 'Angles Between Lines and Planes in a Solid',
          tag: 'Turn every 3D angle into a right-angled triangle drawn flat',
          body: 'A plane is a flat surface that goes on forever, such as the floor of a room. The angle between a line and a plane is the angle between the line and its projection (its shadow) on the plane. The angle between two planes is the angle between two lines, one in each plane, both drawn at right angles to the line where the planes meet. In every case the solution method is the same: find a right angle, pull out the triangle that contains it, and use Pythagoras or trigonometry on that triangle. In a cuboid, the diagonal of the base is found first by Pythagoras, and the space diagonal then forms the hypotenuse of a second right-angled triangle standing on it.',
          f: 'tan(angle) = opposite / adjacent in the extracted right-angled triangle  |  Space diagonal = sqrt(l^2 + w^2 + h^2)',
          vis: 'Cuboid with the space diagonal and its projection on the base highlighted',
          ctx: 'A water tank on a stand at a KenGen substation is a cuboid. A cable runs from one bottom corner to the opposite top corner, and engineers need its angle to the floor.',
          q: 'When the sun is straight overhead, what is the shadow of a slanted pole on the ground, and how could the pole, its shadow and the vertical make a right-angled triangle?',
          exam: 'Angle between a line and a plane, and between two planes, in a cuboid, pyramid or wedge, giving lengths to 3 significant figures and angles to 1 decimal place.',
          steps: [
            'Name the line and the plane, and write down the projection of the line on the plane, because the angle is measured to the projection and not to the line elsewhere.',
            'Find the right angle between the vertical edge and the plane, and pull out the triangle that contains it, because the triangle is flat and ordinary trigonometry applies.',
            'Calculate any missing side of the triangle with Pythagoras, because the base diagonal is usually needed first.',
            'Choose sin, cos or tan from the sides you know, because the right ratio uses two known sides.',
            'For the angle between two planes, mark the common line first, then draw one line in each plane at right angles to it, because their angle is the plane angle.'
          ],
          ex: [
            'Problem: In cuboid ABCDEFGH the base ABCD has AB = 8 cm, BC = 6 cm, and the vertical edge CG = 7 cm. Find (a) the angle between AG and the base, (b) the angle between plane ABGH and the base.',
            '(a) The projection of AG on the base is AC. AC = sqrt(8^2 + 6^2) = sqrt(100) = 10 cm.',
            'Triangle ACG has a right angle at C. tan(angle GAC) = CG / AC = 7 / 10 = 0.7.',
            'Angle GAC = tan^-1(0.7) = 35.0 degrees (1 decimal place).',
            '(b) The planes ABGH and ABCD meet along AB. BC is in the base and perpendicular to AB. BG is in the plane ABGH and perpendicular to AB.',
            'The angle between the planes is angle GBC. In triangle BCG (right angle at C): tan(angle GBC) = CG / BC = 7 / 6.',
            'Angle GBC = tan^-1(7/6) = 49.4 degrees (1 decimal place).',
            'Common mistake: using AG itself and the base length AB in the triangle. The angle to the base must be taken with the projection AC, not with an edge.'
          ]
        }),
        P('cbc_g12_math_s3_6', '2.5 Trigonometry (III)', {
          pt: 'Compound Angles, Double Angles and Trigonometric Equations',
          tag: 'Use an identity to change an equation into one function, then solve a quadratic',
          body: 'An identity is an equation true for every value of the angle, such as sin^2 x + cos^2 x = 1. This comes from Pythagoras on a right-angled triangle inside the unit circle. A compound angle is a sum or difference of two angles. The addition formulae are sin(A + B) = sin A cos B + cos A sin B and cos(A + B) = cos A cos B - sin A sin B. Putting B = A gives the double angle formulas sin 2A = 2 sin A cos A and cos 2A = cos^2 A - sin^2 A. To solve a trigonometric equation, use an identity so that only one function appears, solve for it as an ordinary quadratic, then find all angles in the stated range using the symmetry of the sine, cosine and tangent graphs. The sine of an angle is positive in the first and second quadrants and negative in the third and fourth.',
          f: 'sin^2 x + cos^2 x = 1  |  sin(A + B) = sin A cos B + cos A sin B  |  sin 2A = 2 sin A cos A  |  cos 2A = cos^2 A - sin^2 A',
          vis: 'Unit circle with sine values read on the vertical axis',
          ctx: 'Electricity from KenGen reaches homes as an alternating supply that rises and falls like a sine wave, and engineers find exact times when the wave has a given value by solving trigonometric equations.',
          q: 'If sin x equals -1/2, in which two quadrants can x lie, and why does the same value of sine come from two different angles between 0 and 360 degrees?',
          exam: 'Exact values using compound angles, proving identities, and solving equations of the form a sin^2 x + b sin x + c = 0 for 0 <= x <= 360 degrees.',
          steps: [
            'Use sin^2 x + cos^2 x = 1 to replace cos^2 x by 1 - sin^2 x, because the equation must contain only one trigonometric function.',
            'Expand and rearrange into a quadratic in sin x equal to zero, because quadratics can be factorised.',
            'Factorise and solve for sin x, treating sin x as an ordinary letter, because each factor gives a value.',
            'Reject any value of sin x outside the range -1 to 1, because sine can never take such values.',
            'Find the acute reference angle for each value, then place it in the correct quadrants for the sign, because sine is positive in two quadrants and negative in two.',
            'Check each answer in the original equation, because identities used in the middle can hide errors.'
          ],
          ex: [
            'Problem (a): Solve 2 cos^2 x + sin x - 1 = 0 for 0 <= x <= 360 degrees.',
            'Replace cos^2 x by 1 - sin^2 x: 2(1 - sin^2 x) + sin x - 1 = 0.',
            'Expand: 2 - 2 sin^2 x + sin x - 1 = 0, so -2 sin^2 x + sin x + 1 = 0, which is 2 sin^2 x - sin x - 1 = 0.',
            'Factorise: (2 sin x + 1)(sin x - 1) = 0, so sin x = -1/2 or sin x = 1.',
            'sin x = 1 gives x = 90 degrees.',
            'sin x = -1/2: the reference angle is 30 degrees. Sine is negative in quadrants 3 and 4, so x = 180 + 30 = 210 degrees and x = 360 - 30 = 330 degrees.',
            'Check x = 210: 2 cos^2 210 + sin 210 - 1 = 2(3/4) - 1/2 - 1 = 0. Solutions: x = 90, 210, 330 degrees.',
            'Problem (b): Find the exact value of sin 75 degrees. sin 75 = sin(45 + 30) = sin 45 cos 30 + cos 45 sin 30 = (sqrt2/2)(sqrt3/2) + (sqrt2/2)(1/2) = (sqrt6 + sqrt2)/4, which is 0.9659.',
            'Common mistake: dividing both sides by sin x to solve, which loses the solution sin x = 0 or 1. Factorise instead of dividing.'
          ]
        }),
        P('cbc_g12_math_s3_7', '2.6 Vectors II', {
          pt: 'Position Vectors, Ratio Division and the Scalar Product',
          tag: 'A vector is an arrow, and the dot product turns two arrows into a number that reveals the angle',
          body: 'A vector has both size and direction. A position vector OA starts at the origin O and ends at the point A, so if A is (1, 2, 3) then OA is the column (1, 2, 3). The vector from A to B is AB = OB - OA, the end minus the start. The magnitude (length) of a vector (x, y, z) is the square root of x^2 + y^2 + z^2. A point P that divides AB in the ratio m : n has position vector OP = OA + m/(m + n) x AB. Three points are collinear (on one straight line) when one of the vectors between them is a multiple of another. The scalar product (dot product) of a and b is a.b = x1 x2 + y1 y2 + z1 z2, and it also equals |a||b| cos(theta), where theta is the angle between them. This gives the angle: cos(theta) = a.b / (|a||b|). If a.b = 0, the vectors are perpendicular.',
          f: 'AB = OB - OA  |  OP = OA + (m/(m+n))AB  |  a.b = x1x2 + y1y2 + z1z2 = |a||b|cos(theta)',
          vis: 'Two position vectors from the origin with a point dividing the line between their ends',
          ctx: 'A drone surveying a farm records points as positions from the base station. The surveyor uses vectors to find a point one third of the way between two beacons and the angle between two flight paths.',
          q: 'If two vectors have a dot product of zero, what must be true of the angle between them, and why does cos 90 degrees equal zero make that work?',
          exam: 'Finding AB from position vectors, finding the position vector of a point dividing a line in a ratio, proving points are collinear, and using the scalar product to find an angle.',
          steps: [
            'Write each point as a position vector from the origin, because all vector operations start from these.',
            'Find AB by subtracting the start from the end, OB - OA, because direction matters.',
            'For a point dividing AB in the ratio m : n, add m/(m + n) of AB to OA, because it lies that fraction of the way from A to B.',
            'To find an angle, calculate the dot product and both magnitudes, because the formula needs all three.',
            'Use cos(theta) = a.b / (|a||b|) and take the inverse cosine, because the dot product encodes the cosine of the angle.',
            'Check that the angle is between 0 and 180 degrees, because that is the range of the angle between two vectors.'
          ],
          ex: [
            'Problem: A = (1, 2, 3) and B = (4, 5, 9). Find (a) AB, (b) the position vector of P dividing AB in the ratio 1 : 2, (c) the angle AOB.',
            '(a) AB = OB - OA = (4 - 1, 5 - 2, 9 - 3) = (3, 3, 6).',
            '(b) OP = OA + (1/3)AB = (1, 2, 3) + (1, 1, 2) = (2, 3, 5).',
            '(c) OA.OB = 1(4) + 2(5) + 3(9) = 4 + 10 + 27 = 41.',
            '|OA| = sqrt(1 + 4 + 9) = sqrt14. |OB| = sqrt(16 + 25 + 81) = sqrt122. |OA||OB| = sqrt(1708) = 41.328.',
            'cos(theta) = 41 / 41.328 = 0.9921, so theta = 7.2 degrees.',
            'Common mistake: finding AB as OA - OB, which reverses the arrow, or using the ratio 1 : 2 as the fraction 1/2 instead of 1/(1 + 2) = 1/3.'
          ]
        }),
        stop(
          'cbc_g12_math_s3_1',
          '2.7 Navigation',
          'Navigating on a Curved Planet',
          '1 minute of latitude arc equals exactly 1 nautical mile (nm)',
          'The Earth is very nearly a sphere. Latitude is the angle north or south of the equator, and longitude is the angle east or west of the Greenwich meridian. A great circle is a circle on the sphere whose centre is the centre of the Earth, such as the equator and every line of longitude. One nautical mile (nm) is defined as the length of an arc of 1 minute (1/60 of a degree) on a great circle, so 1 degree of arc is 60 nm. Along a meridian or the equator, distance = 60 × α nm. Along a parallel of latitude θ, the radius shrinks: distance = 60 × α × cosθ nm. 1° longitude = 4 minutes of time. A speed of one nautical mile per hour is one knot.',
          'd_great = 60α nm,  d_parallel = 60α cosθ nm',
          'Spherical Earth meridian grid with a parallel of latitude shown',
          'Flight routes from JKIA Nairobi to London across curved global geodesics, and ships crossing the Indian Ocean from Mombasa.',
          'Why is the shortest flight path between two distant cities rarely a straight horizontal line on a flat paper map?',
          'KSSEA Section B: Calculating speed in knots (nautical miles per hour) and arrival time across time zones.',
          [
            'Step 1: Identify whether the journey is along the equator, a meridian, or a parallel of latitude, because the radius of the circle you are travelling on decides the formula.',
            'Step 2: Find the angle α between the two places in degrees, subtracting the longitudes if they are on the same side of Greenwich and adding if they are on opposite sides, because the angle is the gap between them.',
            'Step 3: For a parallel at latitude θ, multiply 60 × α by cos θ, because the circle of latitude is smaller than the equator by that factor.',
            'Step 4: Divide the distance by the speed to find the time, because speed is nautical miles per hour.',
            'Step 5: For clock time, change the longitude difference to minutes at 4 minutes per degree, because the Earth turns 1 degree every 4 minutes.'
          ],
          [
            'Problem: A ship sails due east along latitude 30 degrees S from P(30 degrees S, 20 degrees E) to Q(30 degrees S, 50 degrees E) at 20 knots. Find the distance, the time taken and the local time difference between P and Q.',
            'Angle between P and Q along the parallel: α = 50 - 20 = 30 degrees (same side of Greenwich, so subtract).',
            'Distance = 60 × α × cos θ = 60 × 30 × cos 30 degrees = 1 800 × 0.8660 = 1 558.8 nm (1 decimal place).',
            'Time = distance / speed = 1 558.8 / 20 = 77.9 hours (1 decimal place), about 3 days 6 hours.',
            'Time difference = 30 × 4 = 120 minutes = 2 hours. Q is east of P, so Q is 2 hours ahead of P.',
            'Common mistake: using 60 × α for a parallel of latitude. That formula is only for the equator and meridians. Away from the equator the parallel is a smaller circle and cos θ must be included.'
          ].join('\n')
        )
      ]
    },

    // ───────────────────────── STRAND 3: STATISTICS AND PROBABILITY ─────────────────────────
    {
      id: 'cbc_g12_math_s4',
      number: 3,
      title: '3.0 Statistics and Probability',
      strand: 'Strand 3: Statistics and Probability',
      status: 'available',
      summary: 'Measures of spread: variance and standard deviation for ungrouped and grouped data.',
      subtopics: [
        P('cbc_g12_math_s4_1', '3.1 Statistics II', {
          pt: 'Variance and Standard Deviation of Grouped Data',
          tag: 'The standard deviation measures how far the data typically sit from their mean',
          body: 'The mean tells where the data are centred, but two sets of data can have the same mean and look very different. A measure of spread tells how scattered the values are. The deviation of a value is its distance from the mean. Squaring each deviation removes the sign, and the average of the squared deviations is the variance. The standard deviation is the square root of the variance, which returns it to the original units. For grouped data, each class is represented by its midpoint x and has frequency f. The mean is the sum of fx divided by the sum of f. The variance is the sum of fx^2 divided by the sum of f, minus the mean squared. A small standard deviation means the values are tightly bunched near the mean, and a large one means they are widely spread.',
          f: 'Mean = sum(fx)/sum(f)  |  Variance = sum(fx^2)/sum(f) - mean^2  |  Standard deviation = sqrt(variance)',
          vis: 'Two histograms with the same mean, one narrow and one wide',
          ctx: 'A shopkeeper compares daily M-Pesa deposits at two shops. Both average KES 25 000, but one shop has steady days and the other swings wildly, and the standard deviation shows the difference.',
          q: 'Two classes both score a mean of 50 marks. In one class all learners scored between 48 and 52, and in the other between 10 and 90. Which has the larger standard deviation, and why?',
          exam: 'Calculating the mean, variance and standard deviation from a grouped frequency table using midpoints, with a clear column layout.',
          steps: [
            'Find the midpoint x of each class, because the midpoint stands in for every value in the class.',
            'Compute f x and f x^2 for each class and total the columns, because both totals are needed.',
            'Calculate the mean as the total of fx divided by the total of f, because the variance formula subtracts the mean squared.',
            'Calculate the variance as total fx^2 over total f, minus mean squared, because that equals the average squared deviation.',
            'Take the square root for the standard deviation, because the units must match the data.'
          ],
          ex: [
            'Problem: The daily deposits (in thousands of KES) at a shop have class midpoints x = 5, 15, 25, 35, 45 with frequencies f = 4, 6, 10, 6, 4. Find the mean, variance and standard deviation.',
            'Total frequency: 4 + 6 + 10 + 6 + 4 = 30.',
            'fx: 20, 90, 250, 210, 180. Total = 750.',
            'Mean = 750 / 30 = 25.',
            'fx^2: 4(25) = 100; 6(225) = 1 350; 10(625) = 6 250; 6(1 225) = 7 350; 4(2 025) = 8 100. Total = 23 150.',
            'Variance = 23 150 / 30 - 25^2 = 771.67 - 625 = 146.67 (2 decimal places).',
            'Standard deviation = sqrt(146.67) = 12.11 (2 decimal places).',
            'Common mistake: forgetting to square the mean before subtracting, or subtracting the mean from the sum of fx^2 before dividing. Divide first, then subtract the mean squared.'
          ]
        })
      ]
    },

    // ───────────────────────── STRAND 4: CALCULUS ─────────────────────────
    {
      id: 'cbc_g12_math_s1',
      number: 4,
      title: '4.0 Calculus',
      strand: 'Strand 4: Calculus',
      status: 'available',
      summary: 'Differentiation II (chain, product and quotient rules, and motion) and integration (definite integrals and area between curves).',
      subtopics: [
        stop(
          'cbc_g12_math_s2_1',
          '4.1 Differentiation II',
          'The Differential Chain of Motion',
          'Differentiate down, integrate back up',
          'Differentiation finds the rate at which one quantity changes with another, written dy/dx. For a function made of other functions, three rules extend the power rule. The chain rule: if y = f(u) and u = g(x), then dy/dx = (dy/du)(du/dx), the outer derivative times the inner derivative. The product rule: for y = uv, dy/dx = u(dv/dx) + v(du/dx). The quotient rule: for y = u/v, dy/dx = (v(du/dx) - u(dv/dx)) / v^2. Differentiating displacement gives velocity. Differentiating velocity gives acceleration. Integrating acceleration with initial conditions restores velocity and displacement. A particle is at rest when its velocity is zero, and it reverses direction at that instant.',
          'v = ds/dt,  a = dv/dt = d²s/dt²,  s = ∫ v dt',
          'Speedometer acceleration curve and a displacement-time graph with its tangent',
          'Standard Gauge Railway (SGR) train scheduling and a matatu braking to a stop at a stage.',
          'When a particle is momentarily at rest, what is its velocity, and does that mean its acceleration is zero?',
          'KSSEA 10-Mark Kinematics: Finding total distance traveled when a particle reverses direction.',
          [
            'Step 1: Decide which rule matches the shape of the function: a bracket raised to a power (chain), two factors multiplied (product), or one expression over another (quotient), because each shape has its own rule.',
            'Step 2: Apply the rule, differentiating each part separately and keeping the order of the terms, because the quotient rule in particular is order-sensitive.',
            'Step 3: For motion, differentiate s(t) to get v(t) and v(t) to get a(t), because velocity is the rate of change of displacement.',
            'Step 4: Set v = 0 and solve to find when the particle is at rest, because these are the times it can change direction.',
            'Step 5: Find s at the start, at every rest time and at the end, and add the sizes of the separate movements, because distance counts every part of the path as positive.'
          ],
          [
            'Part A, the three rules.',
            'Chain rule: y = (3x - 2)^4. Let u = 3x - 2, so y = u^4. dy/dx = 4u^3 x 3 = 12(3x - 2)^3. At x = 1: 12(1)^3 = 12.',
            'Product rule: y = x^2(x + 3)^2. u = x^2, v = (x + 3)^2. dy/dx = x^2 x 2(x + 3) + (x + 3)^2 x 2x = 2x(x + 3)[x + (x + 3)] = 2x(x + 3)(2x + 3). At x = 1: 2(4)(5) = 40.',
            'Quotient rule: y = (x^2 + 1)/(x - 2). dy/dx = [(x - 2)(2x) - (x^2 + 1)(1)] / (x - 2)^2 = (x^2 - 4x - 1)/(x - 2)^2. At x = 3: (9 - 12 - 1)/1 = -4.',
            'Part B, motion. A particle moves along a line with displacement s = t^3 - 6t^2 + 9t metres at time t seconds. Find the total distance travelled in the first 4 seconds.',
            'Velocity v = ds/dt = 3t^2 - 12t + 9 = 3(t - 1)(t - 3). Acceleration a = dv/dt = 6t - 12.',
            'At rest when v = 0: t = 1 and t = 3.',
            's(0) = 0. s(1) = 1 - 6 + 9 = 4. s(3) = 27 - 54 + 27 = 0. s(4) = 64 - 96 + 36 = 4.',
            'Movements: 0 to 1 s: +4 m. 1 to 3 s: from 4 to 0, a distance of 4 m. 3 to 4 s: from 0 to 4, a distance of 4 m.',
            'Total distance = 4 + 4 + 4 = 12 m. (The final displacement is only 4 m, which is why distance and displacement differ.)',
            'At t = 1, the acceleration is 6(1) - 12 = -6 m/s^2, not zero even though the velocity is zero.',
            'Common mistake: calculating s(4) - s(0) = 4 m and calling it the distance. That is the displacement. When the particle turns round, add each stage separately.'
          ].join('\n')
        ),
        stop(
          'cbc_g12_math_s1_1',
          '4.2 Integration',
          'Accumulating Infinite Thin Strips',
          'Integration is the inverse of differentiation',
          'To integrate ax^n, increase the power by 1 and divide by the new power. Definite integrals evaluate [F(x)] from a to b: F(b) - F(a), yielding exact area bounded by a curve. The reason is that the area under a curve can be cut into very thin rectangles of height y and width dx; adding them all up is the integral, and the arbitrary constant c cancels when the lower value is subtracted from the upper one. When a region lies between two curves, the area is the integral of (upper curve - lower curve) between the x-values where they meet.',
          '∫ x^n dx = x^(n+1)/(n+1) + c,  Area = ∫_a^b y dx',
          'Riemann strip area accumulation under a curve',
          'Calculating water volume discharged through a dam spillway with varying flow rate.',
          'Why must we include an arbitrary constant +c in an indefinite integral, and why does it cancel out in a definite integral?',
          'KSSEA Section B: Finding exact area enclosed between a parabola and a straight line.',
          [
            'Step 1: Find where the two graphs meet by setting the equations equal and solving, because those x-values are the limits of integration.',
            'Step 2: Decide which curve is on top between the limits by testing a value in between, because the integrand must be upper minus lower to keep the area positive.',
            'Step 3: Subtract to form the integrand and simplify, because one integral of the difference is easier than two.',
            'Step 4: Integrate each term by raising the power by 1 and dividing by the new power, because that undoes differentiation.',
            'Step 5: Substitute the upper limit, then the lower limit, and subtract, because that gives the exact accumulated area and the constant c cancels.'
          ],
          [
            'Problem: Find the area enclosed between the curve y = 6x - x^2 and the line y = x.',
            'Limits: 6x - x^2 = x gives 5x - x^2 = 0, so x(5 - x) = 0 and x = 0 or x = 5.',
            'Which is on top: at x = 1, the curve gives 6 - 1 = 5 and the line gives 1, so the curve is on top.',
            'Integrand: (6x - x^2) - x = 5x - x^2.',
            'Integrate: [5x^2/2 - x^3/3] from 0 to 5.',
            'At x = 5: 5(25)/2 - 125/3 = 62.5 - 41.667 = 20.833. At x = 0 the value is 0.',
            'Area = 20.833 - 0 = 125/6 = 20.83 square units (2 decimal places).',
            'Common mistake: integrating the curve alone and subtracting the area under the line without checking which is on top, or leaving the answer negative when the curves are subtracted the wrong way round. Area is always positive.'
          ].join('\n')
        )
      ]
    }
  ]
};

module.exports = {
  maps: [MAP],
  retiredIds: []
};
