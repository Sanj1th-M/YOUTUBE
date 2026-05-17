const VideoProviderInterface = require('../interfaces/VideoProviderInterface');
const pipedService = require('../services/pipedService');

/**
 * Piped Provider Implementation
 * Adapts the existing Piped service to the VideoProviderInterface.
 */
class PipedProvider extends VideoProviderInterface {
  async getTrending(region) {
    const rawData = await pipedService.get('/trending', { region });
    return rawData.map(v => pipedService.normalizeVideo(v));
  }

  async search(query, filter) {
    const rawData = await pipedService.get('/search', { q: query, filter });
    return rawData.items.map(v => pipedService.normalizeVideo(v));
  }

  async getVideoDetails(videoId) {
    const rawData = await pipedService.get(`/videos/${videoId}`);
    const normalized = pipedService.normalizeVideo(rawData);
    normalized.description = rawData.description;
    normalized.subCount = rawData.uploaderSubscriberCount;
    return normalized;
  }

  async getSuggestions(query) {
    return await pipedService.get('/suggestions', { q: query });
  }
}

module.exports = new PipedProvider();
