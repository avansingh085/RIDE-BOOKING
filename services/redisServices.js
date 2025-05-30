import client from '../config/redis-config.js';
const MAX_ITEMS = 1000; // Adjust based on average size per key
const LRU_TRACKER_KEY = 'lru:tracker'; // Sorted set to track access time

// Store value with LRU logic
export const lruSet = async (key, value) => {
  await client.set(key, value);
  const timestamp = Date.now();
  await client.zadd(LRU_TRACKER_KEY, timestamp, key);

  // Check how many keys are being tracked
  const count = await client.zcard(LRU_TRACKER_KEY);
  if (count > MAX_ITEMS) {
    // Delete the least recently used keys (oldest ones)
    const toDelete = await client.zrange(LRU_TRACKER_KEY, 0, count - MAX_ITEMS - 1);
    if (toDelete.length) {
      await client.del(...toDelete);
      await client.zrem(LRU_TRACKER_KEY, ...toDelete);
      console.log(`🧹 Deleted ${toDelete.length} least recently used keys.`);
    }
  }
};

// Get value and update usage time
export const lruGet = async (key) => {
  const value = await client.get(key);
  if (value !== null) {
    const timestamp = Date.now();
    await client.zadd(LRU_TRACKER_KEY, timestamp, key);
  }
  return value;
};

// Optional: clear LRU tracker (manual reset)
export const clearLRUTracker = async () => {
  await client.del(LRU_TRACKER_KEY);
};

export default client;