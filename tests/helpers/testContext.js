// ============================================================
// tests/helpers/testContext.js — E2E Test Execution Context
// Shared test helpers, assertions, API client, and fixtures.
// ============================================================

const crypto = require('crypto');
const authUtils = require('../../authUtils');

function getBaseUrl() {
  const port = process.env.TEST_PORT || process.env.PORT || 3000;
  return process.env.TEST_BASE_URL || `http://localhost:${port}`;
}
const TEST_PORT = process.env.TEST_PORT || process.env.PORT || 3000;
const BASE_URL = getBaseUrl();

/**
 * Universal HTTP request wrapper with robust JSON/text parsing
 */
// The server now requires a student session token on learner routes. Real clients get the token from sign-up/login
// responses; this helper does the same so tests behave like a browser: remember tokens by student id and attach the
// right one automatically. A test can still pass its own Authorization header (or none via `noAuth: true`).
const studentTokens = new Map();
let lastStudentToken = null;

function rememberStudentTokens(data) {
  if (!data || typeof data !== 'object') return;
  const visit = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    const token = obj.sessionToken || (obj.token && obj.student ? obj.token : null);
    const id = (obj.student && obj.student.id) || obj.studentId || (typeof obj.id === 'string' && obj.id.startsWith('stu_') ? obj.id : null);
    if (token && id) { studentTokens.set(id, token); lastStudentToken = token; }
  };
  visit(data);
  if (Array.isArray(data.students)) data.students.forEach(visit);
}

function pickStudentToken(url, body) {
  let id = null;
  try { id = new URL(url).searchParams.get('studentId'); } catch (e) { /* ignore */ }
  if (!id && body && typeof body === 'object' && typeof body.studentId === 'string') id = body.studentId;
  if (id && studentTokens.has(id)) return studentTokens.get(id);
  return null;
}

async function api(endpoint, options = {}) {
  const baseUrl = getBaseUrl();
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  
  const headers = { 'x-elingu-test': 'true', ...options.headers };
  let body = options.body;

  if (!options.noAuth && !headers['Authorization'] && !headers['authorization'] && !headers['x-student-token']) {
    const tok = pickStudentToken(url, body) || (/\/api\/students\/profiles(\?|$)/.test(url) ? lastStudentToken : null);
    if (tok) headers['Authorization'] = 'Bearer ' + tok;
  }

  if (body && typeof body === 'object' && !(body instanceof Buffer) && !(body instanceof URLSearchParams)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    body = JSON.stringify(body);
  }

  const fetchOptions = {
    method: options.method || 'GET',
    headers,
    body
  };

  try {
    const res = await fetch(url, fetchOptions);
    const contentType = res.headers.get('content-type') || '';
    let data = null;
    let text = '';

    if (contentType.includes('application/json')) {
      try {
        data = await res.json();
      } catch (err) {
        text = await res.text().catch(() => '');
      }
    } else {
      text = await res.text().catch(() => '');
      data = text;
    }

    rememberStudentTokens(data);

    return {
      status: res.status,
      ok: res.ok,
      data,
      text,
      headers: res.headers,
      response: res
    };
  } catch (err) {
    throw new Error(`[api request failed] ${options.method || 'GET'} ${url}: ${err.message}`);
  }
}

/**
 * Register a learner, simulate the parent's approval, log in and return { id, handle, pin, token }.
 * Mirrors what a real family does, so tests exercise the same token + approval rules as production.
 */
async function createVerifiedStudent(prefix = 'Verified', overrides = {}) {
  const studentStore = require('../../studentStore');
  const handle = uniqueHandle(prefix);
  const pin = uniquePin();
  const email = uniqueEmail('parent');
  const reg = await api('/api/students/profile', {
    method: 'POST',
    body: { handle, pin, grade: 7, email, ...overrides }
  });
  if (reg.status !== 200) throw new Error('createVerifiedStudent: registration failed: ' + JSON.stringify(reg.data));
  const id = reg.data.student.id;
  studentStore.setStudentParentVerified(id);
  const login = await api('/api/students/login', { method: 'POST', body: { handleOrEmail: handle, pin } });
  if (login.status !== 200) throw new Error('createVerifiedStudent: login failed: ' + JSON.stringify(login.data));
  const token = login.data.sessionToken || (login.data.student && login.data.student.sessionToken) || null;
  if (token) { studentTokens.set(id, token); lastStudentToken = token; }
  return { id, handle, pin, email, token };
}

/**
 * Register school staff the way a real school does: the request is made, a Headteacher approves it, the teacher signs in.
 * Same arguments as api(); on success the response also carries data.token so older tests can keep using it.
 */
async function registerTeacher(endpoint, options = {}) {
  const res = await api(endpoint, options);
  if (res.status === 200 && res.data && res.data.pendingApproval) {
    const teacherStore = require('../../teacherStore');
    const t = res.data.teacher;
    teacherStore.decideStaff(t.schoolId, t.id, true);
    const b = options.body || {};
    const login = await api('/api/teacher/login', { method: 'POST', body: { identifier: b.email || b.phone, password: b.password } });
    if (login.data && login.data.token) res.data.token = login.data.token;
  }
  return res;
}

// ── ASSERTION UTILITIES ──────────────────────────────────────

function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new Error(`FAIL: ${message}`);
  }
}

function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`FAIL: Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}. ${message}`);
  }
}

function assertNotEqual(actual, expected, message = '') {
  if (actual === expected) {
    throw new Error(`FAIL: Expected actual not to equal ${JSON.stringify(expected)}. ${message}`);
  }
}

function assertDeepEqual(actual, expected, message = '') {
  const actStr = JSON.stringify(actual);
  const expStr = JSON.stringify(expected);
  if (actStr !== expStr) {
    throw new Error(`FAIL: Deep equal mismatch.\nExpected: ${expStr}\nReceived: ${actStr}\n${message}`);
  }
}

function assertIncludes(actual, search, message = '') {
  if (typeof actual === 'string' && !actual.includes(search)) {
    throw new Error(`FAIL: String "${actual.substring(0, 100)}..." does not include "${search}". ${message}`);
  } else if (Array.isArray(actual) && !actual.includes(search)) {
    throw new Error(`FAIL: Array does not contain ${JSON.stringify(search)}. ${message}`);
  }
}

function assertMatches(actual, regex, message = '') {
  if (!regex.test(String(actual))) {
    throw new Error(`FAIL: "${actual}" does not match regex ${regex}. ${message}`);
  }
}

function assertBetween(actual, min, max, message = '') {
  if (actual < min || actual > max) {
    throw new Error(`FAIL: Value ${actual} is not between ${min} and ${max}. ${message}`);
  }
}

async function assertThrows(fn, message = 'Expected function to throw') {
  let threw = false;
  try {
    await fn();
  } catch (err) {
    threw = true;
  }
  if (!threw) {
    throw new Error(`FAIL: ${message}`);
  }
}

// ── FIXTURE GENERATORS ───────────────────────────────────────

function uniqueId(prefix = 'id') {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
}

function uniqueHandle(prefix = 'Learner') {
  return `${prefix}_${crypto.randomBytes(3).toString('hex')}`.slice(0, 20);
}

function uniqueEmail(prefix = 'parent') {
  return `${prefix}_${Date.now()}_${crypto.randomBytes(2).toString('hex')}@elingu-test.local`;
}

function uniquePhone() {
  const num = Math.floor(10000000 + Math.random() * 90000000);
  return `07${num}`;
}

function uniquePin() {
  // Generates valid 4-digit non-sequential PIN
  const validPins = ['8492', '5931', '7284', '3951', '6184', '9472', '8361', '5284', '6937', '4829'];
  return validPins[Math.floor(Math.random() * validPins.length)];
}

function uniqueSchoolCode(prefix = 'SCH') {
  return `${prefix}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
}

// ── AUTH HELPERS ─────────────────────────────────────────────

function createTeacherToken(teacherObj) {
  return authUtils.generateTeacherToken(teacherObj);
}

function createAdminToken(adminObj) {
  return authUtils.generateAdminToken(adminObj);
}

module.exports = {
  get BASE_URL() { return getBaseUrl(); },
  get TEST_PORT() { return process.env.TEST_PORT || process.env.PORT || 3000; },
  getBaseUrl,
  api,
  createVerifiedStudent,
  registerTeacher,
  assert,
  assertEqual,
  assertNotEqual,
  assertDeepEqual,
  assertIncludes,
  assertMatches,
  assertBetween,
  assertThrows,
  uniqueId,
  uniqueHandle,
  uniqueEmail,
  uniquePhone,
  uniquePin,
  uniqueSchoolCode,
  createTeacherToken,
  createAdminToken
};
