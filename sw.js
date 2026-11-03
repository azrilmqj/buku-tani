// Service worker: simpan file aplikasi agar bisa dibuka tanpa internet.
// Setiap mengubah file aplikasi, naikkan nomor versi CACHE (v1 -> v2).
const CACHE = 'buku-tani-v1';
const FILES = ['./', 'index.html', 'css/style.css', 'js/storage.js', 'js/dialogs.js', 'js/views.js', 'js/app.js', 'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x))))); self.clients.claim(); });
self.addEventListener('fetch', e => { if (e.request.method !== 'GET') return; e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
