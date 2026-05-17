const scoringService = require('./scoringService');
const blacklistService = require('./blacklistService');
const logger = require('../../utils/logger');

/**
 * Routing Service
 * Logic for choosing the optimal instance for a request.
 */
class RoutingService {
  constructor() {
    this.instances = [];
  }

  setInstances(instances) {
    this.instances = instances;
  }

  getBestInstance() {
    const available = this.instances.filter(
      inst => inst.healthy && !blacklistService.isBlacklisted(inst.url)
    );

    if (available.length === 0) {
      logger.error('NO HEALTHY INSTANCES AVAILABLE');
      return null;
    }

    const ranked = scoringService.rankInstances(available);
    
    // Choose from the top 3 healthiest instances (weighted random or best)
    // For Phase 4, we simply take the best one.
    return ranked[0];
  }

  /**
   * Future: Region-aware routing
   */
  getBestInstanceByRegion(region) {
    const instancesInRegion = this.instances.filter(inst => inst.region === region);
    if (instancesInRegion.length > 0) {
      return scoringService.rankInstances(instancesInRegion)[0];
    }
    return this.getBestInstance();
  }
}

module.exports = new RoutingService();
