// ══════════════════════════════════════════════════════════════
// KICD CBC GRADE 11 CORE MATHEMATICS
// Aligned to the KICD Core Mathematics Grade 11 design (Oct 2025):
// 4 strands, 17 sub-strands.
// Kept ids (existing primer content reused, retitled to the KICD name):
//   cbc_g11_math_s1_1 (now 1.6 Sequences and Series, AP and GP merged)
//   cbc_g11_math_s2_1 (2.2 Angle Properties of a Circle)
//   cbc_g11_math_s3_1 (4.2 Differentiation (I))
// Retired: cbc_g11_math_s1_2 (Geometric progressions, merged into s1_1).
// Every sub-topic carries a full ladder primer: first-principles explanation,
// numbered steps with reasons, a fully worked example, a common mistake,
// an everyday Kenyan context and a Socratic opening question.
// ══════════════════════════════════════════════════════════════

function steps(list) {
  return list.map((s, i) => `Step ${i + 1}: ${s[0]} Why: ${s[1]}`);
}

function topic(o) {
  return {
    id: o.id,
    title: o.title,
    status: 'available',
    conceptPrimer: {
      title: o.primerTitle,
      tagline: o.tagline,
      body: o.body,
      formula: o.formula,
      visualBadge: o.visualBadge,
      realWorldContext: o.context,
      explanationSteps: steps(o.steps),
      workedExample: o.example.join('\n') + '\nCommon mistake: ' + o.mistake,
      commonMistake: o.mistake
    },
    socraticPrompt: o.socratic,
    formulaBadge: o.formula,
    examFocus: o.examFocus
  };
}

const STATION_1 = [
  // 1.1 Quadratic Expressions and Equations
  topic({
    id: 'cbc_g11_math_s1_3',
    title: '1.1 Quadratic Expressions and Equations',
    primerTitle: 'Forming and Solving Equations of the Form ax² + bx + c = 0',
    tagline: 'If two numbers multiply to give zero, at least one of them is zero',
    body: 'An expression is a group of terms such as x² + 5x - 126. It is quadratic when the highest power of the unknown is 2. A quadratic equation sets such an expression equal to something, and a root (or solution) is a value of x that makes the equation true. Every quadratic can be written in the standard form ax² + bx + c = 0, where a is not 0. Factorising means writing the expression as a product of brackets. This works because of the zero product property: if A x B = 0 then A = 0 or B = 0, so each bracket gives one root. When the expression will not factorise neatly, use the formula x = (-b ± √(b² - 4ac)) / 2a, or complete the square. The number b² - 4ac is the discriminant: if it is positive there are two roots, if it is zero there is one repeated root, and if it is negative there is no real root.',
    formula: 'ax² + bx + c = 0;  x = (-b ± √(b² - 4ac)) / 2a;  A × B = 0 ⇒ A = 0 or B = 0',
    visualBadge: 'Parabola crossing the x-axis at its two roots',
    context: 'Fencing a rectangular maize plot when you know its area and how much longer it is than it is wide.',
    steps: [
      ['Define the unknown with units, for example let the width be x metres.', 'Every later line must refer to something you have named.'],
      ['Write each quantity in terms of x and form the equation from the given fact (for a rectangle, length x width = area).', 'The word problem becomes algebra only when it is an equation.'],
      ['Expand and move every term to one side so that the other side is 0.', 'The zero product property only works when the product equals 0.'],
      ['Find two numbers that multiply to give a x c and add to give b, split the middle term, and factorise by grouping.', 'Splitting the middle term turns a three-term expression into two groups that share a bracket.'],
      ['Set each bracket equal to 0 and solve.', 'A product is zero only when one of its factors is zero.'],
      ['Reject any root that does not fit the situation, then check by substituting.', 'A length cannot be negative, and substitution catches arithmetic slips.']
    ],
    example: [
      'Problem: A maize plot is rectangular. Its length is 5 m more than its width and its area is 126 m². Find the width.',
      'Let the width be x m. Then the length is (x + 5) m.',
      'Area: x(x + 5) = 126.',
      'Expand: x² + 5x = 126.',
      'Move 126 across: x² + 5x - 126 = 0.',
      'Here a = 1, b = 5, c = -126. We need two numbers with product -126 and sum 5: 14 and -9 (14 x -9 = -126 and 14 + (-9) = 5).',
      'Split the middle term: x² + 14x - 9x - 126 = 0.',
      'Group: x(x + 14) - 9(x + 14) = 0, so (x - 9)(x + 14) = 0.',
      'So x - 9 = 0 or x + 14 = 0, giving x = 9 or x = -14.',
      'A width cannot be negative, so x = 9. The width is 9 m and the length is 14 m.',
      'Check: 9 x 14 = 126 m². Check with the formula: b² - 4ac = 25 + 504 = 529 = 23², so x = (-5 ± 23)/2 = 9 or -14, the same roots.'
    ],
    mistake: 'Writing x(x + 5) = 126 and then saying x = 126 or x + 5 = 126. The zero product property only works when the other side is 0, so first rearrange to x² + 5x - 126 = 0. A second slip is to keep the negative root x = -14 as the width.',
    socratic: 'If you multiply two numbers and the answer is 0, what do you know about at least one of the numbers, and why does that not work when the answer is 126?',
    examFocus: 'Forming a quadratic equation from a word problem, solving by factorisation or the formula, and rejecting an inadmissible root.'
  }),

  // 1.2 Irrational numbers
  topic({
    id: 'cbc_g11_math_s1_4',
    title: '1.2 Irrational Numbers',
    primerTitle: 'Surds: Exact Roots That Never Terminate',
    tagline: 'Keep the root sign and the answer stays exact',
    body: 'A rational number can be written as a fraction of two whole numbers, such as 3/4 or 0.5. An irrational number cannot, and its decimal never ends or repeats. A surd is an irrational number written with a root sign, such as √2 or √7. A square root such as √9 = 3 is not a surd because it is rational. Two rules drive everything: √(ab) = √a x √b and √(a/b) = √a / √b. To simplify a surd, pull out the largest perfect square factor: √72 = √(36 x 2) = 6√2. Surds can be added or subtracted only when they have the same surd part, like 5√2 + 2√2 = 7√2. A fraction with a surd in the denominator is rationalised by multiplying top and bottom by a number that removes the root: use √b for a single surd, and the conjugate (a + √b) for (a - √b), because (a - √b)(a + √b) = a² - b.',
    formula: '√(ab) = √a × √b;  1/√b = √b/b;  1/(a - √b) = (a + √b)/(a² - b)',
    visualBadge: 'Diagonal of a square on a grid',
    context: 'The diagonal path across a square maize plot of side 12 m is exactly 12√2 m, which you cannot write exactly as a decimal.',
    steps: [
      ['Write the number under the root as a product containing the largest perfect square (4, 9, 16, 25, 36, 49 and so on).', 'The square root of a perfect square is a whole number that can leave the root.'],
      ['Use √(ab) = √a x √b to take the perfect square out of the root.', 'This leaves the smallest possible number inside the root.'],
      ['Add or subtract only surds with the same number under the root.', 'Like terms combine; 3√2 and 3√5 are different quantities, as 3x and 3y are.'],
      ['To rationalise a single surd denominator, multiply top and bottom by that surd.', '√b x √b = b, which is rational, and multiplying top and bottom by the same number does not change the value.'],
      ['For a denominator a - √b, multiply top and bottom by the conjugate a + √b.', 'The product (a - √b)(a + √b) = a² - b has no root, because the cross terms cancel.'],
      ['Check with a calculator by comparing decimal values of the start and the end.', 'Both forms must give the same number.']
    ],
    example: [
      'Problem A: A square maize plot has side 12 m. Find the diagonal path exactly.',
      'By Pythagoras: d² = 12² + 12² = 144 + 144 = 288, so d = √288.',
      '288 = 144 x 2 and 144 is a perfect square, so √288 = √144 x √2 = 12√2 m (about 16.97 m).',
      'Problem B: Simplify √72 + √50 - √8.',
      '√72 = √(36 x 2) = 6√2;  √50 = √(25 x 2) = 5√2;  √8 = √(4 x 2) = 2√2.',
      'So 6√2 + 5√2 - 2√2 = (6 + 5 - 2)√2 = 9√2.',
      'Problem C: Rationalise 12 / (3 - √5).',
      'Multiply top and bottom by the conjugate (3 + √5): 12(3 + √5) / [(3 - √5)(3 + √5)].',
      'Denominator: 3² - (√5)² = 9 - 5 = 4.',
      'So the value is 12(3 + √5)/4 = 3(3 + √5) = 9 + 3√5.',
      'Check: 12/(3 - 2.236068) = 15.708 and 9 + 3(2.236068) = 15.708.'
    ],
    mistake: 'Writing √(a + b) = √a + √b. For example √(9 + 16) = √25 = 5, but √9 + √16 = 7. Roots split over multiplication and division only, never over addition.',
    socratic: 'Draw a square of side 1 and look at its diagonal: can you measure the diagonal exactly as a fraction of the side, or only get closer and closer?',
    examFocus: 'Simplifying surds, adding and subtracting surds, and rationalising denominators of the form a + √b, leaving the answer in exact form.'
  }),

  // 1.3 Linear Inequalities
  topic({
    id: 'cbc_g11_math_s1_5',
    title: '1.3 Linear Inequalities',
    primerTitle: 'Solution Sets, Number Lines and Regions',
    tagline: 'Treat it like an equation, but reverse the sign when you multiply or divide by a negative',
    body: 'An inequality compares two quantities using <, >, ≤ (less than or equal to) or ≥ (greater than or equal to). Its solution set is every value that makes it true, and unlike an equation it usually has infinitely many solutions. A linear inequality has the unknown to power 1 only. You may add or subtract the same number on both sides, and multiply or divide by a positive number, without changing the sign. If you multiply or divide by a negative number, the order reverses and the sign must be flipped: 4 > 2 but -4 < -2. On a number line, an open circle shows that the end value is not included (< or >) and a filled circle shows that it is (≤ or ≥). A combined inequality such as -3 < 2x + 1 ≤ 9 is solved by working on all three parts at once. For two unknowns, the line ax + by = c divides the plane into two regions, and a test point such as (0, 0) shows which side satisfies the inequality; the line is dashed for < or > and solid for ≤ or ≥.',
    formula: 'a < b and c < 0 ⇒ ac > bc;   solid boundary for ≤, ≥;  dashed for <, >',
    visualBadge: 'Number line with open and filled circles',
    context: 'A budget limit: how many matatu rides can you pay for after covering a fixed cost.',
    steps: [
      ['Treat the inequality symbol like an equals sign and collect unknowns on one side and numbers on the other.', 'Adding or subtracting the same number on both sides keeps the order.'],
      ['Divide or multiply to leave one x.', 'The coefficient of x must become 1.'],
      ['If you multiplied or divided by a negative number, reverse the sign.', 'Multiplying by a negative reflects numbers across zero, so the larger becomes the smaller.'],
      ['For a combined inequality, perform every operation on all three parts.', 'The middle expression must stay between the same two bounds.'],
      ['Write the solution set and, if asked, list the integers in it or draw the number line.', 'Open circle for < and >, filled for ≤ and ≥, because the end value is either excluded or included.'],
      ['Test one value from the solution set in the original inequality.', 'This catches a missed sign reversal.']
    ],
    example: [
      'Problem A: Solve 5 - 3x < 20.',
      'Subtract 5 from both sides: -3x < 15.',
      'Divide both sides by -3. Because -3 is negative, the sign reverses: x > -5.',
      'Test x = 0: 5 - 0 = 5 < 20 is true. Test x = -6: 5 + 18 = 23 < 20 is false, which is consistent with x > -5.',
      'Problem B: List the integers that satisfy -3 < 2x + 1 ≤ 9.',
      'Subtract 1 from all three parts: -4 < 2x ≤ 8.',
      'Divide all three parts by 2 (positive, so no reversal): -2 < x ≤ 4.',
      'Integers: -1, 0, 1, 2, 3, 4.',
      'Problem C: Okello has KES 1,500. He pays KES 300 for a parking token and each matatu ride costs KES 120. How many rides can he afford?',
      'Let n be the number of rides: 300 + 120n ≤ 1500. So 120n ≤ 1200 and n ≤ 10.',
      'He can afford at most 10 rides. Check: 300 + 1200 = 1500, exactly his money.'
    ],
    mistake: 'Dividing -3x < 15 by -3 and writing x < -5. Dividing by a negative must reverse the sign, giving x > -5. Always test a value to confirm.',
    socratic: 'We know 2 < 5. If I multiply both numbers by -1, which is now bigger, -2 or -5, and what does that tell you about the sign?',
    examFocus: 'Solving linear and combined inequalities, listing integer solutions, and representing the solution on a number line or as a region.'
  }),

  // 1.4 Logarithms II
  topic({
    id: 'cbc_g11_math_s1_6',
    title: '1.4 Logarithms II',
    primerTitle: 'Laws of Logarithms and Exponential Equations',
    tagline: 'A logarithm is an index: it turns multiplication into addition',
    body: 'The statement log_b N = x means b^x = N. In words, the logarithm of N to base b is the power to which b must be raised to give N. For example log_2 8 = 3 because 2^3 = 8. The number N must be positive, so the logarithm of 0 or a negative number does not exist. Three laws follow directly from the laws of indices: log(AB) = log A + log B; log(A/B) = log A - log B; and log(A^n) = n log A. Also log_b b = 1 and log_b 1 = 0. These laws let you simplify expressions, solve equations in which the unknown is inside a logarithm, and solve equations in which the unknown is a power, by taking logarithms of both sides. Because the unknown sits inside a logarithm, always check each answer in the original equation, since an apparent solution may make a logarithm of a negative number.',
    formula: 'log(AB) = log A + log B;  log(A/B) = log A - log B;  log(A^n) = n log A;  log_b N = x ⇔ b^x = N',
    visualBadge: 'Slide rule scale showing multiplication as addition',
    context: 'How long a savings account in a SACCO takes to double at a fixed yearly interest rate.',
    steps: [
      ['Rewrite each log expression using the laws, combining sums into a single log of a product and differences into a single log of a quotient.', 'A single log on each side lets you remove the log.'],
      ['Convert the single log equation into index form (log_b N = x means N = b^x), or equate the contents if both sides are logs to the same base.', 'The definition of a logarithm turns the equation into an ordinary algebra equation.'],
      ['Solve the resulting algebra equation.', 'It is usually a linear or quadratic equation.'],
      ['Check every answer in the original equation and reject any value that makes a log argument zero or negative.', 'Logarithms exist only for positive numbers.'],
      ['For an unknown power, take logs of both sides and use log(A^n) = n log A to bring the power down.', 'This frees the unknown from the exponent.'],
      ['Evaluate with a calculator and state units.', 'The final answer should be interpreted in the situation.']
    ],
    example: [
      'Problem A: Solve log10(x + 2) + log10(x - 1) = 1.',
      'Combine: log10[(x + 2)(x - 1)] = 1.',
      'Index form: (x + 2)(x - 1) = 10^1 = 10.',
      'Expand: x² + x - 2 = 10, so x² + x - 12 = 0, which factorises as (x + 4)(x - 3) = 0.',
      'So x = -4 or x = 3.',
      'Check x = -4: x - 1 = -5 is negative, so log10(-5) does not exist; reject. Check x = 3: log10(5) + log10(2) = log10(10) = 1. True.',
      'So x = 3.',
      'Problem B: KES 50,000 in a SACCO grows at 8% a year (multiplied by 1.08 each year). After how many years does it double?',
      '50000 x 1.08^n = 100000, so 1.08^n = 2.',
      'Take logs: n log 1.08 = log 2, so n = log 2 / log 1.08 = 0.30103 / 0.03342 = 9.006.',
      'So it doubles in about 9 years.'
    ],
    mistake: 'Writing log(A + B) = log A + log B. The law is for a product: log A + log B = log(AB). There is no rule that splits log(A + B).',
    socratic: 'Since 10^2 x 10^3 = 10^5, what does that say about the logarithms 2 and 3 of 100 and 1000, and what is log10 of their product?',
    examFocus: 'Using the three laws of logarithms, solving logarithmic and exponential equations, and rejecting values that give a log of a non-positive number.'
  }),

  // 1.5 Formulae and Variations
  topic({
    id: 'cbc_g11_math_s1_7',
    title: '1.5 Formulae and Variations',
    primerTitle: 'Changing the Subject and Direct, Inverse, Joint and Partial Variation',
    tagline: 'A constant k links variables that change together',
    body: 'A formula is an equation connecting quantities by letters, such as v² = u² + 2as. Changing the subject means rearranging so that a chosen letter stands alone, by doing the same operation to both sides and undoing operations in reverse order. Variation describes how one quantity changes with others. y varies directly as x (y ∝ x) means y = kx, where k is a constant: doubling x doubles y. y varies inversely as x means y = k/x: doubling x halves y. Joint variation combines them, for example y varies as x and inversely as z² gives y = kx/z². Partial variation has a fixed part and a varying part, y = a + bx. To solve any variation problem, write the equation with k, use the given values to find k, rewrite the equation with that k, and then use it for new values.',
    formula: 'Direct: y = kx;  Inverse: y = k/x;  Joint: y = kx/z²;  Partial: y = a + bx',
    visualBadge: 'Two graphs: straight line (direct) and hyperbola (inverse)',
    context: 'A KPLC electricity bill has a fixed charge plus a charge per unit, and more workers harvesting a field take fewer days.',
    steps: [
      ['To change the subject, circle the letter wanted and list the operations applied to it.', 'You must undo them in the reverse order.'],
      ['Do the same operation to both sides, clearing squares with square roots and fractions by multiplying.', 'This keeps the equation balanced.'],
      ['For variation, translate the sentence into an equation with a constant k.', 'Direct is multiplication by k and inverse puts the variable on the bottom.'],
      ['Substitute the first set of values to find k.', 'The constant is the same in every situation of this relation.'],
      ['Write the equation with the value of k, then substitute the new values.', 'k is now fixed, so only the unknown remains.'],
      ['Interpret the answer with units and check whether it is reasonable.', 'More workers should mean fewer days.']
    ],
    example: [
      'Problem A: Make a the subject of v² = u² + 2as.',
      'Subtract u²: v² - u² = 2as. Divide by 2s: a = (v² - u²) / (2s).',
      'Problem B (inverse): 6 workers harvest a field in 8 days. Time T varies inversely as the number of workers w.',
      'T = k/w. Using w = 6, T = 8: 8 = k/6, so k = 48. Then T = 48/w.',
      'For 16 workers: T = 48/16 = 3 days.',
      'Problem C (joint): y varies directly as x and inversely as z². y = 12 when x = 3 and z = 2. Find y when x = 5 and z = 4.',
      'y = kx/z². Then 12 = k(3)/4, so k = 16. Then y = 16x/z² = 16(5)/16 = 5.',
      'Problem D (partial): An electricity bill C is a fixed charge a plus b shillings per unit u: C = a + bu. 40 units cost KES 760 and 100 units cost KES 1,360.',
      'Subtract: 1360 - 760 = b(100 - 40), so 600 = 60b and b = 10. Then 760 = a + 10(40), so a = 360.',
      'So C = 360 + 10u. Check: 360 + 10(100) = 1360.'
    ],
    mistake: 'Writing inverse variation as y = kx or forgetting to find k first. Another is to square only one term when rearranging, for example taking the root of v² - u² as v - u.',
    socratic: 'If 6 workers take 8 days and you double the workers, what do you expect to happen to the days, and what number stays the same throughout?',
    examFocus: 'Changing the subject of a formula, and finding the constant of variation, then using it in direct, inverse, joint and partial variation.'
  }),

  // 1.6 Sequences and Series (KEEP cbc_g11_math_s1_1, merged with geometric progressions)
  topic({
    id: 'cbc_g11_math_s1_1',
    title: '1.6 Sequences and Series',
    primerTitle: 'Arithmetic and Geometric Progressions, and Sum to Infinity',
    tagline: 'Gauss pairing pairs first and last terms; when |r| < 1, the infinite sum converges to a finite bound',
    body: 'A sequence is a list of numbers in a set order; a series is the sum of the terms. In an arithmetic progression (AP), every term increases by a common difference d. The nth term is a + (n-1)d. The sum of n terms is (n/2)(2a + (n-1)d). In a geometric progression (GP), each term is the previous one multiplied by a common ratio r, so the nth term is ar^(n-1) and the sum of n terms is a(r^n - 1)/(r - 1). If |r| < 1, higher powers diminish to zero, allowing an infinite series to sum to a/(1 - r). If |r| is 1 or more, the terms do not shrink and the infinite series has no sum.',
    formula: 'AP: T_n = a + (n-1)d,  S_n = (n/2)[2a + (n-1)d];  GP: T_n = ar^(n-1),  S_n = a(r^n - 1)/(r - 1),  S_∞ = a/(1 - r)  (|r| < 1)',
    visualBadge: 'Staircase for AP, bouncing ball heights for GP',
    context: 'Loan repayments that rise by a fixed amount each month, and money in a savings account that grows by a fixed percentage.',
    steps: [
      ['Decide the type: subtract consecutive terms (same result means AP) or divide consecutive terms (same result means GP).', 'The formulae differ and only one fits.'],
      ['Write down a (first term), and d or r, and the target n.', 'Every formula needs these three pieces.'],
      ['For a missing a, d or r, form equations from the given terms and solve them.', 'Each given term gives one equation in the unknowns.'],
      ['Substitute into the nth term or sum formula and evaluate carefully.', 'Keep brackets so the order of operations is right.'],
      ['For a sum to infinity, first check |r| < 1.', 'The formula is only valid when the terms shrink towards zero.'],
      ['Check by listing the first few terms or testing a known term.', 'A short list confirms the pattern.']
    ],
    example: [
      'Problem A (AP): The first term is 5 and the 10th term is 41. Find d.',
      'T10 = a + 9d = 41 with a = 5, so 5 + 9d = 41, 9d = 36, d = 4.',
      'Problem B (AP, loan): A SACCO loan is repaid with KES 5,000 in month 1, rising by KES 500 each month for 12 months. Find the 12th payment and the total repaid.',
      'a = 5000, d = 500, n = 12. T12 = 5000 + 11(500) = 10,500.',
      'S12 = (12/2)(2 x 5000 + 11 x 500) = 6(10000 + 5500) = 6 x 15500 = 93,000.',
      'Check: average of first and last = (5000 + 10500)/2 = 7750; 7750 x 12 = 93,000.',
      'Problem C (GP): a = 3, r = 2. Find S8.',
      'S8 = 3(2⁸ - 1)/(2 - 1) = 3(255) = 765.',
      'Problem D (infinite GP, bouncing ball): A ball is dropped from 16 m and rebounds to half the previous height each time. Find the total distance travelled before it rests.',
      'It falls 16 m once. Then each rebound goes up and down: 8 + 8, 4 + 4, ... so the up-and-down part is 2(8 + 4 + 2 + ...).',
      'Inside the bracket, a = 8, r = 1/2, so the sum to infinity is 8/(1 - 1/2) = 16. Total = 16 + 2(16) = 48 m.',
      'Problem E (recurring decimal): 0.4545... = 0.45 + 0.0045 + ... with a = 0.45 and r = 0.01. S_∞ = 0.45/0.99 = 45/99 = 5/11.'
    ],
    mistake: 'Using the n instead of n-1 in the nth term, writing a + nd. The first term already has no difference added, so the nth term has n-1 differences. In a GP the same error gives ar^n instead of ar^(n-1).',
    socratic: 'In an AP where the first term is 5 and the 10th term is 41, what is the common difference, and why does the number of steps from term 1 to term 10 equal 9, not 10?',
    examFocus: 'Finding a, d, r from two given terms, sum of n terms of an AP and a GP, sum to infinity, and expressing recurring decimals as fractions.'
  }),

  // 1.7 Matrices (I)
  topic({
    id: 'cbc_g11_math_s1_8',
    title: '1.7 Matrices (I)',
    primerTitle: 'Arrays of Numbers: Operations, Determinant and Inverse',
    tagline: 'A matrix packs a whole table of numbers into one object you can multiply',
    body: 'A matrix is a rectangular array of numbers in rows and columns. Its order is rows x columns, so a matrix with 2 rows and 3 columns has order 2 x 3. Matrices of the same order are added by adding corresponding entries. A matrix is multiplied by a number (a scalar) by multiplying every entry. Two matrices can be multiplied only if the number of columns of the first equals the number of rows of the second; each entry of the product is a row of the first multiplied term by term with a column of the second, then added. Order matters: AB is generally not equal to BA. For a 2 x 2 matrix A = [[a, b], [c, d]], the determinant is ad - bc. If the determinant is not 0, the inverse is A^-1 = (1/(ad - bc)) [[d, -b], [-c, a]], and A A^-1 = I, the identity matrix [[1, 0], [0, 1]]. A pair of simultaneous equations can be written as AX = B and solved by X = A^-1 B.',
    formula: 'det [[a, b], [c, d]] = ad - bc;  A^-1 = (1/det) [[d, -b], [-c, a]];  AX = B ⇒ X = A^-1 B',
    visualBadge: 'Row-by-column multiplication grid',
    context: 'Mama Mboga prices: two purchases with two unknown prices, solved with a single matrix calculation.',
    steps: [
      ['Check the orders: for a product, columns of the first must equal rows of the second.', 'Otherwise the term-by-term multiplication has no partners.'],
      ['Multiply row by column: take a row of the first matrix, a column of the second, multiply matching entries and add.', 'This gives one entry of the product.'],
      ['For the determinant of a 2 x 2 matrix, compute ad - bc.', 'If it is 0, no inverse exists.'],
      ['Form the inverse by swapping a and d, changing the signs of b and c, and dividing by the determinant.', 'This choice makes A A^-1 equal to the identity.'],
      ['To solve simultaneous equations, write them as a matrix equation AX = B.', 'The coefficients, unknowns and constants each sit in their own matrix.'],
      ['Multiply both sides on the left by A^-1 and read off X.', 'A^-1 A = I leaves X alone, and the order of multiplication matters.']
    ],
    example: [
      'Problem A: Multiply P = [[2, 1], [3, 4]] by Q = [[1, 0], [2, 5]].',
      'Row 1 x column 1: 2(1) + 1(2) = 4;  row 1 x column 2: 2(0) + 1(5) = 5.',
      'Row 2 x column 1: 3(1) + 4(2) = 11;  row 2 x column 2: 3(0) + 4(5) = 20.',
      'So PQ = [[4, 5], [11, 20]].',
      'Problem B: At Mama Mboga stall, 3 kg of tomatoes and 2 kg of onions cost KES 170, and 4 kg of tomatoes and 3 kg of onions cost KES 240. Find the price per kg of each.',
      'Let tomatoes cost x and onions y per kg. Then 3x + 2y = 170 and 4x + 3y = 240.',
      'Matrix form: [[3, 2], [4, 3]] [[x], [y]] = [[170], [240]].',
      'Determinant: 3(3) - 2(4) = 9 - 8 = 1.',
      'Inverse: (1/1) [[3, -2], [-4, 3]].',
      'X = [[3, -2], [-4, 3]] [[170], [240]] = [[3(170) - 2(240)], [-4(170) + 3(240)]] = [[510 - 480], [-680 + 720]] = [[30], [40]].',
      'Tomatoes KES 30 per kg and onions KES 40 per kg. Check: 3(30) + 2(40) = 170 and 4(30) + 3(40) = 240.'
    ],
    mistake: 'Multiplying entry by matching entry (like addition) instead of row by column, or writing the inverse as the plain reciprocal of each entry. Also, multiplying B by A^-1 on the right instead of the left: A^-1 B and B A^-1 are different.',
    socratic: 'If one purchase is 3 kg tomatoes and 2 kg onions and another is 4 kg and 3 kg, how could you lay out those numbers in a table so that one calculation finds both prices?',
    examFocus: 'Matrix addition and multiplication, determinant and inverse of a 2 x 2 matrix, and solving simultaneous equations by the matrix method.'
  })
];

const STATION_2 = [
  // 2.1 Approximation and Errors
  topic({
    id: 'cbc_g11_math_s2_2',
    title: '2.1 Approximation and Errors',
    primerTitle: 'Absolute, Relative and Percentage Error, and Limits of Accuracy',
    tagline: 'Every measurement hides a range; error says how big',
    body: 'A measured value is never exact, so we state it to a chosen accuracy such as the nearest 0.1 m. If a length is given as 12.5 m to the nearest 0.1 m, the true length is at least 12.45 m (lower limit) and less than 12.55 m (upper limit), which is the stated value plus or minus half the unit of accuracy. The absolute error is the size of the difference between the approximate value and the true value. The relative error is the absolute error divided by the true (or measured) value, and the percentage error is the relative error times 100. When values are combined, errors combine too. For a product such as area, the greatest value uses the upper limits and the least value uses the lower limits. For a difference, the greatest value is the greatest first minus the least second.',
    formula: 'Absolute error = |approx - exact|;  Relative error = absolute error / exact;  Percentage error = relative error × 100',
    visualBadge: 'Number line showing lower limit, measured value and upper limit',
    context: 'Measuring a shamba with a tape: the area you compute could be off by a square metre or more, which affects land rates and fencing cost.',
    steps: [
      ['State the accuracy unit (nearest 0.1, nearest whole number, and so on).', 'The error bound is half of this unit.'],
      ['Write the lower and upper limit of each measurement as value minus and plus half the unit.', 'Any value in that range would round to the stated one.'],
      ['Compute the stated result from the stated values.', 'This is the approximate value to compare with.'],
      ['For a product or quotient, find the greatest result from the upper limits and the least from the lower limits (for a quotient, upper over lower and lower over upper).', 'The extremes of the answer come from the extremes of the inputs.'],
      ['Find the absolute error as the largest difference between the extreme results and the stated result.', 'This is the worst possible error.'],
      ['Divide by the stated result and multiply by 100 for percentage error.', 'It shows how big the error is relative to the quantity.']
    ],
    example: [
      'Problem: A rectangular plot is measured as 12.5 m by 8.4 m, each to the nearest 0.1 m. Find the limits of its area and the percentage error in the calculated area.',
      'Half the unit is 0.05. Length is between 12.45 and 12.55 m. Width is between 8.35 and 8.45 m.',
      'Calculated area: 12.5 x 8.4 = 105 m².',
      'Greatest area: 12.55 x 8.45 = 106.0475 m².',
      'Least area: 12.45 x 8.35 = 103.9575 m².',
      'Greatest absolute error: 106.0475 - 105 = 1.0475 m² (and 105 - 103.9575 = 1.0425).',
      'Percentage error: (1.0475 / 105) x 100 = 0.9976%, about 1.0%.',
      'So the true area lies between 103.96 m² and 106.05 m².'
    ],
    mistake: 'Writing the limits of 12.5 as 12.4 and 12.6 (using the whole unit instead of half), or using the lower limit of one measurement and the upper limit of another when finding the greatest product. For the greatest product use both upper limits.',
    socratic: 'A tape measure shows 12.5 m, marked every 0.1 m. What is the smallest and largest true length that you would still read as 12.5 m?',
    examFocus: 'Absolute, relative and percentage error, limits of accuracy, and the greatest and least value of sums, products and quotients.'
  }),

  // 2.2 Angle Properties of a Circle (KEEP cbc_g11_math_s2_1)
  topic({
    id: 'cbc_g11_math_s2_1',
    title: '2.2 Angle Properties of a Circle',
    primerTitle: 'Geometric Invariants Inside the Circle',
    tagline: 'Angles subtended by the same chord are equal',
    body: 'A chord is a straight line joining two points on a circle, and an arc is the part of the circle between them. An angle subtended by an arc is formed by lines from the ends of the arc to a point elsewhere. The angle subtended by an arc at the centre is twice the angle subtended at the circumference. Angles in the same segment are equal. The angle in a semicircle (subtended by a diameter) is 90°, because the centre angle is 180°. A cyclic quadrilateral has all four vertices on a circle. Opposite angles of a cyclic quad sum to 180°, and an exterior angle equals the interior opposite angle.',
    formula: 'Angle_centre = 2 × Angle_circumference;  cyclic quad: opposite angles sum to 180°',
    visualBadge: 'Inscribed Angle Theorem Ring',
    context: 'Circular harbour navigation and structural dome construction, and a surveyor setting out points on a circular roundabout.',
    steps: [
      ['Mark the centre O and identify the arc or chord in question.', 'The theorem compares angles standing on the same arc.'],
      ['Check which angles stand on the same arc: one at the centre, others at the circumference.', 'The rules apply only to angles on the same arc.'],
      ['Apply: angle at the centre = 2 x angle at the circumference; angles in the same segment are equal; angle in a semicircle = 90°.', 'These follow from isosceles triangles formed by radii.'],
      ['If the four points form a quadrilateral inside the circle, use opposite angles sum to 180°.', 'Opposite angles stand on arcs that together form the whole circle (360°).'],
      ['Write each statement with its reason in brackets.', 'Marks are awarded for the reason as well as the value.'],
      ['Check that angles in a triangle and in a straight line still add up.', 'This catches arithmetic or reasoning slips.']
    ],
    example: [
      'Problem: Points A, B, C and D lie on a circle with centre O, in that order round the circle. Angle AOB = 140°. Find angle ACB when C is on the major arc AB, and angle ADB when D is on the minor arc AB.',
      'Take C on the major arc AB. Angle at the centre = 2 x angle at the circumference, so angle ACB = 140° / 2 = 70° (angle at the centre is twice the angle at the circumference).',
      'Take D on the minor arc AB. ACBD is a cyclic quadrilateral with opposite angles ACB and ADB, so angle ADB = 180° - 70° = 110° (opposite angles of a cyclic quadrilateral sum to 180°).',
      'Second case: if AB is a diameter, angle AOB = 180°, so angle ACB = 90° (angle in a semicircle).',
      'Third case: in cyclic quadrilateral PQRS, angle PQR = 95°. Then angle PSR = 180° - 95° = 85°.'
    ],
    mistake: 'Applying the centre rule when the angle at the circumference stands on a different arc, for example halving the reflex angle or using the minor arc when the point is on it. Always check the angle at the circumference is on the opposite side of the chord from the arc.',
    socratic: 'If a diameter subtends an angle at the circumference, why must that angle always be exactly 90°?',
    examFocus: 'KSSEA 8-Mark Proof: Stating precise geometric reasons (e.g. [A1] for "angles in the same segment are equal").'
  }),

  // 2.3 Commercial Arithmetic
  topic({
    id: 'cbc_g11_math_s2_3',
    title: '2.3 Commercial Arithmetic',
    primerTitle: 'Compound Interest, Depreciation, Hire Purchase and Tax',
    tagline: 'Compound interest earns interest on interest',
    body: 'Principal is the money first invested or borrowed. With simple interest, only the principal earns interest. With compound interest, the interest is added to the amount each period and then earns interest itself. If P is the principal, r is the rate per period as a decimal and n is the number of periods, the amount is A = P(1 + r)^n, and the compound interest is A - P. Depreciation is a fall in value over time, and it uses the same idea with a factor below 1: V = P(1 - r)^n. Hire purchase means paying a deposit and then regular instalments, so the total paid is the deposit plus all instalments, which is more than the cash price. Value Added Tax (VAT) is a percentage added to the price, currently 16% in Kenya, so a price with VAT is the price without VAT times 1.16.',
    formula: 'A = P(1 + r)^n;  V = P(1 - r)^n;  Hire purchase total = deposit + instalments;  Price with VAT = price × 1.16',
    visualBadge: 'Growth curve versus straight-line simple interest',
    context: 'A chama or M-Pesa savings product paying interest, buying a motorbike on hire purchase, and VAT charged on goods.',
    steps: [
      ['Identify the principal P, the rate per period and the number of periods n.', 'The rate and the period must match: yearly rate with years, monthly with months.'],
      ['Convert the rate to a decimal and form the factor (1 + r) for growth or (1 - r) for depreciation.', 'The factor is what the amount is multiplied by each period.'],
      ['Raise the factor to the power n and multiply by P.', 'Repeated multiplication each period is a power.'],
      ['For compound interest subtract the principal from the final amount.', 'Interest is only the extra, not the whole amount.'],
      ['For hire purchase, work out the deposit, then all instalments, then add.', 'The cost over time is the deposit plus every payment.'],
      ['Compare with the cash price to find the extra paid.', 'This shows the cost of buying on credit.']
    ],
    example: [
      'Problem A: A chama invests KES 80,000 at 10% per annum compound interest for 3 years. Find the amount and the interest.',
      'P = 80000, r = 0.10, n = 3. A = 80000(1.10)³ = 80000 x 1.331 = 106,480.',
      'Interest = 106,480 - 80,000 = KES 26,480. (Simple interest would give only 80000 x 0.10 x 3 = 24,000.)',
      'Problem B: A motorbike costing KES 150,000 depreciates by 15% each year. Find its value after 2 years.',
      'V = 150000(1 - 0.15)² = 150000 x 0.85² = 150000 x 0.7225 = KES 108,375.',
      'Problem C: A cash price of KES 60,000 can be paid by a 20% deposit and 12 equal monthly instalments of KES 5,000. Find the total paid and the extra over the cash price.',
      'Deposit = 20% of 60,000 = 12,000. Instalments = 12 x 5,000 = 60,000. Total = 72,000.',
      'Extra over cash price = 72,000 - 60,000 = KES 12,000.',
      'Problem D: A phone costs KES 25,000 before VAT. With VAT at 16%: 25,000 x 1.16 = KES 29,000.'
    ],
    mistake: 'Calculating compound interest as P x r x n (that is simple interest), or using the rate per year when interest is added every month. Also writing the interest as the final amount without subtracting the principal.',
    socratic: 'If you leave your interest in the account this year, does it earn interest next year, and how would that change the way you calculate the second year?',
    examFocus: 'Compound interest and depreciation, hire purchase comparisons with cash price, and calculations with VAT and income tax.'
  }),

  // 2.4 Circles, Chords and Tangents
  topic({
    id: 'cbc_g11_math_s2_4',
    title: '2.4 Circles, Chords and Tangents',
    primerTitle: 'Lengths on Chords and Tangents',
    tagline: 'A tangent touches a circle at one point and is perpendicular to the radius there',
    body: 'A tangent is a line that touches a circle at exactly one point, and the radius to that point is perpendicular to the tangent. Two tangents drawn from the same outside point are equal in length. If two chords AB and CD cross at a point X inside the circle, then AX x XB = CX x XD. If a secant (a line cutting the circle at A and B) and a tangent PT are drawn from an outside point P, then PT² = PA x PB. The alternate segment theorem says the angle between a tangent and a chord equals the angle in the alternate (opposite) segment. These facts let you find unknown lengths by forming an equation, and Pythagoras applies because the radius meets the tangent at 90°.',
    formula: 'AX × XB = CX × XD;  PT² = PA × PB;  tangent ⊥ radius',
    visualBadge: 'Two chords crossing and a tangent from an external point',
    context: 'A straight road touching a circular roundabout, and a pipe cutting across a circular tank.',
    steps: [
      ['Sketch the circle and label the given lengths.', 'A diagram shows which theorem applies.'],
      ['Decide whether two chords cross inside, or a tangent and secant leave an outside point.', 'The two cases use different products.'],
      ['For crossing chords write AX x XB = CX x XD.', 'The products of the two parts of each chord are equal.'],
      ['For a tangent and secant write PT² = PA x PB, where PB is the whole secant from P.', 'PT² equals the product of the whole secant and its outside part.'],
      ['For a tangent and radius, use the right angle at the point of contact and Pythagoras.', 'The tangent is perpendicular to the radius.'],
      ['Solve and check that the lengths are positive and sensible.', 'A length cannot be negative.']
    ],
    example: [
      'Problem A: Chords AB and CD cross at X inside a circle. AX = 6 cm, XB = 4 cm and CX = 3 cm. Find XD.',
      'AX x XB = CX x XD, so 6 x 4 = 3 x XD, giving 24 = 3 x XD and XD = 8 cm.',
      'Problem B: From a point P outside a circle, a secant meets the circle at A and B, with PA = 4 cm and AB = 5 cm. Find the tangent length PT.',
      'PB = PA + AB = 4 + 5 = 9 cm. PT² = PA x PB = 4 x 9 = 36, so PT = 6 cm.',
      'Problem C: The centre O of a circular roundabout is 13 m from a point P on a straight road touching the roundabout. The radius is 5 m. Find the distance PT from P to the touching point T.',
      'Radius OT is perpendicular to the tangent PT, so triangle OTP has a right angle at T.',
      'PT² = OP² - OT² = 169 - 25 = 144, so PT = 12 m.'
    ],
    mistake: 'In the tangent-secant rule, using PA x AB (the outside part times the inside part) instead of PA x PB, where PB is the whole secant. Another is to forget that the tangent meets the radius at 90° and use a wrong triangle.',
    socratic: 'If a straight road just touches a circular roundabout, what angle does the road make with the line from the centre to the touching point, and how could that help you find a length?',
    examFocus: 'Intersecting chords, tangent and secant lengths, tangents from an external point, and the alternate segment theorem.'
  }),

  // 2.5 Trigonometry (II)
  topic({
    id: 'cbc_g11_math_s2_5',
    title: '2.5 Trigonometry (II)',
    primerTitle: 'Trigonometric Ratios of Any Angle, Graphs and Equations',
    tagline: 'On the unit circle, sine is the height and cosine is the width',
    body: 'In a right triangle, sin = opposite/hypotenuse, cos = adjacent/hypotenuse and tan = opposite/adjacent. For angles beyond 90°, place the angle on a unit circle (radius 1) measured from the positive x-axis: cos is the x-coordinate, sin is the y-coordinate and tan = sin/cos. The signs follow the quadrants (All positive in the first, Sine in the second, Tangent in the third, Cosine in the fourth: CAST). Because of this, sin(180° - x) = sin x and cos(180° - x) = -cos x, so an equation such as sin x = 0.5 has two solutions between 0° and 360°. The graphs of sin and cos repeat every 360°, with a maximum 1 and minimum -1. For y = a + b sin(kx), the amplitude is b, the period is 360°/k, and a is the mid-level. The identity sin²x + cos²x = 1 holds for every angle.',
    formula: 'tan x = sin x / cos x;  sin²x + cos²x = 1;  sin(180° - x) = sin x;  cos(180° - x) = -cos x',
    visualBadge: 'Unit circle with CAST quadrants and sine wave',
    context: 'Tide height at Mombasa rising and falling in a regular cycle through the day.',
    steps: [
      ['Isolate the trig ratio on one side of the equation.', 'You need sin x, cos x or tan x on its own to read an angle from it.'],
      ['Use the inverse key to find the principal (calculator) angle.', 'This gives one solution, in the first quadrant if the ratio is positive.'],
      ['Use CAST and symmetry to find the other angles in the range: sin x = sin(180° - x), cos x = cos(360° - x), tan x = tan(180° + x).', 'A calculator returns only one of the solutions.'],
      ['Check each angle lies within the stated range.', 'Out of range answers are not solutions to the question asked.'],
      ['For a graph y = a + b sin(kx), read off amplitude b, period 360°/k and mid-level a.', 'These describe the highest, lowest and repeat of the wave.'],
      ['Substitute back to verify.', 'A quick check avoids sign or quadrant slips.']
    ],
    example: [
      'Problem A: The tide height in metres at a port is h = 2 + sin(30t)°, where t is hours after midnight. Find the highest and lowest tides and when high tide first occurs.',
      'sin is between -1 and 1, so h is between 2 - 1 = 1 m and 2 + 1 = 3 m. High tide 3 m occurs when sin(30t) = 1, so 30t = 90° and t = 3 hours.',
      'Period = 360/30 = 12 hours, so low tide of 1 m occurs 6 hours later, at t = 9 (30 x 9 = 270°, sin 270° = -1).',
      'Problem B: When is the tide exactly 2.5 m, for 0 ≤ t ≤ 12?',
      '2 + sin(30t) = 2.5, so sin(30t) = 0.5.',
      'Principal angle: 30t = 30°, so t = 1. Second angle: 30t = 180° - 30° = 150°, so t = 5.',
      'So the tide is 2.5 m at 1 hour and at 5 hours after midnight.',
      'Problem C: sin θ = 3/5 with θ acute. Find cos θ and tan θ.',
      'cos²θ = 1 - sin²θ = 1 - 9/25 = 16/25, so cos θ = 4/5 (positive, acute). tan θ = (3/5)/(4/5) = 3/4.',
      'Problem D: Solve 2 cos x + 1 = 0 for 0° ≤ x ≤ 360°. cos x = -1/2. Principal angle from the calculator: 120°. The other: 360° - 120° = 240°.'
    ],
    mistake: 'Giving only the calculator angle, for example sin x = 0.5 giving only x = 30°. Between 0° and 360° there are two solutions, 30° and 150°, and the question usually asks for both.',
    socratic: 'The sea level at the coast rises and falls in a repeating cycle. At what two times in one cycle is the water exactly halfway up, and what do they have in common on the sine curve?',
    examFocus: 'Trigonometric ratios of angles up to 360°, graphs of sine, cosine and tangent, amplitude and period, and solving simple trigonometric equations.'
  }),

  // 2.6 Graphical Methods
  topic({
    id: 'cbc_g11_math_s2_6',
    title: '2.6 Graphical Methods',
    primerTitle: 'Tables of Values, Curves and Solving Equations by Graph',
    tagline: 'Where two graphs meet, their equations are both true',
    body: 'A graph shows how one quantity (y) depends on another (x). To draw a curve, make a table of values by substituting chosen x values into the equation, plot the points, and join them with a smooth curve. For a quadratic y = ax² + bx + c, the graph is a parabola; its roots are where it crosses the x-axis (y = 0) and its turning point is the highest or lowest point. To solve an equation graphically, draw the curve and read the x value where it meets a second graph: to solve f(x) = k, draw y = k and read the x values at the intersection points. If the equation needs rearranging first, rewrite it into the form (the curve you drew) = (a straight line). The gradient of a curve at a point is the gradient of the tangent drawn there, found by taking two points on the tangent.',
    formula: 'Roots of f(x) = 0 at y = 0;  solve f(x) = k using the line y = k;  Gradient = (y₂ - y₁)/(x₂ - x₁)',
    visualBadge: 'Parabola cut by horizontal and sloping lines',
    context: 'The path of water from a hose watering a shamba, with height h metres at horizontal distance x metres.',
    steps: [
      ['Choose x values over a sensible range and substitute each into the equation to build a table.', 'A table gives the coordinates to plot.'],
      ['Plot the points on a scale that fits the paper and join them with a smooth curve.', 'A smooth curve, not straight segments, because the equation is continuous.'],
      ['To solve f(x) = 0 read where the curve cuts the x-axis.', 'On the x-axis, y is 0.'],
      ['To solve f(x) = k draw the line y = k and read the x values where it meets the curve.', 'At an intersection the curve value equals k.'],
      ['If the equation is different from the curve, rearrange it so one side is the curve and the other side is a line to draw.', 'You can draw only one curve and add the lines.'],
      ['For a gradient, draw a tangent at the point and use two points on the tangent.', 'A tangent touches the curve and has the same slope as the curve there.']
    ],
    example: [
      'Problem: The height of water from a hose is h = 3 + 2x - x² (metres) at x metres from the nozzle. Draw the graph for -2 ≤ x ≤ 4 and use it to solve h = 0 and h = 2.',
      'Table: x = -2: 3 - 4 - 4 = -5;  x = -1: 3 - 2 - 1 = 0;  x = 0: 3;  x = 1: 3 + 2 - 1 = 4;  x = 2: 3 + 4 - 4 = 3;  x = 3: 3 + 6 - 9 = 0;  x = 4: 3 + 8 - 16 = -5.',
      'Plot (-2, -5), (-1, 0), (0, 3), (1, 4), (2, 3), (3, 0), (4, -5) and join. The turning point (the highest point) is (1, 4).',
      'h = 0: the curve crosses the x-axis at x = -1 and x = 3.',
      'h = 2: draw the horizontal line h = 2. It meets the curve where 3 + 2x - x² = 2, that is x² - 2x - 1 = 0. By the formula x = 1 ± √2, so x = 2.41 and x = -0.41, which is what the graph shows to the nearest 0.1.',
      'Gradient at x = 2: the tangent through (2, 3) falls about 2 units for each 1 unit across, so the gradient is about -2. Check with points close on each side: h(2.1) = 2.79 and h(1.9) = 3.19, so (2.79 - 3.19)/0.2 = -2.'
    ],
    mistake: 'Joining points with ruled straight segments, or reading the intersection with a line other than the one for the equation. If you solve 3 + 2x - x² = 2, the line is h = 2, not h = 0.',
    socratic: 'At the places where the water is exactly at ground level, what is the value of h, and where on your graph do you look for that?',
    examFocus: 'Drawing graphs from a table, solving equations using intersections, and estimating the gradient of a curve from a tangent.'
  })
];

const STATION_STATS = [
  // 3.1 Permutations and Combinations
  topic({
    id: 'cbc_g11_math_s4_1',
    title: '3.1 Permutations and Combinations',
    primerTitle: 'Counting Arrangements and Selections',
    tagline: 'Permutations care about order; combinations do not',
    body: 'The factorial n! is the product n x (n-1) x ... x 1, and 0! = 1. A permutation is an arrangement in which order matters: choosing a chairperson, then a secretary, then a treasurer from 8 people gives 8 x 7 x 6 = 336 ways, written 8P3 = 8!/(8-3)!. A combination is a selection in which order does not matter, such as picking a 3-person committee. Each committee of 3 can be arranged in 3! = 6 orders, so the number of combinations is the number of permutations divided by 3!: nCr = nPr / r! = n!/[r!(n-r)!]. When some items are identical, divide by the factorial of each repeated count: the letters of MAMA can be arranged in 4!/(2! x 2!) ways. For conditions such as at least one, count the total and subtract the cases you do not want.',
    formula: 'nPr = n!/(n - r)!;  nCr = n!/[r!(n - r)!];  arrangements with repeats = n!/(p! q! ...)',
    visualBadge: 'Tree of choices for office bearers',
    context: 'A chama choosing officials from its members, and arranging the order in which matatus leave a stage.',
    steps: [
      ['Ask: does the order of choosing matter?', 'This decides between permutation and combination.'],
      ['If order matters, multiply the choices at each position (n, then n-1, then n-2, and so on) or use nPr.', 'Each choice reduces what remains.'],
      ['If order does not matter, use nCr = nPr / r!.', 'Dividing by r! removes the repeated orderings of the same group.'],
      ['If some items are identical, divide by the factorial of each repeat.', 'Swapping identical items gives no new arrangement.'],
      ['For "at least one", count all selections and subtract the selections with none.', 'It is shorter than adding several cases.'],
      ['Evaluate with a calculator or by cancelling factorials, and check it is a whole number.', 'A count must be an integer.']
    ],
    example: [
      'Problem A: A chama has 8 members. In how many ways can a chairperson, secretary and treasurer be chosen?',
      'Order matters (the roles differ): 8P3 = 8 x 7 x 6 = 336.',
      'Problem B: In how many ways can a committee of 3 be chosen?',
      'Order does not matter: 8C3 = 336 / 3! = 336 / 6 = 56.',
      'Problem C: The chama has 5 men and 3 women. How many committees of 3 have at least one woman?',
      'All committees = 56. Committees with no woman (all men) = 5C3 = (5 x 4 x 3)/6 = 10.',
      'At least one woman = 56 - 10 = 46.',
      'Problem D: How many different arrangements are there of the letters of MAMA?',
      '4! = 24, but the two Ms are identical and the two As are identical: 24 / (2! x 2!) = 24/4 = 6.',
      'List: MAMA, MAAM, AMAM, AMMA, AAMM, MMAA. That is 6.'
    ],
    mistake: 'Using 8P3 when the order of selection does not matter, which counts each committee 6 times. A second slip is to forget to divide by the factorial of the repeated letters.',
    socratic: 'If Achieng, Baraka and Chebet are chosen as chair, secretary and treasurer, is the same group in a different order a different outcome, and what if they were only picked as a committee?',
    examFocus: 'Factorial notation, permutations and combinations with and without conditions, and arrangements with repeated items.'
  }),

  // 3.2 Probability II
  topic({
    id: 'cbc_g11_math_s4_2',
    title: '3.2 Probability II',
    primerTitle: 'Dependent Events, Conditional Probability and Tree Diagrams',
    tagline: 'When nothing is put back, the second chance depends on the first draw',
    body: 'Probability is the number of favourable outcomes divided by the number of equally likely outcomes, a number from 0 to 1. Two events are independent if one does not affect the chance of the other, and then P(A and B) = P(A) x P(B). They are dependent if the first changes the chance of the second, as when items are drawn without replacement. The conditional probability P(B | A) is the probability of B given that A has happened, and P(A and B) = P(A) x P(B | A). A tree diagram shows each stage as a set of branches with probabilities; multiply along a branch to get the probability of that path, and add the branch probabilities for the outcomes that fit the event. The union rule is P(A or B) = P(A) + P(B) - P(A and B). The probability of "at least one" is 1 minus the probability of none.',
    formula: 'P(A and B) = P(A) × P(B | A);  P(A or B) = P(A) + P(B) - P(A and B);  P(at least one) = 1 - P(none)',
    visualBadge: 'Two-stage tree diagram without replacement',
    context: 'Mama Mboga picks two mangoes from a basket of 5 ripe and 3 unripe without looking.',
    steps: [
      ['List the equally likely outcomes at the first stage and write the probabilities on the first branches.', 'The branches at a stage must add to 1.'],
      ['For the second stage, change the numbers to reflect what was removed (without replacement).', 'The total and the count of the drawn kind both fall by 1.'],
      ['Multiply along each branch to get the probability of that path.', 'Both things must happen, so we multiply.'],
      ['Identify which paths make up the event and add their probabilities.', 'The paths are separate outcomes, so we add.'],
      ['For "at least one", compute 1 minus the probability of none.', 'It avoids adding several paths.'],
      ['Check that all path probabilities add to 1.', 'This confirms nothing was missed.']
    ],
    example: [
      'Problem: A basket has 5 ripe (R) and 3 unripe (U) mangoes. Two are picked without replacement.',
      'First pick: P(R) = 5/8, P(U) = 3/8.',
      'If the first was R: 4 R and 3 U remain, so P(R) = 4/7 and P(U) = 3/7. If the first was U: 5 R and 2 U remain, so P(R) = 5/7 and P(U) = 2/7.',
      'Both ripe: P(RR) = 5/8 x 4/7 = 20/56 = 5/14.',
      'Different kinds: P(RU) + P(UR) = 5/8 x 3/7 + 3/8 x 5/7 = 15/56 + 15/56 = 30/56 = 15/28.',
      'At least one unripe: 1 - P(RR) = 1 - 5/14 = 9/14.',
      'Conditional: P(second ripe | first ripe) = 4/7.',
      'Check: P(RR) + P(RU) + P(UR) + P(UU) = 20/56 + 15/56 + 15/56 + 6/56 = 56/56 = 1.'
    ],
    mistake: 'Using 5/8 x 5/8 for the second pick, as if the first mango were put back. Without replacement the denominator drops to 7 and the numerator drops if the same kind was taken.',
    socratic: 'After you take one ripe mango out of 8 and keep it, how many mangoes remain, and how many of them are ripe?',
    examFocus: 'Tree diagrams for dependent events, conditional probability, the union rule, and "at least one" probabilities.'
  })
];

const STATION_CALCULUS = [
  // 4.1 Functions
  topic({
    id: 'cbc_g11_math_s3_2',
    title: '4.1 Functions',
    primerTitle: 'Domain, Range, Composite and Inverse Functions',
    tagline: 'A function gives exactly one output for each input',
    body: 'A function is a rule that gives exactly one output for each input. We write f(x) for the output of f when the input is x. The domain is the set of allowed inputs and the range is the set of outputs that actually occur. For f(x) = 1/(x - 2) the domain excludes x = 2, because dividing by 0 is not defined. A composite function applies one function and then another: fg(x) means f(g(x)), so g acts first. In general fg and gf are different. The inverse function f^-1 undoes f, so f^-1(f(x)) = x. To find it, write y = f(x), make x the subject, then swap names so the input is x. Only a function with one input for each output (a one-to-one function) has an inverse. The graph of f^-1 is the reflection of the graph of f in the line y = x.',
    formula: 'fg(x) = f(g(x));  f^-1(f(x)) = x;  inverse: y = f(x), make x the subject',
    visualBadge: 'Function machine with input, rule and output',
    context: 'A stall charges KES 50 per kg of maize flour plus KES 200 delivery; the inverse tells you how many kilograms a given budget buys.',
    steps: [
      ['Name the function and state the rule in terms of x.', 'You need a precise rule to apply to any input.'],
      ['For the domain, list values that make the rule undefined (division by 0, square root of a negative) and exclude them.', 'Inputs must produce a real output.'],
      ['For a composite fg(x), put g(x) into every x of f.', 'g acts first and its output becomes the input of f.'],
      ['For the inverse, write y = f(x), make x the subject, and write the result as f^-1(x).', 'The inverse undoes each operation in the reverse order.'],
      ['Check by testing f(f^-1(x)) = x or a number.', 'An inverse must return the original input.'],
      ['Interpret the result in the situation, with units.', 'The inverse often answers the reverse question.']
    ],
    example: [
      'Problem A: C(n) = 50n + 200 gives the cost in KES of n kg of flour with delivery. Find the inverse and the kilograms bought for KES 1,200.',
      'Let y = 50n + 200. Subtract 200: y - 200 = 50n. Divide by 50: n = (y - 200)/50.',
      'So C^-1(x) = (x - 200)/50. For KES 1,200: (1200 - 200)/50 = 1000/50 = 20 kg.',
      'Check: C(20) = 50(20) + 200 = 1200.',
      'Problem B: f(x) = x + 5 and g(x) = 2x. Find fg(3) and gf(3).',
      'g(3) = 6, so fg(3) = f(6) = 11. f(3) = 8, so gf(3) = g(8) = 16. The order matters.',
      'In general fg(x) = f(2x) = 2x + 5 and gf(x) = g(x + 5) = 2x + 10.',
      'Problem C: State the domain of f(x) = 1/(x - 2) and the range of g(x) = x² + 1.',
      'Domain of f: all real x except x = 2. Range of g: x² is never negative, so g(x) is at least 1: g(x) ≥ 1.',
      'Problem D: Find the inverse of f(x) = 3x - 6. y = 3x - 6, so x = (y + 6)/3, giving f^-1(x) = (x + 6)/3. Check: f(f^-1(x)) = 3(x + 6)/3 - 6 = x.'
    ],
    mistake: 'Reading fg(x) as f(x) x g(x), or applying f first. fg(x) means f(g(x)), so g is applied first. Another is to write f^-1(x) as 1/f(x), which is the reciprocal, not the inverse.',
    socratic: 'If a stall charges 50 shillings a kilogram plus 200 for delivery, and a customer pays 1,200 shillings, which steps would you undo, and in which order, to find the kilograms?',
    examFocus: 'Function notation, domain and range, composite functions, and finding and using an inverse function.'
  }),

  // 4.2 Differentiation (I) (KEEP cbc_g11_math_s3_1)
  topic({
    id: 'cbc_g11_math_s3_1',
    title: '4.2 Differentiation (I)',
    primerTitle: 'Instantaneous Rate of Change',
    tagline: 'Shrinking the secant line into an exact tangent',
    body: 'Calculus finds the exact slope of a curve at a single point. The gradient of a straight line is rise over run, but a curve changes slope, so we take two points on the curve a small distance h apart, find the gradient of the line joining them (a secant), and let h shrink towards 0. The value it approaches is the derivative dy/dx, the gradient of the tangent. For y = x² this gives (2xh + h²)/h = 2x + h, which tends to 2x. In general, d/dx(ax^n) = n a x^(n-1). A stationary point is where the tangent is horizontal, so dy/dx = 0. At a maximum the gradient changes from positive to negative and d²y/dx² is negative; at a minimum it changes from negative to positive and d²y/dx² is positive. Differentiating gives rate of change, so it also gives the best size for a design: the largest area, the least material.',
    formula: 'd/dx(ax^n) = n·a·x^(n-1),  dy/dx = 0 ⟹ Turning Point',
    visualBadge: 'Rollercoaster Peak & Tangent Line',
    context: 'Maximizing farm profit per acre and minimizing sheet metal needed for a cylindrical can; a farmer choosing the shape of a fenced maize plot.',
    steps: [
      ['Write the function and rewrite any roots or fractions as powers of x.', 'The rule d/dx(ax^n) works on powers.'],
      ['Differentiate term by term: multiply by the power and reduce the power by 1; a constant differentiates to 0.', 'Each term changes at its own rate and constants do not change.'],
      ['Substitute the x value to find the gradient at a point, or the equation of the tangent using y - y1 = m(x - x1).', 'The derivative gives the gradient, and a line needs a point and a gradient.'],
      ['For turning points set dy/dx = 0 and solve.', 'The tangent is horizontal at a peak or valley, so the gradient is 0.'],
      ['Classify with d²y/dx²: negative gives a maximum, positive gives a minimum.', 'The second derivative tells if the gradient is falling or rising there.'],
      ['Find the y value and interpret, with units.', 'The answer should say what the quantity is.']
    ],
    example: [
      'Problem A (from first principles): Find the gradient of y = x² at x = 3.',
      'Gradient of the secant from x = 3 to x = 3 + h: [(3 + h)² - 9]/h = (6h + h²)/h = 6 + h. As h → 0 this tends to 6. The rule gives dy/dx = 2x = 6. They agree.',
      'Problem B: Find and classify the turning points of y = x³ - 6x² + 9x + 2.',
      'dy/dx = 3x² - 12x + 9 = 3(x - 1)(x - 3). Setting it to 0: x = 1 or x = 3.',
      'At x = 1: y = 1 - 6 + 9 + 2 = 6. At x = 3: y = 27 - 54 + 27 + 2 = 2.',
      'd²y/dx² = 6x - 12. At x = 1 it is -6 (negative), so (1, 6) is a maximum. At x = 3 it is +6 (positive), so (3, 2) is a minimum.',
      'Tangent at x = 2: y = 8 - 24 + 18 + 2 = 4 and gradient 3(4) - 12(2) + 9 = -3, so y - 4 = -3(x - 2), that is y = -3x + 10.',
      'Problem C: A farmer has 100 m of fencing for a rectangular maize plot. Find the dimensions that give the greatest area.',
      'Let the width be x m. Then the length is (100 - 2x)/2 = 50 - x, and A = x(50 - x) = 50x - x².',
      'dA/dx = 50 - 2x = 0 gives x = 25. d²A/dx² = -2, negative, so a maximum.',
      'The plot is 25 m by 25 m and the greatest area is 625 m².'
    ],
    mistake: 'Differentiating a constant as if it had a power, for example d/dx(5) = 5, when it is 0. Another is to stop at dy/dx = 0 and forget to substitute back to find the y value, or to give the area-maximising x as the area.',
    socratic: 'Why does setting dy/dx = 0 find both the peak of a hill and the bottom of a valley?',
    examFocus: 'KSSEA Section B: Differentiating a cubic polynomial and testing d²y/dx² to classify stationary points.'
  })
];

const CBC_CORE_MATHS_G11_MAPS = [
  {
    curriculum: 'CBC',
    grade: 11,
    subject: 'Mathematics',
    code: 'MATH-G11',
    trackPathway: 'STEM',
    title: 'CBE Grade 11 (Senior STEM) Core Mathematics Metro Line',
    description: 'Grade 11 Core Mathematics aligned to the KICD Core Mathematics Grade 11 design (Oct 2025): 4 strands and 17 sub-strands.',
    stations: [
      {
        id: 'cbc_g11_math_s1',
        number: 1,
        title: '1.0 Numbers and Algebra',
        strand: 'Strand 1.0: Numbers and Algebra',
        icon: '∑',
        status: 'available',
        summary: 'Quadratic expressions and equations, irrational numbers, linear inequalities, logarithms, formulae and variations, sequences and series, and matrices.',
        subtopics: STATION_1
      },
      {
        id: 'cbc_g11_math_s2',
        number: 2,
        title: '2.0 Measurements and Geometry',
        strand: 'Strand 2.0: Measurements and Geometry',
        icon: '△',
        status: 'available',
        summary: 'Approximation and errors, angle properties of a circle, commercial arithmetic, circles, chords and tangents, trigonometry, and graphical methods.',
        subtopics: STATION_2
      },
      {
        id: 'cbc_g11_math_s4',
        number: 3,
        title: '3.0 Statistics and Probability',
        strand: 'Strand 3.0: Statistics and Probability',
        icon: 'Σ',
        status: 'available',
        summary: 'Counting with permutations and combinations, and probability of dependent events with tree diagrams.',
        subtopics: STATION_STATS
      },
      {
        id: 'cbc_g11_math_s3',
        number: 4,
        title: '4.0 Calculus',
        strand: 'Strand 4.0: Calculus',
        icon: '∫',
        status: 'available',
        summary: 'Functions, and differentiation of polynomials with gradients, tangents and turning points.',
        subtopics: STATION_CALCULUS
      }
    ]
  }
];

const RETIRED_IDS = ['cbc_g11_math_s1_2'];

module.exports = { maps: CBC_CORE_MATHS_G11_MAPS, retiredIds: RETIRED_IDS };
