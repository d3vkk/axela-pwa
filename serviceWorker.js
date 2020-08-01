const staticAxela = "axela-v1.1.0";
const assets = ["/", "/index.html", "/css/main.css", "/js/main.js", "/img/icon.png", "vendor/TweenMax.min.js"]
self.addEventListener("install", installEvent => {
    installEvent.waitUntil(caches.open(staticAxela).then(cache => {
        cache.addAll(assets)
    }))
})
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
    }))
})
