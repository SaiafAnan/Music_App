
const myCacheStorage = "Space music app";
self.addEventListener('install', (event) => {
    
  
    self.skipWaiting();


    event.waitUntil(
        caches.open(myCacheStorage)
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


self.addEventListener('activate', async (event) => {
    await self.clients.claim();

    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames
            .filter((name) => name !== myCacheStorage)
            .map(async (cacheToDelete) => {
                await caches.delete(cacheToDelete);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            try {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }
                return customNetworkFallback(event.request);
            } catch (error) {
                console.error('Error during fetch event:', error);
                throw error;
            }
        })()
    );
});

async function customNetworkFallback(request) {
    const cache = await caches.open(myCacheStorage);
    const cachedResponse = await cache.match(request);
    
    try {
        const networkResponse = await fetch(request);

        if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }

        throw new Error(`Failed to fetch: ${networkResponse.status}`);
    } catch (error) {
        console.error('Error during network fallback:', error);
        return cachedResponse || new Response('Failed to fetch resource');
    }
}
