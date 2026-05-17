const discoveryService = require('./services/discoveryService');
const healthService = require('./services/healthService');
const routingService = require('./services/routingService');
const blacklistService = require('./services/blacklistService');
const config = require('../config');
const logger = require('../utils/logger');
const { client: redis } = require('../cache');

/**
 * Instance Manager Module Entry Point
 * Orchestrates discovery, health monitoring, and routing.
 */
class InstanceManager {
  constructor() {
    this.instances = [];
    this.intervalId = null;
  }

  async init() {
    logger.info('Initializing Instance Manager...');
    
    // 1. Initial Discovery
    this.instances = await discoveryService.discover();
    
    if (this.instances.length === 0) {
      // Fallback to whitelist if discovery fails
      this.instances = config.piped.whitelist.map(url => ({
        url,
        region: 'Unknown',
        healthy: true,
        latency: 0,
        score: 0,
        failureCount: 0,
        lastChecked: new Date(),
      }));
    }

    // 2. Initial Health Check
    await this.performHealthChecks();

    // 3. Start Periodic Monitoring
    this.startMonitoring();
    
    logger.info('Instance Manager initialized successfully');
  }

  async performHealthChecks() {
    logger.info('Running health checks on all instances...');
    const checks = this.instances.map(async (inst) => {
      const result = await healthService.check(inst.url);
      
      inst.healthy = result.healthy;
      inst.latency = result.latency;
      inst.lastChecked = result.lastChecked;

      if (!result.healthy) {
        inst.failureCount++;
        if (inst.failureCount >= config.instanceManager.maxFailures) {
          blacklistService.addToBlacklist(inst.url);
        }
      } else {
        inst.failureCount = 0;
      }
    });

    await Promise.all(checks);
    routingService.setInstances(this.instances);
    
    // Update cache
    await redis.set('active_instances', JSON.stringify(this.instances));
  }

  startMonitoring() {
    this.intervalId = setInterval(() => {
      this.performHealthChecks();
    }, config.instanceManager.checkIntervalMs);
  }

  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getBestInstance() {
    return routingService.getBestInstance();
  }

  /**
   * Proactively marks an instance as failed.
   */
  handleFailure(url) {
    const instance = this.instances.find(i => i.url === url);
    if (instance) {
      instance.failureCount++;
      logger.warn(`Proactive failure detected for instance: ${url} (count: ${instance.failureCount})`);
      
      if (instance.failureCount >= config.instanceManager.maxFailures) {
        instance.healthy = false;
        blacklistService.addToBlacklist(url);
        routingService.setInstances(this.instances);
      }
    }
  }
}

const manager = new InstanceManager();
module.exports = manager;
