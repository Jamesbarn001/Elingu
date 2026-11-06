/*
 * Progress & play: XP/level/streak chips, celebrations, the "Me" panel (goal, badges, league), Brain Spark.
 * The browser only DISPLAYS progress. Every point is awarded by the server, for evidence of learning.
 */
(function () {
  'use strict';

  var S = null;            // latest summary from /api/gamification/me
  var lastFetch = 0;
  var pending = null;

  function esc(v) {
    return String(v === undefined || v === null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function api(method, url, body) {
    return fetch(url, { method: method, headers: body ? { 'Content-Type': 'application/json' } : {}, body: body ? JSON.stringify(body) : undefined })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { d._status = r.status; return d; }); });
  }
  function signedIn() { try { return !!sessionStorage.getItem('elingu_student_token'); } catch (e) { return false; } }
  function reduced() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }

  // ── summary, header chips ───────────────────────────────────
  function refresh(force) {
    if (!signedIn()) return Promise.resolve(null);
    if (!force && Date.now() - lastFetch < 15000 && S) return Promise.resolve(S);
    if (pending) return pending;
    lastFetch = Date.now();
    pending = api('GET', '/api/gamification/me').then(function (d) {
      pending = null;
      if (d && d.success) { S = d; updateChips(); markMastery(); }
      return S;
    }).catch(function () { pending = null; return S; });
    return pending;
  }

  function updateChips() {
    if (!S) return;
    var num = document.getElementById('headerPointsNum');
    var chip = num && num.closest('.header-stat-chip');
    if (num) num.textContent = S.xp;
    if (chip) {
      var lbl = chip.querySelector('.stat-lbl'); if (lbl) lbl.textContent = 'XP';
      chip.setAttribute('aria-label', 'Level ' + S.level.n + ', ' + S.xp + ' XP');
      chip.setAttribute('title', 'Level ' + S.level.n + ' ' + S.level.name + ' · ' + S.xp + ' XP. You earn XP for real learning.');
    }
    var st = document.getElementById('headerStreakNum');
    if (st) st.textContent = S.streak;
  }

  function markMastery() {
    if (!S) return;
    var set = {}; (S.mastered || []).forEach(function (id) { set[id] = true; });
    document.querySelectorAll('.metro-subtopic-stop[data-sub]').forEach(function (el) {
      var on = !!set[el.getAttribute('data-sub')];
      el.classList.toggle('mastered', on);
      if (on) { el.classList.add('completed'); var a = el.querySelector('.metro-stop-action'); if (a) a.textContent = 'Mastered ✓'; }
    });
  }
  function isMastered(id) { return !!(S && (S.mastered || []).indexOf(id) !== -1); }

  // ── celebrations ────────────────────────────────────────────
  function toastBox() {
    var b = document.getElementById('playToasts');
    if (!b) { b = document.createElement('div'); b.id = 'playToasts'; b.setAttribute('role', 'status'); b.setAttribute('aria-live', 'polite'); document.body.appendChild(b); }
    return b;
  }
  function toast(html, big) {
    var t = document.createElement('div');
    t.className = 'play-toast' + (big ? ' big' : '');
    t.innerHTML = html;
    toastBox().appendChild(t);
    setTimeout(function () { t.remove(); }, big ? 5200 : 3400);
  }
  function confetti() {
    if (reduced()) return;
    var box = document.createElement('div'); box.className = 'play-confetti';
    var bits = ['🎉', '⭐', '✨', '🌟', '🎊'];
    for (var i = 0; i < 22; i++) {
      var s = document.createElement('span');
      s.textContent = bits[i % bits.length];
      s.style.left = (Math.random() * 100) + 'vw';
      s.style.animationDelay = (Math.random() * 0.6) + 's';
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 3500);
  }
  /** c = { awarded, levelUp, newBadges } from any server response */
  function celebrate(c) {
    if (!c) { refresh(true); return; }
    if (c.awarded) toast('⭐ +' + esc(c.awarded) + ' XP');
    if (c.levelUp) { toast('🎉 Level ' + esc(c.levelUp.to) + '<small>' + esc(c.levelUp.name) + '</small>', true); confetti(); }
    (c.newBadges || []).forEach(function (b) { toast(esc(b.icon) + ' New badge: ' + esc(b.name), true); confetti(); });
    refresh(true).then(function () { var m = document.getElementById('playMe'); if (m && m.isConnected) renderMe(m.parentNode); });
  }

  // ── Me panel ────────────────────────────────────────────────
  function renderMe(el) {
    if (!el) return;
    el.innerHTML = '<div class="play-wrap" id="playMe"><p class="play-mute">Loading your progress…</p></div>';
    Promise.all([refresh(true), api('GET', '/api/gamification/league')]).then(function (r) {
      var s = r[0], lg = r[1];
      var box = el.querySelector('#playMe'); if (!box) return;
      if (!s) { box.innerHTML = '<div class="play-card">Sign in to see your progress.</div>'; return; }
      var pct = s.level.xpForNext ? Math.min(100, Math.round(s.level.xpIntoLevel / s.level.xpForNext * 100)) : 100;
      var goalPct = Math.round(s.dailyGoal.done / s.dailyGoal.target * 100);
      var h = '<div class="play-card"><div class="play-row"><div style="font-size:42px" aria-hidden="true">' + (typeof activeStudent !== 'undefined' && activeStudent && activeStudent.avatar ? esc(activeStudent.avatar) : '🦁') + '</div>' +
        '<div style="flex:1;min-width:200px"><h3 style="margin:0">Level ' + esc(s.level.n) + ' · ' + esc(s.level.name) + '</h3>' +
        '<div class="play-bar" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + pct + '%"></i></div>' +
        '<div class="play-mute">' + esc(s.xp) + ' XP' + (s.level.nextName ? ' · ' + esc(s.level.xpForNext - s.level.xpIntoLevel) + ' XP to ' + esc(s.level.nextName) : ' · top level!') + '</div></div></div></div>';
      h += '<div class="play-card play-row"><div class="play-ring" style="--p:' + goalPct + '"><b>' + esc(s.dailyGoal.done) + '</b><small>of ' + esc(s.dailyGoal.target) + ' XP</small></div>' +
        '<div style="flex:1;min-width:200px"><h3 style="margin:0 0 4px">Today\'s goal</h3><div class="play-mute">' + (s.dailyGoal.met ? 'Goal reached! Everything now is a bonus. 🎉' : 'Do a Brain Spark, a practice paper or explain a concept to fill your ring.') + '</div>' +
        '<div class="play-mute" style="margin-top:6px">Just trying counts too: up to ' + esc(s.effortToday.cap) + ' XP a day (used ' + esc(s.effortToday.used) + ').</div></div></div>';
      h += '<div class="play-card play-row"><div style="font-size:40px" aria-hidden="true">🔥</div><div style="flex:1;min-width:200px"><h3 style="margin:0">' + esc(s.streak) + '-day streak</h3>' +
        '<div class="play-mute">❄️ Streak freezes: <b>' + esc(s.freezes) + '</b>. A freeze forgives one missed day. You earn one every 7 days in a row (keep up to 2).</div></div></div>';
      h += '<div class="play-card"><h3>Badges</h3><div class="play-badges">' + s.badges.map(function (b) {
        return '<div class="play-badge' + (b.earned ? '' : ' locked') + '" title="' + esc(b.how) + '"><span class="i" aria-hidden="true">' + esc(b.icon) + '</span><b>' + esc(b.name) + '</b><small>' + (b.earned ? 'Earned' : esc(b.how)) + '</small></div>';
      }).join('') + '</div></div>';
      h += '<div class="play-card"><h3>Class league</h3>' + leagueHtml(lg) + '</div>';
      h += '<div class="play-card"><h3>Language</h3>' + (window.ElinguI18n ? window.ElinguI18n.switcher() : '') + '</div>';
      h += '<div class="play-card"><h3>Save lessons for offline</h3><p class="play-mute">Download the concept lessons for your subjects while you have data or Wi-Fi, so you can read them later with no connection. The AI tutor, practice-paper marking and Brain Spark always need the internet.</p>' +
        '<button class="play-btn" data-p="offline" id="playOfflineBtn">Save my lessons</button> <span class="play-mute" id="playOfflineStatus" role="status"></span></div>';
      var lm = window.ElinguLite ? window.ElinguLite.mode() : 'auto';
      h += '<div class="play-card"><h3>Data saver (lite mode)</h3><p class="play-mute">Uses fewer animations and less data, which helps on slow networks and older phones. Auto turns it on when your phone or connection needs it' + (window.ElinguLite && window.ElinguLite.isOn() ? ' (it is on right now)' : '') + '.</p>' +
        '<div class="play-seg" role="group" aria-label="Data saver">' + ['auto', 'on', 'off'].map(function (m) { return '<button type="button" data-lite="' + m + '" aria-pressed="' + (lm === m) + '">' + (m === 'auto' ? 'Auto' : (m === 'on' ? 'On' : 'Off')) + '</button>'; }).join('') + '</div></div>';
      h += '<div class="play-card play-row"><button class="play-btn alt" data-p="settings">Account and settings</button><span class="play-mute">XP is only earned for real learning: marked papers, correct mission answers, concepts you explain, and Brain Spark.</span></div></div>';
      box.innerHTML = h;
      box.onclick = function (e) {
        var lt = e.target.closest('[data-lite]');
        if (lt && window.ElinguLite) { window.ElinguLite.set(lt.getAttribute('data-lite')); renderMe(el); return; }
        var t = e.target.closest('[data-p]'); if (!t) return;
        var a = t.getAttribute('data-p');
        if (a === 'offline') { saveOffline(); return; }
        if (a === 'settings' && typeof openStudentModal === 'function') openStudentModal();
        else if (a === 'join' || a === 'leave') api('POST', '/api/gamification/league', { optIn: a === 'join' }).then(function () { renderMe(el); });
      };
    });
  }

  function leagueHtml(lg) {
    if (!lg || !lg.success) return '<p class="play-mute">The league is not available right now.</p>';
    if (!lg.available) return '<p class="play-mute">' + esc(lg.reason) + '</p>';
    if (!lg.optedIn) return '<p class="play-mute">Compete with your classmates for the most XP this week. Only your nickname and avatar are shown, and you can leave any time.</p><button class="play-btn" data-p="join">Join my class league</button>';
    var rows = (lg.board || []).map(function (r) {
      return '<tr class="' + (r.me ? 'me' : '') + '"><td>' + esc(r.rank) + '</td><td>' + esc(r.avatar) + ' ' + esc(r.handle) + (r.me ? ' (you)' : '') + '</td><td style="text-align:right">' + esc(r.xp) + ' XP</td></tr>';
    }).join('');
    return '<p class="play-mute">This week · ' + esc(lg.participants) + ' classmate' + (lg.participants === 1 ? '' : 's') + ' in the league · your rank: <b>' + esc(lg.myRank || '-') + '</b></p>' +
      '<table class="play-table" aria-label="Weekly class league">' + rows + '</table><p style="margin-top:10px"><button class="play-btn alt" data-p="leave">Leave the league</button></p>';
  }

  // ── Brain Spark ─────────────────────────────────────────────
  function renderSpark(el) {
    if (!el) return;
    if (!signedIn()) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="play-card spark"><p class="play-mute">Loading today\'s Brain Spark…</p></div>';
    api('GET', '/api/gamification/spark').then(function (d) {
      if (!d.success || !d.total) { el.innerHTML = ''; return; }
      draw(el, d);
    });
  }

  function draw(el, d) {
    var answeredN = Object.keys(d.answered).length;
    var dots = '<div class="spark-dots" aria-hidden="true">' + d.questions.map(function (q) { var a = d.answered[q.index]; return '<i class="' + (a ? (a.correct ? 'ok' : 'no') : '') + '"></i>'; }).join('') + '</div>';
    var head = '<div class="play-card spark"><div class="play-row" style="justify-content:space-between"><h3 style="margin:0">⚡ Brain Spark</h3><span class="play-mute">3 quick questions · ' + esc(answeredN) + '/' + esc(d.total) + '</span></div>' + dots;
    if (d.complete) {
      el.innerHTML = head + '<p style="margin:6px 0"><b>' + esc(d.right) + ' of ' + esc(d.total) + ' correct today.</b> ' + (d.right === d.total ? 'Perfect! 🎉' : 'Nice effort: come back tomorrow for three new ones.') + '</p></div>';
      return;
    }
    var q = d.questions.filter(function (x) { return !d.answered[x.index]; })[0];
    var h = head + '<div class="play-mute">' + esc(q.subject) + ' · ' + esc(q.topic) + '</div><p style="font-size:16px;margin:6px 0;white-space:pre-wrap">' + esc(q.stem) + '</p><div role="group" aria-label="Answers">' +
      q.options.map(function (o, i) { var L = 'ABCD'.charAt(i); return '<button class="spark-opt" data-c="' + L + '"><b>' + L + '</b><span>' + esc(o) + '</span></button>'; }).join('') + '</div></div>';
    el.innerHTML = h;
    el.onclick = function (e) {
      var b = e.target.closest('[data-c]'); if (!b) return;
      el.querySelectorAll('[data-c]').forEach(function (x) { x.disabled = true; });
      api('POST', '/api/gamification/spark/answer', { index: q.index, choice: b.getAttribute('data-c') }).then(function (r) {
        if (!r.success) { renderSpark(el); return; }
        b.classList.add(r.correct ? 'right' : 'wrong');
        if (!r.correct) { var good = el.querySelector('[data-c="' + r.correctAnswer + '"]'); if (good) good.classList.add('right'); }
        var fb = document.createElement('div');
        fb.setAttribute('role', 'status');
        fb.innerHTML = '<p style="margin:8px 0"><b>' + (r.correct ? 'Correct! ✅' : 'Not quite.') + '</b> ' + esc(r.explanation || '') + '</p><button class="play-btn" data-n="1">Next</button>';
        el.querySelector('.spark').appendChild(fb);
        celebrate(r.celebrate);
        fb.querySelector('[data-n]').onclick = function () { api('GET', '/api/gamification/spark').then(function (d2) { draw(el, d2); }); };
      });
    };
  }

  // ── Save lessons for offline: fetching them through the page lets the service worker keep a copy ──
  function saveOffline() {
    var btn = document.getElementById('playOfflineBtn'), out = document.getElementById('playOfflineStatus');
    var st = (typeof activeStudent !== 'undefined' && activeStudent) ? activeStudent : null;
    if (!st) return;
    var curriculum = (st.curriculum === 'BRITISH' || st.schoolLevel === 'IGCSE' || st.schoolLevel === 'CHECKPOINT') ? 'BRITISH' : 'CBC';
    var grade = st.grade || st.yearGroup || (curriculum === 'BRITISH' ? 10 : 8);
    var subjects = (st.selectedSubjects || st.quests || []).slice(0, 8);
    if (!subjects.length) { if (out) out.textContent = 'Choose your subjects first.'; return; }
    if (!navigator.onLine) { if (out) out.textContent = 'You are offline. Connect first.'; return; }
    if (btn) btn.disabled = true;
    var done = 0, total = 0, failed = 0;
    function say(t) { if (out) out.textContent = t; }
    function get(url) { return fetch(url).then(function (r) { return r.ok ? r.json() : Promise.reject(); }); }
    function pool(items, n, worker) {
      var i = 0;
      function next() { if (i >= items.length) return Promise.resolve(); var it = items[i++]; return worker(it).then(next, next); }
      return Promise.all(new Array(Math.min(n, items.length)).fill(0).map(next));
    }
    say('Saving…');
    get('/api/curriculum/catalogue?curriculum=' + encodeURIComponent(curriculum) + '&grade=' + encodeURIComponent(grade)).catch(function () {})
      .then(function () { return get('/api/exams/papers?curriculum=' + encodeURIComponent(curriculum) + '&grade=' + encodeURIComponent(grade)).catch(function () {}); })
      .then(function () {
        return Promise.all(subjects.map(function (subj) {
          return get('/api/curriculum/map?curriculum=' + curriculum + '&grade=' + encodeURIComponent(grade) + '&subject=' + encodeURIComponent(subj)).then(function (d) {
            var ids = [];
            ((d.map && d.map.stations) || []).forEach(function (stn) { (stn.subtopics || []).forEach(function (sub) { ids.push(sub.id); }); });
            total += ids.length;
            return pool(ids, 3, function (id) {
              return get('/api/curriculum/subtopic/' + encodeURIComponent(id)).then(function () { done++; say('Saved ' + done + ' of ' + total + ' lessons…'); }, function () { failed++; });
            });
          }).catch(function () { failed++; });
        }));
      }).then(function () {
        say('Saved ' + done + ' lesson' + (done === 1 ? '' : 's') + ' for offline' + (failed ? ' (' + failed + ' could not be saved: try again with a better connection)' : '') + '.');
        if (btn) btn.disabled = false;
      });
  }

  // ── keyboard access for clickable non-buttons (the app has many <div onclick>) ──
  function makeFocusable(root) {
    (root || document).querySelectorAll('[onclick]:not(button):not(a):not(input):not(select):not(textarea):not(summary):not([role])').forEach(function (el) {
      el.setAttribute('role', 'button');
      if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    });
  }
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.getAttribute && e.target.getAttribute('role') === 'button' && e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
      e.preventDefault(); e.target.click();
    }
  });

  // ── "Make it yours": a few skippable questions, asked one at a time after a learner who used the short sign-up is approved ──
  var COUNTIES = ['Nairobi', 'Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita Taveta', 'Garissa', 'Wajir', 'Mandera', 'Marsabit', 'Isiolo', 'Meru', 'Tharaka-Nithi', 'Embu', 'Kitui', 'Machakos', 'Makueni', 'Nyandarua', 'Nyeri', 'Kirinyaga', "Murang'a", 'Kiambu', 'Turkana', 'West Pokot', 'Samburu', 'Trans Nzoia', 'Uasin Gishu', 'Elgeyo Marakwet', 'Nandi', 'Baringo', 'Laikipia', 'Nakuru', 'Narok', 'Kajiado', 'Kericho', 'Bomet', 'Kakamega', 'Vihiga', 'Bungoma', 'Busia', 'Siaya', 'Kisumu', 'Homa Bay', 'Migori', 'Kisii', 'Nyamira'];
  var setup = { open: false, step: 0, county: null };
  function currentStudent() { return (typeof activeStudent !== 'undefined' && activeStudent) ? activeStudent : null; }
  function setupNeeded() {
    var s = currentStudent();
    var overlay = document.getElementById('figmaAuthOverlay');
    var authShown = overlay && getComputedStyle(overlay).display !== 'none';
    return !!(s && s.needsProfileSetup === true && signedIn() && !authShown && !setup.open);
  }
  function setupSteps(s) {
    var steps = [];
    if (!(s.curriculum === 'BRITISH' || s.schoolLevel === 'IGCSE' || s.schoolLevel === 'CHECKPOINT')) {
      steps.push({ id: 'county', q: 'Which county are you in?', why: 'So examples can use places you know.' });
      steps.push({ id: 'code', q: 'Did your teacher give you a class code?', why: 'It links your learning to your class. You can skip this.' });
    }
    return steps;
  }
  function closeSetup() { var b = document.getElementById('playSetup'); if (b) b.remove(); setup.open = false; }
  function finishSetup(s, extra) {
    var body = Object.assign({ studentId: s.id, profileSetupDone: true }, extra || {});
    api('PUT', '/api/students/profile', body).then(function (r) {
      if (r && r.success && r.student) {
        try { Object.assign(s, { needsProfileSetup: false, county: r.student.county || s.county }); localStorage.setItem('elingu_active_student', JSON.stringify(s)); } catch (e) {}
      } else { s.needsProfileSetup = false; }
    }).catch(function () { s.needsProfileSetup = false; });
    closeSetup();
  }
  function renderSetup() {
    var s = currentStudent(); if (!s) return closeSetup();
    var steps = setupSteps(s);
    if (setup.step >= steps.length) { finishSetup(s, setup.county ? { county: setup.county } : null); return; }
    var st = steps[setup.step], box = document.getElementById('playSetup');
    if (!box) { box = document.createElement('div'); box.id = 'playSetup'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Make it yours'); document.body.appendChild(box); }
    var field = st.id === 'county'
      ? '<select id="playSetupField" aria-label="County">' + COUNTIES.map(function (c) { return '<option' + (c === (s.county || 'Nairobi') ? ' selected' : '') + '>' + esc(c) + '</option>'; }).join('') + '</select>'
      : '<input id="playSetupField" type="text" maxlength="20" placeholder="e.g. KUJ-8E" autocapitalize="characters" aria-label="Class code">';
    box.innerHTML = '<div class="play-setup-card"><div class="play-mute">Make it yours · ' + (setup.step + 1) + ' of ' + steps.length + '</div>' +
      '<div class="play-bar" aria-hidden="true"><i style="width:' + Math.round((setup.step + 1) / steps.length * 100) + '%"></i></div>' +
      '<h3 style="margin:8px 0 2px">' + esc(st.q) + '</h3><p class="play-mute" style="margin:0 0 10px">' + esc(st.why) + '</p>' + field +
      '<div id="playSetupMsg" class="play-mute" role="status"></div>' +
      '<div class="play-row" style="margin-top:12px"><button class="play-btn alt" type="button" data-su="skip">Skip</button><button class="play-btn" type="button" data-su="next">' + (setup.step + 1 === steps.length ? 'Done' : 'Next') + '</button></div></div>';
    box.onclick = function (e) {
      var b = e.target.closest('[data-su]'); if (!b) return;
      var v = (document.getElementById('playSetupField') || {}).value || '';
      var advance = function () { setup.step++; renderSetup(); };
      if (b.getAttribute('data-su') === 'skip') { advance(); return; }
      if (st.id === 'county') { setup.county = v; advance(); return; }
      if (!v.trim()) { advance(); return; }
      api('POST', '/api/students/join-stream', { studentId: s.id, joinCode: v.trim().toUpperCase() }).then(function (r) {
        if (r && r.success) advance();
        else { var m = document.getElementById('playSetupMsg'); if (m) m.textContent = (r && r.error) || 'That code did not work. Check it, or skip.'; }
      });
    };
  }
  function maybeProfileSetup() {
    if (!setupNeeded()) return;
    setup.open = true; setup.step = 0; setup.county = null;
    renderSetup();
  }

  // ── My Subjects dropdown under Brain Deck (remembers whether it was open) ──
  var Sidebar = (function () {
    var KEY = 'elingu_subjects_open';
    function nav() { return document.querySelector('.sidebar-nav'); }
    function isOpen() { var n = nav(); return !!n && !n.classList.contains('subjects-collapsed'); }
    function apply(open, remember) {
      var n = nav(); if (!n) return;
      n.classList.toggle('subjects-collapsed', !open);
      var b = document.getElementById('deckChevron'); if (b) b.setAttribute('aria-expanded', String(open));
      var t = document.getElementById('sidebarSubjectsTitle'); if (t) t.setAttribute('aria-expanded', String(open));
      if (remember) { try { localStorage.setItem(KEY, open ? '1' : '0'); } catch (e) {} }
    }
    function init() {
      var saved = null; try { saved = localStorage.getItem(KEY); } catch (e) {}
      apply(saved !== '0', false);
      var chev = document.getElementById('deckChevron');
      if (chev) chev.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); apply(!isOpen(), true); });
      var title = document.getElementById('sidebarSubjectsTitle');
      if (title) {
        title.addEventListener('click', function () { apply(!isOpen(), true); });
        title.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); apply(!isOpen(), true); } });
      }
    }
    return { init: init, openSubjects: function () { apply(true, true); }, isOpen: isOpen };
  })();
  window.ElinguSidebar = Sidebar;

  function init() {
    Sidebar.init();
    setInterval(maybeProfileSetup, 6000);   // cheap check: only does anything for a learner who still has the "make it yours" questions to answer
    var log = document.getElementById('log');
    if (log) { log.setAttribute('role', 'log'); log.setAttribute('aria-live', 'polite'); log.setAttribute('aria-relevant', 'additions'); }
    makeFocusable(document);
    var timer = null;
    new MutationObserver(function () {
      if (timer) return;
      timer = setTimeout(function () { timer = null; makeFocusable(document); markMastery(); }, 250);
    }).observe(document.body, { childList: true, subtree: true });
    if (signedIn()) refresh(true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();

  window.ElinguPlay = { refresh: refresh, celebrate: celebrate, renderMe: renderMe, renderSpark: renderSpark, isMastered: isMastered, hasSummary: function () { return !!S; }, summary: function () { return S; } };
})();
