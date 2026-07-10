// IMS ASB Hub — Service Worker
// Caches the app shell so it loads even with patchy school wifi

const CACHE = 'ims-asb-v2';
const SHELL = [
  '/ims-asb/',
  '/ims-asb/index.html',
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.12.0/firebase-database-compat.js',
];

// Install — cache the app shell
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => {
      // cache what we can, silently skip failures (CDN resources may be blocked)
      return Promise.allSettled(SHELL.map(url => cache.add(url).catch(() => null)));
    }).then(() => self.skipWaiting())
  );
});

// Activate — clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — network first, fall back to cache for the app shell
self.addEventListener('fetch', e => {
  // Don't intercept Firebase or Groq API calls — they need live network
  const url = e.request.url;
  if (url.includes('firebase') || url.includes('groq.com') || url.includes('firebaseio.com')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Cache successful GET responses for the app shell
        if (e.request.method === 'GET' && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
