'use strict';
// CBC SENIOR SCHOOL ESSENTIAL MATHEMATICS, GRADE 12
// Three strands and ten sub-strands, following the KICD Essential Mathematics
// Grade 12 design (see docs/audits/kicd_verified_from_site.md). Plain text only.

function P(id, title, o) {
  return {
    id,
    title,
    status: 'available',
    conceptPrimer: {
      title: o.pt,
      tagline: o.tag,
      body: o.body,
      formula: o.f || null,
      visualBadge: o.vis,
      realWorldContext: o.ctx,
      explanationSteps: o.steps.map((s, i) => `Step ${i + 1}: ${s}`),
      workedExample: o.ex.join('\n')
    },
    socraticPrompt: o.q,
    formulaBadge: o.f || null,
    examFocus: o.exam
  };
}

const S1 = [];
const S2 = [];
const S3 = [];

// ---------------- STRAND 1: NUMBERS AND ALGEBRA ----------------
S1.push(P('cbc_g12_ess_s1_1', '1.1 Sets', {
  pt: 'Sets, Venn Diagrams and Counting Groups',
  tag: 'Count every person once: add the groups, then take away what was counted twice',
  body: 'A set is a collection of distinct objects, written inside curly brackets. The universal set is everything under discussion. n(A) means the number of elements in set A. The union of A and B is everything in A or B or both. The intersection is only what is in both. The complement of A is everything in the universal set that is not in A. A Venn diagram draws each set as a closed shape inside a rectangle for the universal set, and each region of the picture is one distinct group of elements. People in the overlap are counted once inside n(A) and once inside n(B), so adding n(A) and n(B) counts them twice. That is why n(A union B) = n(A) + n(B) - n(A intersection B). With three sets the same reasoning adds one more correction at the centre.',
  f: 'n(A U B) = n(A) + n(B) - n(A n B)  |  n(A U B U C) = n(A) + n(B) + n(C) - n(A n B) - n(B n C) - n(A n C) + n(A n B n C)',
  vis: 'Two or three overlapping circles in a rectangle, with the overlap filled first',
  ctx: 'A market association has 50 traders. Some accept M-Pesa, some accept cash, some both, and a few neither. Adding the M-Pesa total to the cash total would count the traders who accept both twice.',
  q: 'If 30 learners play football and 20 play volleyball and 8 play both, how many play at least one game, and why is the answer not 50?',
  exam: 'Drawing a Venn diagram from given totals, working from the overlap outward, and finding the number in only one set, in both, or in neither.',
  steps: [
    'Draw a rectangle for the universal set and an overlapping circle for each set, because every combination of memberships needs its own region.',
    'Fill the overlap region first from the given information, because the other regions are found by subtracting from it. If the overlap is not given, use n(A U B) = n(A) + n(B) - n(A n B) to find it.',
    'Fill each "only" region by subtracting the overlap from that set total, because the set total includes the overlap.',
    'Write the number in neither set outside the circles, found as the universal total minus the number in the union, because everything outside the circles belongs to no set.',
    'Add every region, including the outside, and check the sum equals the universal total, because a Venn diagram must account for every element exactly once.'
  ],
  ex: [
    'Problem: Of 50 traders, 32 accept M-Pesa (M), 27 accept cash (C) and 6 accept neither. Find how many accept both, and how many accept M-Pesa only.',
    'In the union: 50 - 6 = 44 traders accept at least one method.',
    'Use the formula: 44 = 32 + 27 - n(M n C), so n(M n C) = 59 - 44 = 15.',
    'M-Pesa only: 32 - 15 = 17. Cash only: 27 - 15 = 12.',
    'Check: 17 + 15 + 12 + 6 = 50, which is the universal total.',
    'Answer: 15 traders accept both and 17 accept M-Pesa only.',
    'Common mistake: writing 32 in the M-Pesa-only region. The 32 already includes the 15 who accept both, so only 17 belong in that region alone.'
  ]
}));

S1.push(P('cbc_g12_ess_s1_2', '1.2 Compound Proportions, Rates of Work and Mixtures', {
  pt: 'Compound Proportion, Rates of Work and Mixtures',
  tag: 'Change one quantity at a time, and treat work as a rate per hour or per day',
  body: 'Two quantities are in direct proportion when doubling one doubles the other, and in inverse proportion when doubling one halves the other. A compound proportion involves three or more quantities, for example workers, days and the amount of work. Handle it by changing one quantity at a time and asking each time whether the answer rises or falls. A rate of work is the fraction of a job done in one unit of time. If a tap fills a tank in 6 hours, its rate is 1/6 of the tank per hour. Rates of workers or taps working together add, and a drain or a worker undoing work has a negative rate. The time taken together is 1 divided by the combined rate. A mixture combines items of different prices or strengths. The mean price of the mixture is the total cost divided by the total quantity, never the plain average of the two prices unless the quantities are equal.',
  f: 'Rate = job / time  |  Combined rate = sum of rates  |  Mean price = total cost / total quantity',
  vis: 'A tank with two taps in and one drain out, and a pile of two grades of flour being blended',
  ctx: 'A contractor builds a perimeter wall with a gang of workers, a water tank fills from two taps while a leak drains it, and Mama Mboga blends two grades of maize flour into one price.',
  q: 'If 12 workers build a wall in 10 days, will 8 workers take more or fewer days, and by what factor?',
  exam: 'Compound proportion with workers, days and size of job; combined rates including a drain; and the selling price of a mixture with a stated profit.',
  steps: [
    'For compound proportion, write down the starting situation and the new situation, because the answer is the starting value multiplied by one factor per changed quantity.',
    'For each changed quantity, decide if the answer rises or falls and use a factor greater or less than 1 accordingly, because more work needs more time but more workers need less.',
    'For rates of work, write each rate as a fraction of the job per unit time, with filling or working as positive and draining or undoing as negative, because rates combine by addition only when they use the same time unit.',
    'Add the rates, then take the reciprocal of the sum to find the time for the whole job, because time = job divided by rate.',
    'For mixtures, find the cost of each part as quantity times price, add the costs and divide by the total quantity, because the mean price must reflect how much of each grade is present.',
    'For a stated profit, multiply the cost price by (1 + the profit fraction), because the selling price is cost plus the profit on cost.'
  ],
  ex: [
    'Problem 1: 12 workers build 30 m of wall in 10 days. How many days will 8 workers take to build 45 m?',
    'Fewer workers means more days: factor 12/8. More wall means more days: factor 45/30.',
    'Days = 10 x 12/8 x 45/30 = 10 x 1.5 x 1.5 = 22.5 days.',
    'Problem 2: Tap A fills a tank in 6 hours, tap B in 4 hours, and a leak empties a full tank in 12 hours. With all three on, how long to fill the empty tank?',
    'Rates per hour: 1/6 + 1/4 - 1/12 = 2/12 + 3/12 - 1/12 = 4/12 = 1/3 of the tank per hour.',
    'Time = 1 / (1/3) = 3 hours.',
    'Problem 3: Mama Mboga mixes 20 kg of flour at Sh 80 per kg with 30 kg at Sh 105 per kg and wants a 20% profit. Find the selling price per kg.',
    'Total cost = 20 x 80 + 30 x 105 = 1600 + 3150 = Sh 4750. Total quantity = 50 kg.',
    'Mean cost = 4750 / 50 = Sh 95 per kg. Selling price = 95 x 1.20 = Sh 114 per kg.',
    'Common mistake: averaging the prices to get (80 + 105) / 2 = Sh 92.50. The quantities are not equal, so the dearer flour has more weight and the true mean is Sh 95.'
  ]
}));

S1.push(P('cbc_g12_ess_s1_3', '1.3 Linear Inequalities', {
  pt: 'Solving and Graphing Linear Inequalities',
  tag: 'Solve like an equation, but turn the sign round when you multiply or divide by a negative',
  body: 'An inequality compares two expressions using < (less than), > (greater than), <= (less than or equal) or >= (greater than or equal). Unlike an equation, which has one answer, an inequality usually has a whole range of answers. A linear inequality has the unknown to the power 1 only. To solve it, do the same thing to both sides, exactly as with an equation, with one exception: multiplying or dividing both sides by a negative number reverses the sign. This is because negating numbers flips their order on the number line: 2 < 5 but -2 > -5. On a number line an open circle marks a boundary that is not included (< or >) and a closed circle marks one that is included (<= or >=). With two unknowns, x and y, the boundary line such as x + y = 6 splits the plane into two half-planes. Test one point, usually (0, 0), to decide which side satisfies the inequality. A broken line shows the boundary is not included and a solid line shows it is.',
  f: 'Multiply or divide by a negative: reverse the sign  |  Compound: a < expression <= b',
  vis: 'A number line with open and closed circles, and a shaded half-plane beside a boundary line',
  ctx: 'A matatu is licensed for at most 14 passengers, a SACCO requires a balance of at least Sh 5,000, and a trader must keep daily M-Pesa withdrawals below a set limit. Each rule is an inequality.',
  q: 'You know 2 is less than 5. What happens to the order if you multiply both numbers by -1, and what does that tell you about solving -2x < 6?',
  exam: 'Solving a linear or compound inequality, listing integer solutions in a range, and showing the solution on a number line or as a region.',
  steps: [
    'Expand brackets and collect the terms in x on one side and numbers on the other, because that is the same method as for equations.',
    'Add or subtract the same amount on both sides; the sign does not change, because order is preserved when the same number is added.',
    'Divide or multiply to leave x on its own. If the number is negative, reverse the sign, because negating flips the order of numbers.',
    'For a compound inequality such as a < expression <= b, do each step to all three parts at once, because both inequalities must stay true together.',
    'Show the answer on a number line with an open circle for < or > and a closed circle for <= or >=, because the circle states whether the boundary value is allowed.',
    'For two unknowns, draw the boundary line, test (0, 0) in the inequality, and shade the side where it is true, because every point on one side gives the same true or false answer.'
  ],
  ex: [
    'Problem 1: Solve 5 - 2x < 11 and show it on a number line.',
    'Subtract 5 from both sides: -2x < 6.',
    'Divide both sides by -2 and reverse the sign: x > -3.',
    'Check with x = 0: 5 - 0 = 5 < 11, which is true. Check with x = -4: 5 + 8 = 13 < 11 is false, so x = -4 is correctly excluded.',
    'Number line: open circle at -3, shading to the right.',
    'Problem 2: List the integers satisfying -4 < 2x - 2 <= 6.',
    'Add 2 to all three parts: -2 < 2x <= 8. Divide all parts by 2: -1 < x <= 4.',
    'Integers: 0, 1, 2, 3, 4. The value -1 is excluded because the sign is strict, and 4 is included because of <=.',
    'Problem 3: Does (2, 3) satisfy x + y <= 6? 2 + 3 = 5, and 5 <= 6 is true, so (2, 3) lies in the shaded region.',
    'Common mistake: dividing by -2 and keeping the sign as <, giving x < -3. The test with x = 0 shows that answer is wrong.'
  ]
}));

S1.push(P('cbc_g12_ess_s1_4', '1.4 Linear Programming', {
  pt: 'Linear Programming: Best Profit Under Limits',
  tag: 'Turn limits into inequalities, shade the allowed region, and test its corners',
  body: 'Linear programming finds the best value, usually the largest profit or the smallest cost, of a quantity when there are limits on what can be done. The quantity to be made as large or small as possible is the objective function, such as profit P = 300x + 500y. The limits, such as hours of labour or units of wood, are constraints, each written as a linear inequality. Together the constraints define the feasible region, the set of all points (x, y) that obey every limit at once. A key fact is that the best value of a linear objective always occurs at a corner (vertex) of the feasible region, because moving across the region the objective changes steadily and so cannot peak in the middle. So find all the corners, calculate the objective at each, and pick the best.',
  f: 'Objective: P = ax + by  |  Constraints: linear inequalities  |  Optimum at a vertex of the feasible region',
  vis: 'A shaded polygon on a grid with its corner points labelled and a profit line sliding outward',
  ctx: 'A carpenter in Gikomba makes chairs and tables from limited wood and limited hours. A Mama Mboga with limited capital decides how many kg of tomatoes and onions to stock for the best profit.',
  q: 'If a chair takes 1 hour and a table takes 2 hours and you have 16 hours, can you make 10 tables, and how do you write that limit as an inequality?',
  exam: 'Forming inequalities from a word problem, drawing the feasible region, finding vertices (including by simultaneous equations) and choosing the optimum.',
  steps: [
    'Define x and y as the quantities to decide, because every inequality and the profit are written in them.',
    'Write each limit as a linear inequality and add x >= 0 and y >= 0, because you cannot make a negative number of items.',
    'Draw each boundary line by finding two points on it, test (0, 0) to decide the side, and shade the unwanted side so the feasible region stays clear, because only points obeying all limits are allowed.',
    'Read off the vertices of the region; where two boundary lines meet, solve them as simultaneous equations, because their intersection is that vertex.',
    'Write the objective function and evaluate it at every vertex, because the optimum is always at a vertex.',
    'Choose the largest (or smallest) value and state the answer in context with units, because the question asks for a decision, not just a number.'
  ],
  ex: [
    'Problem: A carpenter makes x chairs and y tables. Labour: each chair takes 1 hour and each table 2 hours, with 16 hours available. Wood: each chair uses 3 units and each table 2 units, with 24 units available. Profit is Sh 300 per chair and Sh 500 per table. Find the best plan.',
    'Constraints: x + 2y <= 16, 3x + 2y <= 24, x >= 0, y >= 0.',
    'Vertices: (0, 0); on the x-axis 3x = 24 gives (8, 0); on the y-axis 2y = 16 gives (0, 8).',
    'Intersection of x + 2y = 16 and 3x + 2y = 24: subtract to get 2x = 8, so x = 4; then 4 + 2y = 16 gives y = 6. Vertex (4, 6).',
    'Check (4, 6): 4 + 12 = 16 and 12 + 12 = 24, both limits met exactly.',
    'Check the other corners are feasible: (8, 0) gives 8 <= 16 and 24 <= 24; (0, 8) gives 16 <= 16 and 16 <= 24.',
    'Profit P = 300x + 500y: at (0, 0) it is 0; at (8, 0) it is 2400; at (0, 8) it is 4000; at (4, 6) it is 1200 + 3000 = 4200.',
    'Answer: make 4 chairs and 6 tables for a maximum profit of Sh 4,200.',
    'Common mistake: testing only the easy corners on the axes and missing the intersection vertex, which here is the best one.'
  ]
}));

// ---------------- STRAND 2: MEASUREMENTS AND GEOMETRY ----------------
S2.push(P('cbc_g12_ess_s2_1', '2.1 Area Approximations', {
  pt: 'Estimating the Area of Irregular Shapes',
  tag: 'Cut the shape into thin strips, then add up trapeziums or rectangles',
  body: 'A formula such as length times width only works for regular shapes. A farm bordered by a river or a winding road has a curved edge, so we approximate. Draw a base line, mark equally spaced points along it, and measure the perpendicular distance from the base line to the curved edge at each point. These distances are called ordinates (or offsets), and the gap between them is the strip width h. The trapezium rule treats each strip as a trapezium: area = h/2 x [first + last + 2 x (all the middle ordinates)]. The middle ordinates are counted twice because each is shared by two neighbouring strips. The mid-ordinate rule measures the ordinate at the middle of each strip and treats the strip as a rectangle: area = h x (sum of mid-ordinates). More, thinner strips give a better approximation. Counting squares on a grid is a third method, counting whole squares and halves of part squares.',
  f: 'Trapezium rule: A = (h/2)[y0 + yn + 2(y1 + y2 + ... + y(n-1))]  |  Mid-ordinate rule: A = h(m1 + m2 + ... + mn)',
  vis: 'A plot with a curved river edge cut into vertical strips with ordinates marked',
  ctx: 'A farmer at Naivasha wants the area of a maize plot with a curved river boundary to estimate seed and fertiliser, and KRA or the county surveyor needs an area for rates.',
  q: 'If a strip is 5 m wide, 4 m tall on the left and 7 m tall on the right, what shape is it and how would you find its area?',
  exam: 'Applying the trapezium rule or the mid-ordinate rule from a table or diagram, and stating the strip width and number of strips used.',
  steps: [
    'Measure the base length and divide it into equal strips of width h, because both rules need equal widths.',
    'Record the ordinates at the strip boundaries for the trapezium rule, or at the strip middles for the mid-ordinate rule, because each rule uses a different set of heights.',
    'For the trapezium rule, add the first and last ordinates, add double the sum of the middle ones, and multiply by h/2, because each middle ordinate belongs to two trapeziums.',
    'For the mid-ordinate rule, add the mid-ordinates and multiply by h, because each strip is treated as a rectangle of width h.',
    'State the answer in square units with an honest note that it is an estimate, because the true edge is curved.'
  ],
  ex: [
    'Problem: A plot has ordinates 4, 7, 9, 8, 6, 3 metres at equal intervals of 5 m along a base line, giving 5 strips. Find its approximate area by the trapezium rule. Mid-ordinates measured in the 5 strips are 5.5, 8.2, 8.8, 7.1, 4.6 m; use the mid-ordinate rule too.',
    'Trapezium rule: h = 5, first + last = 4 + 3 = 7, middle ordinates 7 + 9 + 8 + 6 = 30, doubled 60.',
    'A = (5/2)(7 + 60) = 2.5 x 67 = 167.5 square metres.',
    'Mid-ordinate rule: sum = 5.5 + 8.2 + 8.8 + 7.1 + 4.6 = 34.2 m.',
    'A = 5 x 34.2 = 171 square metres.',
    'The two estimates, 167.5 and 171 square metres, agree to within about 2%, which is reasonable. The plot is about 170 square metres.',
    'Common mistake: doubling the first and last ordinates too, or forgetting to double the middle ones. Only the ones shared by two strips are doubled.'
  ]
}));

S2.push(P('cbc_g12_ess_s2_2', '2.2 Vectors', {
  pt: 'Vectors: Displacement, Magnitude and Dividing a Line',
  tag: 'A vector is a move with a size and a direction, written as a column of changes',
  body: 'A scalar is a quantity with size only, such as 10 km. A vector has size and direction, such as 10 km north-east. We write a vector in the plane as a column (x over y), meaning x units across and y units up. The vector from A to B is AB = B - A, the coordinates of B minus those of A. The magnitude (length) of a vector with components x and y is found with Pythagoras: sqrt(x squared + y squared). Adding vectors adds the matching components, which is the same as making one move after the other. Multiplying by a number k scales the length by k, and two vectors are parallel if one is a multiple of the other. If A, B and C lie on one straight line they are collinear, and AB is parallel to AC. A point P dividing AB in the ratio m:n (AP:PB) has position vector A + (m/(m+n)) AB, and the midpoint is the case m:n = 1:1.',
  f: 'AB = B - A  |  |(x, y)| = sqrt(x^2 + y^2)  |  P = A + (m/(m+n)) AB',
  vis: 'Two points on a grid joined by an arrow, with the column of changes written beside it',
  ctx: 'A boda boda rider goes 8 km east and 6 km north of the stage. The displacement is a vector, and the straight-line distance home is its magnitude, not the 14 km actually ridden.',
  q: 'If you walk 8 steps east and then 6 steps north, how far are you from the start in a straight line, and is it 14 steps?',
  exam: 'Finding AB from coordinates, its magnitude, a point dividing a line in a given ratio, and proving three points are collinear.',
  steps: [
    'Write each point as a column of its coordinates, because vector operations are done component by component.',
    'Find AB by subtracting the starting point from the end point (B minus A), because that gives the change from A to B.',
    'Find the magnitude with Pythagoras: square the components, add and take the square root, because the components form the two perpendicular sides of a right-angled triangle.',
    'To divide AB in the ratio m:n, find the fraction m/(m+n) of the vector AB and add it to A, because P is that fraction of the way along.',
    'To test collinearity, find AB and AC and check one is a multiple of the other, because parallel vectors sharing the point A lie on one line.'
  ],
  ex: [
    'Problem: A is (1, 2) and B is (9, 8). Find AB, its magnitude, the point P with AP:PB = 1:3, and whether D (5, 5) lies on AB.',
    'AB = (9 - 1, 8 - 2) = (8, 6).',
    'Magnitude = sqrt(8^2 + 6^2) = sqrt(64 + 36) = sqrt(100) = 10 units.',
    'P: the fraction is 1/(1 + 3) = 1/4. (1/4)(8, 6) = (2, 1.5). P = (1, 2) + (2, 1.5) = (3, 3.5).',
    'Check: AP = (2, 1.5) with length 2.5, which is a quarter of 10, and PB = (6, 4.5) with length 7.5, three quarters of 10. The ratio 1:3 holds.',
    'Collinearity: AD = (5 - 1, 5 - 2) = (4, 3) = (1/2)(8, 6) = (1/2)AB. So AD is parallel to AB and D lies on AB, as its midpoint.',
    'Common mistake: finding AB as A minus B, which gives (-8, -6), the vector for the journey in the opposite direction. The end point always comes first in the subtraction.'
  ]
}));

S2.push(P('cbc_g12_ess_s2_3', '2.3 Navigations', {
  pt: 'Navigation: Bearings, Distance, Speed and Time',
  tag: 'Draw a north line at every point, measure clockwise, and solve the triangle',
  body: 'Navigation describes where something is going or where it is from. A bearing is the direction of travel measured as an angle clockwise from north, always written with three digits, for example 060 degrees or 096 degrees. Because it is measured from north at the point you are standing at, you draw a north line through every point of the journey. The back bearing, the bearing of the start as seen from the finish, differs by 180 degrees: add 180 if the bearing is under 180, subtract 180 otherwise. Journeys are broken into legs, and each leg with its distance forms a side of a triangle. If two legs meet at a right angle, use Pythagoras and tan; otherwise use the sine and cosine rules. Distance, speed and time are linked by distance = speed x time. At sea, distance is measured in nautical miles, where 1 nautical mile is 1.852 km and is the length of 1 minute of arc along a meridian. A knot is one nautical mile per hour.',
  f: 'distance = speed x time  |  back bearing = bearing +/- 180  |  1 nautical mile = 1.852 km',
  vis: 'A ship route with a north arrow at each turning point and angles measured clockwise',
  ctx: 'A ferry leaves Mombasa for Lamu, a ship leaves port and changes course, and a pilot needs the bearing to fly from Nairobi to Kisumu. A matatu route map can also be described by bearings.',
  q: 'If you walk north then turn to face east, through what angle did you turn, and what bearing are you now facing?',
  exam: 'Drawing a scale diagram of a journey with bearings, calculating the distance and bearing back to the start, and time taken at a given speed.',
  steps: [
    'Draw a north line at the start and mark the first leg at its bearing measured clockwise from north, because every bearing is from a north line.',
    'At the end of the leg draw a new north line and mark the next bearing from it, because bearings are measured at the point where you are.',
    'Find the interior angle at the turn using parallel north lines: the angle between the back bearing and the new bearing, because it is the angle inside the triangle of the route.',
    'Use Pythagoras if that angle is 90 degrees, otherwise the cosine or sine rule, to find the straight-line distance back to the start.',
    'Use a right-angle triangle to find the angle at the start, then add it to the first bearing, because the final bearing is measured clockwise from north.',
    'For time, divide distance by speed and convert hours to minutes by multiplying the decimal part by 60, because clock times use minutes.'
  ],
  ex: [
    'Problem: A boat leaves port A and sails 12 km on a bearing of 060 degrees to B, then 9 km on a bearing of 150 degrees to C. Find AC, the bearing of C from A, the bearing of A from C, and the time taken at 28 km/h for the whole route.',
    'Angle at B: the back bearing from B to A is 060 + 180 = 240 degrees. The new course is 150 degrees. Interior angle ABC = 240 - 150 = 90 degrees.',
    'AC = sqrt(12^2 + 9^2) = sqrt(144 + 81) = sqrt(225) = 15 km.',
    'Angle BAC: tan(BAC) = 9/12 = 0.75, so BAC = 36.87 degrees.',
    'Bearing of C from A = 060 + 36.87 = 096.9 degrees (1 decimal place), since C is further clockwise than B.',
    'Bearing of A from C = 096.9 + 180 = 276.9 degrees.',
    'Time for the route: total distance 12 + 9 = 21 km, time = 21 / 28 = 0.75 hours = 45 minutes.',
    'Common mistake: measuring a bearing from the east or measuring anticlockwise. A bearing is always clockwise from north, and the answer 276.9 is not 83.1.'
  ]
}));

S2.push(P('cbc_g12_ess_s2_4', '2.4 Commercial Arithmetic III', {
  pt: 'Compound Interest, Depreciation and Hire Purchase',
  tag: 'Each period the interest is worked out on the new balance, not the original amount',
  body: 'Simple interest is paid only on the original amount. Compound interest is paid on the original amount plus all the interest already earned, so the balance grows by the same factor each period. If the rate is r percent per period, the factor is 1 + r/100, and after n periods the amount is A = P(1 + r/100)^n. If the annual rate R is compounded several times a year, say k times, the rate per period is R/k and the number of periods is k times the years. Depreciation is the opposite: an asset such as a motorbike loses a fixed percentage of its current value each year, so the factor is 1 - r/100 and the value after n years is P(1 - r/100)^n. Hire purchase means taking goods now and paying a deposit plus equal instalments. The hire purchase price is the deposit plus all the instalments, and it is greater than the cash price. The difference is the cost of credit.',
  f: 'A = P(1 + r/100)^n  |  Depreciation: V = P(1 - r/100)^n  |  HP price = deposit + (instalment x number)',
  vis: 'A bar chart of a balance growing faster each year beside one of a motorbike value shrinking',
  ctx: 'A SACCO pays interest on deposits, a boda boda motorbike loses value each year, and a shop sells a sofa set on monthly instalments.',
  q: 'If Sh 100 grows by 10% each year, is it Sh 120 after two years, and why or why not?',
  exam: 'Compound interest with annual or quarterly compounding, depreciation, and comparing hire purchase with cash price.',
  steps: [
    'Identify the principal P, the rate per period and the number of periods, because the formula uses the rate per compounding period and not per year.',
    'Convert the rate if compounding is more than once a year: divide the annual rate by the number of periods per year and multiply the years by the same number, because interest is added at every period.',
    'Write the growth factor 1 + r/100 (or 1 - r/100 for depreciation) and raise it to the number of periods, because each period multiplies the balance by the same factor.',
    'Multiply by the principal and round to the nearest cent or shilling only at the end, because rounding early causes errors.',
    'For compound interest earned, subtract the principal from the final amount, because the amount includes the original deposit.',
    'For hire purchase, add the deposit to all the instalments, then subtract the cash price to get the extra paid for credit, because that is what borrowing costs.'
  ],
  ex: [
    'Problem 1: Sh 200,000 is deposited in a SACCO at 12% per year compounded quarterly for 2 years. Find the amount and the interest earned.',
    'Rate per quarter = 12/4 = 3%. Periods = 2 x 4 = 8. Factor 1.03.',
    'A = 200,000 x 1.03^8 = 200,000 x 1.26677 = Sh 253,354.02 (nearest cent).',
    'Interest = 253,354.02 - 200,000 = Sh 53,354.02.',
    'Problem 2: A motorbike bought for Sh 150,000 depreciates by 15% per year. Find its value after 3 years.',
    'Factor = 1 - 0.15 = 0.85. V = 150,000 x 0.85^3 = 150,000 x 0.614125 = Sh 92,118.75.',
    'Problem 3: A cooker has cash price Sh 60,000. On hire purchase the deposit is 20% and 12 monthly instalments of Sh 4,500 are paid. Find the extra cost of credit.',
    'Deposit = 0.20 x 60,000 = Sh 12,000. Instalments = 12 x 4,500 = Sh 54,000. HP price = 12,000 + 54,000 = Sh 66,000.',
    'Extra cost of credit = 66,000 - 60,000 = Sh 6,000.',
    'Common mistake: using 12% each quarter or 3% each year. The annual rate is divided by 4 for quarterly compounding and the periods are 8, not 2.'
  ]
}));

// ---------------- STRAND 3: STATISTICS AND PROBABILITY ----------------
S3.push(P('cbc_g12_ess_s3_1', '3.1 Statistics III', {
  pt: 'Grouped Data: Mean, Median, Mode and Spread',
  tag: 'Use the class mid-points as the best single value for each group',
  body: 'When there are many observations they are grouped into classes in a frequency table, and the individual values are lost. We estimate using the mid-point of each class, which is the average of its lower and upper limits. The mean is the sum of (frequency x mid-point) divided by the total frequency. The modal class is the class with the highest frequency. The median is the middle value, found by locating the class holding the (n/2)th observation using cumulative frequency and then moving a fraction of the way through that class: median = L + ((n/2 - F)/f) x w, where L is the lower class boundary, F the cumulative frequency before the class, f its frequency and w its width. Spread is measured by the variance, the mean of the squared distances from the mean, and the standard deviation, which is its square root and has the same units as the data. A small standard deviation means values cluster close to the mean.',
  f: 'Mean = sum(fx)/sum(f)  |  Median = L + ((n/2 - F)/f) x w  |  Variance = sum(fx^2)/n - mean^2  |  SD = sqrt(variance)',
  vis: 'A frequency table with mid-point and cumulative frequency columns beside a histogram',
  ctx: 'Mama Mboga records her daily income for 30 days in groups of Sh 1,000 to see her typical day and how much it varies, and a matatu sacco compares weekly takings across vehicles.',
  q: 'If a class is 30 to 39, what single number would you choose to stand for all the values in it, and why?',
  exam: 'Completing a frequency table, estimating the mean, median and modal class, and calculating the variance and standard deviation of grouped data.',
  steps: [
    'Add a mid-point column x, the average of the class limits, because each class is represented by one value.',
    'Add columns fx and fx squared, because the mean and the variance are built from them.',
    'Mean = total of fx divided by total frequency, because it is a weighted average where frequency is the weight.',
    'Add a cumulative frequency column, find the class containing the (n/2)th value, and use the median formula with class boundaries, because the median needs the exact lower boundary of that class.',
    'The modal class is the one with the largest frequency, because the mode is the most common value.',
    'Variance = total of fx squared divided by n, minus the mean squared; standard deviation is the square root, because the variance is in squared units and must be converted back.'
  ],
  ex: [
    'Problem: Mama Mboga\'s daily income over 30 days (in hundreds of shillings) is: 10-19: 3 days, 20-29: 7 days, 30-39: 11 days, 40-49: 6 days, 50-59: 3 days. Estimate the mean, median, modal class and standard deviation.',
    'Mid-points x: 14.5, 24.5, 34.5, 44.5, 54.5. n = 3 + 7 + 11 + 6 + 3 = 30.',
    'fx: 43.5, 171.5, 379.5, 267, 163.5. Total fx = 1025.',
    'Mean = 1025 / 30 = 34.17 (hundreds of shillings), about Sh 3,417 per day.',
    'Modal class: 30-39, the highest frequency (11).',
    'Median: n/2 = 15. Cumulative frequencies: 3, 10, 21, 27, 30. The 15th value is in class 30-39, with lower boundary L = 29.5, F = 10, f = 11, w = 10.',
    'Median = 29.5 + ((15 - 10)/11) x 10 = 29.5 + 4.545 = 34.05, about Sh 3,405.',
    'Variance: total of f x squared = 38,717.5. Variance = 38,717.5/30 - 34.1667^2 = 1290.58 - 1167.36 = 123.22.',
    'Standard deviation = sqrt(123.22) = 11.10, about Sh 1,110.',
    'Common mistake: using the class lower limit 30 or the width instead of the mid-point, and using the class limit 30 rather than boundary 29.5 in the median formula.'
  ]
}));

S3.push(P('cbc_g12_ess_s3_2', '3.2 Probability III', {
  pt: 'Tree Diagrams, Independent and Dependent Events',
  tag: 'Multiply along the branches, add across the outcomes you want',
  body: 'Probability is the chance of an event, a number from 0 (impossible) to 1 (certain), found as favourable outcomes over total equally likely outcomes. Two events are independent if one happening does not change the chance of the other, such as two tosses of a coin or picking with replacement. They are dependent if it does, as when an item is picked and not put back, so the numbers in the next draw change. A tree diagram lists every stage of an experiment as branches, with the probability on each branch. Multiply along a path to get the probability of that whole sequence (the AND rule). Add the probabilities of different paths that give the outcome you want (the OR rule). The total of all path probabilities must be 1. Conditional probability is the chance of one event given that another has already happened: P(A given B) = P(A and B) / P(B). It restricts the sample space to the cases where B occurs.',
  f: 'P(A and B) = P(A) x P(B | A)  |  P(A or B, exclusive) = P(A) + P(B)  |  P(A | B) = P(A and B)/P(B)',
  vis: 'A two-stage tree with probabilities on each branch and outcomes at the ends',
  ctx: 'A kiosk drawer has airtime scratch cards of two networks, a SACCO picks two members at random for a committee, and a bus company asks the chance both of two buses are late.',
  q: 'A bag has 6 red and 4 blue counters. After taking out one red and keeping it, how does the chance of a second red change, and why?',
  exam: 'Drawing a tree diagram with and without replacement, finding the probability of combined events and conditional probability.',
  steps: [
    'List the stages and draw a branch for each possible outcome at each stage, because the tree must cover every possibility.',
    'Write the probability on every branch. For a without-replacement draw, reduce both the favourable count and the total for the second stage, because the item taken is gone.',
    'Multiply along each path to get the probability of that sequence, because both stages must happen.',
    'Add the paths that satisfy the question, because separate paths are mutually exclusive ways of getting the result.',
    'For "at least one", subtract the probability of "none" from 1, because it is shorter than adding every path.',
    'For a conditional probability, divide the probability of the combined event by the probability of the given condition, because the sample space shrinks to the condition.'
  ],
  ex: [
    'Problem: A drawer holds 6 Safaricom and 4 Airtel scratch cards. Two are taken at random without replacement. Find P(both the same network), P(at least one Airtel), and P(both Airtel given they are the same network).',
    'First draw: P(S) = 6/10, P(A) = 4/10.',
    'Second draw after S: 5 S and 4 A left out of 9, so P(S) = 5/9. After A: 6 S and 3 A out of 9, so P(A) = 3/9.',
    'P(SS) = 6/10 x 5/9 = 30/90. P(AA) = 4/10 x 3/9 = 12/90.',
    'P(same network) = 30/90 + 12/90 = 42/90 = 7/15.',
    'P(at least one Airtel) = 1 - P(SS) = 1 - 30/90 = 60/90 = 2/3.',
    'P(AA given same network) = P(AA)/P(same) = (12/90)/(42/90) = 12/42 = 2/7.',
    'Common mistake: using 4/10 x 4/10 for two Airtel cards. That would be correct only with replacement. Without replacement the second probability is 3/9.'
  ]
}));

const MAP = {
  curriculum: 'CBC',
  grade: 12,
  subject: 'Essential Mathematics',
  code: 'ESS-G12',
  trackPathway: 'STEM',
  title: 'CBE Grade 12 (Senior School) Essential Mathematics Metro Line',
  description: 'Grade 12 Essential Mathematics with three strands and ten sub-strands, following the KICD Essential Mathematics Grade 12 design.',
  notes: 'Strand and sub-strand names follow the KICD Grade 12 Essential Mathematics design.',
  stations: [
    {
      id: 'cbc_g12_ess_s1',
      number: 1,
      title: '1.0 Numbers and Algebra',
      strand: 'Strand 1: Numbers and Algebra',
      status: 'available',
      summary: 'Sets, compound proportions, rates of work and mixtures, linear inequalities and linear programming.',
      subtopics: S1
    },
    {
      id: 'cbc_g12_ess_s2',
      number: 2,
      title: '2.0 Measurements and Geometry',
      strand: 'Strand 2: Measurements and Geometry',
      status: 'available',
      summary: 'Area approximations, vectors, navigations and commercial arithmetic.',
      subtopics: S2
    },
    {
      id: 'cbc_g12_ess_s3',
      number: 3,
      title: '3.0 Statistics and Probability',
      strand: 'Strand 3: Statistics and Probability',
      status: 'available',
      summary: 'Statistics of grouped data and probability with tree diagrams.',
      subtopics: S3
    }
  ]
};

module.exports = {
  maps: [MAP],
  retiredIds: []
};
