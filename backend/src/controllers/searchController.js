const searchService = require('../services/searchService');
const ApiResponse = require('../utils/ApiResponse');
const catchAsync = require('../utils/catchAsync');

const search = catchAsync(async (req, res) => {
  const { q } = req.query;
  const userId = req.user ? req.user.id : null;
  const results = await searchService.search(q, userId);
  ApiResponse.success(res, results);
});

const getSuggestions = catchAsync(async (req, res) => {
  const { q } = req.query;
  const suggestions = await searchService.getSuggestions(q);
  ApiResponse.success(res, suggestions);
});

const getHistory = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const history = await searchService.getRecentSearches(userId);
  ApiResponse.success(res, history);
});

const clearHistory = catchAsync(async (req, res) => {
  const userId = req.user.id;
  await searchService.clearHistory(userId);
  ApiResponse.success(res, null, 'Search history cleared');
});

module.exports = {
  search,
  getSuggestions,
  getHistory,
  clearHistory,
};
