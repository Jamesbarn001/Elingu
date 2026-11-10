/*
 * "Explain in Kiswahili" for one tutor message. Never replaces the English text; the Kiswahili appears in a box under it.
 * Usage: window.ElinguExplain.attach(messageElement, plainText)  (tutor messages only)
 */
(function () {
  'use strict';

  var MAX = 2000;

  function token() { try { return sessionStorage.getItem('elingu_student_token') || ''; } catch (e) { return ''; } }
  function studentId() {
    try {
      var s = JSON.parse(sessionStorage.getItem('elingu_student') || 'null');
      return (s && s.id) || sessionStorage.getItem('elingu_student_id') || undefined;
    } catch (e) { return undefined; }
  }

  function el(tag, css, text) {
    var n = document.createElement(tag);
    if (css) n.style.cssText = css;
    if (text) n.textContent = text;
    return n;
  }

  function request(text) {
    var headers = { 'Content-Type': 'application/json' };
    var t = token();
    if (t) headers['Authorization'] = 'Bearer ' + t;
    return fetch('/api/tutor/explain-sw', { method: 'POST', headers: headers, body: JSON.stringify({ studentId: studentId(), text: text }) })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (d) { d._status = r.status; return d; }); });
  }

  function isTutorMessage(node) {
    var role = node.getAttribute('data-role') || '';
    if (role) return role === 'assistant' || role === 'tutor' || role === 'ai';
    var cls = String(node.className || '');
    if (/(tutor|assistant|\bai\b|\bbot\b)/i.test(cls)) return true;
    return false; // unknown or learner/system bubble: do not attach
  }

  function attach(messageElement, plainText) {
    if (!messageElement || messageElement.nodeType !== 1) return null;
    if (!isTutorMessage(messageElement)) return null;
    var text = String(plainText || '').trim();
    if (!text || text.length > MAX) return null;
    if (messageElement.getAttribute('data-explain-attached') === '1') return null;
    if (!token()) return null;
    messageElement.setAttribute('data-explain-attached', '1');

    var wrap = el('div', 'margin-top:6px;');
    var btn = el('button', 'min-height:44px;min-width:44px;padding:8px 12px;background:transparent;border:1px solid currentColor;border-radius:8px;color:inherit;font:inherit;font-size:0.85rem;cursor:pointer;', 'Explain in Kiswahili');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Explain this message in Kiswahili');
    var box = el('div', 'display:none;margin-top:6px;padding:10px 12px;border:1px solid currentColor;border-radius:8px;font-size:0.95rem;line-height:1.5;white-space:pre-wrap;');
    box.setAttribute('lang', 'sw');
    box.setAttribute('aria-live', 'polite');
    wrap.appendChild(btn);
    wrap.appendChild(box);
    messageElement.appendChild(wrap);

    var swText = null, showing = false, busy = false;

    function render() {
      if (showing && swText) {
        box.style.display = 'block';
        box.textContent = swText;
        btn.textContent = 'Back to English';
        btn.setAttribute('aria-label', 'Hide the Kiswahili and go back to English');
      } else {
        box.style.display = 'none';
        btn.textContent = 'Explain in Kiswahili';
        btn.setAttribute('aria-label', 'Explain this message in Kiswahili');
      }
    }

    function fail(msg) {
      busy = false; btn.disabled = false;
      box.style.display = 'block';
      box.textContent = msg;
      btn.textContent = 'Explain in Kiswahili';
    }

    btn.addEventListener('click', function () {
      if (busy) return;
      if (showing) { showing = false; render(); return; }
      if (swText) { showing = true; render(); return; }
      busy = true;
      btn.disabled = true;
      btn.textContent = 'Please wait...';
      request(text).then(function (d) {
        if (d && d.success && d.text) { busy = false; btn.disabled = false; swText = d.text; showing = true; render(); return; }
        fail(d && d._status === 503
          ? 'Kiswahili help is not available right now. The English explanation above still works. Please try again in a moment.'
          : 'We could not get the Kiswahili help just now. Please try again in a moment.');
      }).catch(function () {
        fail('Kiswahili help needs an internet connection. The English explanation above still works.');
      });
    });
    return wrap;
  }

  window.ElinguExplain = { attach: attach };
})();
