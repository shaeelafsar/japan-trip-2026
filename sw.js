const CACHE_NAME = "japan-2026-v2-offline-v1";
const ASSETS = ["index.html", "itinerary.html", "checklist.html", "tips.html", "about.html", "styles.css", "images/fri-fujiq-1.jpg", "images/fri-fujiq-2.jpg", "images/fri-fujiq-3.jpg", "images/fri-kawaguchiko-autumn.jpg", "images/fri-ropeway-1.jpg", "images/fri-ropeway-2.jpg", "images/mon-ashi-1.jpg", "images/mon-cedar-1.jpg", "images/mon-mizunoto-hinoki-bath.jpg", "images/mon-mizunoto-room.jpg", "images/mon-ropeway-1.jpg", "images/mon-ropeway-2.jpg", "images/sat-cat-street.jpg", "images/sat-matcha-tea.jpg", "images/sat-meiji-torii.jpg", "images/sat-omotesando-trees.jpg", "images/sat-shibuya-crossing.jpg", "images/sat-shibuya-sky.jpg", "images/sat-takeshita-real.jpg", "images/sun-akihabara-1.jpg", "images/sun-nakamise-1.jpg", "images/sun-samurai-armor.jpg", "images/sun-sensoji-day.jpg", "images/sun-sumo-show.jpg", "images/sun-sushi-making.jpg", "images/thu-shinjuku-night-2.jpg", "images/thu-takao-cablecar.jpg", "images/thu-takao-fuji.jpg", "images/thu-takao-maples.jpg", "images/thu-takao-soba.jpg", "images/thu-yakuoin.jpg", "images/tue-marunouchi-lights-1.jpg", "images/tue-shinkansen-1.jpg", "images/tue-tokyosta-1.jpg", "images/tue-unagi-eel.jpg", "images/wed-gyoen-maples.jpg", "images/wed-gyoen-pavilion.jpg", "images/wed-hotel-mets-shibuya.jpg", "images/wed-shibuya-stream.jpg", "images/wed-tempura-bowl.jpg"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then((c) => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
