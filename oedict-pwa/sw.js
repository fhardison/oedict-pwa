const CACHE_NAME = 'oe-dict-cache';
const PREFIX = '.';

// On install, cache files in /data directory
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll([
          PREFIX + '/index.html',
          PREFIX + '/favicon.ico',
          PREFIX + '/index.js',
          PREFIX + '/data/dict.json',
          PREFIX + '/data/lookup.json',
          PREFIX + '/sw.js',
          PREFIX + '/index.css'

        ])
      })
  );
});

// On fetch, use cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);  
      })
  );
});

