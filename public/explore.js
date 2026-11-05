/*
 * Explore-first (Save-My-Exams style): a visitor picks curriculum → level → subject and immediately sees a real lesson
 * and the topic roadmap. No account, no personal data, nothing is stored on the server and the AI tutor is not used.
 * An account is only asked for when they want to actually learn (open a lesson, chat, save progress).
 *
 * Everything shown comes from the public, database-driven /api/curriculum/* endpoints.
 */
(function () {
  'use strict';

  var LS_PREFERS_LOGIN = 'elingu_prefers_login';
  var state = { step: 'curriculum', curriculum: null, grade: null, subject: null, catalogue: null, map: null };
  var root = null;

  function esc(v) {
    return String(v === undefined || v === null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function hasSession() {
    try {
      return !!(sessionStorage.getItem('elingu_student_session') || localStorage.getItem('elingu_active_student'));
    } catch (e) { return false; }
  }

  function shouldAutoShow() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('auth') || params.get('explore') === '0') return false;
    if (hasSession()) return false;
    try { if (localStorage.getItem(LS_PREFERS_LOGIN) === '1' && params.get('explore') !== '1') return false; } catch (e) {}
    return true;
  }

  function api(path) {
    return fetch(path).then(function (r) { return r.json(); });
  }

  function steps(n) {
    var html = '<div class="xp-progress" aria-hidden="true">';
    for (var i = 1; i <= 4; i++) html += '<span class="' + (i <= n ? 'on' : '') + '"></span>';
    return html + '</div>';
  }

  function render(html, ctaVisible) {
    root.querySelector('#xpMain').innerHTML = html;
    root.querySelector('#xpCta').hidden = !ctaVisible;
    root.scrollTop = 0;
    var h = root.querySelector('.xp-title');
    if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (e) { h.focus(); } }
  }

  function chooseCurriculum() {
    state.step = 'curriculum';
    render(steps(1) +
      '<h1 class="xp-title">What do you study?</h1>' +
      '<p class="xp-sub">Pick one to see your topics. No sign-up needed.</p>' +
      '<div class="xp-cards two">' +
        '<button class="xp-card" data-curr="CBC"><span class="big" aria-hidden="true">🇰🇪</span><span><strong>Kenyan CBC</strong><small>Grades 6 to 12, KICD curriculum</small></span></button>' +
        '<button class="xp-card" data-curr="BRITISH"><span class="big" aria-hidden="true">🇬🇧</span><span><strong>Cambridge IGCSE</strong><small>Checkpoint and IGCSE, Years 7 to 11</small></span></button>' +
      '</div>', false);
  }

  function chooseLevel() {
    state.step = 'level';
    render(steps(2) + '<button class="xp-back" data-act="back">← Back</button>' +
      '<h1 class="xp-title">Which ' + (state.curriculum === 'BRITISH' ? 'year' : 'grade') + ' are you in?</h1>' +
      '<div id="xpList"><div class="xp-skeleton"></div><div class="xp-skeleton"></div></div>', false);
    api('/api/curriculum/catalogue?curriculum=' + encodeURIComponent(state.curriculum)).then(function (d) {
      var list = root.querySelector('#xpList');
      if (!list || !d || !d.success) { if (list) list.innerHTML = '<p class="xp-note">We could not load the list. Check your connection and try again.</p>'; return; }
      state.catalogue = d;
      list.className = 'xp-chips';
      list.innerHTML = d.grades.map(function (g) {
        var label = (state.curriculum === 'BRITISH' ? 'Year ' : 'Grade ') + g.grade;
        return '<button class="xp-chip" data-grade="' + esc(g.grade) + '" title="' + esc(g.title) + '">' + esc(label) + '</button>';
      }).join('');
    }).catch(function () {
      var list = root.querySelector('#xpList');
      if (list) list.innerHTML = '<p class="xp-note">You seem to be offline. Connect and try again.</p>';
    });
  }

  function chooseSubject() {
    state.step = 'subject';
    render(steps(3) + '<button class="xp-back" data-act="back">← Back</button>' +
      '<h1 class="xp-title">Pick a subject</h1>' +
      '<div id="xpList"><div class="xp-skeleton"></div><div class="xp-skeleton"></div></div>', false);
    api('/api/curriculum/catalogue?curriculum=' + encodeURIComponent(state.curriculum) + '&grade=' + encodeURIComponent(state.grade)).then(function (d) {
      var list = root.querySelector('#xpList');
      if (!list) return;
      if (!d || !d.success || !d.subjects.length) { list.innerHTML = '<p class="xp-note">No subjects found for this level yet.</p>'; return; }
      list.className = 'xp-chips';
      list.innerHTML = d.subjects.map(function (s) {
        return '<button class="xp-chip" data-subject="' + esc(s.name) + '">' + esc(s.name) + '</button>';
      }).join('');
    }).catch(function () {
      var list = root.querySelector('#xpList');
      if (list) list.innerHTML = '<p class="xp-note">You seem to be offline. Connect and try again.</p>';
    });
  }

  function showRoadmap() {
    state.step = 'roadmap';
    render(steps(4) + '<button class="xp-back" data-act="back">← Back</button>' +
      '<h1 class="xp-title">' + esc(state.subject) + '</h1>' +
      '<p class="xp-sub">' + esc((state.curriculum === 'BRITISH' ? 'Year ' : 'Grade ') + state.grade) + ' · here is a taste of your first lesson.</p>' +
      '<div id="xpList"><div class="xp-skeleton"></div><div class="xp-skeleton"></div><div class="xp-skeleton"></div></div>', true);
    api('/api/curriculum/map?curriculum=' + encodeURIComponent(state.curriculum) + '&grade=' + encodeURIComponent(state.grade) + '&subject=' + encodeURIComponent(state.subject)).then(function (d) {
      var list = root.querySelector('#xpList');
      if (!list) return;
      var map = d && d.success && d.map;
      if (!map || !map.stations || !map.stations.length) { list.innerHTML = '<p class="xp-note">We are still building this subject. Try another one.</p>'; return; }
      state.map = map;
      var first = null;
      map.stations.some(function (st) { return (st.subtopics || []).some(function (sub) { if (sub.conceptPrimer) { first = sub; return true; } return false; }); });
      var html = '';
      if (first) {
        var p = first.conceptPrimer;
        html += '<div class="xp-lesson"><span class="xp-badge">FREE PREVIEW</span>' +
          '<h3>' + esc(p.title || first.title) + '</h3>' +
          (p.tagline ? '<p class="tag">' + esc(p.tagline) + '</p>' : '') +
          (p.body ? '<div class="body">' + esc(p.body) + '</div>' : '') + '</div>';
      }
      html += '<h2 style="font-size:18px;margin:6px 0 10px;color:#0D3A26">Your roadmap</h2>';
      html += map.stations.map(function (st) {
        return '<div class="xp-station"><h4>' + esc(st.icon || '') + ' ' + esc(st.title) + '</h4>' +
          (st.subtopics || []).map(function (sub) {
            return '<button class="xp-stop" data-stop="' + esc(sub.id) + '"><span aria-hidden="true">🔒</span><span>' + esc(sub.title) + '</span></button>';
          }).join('') + '</div>';
      }).join('');
      list.className = '';
      list.innerHTML = html;
    }).catch(function () {
      var list = root.querySelector('#xpList');
      if (list) list.innerHTML = '<p class="xp-note">You seem to be offline. Connect and try again.</p>';
    });
  }

  function openSheet() { root.querySelector('#xpSheet').hidden = false; var b = root.querySelector('#xpSheet .main'); if (b) b.focus(); }
  function closeSheet() { root.querySelector('#xpSheet').hidden = true; }

  function hide() { if (root) root.hidden = true; document.documentElement.style.overflow = ''; }

  function goToAuth(tab) {
    // Carry the visitor's choices into the sign-up form so they don't have to pick them twice.
    window.__exploreChoice = { curriculum: state.curriculum, grade: state.grade, subject: state.subject };
    hide();
    try { if (typeof dismissSplashScreen === 'function') dismissSplashScreen(); } catch (e) {}
    try { if (typeof setAuthTab === 'function') setAuthTab(tab); } catch (e) {}
    if (tab === 'signup') {
      try { if (state.curriculum && typeof selectSignUpCurriculum === 'function') selectSignUpCurriculum(state.curriculum); } catch (e) {}
    } else {
      try { localStorage.setItem(LS_PREFERS_LOGIN, '1'); } catch (e) {}
    }
  }

  function onClick(e) {
    var t = e.target.closest('button');
    if (!t || !root.contains(t)) return;
    if (t.dataset.curr) { state.curriculum = t.dataset.curr; chooseLevel(); return; }
    if (t.dataset.grade) { state.grade = t.dataset.grade; chooseSubject(); return; }
    if (t.dataset.subject) { state.subject = t.dataset.subject; showRoadmap(); return; }
    if (t.dataset.stop) { openSheet(); return; }
    var act = t.dataset.act;
    if (act === 'back') {
      if (state.step === 'level') chooseCurriculum();
      else if (state.step === 'subject') chooseLevel();
      else if (state.step === 'roadmap') chooseSubject();
    } else if (act === 'login') goToAuth('login');
    else if (act === 'signup') goToAuth('signup');
    else if (act === 'closeSheet') closeSheet();
  }

  function build() {
    root = document.createElement('div');
    root.id = 'exploreOverlay';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-label', 'Explore Elingu');
    root.hidden = true;
    root.innerHTML =
      '<div class="xp-bar"><span class="xp-brand">🌳 Elingu</span>' +
      (window.ElinguI18n ? window.ElinguI18n.switcher() : '') +
      '<button class="xp-login" data-act="login" type="button">I have an account</button></div>' +
      '<div class="xp-wrap" id="xpMain" aria-live="polite"></div>' +
      '<div class="xp-cta" id="xpCta" hidden><button type="button" data-act="signup">Start learning free →</button>' +
      '<small>A parent or guardian approves your account. <a href="/privacy" target="_blank" rel="noopener">Privacy notice</a></small></div>' +
      '<div class="xp-sheet" id="xpSheet" hidden role="alertdialog" aria-label="Create a free profile">' +
      '<h3>Ready to learn this?</h3>' +
      '<p class="xp-note" style="margin:0">Make a free profile with just a nickname and a PIN. Your parent or guardian approves it, then the lesson opens.</p>' +
      '<button class="main" type="button" data-act="signup">Make my free profile</button>' +
      '<button class="alt" type="button" data-act="closeSheet">Keep exploring</button></div>';
    document.body.appendChild(root);
    root.addEventListener('click', onClick);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root && !root.hidden) {
        var sheet = root.querySelector('#xpSheet');
        if (!sheet.hidden) closeSheet();
      }
    });
  }

  function show() {
    if (!root) build();
    root.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    try { if (typeof dismissSplashScreen === 'function') dismissSplashScreen(); } catch (e) {}
    if (state.step === 'curriculum' || !state.curriculum) chooseCurriculum();
  }

  window.ElinguExplore = { show: show, hide: hide };

  function init() {
    // A returning learner who explicitly chose "I have an account" can still get here with ?explore=1.
    if (shouldAutoShow()) show();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
