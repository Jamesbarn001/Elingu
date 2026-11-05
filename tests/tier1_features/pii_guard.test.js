// Personal details are removed before anything is sent to an AI provider; the nickname is kept.
const fs = require('fs');
const path = require('path');
const piiGuard = require('../../piiGuard');
const studentStore = require('../../studentStore');
const read = (p) => fs.readFileSync(path.join(__dirname, '..', '..', p), 'utf8');

module.exports = {
  'TC-PII-01: Phone numbers, emails and ID numbers are removed, maths numbers are not': async (ctx) => {
    const t = piiGuard.redact('Call me on 0712 345 678 or +254-722-111-222 or 254733444555, email wanji@gmail.com, national ID 12345678. Now solve 123456789 + 0.5, 0712 + 3 and 4,500,000 / 25.');
    ['0712 345 678', '722-111-222', '254733444555', 'wanji@gmail.com', '12345678.'].forEach(x => ctx.assert(t.indexOf(x) === -1, 'still present: ' + x));
    ctx.assert(t.indexOf('123456789 + 0.5') !== -1 && t.indexOf('4,500,000 / 25') !== -1, 'ordinary numbers are untouched');
    ctx.assert(/\[phone number removed\]/.test(t) && /\[email removed\]/.test(t) && /\[ID removed\]/.test(t));
  },

  'TC-PII-02: The nickname stays; the real name and school name go': async (ctx) => {
    const st = { handle: 'Amani', realName: 'Wanjiku Kamau Njeri', school: 'Kilimani Junior Secondary' };
    const k = piiGuard.knownFor(st);
    const t = piiGuard.redact("I'm Wanjiku from Kilimani Junior Secondary. My friends call me Amani. Kamau is my dad's name.", k);
    ctx.assert(t.indexOf('Wanjiku') === -1 && t.indexOf('Kilimani Junior Secondary') === -1 && t.indexOf('Kamau') === -1, 'real name and school removed: ' + t);
    ctx.assert(t.indexOf('Amani') !== -1, 'nickname kept');
    // a real-name part that equals the nickname must not be removed
    const same = piiGuard.knownFor({ handle: 'Njeri', realName: 'Wanjiku Njeri' });
    ctx.assert(piiGuard.redact('Hello Njeri', same).indexOf('Njeri') !== -1, 'nickname that is also part of the real name is kept');
  },

  'TC-PII-03: Everything sent to a provider is cleaned together (messages and both instruction blocks)': async (ctx) => {
    const k = piiGuard.knownFor({ handle: 'Amani', school: 'Moi Forces Academy' });
    const out = piiGuard.prepareForProvider(
      [{ role: 'user', content: 'my number is 0711000111' }, { role: 'assistant', content: 'ok Amani' }],
      'Static for teacher@school.ke', '- School: Moi Forces Academy', k);
    ctx.assert(out.messages[0].content.indexOf('0711000111') === -1, 'message cleaned');
    ctx.assertEqual(out.messages[1].content, 'ok Amani');
    ctx.assert(out.staticPrompt.indexOf('teacher@school.ke') === -1, 'static prompt cleaned');
    ctx.assert(out.dynamicPrompt.indexOf('Moi Forces Academy') === -1, 'dynamic prompt cleaned');
  },

  'TC-PII-04: The tutor is personalised by nickname but is told only the kind of school': async (ctx) => {
    const src = read('server.js');
    ctx.assert(/Learner Name \/ Nickname\*\*: \$\{handle/.test(src), 'nickname still goes to the tutor');
    ctx.assert(!/\*\*School\*\*: \$\{school/.test(src), 'the school name is not put in the instructions');
    ctx.assert(/schoolKind\(isBritish\)/.test(src), 'only the kind of school is sent');
  },

  'TC-PII-05: Every route that calls the AI cleans the text first': async (ctx) => {
    const src = read('server.js');
    ctx.assert(/prepareForProvider\(messages, staticPrompt, dynamicPrompt, pii\)/.test(src), 'callLLM cleans everything before choosing a provider');
    ctx.assert(/callLLM\(activeMessages, staticPrompt, dynamicPrompt, \{ maxTokens, pii: piiKnown \}\)/.test(src), 'chat passes what to remove');
    ctx.assert(/piiGuard\.redact\(messages\.slice\(-8\)/.test(src), "Tonight's guide transcript is cleaned");
    ctx.assert(/reasonKnown/.test(src), 'concept check is cleaned');
  },

  'TC-PII-06: A real learner record yields the right things to remove': async (ctx) => {
    const v = await ctx.createVerifiedStudent('Pii', {});
    const rec = studentStore.getStudentById(v.id);
    const k = piiGuard.knownFor(Object.assign({}, rec, { realName: 'Chebet Cheruiyot', school: 'Hospital Hill School' }));
    const t = piiGuard.redact('Chebet from Hospital Hill School here, ' + v.handle + ' is my nickname', k);
    ctx.assert(t.indexOf('Chebet') === -1 && t.indexOf('Hospital Hill') === -1, 'removed: ' + t);
    ctx.assert(t.indexOf(v.handle) !== -1, 'nickname kept');
  },

  'TC-PII-08: The tutor is told a usual age for the grade, never the real age': async (ctx) => {
    ctx.assertEqual(piiGuard.usualAge(7, false), '12-13');
    ctx.assertEqual(piiGuard.usualAge(10, true), '14-15');
    ctx.assertEqual(piiGuard.usualAge(99, false), '12-16');
    const src = read('server.js');
    ctx.assert(!/Learner Age\*\*/.test(src) && !/\$\{age\b/.test(src), 'the exact age is no longer put in the instructions');
    ctx.assert(/usualAge\(grade, isBritish\)/.test(src), 'a usual age for the grade is used');
    ctx.assert(/Never ask their age/.test(src) && /Treat every learner as a child for safety/.test(src), 'tutor may adjust from writing style but never asks the age and keeps safeguarding');
    ctx.assert(!/age: studentRecord\.age/.test(src), 'the learner age is not even copied into the tutor context');
  },

  'TC-PII-09: The microphone route needs a signed-in learner': async (ctx) => {
    const anon = await ctx.api('/api/transcribe', { method: 'POST', noAuth: true, body: { audio: 'data:audio/webm;base64,AAAA' } });
    ctx.assertEqual(anon.status, 401);
    const html = read('public/index.html');
    ctx.assert(/fetch\('\/api\/transcribe'[\s\S]{0,200}Authorization/.test(html), 'the app sends the learner sign-in with the recording');
  },

  'TC-PII-07: The privacy notice says what is removed and what is still sent': async (ctx) => {
    const res = await fetch(ctx.getBaseUrl() + '/privacy');
    const html = await res.text();
    ctx.assert(/automatically remove phone numbers/.test(html), 'says what is removed');
    ctx.assert(/nickname/.test(html) && /county/.test(html), 'says what is still sent');
    ctx.assert(!/complies fully|compliant|certified/i.test(html), 'makes no compliance claim');
  }
};
