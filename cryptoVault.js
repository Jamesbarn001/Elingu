// ════════════════════════════════════════════════════════════
// ELINGU CRYPTO VAULT — field-level encryption for personal data at rest
//
// Why: if a database dump, backup, or data/*.json file is ever stolen, personal data (phone numbers, emails,
// real names, chat history, teacher ID numbers…) must be unreadable. Kenya DPA 2019 s.41(4)(c) names
// pseudonymisation and encryption as expected safeguards.
//
// How:
//   • AES-256-GCM (authenticated encryption) with a fresh random IV for every value.
//   • The field name is bound to the ciphertext (AAD), so a value copied into a different field fails to decrypt.
//   • Keys come ONLY from environment variables, never from the database, JSON files, backups or git:
//         ELINGU_DATA_KEY            current key  (64 hex chars, or base64 of 32 bytes)
//         ELINGU_DATA_KEY_PREVIOUS   optional, comma-separated older keys (for rotation)
//   • Stored form:  enc:v1:<keyId>:<iv>:<tag>:<ciphertext>   (all base64url). The key id is a short fingerprint, not the key.
//   • Passwords/PINs/OTPs are NOT encrypted here — they stay one-way hashed (bcrypt / HMAC) and can never be read back.
//
// Safety rules baked in:
//   • Without a key the vault is OFF (development/tests keep working) and says so loudly in production.
//   • A value that cannot be decrypted (wrong/missing key) is left exactly as stored, so saving never destroys data.
//   • Already-encrypted values are never encrypted twice.
// ════════════════════════════════════════════════════════════

const crypto = require('crypto');

const PREFIX = 'enc:v1:';
const KEY_BYTES = 32;

function parseKey(raw) {
  if (!raw) return null;
  const s = String(raw).trim();
  let buf = null;
  if (/^[0-9a-fA-F]{64}$/.test(s)) buf = Buffer.from(s, 'hex');
  else {
    try { buf = Buffer.from(s, 'base64'); } catch (e) { buf = null; }
  }
  return buf && buf.length === KEY_BYTES ? buf : null;
}

function keyId(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex').slice(0, 8);
}

let cache = null;
function loadKeys() {
  const currentRaw = process.env.ELINGU_DATA_KEY;
  const previousRaw = process.env.ELINGU_DATA_KEY_PREVIOUS || '';
  const signature = currentRaw + '|' + previousRaw;
  if (cache && cache.signature === signature) return cache;

  const current = parseKey(currentRaw);
  const previous = previousRaw.split(',').map(parseKey).filter(Boolean);
  const byId = new Map();
  [current, ...previous].filter(Boolean).forEach(k => byId.set(keyId(k), k));
  cache = {
    signature,
    configured: !!currentRaw,
    valid: !!current,
    current,
    currentId: current ? keyId(current) : null,
    byId
  };
  return cache;
}

/** True when a valid current key is present, i.e. new data will be encrypted. */
function isEnabled() {
  return loadKeys().valid;
}

/** Plain status for health checks / startup messages (never includes the key). */
function status() {
  const k = loadKeys();
  return {
    enabled: k.valid,
    keyConfiguredButInvalid: k.configured && !k.valid,
    keyId: k.currentId,
    previousKeys: Math.max(0, k.byId.size - (k.valid ? 1 : 0))
  };
}

function isEncrypted(value) {
  return typeof value === 'string' && value.startsWith(PREFIX);
}

/**
 * Encrypt any JSON-serialisable value. Returns the value unchanged when the vault is off, the value is empty,
 * or it is already encrypted. `field` is bound to the ciphertext.
 */
function encryptValue(value, field = '') {
  if (value === null || value === undefined || value === '') return value;
  if (isEncrypted(value)) return value;
  const k = loadKeys();
  if (!k.valid) return value;
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', k.current, iv);
  cipher.setAAD(Buffer.from(String(field)));
  const ct = Buffer.concat([cipher.update(JSON.stringify(value), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return PREFIX + [k.currentId, iv.toString('base64url'), tag.toString('base64url'), ct.toString('base64url')].join(':');
}

/**
 * Decrypt a stored value. Returns { ok: true, value } on success, or { ok: false, value: <original string> }
 * when the key is missing/wrong/tampered, so callers can keep the stored text untouched.
 */
function decryptValue(stored, field = '') {
  if (!isEncrypted(stored)) return { ok: true, value: stored };
  try {
    const [id, ivB64, tagB64, ctB64] = stored.slice(PREFIX.length).split(':');
    const k = loadKeys();
    const key = k.byId.get(id);
    if (!key) return { ok: false, value: stored };
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64url'));
    decipher.setAAD(Buffer.from(String(field)));
    decipher.setAuthTag(Buffer.from(tagB64, 'base64url'));
    const pt = Buffer.concat([decipher.update(Buffer.from(ctB64, 'base64url')), decipher.final()]).toString('utf8');
    return { ok: true, value: JSON.parse(pt) };
  } catch (e) {
    return { ok: false, value: stored };
  }
}

/** True if this stored value was written with an older key and should be re-encrypted with the current one. */
function needsRotation(stored) {
  if (!isEncrypted(stored)) return false;
  const k = loadKeys();
  if (!k.valid) return false;
  return stored.slice(PREFIX.length).split(':')[0] !== k.currentId;
}

/**
 * Keyed "blind index": a one-way fingerprint of a value (e.g. an email) that lets you look a record up
 * without decrypting everything. Same input always gives the same output; it cannot be reversed without the key.
 */
function blindIndex(value, purpose = 'index') {
  const k = loadKeys();
  if (!k.valid || value === null || value === undefined) return null;
  return crypto.createHmac('sha256', k.current).update(purpose + ':' + String(value).trim().toLowerCase()).digest('base64url');
}

module.exports = {
  PREFIX,
  isEnabled,
  status,
  isEncrypted,
  encryptValue,
  decryptValue,
  needsRotation,
  blindIndex,
  // exposed for tests / tooling
  _generateKey: () => crypto.randomBytes(KEY_BYTES).toString('hex')
};
