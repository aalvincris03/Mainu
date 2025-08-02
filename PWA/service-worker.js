self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('utang-cache').then(function (cache) {
      return cache.addAll(['/', '/static/css/style.css', '/static/js/script.js']);
    })
  );
});
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
