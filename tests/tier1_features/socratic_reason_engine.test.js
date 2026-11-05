// ============================================================
// Tier 1 — Feature 21: Live Socratic AI Reasoning & Multi-Subject Maps
// Verifies authentic textbook maps for all subjects and intelligent AI guidance
// ============================================================

const assert = require('assert');

module.exports = {
  'TC-SOC-01: Kiswahili Learn Map returns official KICD textbook strands and subtopics': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=8&subject=Kiswahili');
    assert.strictEqual(res.status, 200, 'Should return HTTP 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true, 'success must be true');
    assert.ok(data.map, 'Must contain map');
    assert.ok(data.map.title.includes('Kiswahili'), 'Title must mention Kiswahili');
    assert.ok(Array.isArray(data.map.stations) && data.map.stations.length >= 2, 'Must have at least 2 stations');
    
    // Check Sarufi / Upatanisho wa Ngeli
    const sarufi = data.map.stations.find(s => s.title.includes('Sarufi') || s.strand.includes('Sarufi'));
    assert.ok(sarufi, 'Must contain Sarufi station');
    assert.ok(sarufi.subtopics.length > 0, 'Must have subtopics in Sarufi');
    assert.ok(sarufi.subtopics[0].conceptPrimer.title, 'Must have concept primer title');
    assert.ok(sarufi.subtopics[0].conceptPrimer.workedExample, 'Must have concrete worked example');
  },

  'TC-SOC-02: Senior School Grade 10 Physics Learn Map returns Mechanics stations': async (ctx) => {
    const res = await ctx.api('/api/curriculum/map?curriculum=CBC&grade=10&subject=Physics');
    assert.strictEqual(res.status, 200, 'Should return HTTP 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true);
    assert.ok(data.map.title.includes('Physics'), 'Title must include Physics');
    assert.ok(data.map.stations.length >= 1, 'Must have Physics stations');
  },

  'TC-SOC-03: Socratic reasoning rejects empty input with 400 Bad Request': async (ctx) => {
    const res = await ctx.api('/api/curriculum/socratic-reason', {
      method: 'POST',
      body: {
        subtopicId: 'cbc_g8_math_s1_1',
        userText: '   '
      }
    });
    assert.strictEqual(res.status, 400, 'Empty input should return 400 Bad Request');
    assert.strictEqual(res.data.success, false);
  },

  'TC-SOC-04: Socratic reasoning handles "I don\'t know" with warm pedagogical hint (zero fake praise)': async (ctx) => {
    const res = await ctx.api('/api/curriculum/socratic-reason', {
      method: 'POST',
      body: {
        subtopicId: 'cbc_g8_math_s1_1',
        userText: 'i dont know',
        grade: 8,
        subject: 'Mathematics',
        curriculum: 'CBC'
      }
    });
    assert.strictEqual(res.status, 200, 'Should return 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true);
    assert.ok(data.reply, 'Must contain AI or heuristic reply');
    // Critical: Must NOT say "Brilliant reflection! You reasoned: i dont know"
    assert.ok(!data.reply.includes('Brilliant reflection! You reasoned: "i dont know"'), 'Must never give fake praise for idk');
    assert.strictEqual(data.isMastered, false, 'Should not be marked mastered on idk');
  },

  'TC-SOC-05: Socratic reasoning detects gibberish and gently re-anchors without echoing nonsense': async (ctx) => {
    const res = await ctx.api('/api/curriculum/socratic-reason', {
      method: 'POST',
      body: {
        subtopicId: 'cbc_g8_math_s1_1',
        userText: 'xWDQWDQwdqw',
        grade: 8,
        subject: 'Mathematics',
        curriculum: 'CBC'
      }
    });
    assert.strictEqual(res.status, 200, 'Should return 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true);
    assert.ok(data.reply, 'Must contain reply');
    assert.ok(!data.reply.includes('Brilliant reflection! You reasoned: "xWDQWDQwdqw"'), 'Must not give fake praise for keyboard mash');
    assert.strictEqual(data.isMastered, false, 'Should not mark gibberish as mastered');
  },

  'TC-SOC-06: Socratic reasoning evaluates genuine student explanation and marks mastered': async (ctx) => {
    const res = await ctx.api('/api/curriculum/socratic-reason', {
      method: 'POST',
      body: {
        subtopicId: 'cbc_g8_math_s1_1',
        userText: 'Because multiplying by negative one reverses the direction on the number line, so doing it twice returns to positive direction.',
        grade: 8,
        subject: 'Mathematics',
        curriculum: 'CBC'
      }
    });
    assert.strictEqual(res.status, 200, 'Should return 200 OK');
    const data = res.data;
    assert.strictEqual(data.success, true);
    assert.ok(data.reply, 'Must contain Socratic guidance reply');
    assert.strictEqual(data.isMastered, true, 'Genuine reasoning should be marked as mastered');
  }
};
