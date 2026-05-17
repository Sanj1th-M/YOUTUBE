const logger = require('../utils/logger');

/**
 * Internal Metrics Service
 * Tracks application-level metrics for performance and failure detection.
 */
class MetricsService {
  constructor() {
    this.metrics = {
      api_calls: {},
      errors: {},
      playback_failures: 0,
      instance_health: {},
      cache: { hits: 0, misses: 0, failures: 0 },
      db: { connections: 0, slow_queries: 0 },
      downloads: { success: 0, failure: 0 }
    };
  }

  /**
   * Increments a counter for a specific category and key.
   */
  increment(category, key = 'total') {
    if (!this.metrics[category]) this.metrics[category] = {};
    if (typeof this.metrics[category] === 'object') {
      this.metrics[category][key] = (this.metrics[category][key] || 0) + 1;
    } else {
      this.metrics[category]++;
    }
  }

  /**
   * Tracks a specific timing or value.
   */
  observe(category, value) {
    // Basic implementation: could track avg/max in future
    logger.debug(`[METRIC] ${category}: ${value}`);
  }

  /**
   * Logs a snapshot of current metrics.
   */
  logSnapshot() {
    logger.info('System Metrics Snapshot', this.metrics);
  }

  /**
   * Resets metrics (e.g. after a reporting period).
   */
  reset() {
    // Implementation for reset if needed
  }
}

module.exports = new MetricsService();
