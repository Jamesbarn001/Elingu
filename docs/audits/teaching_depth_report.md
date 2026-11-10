# Teaching Depth Audit: primers, tutor prompts, and Kiswahili in teaching

Scope: read-only review plus design. No code was changed. Figures come from a script that loads `db/seeds/index.js` (`ALL_CURRICULUM_SEEDS`) and inspects every sub-strand, so they reflect the seed files, not necessarily a database that was seeded earlier.

## 1. Where primers live and how they are used

### 1.1 Storage
- Table `sub_strands` in `db/schema.sql:218-228`. The primer is a single TEXT column holding JSON: `concept_primer TEXT NOT NULL` (line 221). Siblings: `socratic_inquiry_prompt`, `formula_hint`, `exam_focus`.
- Seeds: `db/seeds/cbc_math_seed.js`, `cbc_stem_seed.js`, `cbc_languages_other_seed.js`, `british_caie_seed.js`, merged in `db/seeds/index.js` as `ALL_CURRICULUM_SEEDS`.
- Each seed file defines the same helper, `stop(id, title, primerTitle, tagline, body, formula, visualBadge, realWorldContext, socraticPrompt, examFocus, steps = [], workedExample = '')` (e.g. `db/seeds/cbc_math_seed.js:7-32`). When `steps` is empty it injects the generic template and a `Formula Application: ...` worked example. This helper is the root cause of the sameness.
- `db/seed_curriculum.js:111-122` upserts via `curriculumRepo.upsertSubStrand` (`db/repositories/curriculumRepository.js:378-395`, `db.toJson(conceptPrimer, {})`). Read back with `db.fromJson` at `curriculumRepository.js:223` and `:287`.

### 1.2 Exact data shape (as served to the client by `/api/curriculum/subtopic/:id`, server.js ~11897)
```json
{
  "id": "cbc_g10_math_s1_1",
  "title": "1.1 Real Numbers & Surds: Rationalising Denominators with Conjugates",
  "status": "available",
  "conceptPrimer": {
    "title": "Clearing Radicals from Denominators",
    "tagline": "Difference of two squares eliminates the irrational root",
    "body": "To rationalise a/(√b + √c), multiply both numerator and denominator by the conjugate (√b - √c) so (√b)² - (√c)² = b - c.",
    "formula": "c / (√a + √b) = c(√a - √b) / (a - b)",
    "visualBadge": "🛡️ Conjugate Cancellation Shield",
    "realWorldContext": "Electronics impedance calculations and exact surveyor distances.",
    "explanationSteps": [
      "Step 1: Identify the mathematical quantities and governing algebraic or geometric rule.",
      "Step 2: Substitute known values carefully with consistent units and signs.",
      "Step 3: Simplify step-by-step and verify reasonableness against the real-world context."
    ],
    "workedExample": "Formula Application: c / (√a + √b) = c(√a - √b) / (a - b) — Electronics impedance calculations and exact surveyor distances."
  },
  "socraticPrompt": "Why does multiplying (√5 + √2) by (√5 - √2) result in a rational whole number without any roots?",
  "formulaBadge": "c / (√a + √b) = c(√a - √b) / (a - b)",
  "examFocus": "KSSEA Section A: Rationalising quadratic surds to obtain a + b√c format."
}
```
Note the formula in the data uses a/b/c letters that clash with the body (`a/(√b + √c)` versus `c/(√a + √b)`), and the "real-world context" (impedance, surveying) is not something a Grade 10 learner has met.

### 1.3 Rendering
- `public/index.html:11426-11520`, `renderSplitStudioCockpit(data)` (the "openSubtopicCockpit" view). Reads `primer.visualBadge, title, tagline, body, explanationSteps (numbered circles), workedExample (white-space: pre-line, label "Concrete Walkthrough Example"), formula ("Key Principle"), realWorldContext`.
- Values are interpolated straight into `innerHTML` with no escaping (lines 11469-11513). Fine while seeds are trusted; becomes an XSS path if primers ever become teacher- or LLM-authored.
- Only 5 free-text slots exist, all single strings. There is no slot for prerequisites, common mistakes or a self-check, so even a good author cannot express a ladder today.

### 1.4 Tutor prompt construction
- Whole-subject chat: `buildStaticPrompt` (server.js ~505-615) = `CONSTITUTION` + identity + Socratic method (lines 549-558) + "EMOJIS & TONE RULES" (560-566) + curriculum block + `SUBJECT_PEDAGOGY[subject]` (defined from ~363). The DB syllabus is injected by `getDatabaseSyllabusContext` (server.js ~463-480), which passes only `tagline`, `body`, `formulaBadge`, `realWorldContext`, `socraticPrompt`, `examFocus`. `explanationSteps` and `workedExample` never reach the model.
- `buildDynamicPrompt` (586-600) adds learner profile (grade, usual age, school kind). PII is stripped later inside `callLLM` by `piiGuard.prepareForProvider` (server.js:695; `piiGuard.js:69`).
- Fallback prompts that bypass the static prompt: lean Groq prompts at server.js:744-748 and 857-862. They restate the rules in shortened (and worse) form.
- Subtopic study-stop chat: `POST /api/curriculum/socratic-reason`, server.js:11909-12030. It builds its own `socraticPrompt` (11930-11962) from `primer.body`, `formula`, `realWorldContext` and `socraticPrompt` only. It does NOT include the constitution, the grade-appropriate subject pedagogy, `explanationSteps`, or `workedExample`. The call is `callLLM(msgs, socraticPrompt, '', { pii })` (11973). `curriculumMapService.js` is a thin pass-through to `curriculumRepository` (`getSubtopicById`, `getCurriculumMap`, `getCatalogue`); no prompt logic lives there. `constitution.js` is a safety blocklist (Layer 1+); it contains no language, praise or pedagogy rules.

## 2. Diagnosis: how generic is the content

Total sub-strands in seeds: **240**.

| Template (first step text) | Count | Where |
|---|---|---|
| "Identify the mathematical quantities and governing algebraic or geometric rule" | **36** | all CBC Mathematics G6-G12 except 2 |
| "Analyze the context, audience, and structural rules" | **78** | CBC English, Kiswahili, Social Studies, Pre-Tech, Agri, RE, Arts, Essential Maths, CSL, History, Geography, Business; CAIE English |
| "Identify the core scientific principle and physical quantities" | **60** | CBC Biology/Chemistry/Physics/Comp. Studies/Science G6-G9 etc. |
| "Identify the underlying scientific, computational, or ..." (CAIE) | **54** | CAIE Science, Maths, CS (some counted with CBC STEM above, see table 2.2) |
| Real, topic-specific steps | **12** | listed below |

So **228 of 240 primers (95%) use one of four generic 3-step templates**. In addition **150 worked examples** are not worked examples at all: they are the string "Formula Application: <formula> - <context>" (36), "Practical Application: <context>" (60) or "Model CAIE Application: ..." (54), i.e. the real-world line repeated.

### 2.1 The 36 generic mathematics-template primers (exact list)
CBC G6: `cbc_g6_math_s1_1`, `s1_2`, `s2_1`, `s2_2`, `s3_1`, `s4_1` (place value; fraction/decimal/percent; compound-shape area; profit/loss; angles; bar graphs).
CBC G7: `cbc_g7_math_s1_1` (BODMAS), `s1_2` (HCF/LCM), `s2_1` (ratio), `s3_1` (pi r^2, 2 pi r), `s4_1` (central tendency).
CBC G8: `cbc_g8_math_s1_2` (squares/roots), `s2_1` (compound interest), `s2_2` (Pythagoras), `s3_1` (Cartesian reflection).
CBC G9: `cbc_g9_math_s1_1` (indices), `s2_1` (SOH CAH TOA), `s3_1` (gradient and lines).
CBC G10: `cbc_g10_math_s1_1` (surds/conjugates), `s1_2` (completing the square), `s1_3` (inequalities), `s2_1` (similarity/frustums), `s2_2` (sine/cosine rule), `s2_3` (area of triangles, Heron), `s2_4` (surface area/volume), `s3_1` (vectors), `s2_6` (gradients), `s3_2` (grouped data), `s3_3` (probability).
CBC G11: `cbc_g11_math_s1_1` (AP), `s1_2` (GP), `s2_1` (cyclic quads), `s3_1` (differentiation).
CBC G12: `cbc_g12_math_s1_1` (integration), `s2_1` (kinematics calculus), `s3_1` (navigation).

### 2.2 Generic-template count by subject group
- CBC Mathematics: G6 6/6, G7 5/5, G8 4/6, G9 3/3, G10 11/11, G11 4/4, G12 3/3.
- CBC Physics 13/13, Chemistry 8/8, Computer Studies 16/17, Biology 9/10, Science G6-G9 (all but 1 of 15).
- CBC English 30/30 (G7 4, G8 4, G9 3, G10 19), Kiswahili 11/18 (G7 3, G8 4, G9 2, G10 6 of 8 use the generic template; the 3 real ones are `cbc_g8_kisw_s1_1`, `cbc_g10_kisw_s1_1`, `cbc_g10_kisw_s2_1`), Social Studies 9/9, and every other humanities/applied subject.
- CAIE: 46 of 58 on a generic template; the real ones are `cie_y10_cs_s1_1`, `cie_y10_phy_s1_1`, `cie_y10_chem_s1_1`, `cie_y10_bio_s1_1`.

### 2.3 The only 12 primers with real content (good models to copy)
`cbc_g10_bio_s1_1` (osmosis), `cbc_g10_comp_s1_1` (algorithms/trace tables), `cbc_g8_sci_s1_1` (distillation), `cbc_g8_math_s1_1` (directed numbers, walking-on-a-number-line analogy), `cbc_g8_math_s4_1` (simultaneous equations, Mama Mboga), `cbc_g8_kisw_s1_1`, `cbc_g10_kisw_s1_1`, `cbc_g10_kisw_s2_1`, `cie_y10_cs_s1_1`, `cie_y10_phy_s1_1`, `cie_y10_chem_s1_1`, `cie_y10_bio_s1_1`. Two of the three real Kiswahili primers are written in Kiswahili, which is the only existing Kiswahili teaching content.

### 2.4 Primers that assume undefined prerequisites (examples; the generic ones all do)
- `cbc_g10_math_s1_1` conjugates: assumes the learner knows what a surd is, `√a x √a = a`, how to expand two brackets, difference of two squares, and why multiplying by (conjugate / conjugate) is legal. None is defined.
- `cbc_g10_math_s1_2` completing the square: assumes expanding `(x+p)^2`, perfect squares, and halving the coefficient.
- `cbc_g10_math_s1_3` inequalities and algebraic fractions: assumes sign change on multiplying by a negative, factorising quadratics, common denominators.
- `cbc_g10_math_s2_2` sine/cosine rule: assumes SOH CAH TOA and what an included angle is; `s2_3` Heron's formula: assumes semi-perimeter and square roots.
- `cbc_g10_math_s3_1` vectors and `s2_6` perpendicular gradients: assume gradient from two points and `m1 x m2 = -1` reasoning.
- `cbc_g11_math_s3_1` gradient of curves, `cbc_g12_math_s1_1` integration: assume limits/rate of change and the previous differentiation stop.
- `cbc_g9_math_s1_1` indices and `cbc_g11_math_s1_2` GP: assume index laws and exponent notation.
- Sciences: `cie_y10_chem_s1_1` (mole) assumes relative atomic mass and balanced equations; CBC Physics/Chemistry stops assume SI units and symbols.
- The primer data has no field recording that the dependency exists, and `sub_strands` has no prerequisite column (`status` is only available/active/mastered, never locked), so the app cannot even detect that G10 surds depends on G8 squares/roots (`cbc_g8_math_s1_2`) or G9 indices (`cbc_g9_math_s1_1`).

## 3. Design: the prerequisite-ladder primer

Principle: delivery is not understanding. A learner understands a conjugate only when they can (a) say what each prior idea is, (b) see the new idea arise as the answer to a problem, (c) watch every step with the reason for it, (d) predict the common slip, and (e) produce one themselves. The primer must encode that sequence, and the tutor must check it live.

### 3.1 New fields (additive, stored inside the existing `concept_primer` JSON, so no schema migration)
Keep every current field (so `renderSplitStudioCockpit` keeps working) and add `ladder` (version 2). Old rows keep working; the renderer prefers `ladder` when present.

```json
{
  "ladderVersion": 2,
  "title": "...", "tagline": "...", "body": "...", "formula": "...", "realWorldContext": "...",
  "prerequisites": [
    {
      "id": "p1_root",
      "name": "What a square root is",
      "sourceSubStrandId": "cbc_g8_math_s1_2",
      "fromScratch": "plain 2-4 sentence explanation, no jargon not defined here",
      "everydayAnalogy": "Kenyan, concrete",
      "workedExample": ["Step 1 ... because ...", "Step 2 ..."],
      "checkQuestion": { "q": "...", "answer": "...", "acceptable": ["..."], "ifWrongHint": "..." },
      "dependsOn": []
    }
  ],
  "newIdea": {
    "whyNeeded": "the problem that makes this idea necessary",
    "fromScratch": "...",
    "everydayAnalogy": "...",
    "analogyLimit": "where the analogy stops being true",
    "workedExample": {
      "problem": "...",
      "steps": [ { "do": "...", "why": "...", "result": "..." } ],
      "sanityCheck": "..."
    },
    "commonMistakes": [ { "mistake": "...", "whyItHappens": "...", "howToSpotIt": "..." } ],
    "check": [ { "q": "...", "answer": "...", "marks": 1 }, { "q": "...", "answer": "...", "marks": 2 } ]
  },
  "glossary": [ { "en": "conjugate", "sw": "...", "swGloss": "...", "reviewed": false } ],
  "sw": null
}
```
Rules for authors: every step carries a `why`; every term is defined in `prerequisites` or `glossary` before use; one analogy, with its limit stated; `check` has exactly two questions (one same-shape, one with a twist); max 3-5 prerequisites ordered simplest first; `sourceSubStrandId` links to the stop that teaches it so the learner can jump there.

`sw` (optional) holds a reviewed Kiswahili mirror of the same shape; see section 5.

Also add one optional column later, `sub_strands.prerequisite_ids TEXT` (JSON array of sub_strand ids) so the Learn Map can suggest "revisit first" without ever locking (project rule: status is never 'locked').

### 3.2 UI behaviour
Primer card becomes an accordion: "Before we start" (prerequisite chips, each expands to fromScratch + analogy + one check), then "The new idea", "Watch it done step by step" (steps with a "why" line each), "Watch out for" (common mistake), "Try two" (check). The learner may skip any chip; skipping is recorded, not penalised.

### 3.3 Tutor prompt: check prerequisites before teaching, and what to do when one is missing
Both `buildStaticPrompt` and `/api/curriculum/socratic-reason` should receive the ladder (compact form: prerequisite names + check questions + the common mistakes + the worked example). Proposed block for `socratic-reason` (stateless endpoint, so state travels in a tag the server parses like `[STATUS: ...]`):

```
PREREQUISITE LADDER FOR THIS TOPIC (check in order, simplest first):
P1 {name}: check question "{q}" (correct answer: {answer})
P2 ...

TEACHING PROTOCOL:
1. On the learner's first turn in this stop, do not explain the new idea. Ask the check question for P1 only. One question per message.
2. If the learner answers correctly in their own words, say specifically what was right (no stock praise), then move to the next prerequisite. After the last one, introduce the new idea by posing the problem that needs it ("{whyNeeded}"), before naming it.
3. If they answer wrongly, say "I don't know", or write nothing usable: do not move on, do not correct harshly. Say one calm sentence that this step is worth settling first, teach that prerequisite from scratch using its everyday analogy and its worked example (show every step with the reason), then ask a different check question. Stay on that prerequisite up to 2 attempts; on the third, show the full answer with reasons, then ask a parallel question.
4. Never teach the new idea while any prerequisite is unconfirmed. If the learner insists ("just show me"), show the worked example, then immediately ask them to do the second check question to confirm they can reproduce it.
5. When a prerequisite is a separate stop in the app, name it ("this comes from Grade 8: Squares and Square Roots") and offer to revisit it.
6. Use the Kenyan analogy given; state where the analogy stops being true.
7. Close every message with exactly one question.

At the very end of the reply output on separate lines:
[PREREQ: P1=confirmed, P2=gap, P3=untested]
[STATUS: EXPLORING] or [STATUS: MASTERED]  (MASTERED only after the learner has produced the new idea's worked steps correctly in their own words, including both check questions)
```
Server side: parse `[PREREQ: ...]`, strip it from the reply, and echo it as `prereqState` in the JSON; the client sends it back in the next request so the endpoint stays stateless (this also fixes the lack of stored progress today). Persisting it per learner can reuse the mastery store later.

Additional wiring: include `explanationSteps`/`workedExample` in `getDatabaseSyllabusContext` (server.js ~473), and give `socratic-reason` the constitution, the subject pedagogy block and the age/PII-safe learner profile it is missing today.

### 3.4 Fully worked example: `cbc_g10_math_s1_1` (draft content for the `ladder` JSON; written for a Grade 10 Kenyan learner; review with a maths teacher before shipping)

**Topic: Rationalising a denominator with a conjugate**

**Before we start: four ideas we will use**

*P1. What a square root is (from Grade 8, Squares and Square Roots)*
A square root answers one question: which number, multiplied by itself, gives this one? So the square root of 9 is 3, because 3 x 3 = 9. We write it as √9 = 3. Some numbers do not have a neat answer. √5 is the number that, times itself, makes 5. It is about 2.236, but the digits never end and never repeat. We call a root like this a surd. The one fact we need: √5 x √5 = 5, because that is exactly what √5 means.
Everyday picture: a plot of land that is a square with area 25 square metres has sides of √25 = 5 metres. A square plot of area 5 square metres has sides √5 metres. You cannot measure that side exactly with a tape, but you know that side times side = 5.
Check: What is √7 x √7? (Answer: 7.) If wrong: remember the root is defined as the number that gives 7 when multiplied by itself.

*P2. Multiplying two brackets, term by term*
(x + 2)(x + 3) means every term in the first bracket multiplies every term in the second. Work in order: first x times x, then x times 3, then 2 times x, then 2 times 3.
(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6.
Check: Expand (x + 4)(x - 1). (Answer: x² - x + 4x - 4 = x² + 3x - 4.) If wrong: ask which of the four products they missed, and check the signs on the -1.

*P3. The pattern that kills the middle: difference of two squares*
Expand (a + b)(a - b) with the same four products:
a x a = a²; a x (-b) = -ab; b x a = +ab; b x (-b) = -b².
Put together: a² - ab + ab - b². The -ab and +ab cancel, so
(a + b)(a - b) = a² - b².
Everyday picture: you pay KES 200 to a boda boda rider by M-Pesa, and the same day he sends you back KES 200 for a refund. Your balance goes down 200 and up 200, so the two cancel, as if nothing moved. In the brackets, -ab and +ab are that payment and that refund. That cancellation only happens when the two brackets are the same except for the sign in the middle. (The picture stops being true if the amounts differ, for example paying 200 and being refunded 150 leaves 50 behind, just as (a + b)(a - 2b) does not cancel.)
Check: Expand (x + 5)(x - 5). (Answer: x² - 25.)

*P4. Multiplying top and bottom by the same number does not change a fraction*
1/2 and 3/6 are the same amount, because 3/6 = (1 x 3)/(2 x 3), and 3/3 = 1. Multiplying anything by 1 changes how it looks, not its value.
Everyday picture: half a loaf of bread is the same amount of bread as three sixths of a loaf cut into six slices. Cutting it finer changes the look, not the amount.
Check: Write 2/5 as a fraction with denominator 15. (Answer: 6/15.)

**The problem that makes us need a new idea**
Look at 6 / (√5 + √2). The bottom of the fraction is a surd sum, a number with endless digits. To find out how big this fraction is, you would have to divide 6 by 3.6502815... by hand. Examiners, and anyone calculating without a calculator, prefer a bottom that is a plain whole number. The aim of rationalising is to rewrite the fraction so the bottom has no root, without changing its value.

P3 tells us a trick that can remove roots: (a + b)(a - b) = a² - b². If a = √5 and b = √2, then a² = (√5)² = 5 and b² = (√2)² = 2, both whole numbers (this is where P1 is used). So if we could multiply the bottom by something that makes it look like (√5 + √2)(√5 - √2), the roots would disappear. P4 says we are allowed to multiply the bottom by anything, provided we multiply the top by the same thing.

**The new idea: the conjugate**
The conjugate of (√5 + √2) is the same two terms with the sign in the middle flipped: (√5 - √2). A pair like this is called conjugates. Their product is always a whole number when the terms are square roots of whole numbers, because the middle terms cancel exactly like the M-Pesa payment and refund. The conjugate of (√7 - √3) is (√7 + √3). The conjugate of (3 + √2) is (3 - √2), not (-3 - √2): you flip only the sign between the two terms.

**Worked example, every step shown: rationalise 6 / (√5 + √2)**
1. Write the conjugate of the bottom. The bottom is √5 + √2, so its conjugate is √5 - √2. Why: we want the middle terms to cancel.
2. Make a fraction equal to 1 using it: (√5 - √2)/(√5 - √2). Why: P4, multiplying by 1 cannot change the value.
3. Multiply the whole fraction by it: 6/(√5 + √2) x (√5 - √2)/(√5 - √2) = 6(√5 - √2) / [(√5 + √2)(√5 - √2)]. Why: top times top, bottom times bottom. Remember to multiply the top as well.
4. Work out the bottom with P3, with a = √5 and b = √2: (√5)² - (√2)² = 5 - 2 = 3. Why: the middle terms +√10 and -√10 cancel, and P1 gives √5 x √5 = 5 and √2 x √2 = 2. Check by long expansion if you like: √5 x √5 + √5 x (-√2) + √2 x √5 + √2 x (-√2) = 5 - √10 + √10 - 2 = 3.
5. Write the top: 6(√5 - √2) = 6√5 - 6√2.
6. Put the fraction back together: (6√5 - 6√2)/3.
7. Simplify by dividing each term by 3: 2√5 - 2√2.
Answer: 6/(√5 + √2) = 2√5 - 2√2.
Sanity check with approximate values: √5 = 2.236 and √2 = 1.414. Left side: 6 / 3.650 = 1.644. Right side: 2(2.236) - 2(1.414) = 4.472 - 2.828 = 1.644. They agree, so the value did not change; only the look did.

**Watch out for (most common mistakes)**
1. Multiplying only the bottom by the conjugate and forgetting the top. This changes the value of the fraction. Fix: always write the full fraction (conjugate / conjugate) first.
2. Flipping the wrong sign: writing the conjugate of √5 + √2 as -√5 - √2 or as √5 + √2 again. Squaring the same bracket gives 5 + 2√10 + 2, which still has a root. Fix: change only the sign in the middle.
3. Writing (√5 + √2)(√5 - √2) = √5 - √2 (taking the squares as if they cancelled the roots wrongly) or = 5 - 2 with the arrows dropped incorrectly into √(5 - 2). The square of √5 is 5, not √5. Fix: do the four products once, slowly, until the pattern is familiar.
4. Stopping early, leaving (6√5 - 6√2)/3. The exam answer needs the common factor cancelled to give 2√5 - 2√2.

**Try two (self-check)**
1. Write the conjugate of √7 - √3 and multiply the two brackets. (Answer: conjugate √7 + √3; product 7 - 3 = 4.)
2. Rationalise 4 / (√6 - √2). (Steps: multiply by (√6 + √2)/(√6 + √2). Bottom: 6 - 2 = 4. Top: 4(√6 + √2). So 4(√6 + √2)/4 = √6 + √2. Sanity check: 4 / (2.449 - 1.414) = 3.864, and √6 + √2 = 3.863.)

**Tutor opener the system should produce for this stop (no praise, no emoji):**
"Before we rationalise anything, I want to be sure one idea is solid. Without a calculator, what is √7 x √7, and how do you know?"
If the learner answers 7: "Yes, 7, because the root is defined as the number that gives 7 when multiplied by itself. Next, expand (x + 5)(x - 5) and tell me what happened to the middle terms."
If the learner answers "14" or "I don't know": "That is a common mix-up between multiplying and adding. Think of a square plot with area 7 square metres. Its side is √7 metres. Area is side times side. So what is √7 times √7?"

## 4. Conflicts with the owner's rules (praise and emoji)

Owner rules (CLAUDE.md:64): zero fake praise; analogies everyday Kenyan; `[STATUS: MASTERED]` only when the learner explains in their own words. Owner's instruction for this task: no emoji.

| # | File:line | Current text | Conflict | Proposed replacement |
|---|---|---|---|---|
| 1 | server.js:560-564 | "EMOJIS & TONE RULES ... OPENING GREETING & EMOJI HOOK (MANDATORY ...) ... e.g. 'Spot on! 🎯', 'Awesome work! 👏', 'Great observation! 💡', 'Brilliant! ✨', 'Nice work! 🚀'" | Mandates an emoji and models unearned stock praise as the greeting (and on a first message there is nothing to praise) | `## TONE RULES` `1. Greet in one plain sentence on the first message only. Use no emoji. 2. Never use stock praise ("Brilliant!", "Spot on!", "Nice work!", "Awesome!"). When the learner is right, say exactly what they got right and why it works ("Yes: you cancelled the middle terms because they have opposite signs."). When they are wrong or stuck, say so kindly and give the next small step. 3. Praise effort only when it is specific and true ("You kept going after the first attempt did not work.").` |
| 2 | server.js:526-527 (`naturalOpeningInstruction`) | `Anza kwa Kiswahili ... kikiwa na emoji baada ya salamu (k.m. "Hujambo! 🌟", "Karibu! 🇰🇪", "Safi sana! 👏")` / "...Start in natural English with your opening greeting and emoji hook." | Same mandate | Kiswahili: `Anza kwa salamu fupi ya Kiswahili sanifu bila emoji, kisha uulize swali la kwanza.` English: `Start with one short, plain greeting, no emoji, then ask your first question.` |
| 3 | server.js:417 (Kiswahili pedagogy "EMOJIS") | `Weka emoji mara baada ya salamu ... "Safi sana! 👏", "Vizuri! 🎯", "Hongera! ✨"` | Mandates emoji and stock praise in Kiswahili | `- **TONE**: Usitumie emoji. Usitoe sifa tupu ("Safi sana!", "Hongera!"). Sema hasa kilichosahihi katika jibu la mwanafunzi na kwa nini; akikosea, mwonyeshe hatua ndogo inayofuata kwa upole.` |
| 4 | server.js:744 (lean OpenAI-fallback prompt) | "Use emojis naturally to keep the conversation warm and fun 🎯📚🔥." and 745 "Use emojis naturally" | Emoji directive | Delete both emoji sentences; add "No emoji. No stock praise." |
| 5 | server.js:858 (lean Groq-fallback prompt) | `MANDATORY: Place a vibrant emoji right after your opening greeting/phrase (e.g. "Spot on! 🎯", "Welcome! 🌟", "Awesome! 👏", "Great observation! 💡", ...)` | Same mandate and stock praise, and this prompt is what the learner gets whenever Gemini times out (2.8 s) | `Use no emoji. Never use stock praise; say specifically what was correct or what the next step is.` |
| 6 | server.js:557 | "Right answer -> celebrate genuinely, then ask the next inquiry question." | "celebrate" invites generic cheering | `Right answer -> state what was correct and why it works, then ask the next question.` |
| 7 | server.js:11951 | `Reply lightheartedly: "Looks like your fingers took a quick sprint on the keyboard! 😊"` | Emoji; also mildly mocking a child who may be struggling | `Reply calmly: "I could not read that one. Try again in your own words, or tell me which part is unclear."` |
| 8 | server.js:11956 | "If correct, celebrate their reasoning specifically ..." | "celebrate" | `If correct, state which part of their reasoning is sound and why, then invite the next step.` |
| 9 | server.js:11982, 11984, 11986 (heuristic fallbacks when LLM is offline) | `That is completely okay! 🌱 ...`, `Looks like your fingers ... 😊`, `Interesting thought! 🤔 ...` | Emoji; "Interesting thought!" is filler praise | Remove emoji; `Interesting thought!` -> `Let us test that idea.` |
| 10 | server.js:11997 | `isMastered = ... /(unlocked|spot on|perfect reasoning|you got it right|well done reasoning)/i.test(reply)` | Infers mastery from praise words, which the owner's rule forbids (MASTERED must be explicit and earned). This regex also rewards exactly the stock praise we want removed. | Delete the regex branch: `isMastered = false` when no `[STATUS: MASTERED]` tag is present. |
| 11 | server.js:1606 (non-LLM fallback) | `"Spot on! 🌟 That's a wonderful question to explore..."` | Stock praise and emoji | `"Good question to ask. Before we go to the answer, what do you already know about this topic? Can we break it into two smaller steps?"` |
| 12 | server.js:219-223, 256 (sentinel greetings) | `"Hujambo! 🇰🇪 ..."`, `"Safi sana! 🧪 ..."`, others with emoji | Emoji and "Safi sana" opener | Same wording minus emoji |
| 13 | server.js:1276 (daily-limit message) | `... 🌟 Great job exploring CBE concepts today! ... 🌳` | Unearned praise, emoji (shown at a limit, not a result) | `You have used today's {n} questions. Rest your mind; turns reset at midnight.` |
| 14 | server.js:369,377,392,412 (SUBJECT_PEDAGOGY) and 385 | "Mix English with casual Swahili/Sheng naturally." / `("Hongera kwa mradi huu!", "Great initiative!")` | Not a praise conflict, but an unmanaged language policy that makes Maths/Science teach in code-switched speech (see section 5) and models stock praise at 385 | Replace by the language-policy block in section 5.5; at 385 use `Acknowledge specific actions the learner took.` |

Also: `socratic-reason` omits `CONSTITUTION` and the tone rules entirely, so the changes above must be repeated in its own prompt (rules 1-4 there are already close to correct; only #7-#10 need change).

Also worth a test: add a unit test that scans the assembled static prompt for `/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u` and for the stock phrases, so the rule cannot regress.

## 5. Kiswahili in teaching

### 5.1 Current state (verified)
- `public/i18n.js` (1407 lines) is a catalogue of English-to-Kiswahili screen strings. Its own header says "Tutor chat, exam questions, curriculum content, and the parent and teacher portals are not translated yet", and `SCOPE` limits it to navigation/Explore/Play/Me/auth screens. A Kiswahili teacher review is flagged as pending in its header.
- Tutor chat is never translated. Kiswahili appears in teaching only as: (a) the Kiswahili subject, taught in Kiswahili (`SUBJECT_PEDAGOGY['Kiswahili']`, server.js:414+, sentinel greetings, 3 real Kiswahili primers); (b) uncontrolled "Mix English with casual Swahili/Sheng" lines (server.js:369, 377, 392, 412, 745, 859) for Maths/Science/Social Studies/Essential Maths; (c) English is "STRICT IMMERSION" with Swahili only as emergency scaffolding (server.js:396-397); (d) `language: 'sw'` for Whisper transcription (server.js:1722).
- So the answer to the owner: Kiswahili is used for navigation (UI strings), for the Kiswahili subject itself, and as ad hoc flavour in other subjects. There is no designed, per-learner, accuracy-controlled Kiswahili explanation of Maths or Science concepts.

### 5.2 Options
| | A. Screens only (status quo) | B. On-demand "Explain in Kiswahili" per message | C. Full Kiswahili tutor mode |
|---|---|---|---|
| What the learner gets | Kiswahili labels, English teaching | One tap re-explains the latest tutor message in Kiswahili, with key English terms in brackets | Whole conversation in Kiswahili |
| Cost | none | one extra LLM call only when tapped (roughly one tutor-reply of tokens) | every turn at similar cost, plus bigger prompts for glossary |
| Accuracy risk | low | medium, bounded to a single message and visible to the learner | high: sustained use of technical Kiswahili maths/science vocabulary that the learner's textbook may not use |
| Alignment with exams | good | good if English term stays | poor: KCSE/KNEC papers in Maths, Science, Business are set in English |
| KDPA/PII | no new path | translation call must go through the same `callLLM` + `piiGuard.prepareForProvider` path; send only the tutor message text, not the learner profile | all learner text already goes this path; no new surface but volume rises |
| Delivery effort | none | small: one endpoint, one button | large: prompt, glossary, evaluation, per-subject policy |

### 5.3 Risks to carry whichever option is chosen
- **Technical term accuracy.** Kiswahili maths/science terminology is not uniform (Kenya's textbooks and Tanzanian ones differ; some terms such as "surd" have no widely agreed Kenyan translation). LLMs invent plausible but wrong terms. Mitigation: a reviewed glossary the model must use, English term always kept in brackets, and a marker for unreviewed terms (`"reviewed": false`) that the prompt may not translate.
- **KDPA / PII.** A translation request must reuse `callLLM`'s `piiGuard.prepareForProvider` (server.js:695) and the same `{ pii: knownFor(student) }` option; never translate raw learner messages by a separate code path; log nothing new. Because the learner text is already redacted, translating tutor output (not learner input) in option B is the lowest-exposure path.
- **Cost.** B is on demand and cacheable by (message hash, language), so repeated taps cost nothing. C adds the glossary to every prompt (keep it to the glossary terms of the current stop only).
- **Language-of-instruction policy.** Under CBC, English is the medium of instruction for most learning areas from upper primary, Kiswahili is the medium for the Kiswahili subject (and English for English), and mother tongue/Kiswahili are used in lower primary. For Grade 6-12 Maths and Science, the exam is in English, so concepts must always end in English terms. This is a policy statement the owner should confirm with the school partners; the app should not silently teach Maths wholly in Kiswahili.
- **Kiswahili subject** must not be touched by this feature: it already teaches in Kiswahili, and a toggle that translates Kiswahili to English is a different feature (support for a learner whose first language is not Kiswahili).
- **Unreviewed wording.** `i18n.js` itself says its wording still needs a Kiswahili teacher; the same review gate must apply to anything pedagogical.

### 5.4 Recommendation
Do B now, keep A, defer C.
1. **B: "Eleza kwa Kiswahili" (Explain in Kiswahili) button** on each tutor message in the study-stop chat and main chat, plus a one-time setting "Show Kiswahili help" tied to the existing `elingu_lang` toggle in i18n (default off in English UI, default visible when language = Kiswahili). Tapping re-renders that one message below it as a collapsible block labelled "Kiswahili" with a "Show English again" control. The Socratic question at the end stays in both languages so the learner can answer in whichever they think in.
2. **Prerequisite checks and "from scratch" explanations** are the highest-value place for Kiswahili, because a learner who lacks a prerequisite is most likely to be helped by their strongest language. The `ladder.sw` mirror (section 3.1) carries reviewed Kiswahili versions of `fromScratch` and `everydayAnalogy` for P1-Pn.
3. **Not C** until a Kiswahili maths teacher has reviewed a glossary and a pilot shows benefit. Revisit with a per-subject switch (Maths, Science only).
4. **Kiswahili subject** keeps its current Kiswahili-only mode, with the emoji/praise fixes from section 4.

### 5.5 Prompt wording

Replace the scattered "Mix English with casual Swahili/Sheng" lines with one block, added to `buildStaticPrompt` after the subject pedagogy and to `socratic-reason`:

```
## LANGUAGE POLICY
- Teach in English. Use short sentences and common words suited to a learner aged {usualAge}.
- Do not mix in Swahili or Sheng for style. Do not use slang.
- Use Kiswahili only when (a) the learner writes in Kiswahili, (b) the learner asks for it, or (c) the learner has failed the same check twice and a plain explanation in English has not worked. Then give the explanation in clear Kiswahili sanifu, keep each technical term in English in brackets (for example: mzizi mraba (square root)), and finish with the same single question in English.
- Use only Kiswahili technical terms from the GLOSSARY below. If a term is not in the glossary, write the English term and do not invent a Kiswahili one.
- After a Kiswahili explanation, return to English unless the learner continues in Kiswahili.
```
For the on-demand translator endpoint (B) a separate, short system prompt:
```
Translate the tutor message below into clear Kiswahili sanifu for a Kenyan learner in Grade {n}.
Keep all numbers, symbols and equations unchanged. Put the English term in brackets after the first use of each technical term. Use only these terms: {glossary for this stop}. For any term not in the list, keep the English word. Do not add explanation, praise, emoji or new questions. Keep the final question as a question.
```
Example output form: "Mzizi mraba (square root) wa 9 ni 3, kwa sababu 3 x 3 = 9."

### 5.6 UI placement
- Small text button under each tutor bubble, label "Kiswahili" (English UI) / "English" (when showing translation). Place with the existing per-message actions; it must not push the input area.
- In the primer card, each prerequisite chip gets the same toggle.
- Language preference lives with the existing `elingu_lang` key in `i18n.js`; the tutor call carries `preferredHelpLanguage: 'sw'|'en'` only as an enum, never as free text.

### 5.7 Glossary approach
- One reviewed table per subject, stored with the primer (`glossary` array in section 3.1) and also a global `data`-independent file `db/seeds/glossary_sw.js` (seed, idempotent upsert). Fields: `en`, `sw`, `swGloss` (one plain sentence), `subject`, `gradeFrom`, `reviewedBy`, `reviewedAt`, `source` (KICD textbook or teacher).
- Display rule: Kiswahili term first, English in brackets, every time in a Kiswahili explanation: `kipeo (index / power)`.
- Draft entries for review only (not yet verified by a Kiswahili teacher, so `reviewed: false`): square root = mzizi mraba; square = mraba; number = namba; sum = jumla; difference = tofauti; multiply = zidisha; divide = gawanya; fraction = sehemu; index/power = kipeo. The following have no entry until a teacher confirms them, and the tutor must keep the English word: surd, conjugate, rationalise, numerator, denominator, difference of two squares.
- A seeded check script (like the one used for this report) should fail CI if a Kiswahili primer or translated message contains a term from the glossary's "do not translate yet" list.

## 6. Suggested order of work
1. Prompt text changes in section 4 (small, safe, testable with a prompt-scan unit test). Also delete the mastery regex (item 10).
2. Pass `explanationSteps`/`workedExample` (and later `ladder`) into the tutor prompts; add the constitution to `socratic-reason`.
3. Replace the `stop()` helper default: make `steps` and `workedExample` required, fail seeding when a primer equals a generic template (the check script in section 2 doubles as a test).
4. Author ladders in priority order: G10 Core Maths (11 stops, starting with `cbc_g10_math_s1_1` above), then G6-G9 maths prerequisites those depend on, then G10 sciences.
5. Ship option B (Explain in Kiswahili) after the glossary has a first teacher-reviewed batch.
