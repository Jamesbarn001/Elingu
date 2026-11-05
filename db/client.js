// ══════════════════════════════════════════════════════════════
// ELINGU DATABASE CLIENT (DUAL ADAPTER: POSTGRESQL & SQLITE)
// Supports multi-container institutional scaling via PostgreSQL
// with zero-config embedded SQLite fallback for local development.
// ══════════════════════════════════════════════════════════════

const fs = require('fs');
const path = require('path');
require('dotenv').config();

let postgresFallbackToSqlite = false;

function checkPostgres() {
  if (
    postgresFallbackToSqlite ||
    process.env.NODE_ENV === 'test' ||
    process.env.ELINGU_DATA_DIR ||
    process.env.USE_SQLITE === 'true'
  ) {
    return false;
  }
  return !!process.env.DATABASE_URL;
}

let pgPool = null;
let sqliteDb = null;
let sqliteSchemaReady = false;

const DB_FILE = path.join(require('../dataDir').DATA_DIR, 'elingu.sqlite');

function ensureSqliteDb() {
  if (!sqliteDb) {
    const { DatabaseSync } = require('node:sqlite');
    const dataDir = path.dirname(DB_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    sqliteDb = new DatabaseSync(DB_FILE);
    sqliteDb.exec('PRAGMA foreign_keys = ON;');
    sqliteDb.exec('PRAGMA journal_mode = WAL;');
    sqliteDb.exec('PRAGMA synchronous = NORMAL;');
  }
  if (!sqliteSchemaReady) {
    const schemaPath = path.resolve(__dirname, 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const ddl = fs.readFileSync(schemaPath, 'utf8');
      sqliteDb.exec(ddl);
      for (const colSql of [
        `ALTER TABLE learning_strands ADD COLUMN strand_label VARCHAR(255);`,
        `ALTER TABLE learning_strands ADD COLUMN icon VARCHAR(32) DEFAULT '📚';`,
        `ALTER TABLE learning_strands ADD COLUMN status VARCHAR(32) DEFAULT 'available';`
      ]) {
        try { sqliteDb.exec(colSql); } catch (e) { /* column already exists */ }
      }
    }
    sqliteSchemaReady = true;
  }
  return sqliteDb;
}

function getClient() {
  if (checkPostgres()) {
    if (!pgPool) {
      const { Pool } = require('pg');
      const url = process.env.DATABASE_URL;
      const needsSsl = process.env.DATABASE_SSL === 'true' ||
        /sslmode=require|neon\.tech|supabase\.(co|com)/i.test(url);
      pgPool = new Pool({
        connectionString: url,
        ssl: needsSsl ? { rejectUnauthorized: false } : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2500
      });
      pgPool.on('error', (err) => {
        console.error('Unexpected error on idle PostgreSQL client:', err.message);
      });
    }
    return { type: 'postgres', pool: pgPool };
  } else {
    return { type: 'sqlite', db: ensureSqliteDb() };
  }
}

function querySync(sqlText, params = []) {
  const dbInstance = ensureSqliteDb();

  const orderedParams = [];
  const translatedSql = sqlText.replace(/\$(\d+)/g, (_, idx) => {
    const paramIndex = parseInt(idx, 10) - 1;
    let p = params[paramIndex];
    if (p === undefined) p = null;
    if (typeof p === 'boolean') p = p ? 1 : 0;
    orderedParams.push(p);
    return '?';
  });

  const normalizedParams = orderedParams;

  const trimmed = translatedSql.trim().toUpperCase();
  if (trimmed.startsWith('SELECT') || trimmed.startsWith('PRAGMA')) {
    const stmt = dbInstance.prepare(translatedSql);
    const rows = stmt.all(...normalizedParams);
    return { rows, rowCount: rows.length };
  } else {
    const stmt = dbInstance.prepare(translatedSql);
    const info = stmt.run(...normalizedParams);
    return { rows: [], rowCount: info.changes, lastInsertRowid: info.lastInsertRowid };
  }
}

/**
 * Execute parameterized query
 * Uses standard $1, $2, $3 notation which translates to ? in SQLite.
 * Automatically falls back to embedded SQLite if remote PostgreSQL is unreachable.
 * Returns { rows: [...], rowCount: n }
 */
async function query(sqlText, params = []) {
  const client = getClient();

  if (client.type === 'postgres') {
    try {
      const res = await client.pool.query(sqlText, params);
      return { rows: res.rows, rowCount: res.rowCount };
    } catch (err) {
      if (/timeout|terminated|ECONNREFUSED|ENOTFOUND|ETIMEDOUT|connect|57P01/i.test(err.message || '')) {
        console.warn(`[db/client] PostgreSQL unreachable (${err.message}) — falling back to embedded SQLite.`);
        postgresFallbackToSqlite = true;
        return querySync(sqlText, params);
      }
      throw err;
    }
  } else {
    return querySync(sqlText, params);
  }
}

/**
 * Initialize database schema from db/schema.sql
 */
async function initSchema() {
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const ddl = fs.readFileSync(schemaPath, 'utf8');

  const client = getClient();
  if (client.type === 'postgres') {
    try {
      await client.pool.query(ddl);
      return true;
    } catch (err) {
      console.warn(`[db/client] PostgreSQL schema init unreachable (${err.message}) — falling back to embedded SQLite.`);
      postgresFallbackToSqlite = true;
    }
  }
  ensureSqliteDb();
  return true;
}

/**
 * JSON serialization & deserialization helpers
 */
function toJson(val, defaultVal = null) {
  if (val === null || val === undefined) {
    return defaultVal !== null ? JSON.stringify(defaultVal) : null;
  }
  if (typeof val === 'string') return val;
  try {
    return JSON.stringify(val);
  } catch (e) {
    return defaultVal !== null ? JSON.stringify(defaultVal) : null;
  }
}

function fromJson(val, defaultVal = null) {
  if (!val) return defaultVal;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch (e) {
    return defaultVal;
  }
}

/**
 * Cleanly close database connections
 */
async function close() {
  if (pgPool) {
    try { await pgPool.end(); } catch (e) {}
    pgPool = null;
  }
  if (sqliteDb) {
    try { sqliteDb.close(); } catch (e) {}
    sqliteDb = null;
    sqliteSchemaReady = false;
  }
}

module.exports = {
  query,
  querySync,
  initSchema,
  toJson,
  fromJson,
  close,
  isPostgres: () => checkPostgres(),
  DB_FILE
};
