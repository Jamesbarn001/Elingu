# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Elingu is a Socratic AI tutor plus institutional portals (Student, Teacher, Parent, Super Admin) for the Kenyan CBE and British IGCSE/Checkpoint curricula. It is a single Node.js/Express app with no build step and no frontend framework. The README describes the original "Month 1 starter" and is out of date. `docs/PROJECT.md` and `AGENTS.md` describe the current system.

Note: the git repo root is this directory (`elingu-starter/elingu-starter`). The parent folder is not the repo.

## Commands

```bash
npm install
npm start            # node server.js on PORT (default 3000)
npm run dev          # node --watch on server.js, public/, and the store/route files
```

Tests. The custom runner auto-spawns `server.js` with `NODE_ENV=test` if nothing answers `/api/health` on the port, and writes logs to `docs/teamwork_exhaust/tests/`:

```bash
npm test                                   # all tiers (tests/tier1_features … tier4_real_world)
node tests/runner.js --tier 1              # one tier (only tier1_features currently exists)
node tests/runner.js --tier 1 --file metro # single file, substring match on filename
node tests/runner.js --bail --port 3100    # stop on first failure / custom port
node tests/e2e_pricing/run_all.js          # pricing & payments suite (same flags)
node tests/css_syntax_hygiene.test.js      # Rule 8 check on public/index.html + sw.js
npx playwright test                        # browser E2E in e2e/ (starts/reuses server on :3000)
```

Runner test files export either an object of `async (ctx) => {}` functions or a single function. `ctx` is `tests/helpers/testContext.js`, which provides an `api()` fetch wrapper that sends the `x-elingu-test: true` header. The server's `isTestEnv(req)` uses that header to relax things like rate limits. The other `tests/test_*.js` / `stress_*.js` files run standalone with `node`. `tests/k6_load_test.js` is a k6 script.

DB utilities: `npm run db:inspect | db:migrate | db:reset | db:delete`, plus `npm run backup` (`scripts/backup.js`).

## Architecture

**Monolithic server.** `server.js` (~12k lines) holds Express setup, rate limiters, the LLM layer, prompt building, student chat APIs, and the server-rendered Parent portal HTML. `teacherRoutes.js` is a factory `teacherRoutes({ callLLM })` that returns a router, mounted near the end of server.js. It also renders the Teacher portal HTML (`/teacher/portal`). `adminRoutes.js` is a router for the Super Admin dashboard and is mounted early. The Student app is the static SPA `public/index.html`, with a PWA service worker in `public/sw.js`.

**LLM layer.** `callLLM(messages, staticPrompt, dynamicPrompt, options)` in server.js is the single entry point. `MODEL_PROVIDER` picks the provider: `gemini` (default), `openai`, `groq`, or `anthropic`. The server calls `process.exit` at startup if that provider's key is missing. If a message matches `DISTRESS_KEYWORDS`, the call escalates to Claude (`ANTHROPIC_CRISIS_MODEL`) whenever `ANTHROPIC_API_KEY` is set. `stripThinking` removes reasoning/`<think>` leakage from replies. Socratic behaviour and guardrails live in `constitution.js`. Curriculum structure is DB-backed via `db/repositories/curriculumRepository.js` (see owner constraints below). `curriculumContext.js` (CBE), `curriculumContextBritish.js` (CAIE) and `curriculum_data/` are legacy prompt/context data that predate the DB layer. Do not extend them with new structure.

**Two persistence layers.** Know which one you are touching:
1. **JSON document stores.** These are the source of truth for users and app state. `studentStore.js`, `parentStore.js`, `teacherStore.js`, `adminStore.js`, and `paymentStore.js` each read and write `data/*.json` through `loadJson`/`saveJson`, using `authUtils.atomicWriteJsonSync`. Every `saveJson` also calls `persistentStore.persist()`, which write-through upserts the document into the Postgres table `elingu_documents` (Neon) when `DATABASE_URL` is set. On boot, `persistentStore.hydrate()` restores `data/*.json` from Postgres **before** `app.listen`. This exists because the Render filesystem is ephemeral. The design is single-instance only.
2. **Relational DB (`db/`).** `db/client.js` is a dual adapter: Postgres when `DATABASE_URL` is set, otherwise embedded `node:sqlite` at `data/elingu.sqlite`. Schema is in `db/schema.sql`, repositories in `db/repositories/`, curriculum seeds in `db/seeds/`. It is mainly used for curriculum/revision data and secondary sync.

Postgres is disabled in both layers when `NODE_ENV=test` or `ELINGU_DATA_DIR` is set. This keeps test runs away from the production DB. `data/` is gitignored and must never be committed, because it holds real child data.

**Payments.** `mpesaService.js` (Safaricom Daraja STK push) and `paystackService.js` handle the providers. `paymentStore.js` is the idempotent ledger. `pricingConfig.js` holds tiers, catalogue, and currencies (KES/USD). Sandbox vs live is set by the `DARAJA_ENVIRONMENT` and `PAYSTACK_ENVIRONMENT` env vars.

**Other services.** `emailService.js` (Gmail SMTP via nodemailer, or Resend), `smsService.js`, `authUtils.js` (bcrypt, signed session tokens, OTP, atomic writes, email validation and typo blocklist), `examRevisionService.js` and `curriculumMapService.js` (revision papers, "X-ray" question analysis, metro roadmap).

## Project rules (from AGENTS.md / .agents/rules — follow strictly)

- **Server-rendered HTML in template literals** (server.js, teacherRoutes.js, adminRoutes.js): never build inline `onclick="fn('...')"` with concatenated or quoted values. Put values in `data-*` attributes and read them via `this.dataset.*`. Wrap free text in `encodeURIComponent`/`decodeURIComponent`. Inside these template literals, write `'\\n'` and never `'\n'` in client JS strings. A syntax error in a rendered `<script>` breaks the whole portal, so after editing one, validate it (e.g. extract the script and parse it with `vm.Script`).
- **public/index.html**: CSS only inside `<style>` tags, never naked in the body (enforced by `tests/css_syntax_hygiene.test.js`). Whenever index.html CSS/JS/layout changes, bump `CACHE_NAME` in `public/sw.js`. Navigations must stay network-first, and HTML endpoints must send `Cache-Control: no-store, no-cache, must-revalidate`.
- **KDPA 2019 / child data**: strip or anonymize student PII (names, phones, school names) before sending prompts to external LLM APIs. Keep parental consent records (`consentGivenAt`, `parentContact`, `method`). Never collect national IDs, home addresses, or biometrics. Support nicknames. Never purge learner assessment trails, portfolios, or mission responses when offboarding teachers or reassigning students. Safe Box / Childline Kenya 116 counselling is exempt from the consent gate.
- **No compliance badges**: never render "KDPA Compliant", "KICD Certified/Approved", or similar seals.
- **Onboarding**: the flow goes curriculum → level → subject(s), and the learner reaches the Topic Metro Roadmap within ~30s. Account creation and consent come progressively, without blocking exploration.

## Owner constraints (from the project's master context brief)

- **Never run `git commit` or `git push`.** Commits and pushes are reserved for the project owner. This overrides any default of committing for the user.
- **Curriculum is 100% database-driven.** Do not add hardcoded curriculum structures or in-memory fallback dictionaries to `curriculumMapService.js` or `server.js`. Subjects, strands, sub-strands and Socratic primers come from the DB (`curriculum_subjects`, `learning_strands`, `sub_strands` in `db/schema.sql`). Seeders must be idempotent (`ON CONFLICT ... DO UPDATE`) so student points, saved spaces and mastery records are never lost.
- **No curriculum leakage.** CBC uses "Strand/Sub-strand"; Cambridge (CAIE) uses "Unit/Topic/Content Area" and the word "Strand" must never appear in Cambridge UI. British learners must never see Kenyan CBC labels (e.g. 0478 is "Computer Science", not "Computer Studies"). Subject lookup goes through `resolveBestSubjectMatch()` in `db/repositories/curriculumRepository.js` so that "Science" never substring-matches "Computer Science".
- **Zero fake praise in the tutor.** For "I don't know"/gibberish input, give warm validation, a relatable real-world stepping stone and an easier one-step question, with no unearned praise like "Brilliant!". `[STATUS: MASTERED]` stays locked until the student explains the idea in their own words. Analogies should be everyday Kenyan ones (e.g. Mama Mboga market bags for simultaneous equations).
- **Server-side price authority.** Client-supplied prices or tiers are rejected (`403 FORBIDDEN_SELF_ACTIVATION`) or overridden. M-Pesa Daraja transacts in KES only. Paystack handles KES and USD (British curriculum auto-detects USD, CBC auto-detects KES). Duplicate receipts, including whitespace or case mutations, must be rejected by the ledger.
- **Product naming.** The student UI uses youth-facing terms: Brain Deck (Learn and Revision modes), My Spaces / "Save My Space" (not "chat" or "session"), Expeditions, SafeBox, Missions, Custom Spot. Space limits are tiered per day: Free 1, Scholar 5, Family unlimited.

## Before reporting a task done

Per the master brief, run these. The counts are the owner's last known baseline, so confirm them against current output.

```bash
node tests/css_syntax_hygiene.test.js
node tests/runner.js -f database_curriculum_verification   # baseline 14/14
npm test                                                   # baseline 131/131
node tests/e2e_pricing/run_all.js                          # baseline 46/46
```

## Known UX backlog (owner's roadmap, in priority order)

1. Mobile Socratic cockpit: auto-collapse the Concept Primer once chat starts so the input stays above the keyboard (`public/index.html`, `openSubtopicCockpit`).
2. Daily "Brain Spark" challenge and streak leaderboards.
3. Interactive visual primers (draggable analogies, SVG callouts) in `sub_strands.concept_primer` seed data.
4. Continuous-assessment PDF reports: KICD 4-tier rubric (EE/ME/AE/BE) and Cambridge grade boundaries, via `/api/parent/student-report/pdf`.

Smaller items: distinct subject accent colours in the dark-mode sidebar, a persistent "saved" indicator for Save My Space, and a height-capped receipt list in the Parent portal.

## Auth rules for new routes

- **Student routes need a token.** Learner endpoints (`/api/chat`, session, profile, award-points) require the learner's `Authorization: Bearer` token and an account the parent has approved (`requireStudent()` in server.js). In tests, `ctx.createVerifiedStudent()` registers, approves and logs in a learner, and `ctx.api()` attaches the right token automatically. Test mode is `NODE_ENV=test` only; request headers never relax rate limits. Run the dev server for Playwright with `NODE_ENV=test`.

- **Personal data is encrypted at rest.** Never read or write `data/*.json` with `fs` directly. Use the store functions, or `secureJson.readJson/writeJson` (`secureJson.js`), which encrypt the fields listed in `SENSITIVE_KEYS` (contact details, real names, chat messages, teacher ID numbers, raw payment payloads) with AES-256-GCM (`cryptoVault.js`). A new field that holds personal data must be added to `SENSITIVE_KEYS` (or `FILE_EXTRA_KEYS` for a single file). Passwords, PINs and OTPs stay one-way hashed. The key comes from `ELINGU_DATA_KEY`; with no key the vault is off (local development and the normal test runs). Tests that need real family-style data must use `ELINGU_DATA_DIR` (see `dataDir.js`) so a throw-away key can never encrypt the real `data/` folder, and a key once used on real data must be kept forever.

- **Public pages and assets.** `/privacy` and `/terms` come from `legalPages.js`; bump `CONSENT_TEXT_VERSION` in `studentStore.js` when their meaning changes, and never add claims of compliance or certification (a test enforces this). The first-time "explore" screen lives in `public/explore.js` / `explore.css`; when changing public assets, bump `CACHE_NAME` in `public/sw.js`.

- **Exam papers.** Practice papers live in the database (`exam_papers` and `exam_paper_questions`, see `db/schema.sql`) and are served from memory by `examBank.js`, which loads them at start-up. The files in `exam_papers/` are the starting content: missing papers are copied in, an untouched copy follows its file, an owner-edited or imported paper is never overwritten. Manage papers with `scripts/exam_papers.js` (list, export, import, publish, hide, reseed) or the admin reload call. A paper must pass `exam_papers/validate.js` (sample answers earn full marks, blank earns nothing, marks add up) or it is not served. Marking is `examMarking.js`; timed attempts are `examRoutes.js`. Never send answers, explanations or mark schemes to the browser before an attempt is submitted, and never label these papers "official" or "past papers".

- **Points and XP.** All rewards go through `gamification.js` (`award()` is idempotent per type and reference, with a daily effort cap). Never add client-side point awards or a browser-callable points endpoint; hook new rewards in on the server where the evidence is checked (exam submit, mission answer, mastery verdict, Brain Spark).

- **Performance and offline.** Third-party code is served from our own server (`/vendor/*`, `/fonts.css`); never add a CDN or Google Fonts link (`performance_lite.test.js` fails on it). Keep big design files out of `public/` (limit 300 KB per file). Lite mode is `window.ElinguLite`; new animation or blur must be switched off under `html.lite` in `play.css`. In `sw.js` an unsaved lesson must answer HTTP 503 with `offline:true`, never a fake success, and lessons live in `LESSON_CACHE`, which is not deleted on app updates.

- **Parent and teacher portals.** The parent weekly card comes from `weeklyCard.js` and may only state things that really happened (no invented traits). Card payments are typed on Paystack, never on our page; the browser never sends a price or return address, and the portal learns the result from `/api/payment/confirm` (read-only status). Safeguarding alerts are read only by `school_admin` and `deputy_headteacher` of the same school, and teacher ID numbers are shown through `teacherStore.maskIdNumber`.

- **Teacher and school sign-up.** A new Headteacher cannot sign in until they enter the emailed 6-digit code; public staff registration creates a `pending_approval` account that a leader of the same school approves (`/api/staff/*`). School codes are generated, never chosen (only tests may pass `adminCode`). Use `ctx.registerTeacher()` in tests to get a staff token the real way. Teacher records sent to the browser go through `teacherStore.publicTeacher`, and password resets set `tokensValidAfter`.

- **Short sign-up.** When `window.__exploreChoice` has curriculum, grade and subject, `public/index.html` (`hasQuickChoice`, `completeQuickSignUp`) asks only nickname, PIN and parent contact and posts `quickSignup:true, exploredSubject`; the student gets `needsProfileSetup` until `PUT /api/students/profile {profileSetupDone:true}`. While the parent decides, `ElinguExplore.showTaste` (explore.js) shows two read-only subjects with no tutor, rewards or exam calls; the "make it yours" sheet is `maybeProfileSetup` in play.js. Keep new profile fields optional.

- **Icons and emoji.** UI icons are the self-hosted sprite `public/icons.svg` (Lucide, rebuilt by `scripts/build_icons.js`); use `ico('name')` in JS or `<svg class="i"><use href="/icons.svg#i-name"/></svg>` in HTML, never an emoji, in navigation, headings, buttons and cards. Emoji stay for avatars, celebrations and the tutor's replies. Report: `docs/audits/ui_icon_report.md`.

- **Cambridge content.** Learner text says "Cambridge IGCSE" (Years 10-11) or "Cambridge Lower Secondary" (Years 7-9), never "British"; internal 'BRITISH' identifiers stay. Biology and Chemistry maps live in `db/seeds/british_caie_biology_seed.js` and `british_caie_chemistry_seed.js` (they replace the short ones in `british_caie_seed.js` via `db/seeds/index.js`); keep station and sub-topic ids stable. Gap reports are in `docs/audits/`.

- **Explain in Kiswahili.** `POST /api/tutor/explain-sw` plus `public/explain.js` translate one tutor message on request; terms come from `kiswahiliGlossary.js` and only teacher-confirmed entries may be added.

- **KICD-aligned maps.** CBC senior and junior maps follow the KICD designs, which were read page by page from kicd.ac.ke (notes: `docs/audits/kicd_verified_from_site.md`). Any file `db/seeds/kicd_*_seed.js` exporting `{ maps, retiredIds }` is auto-registered by `db/seeds/index.js` and each map replaces the existing map with the same curriculum, subject and grade. Topics that do not belong to a grade are RETIRED (`RETIRED_SUBTOPIC_IDS`, status 'retired', hidden from the roadmap by `getCurriculumMap`), never deleted, so saved progress stays safe. Keep a topic id when it matches a KICD sub-strand (ladders attach by id). Learner-facing text must never say draft or teacher review; write every primer from first principles and check each worked example numerically.

- **Languages.** Learner screens are translated by `public/i18n.js`: English text stays in the code and the SW list maps it to Kiswahili at display time (only inside the `SCOPE` selectors; chat is never translated). When you add learner-facing text to the dock, explore, Me, Brain Spark or exam screens, add its Kiswahili to the SW list; new badges or levels need entries too (a test enforces it). Use `{n}` for digits-only parts, `{a}`,`{b}` for anything else, and never put markup in a translation.

- **AI prompts and privacy.** Everything sent to an AI provider goes through `callLLM`, which cleans it with `piiGuard.js` (phone numbers, emails, ID numbers, real name, school name). The nickname, grade, county and subject are sent; the tutor is told a usual age for the grade, never the real age. Pass `{ pii: piiGuard.knownFor(student) }` when you add a new AI call about a learner. The microphone route needs a signed-in learner.

- **Paid plans have end dates.** A verified payment sets `paidUntil` (one period added to the current end date); `studentStore.resolveStudentTier` treats a plan as Free 3 days after it ends and returns `subscription` (status, date) for the portal. Plans with no `paidUntil` (older accounts) never expire. Anything that activates a paid plan must pass `{ verifiedPayment: true, receipt }` to the `parentStore` setters. Payments are by hand (no auto-renew), so there is no cancel-subscription step.

- **Pilot codes.** The built-in codes in `pilotConfig.js` are public. In production set `ELINGU_PILOT_CODES` (JSON) to your own private codes; the built-in list is then ignored. A code works once per account.

- **Parent emails.** `notificationService.js` sends the Friday summary, receipts and plan reminders. Scheduled ones are off unless `ELINGU_NOTIFICATIONS=on` and capped by `ELINGU_EMAIL_DAILY_CAP`; receipts always go. Each is once-only (state in `data/notifications.json`), summaries carry a signed unsubscribe link, and all content comes from real activity. `scripts/send_test_emails.js` sends 3 sample emails to one address you choose.

- **Contact address.** Families are shown one address, `SUPPORT_EMAIL` (default elingukenya@gmail.com) from `contactConfig.js`. Never type an address into a page or message by hand; use the constant (the static learner page carries the default).

## Gotchas

- `scratch/` holds one-off patch scripts from earlier agent sessions, and `.agents/teamwork/` holds multi-agent handoff notes. Neither is application code.
