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
