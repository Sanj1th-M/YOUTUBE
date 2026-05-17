const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('../config');
const ApiError = require('../utils/ApiError');

/**
 * Auth Service
 * Handles password hashing, token generation, and verification.
 */
class AuthService {
  async hashPassword(password) {
    return await argon2.hash(password);
  }

  async verifyPassword(hash, password) {
    return await argon2.verify(hash, password);
  }

  generateTokens(user) {
    const accessToken = jwt.sign(
      { sub: user.id, username: user.username },
      config.jwt.secret,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { sub: user.id },
      config.jwt.refreshSecret,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token) {
    try {
      return jwt.verify(token, config.jwt.secret);
    } catch (error) {
      throw new ApiError(401, 'Invalid or expired access token');
    }
  }

  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, config.jwt.refreshSecret);
    } catch (error) {
      throw new ApiError(401, 'Invalid or expired refresh token');
    }
  }
}

module.exports = new AuthService();
