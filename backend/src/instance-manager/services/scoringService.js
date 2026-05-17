const logger = require('../../utils/logger');

/**
 * Scoring Service
 * Calculates an instance's score based on latency, uptime, and failures.
 */
class ScoringService {
  calculateScore(instance) {
    let score = 0;

    // Latency Score (lower is better, max 50 points)
    // < 200ms = 50, < 500ms = 30, < 1000ms = 10, else 0
    if (instance.latency < 200) score += 50;
    else if (instance.latency < 500) score += 30;
    else if (instance.latency < 1000) score += 10;

    // Stability Score (max 50 points)
    // 0 failures = 50, 1 failure = 30, 2 failures = 10, else 0
    if (instance.failureCount === 0) score += 50;
    else if (instance.failureCount === 1) score += 30;
    else if (instance.failureCount === 2) score += 10;

    // Unhealthy override
    if (!instance.healthy) score = 0;

    return score;
  }

  rankInstances(instances) {
    return instances
      .map(inst => ({ ...inst, score: this.calculateScore(inst) }))
      .sort((a, b) => b.score - a.score);
  }
}

module.exports = new ScoringService();
