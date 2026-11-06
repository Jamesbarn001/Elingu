// Gives a test run its own throw-away data folder, so tests never read or change the real data/ folder.
// That folder can hold a copy of live family data (encrypted) if the app was run on this computer, and tests that
// create hundreds of fake families must not mix with it. The server the runner starts inherits the same folder.
const fs = require('fs');
const os = require('os');
const path = require('path');

if (!process.env.ELINGU_DATA_DIR) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'elingu-test-data-'));
  process.env.ELINGU_DATA_DIR = dir;
  process.on('exit', () => { try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) { /* the folder is in the temp area; the system cleans it up later */ } });
}
// Normal test runs have no encryption key (the encryption tests set their own); a key left in the shell must not leak in.
delete process.env.ELINGU_DATA_KEY;
delete process.env.ELINGU_DATA_KEY_PREVIOUS;
process.env.DATABASE_URL = '';
