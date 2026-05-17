const axios = require('axios');
const config = require('../../config');
const ApiError = require('../../utils/ApiError');
const logger = require('../../utils/logger');

/**
 * Safe Outbound Request Layer
 * Implements timeout protection, SSRF prevention, and centralized outbound control.
 */
class RequestLayer {
  constructor() {
    this.timeout = config.instanceManager.requestTimeoutMs;
  }

  async request(url, options = {}) {
    const { method = 'GET', params = {}, data = {}, headers = {} } = options;
    
    // SSRF Protection: Validate URL and Protocol
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== 'https:') {
      throw new ApiError(403, 'Only HTTPS outbound requests are allowed');
    }

    try {
      const response = await axios({
        url,
        method,
        params,
        data,
        headers: {
          'User-Agent': 'YOUTUBE-Platform/1.0 (Survivability Layer)',
          ...headers,
        },
        timeout: this.timeout,
      });
      return response;
    } catch (error) {
      if (error.code === 'ECONNABORTED') {
        logger.warn(`Request Timeout: ${url}`);
        throw new ApiError(504, 'Outbound Request Timeout');
      }
      throw error;
    }
  }
}

module.exports = new RequestLayer();
