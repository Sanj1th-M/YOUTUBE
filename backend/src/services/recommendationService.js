const cacheService = require('../services/cacheService');
const videoService = require('../services/videoService');
const scoringEngine = require('../../../recommendation-engine/src/ranking/scoringEngine');
const candidateProvider = require('../../../recommendation-engine/src/candidates/candidateProvider');
const logger = require('../utils/logger');

class RecommendationService {
  async generateHomeFeed(userId, sessionContext = null) {
    const cacheKey = cacheService.generateKey('home_feed', { userId, sessionContext });
    
    // 1. Try Cache
    const cachedFeed = await cacheService.get(cacheKey);
    if (cachedFeed) return cachedFeed;

    try {
      const candidates = await candidateProvider.getHomeCandidates(userId, sessionContext);
      const rankedFeed = scoringEngine.rank(candidates, { userId, sessionContext });
      const finalFeed = rankedFeed.slice(0, 40);

      // 2. Set Cache (Short TTL for home feed)
      await cacheService.set(cacheKey, finalFeed, cacheService.TTL_STRATEGY.HOME_FEED);
      
      return finalFeed;
    } catch (error) {
      logger.error('Failed to generate home feed', error);
      return await videoService.getTrending();
    }
  }

  async generateRelatedFeed(videoId, userId = null) {
    const cacheKey = cacheService.generateKey('related_feed', { videoId, userId });
    const cached = await cacheService.get(cacheKey);
    if (cached) return cached;

    try {
      const candidates = await candidateProvider.getRelatedCandidates(videoId, userId);
      const feed = scoringEngine.rank(candidates, { userId, contextVideoId: videoId }).slice(0, 20);
      
      await cacheService.set(cacheKey, feed, cacheService.TTL_STRATEGY.TRENDING);
      return feed;
    } catch (error) {
      logger.error('Failed to generate related feed', error);
      return await videoService.getRelatedVideos(videoId);
    }
  }
}

module.exports = new RecommendationService();
