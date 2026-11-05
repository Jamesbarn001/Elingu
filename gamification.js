// ════════════════════════════════════════════════════════════
// GAMIFICATION — a server-side ledger of effort and learning
//
// Principles
//   • The server decides what earns points. The browser can show points but can never award them.
//   • XP comes from EVIDENCE of learning: a marked exam, a first-time-correct mission answer, a concept explained in the
//     learner's own words (mastery), a correct Brain Spark answer. Logging in, editing a profile or starting a quest earns nothing.
//   • A very small, capped "effort" bonus (at most EFFORT_CAP_PER_DAY a day) rewards trying, so a new learner feels progress
//     without being able to farm it.
//   • Every award is idempotent: the same (type, reference) can only ever pay once.
//   • No leaderboard shows anything but a nickname, and a learner must opt in.
// ════════════════════════════════════════════════════════════

const path = require('path');
const crypto = require('crypto');
const secureJson = require('./secureJson');
const { DATA_DIR } = require('./dataDir');

const FILE = path.join(DATA_DIR, 'gamification.json');

const EFFORT_CAP_PER_DAY = 10;
const LEARNING_CAP_PER_DAY = 400;      // far above what honest learning can earn; stops runaway abuse
const DAILY_GOAL_XP = 20;
const MAX_FREEZES = 2;
const KEYS_KEPT = 4000;                // idempotency keys remembered per learner

const XP = {
  first_lesson: 3,                      // effort: first tutor conversation of the day
  spark_try: 2,                         // effort: answered a Brain Spark question (even if wrong)
  exam_try: 1,                          // effort: attempted an exam question
  spark_correct: 5,
  spark_perfect: 5,                     // all three right
  mission_item: 5,                      // first-time-correct answer in a teacher mission
  mastery: 25,                          // explained a concept in own words
  exam_per_mark: 1, exam_cap: 60, exam_bonus_70: 10
};

const LEVELS = [
  { n: 1, at: 0, name: 'Seedling' }, { n: 2, at: 50, name: 'Sprout' }, { n: 3, at: 150, name: 'Explorer' },
  { n: 4, at: 300, name: 'Thinker' }, { n: 5, at: 500, name: 'Problem Solver' }, { n: 6, at: 800, name: 'Scholar' },
  { n: 7, at: 1200, name: 'Mentor' }, { n: 8, at: 1800, name: 'Sage' }, { n: 9, at: 2600, name: 'Mwalimu Mdogo' }, { n: 10, at: 3600, name: 'Baobab' }
];

const BADGES = [
  { id: 'first_lesson', icon: '🌱', name: 'First step', how: 'Have your first tutor conversation', test: p => p.counters.lessonDays >= 1 },
  { id: 'streak_3', icon: '🔥', name: '3-day streak', how: 'Learn 3 days in a row', test: (p, s) => s.streak >= 3 },
  { id: 'streak_7', icon: '🔥', name: 'Week warrior', how: 'Learn 7 days in a row', test: (p, s) => s.streak >= 7 },
  { id: 'streak_30', icon: '🏆', name: 'Unstoppable', how: 'Learn 30 days in a row', test: (p, s) => s.streak >= 30 },
  { id: 'mastery_1', icon: '💡', name: 'Light bulb', how: 'Explain a concept in your own words', test: p => p.mastered.length >= 1 },
  { id: 'mastery_10', icon: '🧠', name: 'Deep thinker', how: 'Master 10 concepts', test: p => p.mastered.length >= 10 },
  { id: 'exam_1', icon: '📝', name: 'Exam ready', how: 'Finish a practice paper', test: p => p.counters.exams >= 1 },
  { id: 'exam_70', icon: '⭐', name: 'Strong paper', how: 'Score 70% or more in a paper', test: p => p.counters.best >= 70 },
  { id: 'exam_90', icon: '🥇', name: 'Top marks', how: 'Score 90% or more in a paper', test: p => p.counters.best >= 90 },
  { id: 'spark_3', icon: '⚡', name: 'Spark streak', how: 'Get 3 out of 3 on Brain Spark', test: p => p.counters.sparkPerfect >= 1 },
  { id: 'mission_5', icon: '🎯', name: 'Mission maker', how: 'Answer 5 mission questions right first time', test: p => p.counters.missionItems >= 5 }
];

// ── helpers ───────────────────────────────────────────────────
function dayKey(date = new Date()) {
  try { return new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Nairobi' }).format(date); } catch (e) { return date.toISOString().slice(0, 10); }
}
function weekDays(date = new Date()) {
  // Monday to Sunday of the current week in Nairobi
  const d = new Date(dayKey(date) + 'T00:00:00Z');
  const dow = (d.getUTCDay() + 6) % 7;
  const out = [];
  for (let i = 0; i < 7; i++) out.push(new Date(d.getTime() - (dow - i) * 86400000).toISOString().slice(0, 10));
  return out;
}

function load() { return secureJson.readJson(FILE, { players: {} }, 'gamification'); }
function save(doc) { secureJson.writeJson(FILE, doc, 'gamification'); }

function blankPlayer() {
  return { xp: 0, byDay: {}, keys: {}, mastered: [], badges: {}, counters: { lessonDays: 0, exams: 0, best: 0, sparkPerfect: 0, missionItems: 0 }, spark: null, leagueOptIn: false };
}
function playerOf(doc, id) {
  if (!doc.players[id]) doc.players[id] = blankPlayer();
  const p = doc.players[id];
  for (const k of Object.keys(blankPlayer())) if (p[k] === undefined) p[k] = blankPlayer()[k];
  return p;
}

function levelFor(xp) {
  let cur = LEVELS[0];
  for (const l of LEVELS) if (xp >= l.at) cur = l;
  const next = LEVELS.find(l => l.at > xp) || null;
  return { n: cur.n, name: cur.name, xpIntoLevel: xp - cur.at, xpForNext: next ? next.at - cur.at : null, nextName: next ? next.name : null };
}

function earnedBadges(p, student) {
  const stats = { streak: (student && student.streak) || 0 };
  return BADGES.filter(b => b.test(p, stats));
}

/**
 * Award XP once per (type, refId). kind: 'learning' | 'effort'. Returns what happened so the browser can celebrate.
 */
function award(student, { type, refId, xp, kind = 'learning' }) {
  const result = { awarded: 0, duplicate: false, capped: false, levelUp: null, newBadges: [] };
  if (!student || !student.id || !type || !(xp > 0)) return result;
  const doc = load();
  const p = playerOf(doc, student.id);
  const key = `${type}:${refId}`;
  if (p.keys[key]) { result.duplicate = true; return result; }

  const today = dayKey();
  const day = p.byDay[today] || (p.byDay[today] = { xp: 0, effort: 0, learning: 0 });
  let grant = Math.floor(xp);
  if (kind === 'effort') {
    grant = Math.min(grant, Math.max(0, EFFORT_CAP_PER_DAY - day.effort));
  } else {
    grant = Math.min(grant, Math.max(0, LEARNING_CAP_PER_DAY - day.learning));
  }
  if (grant <= 0) { result.capped = true; p.keys[key] = 1; save(doc); return result; }

  const before = levelFor(p.xp);
  const badgesBefore = new Set(Object.keys(p.badges));
  p.xp += grant;
  day.xp += grant;
  if (kind === 'effort') day.effort += grant; else day.learning += grant;
  p.keys[key] = 1;
  const keyNames = Object.keys(p.keys);
  if (keyNames.length > KEYS_KEPT) for (const k of keyNames.slice(0, keyNames.length - KEYS_KEPT)) delete p.keys[k];
  // keep only 120 days of per-day totals
  const dayNames = Object.keys(p.byDay).sort();
  if (dayNames.length > 120) for (const d of dayNames.slice(0, dayNames.length - 120)) delete p.byDay[d];

  applyCounters(p, type, refId);
  for (const b of earnedBadges(p, student)) if (!p.badges[b.id]) p.badges[b.id] = today;
  const after = levelFor(p.xp);
  save(doc);

  // mirror the total into the visible points on the learner record (the browser only ever reads it)
  try { require('./studentStore').addPointsFromLedger(student.id, grant); } catch (e) { /* points mirror is best effort */ }

  result.awarded = grant;
  if (after.n > before.n) result.levelUp = { from: before.n, to: after.n, name: after.name };
  result.newBadges = Object.keys(p.badges).filter(id => !badgesBefore.has(id)).map(id => BADGES.find(b => b.id === id)).filter(Boolean).map(b => ({ id: b.id, icon: b.icon, name: b.name }));
  return result;
}

function applyCounters(p, type, refId) {
  if (type === 'first_lesson') p.counters.lessonDays += 1;
  else if (type === 'mastery') { if (!p.mastered.includes(refId)) p.mastered.push(refId); }
  else if (type === 'mission_item') p.counters.missionItems += 1;
  else if (type === 'spark_perfect') p.counters.sparkPerfect += 1;
}

// ── events from the rest of the app ───────────────────────────
function onChatTurn(student) {
  return award(student, { type: 'first_lesson', refId: dayKey(), xp: XP.first_lesson, kind: 'effort' });
}

function onMastery(student, subtopicId) {
  if (!subtopicId) return { awarded: 0 };
  return award(student, { type: 'mastery', refId: String(subtopicId).slice(0, 80), xp: XP.mastery });
}

function onMissionItemCorrect(student, missionId, itemId) {
  return award(student, { type: 'mission_item', refId: `${missionId}:${itemId}`, xp: XP.mission_item });
}

/** result = the marked paper from examMarking.markPaper */
function onExamSubmitted(student, attemptId, result) {
  const out = { awarded: 0, levelUp: null, newBadges: [] };
  const merge = (r) => { out.awarded += r.awarded; out.levelUp = r.levelUp || out.levelUp; out.newBadges.push(...r.newBadges); };
  // effort: 1 XP for each question actually attempted (shares the daily effort cap)
  (result.questions || []).filter(q => q.status !== 'blank').forEach(q => merge(award(student, { type: 'exam_try', refId: `${attemptId}:${q.id}`, xp: XP.exam_try, kind: 'effort' })));
  // learning: marks earned, plus a bonus for a strong paper
  const marksXp = Math.min(XP.exam_cap, Math.round(result.score * XP.exam_per_mark)) + (result.percentage >= 70 ? XP.exam_bonus_70 : 0);
  merge(award(student, { type: 'exam', refId: attemptId, xp: marksXp }));
  // counters for badges
  const doc = load();
  const p = playerOf(doc, student.id);
  p.counters.exams += 1;
  p.counters.best = Math.max(p.counters.best, result.percentage);
  const today = dayKey();
  const badgesBefore = new Set(Object.keys(p.badges));
  for (const b of earnedBadges(p, student)) if (!p.badges[b.id]) p.badges[b.id] = today;
  save(doc);
  Object.keys(p.badges).filter(id => !badgesBefore.has(id)).map(id => BADGES.find(b => b.id === id)).filter(Boolean).forEach(b => out.newBadges.push({ id: b.id, icon: b.icon, name: b.name }));
  return out;
}

// ── Brain Spark: 3 fixed, server-marked questions a day ───────
function sparkBank(student) {
  const papers = require('./examBank').papers();   // from the database
  const curr = (student.curriculum === 'BRITISH' || student.schoolLevel === 'IGCSE' || student.schoolLevel === 'CHECKPOINT') ? 'BRITISH' : 'CBC';
  const grade = Number(student.grade) || (curr === 'BRITISH' ? 10 : 8);
  const pool = [];
  for (const paper of papers) {
    if (paper.curriculum !== curr || grade < paper.gradeRange[0] || grade > paper.gradeRange[1]) continue;
    for (const q of paper.questions) if (q.type === 'mcq') pool.push({ paper, q });
  }
  return pool;
}

function pickSpark(student, day) {
  const pool = sparkBank(student);
  if (pool.length < 3) return [];
  const scored = pool.map(item => ({ item, h: crypto.createHash('sha256').update(`${student.id}|${day}|${item.q.id}`).digest('hex') }))
    .sort((a, b) => (a.h < b.h ? -1 : 1));
  // spread across papers/subjects where possible
  const picked = []; const subjects = new Set();
  for (const s of scored) { if (picked.length < 3 && !subjects.has(s.item.paper.subject)) { picked.push(s.item); subjects.add(s.item.paper.subject); } }
  for (const s of scored) { if (picked.length < 3 && !picked.includes(s.item)) picked.push(s.item); }
  return picked.slice(0, 3);
}

function getSpark(student) {
  const day = dayKey();
  const doc = load();
  const p = playerOf(doc, student.id);
  if (!p.spark || p.spark.day !== day) {
    p.spark = { day, picks: pickSpark(student, day).map(x => x.q.id), answers: {} };
    save(doc);
  }
  const bank = new Map(sparkBank(student).map(x => [x.q.id, x]));
  const questions = p.spark.picks.map((id, i) => {
    const it = bank.get(id);
    return it ? { index: i, id, topic: it.q.topic, subject: it.paper.subject, stem: it.q.stem, options: it.q.options } : null;
  }).filter(Boolean);
  const answered = {};
  for (const [i, a] of Object.entries(p.spark.answers)) {
    const it = bank.get(p.spark.picks[i]);
    answered[i] = { choice: a.choice, correct: a.correct, correctAnswer: it ? it.q.answer : null, explanation: it ? it.q.explanation : '' };
  }
  const done = Object.keys(p.spark.answers).length;
  const right = Object.values(p.spark.answers).filter(a => a.correct).length;
  return { day, questions, answered, complete: done >= questions.length && questions.length > 0, right, total: questions.length };
}

function answerSpark(student, index, choice) {
  const day = dayKey();
  const doc = load();
  const p = playerOf(doc, student.id);
  if (!p.spark || p.spark.day !== day) return { error: 'No Brain Spark for today yet.' };
  const idx = Number(index);
  if (!Number.isInteger(idx) || idx < 0 || idx >= p.spark.picks.length) return { error: 'Unknown question.' };
  if (p.spark.answers[idx]) return { error: 'You already answered this one.' };
  const bank = new Map(sparkBank(student).map(x => [x.q.id, x]));
  const it = bank.get(p.spark.picks[idx]);
  if (!it) return { error: 'Question unavailable.' };
  const letter = String(choice || '').trim().toUpperCase().slice(0, 1);
  if (!'ABCD'.includes(letter) || !letter) return { error: 'Choose A, B, C or D.' };
  const correct = letter === it.q.answer;
  p.spark.answers[idx] = { choice: letter, correct };
  save(doc);

  const events = [];
  events.push(award(student, correct
    ? { type: 'spark_correct', refId: `${day}:${idx}`, xp: XP.spark_correct }
    : { type: 'spark_try', refId: `${day}:${idx}`, xp: XP.spark_try, kind: 'effort' }));
  const all = Object.values(p.spark.answers);
  if (all.length === p.spark.picks.length && all.every(a => a.correct)) {
    events.push(award(student, { type: 'spark_perfect', refId: day, xp: XP.spark_perfect }));
  }
  const celebrate = {
    awarded: events.reduce((s, e) => s + e.awarded, 0),
    levelUp: events.map(e => e.levelUp).filter(Boolean)[0] || null,
    newBadges: events.flatMap(e => e.newBadges)
  };
  return { correct, correctAnswer: it.q.answer, explanation: it.q.explanation, celebrate };
}

// ── what the browser shows ────────────────────────────────────
function summary(student) {
  const doc = load();
  const p = playerOf(doc, student.id);
  const today = p.byDay[dayKey()] || { xp: 0 };
  const lvl = levelFor(p.xp);
  const badgeList = BADGES.map(b => ({ id: b.id, icon: b.icon, name: b.name, how: b.how, earned: !!p.badges[b.id], on: p.badges[b.id] || null }));
  return {
    xp: p.xp,
    level: lvl,
    streak: student.streak || 0,
    freezes: student.freezes || 0,
    dailyGoal: { target: DAILY_GOAL_XP, done: Math.min(today.xp, DAILY_GOAL_XP), xpToday: today.xp, met: today.xp >= DAILY_GOAL_XP },
    effortToday: { used: today.effort || 0, cap: EFFORT_CAP_PER_DAY },
    badges: badgeList,
    mastered: p.mastered.slice(),
    leagueOptIn: !!p.leagueOptIn
  };
}

/** XP, active days and mastered topics for the current Monday-Sunday week (read-only, for the parent weekly card). */
function weekStats(student) {
  const doc = load();
  const p = playerOf(doc, student.id);
  const days = weekDays();
  let xp = 0, activeDays = 0;
  days.forEach(d => { const x = (p.byDay[d] && p.byDay[d].xp) || 0; xp += x; if (x > 0) activeDays++; });
  return { xp, activeDays, level: levelFor(p.xp).name, masteredTotal: p.mastered.length };
}

function setLeagueOptIn(student, on) {
  const doc = load();
  playerOf(doc, student.id).leagueOptIn = !!on;
  save(doc);
  return !!on;
}

/** Weekly XP board for a learner's class (school + stream) among learners who opted in. Nicknames only. */
function league(student, allStudents) {
  const doc = load();
  const me = playerOf(doc, student.id);
  if (!student.schoolId) return { available: false, reason: 'Join your class with the code from your teacher to see your class league.' };
  if (!me.leagueOptIn) return { available: true, optedIn: false };
  const days = weekDays();
  const group = allStudents.filter(s => s.schoolId === student.schoolId && (s.stream || '') === (student.stream || ''));
  const rows = group.filter(s => (doc.players[s.id] || {}).leagueOptIn).map(s => {
    const pl = doc.players[s.id];
    const xp = days.reduce((sum, d) => sum + ((pl.byDay[d] && pl.byDay[d].xp) || 0), 0);
    return { id: s.id, handle: s.handle, avatar: s.avatar || '🦁', xp };
  }).sort((a, b) => b.xp - a.xp);
  const board = rows.slice(0, 10).map((r, i) => ({ rank: i + 1, handle: r.handle, avatar: r.avatar, xp: r.xp, me: r.id === student.id }));
  const myRank = rows.findIndex(r => r.id === student.id) + 1;
  return { available: true, optedIn: true, board, myRank, participants: rows.length, weekOf: days[0] };
}

module.exports = {
  XP, LEVELS, BADGES, EFFORT_CAP_PER_DAY, DAILY_GOAL_XP, MAX_FREEZES, dayKey, levelFor,
  award, onChatTurn, onMastery, onMissionItemCorrect, onExamSubmitted,
  getSpark, answerSpark, summary, weekStats, setLeagueOptIn, league
};
