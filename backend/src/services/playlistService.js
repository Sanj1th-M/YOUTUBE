const db = require('../database');

/**
 * Playlist Service
 * Manages user playlists and items.
 */
class PlaylistService {
  async createPlaylist(userId, title, description) {
    const query = `
      INSERT INTO playlists (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await db.query(query, [userId, title, description]);
    return result.rows[0];
  }

  async getPlaylists(userId) {
    const query = 'SELECT * FROM playlists WHERE user_id = $1 ORDER BY updated_at DESC';
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  async addPlaylistItem(playlistId, videoId) {
    const query = 'INSERT INTO playlist_items (playlist_id, video_id) VALUES ($1, $2)';
    await db.query(query, [playlistId, videoId]);
  }

  async getPlaylistItems(playlistId) {
    const query = 'SELECT * FROM playlist_items WHERE playlist_id = $1 ORDER BY position ASC, added_at DESC';
    const result = await db.query(query, [playlistId]);
    return result.rows;
  }
}

module.exports = new PlaylistService();
