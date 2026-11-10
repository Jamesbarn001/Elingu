# Curriculum, Teaching Depth and Look-and-Feel Overhaul: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the learner app land on Home after sign-in, make My Subjects/Spaces collapsible, align every subject with the real KICD (CBC) and Cambridge (IGCSE) syllabi, teach concepts from first principles, decide how Kiswahili is used in teaching, and replace emoji decoration with a designed icon system that still feels fun to teens.

**Architecture:** Research first (four read-only agents, each writing one report under `docs/audits/`), then implementation in file-disjoint tasks so agents never edit the same file. Curriculum stays 100% database-driven (seeds in `db/seeds/`, refreshed by `curriculumRepository.ensureSeedCurrent()`); teaching depth lives in `concept_primer` data plus the tutor prompt in `server.js`; icons are a self-hosted inline-SVG sprite.

**Tech Stack:** Node/Express, `public/index.html` SPA, `public/*.js|css`, `db/seeds/*.js`, custom test runner (`node tests/runner.js`).

**Spec:** the owner's message of 2026-11-09 (screenshots of the live app, the "AI tells" carousel, 11 numbered asks). No separate spec file.

## Global Constraints

- Never run `git commit` or `git push`; stage only (`git add -A .`).
- CBC uses "Strand/Sub-strand"; Cambridge uses "Unit/Topic/Content Area"; the word "Strand" never appears in Cambridge UI. Cambridge subjects are named "Cambridge IGCSE" (Years 10-11) and "Cambridge Lower Secondary / Checkpoint" (Years 7-9), never "British" in learner-facing text.
- Curriculum is database-driven: no hardcoded curriculum in `curriculumMapService.js` or `server.js`; seeders idempotent.
- No fake praise ("Brilliant!") in the tutor. `[STATUS: MASTERED]` only after an explanation in the learner's own words.
- Do not describe content as "KICD approved/certified"; "aligned to the published KICD design" is allowed only where an audit report supports it.
- Rule 8: CSS for `index.html` only in `<style>`; bump `CACHE_NAME` in `public/sw.js` when public assets change; `/i18n.js` SCOPE and Kiswahili list updated for new learner text.
- Third-party assets are self-hosted (no CDN); 300 KB per file cap in `public/`; icons must switch off any animation under `html.lite`.
- KICD content must be checked against what the KICD site actually shows; if it cannot be read, say so in the report instead of guessing.

## Review Focus

- A learner whose subject has no seed for their grade (for example Chemistry Grade 11) sees a clear "coming soon", not an empty map.
- A learner already inside a space when they sign in again still lands on Home (not the old chat).
- Icon sprite fails to load (offline, lite mode): buttons still show readable text labels.
- Screen readers: icon-only buttons have `aria-label`; decorative icons are `aria-hidden`.
- Kiswahili toggle on: chat answers are never machine-translated mid-sentence; chosen policy is applied consistently.

## Decisions the owner must confirm before Phase C

1. **Emoji policy (recommended):** replace emoji in navigation, headings, buttons and cards with one consistent SVG icon set; keep emoji only in two places teens expect them: user-chosen avatars and reactions/celebrations (a streak flame, a badge). Tutor replies stop forcing an emoji after every greeting.
2. **Kiswahili in teaching (recommended):** Phase 1 = screens only (done). Phase 2 = an opt-in "Explain in Kiswahili" button under each tutor answer and primer that translates that one message on demand, with the English technical term kept in brackets. No automatic switch of the tutor language.
3. **Cambridge naming:** show "Cambridge IGCSE" and syllabus codes (0620, 0625, 0610, 0580, 0478...) on every Cambridge subject.

## File Structure

| File | Responsibility | Phase |
|---|---|---|
| `docs/audits/kicd_gap_report.md` | per subject/grade gap list vs KICD | A |
| `docs/audits/cambridge_gap_report.md` | per syllabus gap list vs Cambridge | A |
| `docs/audits/teaching_depth_report.md` | where primers/tutor assume prior knowledge, prerequisite-ladder design, Kiswahili design | A |
| `docs/audits/ui_icon_report.md` | emoji inventory, AI-tell inventory, icon mapping | A |
| `public/index.html`, `public/play.js` | landing tab, collapsible sidebar | B |
| `db/seeds/*.js` | corrected and extended curriculum maps | C |
| `server.js` (prompt block ~lines 540-870) | tutor behaviour | C |
| `public/icons.svg`, `public/icons.js` | icon sprite and helper | C |

## Phase A: Research (parallel, read-only except one report file each)

### Task A1: KICD CBC alignment audit
**Files:** Create `docs/audits/kicd_gap_report.md`.
**Produces:** a table (subject x grade 4-12): seeded strands/sub-strands vs the KICD curriculum design, with missing and extra items, source URL per row, and "could not verify" where the site could not be read.
- [ ] Read `db/seeds/cbc_*_seed.js`; list what exists per subject and grade.
- [ ] Look up each subject's KICD curriculum design (kicd.ac.ke, KICD senior school designs) and compare.
- [ ] Write the report; end with a prioritised fill-in list (subjects most used first).

### Task A2: Cambridge alignment audit
**Files:** Create `docs/audits/cambridge_gap_report.md`.
- [ ] Read `db/seeds/british_caie_seed.js`.
- [ ] Compare with the public Cambridge IGCSE syllabus content lists (0620, 0625, 0610, 0580, 0478, 0500/0990 as applicable) and Lower Secondary frameworks.
- [ ] Report gaps per syllabus with codes, plus every place the UI says "British".

### Task A3: Teaching depth and Kiswahili design
**Files:** Create `docs/audits/teaching_depth_report.md`.
- [ ] Read `concept_primer` structure in seeds, `server.js` tutor prompts, `constitution.js`.
- [ ] Identify why a primer such as "rationalising denominators with conjugates" assumes the idea of a conjugate; propose a prerequisite ladder (what you need to know first, a worked example from scratch, a 2-question check) and the data shape for it.
- [ ] Design the Kiswahili-in-teaching option (see Decision 2) with prompt wording and UI placement.

### Task A4: Emoji and AI-tell audit, icon system
**Files:** Create `docs/audits/ui_icon_report.md`.
- [ ] Count and classify emoji in `public/*.html|js|css`, `server.js` prompts and portals; map each class to an icon name.
- [ ] List the "AI tells" in the app (purple gradients, emoji headings, three equal cards, em dashes, "It's not X, it's Y", sparkle buttons, invented stats, fake terminal) with file and line.
- [ ] Propose the icon set (self-hosted, licence-checked), size/weight rules, and where emoji stay.

## Phase B: Small fixes (one agent or inline; touches `public/index.html` and `public/play.js` only)

### Task B1: Land on Home after sign-in
**Interfaces:** Produces `goHomeAfterLogin()` in index.html, called from `loginLearnerDirectly` and the session-restore path.
- [ ] Test (Playwright or runner string check): after login the active main tab is `home` and no space is open.
- [ ] Implement; remember last space under "Continue where you left off", not as the landing page.

### Task B2: Collapsible My Subjects and Spaces under Brain Deck
- [ ] Brain Deck row toggles the whole group; My Subjects and My Spaces each toggle on their own; state persisted per learner; keyboard and `aria-expanded` correct.

## Phase C: Content and design (after owner confirms the three decisions)

### Task C1: Curriculum fill-in (one agent per seed file, disjoint files)
- [ ] For each gap from A1/A2, add maps to the owning `db/seeds/*.js` file; keep ids stable; run `curriculum_refresh.test.js` and `database_curriculum_verification`.
- [ ] Learner sees "coming soon" for subjects with no map.

### Task C2: Teaching depth
- [ ] Add `prerequisites` and `from_scratch` fields to primers (schema change in `db/schema.sql` and `curriculumRepository`), render in the primer view, and update the tutor prompt to check prerequisites before the new idea.
- [ ] Remove the mandatory-emoji and "Brilliant!" lines from the prompt block (`server.js` ~562, ~858, ~1606); add a test that the prompt contains no forced emoji or stock praise.

### Task C3: Kiswahili on demand
- [ ] "Explain in Kiswahili" button per tutor answer/primer; one server route that translates a single message through `callLLM` with PII guard; tests for the PII path and for the English term kept in brackets.

### Task C4: Icon system
- [ ] Build `public/icons.svg` sprite and `icons.js` helper; replace emoji in nav, headings, buttons, cards per `ui_icon_report.md`; keep avatars and celebration emoji; update SW cache; `html.lite` respected.

## Self-review

- Coverage: the 11 asks map to A1/A2 (curriculum alignment, topic counts, all subjects), A3/C2 (concept depth), A3/C3 (Kiswahili teaching), A4/C4 (emoji and AI-tell look, fun vs cool), B1 (landing), B2 (collapsible), C2 (praise), and the Cambridge naming in A2/C1.
- Not possible as asked: "log in to every account". Learner accounts are other people's private data and I do not use real families' sign-ins; every learner sees the same seeded curriculum, so A1/A2 audit the seeds and database directly, which is the same data.
