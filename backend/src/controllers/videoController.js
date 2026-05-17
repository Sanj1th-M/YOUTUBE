const cacheService = require('../services/cacheService');
const videoService = require('../services/videoService');
const ApiResponse = require('../utils/ApiResponse');
const catchAsync = require('../utils/catchAsync');

const getHomeFeed = catchAsync(async (req, res) => {
  const { category = 'All', page = 1 } = req.query;
  const userId = req.user ? req.user.id : 'guest';
  
  const cacheKey = cacheService.genKey('home', userId, category, page);
  
  const videos = await cacheService.wrap(cacheKey, async () => {
    // This would ideally call a recommendation engine that returns normalized data
    // For now we use videoService trending as a proxy
    return await videoService.getTrending();
  }, cacheService.durations.MEDIUM);

  ApiResponse.success(res, videos);
});

const searchVideos = catchAsync(async (req, res) => {
  const { q, page = 1 } = req.query;
  
  const cacheKey = cacheService.genKey('search', q, page);
  
  const results = await cacheService.wrap(cacheKey, async () => {
    return await videoService.search(q);
  }, cacheService.durations.SHORT);

  ApiResponse.success(res, results);
});

const getVideoById = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  const cacheKey = cacheService.genKey('video', id);
  
  const video = await cacheService.wrap(cacheKey, async () => {
    return await videoService.getVideoDetails(id);
  }, cacheService.durations.LONG);

  ApiResponse.success(res, video);
});

const getRelatedVideos = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  const cacheKey = cacheService.genKey('related', id);
  
  const related = await cacheService.wrap(cacheKey, async () => {
    return await videoService.getRelatedVideos(id);
  }, cacheService.durations.LONG);

  ApiResponse.success(res, related);
});

const getSuggestions = catchAsync(async (req, res) => {
  const { q } = req.query;
  
  const cacheKey = cacheService.genKey('suggestions', q);
  
  const suggestions = await cacheService.wrap(cacheKey, async () => {
    return await videoService.getSuggestions(q);
  }, cacheService.durations.LONG);

  ApiResponse.success(res, suggestions);
});

module.exports = {
  getHomeFeed,
  searchVideos,
  getVideoById,
  getRelatedVideos,
  getSuggestions,
};
