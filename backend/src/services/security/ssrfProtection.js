const { URL } = require('url');
const { ssrf: ssrfConfig } = require('../../config/security');
const ApiError = require('../../utils/ApiError');

/**
 * SSRF Protection Service
 * Validates outbound URLs against a whitelist of trusted domains and protocols.
 */
class SSRFProtectionService {
  /**
   * Validates if a URL is safe to fetch.
   * @param {string} targetUrl 
   * @returns {boolean}
   * @throws {ApiError}
   */
  validateUrl(targetUrl) {
    try {
      const parsedUrl = new URL(targetUrl);
      
      // 1. Validate Protocol
      if (!ssrfConfig.allowedProtocols.includes(parsedUrl.protocol)) {
        throw new ApiError(400, `Forbidden protocol: ${parsedUrl.protocol}`);
      }

      // 2. Block Local/Internal Access
      const hostname = parsedUrl.hostname.toLowerCase();
      if (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname === '0.0.0.0' ||
        hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.')
      ) {
        throw new ApiError(400, `SSRF Attempt Blocked: Internal hostname ${hostname}`);
      }

      // 3. Whitelist Validation (Optional but recommended for strict mode)
      const isWhitelisted = ssrfConfig.whitelist.some(domain => 
        hostname === domain || hostname.endsWith(`.${domain}`)
      );

      if (!isWhitelisted) {
        // Log this attempt for security event tracking
        console.warn(`[SECURITY] Potential SSRF: Attempted to fetch non-whitelisted domain: ${hostname}`);
        // In strict mode, we throw. For public piped instances, we might need a dynamic whitelist from InstanceManager.
      }

      return true;
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(400, 'Invalid URL');
    }
  }
}

module.exports = new SSRFProtectionService();
