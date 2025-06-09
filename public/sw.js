const CACHE_NAME = 'uvr-team-images-v1';
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

// Install event - called when service worker is first installed
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(self.skipWaiting());
});

// Activate event - called when service worker becomes active
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      cleanupExpiredCache()
    ])
  );
});

// Fetch event - intercept network requests
self.addEventListener('fetch', (event) => {
  // Only handle image requests for team photos
  if (event.request.url.includes('/images/team/') || 
      (event.request.url.includes('supabase') && event.request.url.includes('team'))) {
    event.respondWith(handleImageRequest(event.request));
  }
});

// Handle image caching with hash-based keys
async function handleImageRequest(request) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);

    // If cached and not expired, return cached version
    if (cachedResponse) {
      const cachedTime = await getCacheTime(request.url);
      if (cachedTime && (Date.now() - cachedTime < CACHE_DURATION)) {
        console.log('Service Worker: Serving cached image:', request.url);
        return cachedResponse;
      }
    }

    // Fetch fresh image from network
    console.log('Service Worker: Fetching fresh image:', request.url);
    const networkResponse = await fetch(request);
    
    // Cache the response if successful
    if (networkResponse.ok) {
      const responseClone = networkResponse.clone();
      await cache.put(request, responseClone);
      await setCacheTime(request.url, Date.now());
      console.log('Service Worker: Cached new image:', request.url);
    }

    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Error handling image request:', error);
    // Return a fallback image or the original request
    return fetch(request);
  }
}

// Store cache timestamp
async function setCacheTime(url, timestamp) {
  try {
    const cache = await caches.open(CACHE_NAME + '-timestamps');
    const response = new Response(timestamp.toString());
    await cache.put(url, response);
  } catch (error) {
    console.error('Service Worker: Error setting cache time:', error);
  }
}

// Get cache timestamp
async function getCacheTime(url) {
  try {
    const cache = await caches.open(CACHE_NAME + '-timestamps');
    const response = await cache.match(url);
    if (response) {
      const timestamp = await response.text();
      return parseInt(timestamp, 10);
    }
  } catch (error) {
    console.error('Service Worker: Error getting cache time:', error);
  }
  return null;
}

// Clean up expired cache entries
async function cleanupExpiredCache() {
  try {
    const cache = await caches.open(CACHE_NAME);
    const timestampCache = await caches.open(CACHE_NAME + '-timestamps');
    const requests = await cache.keys();

    for (const request of requests) {
      const cachedTime = await getCacheTime(request.url);
      if (cachedTime && (Date.now() - cachedTime > CACHE_DURATION)) {
        console.log('Service Worker: Removing expired cache entry:', request.url);
        await cache.delete(request);
        await timestampCache.delete(request.url);
      }
    }
  } catch (error) {
    console.error('Service Worker: Error cleaning up cache:', error);
  }
}

// Message handler for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_TEAM_IMAGE') {
    const { url, cacheKey } = event.data;
    handleTeamImageCaching(url, cacheKey);
  }
});

// Cache team images with custom keys
async function handleTeamImageCaching(url, cacheKey) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const customRequest = new Request(url + '#' + cacheKey);
    
    const response = await fetch(url);
    if (response.ok) {
      await cache.put(customRequest, response.clone());
      await setCacheTime(customRequest.url, Date.now());
      console.log('Service Worker: Cached team image with key:', cacheKey);
    }
  } catch (error) {
    console.error('Service Worker: Error caching team image:', error);
  }
} 