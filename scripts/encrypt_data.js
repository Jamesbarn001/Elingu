#!/usr/bin/env node
// ════════════════════════════════════════════════════════════
// scripts/encrypt_data.js — one-off migration (and key rotation) for personal data at rest
//
//   node scripts/encrypt_data.js --generate-key     print a new random key (put it in ELINGU_DATA_KEY, keep a copy SAFE)
//   node scripts/encrypt_data.js                    DRY RUN: show what would change, touch nothing
//   node scripts/encrypt_data.js --apply            back up data/, encrypt every personal-data field, verify it
//   node scripts/encrypt_data.js --apply --with-postgres
//                                                   also pull the cloud copy first and push the encrypted result back
//
// Key rotation: set the new key as ELINGU_DATA_KEY and the old one as ELINGU_DATA_KEY_PREVIOUS, then run with --apply.
// Safe to run more than once. The backup it writes (data/backup_pre_encrypt_<time>/) is PLAINTEXT: delete it once
// you have checked the app works, otherwise the encryption is pointless.
// ════════════════════════════════════════════════════════════

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const vault = require('../cryptoVault');
const secureJson = require('../secureJson');

const DATA_DIR = require('../dataDir').DATA_DIR;
const args = new Set(process.argv.slice(2));

function countFields(doc, filePath) {
  const keys = new Set([...secureJson.SENSITIVE_KEYS, ...(secureJson.FILE_EXTRA_KEYS[path.basename(filePath)] || [])]);
  let plain = 0;
  let encrypted = 0;
  (function visit(v, depth) {
    if (depth > 40 || v === null || typeof v !== 'object') return;
    if (Array.isArray(v)) return v.forEach(x => visit(x, depth + 1));
    for (const k of Object.keys(v)) {
      if (keys.has(k)) {
        const val = v[k];
        if (val === null || val === undefined || val === '') continue;
        if (vault.isEncrypted(val)) encrypted++; else plain++;
      } else {
        visit(v[k], depth + 1);
      }
    }
  })(doc, 0);
  return { plain, encrypted };
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

async function main() {
  if (args.has('--generate-key')) {
    console.log(vault._generateKey());
    console.error('\nPut this value in the ELINGU_DATA_KEY environment variable (on your host and in your local .env).');
    console.error('Store a copy somewhere safe and separate (password manager). If it is lost, the encrypted data cannot be recovered.');
    return;
  }

  const apply = args.has('--apply');
  const withPg = args.has('--with-postgres');

  if (!vault.isEnabled()) {
    console.error('ELINGU_DATA_KEY is missing or invalid. Generate one with:  node scripts/encrypt_data.js --generate-key');
    process.exit(1);
  }
  console.log(`Vault key ${vault.status().keyId} ${apply ? '(APPLY mode)' : '(dry run — nothing will be changed)'}`);

  const persistentStore = require('../persistentStore');
  if (withPg) {
    if (!process.env.DATABASE_URL) {
      console.error('--with-postgres needs DATABASE_URL.');
      process.exit(1);
    }
    if (apply) {
      console.log('Restoring the cloud copy of data/*.json first (so we encrypt the latest data)...');
      await persistentStore.hydrate();
    }
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
  let totalPlain = 0;
  let totalEnc = 0;
  const plan = [];
  for (const file of files) {
    const full = path.join(DATA_DIR, file);
    let parsed;
    try { parsed = JSON.parse(fs.readFileSync(full, 'utf8')); } catch (e) { console.log(`  ⚠️  ${file}: not valid JSON, skipped`); continue; }
    const c = countFields(parsed, full);
    totalPlain += c.plain; totalEnc += c.encrypted;
    // Fields written with an older key also need re-encrypting.
    const stale = JSON.stringify(parsed).split('"enc:v1:').slice(1).filter(x => vault.needsRotation('enc:v1:' + x.split('"')[0])).length;
    plan.push({ file, full, parsed, ...c, stale });
    console.log(`  ${file.padEnd(34)} plaintext fields: ${String(c.plain).padStart(6)}   encrypted: ${String(c.encrypted).padStart(6)}   old-key: ${stale}`);
  }
  console.log(`\nTotal: ${totalPlain} plaintext personal-data field(s), ${totalEnc} already encrypted.`);

  if (!apply) {
    console.log('\nDry run only. Re-run with --apply to encrypt (a plaintext backup is made first).');
    return;
  }

  const backupDir = path.join(DATA_DIR, `backup_pre_encrypt_${new Date().toISOString().replace(/[:.]/g, '-')}`);
  fs.mkdirSync(backupDir, { recursive: true });
  for (const p of plan) fs.copyFileSync(p.full, path.join(backupDir, p.file));
  console.log(`\nBackup written to ${backupDir}  (PLAINTEXT — delete it after you have verified the app)`);

  let ok = true;
  for (const p of plan) {
    if (p.plain === 0 && p.stale === 0) continue;
    const readable = secureJson.decryptDocument(p.parsed, p.full);   // what the app sees
    const stored = secureJson.encryptDocument(readable, p.full);     // what goes to disk
    const tmp = `${p.full}.migrating`;
    fs.writeFileSync(tmp, JSON.stringify(stored, null, 2), 'utf8');
    // Verify before replacing: reading the new file back must give exactly the same data the app saw.
    const reread = secureJson.decryptDocument(JSON.parse(fs.readFileSync(tmp, 'utf8')), p.full);
    if (!deepEqual(reread, readable)) {
      fs.unlinkSync(tmp);
      console.error(`  ❌ ${p.file}: verification FAILED — left unchanged.`);
      ok = false;
      continue;
    }
    fs.renameSync(tmp, p.full);
    console.log(`  ✅ ${p.file}: encrypted and verified`);
  }

  if (!ok) {
    console.error('\nSome files failed verification and were left as they were. Nothing was lost.');
    process.exit(2);
  }

  if (withPg) {
    const n = await persistentStore.pushAllLocalToPostgres();
    console.log(`☁️  Pushed ${n} encrypted document(s) to Postgres.`);
    await persistentStore.flush();
  }
  console.log('\nDone. Next: start the app, check sign-in works, then DELETE the plaintext backup folder above.');
  process.exit(0);
}

main().catch(err => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});
