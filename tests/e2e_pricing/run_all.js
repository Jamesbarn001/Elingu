#!/usr/bin/env node
// ============================================================
// tests/e2e_pricing/run_all.js — E2E Pricing & Payments Test Runner
// Opaque-box, requirement-driven test suite runner (Tiers 1–4)
// Exit codes: 0 = All Passed, 1 = Any Failure.
// ============================================================

process.env.NODE_ENV = process.env.NODE_ENV || 'test';
require('../helpers/isolatedData');   // tests use their own throw-away data folder, never the real data/

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const testContext = require('../helpers/testContext');

// Parse CLI flags
const args = process.argv.slice(2);
function getArgValue(name, shortName) {
  for (let i = 0; i < args.length; i++) {
    if (args[i] === name || args[i] === shortName) return args[i + 1];
    if (args[i].startsWith(`${name}=`)) return args[i].split('=')[1];
  }
  return null;
}

const tierArg = getArgValue('--tier', '-t');
const fileFilter = getArgValue('--file', '-f');
const bail = args.includes('--bail') || args.includes('-b');
const customPort = getArgValue('--port', '-p') || process.env.TEST_PORT || process.env.PORT || '3000';
process.env.TEST_PORT = customPort;
process.env.PORT = customPort;

const ROOT_DIR = path.resolve(__dirname, '..', '..');
const SUITE_DIR = __dirname;
const LOGS_DIR = path.join(ROOT_DIR, 'docs', 'teamwork_exhaust', 'tests');
if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR, { recursive: true });
}

let serverProcess = null;
let serverSpawnedByRunner = false;

async function isServerRunning(port) {
  try {
    const res = await fetch(`http://localhost:${port}/api/health`, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch (e) {
    return false;
  }
}

async function startServerIfNeeded(port) {
  const alreadyRunning = await isServerRunning(port);
  if (alreadyRunning) {
    console.log(`📡 Connected to existing Elingu server on port ${port}.`);
    return;
  }

  console.log(`🚀 Spawning Elingu server on port ${port}...`);
  serverSpawnedByRunner = true;

  serverProcess = spawn(process.execPath, ['server.js'], {
    cwd: ROOT_DIR,
    env: { ...process.env, PORT: String(port), NODE_ENV: 'test' },
    stdio: ['ignore', 'pipe', 'pipe']
  });

  serverProcess.on('error', (err) => {
    console.error('❌ Failed to start server process:', err.message);
  });

  // Wait for health check
  const start = Date.now();
  const timeoutMs = 25000;
  while (Date.now() - start < timeoutMs) {
    if (await isServerRunning(port)) {
      console.log(`✅ Server is healthy and listening on port ${port} (${Date.now() - start}ms)`);
      return;
    }
    await new Promise(r => setTimeout(r, 400));
  }

  throw new Error(`Timeout waiting for server to start on port ${port} after ${timeoutMs}ms.`);
}

function stopServer() {
  if (serverSpawnedByRunner && serverProcess) {
    try {
      console.log('\n🛑 Stopping test server...');
      if (process.platform === 'win32') {
        const { execSync } = require('child_process');
        try { execSync(`taskkill /pid ${serverProcess.pid} /T /F`, { stdio: 'ignore' }); } catch (e) {}
      } else {
        serverProcess.kill('SIGTERM');
      }
    } catch (e) {
      // ignore
    }
    serverProcess = null;
  }
}

process.on('SIGINT', () => { stopServer(); process.exit(1); });
process.on('SIGTERM', () => { stopServer(); process.exit(1); });

// Discover test files in tests/e2e_pricing/
function getTestFiles() {
  const allFiles = [
    path.join(SUITE_DIR, 'payment_security.test.js'),
    path.join(SUITE_DIR, 'catalogue_lifecycle.test.js'),
    path.join(SUITE_DIR, 'payment_providers.test.js'),
    path.join(SUITE_DIR, 'curriculum_switch.test.js'),
    path.join(SUITE_DIR, 'scenarios.test.js')
  ].filter(f => fs.existsSync(f));

  if (fileFilter) {
    return allFiles.filter(f => path.basename(f).toLowerCase().includes(fileFilter.toLowerCase()));
  }
  return allFiles;
}

// Categorize test name into Tier
function classifyTier(testName) {
  if (testName.startsWith('TC-BND-')) return 2;
  if (testName.startsWith('TC-CRS-')) return 3;
  if (testName.startsWith('TC-SCN-')) return 4;
  return 1; // Default TC-SEC, TC-CAT, TC-PRV, TC-SWT
}

async function runSuite() {
  const startTime = Date.now();
  console.log('════════════════════════════════════════════════════════════════════════');
  console.log('💳 ELINGU PRICING, PACKAGING & PAYMENTS — E2E TEST SUITE');
  console.log(`🎯 Methodology: 4-Tier Opaque-Box Requirements Verification | Port: ${customPort}`);
  console.log('════════════════════════════════════════════════════════════════════════\n');

  await startServerIfNeeded(customPort);

  const requestedTiers = tierArg
    ? tierArg.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n))
    : [1, 2, 3, 4];

  const results = {
    startTime: new Date().toISOString(),
    tiers: {
      1: { name: 'Tier 1: Feature Coverage (Security, Catalogue, Providers, Switch)', passed: 0, failed: 0, tests: [] },
      2: { name: 'Tier 2: Boundary & Corner Cases (Amounts, Timestamps, Grace Period)', passed: 0, failed: 0, tests: [] },
      3: { name: 'Tier 3: Cross-Feature Combinations (Pairwise Interactions)', passed: 0, failed: 0, tests: [] },
      4: { name: 'Tier 4: Real-World Workload Scenarios (Full Parent User Journey)', passed: 0, failed: 0, tests: [] }
    },
    totalTests: 0,
    totalPassed: 0,
    totalFailed: 0,
    failures: []
  };

  const files = getTestFiles();
  const logLines = [];
  function log(msg) {
    console.log(msg);
    logLines.push(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }

  for (const file of files) {
    const fileName = path.basename(file);
    log(`\n┌───────────────────────────────────────────────────────────────────────┐`);
    log(`│ 📂 ${fileName.padEnd(67)} │`);
    log(`└───────────────────────────────────────────────────────────────────────┘`);

    let suiteExport = null;
    try {
      suiteExport = require(file);
    } catch (err) {
      log(`    ❌ Failed to load test file: ${err.message}`);
      results.totalFailed++;
      results.failures.push({ file: fileName, test: 'MODULE_LOAD', error: err.stack });
      if (bail) break;
      continue;
    }

    if (typeof suiteExport === 'object' && suiteExport !== null) {
      const testNames = Object.keys(suiteExport);
      for (const testName of testNames) {
        const testFn = suiteExport[testName];
        if (typeof testFn !== 'function') continue;

        const tier = classifyTier(testName);
        if (!requestedTiers.includes(tier)) continue;

        results.totalTests++;
        const t0 = Date.now();
        try {
          await testFn(testContext);
          const dur = Date.now() - t0;
          results.totalPassed++;
          results.tiers[tier].passed++;
          results.tiers[tier].tests.push({ name: testName, status: 'PASS', durationMs: dur });
          log(`    ✓ [Tier ${tier}] ${testName} (${dur}ms)`);
        } catch (err) {
          const dur = Date.now() - t0;
          results.totalFailed++;
          results.tiers[tier].failed++;
          results.tiers[tier].tests.push({ name: testName, status: 'FAIL', durationMs: dur, error: err.message });
          results.failures.push({ tier, file: fileName, test: testName, error: err.message, stack: err.stack });
          log(`    ✗ [Tier ${tier}] ${testName} (${dur}ms)`);
          log(`      🔴 ${err.message}`);
          if (bail) break;
        }
      }
    }

    if (bail && results.totalFailed > 0) break;
  }

  const durationTotalMs = Date.now() - startTime;
  results.durationTotalMs = durationTotalMs;

  // Print Summary Table
  log('\n════════════════════════════════════════════════════════════════════════');
  log('📊 E2E PRICING & PAYMENTS EXECUTION SUMMARY');
  log('════════════════════════════════════════════════════════════════════════');
  for (const t of requestedTiers) {
    const tierData = results.tiers[t];
    const total = tierData.passed + tierData.failed;
    const rate = total > 0 ? ((tierData.passed / total) * 100).toFixed(1) : '100.0';
    const statusIcon = tierData.failed === 0 ? '✅' : '❌';
    log(`Tier ${t}: ${tierData.passed}/${total} Passed (${rate}%) ${statusIcon} — ${tierData.name}`);
  }
  log('────────────────────────────────────────────────────────────────────────');
  log(`Total Tests Run:  ${results.totalTests}`);
  log(`Total Passed:     ${results.totalPassed} ${results.totalPassed > 0 ? '✅' : ''}`);
  log(`Total Failed:     ${results.totalFailed} ${results.totalFailed > 0 ? '❌' : ''}`);
  log(`Total Duration:   ${(durationTotalMs / 1000).toFixed(2)}s`);
  log('════════════════════════════════════════════════════════════════════════\n');

  if (results.failures.length > 0) {
    log('🔴 FAILURE DETAILS:');
    for (const f of results.failures) {
      log(`  • [Tier ${f.tier || '?'}] ${f.file} -> ${f.test}`);
      log(`    Error: ${f.error}`);
    }
    log('');
  }

  // Save log files
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  const logFile = path.join(LOGS_DIR, `e2e_pricing_${ts}.log`);
  const jsonFile = path.join(LOGS_DIR, `e2e_pricing_${ts}.json`);

  try {
    fs.writeFileSync(logFile, logLines.join('\n'), 'utf8');
    fs.writeFileSync(jsonFile, JSON.stringify(results, null, 2), 'utf8');
    log(`📄 Execution log written to: ${logFile}`);
    log(`📄 Execution JSON written to: ${jsonFile}\n`);
  } catch (e) {
    // ignore
  }

  stopServer();

  if (results.totalFailed > 0) {
    log(`❌ Test run completed with ${results.totalFailed} failure(s). Exiting with code 1.\n`);
    process.exit(1);
  } else {
    log(`🎉 All tests passed successfully! Exiting with code 0.\n`);
    process.exit(0);
  }
}

runSuite().catch(err => {
  console.error('Fatal runner error:', err);
  stopServer();
  process.exit(1);
});
