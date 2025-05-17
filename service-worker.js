// Service Worker for WhatAboutDinner App
// Provides offline support for user recipes

const CACHE_NAME = 'whataboutdinner-recipe-cache-v1';
const OFFLINE_URL = '/offline.html';

// Install event - cache essential resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        OFFLINE_URL,
        '/images/default-recipe.jpg',
        '/images/logo.png',
        '/styles/offline.css'
      ]);
    })
  );
  
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Tell the active service worker to take control of the page immediately
  self.clients.claim();
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Handle API requests for recipes
  if (event.request.url.includes('/api/user/recipes')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If successful, clone the response and store it in the cache
          if (response.ok) {
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clonedResponse);
            });
          }
          return response;
        })
        .catch(() => {
          // If network request fails, try to serve from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For non-API requests, try network first, then cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If successful, clone the response and store it in the cache
        if (response.ok) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
        }
        return response;
      })
      .catch(() => {
        // If network request fails, try to serve from cache
        return caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // If the request is for a page, serve the offline page
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            
            // Otherwise return a 404
            return new Response('Not found', { status: 404, statusText: 'Not found' });
          });
      })
  );
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SYNC_RECIPES') {
    // Sync recipes for offline use
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return fetch('/api/user/recipes')
          .then((response) => {
            if (response.ok) {
              cache.put('/api/user/recipes', response.clone());
              return response.json();
            }
          })
          .then((data) => {
            // Store individual recipes in cache
            if (data && data.recipes) {
              const recipes = data.recipes;
              return Promise.all(
                recipes.map((recipe) => {
                  const recipeUrl = `/api/user/recipes/${recipe._id}`;
                  return fetch(recipeUrl)
                    .then((response) => {
                      if (response.ok) {
                        return cache.put(recipeUrl, response.clone());
                      }
                    });
                })
              );
            }
          });
      })
    );
  }
});
