

self.addEventListener('install', (event) => {
    console.log('[SW] Install:', event);
  
    self.skipWaiting();

    console.log(caches);
    event.waitUntil(
        caches.open('Saiaf Space')
            .then((cache) => {
            
               
                cache.addAll([
                    '/',
                    '/index.html',
                    '/styles.css',
                    '/script.js',
                    '/manifest.json',
                    '/assets/favicon-32x32.png',
                    '/assets/icons/icon-192x192.png',
                    '/assets/icons/icon-512x512.png',
                ]);

            })
            .catch((error) => {
                console.log('Cache failed', error);
            })
    );
});

// self.addEventListener('activate', (event) => {
//     console.log('[SW] Activate:', event);

 
//     event.waitUntil(clients.claim());

   
// })

// self.addEventListener('activate', (event) => {
//     event.waitUntil(
//         Promise.all([
//             clients.claim(),
//             caches.keys().then((cName) => {
//                 return Promise.all(
//                     cName
//                         .filter((name) => name !== cacheStorage)
//                         .map((cacheDelete) => {
//                             return caches.delete(cacheDelete);
//                         })
//                 );
//             })
//         ])
//     );
// });

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then((response) => {
//                 if (response) {
//                     return response;
//                 }
//                 return networkFallback(event.request);
//             })
//             .catch(() => {
//             })
//     );
// });

// function networkFallback(reqq) {
//     return caches.open(cacheStorage)
//         .then(cache => {
//             const res = cache.match(reqq);
//             const req = fetch(reqq);

//             return Promise.all([res, req])
//                 .then(([res, netRes]) => {
//                     if (netRes && netRes.status === 200) {
//                         cache.put(reqq, netRes.clone());
//                     }
//                     return netRes || res;
//                 })
//                 .catch(() => {
//                     return res;
//                 });
//         });
// }
self.addEventListener('activate', (evt) => {
    evt.waitUntil(
        Promise.all([
            self.clients.claim(),
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => name !== myCacheStorage)
                        .map((cacheToDelete) => {
                            return caches.delete(cacheToDelete);
                        })
                );
            })
        ])
    );
});

self.addEventListener('fetch', (evt) => {
    evt.respondWith(
        caches.match(evt.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return customNetworkFallback(evt.request);
            })
            .catch(() => {
               
            })
    );
});

function customNetworkFallback(req) {
    return caches.open(myCacheStorage)
        .then(cache => {
            const cachedRes = cache.match(req);
            const fetchReq = fetch(req);

            return Promise.all([cachedRes, fetchReq])
                .then(([cachedRes, networkRes]) => {
                    if (networkRes && networkRes.status === 200) {
                        cache.put(req, networkRes.clone());
                    }
                    return networkRes || cachedRes;
                })
                .catch(() => {
                    return cachedRes;
                });
        });
}

