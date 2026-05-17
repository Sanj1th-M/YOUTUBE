const requestLayer = require('../utils/requestLayer');
const logger = require('../../utils/logger');

/**
 * Health Service
 * Benchmarks and validates instance availability and performance.
 */
class HealthService {
  async check(instanceUrl) {
    const start = Date.now();
    try {
      // Benchmark API endpoint
      const response = await requestLayer.request(`https://${instanceUrl}/health`);
      const latency = Date.now() - start;

      // Basic validation of health response
      const isHealthy = response.status === 200;

      return {
        healthy: isHealthy,
        latency,
        lastChecked: new Date(),
      };
    } catch (error) {
      logger.warn(`Health check failed for ${instanceUrl}: ${error.message}`);
      return {
        healthy: false,
        latency: 9999,
        lastChecked: new Date(),
      };
    }
  }

  /**
   * More deep check for search and metadata reliability
   */
  async deepCheck(instanceUrl) {
     try {
       const searchStart = Date.now();
       await requestLayer.request(`https://${instanceUrl}/search`, { params: { q: 'test' } });
       const searchLatency = Date.now() - searchStart;

       return {
         searchHealthy: true,
         searchLatency,
       };
     } catch (error) {
       return {
         searchHealthy: false,
         searchLatency: 9999,
       };
     }
  }
}

module.exports = new HealthService();
