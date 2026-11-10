// Icon rollout pass 2: sign-up and login, exam screens and Me panel, Missions, Expeditions, SafeBox, spaces, labs,
// subject welcome strings and the toasts/headings that carried decoration emoji.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..', '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const html = read('public/index.html');

const sliceBetween = (src, start, end) => {
  const a = src.indexOf(start);
  const b = src.indexOf(end, a + 1);
  if (a < 0 || b < 0) throw new Error('markers not found: ' + start);
  return src.slice(a, b);
};
const PICTO = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}]/u;
const noEmoji = (ctx, label, text, allow) => {
  const found = [...text.matchAll(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}]/gu)].map((m) => m[0]).filter((e) => !(allow || []).includes(e));
  ctx.assertEqual(found.length, 0, label + ' still has emoji: ' + [...new Set(found)].join(' '));
};

const AVATARS = ['🦁', '🐆', '🐘', '🦒', '🦅', '🦓', '🚀', '⭐', '🎓', '🎨', '🔬', '⚡', '🌟'];
const signUp = sliceBetween(html, 'id="figmaAuthOverlay"', 'id="subjectUpgradeModal"');

module.exports = {
  'TC-ICON2-01: Sign-up and login: no decoration emoji outside the avatar picker, flags are text chips': async (ctx) => {
    // avatar presets, the custom avatar boxes and the profile streak flame are the learner's own choices
    const withoutAvatar = signUp.split('\n').filter((l) => !/avatar-preset-btn|AvatarEmoji|CustomAvatarInput|signUpCustomAvatarInput|customAvatarInput|Avatar/.test(l) && !l.includes('🔥')).join('\n');
    noEmoji(ctx, 'sign-up markup', withoutAvatar);
    ctx.assert(/id="signupCurriculumCBC"[^>]*>\s*Kenyan CBC\s*</.test(signUp), 'CBC chip is plain text');
    ctx.assert(/id="signupCurriculumBritish"[^>]*>\s*Cambridge IGCSE\s*</.test(signUp), 'Cambridge chip says Cambridge IGCSE');
    const visible = signUp.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ');
    ctx.assert(!/british/i.test(visible), 'learner-visible sign-up text never says British');
    ctx.assert(/class="auth-eye-btn"[^>]*aria-label="Toggle password visibility"><svg class="i" aria-hidden="true"/.test(signUp), 'password toggle is an icon button with a label');
    const uses = signUp.match(/<use href="\/icons\.svg#i-[a-z0-9-]+"/g) || [];
    ctx.assert(uses.length >= 15, 'sign-up uses sprite icons, got ' + uses.length);
    // the same screens built from JS
    for (const s of ['Create Account 🚀', 'Send Verification Code 📩', 'Reset PIN & Log In 🚀', 'Signing in... ⏳', 'Creating Account... 🌱', 'Checking availability... 🔍', "Let's Learn! 🚀", 'Set up your study space 🌳', 'Welcome to Elingu, Amani! 🌱']) {
      ctx.assert(!html.includes(s), 'old decorated string left: ' + s);
    }
    ctx.assert(html.includes("Let's Learn!"), 'approval button text kept');
  },

  'TC-ICON2-02: Pickers: subject chips use the sprite and the picker data carries no emoji': async (ctx) => {
    ctx.assert(html.includes('${_subIc(s.subject)}${s.subject}</div>'), 'chips render a subject icon');
    ctx.assert(/function _subIc\(subject, cls\) \{ return window\.ico \?/.test(html), 'safe fallback when window.ico is missing');
    const data = sliceBetween(html, 'const STEP2_SUBJECTS = {', '// ── RENDER SUBJECT CHIPS');
    noEmoji(ctx, 'STEP2_SUBJECTS', data);
    ctx.assert(html.includes("data-subject=\"${s.subject}\""), 'data-subject attribute kept');
    noEmoji(ctx, 'step 2 pathway pills', sliceBetween(html, 'id="step2PathwaySection"', 'id="step2SubjectsLabel"'));
  },

  'TC-ICON2-03: Exam screens use icons and keep their meaning': async (ctx) => {
    const exam = read('public/exam.js');
    noEmoji(ctx, 'exam.js', exam);
    ctx.assert(/window\.ico \? window\.ico/.test(exam), 'exam.js calls ico lazily');
    ctx.assert(exam.includes("ic('timer')") && exam.includes("ic('calculator', 'i-sm i-off')"), 'exam chips use timer and a struck calculator icon');
    const hub = sliceBetween(html, 'function renderRevisionPapersHubDOM()', 'function renderRevisionCockpitDOM') + sliceBetween(html, 'function renderRevisionCockpitDOM', 'function navRevisionQuestion');
    noEmoji(ctx, 'revision hub', hub, ['🎉', '🌟', '👍', '💡']);
    ctx.assert(hub.includes("_ic('timer')") && hub.includes("_ic('calculator', 'i-off')"), 'hub chips use icons');
  },

  'TC-ICON2-04: Me panel keeps streak and celebration emoji, freeze label is an icon': async (ctx) => {
    const play = read('public/play.js');
    ctx.assert(play.includes('Streak freezes:') && !play.includes('❄️'), 'freeze label uses the snowflake icon');
    ctx.assert(play.includes("window.ico('snowflake'"), 'snowflake icon used');
    ctx.assert(play.includes('aria-hidden="true">🔥</div>'), 'streak flame kept');
    ctx.assert(play.includes("['🎉', '⭐', '✨', '🌟', '🎊']") && play.includes("'🎉 Level '"), 'confetti and level-up kept');
    ctx.assert(play.includes("'Perfect! 🎉'") && play.includes("'Correct! ✅'"), 'Brain Spark feedback kept');
  },

  'TC-ICON2-05: Missions, Expeditions, SafeBox, My Spaces and Custom Spot use icons': async (ctx) => {
    const views = sliceBetween(html, 'function renderExpeditionsView', 'function renderMissionsFullView');
    noEmoji(ctx, 'Expeditions and SafeBox', views);
    ctx.assert(/_ic\('route'\)/.test(views) && /_ic\('shield-check'\)/.test(views), 'Expeditions and SafeBox icons');
    ctx.assert(/_ic\('banknote'\)/.test(views) && /_ic\('code-xml'\)/.test(views), 'expedition cards have icons');
    const missions = sliceBetween(html, 'function renderMissionsFullView', 'function ');
    noEmoji(ctx, 'Missions view', missions);
    for (const t of ["'Expeditions'", "'Safe Box'", "'Missions'", "'My Saved Spaces'"]) ctx.assert(html.includes('headerTitle.textContent = ' + t), 'plain header title ' + t);
    const spaces = sliceBetween(html, 'function renderSavedSpacesView()', 'function jumpBackIntoSavedSpace(');
    noEmoji(ctx, 'My Saved Spaces', spaces);
    ctx.assert(spaces.includes('aria-label="Remove Space"'), 'icon-only delete button has an aria-label');
    const modal = sliceBetween(html, 'id="questGeneratorModal"', 'id="childUpgradeModal"');
    noEmoji(ctx, 'Custom Spot / quest modal', modal);
    for (const s of ['Launch 🚀', 'Save My Space 🪐', 'New Quest Launched! ⚡']) ctx.assert(!html.includes(s), 'old string left: ' + s);
  },

  'TC-ICON2-06: Generate-quest button is the app green, no purple gradient': async (ctx) => {
    const css = sliceBetween(html, '.btn-generate-quest {', '.custom-quest-active-card {');
    ctx.assert(/background:\s*#0D3A26/i.test(css), 'solid #0D3A26');
    ctx.assert(!/gradient|139, 92, 246|#8B5CF6|#A78BFA/i.test(css), 'no gradient or purple on the button');
    const sparkle = sliceBetween(html, 'class="btn-generate-quest" style="margin: 16px auto 0 auto', '</button>');
    ctx.assert(!sparkle.includes('✨') && sparkle.includes("_ic('plus')"), 'sparkle replaced by plus icon');
  },

  'TC-ICON2-07: Lab banners, apparatus and Virtual Lab use sprite icons': async (ctx) => {
    const banners = sliceBetween(html, 'id="cbeLabBenchContainer"', 'id="suggestionsGrid"');
    noEmoji(ctx, 'lab banners', banners);
    ctx.assert(!banners.includes('🇰🇪') && banners.includes('CBE STEM INNOVATION & PRACTICAL LAB'), 'flag removed from the CBE banner');
    ctx.assert((banners.match(/<use href="\/icons\.svg#i-/g) || []).length >= 15, 'banner pills and buttons carry icons');
    const labData = sliceBetween(html, '// ── VIRTUAL LAB SUGGESTIONS', 'function useApparatus(');
    noEmoji(ctx, 'lab data', labData);
    ctx.assert(/icon: 'flask-conical'/.test(labData) && /_ic\(a\.icon\)/.test(html), 'apparatus pills render icons from names');
    ctx.assert(!html.includes('Elingu Virtual Practical Lab 🧪') && html.includes("header: 'Elingu Virtual Practical Lab'"), 'virtual lab header plain');
  },

  'TC-ICON2-08: Welcome strings, upgrade modal and toasts have no decoration': async (ctx) => {
    const welcome = sliceBetween(html, 'function getDynamicWelcome(', 'function updateWelcomeText');
    noEmoji(ctx, 'subject welcome strings', welcome);
    ctx.assert(welcome.includes("Welcome to Cambridge & Edexcel Practical Lab!"), 'welcome wording kept');
    const upgrade = sliceBetween(html, 'function openChildUpgradeModal(', 'async function requestParentUpgradeFromModal');
    noEmoji(ctx, 'upgrade modal', upgrade);
    for (const s of ['Study Space Updated! 🌳', 'Google Connected! ✨', 'Complete Profile 📋', 'Daily Space Limit Reached! 🚀', 'Fresh Socratic space ready! Start your inquiry.'.replace('Fresh', '🚀 Fresh')]) {
      ctx.assert(!html.includes(s), 'old toast left: ' + s);
    }
    ctx.assert(html.includes("title: 'Study Space Updated!'"), 'toast text kept without decoration');
  },

  'TC-ICON2-09: Whole page: only avatars and celebration emoji remain': async (ctx) => {
    const allowed = new Set([...AVATARS, '🔥', '🎉', '🏆', '👍', '💡']);
    const left = [...html.matchAll(/[\p{Extended_Pictographic}]/gu)].map((m) => m[0]).filter((e) => !allowed.has(e));
    ctx.assertEqual(left.length, 0, 'unexpected emoji left in index.html: ' + [...new Set(left)].join(' '));
    ctx.assert(html.includes("const avatar = s.avatar || '🦁';"), 'avatar fallback kept');
    ctx.assert(html.includes('data-avatar="🦁" onclick="selectSignUpAvatar(\'🦁\', this)"'), 'sign-up avatar presets untouched');
    ctx.assert(html.includes('data-avatar="🦁" onclick="selectCustomizeAvatar(\'🦁\', this)"'), 'profile avatar presets untouched');
    ctx.assert(html.includes("title = 'Nice work! 🎉'") && html.includes("title: 'Mission Completed! 🌟'"), 'achievement toasts kept');
    ctx.assert(html.includes('🎉 Learning Stop Mastered!') && html.includes('<div>🎉 <strong>Spot on! Great reasoning.</strong></div>'), 'correct and mastered feedback kept');
  },

  'TC-ICON2-10: Every icon id used exists in icons.svg, and translated keys lost their emoji': async (ctx) => {
    const sprite = read('public/icons.svg');
    const have = new Set((sprite.match(/id="i-[a-z0-9-]+"/g) || []).map((s) => s.slice(4, -1)));
    const used = new Set();
    for (const f of ['public/index.html', 'public/exam.js', 'public/play.js']) {
      const src = read(f);
      (src.match(/icons\.svg#i-[a-z0-9-]+/g) || []).forEach((m) => used.add(m.replace('icons.svg#', '')));
      (src.match(/\b(?:ic|_ic|ico|window\.ico)\('[a-z0-9-]+'/g) || []).forEach((m) => used.add('i-' + m.split("'")[1]));
    }
    // icon names stored in lab data and consumed by _ic(...)
    const labData = sliceBetween(html, '// ── VIRTUAL LAB SUGGESTIONS', 'function useApparatus(');
    (labData.match(/icon: '([a-z0-9-]+)'/g) || []).forEach((m) => used.add('i-' + m.split("'")[1]));
    ctx.assert(used.size > 40, 'found the icon ids in use: ' + used.size);
    for (const id of used) ctx.assert(have.has(id), id + ' missing from icons.svg');
    const i18n = read('public/i18n.js');
    for (const k of ["'Create Account':", "'Send Verification Code':", "'Reset PIN & Log In':", "'Set up your study space':", "'{n} minutes':", "'Calculator allowed':", "'Cambridge IGCSE':"]) {
      ctx.assert(i18n.includes(k), 'Kiswahili key without emoji exists: ' + k);
    }
    for (const k of ["'Create Account 🚀'", "'Send Verification Code 📩'", "'⏱ {a} minutes'"]) ctx.assert(!i18n.includes(k), 'old emoji key left: ' + k);
  },
};
