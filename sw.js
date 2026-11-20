// =====================================================================
// SERVICE WORKER — giúp app cài được lên màn hình chính và mở được khi mất mạng
// Khi sửa code xong và đưa lên lại, tăng số phiên bản CACHE (v1 → v2)
// để điện thoại tải bản mới.
// =====================================================================
const CACHE = 'so-ky-niem-a12-v1';
const APP_SHELL = [
  './',
  './index.html',
  './firebase-config.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './placeholder.svg'
];
// Thư viện bên ngoài được phép lưu lại để mở khi mất mạng
const CACHEABLE_HOSTS = ['cdn.tailwindcss.com', 'fonts.googleapis.com', 'fonts.gstatic.com', 'www.gstatic.com'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Ưu tiên mạng (luôn lấy bản mới nhất), mất mạng thì dùng bản đã lưu
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  if (!sameOrigin && !CACHEABLE_HOSTS.includes(url.hostname)) return; // Firebase, Claude… đi thẳng

  event.respondWith(
    fetch(req)
      .then(res => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then(hit => hit || (req.mode === 'navigate' ? caches.match('./index.html') : undefined)))
  );
});
