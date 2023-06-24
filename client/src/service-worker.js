import { precacheAndRoute } from "workbox-precaching"
import { registerRoute } from "workbox-routing";
import { CacheFirst } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";


/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 */
precacheAndRoute(self.__WB_MANIFEST);
self.__precacheManifest = [].concat(self.__precacheManifest || []);
precacheAndRoute(self.__precacheManifest, {});

registerRoute(
  ({ url }) => url.pathname.startsWith("/"),
  new CacheFirst({
        cacheName: "exercise",
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
        ],
    })
);
