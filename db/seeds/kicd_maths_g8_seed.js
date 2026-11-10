'use strict';
// CBC JUNIOR SCHOOL MATHEMATICS, GRADE 8
// Five strands and sixteen sub-strands, following the KICD Mathematics Grade 8 design
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

S1.push(P('cbc_g8_math_s1_1', '1.1 Integers', {
  pt: 'Adding, Subtracting, Multiplying and Dividing Numbers Above and Below Zero',
  tag: 'Integers are whole numbers on both sides of zero, and every sign rule can be read from the number line',
  body: 'An integer is a whole number that may be positive, negative or zero, for example -7, 0 and 12. On the number line, positive integers lie to the right of zero and negative integers to the left; a number further right is always greater. The absolute value of an integer is its distance from zero, so |-7| = 7. To add a positive number you move right; to add a negative number you move left. Subtracting a number is the same as adding its opposite, so 6 - (-4) = 6 + 4. Multiplication is repeated addition, and that gives the sign rules: two numbers with the same sign give a positive product, and two numbers with different signs give a negative product. Division follows the same sign rules as multiplication. When a calculation has several operations, work in this order: brackets, then multiplication and division from left to right, then addition and subtraction from left to right.',
  f: 'a - (-b) = a + b  |  (-a)(-b) = ab  |  (-a)(b) = -ab',
  vis: 'A horizontal number line from -10 to 10 with arrows showing a move left and a move right',
  ctx: 'A M-Pesa Fuliza overdraft is a negative balance. If your account shows -150 shillings, you owe 150 shillings, and a deposit of 400 moves you to the right on the number line.',
  q: 'If your balance is -150 shillings and you receive 400 shillings, which way do you move on the number line, and where do you land?',
  exam: 'Evaluating expressions that mix addition, subtraction, multiplication and division of positive and negative integers in the correct order, and word problems on temperature, money and levels.',
  steps: [
    'Draw or picture the number line and mark the starting integer, because direction and size of each move are easy to see there.',
    'Replace every subtraction of a negative number by addition of its positive, for example 6 - (-4) becomes 6 + 4, because subtracting a debt is the same as gaining.',
    'Do each multiplication or division using the sign rule: same signs give positive, different signs give negative, because repeated addition of a negative number keeps going left.',
    'Follow the order: brackets first, then multiplication and division from left to right, then addition and subtraction from left to right, because this is the agreed order that gives everyone the same answer.',
    'Finish the additions and subtractions from left to right, moving right for positive and left for negative, because each integer is a move on the line.',
    'Check that the sign and size of the answer are sensible, for example a debt that was partly paid should still be a smaller negative or become positive.'
  ],
  ex: [
    'Problem 1: Mwangi has a Fuliza balance of -150 shillings. He deposits 400 shillings and then pays 275 shillings for electricity. Find his balance.',
    'Start: -150. After the deposit: -150 + 400 = 250.',
    'After paying: 250 - 275 = -25. He owes 25 shillings.',
    'Problem 2: Evaluate 6 - (-4) x 3 + (-12) / 4.',
    'Multiplication first: (-4) x 3 = -12, since the signs differ.',
    'Division: (-12) / 4 = -3, since the signs differ.',
    'The expression becomes 6 - (-12) + (-3) = 6 + 12 - 3.',
    '6 + 12 = 18 and 18 - 3 = 15. The answer is 15.',
    'Common mistake: working from left to right and doing 6 - (-4) first to get 10, then 10 x 3. Multiplication must come before addition and subtraction.'
  ]
}));

S1.push(P('cbc_g8_math_s1_3', '1.2 Fractions', {
  pt: 'Working with Parts of a Whole: Mixed Numbers, Addition, Subtraction, Multiplication and Division',
  tag: 'A fraction is a number of equal parts, so first make the parts the same size, then count them',
  body: 'A fraction a/b names a parts out of b equal parts of a whole; the bottom number is the denominator and the top number is the numerator. A mixed number such as 4 3/4 is a whole number and a fraction together, and it equals the improper fraction 19/4 because 4 x 4 + 3 = 19 quarters. To add or subtract fractions the parts must be the same size, so we change to a common denominator, usually the lowest common multiple of the denominators, and then add or subtract only the numerators. To multiply fractions, multiply the numerators together and the denominators together, and cancel common factors first to keep numbers small. To divide by a fraction, multiply by its reciprocal, which is the fraction turned upside down, because dividing asks how many of one size fit into the other. In a calculation with several operations, brackets come first, then multiplication and division, then addition and subtraction, and mixed numbers are converted to improper fractions before multiplying or dividing.',
  f: 'a/b + c/d = (ad + bc)/(bd)  |  a/b x c/d = ac/bd  |  a/b / (c/d) = a/b x d/c',
  vis: 'A rectangle divided into 12 equal parts with 9 shaded to show 3/4',
  ctx: 'Mama Mboga sells beans by weight at her stall in Gikomba. She has 7 1/2 kg of beans, sells 2 3/4 kg, and packs the rest into bags that each hold 3/4 kg.',
  q: 'If a bag holds 3/4 kg, how many bags do you think you can fill from 3 kg, and how did you work it out?',
  exam: 'Converting mixed numbers, the four operations on fractions and mixed numbers, and word problems where the amount left is shared or packed in equal parts.',
  steps: [
    'Change every mixed number to an improper fraction, because multiplying and dividing is easier with one numerator and one denominator.',
    'For addition and subtraction, find the lowest common multiple of the denominators and rewrite each fraction with it, because only equal-sized parts can be combined.',
    'Add or subtract the numerators and keep the common denominator, because the size of each part has not changed.',
    'For division, turn the second fraction upside down and multiply, because dividing by a number is the same as multiplying by its reciprocal.',
    'Cancel any common factor between a numerator and a denominator before multiplying, because this keeps the numbers small and the answer already simplified.',
    'Change an improper answer back to a mixed number and read the whole part and the leftover part in the context of the problem.'
  ],
  ex: [
    'Problem: Mama Mboga has 7 1/2 kg of beans. She sells 2 3/4 kg and packs the rest into bags of 3/4 kg each. How many full bags does she get, and how much beans is left over?',
    'Convert: 7 1/2 = 15/2 and 2 3/4 = 11/4.',
    'Common denominator 4: 15/2 = 30/4.',
    'Beans left: 30/4 - 11/4 = 19/4 kg, which is 4 3/4 kg.',
    'Number of bags: 19/4 / (3/4) = 19/4 x 4/3 = 19/3 = 6 1/3.',
    'So 6 full bags can be filled. The bags use 6 x 3/4 = 18/4 = 4 1/2 kg.',
    'Left over: 19/4 - 18/4 = 1/4 kg.',
    'Common mistake: adding denominators, for example 1/2 + 1/3 = 2/5. The parts are different sizes, so first write 3/6 + 2/6 = 5/6.'
  ]
}));

S1.push(P('cbc_g8_math_s1_4', '1.3 Decimals', {
  pt: 'Calculating with Decimals, Converting Fractions and Recurring Decimals',
  tag: 'A decimal is a fraction with a denominator of 10, 100, 1000 and so on, and place value tells you what each digit is worth',
  body: 'A decimal number uses a point to separate the whole part from the part smaller than one. After the point the places are tenths, hundredths, thousandths, so 0.375 means 3 tenths, 7 hundredths and 5 thousandths. To add or subtract decimals, line up the decimal points so that digits of equal place value are in the same column. To multiply decimals, multiply as if there were no points, then give the answer as many decimal places as the two factors have together. To divide by a decimal, multiply both numbers by 10, 100 and so on until the divisor is a whole number, which does not change the answer. To change a fraction to a decimal, divide the numerator by the denominator. Some fractions end, such as 7/8 = 0.875, while others never end but repeat a pattern, such as 2/3 = 0.666..., which we write with a dot over the repeating digit. To round to a number of decimal places, look at the next digit: 5 or more rounds up, less than 5 stays.',
  f: 'fraction to decimal: numerator / denominator  |  decimal places of product = sum of decimal places of factors',
  vis: 'A place value chart with columns tens, ones, point, tenths, hundredths, thousandths',
  ctx: 'At a petrol station in Nakuru, a litre of petrol costs 182.40 shillings. A boda boda rider buys 12.5 litres, and a shop prices rice and sugar in kilograms with cents.',
  q: 'If 1 kg of rice costs 156.80 shillings, how can you find the cost of 2.5 kg without a calculator?',
  exam: 'Four operations on decimals, converting fractions to terminating and recurring decimals, rounding to decimal places, and money and measurement problems.',
  steps: [
    'Write the numbers with the decimal points lined up in a column for addition and subtraction, and fill empty places with zeros, because only equal place values can be added.',
    'For multiplication, ignore the points and multiply the whole numbers, because a decimal is a whole number divided by a power of ten.',
    'Count the decimal places in both factors and place the point in the answer so that it has that many places, because each place divides by ten once.',
    'For division by a decimal, multiply both numbers by the same power of ten to make the divisor whole, because the ratio between them stays the same.',
    'To change a fraction to a decimal, divide the numerator by the denominator and stop when the remainder is zero or the digits start to repeat.',
    'Round only at the end, using the next digit to decide, and write money to 2 decimal places.'
  ],
  ex: [
    'Problem: Wanjiru buys 2.5 kg of rice at 156.80 shillings per kg and 1.75 kg of sugar at 160.40 shillings per kg. She pays with 700 shillings. Find the total and the change.',
    'Rice: 2.5 x 156.80. Ignore points: 25 x 15680 = 392000. Places: 1 + 2 = 3, so 392.000 = 392.00 shillings.',
    'Sugar: 1.75 x 160.40. Ignore points: 175 x 16040 = 2807000. Places: 2 + 2 = 4, so 280.7000 = 280.70 shillings.',
    'Total: 392.00 + 280.70 = 672.70 shillings.',
    'Change: 700.00 - 672.70 = 27.30 shillings.',
    'Division: 3.6 kg of maize flour costs 450 shillings. Price per kg = 450 / 3.6 = 4500 / 36 = 125 shillings.',
    'Fraction to decimal: 7/8 = 7 / 8 = 0.875, and 2/3 = 0.666... = 0.6 with a dot over the 6.',
    'Common mistake: placing the point in the product by lining up, which gives 25 x 15680 as 3920.00. The point comes from counting places, not from lining up.'
  ]
}));

S1.push(P('cbc_g8_math_s1_2', '1.4 Squares and Square Roots', {
  pt: 'Squares, Perfect Squares and Finding Square Roots by Factors and Estimation',
  tag: 'A square root undoes a square, and prime factors show it exactly when the number is a perfect square',
  body: 'The square of a number is the number multiplied by itself, so the square of 7 is 7 x 7 = 49, written 7^2. A perfect square is the square of a whole number, such as 1, 4, 9, 16, 25. The square root of a number is the number that gives it when multiplied by itself, written with the sign sqrt, so sqrt(49) = 7. The name comes from a square: if a square has area 49 square metres, its side is 7 metres. To find the square root of a large perfect square exactly, write it as a product of prime factors, which are prime numbers that multiply to give it. Each prime appears an even number of times in a perfect square, so pair them up and take one from each pair. For a fraction, take the square root of the numerator and denominator separately. For a decimal, write it as a fraction first. If a number is not a perfect square, estimate: find the two perfect squares around it, then try numbers between them. Square root tables and calculators give the same values, but you must understand what the value means.',
  f: 'sqrt(a x b) = sqrt(a) x sqrt(b)  |  sqrt(a/b) = sqrt(a)/sqrt(b)  |  side of a square = sqrt(area)',
  vis: 'A square with side 42 m and area 1764 m^2 beside its prime factor tree',
  ctx: 'A family in Kakamega has a square shamba of area 1764 square metres and wants to fence it with barbed wire, so they need the length of one side.',
  q: 'If a square plot has an area of 49 square metres, what is the length of its side, and how do you know?',
  exam: 'Finding square roots of perfect squares by prime factorisation, square roots of fractions and decimals, estimating roots of non-perfect squares, and area problems on squares.',
  steps: [
    'Divide the number by the smallest prime that goes into it, 2, then 3, then 5, then 7, and keep dividing until you reach 1, because every number breaks into prime factors in only one way.',
    'Write the number as a product of its primes, using indices, because repeated primes show up as powers.',
    'Check that every prime has an even power; if so the number is a perfect square, because a square has each factor twice.',
    'Take half of each power and multiply the results, because sqrt of p^(2k) is p^k.',
    'For a fraction or decimal, take roots of numerator and denominator separately, writing the decimal as a fraction first, because roots split over division.',
    'If the number is not a perfect square, find the nearest perfect squares on each side and test numbers between them, because the root must lie between the roots of those squares.'
  ],
  ex: [
    'Problem: A square shamba has an area of 1764 m^2. Find its side, and the cost of fencing at 85 shillings per metre.',
    'Prime factors of 1764: 1764 / 2 = 882, 882 / 2 = 441, 441 / 3 = 147, 147 / 3 = 49, 49 / 7 = 7, 7 / 7 = 1.',
    'So 1764 = 2^2 x 3^2 x 7^2, and every power is even.',
    'sqrt(1764) = 2 x 3 x 7 = 42. Side = 42 m. Check: 42 x 42 = 1764.',
    'Perimeter = 4 x 42 = 168 m. Cost = 168 x 85 = 14280 shillings.',
    'Other roots: sqrt(9/16) = 3/4, and sqrt(0.0144) = sqrt(144/10000) = 12/100 = 0.12.',
    'Estimate sqrt(50): 7^2 = 49 and 8^2 = 64, so it is a little above 7. Try 7.1: 7.1 x 7.1 = 50.41, which is a bit high. So sqrt(50) is between 7.0 and 7.1, about 7.07.',
    'Common mistake: thinking sqrt(a + b) = sqrt(a) + sqrt(b). For example sqrt(9 + 16) = 5, but 3 + 4 = 7.'
  ]
}));

S1.push(P('cbc_g8_math_s1_5', '1.5 Rates, Ratio, Proportions and Percentages', {
  pt: 'Comparing Quantities with Ratios, Rates, Proportion and Percentage Change',
  tag: 'A ratio compares two quantities of the same kind, a rate compares different kinds, and a percentage is a ratio out of 100',
  body: 'A ratio compares quantities of the same kind in the same units, for example 2 : 3, and it is simplified by dividing both parts by a common factor. To share an amount in a ratio, add the parts to get the total number of equal shares, find the value of one share, then multiply. A rate compares two different kinds of quantity, such as 60 kilometres in 1 hour, or 150 shillings for 2 kg; a unit rate is the amount for one unit. Two quantities are in direct proportion when one increases by the same multiple as the other, so the ratio between them stays fixed, like the cost of sugar and its mass. They are in inverse proportion when one increases as the other decreases so that their product stays fixed, like the number of workers and the days to finish a job. A percentage means a number out of 100, so 12% = 12/100. A percentage increase is the change divided by the original amount, times 100. Always take the percentage of the original amount, not the new one.',
  f: 'share = (part / total parts) x amount  |  % change = (change / original) x 100  |  direct: y/x constant  |  inverse: xy constant',
  vis: 'A bar split into 9 equal blocks coloured in groups of 2, 3 and 4',
  ctx: 'Three friends in Kisumu run a mitumba stall and share a Ksh 18,000 profit in the ratio 2 : 3 : 4, while unga prices keep rising by a percentage each season.',
  q: 'If three people share money in the ratio 2 : 3 : 4, how many equal shares are there altogether, and what is each share worth if the total is 18,000?',
  exam: 'Simplifying and sharing in a ratio, unit rates, direct and inverse proportion, percentage of an amount, and percentage increase and decrease in word problems.',
  steps: [
    'Write each quantity in the same units before forming a ratio, because a ratio compares sizes only if they are measured the same way.',
    'Add the parts of the ratio to find the total number of equal shares, because the whole amount is split into that many pieces.',
    'Divide the whole amount by the total shares to get one share, then multiply by each part of the ratio, because each person gets that many shares.',
    'For direct proportion, find the value of one unit and multiply; for inverse proportion, find the total job (product) first and divide, because the unit rate or the product is what stays fixed.',
    'For a percentage of an amount, write the percent as a fraction over 100 and multiply, because per cent means per hundred.',
    'For increase or decrease, find the change from the ORIGINAL amount and add or subtract it, then check the answer is larger or smaller as expected.'
  ],
  ex: [
    'Problem 1: Three friends share a profit of 18,000 shillings in the ratio 2 : 3 : 4. Find each share.',
    'Total shares: 2 + 3 + 4 = 9. One share = 18000 / 9 = 2000 shillings.',
    'Shares: 2 x 2000 = 4000, 3 x 2000 = 6000, 4 x 2000 = 8000. Check: 4000 + 6000 + 8000 = 18000.',
    'Problem 2: 2 kg of unga costs 150 shillings. The price increases by 12%. Find the new price of 2 kg.',
    'Increase = 12/100 x 150 = 18 shillings. New price = 150 + 18 = 168 shillings.',
    'Unit rate: 168 / 2 = 84 shillings per kg.',
    'Problem 3 (inverse proportion): 6 workers repair a road in 8 days. How long do 4 workers take at the same rate?',
    'Total work = 6 x 8 = 48 worker-days. Days for 4 workers = 48 / 4 = 12 days.',
    'Common mistake: taking a percentage decrease from the new amount. If 168 falls by 12%, it is not back to 150, because 12% of 168 = 20.16 and 168 - 20.16 = 147.84.'
  ]
}));

S2.push(P('cbc_g8_math_s2_3', '2.1 Algebraic Expressions', {
  pt: 'Simplifying, Expanding, Factorising and Substituting in Algebraic Expressions',
  tag: 'A letter stands for a number we do not know yet, so every rule of arithmetic still works on it',
  body: 'An algebraic expression is a combination of numbers, letters and operations, such as 3x + 4y - 5. A letter is called a variable because its value can change. The numbers multiplying letters are coefficients, and terms are the parts separated by plus or minus signs. Like terms have exactly the same letters with the same powers, such as 3x and 5x, and only like terms can be added or subtracted: 3x + 5x = 8x, but 3x + 5y cannot be joined. Expanding a bracket means multiplying every term inside by the number outside, so 3(2x + 4) = 6x + 12; this works because 3 groups of (2x + 4) is 3 groups of 2x and 3 groups of 4. Factorising is the reverse: take out the highest common factor, so 12x + 18 = 6(2x + 3). To substitute, replace each letter with its number, put negative numbers in brackets, and follow the order of operations.',
  f: 'a(b + c) = ab + ac  |  ax + bx = (a + b)x',
  vis: 'A row of boxes labelled x and a row of single coins showing 3x + 4 as three boxes and four coins',
  ctx: 'A matatu conductor charges x shillings per adult and (x - 20) per child. The total collected from a group of adults and children is an algebraic expression.',
  q: 'If one adult pays x shillings, how would you write the cost for 3 adults and 2 more adults, and can you join them?',
  exam: 'Collecting like terms, expanding brackets with negative multipliers, factorising a common factor, and substituting values into expressions.',
  steps: [
    'Underline the like terms (same letters, same powers) with their signs, because only these can be combined.',
    'Expand each bracket by multiplying every term inside by the factor outside, including its sign, because the factor multiplies the whole bracket.',
    'Collect like terms by adding or subtracting the coefficients, because 3x + 5x means 3 of something plus 5 of the same thing.',
    'Write the answer with letters in order and the constant last, because it is easier to compare and check.',
    'To factorise, find the highest number that divides every coefficient and any letter common to all terms, take it out and write the rest in the bracket, because this reverses expanding.',
    'To substitute, replace each letter by its value in brackets and then calculate in the usual order, because brackets protect negative signs.'
  ],
  ex: [
    'Problem: Simplify 3(2x + 4) - 2(x - 5), then find its value when x = 3. Then factorise 12x + 18.',
    'Expand the first bracket: 3(2x + 4) = 6x + 12.',
    'Expand the second bracket: -2(x - 5) = -2x + 10, since (-2) x (-5) = +10.',
    'Collect like terms: 6x - 2x = 4x and 12 + 10 = 22, so the expression is 4x + 22.',
    'Substitute x = 3: 4(3) + 22 = 12 + 22 = 34.',
    'Check with the original: 3(2 x 3 + 4) - 2(3 - 5) = 3(10) - 2(-2) = 30 + 4 = 34.',
    'Factorise 12x + 18: the highest common factor of 12 and 18 is 6, so 12x + 18 = 6(2x + 3). Check: 6 x 2x = 12x and 6 x 3 = 18.',
    'Common mistake: writing -2(x - 5) = -2x - 10. The sign of the last term changes because a negative times a negative is positive.'
  ]
}));

S2.push(P('cbc_g8_math_s2_4', '2.2 Linear Equations', {
  pt: 'Solving Equations with One Unknown by Doing the Same to Both Sides',
  tag: 'An equation is a balance, and whatever you do to one side you must do to the other',
  body: 'A linear equation is a statement that two expressions are equal where the unknown letter appears only to the power one, for example 3x + 50 = 290. To solve it means to find the value of the unknown that makes both sides equal. Think of a balanced scale: if you add, subtract, multiply or divide both sides by the same number, the scale stays balanced. We use this to get the unknown alone, undoing operations in the opposite order to how they were applied: first remove addition or subtraction, then multiplication or division. If the unknown is on both sides, collect the unknown terms on one side and the numbers on the other by adding or subtracting on both sides. Brackets are expanded first. To form an equation from a word problem, let a letter stand for the unknown, then translate the words into an equation using what is equal. Always check the answer by substituting it back into the original equation.',
  f: 'ax + b = c  =>  x = (c - b) / a',
  vis: 'A balance scale with 3 bags and 50 shillings on one side and 290 shillings on the other',
  ctx: 'Mama Mboga buys 3 kg of tomatoes and pays 50 shillings for transport. Her total spending was 290 shillings and she wants the price per kilogram.',
  q: 'If 3 kg of tomatoes plus 50 shillings transport gives 290 shillings, what would you do first to find the price of 3 kg alone?',
  exam: 'Solving equations with brackets and unknowns on both sides, and forming and solving equations from word problems.',
  steps: [
    'Let a letter stand for the unknown and say what it means with units, because an equation needs a clear unknown.',
    'Write an equation from the words, making sure both sides describe the same quantity, because an equation states that two things are equal.',
    'Expand any brackets and collect like terms on each side, because this reduces the equation to simple parts.',
    'Move unknown terms to one side and numbers to the other by doing the opposite operation to both sides, because this keeps the balance.',
    'Divide both sides by the coefficient of the unknown, because this leaves the unknown alone.',
    'Substitute the answer into the original equation to check that both sides are equal, because it catches slips in signs.'
  ],
  ex: [
    'Problem 1: Mama Mboga bought 3 kg of tomatoes and paid 50 shillings for transport. She spent 290 shillings in all. Find the price per kg.',
    'Let the price per kg be x shillings. Then 3x + 50 = 290.',
    'Subtract 50 from both sides: 3x = 240.',
    'Divide both sides by 3: x = 80. The price is 80 shillings per kg.',
    'Check: 3 x 80 + 50 = 240 + 50 = 290.',
    'Problem 2: Solve 2(x + 3) = 5x - 9.',
    'Expand: 2x + 6 = 5x - 9.',
    'Subtract 2x from both sides: 6 = 3x - 9. Add 9: 15 = 3x. Divide by 3: x = 5.',
    'Check: left 2(5 + 3) = 16, right 5 x 5 - 9 = 16.',
    'Common mistake: subtracting from only one side, for example changing 3x + 50 = 290 into 3x = 290 without subtracting 50 there too. The same operation must be done to both sides.'
  ]
}));

S3.push(P('cbc_g8_math_s3_2', '3.1 Circles', {
  pt: 'Circumference and Area of a Circle',
  tag: 'The distance around a circle is always a little more than three diameters, and that fixed number is called pi',
  body: 'A circle is the set of all points that are the same distance from a fixed point called the centre. The radius r is the distance from the centre to the edge, the diameter d is a straight line through the centre from edge to edge, so d = 2r. The circumference is the distance around the circle. If you measure the circumference of any circle and divide it by its diameter, you always get the same number, a little more than 3; this number is called pi and is about 22/7 or 3.14. So circumference C = pi x d = 2 x pi x r. The area is the space inside the circle, measured in square units, and A = pi x r x r. Notice that the area uses the radius squared, so doubling the radius makes the area four times as large. When a wheel makes one full turn it moves forward one circumference, so the distance rolled is the number of turns times the circumference.',
  f: 'C = 2 pi r = pi d  |  A = pi r^2  |  pi = 22/7 or 3.14',
  vis: 'A circle with the radius, diameter and circumference marked, and a wheel rolling through one turn',
  ctx: 'A boda boda wheel of diameter 70 cm rolls along a road, and a circular flowerbed at a school must be fenced and then covered with grass.',
  q: 'If a wheel rolls through one complete turn, which part of the circle touches the ground, and what does that tell you about the distance travelled?',
  exam: 'Finding circumference and area from radius or diameter, working backwards to find the radius, wheel problems and fencing or covering costs.',
  steps: [
    'Identify what is given: radius or diameter, and change a diameter to a radius or the reverse using d = 2r, because the formulas need the correct one.',
    'Choose the value of pi the question asks for, 22/7 when the radius is a multiple of 7, otherwise 3.14, because the right choice makes the arithmetic exact.',
    'For circumference, calculate C = pi x d, because the circumference is pi diameters long.',
    'For area, calculate the radius squared first, then multiply by pi, because only the radius is squared.',
    'Attach the correct unit: metres or centimetres for circumference, square metres or square centimetres for area, because they measure different things.',
    'For wheels, multiply the circumference by the number of turns, because each turn moves one circumference.'
  ],
  ex: [
    'Problem 1: A circular flowerbed has a diameter of 14 m. Find the length of fencing needed around it, the area for grass, and the fencing cost at 120 shillings per metre. Use pi = 22/7.',
    'Radius = 14 / 2 = 7 m.',
    'Circumference = 22/7 x 14 = 22 x 2 = 44 m.',
    'Area = 22/7 x 7 x 7 = 22 x 7 = 154 m^2.',
    'Fencing cost = 44 x 120 = 5280 shillings.',
    'Problem 2: A boda boda wheel has a diameter of 70 cm. How far does it travel in 100 turns?',
    'Circumference = 22/7 x 70 = 220 cm.',
    'Distance = 100 x 220 = 22000 cm = 220 m.',
    'Common mistake: using the diameter in the area formula, giving 22/7 x 14 x 14 = 616 m^2 instead of 154 m^2. Always halve the diameter to get the radius first.'
  ]
}));

S3.push(P('cbc_g8_math_s3_3', '3.2 Area', {
  pt: 'Area of Triangles, Parallelograms, Trapezia and Combined Shapes',
  tag: 'Area counts how many unit squares cover a shape, and every formula comes from the rectangle',
  body: 'Area is the amount of flat surface inside a shape, measured in square units such as square centimetres (cm^2) or square metres (m^2). A rectangle of length l and width w has area l x w, because it is covered by w rows of l unit squares. A parallelogram can be cut and moved to make a rectangle, so its area is base x perpendicular height, where the height is measured at right angles to the base, not along the slanted side. A triangle is half of a parallelogram, so its area is half x base x height. A trapezium has one pair of parallel sides a and b; two copies fit together to make a parallelogram with base (a + b), so its area is half x (a + b) x height. To find the area of a combined shape, split it into shapes you know, find each area, then add them or subtract a hole. All lengths must be in the same unit before multiplying.',
  f: 'rectangle = lw  |  parallelogram = bh  |  triangle = 1/2 bh  |  trapezium = 1/2 (a + b) h',
  vis: 'A trapezium with parallel sides 30 m and 20 m and a dotted perpendicular height of 12 m',
  ctx: 'A family in Machakos wants to roof a house with mabati sheets and plant on a trapezium-shaped shamba, so they must work out areas to buy the right amount.',
  q: 'If you cut a triangle off one end of a parallelogram and move it to the other end, what shape do you get and what does that say about the area?',
  exam: 'Area of triangles, parallelograms, trapezia and combined shapes, and problems on roofing, farming or tiling that need the number of units to cover an area.',
  steps: [
    'Sketch the shape and mark the lengths, and mark the perpendicular height with a dotted line, because the height is not the slanting side.',
    'Check all lengths are in the same unit, and convert if not, because area is length times length.',
    'Choose the formula that fits the shape, or split a combined shape into rectangles and triangles, because every area is built from these.',
    'Substitute the measurements and calculate step by step, because it avoids slips with halves.',
    'Add the areas of the parts, or subtract a removed part, because the whole is the sum of its pieces.',
    'Write the unit with a square, and for covering problems divide the total area by the area of one piece and round UP, because you cannot buy part of a sheet.'
  ],
  ex: [
    'Problem 1: A trapezium-shaped shamba has parallel sides of 30 m and 20 m, and the distance between them is 12 m. Find its area.',
    'Area = 1/2 x (30 + 20) x 12 = 1/2 x 50 x 12 = 25 x 12 = 300 m^2.',
    'Problem 2: A shape is a rectangle 10 m by 6 m with a triangle on top whose base is the 10 m side and whose height is 4 m. Find the total area.',
    'Rectangle: 10 x 6 = 60 m^2. Triangle: 1/2 x 10 x 4 = 20 m^2. Total = 60 + 20 = 80 m^2.',
    'Problem 3: A roof is a rectangle 8 m by 5 m. Each mabati sheet covers 2 m by 0.75 m. How many sheets are needed?',
    'Roof area = 8 x 5 = 40 m^2. One sheet = 2 x 0.75 = 1.5 m^2.',
    'Number of sheets = 40 / 1.5 = 26.67, so 27 sheets must be bought.',
    'Common mistake: forgetting the half in the triangle and trapezium formulas, or using the slanted side as the height. The height must be at right angles to the base.'
  ]
}));

S3.push(P('cbc_g8_math_s2_1', '3.3 Money', {
  pt: 'Profit, Loss, Discount, Commission and Simple Interest',
  tag: 'Money problems are percentage problems with a clear question: percentage of what?',
  body: 'The buying price (cost price) is what a trader pays for goods, and the selling price is what the customer pays. If the selling price is more than the buying price, the difference is the profit; if it is less, the difference is the loss. Profit or loss as a percentage is always found on the buying price: percentage profit = profit / buying price x 100. A discount is a reduction in the marked price, usually given as a percentage of the marked price, so selling price = marked price - discount. Commission is pay earned by an agent as a percentage of the value of goods sold. Interest is the payment for using money. Simple interest is calculated on the original amount (the principal) only, I = P x R x T / 100, where R is the rate per year in percent and T is the time in years. The amount after interest is the principal plus the interest.',
  f: '% profit = profit / buying price x 100  |  I = PRT / 100  |  amount = P + I',
  vis: 'A price tag with a crossed-out marked price and a smaller discounted price beside it',
  ctx: 'A shopkeeper in Eldoret buys a radio, advertises a discount at a mtaani shop, a sales agent earns commission, and a SACCO pays interest on savings.',
  q: 'If a trader buys an item for 2400 shillings and sells it for 3000 shillings, what is the profit, and what do you think the percentage profit is out of?',
  exam: 'Profit and loss percentages, discount and selling price, commission, and simple interest for years and months.',
  steps: [
    'Identify what each number is: buying price, selling price, marked price, principal, rate or time, because each formula uses specific ones.',
    'For profit or loss, subtract the smaller price from the larger, because the difference is the gain or the loss.',
    'To get a percentage, divide by the starting amount (buying price, marked price or principal) and multiply by 100, because percentages compare a change to the original.',
    'For discount, calculate the percentage of the marked price and subtract it, because the customer pays the marked price less the discount.',
    'For commission, multiply the total sales by the commission rate as a fraction over 100, because commission is a percentage of what was sold.',
    'For simple interest, substitute P, R and T into I = PRT/100 with T in years, then add I to P for the amount, because interest is earned on the principal each year.'
  ],
  ex: [
    'Problem 1: A trader buys a radio for 2400 shillings and sells it for 3000 shillings. Find the percentage profit.',
    'Profit = 3000 - 2400 = 600. Percentage profit = 600 / 2400 x 100 = 25%.',
    'Problem 2: Shoes are marked at 4000 shillings and a 15% discount is given. Find the price paid.',
    'Discount = 15/100 x 4000 = 600. Price paid = 4000 - 600 = 3400 shillings.',
    'Problem 3: An agent earns 5% commission and sells goods worth 240000 shillings. Commission = 5/100 x 240000 = 12000 shillings.',
    'Problem 4: A SACCO pays 8% simple interest per year. Find the interest on 50000 shillings in 3 years and the final amount.',
    'I = 50000 x 8 x 3 / 100 = 12000 shillings. Amount = 50000 + 12000 = 62000 shillings.',
    'Common mistake: working out percentage profit on the selling price. Here 600/3000 x 100 = 20% is wrong; always divide by the buying price.'
  ]
}));

S4.push(P('cbc_g8_math_s4_2', '4.1 Geometrical Constructions', {
  pt: 'Constructing Angles, Bisectors and Triangles with Ruler and Compasses',
  tag: 'A compass keeps a distance fixed, so arcs with the same setting are always the same distance from their centre',
  body: 'A construction is an accurate drawing made with a ruler, a pair of compasses and a sharp pencil, without measuring angles. A pair of compasses draws an arc, which is part of a circle, and every point on an arc is the same distance from its centre. A line segment is a part of a straight line with two end points. A perpendicular bisector of a segment cuts it in half at a right angle (90 degrees); every point on it is the same distance from both ends. An angle bisector divides an angle into two equal angles. To construct 60 degrees, draw arcs of the same radius from the two ends of a segment so that they form an equilateral triangle, whose angles are each 60 degrees. Bisecting 60 degrees gives 30 degrees, and bisecting 90 degrees gives 45 degrees. A triangle can be constructed when its three sides are known, using arcs from each end of the base; the two shorter sides must together be longer than the third, or the arcs will not meet.',
  f: 'triangle exists if the sum of the two shorter sides > the longest side  |  angles in a triangle add up to 180 degrees',
  vis: 'A triangle with arcs crossing above a base line, with compass marks visible',
  ctx: 'A surveyor in Kitale marks out a triangular plot of land with pegs and string, and a carpenter makes an exact right angle and equal angles for a roof frame.',
  q: 'If you keep the compass opening the same and draw an arc from each end of a line, what do you notice about the point where the arcs cross?',
  exam: 'Constructing a perpendicular bisector, bisecting an angle, constructing 60, 30, 90 and 45 degree angles, and triangles given three sides or two sides and the angle between them.',
  steps: [
    'Sharpen the pencil, draw the base line with a ruler and mark its end points, because an accurate construction needs thin, precise lines.',
    'Set the compass to the first required length using the ruler and do not change it until that arc is finished, because a change of opening changes the distance.',
    'Draw arcs from each end of the base and mark the point where they cross, because this point is at the right distance from both ends.',
    'Join the end points to the crossing point with a ruler, because straight lines through the points complete the shape.',
    'Leave all arcs visible, do not rub them out, because they show that the construction was done correctly.',
    'Check the result by measuring a side or an angle, because small errors in the compass opening show up there.'
  ],
  ex: [
    'Problem: Construct triangle ABC with AB = 6 cm, BC = 5 cm and AC = 7 cm, and then construct a 60 degree angle and bisect it.',
    'First check that a triangle exists: 5 + 6 = 11, which is greater than 7. A triangle is possible.',
    'Draw AB = 6 cm with the ruler.',
    'Set the compass to 7 cm, put the point on A and draw an arc above AB.',
    'Set the compass to 5 cm, put the point on B and draw an arc that cuts the first arc at C.',
    'Join AC and BC. Triangle ABC has sides 6, 5 and 7 cm.',
    '60 degrees: draw a line PQ. With the compass point on P and any opening, draw an arc cutting PQ at R. With the same opening and the point on R, draw an arc cutting the first arc at S. Join P to S: angle QPS = 60 degrees, because PRS is an equilateral triangle.',
    'Bisect: with the point on R and then on S, draw arcs of equal opening that cross at T. Join P to T. Angle QPT = 30 degrees.',
    'Common mistake: changing the compass opening between the two arcs of an angle, which makes the angle wrong. Keep the opening the same until the arcs are crossed.'
  ]
}));

S4.push(P('cbc_g8_math_s3_1', '4.2 Coordinates and graphs', {
  pt: 'Plotting Points in All Four Quadrants and Drawing Straight-Line Graphs',
  tag: 'Two numbers in order, x then y, pin down exactly one point on a flat surface',
  body: 'The Cartesian plane is made of two number lines that cross at right angles: the horizontal x-axis and the vertical y-axis. They meet at the origin, which is the point (0, 0). The axes divide the plane into four quadrants. A point is described by its coordinates (x, y): the first number says how far to move across (right is positive, left is negative) and the second says how far to move up (positive) or down (negative). The order matters, so (3, 1) is not the same point as (1, 3). A linear equation such as y = 2x + 1 gives one y for every x. Choose some values of x, work out y for each, record them in a table of values, plot the points and join them with a straight line. All points on the line satisfy the equation. The gradient measures steepness: gradient = change in y / change in x between two points on the line. Reading a graph means finding the y value for a given x or the reverse.',
  f: 'point = (x, y)  |  gradient = (y2 - y1) / (x2 - x1)',
  vis: 'A Cartesian plane with four quadrants and the points (-2, -3), (0, 1), (2, 5) joined by a line',
  ctx: 'A matatu fare chart can be plotted with distance on the x-axis and fare on the y-axis, and a football pitch map uses coordinates to give the position of each player.',
  q: 'To find the point (3, 1) on a grid, which direction do you move first, and why would the order of the two numbers matter?',
  exam: 'Plotting and reading coordinates in four quadrants, completing a table of values for a linear equation, drawing the line, and finding the gradient or reading values from a graph.',
  steps: [
    'Draw both axes with a ruler, choose a scale that fits the largest numbers, and label the axes, because points must be placed accurately.',
    'To plot a point, start at the origin, move along the x-axis by the first number, then up or down by the second number, because the coordinates give a path from the origin.',
    'For a graph, choose at least three values of x, including negative values and zero, because a third point checks the first two.',
    'Substitute each x into the equation to get y, and write the pairs in a table, because each pair is one point on the line.',
    'Plot the points, check that they lie on a straight line, and join them with a ruler, extending the line across the grid, because the line shows all solutions.',
    'To read from the graph, go from the given value across or up to the line and then to the other axis, because the line links x and y values.'
  ],
  ex: [
    'Problem: Draw the graph of y = 2x + 1 for x from -2 to 2, find its gradient, and find x when y = 7.',
    'x = -2: y = 2(-2) + 1 = -3. x = -1: y = 2(-1) + 1 = -1. x = 0: y = 1. x = 1: y = 3. x = 2: y = 5.',
    'Table of values: (-2, -3), (-1, -1), (0, 1), (1, 3), (2, 5). Plot the points and join them with a straight line.',
    'Gradient between (0, 1) and (2, 5): change in y = 5 - 1 = 4, change in x = 2 - 0 = 2, so gradient = 4 / 2 = 2.',
    'When y = 7: 7 = 2x + 1, so 2x = 6 and x = 3. On the graph, the line passes through (3, 7).',
    'The point (-2, -3) is in the third quadrant, because both numbers are negative. (2, 5) is in the first quadrant.',
    'Common mistake: writing coordinates as (y, x). The first number is always the movement along the x-axis.'
  ]
}));

S4.push(P('cbc_g8_math_s4_3', '4.3 Scale Drawing', {
  pt: 'Making and Reading Drawings That Shrink Real Distances by a Fixed Scale',
  tag: 'A scale is a ratio between a length on the drawing and the real length, so every measurement shrinks by the same amount',
  body: 'A scale drawing is a smaller (or larger) copy of a real object or place in which all lengths are changed by the same ratio and all angles stay the same. The scale is written as a ratio such as 1 : 50000, which means 1 cm on the drawing stands for 50000 cm in real life. It can also be written in words, for example 1 cm represents 5 m. To find the real length, multiply the drawing length by the scale number. To find the drawing length, divide the real length by the scale number. Always change both lengths into the same unit before writing the ratio: 100 cm = 1 m and 100000 cm = 1 km. Scale drawings are used for maps, house plans and the layout of a field. To draw one, choose a scale so the drawing fits the paper, convert every real length, draw with a ruler and set square, and write the scale next to the drawing.',
  f: 'real length = drawing length x scale number  |  drawing length = real length / scale number',
  vis: 'A rectangular room plan 6 cm by 4 cm with the scale 1 : 100 written below',
  ctx: 'A school in Nyeri draws a plan of its compound on a sheet of paper, and a driver reads a county map where 4 cm stands for a real road distance of 2 kilometres.',
  q: 'If 1 cm on a map stands for 5 km, what real distance is 3 cm, and what did you do to get it?',
  exam: 'Finding real lengths from a map scale, finding drawing lengths for a given scale, writing a scale as a ratio, and drawing a plan of a room or field.',
  steps: [
    'Write the scale as a ratio, such as 1 : 100, and say what the ratio means in words, because it tells you how many times larger reality is.',
    'Convert the given real lengths into centimetres so that the units match the drawing, because the ratio compares equal units.',
    'Divide each real length by the scale number to get the length to draw, because the drawing is that many times smaller.',
    'Draw the shape with a ruler and set square so that angles are kept, because a scale drawing changes lengths but not angles.',
    'To read a drawing, measure with a ruler and multiply by the scale number, then convert to metres or kilometres, because a scale gives real length in the smaller unit.',
    'Label the scale on the drawing, because without the scale the measurements cannot be interpreted.'
  ],
  ex: [
    'Problem 1: A room is 6 m long and 4 m wide. Draw a plan to the scale 1 : 100. Find the drawing lengths.',
    '6 m = 600 cm and 4 m = 400 cm. Drawing length = 600 / 100 = 6 cm and 400 / 100 = 4 cm.',
    'Draw a rectangle 6 cm by 4 cm and write the scale 1 : 100.',
    'Problem 2: On a map the distance between two towns is 4 cm and the scale is 1 : 50000. Find the real distance.',
    'Real distance = 4 x 50000 = 200000 cm. Convert: 200000 / 100 = 2000 m = 2 km.',
    'Problem 3: Write the scale 1 cm to 5 m as a ratio. 5 m = 500 cm, so the scale is 1 : 500.',
    'Common mistake: dividing instead of multiplying when finding a real length, or leaving the answer in centimetres. Multiply by the scale number and then convert to sensible units.'
  ]
}));

S4.push(P('cbc_g8_math_s4_4', '4.4 Common Solids', {
  pt: 'Faces, Edges, Nets, Surface Area and Volume of Cuboids and Cylinders',
  tag: 'A solid is a shape with three dimensions, and a net is the flat pattern that folds up to make it',
  body: 'A solid is a three-dimensional shape: a cube, a cuboid, a prism, a cylinder, a pyramid, a cone or a sphere. Its flat surfaces are faces, the lines where two faces meet are edges, and the corners are vertices. A cuboid has 6 faces, 12 edges and 8 vertices. A net is the flat shape made by opening a solid along its edges, and a net can be folded back into the solid. The surface area is the total area of all the faces, found by adding the areas of the pieces in the net. The volume is the amount of space inside the solid, in cubic units such as cm^3 or m^3. For a cuboid, volume = length x width x height. For a cylinder, the base is a circle, so volume = pi x r^2 x h, where h is the height. Capacity is the amount a container holds, and 1000 cm^3 = 1 litre. The curved surface of a cylinder unrolls into a rectangle whose length is the circumference, so curved surface area = 2 x pi x r x h.',
  f: 'cuboid V = lwh  |  cuboid SA = 2(lw + lh + wh)  |  cylinder V = pi r^2 h  |  cylinder SA = 2 pi r (r + h)',
  vis: 'A cuboid net made of six rectangles and a cylinder net made of a rectangle and two circles',
  ctx: 'A cuboid water tank, a cylindrical jerrican and a tin of cooking oil are all solids whose volume tells us how much liquid they hold, and a carpenter uses a net to cut a box.',
  q: 'If you unfold a cardboard box flat, how many pieces do you get, and what shapes are they?',
  exam: 'Naming solids and counting faces, edges and vertices, drawing nets, surface area and volume of cuboids and cylinders, and converting between cubic centimetres and litres.',
  steps: [
    'Name the solid and list its faces, edges and vertices by looking at the net or the picture, because the count tells you which areas to add.',
    'Write the dimensions with their units and convert to the same unit, because volume multiplies three lengths.',
    'For surface area, find the area of each different face and add them all, using each pair of equal faces twice, because every face is covered once.',
    'For volume, multiply the area of the base by the height, because the solid is made of layers of the base.',
    'Use pi = 22/7 when the radius is a multiple of 7, because it simplifies the working.',
    'Convert: 1000 cm^3 = 1 litre, and 1 m^3 = 1000 litres, because capacity is usually given in litres.'
  ],
  ex: [
    'Problem 1: A cuboid box is 5 cm long, 4 cm wide and 3 cm high. Find its faces, edges, vertices, surface area and volume.',
    'It has 6 faces, 12 edges and 8 vertices. Check: 6 + 8 - 12 = 2.',
    'Surface area = 2(5 x 4 + 5 x 3 + 4 x 3) = 2(20 + 15 + 12) = 2 x 47 = 94 cm^2.',
    'Volume = 5 x 4 x 3 = 60 cm^3.',
    'Problem 2: A cylindrical tin has a radius of 7 cm and a height of 10 cm. Use pi = 22/7. Find its volume in litres and its total surface area.',
    'Volume = 22/7 x 7 x 7 x 10 = 22 x 7 x 10 = 1540 cm^3 = 1.54 litres.',
    'Total surface area = 2 x 22/7 x 7 x (7 + 10) = 44 x 17 = 748 cm^2.',
    'Common mistake: forgetting the two circular ends when finding total surface area of a cylinder, or using the diameter as the radius in the volume formula.'
  ]
}));

S5.push(P('cbc_g8_math_s5_1', '5.1 Data Presentation and Interpretation', {
  pt: 'Collecting Data, Drawing Tables, Bar Graphs, Line Graphs and Pie Charts',
  tag: 'A table counts the data, and a chart lets the eye compare it at once',
  body: 'Data is information collected by counting or measuring. It is usually recorded first with tally marks, then summarised in a frequency table, which shows each value and how many times it occurs (its frequency). The same data can be shown in several ways. A bar graph uses bars of equal width whose heights show frequencies, and it is good for comparing categories. A line graph joins points to show change over time, such as monthly rainfall. A pie chart is a circle divided into sectors, where the angle of each sector is proportional to its frequency; because the whole circle is 360 degrees, the angle of a sector is its frequency divided by the total, times 360. To interpret a graph, read its title, axes and scale, then answer questions about the largest, smallest, differences and totals. The mean is the total divided by the number of values, and conclusions should always follow from the graph and not from guesses.',
  f: 'pie sector angle = (frequency / total) x 360 degrees  |  mean = sum of values / number of values',
  vis: 'A circle divided into four sectors of different sizes, labelled with sports',
  ctx: 'A class teacher in Kisii surveys 120 learners about their favourite sport and then draws a pie chart to show football, netball, volleyball and athletics.',
  q: 'If 54 out of 120 learners like football, what fraction of the learners is that, and how many degrees would that fraction of a circle be?',
  exam: 'Completing a frequency table, calculating pie chart angles, drawing and reading bar and line graphs, and answering questions about totals, differences and the mean.',
  steps: [
    'Collect the data and record it with tally marks in a table, because tallies avoid counting the same item twice.',
    'Count the tallies to give the frequency of each category and add them to get the total, because the total is needed for the fractions.',
    'For a pie chart, calculate the angle for each category as frequency over total times 360, because the sectors must fill the circle.',
    'Check that the angles add up to 360 degrees, because it shows no sector was missed or miscalculated.',
    'Draw the chart or graph with a title, labelled axes, equal bar widths and an even scale, because unlabelled charts cannot be read.',
    'Interpret by reading values from the chart and comparing them, and give a conclusion in a sentence using the data, because the chart is only useful when it answers a question.'
  ],
  ex: [
    'Problem: In a survey of 120 learners the favourite sports were football 54, netball 30, volleyball 24 and athletics 12. Draw the pie chart angles and find the fraction who like netball.',
    'Total = 54 + 30 + 24 + 12 = 120.',
    'Football angle = 54/120 x 360 = 162 degrees.',
    'Netball angle = 30/120 x 360 = 90 degrees.',
    'Volleyball angle = 24/120 x 360 = 72 degrees.',
    'Athletics angle = 12/120 x 360 = 36 degrees.',
    'Check: 162 + 90 + 72 + 36 = 360 degrees.',
    'Fraction who like netball = 30/120 = 1/4. Football is liked by 54 - 30 = 24 more learners than netball.',
    'Common mistake: dividing by the number of categories (4) instead of by the total frequency (120), or choosing a bar scale that is not even.'
  ]
}));

S5.push(P('cbc_g8_math_s5_2', '5.2 Probability', {
  pt: 'Measuring How Likely an Event Is, from Impossible to Certain',
  tag: 'Probability is a number between 0 and 1 found by counting favourable outcomes out of all equally likely outcomes',
  body: 'Probability measures how likely it is that something happens. An experiment is an activity with uncertain results, such as tossing a coin or rolling a die. An outcome is one possible result, and the sample space is the list of all possible outcomes. An event is one or more outcomes we are interested in. When all outcomes are equally likely, the probability of an event is the number of favourable outcomes divided by the total number of outcomes. A probability is always between 0 and 1: 0 means the event is impossible, 1 means it is certain, and 1/2 means it is equally likely to happen or not. The probability that an event does not happen is 1 minus the probability that it does. The probabilities of all outcomes of an experiment add up to 1. The experimental probability is found from trials: the number of times the event happened divided by the number of trials, and it comes close to the theoretical probability when there are many trials. The expected number of times an event happens is probability times the number of trials.',
  f: 'P(E) = favourable outcomes / total outcomes  |  P(not E) = 1 - P(E)  |  expected = P(E) x trials',
  vis: 'A bag with 5 red, 3 blue and 2 green counters and a die showing its six faces',
  ctx: 'Mama Mboga picks a tomato at random from a box where 3 of 20 are rotten, a football referee tosses a coin to choose ends, and a raffle picks a winning number.',
  q: 'If a box of 20 tomatoes has 3 rotten ones and you pick one without looking, is it more likely to be good or rotten, and how could you put a number on it?',
  exam: 'Listing sample spaces, calculating probabilities of single events, using P(not E) = 1 - P(E), and finding experimental probabilities and expected frequencies.',
  steps: [
    'List all possible outcomes and count them, because the total is the bottom of the fraction.',
    'Check that the outcomes are equally likely, because the counting method works only then.',
    'Count the outcomes that match the event, because they form the top of the fraction.',
    'Write probability as favourable over total and simplify, giving the answer as a fraction, decimal or percentage between 0 and 1, because probability cannot be bigger than 1.',
    'For the opposite event, subtract the probability from 1, because the event either happens or does not.',
    'For experiments, divide the times the event happened by the number of trials, and for expectation multiply probability by the number of trials, because that predicts the long-run count.'
  ],
  ex: [
    'Problem 1: A bag has 5 red, 3 blue and 2 green counters. One is picked at random. Find P(red) and P(not green).',
    'Total counters = 5 + 3 + 2 = 10. P(red) = 5/10 = 1/2.',
    'P(green) = 2/10 = 1/5, so P(not green) = 1 - 1/5 = 4/5. Check: 5 + 3 = 8 non-green counters, 8/10 = 4/5.',
    'Problem 2: A fair die is rolled. Find P(a prime number). The sample space is 1, 2, 3, 4, 5, 6. Primes: 2, 3, 5, so P = 3/6 = 1/2.',
    'If the die is rolled 200 times, the expected number of primes is 1/2 x 200 = 100.',
    'Problem 3: In a box of 20 tomatoes, 3 are rotten. P(rotten) = 3/20 = 0.15 = 15%. P(good) = 1 - 0.15 = 0.85.',
    'Common mistake: writing a probability as favourable over unfavourable, for example 5/5 for red, or getting a value greater than 1. Divide by the total outcomes.'
  ]
}));

//@@MARK

const MAP = {
  curriculum: 'CBC',
  grade: 8,
  subject: 'Mathematics',
  code: 'MATH-G8',
  trackPathway: 'Core',
  title: 'CBE Grade 8 (Junior School) Mathematics Metro Line',
  description: 'Grade 8 Mathematics with five strands and sixteen sub-strands, following the KICD Mathematics Grade 8 design.',
  notes: 'Strand and sub-strand names follow the KICD Grade 8 Mathematics design.',
  stations: [
    { id: 'cbc_g8_math_s1', number: 1, title: '1.0 Numbers', strand: 'Strand 1.0: Numbers', icon: 'N', status: 'available', summary: 'Integers, fractions, decimals, squares and square roots, rates, ratio, proportions and percentages.', subtopics: S1 },
    { id: 'cbc_g8_math_s2', number: 2, title: '2.0 Algebra', strand: 'Strand 2.0: Algebra', icon: 'A', status: 'available', summary: 'Algebraic expressions and linear equations.', subtopics: S2 },
    { id: 'cbc_g8_math_s3', number: 3, title: '3.0 Measurements', strand: 'Strand 3.0: Measurements', icon: 'M', status: 'available', summary: 'Circles, area and money.', subtopics: S3 },
    { id: 'cbc_g8_math_s4', number: 4, title: '4.0 Geometry', strand: 'Strand 4.0: Geometry', icon: 'G', status: 'available', summary: 'Geometrical constructions, coordinates and graphs, scale drawing and common solids.', subtopics: S4 },
    { id: 'cbc_g8_math_s5', number: 5, title: '5.0 Data Handling and Probability', strand: 'Strand 5.0: Data Handling and Probability', icon: 'D', status: 'available', summary: 'Data presentation and interpretation, and probability.', subtopics: S5 }
  ]
};

module.exports = { maps: [MAP], retiredIds: ['cbc_g8_math_s2_2', 'cbc_g8_math_s4_1'] };
