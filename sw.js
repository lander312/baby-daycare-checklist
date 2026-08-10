const CACHE = "daycare-pwa-v14-network-first";
const STATIC_ASSETS = [
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(k => k !== CACHE).map(k => caches.delete(k))
  )).then(()=>self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if(event.request.method !== "GET") return;
  const req=event.request, url=new URL(req.url);
  const nav=req.mode==="navigate" || req.destination==="document" ||
    url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");
  if(nav){
    event.respondWith(fetch(req,{cache:"no-store"})
      .catch(()=>caches.match("./index.html").then(r=>r||caches.match("./"))));
    return;
  }
  event.respondWith(caches.match(req).then(cached=>cached || fetch(req).then(res=>{
    const copy=res.clone();
    caches.open(CACHE).then(c=>c.put(req,copy));
    return res;
  })));
});
