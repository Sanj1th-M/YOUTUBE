const recommendationService = require('./recommendationService');
const cacheService = require('./cacheService');
const logger = require('../utils/logger');

/**
 * Performance Optimized Recommendation Service
 * Wraps base service with caching logic.
 */
class OptimizedRecommendationService {
  async getCachedHomeFeed(userId, sessionContext) {
    const cacheKey = cacheService.generateKey('feed:home', userId || 'guest');
    
    // 1. Try Cache
    const cached = await cacheService.get(cacheKey);
    if (cached) return cached;

    // 2. Generate Feed
    const feed = await recommendationService.generateHomeFeed(userId, sessionContext);

    // 3. Cache Result (Short TTL for feeds)
    await cacheService.set(cacheKey, feed, 'feed');
    
    return feed;
  }

  async getCachedRelatedFeed(videoId, userId) {
    const cacheKey = cacheService.generateKey('feed:related', videoId);
    
    const cached = await cacheService.get(cacheKey);
    if (cached) return cached;

    const related = await recommendationService.generateRelatedFeed(videoId, userId);
    await cacheService.set(cacheKey, related, 'metadata');

    return related;
  }
}

module.exports = new OptimizedRecommendationService();
