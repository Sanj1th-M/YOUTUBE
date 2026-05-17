const db = require('../database');
const ApiError = require('../utils/ApiError');

/**
 * Download Service
 * Manages the backend lifecycle of media downloads.
 */
class DownloadService {
  async startDownload(userId, downloadData) {
    const { videoId, title, thumbnailUrl, type } = downloadData;
    const query = `
      INSERT INTO downloads (user_id, video_id, title, thumbnail_url, download_type, status)
      VALUES ($1, $2, $3, $4, $5, 'queued')
      RETURNING *
    `;
    const result = await db.query(query, [userId, videoId, title, thumbnailUrl, type]);
    return result.rows[0];
  }

  async getUserDownloads(userId) {
    const query = 'SELECT * FROM downloads WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await db.query(query, [userId]);
    return result.rows;
  }

  async updateDownloadStatus(id, userId, statusData) {
    const { status, progress, downloadedBytes, totalBytes, filePath, errorMessage } = statusData;
    const query = `
      UPDATE downloads 
      SET status = COALESCE($1, status),
          progress = COALESCE($2, progress),
          downloaded_bytes = COALESCE($3, downloaded_bytes),
          total_bytes = COALESCE($4, total_bytes),
          file_path = COALESCE($5, file_path),
          error_message = COALESCE($6, error_message),
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $7 AND user_id = $8
      RETURNING *
    `;
    const result = await db.query(query, [status, progress, downloadedBytes, totalBytes, filePath, errorMessage, id, userId]);
    
    if (result.rows.length === 0) {
      throw new ApiError(404, 'Download not found');
    }
    
    return result.rows[0];
  }

  async removeDownload(id, userId) {
    const query = 'DELETE FROM downloads WHERE id = $1 AND user_id = $2 RETURNING id';
    const result = await db.query(query, [id, userId]);
    
    if (result.rows.length === 0) {
      throw new ApiError(404, 'Download not found');
    }
    
    return result.rows[0];
  }
}

module.exports = new DownloadService();
