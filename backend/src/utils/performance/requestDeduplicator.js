const logger = require('../logger');

/**
 * Request Deduplicator
 * Prevents multiple identical requests from being processed simultaneously.
 * Useful for high-traffic endpoints like home feed or trending.
 */
class RequestDeduplicator {
  constructor() {
    this.pendingRequests = new Map(); // key -> Promise
  }

  /**
   * Executes a function or returns an existing promise if already in flight.
   */
  async deduplicate(key, fn) {
    if (this.pendingRequests.has(key)) {
      logger.debug(`Deduplicating Request: ${key}`);
      return this.pendingRequests.get(key);
    }

    const promise = fn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

module.exports = new RequestDeduplicator();
