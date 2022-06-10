
const staticCacheName = 'site-static';
const assets = [
  '/index.html',
  '/app.js',
  '/style.css',
  '/manifest.json'
];
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(staticCacheName).then((cache) => {
          console.log('caching shell assets');
          cache.addAll(assets);
        })
      );
  });

  self.addEventListener('activate', evt => {
    console.log('service worker activated');
    Notification.requestPermission().then((result) => {
      if (result === 'granted') {
        setInterval( async ()=>{
          new Notification('Hi Angel',  {
            body: "Notified by Sum Form!",
            icon: "https://github.com/iamshaunjp/pwa-tutorial/blob/lesson-3/img/icons/icon-72x72.png?raw=true"
            
          });
        },5*1000); 
      }
    });
  });

  self.addEventListener('fetch', evt => {
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
          return cacheRes || fetch(evt.request);
        })
      );
  });


   
 