// ════════════════════════════════════════════════════════════
// ELINGU PAYMENT STORE — Immutable Idempotent Payment Ledger
// Single Source of Price Truth & Payment Gatekeeping
// ════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const authUtils = require('./authUtils');
const pricingConfig = require('./pricingConfig');

const { DATA_DIR } = require('./dataDir');
const PAYMENTS_FILE = path.join(DATA_DIR, 'payments.json');
const LEGACY_PENDING_FILE = path.join(DATA_DIR, 'pending_payments.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Canonical R2 Kenya School-Calendar Prepaid Pricing Table (VAT-inclusive in KES)

const CANONICAL_PLANS_USD = {
  BRITISH: {
    trial: { amount: 0, days: 7, label: '7-Day Free Trial', description: 'Full access, no payment details required' },
    monthly: { amount: 29, days: 30, label: 'British Monthly ($29)', description: 'Monthly access to Checkpoint and IGCSE' },
    termly: { amount: 69, days: 105, label: 'British Termly ($69)', description: 'Full school term prepaid access' },
    annual: { amount: 189, days: 365, label: 'British Annual ($189)', description: 'Full academic year access' },
    exam_pass: { amount: 99, days: 181, label: 'Exam Season Pass ($99)', description: 'Jan 1 to end of May/June series' },
    exam_season_pass: { amount: 99, days: 181, label: 'Exam Season Pass ($99)', description: 'Jan 1 to end of May/June series' }
  },
  CBC: {
    monthly: { amount: 5, days: 30, label: 'CBC Monthly ($5)', description: 'Monthly access to CBC JSS & Senior School' },
    termly: { amount: 10, days: 105, label: 'CBC Termly ($10)', description: 'Full school term prepaid access' },
    annual: { amount: 29, days: 365, label: 'CBC Annual ($29)', description: 'Full academic year access' },
    bootcamp: { amount: 5, days: 21, label: 'Holiday Bootcamp Pass ($5)', description: '3 weeks intensive revision' },
    holiday_bootcamp: { amount: 5, days: 21, label: 'Holiday Bootcamp Pass ($5)', description: '3 weeks intensive revision' }
  },
  FAMILY_BUNDLES: {
    CBC: {
      monthly: { amount: 19, label: 'CBC Family Monthly ($19)', description: 'Up to 3 learners on CBC' },
      termly: { amount: 15, label: 'CBC Family Termly ($15)', description: 'Model B flat multi-child bundle for up to 3 learners' },
      annual: { amount: 149, label: 'CBC Family Annual ($149)', description: 'Academic year family access' }
    },
    BRITISH: {
      monthly: { amount: 59, label: 'British Family Monthly ($59)', description: 'Up to 3 learners on British/IGCSE' },
      termly: { amount: 115, label: 'British Family Termly ($115)', description: 'Model B flat multi-child bundle for up to 3 learners' },
      annual: { amount: 599, label: 'British Family Annual ($599)', description: 'Academic year British family access' }
    }
  }
};

const CANONICAL_PLANS = {
  BRITISH: {
    trial: { amount: 0, days: 7, label: '7-Day Free Trial', description: 'Full access, no payment details required' },
    monthly: { amount: 3500, days: 30, label: 'British Monthly', description: 'Monthly access to Checkpoint and IGCSE' },
    termly: { amount: 8900, days: 105, label: 'British Termly (Recommended)', description: 'Full school term prepaid access' },
    annual: { amount: 24500, days: 365, label: 'British Annual', description: 'Full academic year access' },
    exam_pass: { amount: 12900, days: 181, label: 'Exam Season Pass', description: 'Jan 1 to end of May/June series' },
    exam_season_pass: { amount: 12900, days: 181, label: 'Exam Season Pass', description: 'Jan 1 to end of May/June series' }
  },
  CBC: {
    monthly: { amount: 499, days: 30, label: 'CBC Monthly', description: 'Monthly access to CBC JSS & Senior School' },
    termly: { amount: 1199, days: 105, label: 'CBC Termly (Recommended)', description: 'Full school term prepaid access' },
    annual: { amount: 3499, days: 365, label: 'CBC Annual', description: 'Full academic year access' },
    bootcamp: { amount: 499, days: 21, label: 'Holiday Bootcamp Pass', description: '3 weeks intensive revision (April/Aug/Nov-Dec)' },
    holiday_bootcamp: { amount: 499, days: 21, label: 'Holiday Bootcamp Pass', description: '3 weeks intensive revision (April/Aug/Nov-Dec)' }
  },
  FAMILY_BUNDLES: {
    CBC: {
      monthly: { amount: 2499, label: 'CBC Family Monthly', description: 'Up to 3 learners on CBC' },
      termly: { amount: 1999, label: 'CBC Family Termly (Recommended)', description: 'Model B flat multi-child bundle for up to 3 learners' },
      annual: { amount: 19990, label: 'CBC Family Annual', description: 'Academic year family access' }
    },
    BRITISH: {
      monthly: { amount: 7999, label: 'British Family Monthly', description: 'Up to 3 learners on British/IGCSE' },
      termly: { amount: 14900, label: 'British Family Termly (Recommended)', description: 'Model B flat multi-child bundle for up to 3 learners' },
      annual: { amount: 79999, label: 'British Family Annual', description: 'Academic year British family access' }
    }
  }
};

// All reads/writes of data/*.json go through secureJson: personal-data fields are encrypted at rest
// (see cryptoVault.js) and decrypted again on read, so the rest of this file works with plain values.
function loadJson(filePath, defaultValue = {}) {
  return require('./secureJson').readJson(filePath, defaultValue, 'paymentStore');
}

function saveJson(filePath, data) {
  try {
    require('./secureJson').writeJson(filePath, data, 'paymentStore');
  } catch (err) {
    console.error(`[paymentStore] Error saving ${filePath}:`, err.message);
  }
}

// In-memory state with disk persistence
let ledgerState = {
  intents: [],
  completedPayments: [],
  receiptIndex: {},     // receipt -> paymentId
  consumedReceipts: {}  // receipt -> subscriptionActivationDetails
};

function initLedger() {
  const diskData = loadJson(PAYMENTS_FILE, null);
  if (diskData && Array.isArray(diskData.intents)) {
    ledgerState.intents = diskData.intents || [];
    ledgerState.completedPayments = diskData.completedPayments || [];
    ledgerState.receiptIndex = diskData.receiptIndex || {};
    ledgerState.consumedReceipts = diskData.consumedReceipts || {};
  } else {
    // Seed from legacy pending_payments.json if it exists
    const legacy = loadJson(LEGACY_PENDING_FILE, { payments: [] });
    ledgerState.intents = [];
    ledgerState.completedPayments = [];
    ledgerState.receiptIndex = {};
    ledgerState.consumedReceipts = {};

    if (Array.isArray(legacy.payments)) {
      legacy.payments.forEach(p => {
        const id = p.checkoutRequestId || ('pi_legacy_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6));
        const entry = {
          id,
          orderRef: p.transactionRef || ('ELG_' + Date.now().toString(36).toUpperCase()),
          provider: 'daraja',
          checkoutRequestId: p.checkoutRequestId || null,
          transactionRef: p.transactionRef || null,
          email: (p.email || '').toLowerCase().trim(),
          studentId: p.studentId || null,
          curriculum: 'CBC',
          planPeriod: p.billingCycle || 'monthly',
          tier: p.tier || 'standard',
          amount: p.amount || 0,
          currency: isUsd ? 'USD' : 'KES',
          status: p.status || 'pending',
          createdAt: p.createdAt || new Date().toISOString(),
          completedAt: p.completedAt || null,
          providerReceipt: p.receipt || null,
          paidAmount: p.paidAmount || p.amount || 0,
          replayedCount: 0
        };
        if (entry.status === 'completed' && entry.providerReceipt) {
          ledgerState.completedPayments.push(entry);
          ledgerState.receiptIndex[entry.providerReceipt.toUpperCase()] = entry.id;
        } else {
          ledgerState.intents.push(entry);
        }
      });
    }
    persistLedger();
  }
}

function persistLedger() {
  saveJson(PAYMENTS_FILE, {
    intents: ledgerState.intents,
    completedPayments: ledgerState.completedPayments,
    receiptIndex: ledgerState.receiptIndex,
    consumedReceipts: ledgerState.consumedReceipts,
    lastUpdated: new Date().toISOString()
  });

  // Mirror to legacy pending_payments.json without 50-item limit for backward-compatibility
  const allActive = [
    ...ledgerState.completedPayments.slice(-50).map(p => ({
      checkoutRequestId: p.checkoutRequestId,
      transactionRef: p.transactionRef,
      email: p.email,
      studentId: p.studentId,
      tier: p.tier,
      billingCycle: p.planPeriod,
      amount: p.amount,
      phone: p.phone,
      status: p.status,
      receipt: p.providerReceipt,
      paidAmount: p.paidAmount,
      createdAt: p.createdAt,
      completedAt: p.completedAt
    })),
    ...ledgerState.intents.slice(-50).map(p => ({
      checkoutRequestId: p.checkoutRequestId,
      transactionRef: p.transactionRef,
      email: p.email,
      studentId: p.studentId,
      tier: p.tier,
      billingCycle: p.planPeriod,
      amount: p.amount,
      phone: p.phone,
      status: p.status,
      createdAt: p.createdAt
    }))
  ];
  saveJson(LEGACY_PENDING_FILE, { payments: allActive });
}

// ── SERVER-SIDE PRICE AUTHORITY ─────────────────────────────
/**
 * Computes canonical server-authoritative price.
 * Supports both options object and positional arguments:
 * calculateExpectedPrice({ curriculum, planPeriod, tier, isFamily, childrenCount, studentId })
 * calculateExpectedPrice(curriculum, planPeriod, tier, isFamily, childrenCount)
 * Client-supplied price/amount is NEVER trusted or used.
 */
function calculateExpectedPrice(options = {}, maybePlanPeriod, maybeTier, maybeIsFamily, maybeChildrenCount) {
  let opt = {};
  if (typeof options === 'string') {
    opt = {
      curriculum: options,
      planPeriod: maybePlanPeriod,
      tier: maybeTier,
      isFamily: maybeIsFamily,
      childrenCount: maybeChildrenCount
    };
  } else if (options && typeof options === 'object') {
    opt = options;
  }

  let { curriculum, planPeriod, period, billingCycle, tier, studentId, childrenCount, student, isFamily: optIsFamily, family: optFamily, isFamilyBundle } = opt;

  // Currency selection (KES default, USD supported)
  const reqCurrency = String(opt.currency || (opt.metadata && opt.metadata.currency) || 'KES').toUpperCase().trim();
  const isUsd = (reqCurrency === 'USD');
  const tableSource = isUsd ? CANONICAL_PLANS_USD : CANONICAL_PLANS;

  // Resolve curriculum
  let curr = String(curriculum || '').toUpperCase().trim();
  if (!curr && !student && studentId && studentId !== 'all_cbe' && studentId !== 'all_igcse') {
    try {
      const studentStore = require('./studentStore');
      student = studentStore.getStudentById(studentId);
    } catch(e) {}
  }
  if (!curr && student && student.curriculum) {
    curr = String(student.curriculum).toUpperCase().trim();
  }
  if (curr.includes('BRITISH') || curr.includes('IGCSE') || curr.includes('CAMBRIDGE') || curr.includes('EDEXCEL')) {
    curr = 'BRITISH';
  } else {
    curr = 'CBC';
  }

  // Resolve plan period
  let p = String(planPeriod || period || billingCycle || '').toLowerCase().trim();
  if (p === 'annual' || p === 'yearly' || p === 'year') p = 'annual';
  else if (p === 'term' || p === 'termly') p = 'termly';
  else if (p === 'exam' || p === 'exam_pass' || p === 'exam_season_pass') p = 'exam_pass';
  else if (p === 'bootcamp' || p === 'holiday' || p === 'holiday_bootcamp') p = 'bootcamp';
  else if (p === 'trial' || p === 'free_trial') p = 'trial';
  else p = 'monthly';

  // Check Family Bundle
  const explicitFamily = Boolean(
    optIsFamily ||
    optFamily ||
    isFamilyBundle ||
    (opt.metadata && (opt.metadata.isFamily || opt.metadata.family || opt.metadata.isFamilyBundle)) ||
    studentId === 'all_cbe' ||
    studentId === 'all_igcse' ||
    studentId === 'family_cbe' ||
    studentId === 'family_igcse'
  );
  const count = parseInt(childrenCount || (opt.metadata && opt.metadata.childrenCount) || (explicitFamily ? 3 : 1), 10);
  const isFamily = explicitFamily || count >= 2;

  if (isFamily) {
    const familyTable = tableSource.FAMILY_BUNDLES[curr] || tableSource.FAMILY_BUNDLES.CBC;
    const plan = familyTable[p] || familyTable.termly || familyTable.monthly;
    return {
      amount: plan.amount,
      currency: isUsd ? 'USD' : 'KES',
      curriculum: curr,
      planPeriod: p,
      tier: 'premium',
      tierLabel: plan.label,
      description: plan.description,
      isFamily: true,
      childrenCount: Math.max(count, 2),
      durationDays: p === 'annual' ? 365 : (p === 'termly' ? 105 : 30)
    };
  }

  // Standard student plan
  const currTable = tableSource[curr] || tableSource.CBC;
  const plan = currTable[p] || currTable.termly || currTable.monthly;

  // Support legacy studentStore student lookup if needed (e.g. Senior School / JSS distinctions in legacy tiers)
  if (student && typeof student === 'object' && pricingConfig.resolvePricingForStudent && (!p || p === 'monthly' || p === 'annual') && !['termly', 'exam_pass', 'bootcamp'].includes(p)) {
    try {
      const resolved = pricingConfig.resolvePricingForStudent(student, tier || 'standard', p);
      if (resolved && resolved.amount) {
        return {
          amount: resolved.amount,
          currency: 'KES',
          curriculum: curr,
          planPeriod: p,
          tier: resolved.tier || tier || 'standard',
          tierLabel: resolved.tierLabel || plan.label,
          description: resolved.description || plan.description,
          isFamily: false,
          durationDays: p === 'annual' ? 365 : 30
        };
      }
    } catch (e) {}
  }

  return {
    amount: plan.amount,
    currency: isUsd ? 'USD' : 'KES',
    curriculum: curr,
    planPeriod: p,
    tier: curr === 'BRITISH' ? 'premium' : (tier || 'standard'),
    tierLabel: plan.label,
    description: plan.description,
    isFamily: false,
    durationDays: plan.days || 30
  };
}

// ── INTENT & PAYMENT LEDGER OPERATIONS ──────────────────────

/**
 * Creates a persistent payment intent.
 * Automatically computes server-authoritative amount from pricingConfig.
 */
function createIntent(params = {}) {
  if (!params) return null;
  const p = params;
  const email = (p.email || '').toLowerCase().trim();
  if (!email) {
    throw new Error('Payer email is required to create a payment intent.');
  }

  // Idempotency check: prevent duplicate intent IDs or shadowing existing completed payments
  const targetId = p.intentId || p.id;
  if (targetId) {
    const existing = findIntent({ intentId: targetId });
    if (existing) {
      return existing;
    }
  }

  // Existing check: avoid duplicate pending intents for same checkoutRequestId
  if (p.checkoutRequestId) {
    const existing = findIntent({ checkoutRequestId: p.checkoutRequestId });
    if (existing) {
      return existing;
    }
  }

  // Idempotency check: avoid duplicate transactionRef
  if (p.transactionRef) {
    const existing = findIntent({ transactionRef: p.transactionRef });
    if (existing) {
      return existing;
    }
  }

  const expectedPricing = calculateExpectedPrice(p);
  const intentId = targetId || ('pi_' + Date.now() + '_' + crypto.randomBytes(6).toString('hex'));
  const orderRef = p.transactionRef || ('ELG_' + Date.now().toString(36).toUpperCase() + '_' + crypto.randomBytes(2).toString('hex').toUpperCase());

  const intent = {
    id: intentId,
    orderRef,
    provider: (p.provider || p.paymentProvider || 'daraja').toLowerCase(),
    checkoutRequestId: p.checkoutRequestId || null,
    transactionRef: p.transactionRef || orderRef,
    email,
    phone: p.phone || p.phoneNumber || null,
    studentId: p.studentId || null,
    curriculum: expectedPricing.curriculum,
    planPeriod: expectedPricing.planPeriod,
    tier: expectedPricing.tier,
    tierLabel: expectedPricing.tierLabel,
    amount: expectedPricing.amount, // Authoritative price
    currency: expectedPricing.currency || (String(p.currency || 'KES').toUpperCase() === 'USD' ? 'USD' : 'KES'),
    status: 'pending',
    replayedCount: 0,
    isFamily: expectedPricing.isFamily || false,
    childrenCount: expectedPricing.childrenCount || (expectedPricing.isFamily ? 3 : 1),
    metadata: p.metadata || {},
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24-hour intent validity
  };

  ledgerState.intents.unshift(intent);
  persistLedger();
  return intent;
}

/**
 * Updates an existing intent (e.g. attaching CheckoutRequestID from Daraja STK Push).
 */
function updateIntent(intentIdOrRef, updates = {}) {
  const intent = findIntent({ intentId: intentIdOrRef, checkoutRequestId: intentIdOrRef, transactionRef: intentIdOrRef });
  if (!intent) return null;

  if (updates.checkoutRequestId) intent.checkoutRequestId = updates.checkoutRequestId;
  if (updates.transactionRef) intent.transactionRef = updates.transactionRef;
  if (updates.phone) intent.phone = updates.phone;
  if (updates.status) intent.status = updates.status;
  if (updates.metadata) intent.metadata = { ...intent.metadata, ...updates.metadata };

  persistLedger();
  return intent;
}

function _findInMemory(query = {}) {
  const q = query || {};
  const { intentId, id, checkoutRequestId, transactionRef, orderRef, email } = q;

  // Search completedPayments first so completed payments cannot be shadowed by unconfirmed pending intents
  const completedMatch = ledgerState.completedPayments.find(p => {
    if (intentId && p.id === intentId) return true;
    if (id && p.id === id) return true;
    if (checkoutRequestId && p.checkoutRequestId === checkoutRequestId) return true;
    if (transactionRef && (p.transactionRef === transactionRef || p.orderRef === transactionRef)) return true;
    if (orderRef && (p.orderRef === orderRef || p.transactionRef === orderRef)) return true;
    return false;
  });
  if (completedMatch) return completedMatch;

  return ledgerState.intents.find(i => {
    if (intentId && i.id === intentId) return true;
    if (id && i.id === id) return true;
    if (checkoutRequestId && i.checkoutRequestId === checkoutRequestId) return true;
    if (transactionRef && (i.transactionRef === transactionRef || i.orderRef === transactionRef)) return true;
    if (orderRef && (i.orderRef === orderRef || i.transactionRef === orderRef)) return true;
    return false;
  }) || null;
}

/**
 * Find intent by ID, CheckoutRequestID, or Order/Transaction Ref.
 */
function findIntent(query = {}) {
  if (!query) return null;
  const match = _findInMemory(query);
  if (match) return match;

  initLedger();
  return _findInMemory(query);
}

/**
 * Single-use receipt guarantee.
 * Checks whether this provider receipt has already been used for any completed transaction.
 */
function isReceiptUsed(receipt) {
  if (!receipt) return false;
  const clean = String(receipt).trim().toUpperCase();
  if (ledgerState.receiptIndex[clean]) return true;
  if (ledgerState.completedPayments.some(p => p.providerReceipt && p.providerReceipt.toUpperCase() === clean)) return true;

  initLedger();
  if (ledgerState.receiptIndex[clean]) return true;
  return ledgerState.completedPayments.some(p => p.providerReceipt && p.providerReceipt.toUpperCase() === clean);
}

/**
 * Checks whether a receipt has already been consumed to activate a subscription.
 */
function isReceiptConsumed(receipt) {
  if (!receipt) return false;
  const clean = String(receipt).trim().toUpperCase();
  if (ledgerState.consumedReceipts[clean]) return true;
  initLedger();
  return Boolean(ledgerState.consumedReceipts[clean]);
}

/**
 * Mark a completed payment receipt as consumed by a subscription activation.
 */
function markReceiptConsumed(receipt, activationDetails = {}) {
  if (!receipt) return;
  const clean = String(receipt).trim().toUpperCase();
  ledgerState.consumedReceipts[clean] = {
    ...activationDetails,
    consumedAt: new Date().toISOString()
  };
  persistLedger();
}

/**
 * Completes a payment intent upon verified provider callback/webhook.
 * Enforces:
 * 1. Single-use receipt guarantee (prevents replay / duplicate credit)
 * 2. Exact amount matching (prevents underpayment tampering)
 * 3. Currency matching ('KES')
 */
function completePayment(params = {}) {
  const p = params || {};
  const {
    intentId,
    checkoutRequestId,
    transactionRef,
    provider,
    providerReceipt,
    paidAmount,
    currency,
    rawPayload
  } = p;

  const intent = findIntent({ intentId, checkoutRequestId, transactionRef });
  if (!intent) {
    return {
      success: false,
      error: 'Payment intent not found in ledger.',
      code: 'INTENT_NOT_FOUND'
    };
  }

  const receipt = String(providerReceipt || '').trim().toUpperCase();
  if (!receipt) {
    return {
      success: false,
      error: 'Missing provider receipt reference.',
      code: 'MISSING_RECEIPT'
    };
  }

  // 1. Single-Use Receipt / Replay Prevention Check
  if (isReceiptUsed(receipt)) {
    intent.replayedCount = (intent.replayedCount || 0) + 1;
    persistLedger();
    return {
      success: false,
      replayed: true,
      error: `Provider receipt ${receipt} has already been used. Duplicate payment rejected.`,
      code: 'RECEIPT_ALREADY_USED',
      payment: intent
    };
  }

  // 2. Currency Validation
  const cur = String(currency || 'KES').toUpperCase().trim();
  if (cur !== 'KES' && cur !== intent.currency) {
    intent.status = 'failed';
    intent.failureReason = `Currency mismatch: expected ${intent.currency}, got ${cur}`;
    persistLedger();
    return {
      success: false,
      error: `Currency mismatch: expected ${intent.currency}, got ${cur}`,
      code: 'INVALID_CURRENCY'
    };
  }

  // 3. Exact Amount Validation
  const paid = Number(paidAmount);
  if (isNaN(paid) || paid !== intent.amount) {
    intent.status = 'underpaid_rejected';
    intent.paidAmount = paid;
    intent.failureReason = `Amount mismatch: expected KES ${intent.amount}, got KES ${paid}`;
    persistLedger();
    return {
      success: false,
      error: `Paid amount KES ${paid} does not match expected plan price KES ${intent.amount}.`,
      code: 'INVALID_AMOUNT',
      expected: intent.amount,
      paid: paid
    };
  }

  // 4. Verification Successful — Move intent to completedPayments
  intent.status = 'completed';
  intent.provider = (provider || intent.provider || 'daraja').toLowerCase();
  intent.providerReceipt = receipt;
  intent.paidAmount = paid;
  intent.completedAt = new Date().toISOString();
  intent.rawPayload = rawPayload || null;

  // Remove from active intents if present
  ledgerState.intents = ledgerState.intents.filter(i => i.id !== intent.id);

  // Add to completedPayments and index by receipt
  ledgerState.completedPayments.unshift(intent);
  ledgerState.receiptIndex[receipt] = intent.id;

  persistLedger();
  return {
    success: true,
    payment: intent
  };
}

/**
 * Record a webhook replay attempt without modifying state.
 */
function recordReplay(receipt, checkoutRequestId) {
  const intent = findIntent({ checkoutRequestId });
  if (intent) {
    intent.replayedCount = (intent.replayedCount || 0) + 1;
    persistLedger();
  }
}

/**
 * Record underpayment rejection.
 */
function recordUnderpayment(intentId, paidAmount) {
  const intent = findIntent({ intentId });
  if (intent) {
    intent.status = 'underpaid_rejected';
    intent.paidAmount = paidAmount;
    persistLedger();
  }
}

/**
 * Fail a payment intent (e.g. user cancelled or STK push timed out).
 */
function failPayment(checkoutRequestIdOrId, reason = 'Payment cancelled or timed out') {
  const intent = findIntent({ checkoutRequestId: checkoutRequestIdOrId, intentId: checkoutRequestIdOrId });
  if (intent && intent.status === 'pending') {
    intent.status = 'failed';
    intent.failureReason = reason;
    intent.failedAt = new Date().toISOString();
    persistLedger();
  }
  return intent;
}

/**
 * Read-only status query for client polling.
 */
function getPaymentStatus(query = {}) {
  const payment = findIntent(query);
  if (!payment) {
    return { status: 'not_found' };
  }

  return {
    status: payment.status,
    intentId: payment.id,
    orderRef: payment.orderRef,
    checkoutRequestId: payment.checkoutRequestId,
    transactionRef: payment.transactionRef,
    curriculum: payment.curriculum,
    planPeriod: payment.planPeriod,
    tier: payment.tier,
    tierLabel: payment.tierLabel,
    amount: payment.amount,
    currency: payment.currency,
    provider: payment.provider,
    providerReceipt: payment.providerReceipt || null,
    paidAmount: payment.paidAmount || null,
    createdAt: payment.createdAt,
    completedAt: payment.completedAt || null,
    expiresAt: payment.expiresAt || null,
    failureReason: payment.failureReason || null
  };
}

/**
 * Look up completed payment by provider receipt.
 */
function getCompletedPaymentByReceipt(receipt) {
  if (!receipt) return null;
  const clean = String(receipt).trim().toUpperCase();
  let match = ledgerState.completedPayments.find(p => p.providerReceipt && p.providerReceipt.toUpperCase() === clean);
  if (match) return match;
  initLedger();
  return ledgerState.completedPayments.find(p => p.providerReceipt && p.providerReceipt.toUpperCase() === clean) || null;
}

/**
 * Returns all recorded payments (completed + pending).
 */
function getAllPayments() {
  return {
    intents: [...ledgerState.intents],
    completedPayments: [...ledgerState.completedPayments]
  };
}

/**
 * Reset ledger (for unit testing purposes).
 */
function resetLedgerForTesting() {
  ledgerState = {
    intents: [],
    completedPayments: [],
    receiptIndex: {},
    consumedReceipts: {}
  };
  persistLedger();
}

// Initialize on module load
initLedger();

module.exports = {
  CANONICAL_PLANS,
  calculateExpectedPrice,
  createIntent,
  updateIntent,
  findIntent,
  getIntent: (id) => findIntent({ intentId: id }),
  isReceiptUsed,
  isReceiptConsumed,
  markReceiptConsumed,
  completePayment,
  recordReplay,
  recordUnderpayment,
  failPayment,
  getPaymentStatus,
  getCompletedPaymentByReceipt,
  getAllPayments,
  resetLedgerForTesting,
  initLedger
};
