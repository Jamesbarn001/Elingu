// weeklyCard.js — the one simple card every parent sees first, for every tier.
// Built only from things that really happened (sessions, classroom missions, XP ledger). It never invents a trait or a score.
// Free: the basics (days active, subjects, one thing to try tonight). Standard adds topics and where the child got stuck.
// Premium adds the week's trend and the exact hint/score detail.
const MAX_TEXT = 140;
const clean = (v, n = MAX_TEXT) => String(v == null ? '' : v).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, n);

function build({ handle, tier, activity, missions, week }) {
  const t = ['standard', 'premium', 'pilot'].includes(tier) ? tier : 'free';
  const detail = t !== 'free';
  const topics = (activity && Array.isArray(activity.recentTopics)) ? activity.recentTopics : [];
  const subjects = (activity && Array.isArray(activity.subjectsExplored)) ? activity.subjectsExplored.map(s => clean(s, 40)) : [];
  const ms = Array.isArray(missions) ? missions : [];
  const w = week || { xp: 0, activeDays: 0, masteredTotal: 0 };
  const done = ms.filter(m => m.status === 'completed');

  // Where the learner struggled: unsolved or retried mission questions, then the topic with the longest back-and-forth.
  const stuck = [];
  ms.forEach(m => (m.missedQuestions || []).forEach(q => {
    if (stuck.length < 3) stuck.push({ concept: clean(q.concept, 60), subject: clean(m.subject, 40), outcome: q.outcome === 'unsolved' ? 'not solved yet' : 'needed more than one try' });
  }));
  const longest = topics.slice().sort((a, b) => (b.turnCount || 0) - (a.turnCount || 0))[0];

  const hasActivity = w.activeDays > 0 || topics.length > 0 || ms.length > 0;
  const nick = clean(handle, 24) || 'Your child';

  let headline;
  if (!hasActivity) headline = `${nick} has not studied yet this week.`;
  else headline = `${nick} studied on ${w.activeDays} day${w.activeDays === 1 ? '' : 's'} this week` + (subjects.length ? `, mostly ${subjects.slice(0, 2).join(' and ')}.` : '.');

  // One thing to try tonight: from real data only.
  let tryTonight;
  if (!hasActivity) tryTonight = 'Ask them to open Elingu for ten minutes tonight and pick one topic they like.';
  else if (stuck.length) tryTonight = `Ask ${nick} to explain ${stuck[0].concept || 'a tricky question'} to you in their own words. Teaching it is the best check.`;
  else if (longest) tryTonight = `Ask ${nick} what they worked out in ${clean(longest.topic, 60) || clean(longest.subject, 40)}, and why it works.`;
  else tryTonight = `Ask ${nick} to show you one thing they learned this week.`;

  const card = {
    tier: t,
    headline,
    daysActive: w.activeDays,
    subjects: subjects.slice(0, 4),
    missions: { assigned: ms.length, completed: done.length },
    tryTonight,
    hasActivity
  };
  if (detail) {
    card.topics = topics.slice(0, 4).map(x => ({ subject: clean(x.subject, 40), topic: clean(x.topic, 80), turns: x.turnCount || 0 }));
    card.stuckOn = stuck;
  }
  if (t === 'premium' || t === 'pilot') {
    card.weekXp = w.xp;
    card.masteredTotal = w.masteredTotal || 0;
    card.hintsUsed = ms.reduce((n, m) => n + ((m.exactScore && m.exactScore.hintsUsedCount) || 0), 0);
    card.missionScores = done.slice(0, 3).map(m => ({ title: clean(m.title, 60), percent: m.exactScore ? m.exactScore.scorePercent : null, level: m.cbeLevel }));
  }
  return card;
}

module.exports = { build };
