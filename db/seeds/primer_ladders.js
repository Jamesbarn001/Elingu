'use strict';
// Prerequisite-ladder (v2) content, keyed by sub-topic id. Merged at read time by primerLadder.js.
// Shape: docs/audits/teaching_depth_report.md section 3.1. No emoji. Every ladder is a draft until a teacher reviews it.


module.exports = {
  // ---------------------------------------------------------------- Grade 10 Core Mathematics: surds and conjugates
  cbc_g10_math_s1_1: {
    ladderVersion: 2,
    prerequisites: [
      {
        id: 'p1_root',
        name: 'What a square root is',
        sourceSubStrandId: 'cbc_g8_math_s1_2',
        fromScratch: 'A square root answers one question: which number, multiplied by itself, gives this one? So the square root of 9 is 3, because 3 x 3 = 9. We write it as √9 = 3. Some numbers do not have a neat answer. √5 is the number that, times itself, makes 5. It is about 2.236, but the digits never end and never repeat. A root like this is called a surd. The one fact we need: √5 x √5 = 5, because that is exactly what √5 means.',
        everydayAnalogy: 'A square plot of land with area 25 square metres has sides of √25 = 5 metres. A square plot of area 5 square metres has sides of √5 metres. You cannot measure that side exactly with a tape, but you know side times side = 5.',
        workedExample: [
          'Step 1: Ask which number multiplied by itself gives 49. Why: that is the meaning of a square root.',
          'Step 2: 7 x 7 = 49, so √49 = 7.',
          'Step 3: For √7, no whole number works, but by the same meaning √7 x √7 = 7.'
        ],
        checkQuestion: { q: 'What is √7 x √7, and how do you know?', answer: '7, because √7 is defined as the number that gives 7 when multiplied by itself.', ifWrongHint: 'Think of a square plot with area 7 square metres. Its side is √7 metres, and side times side is the area.' },
        dependsOn: []
      },
      {
        id: 'p2_brackets',
        name: 'Multiplying two brackets term by term',
        sourceSubStrandId: null,
        fromScratch: '(x + 2)(x + 3) means every term in the first bracket multiplies every term in the second. Work in order: first x times x, then x times 3, then 2 times x, then 2 times 3. So (x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6.',
        everydayAnalogy: 'Two groups of children each shake hands with every child in the other group. Every child in the first group meets every child in the second, so nobody is left out.',
        workedExample: [
          'Step 1: Multiply the first terms: x times x = x².',
          'Step 2: Multiply the outer terms: x times 3 = 3x.',
          'Step 3: Multiply the inner terms: 2 times x = 2x.',
          'Step 4: Multiply the last terms: 2 times 3 = 6.',
          'Step 5: Add all four and collect like terms: x² + 3x + 2x + 6 = x² + 5x + 6.'
        ],
        checkQuestion: { q: 'Expand (x + 4)(x - 1).', answer: 'x² + 3x - 4', ifWrongHint: 'There are four products. Check the sign when you multiply by the -1.' },
        dependsOn: []
      },
      {
        id: 'p3_diff_squares',
        name: 'The pattern that removes the middle terms: difference of two squares',
        sourceSubStrandId: null,
        fromScratch: 'Expand (a + b)(a - b) with the four products: a x a = a²; a x (-b) = -ab; b x a = +ab; b x (-b) = -b². Put together: a² - ab + ab - b². The -ab and +ab cancel, so (a + b)(a - b) = a² - b².',
        everydayAnalogy: 'You pay KES 200 to a boda boda rider by M-Pesa and the same day he refunds KES 200. Your balance goes down 200 and up 200, so the two cancel. In the brackets, -ab and +ab are that payment and that refund. The picture stops being true if the amounts differ: paying 200 and being refunded 150 leaves 50 behind, just as (a + b)(a - 2b) does not cancel.',
        workedExample: [
          'Step 1: Expand (x + 5)(x - 5) by the four products: x² - 5x + 5x - 25.',
          'Step 2: The -5x and +5x cancel because they have opposite signs and the same size.',
          'Step 3: What is left is x² - 25.'
        ],
        checkQuestion: { q: 'Expand (x + 5)(x - 5) and say what happened to the middle terms.', answer: 'x² - 25. The middle terms -5x and +5x cancel.', ifWrongHint: 'Write all four products first, then look at the two middle ones.' },
        dependsOn: ['p2_brackets']
      },
      {
        id: 'p4_equivalent_fractions',
        name: 'Multiplying top and bottom by the same number does not change a fraction',
        sourceSubStrandId: null,
        fromScratch: '1/2 and 3/6 are the same amount, because 3/6 = (1 x 3)/(2 x 3), and 3/3 = 1. Multiplying anything by 1 changes how it looks, not its value.',
        everydayAnalogy: 'Half a loaf of bread is the same amount of bread as three sixths of a loaf cut into six slices. Cutting finer changes the look, not the amount.',
        workedExample: [
          'Step 1: To write 1/2 with denominator 6, ask what 2 must be multiplied by to give 6. The answer is 3.',
          'Step 2: Multiply top and bottom by 3: (1 x 3)/(2 x 3) = 3/6.',
          'Step 3: Why it is allowed: 3/3 = 1, and multiplying by 1 does not change the value.'
        ],
        checkQuestion: { q: 'Write 2/5 as a fraction with denominator 15.', answer: '6/15', ifWrongHint: 'What must 5 be multiplied by to give 15? Do the same to the top.' },
        dependsOn: []
      }
    ],
    newIdea: {
      whyNeeded: 'Look at 6 / (√5 + √2). The bottom is a sum of surds, a number with endless digits, so you would have to divide 6 by 3.6502815... by hand. A bottom that is a plain whole number is much easier to work with. Rationalising rewrites the fraction so the bottom has no root, without changing its value.',
      fromScratch: 'The pattern (a + b)(a - b) = a² - b² can remove roots: if a = √5 and b = √2 then a² = 5 and b² = 2, both whole numbers. The conjugate of (√5 + √2) is (√5 - √2): the same two terms with the sign in the middle flipped. Multiplying a bracket by its conjugate always gives a whole number when the terms are square roots of whole numbers, because the middle terms cancel. The conjugate of (√7 - √3) is (√7 + √3). The conjugate of (3 + √2) is (3 - √2), not (-3 - √2): flip only the sign between the two terms. We are allowed to multiply the bottom by the conjugate as long as we multiply the top by the same thing, which is multiplying the fraction by 1.',
      everydayAnalogy: 'The M-Pesa payment and refund: the conjugate is the refund that cancels the payment, so the awkward middle part disappears.',
      analogyLimit: 'The cancelling only happens when the two brackets are the same except for the middle sign.',
      workedExample: {
        problem: 'Rationalise 6 / (√5 + √2).',
        steps: [
          { do: 'Write the conjugate of the bottom: √5 - √2.', why: 'We want the middle terms to cancel.', result: 'conjugate = √5 - √2' },
          { do: 'Make a fraction equal to 1 with it: (√5 - √2)/(√5 - √2).', why: 'Multiplying by 1 cannot change the value.', result: '(√5 - √2)/(√5 - √2) = 1' },
          { do: 'Multiply the whole fraction by it: 6(√5 - √2) / [(√5 + √2)(√5 - √2)].', why: 'Top times top, bottom times bottom. The top must be multiplied too.', result: '6(√5 - √2) / [(√5 + √2)(√5 - √2)]' },
          { do: 'Work out the bottom with a = √5 and b = √2: (√5)² - (√2)² = 5 - 2.', why: 'The middle terms +√10 and -√10 cancel, and √5 x √5 = 5, √2 x √2 = 2.', result: '3' },
          { do: 'Write the top: 6(√5 - √2).', why: 'Multiply the 6 into both terms in the bracket.', result: '6√5 - 6√2' },
          { do: 'Put the fraction back together: (6√5 - 6√2)/3.', why: 'Top over the new bottom.', result: '(6√5 - 6√2)/3' },
          { do: 'Divide each term on the top by 3.', why: 'The common factor 3 cancels, and an exam answer must be fully simplified.', result: '2√5 - 2√2' }
        ],
        sanityCheck: 'With √5 = 2.236 and √2 = 1.414: left side 6 / 3.650 = 1.644; right side 2(2.236) - 2(1.414) = 4.472 - 2.828 = 1.644. They agree, so the value did not change; only the look did.'
      },
      commonMistakes: [
        { mistake: 'Multiplying only the bottom by the conjugate and forgetting the top.', whyItHappens: 'The learner focuses on the bottom because that is the part they want to change.', howToSpotIt: 'The working has no fraction of the form conjugate over conjugate. Always write that fraction first.' },
        { mistake: 'Flipping the wrong sign, for example writing the conjugate of √5 + √2 as -√5 - √2, or repeating √5 + √2.', whyItHappens: 'Flipping every sign instead of just the one in the middle.', howToSpotIt: 'Squaring the same bracket gives 5 + 2√10 + 2, which still has a root. Change only the middle sign.' },
        { mistake: 'Writing (√5 + √2)(√5 - √2) = √5 - √2 or √(5 - 2).', whyItHappens: 'The square of √5 is mistaken for √5.', howToSpotIt: 'The square of √5 is 5, not √5. Do the four products slowly until the pattern is familiar.' },
        { mistake: 'Stopping at (6√5 - 6√2)/3.', whyItHappens: 'Rationalising is done, so the learner stops before simplifying.', howToSpotIt: 'Look for a common factor on top and bottom. The exam answer is 2√5 - 2√2.' }
      ],
      check: [
        { q: 'Write the conjugate of √7 - √3 and multiply the two brackets.', answer: 'The conjugate is √7 + √3 and the product is 7 - 3 = 4.', marks: 1 },
        { q: 'Rationalise 4 / (√6 - √2).', answer: 'Multiply by (√6 + √2)/(√6 + √2). The bottom is 6 - 2 = 4, the top is 4(√6 + √2), so the answer is √6 + √2.', marks: 2 }
      ]
    },
    glossary: [
      { en: 'surd', sw: null, swGloss: null, reviewed: false },
      { en: 'conjugate', sw: null, swGloss: null, reviewed: false },
      { en: 'rationalise', sw: null, swGloss: null, reviewed: false }
    ]
  },

  // ---------------------------------------------------------------- Grade 10 Core Mathematics: completing the square
  cbc_g10_math_s1_2: {
    ladderVersion: 2,
    prerequisites: [
      {
        id: 'p1_square_bracket',
        name: 'Expanding a squared bracket',
        sourceSubStrandId: null,
        fromScratch: '(x + 3)² means (x + 3) multiplied by (x + 3). Multiply every term by every term: x times x = x², x times 3 = 3x, 3 times x = 3x, 3 times 3 = 9. So (x + 3)² = x² + 6x + 9. Notice the middle term, 6x, is twice the number inside the bracket times x, and the last term, 9, is that number squared.',
        everydayAnalogy: 'A square tile floor of side (x + 3) metres. Cut it into a square of side x, a square of side 3, and two strips of x by 3. The areas are x², 9, 3x and 3x.',
        workedExample: [
          'Step 1: Write (x + 3)² as (x + 3)(x + 3).',
          'Step 2: Multiply every term by every term: x² + 3x + 3x + 9.',
          'Step 3: Collect like terms: x² + 6x + 9.'
        ],
        checkQuestion: { q: 'Expand (x + 4)².', answer: 'x² + 8x + 16', ifWrongHint: 'Write it as (x + 4)(x + 4) and find all four products.' },
        dependsOn: []
      },
      {
        id: 'p2_roots_both',
        name: 'A square can come from two numbers, so a square root has two answers',
        sourceSubStrandId: 'cbc_g8_math_s1_2',
        fromScratch: 'Both 2 x 2 = 4 and (-2) x (-2) = 4. So if y² = 4, then y could be 2 or -2. We write y = ±2. When you take the square root of both sides of an equation, you must keep both answers.',
        everydayAnalogy: 'Walking 2 steps forward or 2 steps back from a doorway puts you 2 steps from it either way. The distance squared is 4 in both cases.',
        workedExample: [
          'Step 1: Start with y² = 9.',
          'Step 2: 3 x 3 = 9 and (-3) x (-3) = 9, so y = 3 or y = -3.'
        ],
        checkQuestion: { q: 'Solve y² = 25.', answer: 'y = 5 or y = -5', ifWrongHint: 'Which two numbers give 25 when multiplied by themselves?' },
        dependsOn: []
      },
      {
        id: 'p3_balance',
        name: 'Doing the same thing to both sides of an equation',
        sourceSubStrandId: null,
        fromScratch: 'An equation is a balance. If you add the same number to both sides, it stays balanced. For x + 2 = 5, subtracting 2 from both sides gives x = 3.',
        everydayAnalogy: 'A balance scale with maize on both pans. Add one scoop to each pan and the scale still balances.',
        workedExample: [
          'Step 1: Start with x² + 6x = -5.',
          'Step 2: Add 9 to both sides so the balance is kept: x² + 6x + 9 = 4.'
        ],
        checkQuestion: { q: 'If x² + 8x = 3, what do you get when you add 16 to both sides?', answer: 'x² + 8x + 16 = 19', ifWrongHint: 'The 16 has to be added on the left and on the right.' },
        dependsOn: []
      }
    ],
    newIdea: {
      whyNeeded: 'Some quadratics, like x² + 6x + 5 = 0, cannot easily be solved by taking a square root because the x appears twice (as x² and as 6x). If we could rewrite the left side as one squared bracket, we could take a square root and solve. Completing the square is the method for doing exactly that.',
      fromScratch: 'From the first prerequisite, (x + p)² = x² + 2px + p². So if you have x² + bx, the number that finishes the square is p² where 2p = b: halve the coefficient of x, then square it. Adding that number to both sides turns the left side into (x + p)².',
      everydayAnalogy: 'A square floor missing a corner. x² is the big square, the bx part is two strips, and the missing corner square is the number you add to complete it.',
      analogyLimit: 'The floor picture works for positive b. For negative b the same rule holds with p negative, but you cannot picture negative lengths.',
      workedExample: {
        problem: 'Solve x² + 6x + 5 = 0 by completing the square.',
        steps: [
          { do: 'Move the constant to the right: x² + 6x = -5.', why: 'We want only the x terms on the left to build a square from.', result: 'x² + 6x = -5' },
          { do: 'Halve the coefficient of x: 6 divided by 2 = 3. Square it: 3² = 9.', why: '(x + 3)² = x² + 6x + 9, so 9 is the missing corner.', result: '9' },
          { do: 'Add 9 to both sides.', why: 'Both sides must stay balanced.', result: 'x² + 6x + 9 = 4' },
          { do: 'Write the left side as a squared bracket.', why: 'x² + 6x + 9 is exactly (x + 3)².', result: '(x + 3)² = 4' },
          { do: 'Take the square root of both sides, keeping both signs.', why: 'A square can come from a positive or a negative number.', result: 'x + 3 = 2 or x + 3 = -2' },
          { do: 'Subtract 3 from each.', why: 'To get x on its own.', result: 'x = -1 or x = -5' }
        ],
        sanityCheck: 'Put x = -1 back in: 1 - 6 + 5 = 0. Put x = -5 back in: 25 - 30 + 5 = 0. Both work.'
      },
      commonMistakes: [
        { mistake: 'Adding the corner number to only one side.', whyItHappens: 'The learner forgets the equation is a balance.', howToSpotIt: 'The left and right sides no longer match when x is substituted. Always write "both sides".' },
        { mistake: 'Squaring b instead of halving it first, for example adding 36 instead of 9.', whyItHappens: 'Mixing up the rule "half, then square".', howToSpotIt: 'Expand your bracket. (x + 3)² gives 9 as the last term, not 36.' },
        { mistake: 'Keeping only the positive square root.', whyItHappens: 'Forgetting that a square can come from a negative number.', howToSpotIt: 'You find only one solution to a quadratic that should have two. Check by substituting.' }
      ],
      check: [
        { q: 'What number must be added to x² + 8x to complete the square, and what is the squared bracket?', answer: '16, giving (x + 4)².', marks: 1 },
        { q: 'Solve x² - 10x + 21 = 0 by completing the square.', answer: 'x² - 10x = -21; add 25 to get (x - 5)² = 4; x - 5 = ±2; x = 7 or x = 3.', marks: 2 }
      ]
    },
    glossary: [
      { en: 'completing the square', sw: null, swGloss: null, reviewed: false },
      { en: 'coefficient', sw: null, swGloss: null, reviewed: false }
    ]
  },

  // ---------------------------------------------------------------- Grade 8 Integrated Science: separation by distillation
  cbc_g8_sci_s1_1: {
    ladderVersion: 2,
    prerequisites: [
      {
        id: 'p1_mixture',
        name: 'What a mixture is',
        sourceSubStrandId: null,
        fromScratch: 'A mixture is two or more substances mixed together but not joined by a chemical reaction. Each substance in a mixture keeps its own properties. Salt dissolved in water is a mixture: the water is still water, and the salt is still salt, which you can get back by evaporating the water.',
        everydayAnalogy: 'Githeri: maize and beans cooked together. You can still pick the beans out, and each is still beans.',
        workedExample: [
          'Step 1: Stir sugar into tea. The sugar seems to disappear.',
          'Step 2: Taste the tea: it is sweet, so the sugar is still there.',
          'Step 3: Boil the tea away and sugar is left behind. No new substance was made, so it is a mixture.'
        ],
        checkQuestion: { q: 'Salt dissolved in water: is this a mixture, and how could you get the salt back?', answer: 'Yes, a mixture. Evaporate the water and the salt is left.', ifWrongHint: 'Ask whether either substance changed into something new.' },
        dependsOn: []
      },
      {
        id: 'p2_boiling_point',
        name: 'Boiling point',
        sourceSubStrandId: null,
        fromScratch: 'The boiling point of a liquid is the temperature at which it boils and turns into a gas (vapour). Different liquids have different boiling points. Water boils at 100 °C and ethanol boils at 78 °C at normal air pressure.',
        everydayAnalogy: 'Different liquids need different amounts of heat before they boil, just as a big pot of water on a jiko takes longer to boil than a small one.',
        workedExample: [
          'Step 1: Heat water and a thermometer reads 100 °C when it boils steadily.',
          'Step 2: Heat ethanol and the thermometer reads 78 °C when it boils steadily.',
          'Step 3: So ethanol reaches boiling at a lower temperature than water.'
        ],
        checkQuestion: { q: 'Ethanol boils at 78 °C and water at 100 °C. Which one starts to boil first when heated gently, and why?', answer: 'Ethanol, because its boiling point is lower.', ifWrongHint: 'The lower boiling point is reached first as the temperature rises.' },
        dependsOn: []
      },
      {
        id: 'p3_condensation',
        name: 'Vapour turning back into liquid (condensation)',
        sourceSubStrandId: null,
        fromScratch: 'When a gas or vapour is cooled it turns back into a liquid. This is called condensation. It is the reverse of boiling.',
        everydayAnalogy: 'Steam from a boiling sufuria hits the cold lid and turns into water drops on the lid.',
        workedExample: [
          'Step 1: Hot vapour rises from the pot.',
          'Step 2: It touches the cool lid and loses heat.',
          'Step 3: It turns back into liquid drops on the lid.'
        ],
        checkQuestion: { q: 'Steam touches a cold window and water drops form. What is this change called?', answer: 'Condensation.', ifWrongHint: 'Which direction is it: gas to liquid or liquid to gas?' },
        dependsOn: []
      }
    ],
    newIdea: {
      whyNeeded: 'Suppose you have ethanol and water mixed together. Both are clear liquids, so you cannot pick one out or filter it. But they have different boiling points. Distillation uses that difference to separate them.',
      fromScratch: 'Heat the mixture gently. The liquid with the lower boiling point, ethanol, turns to vapour more readily and rises first. A fractionating column above the flask lets vapour rise through it while the less volatile liquid condenses and drips back down, so the vapour reaching the top is richer in the lower-boiling liquid. The vapour passes into a condenser, where cold water around it turns it back into liquid, which is collected in a receiver. The result is a liquid mostly made of ethanol. It is richer in ethanol than the mixture you started with, but not perfectly pure.',
      everydayAnalogy: 'A steep hill race: the lighter runners reach the top first and the heavier runners fall behind. Here the liquid that turns to vapour more readily reaches the top of the column first.',
      analogyLimit: 'In a race the runners are separate people. In the flask both liquids give off some vapour, so the first liquid collected is mostly, not entirely, ethanol.',
      workedExample: {
        problem: 'Separate a mixture of ethanol and water by fractional distillation.',
        steps: [
          { do: 'Put the mixture in a flask, fit the fractionating column, thermometer and condenser, and heat gently.', why: 'Gentle heating keeps the temperature near the lower boiling point so the two liquids separate.', result: 'Vapour begins to rise.' },
          { do: 'Watch the thermometer at the top of the column.', why: 'Near 78 °C, the vapour reaching the top is mostly ethanol, because ethanol has the lower boiling point.', result: 'The thermometer holds near 78 °C.' },
          { do: 'Run cold water through the outer jacket of the condenser, entering at the bottom.', why: 'The cold surface makes the vapour lose heat and condense into liquid.', result: 'Liquid drips from the condenser.' },
          { do: 'Collect the liquid in a receiver flask while the temperature stays near 78 °C.', why: 'This liquid is mostly ethanol.', result: 'The ethanol-rich liquid is collected.' },
          { do: 'When the temperature begins to rise towards 100 °C, change the receiver or stop.', why: 'A rising temperature shows that more water vapour is now coming over.', result: 'The remaining liquid in the flask is mostly water.' }
        ],
        sanityCheck: 'Check the temperature: ethanol-rich liquid came over near 78 °C and water-rich liquid near 100 °C, matching the two boiling points.'
      },
      commonMistakes: [
        { mistake: 'Saying only the lower-boiling liquid evaporates and the other does not at all.', whyItHappens: 'Treating boiling points as sharp on/off switches.', howToSpotIt: 'Some water vapour is present even below 100 °C. That is why a fractionating column is used, and why the result is mostly ethanol rather than pure.' },
        { mistake: 'Heating too fast.', whyItHappens: 'Wanting the liquid to come over quickly.', howToSpotIt: 'The thermometer rises past the first boiling point and both liquids come over together. Heat gently.' },
        { mistake: 'Running cold water into the top of the condenser jacket.', whyItHappens: 'Not realising that the jacket must stay full of water.', howToSpotIt: 'The jacket is only partly full and vapour escapes uncondensed. Cold water enters at the bottom and leaves at the top so the jacket is full.' }
      ],
      check: [
        { q: 'Why does the ethanol-rich vapour reach the top of the column before the water vapour?', answer: 'Ethanol has a lower boiling point (78 °C) than water (100 °C), so it turns to vapour more readily and rises first.', marks: 1 },
        { q: 'In the apparatus, what does the condenser do, and why does cold water enter at the bottom of its jacket?', answer: 'It cools the vapour so it turns back into liquid. Cold water enters at the bottom so the jacket fills completely and the water flows against the vapour, keeping the cooling effective.', marks: 2 }
      ]
    },
    glossary: [
      { en: 'boiling point', sw: null, swGloss: null, reviewed: false },
      { en: 'condensation', sw: null, swGloss: null, reviewed: false },
      { en: 'fractional distillation', sw: null, swGloss: null, reviewed: false }
    ]
  }
};
