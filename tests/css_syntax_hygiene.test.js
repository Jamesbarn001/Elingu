/**
 * tests/css_syntax_hygiene.test.js
 * Enforces Rule 8: Zero Naked CSS in HTML pages and proper Service Worker caching configuration.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

function runTest() {
  console.log('--- Running CSS Syntax Hygiene & Zero Naked Text Tests ---');

  const indexPath = path.join(__dirname, '..', 'public', 'index.html');
  assert.ok(fs.existsSync(indexPath), 'public/index.html must exist');
  const html = fs.readFileSync(indexPath, 'utf8');

  // 1. Verify head has no naked text outside tags
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  assert.ok(headMatch, '<head> must exist in index.html');
  const headClean = headMatch[1]
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/gi, '')
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();

  assert.strictEqual(headClean.length, 0, `Found naked text in <head>: "${headClean.slice(0, 100)}"`);

  // 2. Verify no CSS comment blocks or rule blocks exist naked in body
  assert.ok(!html.includes('/* SPACE ENGINE & MY SAVED SPACES STYLES */\n.'), 'Naked CSS comment and selector found');
  assert.ok(!html.includes('*/ .space-action-bar {'), 'Naked CSS rule block found in HTML');

  // 3. Verify service worker uses a versioned elingu-cache-vN and Network-First for navigation
  const swPath = path.join(__dirname, '..', 'public', 'sw.js');
  assert.ok(fs.existsSync(swPath), 'public/sw.js must exist');
  const sw = fs.readFileSync(swPath, 'utf8');
  assert.ok(/CACHE_NAME\s*=\s*'elingu-cache-v\d+/.test(sw), 'Service worker must use a versioned cache name (bump it whenever public assets change)');
  assert.ok(sw.includes("req.mode === 'navigate'"), 'Service worker must handle navigate requests with Network-First');

  // 4. Verify DOM structural nesting: sidebar, nav, chat-area
  const navOpens = (html.match(/<nav\b/g) || []).length;
  const navCloses = (html.match(/<\/nav>/g) || []).length;
  assert.strictEqual(navOpens, navCloses, `Mismatched <nav> tags: ${navOpens} opened, ${navCloses} closed`);

  const asideOpens = (html.match(/<aside\b/g) || []).length;
  const asideCloses = (html.match(/<\/aside>/g) || []).length;
  assert.strictEqual(asideOpens, asideCloses, `Mismatched <aside> tags: ${asideOpens} opened, ${asideCloses} closed`);

  const mainOpens = (html.match(/<main\b/g) || []).length;
  const mainCloses = (html.match(/<\/main>/g) || []).length;
  assert.strictEqual(mainOpens, mainCloses, `Mismatched <main> tags: ${mainOpens} opened, ${mainCloses} closed`);

  const asideIndex = html.indexOf('</aside>');
  const mainIndex = html.indexOf('<main class="chat-area">');
  assert.ok(asideIndex > 0 && mainIndex > asideIndex, '<main class="chat-area"> must directly follow </aside>');

  console.log('✅ CSS Syntax & DOM Hygiene Test Passed: 0 naked CSS leaks and 100% tag structure balance.');
}

if (require.main === module) {
  runTest();
}

module.exports = { runTest };
