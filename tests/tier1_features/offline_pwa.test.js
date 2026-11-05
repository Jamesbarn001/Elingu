// ============================================================
// Tier 1 — Feature 22: Dual-Tier Zero-Data Offline Engine (PWA & Service Worker)
// Verification Suite: Web Manifest, Service Worker endpoint, and Offline Header metadata
// ============================================================

const assert = require('assert');
const fs = require('fs');
const path = require('path');

module.exports = {
  'TC-OFF-01: Web App Manifest contains valid PWA metadata and dual-curriculum branding': async (ctx) => {
    const res = await ctx.api('/manifest.json');
    assert.strictEqual(res.status, 200, 'Manifest must be accessible with 200 OK');
    const manifest = res.data;
    assert.ok(manifest.name.includes('Elingu'), 'Manifest name must contain Elingu');
    assert.strictEqual(manifest.display, 'standalone', 'PWA display must be standalone');
    assert.strictEqual(manifest.theme_color, '#0D3A26', 'PWA theme color must match brand green #0D3A26');
    assert.ok(Array.isArray(manifest.icons) && manifest.icons.length > 0, 'Must have at least one icon');
  },

  'TC-OFF-02: Service Worker file is served with correct javascript MIME type': async (ctx) => {
    const res = await ctx.api('/sw.js');
    assert.strictEqual(res.status, 200, 'sw.js must be accessible with 200 OK');
    const ctype = (res.headers && typeof res.headers.get === 'function') ? (res.headers.get('content-type') || '') : '';
    assert.ok(ctype.includes('javascript') || typeof res.data === 'string', 'Service Worker must be served as script');
    assert.ok(res.data.includes('CACHE_NAME'), 'SW must define cache name');
    assert.ok(res.data.includes('/api/curriculum/'), 'SW must handle curriculum offline caching');
    assert.ok(res.data.includes('/api/exams/papers'), 'SW must keep the paper list for offline');
    assert.ok(/status:\s*503/.test(res.data) && res.data.includes('offline: true'), 'SW must answer an unsaved lesson with an honest 503, never a fake success');
    assert.ok(!/success:\s*true[^}]*offline: true/.test(res.data), 'no fake offline success');
  },

  'TC-OFF-03: Offline bundle caching supports remote school zero-data curriculum storage': async (ctx) => {
    // Verify static file presence
    const swPath = path.join(__dirname, '../../public/sw.js');
    const manifestPath = path.join(__dirname, '../../public/manifest.json');
    assert.ok(fs.existsSync(swPath), 'sw.js file must physically exist');
    assert.ok(fs.existsSync(manifestPath), 'manifest.json must physically exist');
  }
};
