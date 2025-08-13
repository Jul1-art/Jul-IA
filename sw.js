const CACHE_NAME = "jul-ia-cache";

const FILES_TO_CACHE = [
  "/Documentation.html",
  "/map.html",
  "/Fichier.html",
  "/ia_voix.html",
  "/Jul-IA2.0.html",
  "/Page_acceuil.html",
  "/hack.html",
  "/index.html",
  "/A_propos.html",
  "/ia_autres.html",
  "/index.js",
  "/Jul-IA3.0.html",
  "/Connexion_page.html",
  "/ia_images.html",
  "/ia_video.html",
  "/ia_textuelles.html",
  "/Jul-IA.html",
  "/Jul-IA_logo.png",
  "/Laboratoire_CSS.html",
  "/manifest.json"
];

const GAME_FILES = [
  "/Accueil_Pong.html",
  "/Arkanoid.html",
  "/Pac-Man.html",
  "/Playground.html",
  "/Pong.html",
  "/Space_Invaders.html",
  "/Tetris.html",
  "/video-game.png"
];

// Installation du service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([...FILES_TO_CACHE, ...GAME_FILES]);
    })
  );
  self.skipWaiting();
});

// Activation et nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interception des requêtes
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});