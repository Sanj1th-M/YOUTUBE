const db = require('../database');
const ApiError = require('../utils/ApiError');

/**
 * User Service
 * Handles user persistence and preference management.
 */
class UserService {
  async createUser(userData) {
    const { username, email, passwordHash } = userData;
    const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `;
    const result = await db.query(query, [username, email, passwordHash]);
    return result.rows[0];
  }

  async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }

  async findById(id) {
    const query = 'SELECT id, username, email, avatar_url, created_at FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  async createSession(userId, refreshTokenHash, deviceInfo, ipAddress) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    const query = `
      INSERT INTO sessions (user_id, refresh_token_hash, device_info, ip_address, expires_at)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    await db.query(query, [userId, refreshTokenHash, deviceInfo, ipAddress, expiresAt]);
  }

  async revokeSession(userId, refreshTokenHash) {
    const query = 'DELETE FROM sessions WHERE user_id = $1 AND refresh_token_hash = $2';
    await db.query(query, [userId, refreshTokenHash]);
  }
}

module.exports = new UserService();
