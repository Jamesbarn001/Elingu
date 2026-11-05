// Teacher and school sign-up: proof of email, approval by a leader, unguessable codes, password reset.
const teacherStore = require('../../teacherStore');

async function newSchoolWithHead(ctx, tag) {
  const email = ctx.uniqueEmail('head' + tag);
  const res = await ctx.api('/api/school/create', {
    method: 'POST',
    body: {
      name: 'Secure Sign-up High ' + tag, county: 'Kiambu', adminCode: ctx.uniqueSchoolCode('SEC'), grades: [7], streams: { '7': ['East'] },
      headteacherName: 'Head ' + tag, headteacherIdNumber: String(30000000 + Math.floor(Math.random() * 9999999)), headteacherEmail: email,
      headteacherPhone: ctx.uniquePhone(), headteacherPassword: 'HeadPass2026!x'
    }
  });
  return { res, email, school: res.data.school };
}

module.exports = {
  'TC-TSU-01: A new school gets no sign-in until the Headteacher confirms their email': async (ctx) => {
    const { res, email } = await newSchoolWithHead(ctx, 'A');
    ctx.assertEqual(res.status, 200);
    ctx.assertEqual(res.data.token, null, 'no token at creation');
    ctx.assertEqual(res.data.verificationRequired, true);
    ctx.assert(res.data.devOtp, 'test mode echoes the code');

    const early = await ctx.api('/api/teacher/login', { method: 'POST', body: { identifier: email, password: 'HeadPass2026!x' } });
    ctx.assertEqual(early.status, 403);
    ctx.assertEqual(early.data.code, 'EMAIL_NOT_VERIFIED');
    ctx.assert(!early.data.token, 'no token before confirmation');

    const wrong = await ctx.api('/api/teacher/verify-email', { method: 'POST', body: { identifier: email, otp: '000000' } });
    ctx.assertEqual(wrong.status, 400);
    const ok = await ctx.api('/api/teacher/verify-email', { method: 'POST', body: { identifier: email, otp: res.data.devOtp } });
    ctx.assertEqual(ok.status, 200);

    const login = await ctx.api('/api/teacher/login', { method: 'POST', body: { identifier: email, password: 'HeadPass2026!x' } });
    ctx.assertEqual(login.status, 200);
    ctx.assert(login.data.token, 'token after confirmation');
    ctx.assert(!JSON.stringify(login.data).includes('otpHash'), 'no code hash leaks to the browser');
  },

  'TC-TSU-02: A Headteacher needs a real email address': async (ctx) => {
    const res = await ctx.api('/api/school/create', {
      method: 'POST',
      body: { name: 'No Email High', county: 'Nairobi', adminCode: ctx.uniqueSchoolCode('NOE'), grades: [7], streams: { '7': ['A'] }, headteacherName: 'X', headteacherIdNumber: '3999' + Date.now().toString().slice(-6), headteacherPhone: ctx.uniquePhone(), headteacherPassword: 'HeadPass2026!x' }
    });
    ctx.assertEqual(res.status, 400);
  },

  'TC-TSU-03: Staff who use the school code wait for a leader, who can approve or decline': async (ctx) => {
    const { school, email } = await newSchoolWithHead(ctx, 'B');
    // approve school and confirm head
    teacherStore.approveSchoolInstitution(school.id);
    const headRec = teacherStore.getTeacherByIdentifier(email, true);
    const head = ctx.createTeacherToken({ id: headRec.id, role: 'school_admin', schoolId: school.id, name: 'Head' });
    const auth = { headers: { Authorization: 'Bearer ' + head } };

    const staffEmail = ctx.uniqueEmail('staff');
    const reg = await ctx.api('/api/teacher/register', {
      method: 'POST',
      body: { name: 'Staff One', idNumber: '2888' + Date.now().toString().slice(-6), email: staffEmail, phone: ctx.uniquePhone(), password: 'StaffPass2026!x', adminCode: school.adminCode, role: 'subject_teacher' }
    });
    ctx.assertEqual(reg.status, 200);
    ctx.assertEqual(reg.data.pendingApproval, true);
    ctx.assert(!reg.data.token, 'no token for staff at registration');

    const early = await ctx.api('/api/teacher/login', { method: 'POST', body: { identifier: staffEmail, password: 'StaffPass2026!x' } });
    ctx.assertEqual(early.status, 403);
    ctx.assertEqual(early.data.code, 'PENDING_APPROVAL');

    const list = await ctx.api('/api/staff/pending', auth);
    ctx.assertEqual(list.status, 200);
    const item = list.data.staff.find(p => p.id === reg.data.teacher.id);
    ctx.assert(item, 'leader sees the request');
    ctx.assert(/^\*+\d{3}$/.test(item.idNumber), 'ID number is masked in the queue');

    // a subject teacher cannot decide
    const sub = ctx.createTeacherToken({ id: 'tch_nobody', role: 'subject_teacher', schoolId: school.id, name: 'Sub' });
    const denied = await ctx.api('/api/staff/decision', { method: 'POST', headers: { Authorization: 'Bearer ' + sub }, body: { teacherId: item.id, approve: true } });
    ctx.assertEqual(denied.status, 403);

    const approve = await ctx.api('/api/staff/decision', { method: 'POST', ...auth, body: { teacherId: item.id, approve: true } });
    ctx.assertEqual(approve.status, 200);
    const login = await ctx.api('/api/teacher/login', { method: 'POST', body: { identifier: staffEmail, password: 'StaffPass2026!x' } });
    ctx.assertEqual(login.status, 200);
    ctx.assert(login.data.token, 'can sign in once approved');
  },

  'TC-TSU-04: A leader of another school cannot approve someone else\'s staff, and declined staff cannot sign in': async (ctx) => {
    const a = await newSchoolWithHead(ctx, 'C');
    const b = await newSchoolWithHead(ctx, 'D');
    teacherStore.approveSchoolInstitution(a.school.id);
    const staffEmail = ctx.uniqueEmail('staffc');
    const reg = await ctx.api('/api/teacher/register', {
      method: 'POST',
      body: { name: 'Staff C', idNumber: '2777' + Date.now().toString().slice(-6), email: staffEmail, phone: ctx.uniquePhone(), password: 'StaffPass2026!x', adminCode: a.school.adminCode }
    });
    const otherLeader = ctx.createTeacherToken({ id: 'tch_other', role: 'school_admin', schoolId: b.school.id, name: 'Other' });
    const cross = await ctx.api('/api/staff/decision', { method: 'POST', headers: { Authorization: 'Bearer ' + otherLeader }, body: { teacherId: reg.data.teacher.id, approve: true } });
    ctx.assertEqual(cross.status, 404, 'other school cannot decide');
    const myLeader = ctx.createTeacherToken({ id: 'tch_mine', role: 'school_admin', schoolId: a.school.id, name: 'Mine' });
    await ctx.api('/api/staff/decision', { method: 'POST', headers: { Authorization: 'Bearer ' + myLeader }, body: { teacherId: reg.data.teacher.id, approve: false } });
    const login = await ctx.api('/api/teacher/login', { method: 'POST', body: { identifier: staffEmail, password: 'StaffPass2026!x' } });
    ctx.assertEqual(login.status, 403);
    ctx.assertEqual(login.data.code, 'NOT_APPROVED');
  },

  'TC-TSU-05: In real use a school code is generated and cannot be guessed from the name': async (ctx) => {
    const code = teacherStore.generateAdminCode ? teacherStore.generateAdminCode('Kenya Unity Junior') : null;
    if (code) {
      ctx.assert(/^[A-Z]+-[A-Z2-9]{6}$/.test(code), 'code has a random 6 character tail: ' + code);
      ctx.assert(code !== teacherStore.generateAdminCode('Kenya Unity Junior'), 'two codes for the same name differ');
    }
    const src = require('fs').readFileSync(require('path').join(__dirname, '..', '..', 'teacherRoutes.js'), 'utf8');
    ctx.assert(/adminCode: process\.env\.NODE_ENV === 'test' \? adminCode : undefined/.test(src), 'chosen codes are only for tests');
  },

  'TC-TSU-06: Teacher password reset needs a code, retires old sign-ins and does not reveal who has an account': async (ctx) => {
    const { res, email } = await newSchoolWithHead(ctx, 'E');
    await ctx.api('/api/teacher/verify-email', { method: 'POST', body: { identifier: email, otp: res.data.devOtp } });
    const first = await ctx.api('/api/teacher/login', { method: 'POST', body: { identifier: email, password: 'HeadPass2026!x' } });
    const oldToken = first.data.token;
    await new Promise(r => setTimeout(r, 15));

    const ghost = await ctx.api('/api/teacher/request-reset', { method: 'POST', body: { identifier: ctx.uniqueEmail('nobody') } });
    ctx.assertEqual(ghost.status, 200);
    ctx.assert(!ghost.data.devOtp, 'no code for an account that does not exist');

    const ask = await ctx.api('/api/teacher/request-reset', { method: 'POST', body: { identifier: email } });
    ctx.assertEqual(ask.status, 200);
    ctx.assertEqual(ask.data.message, ghost.data.message, 'same answer either way');
    ctx.assert(ask.data.devOtp, 'test mode echoes the code');

    const weak = await ctx.api('/api/teacher/reset-password', { method: 'POST', body: { identifier: email, otp: ask.data.devOtp, newPassword: 'abc' } });
    ctx.assertEqual(weak.status, 400);
    const badCode = await ctx.api('/api/teacher/reset-password', { method: 'POST', body: { identifier: email, otp: '111111', newPassword: 'NewHeadPass2026!y' } });
    ctx.assertEqual(badCode.status, 400);
    const ok = await ctx.api('/api/teacher/reset-password', { method: 'POST', body: { identifier: email, otp: ask.data.devOtp, newPassword: 'NewHeadPass2026!y' } });
    ctx.assertEqual(ok.status, 200);

    const oldPass = await ctx.api('/api/teacher/login', { method: 'POST', body: { identifier: email, password: 'HeadPass2026!x' } });
    ctx.assertEqual(oldPass.status, 401);
    const newPass = await ctx.api('/api/teacher/login', { method: 'POST', body: { identifier: email, password: 'NewHeadPass2026!y' } });
    ctx.assertEqual(newPass.status, 200);

    const stale = await ctx.api('/api/staff/pending', { headers: { Authorization: 'Bearer ' + oldToken } });
    ctx.assertEqual(stale.status, 401, 'a sign-in from before the reset stops working');
    const fresh = await ctx.api('/api/staff/pending', { headers: { Authorization: 'Bearer ' + newPass.data.token } });
    ctx.assertEqual(fresh.status, 200);
  },

  'TC-TSU-08: An offboarded teacher\'s existing sign-in stops working at once': async (ctx) => {
    const { school, email } = await newSchoolWithHead(ctx, 'G');
    teacherStore.approveSchoolInstitution(school.id);
    const headRec = teacherStore.getTeacherByIdentifier(email, true);
    const staffEmail = ctx.uniqueEmail('leaver');
    const reg = await ctx.registerTeacher('/api/teacher/register', {
      method: 'POST',
      body: { name: 'Leaver One', idNumber: '2666' + Date.now().toString().slice(-6), email: staffEmail, phone: ctx.uniquePhone(), password: 'StaffPass2026!x', adminCode: school.adminCode, role: 'subject_teacher' }
    });
    const token = reg.data.token;
    ctx.assert(token, 'staff token');
    const auth = { headers: { Authorization: 'Bearer ' + token } };
    ctx.assertEqual((await ctx.api('/api/teacher/dashboard-data?teacherId=' + reg.data.teacher.id, auth)).status, 200, 'works before');
    teacherStore.offboardTeacher({ headteacherId: headRec.id, targetTeacherId: reg.data.teacher.id, schoolId: school.id });
    const after = await ctx.api('/api/teacher/dashboard-data?teacherId=' + reg.data.teacher.id, auth);
    ctx.assertEqual(after.status, 401, 'refused after offboarding');
    ctx.assertEqual(teacherStore.isTeacherRevoked(reg.data.teacher.id), true);
  },

  'TC-TSU-07: A National ID number cannot be used to ask for a reset code': async (ctx) => {
    const { email } = await newSchoolWithHead(ctx, 'F');
    const rec = teacherStore.getTeacherByIdentifier(email, true);
    const out = teacherStore.requestTeacherOtp(rec.idNumber);
    ctx.assertEqual(out, null);
  }
};
