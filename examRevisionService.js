// LEGACY sample questions (13). The learner-facing exam experience now lives in examRoutes.js + exam_papers/.
// examRevisionService.js — Elingu Revision Studio & Examiner Mark-Scheme X-Ray Engine
// Dual-curriculum (Kenyan CBE KPSEA/KJSEA & Cambridge IGCSE 0580/0625)
// Provides past papers, topical drills, student working evaluation, and Examiner X-Ray mark schemes.

let revisionRepo = null;
try {
  revisionRepo = require('./db/repositories/revisionRepository');
} catch (e) {}

const REVISION_PAPERS = [
  // ── CAMBRIDGE LOWER SECONDARY CHECKPOINT (YEARS 7–9 / 0862) ────────
  {
    id: 'cie_checkpoint_y8_math_2025',
    curriculum: 'BRITISH',
    grade: 8,
    examBoard: 'CAIE',
    subject: 'Mathematics',
    paperCode: '0862/01',
    series: 'Elingu sample questions in the style of Cambridge Checkpoint',
    title: 'Cambridge Lower Secondary Checkpoint Mathematics Paper 1',
    durationMinutes: 60,
    totalMarks: 50,
    calculatorAllowed: false,
    questions: [
      {
        id: 'q_cie_chk_01',
        number: 1,
        topic: 'Prime Factors & Venn Diagrams',
        marks: 3,
        stem: 'Write 72 and 120 as products of their prime factors in index form.\n\nHence, find the Highest Common Factor (HCF) of 72 and 120.',
        formulaHint: '72 = 2³ × 3²; 120 = 2³ × 3 × 5. HCF takes the lowest power of common prime factors.',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Prime factorisation shown for both numbers (e.g. factor trees or ladder divisions)',
            requiredMatch: /2\^3\s*\*\s*3\^2|2\^3\s*\*\s*3\s*\*\s*5|2\s*\*\s*2\s*\*\s*2/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Both in index form: 72 = 2³ × 3² and 120 = 2³ × 3 × 5',
            requiredMatch: /2\^3|2³.*3\^2|3²/
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'HCF = 2³ × 3 = 8 × 3 = 24',
            requiredMatch: /24/
          }
        ],
        keywords: ['prime factors', 'index form', 'highest common factor', 'HCF'],
        examinerNotes: 'Note: The command word Hence means candidates must use the prime factor results from part (a) to find the HCF, not list all factors.',
        modelAnswer: '72 = 2³ × 3² [M1]\n120 = 2³ × 3 × 5 [A1]\nHCF = 2³ × 3 = 8 × 3 = 24 [A1]'
      },
      {
        id: 'q_cie_chk_02',
        number: 2,
        topic: 'Linear Equations with Parentheses',
        marks: 3,
        stem: 'Solve the equation:\n\n4(3x - 2) = 28',
        formulaHint: 'Expand the bracket or divide both sides by 4 first.',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Correctly expanding to 12x - 8 = 28 or dividing to get 3x - 2 = 7',
            requiredMatch: /12\s*x\s*-\s*8\s*=\s*28|3\s*x\s*-\s*2\s*=\s*7/i
          },
          {
            code: 'M1',
            type: 'Method',
            description: 'Isolating 3x = 9 or 12x = 36',
            requiredMatch: /3\s*x\s*=\s*9|12\s*x\s*=\s*36/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Final exact answer x = 3',
            requiredMatch: /x\s*=\s*3/i
          }
        ],
        keywords: ['expand', 'linear equation', 'inverse operations'],
        examinerNotes: 'Common Pitfall: Forgetting to multiply the second term inside the bracket by 4 (writing 12x - 2 = 28).',
        modelAnswer: '12x - 8 = 28 [M1]\n12x = 36 [M1]\nx = 3 [A1]'
      }
    ]
  },

  // ── CAMBRIDGE IGCSE 0580 MATHEMATICS (PAPER 2 NON-CALCULATOR) ─────
  {
    id: 'cie_0580_2025_p2_extended',
    curriculum: 'BRITISH',
    grade: 10,
    examBoard: 'CAIE',
    subject: 'Mathematics',
    paperCode: '0580/22',
    series: 'Elingu sample questions in the style of Cambridge IGCSE',
    title: 'Cambridge IGCSE Mathematics Paper 2 (Extended Non-Calculator)',
    durationMinutes: 90,
    totalMarks: 70,
    calculatorAllowed: false,
    questions: [
      {
        id: 'q_cie_0580_p2_01',
        number: 1,
        topic: 'Indices & Surds',
        marks: 3,
        stem: 'Evaluate without a calculator:\n\n(16/81)^(-3/4)',
        formulaHint: 'Invert the fraction to remove negative power: (81/16)^(3/4). Take the fourth root, then cube.',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Inverting fraction: (81/16)^(3/4)',
            requiredMatch: /81\s*\/\s*16|81\s*over\s*16/i
          },
          {
            code: 'M1',
            type: 'Method',
            description: 'Taking 4th root: 4√81 = 3 and 4√16 = 2 => (3/2)³',
            requiredMatch: /3\s*\/\s*2|3\s*over\s*2/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Final simplified answer: 27/8 or 3 3/8',
            requiredMatch: /27\s*\/\s*8|3\s*3\/8|3\.375/
          }
        ],
        keywords: ['fractional power', 'negative power', 'reciprocal', 'fourth root'],
        examinerNotes: 'CAIE Syllabus 2025: Strictly non-calculator. Evaluated by testing prime power recognition (81 = 3⁴, 16 = 2⁴).',
        modelAnswer: '(16/81)^(-3/4) = (81/16)^(3/4) [M1]\n= (4√81 / 4√16)³ = (3/2)³ [M1]\n= 27/8 (or 3 3/8) [A1]'
      }
    ]
  },

  // ── CAMBRIDGE IGCSE 0580 MATHEMATICS ──────────────────────────────
  {
    id: 'cie_0580_2024_mj_p4',
    curriculum: 'BRITISH',
    grade: 10,
    examBoard: 'CAIE',
    subject: 'Mathematics',
    paperCode: '0580/42',
    series: 'Elingu sample questions in the style of Cambridge IGCSE',
    title: 'Cambridge IGCSE Mathematics Paper 4 (Extended)',
    durationMinutes: 150,
    totalMarks: 130,
    calculatorAllowed: true,
    questions: [
      {
        id: 'q_cie_0580_01',
        number: 1,
        topic: 'Algebra & Inequalities',
        marks: 4,
        stem: 'Solve the linear inequality:\n\n5x - 7 < 3(x + 5)',
        formulaHint: 'Expand brackets first, then group like terms on opposite sides.',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Correctly expanding bracket to 3x + 15',
            requiredMatch: /3\s*x\s*\+\s*15/i
          },
          {
            code: 'M1',
            type: 'Method',
            description: 'Collecting x terms on one side and constants on the other (2x < 22 or -2x > -22)',
            requiredMatch: /2\s*x\s*<\s*22|-2\s*x\s*>\s*-22/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Final simplified inequality x < 11',
            requiredMatch: /x\s*<\s*11/i
          },
          {
            code: 'B1',
            type: 'Independent',
            description: 'Correct mathematical notation without swapping inequality sign',
            requiredMatch: /</
          }
        ],
        keywords: ['expand', 'inequality', 'group terms'],
        examinerNotes: 'Common Pitfall: candidates sometimes reverse the inequality sign when subtracting terms. Reversing the inequality only occurs when multiplying or dividing by a negative number.',
        modelAnswer: '5x - 7 < 3x + 15 [M1]\n5x - 3x < 15 + 7\n2x < 22 [M1]\nx < 11 [A1] [B1]'
      },
      {
        id: 'q_cie_0580_02',
        number: 2,
        topic: 'Trigonometry & Bearings',
        marks: 5,
        stem: 'A ship sails from port A on a bearing of 040° for 12 km to point B. It then sails on a bearing of 130° for 18 km to point C.\n\nCalculate the direct distance AC, giving your answer correct to 3 significant figures.',
        formulaHint: 'Angle ABC = 180° - 40° + 130° - 180° = 90°. Alternatively use Cosine Rule: a² = b² + c² - 2bc cos(A).',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Deducing interior angle ∠ABC = 90° (or using 90° in Cosine Rule)',
            requiredMatch: /90|cosine rule/i
          },
          {
            code: 'M2',
            type: 'Method',
            description: 'Applying Pythagoras or Cosine Rule: AC² = 12² + 18²',
            requiredMatch: /12\^2\s*\+\s*18\^2|144\s*\+\s*324|468/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'AC = √468 = 21.633... rounded to 21.6 km (3 s.f.)',
            requiredMatch: /21\.6/
          },
          {
            code: 'B1',
            type: 'Independent',
            description: 'Correct unit included (km)',
            requiredMatch: /km|kilometres/i
          }
        ],
        keywords: ['Pythagoras', 'interior angle', '3 significant figures', 'km'],
        examinerNotes: 'Examiner Advice: Full method marks are awarded if candidates clearly show intermediate steps even if a rounding error occurs at the very end.',
        modelAnswer: 'Angle ABC = 90° [M1]\nAC² = 12² + 18² = 144 + 324 = 468 [M2]\nAC = √468 = 21.633...\nAC = 21.6 km (3 s.f.) [A1] [B1]'
      }
    ]
  },

  // ── CAMBRIDGE IGCSE 0625 PHYSICS ──────────────────────────────────
  {
    id: 'cie_0625_2024_mj_p4',
    curriculum: 'BRITISH',
    grade: 10,
    examBoard: 'CAIE',
    subject: 'Physics',
    paperCode: '0625/42',
    series: 'Elingu sample questions in the style of Cambridge IGCSE',
    title: 'Cambridge IGCSE Physics Paper 4 (Extended Theory)',
    durationMinutes: 75,
    totalMarks: 80,
    calculatorAllowed: true,
    questions: [
      {
        id: 'q_cie_0625_01',
        number: 1,
        topic: 'Motion & Energy',
        marks: 4,
        stem: 'A car accelerates uniformly from rest to a velocity of 20 m/s in 8.0 s, then travels at constant velocity for 12.0 s.\n\nCalculate the total distance traveled during the entire 20.0 s.',
        formulaHint: 'Distance = Area under speed-time graph = Area of triangle + Area of rectangle.',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Calculating distance during acceleration: 0.5 × base × height = 0.5 × 8 × 20',
            requiredMatch: /0\.5\s*\*\s*8\s*\*\s*20|80/i
          },
          {
            code: 'M1',
            type: 'Method',
            description: 'Calculating distance during constant speed: 12.0 × 20 = 240 m',
            requiredMatch: /12\s*\*\s*20|240/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Total distance = 80 + 240 = 320 m',
            requiredMatch: /320/
          },
          {
            code: 'B1',
            type: 'Independent',
            description: 'Correct S.I. unit stated (m or meters)',
            requiredMatch: /m|metres|meters/i
          }
        ],
        keywords: ['area under graph', 'triangle', 'rectangle', 'meters'],
        examinerNotes: 'Common Mistake: Multiplying 20 s × 20 m/s = 400 m directly without considering initial acceleration from rest.',
        modelAnswer: 'Distance 1 = 1/2 × 8 × 20 = 80 m [M1]\nDistance 2 = 12 × 20 = 240 m [M1]\nTotal distance = 80 + 240 = 320 m [A1] [B1]'
      }
    ]
  },

  // ── KENYAN CBE GRADE 6 MATHEMATICS (KPSEA) ────────────────────────
  {
    id: 'knec_kpsea_g6_math_2025',
    curriculum: 'CBC',
    grade: 6,
    examBoard: 'KNEC',
    subject: 'Mathematics',
    paperCode: 'KPSEA-MATH-2025',
    series: 'Elingu sample questions in the style of KPSEA',
    title: 'KPSEA Grade 6 Mathematics National Assessment',
    durationMinutes: 90,
    totalMarks: 50,
    calculatorAllowed: false,
    questions: [
      {
        id: 'q_knec_kpsea_01',
        number: 1,
        topic: 'Whole Numbers & Place Value',
        marks: 3,
        stem: 'A dairy cooperative in Kiambu recorded 4,782,109 litres of milk processed in a year.\n\n(a) State the total place value of digit 7.\n(b) Round off the quantity to the nearest thousand.',
        formulaHint: 'Place value table: Millions, Hundreds of Thousands, Tens of Thousands, Thousands.',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Identifying digit 7 as Hundreds of Thousands (700,000)',
            requiredMatch: /700\s*000|700,000|hundreds of thousands/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Total value stated correctly as 700,000',
            requiredMatch: /700\s*000|700,000/
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Rounding to nearest thousand: 4,782,000 (since 109 is less than 500)',
            requiredMatch: /4\s*782\s*000|4,782,000/
          }
        ],
        keywords: ['place value', 'hundreds of thousands', 'rounding', 'nearest thousand'],
        examinerNotes: 'Common Pitfall: Candidates often confuse place value (position name) with total value (700,000). Both are accepted if value is explicitly calculated.',
        modelAnswer: '(a) Place value: Hundreds of thousands; Total value: 700,000 [M1] [A1]\n(b) Rounded to nearest thousand: 4,782,000 [A1]'
      },
      {
        id: 'q_knec_kpsea_02',
        number: 2,
        topic: 'Measurement: Compound Perimeter & Area',
        marks: 4,
        stem: 'A rectangular garden measures 18m long by 12m wide. A path 2m wide is constructed all around the outside of the garden.\n\nCalculate the total area of the path in square metres.',
        formulaHint: 'Outer Dimensions = Length + 2(width of path), Width + 2(width of path). Area of path = Outer Area - Garden Area.',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Garden area = 18 × 12 = 216 m²',
            requiredMatch: /216/
          },
          {
            code: 'M1',
            type: 'Method',
            description: 'Outer dimensions = 22m × 16m; Outer area = 22 × 16 = 352 m²',
            requiredMatch: /352/
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Path area = 352 - 216 = 136 m²',
            requiredMatch: /136/
          },
          {
            code: 'B1',
            type: 'Independent',
            description: 'Units included (m² or square metres)',
            requiredMatch: /m\^2|sq|square|metres|meters/i
          }
        ],
        keywords: ['compound area', 'outer dimensions', 'path area', 'm²'],
        examinerNotes: 'Examiner Advice: Adding path width to both ends of length and width is essential (18 + 4 = 22, 12 + 4 = 16). Adding path width only once is the most common student error.',
        modelAnswer: 'Garden Area = 18 × 12 = 216 m² [M1]\nOuter Area = (18 + 4) × (12 + 4) = 22 × 16 = 352 m² [M1]\nPath Area = 352 - 216 = 136 m² [A1] [B1]'
      }
    ]
  },

  // ── KENYAN CBE SENIOR SCHOOL STEM CORE MATHEMATICS (KSSEA) ────────
  {
    id: 'knec_kssea_g11_math_2025',
    curriculum: 'CBC',
    grade: 11,
    examBoard: 'KNEC',
    subject: 'Mathematics',
    paperCode: 'KSSEA-STEM-P1',
    series: 'Elingu sample questions in the style of KNEC assessments',
    title: 'KSSEA Senior School STEM Core Mathematics Paper 1',
    durationMinutes: 150,
    totalMarks: 100,
    calculatorAllowed: true,
    questions: [
      {
        id: 'q_knec_kssea_01',
        number: 1,
        topic: 'Surds & Algebraic Rationalisation',
        marks: 4,
        stem: 'Simplify without using mathematical tables or a calculator:\n\n(4√3) / (√5 - √3)\n\nExpress your answer in the form a√15 + b, where a and b are integers.',
        formulaHint: 'Multiply numerator and denominator by the conjugate (√5 + √3).',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Multiplying numerator and denominator by conjugate (√5 + √3)',
            requiredMatch: /√5\s*\+\s*√3|\(?\s*\\?sqrt\{?5\}?\s*\+\s*\\?sqrt\{?3\}?\s*\)?/i
          },
          {
            code: 'M1',
            type: 'Method',
            description: 'Denominator simplified: (√5)² - (√3)² = 5 - 3 = 2',
            requiredMatch: /5\s*-\s*3|denominator\s*=\s*2/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Numerator expansion: 4√15 + 4(3) = 4√15 + 12',
            requiredMatch: /4\s*√\s*15\s*\+\s*12|4\\sqrt\{?15\}?\s*\+\s*12/i
          },
          {
            code: 'B1',
            type: 'Independent',
            description: 'Final simplified form 2√15 + 6 (a = 2, b = 6)',
            requiredMatch: /2\s*√\s*15\s*\+\s*6|6\s*\+\s*2\s*√\s*15/i
          }
        ],
        keywords: ['conjugate', 'rationalise', 'surds', 'difference of two squares'],
        examinerNotes: 'Common Pitfall: Candidates often forget to divide both terms in the numerator by the denominator 2, leaving 4√15 + 6 instead of 2√15 + 6.',
        modelAnswer: '(4√3)(√5 + √3) / [(√5 - √3)(√5 + √3)] [M1]\n= (4√15 + 12) / (5 - 3) [M1]\n= (4√15 + 12) / 2\n= 2√15 + 6 [A1] [B1]'
      },
      {
        id: 'q_knec_kssea_02',
        number: 2,
        topic: 'Sequences & Series: Arithmetic Progression',
        marks: 5,
        stem: 'The 3rd term of an Arithmetic Progression (AP) is 14 and the 8th term is 39.\n\n(a) Find the first term (a) and the common difference (d).\n(b) Calculate the sum of the first 20 terms.',
        formulaHint: 'T_n = a + (n - 1)d;  S_n = (n/2)[2a + (n - 1)d].',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Forming two simultaneous equations: a + 2d = 14 and a + 7d = 39',
            requiredMatch: /a\s*\+\s*2\s*d\s*=\s*14|a\s*\+\s*7\s*d\s*=\s*39/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Solving: 5d = 25 => d = 5 and a = 4',
            requiredMatch: /d\s*=\s*5.*a\s*=\s*4|a\s*=\s*4.*d\s*=\s*5/i
          },
          {
            code: 'M1',
            type: 'Method',
            description: 'Substituting a = 4, d = 5, n = 20 into S_n formula: (20/2)[2(4) + 19(5)]',
            requiredMatch: /10\s*\[\s*8\s*\+\s*95\s*\]|10\s*\*\s*103/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'S_20 = 10 × 103 = 1030',
            requiredMatch: /1030|1,030/
          },
          {
            code: 'B1',
            type: 'Independent',
            description: 'Clear statement of final values for a, d, and S_20',
            requiredMatch: /1030/
          }
        ],
        keywords: ['arithmetic progression', 'common difference', 'sum of AP'],
        examinerNotes: 'Examiner Advice: Setting up simultaneous equations clearly earns the first two method marks even if a minor arithmetic slip occurs in calculating the sum.',
        modelAnswer: 'a + 2d = 14 ... (1)\na + 7d = 39 ... (2) [M1]\nSubtracting: 5d = 25 => d = 5; a = 14 - 10 = 4 [A1]\nS_20 = (20/2)[2(4) + (20-1)(5)] [M1]\nS_20 = 10[8 + 95] = 10 × 103 = 1030 [A1] [B1]'
      }
    ]
  },

  // ── KENYAN CBE GRADE 8 MATHEMATICS ────────────────────────────────
  {
    id: 'knec_kjsea_g8_math_2025',
    curriculum: 'CBC',
    grade: 8,
    examBoard: 'KNEC',
    subject: 'Mathematics',
    paperCode: 'Paper 1',
    series: 'Elingu sample questions in the style of KNEC assessments',
    title: 'KJSEA Grade 8 Mathematics Assessment & Revision',
    durationMinutes: 120,
    totalMarks: 100,
    calculatorAllowed: false,
    questions: [
      {
        id: 'q_knec_g8_01',
        number: 1,
        topic: 'Financial Mathematics',
        marks: 4,
        stem: 'A farmer deposited KES 40,000 in a SACCO that pays compound interest at a rate of 10% per annum.\n\nCalculate the total interest earned at the end of 2 years without using a calculator.',
        formulaHint: 'Year 1 Interest = (P × R × 1) / 100. New Principal = P + I1. Year 2 Interest = (P2 × R × 1) / 100.',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Year 1 Interest calculation: (40000 × 10 × 1)/100 = KES 4,000',
            requiredMatch: /4000|4,000/
          },
          {
            code: 'M1',
            type: 'Method',
            description: 'Year 2 Principal updated to KES 44,000 and Year 2 Interest calculated: 44,000 × 10% = KES 4,400',
            requiredMatch: /44000|44,000|4400|4,400/
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Total compound interest = 4,000 + 4,400 = KES 8,400',
            requiredMatch: /8400|8,400/
          },
          {
            code: 'B1',
            type: 'Independent',
            description: 'Kenyan currency unit specified (KES or Sh.)',
            requiredMatch: /kes|sh|shillings/i
          }
        ],
        keywords: ['compound interest', 'principal', 'SACCO', 'per annum'],
        examinerNotes: 'KNEC Examiner Note: Many learners confuse compound interest with simple interest (which would give KES 8,000). Show step-by-step additions per year for non-calculator compliance.',
        modelAnswer: 'Year 1 Interest = 40,000 × 10/100 = KES 4,000 [M1]\nPrincipal for Year 2 = 40,000 + 4,000 = KES 44,000\nYear 2 Interest = 44,000 × 10/100 = KES 4,400 [M1]\nTotal Interest = 4,000 + 4,400 = KES 8,400 [A1] [B1]'
      },
      {
        id: 'q_knec_g8_02',
        number: 2,
        topic: 'Measurement & Pythagoras',
        marks: 4,
        stem: 'A rectangular shamba measures 15 meters long and 8 meters wide. The owner wishes to lay an irrigation pipe diagonally across the shamba from one corner to the opposite corner.\n\nFind the length of the irrigation pipe required.',
        formulaHint: 'In a right-angled triangle, c² = a² + b².',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Recognizing diagonal forms a right-angled triangle with shamba dimensions: c² = 15² + 8²',
            requiredMatch: /15\^2\s*\+\s*8\^2|225\s*\+\s*64/
          },
          {
            code: 'M1',
            type: 'Method',
            description: 'Summing squares: 225 + 64 = 289',
            requiredMatch: /289/
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Taking square root: c = √289 = 17 meters',
            requiredMatch: /17/
          },
          {
            code: 'B1',
            type: 'Independent',
            description: 'Correct metric unit included (m or meters)',
            requiredMatch: /m|meters|metres/i
          }
        ],
        keywords: ['Pythagoras', 'hypotenuse', 'diagonal', 'square root'],
        examinerNotes: 'KNEC Rubric: 15-8-17 is a standard Pythagorean triple. Demonstrating the sum of squares is required for full method marks.',
        modelAnswer: 'c² = a² + b²\nc² = 15² + 8² [M1]\nc² = 225 + 64 = 289 [M1]\nc = √289 = 17 m [A1] [B1]'
      }
    ]
  },

  // ── KENYAN CBE GRADE 8 INTEGRATED SCIENCE ─────────────────────────
  {
    id: 'knec_kjsea_g8_science_2025',
    curriculum: 'CBC',
    grade: 8,
    examBoard: 'KNEC',
    subject: 'Integrated Science',
    paperCode: 'Paper 1',
    series: 'Elingu sample questions in the style of KNEC assessments',
    title: 'KJSEA Grade 8 Integrated Science Revision',
    durationMinutes: 90,
    totalMarks: 75,
    calculatorAllowed: false,
    questions: [
      {
        id: 'q_knec_sci_01',
        number: 1,
        topic: 'Living Things & Cell Biology',
        marks: 3,
        stem: 'Grade 8 learners placed equal strips of raw Irish potato in three beakers containing: (A) Pure water, (B) Moderate salt solution, (C) Concentrated salt solution. After 2 hours, strip A became firm and increased in size.\n\nExplain the scientific reason for the change observed in strip A.',
        formulaHint: 'Water moves from high water potential (hypotonic) to low water potential (hypertonic) across selectively permeable cell membrane.',
        markBreakdown: [
          {
            code: 'M1',
            type: 'Method',
            description: 'Identifying the process as osmosis across cell membrane',
            requiredMatch: /osmosis/i
          },
          {
            code: 'A1',
            type: 'Accuracy',
            description: 'Water entered potato cells from pure water beaker (hypotonic to hypertonic)',
            requiredMatch: /water enter|water moved in|hypotonic/i
          },
          {
            code: 'B1',
            type: 'Independent',
            description: 'Cells became turgid causing increase in firmness and length',
            requiredMatch: /turgid|firm|expanded/i
          }
        ],
        keywords: ['osmosis', 'turgid', 'cell membrane', 'water potential'],
        examinerNotes: 'KNEC Examiner Note: Naming osmosis alone yields only 1 mark. The direction of water movement and resultant turgidity are required for full 3 marks.',
        modelAnswer: 'The process is osmosis [M1]. Water moved from the beaker (higher water potential) into the potato cells (lower water potential) across selectively permeable cell membranes [A1]. The cells absorbed water and became turgid, increasing the firmness and size of the strip [B1].'
      }
    ]
  }
];

/**
 * Retrieve revision papers filtered by curriculum, grade, and subject
 */
async function getRevisionPapers(curriculum = 'CBC', grade = 8, subject = 'Mathematics') {
  if (revisionRepo) {
    try {
      const dbPapers = await revisionRepo.getRevisionPapers(curriculum, grade, subject);
      if (dbPapers && dbPapers.length > 0) return dbPapers;
    } catch (e) {}
  }
  const normCurr = (curriculum || 'CBC').toUpperCase() === 'BRITISH' ? 'BRITISH' : 'CBC';
  const numGrade = Number(grade) || (normCurr === 'BRITISH' ? 10 : 8);
  const normSubj = (subject || 'Mathematics').toLowerCase();

  return REVISION_PAPERS.filter(p => {
    // 1. STRICT CURRICULUM ISOLATION — Zero cross-curriculum leakage guaranteed
    const matchCurr = p.curriculum.toUpperCase() === normCurr;
    if (!matchCurr) return false;

    // 2. Subject match
    const matchSubj = p.subject.toLowerCase() === normSubj || p.subject.toLowerCase().includes(normSubj) || normSubj.includes(p.subject.toLowerCase());
    if (!matchSubj) return false;

    // 3. Stage & Tier matching (Upper Primary vs JSS vs Senior School; Checkpoint vs IGCSE)
    let matchGrade = false;
    if (normCurr === 'CBC') {
      if (numGrade <= 6) {
        matchGrade = p.grade <= 6; // Upper Primary KPSEA
      } else if (numGrade >= 7 && numGrade <= 9) {
        matchGrade = p.grade >= 7 && p.grade <= 9; // Junior Secondary KJSEA
      } else {
        matchGrade = p.grade >= 10; // Senior School KSSEA STEM
      }
    } else {
      if (numGrade <= 9) {
        matchGrade = p.grade <= 9; // Cambridge Checkpoint (Years 7–9)
      } else {
        matchGrade = p.grade >= 10; // Cambridge IGCSE (Years 10–11)
      }
    }
    return matchGrade;
  }).map(p => ({
    id: p.id,
    curriculum: p.curriculum,
    grade: p.grade,
    subject: p.subject,
    examBoard: p.examBoard,
    paperCode: p.paperCode,
    series: p.series,
    title: p.title,
    durationMinutes: p.durationMinutes,
    totalMarks: p.totalMarks,
    calculatorAllowed: p.calculatorAllowed,
    questionCount: p.questions.length
  }));
}

/**
 * Retrieve paper details and its questions
 */
async function getPaperById(paperId) {
  if (revisionRepo) {
    try {
      const dbPaper = await revisionRepo.getPaperById(paperId);
      if (dbPaper) return dbPaper;
    } catch (e) {}
  }
  const paper = REVISION_PAPERS.find(p => p.id === paperId);
  if (!paper) return null;
  return {
    ...paper,
    questions: paper.questions.map(q => ({
      id: q.id,
      number: q.number,
      topic: q.topic,
      marks: q.marks,
      stem: q.stem,
      formulaHint: q.formulaHint,
      keywords: q.keywords,
      hasXray: true
    }))
  };
}

/**
 * Retrieve Examiner X-Ray mark scheme for a single question
 */
async function getQuestionXray(questionId) {
  if (revisionRepo) {
    try {
      const dbXray = await revisionRepo.getQuestionExaminerXray(questionId);
      if (dbXray) return dbXray;
    } catch (e) {}
  }
  for (const paper of REVISION_PAPERS) {
    const q = paper.questions.find(item => item.id === questionId);
    if (q) {
      return {
        questionId: q.id,
        paperCode: paper.paperCode,
        series: paper.series,
        curriculum: paper.curriculum,
        subject: paper.subject,
        number: q.number,
        topic: q.topic,
        marks: q.marks,
        stem: q.stem,
        formulaHint: q.formulaHint,
        markBreakdown: q.markBreakdown,
        keywords: q.keywords,
        examinerNotes: q.examinerNotes,
        modelAnswer: q.modelAnswer
      };
    }
  }
  return null;
}

/**
 * Socratic Examiner Evaluation of student's working
 */
async function evaluateStudentWorking(questionId, workingText, finalAnswer) {
  if (revisionRepo) {
    try {
      const dbEval = await revisionRepo.evaluateWorking(questionId, workingText, finalAnswer);
      if (dbEval) {
        return dbEval;
      }
    } catch (e) {
      console.error('dbEval error:', e);
    }
  }
  const xray = await getQuestionXray(questionId);
  if (!xray) {
    return { success: false, error: 'Question not found' };
  }

  const combinedText = `${workingText || ''}\n${finalAnswer || ''}`.trim();
  let awardedMarks = 0;
  const markResults = [];

  for (const rubric of xray.markBreakdown) {
    const isMatched = rubric.requiredMatch.test(combinedText);
    if (isMatched) {
      awardedMarks++;
      markResults.push({
        code: rubric.code,
        type: rubric.type,
        awarded: true,
        description: rubric.description,
        feedback: `Earned ${rubric.code} (${rubric.type} mark): ${rubric.description}`
      });
    } else {
      markResults.push({
        code: rubric.code,
        type: rubric.type,
        awarded: false,
        description: rubric.description,
        feedback: `Missed ${rubric.code}: ${rubric.description}`
      });
    }
  }

  // Check keyword retention
  const matchedKeywords = xray.keywords.filter(kw => 
    new RegExp(kw, 'i').test(combinedText)
  );

  let qualitativeFeedback = '';
  if (awardedMarks === xray.marks) {
    qualitativeFeedback = `🌟 Full Marks! (${awardedMarks}/${xray.marks}). Your working demonstrates clear mathematical rigor and matches the marking points for this question.`;
  } else if (awardedMarks > 0) {
    qualitativeFeedback = `👍 Solid Progress: You earned ${awardedMarks}/${xray.marks} marks. Review the missed points in the Examiner X-Ray below to pick up the remaining method/accuracy marks.`;
  } else {
    qualitativeFeedback = `💡 Keep Going: Start by writing down the initial formula or expanding the first term to secure early method marks [M1]. Check the Socratic hint above.`;
  }

  return {
    success: true,
    questionId,
    awardedMarks,
    totalMarks: xray.marks,
    percentage: Math.round((awardedMarks / xray.marks) * 100),
    markResults,
    matchedKeywords,
    totalKeywords: xray.keywords.length,
    qualitativeFeedback,
    examinerNotes: xray.examinerNotes,
    modelAnswer: xray.modelAnswer
  };
}

module.exports = {
  REVISION_PAPERS,
  getRevisionPapers,
  getPaperById,
  getQuestionXray,
  evaluateStudentWorking
};
