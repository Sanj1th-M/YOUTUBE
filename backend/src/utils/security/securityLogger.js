const logger = require('../logger');
const { v4: uuidv4 } = require('uuid');

/**
 * Security Logger
 * Standardized logging for security events with unique event IDs.
 */
class SecurityLogger {
  /**
   * Logs a security event.
   */
  log(event, details = {}, level = 'warn') {
    const eventId = uuidv4();
    const payload = {
      eventId,
      event,
      timestamp: new Date().toISOString(),
      ...this._maskSensitiveData(details),
    };

    logger[level](`[SECURITY_EVENT] ${event} (${eventId})`, payload);
    return eventId;
  }

  /**
   * Masks sensitive data like passwords or tokens.
   */
  _maskSensitiveData(details) {
    const masked = { ...details };
    const sensitiveKeys = ['password', 'token', 'accessToken', 'refreshToken', 'secret'];

    for (const key of Object.keys(masked)) {
      if (sensitiveKeys.some(sk => key.toLowerCase().includes(sensitiveKeys))) {
        masked[key] = '********';
      }
    }

    return masked;
  }
}

module.exports = new SecurityLogger();
