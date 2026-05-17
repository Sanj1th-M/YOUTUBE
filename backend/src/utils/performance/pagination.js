const logger = require('../utils/logger');

/**
 * Pagination Helper
 * Standardizes continuation tokens and page-based result sets.
 */
class PaginationHelper {
  /**
   * Formats a paginated response.
   */
  formatResponse(items, totalCount, currentPage, limit) {
    const totalPages = Math.ceil(totalCount / limit);
    
    return {
      items,
      meta: {
        total: totalCount,
        page: currentPage,
        limit,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        // Continuation token for infinite scroll compatibility
        nextPageToken: currentPage < totalPages ? Buffer.from(`page:${currentPage + 1}`).toString('base64') : null,
      }
    };
  }

  /**
   * Decodes a continuation token to get page/offset.
   */
  decodeToken(token) {
    if (!token) return { page: 1 };
    try {
      const decoded = Buffer.from(token, 'base64').toString('ascii');
      const [type, value] = decoded.split(':');
      return { page: parseInt(value, 10) || 1 };
    } catch (err) {
      return { page: 1 };
    }
  }
}

module.exports = new PaginationHelper();
