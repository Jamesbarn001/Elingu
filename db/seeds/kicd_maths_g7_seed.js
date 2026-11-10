'use strict';
// CBC JUNIOR SCHOOL MATHEMATICS, GRADE 7
// Five strands and eighteen sub-strands, following the KICD Mathematics Grade 7
// design (see docs/audits/kicd_verified_from_site.md). Plain text only.

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

S1.push(P('cbc_g7_math_s1_1', '1.1 Whole Numbers', {
  pt: 'Place Value, Rounding and the Order of Operations',
  tag: 'A digit means different things in different places, and operations must be done in an agreed order',
  body: 'Whole numbers are the counting numbers 0, 1, 2, 3 and so on, with no fractions. We write them using ten digits, 0 to 9, and the position of a digit decides its worth. The place value of a digit is the name of its position (ones, tens, hundreds, thousands and so on). The total value of a digit is the digit multiplied by its place value, so the 5 in 4 506 382 sits in the hundred-thousands place and has total value 5 x 100 000 = 500 000. Rounding off replaces a number with a nearby one that is easier to use: look at the digit just to the right of the place you are rounding to; if it is 5 or more, round up, otherwise leave the digit as it is, and fill the remaining places with zeros. When a calculation has several operations, mathematicians agreed an order so that everyone gets the same answer: Brackets first, then Orders (powers and roots), then Division and Multiplication from left to right, then Addition and Subtraction from left to right (BODMAS).',
  f: 'BODMAS: Brackets, Orders, Division/Multiplication, Addition/Subtraction',
  vis: 'A place value chart with the number 4 506 382 placed column by column',
  ctx: 'A Mama Mboga in Gikomba buys 120 sukuma bundles for Ksh 120 and sells 15 more bundles each at Ksh 8; she must work out totals in the right order and round her bank balance when talking about it.',
  q: 'The number 4 506 382 has a 5 and a 3 in it. Why is the 5 worth so much more than the 3, even though 3 is the smaller digit?',
  exam: 'Stating place value and total value of a digit, rounding to a given place, and simplifying expressions with several operations by showing each BODMAS step on its own line.',
  steps: [
    'Write the number in a place value chart, starting from the ones on the right, because each place is ten times the one to its right.',
    'The place value is the name of the column and the total value is digit x place value, because a digit is only a count of how many of that column there are.',
    'To round, circle the digit in the required place and look at the digit immediately to its right, because that digit tells whether we are past the halfway point.',
    'If the right-hand digit is 5 or more, add 1 to the circled digit; otherwise keep it. Replace all digits to the right by zeros, because the rounded number must stay the same size as the original.',
    'For mixed operations, do brackets first, then powers and roots, because these are grouped on purpose by whoever wrote the expression.',
    'Next do multiplication and division as they appear from left to right, because they have equal rank.',
    'Finally do addition and subtraction from left to right, because they too have equal rank and come last.'
  ],
  ex: [
    'Problem A: For 4 506 382 find the place value and total value of 5, and round the number to the nearest thousand and the nearest hundred thousand.',
    'Digits from the right: 2 ones, 8 tens, 3 hundreds, 6 thousands, 0 ten thousands, 5 hundred thousands, 4 millions.',
    'The 5 is in the hundred-thousands place. Place value = 100 000. Total value = 5 x 100 000 = 500 000.',
    'Nearest thousand: the thousands digit is 6; the digit to its right is 3, which is less than 5, so keep 6. Answer 4 506 000.',
    'Nearest hundred thousand: the digit is 5; the digit to its right is 0, less than 5, so keep 5. Answer 4 500 000.',
    'Problem B: Simplify 120 + 15 x 8 - 36 / 4.',
    '15 x 8 = 120 and 36 / 4 = 9 (multiplication and division first).',
    '120 + 120 - 9 = 240 - 9 = 231.',
    'Common mistake: working strictly left to right and getting (120 + 15) x 8 = 1080 first. Addition does not come before multiplication unless brackets say so.'
  ]
}));

S1.push(P('cbc_g7_math_s1_2', '1.2 Factors', {
  pt: 'Prime Factors, HCF and LCM',
  tag: 'Break numbers into primes, then compare the primes to find what two numbers share',
  body: 'A factor of a number divides it exactly with no remainder, so the factors of 12 are 1, 2, 3, 4, 6 and 12. A multiple of a number is what you get by multiplying it by 1, 2, 3 and so on. A prime number has exactly two factors, 1 and itself (2, 3, 5, 7, 11 ...); 1 is not prime because it has only one factor. Every number greater than 1 can be written as a product of primes in exactly one way, called its prime factorisation, found by repeated division by primes. The Highest Common Factor (HCF) of two numbers is the largest number that divides both; it is the product of the primes they share, using the smaller power of each. The Lowest Common Multiple (LCM) is the smallest number that both divide into; it is the product of every prime that appears, using the larger power of each. Divisibility tests speed things up: a number is divisible by 2 if it ends in an even digit, by 3 if its digit sum is divisible by 3, by 5 if it ends in 0 or 5, and by 9 if its digit sum is divisible by 9.',
  f: 'HCF = product of common primes (smaller powers)  |  LCM = product of all primes (larger powers)',
  vis: 'Two factor trees, for 36 and 48, ending in prime leaves',
  ctx: 'A fundi has mabati sheets 36 dm and 48 dm long and wants equal pieces with no waste; two matatu routes leave a stage every 36 and every 48 minutes and the saccos want to know when they leave together.',
  q: 'If two matatus leave the stage together now, one every 36 minutes and one every 48 minutes, what must be true of the time they next leave together?',
  exam: 'Writing a number as a product of primes using index notation, finding HCF and LCM of two or three numbers, and solving word problems on equal pieces (HCF) or meeting again (LCM).',
  steps: [
    'Divide the number by the smallest prime that goes into it exactly, then repeat on the answer until you reach 1, because primes are the building blocks that cannot be split further.',
    'Write the number as a product of primes in index form, because powers show repeated primes compactly.',
    'For HCF, pick only the primes that appear in both numbers, each to the smaller power, because a common factor must divide both numbers.',
    'Multiply those chosen primes to get the HCF, because the HCF is built from exactly the shared primes.',
    'For LCM, pick every prime that appears in either number, each to the larger power, because a common multiple must contain everything each number contains.',
    'Multiply to get the LCM, then check that both numbers divide it exactly.',
    'Decide which one the question needs: splitting into equal groups or pieces uses HCF; events repeating together uses LCM.'
  ],
  ex: [
    'Problem: Find the HCF and LCM of 36 and 48. A fundi cuts mabati strips of 36 dm and 48 dm into equal pieces of greatest length. Matatus leave every 36 and 48 minutes. Find the piece length and when they next leave together.',
    '36 = 2 x 18 = 2 x 2 x 9 = 2 x 2 x 3 x 3 = 2^2 x 3^2.',
    '48 = 2 x 24 = 2 x 2 x 12 = 2 x 2 x 2 x 6 = 2 x 2 x 2 x 2 x 3 = 2^4 x 3.',
    'Common primes: 2 (smaller power 2^2) and 3 (smaller power 3^1). HCF = 2^2 x 3 = 4 x 3 = 12.',
    'All primes: 2 (larger power 2^4) and 3 (larger power 3^2). LCM = 2^4 x 3^2 = 16 x 9 = 144.',
    'Check: 36 x 4 = 144 and 48 x 3 = 144. Also 36 / 12 = 3 and 48 / 12 = 4.',
    'Greatest equal piece = 12 dm (3 pieces and 4 pieces). The matatus next leave together after 144 minutes = 2 hours 24 minutes.',
    'Common mistake: using the larger power for HCF or the smaller for LCM. Remember: HCF can never be bigger than the smaller number, and LCM can never be smaller than the larger number.'
  ]
}));

S1.push(P('cbc_g7_math_s1_3', '1.3 Fractions', {
  pt: 'Adding, Subtracting, Multiplying and Dividing Fractions',
  tag: 'Make the pieces the same size before adding; multiply across; flip to divide',
  body: 'A fraction a/b describes a whole cut into b equal parts, of which we take a. The bottom number (denominator) says how big each part is and the top number (numerator) says how many parts we have. A proper fraction is smaller than 1; an improper fraction has a numerator at least as big as the denominator; a mixed number joins a whole number and a proper fraction, so 2 3/4 = 11/4. Equivalent fractions name the same amount, found by multiplying or dividing the top and bottom by the same number. You can only add or subtract pieces that are the same size, so first rewrite the fractions with a common denominator, best chosen as the LCM of the denominators. To multiply, multiply tops and bottoms. To divide by a fraction, multiply by its reciprocal (the fraction turned upside down), because dividing by 1/4 asks how many quarters fit, which is 4 times as many. "Of" in a problem means multiply.',
  f: 'a/b + c/d = (ad + bc)/bd  |  a/b x c/d = ac/bd  |  a/b / (c/d) = a/b x d/c',
  vis: 'Two bars cut into twelfths showing 3/4 and 5/6 as 9 and 10 equal pieces',
  ctx: 'Mama Mboga buys 2 3/4 kg of tomatoes in the morning and 1 5/6 kg later, sells 1 1/2 kg, and a customer pays for 3/5 of a Ksh 2 500 order in advance by M-Pesa.',
  q: 'Why can you add 3 apples and 4 apples but not add 1/2 and 1/3 straight away?',
  exam: 'Mixed-number operations in order with BODMAS, word problems with "fraction of an amount", and showing the common denominator and the cancelling clearly.',
  steps: [
    'Change every mixed number to an improper fraction, because it is easier to work with one fraction than a whole part plus a fraction part.',
    'Find the LCM of the denominators to use as the common denominator, because the pieces must be the same size before we count them.',
    'Rewrite each fraction with that denominator by multiplying top and bottom by the same number, because this does not change its value.',
    'Add or subtract the numerators only and keep the denominator, because we are only counting how many equal pieces there are.',
    'For multiplication, cancel common factors then multiply tops and bottoms, because cancelling first keeps the numbers small.',
    'For division, turn the second fraction upside down and multiply, because dividing by a fraction counts how many of it fit.',
    'Write the answer in simplest form, back as a mixed number if it is improper, because that is the standard way to give a final answer.'
  ],
  ex: [
    'Problem A: Mama Mboga has 2 3/4 kg + 1 5/6 kg of tomatoes and sells 1 1/2 kg. How much is left?',
    '2 3/4 = 11/4, 1 5/6 = 11/6, 1 1/2 = 3/2. LCM of 4, 6 and 2 is 12.',
    '11/4 = 33/12, 11/6 = 22/12, 3/2 = 18/12.',
    '33/12 + 22/12 - 18/12 = 37/12 = 3 1/12 kg.',
    'Problem B: A customer pays 3/5 of a Ksh 2 500 order. How much is paid?',
    '3/5 of 2 500 = 3/5 x 2 500 = 3 x 500 = Ksh 1 500.',
    'Problem C: How many 1/4 kg packets can be filled from 3/4 kg? 3/4 / (1/4) = 3/4 x 4/1 = 3.',
    'Common mistake: adding denominators too, writing 1/2 + 1/3 = 2/5. The pieces are different sizes; the right answer is 3/6 + 2/6 = 5/6.'
  ]
}));

S1.push(P('cbc_g7_math_s1_4', '1.4 Decimals', {
  pt: 'Place Value, Conversion and Operations with Decimals',
  tag: 'A decimal is a fraction with a power of ten underneath',
  body: 'A decimal number uses a point to separate the whole part from the part smaller than one. The places after the point are tenths, hundredths, thousandths and so on, each ten times smaller than the one before, so 0.875 means 8 tenths, 7 hundredths and 5 thousandths, which is 875/1000. To change a fraction to a decimal, divide the numerator by the denominator. To add or subtract decimals, line up the decimal points so that equal places are under each other. To multiply, ignore the points, multiply as whole numbers, then place the point so that the answer has as many decimal places as the two factors together. To divide by a decimal, multiply both numbers by the same power of ten until the divisor is a whole number, because this keeps the quotient the same.',
  f: 'decimal places in a product = decimal places in factor 1 + decimal places in factor 2',
  vis: 'A place value chart extended to the right of the decimal point with the number 0.875',
  ctx: 'At the market, beef is Ksh 142.50 per kg and a customer buys 2.4 kg; a shopkeeper also splits a 7.2 litre drum of cooking oil into 0.04 litre sachets.',
  q: 'When you pay Ksh 142.50 for 1 kg, what does the 5 after the point stand for, and why is it not 5 shillings?',
  exam: 'Converting between fractions and decimals, the four operations with correct placement of the decimal point, and money and measurement word problems.',
  steps: [
    'To change a fraction to a decimal divide top by bottom, adding zeros after the point as needed, because a fraction is a division written differently.',
    'For addition and subtraction, write the numbers with decimal points in a straight column and fill gaps with zeros, because only equal places can be combined.',
    'For multiplication, remove the points and multiply the whole numbers, because the digits multiply the same way.',
    'Count the decimal places in both factors and give the answer that many places, because each place divides by ten.',
    'For division, move the point in the divisor to make it whole and move the dividend\'s point the same number of places, because this multiplies both by the same power of ten.',
    'Divide as with whole numbers and put the point straight above the dividend\'s point, because the place values stay aligned.',
    'Check by estimating, for example 142.50 is about 140 and 2.4 is about 2, so the answer should be near 280 to 340.'
  ],
  ex: [
    'Problem A: Change 7/8 to a decimal.',
    '7 / 8 = 0.875 (8 into 7.000: 0.875 because 8 x 0.875 = 7).',
    'Problem B: Find the cost of 2.4 kg of beef at Ksh 142.50 per kg.',
    '1425 x 24 = 34 200 (ignoring points). Decimal places: 2 in 142.50 and 1 in 2.4, so 3 in total.',
    '34.200 becomes 342.000, so the cost is Ksh 342. Check: 2 kg costs 285 and 0.4 kg costs 57; 285 + 57 = 342.',
    'Problem C: How many 0.04 litre sachets come from 7.2 litres? 7.2 / 0.04.',
    'Multiply both by 100: 720 / 4 = 180 sachets.',
    'Common mistake: placing the point by guessing in a product, such as 4.75 x 3.2 = 1.52. Count places: 475 x 32 = 15 200 with three places gives 15.200 = 15.2.'
  ]
}));

S1.push(P('cbc_g7_math_s1_5', '1.5 Squares and Square Roots', {
  pt: 'Squaring a Number and Undoing It with a Square Root',
  tag: 'A square number is an area; its square root is the side length',
  body: 'To square a number is to multiply it by itself: 6 squared (written 6^2) is 6 x 6 = 36. The name comes from the area of a square with side 6 units, which is 36 square units. Numbers such as 1, 4, 9, 16, 25, 36 ... are perfect squares. The square root of a number is the number that, when squared, gives it, so the square root of 36 is 6, written sqrt(36) = 6. Squaring and square rooting undo each other. For a perfect square, find the square root by prime factorisation: write the number as a product of primes, group them in equal pairs, and take one prime from each pair. For a number that is not a perfect square, find the two perfect squares on either side to get a first estimate, then refine it by trial.',
  f: 'n^2 = n x n  |  sqrt(n^2) = n',
  vis: 'A square plot with side marked s and the area written inside as s x s',
  ctx: 'A square shamba of area 1 296 square metres must be fenced with barbed wire, so the farmer needs the length of one side.',
  q: 'If a square plot has an area of 36 square metres, how would you find how long one side is, and what operation did you use?',
  exam: 'Finding square roots by prime factorisation, estimating non-perfect squares between two integers, and area-to-side word problems.',
  steps: [
    'Write the number as a product of primes by repeated division, because the prime factors reveal the pairs.',
    'Put the equal prime factors into pairs, because each pair is a number multiplied by itself.',
    'Take one prime from each pair, because the pair stands for p x p and the square root takes just p.',
    'Multiply the primes you took out to get the square root, because they are the factors of the side length.',
    'Check by squaring your answer, because squaring undoes the root and should give back the original.',
    'For a non-perfect square, find the nearest perfect squares either side, because the root lies between their roots.',
    'Refine by trial squaring to the accuracy needed, because we cannot read a root from the prime pairs.'
  ],
  ex: [
    'Problem A: Find sqrt(1296) and the length of wire needed for one round of fencing a square shamba of area 1 296 m^2.',
    '1296 = 2 x 648 = 2 x 2 x 324 = 2 x 2 x 2 x 162 = 2^4 x 81 = 2^4 x 3^4.',
    'Pairs: (2 x 2), (2 x 2), (3 x 3), (3 x 3). Take one from each pair: 2 x 2 x 3 x 3 = 36.',
    'Check: 36 x 36 = 1296. Side = 36 m.',
    'One round of fence = perimeter = 4 x 36 = 144 m.',
    'Problem B: Estimate sqrt(70) to 1 decimal place.',
    '8^2 = 64 and 9^2 = 81, so the root is between 8 and 9, closer to 8.',
    'Try 8.4: 8.4^2 = 70.56, a little above 70. Try 8.3: 8.3^2 = 68.89. So it is closer to 8.4; sqrt(70) is about 8.4.',
    'Common mistake: halving instead of square rooting, saying sqrt(36) = 18. Test the answer: 18 x 18 is not 36.'
  ]
}));

S2.push(P('cbc_g7_maths_s2_1', '2.1 Algebraic Expressions', {
  pt: 'Letters for Unknown Numbers: Simplifying and Substituting',
  tag: 'A letter stands for a number we do not know yet, and the same rules of arithmetic still hold',
  body: 'In algebra a letter such as x stands for a number that can change or is not yet known. An algebraic expression is a mix of numbers, letters and operations with no equals sign, for example 3x + 5. Each part separated by + or - is a term, the number multiplying a letter is its coefficient, and terms with exactly the same letter part are like terms. Only like terms can be added or subtracted: 4x + 3x = 7x because it is 4 of something plus 3 of the same thing, but 4x + 3y cannot be joined. A number outside a bracket multiplies every term inside it, so 3(2x + 5) = 6x + 15. To substitute means to replace the letter with a given number and then calculate, using the order of operations.',
  f: 'a(b + c) = ab + ac',
  vis: 'A row of bags labelled x and loose coins labelled with numbers, grouped into like terms',
  ctx: 'A matatu conductor collects x shillings from each of 3 passengers and a Ksh 5 tip, so the money is 3x + 5; if the fare x is Ksh 50 the amount is found by substituting.',
  q: 'If one bag holds the same unknown number of oranges, what is 3 bags plus 2 bags, and why can you not add 3 bags and 2 loose oranges into one number?',
  exam: 'Collecting like terms, expanding brackets with negative multipliers, and substituting values with every line of working shown.',
  steps: [
    'Identify the terms and circle their signs, because the sign in front of a term belongs to that term.',
    'Expand any bracket by multiplying the outside number by every term inside, because the outside number multiplies the whole bracket.',
    'Take care with a negative outside the bracket, because it changes the sign of every term inside.',
    'Group like terms together, those with the same letter part, because only they can be combined.',
    'Add or subtract the coefficients and keep the letter, because the letter names the kind of thing being counted.',
    'To substitute, write the number in brackets in place of each letter, because brackets protect negative numbers and show multiplication.',
    'Calculate with BODMAS and state the units if there are any.'
  ],
  ex: [
    'Problem: Simplify 3(2x + 5) - 2(x - 4), then find its value when x = 3.',
    'Expand: 3(2x + 5) = 6x + 15.',
    '-2(x - 4) = -2x + 8 (the negative multiplies both terms: -2 x x = -2x and -2 x -4 = +8).',
    'Combine: 6x + 15 - 2x + 8 = (6x - 2x) + (15 + 8) = 4x + 23.',
    'Substitute x = 3: 4(3) + 23 = 12 + 23 = 35.',
    'Check by substituting into the original: 3(2 x 3 + 5) - 2(3 - 4) = 3(11) - 2(-1) = 33 + 2 = 35.',
    'Common mistake: writing -2(x - 4) = -2x - 8. Only the first term was multiplied; the second also changes: -2 x -4 = +8.'
  ]
}));

S2.push(P('cbc_g7_maths_s2_2', '2.2 Linear Equations', {
  pt: 'Keeping an Equation Balanced While Finding the Unknown',
  tag: 'Whatever you do to one side you must do to the other',
  body: 'An equation says that two expressions are equal, like a balanced scale. A linear equation has the unknown to the power 1 only, such as 5x - 8 = 2x + 13. To solve it means to find the value of the unknown that makes both sides equal. The method is to keep the balance: add, subtract, multiply or divide both sides by the same thing, aiming to leave the unknown alone on one side. Doing the opposite operation undoes what was done to the unknown. To use equations in word problems, let a letter stand for the unknown quantity, translate each sentence into mathematics, and solve. Always check by substituting the answer back.',
  f: 'If a = b then a + c = b + c, a - c = b - c, ac = bc and a/c = b/c (c not 0)',
  vis: 'A balance scale with 4 phone cases and a Ksh 50 weight on the left, Ksh 450 on the right',
  ctx: 'Online a seller charges Ksh 50 delivery and sells 4 identical phone cases for a total of Ksh 450, paid by M-Pesa. The price of one case is the unknown.',
  q: 'If a scale balances and you take 50 grams off the left pan, what must you do to the right pan to keep it balanced, and why?',
  exam: 'Solving equations with unknowns on both sides or with brackets, forming an equation from a word problem, and verifying the answer.',
  steps: [
    'Let a letter stand for the unknown and write what it means with its units, because an equation needs a clear unknown.',
    'Translate the words into an equation using the facts given, because the equation is the problem written in symbols.',
    'Expand any brackets and collect like terms on each side, because this makes the equation simpler to handle.',
    'Move the terms containing the unknown to one side by adding or subtracting on both sides, because this keeps the balance.',
    'Move the plain numbers to the other side the same way.',
    'Divide both sides by the coefficient of the unknown, because that leaves the unknown on its own.',
    'Substitute your answer into the original equation to check that both sides match.'
  ],
  ex: [
    'Problem A: Solve 5x - 8 = 2x + 13.',
    'Subtract 2x from both sides: 3x - 8 = 13.',
    'Add 8 to both sides: 3x = 21.',
    'Divide by 3: x = 7. Check: 5(7) - 8 = 27 and 2(7) + 13 = 27.',
    'Problem B: Four identical phone cases and Ksh 50 delivery cost Ksh 450 altogether. Find the price of one case.',
    'Let one case cost Ksh x. Then 4x + 50 = 450.',
    'Subtract 50: 4x = 400. Divide by 4: x = 100. One case costs Ksh 100.',
    'Check: 4 x 100 + 50 = 450.',
    'Common mistake: changing only one side, for example subtracting 50 from the left but forgetting to do so on the right, which breaks the balance.'
  ]
}));

S2.push(P('cbc_g7_maths_s2_3', '2.3 Linear Inequalities', {
  pt: 'Solving and Showing Ranges of Values',
  tag: 'An inequality gives a whole range of answers, not just one',
  body: 'An inequality compares two quantities that are not necessarily equal. The signs are < (less than), > (greater than), <= (less than or equal to) and >= (greater than or equal to). A solution of an inequality is any value that makes it true, and there are usually many, for example x < 5 is true for 4, 3.5, 0 and -10. We solve linear inequalities almost exactly like equations, doing the same thing to both sides, with one important exception: when you multiply or divide both sides by a negative number, the inequality sign must be reversed. This is because multiplying by a negative flips the order on the number line (3 < 5 but -3 > -5). We show solutions on a number line, with an open circle for < or > (the end value is not included) and a closed circle for <= or >= (the end value is included).',
  f: 'If a < b and c < 0 then ac > bc',
  vis: 'A number line from -2 to 6 with an open circle at 5 and an arrow to the left',
  ctx: 'A parent has Ksh 1 000 for a school trip; the fee is Ksh 3 per km travelled plus Ksh 250 booking, so the distance in km must satisfy an inequality.',
  q: 'If you have Ksh 1 000 and each kilometre costs Ksh 3 plus a Ksh 250 booking, is there just one possible distance, or many? Why?',
  exam: 'Solving one-step and multi-step inequalities, reversing the sign for a negative divisor, listing integer solutions and drawing the solution on a number line.',
  steps: [
    'Treat the inequality sign like an equals sign and use inverse operations on both sides, because adding or subtracting the same number keeps the order.',
    'Collect the unknown terms on one side and the numbers on the other.',
    'Before dividing by a negative number, mark that the sign will reverse, because multiplying by a negative flips the order.',
    'Divide both sides by the coefficient of the unknown and reverse the sign only if it is negative.',
    'Write the answer as x < a, x >= a and so on, because this describes the range of answers.',
    'Draw the number line with an open or closed circle and shade the direction, because the picture shows every solution at once.',
    'Check one value inside the range and one outside in the original inequality.'
  ],
  ex: [
    'Problem A: Solve 3x - 5 < 10 and list the whole number solutions.',
    'Add 5: 3x < 15. Divide by 3 (positive, sign stays): x < 5.',
    'Whole numbers: 0, 1, 2, 3, 4. Check x = 4: 3(4) - 5 = 7 < 10 (true). x = 5: 10 < 10 (false).',
    'Problem B: Solve 7 - 2x >= 1.',
    'Subtract 7: -2x >= -6. Divide by -2 and reverse the sign: x <= 3.',
    'Check x = 3: 7 - 6 = 1 >= 1 (true). Check x = 4: 7 - 8 = -1 >= 1 (false).',
    'Problem C: Solve 1 < 2x - 3 <= 7. Add 3 to every part: 4 < 2x <= 10. Divide by 2: 2 < x <= 5. Integers: 3, 4, 5.',
    'Number line for A: open circle at 5, shade to the left.',
    'Common mistake: dividing by -2 and keeping the sign, giving x >= 3 in Problem B. Testing x = 4 shows it fails.'
  ]
}));

S3.push(P('cbc_g7_maths_s3_1', '3.1 Pythagorean Relationship', {
  pt: 'The Sides of a Right-Angled Triangle',
  tag: 'The square on the longest side equals the sum of the squares on the other two',
  body: 'A right-angled triangle has one angle of 90 degrees. The side opposite the right angle is the hypotenuse; it is always the longest side. The other two sides are the legs. Pythagoras\' relationship states that the area of the square built on the hypotenuse equals the sum of the areas of the squares built on the two legs. In symbols, if the legs are a and b and the hypotenuse is c, then a^2 + b^2 = c^2. If you know any two sides of a right-angled triangle, you can find the third: add the squares to find a hypotenuse, or subtract the squares to find a leg, then take the square root. The relationship also works backwards: if three sides satisfy a^2 + b^2 = c^2 with c the longest, the triangle has a right angle. Sets like 3, 4, 5 and 5, 12, 13 are called Pythagorean triples.',
  f: 'a^2 + b^2 = c^2 (c is the hypotenuse)',
  vis: 'A right-angled triangle with a square drawn on each side, sides 3, 4 and 5',
  ctx: 'A football pitch is 80 m long and 60 m wide, and the groundsman wants the length of the diagonal; a fundi also leans a ladder on a wall and must know how high it reaches.',
  q: 'On a rectangular pitch, a player runs along the length, turns and runs along the width. A friend cuts straight across. Which route is shorter and by how much would you work it out?',
  exam: 'Finding a missing hypotenuse or leg with working shown, deciding if a triangle is right-angled, and applying the relationship to ladders, diagonals and distances.',
  steps: [
    'Sketch the triangle, mark the right angle and label the hypotenuse c (opposite the right angle), because the formula depends on which side is longest.',
    'Write a^2 + b^2 = c^2 with the numbers placed in the correct positions.',
    'If the hypotenuse is unknown, square the two legs and add them, because c^2 is their sum.',
    'If a leg is unknown, subtract the square of the known leg from the square of the hypotenuse, because a^2 = c^2 - b^2.',
    'Take the square root of the result, because we found a square and want the length.',
    'State the answer with units and check that the hypotenuse is the longest side.',
    'To test for a right angle, check whether the two shorter squares add up to the longest square.'
  ],
  ex: [
    'Problem A: Find the diagonal of an 80 m by 60 m pitch.',
    'The diagonal is the hypotenuse: c^2 = 80^2 + 60^2 = 6400 + 3600 = 10 000.',
    'c = sqrt(10 000) = 100 m. Walking round the two sides is 80 + 60 = 140 m, so cutting across saves 40 m.',
    'Problem B: A 13 m ladder leans on a wall with its foot 5 m from the wall. How high does it reach?',
    'Hypotenuse 13 m, one leg 5 m. h^2 = 13^2 - 5^2 = 169 - 25 = 144. h = 12 m.',
    'Problem C: Is a triangle with sides 7 cm, 24 cm and 25 cm right-angled? 7^2 + 24^2 = 49 + 576 = 625 = 25^2. Yes.',
    'Common mistake: adding the squares when the hypotenuse is given, such as 169 + 25 = 194. When the hypotenuse is known, subtract.'
  ]
}));

S3.push(P('cbc_g7_maths_s3_2', '3.2 Length', {
  pt: 'Units of Length, Conversions and Perimeter',
  tag: 'Choose a sensible unit, convert by powers of ten, and add the distance round a shape',
  body: 'Length is how far it is from one point to another. The metric units are the kilometre (km), metre (m), centimetre (cm) and millimetre (mm), related by 1 km = 1 000 m, 1 m = 100 cm and 1 cm = 10 mm. To change to a smaller unit, multiply; to change to a larger unit, divide, because a smaller unit needs more of it to cover the same distance. The perimeter of a shape is the total distance round its boundary, found by adding all the side lengths with all lengths in the same unit. For a rectangle, perimeter = 2 x (length + width). Perimeter problems appear whenever something must go round a boundary, such as fencing, a border or a running track.',
  f: '1 km = 1000 m  |  1 m = 100 cm  |  1 cm = 10 mm  |  Rectangle perimeter = 2(l + w)',
  vis: 'A rectangular plot with posts marked at equal spacing along its boundary',
  ctx: 'A farmer in Kiambu fences a 45 m by 30 m shamba with three rounds of barbed wire and a post every 3 m, buying the wire in rolls measured in kilometres.',
  q: 'If you fence a plot with 3 rounds of wire, what must you find first, and why is it not the area?',
  exam: 'Converting between units, finding the perimeter of rectangles and composite shapes, and fencing and path word problems.',
  steps: [
    'Write all the lengths in the same unit before calculating, because adding metres to centimetres gives a meaningless number.',
    'To go to a smaller unit multiply by the conversion number, to a larger unit divide, because the same length is a bigger count of a smaller unit.',
    'Draw the shape and label every side; find any missing side from the others, because the perimeter needs all of them.',
    'Add every side of the boundary, or use 2(l + w) for a rectangle, because the perimeter is the full distance round.',
    'For repeated rounds, multiply the perimeter by the number of rounds, because each round covers the whole boundary again.',
    'For equal spacing, divide the perimeter by the gap to find the number of posts, because the posts form a closed loop.',
    'Give the answer in a sensible unit and state it.'
  ],
  ex: [
    'Problem A: Convert 3.5 km to metres and 4 250 cm to metres.',
    '3.5 km x 1000 = 3 500 m. 4 250 cm / 100 = 42.5 m.',
    'Problem B: A shamba is 45 m by 30 m. Find the wire for 3 rounds and the number of posts if they are 3 m apart.',
    'Perimeter = 2(45 + 30) = 2 x 75 = 150 m.',
    'Wire for 3 rounds = 3 x 150 = 450 m = 0.45 km.',
    'Posts = 150 / 3 = 50 posts, because the boundary closes into a loop so there is one post per gap.',
    'Common mistake: calculating 45 x 30 = 1 350, which is the area in square metres, not the distance round.'
  ]
}));

S3.push(P('cbc_g7_maths_s3_3', '3.3 Area', {
  pt: 'Area of Rectangles, Triangles, Parallelograms and Trapeziums',
  tag: 'Area counts how many unit squares cover a surface',
  body: 'Area is the amount of flat surface inside a shape, measured in square units such as square metres (m^2) or square centimetres (cm^2). A rectangle of length l and width w has area l x w, because it holds w rows of l unit squares. A parallelogram can be cut and rearranged into a rectangle, so its area is base x perpendicular height; the height is the straight distance between the parallel sides, not the slanting side. A triangle is half of a parallelogram with the same base and height, so its area is half x base x height. A trapezium has one pair of parallel sides a and b a height h apart; its area is half x (a + b) x h, the average of the parallel sides times the height. Square units convert by squaring the length conversion: 1 m^2 = 100 x 100 = 10 000 cm^2. For a composite shape, split it into simple shapes, find each area and add (or subtract a cut-out).',
  f: 'Rectangle = lw  |  Parallelogram = bh  |  Triangle = 1/2 bh  |  Trapezium = 1/2 (a + b) h',
  vis: 'A trapezium split into two triangles and a rectangle with the height drawn as a dotted line',
  ctx: 'A roof is 6 m by 4 m and is covered with mabati sheets each 2 m long and 0.8 m wide, so the fundi must know how many sheets to order.',
  q: 'If a triangle and a rectangle share the same base and height, why is the triangle exactly half of the rectangle?',
  exam: 'Applying the correct formula with the perpendicular height, converting between square units, composite shapes, and cost or covering word problems.',
  steps: [
    'Sketch the shape and mark the perpendicular height with a right-angle sign, because slanting sides are not the height.',
    'Choose the formula that matches the shape.',
    'Write all lengths in the same unit first, because area units follow the length unit.',
    'Substitute the values into the formula and calculate, writing the units as squared.',
    'For a composite shape, split it into simple shapes, find each area and add them, or subtract a removed part, because the whole is the sum of its parts.',
    'For covering problems, divide the total area by the area of one piece and round up, because partial sheets still have to be bought whole.',
    'Convert units if the question asks, using 1 m^2 = 10 000 cm^2.'
  ],
  ex: [
    'Problem A: Find the area of a trapezium with parallel sides 12 m and 8 m, 5 m apart.',
    'Area = 1/2 x (12 + 8) x 5 = 1/2 x 20 x 5 = 50 m^2.',
    'Problem B: A triangle has base 10 m and height 6 m. Area = 1/2 x 10 x 6 = 30 m^2. A parallelogram with base 9 m and height 4 m has area 9 x 4 = 36 m^2.',
    'Problem C: A 6 m by 4 m roof is covered with mabati sheets 2 m by 0.8 m. How many sheets are needed?',
    'Roof area = 6 x 4 = 24 m^2. One sheet = 2 x 0.8 = 1.6 m^2.',
    'Sheets = 24 / 1.6 = 15 sheets (exactly, so no rounding up is needed).',
    'Unit check: 1.6 m^2 = 1.6 x 10 000 = 16 000 cm^2.',
    'Common mistake: using the slanting side of a parallelogram or triangle as the height. The height always meets the base at 90 degrees.'
  ]
}));

S3.push(P('cbc_g7_maths_s3_4', '3.4 Volume and Capacity', {
  pt: 'Space Inside a Solid and the Liquid It Holds',
  tag: 'Volume counts unit cubes; capacity is volume measured in litres',
  body: 'Volume is the amount of space a solid takes up, measured in cubic units such as cubic centimetres (cm^3) and cubic metres (m^3). A cuboid (a box shape) of length l, width w and height h holds h layers, each layer being l x w unit cubes, so its volume is l x w x h. A cube of side s has volume s x s x s = s^3. Capacity is the amount of liquid a container can hold, measured in millilitres (mL) and litres (L). The link between the two systems is: 1 cm^3 = 1 mL, 1 000 cm^3 = 1 L and 1 m^3 = 1 000 L. To convert cubic units, cube the length conversion: 1 m^3 = 100 x 100 x 100 = 1 000 000 cm^3. When a tank is filled at a steady rate, time = volume / rate.',
  f: 'Cuboid V = lwh  |  Cube V = s^3  |  1000 cm^3 = 1 L  |  1 m^3 = 1000 L',
  vis: 'A cuboid tank drawn with its length, width and height labelled and one layer of unit cubes shaded',
  ctx: 'A school water tank is 2 m long, 1.5 m wide and 1 m high, and a pipe fills it at 25 litres every minute; a shopkeeper also stacks oil cartons by volume.',
  q: 'If you pour water into a box 10 cm long, 10 cm wide and 10 cm high, how many litres fit, and how did you decide?',
  exam: 'Volume of cubes and cuboids, converting between cubic units and litres, and filling and emptying time problems.',
  steps: [
    'Write all dimensions in the same unit, because the volume unit follows the length unit.',
    'Multiply length x width x height, because that counts layers of unit cubes.',
    'State the answer in cubic units.',
    'Convert to litres using 1 000 cm^3 = 1 L or 1 m^3 = 1 000 L, because capacity is volume in the liquid system.',
    'For a filling problem, divide the total volume in litres by the rate in litres per minute, because time = amount / rate.',
    'Convert the minutes to hours and minutes if needed.',
    'Check that the answer is sensible, for example not larger than the tank could hold.'
  ],
  ex: [
    'Problem: Find the capacity of a tank 2 m by 1.5 m by 1 m and the time to fill it at 25 L per minute.',
    'Volume = 2 x 1.5 x 1 = 3 m^3.',
    'Capacity = 3 x 1 000 = 3 000 litres.',
    'Time = 3 000 / 25 = 120 minutes = 2 hours.',
    'Another check: a box 20 cm by 10 cm by 5 cm has volume 20 x 10 x 5 = 1 000 cm^3 = 1 litre.',
    'Common mistake: treating 1 m^3 as 100 litres. One cubic metre is 100 x 100 x 100 cm^3 = 1 000 000 cm^3 = 1 000 litres.'
  ]
}));

S3.push(P('cbc_g7_maths_s3_5', '3.5 Time, Distance, and Speed', {
  pt: 'How Fast, How Far, How Long',
  tag: 'Speed is the distance covered in each unit of time',
  body: 'Speed tells us how much distance is covered in one unit of time, for example kilometres per hour (km/h) or metres per second (m/s). Three quantities are linked: speed = distance / time, distance = speed x time and time = distance / speed. They are one relationship written three ways, so cover the one you want in the triangle with distance on top. Time can be written in the 12-hour clock with a.m. and p.m. or in the 24-hour clock from 00:00 to 23:59; to find how long a journey took, subtract the start time from the end time, remembering that there are 60 minutes in an hour. Average speed for a whole journey is the total distance divided by the total time taken, not the average of the speeds. To change km/h to m/s, multiply by 1 000 and divide by 3 600, which is the same as dividing by 3.6.',
  f: 'speed = distance / time  |  distance = speed x time  |  time = distance / speed',
  vis: 'A triangle with D on top and S and T below, with one letter covered',
  ctx: 'A matatu travels 160 km from Nairobi to Nakuru in 2 hours 30 minutes, and a boda boda rider makes the first part of a trip at one speed and the second part slower.',
  q: 'If a matatu covers 160 km in 2.5 hours, how far does it cover in one hour, and what operation did that need?',
  exam: 'Using the three forms of the speed relationship, converting hours and minutes to decimals, average speed over two stages and 24-hour clock durations.',
  steps: [
    'List the distance, time and speed given, with units, because the unknown is the missing one.',
    'Convert time to hours as a decimal if the speed is in km/h, for example 2 hours 30 minutes = 2.5 hours, because units must match.',
    'Choose the form of the relationship that has the unknown on its own.',
    'Substitute the values and calculate.',
    'For average speed over several stages, add the distances and add the times first, because average speed is total distance over total time.',
    'For m/s and km/h conversion, multiply by 1 000/3 600, or divide by 3.6 to go from km/h to m/s.',
    'State the answer with its unit.'
  ],
  ex: [
    'Problem A: A matatu leaves at 07:45 and reaches Nakuru at 10:15, 160 km away. Find its average speed.',
    'Time = 10:15 - 07:45 = 2 h 30 min = 2.5 h.',
    'Speed = 160 / 2.5 = 64 km/h.',
    'Problem B: Change 72 km/h to m/s: 72 / 3.6 = 20 m/s.',
    'Problem C: A rider covers 120 km at 60 km/h and then another 120 km at 40 km/h. Find the average speed.',
    'Time 1 = 120 / 60 = 2 h. Time 2 = 120 / 40 = 3 h. Total distance = 240 km. Total time = 5 h.',
    'Average speed = 240 / 5 = 48 km/h.',
    'Common mistake: averaging the speeds, (60 + 40)/2 = 50 km/h. More time is spent at the slow speed, so the true average is lower.'
  ]
}));

S3.push(P('cbc_g7_maths_s3_6', '3.6 Temperature', {
  pt: 'Celsius, Kelvin and Changes in Temperature',
  tag: 'Temperature tells how hot or cold something is, and it can go below zero',
  body: 'Temperature measures how hot or cold something is, using a thermometer. In daily life in Kenya we use the Celsius scale (degrees Celsius, written C), on which water freezes at 0 C and boils at 100 C. Temperatures below 0 C are written with a negative sign, so -5 C is five degrees colder than freezing. In science the Kelvin scale (K) is used. It starts at absolute zero, the lowest possible temperature, which is -273 C. A change of 1 C is the same size as a change of 1 K, so the scales differ only in where zero is: K = C + 273 and C = K - 273. A change in temperature is found by subtracting the starting temperature from the final temperature; if the answer is negative, the temperature fell.',
  f: 'K = C + 273  |  C = K - 273  |  change = final - start',
  vis: 'A thermometer scale from -10 C to 40 C with the equivalent Kelvin values beside it',
  ctx: 'On a cold morning in Nakuru the temperature is 8 C and by noon it is 26 C, while the summit of Mount Kenya can fall to -5 C at night.',
  q: 'If it is 8 C at dawn and 26 C at noon, how would you find how much the temperature rose, and what if it had been -5 C at dawn?',
  exam: 'Reading a thermometer, finding the change between two temperatures including negatives, and converting between Celsius and Kelvin.',
  steps: [
    'Read the thermometer at the level of the top of the liquid, noting what each small division is worth, because scales differ.',
    'To find a change, subtract the starting temperature from the final temperature, because change is the final value minus the start.',
    'When the start is negative, subtracting a negative adds, so 26 - (-5) = 26 + 5, because moving from below zero to above zero crosses the zero mark.',
    'A positive change means a rise and a negative change means a fall.',
    'To change Celsius to Kelvin add 273, because Kelvin zero is 273 degrees below Celsius zero.',
    'To change Kelvin to Celsius subtract 273.',
    'Write the unit symbol with the number.'
  ],
  ex: [
    'Problem A: Nakuru is 8 C at dawn and 26 C at noon. Find the rise.',
    'Change = 26 - 8 = 18 C (a rise).',
    'Problem B: A night on Mount Kenya is -5 C and noon is 26 C. Find the rise.',
    'Change = 26 - (-5) = 26 + 5 = 31 C.',
    'Problem C: Convert 26 C to Kelvin: 26 + 273 = 299 K. Convert -5 C: -5 + 273 = 268 K. Convert 300 K to Celsius: 300 - 273 = 27 C.',
    'Common mistake: calculating 26 - 5 = 21 for Problem B and forgetting that the starting temperature was below zero.'
  ]
}));

S3.push(P('cbc_g7_maths_s3_7', '3.7 Money', {
  pt: 'Profit, Loss, Discount and Simple Interest',
  tag: 'Compare what you paid with what you received, and express the difference as a percentage',
  body: 'Money problems compare amounts of shillings. The cost price (CP) is what a trader pays for an item and the selling price (SP) is what it is sold for. If SP is greater than CP there is a profit = SP - CP; if SP is less there is a loss = CP - SP. A percentage profit or loss compares the profit or loss to the cost price: percentage profit = profit / CP x 100. A discount is a reduction of the marked price, often given as a percentage, so you pay the marked price minus the discount. Simple interest is the extra money paid for borrowing or earned for saving: I = P x R x T / 100, where P is the money borrowed or saved (principal), R the rate in percent per year and T the time in years. The interest is always worked out on the original principal, and the amount at the end is principal plus interest.',
  f: 'Profit = SP - CP  |  % profit = profit/CP x 100  |  Discount = % x marked price  |  I = PRT/100',
  vis: 'A price tag showing marked price, discount and amount paid',
  ctx: 'A trader buys a sack of maize for Ksh 4 000 and sells at Ksh 4 600; a shop gives 10% off Ksh 2 500 shoes; a chama savings account pays 5% per year in simple interest.',
  q: 'A trader buys for Ksh 4 000 and sells for Ksh 4 600. Is the profit based on the selling price or on the buying price, and which makes more sense for judging the business?',
  exam: 'Percentage profit and loss on cost price, percentage discount, and simple interest with amount, rate or time in worded situations.',
  steps: [
    'Identify the cost price, selling price, marked price, principal, rate and time given, because each formula uses specific ones.',
    'Subtract to find profit or loss, because it is the difference between what came in and what went out.',
    'Divide by the cost price and multiply by 100 for a percentage, because the percentage is measured against what was invested.',
    'For a discount, find the percentage of the marked price and subtract it, because the buyer pays what remains.',
    'For simple interest, multiply principal by rate by time in years and divide by 100, because each year earns the same percentage of the original sum.',
    'Add the interest to the principal for the total amount, because the saver gets both back.',
    'State the answer with Ksh and say whether it is a profit or a loss.'
  ],
  ex: [
    'Problem A: Bought Ksh 4 000, sold Ksh 4 600. Profit = 4 600 - 4 000 = Ksh 600. % profit = 600/4 000 x 100 = 15%.',
    'Problem B: Bought Ksh 1 500, sold Ksh 1 200. Loss = 1 500 - 1 200 = Ksh 300. % loss = 300/1 500 x 100 = 20%.',
    'Problem C: Shoes marked Ksh 2 500 with a 10% discount. Discount = 10/100 x 2 500 = Ksh 250. Pay 2 500 - 250 = Ksh 2 250.',
    'Problem D: Ksh 8 000 saved at 5% per year simple interest for 3 years.',
    'I = 8 000 x 5 x 3 / 100 = 120 000 / 100 = Ksh 1 200. Amount = 8 000 + 1 200 = Ksh 9 200.',
    'Common mistake: working the percentage profit on the selling price, 600/4 600 x 100 = about 13%, instead of on the cost price.'
  ]
}));

S4.push(P('cbc_g7_maths_s4_1', '4.1 Angles', {
  pt: 'Measuring Turns and Finding Unknown Angles',
  tag: 'Angles on a line, at a point, in a triangle and between parallel lines follow fixed totals',
  body: 'An angle measures a turn between two lines that meet at a point, in degrees; one full turn is 360 degrees. An acute angle is less than 90 degrees, a right angle is exactly 90 degrees, an obtuse angle is between 90 and 180 degrees, a straight angle is 180 degrees and a reflex angle is between 180 and 360 degrees. Four facts let us find unknown angles. Angles on a straight line add up to 180 degrees. Angles around a point add up to 360 degrees. Vertically opposite angles, formed when two straight lines cross, are equal. The three angles of any triangle add up to 180 degrees. When a line (a transversal) crosses two parallel lines, corresponding angles are equal, alternate angles are equal, and co-interior angles add up to 180 degrees. The angles of a quadrilateral add up to 360 degrees. To use these facts, give a reason for each step.',
  f: 'Straight line = 180  |  Point = 360  |  Triangle = 180  |  Quadrilateral = 360',
  vis: 'Two parallel lines cut by a transversal with equal corresponding and alternate angles marked',
  ctx: 'A carpenter cuts the rafters of a mabati roof and must get the angle between the rafter and the wall plate right; a footballer chooses the angle to pass.',
  q: 'If two straight roads cross at a junction and one of the angles is 70 degrees, what are the other three, and how do you know?',
  exam: 'Finding unknown angles with algebra, giving a reason for each step, and using parallel line and triangle facts together.',
  steps: [
    'Mark the angles that are given and name the unknown with a letter, because it keeps the working organised.',
    'Look for a fact: a straight line, a point, a triangle, crossing lines or parallel lines.',
    'Write an equation from the fact, for example the angles add up to 180, because every rule gives a total or an equality.',
    'Solve the equation for the letter.',
    'Substitute back to find each angle asked for, because the letter is often not the final answer.',
    'Give the reason in words next to each line, such as angles on a straight line, because exams award marks for reasons.',
    'Check that the answer is sensible, for example an acute angle is less than 90 degrees.'
  ],
  ex: [
    'Problem A: Two angles on a straight line are (3x + 20) degrees and (x + 40) degrees. Find both.',
    'Angles on a straight line add up to 180: 3x + 20 + x + 40 = 180, so 4x + 60 = 180.',
    '4x = 120, so x = 30. Angles: 3(30) + 20 = 110 and 30 + 40 = 70. Check 110 + 70 = 180.',
    'Problem B: Two angles of a triangle are 50 and 65 degrees. Third angle = 180 - 50 - 65 = 65 degrees (angles in a triangle).',
    'Problem C: A transversal crosses two parallel lines making an angle of 70 degrees. The alternate angle is 70 degrees; the co-interior angle is 180 - 70 = 110 degrees.',
    'Common mistake: using 360 for angles on a straight line, or forgetting to give a reason. A straight line is half a turn, 180 degrees.'
  ]
}));

S4.push(P('cbc_g7_maths_s4_2', '4.2 Geometrical Constructions', {
  pt: 'Drawing Accurately with a Ruler and a Pair of Compasses',
  tag: 'An arc keeps the same distance from its centre, so equal arcs give equal lengths',
  body: 'A geometrical construction is an accurate drawing made with a sharp pencil, a ruler and a pair of compasses, without using a protractor to measure. The compasses draw an arc, every point of which is the same distance from the centre, so setting the compasses to a fixed radius gives equal lengths exactly. A perpendicular bisector of a line cuts it in half at 90 degrees: with the compasses set to more than half the line, draw arcs from both ends so that they cross above and below, and join the crossing points. To bisect an angle, draw an arc cutting both arms at equal distances from the vertex, then from those two points draw equal arcs that cross, and join the crossing point to the vertex. Because an equilateral triangle has three equal sides and three 60 degree angles, drawing two arcs of the same radius from the ends of a line gives a 60 degree angle; bisecting it gives 30 degrees, and bisecting a constructed 90 degree angle gives 45 degrees. A triangle can be constructed when you know three sides, or two sides and the angle between them, or two angles and a side.',
  f: 'Triangle inequality: the sum of any two sides is greater than the third',
  vis: 'A line with two crossing arcs above and below and the perpendicular bisector drawn through them',
  ctx: 'A fundi marking a triangular gable for a roof and a surveyor pegging out a right angle on the ground use these same equal-distance ideas with a string as the compass.',
  q: 'If you stand two pegs 8 metres apart and swing a string longer than 4 metres from each, where do the two arcs cross, and what is special about that line?',
  exam: 'Constructing a 60, 30, 90 and 45 degree angle, a perpendicular bisector and an angle bisector with arcs left visible, and constructing a triangle from given sides and angles.',
  steps: [
    'Use a sharp pencil and fix the compasses firmly so that the radius does not slip, because accuracy depends on it.',
    'To construct a triangle with sides 6 cm, 7 cm and 8 cm, first check 6 + 7 > 8, because the two shorter sides must be able to meet.',
    'Draw the longest side AB = 8 cm with a ruler.',
    'Set the compasses to 6 cm, place the point at A and draw an arc; set to 7 cm, place at B and draw an arc crossing the first. Join the crossing point C to A and B, because C is 6 cm from A and 7 cm from B.',
    'For a perpendicular bisector of AB, use a radius greater than half of AB (more than 4 cm) from A and B to draw crossing arcs above and below, then join the crossing points; it meets AB at its midpoint at 90 degrees.',
    'For 60 degrees at A, draw an arc of any radius from A to cut the line, keep the same radius from that point to cut the arc, and join A to the intersection.',
    'Never rub out the construction arcs, because they show the method used.'
  ],
  ex: [
    'Problem: Construct triangle ABC with AB = 8 cm, AC = 6 cm and BC = 7 cm, then bisect AB.',
    'Check: 6 + 7 = 13 > 8, 6 + 8 > 7, 7 + 8 > 6, so the triangle can be drawn.',
    'Draw AB = 8 cm. From A draw an arc of radius 6 cm; from B draw an arc of radius 7 cm. Mark C where they cross and join AC and BC.',
    'Set the compasses to 5 cm (more than half of 8 cm). From A and B draw arcs above and below AB that cross at P and Q. Join PQ.',
    'PQ meets AB at M. Measure: AM = MB = 4 cm and the angle at M is 90 degrees.',
    'Construct 30 degrees: build 60 degrees at A as above, then bisect it with equal arcs; each half is 30 degrees.',
    'Common mistake: changing the compass radius between two arcs that should be equal, or choosing a radius shorter than half the line so the arcs do not meet.'
  ]
}));

S5.push(P('cbc_g7_math_s4_1', '5.1 Data Handling', {
  pt: 'Collecting, Showing and Summarising Data',
  tag: 'Turn a pile of numbers into a table, a picture and three typical values',
  body: 'Data is information collected by counting or measuring. We collect it with a tally, a questionnaire or an observation, and organise it in a frequency table, where frequency is the number of times a value occurs. Data can be shown in a pictogram (pictures stand for numbers), a bar graph (bars of equal width whose height shows frequency) or a pie chart, a circle divided into sectors in which each angle is frequency / total x 360 degrees, since a whole circle is 360 degrees. Three measures describe the centre of a set of data. The mean is the sum of the values divided by how many there are. The median is the middle value when the values are arranged in order, or the average of the two middle values if there are two. The mode is the value that occurs most often. The range, the largest minus the smallest value, shows the spread. An outlier is a value very far from the others; it pulls the mean towards it but hardly changes the median.',
  f: 'mean = sum of values / number of values  |  sector angle = frequency / total x 360',
  vis: 'A pie chart with four sectors labelled with fruit names and angles',
  ctx: 'A Mama Mboga records how many of each fruit she sold in a day and a class records the number of goals scored by the school team across eight matches.',
  q: 'A team scores 2, 3, 3, 5, 6, 7, 9 and 13 goals in eight matches. Which single number would you quote to tell someone a typical score, and why?',
  exam: 'Drawing a frequency table, calculating a pie chart angle, finding mean, median, mode and range with a stated working, and explaining the effect of an outlier.',
  steps: [
    'Collect the data with a tally and count each tally group into a frequency, because the table makes the pattern visible.',
    'Check that the frequencies add up to the total number of items, because it shows nothing was missed.',
    'For a pie chart, find each angle with frequency / total x 360, because each share of the whole circle is in proportion.',
    'Check that the angles add up to 360 degrees.',
    'Arrange the data in order from smallest to largest, because the median and range need ordered data.',
    'Find the mean by adding all the values and dividing by how many there are, the median by taking the middle, and the mode by finding the most frequent.',
    'Compare the measures, and comment on any outlier.'
  ],
  ex: [
    'Problem A: Fruit sold in a day: mango 30, orange 45, banana 15, pawpaw 30. Total = 120.',
    'Mango angle = 30/120 x 360 = 90. Orange = 45/120 x 360 = 135. Banana = 15/120 x 360 = 45. Pawpaw = 30/120 x 360 = 90.',
    'Check: 90 + 135 + 45 + 90 = 360 degrees.',
    'Problem B: Goals scored in 8 matches: 2, 3, 3, 5, 6, 7, 9, 13 (already in order).',
    'Mean = (2 + 3 + 3 + 5 + 6 + 7 + 9 + 13)/8 = 48/8 = 6 goals.',
    'Median: the middle values are the 4th and 5th: (5 + 6)/2 = 5.5 goals. Mode = 3 goals. Range = 13 - 2 = 11 goals.',
    'The 13 is an outlier: without it, the mean of the other seven is 35/7 = 5, so it raised the mean by 1 goal.',
    'Common mistake: finding the median without ordering the data first, or taking the middle position of unsorted numbers.'
  ]
}));

const MAP = {
  curriculum: 'CBC',
  grade: 7,
  subject: 'Mathematics',
  code: 'MATH-G7',
  trackPathway: 'Core',
  title: 'CBE Grade 7 (Junior School) Mathematics Metro Line',
  description: 'Grade 7 Mathematics with five strands and eighteen sub-strands, following the KICD Mathematics Grade 7 design.',
  notes: 'Strand and sub-strand names follow the KICD Grade 7 Mathematics design.',
  stations: [
    { id: 'cbc_g7_math_s1', number: 1, title: '1.0 Numbers', strand: 'Strand 1.0: Numbers', status: 'available',
      summary: 'Whole numbers, factors, fractions, decimals, squares and square roots.', subtopics: S1 },
    { id: 'cbc_g7_math_s2', number: 2, title: '2.0 Algebra', strand: 'Strand 2.0: Algebra', status: 'available',
      summary: 'Algebraic expressions, linear equations and linear inequalities.', subtopics: S2 },
    { id: 'cbc_g7_math_s3', number: 3, title: '3.0 Measurements', strand: 'Strand 3.0: Measurements', status: 'available',
      summary: 'Pythagorean relationship, length, area, volume and capacity, time, distance and speed, temperature and money.', subtopics: S3 },
    { id: 'cbc_g7_math_s4', number: 4, title: '4.0 Geometry', strand: 'Strand 4.0: Geometry', status: 'available',
      summary: 'Angles and geometrical constructions.', subtopics: S4 },
    { id: 'cbc_g7_math_s5', number: 5, title: '5.0 Data Handling and Probability', strand: 'Strand 5.0: Data Handling and Probability', status: 'available',
      summary: 'Collecting, organising, representing and summarising data.', subtopics: S5 }
  ]
};

module.exports = { maps: [MAP], retiredIds: ['cbc_g7_math_s2_1', 'cbc_g7_math_s3_1'] };
