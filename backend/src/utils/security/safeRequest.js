const axios = require('axios');
const ssrfProtection = require('../../services/security/ssrfProtection');
const logger = require('../logger');

/**
 * Safe Outbound Request Layer
 * Ensures all external requests are validated and protected against common vulnerabilities.
 */
class SafeRequest {
  constructor() {
    this.client = axios.create({
      timeout: 10000, // 10s default timeout
    });
  }

  /**
   * Executes a safe GET request.
   */
  async get(url, config = {}) {
    ssrfProtection.validateUrl(url);

    try {
      return await this.client.get(url, config);
    } catch (error) {
      this._handleRequestError(url, error);
    }
  }

  /**
   * Executes a safe POST request.
   */
  async post(url, data, config = {}) {
    ssrfProtection.validateUrl(url);

    try {
      return await this.client.post(url, data, config);
    } catch (error) {
      this._handleRequestError(url, error);
    }
  }

  /**
   * Internal error handler for external requests.
   */
  _handleRequestError(url, error) {
    const status = error.response ? error.response.status : 'TIMEOUT/NETWORK';
    logger.error(`[SECURITY] SafeRequest Failure [${status}]: ${url}`, {
      message: error.message,
      stack: error.stack,
    });
    throw error;
  }
}

module.exports = new SafeRequest();
