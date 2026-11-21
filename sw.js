const CACHE_NAME = "craftlog-v0.0.47";
const ICON_CACHE = "craftlog-icons-v1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./theme-init.js",
  "./recipe-helpers.js",
  "./list-summary.js",
  "./app.js",
  "./manifest.json",
  "./assets/icon.svg",
  "./assets/icon-192.png"
];

// Installation: Alle Kern-Dateien vorab laden (einzelne 404s brechen den Install nicht ab)
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
    Promise.all([
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME && key !== ICON_CACHE)
            .map(key => caches.delete(key))
        )
      ),
      self.clients.claim()
    ])
  );
});

// Strategie 1: Cache-First für Minecraft-Icons
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
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.includes("/assets/icons/")) {
    event.respondWith(cacheFirstIcon(request));
    return;
  }

  event.respondWith(networkFirstApp(request));
});