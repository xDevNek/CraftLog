// WICHTIG: Ändere diese Nummer (z. B. auf 'v2', 'v3'), sobald du Code oder Daten aktualisierst!
const CACHE_NAME = 'materialbuch-cache-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './theme-init.js',
  './app.js',
  './planner.js',
  './list-summary.js',
  './sources.js',
  './survival-status.js',
  './minecraft-data.json',
  './manifest.json',
  './assets/icon.svg',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

// Installation: Alle App-Dateien für den Offline-Betrieb speichern
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  // Neue Version sofort aktivieren, ohne auf das Schließen aller Tabs zu warten
  self.skipWaiting();
});

// Aktivierung: Alte Caches vorheriger Versionen aufräumen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((oldKey) => caches.delete(oldKey))
      )
    )
  );
  self.clients.claim();
});

// Abruf: Erst aus dem Cache laden (blitzschnell & offline), sonst aus dem Netz
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});