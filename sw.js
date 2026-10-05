const V='campo-gis-v12',CD='https://cdnjs.cloudflare.com/';
const PRE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-180.png','./icon-512.png','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/mleaflet.min.css','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/layers.png','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/layers-2x.png','https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(PRE.map(u=>c.add(new Request(u,{mode:u.startsWith('http')?'cors':'same-origin'})).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!=='tiles').map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);
if(r.method!=='GET'||(u.origin!==location.origin&&!r.url.startsWith(CD)))return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(h=>h||fetch(r).then(n=>{if(n.ok||n.type==='opaque'){const c=n.clone();caches.open(V).then(x=>x.put(r,c))}return n}).catch(()=>r.mode==='navigate'?caches.match('./index.html'):Response.error())))});
