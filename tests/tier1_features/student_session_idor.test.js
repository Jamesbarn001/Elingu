// ============================================================
// Tier 1 — Feature 4: Student Session Tokens & IDOR Defense
// ORIGINAL_REQUEST §R2, TEST_INFRA.md Feature #4
// ============================================================

module.exports = {
  'TC-STU-16: Save student inquiry session messages for specific subject': async (ctx) => {
    const { id: studentId } = await ctx.createVerifiedStudent('SessSave');
    const messages = [
      { role: 'user', content: 'What is a fraction?' },
      { role: 'assistant', content: 'Think of sharing a chapati between two people. How much does each person get?' }
    ];

    const res = await ctx.api('/api/students/session', {
      method: 'POST',
      body: {
        studentId,
        subject: 'Mathematics',
        messages
      }
    });

    ctx.assertEqual(res.status, 200, 'Saving session should return 200 OK');
    ctx.assertEqual(res.data.success, true);
  },

  'TC-STU-17: Retrieve session messages returns saved conversation and timestamp': async (ctx) => {
    const { id: studentId } = await ctx.createVerifiedStudent('SessGet');
    const messages = [
      { role: 'user', content: 'What is force in science?' },
      { role: 'assistant', content: 'When you kick a football, what are you applying to it?' }
    ];

    await ctx.api('/api/students/session', {
      method: 'POST',
      body: { studentId, subject: 'Science & Technology', messages }
    });

    const getRes = await ctx.api(`/api/students/session?studentId=${studentId}&subject=Science%20%26%20Technology`);
    ctx.assertEqual(getRes.status, 200, 'Session GET should return 200 OK');
    ctx.assertEqual(getRes.data.messages.length, 2, 'Should return saved messages array');
    ctx.assertEqual(getRes.data.messages[0].content, 'What is force in science?');
    ctx.assert(getRes.data.lastUpdated, 'Response must include lastUpdated timestamp');
  },

  'TC-STU-18: Missing studentId in session retrieval returns 400 Bad Request': async (ctx) => {
    const res = await ctx.api('/api/students/session?subject=Mathematics');
    ctx.assertEqual(res.status, 400, 'Missing studentId must return 400 Bad Request');
    ctx.assertIncludes(res.data.error, 'Student ID');
  },

  'TC-STU-19: Missing subject in session retrieval returns 400 Bad Request': async (ctx) => {
    const res = await ctx.api('/api/students/session?studentId=some_student_id');
    ctx.assertEqual(res.status, 400, 'Missing subject must return 400 Bad Request');
    ctx.assertIncludes(res.data.error, 'subject');
  },

  'TC-STU-20: Session partition isolation: Student B does not leak into Student A': async (ctx) => {
    const { id: studentA } = await ctx.createVerifiedStudent('IsoA');
    const { id: studentB } = await ctx.createVerifiedStudent('IsoB');

    // Save session for Student A
    await ctx.api('/api/students/session', {
      method: 'POST',
      body: {
        studentId: studentA,
        subject: 'English',
        messages: [{ role: 'user', content: 'Student A private poem inquiry' }]
      }
    });

    // Student B requests English session
    const resB = await ctx.api(`/api/students/session?studentId=${studentB}&subject=English`);
    ctx.assertEqual(resB.status, 200);
    // Student B's session should be empty array
    ctx.assertEqual(resB.data.messages.length, 0, "Student B's session must not contain Student A's messages");
  },

  'TC-STU-20b: Session save without a token is rejected (knowing a student id is not enough)': async (ctx) => {
    const stu = await ctx.createVerifiedStudent('NoTok');
    const res = await ctx.api('/api/students/session', {
      method: 'POST',
      noAuth: true,
      body: { studentId: stu.id, subject: 'Mathematics', messages: [] }
    });
    ctx.assertEqual(res.status, 401, 'Missing token must return 401');
  },

  'TC-STU-20c: Cross-student access with another learner\'s token is forbidden': async (ctx) => {
    const a = await ctx.createVerifiedStudent('CrossA');
    const b = await ctx.createVerifiedStudent('CrossB');
    const res = await ctx.api(`/api/students/session?studentId=${b.id}&subject=English`, {
      headers: { Authorization: 'Bearer ' + a.token }
    });
    ctx.assertEqual(res.status, 403, 'Student A must not read Student B');
  },

  'TC-STU-20d: Unverified learner (parent has not approved) cannot save sessions or chat': async (ctx) => {
    const handle = ctx.uniqueHandle('PendingKid');
    const pin = ctx.uniquePin();
    const reg = await ctx.api('/api/students/profile', {
      method: 'POST',
      body: { handle, pin, grade: 7, email: ctx.uniqueEmail('parent') }
    });
    ctx.assertEqual(reg.status, 200);
    const id = reg.data.student.id;
    const tok = reg.data.sessionToken;
    ctx.assert(tok, 'Sign-up still returns a token so the child can wait on the approval screen');

    const save = await ctx.api('/api/students/session', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + tok },
      body: { studentId: id, subject: 'Mathematics', messages: [] }
    });
    ctx.assertEqual(save.status, 403, 'Unverified learner must not save sessions');
    ctx.assertEqual(save.data.parentApprovalRequired, true);

    const chat = await ctx.api('/api/chat', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + tok },
      body: { studentId: id, grade: 7, subject: 'Mathematics', messages: [{ role: 'user', content: 'hello' }] }
    });
    ctx.assertEqual(chat.status, 403, 'Unverified learner must not use the tutor');

    const vs = await ctx.api(`/api/students/verification-status?studentId=${id}`, { noAuth: true });
    ctx.assertEqual(vs.status, 401, 'Verification status must not hand out data/tokens without a token');
  },

  'TC-STU-20e: There is no client-driven points endpoint any more (the server alone awards XP)': async (ctx) => {
    const stu = await ctx.createVerifiedStudent('PtsGone');
    const res = await ctx.api('/api/students/award-points', { method: 'POST', body: { studentId: stu.id, points: 25 } });
    ctx.assertEqual(res.status, 404, 'the old open endpoint must be gone');
    const me = await ctx.api('/api/gamification/me', { headers: { Authorization: 'Bearer ' + stu.token } });
    ctx.assertEqual(me.status, 200);
    ctx.assertEqual(me.data.xp, 0, 'a brand-new learner has earned nothing yet');
  }
};
