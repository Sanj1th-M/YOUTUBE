const db = require('../database');
const logger = require('../utils/logger');

/**
 * Signal Tracking Service
 * Captures granular user signals for future AI/ML ranking.
 */
class SignalTrackingService {
  /**
   * Tracks a watch event.
   */
  async trackWatch(userId, videoId, duration, percent) {
    const query = `
      INSERT INTO recommendation_signals (user_id, video_id, event_type, value, timestamp)
      VALUES ($1, $2, 'watch_progress', $3, CURRENT_TIMESTAMP)
    `;
    // We reuse the watch_history table but also log a signal for the engine
    await db.query(query, [userId, videoId, percent]);
  }

  /**
   * Tracks a search click event.
   */
  async trackSearchClick(userId, queryTerm, videoId) {
    const sql = `
      INSERT INTO recommendation_signals (user_id, video_id, event_type, metadata, timestamp)
      VALUES ($1, $2, 'search_click', $3, CURRENT_TIMESTAMP)
    `;
    await db.query(sql, [userId, videoId, JSON.stringify({ query: queryTerm })]);
  }
}

module.exports = new SignalTrackingService();
