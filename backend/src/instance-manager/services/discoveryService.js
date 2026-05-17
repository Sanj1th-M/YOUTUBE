const requestLayer = require('../utils/requestLayer');
const config = require('../../config');
const logger = require('../../utils/logger');

/**
 * Discovery Service
 * Fetches and normalizes the public Piped instance list.
 */
class DiscoveryService {
  constructor() {
    this.discoveryUrl = config.instanceManager.discoveryUrl;
  }

  async discover() {
    try {
      logger.info('Starting Piped instance discovery...');
      const response = await requestLayer.request(this.discoveryUrl);
      
      if (!Array.isArray(response.data)) {
        logger.error('Invalid discovery response format');
        return [];
      }

      const normalizedInstances = response.data.map(inst => ({
        url: inst.api_endpoint.replace('https://', '').replace(/\/$/, ''),
        name: inst.name,
        region: inst.locations?.[0] || 'Unknown',
        healthy: true,
        latency: 0,
        score: 0,
        failureCount: 0,
        lastChecked: new Date(),
        version: inst.version,
      }));

      logger.info(`Discovered ${normalizedInstances.length} instances`);
      return normalizedInstances;
    } catch (error) {
      logger.error('Instance discovery failed', error.message);
      return [];
    }
  }
}

module.exports = new DiscoveryService();
