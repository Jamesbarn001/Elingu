// ============================================================
// Tier 1 — Feature 20: Metro-Style Topic Roadmap & Split Studio Engine
// Verification Suite: Curriculum Map API, Subtopic Lookup, and Concept Primers
// ============================================================

const assert = require('assert');

module.exports = {
  'TC-ROA-01: CBC Grade 8 Mathematics map returns ordered stations and subtopic stops': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=8&subject=Mathematics');
    assert.strictEqual(res.status, 200, 'Endpoint should return HTTP 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true, 'Response must have success: true');
    assert.ok(data.map, 'Must contain curriculum map');
    assert.strictEqual(data.map.curriculum, 'CBC', 'Curriculum must match CBC');
    assert.strictEqual(data.map.grade, 8, 'Grade must match 8');
    assert.ok(Array.isArray(data.map.stations), 'Stations must be an array');
    assert.ok(data.map.stations.length >= 3, 'Must have at least 3 stations');
    
    // Check first station structure
    const s1 = data.map.stations[0];
    assert.ok(s1.title, 'Station must have title');
    assert.ok(s1.strand, 'Station must have strand');
    assert.ok(Array.isArray(s1.subtopics) && s1.subtopics.length > 0, 'Must have subtopics');
    assert.ok(s1.subtopics[0].conceptPrimer, 'Subtopic must have conceptPrimer');
    assert.ok(s1.subtopics[0].conceptPrimer.formula, 'Concept primer must have formula');
  },

  'TC-ROA-02: British IGCSE Year 10 Mathematics map returns Cambridge 0580 syllabus stations': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=BRITISH&grade=10&subject=Mathematics');
    assert.strictEqual(res.status, 200, 'Endpoint should return HTTP 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true, 'Response must have success: true');
    assert.ok(data.map, 'Must contain curriculum map');
    assert.strictEqual(data.map.curriculum, 'BRITISH', 'Curriculum must match BRITISH');
    assert.strictEqual(data.map.grade, 10, 'Grade must match 10');
    assert.ok(Array.isArray(data.map.stations) && data.map.stations.length >= 3, 'Must have Cambridge stations');

    // Verify Surds & Non-Calculator rigor
    const surdStation = data.map.stations.find(s => s.title.includes('Surds') || s.title.includes('Number'));
    assert.ok(surdStation, 'Must contain Surds / Number station');
    assert.ok(surdStation.subtopics[0].conceptPrimer.tagline, 'Must contain tagline');
  },

  'TC-ROA-03: Subtopic lookup by ID returns primer, socratic prompt, and exam focus': async (ctx) => {
    const subtopicId = 'cbc_g8_math_s1_1';
    const res = await ctx.api(`/api/curriculum/subtopic/${subtopicId}`);
    assert.strictEqual(res.status, 200, 'Should return HTTP 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true, 'Success must be true');
    assert.ok(data.subtopic, 'Must return subtopic object');
    assert.strictEqual(data.subtopic.id, subtopicId, 'Subtopic ID must match');
    assert.ok(data.subtopic.socraticPrompt, 'Must include Socratic inquiry prompt');
    assert.ok(data.subtopic.examFocus, 'Must include exam marking focus');
    assert.ok(data.station, 'Must include parent station metadata');
  },

  'TC-ROA-04: Non-existent subtopic ID returns 404 Not Found': async (ctx) => {
    const res = await ctx.api('/api/curriculum/subtopic/non_existent_subtopic_xyz');
    assert.strictEqual(res.status, 404, 'Unknown subtopic should return 404');
    const data = res.data;
    assert.strictEqual(data.success, false, 'Success must be false on 404');
    assert.ok(data.error, 'Must contain error message');
  },

  'TC-ROA-05: Concept Primer provides authentic real-world context and visual model': async (ctx) => {
    const res = await ctx.api('/api/curriculum/subtopic/bri_y10_math_s2_1');
    assert.strictEqual(res.status, 200, 'Should return HTTP 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true, 'Success must be true');
    const primer = data.subtopic.conceptPrimer;
    assert.ok(primer.title, 'Primer must have title');
    assert.ok(primer.body, 'Primer must have body text');
    assert.ok(primer.realWorldContext, 'Primer must have realWorldContext');
    assert.ok(primer.visualBadge, 'Primer must have visualBadge');
  },

  'TC-ROA-06: Complete Grade Spectrum & Curriculum Isolation (CBC Grades 6-12 & British Years 7-11)': async (ctx) => {
    // 1. Check all CBC grades
    for (const g of [6, 7, 8, 9, 10, 11, 12]) {
      const res = await ctx.api(`/api/curriculum/map?curriculum=CBC&grade=${g}&subject=Mathematics`);
      assert.strictEqual(res.status, 200, `CBC Grade ${g} must return 200 OK`);
      assert.strictEqual(res.data.map.curriculum, 'CBC', `CBC Grade ${g} must have curriculum CBC`);
      assert.strictEqual(res.data.map.grade, g, `CBC Grade ${g} must match grade ${g}`);
      assert.ok(res.data.map.stations.length >= 3, `CBC Grade ${g} must have at least 3 stations`);
      assert.ok(res.data.map.stations.every(s => s.status !== 'locked'), `CBC Grade ${g} must have all stations unlocked`);
    }

    // 2. Check all British years
    for (const y of [7, 8, 9, 10, 11]) {
      const res = await ctx.api(`/api/curriculum/map?curriculum=BRITISH&grade=${y}&subject=Mathematics`);
      assert.strictEqual(res.status, 200, `British Year ${y} must return 200 OK`);
      assert.strictEqual(res.data.map.curriculum, 'BRITISH', `British Year ${y} must have curriculum BRITISH`);
      assert.strictEqual(res.data.map.grade, y, `British Year ${y} must match grade ${y}`);
      assert.ok(res.data.map.stations.length >= 3, `British Year ${y} must have at least 3 stations`);
      assert.ok(res.data.map.stations.every(s => s.status !== 'locked'), `British Year ${y} must have all stations unlocked`);
    }
  }
};
