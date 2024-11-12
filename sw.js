//Asignar nombre y version de la cache
const CACHE_NAME="v1_cache_PWA";

//ficheros que se van a estar guardando en la aplicacion

var urlsToCache=[
    './',
    './img/volume16x16.png',
    './img/volume32x32.png',
    './img/volume64x64.png',
    './img/volume128x128.png',
    './img/volume256x256.png',
    './img/volume512x512.png',
    './img/volume1024x1024.png',
    './img/volume2048x2048.png',
    './img/foto.png'
];

self.addEventListener('install', e=> {
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                return cache.addAll(urlsToCache)
                            .then(() =>{
                                self.skipWaiting();
                            });
                            
              })
              .catch(err=> {
                console.log('no se ha cargado la cache',err);
              })
    );
});

self.addEventListener('activate', e=>{
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
              .then(cacheNames =>{
                return Promise.all(
                    cacheNames.map(cacheName=>{
                        if(cacheWhiteList.indexOf(cacheName)=== -1){
                            return caches.delete(cacheName);
                        }
                    })
                );
              })
              .then(()=>{
                self.clients.claim();
              })
    )
});

self.addEventListener( ' fetch ', e=> {
    e.respondWith (
        caches.match (e.request)
        .then(res => {
        if(res){
            return res;
        }
    return fetch(e.request);
        })
    );
});