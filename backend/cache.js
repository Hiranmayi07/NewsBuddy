// cache.js
const cache = {};

function setCache(key, data) {
  cache[key] = { data, timestamp: Date.now() };
}

function getCache(key, maxAge = 10 * 60 * 1000) { // default 10 min
  if (!cache[key]) return null;
  if (Date.now() - cache[key].timestamp > maxAge) {
    delete cache[key];
    return null;
  }
  return cache[key].data;
}

module.exports = { setCache, getCache };
