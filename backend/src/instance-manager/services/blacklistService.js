const config = require('../../config');
const logger = require('../../utils/logger');

/**
 * Blacklist Service
 * Manages temporary suspension of unreliable instances.
 */
class BlacklistService {
  constructor() {
    this.blacklist = new Map(); // instanceUrl -> expirationTime
    this.duration = config.instanceManager.blacklistDurationMs;
  }

  addToBlacklist(instanceUrl) {
    const expiration = Date.now() + this.duration;
    this.blacklist.set(instanceUrl, expiration);
    logger.warn(`Instance ${instanceUrl} blacklisted until ${new Date(expiration).toISOString()}`);
  }

  isBlacklisted(instanceUrl) {
    const expiration = this.blacklist.get(instanceUrl);
    if (!expiration) return false;

    if (Date.now() > expiration) {
      this.blacklist.delete(instanceUrl);
      return false;
    }
    return true;
  }

  getBlacklist() {
    return Array.from(this.blacklist.keys());
  }
}

module.exports = new BlacklistService();
