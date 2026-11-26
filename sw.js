/* Offline support. Pages/scripts: network first (always fresh when online), cache as fallback.
   Photos and fonts: cache first (they never change). */
var SHELL = "atelier-shell-v1";
var MEDIA = "atelier-media-v1";

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(SHELL).then(function (c) { return c.addAll(["./", "index.html"]); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== SHELL && k !== MEDIA; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  var isMedia = (url.origin === location.origin && /\.(jpg|jpeg|png|svg|webp)$/i.test(url.pathname)) ||
    url.hostname === "fonts.gstatic.com" || url.hostname === "fonts.googleapis.com";

  if (isMedia) {
    e.respondWith(caches.open(MEDIA).then(function (c) {
      return c.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) {
          if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone());
          return res;
        });
      });
    }));
    return;
  }

  if (url.origin !== location.origin) return;
  e.respondWith(fetch(req).then(function (res) {
    if (res && res.ok) { var copy = res.clone(); caches.open(SHELL).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () {
    return caches.match(req).then(function (hit) { return hit || caches.match("index.html"); });
  }));
});
