const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const { errorConverter, errorHandler } = require('./middlewares/errorMiddleware');
const requestLogger = require('./middlewares/loggingMiddleware');
const applySecurityMiddleware = require('./middlewares/security/applySecurity');

const videoRoutes = require('./routes/videoRoutes');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const downloadRoutes = require('./routes/downloadRoutes');
const healthRoutes = require('./health/healthRoutes');
const telemetryRoutes = require('./monitoring/telemetryRoutes');

const { connectRedis } = require('./cache');
const instanceManager = require('./instance-manager');
const ApiError = require('./utils/ApiError');
const logger = require('./utils/logger');

const app = express();

// FOUNDATION: Monitoring & Logging
app.use(requestLogger);

// FOUNDATION: Centralized Security (Helmet, CORS, Rate Limiting)
applySecurityMiddleware(app);

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// HTTP request logging (Morgan still useful for raw traffic debugging)
app.use(morgan('combined', { stream: { write: (message) => logger.debug(message.trim()) } }));

// Infrastructure Routes (Health, Readiness, Status, Telemetry)
app.use('/api/v1/monitoring/health', healthRoutes);
app.use('/api/v1/monitoring/telemetry', telemetryRoutes);

// API Routes
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/recommendations', recommendationRoutes);
app.use('/api/v1/downloads', downloadRoutes);

// Send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle error
app.use(errorHandler);

// Initialize DB and Redis, then start server
const startServer = async () => {
  try {
    // Infrastructure initialization (non-blocking for demo if they fail)
    await connectRedis().catch(err => logger.error('Redis init failed, continuing...', err));
    await instanceManager.init().catch(err => logger.error('Instance Manager init failed, continuing...', err));
    
    app.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port} in ${config.env} mode`);
    });
  } catch (err) {
    logger.error('Failed to start server', err);
    process.exit(1);
  }
};

startServer();
