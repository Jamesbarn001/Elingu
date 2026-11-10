/*
 * Practice exams — paper hub, timed paper, results.
 *
 * The server owns the clock and the answers: this file only shows a countdown, saves answers as the learner goes,
 * and displays the result (with the mark scheme) after the paper is submitted. Nothing here can reveal answers early.
 */
(function () {
  'use strict';

  var root = null;          // the element we render into
  var ctx = { curriculum: 'CBC', grade: 8, subject: null };
  var hub = { subjects: [], papers: [], attempts: [], subject: null };
  var run = null;           // the paper being sat: { attemptId, paper, answers, flagged, pos, endsAt, skew, timer, dirty, saving }

  function esc(v) {
    return String(v === undefined || v === null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function $(sel, el) { return (el || root).querySelector(sel); }
  // Icon from the self-hosted sprite; icons.js loads later, so look it up at render time and fall back to nothing.
  function ic(name, cls) { return window.ico ? window.ico(name, cls || 'i-sm') + ' ' : ''; }

  function api(method, url, body) {
    return fetch(url, {
      method: method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (d) { d._status = r.status; return d; });
    });
  }

  function say(msg) {
    var live = document.getElementById('exLive');
    if (!live) { live = document.createElement('div'); live.id = 'exLive'; live.setAttribute('aria-live', 'polite'); live.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden'; document.body.appendChild(live); }
    live.textContent = msg;
  }

  // ───────────────────────── hub ─────────────────────────
  function mount(el, opts) {
    root = el;
    opts = opts || {};
    ctx.curriculum = (opts.curriculum || 'CBC').toUpperCase() === 'BRITISH' ? 'BRITISH' : 'CBC';
    ctx.grade = Number(opts.grade) || (ctx.curriculum === 'BRITISH' ? 10 : 8);
    ctx.preferred = opts.subject || null;
    if (run && run.attemptId) { renderExam(); return; }   // coming back to the tab mid-paper
    loadHub();
  }

  function loadHub() {
    root.innerHTML = '<div class="ex-root"><h2>Practice exams</h2><p class="ex-sub">Loading papers…</p></div>';
    Promise.all([
      api('GET', '/api/exams/papers?curriculum=' + encodeURIComponent(ctx.curriculum) + '&grade=' + encodeURIComponent(ctx.grade)),
      api('GET', '/api/exams/attempts')
    ]).then(function (res) {
      var list = res[0], hist = res[1];
      hub.papers = list.papers || [];
      hub.subjects = list.subjects || [];
      hub.attempts = hist.success ? (hist.attempts || []) : [];
      hub.needsAuth = hist._status === 401 || hist._status === 403;
      if (!hub.subject || hub.subjects.indexOf(hub.subject) === -1) {
        var pref = ctx.preferred && hub.subjects.filter(function (s) { return s.toLowerCase() === String(ctx.preferred).toLowerCase(); })[0];
        hub.subject = pref || hub.subjects[0] || null;
      }
      renderHub();
    }).catch(function () {
      root.innerHTML = '<div class="ex-root"><h2>Practice exams</h2><p class="ex-sub">We could not load the papers. Check your connection and try again.</p><button class="ex-btn" data-ex="reload">Try again</button></div>';
      root.onclick = function (e) { if (e.target.closest('[data-ex="reload"]')) loadHub(); };
    });
  }

  function attemptFor(paperId) {
    return hub.attempts.filter(function (a) { return a.paperId === paperId; });
  }

  function renderHub() {
    var h = '<div class="ex-root"><h2>Practice exams</h2>' +
      '<p class="ex-sub">Sit a full timed paper, then see your marks, your weakest topics and the mark scheme. Questions are Elingu originals written in the style of your exam board.</p>';
    if (hub.needsAuth) h += '<div class="ex-warn">Sign in (and ask your parent to approve your account) to sit a paper and save your results.</div>';
    if (!hub.papers.length) {
      h += '<div class="ex-card">No papers for this level yet. More are on the way.</div></div>';
      root.innerHTML = h; bindHub(); return;
    }
    h += '<div class="ex-chips" role="group" aria-label="Subject">' + hub.subjects.map(function (s) {
      return '<button class="ex-chip" data-ex="subject" data-s="' + esc(s) + '" aria-pressed="' + (s === hub.subject) + '">' + esc(s) + '</button>';
    }).join('') + '</div>';
    hub.papers.filter(function (p) { return p.subject === hub.subject; }).forEach(function (p) {
      var tries = attemptFor(p.id);
      var open = tries.filter(function (a) { return a.status === 'in_progress'; })[0];
      var done = tries.filter(function (a) { return a.status === 'submitted'; });
      h += '<div class="ex-card"><h3>' + esc(p.title) + '</h3>' +
        '<div class="ex-meta"><span>' + ic('timer') + esc(p.durationMinutes) + ' minutes</span><span>' + ic('file-pen-line') + esc(p.totalMarks) + ' marks</span><span>' + ic('circle-help') + esc(p.questionCount) + ' questions</span>' +
        '<span>' + (p.calculatorAllowed ? ic('calculator') + 'Calculator allowed' : ic('calculator', 'i-sm i-off') + 'No calculator') + '</span></div>' +
        '<div class="ex-note" style="margin-bottom:10px">' + esc(p.series) + '</div>' +
        '<button class="ex-btn" data-ex="start" data-id="' + esc(p.id) + '">' + (open ? 'Resume paper' : (done.length ? 'Sit it again' : 'Start paper')) + '</button>';
      if (done.length) {
        h += '<div style="margin-top:12px"><div class="ex-note"><b>Your attempts</b></div>' + done.slice(0, 5).map(function (a) {
          return '<div class="ex-hist"><span>' + esc(new Date(a.submittedAt).toLocaleDateString()) + ' · <b>' + esc(a.score) + '/' + esc(a.total) + '</b> (' + esc(a.percentage) + '%) · ' + esc(a.band) + '</span>' +
            '<button class="ex-link" data-ex="result" data-a="' + esc(a.id) + '">View result</button></div>';
        }).join('') + '</div>';
      }
      h += '</div>';
    });
    h += '<p class="ex-note">Grades and bands shown are <b>indicative</b> only. Real boards set their own boundaries for each exam series.</p></div>';
    root.innerHTML = h;
    bindHub();
  }

  function bindHub() {
    root.onclick = function (e) {
      var t = e.target.closest('[data-ex]');
      if (!t) return;
      var act = t.getAttribute('data-ex');
      if (act === 'subject') { hub.subject = t.getAttribute('data-s'); renderHub(); }
      else if (act === 'start') showPrestart(t.getAttribute('data-id'));
      else if (act === 'result') openResult(t.getAttribute('data-a'));
    };
  }

  // ───────────────────────── before the paper ─────────────────────────
  function showPrestart(paperId) {
    var p = hub.papers.filter(function (x) { return x.id === paperId; })[0];
    if (!p) return;
    var resume = attemptFor(paperId).filter(function (a) { return a.status === 'in_progress'; })[0];
    root.innerHTML = '<div class="ex-root"><button class="ex-link" data-ex="back">← Back to papers</button>' +
      '<h2>' + esc(p.title) + '</h2>' +
      '<div class="ex-meta"><span>' + ic('timer') + esc(p.durationMinutes) + ' minutes</span><span>' + ic('file-pen-line') + esc(p.totalMarks) + ' marks</span><span>' + ic('circle-help') + esc(p.questionCount) + ' questions</span></div>' +
      '<div class="ex-card"><h3>Before you start</h3><ul style="margin:6px 0 0 18px;padding:0;line-height:1.7">' +
      '<li>The clock starts when you press Start and <b>keeps running even if you close the page</b>.</li>' +
      '<li>Your answers are saved as you go. When time is up, your paper is handed in for you.</li>' +
      '<li>You will see the mark scheme and explanations <b>after</b> you submit, not before.</li>' +
      '<li>' + (p.calculatorAllowed ? 'You may use a calculator.' : 'No calculator: work it out on paper or in the working box.') + '</li>' +
      '<li>Find a quiet place and have rough paper ready.</li></ul></div>' +
      '<button class="ex-btn" data-ex="go" data-id="' + esc(p.id) + '">' + (resume ? 'Resume paper' : 'Start the clock') + '</button></div>';
    root.onclick = function (e) {
      var t = e.target.closest('[data-ex]');
      if (!t) return;
      if (t.getAttribute('data-ex') === 'back') renderHub();
      if (t.getAttribute('data-ex') === 'go') startAttempt(t.getAttribute('data-id'), t);
    };
  }

  function startAttempt(paperId, btn) {
    if (btn) { btn.disabled = true; btn.textContent = 'Starting…'; }
    api('POST', '/api/exams/attempts', { paperId: paperId }).then(function (d) {
      if (!d.success) {
        var msg = d._status === 401 ? 'Please sign in to sit a paper.' : (d._status === 403 ? (d.error || 'You cannot sit this paper right now.') : (d.error || 'Could not start the paper.'));
        root.innerHTML = '<div class="ex-root"><div class="ex-warn">' + esc(msg) + '</div><button class="ex-btn alt" data-ex="back">Back</button></div>';
        root.onclick = function () { loadHub(); };
        return;
      }
      run = {
        attemptId: d.attemptId, paper: d.paper, answers: d.answers || {}, flagged: d.flagged || [], pos: d.position || 0,
        endsAt: new Date(d.endsAt).getTime(), skew: new Date(d.serverNow).getTime() - Date.now(), timer: null, dirty: false, saving: false, submitting: false,
        paletteOpen: false, said: {}
      };
      renderExam();
    });
  }

  // ───────────────────────── the paper ─────────────────────────
  function remainingMs() { return run.endsAt - (Date.now() + run.skew); }
  function fmt(ms) {
    var s = Math.max(0, Math.floor(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    return (h ? h + ':' + String(m).padStart(2, '0') : String(m)) + ':' + String(sec).padStart(2, '0');
  }
  function answered(q) { var a = run.answers[q.id]; return !!(a && String(a.answer || '').trim()); }

  function renderExam() {
    var p = run.paper, q = p.questions[run.pos];
    var a = run.answers[q.id] || { answer: '', working: '' };
    var secInfo = (p.sectionInfo || []).filter(function (s) { return s.title === q.section; })[0];
    var showSec = run.pos === 0 || p.questions[run.pos - 1].section !== q.section;
    var h = '<div class="ex-root">' +
      '<div class="ex-bar"><span class="t">' + esc(p.title) + '</span><span class="ex-saved" id="exSaved"></span>' +
      '<span class="ex-clock" id="exClock" role="timer" aria-label="Time left">' + fmt(remainingMs()) + '</span></div>' +
      '<div class="ex-body"><div class="ex-q">' +
      (q.section ? '<div class="ex-sec">' + esc(q.section) + '</div>' : '') +
      (showSec && secInfo && secInfo.instructions ? '<div class="ex-note" style="margin-bottom:8px">' + esc(secInfo.instructions) + '</div>' : '') +
      (run.pos === 0 && p.instructions ? '<div class="ex-note" style="margin-bottom:10px">' + esc(p.instructions) + '</div>' : '') +
      '<div class="ex-qhead"><span><b>Question ' + esc(q.number) + '</b> of ' + p.questions.length + ' · ' + esc(q.topic) + '</span><span>[' + esc(q.marks) + ' mark' + (q.marks > 1 ? 's' : '') + ']</span></div>' +
      (q.context ? '<div class="ex-ctx" tabindex="0" aria-label="Reading passage">' + esc(q.context) + '</div>' : '') +
      '<div class="ex-stem">' + esc(q.stem) + '</div>';

    if (q.type === 'mcq') {
      h += '<div role="radiogroup" aria-label="Choose one answer">' + q.options.map(function (o, i) {
        var L = 'ABCD'.charAt(i);
        return '<button class="ex-opt" role="radio" aria-checked="' + (a.answer === L) + '" data-ex="opt" data-v="' + L + '"><b>' + L + '</b><span>' + esc(o) + '</span></button>';
      }).join('') + '</div>';
    } else if (q.type === 'numeric') {
      h += '<label class="ex-lab" for="exAns">Your answer (' + esc(q.answerFormat) + ')</label>' +
        '<input id="exAns" class="ex-in" inputmode="decimal" autocomplete="off" maxlength="60" value="' + esc(a.answer) + '" data-ex="ans">' +
        (q.allowWorking ? '<label class="ex-lab" for="exWork">Working (earns method marks)</label><textarea id="exWork" class="ex-ta" maxlength="1500" data-ex="work">' + esc(a.working || '') + '</textarea>' : '');
    } else {
      h += '<label class="ex-lab" for="exAns">Your answer</label><textarea id="exAns" class="ex-ta" maxlength="700" data-ex="ans">' + esc(a.answer) + '</textarea>';
    }

    var flagged = run.flagged.indexOf(q.id) !== -1;
    h += '<div class="ex-nav">' +
      '<button class="ex-btn alt" data-ex="prev"' + (run.pos === 0 ? ' disabled' : '') + '>← Back</button>' +
      '<button class="ex-btn alt" data-ex="flag" aria-pressed="' + flagged + '">' + (flagged ? '⚑ Flagged' : '⚐ Flag for review') + '</button>' +
      '<span class="grow"></span>' +
      (run.pos < p.questions.length - 1 ? '<button class="ex-btn" data-ex="next">Next →</button>' : '<button class="ex-btn" data-ex="submit">Finish and submit</button>') +
      '</div></div>' +
      '<div><button class="ex-btn alt ex-pal-toggle" style="width:100%;margin-bottom:8px" data-ex="pal">Questions (' + p.questions.filter(answered).length + '/' + p.questions.length + ' answered)</button>' +
      '<div class="ex-pal' + (run.paletteOpen ? '' : ' collapsed') + '"><h4>Question palette</h4><div class="ex-grid">' +
      p.questions.map(function (x, i) {
        return '<button class="ex-dot' + (answered(x) ? ' done' : '') + (i === run.pos ? ' cur' : '') + (run.flagged.indexOf(x.id) !== -1 ? ' flag' : '') + '" data-ex="go" data-i="' + i + '" aria-label="Question ' + x.number + (answered(x) ? ', answered' : ', not answered') + '">' + x.number + '</button>';
      }).join('') +
      '</div><div class="ex-legend">Green = answered · ⚑ = flagged · blue ring = you are here</div>' +
      '<button class="ex-btn" style="width:100%;margin-top:10px" data-ex="submit">Submit paper</button></div></div></div></div>';

    root.innerHTML = h;
    bindExam();
    tick();
    if (run.timer) clearInterval(run.timer);
    run.timer = setInterval(tick, 1000);
    var inp = $('#exAns'); if (inp && q.type !== 'mcq') { try { inp.focus({ preventScroll: true }); } catch (e) {} }
    window.scrollTo && root.scrollIntoView && root.scrollIntoView({ block: 'start' });
  }

  function tick() {
    if (!run) return;
    var left = remainingMs();
    var c = $('#exClock');
    if (c) {
      c.textContent = fmt(left);
      c.className = 'ex-clock' + (left < 2 * 60000 ? ' crit' : (left < 10 * 60000 ? ' low' : ''));
    }
    [[10, '10 minutes left'], [5, '5 minutes left'], [1, '1 minute left']].forEach(function (m) {
      if (left <= m[0] * 60000 && !run.said[m[0]]) { run.said[m[0]] = true; say(m[1]); }
    });
    if (left <= 0 && !run.submitting) submit(true);
    if (run.dirty && !run.saving && !run.saveTimer) run.saveTimer = setTimeout(save, 1200);
  }

  function readInputs() {
    var q = run.paper.questions[run.pos];
    if (q.type === 'mcq') return;
    var ans = $('#exAns'), work = $('#exWork');
    var cur = run.answers[q.id] || { answer: '', working: '' };
    var next = { answer: ans ? ans.value : cur.answer, working: work ? work.value : cur.working };
    if (next.answer !== cur.answer || next.working !== cur.working) { run.answers[q.id] = next; run.dirty = true; }
  }

  function setSaved(txt) { var s = $('#exSaved'); if (s) s.textContent = txt; }

  function save(extra) {
    run.saveTimer = null;
    if (!run || run.saving) return Promise.resolve();
    readInputs();
    run.saving = true;
    var payload = { answers: run.answers, flagged: run.flagged, position: run.pos };
    // send all answers each time: it is small and keeps the server copy complete even after a network gap
    return api('PUT', '/api/exams/attempts/' + encodeURIComponent(run.attemptId), payload).then(function (d) {
      run.saving = false;
      if (d.timeUp || d.submitted) { run.dirty = false; finishAfterServerClose(); return; }
      if (d.success) { run.dirty = false; setSaved('Saved ✓'); if (d.serverNow) run.skew = new Date(d.serverNow).getTime() - Date.now(); }
      else setSaved('Not saved yet');
    }).catch(function () { run.saving = false; setSaved('Offline: will retry'); run.dirty = true; });
  }

  function finishAfterServerClose() {
    if (run && run.timer) clearInterval(run.timer);
    var id = run && run.attemptId;
    run = null;
    if (id) openResult(id);
  }

  function bindExam() {
    root.oninput = function (e) {
      if (e.target.matches('[data-ex="ans"],[data-ex="work"]')) { readInputs(); setSaved('Typing…'); }
    };
    root.onclick = function (e) {
      var t = e.target.closest('[data-ex]');
      if (!t || !run) return;
      var act = t.getAttribute('data-ex');
      var q = run.paper.questions[run.pos];
      if (act === 'opt') { run.answers[q.id] = { answer: t.getAttribute('data-v'), working: '' }; run.dirty = true; renderExam(); save(); }
      else if (act === 'prev') { readInputs(); run.pos = Math.max(0, run.pos - 1); run.dirty = true; renderExam(); save(); }
      else if (act === 'next') { readInputs(); run.pos = Math.min(run.paper.questions.length - 1, run.pos + 1); run.dirty = true; renderExam(); save(); }
      else if (act === 'go') { readInputs(); run.pos = Number(t.getAttribute('data-i')); run.dirty = true; renderExam(); save(); }
      else if (act === 'flag') { var i = run.flagged.indexOf(q.id); if (i === -1) run.flagged.push(q.id); else run.flagged.splice(i, 1); run.dirty = true; renderExam(); save(); }
      else if (act === 'pal') { run.paletteOpen = !run.paletteOpen; var pal = $('.ex-pal'); if (pal) pal.classList.toggle('collapsed', !run.paletteOpen); }
      else if (act === 'submit') { readInputs(); confirmSubmit(); }
    };
  }

  function confirmSubmit() {
    var p = run.paper;
    var blank = p.questions.filter(function (q) { return !answered(q); }).length;
    var bg = document.createElement('div');
    bg.className = 'ex-modal-bg';
    bg.innerHTML = '<div class="ex-root" style="padding:0"><div class="ex-modal" role="dialog" aria-modal="true" aria-label="Submit paper">' +
      '<h3>Hand in your paper?</h3>' +
      '<p style="margin:6px 0">' + (blank ? '<b>' + blank + '</b> question' + (blank > 1 ? 's are' : ' is') + ' not answered. ' : 'You answered every question. ') +
      (run.flagged.length ? run.flagged.length + ' flagged for review. ' : '') + 'You cannot change your answers after handing in.</p>' +
      '<p class="ex-note">Time left: ' + fmt(remainingMs()) + '</p>' +
      '<div class="ex-nav"><button class="ex-btn alt" data-m="no">Keep working</button><span class="grow"></span><button class="ex-btn" data-m="yes">Hand in now</button></div></div></div>';
    document.body.appendChild(bg);
    bg.addEventListener('click', function (e) {
      var m = e.target.closest('[data-m]');
      if (!m) return;
      bg.remove();
      if (m.getAttribute('data-m') === 'yes') submit(false);
    });
    var first = bg.querySelector('[data-m="no"]'); if (first) first.focus();
  }

  function submit(timeUp) {
    if (!run || run.submitting) return;
    run.submitting = true;
    if (run.timer) clearInterval(run.timer);
    readInputs();
    root.innerHTML = '<div class="ex-root"><h2>' + (timeUp ? 'Time is up' : 'Handing in…') + '</h2><p class="ex-sub">Marking your paper…</p></div>';
    var id = run.attemptId;
    var body = { answers: run.answers };
    function attempt(n) {
      api('POST', '/api/exams/attempts/' + encodeURIComponent(id) + '/submit', body).then(function (d) {
        if (d.success) { run = null; renderResult(d); if (d.celebrate && window.ElinguPlay) window.ElinguPlay.celebrate(d.celebrate); }
        else if (n < 3) setTimeout(function () { attempt(n + 1); }, 1500);
        else { root.innerHTML = '<div class="ex-root"><div class="ex-warn">We could not hand in your paper (' + esc(d.error || 'network problem') + '). Your answers are saved. Check your connection.</div><button class="ex-btn" id="exRetry">Try again</button></div>'; $('#exRetry').onclick = function () { run.submitting = false; submit(false); }; }
      }).catch(function () {
        if (n < 3) setTimeout(function () { attempt(n + 1); }, 1500);
        else { root.innerHTML = '<div class="ex-root"><div class="ex-warn">You seem to be offline. Your answers are saved on your device. Reconnect, then try again.</div><button class="ex-btn" id="exRetry">Try again</button></div>'; $('#exRetry').onclick = function () { run.submitting = false; submit(false); }; }
      });
    }
    attempt(0);
  }

  // ───────────────────────── results ─────────────────────────
  function openResult(attemptId) {
    root.innerHTML = '<div class="ex-root"><p class="ex-sub">Loading your result…</p></div>';
    api('GET', '/api/exams/attempts/' + encodeURIComponent(attemptId)).then(function (d) {
      if (d.success && d.status === 'in_progress') {
        run = { attemptId: d.attemptId, paper: d.paper, answers: d.answers || {}, flagged: d.flagged || [], pos: d.position || 0, endsAt: new Date(d.endsAt).getTime(), skew: new Date(d.serverNow).getTime() - Date.now(), timer: null, dirty: false, saving: false, submitting: false, paletteOpen: false, said: {} };
        renderExam(); return;
      }
      if (d.success) renderResult(d); else loadHub();
    });
  }

  function renderResult(r) {
    var weak = (r.reviseNext || []);
    var h = '<div class="ex-root"><button class="ex-link" data-ex="back">← All papers</button>' +
      '<h2>' + esc(r.attempt.title) + '</h2>' +
      '<div class="ex-card ex-score"><div class="ex-ring" style="--p:' + esc(r.percentage) + '"><span>' + esc(Math.round(r.percentage)) + '%</span><small>' + esc(r.score) + ' / ' + esc(r.total) + '</small></div>' +
      '<div><div class="ex-band">' + esc(r.band) + '</div><div class="ex-note">Indicative band only: real boards set their own boundaries.</div>' +
      '<div class="ex-note" style="margin-top:6px">' + esc(r.answered) + ' of ' + esc(r.questions.length) + ' answered · ' + esc(r.correctCount) + ' fully correct' + (r.timeTakenSec ? ' · time used ' + esc(Math.floor(r.timeTakenSec / 60)) + ' min' : '') + (r.submitReason === 'time_up' ? ' · handed in when time ran out' : '') + '</div></div></div>' +
      (weak.length ? '<div class="ex-card"><h3>Revise these next</h3><div class="ex-note">' + weak.map(esc).join(' · ') + '</div></div>' : '<div class="ex-card"><h3>Well done</h3><div class="ex-note">No topic is below 60%. Try another paper or a harder level.</div></div>') +
      '<div class="ex-card"><h3>How you did by topic</h3><div class="ex-bars">' + r.topicBreakdown.map(function (t) {
        return '<div class="ex-bar-row"><div>' + esc(t.topic) + ' <span class="ex-note">(' + esc(t.awarded) + '/' + esc(t.available) + ')</span><div class="ex-track"><div class="ex-fill' + (t.percentage < 60 ? ' weak' : '') + '" style="width:' + esc(t.percentage) + '%"></div></div></div><b>' + esc(t.percentage) + '%</b></div>';
      }).join('') + '</div></div>' +
      '<div class="ex-card"><h3>Mark scheme and your answers</h3><div class="ex-chips"><button class="ex-chip" data-ex="filter" data-f="all" aria-pressed="true">All</button><button class="ex-chip" data-ex="filter" data-f="miss" aria-pressed="false">Not full marks</button></div><div id="exRev">' +
      r.questions.map(function (q) {
        var sym = q.status === 'correct' ? '✓' : (q.status === 'partial' ? '◐' : (q.status === 'blank' ? '–' : '✗'));
        return '<details class="ex-rev" data-st="' + esc(q.status) + '"><summary><span class="ex-st ' + esc(q.status) + '">' + sym + '</span><span><b>Q' + esc(q.number) + '</b> · ' + esc(q.topic) + ' · ' + esc(q.awarded) + '/' + esc(q.marks) + '</span></summary>' +
          '<div class="ex-kv"><b>Question:</b> ' + esc(q.stem || '') + '</div>' +
          '<div class="ex-kv"><b>Your answer:</b> ' + (q.studentAnswer ? esc(q.studentAnswer) : '<i>no answer</i>') + '</div>' +
          '<div class="ex-kv"><b>Correct answer:</b> ' + esc(q.correctAnswer) + '</div>' +
          (q.note ? '<div class="ex-kv"><b>Note:</b> ' + esc(q.note) + '</div>' : '') +
          '<div class="ex-kv"><b>Why:</b> ' + esc(q.explanation) + '</div></details>';
      }).join('') + '</div></div>' +
      '<button class="ex-btn" data-ex="back">Back to papers</button></div>';
    root.innerHTML = h;
    root.onclick = function (e) {
      var t = e.target.closest('[data-ex]');
      if (!t) return;
      var act = t.getAttribute('data-ex');
      if (act === 'back') loadHub();
      else if (act === 'filter') {
        var f = t.getAttribute('data-f');
        root.querySelectorAll('[data-ex="filter"]').forEach(function (b) { b.setAttribute('aria-pressed', String(b === t)); });
        root.querySelectorAll('#exRev details').forEach(function (d) { d.style.display = (f === 'miss' && d.getAttribute('data-st') === 'correct') ? 'none' : ''; });
      }
    };
    say('Result: ' + r.score + ' out of ' + r.total);
    root.scrollIntoView && root.scrollIntoView({ block: 'start' });
  }

  window.ElinguExam = { mount: mount };
})();
