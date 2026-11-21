const CACHE_NAME = "craftlog-v0.0.36";
const ICON_CACHE = "craftlog-icons-v1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./list-summary.js"
];

// Installation: Kern-Dateien einzeln vorab laden (einzelne 404s brechen den Install nicht ab)
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        CORE_ASSETS.map(url =>
          fetch(url, { cache: "no-cache" }).then(response => {
            if (response.ok) {
              return cache.put(url, response);
            }
          })
        )
      )
    )
  );
  self.skipWaiting();
});

// Aktivierung: Alte App-Caches aufräumen, den Icon-Cache aber behalten
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME && key !== ICON_CACHE)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Strategie 1: Cache-First für Icons (maximale Geschwindigkeit & Offline-Verfügbarkeit)
async function cacheFirstIcon(request) {
  const cache = await caches.open(ICON_CACHE);
  const cached = await cache.match(request);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("", { status: 404, statusText: "Offline" });
  }
}

// Strategie 2: Network-First für Code, HTML und JSON-Daten
async function networkFirstApp(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const freshResponse = await fetch(request);
    if (freshResponse.ok) {
      cache.put(request, freshResponse.clone());
    }
    return freshResponse;
  } catch {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }

    // Fallback bei Seitenaufrufen offline auf index.html
    if (request.mode === "navigate") {
      const fallback = await cache.match("./index.html");
      if (fallback) {
        return fallback;
      }
    }

    throw new Error("Offline und nicht im Cache vorhanden.");
  }
}

self.addEventListener("fetch", event => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // Nur eigene Dateien behandeln
  if (url.origin !== self.location.origin) {
    return;
  }

  // Icons dauerhaft aus dem Icon-Cache bedienen
  if (url.pathname.includes("/assets/icons/")) {
    event.respondWith(cacheFirstIcon(request));
    return;
  }

  // Alle App-Dateien (HTML, JS, CSS, JSON, Manifest) über Network-First
  event.respondWith(networkFirstApp(request));
});