// Versão do cache: muda o número quando atualizar o app
const CACHE = 'orion-v1';
const ARQUIVOS = ['./', './index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ARQUIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  // Apaga caches antigos
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Tenta a rede primeiro; sem internet, usa o cache
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
