const db = require('../database');

/**
 * History Service
 * Manages watch and search history tracking.
 */
class HistoryService {
  async addWatchHistory(userId, videoId, duration, percent) {
    const query = `
      INSERT INTO watch_history (user_id, video_id, duration_watched, completion_percent)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (user_id, video_id) DO UPDATE SET
        duration_watched = EXCLUDED.duration_watched,
        completion_percent = EXCLUDED.completion_percent,
        last_watched_at = CURRENT_TIMESTAMP
    `;
    // Note: Add UNIQUE constraint (user_id, video_id) in migration if ON CONFLICT used
    await db.query(query, [userId, videoId, duration, percent]);
  }

  async getWatchHistory(userId, limit = 50) {
    const query = `
      SELECT * FROM watch_history 
      WHERE user_id = $1 
      ORDER BY last_watched_at DESC 
      LIMIT $2
    `;
    const result = await db.query(query, [userId, limit]);
    return result.rows;
  }

  async addSearchHistory(userId, query) {
    const sql = 'INSERT INTO search_history (user_id, query) VALUES ($1, $2)';
    await db.query(sql, [userId, query]);
  }

  async getSearchHistory(userId, limit = 10) {
    const sql = 'SELECT query, searched_at FROM search_history WHERE user_id = $1 ORDER BY searched_at DESC LIMIT $2';
    const result = await db.query(sql, [userId, limit]);
    return result.rows;
  }

  async clearSearchHistory(userId) {
    const sql = 'DELETE FROM search_history WHERE user_id = $1';
    await db.query(sql, [userId]);
  }
}

module.exports = new HistoryService();
