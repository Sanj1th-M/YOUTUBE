const logger = require('../utils/logger');

/**
 * Request Logging Middleware
 * Logs incoming requests with timing and status.
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl, ip } = req;
    const { statusCode } = res;

    const logData = {
      method,
      url: originalUrl,
      status: statusCode,
      duration: `${duration}ms`,
      ip,
    };

    if (statusCode >= 500) {
      logger.error(`API Error: ${method} ${originalUrl}`, logData);
    } else if (statusCode >= 400) {
      logger.warn(`API Warning: ${method} ${originalUrl}`, logData);
    } else {
      logger.info(`API Request: ${method} ${originalUrl}`, logData);
    }
  });

  next();
};

module.exports = requestLogger;
