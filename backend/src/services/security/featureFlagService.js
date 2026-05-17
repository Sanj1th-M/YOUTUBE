const config = require('../config');

/**
 * Feature Flag Service
 * Centralized control for toggling features and experimental logic.
 */
class FeatureFlagService {
  constructor() {
    this.flags = {
      PREMIUM_DOWNLOADS: config.env === 'production',
      ADVANCED_RECOMMENDATIONS: true,
      PERSONALIZED_FEED: true,
      EXPERIMENTAL_PLAYER: false,
      REDIS_CACHE_ENABLED: true,
      DYNAMIC_INSTANCE_ROTATION: true,
    };
  }

  /**
   * Checks if a specific feature is enabled.
   */
  isEnabled(flagName) {
    return !!this.flags[flagName];
  }

  /**
   * Returns all active flags (useful for frontend hydration).
   */
  getAllFlags() {
    return this.flags;
  }
}

module.exports = new FeatureFlagService();
