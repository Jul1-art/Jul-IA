const CACHE_NAME = "jul-ia-cache";

const FILES_TO_CACHE = [
  "/Jul-IA/Documentation.html",
  "/Jul-IA/map.html",
  "/Jul-IA/Fichier.html",
  "/Jul-IA/ia_voix.html",
  "/Jul-IA/Jul-IA2.0.html",
  "/Jul-IA/Page_acceuil.html",
  "/Jul-IA/hack.html",
  "/Jul-IA/index.html",
  "/Jul-IA/A_propos.html",
  "/Jul-IA/ia_autres.html",
  "/Jul-IA/index.js",
  "/Jul-IA/Jul-IA3.0.html",
  "/Jul-IA/Connexion_page.html",
  "/Jul-IA/ia_images.html",
  "/Jul-IA/ia_video.html",
  "/Jul-IA/ia_textuelles.html",
  "/Jul-IA/Jul-IA.html",
  "/Jul-IA/Jul-IA_logo.png",
  "/Jul-IA/Laboratoire_CSS.html",
  "/Jul-IA/manifest.json"
];

const GAME_FILES = [
  "/Jul-IA/Accueil_Pong.html",
  "/Jul-IA/Arkanoid.html",
  "/Jul-IA/Pac-Man.html",
  "/Jul-IA/Playground.html",
  "/Jul-IA/Pong.html",
  "/Jul-IA/Space_Invaders.html",
  "/Jul-IA/Tetris.html",
  "/Jul-IA/video-game.png"
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