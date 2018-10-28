let appCache = 'yatt-app-cache';
let urlsToCache = [
  '/public/index.html',
  '/src/styles/index.css',
  '/src/js/index.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(appCache)
          .then(cache => {
            console.log('Opened cache', appCache);
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch:true })
      .then(response => {
        if (response) {
          return response;
        }
        
        let fetchRequest = event.request.clone();
        return fetch(fetchRequest)
        .then(response => {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          let responseToCache = response.clone();
          caches.open(appCache)
          .then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      }
    )
  );
});