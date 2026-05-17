const logger = require('../utils/logger');

/**
 * Alert Service
 * Orchestrates critical failure notifications and alert routing.
 */
class AlertService {
  /**
   * Triggers an alert for a critical system failure.
   */
  async trigger(severity, title, details = {}) {
    const alertId = `ALERT-${Date.now()}`;
    
    const alertPayload = {
      alertId,
      severity, // 'CRITICAL', 'WARNING'
      title,
      timestamp: new Date().toISOString(),
      details,
    };

    // For Phase 14: Log with high visibility
    // Future: Integrate with PagerDuty, Slack, or Email
    logger.error(`[ALERT] [${severity}] ${title}`, alertPayload);

    return alertId;
  }

  /**
   * Specialized alert for backend crashes.
   */
  async notifyCrash(error) {
    return await this.trigger('CRITICAL', 'Backend Service Crash Detected', {
      error: error.message,
      stack: error.stack,
    });
  }

  /**
   * Specialized alert for database downtime.
   */
  async notifyDBDown(details) {
    return await this.trigger('CRITICAL', 'Database Connection Lost', details);
  }
}

module.exports = new AlertService();
