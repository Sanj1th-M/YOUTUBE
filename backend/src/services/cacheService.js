const { client } = require('../cache');
const logger = require('../utils/logger');

/**
 * Cache Service
 * Centralized Redis-based caching system with TTL strategies and wrap helper.
 */
class CacheService {
  constructor() {
    this.TTL_STRATEGY = {
      HOME_FEED: 60 * 5,        // 5 minutes
      TRENDING: 60 * 15,       // 15 minutes
      METADATA: 60 * 60,       // 1 hour
      SUGGESTIONS: 60 * 30,    // 30 minutes
      POPULAR_QUERIES: 60 * 60, // 1 hour
      SEARCH: 60 * 15          // 15 minutes
    };
  }

  async get(key) {
    try {
      const data = await client.get(key);
      if (data) {
        logger.debug(`Cache Hit: ${key}`);
        return JSON.parse(data);
      }
      logger.debug(`Cache Miss: ${key}`);
      return null;
    } catch (error) {
      logger.error(`Cache Get Error: ${key}`, error);
      return null;
    }
  }

  async set(key, value, ttlInSeconds = 3600) {
    try {
      await client.set(key, JSON.stringify(value), {
        EX: ttlInSeconds
      });
      logger.debug(`Cache Set: ${key} (TTL: ${ttlInSeconds}s)`);
    } catch (error) {
      logger.error(`Cache Set Error: ${key}`, error);
    }
  }

  /**
   * Helper to wrap an expensive operation with caching logic.
   */
  async wrap(key, operation, ttlInSeconds = 3600) {
    const cached = await this.get(key);
    if (cached) return cached;

    const freshData = await operation();
    if (freshData) {
      await this.set(key, freshData, ttlInSeconds);
    }
    return freshData;
  }

  async delete(key) {
    try {
      await client.del(key);
      logger.debug(`Cache Delete: ${key}`);
    } catch (error) {
      logger.error(`Cache Delete Error: ${key}`, error);
    }
  }

  /**
   * Generates a consistent cache key based on a prefix and parameters.
   */
  generateKey(prefix, params = {}) {
    const suffix = Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join(':');
    return suffix ? `yt:${prefix}:${suffix}` : `yt:${prefix}`;
  }
}

module.exports = new CacheService();
