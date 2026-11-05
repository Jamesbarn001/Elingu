// Single source of truth for where data/*.json lives.
// Set ELINGU_DATA_DIR to point the app at a different folder (used by tests so they never touch real family data).
const path = require('path');

const DATA_DIR = process.env.ELINGU_DATA_DIR
  ? path.resolve(process.env.ELINGU_DATA_DIR)
  : path.join(__dirname, 'data');

module.exports = { DATA_DIR };
