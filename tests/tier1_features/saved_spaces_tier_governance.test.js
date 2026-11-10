const assert = require('assert');
const http = require('http');
const fs = require('fs');
const path = require('path');
const pricingConfig = require('../../pricingConfig');

module.exports = {
  name: 'Feature 22: Elevated Sidebar Subjects & Daily Tier-Limited Save My Space Governance',
  run: async (ctx) => {
    const baseUrl = ctx.baseUrl || (ctx.getBaseUrl ? ctx.getBaseUrl() : 'http://localhost:3000');

    // 1. Verify pricingConfig tier limits
    assert.strictEqual(pricingConfig.PRICING_TIERS.free.limits.dailySavedSpaces, 1, 'Free tier must have 1 dailySavedSpace limit');
    assert.strictEqual(pricingConfig.PRICING_TIERS.standard.limits.dailySavedSpaces, 5, 'Standard tier must have 5 dailySavedSpaces limit');
    assert.strictEqual(pricingConfig.PRICING_TIERS.premium.limits.dailySavedSpaces, Infinity, 'Premium tier must have unlimited dailySavedSpaces');
    assert.strictEqual(pricingConfig.PRICING_TIERS.pilot.limits.dailySavedSpaces, 5, 'Pilot tier must have 5 dailySavedSpaces limit');

    // 2. Verify getDailySavedSpacesLimitForTier helper
    assert.strictEqual(pricingConfig.getDailySavedSpacesLimitForTier('free'), 1, 'Helper should return 1 for free');
    assert.strictEqual(pricingConfig.getDailySavedSpacesLimitForTier('FREE'), 1, 'Helper should be case-insensitive for FREE');
    assert.strictEqual(pricingConfig.getDailySavedSpacesLimitForTier('standard'), 5, 'Helper should return 5 for standard');
    assert.strictEqual(pricingConfig.getDailySavedSpacesLimitForTier('pilot'), 5, 'Helper should return 5 for pilot');
    assert.strictEqual(pricingConfig.getDailySavedSpacesLimitForTier('school'), 5, 'Helper should return 5 for school');
    assert.strictEqual(pricingConfig.getDailySavedSpacesLimitForTier('premium'), Infinity, 'Helper should return Infinity for premium');

    // 3. Test POST /api/analytics/events success
    const eventRes = await fetch(`${baseUrl}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'SPACE_SAVED',
        studentId: 'stu_test_space_123',
        type: 'lab',
        title: "Ohm's Law & Circuit Resistance",
        subject: 'Physics',
        turns: 8
      })
    });
    assert.strictEqual(eventRes.status, 200, 'POST /api/analytics/events should return 200 OK');
    const eventJson = await eventRes.json();
    assert.strictEqual(eventJson.success, true, 'Event response success must be true');
    assert.ok(eventJson.recordedAt, 'Event response must include recordedAt ISO timestamp');

    // 4. Test POST /api/analytics/events validation failure
    const badRes = await fetch(`${baseUrl}/api/analytics/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Missing required event and studentId' })
    });
    assert.strictEqual(badRes.status, 400, 'POST /api/analytics/events should return 400 when missing required fields');

    // 5. Verify index.html structural placement and functions
    const htmlPath = path.resolve(__dirname, '../../public/index.html');
    const html = fs.readFileSync(htmlPath, 'utf8');

    assert.ok(html.includes('id="sidebarPrimaryTabs"'), 'Sidebar must include sidebarPrimaryTabs');
    assert.ok(html.includes('id="tab-saved-spaces"'), 'Sidebar must include tab-saved-spaces');
    assert.ok(html.includes('id="sidebarSubjectsTitle"'), 'Sidebar must include sidebarSubjectsTitle');
    assert.ok(html.includes('handleSaveMySpace'), 'HTML script must implement handleSaveMySpace');
    assert.ok(html.includes('handleNewSpace'), 'HTML script must implement handleNewSpace');
    assert.ok(html.includes('renderSavedSpacesView'), 'HTML script must implement renderSavedSpacesView');
    assert.ok(html.includes(" Save My Space</span>"), 'HTML must feature the youth branding Save My Space');
    assert.ok(html.includes(" New Space</span>"), 'HTML must feature the youth branding New Space');

    // Verify ordering: Brain Deck & Saved Spaces come BEFORE My Subjects
    const idxPrimary = html.indexOf('id="sidebarPrimaryTabs"');
    const idxSubjects = html.indexOf('id="sidebarSubjectsTitle"');
    const idxSecondary = html.indexOf('Explore & Support');
    assert.ok(idxPrimary < idxSubjects, 'Primary tabs (Brain Deck & Saved Spaces) must appear before My Subjects');
    assert.ok(idxSubjects < idxSecondary, 'My Subjects must appear before Explore & Support');

    return true;
  }
};
