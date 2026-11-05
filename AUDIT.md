# Elingu Audit: loopholes, leaks, loose ends, duplication

Date: 2026-11-04. Scope: code in this repo, checked against the Data Protection Act, 2019 (No. 24) PDF in `D:\Local Disk\Projects\Elingu\docs`.

**How to read this.** Every item below was confirmed in the code or git state, and each has a file and line reference. Items marked **(not verified)** rely on something I could not check from here, such as the live deployment. No code was changed and nothing was committed.

**Not covered:** I did not log in as a student, parent or teacher, and I did not run the app or the test suite. Your Antigravity run already did the visual UX walk-through. Because `server.js` is about 12,000 lines and `public/index.html` is about 14,000, the grep-based sweeps below are not exhaustive. Everything is a finding to confirm, not a final verdict.

---

## 0. Fix first (ranked)

| # | Severity | Finding | Where |
|---|---|---|---|
| 1 | Critical | Production deploy would crash. Files `server.js` needs are **untracked in git**. | §1 |
| 2 | Critical | Any caller can switch off all rate limiting, including login brute-force limits, with one HTTP header. | §2.1 |
| 3 | High | Child and parent data is hardcoded in source (a named child, a parent email, a free-Premium override). | §2.2 |
| 4 | High | Nothing strips personal data before prompts go to Google, Groq or Anthropic. The project rules say it must. | §3.1 |
| 5 | High | Compliance badges the rules forbid are still live in 11 places. | §4 |
| 6 | High | Parent Family PIN goes in the URL query string of a GET request. | §2.3 |
| 7 | High | No privacy policy, terms page, breach procedure, data export or age check. | §3.2 |
| 8 | Medium | British learners see Kenyan terms: "Computer Studies", "STRAND", and Economics mapped to Business Studies. | §5 |
| 9 | Medium | "Offline mode" is mostly a shell. Chat cannot work offline, and the assets are heavy and load from CDNs. | §7 |

---

## 1. Git and deploy state (Critical)

`git status` shows 17 modified files (about +12.5k / −7.9k lines) and many **untracked files that the running app requires**:

- `paymentStore.js`, `paystackService.js`, `examRevisionService.js`, `curriculumMapService.js`
- `db/repositories/curriculumRepository.js`, `db/repositories/revisionRepository.js`, `db/seed_curriculum.js`, `db/seeds/`, `curriculum_data/`
- `public/sw.js`, `public/manifest.json` (the whole PWA/offline feature)
- `tests/css_syntax_hygiene.test.js`, `tests/e2e_pricing/` and about 10 other test files

`server.js` requires several of these at the top, for example `paymentStore`, `paystackService` and `pricingConfig`. A deploy built from git (the project is designed for Render) would crash on boot with `MODULE_NOT_FOUND`. All of that work also exists only on this one disk.

The git repo root is `elingu-starter/elingu-starter`. The outer folder has its own stray `package-lock.json`.

**Action:** you (not me, per your no-commit rule) should review and commit these files. Then confirm a fresh `git clone`, `npm ci` and `npm start` works.

Related housekeeping:
- `data/` is correctly gitignored, but `data/backup_pre_purge_*` and `data/backup_pre_wipe/` hold real user JSON on disk. Delete them once no longer needed.
- Four `.pptx` decks (one is an Office lock file `~$…`) and `playwright-report/`, `test-results/` and `scratch/` sit in the project folder. They are not tracked, but they should be moved out or ignored.
- `git diff` warns that LF will be converted to CRLF. Add a `.gitattributes` to avoid noisy diffs.

---

## 2. Security loopholes

### 2.1 Test-header bypasses all rate limiting (Critical) — FIXED 2026-11-04
`server.js:1006`: `isTestEnv = req => NODE_ENV==='test' || req.headers['x-elingu-test'] === 'true'`.
Seven rate limiters use `skip: isTestEnv` (lines 1014 to 1091). That covers student login, PIN verify, parent login, admin login, OTP, reset and mission generation. In production anyone can add `x-elingu-test: true` and brute-force 4-digit PINs or hammer paid LLM endpoints without limit.

The same header at `server.js:1527` replaces an LLM failure with a canned reply.

**Fix:** gate it on `NODE_ENV === 'test'` only. Have the test runner set the env var (it already does for the server it spawns). Never trust a client header.

### 2.2 Hardcoded personal data and a Premium backdoor (High) — FIXED 2026-11-04
`server.js:11800–11808` runs on every boot. It force-upgrades student `stu_2b910ef8f459` ("Erline") to Premium and sets a subscription under `mutwirijamesbarn@gmail.com`. That puts a child's name and a parent's email in source and git history. It also silently overrides the billing ledger, and it will mask billing bugs.

**Fix:** delete it. If you need a comped account, add it as an admin action that is recorded in the audit log.

### 2.3 Parent credentials in URLs (High)
The parent portal calls `/api/parent/dashboard?email=…&familyPin=…` (`server.js:8155, 8187, 8356, 8399, 8685, 9033, 9126, 9161`, plus others). It also stores the PIN client-side (`savedPin`). Query strings end up in server and proxy logs, browser history and Referer headers. It also breaks your own "no sensitive data in URLs" principle.

**Fix:** use POST with a body, or better, issue a signed session token after login (as the student and teacher flows already do) and send it in the `Authorization` header. Do not store the raw PIN in the browser.

### 2.4 Session secrets (Medium)
- `authUtils.js:526, 583, 639`: if `SESSION_SECRET` or `ADMIN_TOKEN_SECRET` is missing in production, a random key is generated per boot. Every deploy or restart logs out all users, and a second instance would reject the first one's tokens.
- In non-production, the teacher and student secrets fall back to constants in source (`elingu_teacher_session_master_secret_2026`). If `NODE_ENV` is not set to `production` on the host, those constants become the live secrets and tokens can be forged.
- **Fix:** refuse to start in production without these env vars, and never fall back to a literal.

### 2.5 Weak and legacy credential hashing (Medium)
- `studentStore.js:58`, `:903`, `:1121` and `teacherStore.js:466` still verify against SHA-256 with a fixed public salt, `'elingu_salt_2026'`. A 4-digit PIN has only 10,000 possibilities, so any leaked legacy hash cracks instantly. Confirm whether lazy re-hash to bcrypt happens on successful login, then drop the legacy path after a migration window.
- Student PINs are exactly 4 digits (`studentStore.js:481`). Make sure the lockout (which exists) is per-account and persisted, since the global limiter can be bypassed (§2.1).

### 2.6 Missing hardening headers (Medium)
Only `X-Content-Type-Options`, `X-Frame-Options` and `Referrer-Policy` are set (`server.js:37`). There is no CSP and no HSTS. The student page has about 139 `innerHTML` writes, so a CSP would be a valuable second line against XSS. Note that your rendered pages use heavy inline `<script>`, which makes a strict CSP hard. Plan a nonce-based CSP or move scripts to files.

### 2.7 Admin API key via query string (Low)
`/api/analytics/dashboard` accepts `adminKey` and `token` in the query string (`server.js:2827`). Header only. Also compare the secret in constant time.

### 2.8 Email suppression regex (Medium, correctness)
`emailService.js:127` silently skips sending to any address matching `dummy|mock|test…|fixture|^test\d*@|^parent\d+@`, in production too. A real parent whose address contains "mock" or starts with "parent1…" never gets a verification or approval email and no error is raised. Limit this to `NODE_ENV==='test'`.

### 2.9 Secrets hygiene
- `.env` is correctly ignored. It currently holds real-looking values for Gemini, OpenAI, Groq, Anthropic, Resend, Brevo, a Postgres `DATABASE_URL`, `ADMIN_PASSWORD` and Paystack (test mode, `sk_t…`). Daraja key and secret are empty and set to sandbox. Make sure none of these were ever committed. The repo history was rewritten with `filter-repo`, so run a secret scan (`gitleaks`) over all branches before pushing anywhere public.
- `ADMIN_PASSWORD` in `.env` means the admin password is plain text on disk and in the host dashboard. Prefer a bcrypt hash env var.
- `.env.example` is marked "modified". Check it holds no real values.

---

## 3. Kenya Data Protection Act 2019 check

I read ss.25 to 33, 39 to 43 and 44 to 50 in the PDF. The code was compared against them.

### 3.1 Findings against the Act

| Act | Requirement | Status in the code |
|---|---|---|
| s.33(1)(a), 33(2) | Parent or guardian consent and **age verification mechanisms** before processing a child's data | Partly met. A parent contact is required and an approval link is sent (`server.js:2175 to 2300`). There is **no age or date-of-birth check** at all, so there is no way to tell whether the person at the keyboard is a child, and no check that the "parent" email belongs to a guardian. The Act asks for a mechanism proportionate to risk, so a documented approach is needed. |
| s.33(4) | Counselling and child-protection services exempt from consent | Only for services that **exclusively** provide counselling. Elingu is a learning product with a SafeBox feature, so relying on s.33(4) for the whole chat is weak. Keep SafeBox minimal. Do not rely on this exemption for general processing. |
| s.25(d), 41(3) | Minimisation, privacy by default | `getAggregatedAnalytics`, safeguarding alerts and `recordSafetyIncident` store the **full text of the child's message** with the matched keyword (`server.js:1493 to 1517`). Store the minimum needed and set a retention period. |
| s.25(h), 48, 49 | Cross-border transfer needs proof of safeguards or consent. Sensitive data needs consent **and** confirmed safeguards | Every chat turn goes to Google, Groq, OpenAI or Anthropic servers abroad. Neon Postgres region is **(not verified)**. There is no consent wording or documented safeguard for this transfer. **Important:** AGENTS.md rule 5.4 and "Sections 48 to 50" say data "must remain stored in Kenya". The Act does not say that. It permits transfers with safeguards or consent, and s.50 only applies if the Cabinet Secretary prescribes a category. Fix AGENTS.md so the rule is accurate. |
| s.29 | Notify the data subject **before collecting**: purpose, third parties, rights, contacts, security measures | **No privacy notice or policy page exists** in the app (searched for privacy and terms routes). The sign-up flow collects first. |
| s.26, 38, 40 | Rights of access, portability, rectification, erasure | Erasure exists (parent portal, `server.js:9012`, 30-day soft delete in `studentStore.js:1323`). There is **no export/access endpoint** for the data subject (no "download my child's data"). |
| s.39, 40 | Retention limited to what is needed; delete or anonymise afterwards | Only the 30-day soft-delete and unverified-signup purges exist. There is no retention schedule for chat summaries, safety incidents, sessions or payment records. AGENTS.md rule 1.4 says "never purge" assessment trails when offboarding **teachers**. Make sure it is not read as overriding a parent's erasure request for a **child**. |
| s.43 | Notify the Data Commissioner within **72 hours** of a breach, and the data subject | **No breach procedure**, alerting or runbook anywhere in the repo. |
| s.41, 42 | Data protection by design: pseudonymisation, encryption, restore capability | Pseudonyms (handles) are used. There is no encryption at rest for `data/*.json` files. Postgres encryption depends on the host. `scripts/backup.js` backups are plain JSON. |
| s.31 | Impact assessment where processing is high risk | A product processing children's learning and wellbeing data should have a DPIA on file. None in the repo. |
| s.35 | Right not to be subject to solely automated decisions | The tutor's mastery lock and tier gating are automated. Distress-keyword flagging triggers alerts to a school and an admin without human review of the match. Document the human review. |
| s.46 | Health data only by or under a health-care provider or someone bound by professional secrecy | Distress and mental-wellbeing messages are health-adjacent. Treat them as sensitive, restrict access, and get advice on whether this applies. |
| s.18 to 21 | Registration of data controllers and processors | There is no mention of registration anywhere. Check with ODPC or counsel whether Elingu (and any partner schools) must register. **(not verified)** |

I am not a lawyer. This is a developer-side gap list. Get Kenyan data-protection counsel to review it before launch.

### 3.2 Personal data reaching the LLM (High)
AGENTS.md rule 5.4 says student names, phones and school names must be stripped before prompts go out. In the code:
- No anonymise or redact helper exists (searched `server.js`, `authUtils.js`, `constitution.js`).
- The child's raw chat text is sent as typed. Children will type their name, school, phone number or location, and nothing masks it.
- The "live learner data" tool result sent in the prompt (`server.js:~1460`) includes the student **handle**, streak, points, subjects and mission results.
- `tests/tier1_features/kdpa_pii_masking.test.js` only checks that **API responses** omit PINs and hashes. It does not test prompts sent to providers.

**Fix:** add one `scrubForLLM(text)` step used by every `callLLM` call (Kenyan and international phone formats, emails, ID-like numbers, known school names, the student's own handle and name). Add a test that captures the outgoing prompt.

Also check the provider terms: Google's **free** Gemini API tier may allow your data to be used to improve their products, which is not appropriate for children's data. Use a paid, no-training tier **(not verified; check the current terms)**. The `.env` runs `gemini-flash-lite-latest` on the free key path.

---

## 4. Compliance and trust badges (rule 6 says never render these)

Still live:

| File | Text |
|---|---|
| `server.js:5516–5517` | `KDPA 2019 Protected` badge |
| `server.js:3450` | "Your child's data is safe — Kenya DPA 2019 compliant" |
| `server.js:5844` | "Zero-PII KDPA 2019 student privacy" |
| `server.js:6020` | "Safe & secure • Compliant with Kenya Data Protection Act 2019" (checkout) |
| `server.js:10795` | `🛡️ KDPA 2019 Protected` pill |
| `server.js:10796` | `🔒 End-to-End Encrypted` pill |
| `teacherRoutes.js:3135` | `🛡️ KDPA 2019 Protected` header badge |
| `teacherRoutes.js:3818` | "KENYA DATA PROTECTION & GOVERNANCE COMPLIANT" |
| `emailService.js:607, 669, 755` | "… KDPA 2019 Protected" email footers (×3) |
| `public/index.html:11117` | "Protected under KDPA 2019 Section 33(4) child protection exemption." |

Why these are risky beyond the rule:
- **"End-to-End Encrypted" is false.** Messages are read by your server and forwarded to third-party LLMs in plain text. This is the most dangerous claim. A misleading security claim to parents is a consumer-protection and credibility problem.
- "Compliant", "Protected" and "Zero-PII" are claims the code does not support today (§3).
- The Act has no "compliance badge". Only the Data Commissioner registers controllers.

Replace them with a plain link to a real privacy page that says what is collected, who receives it and how to delete it.

Also check the marketing decks (`Elingu_*.pptx`) and `docs/` for the same claims, and any "KICD aligned" wording. "Aligned with" is fine, "approved/certified" is not. Grep found no "KICD Approved/Certified" strings in app code.

---

## 5. Curriculum leakage and hardcoding

Rule: the curriculum must be database-driven, and Cambridge must never show Kenyan terms.

1. **Hardcoded curriculum still drives the AI.** `server.js:18, 19, 460, 464, 1364` read `CURRICULUM[...]` and `BRITISH_CURRICULUM[...]` from `curriculumContext.js` and `curriculumContextBritish.js` for prompts and for subject validation. The DB layer is only prepended. `curriculumContext.js` is 97 KB and `curriculumContextBritish.js` is 30 KB. Retire them once the DB covers every subject.
2. **British Computer Science is relabelled "Computer Studies".** `SUBJECT_ALIASES` (`server.js:241, 242, 252`) maps `Computer Science` and `Computer Science (0478)` to `Computer Studies`. But `BRITISH_CURRICULUM` has the key `Computer Science`, so `BRITISH_CURRICULUM['Computer Studies']` is undefined. The Cambridge lookup then falls to the generic string "Cambridge / Edexcel Year N Computer Studies Curriculum". A 0478 learner gets no syllabus content, and the prompt uses the Kenyan name. This is a live violation of your own rule.
3. **"STRAND" in Cambridge prompt text.** `curriculumContextBritish.js` has about 20 lines starting `STRAND 1 — NUMBER:` and so on. That text is sent to the model for British learners, so the tutor can say "strand" to them.
4. **Wrong subject mappings.** Aliases map `Economics (0455)` to `Business Studies` (they are different Cambridge syllabuses), and Geography, History and Business Studies are mapped to CBE keys that exist in neither hardcoded map. They silently fall to a generic prompt.
5. **Only 6 British subjects** exist in the hardcoded map (Maths, Physics, Chemistry, Biology, Computer Science, English). Confirm which subjects the DB seed (`db/seeds/british_caie_seed.js`) really covers before promising IGCSE breadth.
6. **Hardcoded roadmap in the student page.** `public/index.html:~7640 to 7700` has `QUESTS_BY_GRADE` (Kenyan "Strand" data for grades 6 to 12) and default subject lists in the client. Check whether a British learner can ever see this fallback. Remove it in favour of the API.
7. **Kenyan-only content in shared UI.** `public/index.html` still has Kenyan hard-coded nav items (`nav-computer` "Computer Studies" at `:6162`, and more at `:9382, 10034, 10205, 13335`). The `isBri ? 'Computer Science' : 'Computer Studies'` fix exists at `:9943` and `:9970` but not at `:10034`, which is hardcoded to "Computer Studies".
8. **Local analogies in every prompt?** Mama Mboga, KES and M-Pesa examples are good for Kenya. For a global product they need to be region-selectable. See §8.

---

## 6. Repetition and structure

| Duplication | Evidence | Suggested fix |
|---|---|---|
| `loadJson` and `saveJson` copied into **five** stores | `studentStore.js:35/47`, `parentStore.js:22/34`, `teacherStore.js:32/44`, `adminStore.js:109/121`, `paymentStore.js:82/94`, plus 6 separate `DATA_DIR` definitions | One `jsonStore.js` module (also the natural place to add file locking and per-store encryption) |
| 3 near-identical `fetch('/api/parent/dashboard?…')` refresh blocks, each repeated ~8 times | `server.js:8155 to 9161` | One `refreshDashboard()` client function |
| Same auth boilerplate repeated | `verifyStudentRequestAuth` followed by the same status/JSON return at 7 call sites; the same `!parent.children.includes(studentId)` check 4 times; the same family-password verify 11 times | A middleware (`requireStudentAuth`, `requireParentOwnsChild`) |
| Two parallel data layers | JSON stores plus `db/repositories/*` (students, parents, teachers, schools, missions, sessions repositories exist and are mostly unused by the stores) | Pick one source of truth. Today `studentStore` writes JSON and calls `syncDb(...)` that swallows errors (`catch {}`), so the two can drift without any signal |
| Hash helpers | Legacy salted SHA-256 (`hashPin`) beside bcrypt | Remove after migration (§2.5) |
| Monolith | `server.js` 587 KB / ~12k lines, `teacherRoutes.js` 282 KB, `public/index.html` 739 KB; HTML, CSS and JS for three portals live in template literals | Split into route modules and real static files. This also removes the template-literal escaping bugs that AGENTS.md rules 1 to 3 exist to prevent |
| Cleanup scripts | `scratch/` has 25+ one-off patch scripts | Delete or archive |

Other loose ends:
- **Empty `catch {}` blocks:** 10 in `server.js`, 5 in `teacherRoutes.js`, 18 in `public/index.html`, plus stores. Several wrap safeguarding calls (`recordSafetyIncident`, `recordSchoolSafeguardingAlert` at `server.js:~1497, 1515`). If those fail, a distress alert **disappears silently**. Log and alert on failure.
- **Dead or unreferenced files:** `curriculum_data/cbc_english.js` and `british_subjects.js` (and the other `curriculum_data` files) and `pilotConfig.js` have no requirers in the app files I searched. Confirm and remove.
- **Test coverage claims.** `tests/runner.js` only has `tier1_features`. The runner advertises tiers 2 to 4 (`tier2_boundaries`, `tier3_cross_portal`, `tier4_real_world`) but those folders do not exist. The "131 / 131" baseline in your master brief cannot come from what is in this tree. I counted tier 1 as 25 files. Verify the number.
- **Leaked test artefacts:** `docs/teamwork_exhaust/tests/` holds dozens of generated logs (gitignored, fine), and `.agents/teamwork/` contains multi-agent scratch notes.
- **README is stale** (Month 1 skateboard), and `package.json` has no `lint` or `format`. There is no CI config.
- **Typo risk:** `GROQ_MODEL` default `qwen/qwen3.8-27b` and `ANTHROPIC_MODEL` default `claude-3-5-haiku-latest` may be retired IDs **(not verified)**. A wrong default fails at call time.
- **`MODEL_PROVIDER` startup `process.exit`** if a key is missing is fine, but there is no fallback chain if the primary provider is down mid-session (only a hardcoded canned reply in test mode).

---

## 7. Offline and low-bandwidth (your stated goal)

What exists: `public/sw.js` precaches `/`, `/index.html`, `manifest.json` and one image. It network-first-caches `/api/curriculum/*` and `/api/revision/*`, and falls back to the network-first cached HTML shell.

Gaps:
1. **The tutor needs the internet.** Every chat turn calls a cloud LLM. Offline, a child gets nothing from the Socratic engine. "Zero-data offline learning" in the `sw.js` header overstates what works. Only previously visited curriculum and revision JSON are available.
2. **Fake success when offline.** When no cached copy exists, the service worker returns `{ success: true, offline: true, message: 'Serving from offline school cache' }` with **no data**. The UI may treat that as a valid empty response. It should return a clear failure the UI can handle.
3. **Nothing is pre-downloaded.** A student must open each topic online first. There is no "download this term" action for the roadmap, primers, revision papers and mark schemes.
4. **Heavy and external assets.** `index.html` is 739 KB uncompressed. `elingu-avatar.png` is 1.5 MB and is also the PWA icon (listed as both 192 and 512). Several 300 to 900 KB logo images and a 4 MB `Logovideo.mp4` sit in `public/`. Fonts load from Google Fonts and KaTeX from cdnjs (`index.html:10 to 13, 16820, 16821`), so math rendering and fonts fail offline. They are also third-party requests that leak a child's IP to Google and Cloudflare, which does not fit §3. Self-host them. Check whether compression (gzip/brotli) is enabled on the server (no `compression` package in `package.json`).
5. **Writes are not queued.** Mission responses, points and streaks need a local outbox that syncs when the connection returns. I found only `navigator.onLine` listeners and a status banner (`index.html:~12050`), not a queue **(not fully verified)**.
6. **Student identity is held in `localStorage`** (`elingu_active_student`, with the full student object). On shared school or family devices, this exposes the previous child's profile. Store a token only and clear it on sign-out.
7. **Cost for the target group.** Mobile data is expensive for families that most need this. The product also needs to work on low-end Android phones with small RAM.

Suggested path (in order of effort):
1. Self-host fonts and KaTeX, compress images and the video, and enable gzip/brotli. This is quick and helps everyone.
2. A "Download for offline" button per term. It saves the curriculum map, primers and revision papers to IndexedDB and shows what is available offline.
3. An offline outbox for answers, points and streaks, with sync on reconnect.
4. Offline practice that does **not** need an LLM: pre-written hint ladders per sub-strand (the DB already has `socratic_inquiry_prompt` and `concept_primer`) and auto-marked questions with the mark scheme X-ray from `examRevisionService`.
5. Optionally, a small on-device model for hints (WebGPU/WASM) on capable phones. This is a larger, later project and needs testing on cheap handsets.
6. School-level option: a Raspberry Pi or laptop on the school network that serves the app and caches content for classrooms (your "school cache" idea in `sw.js`). It needs a sync plan with the central server.
7. Lower-bandwidth channels for the same Socratic nudges, such as SMS/USSD or WhatsApp. These have their own cost, consent and data-protection implications.

---

## 8. "Global standard, any child anywhere"

- **Language:** `<html lang="en">`, with Kiswahili present only as a subject. There is no i18n layer. UI strings are hardcoded inside template literals and a 14k-line HTML file. Moving to a message catalogue is a prerequisite for any new language.
- **Accessibility:** only 7 `aria-label`s in the 14k-line student page, and no `prefers-reduced-motion` handling. For a global or inclusive product, add keyboard navigation, screen-reader labels, contrast checks and reduced motion.
- **Currency and payments:** KES via M-Pesa and USD via Paystack exist. Other regions need local methods (the architecture supports adding providers, but `paymentStore` and `pricingConfig` assume these two currencies).
- **Curriculum model:** the DB schema (`curricula`, `grades_or_years`, `curriculum_subjects`, `learning_strands`, `sub_strands`) is generic, which is a good base. The terms "Strand" vs "Unit" are in the data (`strand_label`). The blockers are the hardcoded prompt files in §5 and Kenya-specific copy in the UI.
- **Data law by region:** other countries bring GDPR/UK Children's Code, COPPA and local laws, each with different consent ages. The consent flow in §3 needs an age-and-region configuration, not a single Kenyan flow.
- **Local analogies:** make the analogy set a per-region content pack, with Kenyan examples as one pack.

---

## 9. Student-experience items from your Antigravity audit not yet in code

These came from your master brief. I have not re-tested them:
1. Mobile Socratic cockpit: the input falls below the keyboard fold. Collapse the Concept Primer after the first message.
2. Subject pills share one colour in dark mode.
3. The "Save My Space" toast disappears after 3.5 s with no persistent indicator.
4. Parent receipt history is too long on mobile.
5. Missing: streaks, badges, class quests, "Brain Spark" daily challenge.
6. Response time over 2.5 s feels slow. Consider streaming replies (the chat route may already stream; confirm), a faster default model and a typing indicator.
7. Missing deliverables for authorities: KICD continuous-assessment rubric report, Cambridge-style progress PDF.

---

## 10. Suggested order of work

1. Commit the untracked files and verify a clean clone boots (§1). *You do the commit.*
2. Remove the `x-elingu-test` bypass and the hardcoded Premium override (§2.1, 2.2).
3. Take down the badges, especially "End-to-End Encrypted" (§4).
4. Add `scrubForLLM`, review the provider's data terms and disclose the transfer (§3.2).
5. Publish a real privacy notice and terms, a breach runbook and a data-export endpoint (§3.1).
6. Move parent credentials out of URLs (§2.3).
7. Fix the British Computer Science mapping and the "STRAND" text (§5), then retire the hardcoded curriculum files.
8. Extract the shared store and auth helpers (§6).
9. Offline phases 1 to 3 (§7).
10. i18n and accessibility groundwork (§8).

---

## Update 2026-11-04 (Phase 1 of the remediation plan)

Fixed and covered by tests (`tests/tier1_features/auth_hardening.test.js`, `student_session_idor.test.js`, `parent_portal_tabs.test.js`):
- **Google sign-in bypass closed.** `/api/auth/google` now needs a real Google ID token (audience, issuer, `email_verified` checked, no local JWT decoding, no email-only path). Without `GOOGLE_CLIENT_ID` it returns 503. The "type your Google email" boxes in the student, parent and teacher pages no longer sign anyone in.
- **Parent takeover closed.** `complete-google-enrollment` needs a short-lived enrollment token issued only after verified Google sign-in, and can no longer overwrite an existing Family PIN. `update-profile` needs the Family PIN and returns only safe fields.
- **Unverified-email bug fixed on the server.** Student routes (`/api/chat`, session get/save, profile get/update, award-points, verification-status, profiles list) now require the learner's own token, and anything beyond the waiting screen is blocked (HTTP 403, `parentApprovalRequired`) until the parent approves. `verification-status` no longer hands out tokens to anyone who knows a student ID. The browser attaches the token automatically.
- **Point minting limited.** `award-points` takes whole numbers up to 25 and caps at 40 a day per learner (stop-gap until the server-side ledger in Phase 5).
- **M-Pesa callbacks authenticated.** A secret (`DARAJA_CALLBACK_SECRET`) is added to the registered callback URL and, with real Daraja keys, Safaricom is asked to confirm the payment (STK Push Query) before any plan is activated. Production no longer simulates a successful STK push. Paystack no longer uses its public demo secret in production.
- **Tier allowlist.** Parents can only buy `standard`/`premium` (plus legacy period names). `county`, `school`, `foundation`, `pilot` etc. are rejected on the payment routes.
- **Rate limits** added for resend-verification (also a 2-minute per-learner cooldown), request-upgrade, check-availability, verify-code, the AI proxy routes, transcribe, daily-spark, Google sign-in, enrollment, school create, purge, join-stream and pilot-activate.
- **Email hardening.** Nicknames and other typed text are HTML-escaped in all parent emails. The "mock/dummy/test" address suppression no longer applies in production.

Still open from this audit: encryption of sensitive data (Phase 1b), XSS escaping in the portals and the `auto-render` script-tag bug (Phase 2), sign-up redesign and proof of parent contact (Phase 3), `paidUntil`/expiry and the single price table (needs your pricing decisions), and everything in Phases 4 to 7.

---

## Update 2026-11-04 (Phase 2: escaping and the broken script tag)

Fixed and covered by `tests/tier1_features/xss_hardening.test.js`:
- **Chat and My Spaces script bug.** The KaTeX `auto-render` tag in `public/index.html` is now closed and the Space Engine has its own `<script>` (it was inside the tag and never ran). The chat send path no longer depends on it, maths rendering is guarded when the CDN is blocked, the "My Spaces" tab now opens its view, and revision cards show the real question count.
- **Parent portal syntax error (found while checking).** The child switcher pill used the forbidden quoted `onclick` pattern and made the whole parent-portal script fail to parse. It now uses `data-cid` with `this.dataset.cid`. A new test parses every inline script of the parent, teacher, admin and student pages.
- **Markup refused at the source.** Nicknames may only contain letters, numbers, spaces, dots, dashes, underscores and emoji; school/stream/subject text and avatars are cleaned on save. Existing records are cleaned on the way out of the parent dashboard (`formatParentDashboardData`), including activity, mission and "Tonight's Guide" text.
- **Pages and emails.** `?email=` on the parent portal is escaped; values placed in the `/parent/verify` script block cannot close it; mission and reply text in the student app is escaped; AI-made SVG goes through an allow-list sanitiser; teacher portal tables escape names, titles and answers; CSV cells starting with `= + - @` are defused.

Known leftovers: the teacher token is still kept in `localStorage` (a cookie-based session is the proper fix, planned with the sign-up work); many parent-portal lines still concatenate `c.handle`, which is safe only because the dashboard now cleans those fields (new code should use `escHtml`). Test note: `TC-SOC-06` depends on a live AI answer and fails when Gemini times out and Groq answers differently; it is not related to these changes.

---

## Update 2026-11-04 (Phase 3: sign-up, consent and session hygiene)

Built, checked in the built-in browser (desktop and phone width) and covered by `tests/tier1_features/signup_flow.test.js` (tier 1 is now 169/169, also with encryption on against an encrypted copy of the real data; pricing suite 46/46):
- **Explore first (Save-My-Exams style).** A first-time visitor now lands on `public/explore.js`: curriculum → grade → subject → a real concept lesson and the roadmap in four taps, with no account and no personal data stored. Levels and subjects come from the new database-driven `/api/curriculum/catalogue`. "Start learning free" opens sign-up with their curriculum, grade and subject already chosen; "I have an account" goes to log-in (and remembers that choice).
- **Shorter sign-up.** Real name and the "recovery" field are gone from the first screen (recovery is optional and tucked away), the avatar picker is collapsed, the saved browser draft no longer keeps the PIN, the Google button is hidden when Google isn't configured, and the dead "Remember me" box is removed. On a phone, curriculum, nickname, PIN and parent contact now fit on one screen.
- **Real consent.** The consent box is not pre-ticked and now says what is true: the learner has told their parent. `parentConsent` starts false. When the parent confirms by their own link or Family Password the server records `consent` (time, method, which contact, wording version) and never overwrites it. `/privacy` and `/terms` are plain-language pages linked before any data is collected.
- **Compliance badges removed everywhere** (app, portals, emails) and replaced by privacy-notice links; a test fails if one comes back.
- **Housekeeping and sessions.** Unconfirmed parent contacts are deleted (hourly job, plus learners after 48 h); an expired activation link is replaced with a fresh one on resend, and resend now needs the learner's token; OTP codes lock after 5 wrong guesses and a verified code only works for 10 minutes; signing out ends the session on the server and a PIN reset invalidates older tokens; tokens are never accepted in URLs; the teacher 2FA code is only echoed to tests.

**Not done (decisions or bigger projects)**: teachers and school creation still receive their login token before their email is verified, school/join codes are still guessable (changing them affects how students join classes), and there is no teacher password-reset flow; age is still a self-declared band with no date-of-birth check; the AI providers still receive what a child types with no automatic removal of names or numbers (the privacy notice says so plainly, but a scrubber is still needed); and only the new explore step is Kiswahili-ready in structure, not translated.

---

## Update 2026-11-04 (Phase 4: exams)

Built, checked in the built-in browser (hub → timed paper → hand-in dialog → results) and covered by `tests/tier1_features/exam_engine.test.js` (tier 1 is 178/179; the one failure is the live-AI test `TC-SOC-06`; pricing 46/46):
- **Real timed papers.** 7 papers, 186 questions, 271 marks (CBC Grade 6 Maths, Grade 8 Maths and Integrated Science, Grade 10 Biology; Cambridge Year 10 Maths, Physics and Computer Science). Each has sections, a clock, a question palette, flagging, autosave, and a hand-in confirmation. Questions are Elingu originals written in the style of the board, and every paper says so: no "official", "past paper", fake series names or fake statistics.
- **The server owns the clock and the answers.** An in-progress paper never contains answers, explanations or the mark scheme. Late answers (after the deadline plus 30 s) are ignored and the paper closes itself. Results, the mark scheme and explanations arrive only after submit. A learner can only read their own attempts, and a CBC learner cannot sit a Cambridge paper.
- **Marking in `examMarking.js` (no AI, repeatable).** Numbers are understood in many forms (3.5, 7/2, 3 1/2, KES 1,500, 35%, with units); method marks come only from typed working and never exceed marks − 1; short answers are marked on marking points as whole words with contradiction checks. Every paper is self-tested: the sample answers must earn full marks and a blank must earn zero.
- **Results.** Score, an *indicative* band (IGCSE A* to U, CBC EE/ME/AE/BE), time used, topic breakdown (weakest first), "revise next" topics, and a per-question review with the correct answer and explanation. Attempts are stored per learner (last 100) in `exam_attempts.json`.
- **Old open endpoints.** `/api/revision/xray` and `/api/revision/evaluate` (which gave answers to anyone) now need a signed-in, approved learner; the 13 legacy sample questions are relabelled honestly and the invented "32% of candidates" statistic is removed. The old on-page cockpit code is no longer reachable from the UI.

Honest limits: papers are 30 to 56 marks, shorter than a real board paper (for example IGCSE 0580 Paper 2 is 70 marks), and long written answers are not marked automatically (only short, numeric and multiple-choice). The marking-point lists need a teacher's eye, and a Kiswahili, English, Chemistry, Biology (IGCSE), Business or Geography paper does not exist yet. Dead code of the old revision cockpit (about 450 lines in `public/index.html`) can be deleted in a later clean-up.

### Update 2026-11-04 (more exam content)
The practice-paper library grew from 7 papers (186 questions) to **17 papers, 474 questions, 663 marks**, all checked by the self-test (sample answers earn full marks, blanks earn zero) and a new test that no question is repeated:
- **CBC Grade 6:** Maths. **CBC Grade 8:** Maths (two papers), Integrated Science, English (with a reading passage), Kiswahili (written in Kiswahili), Social Studies. **CBC Grade 10:** Maths, Physics, Chemistry, Biology.
- **Cambridge Year 10:** Maths (two papers), Physics, Chemistry, Biology, Computer Science.
- Papers can now carry a shared reading passage (`context`) that is shown with each question that needs it.

Still missing: CBC Grade 7/9-specific and Grade 11/12 papers, Cambridge Business, Geography, History and English, Checkpoint (Years 7 to 9) papers, and papers longer than about 55 marks. The marking-point lists for short answers, the Kiswahili questions and the Social Studies facts should be reviewed by a teacher of each subject before you rely on them.

---

## Update 2026-11-04 (Phase 5: gamification and learner navigation)

Built, checked in the built-in browser (phone and desktop, dark theme following the device) and covered by `tests/tier1_features/gamification.test.js` (tier 1 is 189/190 with only the live-AI test failing; also 10/10 with encryption on; pricing 46/46):
- **XP now comes only from the server, and only for evidence of learning** (`gamification.js`). The open `award-points` endpoint is deleted, and the browser can no longer add points. Logging in, editing a profile, starting a quest and sending a message earn nothing. What does earn XP: a marked practice paper (1 XP per mark up to 60, plus 10 for 70%+), the first time a mission answer is correct (5), explaining a concept in your own words with the tutor's explicit "mastered" verdict (25, once per concept), and Brain Spark (5 per correct answer, 5 bonus for 3/3). Every award is idempotent.
- **A small, capped effort bonus** (as you asked): 3 XP for the first tutor conversation of the day, 2 XP for trying a Brain Spark question, 1 XP per attempted exam question, never more than 10 XP of effort a day.
- **Levels and badges.** 10 levels (Seedling to Baobab) and 11 badges (first step, 3/7/30-day streaks, light bulb, deep thinker, exam ready, strong paper, top marks, spark streak, mission maker). Level-ups and badges trigger a toast and, unless the device asks for reduced motion, confetti.
- **Daily goal ring** (20 XP) and **streak freezes**: reaching a 7-day streak earns a freeze (keep up to 2), which forgives exactly one missed day.
- **Brain Spark** replaces the old AI-written daily card: three fixed questions a day taken from the practice-paper bank for the learner's level, chosen by the server, marked by the server, one try each, no AI cost.
- **Class league** (opt-in, nicknames and avatars only, own class only, weekly XP) and **mastered concepts turn green** on the roadmap.
- **Navigation.** The phone dock is now Learn, Practice, Missions, Explore, Me (Expeditions and Safe Box moved under Explore; a "My Progress" tab was added to the sidebar). Accessibility: pinch-zoom allowed, visible focus rings, clickable divs get button roles and keyboard support, the chat log is a live region, reduced-motion respected, stronger muted-text contrast, light/dark follows the device on first visit.
- **Honesty fixes.** The chess "loading puzzle" alert became a clear "coming soon" message; the false "Offline Ready (100% Cached)" label is gone; the two SafeBox cards now do something real (Call 116, and a how-to-handle-bullying list) instead of claiming a coach that does not exist. `/api/mission/interact` now requires the learner's own token (it used to accept any student id).

Still open from this phase: weekly and class goals set by teachers, a teacher view of XP, spaced-review questions, and a proper design-token clean-up of the 600 inline styles. The XP values and level thresholds are first guesses and should be tuned after real learners use them.

## Update 2026-11-04 (Phase 6: low-end phones and slow networks)
- The app page went from 745 KB to about 150 KB over the wire (gzip via `compression`). HTML stays `no-store`; images and fonts cache for a week; `/vendor` files are immutable.
- Fonts (DM Sans) and KaTeX are served from our own server (`/fonts.css`, `/vendor/*`). No page calls Google, Cloudflare or any CDN, so no outside party sees a child open the app. KaTeX loads only when a message contains maths.
- The 1.5 MB logo is a 20 KB WebP; a 4 MB video, two 1.6 MB SVGs and other design files moved out of `public/` into `design_assets/`.
- Lite mode (`ElinguLite`): switches on automatically for Save-Data, 2G/3G or weak devices, and the learner can force it under Me. It removes animation, blur and the splash; the tab stops polling while hidden; chat sends the last 30 messages only.
- Service worker: pages race the network for 4 s then fall back to the saved copy; unsaved lessons return an honest HTTP 503 `{offline:true}` instead of a fake success. Me has "Save lessons for offline", which stores concept lessons and the paper list in a cache that survives app updates.
- Tests: `performance_lite.test.js` (7), plus updated offline and XSS-06 tests. Tier 1 passes except TC-SOC-06 (needs the live AI service); pricing 46/46.
- Not done: streaming chat replies, splitting the inline JS/CSS of `index.html` into cached files, offline practice papers, Kiswahili UI. A check on a real low-end handset is still owed.

## Update 2026-11-05 (Phase 7: parent, billing and teacher portals)
- **Parent weekly card:** every child now has a "This week" card at the top of the parent portal for every plan (`weeklyCard.js`). It is built only from real activity: days studied, subjects, classroom missions, questions that were missed, and one thing to try tonight. Free shows the basics; Standard adds topics and where the child found it tricky; Premium adds XP, hints used and mission scores behind "More detail". It is drawn with `textContent`, so nothing from the server is read as HTML.
- **Billing:** the card form on our page is gone. "Card / Bank" now sends the parent to Paystack's own page and back, and the portal then asks the server whether the payment completed. The Paybill tab and the simulated-PIN button are removed; both called `/api/payment/confirm` with a plan name, which the server has rejected since Phase 1, so they always failed. After an M-Pesa prompt the page waits for the server's answer instead of leaving the parent guessing. `/api/payment/quote` returns the price, plan and the date access runs to, and the checkout screen shows it before payment. Paystack start now needs the parent's login, and it no longer accepts a price or a return address from the browser.
- **Teacher portal:** the Headteacher and Deputy now have a Safeguarding inbox (`/api/school/safeguarding`): alerts were saved before but nobody could read them. Leaders can mark an alert "looking into it" or resolved with a private note (stored encrypted, markup stripped). Other roles get 403 and other schools cannot see them. Parents are still not told automatically. National ID numbers are masked in the portal, and the faculty roster now escapes phone and email.
- **Tests:** `phase7_portals.test.js` (9). The USD test now logs in first. Tier 1 205/206 before the USD fix (then passing); pricing 46/46.
- **Not done:** the Friday digest is not sent as an email (it needs a decision on email budget; the dispatch route now carries the weekly card), email receipts, cancel/renew and `paidUntil` expiry, teacher approval queue, rubric (EE/ME/AE/BE) reports, parent messaging, hiding unbuilt heatmap/certificate claims, and the teacher/school sign-up hardening (token before email is verified, guessable school codes, password reset). The weekly card and Safeguarding inbox are tested by code, not yet looked at in a browser.

## Update 2026-11-05 (Teacher and school sign-up hardening)
- **No sign-in before proof of email.** Creating a school no longer returns a token. The Headteacher needs a real email address and must enter the 6-digit code we send before they can sign in. The portal shows a small "Confirm your email" panel for this (`/api/teacher/verify-email`, `/api/teacher/resend-verification`).
- **School code alone no longer gets anyone in.** Staff who use the school code now wait in a "Staff waiting for approval" list that only the Headteacher or Deputy of that school can see and decide (`/api/staff/pending`, `/api/staff/decision`). Until approved they cannot sign in, and a declined person never can.
- **Codes cannot be guessed.** School codes are always generated (for example `BH-Y5BPXN`), no longer `<initials>-ADMIN`, and a chosen code is only accepted by the automated tests. Stream join codes build on it.
- **Teacher password reset.** "Forgot your password?" sends a 6-digit code (email, or SMS if the account only has a phone). The answer is the same whether or not the account exists. A reset changes the password, clears any lockout and ends every earlier sign-in (tokens now carry an issue time; `tokensValidAfter`). A National ID cannot be used to ask for a code. Wrong guesses are capped by the existing OTP rules.
- **Smaller:** `devOtp` was already test-only; the code hash and other private fields are stripped from teacher records sent to the browser; the new routes have rate limits; the queues refresh when the cockpit tab opens.
- **Tests:** `teacher_signup_security.test.js` (7) plus a `ctx.registerTeacher()` helper so older tests register staff the real way (request, approval, sign-in). Tier 1 213/213, pricing 46/46. Checked in a browser: confirm-email panel, sign-in, approve.
- **Not done:** a headteacher who is not approved by Elingu can still sign in (the school's staff and student onboarding stay locked until Elingu approves it); a deleted or offboarded teacher's existing token still works until it expires (no record to check against); email receipts and the Friday digest (email budget); Google sign-in for teachers was not reviewed in this pass.

## Update 2026-11-05 (Kiswahili for the learner app)
- **The "message catalogue" now exists** (`public/i18n.js`). It is one list of English sentences next to their Kiswahili versions. English stays in the code; when a learner chooses Kiswahili, any sentence on the list is swapped on screen, and anything not on the list stays English (nothing breaks). `{a}`/`{b}` mark changing parts (a number or name) and `{n}` is digits only. A new language is another list.
- **What is translated (about 200 sentences):** the bottom dock and side menu, the first "explore" screen, My Progress (level, goal, streak, badges, league, offline saving, data saver), Brain Spark, celebrations, and the whole practice-exam flow (paper list, before you start, the timed paper, hand-in, results). Every badge and level the server can award has a Kiswahili name (a test fails if a new one is added without it).
- **Choosing a language:** an English/Kiswahili switch is on the explore screen and in My Progress. The choice is remembered; with no choice yet, a phone set to Kiswahili starts in Kiswahili.
- **Not translated yet:** the tutor chat and the tutor's replies, curriculum lessons and exam questions (their content stays English), account settings, the plans pop-up, and the Parent and Teacher portals. Learner-facing server messages are also still English.
- **Review needed:** the Kiswahili was written by the AI assistant and should be read by a Kiswahili teacher before wide release.
- Tests: `language_kiswahili.test.js` (5). Tier 1 218/218, pricing 46/46. Checked in a browser: explore, Me, practice hub and pre-paper screen, switching back to English.

## Update 2026-11-05 (Kiswahili for sign-up and log-in)
- The learner sign-up (both steps), log-in, forgot-PIN, and the "check your parent's email" screen are now in the catalogue, about 160 more sentences. This includes hints inside fields and the pop-up messages (the page's `alert()` is translated as it is shown). An English/Kiswahili switch sits at the top of the form.
- **Still English:** error messages that come from the server (for example a nickname already taken is translated, but most server replies are not), county and school names, the account-settings and plans pop-ups, and everything in the Parent and Teacher portals.
- Tests: `language_kiswahili.test.js` now has 6 tests (it also checks every sign-up pop-up message has a translation). Tier 1 219/219, pricing 46/46. Checked in a browser: the sign-up form, log-in tab and every hidden step, with no untranslated sign-up sentence left.

## Update 2026-11-05 (Kiswahili for server messages)
- About 90 of the messages the server sends to learners and parents-signing-up are now in the Kiswahili list: wrong PIN or nickname, locked account, reset-code problems, nickname/PIN/password/email checks, waiting for the parent, upgrade requests, erasing data, exam and Brain Spark errors, and the subject-limit messages in the tutor. They are translated where they are shown (pop-ups and on-screen text), so no server change was needed and the English API replies are unchanged.
- **Guard against drift:** a test checks that every translated server message is still written by the server, so rewording a message there without updating the list fails the tests. Another test calls the real server with a wrong login and reset request and checks the reply has a Kiswahili version.
- **Still English:** errors that appear inside the tutor chat (the chat area is deliberately never translated), generic "Failed to ..." messages, parent and teacher portal messages, and messages with a date or a name built into them that are not in the list.
- Tests: `language_kiswahili.test.js` has 8 tests. Tier 1 220/221 (the one failure is TC-SOC-06, which needs the live AI service), pricing 46/46. Checked in a browser: an unknown account on the forgot-PIN form and an empty submit both show Kiswahili.

## Update 2026-11-05 (Kiswahili for the Parent Portal)
- The Parent Portal now has the English / Kiswahili switch in its header and loads the same catalogue (`public/i18n.js`). About 350 more sentences: sign in, forgot password, enrolling, the Children tab (including each child's "This week" card and the weekly tips), Membership & Billing (plan cards, checkout, M-Pesa and card steps, payment results), Account & Security (change password, grade correction, subjects, exam tier), and the pop-up messages. Pop-ups from `confirm()` are translated as well as `alert()`.
- About 60 more server messages for parent routes (wrong Family Password, lockouts, reset codes, approval links, unpaid-upgrade refusal, deleting data) are in the guarded server list, so the drift test now covers 150 server messages across `server.js`, `studentStore.js`, `parentStore.js`, `paymentStore.js` and others.
- **Removed a compliance claim.** The portal footer said "Elingu complies fully with Kenya Data Protection Act 2019 • Zero-PII safe learning architecture". That is exactly the kind of badge the project rules forbid, so it now reads "Read how we handle your family's data in our privacy notice" with a link. A test checks the claim does not return.
- **Not translated:** the Schools and Counties bulk licensing section and its request form (aimed at institutions, not parents), subject names, county and school names, and exact figures with mixed text such as the per-child option in the plan picker. Server messages not in the list stay English.
- Tests: `language_kiswahili.test.js` has 9 tests. Tier 1 222/222, pricing 46/46. Checked in a browser: sign-in screen, the Children tab, billing plans, checkout and card step, all in Kiswahili.
- The Kiswahili was written by the AI assistant and still needs a Kiswahili teacher's review.

## Update 2026-11-05 (Kiswahili for the Teacher Portal)
- The Teacher Portal now has the English / Kiswahili switch in its header and loads the same catalogue. About 235 more sentences: sign-in, forgot password, registering as a teacher, registering a school, the dashboard (class code, live missions, competency distribution), the AI mission generator, the roster and bulk import, the Staff waiting for approval list, the Safeguarding inbox, the Headteacher cockpit, the faculty roster, the 2FA authorization and assignment pop-ups, and the pop-up messages.
- About 60 more server messages for teacher routes (permission refusals, sign-in problems, "confirm your email", "not approved yet", reset codes, school verification) are in the guarded server list. The drift test now covers about 210 server messages across the server, store and route files.
- CBE rating words are translated for display only: Exceeding, Meeting, Approaching and Below expectations (EE, ME, AE, BE keep their codes).
- The sign-up form's example school code still showed the old guessable format (`KUJ-ADMIN`); it now shows `KUJ-7K2PQX`.
- **Not translated:** the AI-written mission questions and hints (the model writes those, in the language it was asked), subject names, the separate printable report and ledger pages, the Super Admin dashboard, and any server message not on the list.
- Tests: `language_kiswahili.test.js` has 10 tests. Tier 1 223/223, pricing 46/46. Checked in a browser: signed-out screen, dashboard and the cockpit in Kiswahili.
- The Kiswahili was written by the AI assistant and still needs a Kiswahili teacher's review.

## Update 2026-11-05 (Personal details kept out of AI prompts)
- New `piiGuard.js`. Every request to an AI provider now passes through it inside `callLLM` (the single entry point), so the tutor chat, the conversation summaries, Tonight's Guide, the concept check, Brain Spark-style prompts and the teacher mission generator are all covered.
- **Kept, on purpose:** the learner's **nickname** (the tutor still speaks to them by name), grade or year, age, county (for local examples) and subject.
- **Removed before sending:** phone numbers (Kenyan and international), email addresses, ID/passport numbers written with their label, the learner's real name (older accounts may still have one) and school name if they appear in what the learner types, and the school name in the tutor's own instructions (the tutor is now told only "a Kenyan CBE school" or "an international school").
- The conversation saved on our side is not changed; only the copy sent to the provider is cleaned. Ordinary maths numbers are left alone.
- The privacy notice now says exactly what is removed and what is still sent, and that a microphone recording is sent to Groq to become text and is not kept. `CONSENT_TEXT_VERSION` is now `2026-11-v2`.
- **Limits:** this is a safety net for patterns it can recognise; a child can still type something unusual. A parent's name is not known to the guard. The microphone route (`/api/transcribe`) still needs no sign-in and sends audio to Groq; it should require a learner login.
- Tests: `pii_guard.test.js` (7). Tier 1 230/230, pricing 46/46.

## Update 2026-11-05 (Round 8: age, microphone, plan expiry, teacher access, clean-ups)
- **Age:** the tutor is no longer told the learner's age. It is told the usual age for the grade ("about 12-13 years for Grade 7; Years 7 to 11 for Cambridge"). The privacy notice says so.
- **Microphone:** the app records audio in the browser and uploads it to our server, which sends it to Groq (Whisper) to become text. It does not use the browser's own speech recognition (that would also send audio to Google, fails on many phones and is poor at Kiswahili). `/api/transcribe` now needs a signed-in, parent-approved learner, and the app sends the sign-in with the recording.
- **Plan expiry:** every verified payment sets `paidUntil` (30 days monthly, 365 annual, added to the current end date if paid early). Three days after it, the learner is back on Free (`studentStore.resolveStudentTier`). The parent portal shows "Paid access runs to … / ends on … / ended on …" with a Renew button; the checkout quote and receipt show the end date. M-Pesa activations used to skip the verified-payment record; they now record it. Plans created before this change have no end date and keep working (they are not cut off). There is no automatic renewal (M-Pesa and card are paid by hand), so there is no "cancel subscription" step; "Switch to Free" still works at once.
- **Teachers:** an offboarded teacher's existing sign-in is refused straight away (the id is kept in a revoked list).
- **Pilot codes:** setting `ELINGU_PILOT_CODES` (JSON) replaces the public built-in codes (PILOT2026, TRIAL30, …); a broken setting fails closed; a code can be used once per account, so it cannot be re-entered for another free period; the example codes are no longer printed in the forms. If you do not set it, the built-in codes keep working (so a running pilot is not broken) and production start-up prints a warning.
- **Kenyan day:** the Free daily limit reset at 03:00 Kenyan time because one function counted UTC days. It now uses the Kenyan day everywhere.
- **Checked and found already done:** the hard-coded "force one account onto Premium" override is gone (the CLAUDE.md note about it was stale and is removed); the five `loadJson/saveJson` copies are thin wrappers over `secureJson.js`, so there is nothing left to merge.
- **Test lesson:** a test that rewrote `parents.json`/`students.json` directly caused random failures in other tests (a read during a write can return an empty list). Tests now move the clock with `resolveStudentTier(student, { now })` instead. Tests still share `data/` with the dev server, so run them with the server stopped, or set `ELINGU_DATA_DIR`.
- Tests added: `plan_expiry.test.js` (7), `housekeeping_p8.test.js` (4), more in `pii_guard.test.js` and `teacher_signup_security.test.js`. Tier 1 243/244 (TC-SOC-06 needs the live AI service and passes when run alone), pricing 46/46.

### Not done (cannot be done here, or too big for a safe change)
- Turning on encryption: needs your key (see below). Sending the Friday digest, receipts and renewal reminders by email: held for your Brevo budget. Real M-Pesa and Paystack end-to-end payments: need live keys.
- Streaming the tutor's reply, offline practice papers, teacher rubric reports, mission scheduling and parent messaging: larger features, each worth its own change.
- Splitting `index.html` and `server.js` into smaller cached files, and a screen-reader test on a real device.
- A Kiswahili teacher should read the translations.
- An unapproved school can still create its Headteacher account (staff and learner onboarding stay locked until you approve it).

### Before you push (your steps)
1. Stop any running dev server, then run: `node tests/css_syntax_hygiene.test.js`, `npm test`, `node tests/e2e_pricing/run_all.js`.
2. Start the app (`npm start`) and click through: learner sign-up, a chat, a practice paper, the parent portal (Billing tab), the teacher portal, and switch to Kiswahili.
3. In production set: `ELINGU_PILOT_CODES` (private codes), `ELINGU_DATA_KEY` (see `scripts/encrypt_data.js` for the dry run first, keep the key forever), live Daraja and Paystack keys, `APP_BASE_URL`, and `NODE_ENV=production`.
4. `git status` will show many new files (for example `piiGuard.js`, `weeklyCard.js`, `i18n.js`, `exam_papers/`, the new tests): add them all or a clean clone will not start.

## Update 2026-11-05 (Round 9: practice papers in the database, parent emails, go-live guide)
- **Go-live guide:** `docs/GOING_LIVE.md` has step-by-step instructions for turning on encryption (key, order of steps, backup, quiet-hour run), the settings the live app needs (including private pilot codes, M-Pesa live, Paystack live, the signing secrets), managing papers, and the pre-push checklist. It also notes that without `SESSION_SECRET` every restart signs everyone out.
- **Practice papers now live in the database** (`exam_papers`, `exam_paper_questions`). `examBank.js` loads them at start-up and serves them from memory; the 17 files in `exam_papers/` are the starting content. A missing paper is copied in; an untouched copy follows its file; a paper an owner edited or imported is never overwritten; a paper that fails the self-check (sample answers must earn full marks, blank must earn nothing, marks must add up) is not served; if the database cannot be read the built-in papers are used. `scripts/exam_papers.js` lists, exports, imports, publishes and hides papers, and the admin routes `GET /api/admin/exam-papers` and `POST /api/admin/exam-papers/reload` need an admin sign-in. Round trip checked: all 17 papers come back from the database identical to the files. Brain Spark reads from the same bank.
- **Parent emails** (`notificationService.js`): Friday summary built from real activity, payment receipts (sent once per receipt, on real M-Pesa and Paystack payments), and plan-ending reminders (7 days before, 1 day before, after it ended). The scheduled ones are off unless `ELINGU_NOTIFICATIONS=on`, capped by `ELINGU_EMAIL_DAILY_CAP` (default 40), once per week or once per end date, phone-only parents skipped, the summary has a signed one-click unsubscribe page (`/parent/unsubscribe`). Receipts are never blocked by the cap. Three sample emails were sent to the owner's own address only, using made-up family data.
- **Not verified:** the hourly scheduler has not been left running through a real Friday; real payments have not been made, so the receipt hook is tested with a stand-in sender, not a live M-Pesa/Paystack callback. Emails are English only.
- Tests added: `exam_bank.test.js` (7), `notifications.test.js` (7). Tier 1 258/258, pricing 46/46.
