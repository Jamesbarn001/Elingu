// ════════════════════════════════════════════════════════════
// SECURE JSON — the one place that reads and writes data/*.json
//
// Every store (students, parents, teachers, admin, payments) used to carry its own copy of loadJson/saveJson.
// They now call this module, which:
//   • encrypts the personal-data fields (see SENSITIVE_KEYS) before anything touches disk or Postgres,
//   • decrypts them again when a document is read, so the rest of the code keeps working with plain values,
//   • never destroys data: a corrupt file is copied aside before a default is returned, and values that cannot be
//     decrypted are kept exactly as they were stored.
// ════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
const vault = require('./cryptoVault');

// Property names (at any depth) whose values are personal data. Passwords/PINs/OTP hashes are deliberately absent:
// they are one-way hashes, not readable data.
const SENSITIVE_KEYS = new Set([
  // contact details
  'email', 'studentEmail', 'parentEmail', 'contactEmail', 'headteacherEmail', 'adminEmail',
  'phone', 'studentPhone', 'parentPhone', 'contactPhone', 'headteacherPhone', 'phoneNumber', 'msisdn', 'phoneOrEmail',
  'parentContact', 'contactPerson',
  // identity
  'realName', 'fullName', 'headteacherName', 'idNumber', 'nationalId', 'tscNumber',
  // secrets that grant access when presented (links/tokens), stored so they can be compared in memory
  'verifyToken', 'approveToken',
  // conversations and safeguarding text
  'messages', 'message', 'reviewNote',
  // raw payment-provider payloads (they contain the payer's phone number)
  'rawPayload'
]);

// Extra keys that are only personal data inside a particular file ("name" means a person in these, not a school/subject).
const FILE_EXTRA_KEYS = {
  'parents.json': ['name', 'username'],
  'teachers.json': ['name'],
  'deleted_accounts_archive.json': ['name', 'username'],
  'institutional_inquiries.json': ['orgName']
};

function keysFor(filePath) {
  const extra = FILE_EXTRA_KEYS[path.basename(String(filePath))];
  if (!extra) return SENSITIVE_KEYS;
  return new Set([...SENSITIVE_KEYS, ...extra]);
}

let decryptFailures = 0;

function walk(value, keys, transform, depth = 0) {
  if (depth > 40 || value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(v => walk(v, keys, transform, depth + 1));
  const out = {};
  for (const k of Object.keys(value)) {
    const v = value[k];
    out[k] = keys.has(k) ? transform(v, k) : walk(v, keys, transform, depth + 1);
  }
  return out;
}

/** Return a COPY of data with every sensitive field encrypted (a no-op while the vault is off). */
function encryptDocument(data, filePath = '') {
  if (!vault.isEnabled()) return data;
  return walk(data, keysFor(filePath), (v, field) => encryptValue(v, field));
}

function encryptValue(v, field) {
  if (v === null || v === undefined || v === '') return v;
  return vault.encryptValue(v, field);
}

/** Return a COPY of data with every encrypted field decrypted. Undecryptable values are left as stored. */
function decryptDocument(data, filePath = '') {
  const keys = keysFor(filePath);
  return walk(data, keys, (v, field) => {
    if (!vault.isEncrypted(v)) {
      // A sensitive key can hold an object/array of plaintext (e.g. messages): keep walking so nested encrypted values are handled.
      return v && typeof v === 'object' ? walk(v, keys, (x, f) => decryptLeaf(x, f)) : v;
    }
    return decryptLeaf(v, field);
  });
}

function decryptLeaf(v, field) {
  if (!vault.isEncrypted(v)) return v;
  const res = vault.decryptValue(v, field);
  if (!res.ok) decryptFailures++;
  return res.value;
}

function readJson(filePath, defaultValue = {}, label = 'secureJson') {
  try {
    if (!fs.existsSync(filePath)) return defaultValue;
    const raw = fs.readFileSync(filePath, 'utf8');
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseErr) {
      // Do not let the next save silently replace a damaged file with an empty default: keep a copy for recovery.
      try {
        const aside = `${filePath}.corrupt-${Date.now()}`;
        fs.copyFileSync(filePath, aside);
        console.error(`[${label}] ${path.basename(filePath)} is not valid JSON (${parseErr.message}). Copied to ${path.basename(aside)}.`);
      } catch (_) { /* best effort */ }
      return defaultValue;
    }
    const before = decryptFailures;
    const doc = decryptDocument(parsed, filePath);
    if (decryptFailures > before) {
      console.error(`[${label}] ${decryptFailures - before} value(s) in ${path.basename(filePath)} could not be decrypted — is ELINGU_DATA_KEY missing or changed? They were left untouched.`);
    }
    return doc;
  } catch (err) {
    console.error(`[${label}] Error loading ${filePath}:`, err.message);
  }
  return defaultValue;
}

/** Encrypt, write atomically, and queue the ENCRYPTED copy for Postgres. Returns the stored (encrypted) document. */
function writeJson(filePath, data, label = 'secureJson') {
  const authUtils = require('./authUtils');
  const stored = encryptDocument(data, filePath);
  authUtils.atomicWriteJsonSync(filePath, stored);
  try {
    require('./persistentStore').persist(filePath, stored);
  } catch (e) {
    // persistentStore is optional in unit tests
  }
  return stored;
}

module.exports = { readJson, writeJson, encryptDocument, decryptDocument, SENSITIVE_KEYS, FILE_EXTRA_KEYS };
