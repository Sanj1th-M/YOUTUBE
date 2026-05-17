const winston = require('winston');
const config = require('../config');

/**
 * Sensitive data scrubbing format
 */
const scrubSensitive = winston.format((info) => {
  const sensitiveKeys = ['password', 'token', 'accessToken', 'refreshToken', 'secret', 'authorization'];
  
  const scrub = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    const scrubbed = Array.isArray(obj) ? [...obj] : { ...obj };
    
    for (const key in scrubbed) {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
        scrubbed[key] = '********';
      } else if (typeof scrubbed[key] === 'object') {
        scrubbed[key] = scrub(scrubbed[key]);
      }
    }
    return scrubbed;
  };

  return scrub(info);
});

/**
 * Unified Logger (Winston)
 * Features: Structured JSON in production, colored text in development.
 */
const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    scrubSensitive(),
    config.env === 'production' 
      ? winston.format.json() 
      : winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(({ timestamp, level, message, ...meta }) => {
            return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
          })
        )
  ),
  transports: [
    new winston.transports.Console()
  ],
});

module.exports = logger;
