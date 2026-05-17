const safeRequest = require('../utils/security/safeRequest');
const resilience = require('../utils/resilience');
const instanceManager = require('../instance-manager');
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

/**
 * Piped Service handles communication with public Piped instances.
 * Implements normalization, SSRF protection, and resilience patterns.
 */
class PipedService {
  /**
   * Executes a resilient GET request to a Piped instance.
   */
  async get(endpoint, params = {}) {
    return await resilience.withRetry(async () => {
      const instance = instanceManager.getBestInstance();
      if (!instance) {
        throw new ApiError(503, 'No healthy Piped instances available');
      }
      
      const url = `https://${instance.url}${endpoint}`;
      logger.debug(`[STABILIZATION] Piped Request: ${url}`);

      try {
        const response = await safeRequest.get(url, { 
          params,
          headers: { 'User-Agent': 'YOUTUBE-Platform/1.0' }
        });
        return response.data;
      } catch (error) {
        // Mark instance as failed in instance manager
        instanceManager.handleFailure(instance.url);
        throw error;
      }
    }, { name: `Piped-GET-${endpoint}` });
  }

  /**
   * Normalizes raw Piped video data into the internal Video model.
   * Centralized mapping to ensure API consistency.
   */
  normalizeVideo(raw) {
    if (!raw) return null;
    
    return {
      id: raw.videoId || raw.id,
      title: raw.title || 'Unknown Title',
      thumbnail: raw.thumbnail || (raw.thumbnails && raw.thumbnails[0]?.url) || '',
      duration: raw.duration || '0:00',
      views: raw.views || 0,
      channel: {
        id: raw.uploaderId || raw.uploaderUrl?.split('/').pop() || 'unknown',
        name: raw.uploaderName || raw.uploader || 'Unknown Channel',
        thumbnail: raw.uploaderAvatar || '',
      },
      uploadedAt: raw.uploadedDate || raw.uploadDate || 'Recently',
      type: raw.type || 'video',
    };
  }
}

module.exports = new PipedService();
