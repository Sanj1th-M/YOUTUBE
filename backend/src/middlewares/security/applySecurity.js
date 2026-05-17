const helmet = require('helmet');
const cors = require('cors');
const { cors: corsConfig } = require('../../config/security');
const { standardLimiter } = require('./rateLimiter');

/**
 * Security Middleware Orchestrator
 * Applies foundational security layers to the application.
 */
const applySecurityMiddleware = (app) => {
  // 1. Secure Headers (Helmet)
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Adjust based on frontend needs
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://*.ytimg.com", "https://*.googleusercontent.com"], // Trusted media sources
        connectSrc: ["'self'", "https://*.piped.video"], // Piped API instances
      },
    },
    referrerPolicy: { policy: 'same-origin' },
  }));

  // 2. Strict CORS
  app.use(cors(corsConfig));

  // 3. Rate Limiting
  app.use('/api/', standardLimiter);
};

module.exports = applySecurityMiddleware;
