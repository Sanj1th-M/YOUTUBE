const pipedProvider = require('../providers/PipedProvider');
const cacheService = require('./cacheService');
const logger = require('../utils/logger');

/**
 * Video Service - REFACTORED (PHASE 15)
 * Now orchestrates data using abstracted Providers.
 */
class VideoService {
  constructor(provider = pipedProvider) {
    this.provider = provider;
  }

  async getTrending(region = 'US') {
    const cacheKey = cacheService.generateKey('trending', region);
    
    return await cacheService.wrap(cacheKey, async () => {
      try {
        return await this.provider.getTrending(region);
      } catch (err) {
        logger.error(`[PHASE 15] Provider error in getTrending`, err);
        throw err;
      }
    }, cacheService.TTL_STRATEGY.TRENDING);
  }

  async search(query, filter = 'all') {
    const cacheKey = cacheService.generateKey('search', `${query}:${filter}`);

    return await cacheService.wrap(cacheKey, async () => {
      try {
        return await this.provider.search(query, filter);
      } catch (err) {
        logger.error(`[PHASE 15] Provider error in search`, err);
        throw err;
      }
    }, cacheService.TTL_STRATEGY.SEARCH);
  }

  async getVideoDetails(videoId) {
    const cacheKey = cacheService.generateKey('video', { id: videoId });

    return await cacheService.wrap(cacheKey, async () => {
      try {
        return await this.provider.getVideoDetails(videoId);
      } catch (err) {
        logger.error(`[PHASE 15] Provider error in getVideoDetails`, err);
        throw err;
      }
    }, cacheService.TTL_STRATEGY.METADATA);
  }

  async getSuggestions(query) {
    const cacheKey = cacheService.generateKey('suggestions', { q: query });
    
    return await cacheService.wrap(cacheKey, async () => {
      return await this.provider.getSuggestions(query);
    }, cacheService.TTL_STRATEGY.SUGGESTIONS);
  }
}

module.exports = new VideoService();
