// // service-worker.js

// const cacheName = 'music-app-cache-v1';
// const appShellFiles = [
//   '/',
//   '/index.html',
//   '/styles.css',
//   '/script.js',
//   '/manifest.json',
//   '/assets/icons/icon-192x192.png',
//   '/assets/icons/icon-512x512.png',
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll(appShellFiles);
//     })
//   );
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((name) => {
//           if (name !== cacheName) {
//             return caches.delete(name);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return (
//         response ||
//         fetch(event.request).then((fetchResponse) => {
//           return caches.open(cacheName).then((cache) => {
//             cache.put(event.request, fetchResponse.clone());
//             return fetchResponse;
//           });
//         })
//       );
//     })
//   );
// });
console.log(self);
self.addEventListener('install', (event) => {
    console.log('[SW] Install:', event);
    // Activate itself, no need to wait for the user to activate
    self.skipWaiting();

    console.log(caches);
    event.waitUntil(
        caches.open('cacheAssets')
            .then((cache) => {
                console.log('Cache', cache)
                // cache.add('/index.html');
                // cache.add('/app.js');
                cache.addAll([
                    '/',
                    '/index.html',
                    '/styles.css',
                    '/script.js',
                    '/manifest.json',
                    '/assets/icons/icon-192x192.png',
                    '/assets/icons/icon-512x512.png',
                ]);

            })
            .catch((error) => {
                console.log('Cache failed', error);
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('[SW] Activate:', event);

    // Immediately gets control over the client's page
    event.waitUntil(clients.claim());

    // This line will only be executed after 
    // getting control over all open pages.
})

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then((response) => {
//                 console.log('Response:', response);
//                 return response;
//             })
//             .catch((error) => {
//                 console.log('Match Failed:', error);
//             })
//     );
// });