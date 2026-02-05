// Kill-switch Service Worker: unregister and clear caches immediately
// Purpose: resolve inconsistent Chrome behavior by removing any SW control

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
    } catch (e) {
      // ignore
    }
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      // Unregister this service worker
      await self.registration.unregister();
    } catch (e) {
      // ignore
    }
    try {
      // Claim clients and trigger a soft reload for all windows
      const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const client of clients) {
        try { client.navigate(client.url); } catch {}
      }
      await self.clients.claim();
    } catch (e) {
      // ignore
    }
  })());
});

// Do not intercept any requests
self.addEventListener('fetch', () => {});
