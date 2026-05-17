const pipedService = require('./pipedService');
const historyService = require('./historyService');
const logger = require('../utils/logger');

/**
 * Search Service
 * Orchestrates video search and autocomplete suggestions.
 */
class SearchService {
  /**
   * Performs a normalized search request to Piped.
   */
  async search(query, userId = null) {
    logger.debug(`Searching for: ${query}`);
    
    // 1. Fetch from Piped
    const rawData = await pipedService.get('/search', { q: query, filter: 'all' });
    
    // 2. Normalize results
    const results = rawData.items.map(v => pipedService.normalizeVideo(v));

    // 3. Track search history for authenticated users
    if (userId && query) {
      await historyService.addSearchHistory(userId, query);
    }

    return results;
  }

  /**
   * Fetches search suggestions (autocomplete).
   */
  async getSuggestions(query) {
    if (!query) return [];
    return await pipedService.get('/suggestions', { q: query });
  }

  /**
   * Retrieves recent searches for a user.
   */
  async getRecentSearches(userId) {
    return await historyService.getSearchHistory(userId);
  }

  /**
   * Clears search history for a user.
   */
  async clearHistory(userId) {
    await historyService.clearSearchHistory(userId);
  }
}

module.exports = new SearchService();
