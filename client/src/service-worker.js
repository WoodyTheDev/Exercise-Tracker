import { precacheAndRoute } from "workbox-precaching"
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 */
precacheAndRoute(self.__WB_MANIFEST);
self.__precacheManifest = [].concat(self.__precacheManifest || []);
precacheAndRoute(self.__precacheManifest, {});

registerRoute(
  ({ url }) => url.pathname.startsWith("https://lyra.et-inf.fho-emden.de:20164/api/"),
  new CacheFirst({
        cacheName: "exercise",
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
    })
);
