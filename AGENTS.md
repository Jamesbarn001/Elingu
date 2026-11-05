# Elingu Engineering Rules & Coding Standards

## 1. Portal Template Literal & Client Script Integrity Rule (CRITICAL)
When writing or updating server-rendered HTML pages, dashboards, or modals inside Node.js template literals (such as `server.js` or `teacherRoutes.js`):

1. **Strictly Use HTML5 Data Attributes (`dataset`) for Event Handlers**:
   - **NEVER** embed string-escaped variables or nested quotes inside inline `onclick="..."` concatenations.
   - **ALWAYS** attach parameters as HTML5 `data-*` attributes (`data-id`, `data-name`, `data-cid`, etc.) and read them using `this.dataset.*`.
   ```javascript
   // ❌ FORBIDDEN: Collapses in template literals & breaks client-side parsing
   actionsHtml += '<button onclick="openModal(\'' + id + '\', \'' + name + '\')">Edit</button>';
   actionsHtml += '<button onclick="openModal(&apos;' + id + '&apos;)">Edit</button>';

   // ✅ REQUIRED: 100% immune to escaping collisions and special characters
   actionsHtml += '<button data-id="' + id + '" data-name="' + encodeURIComponent(name) + '" onclick="openModal(this.dataset.id, decodeURIComponent(this.dataset.name))">Edit</button>';
   ```

2. **Double-Escape Multiline Strings in Alerts / Confirms**:
   - Inside template literals, `'\n\n'` is converted into physical line breaks in the output text, which breaks single-quoted strings in the browser.
   - Always use `\\n\\n`:
   ```javascript
   // ❌ FORBIDDEN: Generates syntax error in browser
   confirm(err + '\n\nWould you like to upgrade?');

   // ✅ REQUIRED: Outputs literal \n\n to browser JS engine
   confirm(err + '\\n\\nWould you like to upgrade?');
   ```

3. **Verify Client-Side Syntax Before Pushing**:
   - Any modification to server-rendered `<script>` blocks must be validated with an AST parser / `vm.Script` before deployment.
   - Syntax errors in `<script>` abort the entire compilation, causing all tab switches, sign-in, and modal buttons across the page to fail.

4. **Zero Data Loss (Kenya Data Protection Act 2019)**:
   - When offboarding faculty or updating student assignments, learner assessment trails, portfolios, and mission responses must never be purged.

## 5. Kenya Data Protection Act (KDPA 2019) & Child Data Safeguards (CRITICAL)
All engineering and UX implementations must strictly adhere to the Kenya Data Protection Act (No. 24 of 2019):

1. **Mandatory Parental/Guardian Consent (Section 33(1)(a) & 33(2))**:
   - Processing of a child's personal data is unlawful without verified parental/guardian consent and age-verification mechanisms.
   - The platform must maintain an auditable consent record (`consentGivenAt`, `parentContact`, `method`).
2. **Safe Box Statutory Exemption (Section 33(4))**:
   - Counseling, mental health grounding, and child protection services (including direct referral to Childline Kenya 116) are statutorily exempt from parental consent requirements to protect the vital interests of the child in distress.
3. **Strict Purpose Specification & Data Minimization (Section 25(c) & 25(d))**:
   - Collect only data strictly necessary for personalized learning. Never require national identity numbers, home physical addresses, or biometric data.
   - Support friendly pseudonyms/nicknames for display across public learning spaces and leaderboards.
4. **Cross-Border Transfer & Storage Localization (Sections 48–50)**:
   - Identifiable child personal data must remain securely stored within local or compliant cloud regions with end-to-end encryption.
   - LLM prompts sent to external inference APIs must have all student personal identifiers (real names, phone numbers, school names) stripped/anonymized before transmission.

## 6. Prohibition of Uncertified Regulatory Badges
1. **NEVER Render Unaccredited Badges**:
   - Remove and do not display "KDPA Protected", "KDPA Compliant", "KICD Certified", or "KICD Approved" badges, ribbons, or seals in the UI.
   - Trust and legitimacy must be conveyed through transparent privacy policies, clear parental controls, and authentic curriculum fidelity, not decorative compliance stamps.

## 7. Progressive, Value-First Onboarding (Save-My-Exams Pattern)
1. **Curriculum & Subject Discovery First**:
   - Onboarding must follow a frictionless 3-step visual journey:
     1. Choose Curriculum (🇰🇪 Kenyan CBE or 🇬🇧 British IGCSE/Checkpoint).
     2. Choose Level (Grade or Year Group).
     3. Choose Starting Subject(s).
2. **Immediate Time-to-Value**:
   - Learners must land on their interactive Topic Metro Roadmap within 30 seconds.
   - Account creation, parental consent notifications, and fine-grained customizations must be introduced progressively without blocking initial exploration.


## 8. Zero Naked CSS & Cache Invalidation Rule (CRITICAL)
1. **Never Inject Raw CSS Outside `<style>` Tags**:
   - Any inline stylesheet or CSS rules injected into HTML pages must strictly reside inside `<style>...</style>` tags located in `<head>` or before `</body>`.
   - Never place naked CSS comments `/* ... */` or selectors `.class { ... }` directly inside HTML body or document root.
2. **Mandatory Syntax Hygiene Test**:
   - Automated test `tests/css_syntax_hygiene.test.js` enforces that zero non-tag, unescaped CSS syntax or naked text exists outside `<style>` or `<script>` tags in `public/index.html`.
3. **PWA Service Worker Cache Governance**:
   - Whenever CSS, layout, or script changes are introduced to `public/index.html`, increment `CACHE_NAME` in `sw.js` (e.g. `elingu-cache-v2`).
   - Page navigation requests (`req.mode === 'navigate'` / `text/html`) MUST use **Network-First** to prevent serving stale cached HTML snapshots.
   - HTML endpoints in `server.js` must send `Cache-Control: no-store, no-cache, must-revalidate` to prevent aggressive browser disk caching.
