// ════════════════════════════════════════════════════════════
// pilotConfig.js — Elingu School & Parent Pilot System
// Stipulated time cohorts with automatic expiration
// ════════════════════════════════════════════════════════════

// These built-in codes are public (they appear in old documents), so anyone who has seen them can use them.
// To run pilots safely, set ELINGU_PILOT_CODES (see loadRegistry below): the built-in list is then ignored.
const BUILT_IN_REGISTRY = {
  // School Cohorts (Institutional / JSS deployments)
  'PILOT2026': {
    code: 'PILOT2026',
    type: 'school',
    cohortName: 'Kenya JSS 200-Learner Pilot Cohort',
    durationDays: 60,
    features: ['All CBE subjects unlimited', 'Unlimited daily turns', 'Classroom & Teacher Insights', 'SBA documentation']
  },
  'JSS-PILOT': {
    code: 'JSS-PILOT',
    type: 'school',
    cohortName: 'Junior Secondary School Partner Trial',
    durationDays: 60,
    features: ['All CBE subjects unlimited', 'Unlimited daily turns', 'Teacher report']
  },
  'ELINGU200': {
    code: 'ELINGU200',
    type: 'school',
    cohortName: 'Elingu Research & Pedagogical Cohort',
    durationDays: 90,
    features: ['All CBE subjects unlimited', 'Unlimited daily turns', 'Full SBA reporting']
  },

  // Individual Parent Trial Cohorts
  'PARENT2026': {
    code: 'PARENT2026',
    type: 'parent',
    cohortName: 'Parent Early Access Pilot Pass',
    durationDays: 30,
    features: ['All CBE subjects unlimited', 'Unlimited daily turns', 'Conversational weekly parent summary']
  },
  'TRIAL30': {
    code: 'TRIAL30',
    type: 'parent',
    cohortName: '30-Day Family Full Access Pilot',
    durationDays: 30,
    features: ['All CBE subjects unlimited', 'Unlimited daily turns']
  },
  'FAMILY60': {
    code: 'FAMILY60',
    type: 'parent',
    cohortName: '60-Day Extended Family Pilot',
    durationDays: 60,
    features: ['All CBE subjects unlimited', 'Unlimited daily turns']
  }
};

/**
 * ELINGU_PILOT_CODES is a JSON object, for example
 *   {"KAMAU-7XQ2":{"type":"school","cohortName":"Kamau JSS","durationDays":60,"features":[]}}
 * When it is set, only those codes work. When it is not set, the built-in list above is used (and a warning is printed).
 */
function loadRegistry() {
  const raw = process.env.ELINGU_PILOT_CODES;
  if (!raw) return { registry: BUILT_IN_REGISTRY, custom: false };
  try {
    const parsed = JSON.parse(raw);
    const out = {};
    Object.keys(parsed).forEach(k => { out[k.trim().toUpperCase()] = Object.assign({ code: k.trim().toUpperCase(), type: 'parent', durationDays: 30, features: [] }, parsed[k], { code: k.trim().toUpperCase() }); });
    return { registry: out, custom: true };
  } catch (e) {
    console.error('[pilotConfig] ELINGU_PILOT_CODES is not valid JSON, so NO pilot codes will work:', e.message);
    return { registry: {}, custom: true };
  }
}
const loaded = loadRegistry();
const PILOT_REGISTRY = loaded.registry;
if (!loaded.custom && process.env.NODE_ENV === 'production') {
  console.warn('[pilotConfig] WARNING: the built-in pilot codes (PILOT2026, PARENT2026, TRIAL30 ...) are active. Set ELINGU_PILOT_CODES to your own private codes.');
}

/**
 * Validate a pilot access code (case-insensitive)
 * Returns { valid: true, pilotData, expiresAt } or { valid: false, error }
 */
function verifyPilotCode(inputCode) {
  const clean = (inputCode || '').trim().toUpperCase();
  if (!clean) {
    return { valid: false, error: 'Pilot code cannot be empty.' };
  }

  const entry = PILOT_REGISTRY[clean];
  if (!entry) {
    return { valid: false, error: 'Invalid pilot code. Please verify the code provided for your school or family cohort.' };
  }

  const durationDays = entry.durationDays || 30;
  const activatedAt = new Date();
  const expiresAt = new Date(activatedAt.getTime() + durationDays * 24 * 60 * 60 * 1000);

  return {
    valid: true,
    code: clean,
    type: entry.type,
    cohortName: entry.cohortName,
    durationDays,
    activatedAt: activatedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    features: entry.features
  };
}

/**
 * Checks whether an entity (student or parent) has an active, unexpired pilot
 */
function isPilotActive(entity) {
  if (!entity || !entity.pilotCode || !entity.pilotExpiresAt) return false;
  const now = new Date();
  const expiry = new Date(entity.pilotExpiresAt);
  return now < expiry;
}

/**
 * Get human-readable status for a pilot
 */
function getPilotStatus(entity) {
  if (!entity || !entity.pilotCode) {
    return { isPilot: false, active: false, statusText: 'No pilot code active' };
  }

  const now = new Date();
  const expiry = entity.pilotExpiresAt ? new Date(entity.pilotExpiresAt) : null;

  if (!expiry || now >= expiry) {
    return {
      isPilot: true,
      active: false,
      code: entity.pilotCode,
      expired: true,
      statusText: `Pilot expired on ${expiry ? expiry.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }) : 'unknown date'}`
    };
  }

  const diffMs = expiry - now;
  const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return {
    isPilot: true,
    active: true,
    code: entity.pilotCode,
    cohortName: entity.pilotCohortName || entity.pilotCode,
    daysLeft,
    daysRemaining: daysLeft,
    expiresAt: entity.pilotExpiresAt,
    statusText: `Active Pilot (${entity.pilotCohortName || entity.pilotCode}) — ${daysLeft} day${daysLeft === 1 ? '' : 's'} remaining (valid until ${expiry.toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' })})`
  };
}

module.exports = {
  PILOT_REGISTRY,
  verifyPilotCode,
  isPilotActive,
  getPilotStatus
};
