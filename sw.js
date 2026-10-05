const V='dxcampo-v4',CORE=['./','index.html','manifest.webmanifest','icon-180.png','icon-192.png','icon-512.png',
'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js',
'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/layers.png','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/layers-2x.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='tiles').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);
if(e.request.method!=='GET')return;
if(u.origin===location.origin||u.hostname==='cdnjs.cloudflare.com'){
e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{const n=fetch(e.request).then(x=>{if(x&&x.ok){const cp=x.clone();caches.open(V).then(c=>c.put(e.request,cp))}return x}).catch(()=>r);return r||n}))}});
