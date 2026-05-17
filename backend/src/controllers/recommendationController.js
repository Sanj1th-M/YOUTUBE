const recommendationService = require('../services/recommendationService');
const cacheService = require('../services/cacheService');
const ApiResponse = require('../utils/ApiResponse');
const catchAsync = require('../utils/catchAsync');

const getHomeFeed = catchAsync(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const category = req.query.category || 'All';
  
  // 1. Try Cache
  const cacheKey = cacheService.generateKey('home_feed', `${userId || 'guest'}_${category}`);
  const cachedData = await cacheService.get(cacheKey);
  if (cachedData) {
    return ApiResponse.success(res, cachedData, 'Success (from cache)');
  }

  // 2. Generate Feed
  const feed = await recommendationService.generateHomeFeed(userId, category === 'All' ? null : category);
  
  // 3. Set Cache
  await cacheService.set(cacheKey, feed, 'home_feed');

  ApiResponse.success(res, feed);
});

const getRelatedVideos = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user ? req.user.id : null;
  
  const related = await recommendationService.generateRelatedFeed(id, userId);
  ApiResponse.success(res, related);
});

module.exports = {
  getHomeFeed,
  getRelatedVideos,
};
