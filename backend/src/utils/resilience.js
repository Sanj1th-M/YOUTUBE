const logger = require('./logger');

/**
 * Resilience Utility (PHASE 15)
 * Standardizes retry logic and graceful degradation across services.
 */
class ResilienceUtils {
  /**
   * Exponential backoff retry helper.
   */
  async withRetry(fn, options = {}) {
    const { 
      maxRetries = 3, 
      initialDelay = 1000, 
      onRetry = null,
      name = 'Operation'
    } = options;

    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        const delay = initialDelay * Math.pow(2, i);
        
        logger.warn(`[RESILIENCE] ${name} failed (attempt ${i + 1}/${maxRetries}). Retrying in ${delay}ms...`);
        
        if (onRetry) onRetry(err, i);
        
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    logger.error(`[RESILIENCE] ${name} exhausted all ${maxRetries} retries.`);
    throw lastError;
  }

  /**
   * Safe execution with fallback value.
   */
  async withFallback(fn, fallbackValue, name = 'Operation') {
    try {
      return await fn();
    } catch (err) {
      logger.warn(`[RESILIENCE] ${name} failed. Returning fallback.`, { error: err.message });
      return fallbackValue;
    }
  }
}

module.exports = new ResilienceUtils();
