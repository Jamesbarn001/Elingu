// ============================================================
// Tier 1 — Personal data encrypted at rest (Phase 1b of the November 2026 audit)
// Everything here runs against a throw-away data folder (ELINGU_DATA_DIR), never against real family data.
// ============================================================

const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawn, spawnSync } = require('child_process');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..', '..');

function withKey(key, fn) {
  const saved = { k: process.env.ELINGU_DATA_KEY, p: process.env.ELINGU_DATA_KEY_PREVIOUS };
  if (key === undefined) delete process.env.ELINGU_DATA_KEY; else process.env.ELINGU_DATA_KEY = key;
  delete process.env.ELINGU_DATA_KEY_PREVIOUS;
  try { return fn(); } finally {
    if (saved.k === undefined) delete process.env.ELINGU_DATA_KEY; else process.env.ELINGU_DATA_KEY = saved.k;
    if (saved.p === undefined) delete process.env.ELINGU_DATA_KEY_PREVIOUS; else process.env.ELINGU_DATA_KEY_PREVIOUS = saved.p;
  }
}

function tmpDir(prefix) {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

async function waitForHealth(port, ms = 25000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const r = await fetch(`http://localhost:${port}/api/health`, { signal: AbortSignal.timeout(1500) });
      if (r.ok) return true;
    } catch (e) { /* not up yet */ }
    await new Promise(r => setTimeout(r, 400));
  }
  return false;
}

module.exports = {
  'TC-ENC-01: Vault round-trips values and binds ciphertext to its field name': async (ctx) => {
    const vault = require('../../cryptoVault');
    withKey(vault._generateKey(), () => {
      const enc = vault.encryptValue('+254712345678', 'phone');
      ctx.assert(vault.isEncrypted(enc) && !enc.includes('254712345678'), 'ciphertext must not contain the plaintext');
      ctx.assertEqual(vault.decryptValue(enc, 'phone').value, '+254712345678');
      ctx.assertEqual(vault.decryptValue(enc, 'email').ok, false, 'moving a value into another field must fail');
      const tampered = enc.slice(0, -3) + (enc.endsWith('AAA') ? 'BBB' : 'AAA');
      ctx.assertEqual(vault.decryptValue(tampered, 'phone').ok, false, 'tampered ciphertext must be rejected');
      ctx.assertEqual(vault.encryptValue(enc, 'phone'), enc, 'already-encrypted values are not encrypted twice');
      ctx.assertNotEqual(vault.encryptValue('same', 'phone'), vault.encryptValue('same', 'phone'), 'each value gets a fresh IV');
      const obj = { a: [1, 2], b: 'x' };
      ctx.assertDeepEqual(vault.decryptValue(vault.encryptValue(obj, 'messages'), 'messages').value, obj, 'objects/arrays round-trip');
    });
    withKey(undefined, () => {
      ctx.assertEqual(vault.encryptValue('plain', 'phone'), 'plain', 'with no key the vault stays off (dev/tests)');
    });
  },

  'TC-ENC-02: A wrong or missing key never destroys data, and key rotation works': async (ctx) => {
    const vault = require('../../cryptoVault');
    const secureJson = require('../../secureJson');
    const keyA = vault._generateKey();
    const keyB = vault._generateKey();
    const doc = { parents: [{ email: 'mum@example.com', phone: '0711000222', name: 'Mama Zawadi', familyPinHash: 'HASH' }] };
    let stored;
    withKey(keyA, () => { stored = secureJson.encryptDocument(doc, 'parents.json'); });
    ctx.assert(vault.isEncrypted(stored.parents[0].email) && vault.isEncrypted(stored.parents[0].name), 'email and name encrypted');
    ctx.assertEqual(stored.parents[0].familyPinHash, 'HASH', 'password hashes are left as they are');

    withKey(keyB, () => {
      const seen = secureJson.decryptDocument(stored, 'parents.json');
      ctx.assert(vault.isEncrypted(seen.parents[0].email), 'wrong key: ciphertext is kept, not blanked');
      const resaved = secureJson.encryptDocument(seen, 'parents.json');
      ctx.assertEqual(resaved.parents[0].email, stored.parents[0].email, 'saving with the wrong key must not change stored data');
    });
    withKey(undefined, () => {
      const seen = secureJson.decryptDocument(stored, 'parents.json');
      ctx.assert(vault.isEncrypted(seen.parents[0].phone), 'no key: ciphertext is kept');
    });

    // rotation: new key current, old key previous (restore whatever the surrounding run had afterwards)
    const savedCurrent = process.env.ELINGU_DATA_KEY;
    const savedPrevious = process.env.ELINGU_DATA_KEY_PREVIOUS;
    process.env.ELINGU_DATA_KEY = keyB;
    process.env.ELINGU_DATA_KEY_PREVIOUS = keyA;
    try {
      const seen = secureJson.decryptDocument(stored, 'parents.json');
      ctx.assertDeepEqual(seen, doc, 'old key still reads old data during rotation');
      ctx.assert(vault.needsRotation(stored.parents[0].email), 'old-key values are flagged for re-encryption');
      const rotated = secureJson.encryptDocument(seen, 'parents.json');
      ctx.assert(!vault.needsRotation(rotated.parents[0].email), 'after re-saving, values use the new key');
    } finally {
      if (savedCurrent === undefined) delete process.env.ELINGU_DATA_KEY; else process.env.ELINGU_DATA_KEY = savedCurrent;
      if (savedPrevious === undefined) delete process.env.ELINGU_DATA_KEY_PREVIOUS; else process.env.ELINGU_DATA_KEY_PREVIOUS = savedPrevious;
    }
  },

  'TC-ENC-03: secureJson writes ciphertext to disk, reads plaintext back, and keeps a copy of a corrupt file': async (ctx) => {
    const vault = require('../../cryptoVault');
    const secureJson = require('../../secureJson');
    const dir = tmpDir('elingu-enc-');
    const file = path.join(dir, 'teachers.json');
    const doc = { teachers: [{ id: 't1', name: 'Mwalimu Otieno', email: 'otieno@school.ke', idNumber: '12345678', passwordHash: 'HASH', role: 'subject_teacher' }] };
    withKey(vault._generateKey(), () => {
      secureJson.writeJson(file, doc, 'test');
      const raw = fs.readFileSync(file, 'utf8');
      for (const secret of ['Mwalimu Otieno', 'otieno@school.ke', '12345678']) {
        ctx.assert(!raw.includes(secret), `"${secret}" must not appear in the file on disk`);
      }
      ctx.assert(raw.includes('"role": "subject_teacher"') && raw.includes('"id": "t1"'), 'non-personal fields stay readable');
      ctx.assertDeepEqual(secureJson.readJson(file, {}, 'test'), doc, 'reading returns the original plaintext document');
    });
    fs.writeFileSync(file, '{ not json', 'utf8');
    const fallback = secureJson.readJson(file, { teachers: [] }, 'test');
    ctx.assertDeepEqual(fallback, { teachers: [] });
    ctx.assert(fs.readdirSync(dir).some(f => f.includes('.corrupt-')), 'a corrupt file is copied aside before a default is used');
    fs.rmSync(dir, { recursive: true, force: true });
  },

  'TC-ENC-04: A running server stores personal data encrypted and still serves it normally': async (ctx) => {
    const vault = require('../../cryptoVault');
    const dir = tmpDir('elingu-live-');
    const port = 3900 + Math.floor(Math.random() * 90);
    const key = vault._generateKey();
    const server = spawn(process.execPath, ['server.js'], {
      cwd: ROOT,
      env: { ...process.env, PORT: String(port), NODE_ENV: 'test', ELINGU_DATA_DIR: dir, ELINGU_DATA_KEY: key, DATABASE_URL: '' },
      stdio: 'ignore'
    });
    try {
      ctx.assert(await waitForHealth(port), 'isolated server must start');
      const base = `http://localhost:${port}`;
      const email = `enc_${crypto.randomBytes(3).toString('hex')}@gmail.com`;
      const handle = `Enc${crypto.randomBytes(3).toString('hex')}`;

      const reg = await fetch(`${base}/api/students/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ handle, pin: '4827', grade: 7, email, realName: 'Wanjiru Secretname' })
      });
      ctx.assertEqual(reg.status, 200, 'sign-up works with encryption on');

      for (const file of ['students.json', 'parents.json']) {
        const raw = fs.readFileSync(path.join(dir, file), 'utf8');
        ctx.assert(!raw.includes(email), `${file}: parent email must not be readable on disk`);
        ctx.assert(!raw.includes('Wanjiru Secretname'), `${file}: real name must not be readable on disk`);
        ctx.assert(raw.includes('enc:v1:'), `${file}: contains encrypted values`);
      }
      ctx.assert(fs.readFileSync(path.join(dir, 'students.json'), 'utf8').includes(handle), 'the nickname (a pseudonym) stays searchable');

      const avail = await (await fetch(`${base}/api/students/check-availability?email=${encodeURIComponent(email)}&handle=zz_nobody`)).json();
      ctx.assertEqual(avail.emailTaken, true, 'the server finds the parent contact even though it is encrypted on disk');
    } finally {
      server.kill();
      await new Promise(r => setTimeout(r, 400));
      try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) { /* Windows may hold the file briefly */ }
    }
  },

  'TC-ENC-05: Migration script encrypts existing plaintext, is repeatable, and backs up first': async (ctx) => {
    const vault = require('../../cryptoVault');
    const dir = tmpDir('elingu-mig-');
    const key = vault._generateKey();
    const secret = '0712 345 678';
    fs.writeFileSync(path.join(dir, 'students.json'), JSON.stringify({ students: [{ id: 'stu_1', handle: 'Amani', parentPhone: secret, email: 'old@example.com', pinHash: 'HASH' }] }, null, 2));
    fs.writeFileSync(path.join(dir, 'parents.json'), JSON.stringify({ parents: [{ email: 'old@example.com', name: 'Old Parent', phone: secret }] }, null, 2));
    const env = { ...process.env, ELINGU_DATA_DIR: dir, ELINGU_DATA_KEY: key, DATABASE_URL: '' };
    const run = (extra) => spawnSync(process.execPath, ['scripts/encrypt_data.js', ...extra], { cwd: ROOT, env, encoding: 'utf8' });

    const dry = run([]);
    ctx.assertEqual(dry.status, 0, 'dry run succeeds');
    ctx.assert(fs.readFileSync(path.join(dir, 'students.json'), 'utf8').includes(secret), 'dry run changes nothing');

    const applied = run(['--apply']);
    ctx.assertEqual(applied.status, 0, 'apply succeeds: ' + applied.stderr);
    for (const f of ['students.json', 'parents.json']) {
      const raw = fs.readFileSync(path.join(dir, f), 'utf8');
      ctx.assert(!raw.includes(secret) && !raw.includes('old@example.com') && !raw.includes('Old Parent'), `${f} is encrypted`);
    }
    ctx.assert(fs.readdirSync(dir).some(f => f.startsWith('backup_pre_encrypt_')), 'a backup folder is created first');
    ctx.assert(fs.readFileSync(path.join(dir, 'students.json'), 'utf8').includes('"pinHash": "HASH"'), 'password hashes untouched');

    const before = fs.readFileSync(path.join(dir, 'students.json'), 'utf8');
    const again = run(['--apply']);
    ctx.assertEqual(again.status, 0);
    ctx.assertEqual(fs.readFileSync(path.join(dir, 'students.json'), 'utf8'), before, 'a second run leaves already-encrypted files alone');
    fs.rmSync(dir, { recursive: true, force: true });
  }
};
