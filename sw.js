let cacheID = "restaurant-reviews-v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheID).then(cache => {
      return cache
        .addAll([
          "/",
          "/index.html",
          "./restaurant.html",
          "/css/styles.css",
          "/data/restaurants.json",
          "/js/",
          "/js/dbhelper.js",
          "/js/main.js",
          "/js/restaurant_info.js"
        ])
        .catch(err => {
          console.log("Caches open failed: " + err);
        });
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return (
              cacheName.startsWith("restaurant-reviews-v") &&
              cacheName != cacheID
            );
          })
          .map(cacheName => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  let requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === "/") {
      event.respondWith(caches.match("/"));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
