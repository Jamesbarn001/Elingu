// sw.js — Elingu service worker: fast on slow networks, honest when offline.
//
//  • Pages (HTML) are always Network-First (rule 8: never serve a stale page when the network works), but on a bad
//    connection we stop waiting after 4 seconds and show the saved copy instead of a blank screen.
//  • Our own CSS/JS/fonts/images are served instantly from cache and refreshed in the background.
//  • Lessons (curriculum JSON) are Network-First too and kept in a separate cache that survives app updates, so a
//    learner can use "Save lessons for offline" in My Progress. If a lesson was never saved, we say so (HTTP 503):
//    we never pretend an empty answer is a real one.
//  • The AI tutor, practice-exam marking and the Brain Spark need the internet by design (answers are marked on the
//    server), so those requests are not touched here.

const CACHE_NAME = 'elingu-cache-v19-gensci';          // app shell: bump whenever public assets change (rule 8)
const LESSON_CACHE = 'elingu-lessons-v1';           // saved lessons: kept across app updates
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/fonts.css',
  '/i18n.js',
  '/explore.css',
  '/explore.js',
  '/exam.css',
  '/exam.js',
  '/play.css',
  '/icons.css',
  '/icons.svg',
  '/icons.js',
  '/explain.js',
  '/play.js',
  '/elingu-avatar.webp',
  '/vendor/fonts/dm-sans-latin-400-normal.woff2',
  '/vendor/fonts/dm-sans-latin-600-normal.woff2',
  '/vendor/fonts/dm-sans-latin-700-normal.woff2',
  '/vendor/fonts/dm-sans-latin-800-normal.woff2'
];
const SHELL_TIMEOUT_MS = 4000;
const LESSON_TIMEOUT_MS = 8000;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      // Cache each file separately so one missing file cannot silently stop the others from being saved.
      .then((cache) => Promise.all(STATIC_ASSETS.map((url) => cache.add(url).catch((err) => console.warn('[Elingu-SW] not cached:', url, err && err.message)))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME && k !== LESSON_CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then((v) => { clearTimeout(t); resolve(v); }, (e) => { clearTimeout(t); reject(e); });
  });
}

/** Try the network; if it fails or is too slow, use the saved copy (if any). */
function networkFirst(request, cacheName, timeoutMs, fallback) {
  return withTimeout(fetch(request), timeoutMs)
    .then((response) => {
      if (response && response.status === 200) {
        const copy = response.clone();
        caches.open(cacheName).then((cache) => cache.put(request, copy));
      }
      return response;
    })
    .catch(() => caches.open(cacheName).then((cache) => cache.match(request)).then((cached) => cached || fallback()));
}

/** Serve from cache immediately and refresh it in the background. */
function staleWhileRevalidate(request) {
  return caches.open(CACHE_NAME).then((cache) => cache.match(request).then((cached) => {
    const refresh = fetch(request).then((response) => {
      if (response && response.status === 200) cache.put(request, response.clone());
      return response;
    }).catch(() => cached);
    return cached || refresh;
  }));
}

function offlineJson(message) {
  return new Response(JSON.stringify({ success: false, offline: true, error: message }), {
    status: 503, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Lessons and the paper catalogue
  if (url.pathname.startsWith('/api/curriculum/') || url.pathname === '/api/exams/papers') {
    event.respondWith(networkFirst(req, LESSON_CACHE, LESSON_TIMEOUT_MS, () => offlineJson('You are offline and this was not saved. Connect once and use "Save lessons for offline" in My Progress.')));
    return;
  }

  // Everything else under /api/ goes straight to the network
  if (url.pathname.startsWith('/api/')) return;

  // Pages
  const isPage = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isPage) {
    event.respondWith(networkFirst(req, CACHE_NAME, SHELL_TIMEOUT_MS, () => caches.match('/index.html').then((c) => c || new Response('You are offline.', { status: 503, headers: { 'Content-Type': 'text/plain' } }))));
    return;
  }

  // Our own files, fonts, maths library and images
  if (/\.(css|js|webp|png|jpg|jpeg|svg|woff2|json)$/i.test(url.pathname) || url.pathname.startsWith('/vendor/')) {
    event.respondWith(staleWhileRevalidate(req));
  }
});
