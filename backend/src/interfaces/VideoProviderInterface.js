/**
 * Base Video Provider Interface
 * Defines the contract all external video sources must follow.
 */
class VideoProviderInterface {
  async getTrending(region) { throw new Error('Not implemented'); }
  async search(query, filter) { throw new Error('Not implemented'); }
  async getVideoDetails(videoId) { throw new Error('Not implemented'); }
  async getSuggestions(query) { throw new Error('Not implemented'); }
}

module.exports = VideoProviderInterface;
