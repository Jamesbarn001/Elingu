// ============================================================
// tests/e2e_pricing/helpers.js — Shared Test Fixtures & Utilities
// Opaque-Box E2E Testing Helpers for Elingu Pricing & Payments
// ============================================================

const crypto = require('crypto');
const parentStore = require('../../parentStore');
const studentStore = require('../../studentStore');

/**
 * Register a clean student and activate their verified parent
 */
async function setupParentAndStudent(ctx, options = {}) {
  const curriculum = options.curriculum || 'CBC';
  const grade = options.grade || (curriculum === 'BRITISH' ? 8 : 7);
  const yearGroup = options.yearGroup || (curriculum === 'BRITISH' ? grade : null);
  const examBoard = options.examBoard || (curriculum === 'BRITISH' ? 'CAIE' : null);
  const examTier = options.examTier || null;

  const handle = ctx.uniqueHandle(options.handlePrefix || 'E2EPupil');
  const pin = ctx.uniquePin();
  const email = ctx.uniqueEmail(options.emailPrefix || 'parent');
  const familyPassword = options.familyPassword || 'ParentSecurePass2026!';

  const studentPayload = {
    handle,
    pin,
    grade,
    email,
    curriculum
  };
  if (curriculum === 'BRITISH') {
    studentPayload.examBoard = examBoard;
    studentPayload.yearGroup = yearGroup;
    studentPayload.examTier = examTier;
    studentPayload.school = options.school || 'Braeburn Garden Estate';
    studentPayload.selectedSubjects = options.selectedSubjects || ['Mathematics', 'Physics', 'English'];
  } else {
    studentPayload.selectedSubjects = options.selectedSubjects || ['Mathematics', 'Science and Technology', 'English'];
  }

  // 1. Register Student Profile
  const regRes = await ctx.api('/api/students/profile', {
    method: 'POST',
    body: studentPayload
  });

  ctx.assertEqual(regRes.status, 200, `Student registration should succeed. Got: ${JSON.stringify(regRes.data)}`);
  const student = regRes.data.student;
  const childId = student.id;

  // 2. Activate Parent Account with Family Password
  const parent = parentStore.getParentByEmail(email);
  ctx.assert(parent && parent.verifyToken, 'Parent verify token should exist after student registration');

  const verifyRes = await ctx.api('/api/parent/verify', {
    method: 'POST',
    body: {
      token: parent.verifyToken,
      childId,
      familyPassword
    }
  });

  ctx.assertEqual(verifyRes.status, 200, `Parent activation should succeed. Got: ${JSON.stringify(verifyRes.data)}`);

  return {
    email,
    familyPassword,
    student,
    childId,
    handle,
    pin
  };
}

/**
 * Generate a simulated Safaricom Daraja STK Push Callback Payload
 */
function createDarajaCallbackPayload({
  checkoutRequestId = 'ws_CO_' + Date.now() + '_' + crypto.randomBytes(3).toString('hex').toUpperCase(),
  merchantRequestId = 'MR_' + Date.now(),
  resultCode = 0,
  resultDesc = 'The service request is processed successfully.',
  receipt = 'MP' + crypto.randomBytes(4).toString('hex').toUpperCase(),
  amount = 8900,
  phone = 254712345678,
  transactionDate = 20261028135000
} = {}) {
  if (resultCode !== 0) {
    return {
      Body: {
        stkCallback: {
          MerchantRequestID: merchantRequestId,
          CheckoutRequestID: checkoutRequestId,
          ResultCode: resultCode,
          ResultDesc: resultDesc
        }
      }
    };
  }

  return {
    Body: {
      stkCallback: {
        MerchantRequestID: merchantRequestId,
        CheckoutRequestID: checkoutRequestId,
        ResultCode: 0,
        ResultDesc: resultDesc,
        CallbackMetadata: {
          Item: [
            { Name: 'Amount', Value: amount },
            { Name: 'MpesaReceiptNumber', Value: receipt },
            { Name: 'Balance' },
            { Name: 'TransactionDate', Value: transactionDate },
            { Name: 'PhoneNumber', Value: phone }
          ]
        }
      }
    }
  };
}

/**
 * Generate Paystack Webhook Payload
 */
function createPaystackWebhookPayload({
  event = 'charge.success',
  reference = 'pstk_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'),
  amountKsh = 8900,
  currency = 'KES',
  email = 'parent@example.com',
  metadata = {}
} = {}) {
  const amountCents = Math.round(amountKsh * 100);
  return {
    event,
    data: {
      id: Math.floor(100000000 + Math.random() * 900000000),
      domain: 'test',
      status: 'success',
      reference,
      amount: amountCents,
      message: null,
      gateway_response: 'Successful',
      paid_at: new Date().toISOString(),
      created_at: new Date(Date.now() - 60000).toISOString(),
      channel: 'card',
      currency,
      ip_address: '41.90.12.34',
      metadata: {
        email,
        ...metadata
      },
      customer: {
        id: Math.floor(100000 + Math.random() * 900000),
        email,
        customer_code: 'CUS_' + crypto.randomBytes(4).toString('hex')
      }
    }
  };
}

/**
 * Compute Paystack HMAC-SHA512 Signature
 */
function computePaystackSignature(payload, secretKey = process.env.PAYSTACK_SECRET_KEY || 'sk_test_elingu_demo_secret_2026') {
  const bodyString = typeof payload === 'string' ? payload : JSON.stringify(payload);
  return crypto.createHmac('sha512', secretKey).update(bodyString).digest('hex');
}

module.exports = {
  setupParentAndStudent,
  createDarajaCallbackPayload,
  createPaystackWebhookPayload,
  computePaystackSignature
};
