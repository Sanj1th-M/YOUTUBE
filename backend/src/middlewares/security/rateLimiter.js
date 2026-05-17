const rateLimit = require('express-rate-limit');
const { rateLimit: rateLimitConfig } = require('../../config/security');

/**
 * Standard Rate Limiter
 */
const standardLimiter = rateLimit(rateLimitConfig);

/**
 * Stricter Rate Limiter for Auth endpoints (Login, Register)
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP to 20 requests per 15 minutes
  message: 'Too many authentication attempts, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Limiter for heavy operations (Search, Download)
 */
const heavyLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
  message: 'Too many requests for heavy operations, please slow down',
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = {
  standardLimiter,
  authLimiter,
  heavyLimiter,
};
