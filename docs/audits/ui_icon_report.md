# UI audit: AI-generated tells, emoji inventory and icon system

Date: 2026-11-09. Scope: learner app (`public/`), parent/teacher/admin portals (`server.js`, `teacherRoutes.js`, `adminRoutes.js`), tutor prompts. Read-only audit; no application code was changed. Counts come from a node script using `/\p{Extended_Pictographic}/u` (optional variation selector and ZWJ sequences counted as one). Flags (regional indicator pairs such as the Kenya and UK flags) are not Extended_Pictographic and are counted separately. Class counts are rule-based (tag, class name, surrounding text), so treat them as accurate to roughly plus or minus 10 percent. Per-file totals are exact.

## 0. Headline findings

1. **1,981 emoji** in scope (plus about 64 flags). `public/index.html` alone has 1,159 on 1,049 lines. 208 distinct emoji; the long tail is mostly one-off decoration.
2. **The tutor is told to use emoji.** `server.js:417, 526, 562-564, 744, 745, 858` instruct the model to put an emoji after the greeting and "sprinkle" more, with sample praise such as "Brilliant! ✨" and "Awesome work! 👏". This is the biggest source of AI feel in chat, and it conflicts with the owner rule "Zero fake praise in the tutor" (CLAUDE.md).
3. **Translation keys contain emoji** (`public/i18n.js`: 288 emoji, many inside the English key, e.g. `'Send Verification Code 📩'`). Removing an emoji from HTML without updating i18n silently drops the Kiswahili text. The migration must handle this first (section 6.2, step 0).
4. **Purple is not the brand but leaks in.** About 60 purple/violet/indigo hits in `index.html` (2.1), plus `play.css:18`. Also `--brand-purple` and `--brand-teal` are used 39 times (e.g. `index.html:7777, 7789`) but are **never defined**, so those topic-card colours resolve to nothing. A real bug worth fixing in the same pass.
5. **`--font` names `'Inter'`** (`index.html:77`) but only DM Sans is self-hosted (`public/fonts.css`). Inter never loads, so the app renders in the system sans. Choose one on purpose (section 5).
6. **No fake terminal hero, no invented user counts, no "not X, it's Y" taglines were found.** The explore-first screen (`public/explore.js`) is already the cleanest part of the product and is the template to copy.
7. The auth brand panel has a glowing **circuit-board SVG** (`index.html:3931, 6550`; alt text "Circuit-Tree Logo"), the main remaining "techy AI" decoration.

## 1. Emoji inventory

### 1.1 Per file

| File | Emoji | Distinct | Notes |
|---|---:|---:|---|
| public/index.html | 1,159 | 180 | markup 6018-7600, JS data and templates 7600-17080 |
| public/i18n.js | 288 | 60 | emoji inside translation keys and values |
| server.js | 382 | 85 | Parent portal, gateway at `/`, pricing, tutor prompts |
| teacherRoutes.js | 90 | 37 | Teacher portal |
| adminRoutes.js | 34 | 23 | Owner's own, lowest priority |
| public/play.js | 14 | 10 | streak, badges, level-up, confetti |
| public/exam.js | 8 | 5 | exam meta chips |
| public/explore.js | 6 | 4 | plus 2 flags |
| exam.css, explore.css, play.css, sw.js, inline CSS | 0 | 0 | no CSS `content:` emoji |
| **Total** | **1,981** | **208** | |

Outside the requested scope but part of the migration: `db/seeds/*.js` about 377 (subject/strand `icon` column and topic labels), `emailService.js` 55, `gamification.js` 12 (badge icons), `constitution.js` 11, `notificationService.js` 3.

### 1.2 By role (all in-scope files)

| Role | Count | Where it lives |
|---|---:|---|
| Decorative filler / inline label text | 556 | i18n keys (201), portal strings in server.js (140), index.html labels, code comments like `// ⚛️ PHYSICS LAB` |
| Status badge / state (⏳ ✔ ✅ ❌ ⚠️ 🔒 📶) | 422 | step pills, approval screen, locked topics, offline banner, parent/teacher status |
| Card / subject / topic icons | 383 | `icon:` fields in `STEP2_SUBJECTS` and topic arrays (index.html 7700-9300, 15058-15160), apparatus pills, expedition cards |
| Buttons / CTAs | 172 | trailing 🚀 📩 ✨, leading 📋 🔍 📊 on lab buttons, "Create Account 🚀" |
| Avatars (user choice) | 109 | 12 presets `index.html:6679-6690`, custom input, `s.avatar \|\| '🦁'` fallbacks |
| Tutor greeting decoration | 109 | time-of-day greetings `index.html:10520-10660`, welcome header, per-subject intros |
| Celebrations / rewards | 94 | `play.js:79-95` toast and confetti, badges, level-up, "Perfect! 🎉" |
| Tutor system-prompt decoration | 58 | `server.js` prompts and examples |
| Section headings / labels | 40 | `sidebar-section-title`, `apparatus-tray-title`, form `<label>`s ("📍 3. County") |
| Navigation | 38 | `nav-icon`, `main-tab-icon`, `dock-icon`, category tabs, mode pills |

Navigation and headings are few but are the first thing seen, so they carry most of the AI impression. The 1,000+ filler and status uses are the bulk of the work but can be done by pattern.

### 1.3 Top 25 specific emoji (all in-scope files)

| # | Emoji | Count | Typical role |
|---:|---|---:|---|
| 1 | 🚀 | 104 | suffix on CTAs ("Create Account 🚀"), plan names |
| 2 | ✨ | 62 | suffix on buttons and plan names, toasts, tutor greetings |
| 3 | ⏳ | 59 | waiting/loading status |
| 4 | ⭐ | 53 | XP, "My Progress" nav, premium, avatar |
| 5 | 🔬 | 50 | Science, Virtual Lab |
| 6 | 📚 | 42 | English, library |
| 7 | 📐 | 42 | Maths, geometry |
| 8 | 🧪 | 41 | Chemistry, lab |
| 9 | 🏫 | 36 | school, stream code |
| 10 | 🌳 | 35 | Elingu mascot in greetings |
| 11 | ⚡ | 34 | Brain Spark, quests |
| 12 | 🌱 | 34 | growth, Agriculture, free plan |
| 13 | 🎯 | 33 | Missions |
| 14 | 🔒 | 33 | locked state, privacy |
| 15 | 🦁 | 31 | default avatar (keep, user choice) |
| 16 | 👁️ | 30 | show/hide password |
| 17 | 📋 | 29 | rubric, plan, assigned |
| 18 | 💡 | 29 | hint, tutor hook |
| 19 | 🎓 | 28 | grade level, Senior |
| 20 | 🌍 | 26 | Humanities, Geography |
| 21 | 🎉 | 26 | celebration |
| 22 | 🔍 | 25 | search/inspect |
| 23 | 🏛️ | 25 | Cambridge |
| 24 | 🔄 | 25 | refresh/retry |
| 25 | 🌿 | 24 | biology, tutor greeting |

## 2. Other AI tells in the learner app (file:line)

### 2.1 Gradients, purple in particular

- **Purple/violet/indigo, about 60 hits in `public/index.html`.** Clusters: `.btn-generate-quest` and quest cards `172-234` (`rgba(139,92,246)` purple-to-green gradient, `#8B5CF6`, `#A78BFA`, `#F5F3FF`); Examiner X-Ray card `1832-1903` (`#FAF5FF/#F5F3FF` gradient, `#4F46E5`, `#6D28D9`); STEM/Social nav badges `6210, 6236`; subject accent colours in topic data `8857, 8930, 8947, 8961, 9110, 9236, 9246, 9260, 9314`; Active Quest label `9603`; X-Ray inline styles `11983, 12007-12039`; premium tier text `16034` (`#7C3AED`); `badgeColor: '#4F46E5'` at `9757-9775`; `restoreCbcNav` calls `13501, 13504`.
- `public/play.css:18` `.play-toast.big` is `linear-gradient(135deg,#7C3AED,#2563EB)`: the classic purple-to-blue "AI" gradient, shown on every level-up.
- `public/play.css:39` and `:51`: green-to-blue progress bar and "spark" card.
- `teacherRoutes.js`: 1 purple hit. `server.js`, `adminRoutes.js`: none.
- Undefined tokens `--brand-purple` / `--brand-teal` (39 uses, e.g. `index.html:7777-7860`).
- Other gradients: 45 `linear/radial-gradient` in `index.html`. The body "aurora" is a five-blob radial wash (`121-125`, green, teal, cyan, amber) plus a speckle layer (`515-520`). Hero and button gradients: `2137, 4556, 4576`. Flatten these.

### 2.2 Em dashes in UI copy

| File | Em dashes | Notes |
|---|---:|---|
| public/index.html | 246 | about 7 in CSS comments, 7 in markup, 232 in JS strings/data |
| server.js | 135 | portals, pricing, prompts |
| adminRoutes.js | 26 | owner area |
| teacherRoutes.js | 21 | |
| public/i18n.js | 20 | translation pairs |
| legalPages.js | 8 | |
| public/exam.js | 1 | comment only |
| public/play.js, explore.js | 0 | already clean |

Most are in topic titles and descriptions (`index.html:7708-9300`: "Fractions — Adding & Subtracting", "Numbers Strand — Add fractions by sharing chapati") and buttons ("I've Told My Parent — Let's Learn! 🚀" `7150`, "Unlimited daily turns — study anytime" `7425`, "Know Your Child — deep curiosity portrait" `7475`), plus the meta description `26` and notices `6755, 6811`. Use a colon for "Topic: detail" titles, a full stop or comma elsewhere. Those hard-coded topic arrays also sit awkwardly with the rule that curriculum is database-driven, so fix the copy at the DB seed level where possible.

### 2.3 Three equal cards

- **Gateway role cards** at `/`: Learner / Parent / Teacher, `server.js:11000-11035`, CSS `10758-10777`. Three identical white cards (icon, title, caps subtitle, paragraph, arrow button).
- **Brain Deck mood row**: "10-Min Warm-up / Unpack Homework / Virtual Lab", `index.html:12276-12296` (CSS `2825`).
- **Expeditions Studio**: Coding / Chess / Money, `index.html:11135-11190`, each a card with 32px emoji, title, paragraph, "Start Coding Lab 🚀" style button; chess is "Coming soon".
- **Pricing tiers**: Free / Standard / Premium `index.html:5303` (`.pricing-tier-grid`), parent portal `server.js:5251` (`.plans-horizontal-grid`), insight tabs `server.js:4994`.
- Lab banners: 3 to 4 identical pills plus 3 identical buttons (`index.html:6437-6446, 6460-6469`).
- Good counter-example: `explore.js:57-60` offers two choices with different content and no emoji headings.

### 2.4 "Not X, it's Y" taglines

None with the classic structure. Closest patterns to review:
- `index.html:7105` "Your thinking journey starts now.", `6998` "Your learning journey continues.", `6819` "Tailoring Your Child's Learning Journey" ("journey" is an AI cliché).
- `index.html:6624-6626` hero paragraph: "Nurturing independent critical thinking, curiosity, and first-principles reasoning for every CBE learner through step-by-step guided discovery." Brochure language; replace with one plain sentence about what the learner will do.
- `server.js:10988` "Kenya's Premier CBE Socratic AI Platform." (see 2.6).
- `index.html:10647` "Kenya's Silicon Savannah!" in a tutor greeting.

### 2.5 Sparkles on buttons

`✨` appears 62 times. Button or CTA-adjacent: `index.html:6348-6354` (Personal Quests header), `6678` "Choose or Create Your Avatar ✨", `7576` "Learning Space ✨", `10780` "Explore More Subjects ✨", `11307` "Generate Personal Quest" with leading sparkle, toast helper `17495`, `17006` "Google Connected! ✨"; `server.js:5844, 6000, 6262, 6523, 7416, 7421, 7426, 7733, 8555, 8857-8869, 9157` (upgrade and plan buttons: "Upgrade to Premium ✨", "Choose Premium ✨"); `teacherRoutes.js:3600, 3685, 4892` ("✨ Draft Questions with AI"). Tutor prompts push ✨ too (`server.js:417, 562`). The rocket is used the same way 104 times ("Create Account 🚀", "Sign In to Dashboard 🚀": `index.html:6982, 7078, 7150, 11152`).

### 2.6 Invented stats and claims

- No fabricated user counts, percentages or testimonials in `index.html`, `explore.js`, `play.js`, `exam.js`.
- **`server.js:10988`**: "Kenya's Premier CBE Socratic AI Platform": an unverifiable superlative on the page everyone sees at `/`. Remove.
- **`server.js:10991`** badge "🇰🇪 KICD CBE Aligned": close to the repo rule "No compliance badges". It reads as a seal. Replace with a plain statement ("Follows the Kenyan CBC and Cambridge IGCSE syllabuses") or drop it.
- `server.js:6022` "Free forever" and `6062/6118` "Cancel anytime": commitments, not stats; confirm they are true before keeping.
- `index.html:10647, 10642` "Silicon Savannah", "Kenya's rich biodiversity": harmless flavour, but part of the hype register of greetings.

### 2.7 Terminal-like hero

No typewriter, prompt-line or boot-sequence hero exists. Tech flavour that does exist: the circuit-trace SVG behind the auth brand panel (`index.html:3931-3940, 6550-6600`, hidden in lite mode by `play.css:68`), `DM Mono`/`monospace` in a few result boxes (`1534, 1911, 2057, 12061`), and the splash's "orbiting emerald dashes" (`server.js:10921`). Low priority.

### 2.8 Landing page and "Welcome to Elingu"

- **First visit (explore overlay, `explore.js`)** is good: "What do you study?", "Pick one to see your topics. No sign-up needed.", two cards, 6 emoji and 2 flags. Remaining: flags at `explore.js:59-60` render as plain letters ("KE", "GB") on Windows school PCs; 🔒/📖/⏳ at `129, 253-257, 282`; the bar logo "🌳 Elingu" at `184` should be the real logo image.
- **"Welcome to Elingu, Amani! 🌱 / Your thinking journey starts now."** `index.html:7098-7106` (key also at `i18n.js:304`). One emoji and a cliché line. Suggest: logo, "Karibu, Amani." then "Let's find your first topic." and one button.
- **Gateway `/` "Welcome to Elingu"** `server.js:10987`: three equal role cards with emoji icons, the "Premier" subtitle, a flag badge. Suggest a two-line header and three roles as SVG-icon rows.
- **Auth brand panel** `index.html:6618-6626`: "Elimu ni Nguvu" is good (real Swahili, short); the circuit SVG and the brochure paragraph are not.
- **Chat welcome** `index.html:6422` "Jambo! I'm Elingu 🌳" and 100+ randomised greetings `10520-10660` ("Night owl session! I'm Elingu 🌙🌳", "Excel in Cambridge 0580 Core Mathematics ... 🔢 Step-by-step guidance without stress."). Replace with one short, factual greeting naming the subject; no emoji.

## 3. Replacement system: self-hosted SVG icon sprite

### 3.1 Choice of icon set

| Set | Licence | Style | Pros | Cons |
|---|---|---|---|---|
| **Lucide** (recommended) | ISC (permissive; keep the LICENSE file in the package) | 24px grid, round stroke, single weight | smallest bytes per icon, large vocabulary (microscope, flask-conical, atom, dna, sprout, landmark, church, graduation-cap), one consistent look, easy to subset | no native fill pairs |
| Phosphor | MIT | 6 weights per icon incl. fill and duotone | regular + fill pairs give an active tab state; rounder, friendlier | more bytes per icon set, heavier to subset; I could not confirm every science icon exists |
| Tabler | MIT | 24px outline plus filled, 5,000+ icons | very large | more generic look, many near-duplicates, more to curate |

Recommendation: **Lucide**. The licence is permissive and compatible with the self-host rule; a sprite of about 115 icons should be a few tens of KB before gzip (confirm after the first build), well under the 300 KB per-file cap; the vocabulary covers every subject; one stroke weight is easy to recolour per subject. For selected states use a tinted fill (`fill: currentColor; fill-opacity: .18; stroke-width: 2.25`) so fill variants are not needed. If the owner later wants true filled glyphs for the five dock icons only, add Phosphor `fill` for those (MIT, allowed).

Ship it the way fonts are shipped: add `lucide-static` as a dependency and a script `scripts/build_icons.js` that reads a list of icon names from `node_modules`, strips width/height and writes `public/icons.svg` (commit the output; the repo has no build step). The script must **fail on a missing name**: Lucide renames icons between versions (e.g. `chart-column` was `bar-chart-3`, `circle-check` was `check-circle`, `triangle-alert` was `alert-triangle`, `file-pen-line` was `file-edit`). Pin the version. I could not verify the installed package layout or every name in this read-only audit, so confirm them when the script first runs.

### 3.2 Rendering

One sprite file, same origin, cached by the service worker:

```html
<svg class="i" aria-hidden="true" focusable="false"><use href="/icons.svg#i-flame"></use></svg>
```

Why external `/icons.svg#i-name` rather than the inline `#i-name` form: `index.html` is already about 757 KB, and the Parent and Teacher portals are separate server-rendered documents; an external sprite is downloaded and cached once for all of them. If the owner prefers the literal inline `<use href="#i-name">`, an `iconSprite()` helper in `server.js` can inject the same file at the top of each portal body. Symbols and CSS are identical, so this can be decided at the end. Either way, use one JS helper for the many template strings:

```js
function ico(name, cls) { return '<svg class="i ' + (cls || '') + '" aria-hidden="true" focusable="false"><use href="/icons.svg#i-' + name + '"></use></svg>'; }
```

Add `/icons.svg` to the `sw.js` precache and bump `CACHE_NAME` (repo rule).

### 3.3 Size, stroke and colour rules

- Base class: `.i { width: 1em; height: 1em; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; flex: none; vertical-align: -0.125em; }`
- Sizes: 16px inline with text and chips; 20px in buttons and list rows; 24px in nav (dock and sidebar); 28px glyph inside a 48px subject tile; 40px in empty states. No other sizes.
- Stroke: 2 at 16-24px, 1.75 at 28px and above. One stroke weight per row.
- Colour: always `currentColor`; no hard-coded colours inside the sprite. Semantic tokens: success, warning, error, info. Subject glyphs are white on the subject's solid tile.
- Selected nav: accent colour, stroke 2.25, tinted fill, bold label. Not a bigger emoji.
- Touch targets stay 44px (existing CSS already uses `min-height: 44px`); the icon is 24px inside.
- Locked or disabled: `opacity: .5` plus the `lock` icon.

### 3.4 Accessibility

- Decorative icon beside visible text: `aria-hidden="true" focusable="false"`. Many current nav emoji lack `aria-hidden` (e.g. `index.html:6118-6263`), so screen readers read the emoji name before "Brain Deck"; the migration fixes that.
- Icon-only button: label on the button, not the svg: `<button aria-label="Show password"><svg class="i" aria-hidden="true">...</svg></button>`. Existing examples (`6724, 7025`) already do this.
- Status shown by icon alone (lock, check, warning) must also have visible text or a visually hidden label; never colour alone.
- `i18n.js` translates `aria-label`, `title`, `placeholder`, `alt` (`ATTRS`, line 21), so new labels need Kiswahili entries.

### 3.5 Lite mode and dark mode

- Lite mode (`html.lite`, `window.ElinguLite`): icons are static so nothing needs switching off, and removing emoji reduces font fallback cost. Any new micro-animation (flame flicker, press scale) must sit under `html.lite` overrides; `play.css:64` already sets `animation: none !important` for `html.lite *`.
- Dark mode (`body.theme-dark`): strokes use `currentColor`, so icons follow text colour. Define each subject tile as light and dark token pairs and check contrast with a tool (not done here).

### 3.6 Exact icon names to ship (Lucide names)

**Navigation:** `brain` (Brain Deck / Learn), `file-pen-line` (Practice), `target` (Missions), `compass` (Explore), `bookmark` (My Spaces), `route` (Expeditions), `shield-check` (SafeBox), `trending-up` (My Progress), `sliders-horizontal` (Custom Spot), `settings`, `bell`, `moon`, `sun`, `search`, `house`, `menu`, `x`, `plus`, `ellipsis`, `arrow-left`, `arrow-right`, `chevron-right`, `chevron-down`, `log-out`, `user-round`, `users-round`, `school`.

**Subjects (CBC and Cambridge/Edexcel):** `calculator` (Mathematics, Core/Checkpoint Maths), `sigma` (Advanced/Additional Mathematics), `triangle-right` (geometry topics), `flask-conical` (Chemistry), `atom` (Physics), `dna` (Biology), `microscope` (Integrated/Lower Secondary Science, Virtual Lab), `heart-pulse` (Human Biology), `book-open-text` (English, First Language English), `book-open` (Literature in English), `feather` (Fasihi ya Kiswahili), `languages` (Kiswahili), `users-round` (Social Studies), `globe` (Geography, Global Perspectives, Global Citizenship), `scroll-text` (History and Citizenship), `church` (CRE), `landmark` (Cambridge, Civics), `laptop` (Computer Studies / Computer Science / Computing), `code-xml` (coding lab), `briefcase-business` (Business Studies), `chart-column` (Economics, data handling), `sprout` (Agriculture), `palette` (Creative Arts, Fine Art), `music` (Music and Dance), `clapperboard` (Theatre and Film), `pen-tool` (Graphic Design), `dumbbell` (Sports and Recreation), `hand-heart` (Community Service Learning), `wrench` (Pre-Technical), `test-tubes` (lab bench), `thermometer`, `timer`, `scale`.

**Status:** `lock`, `lock-open`, `check`, `circle-check`, `circle-x`, `triangle-alert`, `info`, `hourglass`, `clock`, `loader` (spinner; static in lite mode), `wifi-off` (offline), `refresh-cw`, `eye`, `eye-off`, `badge-check`.

**Actions:** `mail`, `send`, `printer`, `pencil`, `pen-line`, `copy`, `download`, `trash-2`, `save`, `key-round`, `mic`, `volume-2`, `file-text`, `clipboard-list`, `calendar`, `map-pin`, `message-circle`, `lightbulb`, `smartphone`, `banknote`, `handshake`, `map`, `play`, `circle-help`.

**Rewards:** `flame` (streak), `snowflake` (streak freeze), `zap` (XP, Brain Spark), `star` (rating only), `trophy`, `medal`, `award`, `crown` (Premium plan), `party-popper` (level-up toast only).

**Brand:** a custom `i-brand-tree` symbol drawn from the existing logo wherever the tree mascot emoji is used today. Never use `sparkles`, `wand-sparkles` or `rocket`.

About 115 symbols in total.

## 4. Fun versus cool for 9 to 18 year olds

This section relies on widely known design practice, not on inspecting any particular app.

**The tension.** A 10-year-old wants bright colour, feedback and play; a 16-year-old rejects anything that looks made for children. The common solution in consumer apps that serve both is a **neutral, confident chrome** (clean type, flat surfaces, real icons) with **personality concentrated in a few places** (colour per subject, short celebratory moments, an avatar or mascot, streaks and badges). Fun comes from the product reacting to the learner, not from decoration on every heading.

**What well-known music, social and language-learning interfaces commonly do:**
- Typography: one geometric sans family, large bold headings (weights 700-800), generous white space, heavy numerals for XP, streak and scores, tabular figures so counters do not jitter.
- Colour: a mostly neutral surface with **one accent that changes with the content** (here: the subject). Dark surfaces for focus screens. Solid colour tiles, not gradients.
- Icons: simple outline glyphs in the tab bar, bolder or filled for the selected tab; labels always visible on mobile.
- Motion: short (120-220 ms) ease-out transitions, a small press-scale (about 0.96) on tap, progress bars that fill, numbers that count up, a brief confetti burst only for real achievements. Nothing loops forever.
- Illustration: a small set of custom illustrations or a mascot for empty states and wins, drawn in the brand palette, not stock art.
- Micro-interactions: tap feedback, skeleton loading, a streak flame that visibly grows with the streak.
- Progress: rings or bars on subject tiles and avatars; badges as designed shapes with a glyph, locked badges shown as outlines.

**Keep emoji where the learner chose them:**
1. Avatars: the 12 presets (`index.html:6679-6690`) and the custom field. Longer term, draw 8 to 12 Kenyan animal avatars (lion, leopard, elephant, giraffe, eagle, zebra, rhino, flamingo) as SVG so they look identical on every phone; keep emoji as the free-text option.
2. Reactions the learner taps (for example a thumbs-up or light-bulb reaction on a tutor message, if added).
3. Celebration moments: level-up and new-badge toasts (`play.js:79, 94, 95`) can keep one emoji in the confetti, or switch to brand-coloured confetti shapes. Lite mode already hides confetti.
4. The learner's own message text: never alter it.

**Where emoji must go:** navigation (dock, sidebar, tabs, mode pills), all headings and form labels, buttons and CTAs (no trailing 🚀 or ✨), cards and tiles (subject, topic, expedition, apparatus pills), status badges and banners, plan and tier names, the parent/teacher/admin portals, emails, and tutor greetings and replies.

**Tutor voice.** Change the prompts (`server.js:417, 526, 562-564, 744, 745, 858`) from "mandatory emoji hook" to: "Do not use emoji. Warm, short, specific. Praise only what the learner actually did." This also matches the owner's no-fake-praise rule. Optionally add a post-filter beside `stripThinking` that removes pictographs from tutor output so a model slip never reaches a child.

**Making it feel cool and still fun, concretely:**
- Subject colour system: each subject gets a solid tile colour and a white glyph; that colour is the accent on the subject's roadmap, progress bar and buttons.
- Streak flame: one `flame` glyph that takes a warmer colour at 3, 7 and 30 days; freeze shown as `snowflake`. One short flicker on load; none in lite mode.
- Badges: flat two-colour shapes (hexagon, shield, circle) with a Lucide glyph; earned in colour, locked as outline. Keep the existing badge names in `gamification.js`, they are good ("Week warrior", "Deep thinker").
- Level-up: a bar slides in, the number counts up, 12 to 20 confetti pieces in brand colours for about 1.2 s, then done. No purple gradient.
- Voice: short Kenyan English with natural Kiswahili ("Karibu", "Hongera"). Replace hype ("Pick a quest below to start!") with a specific next step ("Pick a topic: Fractions or Decimals").
- One component set for all ages; only density and copy differ (bigger tiles and mascot by default for Grades 4-7, tighter lists for senior). No separate "kiddie theme".
- Respect slow phones: no blur, no large glow shadows, no animated backgrounds by default; lite mode stays authoritative.

## 5. Colour and type direction (no purple default, fits Kenya)

Keep what already works: deep green `#0D3A26` on warm off-white `#F5F0E8` / `#FAF7F2`. Make it deliberate:

- **Surfaces:** one flat warm off-white and white cards with a 1px warm border. Remove the five-blob radial wash (`index.html:121-125`) and speckle layer (`515-520`). Dark theme: `#0B1612` base, slightly lighter cards.
- **Primary:** `#0D3A26` for primary buttons and active nav; `#2D6A4F` (existing `--brand-green`) for links and progress.
- **Subject accents (none purple):** Maths ink blue `#2B6CB0`; Chemistry teal `#0E8C7F`; Physics orange `#E07B22`; Biology leaf `#4C9F38`; English terracotta `#C8452F`; Kiswahili rose `#C2415D`; Social Studies ochre `#B7791F`; Computer Science slate `#3F5A73`; Business copper `#A8642A`; Arts coral `#E4572E`; Integrated Science sea green `#2F855A`. Reserve a warm sun yellow `#F2B01E` for streak, XP and rewards. These are starting values: check white-on-tile contrast (4.5:1 for text, 3:1 for icons) before shipping; that was not run here.
- **Purple:** remove as a default. Restyle the X-Ray and quest generator with the Maths blue or a neutral card plus green accent. Fix the undefined `--brand-purple` / `--brand-teal` by mapping each topic card to its subject token.
- **Gradients:** none on buttons, cards or toasts. Acceptable only for a subtle progress fill.
- **Kenyan flavour without cliché:** warm earth tones and one very low-contrast kanga/shuka-inspired pattern on the auth brand panel and empty states, replacing the circuit traces. Keep the real local examples already in copy (chapati, M-Pesa, shamba).
- **Type:** DM Sans only (already self-hosted at 400-800 in `fonts.css`). Set `--font: 'DM Sans', system-ui, -apple-system, sans-serif` (today it names Inter, which is not loaded). Scale 12/14/16 body, 20/24 section titles, 32 page titles; weight 800 for numerals; sentence case everywhere (no all-caps subtitles such as "PERSONALIZED LEARNING COMPANION"); `font-variant-numeric: tabular-nums` on XP, timers and marks.
- **Copy rules:** no em dashes (use a colon, full stop or comma); avoid "journey", "unlock", "supercharge", "superpower"; no "X, not Y" reversals; no unverifiable superlatives; no compliance seals.

## 6. Migration map and rollout

### 6.1 Top 60 emoji to icon names

Counts are across all in-scope files. "Del" means delete the emoji and keep the text; "Keep" means a user-chosen or celebration use that stays.

| # | Emoji | Count | Replace with | Notes |
|---:|---|---:|---|---|
| 1 | 🚀 | 104 | Del (or trailing `arrow-right` on a primary CTA) | "Create Account", "Sign In" need no icon |
| 2 | ✨ | 62 | Del | Premium plan name gets `crown`; "Generate Personal Quest" gets `plus` |
| 3 | ⏳ | 59 | `hourglass` / `loader` | loading uses `loader`, waiting for parent uses `hourglass` |
| 4 | ⭐ | 53 | `star` (XP), `trending-up` (My Progress nav), `crown` (premium) | avatar ⭐ stays |
| 5 | 🔬 | 50 | `microscope` | Science, Virtual Lab |
| 6 | 📚 | 42 | `book-open-text` | English |
| 7 | 📐 | 42 | `calculator` (Maths) / `triangle-right` (geometry) | |
| 8 | 🧪 | 41 | `flask-conical` | Chemistry |
| 9 | 🏫 | 36 | `school` | |
| 10 | 🌳 | 35 | `i-brand-tree` (logo) or Del | mascot in greetings: remove |
| 11 | ⚡ | 34 | `zap` | Brain Spark, XP |
| 12 | 🌱 | 34 | `sprout` | Agriculture, free plan |
| 13 | 🎯 | 33 | `target` | Missions |
| 14 | 🔒 | 33 | `lock` | locked topic, privacy |
| 15 | 🦁 | 31 | Keep (avatar) | no avatar: initial letter |
| 16 | 👁️ | 30 | `eye` / `eye-off` | password toggle |
| 17 | 📋 | 29 | `clipboard-list` | |
| 18 | 💡 | 29 | `lightbulb` | hints |
| 19 | 🎓 | 28 | `graduation-cap` | |
| 20 | 🌍 | 26 | `globe` | Humanities, Geography |
| 21 | 🎉 | 26 | Keep in level-up toast, else Del | celebration only |
| 22 | 🔍 | 25 | `search` | |
| 23 | 🏛️ | 25 | `landmark` | Cambridge |
| 24 | 🔄 | 25 | `refresh-cw` | |
| 25 | 🌿 | 24 | `leaf` | |
| 26 | 🌟 | 24 | Del / `star` | |
| 27 | 💻 | 23 | `laptop` (`code-xml` for coding lab) | |
| 28 | ✔ | 22 | `check` | |
| 29 | 🎨 | 21 | `palette` | |
| 30 | 📜 | 21 | `scroll-text` | History |
| 31 | ☀️ | 21 | `sun` | theme toggle; remove from greeting title |
| 32 | 📩 | 21 | `mail` (`send` on send buttons) | |
| 33 | ✍️ | 21 | `pen-line` | writing |
| 34 | 🤝 | 20 | `handshake` / `hand-heart` (CSL) | |
| 35 | ⚖️ | 20 | `scale` | |
| 36 | ⚠️ | 20 | `triangle-alert` | |
| 37 | 🔢 | 19 | `calculator` / `sigma` (Advanced Maths) | |
| 38 | 🧬 | 17 | `dna` | Biology |
| 39 | 📊 | 17 | `chart-column` | |
| 40 | 📝 | 17 | `file-pen-line` | Practice, exam marks |
| 41 | 📖 | 17 | `book-open` | Learn mode |
| 42 | 📲 | 17 | `smartphone` | SMS, M-Pesa |
| 43 | 💼 | 16 | `briefcase-business` | Business |
| 44 | 🔥 | 16 | `flame` | streak |
| 45 | ⚛️ | 15 | `atom` | Physics |
| 46 | 🗺️ | 15 | `map` | roadmap, Geography |
| 47 | ✅ | 15 | `circle-check` | |
| 48 | ❌ | 15 | `circle-x` | |
| 49 | 🗣️ | 14 | `languages` (Kiswahili) / `mic` (oral) | |
| 50 | 🌙 | 14 | `moon` | |
| 51 | 💰 | 14 | `banknote` | Money Smarts |
| 52 | 📄 | 14 | `file-text` | |
| 53 | 📈 | 13 | `trending-up` | |
| 54 | ⏱️ | 12 | `timer` | exam duration |
| 55 | 🧮 | 12 | `calculator` | "No calculator" adds a strike via `.i-off` |
| 56 | 🧭 | 11 | `compass` | Explore |
| 57 | 🛡️ | 11 | `shield-check` | SafeBox |
| 58 | 💬 | 11 | `message-circle` | |
| 59 | 🖨️ | 11 | `printer` | |
| 60 | ✏️ | 10 | `pencil` | edit avatar badge |

Also: the Kenya and UK flags (about 64 uses) become text chips ("CBC", "IGCSE") or tiny SVG flags; 🧠 (nav) `brain`; 🌌 and 🪐 (My Spaces) `bookmark`; 🩺 `heart-pulse`; 🕌 `landmark`; ✝️ `church`; 🎭 `clapperboard`; ⚽ `dumbbell`; 🏆 and 🥇 `trophy` / `medal` (badges).

Subject and topic `icon:` fields (about 380 uses) should not be edited one by one. Add one function `subjectIcon(name)` that matches the subject name (reusing the `resolveBestSubjectMatch` logic so "Science" never matches "Computer Science") and returns a name from 3.6. The database `icon` columns (`db/schema.sql:207`, seeds) stay as legacy emoji and the client ignores them. This avoids touching the idempotent seeders and any student progress data.

### 6.2 Rollout order by screen

0. **Foundations (no visible change).** Add `lucide-static`, `scripts/build_icons.js`, `public/icons.svg`, the `.i` CSS and the `ico()` helper; add the sprite to the sw precache and bump `CACHE_NAME`. Add a test beside `performance_lite.test.js`, e.g. `tests/ui_icon_hygiene.test.js`, that scans learner files for Extended_Pictographic with an allow-list (avatar presets, celebration list) so emoji cannot creep back. Make the `i18n.js` lookup ignore leading/trailing pictographs, then strip emoji from keys in the same change so HTML and Kiswahili stay in sync. Define the missing `--brand-purple` / `--brand-teal` as subject tokens.
1. **Tutor voice** (highest impact, tiny diff). Edit prompts at `server.js:417, 526, 562-564, 744-745, 858`; remove emoji from the greeting arrays (`index.html:10520-10660`); optional output filter. Re-run mastery and Socratic tests.
2. **Bottom dock and sidebar nav** (`index.html:6074-6330, 6513-6535`; mode pills `12264-12271, 12558-12565`).
3. **Brain Deck home:** greeting title, mood tiles (`12276-12296`; replace the three equal tiles with one primary "Continue" card and two quieter links), subject pills, roadmap stops, status badges.
4. **Sign-up and sign-in** (`6660-7140`): labels, step pills, password toggles, success and approval screens; remove the circuit SVG; rewrite the hero paragraph and success line.
5. **Explore-first screen and exam hub:** `explore.js` (flags to chips, lock icons), `exam.js:91, 92, 126`.
6. **Progress and play:** `play.js` (flame, snowflake, Brain Spark title, badges); `gamification.js` (add an `iconKey` beside the legacy `icon`, client prefers `iconKey`); `play.css:18` flat green toast instead of the purple gradient.
7. **Missions, Expeditions, labs** (`11135-11190`, `6430-6470`, `9633-9990`): drop emoji from the three-card layouts and make the cards differ in weight.
8. **Subject and topic icons** via `subjectIcon()`; retire emoji `icon:` use in the STEP2 chips (`15058-15160`).
9. **Copy sweep:** em dashes, "journey", superlatives, `server.js:10988, 10991`, `index.html:26`.
10. **Gateway `/` and Parent portal** (`server.js`), then **Teacher portal** (`teacherRoutes.js`), then email templates (`emailService.js`), finally **admin** (`adminRoutes.js`).
11. **Phase 2 polish:** illustrated SVG avatars, dark-mode subject tokens, kanga pattern background, level-up animation.

### 6.3 Risks to check

- An existing test requires Kiswahili entries for new dock/explore/Me/exam text: add entries for any new label.
- `tests/css_syntax_hygiene.test.js`: keep CSS inside `<style>` tags.
- Server-rendered portals: follow the AGENTS.md template-literal rules (no inline `onclick` with concatenated values) when adding `ico()` calls; validate rendered `<script>` blocks with `vm.Script`.
- Emails: many mail clients block SVG; use plain text labels, not icons, in `emailService.js`.
- Run the CLAUDE.md baselines after each step (`css_syntax_hygiene`, `npm test`, pricing suite).

## 7. Method note

The inventory and classification scripts ran from the session scratchpad and were not added to the repo. Re-run with the same regex to track progress. A zero target for navigation, heading, button, card, status and tutor classes is realistic, leaving only avatars, reactions and celebration.
