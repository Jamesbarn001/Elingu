// ══════════════════════════════════════════════════════════════
// KICD CBC MATHEMATICS SEED DATA (Grades 6–12)
// Preserves all existing station & subtopic IDs and analogies
// (Lake Victoria Diver, Mama Mboga's Market Bags) + Official KICD Grade 10 Table
// ══════════════════════════════════════════════════════════════

function stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps = [], workedExample = '') {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: primerTitle,
      tagline,
      body,
      formula,
      visualBadge,
      realWorldContext,
      explanationSteps: steps.length ? steps : [
        'Step 1: Identify the mathematical quantities and governing algebraic or geometric rule.',
        'Step 2: Substitute known values carefully with consistent units and signs.',
        'Step 3: Simplify step-by-step and verify reasonableness against the real-world context.'
      ],
      workedExample: workedExample || `Formula Application: ${formula} — ${realWorldContext}`
    },
    socraticPrompt,
    formulaBadge: formula,
    examFocus
  };
}

const CBC_MATH_MAPS = [
  // GRADE 6 MATHEMATICS
  {
    curriculum: 'CBC',
    grade: 6,
    subject: 'Mathematics',
    code: 'MATH-G6',
    trackPathway: 'Core',
    title: 'CBE Grade 6 (Upper Primary) Mathematics Metro Line',
    stations: [
      {
        id: 'cbc_g6_math_s1',
        number: 1,
        title: '1.0 Numbers: Whole Numbers to Millions, Fractions & Decimals',
        strand: 'Strand 1.0: Numbers',
        icon: '🔢',
        status: 'available',
        summary: 'Place value up to 7 digits, rounding to thousands, LCM/GCD, fractions, decimals, and percentages.',
        subtopics: [
          stop('cbc_g6_math_s1_1', '1.1 Place Value & Rounding to Nearest 1,000', 'Place Value in Millions', 'Position dictates value in base-10', 'Every step to the left increases value ten-fold. When rounding to the nearest thousand, inspect the hundreds digit: 5 or more rounds up; 4 or less stays.', 'Millions (M) • HTh • TTh • Th • H • T • O', '📊 Base-10 Abacus Model', 'Tracking county development allocations and national census totals in Kenya.', 'In 3,847,219, what is the total value of the digit 8 compared to the digit 7?', 'KPSEA Model Item: Identifying place value and correct rounding up without trailing errors.'),
          stop('cbc_g6_math_s1_2', '1.2 Fractions, Decimals & Percentages Conversion', 'Three Expressions of One Quantity', 'Fractions, decimals, and hundredths are equivalent languages', 'A fraction represents parts of a whole (3/4). Divide 3 by 4 to get the decimal 0.75. Multiply by 100 to express it as 75%.', 'Fraction a/b = (a ÷ b) = (a/b × 100)%', '🥧 Visual Fraction-Decimal Wheel', 'Comparing test scores, market discounts, and soil moisture percentages.', 'If a farmer sells 3/5 of her harvest, what percentage remains, and what is its decimal value?', 'KPSEA Assessment: Converting mixed fractions into decimals and percentages under 2 minutes.')
        ]
      },
      {
        id: 'cbc_g6_math_s2',
        number: 2,
        title: '2.0 Measurement & Financial Literacy',
        strand: 'Strand 2.0: Measurement',
        icon: '📐',
        status: 'available',
        summary: 'Perimeter, area of irregular shapes, capacity, and M-Pesa business transactions.',
        subtopics: [
          stop('cbc_g6_math_s2_1', '2.1 Perimeter & Area of Compound Shapes', 'Boundary vs. Surface Space', 'Decomposing complex shapes into friendly rectangles', 'Perimeter is the total outer boundary walked. Area is the 2D surface covered. For L-shaped regions, split into two rectangles and sum their areas.', 'Area_total = Area_1 + Area_2', '🧱 Tiling Grid Representation', 'Calculating corrugated iron sheets for roofing and chain-link fencing for shambas.', 'If you have an L-shaped flower bed, where would you make a cut to divide it into two simple rectangles?', 'KPSEA Structured Task: Finding missing side lengths before calculating the total perimeter.'),
          stop('cbc_g6_math_s2_2', '2.2 Profit, Loss & Transaction Fees', 'Money Flow in Small Enterprises', 'Revenue minus cost equals true business gain', 'Profit occurs when Selling Price exceeds Cost Price (Profit = SP - CP). Factoring in transaction charges gives net return.', 'Net Gain = Selling Price - Cost Price - Fees', '💰 Ledger & Shilling Balance Scale', 'Running a fruit stall or poultry side-project with mobile money tariffs.', 'If a batch of mangoes is bought for KES 1,200 and sold for KES 1,800, what is the percentage profit?', 'CBE Financial Application: Calculating profit percentage relative to initial cost.')
        ]
      },
      {
        id: 'cbc_g6_math_s3',
        number: 3,
        title: '3.0 Geometry: Angles & 3D Solids',
        strand: 'Strand 3.0: Geometry',
        icon: '🔺',
        status: 'available',
        summary: 'Acute, obtuse, and reflex angles; properties of prisms, pyramids, and cylinders.',
        subtopics: [
          stop('cbc_g6_math_s3_1', '3.1 Measuring Angles & Angle Properties', 'Rotation Between Rays', 'From sharp acute turns to straight 180° lines', 'Angles measure turning. Angles on a straight line always sum to 180°. Complementary angles sum to 90°; supplementary sum to 180°.', 'Sum on line = 180°,  Full turn = 360°', '🧭 Calibrated 360° Protractor', 'Roof pitch angles for draining heavy rainfall and clock face turns.', 'If one angle on a straight line is 115°, how many degrees remain for its adjacent partner?', 'KPSEA Geometry: Using angle facts to solve missing values without measuring errors.')
        ]
      },
      {
        id: 'cbc_g6_math_s4',
        number: 4,
        title: '4.0 Data Handling: Frequency Tables & Bar Graphs',
        strand: 'Strand 4.0: Data Handling',
        icon: '📊',
        status: 'available',
        summary: 'Tally charts, grouped frequencies, and constructing scaled vertical bar graphs.',
        subtopics: [
          stop('cbc_g6_math_s4_1', '4.1 Constructing & Interpreting Bar Graphs', 'Visualising Frequencies at a Glance', 'Uniform spacing, aligned bases, and faithful vertical scales', 'The height of each bar represents its frequency. Ensure uniform bar widths and equal gaps between categories for truthful visual communication.', 'Bar Height ∝ Category Frequency', '📈 Scaled Bar Graph Chart', 'Visualising school club attendance and weekly clinic health records.', 'Why must the vertical axis always begin at zero when drawing an honest comparative bar graph?', 'KPSEA Data Interpretation: Extracting modal categories and range from plotted bars.')
        ]
      }
    ]
  },

  // GRADE 7 MATHEMATICS
  {
    curriculum: 'CBC',
    grade: 7,
    subject: 'Mathematics',
    code: 'MATH-G7',
    trackPathway: 'Core',
    title: 'CBE Grade 7 (Junior School) Mathematics Metro Line',
    stations: [
      {
        id: 'cbc_g7_math_s1',
        number: 1,
        title: '1.0 Numbers: Integers, BODMAS & Prime Factorisation',
        strand: 'Strand 1.0: Numbers',
        icon: '🔢',
        status: 'available',
        summary: 'Directed integers on number line, order of operations, prime factor trees for LCM/GCD, fractions and decimals.',
        subtopics: [
          stop('cbc_g7_math_s1_1', '1.1 Directed Numbers & Order of Operations (BODMAS)', 'The Law of Operation Hierarchy', 'Brackets, Orders, Division/Multiplication, then Addition/Subtraction', 'BODMAS prevents ambiguity. Multiplication and division share equal priority from left to right, followed by addition and subtraction.', '(-a) × (-b) = +ab  |  (-a) ÷ (+b) = -(a/b)', '⚖️ Negative-Positive Integer Scale', 'Elevation below sea level and banking debits vs. credits.', 'In 18 - 3 × 4 + 2, which operation takes priority first, and why does doing subtraction first give the wrong result?', 'KJSEA Core Skill: Showing sequential line-by-line simplification without skipping steps.'),
          stop('cbc_g7_math_s1_2', '1.2 Prime Factors, HCF & LCM by Venn Method', 'Decomposing Numbers into Atomic Primes', 'Every composite number is a unique product of primes', 'HCF is the product of common prime factors. LCM is the product of the highest power of every prime factor involved.', 'HCF(a,b) × LCM(a,b) = a × b', '⭕ Intersecting Prime Venn Circles', 'Coordinating arrival intervals for commuter buses and cutting tiles without waste.', 'If two traffic lights flash every 12 seconds and 18 seconds, after how many seconds will they flash simultaneously?', 'KJSEA Structured Task: Expressing composite numbers in index notation (e.g. 2³ × 3²).')
        ]
      },
      {
        id: 'cbc_g7_math_s2',
        number: 2,
        title: '2.0 Algebra & Proportional Sharing',
        strand: 'Strand 2.0: Algebra',
        icon: '⚖️',
        status: 'available',
        summary: 'Algebraic expressions, linear equations in one unknown, inequalities, and ratio sharing.',
        subtopics: [
          stop('cbc_g7_math_s2_1', '2.1 Dividing Quantities in Given Ratios & Linear Equations', 'Fair Proportional Division & Algebraic Balance', 'Find one unit part to find all shares', 'To share a quantity in ratio a : b : c, sum the ratio parts (a + b + c), find the value of one part by division, then multiply by each individual part.', 'Individual Share = (Part / Total Ratio) × Total Amount', '📏 Segmented Ratio Bar Model', 'Splitting harvest earnings among cooperative members and concrete mixing (1 : 2 : 4).', 'If KES 45,000 is shared in the ratio 3 : 2 between Aisha and Brian, how much does each receive?', 'KJSEA Multi-mark problem: Verifying that all calculated shares sum back to the original total.')
        ]
      },
      {
        id: 'cbc_g7_math_s3',
        number: 3,
        title: '3.0 Measurements & Circle Geometry',
        strand: 'Strand 3.0: Measurements',
        icon: '⭕',
        status: 'available',
        summary: 'Pythagorean relationship, circumference (2πr), area of circles (πr²), volume, and commercial arithmetic.',
        subtopics: [
          stop('cbc_g7_math_s3_1', '3.1 Deriving & Applying πr² and 2πr', 'The Invariant Ratio of the Circle', 'Circumference divided by diameter is always Pi (≈ 22/7 or 3.142)', 'Unrolling a circle reveals Circumference = 2πr. Slicing a circle into wedges rearranges into a parallelogram of base πr and height r, giving Area = πr².', 'C = 2πr = πd  |  Area = πr²', '🎯 Circle Wedge Area Derivation', 'Water tank diameters, circular running tracks, and irrigation pivot coverage.', 'If the radius of a circular water reservoir doubles, by what factor does its surface area increase?', 'KJSEA Exam Focus: Remembering to square only the radius (π × r²), not the product of π and r.')
        ]
      },
      {
        id: 'cbc_g7_math_s4',
        number: 4,
        title: '4.0 Geometry & Data Handling',
        strand: 'Strand 4.0: Data Handling and Probability',
        icon: '📊',
        status: 'available',
        summary: 'Angles on parallel lines, geometrical constructions, frequency tables, mean, median, mode, and range.',
        subtopics: [
          stop('cbc_g7_math_s4_1', '4.1 Calculating Central Tendency & Detecting Outliers', 'Summarising a Distribution in a Single Number', 'Mean balances total, Median resists extremes, Mode counts frequency', 'Mean is the arithmetic sum divided by count. Median is the middle value when ordered. Outliers skew the mean heavily, making the median a more reliable center.', 'Mean = (Σx) / n  |  Range = Max - Min', '⚖️ Fulcrum Balance of Mean', 'Analyzing maize yield per acre and school exam score averages.', 'In a set of 5 numbers where the mean is 12, what must the sum of all five numbers be?', 'KJSEA Structured Item: Ordering numbers before finding median for an even-sized sample.')
        ]
      }
    ]
  },

  // GRADE 8 MATHEMATICS (Preserving Lake Victoria Diver cbc_g8_math_s1_1 & Mama Mboga cbc_g8_math_s4_1)
  {
    curriculum: 'CBC',
    grade: 8,
    subject: 'Mathematics',
    code: 'MATH-G8',
    trackPathway: 'Core',
    title: 'CBE Grade 8 (Junior School) Mathematics Metro Line',
    stations: [
      {
        id: 'cbc_g8_math_s1',
        number: 1,
        title: '1.0 Numbers: Integers, Fractions, Indices & Tables',
        strand: 'Strand 1.0: Numbers',
        icon: '🔢',
        status: 'available',
        summary: 'Directed numbers, four operations on fractions, indices, logarithms, and mathematical tables.',
        subtopics: [
          stop(
            'cbc_g8_math_s1_1',
            '1.1 Directed Numbers & Negative Signs',
            'The Elevator & Diver: Rising & Diving',
            'Facing directions: Turning around twice points you forward!',
            'Think of an elevator or a diver in Lake Victoria:\n• Positive numbers (+) are heights above water level.\n• Negative numbers (−) are depths below the surface.\n• The minus sign (−) means: "Turn around and face the other direction!"\nWhen you subtract a negative (e.g. 5 − (−3)), subtraction tells you to face backwards, and the negative sign tells you to turn around again. Two turns face you forward, so you walk forward: 5 + 3 = 8!',
            'Subtracting a debt adds to your wealth: a − (−b) = a + b',
            '🛗 Lake Victoria Diver & Elevator Model',
            'Measuring water depths in Lake Victoria (-80m) vs cold altitudes on Mount Kenya (+5,199m).',
            'Why does multiplying two negative numbers yield a positive result?',
            'KNEC Section A: 2-Mark Quick Check on signed integer expressions.',
            [
              'Step 1: Picture facing forward along the number line toward positive numbers.',
              'Step 2: A minus sign (-) tells you to do an about-face and face backward.',
              'Step 3: A second minus sign tells you to turn around again — now you face forward again!',
              'Step 4: Walking into a double-negative always moves you forward into the positive.'
            ],
            'Example: You have 5 shillings (cash in pocket), but someone cancels a 3 shilling debt you owed (-3).\nCancelling a debt makes you richer!\n5 - (-3) = 5 + 3 = 8 shillings.'
          ),
          stop('cbc_g8_math_s1_2', '1.2 Squares & Square Roots via 4-Figure Tables', 'Table Lookups & Mean Differences', 'Fast manual logarithmic and square evaluation', 'Locate the primary value in the left column, move across to the main digit column, and add the mean difference.', 'x = √N ⟹ x² = N', '📖 KNEC 4-Figure Mathematical Table', 'Engineering precision when calculating land plots without calculators.', 'When using mathematical tables, why do we add mean differences for squares but subtract for reciprocal tables?', 'KNEC Section A: Accurate table reading with mean difference addition.')
        ]
      },
      {
        id: 'cbc_g8_math_s2',
        number: 2,
        title: '2.0 Measurements: Circles, Solids, Financial Maths & Pythagoras',
        strand: 'Strand 2.0: Measurements',
        icon: '📐',
        status: 'available',
        summary: 'Area of sectors, surface area of cylinders/prisms, Compound Interest, Hire Purchase, and Pythagoras.',
        subtopics: [
          stop('cbc_g8_math_s2_1', '2.1 Compound Interest & Hire Purchase', 'Money Growing on Money', 'Exponential returns vs. flat simple interest', 'Compound interest calculates interest on both the principal and previous accrued interest: A = P(1 + r/100)^n.', 'A = P(1 + r/100)^n', '📈 Compounding Curve Model', 'Sacco savings accounts, treasury bonds, and buying water pumps on hire purchase.', 'Why is buying farm machinery on hire purchase always more expensive than cash price?', 'KNEC Section B: 10-Mark Structured Question comparing cash vs. installment options.'),
          stop('cbc_g8_math_s2_2', '2.2 Pythagoras Theorem in Real Space', 'The Square on the Hypotenuse', 'Geometry of the right triangle', 'In any right-angled triangle, the area of the square on the longest side equals the sum of the squares on the other two legs.', 'a² + b² = c²', '📐 3-4-5 Triangle Geometric Proof', 'Roof truss construction in Thika, surveying boundaries, and diagonal bracing.', 'If a 10m ladder leans against a vertical wall with its base 6m away, how high up the wall does it reach?', 'KNEC Section A: Accurate substitution and square-root evaluation.')
        ]
      },
      {
        id: 'cbc_g8_math_s3',
        number: 3,
        title: '3.0 Geometry: Cartesian Coordinates, Scale Drawing & Transformations',
        strand: 'Strand 3.0: Geometry',
        icon: '📍',
        status: 'available',
        summary: 'Plotting (x, y), scale drawings, bearings, reflections, rotations, and common solids nets.',
        subtopics: [
          stop('cbc_g8_math_s3_1', '3.1 Cartesian Grids & Reflection Lines', 'Mapping Points to Ordered Pairs', 'Horizontal run before vertical rise', 'Each point is uniquely identified by (x, y). Reflecting across the y-axis negates x; reflecting across the x-axis negates y.', 'Reflection in y-axis: (x, y) ⟹ (-x, y)', '🪞 Mirrored Coordinate Plane', 'GPS navigation, architectural CAD designs, and computer game sprite movement.', 'What happens to the coordinates of point (4, -3) when reflected in the line y = 0?', 'KNEC Section A: Finding coordinates of image points under reflection.')
        ]
      },
      {
        id: 'cbc_g8_math_s4',
        number: 4,
        title: '4.0 Algebra: Simultaneous Linear Equations & Matrices',
        strand: 'Strand 4.0: Algebra',
        icon: '⚡',
        status: 'available',
        summary: 'Elimination and substitution methods for two unknowns, and algebraic factorisation.',
        subtopics: [
          stop(
            'cbc_g8_math_s4_1',
            '4.1 Solving Simultaneous Equations by Elimination Method',
            'Mama Mboga’s Market Bags: Canceling One Mystery',
            'When opposites (+y and -y) meet on the table, they vanish into zero!',
            'Imagine you buy two mystery grocery bags at the market:\n• Bag 1: 2 Mangoes + 1 Avocado = 70 KES\n• Bag 2: 1 Mango − 1 Avocado = 20 KES\nNotice the avocados! One bag has +1 Avocado, the other has −1 Avocado.\nIf you pour both bags together onto one table, the (+1) and (−1) cancel each other out completely!\nYou are left with only Mangoes: 3 Mangoes = 90 KES, so 1 Mango = 30 KES!\nThat is Elimination: combining equations so one unknown disappears.',
            'Opposite signs (+y and -y)? ADD the equations to wipe out y!',
            '🧺 Market Fruit Bags & Balance Scale',
            'Splitting bundled fruit bills at Muthurwa Market when individual prices are not labeled.',
            'Given 2x + y = 7 and x - y = 2, how can we eliminate y in a single step?',
            'KNEC 4-Mark Structured Question: Showing clear method steps.',
            [
              'Step 1: Line up both equations so x is over x, y is over y, and totals are aligned.',
              'Step 2: Check the y terms: if one is +y and the other is -y, their signs are opposites.',
              'Step 3: Add both equations together! (+y + -y = 0), leaving only x to solve effortlessly.',
              'Step 4: Once you know x, plug it back into either bag to find y!'
            ],
            'Given: 2x + y = 7 and x - y = 2\nAdd both equations:\n  (2x + x) + (y - y) = 7 + 2\n  3x + 0 = 9\n  x = 3!\nThen plug x=3 into Bag 1: 2(3) + y = 7 → 6 + y = 7 → y = 1!'
          )
        ]
      }
    ]
  },

  // GRADE 9 MATHEMATICS
  {
    curriculum: 'CBC',
    grade: 9,
    subject: 'Mathematics',
    code: 'MATH-G9',
    trackPathway: 'Core',
    title: 'CBE Grade 9 (Junior School Capstone) Mathematics Metro Line',
    stations: [
      {
        id: 'cbc_g9_math_s1',
        number: 1,
        title: '1.0 Numbers: Indices, Logarithms & Compound Proportions',
        strand: 'Strand 1.0: Numbers',
        icon: '🔢',
        status: 'available',
        summary: 'Laws of indices, zero/negative/fractional powers, logarithmic operations, and rates of work.',
        subtopics: [
          stop('cbc_g9_math_s1_1', '1.1 Laws of Indices & Scientific Notation', 'Powers and Exponential Compression', 'Multiplying powers with the same base adds exponents', 'When multiplying powers with the same base, add exponents: a^m × a^n = a^(m+n). Negative indices represent reciprocal division.', 'a^(-n) = 1 / a^n,  a^(m/n) = ⁿ√(a^m)', '📈 Exponential Growth Stepper', 'Cellular division in biology and astronomical distances measured from Kenya Space Agency.', 'Why is any non-zero number raised to the power of 0 always equal to 1?', 'KJSEA Paper 1: Simplifying compound index expressions with fractional powers.')
        ]
      },
      {
        id: 'cbc_g9_math_s2',
        number: 2,
        title: '2.0 Geometry & Trigonometry: SOH CAH TOA & Bearings',
        strand: 'Strand 2.0: Geometry and Measurements',
        icon: '📐',
        status: 'available',
        summary: 'Sine, Cosine, Tangent ratios, angles of elevation and depression, similarity, and frustums.',
        subtopics: [
          stop('cbc_g9_math_s2_1', '2.1 SOH CAH TOA & Elevation Angles', 'The Invariant Ratios of Right Triangles', 'Opposite, Adjacent, and Hypotenuse', 'For a given acute angle θ, the ratio of side lengths never changes. sinθ = Opp/Hyp, cosθ = Adj/Hyp, tanθ = Opp/Adj.', 'sinθ = O/H,  cosθ = A/H,  tanθ = O/A', '📐 Trig Ratio Reference Triangle', 'Estimating the height of telecommunication masts in Nairobi without climbing.', 'If the angle of elevation to the top of a tree from 20m away is 45°, what is the exact height of the tree?', 'KJSEA 4-Mark Word Problem: Identifying opposite vs. adjacent sides accurately from diagram.')
        ]
      },
      {
        id: 'cbc_g9_math_s3',
        number: 3,
        title: '3.0 Algebra: Matrices, Linear Graphs (y = mx + c) & Inequalities',
        strand: 'Strand 3.0: Algebra',
        icon: '📈',
        status: 'available',
        summary: 'Matrix order and operations, slope calculation (Δy/Δx), intercepts, and linear programming regions.',
        subtopics: [
          stop('cbc_g9_math_s3_1', '3.1 Finding Gradient (m) & Equations of Straight Lines', 'Steepness as a Rate of Change', 'Vertical rise divided by horizontal run', 'Gradient m = (y₂ - y₁) / (x₂ - x₁). Parallel lines have equal gradients (m₁ = m₂). Perpendicular lines satisfy m₁ × m₂ = -1.', 'y = mx + c  ⟹  m = Δy / Δx', '⛰️ Slope Gradient Triangle', 'Ramp gradients for disability access and vehicle fuel consumption curves.', 'How can you immediately tell if a line slopes upward from left to right just by looking at its equation?', 'KJSEA Graph Question: Finding the equation of a line passing through two given coordinates.')
        ]
      }
    ]
  },

  // GRADE 10 CORE MATHEMATICS (Exact Official KICD Table: 3 Strands, 11 Sub-strands)
  {
    curriculum: 'CBC',
    grade: 10,
    subject: 'Mathematics',
    code: 'MATH-G10',
    trackPathway: 'STEM',
    title: 'CBE Grade 10 (Senior STEM) Core Mathematics Metro Line',
    stations: [
      {
        id: 'cbc_g10_math_s1',
        number: 1,
        title: '1.0 Numbers and Algebra',
        strand: 'Strand 1.0: Numbers and Algebra',
        icon: '⚡',
        status: 'available',
        summary: 'Real numbers, surds and conjugate rationalisation, quadratic equations by completing the square, and algebraic inequalities.',
        subtopics: [
          stop('cbc_g10_math_s1_1', '1.1 Real Numbers & Surds: Rationalising Denominators with Conjugates', 'Clearing Radicals from Denominators', 'Difference of two squares eliminates the irrational root', 'To rationalise a/(√b + √c), multiply both numerator and denominator by the conjugate (√b - √c) so (√b)² - (√c)² = b - c.', 'c / (√a + √b) = c(√a - √b) / (a - b)', '🛡️ Conjugate Cancellation Shield', 'Electronics impedance calculations and exact surveyor distances.', 'Why does multiplying (√5 + √2) by (√5 - √2) result in a rational whole number without any roots?', 'KSSEA Section A: Rationalising quadratic surds to obtain a + b√c format.'),
          stop('cbc_g10_math_s1_2', '1.2 Quadratic Expressions & Equations by Completing the Square', 'Unlocking Any Parabola', 'Turning ax² + bx + c = 0 into (x + p)² = q', 'Dividing by a, moving c/a, and adding (b/2a)² completes the square. Taking square roots yields the universal quadratic formula.', 'x = (-b ± √(b² - 4ac)) / (2a)', '📐 Geometric Box Square Model', 'Projectile trajectory maximums and parabolic solar dish reflectors.', 'What does it tell you about the roots of an equation if the discriminant b² - 4ac is negative?', 'KSSEA Section B: Showing algebraic method marks for completing the square.'),
          stop('cbc_g10_math_s1_3', '1.3 Linear Inequalities, Quadratic Inequalities & Algebraic Fractions', 'Solution Sets & Critical Boundary Values', 'Multiplying or dividing an inequality by a negative number reverses the sign', 'Linear inequalities define half-planes on a coordinate grid. Quadratic inequalities (x - α)(x - β) < 0 are solved by finding critical roots α and β and testing sign intervals or sketching the parabola.', 'If a < b and c < 0  ⟹  ac > bc', '📊 Number Line Interval & Feasible Region', 'Optimizing land allocation between maize and beans under budget and labor constraints.', 'Why does the inequality sign flip when you divide both sides of -3x < 12 by -3?', 'KSSEA Paper 1: Finding integral values satisfying simultaneous linear inequalities.')
        ]
      },
      {
        id: 'cbc_g10_math_s2',
        number: 2,
        title: '2.0 Measurements and Geometry',
        strand: 'Strand 2.0: Measurements and Geometry',
        icon: '📐',
        status: 'available',
        summary: 'Similarity and enlargement (LSF, ASF, VSF), frustums, trigonometry (Sine/Cosine rules), polygons, 3D solids, vectors, and coordinate geometry.',
        subtopics: [
          stop('cbc_g10_math_s2_1', '2.1 Similarity, Enlargement & Volume of Frustums', 'Dimensional Scaling Laws', 'Length doubles, area quadruples, volume octuples', 'A frustum is a truncated cone or pyramid. Its volume is found by subtracting the small cut-off cone volume from the full original cone using Volume Scale Factor (VSF = LSF³).', 'ASF = (LSF)²,  VSF = (LSF)³', '🏺 Truncated Cone Frustum Geometry', 'Designing concrete buckets, water storage hoppers, and grain silos in Eldoret.', 'If a model water tank is built at 1:10 linear scale of a real tank, by what factor is its volume reduced?', 'KSSEA 10-Mark Multi-Part: Finding the surface area and volume of a frustum of a cone or pyramid.'),
          stop('cbc_g10_math_s2_2', '2.2 Trigonometry I: Sine Rule, Cosine Rule & Unit Circle', 'Solving Any Triangle in the Plane', 'Extending trigonometric ratios to obtuse angles and scalene triangles', 'The Sine Rule links sides to opposite angles: a/sinA = b/sinB = c/sinC = 2R. The Cosine Rule solves SAS and SSS triangles: a² = b² + c² - 2bc cosA.', 'a/sinA = b/sinB  |  a² = b² + c² - 2bc cosA', '🧭 Unit Circle CAST Quadrant Diagram', 'Triangulating distances between geothermal wellheads across the Rift Valley.', 'In a triangle where you know two sides and the included angle (SAS), why can you not use the Sine Rule directly in the first step?', 'KSSEA Paper 2: Solving bearings and triangulation problems using Sine and Cosine rules.'),
          stop('cbc_g10_math_s2_3', '2.3 Area of Triangles (½ab sinC & Heron\'s Formula), Polygons & Sectors', 'Generalized Surface Mensuration', 'Calculating exact area without needing a perpendicular height', 'For any triangle with two sides and an included angle, Area = ½ab sinC. Given all three sides a, b, c, Heron\'s formula uses semi-perimeter s = (a+b+c)/2.', 'Area = ½ab sinC = √[s(s-a)(s-b)(s-c)]', '🔺 Scalene Triangle & Sector Mensuration', 'Subdividing irregular agricultural land parcels in Kiambu County.', 'How can you find the area of a triangular shamba with sides 70m, 80m, and 90m when no angles are measured?', 'KSSEA Section B: Calculating area of intersecting circle segments and irregular polygons.'),
          stop('cbc_g10_math_s2_4', '2.4 Surface Area and Volume of Prisms, Pyramids, Cones & Spheres', '3D Solids & Composite Volumes', 'Curved surface area of a cone unrolls into a sector of radius l', 'A cone of base radius r, height h, and slant height l = √(r² + h²) has curved surface area πrl and volume ⅓πr²h. A sphere of radius r has surface area 4πr² and volume (4/3)πr³.', 'V_cone = ⅓πr²h,  SA_cone = πr² + πrl,  V_sphere = (4/3)πr³', '🌐 Sphere & Cone Net Decomposition', 'Designing cylindrical tank hemispherical domes and conical grain hoppers.', 'When a cone is cut along its slant height l and laid flat, what 2D geometric shape does its curved surface form?', 'KSSEA Paper 1: Equating volumes when a metallic sphere is melted and recast into cylindrical wires.'),
          stop('cbc_g10_math_s3_1', '2.5 Vectors I: Column Vectors, Magnitude & Collinearity', 'Displacement with Magnitude and Direction', 'Combining journeys in the Cartesian plane', 'Vectors have magnitude and direction. Column vectors [x, y] represent horizontal and vertical steps. Points A, B, C are collinear if AB = k·BC and they share common point B.', '|v| = √(x² + y²)  |  Collinear: AB = k·BC with shared point B', '🏹 Directed Vector Arrow & Ratio Theorem', 'Aviation flight paths into JKIA taking crosswind velocity vectors into account.', 'If vector a = [3, 4] and vector b = [-1, 2], what is the magnitude of vector a?', 'KSSEA Vectors: Proving collinearity of three points using scalar multiples and shared point.'),
          stop('cbc_g10_math_s2_6', '2.6 Coordinate Geometry: Parallel & Perpendicular Gradients', 'Algebraic Geometry of Straight Lines', 'Parallel lines share m₁ = m₂; Perpendicular lines satisfy m₁ × m₂ = -1', 'Given two points A(x₁, y₁) and B(x₂, y₂), midpoint M = ((x₁+x₂)/2, (y₁+y₂)/2), distance d = √((x₂-x₁)² + (y₂-y₁)²), and perpendicular bisector passes through M with gradient -1/m.', 'm₁ × m₂ = -1  |  y - y₁ = m(x - x₁)', '📈 Perpendicular Bisector Coordinate Grid', 'Civil engineering alignment of perpendicular access roads to a main highway.', 'If a road has gradient 2/3, what is the gradient of a service lane that intersects it at a right angle (90°)?', 'KSSEA Section A: Finding the equation of the perpendicular bisector of a line segment in ax + by = c form.')
        ]
      },
      {
        id: 'cbc_g10_math_s3',
        number: 3,
        title: '3.0 Statistics and Probability',
        strand: 'Strand 3.0: Statistics and Probability',
        icon: '📊',
        status: 'available',
        summary: 'Grouped frequency distributions, assumed mean, cumulative frequency ogives, quartiles, and probability tree diagrams.',
        subtopics: [
          stop('cbc_g10_math_s3_2', '3.1 Grouped Data: Assumed Mean, Ogives, Median & Quartiles', 'Summarizing Large Continuous Datasets', 'Cumulative frequency curves unlock median (Q₂) and interquartile spread (Q₃ - Q₁)', 'For grouped continuous data, class midpoints x estimate the mean (x̄ = Σfx / Σf or via Assumed Mean A + Σfd / Σf). Median and quartiles are interpolated by formula or read from an S-shaped cumulative frequency curve (ogive) plotted against upper class boundaries.', 'Median = L + [(n/2 - cf_b) ÷ f_m] × i  |  IQR = Q₃ - Q₁', '📈 Cumulative Frequency Ogive & Histogram', 'Analyzing rainfall distribution across Kenyan meteorological stations and national exam score percentiles.', 'Why must a cumulative frequency curve (ogive) be plotted using upper class boundaries rather than class midpoints?', 'KSSEA Section B: Computing mean using an assumed working mean and estimating median and semi-interquartile range.'),
          stop('cbc_g10_math_s3_3', '3.2 Probability Space, Mutually Exclusive & Independent Events', 'Quantifying Uncertainty & Tree Diagrams', 'OR adds mutually exclusive paths; AND multiplies independent branches', 'For mutually exclusive events, P(A or B) = P(A) + P(B). For independent events, P(A and B) = P(A) × P(B). Tree diagrams visually map sequential conditional probabilities with and without replacement.', 'P(A ∪ B) = P(A) + P(B)  |  P(A ∩ B) = P(A) × P(B)', '🌳 Two-Stage Probability Tree Diagram', 'Quality assurance sampling of tea packets and seed germination rates.', 'When drawing two marbles from a bag without replacement, why do the denominators on the second set of tree branches decrease by 1?', 'KSSEA Paper 2: Constructing probability tree diagrams for sampling without replacement and calculating "at least one" probabilities.')
        ]
      }
    ]
  },

  // GRADE 11 MATHEMATICS
  {
    curriculum: 'CBC',
    grade: 11,
    subject: 'Mathematics',
    code: 'MATH-G11',
    trackPathway: 'STEM',
    title: 'CBE Grade 11 (Senior STEM) Mathematics Metro Line',
    stations: [
      {
        id: 'cbc_g11_math_s1',
        number: 1,
        title: '1.0 Sequences & Series: AP & GP',
        strand: 'Strand 1.0: Numbers and Algebra',
        icon: '🔢',
        status: 'available',
        summary: 'Arithmetic Progressions, Geometric Progressions, sum to infinity, binomial expansion, and financial annuities.',
        subtopics: [
          stop('cbc_g11_math_s1_1', '1.1 Arithmetic Progressions (nth Term & Sum)', 'Constant Additive Step', 'Gauss pairing pairs first and last terms', 'In an AP, every term increases by a common difference d. The nth term is a + (n-1)d. The sum of n terms is (n/2)(2a + (n-1)d).', 'T_n = a + (n-1)d,  S_n = (n/2)[2a + (n-1)d]', '🪜 Stepping Ladder Arithmetic Staircase', 'Depreciation schedules and installment debt paydown.', 'In an AP where the first term is 5 and the 10th term is 41, what is the common difference?', 'KSSEA Section B: Solving simultaneous equations to find a and d from two given terms.'),
          stop('cbc_g11_math_s1_2', '1.2 Geometric Progressions & Sum to Infinity', 'Multiplicative Compounding & Convergence', 'When |r| < 1, the infinite sum converges to a finite bound', 'Each term multiplies by common ratio r. If |r| < 1, higher powers diminish to zero, allowing an infinite series to sum to a/(1 - r).', 'T_n = ar^(n-1),  S_∞ = a / (1 - r)  (|r| < 1)', '🌀 Bouncing Ball Dampening Curve', 'Total distance traveled by a bouncing ball before coming to rest.', 'Why does the series 1 + 2 + 4 + 8... have no sum to infinity, while 1 + 1/2 + 1/4 + 1/8... sums to 2?', 'KSSEA Structured Question: Calculating recurring decimal fractions using sum to infinity.')
        ]
      },
      {
        id: 'cbc_g11_math_s2',
        number: 2,
        title: '2.0 Circle Theorems & Geometric Proof',
        strand: 'Strand 2.0: Geometry and Trigonometry',
        icon: '⭕',
        status: 'available',
        summary: 'Angle at centre is twice angle at circumference, cyclic quadrilaterals, tangents, and alternate segments.',
        subtopics: [
          stop('cbc_g11_math_s2_1', '2.1 Subtended Angles & Cyclic Quadrilaterals', 'Geometric Invariants Inside the Circle', 'Angles subtended by the same chord are equal', 'The angle subtended by an arc at the centre is twice the angle subtended at the circumference. Opposite angles of a cyclic quad sum to 180°.', 'Angle_centre = 2 × Angle_circumference', '🎯 Inscribed Angle Theorem Ring', 'Circular harbor navigation and structural dome construction.', 'If a diameter subtends an angle at the circumference, why must that angle always be exactly 90°?', 'KSSEA 8-Mark Proof: Stating precise geometric reasons (e.g. [A1] for "angles in the same segment are equal").')
        ]
      },
      {
        id: 'cbc_g11_math_s3',
        number: 3,
        title: '3.0 Differential Calculus: dy/dx & Turning Points',
        strand: 'Strand 3.0: Calculus',
        icon: '📉',
        status: 'available',
        summary: 'First principles, power rule d/dx(ax^n) = nax^(n-1), tangents, normals, and optimization.',
        subtopics: [
          stop('cbc_g11_math_s3_1', '3.1 Gradient of Curves & Finding Maxima/Minima', 'Instantaneous Rate of Change', 'Shrinking the secant line into an exact tangent', 'Calculus finds the exact slope of a curve at a single point. At turning points (maxima/minima), the tangent is horizontal: dy/dx = 0.', 'd/dx(ax^n) = n·a·x^(n-1),  dy/dx = 0 ⟹ Turning Point', '⛰️ Rollercoaster Peak & Tangent Line', 'Maximizing farm profit per acre and minimizing sheet metal needed for a cylindrical can.', 'Why does setting dy/dx = 0 find both the peak of a hill and the bottom of a valley?', 'KSSEA Section B: Differentiating a cubic polynomial and testing d²y/dx² to classify stationary points.')
        ]
      }
    ]
  },

  // GRADE 12 MATHEMATICS
  {
    curriculum: 'CBC',
    grade: 12,
    subject: 'Mathematics',
    code: 'MATH-G12',
    trackPathway: 'STEM',
    title: 'CBE Grade 12 (Senior STEM KSSEA) Mathematics Metro Line',
    stations: [
      {
        id: 'cbc_g12_math_s1',
        number: 1,
        title: '1.0 Integral Calculus & Area Under Curves',
        strand: 'Strand 1.0: Integral Calculus',
        icon: '∫',
        status: 'available',
        summary: 'Indefinite integrals, constant of integration c, definite integration, trapezoidal rule, and bounded areas.',
        subtopics: [
          stop('cbc_g12_math_s1_1', '1.1 Definite Integrals & Bounded Area Between Curves', 'Accumulating Infinite Thin Strips', 'Integration is the inverse of differentiation', 'To integrate ax^n, increase the power by 1 and divide by the new power. Definite integrals evaluate [F(x)] from a to b: F(b) - F(a), yielding exact area bounded by a curve.', '∫ x^n dx = x^(n+1)/(n+1) + c,  Area = ∫_a^b y dx', '📐 Riemann Strip Area Accumulation', 'Calculating water volume discharged through a dam spillway with varying flow rate.', 'Why must we include an arbitrary constant +c in an indefinite integral, and why does it cancel out in a definite integral?', 'KSSEA Section B: Finding exact area enclosed between a parabola and a straight line.')
        ]
      },
      {
        id: 'cbc_g12_math_s2',
        number: 2,
        title: '2.0 Kinematics: Calculus of Motion',
        strand: 'Strand 2.0: Applied Calculus',
        icon: '🚀',
        status: 'available',
        summary: 'Displacement s(t), velocity v(t) = ds/dt, and acceleration a(t) = dv/dt.',
        subtopics: [
          stop('cbc_g12_math_s2_1', '2.1 Connecting Displacement, Velocity & Acceleration', 'The Differential Chain of Motion', 'Differentiate down, integrate back up', 'Differentiating displacement gives velocity. Differentiating velocity gives acceleration. Integrating acceleration with initial conditions restores velocity and displacement.', 'v = ds/dt,  a = dv/dt = d²s/dt²,  s = ∫ v dt', '🏎️ Speedometer Acceleration Curve', 'Autonomous braking systems and Standard Gauge Railway (SGR) train scheduling.', 'When a particle is momentarily at rest, what is its velocity, and does that mean its acceleration is zero?', 'KSSEA 10-Mark Kinematics: Finding total distance traveled when a particle reverses direction.')
        ]
      },
      {
        id: 'cbc_g12_math_s3',
        number: 3,
        title: '3.0 Earth as a Sphere: Navigation & Great Circles',
        strand: 'Strand 3.0: Advanced Geometry',
        icon: '🌍',
        status: 'available',
        summary: 'Latitudes, longitudes, nautical miles, great circles, and local solar time differences.',
        subtopics: [
          stop('cbc_g12_math_s3_1', '3.1 Calculating Nautical Distances & Flight Paths', 'Navigating on a Curved Planet', '1 minute of latitude arc equals exactly 1 nautical mile (nm)', 'Along a meridian or equator, distance = 60 × α nm. Along a parallel of latitude θ, the radius shrinks: distance = 60 × α × cosθ nm. 1° longitude = 4 minutes of time.', 'd_great = 60α nm,  d_parallel = 60α cosθ nm', '🌐 Spherical Earth Meridian Grid', 'Flight routes from JKIA Nairobi to London across curved global geodesics.', 'Why is the shortest flight path between two distant cities rarely a straight horizontal line on a flat paper map?', 'KSSEA Section B: Calculating speed in knots (nautical miles per hour) and arrival time across time zones.')
        ]
      }
    ]
  }
];

module.exports = CBC_MATH_MAPS;
