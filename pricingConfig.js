// ════════════════════════════════════════════════════════════
// ELINGU PRICING CONFIGURATION & FEATURE GATES
// Finalised Pricing Structure & Feature Naming Specification
// ════════════════════════════════════════════════════════════

const PRICING_TIERS = {
  free: {
    id: 'free',
    name: 'Free',
    uiLabel: 'Free', // Strict: no "Gov/NGO" qualifier on public UI
    priceMonthly: 0,
    priceAnnual: 0,
    currency: 'KES',
    priceDisplay: 'KES 0',
    billingPeriod: 'Forever',
    badge: null,
    features: [
      '2 compulsory + 1 elective subject',
      '10–15 turns per day limit',
      'Basic weekly parent note',
      'No teacher report'
    ],
    limits: {
      maxSubjects: 3,
      virtualLab: false,
      dailyTurns: 15,
      dailySavedSpaces: 1,
      contextTurns: 20,
      teacherReport: false,
      knowYourChild: false,
      safeBox: false,
      extendedMemory: false,
      priorityRouting: false
    }
  },

  standard: {
    id: 'standard',
    name: 'Standard',
    uiLabel: 'Standard',
    priceMonthly: 699,
    priceAnnual: 6999,
    currency: 'KES',
    priceDisplay: 'KES 699/month',
    annualSavings: 1389,
    annualSavingsDisplay: 'Save KES 1,389 — equivalent to 2 months free',
    badge: null,
    features: [
      'All compulsory subjects/learning areas + 2 electives',
      '🔬 Virtual Practical Science & Tech Lab',
      '300 daily turns (generous daily learning allowance for full lessons & labs)',
      'Weekly parent summary in warm, plain language (conversational tone only)',
      'Basic teacher report showing CBE strand engagement and areas of struggle',
      'Safe Box (student wellbeing reflection space)',
      'Streaks, badges, and learning vault',
      'Knowledge chatmarks'
    ],
    limits: {
      compulsorySubjects: 'all',
      maxElectives: 2, // Standard offers all compulsory + 2 electives
      virtualLab: true,
      maxSubjects: null,
      dailyTurns: 300,
      dailySavedSpaces: 5,
      contextTurns: 20,
      teacherReport: 'basic',
      knowYourChild: false,
      safeBox: 'manual', // Learner manually inputs feelings & reflections
      extendedMemory: false,
      priorityRouting: false
    }
  },

  premium: {
    id: 'premium',
    name: 'Premium',
    uiLabel: 'Premium',
    priceMonthly: 1499,
    priceAnnual: 14999,
    currency: 'KES',
    priceDisplay: 'KES 1,499/month',
    annualSavings: 2989,
    annualSavingsDisplay: 'Save KES 2,989 — equivalent to 2 months free',
    badge: 'Most Comprehensive',
    features: [
      'All compulsory subjects + ALL electives',
      '🔬 Full Virtual Practical Lab (all subjects & SBA simulations)',
      '500 daily turns (extended deep session allowance for full labs & past papers)',
      'Detailed parent report with thinking pattern analysis',
      'Rich teacher and headteacher report with full reasoning patterns and SBA documentation support',
      'Safe Box Pro (student reflection + proactive AI emotional stress radar)',
      'Extended AI memory and context',
      'Priority AI model routing',
      'Know Your Child — deep thinking & curiosity portrait (unlocks after 90 days)'
    ],
    limits: {
      compulsorySubjects: 'all',
      maxElectives: Infinity, // Premium offers all compulsory + all electives
      virtualLab: true,
      maxSubjects: null,
      dailyTurns: 500,
      dailySavedSpaces: Infinity,
      contextTurns: 30,
      teacherReport: 'rich_sba',
      knowYourChild: true,
      safeBox: 'proactive_ai', // Learner inputs + AI tutor proactively detects & documents stress
      extendedMemory: true,
      priorityRouting: true,
      softCapNoticeThresholdPercent: 20 // Flag on admin side if overused below 20% quota
    }
  },

  school: {
    id: 'school',
    name: 'School Licence',
    uiLabel: 'School (100–999 Pupils)',
    targetAudience: 'Single primary or junior secondary school',
    minPupils: 100,
    maxPupils: 999,
    priceMonthly: 500,
    priceAnnual: 5000,
    currency: 'KES',
    priceDisplay: 'KES 500 / pupil / month (KES 5,000 / year)',
    billingPeriod: 'Annual / Termly',
    badge: 'School Bulk',
    features: [
      'KES 500/pupil/month (save KES 1,000/yr with annual payment at KES 5,000/yr)',
      'Dedicated Teacher & Headteacher Dashboard',
      '🔬 Full School Virtual Science & Practical Lab',
      'Class-level CBE Strand Mastery & Misconception Heatmaps',
      'KICD SBA (School-Based Assessment) Report Generator',
      'All CBE subjects, 300 turns/day per pupil',
      'Computer lab & home access via School Code + Admission No'
    ],
    limits: {
      isInstitutional: true,
      institutionType: 'school',
      virtualLab: true,
      dailyTurns: 300,
      teacherDashboard: 'full',
      elinguInsights: true,
      sbaReportGeneration: true
    }
  },

  igcse_school: {
    id: 'igcse_school',
    name: 'IGCSE Institutional Licence',
    uiLabel: 'Cambridge / Edexcel School (KES 3,000/student)',
    targetAudience: 'International & British Curriculum Schools offering CAIE / Edexcel',
    minPupils: null,
    maxPupils: null,
    priceMonthly: 3000,
    priceAnnual: 30000,
    currency: 'KES',
    priceDisplay: 'KES 3,000 / student / month (KES 30,000 / year)',
    billingPeriod: 'Annual / Termly',
    badge: 'IGCSE Institutional',
    features: [
      'KES 3,000 / student / month (Annual: KES 30,000 / student / year)',
      'Full Cambridge Checkpoint (Years 7–9) & IGCSE (Years 10–11) syllabus coverage',
      'Science Lab Bench & Paper 6 Alternative to Practical simulator',
      'Examiner mark scheme criteria & strict keyword validator',
      'Dedicated Teacher & Department Head Analytics Dashboard'
    ],
    limits: {
      isInstitutional: true,
      institutionType: 'igcse_school',
      dailyTurns: 500,
      teacherDashboard: 'full',
      elinguInsights: true,
      sbaReportGeneration: true
    }
  },

  subcounty: {
    id: 'subcounty',
    name: 'Sub-County Cluster Licence',
    uiLabel: 'Sub-County (1,000–9,999 Pupils)',
    targetAudience: 'Clustered schools under Sub-County Education Office / CSOs',
    minPupils: 1000,
    maxPupils: 9999,
    priceMonthly: 400,
    priceAnnual: 4000,
    currency: 'KES',
    priceDisplay: 'KES 400 / pupil / month (KES 4,000 / year)',
    billingPeriod: 'Annual / Termly',
    badge: 'Sub-County Bulk',
    features: [
      'KES 400/pupil/month (save KES 800/yr with annual payment at KES 4,000/yr)',
      'Cross-school performance benchmarking across the sub-county',
      'Curriculum Support Officer (CSO) oversight portal',
      'Sub-County CBE Literacy & Numeracy Progress Reports',
      'Teacher Professional Development & CBE Pedagogy Analytics',
      'Priority onboarding & school technician training'
    ],
    limits: {
      isInstitutional: true,
      institutionType: 'subcounty',
      dailyTurns: 300,
      teacherDashboard: 'full',
      subCountyDashboard: 'full',
      elinguInsights: true,
      sbaReportGeneration: true
    }
  },

  county: {
    id: 'county',
    name: 'County-Wide Deployment',
    uiLabel: 'County Government / MoE (10,000+ Pupils)',
    targetAudience: 'County Education Boards, Devolved Government & Development Partners',
    minPupils: 10000,
    maxPupils: null,
    priceMonthly: 300,
    priceAnnual: 3000,
    currency: 'KES',
    priceDisplay: 'KES 300 / pupil / month (KES 3,000 / year)',
    billingPeriod: 'Annual Fiscal Cycle',
    badge: 'Government / County',
    features: [
      'KES 300/pupil/month (KES 3,000/yr per pupil — optimal scale discount)',
      'County-wide educational equity & learning deficit heatmaps',
      'Longitudinal cognitive & CBE competency tracking across sub-counties',
      'Dedicated infrastructure SLA & high-concurrency cloud provisioning',
      'Custom co-branded county portal & annual KICD-aligned impact audit',
      'Direct integration with County Bursary & Education management systems'
    ],
    limits: {
      isInstitutional: true,
      institutionType: 'county',
      dailyTurns: 300,
      teacherDashboard: 'full',
      subCountyDashboard: 'full',
      countyDashboard: 'full',
      elinguInsights: true,
      sbaReportGeneration: true
    }
  },

  foundation: {
    id: 'foundation',
    name: 'Foundation / NGO',
    uiLabel: 'Foundation / NGO',
    priceDisplay: 'Grant-funded',
    currency: 'KES',
    billingPeriod: 'Partner Funded',
    badge: 'Social Impact',
    features: [
      'Free deployment for underserved and public school students',
      'Managed through Elingu\'s foundation arm'
    ],
    limits: {
      isGrantFunded: true
    }
  },

  pilot: {
    id: 'pilot',
    name: 'Pilot Trial',
    uiLabel: 'Pilot Trial',
    priceMonthly: 0,
    priceAnnual: 0,
    currency: 'KES',
    priceDisplay: 'KES 0 (Trial)',
    billingPeriod: 'Trial Cohort',
    badge: 'Pilot Cohort',
    features: [
      'All CBE subjects, unlimited',
      '150 daily turns',
      'Basic weekly parent summary',
      'Teacher report'
    ],
    limits: {
      maxSubjects: null, // Unlimited CBE subjects for pilot trial
      dailyTurns: 150,
      dailySavedSpaces: 5,
      contextTurns: 20,
      teacherReport: 'basic',
      knowYourChild: false,
      safeBox: false,
      extendedMemory: false, // Explicitly 20 turns, matching user directive
      priorityRouting: false
    }
  }
};

// ── CURRICULUM-LOCKED FAMILY BUNDLES (MODEL 3) ───────────────
// Eliminates cross-curriculum arbitrage and pooling across households
const FAMILY_BUNDLES = {
  cbc_family: {
    id: 'cbc_family',
    curriculum: 'CBC',
    name: 'CBC Family Pack',
    maxChildren: 3,
    tier: 'premium',
    priceMonthly: 2499,
    priceAnnual: 24999,
    annualSavings: 4989,
    currency: 'KES',
    label: '🇰🇪 CBC Family Pack (Up to 3 Learners)',
    description: 'Covers up to 3 Kenyan CBC learners on Premium with all subjects unlocked, 500 daily turns each, and SBA portfolios. Strictly locked to Kenyan CBC curriculum.'
  },
  igcse_family: {
    id: 'igcse_family',
    curriculum: 'BRITISH',
    name: 'British / IGCSE Family Pack',
    maxChildren: 3,
    tier: 'premium',
    priceMonthly: 7999,
    priceAnnual: 79999,
    annualSavings: 15989,
    currency: 'KES',
    label: '🇬🇧 British / IGCSE Family Pack (Up to 3 Learners)',
    description: 'Covers up to 3 British / Cambridge & Pearson Edexcel learners on Exam Master Premium with Paper 6 ATP lab bench and examiner marking schemes. Strictly locked to British curriculum.'
  }
};

// ── ADDITIONAL CHILD ADD-ON ──────────────────────────────────
const ADDITIONAL_CHILD_ADDON = {
  priceMonthly: 400,
  currency: 'KES',
  maxChildren: 4,
  label: 'Add another child — KES 400/month per additional child',
  description: 'Maximum 4 children under one parent account. Applies as an add-on to Standard and Premium tiers.',
  availableOnTiers: ['standard', 'premium']
};

// ── FEATURE NAMING SPECIFICATION ─────────────────────────────
// The same underlying analytical feature, framed for the specific audience:
const FEATURE_NAMING = {
  parent: {
    id: 'know_your_child',
    name: 'Know Your Child',
    description: 'A deep portrait of how your child thinks, what drives their curiosity, and where their natural strengths are emerging. Updated every term.',
    tone: 'Warm, emotional, personal — no data tables or strand labels visible to parent',
    tierRequired: 'premium',
    gateDays: 90
  },
  teacher: {
    id: 'elingu_insights',
    name: 'Elingu Insights',
    description: 'Detailed reasoning patterns, CBE strand analytics, and SBA-aligned progress data for every learner.',
    tone: 'Professional, data-oriented — shows strand/sub-strand level data and class aggregate view',
    tiersAvailable: ['school', 'premium']
  }
};

// ── FEATURE GATE HELPER: 90-DAY "KNOW YOUR CHILD" UNLOCK ─────
function getKnowYourChildGate(studentCreatedAt, parentTier = 'free') {
  const GATE_DAYS = 90;
  const createdDate = studentCreatedAt ? new Date(studentCreatedAt) : new Date();
  const now = new Date();
  const diffTime = Math.max(0, now - createdDate);
  const daysActive = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const isPremium = (parentTier === 'premium');
  const daysReached = daysActive >= GATE_DAYS;
  const unlocked = isPremium && daysReached;
  const daysRemaining = Math.max(0, GATE_DAYS - daysActive);
  const progressPercent = Math.min(100, Math.round((daysActive / GATE_DAYS) * 100));

  let statusText = '';
  if (unlocked) {
    statusText = 'Unlocked — Termly Thinking Portrait Ready';
  } else if (!isPremium) {
    statusText = `Available in Premium — unlocks after ${GATE_DAYS} days of learning (${daysActive}/${GATE_DAYS} days recorded)`;
  } else {
    statusText = `Know Your Child unlocks after ${daysRemaining} more days of learning (${daysActive}/${GATE_DAYS} days)`;
  }

  return {
    featureName: FEATURE_NAMING.parent.name,
    description: FEATURE_NAMING.parent.description,
    unlocked,
    isPremium,
    daysActive,
    daysRequired: GATE_DAYS,
    daysRemaining,
    progressPercent,
    statusText
  };
}

// ── RATE CARD MATRIX ──────────────────────────────────────────
// Dynamic pricing across Curricula (CBC vs IGCSE) and Levels (JSS vs Senior School)
const RATE_CARDS = {
  // 1. Kenyan CBC Junior Secondary School (Grades 7–9) & Upper Primary (Grade 6)
  CBC_JSS: {
    free: {
      monthly: 0,
      annual: 0,
      label: 'Free Explorer',
      description: '2 compulsory + 1 elective subject, 15 daily turns'
    },
    standard: {
      monthly: 699,
      annual: 6999,
      annualSavings: 1389,
      label: 'Standard Scholar',
      description: 'All compulsory learning areas + 2 electives, 300 daily turns, weekly parent note'
    },
    premium: {
      monthly: 1499,
      annual: 14999,
      annualSavings: 2989,
      label: 'Premium Scholar',
      description: 'All compulsory learning areas + ALL electives, 500 daily turns, SBA reports, Safe Box Pro'
    }
  },

  // 2. Kenyan CBC Senior Secondary School (Grades 10–12 New Enrolment)
  CBC_SS: {
    free: {
      monthly: 0,
      annual: 0,
      label: 'Free Explorer',
      description: '2 compulsory + 1 elective subject, 15 daily turns'
    },
    standard: {
      monthly: 899,
      annual: 8999,
      annualSavings: 1789,
      label: 'Senior Standard',
      description: 'All compulsory subjects + 2 pathway electives, 300 turns/day, lab simulators'
    },
    premium: {
      monthly: 1799,
      annual: 17999,
      annualSavings: 3589,
      label: 'Senior Premium Pro',
      description: 'All compulsory subjects + ALL pathway electives, 500 turns/day, KCSE/KSSEA revision radar, deep SBA'
    }
  },

  // 3. Kenyan CBC Senior Secondary School — Transition Loyalty Rate (for Grade 9 Alumni)
  CBC_SS_LOYALTY: {
    free: {
      monthly: 0,
      annual: 0,
      label: 'Free Explorer',
      description: '2 compulsory + 1 elective subject, 15 daily turns'
    },
    standard: {
      monthly: 799,
      annual: 7999,
      annualSavings: 1589,
      label: 'Senior Pioneer Rate (Loyalty)',
      description: 'Locked-in rate for graduating JSS learners (Save KES 1,589/year, 300 turns/day)'
    },
    premium: {
      monthly: 1599,
      annual: 15999,
      annualSavings: 3189,
      label: 'Senior Premium (Loyalty)',
      description: 'Locked-in premium rate for graduating JSS learners (Save KES 3,189/year, 500 turns/day)'
    }
  },

  // 4. Cambridge Assessment International Education (CAIE Lower Secondary Checkpoint Years 7–9 & Pearson iLower)
  CHECKPOINT: {
    free: {
      monthly: 0,
      annual: 0,
      label: 'Checkpoint Free Starter',
      description: '2 core + 1 secondary subject (3 subjects total), 15 daily turns, Checkpoint foundations'
    },
    standard: {
      monthly: 3599,
      annual: 35999,
      annualSavings: 7189,
      label: 'Checkpoint Standard',
      description: '2 core + 2 electives (4 subjects total) with Cambridge Science Lab Bench, 300 daily turns'
    },
    premium: {
      monthly: 4599,
      annual: 45999,
      annualSavings: 9189,
      label: 'Checkpoint Master',
      description: 'All Checkpoint core + all secondary subjects, Cambridge Science Lab Bench & diagnostic tests, 500 daily turns'
    }
  },

  // 5. Cambridge Assessment International Education (CAIE Upper Secondary IGCSE Years 10–11 & Pearson Edexcel)
  IGCSE: {
    free: {
      monthly: 0,
      annual: 0,
      label: 'IGCSE Free Starter',
      description: '2 core (Maths + English) + 1 elective subject (3 subjects total), 15 daily turns, Core/Foundation mark schemes'
    },
    standard: {
      monthly: 3599,
      annual: 35999,
      annualSavings: 7189,
      label: 'IGCSE Standard',
      description: '2 core (Maths + English) + 2 electives (4 subjects total) with Cambridge Science Lab Bench & Paper 6 ATP simulators, 300 daily turns'
    },
    premium: {
      monthly: 4599,
      annual: 45999,
      annualSavings: 9189,
      label: 'IGCSE Exam Master',
      description: 'All subjects (All compulsory + ALL electives), examiner commentary, Paper 6 ATP engine, strict keyword validator, 500 daily turns'
    }
  }
};

/**
 * Dynamically resolves the exact price, tier details, and rate card for any student
 * @param {Object} student - Student record (grade, schoolLevel, curriculum, subscriptionTier, etc.)
 * @param {string} tier - 'free' | 'standard' | 'premium'
 * @param {string} billingCycle - 'monthly' | 'annual'
 * @param {boolean} isTransitioningAlumni - whether learner was active in JSS and gets the KES 800 discount
 */
function resolvePricingForStudent(student = {}, tier = 'standard', billingCycle = 'monthly', isTransitioningAlumni = false) {
  const cleanCycle = billingCycle === 'annual' ? 'annual' : 'monthly';

  // Check for curriculum-locked family bundles (Model 3)
  const targetId = typeof student === 'string' ? student : (student.id || student.targetId || '');
  if (targetId === 'all_cbe' || targetId === 'family_cbe' || targetId === 'cbc_family') {
    const bundle = FAMILY_BUNDLES.cbc_family;
    const amount = cleanCycle === 'annual' ? bundle.priceAnnual : bundle.priceMonthly;
    return {
      amount,
      monthly: bundle.priceMonthly,
      annual: bundle.priceAnnual,
      currency: 'KES',
      rateCardKey: 'CBC_FAMILY',
      tier: 'premium',
      tierLabel: bundle.name,
      description: bundle.description,
      billingCycle: cleanCycle,
      priceDisplay: `KES ${amount.toLocaleString()}${cleanCycle === 'annual' ? '/year' : '/month'}`,
      savingsDisplay: cleanCycle === 'annual' ? 'Save KES 4,989 (equivalent to 2 months free)' : null,
      isFamilyBundle: true,
      maxChildren: bundle.maxChildren,
      curriculum: 'CBC'
    };
  }
  if (targetId === 'all_igcse' || targetId === 'family_igcse' || targetId === 'igcse_family') {
    const bundle = FAMILY_BUNDLES.igcse_family;
    const amount = cleanCycle === 'annual' ? bundle.priceAnnual : bundle.priceMonthly;
    return {
      amount,
      monthly: bundle.priceMonthly,
      annual: bundle.priceAnnual,
      currency: 'KES',
      rateCardKey: 'IGCSE_FAMILY',
      tier: 'premium',
      tierLabel: bundle.name,
      description: bundle.description,
      billingCycle: cleanCycle,
      priceDisplay: `KES ${amount.toLocaleString()}${cleanCycle === 'annual' ? '/year' : '/month'}`,
      savingsDisplay: cleanCycle === 'annual' ? 'Save KES 15,989 (equivalent to 2 months free)' : null,
      isFamilyBundle: true,
      maxChildren: bundle.maxChildren,
      curriculum: 'BRITISH'
    };
  }

  const cleanGrade = parseInt(student.grade || student.yearGroup || 7, 10);
  const cleanLevel = student.schoolLevel || (cleanGrade >= 10 ? 'SS' : 'JSS');
  const curriculum = (student.curriculum || 'CBC').toUpperCase();
  const cleanTier = ['free', 'standard', 'premium'].includes(tier) ? tier : 'standard';

  let rateCardKey = 'CBC_JSS';

  if (curriculum === 'IGCSE' || curriculum === 'CAMBRIDGE' || curriculum === 'BRITISH' || curriculum === 'EDEXCEL') {
    const isLowerSec = cleanGrade < 10;
    rateCardKey = isLowerSec ? 'CHECKPOINT' : 'IGCSE';
  } else if (cleanLevel === 'SS' || cleanGrade >= 10) {
    // If the student was an active subscriber in JSS or has loyalty flag, grant KES 800 rate
    const hasLoyalty = isTransitioningAlumni || student.wasJssSubscriber || student.hasLoyaltyDiscount;
    rateCardKey = hasLoyalty ? 'CBC_SS_LOYALTY' : 'CBC_SS';
  } else {
    rateCardKey = 'CBC_JSS';
  }

  const card = RATE_CARDS[rateCardKey] || RATE_CARDS.CBC_JSS;
  const tierInfo = card[cleanTier] || card.standard;
  const amount = cleanCycle === 'annual' ? tierInfo.annual : tierInfo.monthly;
  const savingsDisplay = cleanCycle === 'annual' && tierInfo.annualSavings
    ? `Save KES ${tierInfo.annualSavings.toLocaleString()} (equivalent to 2 months free)`
    : null;

  return {
    amount,
    monthly: tierInfo.monthly,
    annual: tierInfo.annual,
    currency: 'KES',
    rateCardKey,
    tier: cleanTier,
    tierLabel: tierInfo.label,
    description: tierInfo.description,
    billingCycle: cleanCycle,
    priceDisplay: `KES ${amount.toLocaleString()}${cleanCycle === 'annual' ? '/year' : '/month'}`,
    savingsDisplay,
    isLoyaltyDiscount: rateCardKey === 'CBC_SS_LOYALTY'
  };
}

// ── COMPULSORY SUBJECTS DEFINITIONS ──────────────────────────────
const JSS_COMPULSORY_SUBJECTS = ['Mathematics', 'English', 'Kiswahili', 'Integrated Science', 'Science & Technology', 'Social Studies'];
const SS_COMPULSORY_SUBJECTS = ['Core Mathematics', 'Essential Mathematics', 'English', 'Kiswahili', 'Community Service Learning'];
const BRITISH_COMPULSORY_SUBJECTS = [
  'Mathematics', 'English', 'First Language English', 'English as a Second Language',
  'Mathematics (0580)', 'First Language English (0500)', 'English as a Second Language (0510)',
  'Checkpoint Mathematics (0862)', 'Checkpoint English (0861)',
  'Mathematics A (4MA1)', 'Mathematics B (4MB1)',
  'English Language A (4EA1)', 'English Language B (4EB1)', 'English as a Second Language (4ES1)',
  'iLowerSecondary Maths (LMA11)', 'iLowerSecondary English (LEN11)'
];

/**
 * Returns whether a subject is a compulsory core learning area
 * @param {string} subject - Subject name or alias
 * @param {boolean|string} levelOrCurriculum - true/'SS' for Senior School, 'BRITISH'/'IGCSE' for British, false/'JSS' for JSS
 */
function isCompulsorySubject(subject, levelOrCurriculum = false) {
  const norm = String(subject || '').trim().toLowerCase();
  const curStr = String(levelOrCurriculum || '').toUpperCase();
  const isBritish = curStr === 'BRITISH' || curStr === 'IGCSE' || curStr === 'CAMBRIDGE' || curStr === 'EDEXCEL';
  const isSenior = levelOrCurriculum === true || curStr === 'SS' || curStr === 'SENIOR';

  if (isBritish) {
    return BRITISH_COMPULSORY_SUBJECTS.some(c => {
      const cLow = c.toLowerCase();
      return cLow === norm || norm.includes(cLow) || cLow.includes(norm);
    });
  }
  const list = isSenior ? SS_COMPULSORY_SUBJECTS : JSS_COMPULSORY_SUBJECTS;
  return list.some(c => c.toLowerCase() === norm);
}

/**
 * Returns whether the Virtual Practical Lab is unlocked for a given subscription tier.
 * Unlocked on: Standard, Premium, School, and Pilot tiers.
 * Locked on: Free tier.
 */
function isVirtualLabUnlockedForTier(tier = 'free', isPilotActive = false) {
  if (isPilotActive) return true;
  const clean = String(tier || 'free').toLowerCase();
  return clean === 'standard' || clean === 'premium' || clean === 'school' || clean === 'igcse_school' || clean === 'pilot';
}

/**
 * Returns the maximum number of electives allowed based on tier:
 * - Free: 1 elective
 * - Standard: 2 electives
 * - Premium / School / Pilot: Infinity (all electives)
 */
function getMaxElectivesForTier(tier = 'free') {
  const clean = String(tier || 'free').toLowerCase();
  if (clean === 'free') return 1;
  if (clean === 'standard') return 2;
  return Infinity;
}

/**
 * Validates a student's chosen subjects according to tier stipulations:
 * - Free: Up to 2 compulsory subjects + 1 elective (max 3 subjects total)
 * - Standard: All compulsory subjects + up to 2 electives
 * - Premium / School / Pilot: All compulsory subjects + all electives
 */
function validateTierSubjectSelection({ subjects, tier = 'free', isSenior = false, curriculum = 'CBC' }) {
  if (!Array.isArray(subjects) || subjects.length === 0) {
    return { valid: false, error: 'Please select at least one subject.' };
  }

  const cleanTier = String(tier || 'free').toLowerCase();
  const curStr = String(curriculum || '').toUpperCase();
  const isBritish = curStr === 'BRITISH' || curStr === 'IGCSE' || curStr === 'CAMBRIDGE' || curStr === 'EDEXCEL';

  let compulsoryList;
  if (isBritish) {
    compulsoryList = BRITISH_COMPULSORY_SUBJECTS;
  } else if (isSenior) {
    compulsoryList = SS_COMPULSORY_SUBJECTS;
  } else {
    compulsoryList = JSS_COMPULSORY_SUBJECTS;
  }
  const compNorms = compulsoryList.map(s => s.toLowerCase());

  const selectedCompulsory = subjects.filter(s => compNorms.some(c => c === s.toLowerCase() || (isBritish && s.toLowerCase().includes(c))));
  const selectedElectives = subjects.filter(s => !selectedCompulsory.includes(s));

  if (cleanTier === 'free') {
    if (selectedElectives.length > 1) {
      return {
        valid: false,
        error: 'Free Plan allows only 1 elective subject. Please select 1 elective or upgrade to Standard for 2 electives (or Premium for all electives).'
      };
    }
    if (selectedCompulsory.length > 2) {
      return {
        valid: false,
        error: 'Free Plan allows up to 2 compulsory subjects. Please select up to 2 compulsory subjects or upgrade to Standard.'
      };
    }
    if (subjects.length > 3) {
      return {
        valid: false,
        error: 'Free Plan allows a maximum of 3 subjects (2 compulsory + 1 elective). Please select up to 3 subjects or upgrade to Standard.'
      };
    }
  } else if (cleanTier === 'standard') {
    if (selectedElectives.length > 2) {
      return {
        valid: false,
        error: isBritish
          ? `Standard Plan includes 2 core subjects (Maths & English) + up to 2 electives (4 subjects total with Cambridge Science Lab Bench). You selected ${selectedElectives.length} electives. Upgrade to Premium Exam Master to unlock all electives!`
          : `Standard Plan includes all compulsory subjects + up to 2 electives. You selected ${selectedElectives.length} electives. Upgrade to Premium to unlock all electives!`
      };
    }
    if (isBritish && subjects.length > 4) {
      return {
        valid: false,
        error: 'Standard Plan includes 2 core subjects + up to 2 electives (4 subjects total with Cambridge Science Lab Bench). Upgrade to Premium Exam Master to unlock all electives!'
      };
    }
  }

  // Premium, School, and Pilot: All compulsory + all electives are valid!
  return { valid: true, compulsoryCount: selectedCompulsory.length, electiveCount: selectedElectives.length };
}

/**
 * Returns the maximum number of subjects a student is allowed to choose based on their subscription tier
 * @param {string} tier - 'free' | 'standard' | 'premium'
 * @returns {number} max allowed subjects
 */
function getMaxSubjectsForTier(tier = 'free') {
  const cleanTier = String(tier || 'free').toLowerCase();
  if (cleanTier === 'free') {
    return 3; // Free Plan: 2 compulsory + 1 elective
  }
  // Standard: all compulsory + 2 electives
  // Premium, Pilot, and School tiers: All compulsory + all electives
  return Infinity;
}

// ════════════════════════════════════════════════════════════
// R2 AUTHORITATIVE PLAN CATALOGUE & LIFECYCLE (MILESTONE 2)
// Approved School-Calendar Packaging, VAT & Reminder Engine
// ════════════════════════════════════════════════════════════

// 1. British Curriculum Plan Catalogue (Checkpoint Years 7–9 & IGCSE Years 10–11)
const BRITISH_CATALOGUE = {
  trial: {
    days: 7,
    price: 0,
    currency: 'KES',
    name: '7-Day Free Trial',
    description: 'Full access to Cambridge Checkpoint & IGCSE with no payment details required'
  },
  monthly: {
    price: 3500,
    priceUsd: 29,
    currencyDisplay: "KES 3,500 / $29",
    currency: 'KES',
    days: 30,
    name: 'British Monthly',
    description: 'Full monthly access to Checkpoint and IGCSE'
  },
  termly: {
    price: 8900,
    priceUsd: 69,
    currencyDisplay: "KES 8,900 / $69",
    currency: 'KES',
    days: 105,
    recommended: true,
    name: 'British Termly',
    badge: 'Most Popular / Recommended',
    description: 'Prepaid termly access (105 days, approx 15 weeks)'
  },
    annual: {
    price: 24500,
    priceUsd: 189,
    currencyDisplay: "KES 24,500 / $189",
    currency: 'KES',
    days: 365,
    name: 'British Annual',
    badge: 'Best Value',
    description: 'Full academic year access (365 days)'
  },
  examSeasonPass: {
    price: 12900,
    priceUsd: 99,
    currencyDisplay: "KES 12,900 / $99",
    currency: 'KES',
    days: 181,
    name: 'Exam Season Pass',
    description: 'Jan 1 to end of May/June series'
  }
};
// Aliases for compatibility
BRITISH_CATALOGUE.exam_season_pass = BRITISH_CATALOGUE.examSeasonPass;
BRITISH_CATALOGUE.exam_pass = BRITISH_CATALOGUE.examSeasonPass;
BRITISH_CATALOGUE.priceMonthly = 3500;
BRITISH_CATALOGUE.priceTermly = 8900;
BRITISH_CATALOGUE.priceAnnual = 24500;
BRITISH_CATALOGUE.priceExamSeason = 12900;
BRITISH_CATALOGUE.trialDays = 7;
const BRITISH_PRICING = BRITISH_CATALOGUE;

// 2. CBC / CBE Curriculum Plan Catalogue (Grades 6–12)
const CBC_CATALOGUE = {
  monthly: {
    price: 499,
    priceUsd: 5,
    currencyDisplay: "KES 499 / $5",
    currency: 'KES',
    days: 30,
    name: 'CBC Monthly',
    description: 'Full monthly access to CBC JSS & Senior School'
  },
  termly: {
    price: 1199,
    priceUsd: 10,
    currencyDisplay: "KES 1,199 / price: 1199,0",
    currency: 'KES',
    days: 105,
    recommended: true,
    name: 'CBC Termly',
    badge: 'Recommended',
    description: 'Prepaid termly access (105 days, approx 15 weeks)'
  },
  annual: {
    price: 3499,
    priceUsd: 29,
    currencyDisplay: "KES 3,499 / $29",
    currency: 'KES',
    days: 365,
    name: 'CBC Annual',
    badge: 'Best Value',
    description: 'Full academic year access (365 days)'
  },
  bootcampPass: {
    price: 499,
    currency: 'KES',
    days: 21,
    name: 'Holiday Bootcamp Pass',
    description: '3 weeks intensive revision (April, August, Nov–Dec holidays)'
  }
};
// Aliases for compatibility
CBC_CATALOGUE.holidayBootcampPass = CBC_CATALOGUE.bootcampPass;
CBC_CATALOGUE.bootcamp = CBC_CATALOGUE.bootcampPass;
CBC_CATALOGUE.priceMonthly = 499;
CBC_CATALOGUE.priceTermly = 1199;
CBC_CATALOGUE.priceAnnual = 3499;
CBC_CATALOGUE.priceBootcamp = 499;
const CBC_PRICING = CBC_CATALOGUE;

// 3. B2B Institutional School Pricing
const B2B_PRICING = {
  britishPilotPrice: 0,
  cbcLabLicenceTier1: 45000,
  cbcLabLicenceTier2: 75000,
  feeSlipLevy: 600,
  schoolRebate: 100,
  descriptions: {
    britishPilot: '1-term British pilot trial (KES 0)',
    cbcLabLicenceTier1: 'CBC school lab licence Tier 1 (up to 500 pupils) — KES 45,000/term',
    cbcLabLicenceTier2: 'CBC school lab licence Tier 2 (500+ pupils) — KES 75,000/term',
    feeSlipLevy: 'B2B2C fee-slip levy: KES 600 per pupil per term',
    schoolRebate: 'School rebate: KES 100 per pupil per term returned to school'
  }
};

// 4. Goldilocks 3-Option Presentation
const GOLDILOCKS_PRESENTATION = {
  british: [
    { period: 'monthly', price: 3500, currency: 'KES', recommended: false, name: 'Monthly', billingCycle: 'monthly', badge: null },
    { period: 'termly', price: 8900, currency: 'KES', recommended: true, badge: 'Most Popular / Recommended', name: 'Termly', billingCycle: 'termly' },
    { period: 'annual', price: 24500, currency: 'KES', recommended: false, badge: 'Best Value', name: 'Annual', billingCycle: 'annual' }
  ],
  cbc: [
    { period: 'monthly', price: 499, currency: 'KES', recommended: false, name: 'Monthly', billingCycle: 'monthly', badge: null },
    { period: 'termly', price: 1199, currency: 'KES', recommended: true, badge: 'Recommended', name: 'Termly', billingCycle: 'termly' },
    { period: 'annual', price: 3499, currency: 'KES', recommended: false, badge: 'Best Value', name: 'Annual', billingCycle: 'annual' }
  ]
};

// 5. VAT Breakdown Calculation (16% Kenya VAT, VAT-inclusive pricing)
function calculateVatBreakdown(grossAmount) {
  const grossTotal = Number(grossAmount) || 0;
  const netBase = Math.round((grossTotal / 1.16) * 100) / 100;
  const vatAmount = Math.round((grossTotal - netBase) * 100) / 100;
  return {
    grossTotal,
    netBase,
    vatAmount,
    vatRate: 0.16,
    isInclusive: true
  };
}

// 6. Subscription Lifecycle & 3-Day Grace Period Engine
function calculateSubscriptionLifecycle({ startDate = new Date(), planPeriod = 'termly', curriculum = 'CBC' } = {}) {
  const startsAt = startDate instanceof Date ? new Date(startDate.getTime()) : new Date(startDate);
  const normPeriod = String(planPeriod || 'termly').toLowerCase().trim();

  let days = 105; // Standard termly (15 weeks)
  if (normPeriod === 'monthly' || normPeriod === 'month') {
    days = 30;
  } else if (normPeriod === 'termly' || normPeriod === 'term') {
    days = 105;
  } else if (normPeriod === 'annual' || normPeriod === 'yearly' || normPeriod === 'year') {
    days = 365;
  } else if (normPeriod === 'trial' || normPeriod === 'free_trial' || normPeriod === 'trial_7d') {
    days = 7;
  } else if (
    normPeriod === 'bootcamp' ||
    normPeriod === 'bootcamppass' ||
    normPeriod === 'holidaybootcamppass' ||
    normPeriod === 'holiday_bootcamp' ||
    normPeriod === 'holiday_bootcamp_pass'
  ) {
    days = 21;
  } else if (
    normPeriod === 'examseasonpass' ||
    normPeriod === 'exam_season_pass' ||
    normPeriod === 'exam_pass'
  ) {
    days = 181;
  }

  const expiresAt = new Date(startsAt.getTime() + days * 24 * 60 * 60 * 1000);
  const gracePeriodEndsAt = new Date(expiresAt.getTime() + 3 * 24 * 60 * 60 * 1000); // exactly 3 days after expiry

  return {
    startsAt,
    expiresAt,
    gracePeriodEndsAt,
    durationDays: days,
    graceDays: 3
  };
}

// 7. Automated Renewal Reminder Schedule (4 stages)
function getReminderSchedule(expiresAt) {
  const expiryDate = expiresAt instanceof Date ? expiresAt : new Date(expiresAt);
  const expiryMs = expiryDate.getTime();
  const ONE_DAY_MS = 86400000;

  return [
    { stage: '7d_before', sendAt: new Date(expiryMs - 7 * ONE_DAY_MS).toISOString() },
    { stage: '3d_before', sendAt: new Date(expiryMs - 3 * ONE_DAY_MS).toISOString() },
    { stage: '1d_before', sendAt: new Date(expiryMs - 1 * ONE_DAY_MS).toISOString() },
    { stage: '1d_grace',  sendAt: new Date(expiryMs + 1 * ONE_DAY_MS).toISOString() }
  ];
}

// 8. Family Pricing Proposal
const FAMILY_PRICING_PROPOSAL = {
  recommendedModel: 'Model B (Flat Multi-Child Bundle)',
  options: [
    {
      model: 'A',
      name: 'Add-on (+50% per extra child)',
      cbcTermly: 1798,
      britishTermly: 13350,
      description: 'Primary learner pays full price; additional siblings receive a 50% discount per term.'
    },
    {
      model: 'B',
      name: 'Flat Multi-Child Bundle',
      cbcTermly: 1999,
      britishTermly: 14900,
      recommended: true,
      description: 'Single flat rate covering up to 3 siblings under one household with full access.'
    },
    {
      model: 'C',
      name: 'Graduated Sibling Tier',
      cbcTermly: 2199,
      britishTermly: 16500,
      description: 'Tiered multi-child subscription with declining marginal cost for 2nd and 3rd children.'
    }
  ],
  rationale: 'Matches Kenyan parent mental model for sibling school discounts while preventing separate sku churn'
};


/**
 * Returns the maximum number of spaces a student can save per day based on tier:
 * - Free: 1 space/day
 * - Standard: 5 spaces/day
 * - Pilot / School: 5 spaces/day
 * - Premium: Infinity (unlimited)
 */
function getDailySavedSpacesLimitForTier(tier = 'free') {
  const clean = String(tier || 'free').toLowerCase();
  if (clean === 'free') return 1;
  if (clean === 'standard') return 5;
  if (clean === 'pilot') return 5;
  if (clean === 'school' || clean === 'igcse_school') return 5;
  return Infinity;
}


// Supported currencies across local and international payment gateways
const SUPPORTED_CURRENCIES = ['KES', 'USD'];

module.exports = {
  SUPPORTED_CURRENCIES,
  getDailySavedSpacesLimitForTier,
  PRICING_TIERS,
  RATE_CARDS,
  FAMILY_BUNDLES,
  resolvePricingForStudent,
  getMaxSubjectsForTier,
  getMaxElectivesForTier,
  isCompulsorySubject,
  isVirtualLabUnlockedForTier,
  validateTierSubjectSelection,
  JSS_COMPULSORY_SUBJECTS,
  SS_COMPULSORY_SUBJECTS,
  BRITISH_COMPULSORY_SUBJECTS,
  ADDITIONAL_CHILD_ADDON,
  FEATURE_NAMING,
  getKnowYourChildGate,
  pilotConfig: require('./pilotConfig'),

  // Milestone 2 R2 Exports
  BRITISH_CATALOGUE,
  BRITISH_PRICING,
  CBC_CATALOGUE,
  CBC_PRICING,
  B2B_PRICING,
  GOLDILOCKS_PRESENTATION,
  calculateVatBreakdown,
  calculateSubscriptionLifecycle,
  getReminderSchedule,
  FAMILY_PRICING_PROPOSAL
};

