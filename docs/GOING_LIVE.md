# Going live: step by step

This is for the person who owns the Render account (you). Nothing here is done for you. Do the parts in order.

**Open the terminal in the inner project folder**, the one that contains `server.js` and `scripts/`: `D:Local DiskProjectsElinguelingu-starterelingu-starter`. Every command below is run from there (`cd elingu-starter` if you are one level up).

Where settings go: Render dashboard → your service → **Environment** → **Add Environment Variable** → Save. Render restarts the app after you save.
Your laptop's `.env` file is separate. It is only for running the app on your computer.

---

## 1. Turn on encryption of personal data

What it does: names, phone numbers, emails, chat messages and teacher ID numbers are stored scrambled. Someone who steals the database or a backup sees nonsense. Passwords and PINs are already one-way scrambled.

**The one rule:** if you lose the key, the data cannot be recovered. Keep two copies (a password manager, and a printed or offline copy).

### Steps

1. **Make a key.** On your computer, in the project folder:
   ```
   node scripts/encrypt_data.js --generate-key
   ```
   It prints a long string of 64 letters and numbers. Copy it. Save it in your password manager now, under the name `ELINGU_DATA_KEY`.

2. **Give the key to the live app first.** In Render → Environment add `ELINGU_DATA_KEY` = the key. Save, wait for the app to restart, and check you can still sign in as a parent and a teacher.
   - Why first: from now on the app can read both scrambled and normal data, and new data it saves is scrambled.
   - Optional safety: also add `ELINGU_REQUIRE_ENCRYPTION` = `true`. The app then refuses to start if the key is missing, instead of silently saving normal text.

3. **Pick a quiet time** (for example early morning). In Render, choose **Suspend** on the service so nobody can save anything while the old data is converted.

4. **Back up.** In the Neon dashboard, make a branch or backup of the database (or export it). This is your undo button.

5. **Convert the existing data.** On your computer, with the same key in your `.env` file (add the line `ELINGU_DATA_KEY=...`) and `DATABASE_URL` already there:
   ```
   node scripts/encrypt_data.js --apply --with-postgres
   ```
   What happens: it downloads the live copy into your local `data/` folder (replacing what is there), makes a plain backup folder, scrambles every personal field, checks that it can read it all back exactly, then uploads the scrambled version.
   If you want to look first, `node scripts/encrypt_data.js` (no `--apply`) only reports counts and changes nothing.

6. **Resume** the service in Render and check sign-in works for a parent, a teacher and a learner.

7. **Delete the plain backup folder** the script printed (`data/backup_pre_encrypt_...`). Until you do, the scrambling is pointless.

### Later: changing the key
Put the new key in `ELINGU_DATA_KEY` and the old one in `ELINGU_DATA_KEY_PREVIOUS`, then run `node scripts/encrypt_data.js --apply --with-postgres` again.

---

## 2. Settings the live app needs

Add each of these in Render → Environment.

| Setting | What to put | Why |
|---|---|---|
| `NODE_ENV` | `production` | Turns off test shortcuts and fake payment prompts. |
| `APP_BASE_URL` | `https://your-app-name.onrender.com` (or your own domain) | Used in the links inside emails and for the card-payment return. |
| `SESSION_SECRET` | A long random value. Make one with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` | Without it, every restart signs everyone out. |
| `STUDENT_TOKEN_SECRET`, `ADMIN_TOKEN_SECRET` | Two more random values made the same way | Separate signing keys. |
| `DATABASE_URL`, `DATABASE_SSL` | Already set (Neon). `DATABASE_SSL=true` | Keeps data across restarts. |
| `ELINGU_DATA_KEY` | See part 1 | Encryption. |

### Private pilot codes (replaces PILOT2026, TRIAL30 and the rest)
The built-in codes are public, so anyone who has seen them can use them. Set `ELINGU_PILOT_CODES` to a single line of JSON with your own codes:
```
{"KAMAU-7XQ2":{"type":"school","cohortName":"Kamau JSS Pilot","durationDays":60},"FAM-R4T9":{"type":"parent","cohortName":"Parent trial","durationDays":30}}
```
- `type` is `school` or `parent`. `durationDays` is how long the free access lasts.
- Make codes that cannot be guessed (letters and numbers mixed). Give each partner a different code.
- Once this setting exists, the old built-in codes stop working, so give your current pilot users their new codes first.
- A code works once per account.

### M-Pesa (Safaricom Daraja) for real money
1. In the Safaricom Daraja portal, move your app to **Go Live** (they review it and give you production credentials).
2. In Render set: `DARAJA_ENVIRONMENT` = `production`, `DARAJA_CONSUMER_KEY`, `DARAJA_CONSUMER_SECRET`, `DARAJA_BUSINESS_SHORTCODE`, `DARAJA_PASSKEY` (all from the live app), `DARAJA_CALLBACK_URL` = `https://your-app-name.onrender.com/api/payment/mpesa-callback`.
3. Add `DARAJA_CALLBACK_SECRET` = a random value (make one the same way as SESSION_SECRET). The app adds it to the callback address it gives Safaricom and rejects payment callbacks that do not carry it, so do not add it to `DARAJA_CALLBACK_URL` yourself.
4. Try one small real payment (for example the lowest plan) and check the plan switches on and the receipt email arrives.

### Cards (Paystack)
1. In the Paystack dashboard switch to **Live** and finish their business verification.
2. In Render set: `PAYSTACK_ENVIRONMENT` = `live`, `PAYSTACK_SECRET_KEY` = your live secret key (starts with `sk_live_`), `PAYSTACK_PUBLIC_KEY` = your live public key (`pk_live_`).
3. In Paystack → Settings → API Keys & Webhooks set the **Webhook URL** to `https://your-app-name.onrender.com/api/payment/paystack-webhook`.
4. Try one small real card payment.

### Emails (Friday digest, receipts, renewal reminders)
These stay **off** until you switch them on, so nothing is sent by accident:
- `ELINGU_NOTIFICATIONS` = `on` to turn the scheduled emails on.
- `ELINGU_EMAIL_DAILY_CAP` = the most emails the app may send in one day (default 40). The free Brevo plan allows 300 a day, and sign-up and password-reset emails share that allowance.
- Email sending itself uses your existing `BREVO_API_KEY` and `BREVO_SENDER_EMAIL`.

---

## 3. Practice papers (exams)

The papers are in the database now, not only in code. On the first start after this change the app copies the 17 built-in papers in.

- See them: `node scripts/exam_papers.js list`
- Fix or write a paper: `node scripts/exam_papers.js export <paper-id> > paper.json`, edit the JSON, then `node scripts/exam_papers.js import paper.json`. It is checked first (every sample answer must earn full marks, a blank must earn nothing, marks must add up) and refused with the reason if it fails. Add `--draft` to keep it hidden until you run `publish <paper-id>`.
- Hide a paper: `node scripts/exam_papers.js hide <paper-id>`.
- The scripts use whatever `DATABASE_URL` is in your `.env` (that is the **live** database). The running app picks up changes when it restarts, or when you call the admin reload endpoint (`POST /api/admin/exam-papers/reload`, admin sign-in needed).
- A paper you edit this way is never overwritten by the built-in copy.

## 4. Before you push to git

1. Stop any running dev server.
2. Run the checks:
   ```
   node tests/css_syntax_hygiene.test.js
   npm test
   node tests/e2e_pricing/run_all.js
   ```
3. Start the app (`npm start`) and click through: learner sign-up, a chat, a practice paper, the parent portal (Billing tab), the teacher portal, and switch to Kiswahili.
4. `git status` will list many new files (for example `piiGuard.js`, `weeklyCard.js`, `notificationService.js`, `public/i18n.js`, `exam_papers/`, the new tests). Add them all with `git add .` (the `.env` and `data/` folders are ignored and will not be added). A fresh clone will not start without them.
5. Never commit `.env`.
