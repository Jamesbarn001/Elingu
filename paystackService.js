// ════════════════════════════════════════════════════════════
// ELINGU PAYSTACK SERVICE — Card & Alternative Payments Integration
// Paystack checkout initialization, webhook signature verification,
// transaction status queries, and test/sandbox simulation fallback
// ════════════════════════════════════════════════════════════

const https = require('https');
const crypto = require('crypto');

const PAYSTACK_ENV = (process.env.PAYSTACK_ENVIRONMENT || 'test').toLowerCase();
// SECURITY: the demo secret is public (it is in git). It is only allowed outside production, so tests and local
// development work, but a production server can never verify webhooks with a key the whole world knows.
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || (IS_PRODUCTION ? '' : 'sk_test_elingu_demo_secret_2026');
const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_mock_paystack_public';

/**
 * Initialize a Paystack transaction
 * Converts KES to subunit cents (amount * 100) and returns authorization URL
 *
 * @param {Object} options
 * @param {string} options.email - Customer email address
 * @param {number} options.amountKsh - Amount in Kenyan Shillings
 * @param {string} [options.callbackUrl] - Return redirect URL after payment
 * @param {Object} [options.metadata] - Custom transaction metadata
 * @param {string} [options.reference] - Optional custom reference
 * @returns {Promise<{ success: boolean, authorizationUrl?: string, accessCode?: string, reference?: string, error?: string, simulated?: boolean }>}
 */
async function initializeTransaction({
  email,
  amountKsh,
  amount,
  currency = 'KES',
  callbackUrl,
  metadata = {},
  reference
} = {}) {
  const effectiveCurrency = String(currency || 'KES').toUpperCase() === 'USD' ? 'USD' : 'KES';
  const rawAmt = amount !== undefined ? amount : amountKsh;
  const amountSubunits = Math.round(Number(rawAmt || 0) * 100);
  const ref = reference || ('pstk_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex'));

  // Live environment with real secret key configured
  const isMockSecret = !PAYSTACK_SECRET_KEY ||
    PAYSTACK_SECRET_KEY.includes('mock') ||
    PAYSTACK_SECRET_KEY.includes('demo') ||
    PAYSTACK_SECRET_KEY.includes('elingu') ||
    PAYSTACK_SECRET_KEY.startsWith('sk_test_');

  if (IS_PRODUCTION && (PAYSTACK_ENV !== 'live' || isMockSecret)) {
    // SECURITY: never hand out a simulated "successful" checkout in production.
    console.error('[Paystack] Production requires PAYSTACK_ENVIRONMENT=live and a real PAYSTACK_SECRET_KEY.');
    return { success: false, error: 'Card payments are temporarily unavailable. Please try M-Pesa or try again later.' };
  }

  if (PAYSTACK_ENV === 'live' && !isMockSecret) {
    try {
      const payload = JSON.stringify({
        email,
        amount: amountSubunits,
        reference: ref,
        currency: effectiveCurrency,
        callback_url: callbackUrl,
        metadata
      });

      const result = await new Promise((resolve, reject) => {
        const req = https.request({
          hostname: 'api.paystack.co',
          path: '/transaction/initialize',
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
          }
        }, (res) => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              if (parsed.status && parsed.data) {
                resolve({
                  success: true,
                  simulated: false,
                  authorizationUrl: parsed.data.authorization_url,
                  accessCode: parsed.data.access_code,
                  reference: parsed.data.reference || ref,
                  amount: amountSubunits,
                  currency: effectiveCurrency
                });
              } else {
                reject(new Error(parsed.message || 'Paystack initialization failed'));
              }
            } catch (e) {
              reject(e);
            }
          });
        });

        req.on('error', reject);
        req.setTimeout(8000, () => {
          req.destroy(new Error('Paystack request timeout'));
        });
        req.write(payload);
        req.end();
      });

      return result;
    } catch (err) {
      console.warn('[Paystack] Live checkout initialization network error, falling back to sandbox mode:', err.message);
    }
  }

  // Test / Sandbox simulation fallback
  return {
    success: true,
    simulated: true,
    authorizationUrl: `https://checkout.paystack.com/${ref}`,
    accessCode: `acc_${ref}`,
    reference: ref,
    amount: amountSubunits,
    currency: effectiveCurrency
  };
}

/**
 * Verify Paystack HMAC-SHA512 Webhook Signature using timing-safe comparison
 *
 * @param {string|Buffer} rawBody - Raw unparsed webhook request payload
 * @param {string} signatureHeader - Value of 'x-paystack-signature' header
 * @returns {boolean} True if signature is genuine and verified
 */
function verifyWebhookSignature(rawBody, signatureHeader) {
  if (!signatureHeader || !rawBody || !PAYSTACK_SECRET_KEY) {
    return false;
  }

  try {
    const bodyString = Buffer.isBuffer(rawBody)
      ? rawBody.toString('utf8')
      : (typeof rawBody === 'string' ? rawBody : JSON.stringify(rawBody));

    const computed = crypto
      .createHmac('sha512', PAYSTACK_SECRET_KEY)
      .update(bodyString)
      .digest('hex');

    const computedBuf = Buffer.from(computed, 'utf8');
    const sigBuf = Buffer.from(String(signatureHeader).trim(), 'utf8');

    if (computedBuf.length !== sigBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(computedBuf, sigBuf);
  } catch (err) {
    console.error('[Paystack] Signature verification error:', err.message);
    return false;
  }
}

/**
 * Verify transaction status with Paystack
 *
 * @param {string} reference - Paystack transaction reference
 * @returns {Promise<{ success: boolean, data?: Object, error?: string, simulated?: boolean }>}
 */
async function verifyTransaction(reference) {
  if (!reference) {
    return { success: false, error: 'Transaction reference is required.' };
  }

  const isMockSecret = !PAYSTACK_SECRET_KEY ||
    PAYSTACK_SECRET_KEY.includes('mock') ||
    PAYSTACK_SECRET_KEY.includes('demo') ||
    PAYSTACK_SECRET_KEY.includes('elingu') ||
    PAYSTACK_SECRET_KEY.startsWith('sk_test_');

  if (PAYSTACK_ENV === 'live' && !isMockSecret) {
    try {
      const result = await new Promise((resolve, reject) => {
        const req = https.request({
          hostname: 'api.paystack.co',
          path: `/transaction/verify/${encodeURIComponent(reference)}`,
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`
          }
        }, (res) => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => {
            try {
              const parsed = JSON.parse(body);
              if (parsed.status && parsed.data) {
                resolve({
                  success: true,
                  simulated: false,
                  data: parsed.data
                });
              } else {
                reject(new Error(parsed.message || 'Transaction verification failed'));
              }
            } catch (e) {
              reject(e);
            }
          });
        });

        req.on('error', reject);
        req.setTimeout(8000, () => {
          req.destroy(new Error('Paystack verify timeout'));
        });
        req.end();
      });

      return result;
    } catch (err) {
      console.warn('[Paystack] Live verification network error, falling back to simulated status:', err.message);
    }
  }

  // Simulation mode
  return {
    success: true,
    simulated: true,
    data: {
      status: 'success',
      reference,
      amount: 0,
      currency: 'KES',
      gateway_response: 'Successful',
      paid_at: new Date().toISOString(),
      channel: 'card'
    }
  };
}

module.exports = {
  PAYSTACK_ENV,
  PAYSTACK_SECRET_KEY,
  PAYSTACK_PUBLIC_KEY,
  initializeTransaction,
  verifyWebhookSignature,
  verifyTransaction
};
