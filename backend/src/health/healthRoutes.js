const express = require('express');
const router = express.Router();
const { pool } = require('../database');
const { client: redis } = require('../cache');
const metricsService = require('../metrics/metricsService');

/**
 * Basic Liveness Check
 */
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

/**
 * Deep Readiness Check
 */
router.get('/ready', async (req, res) => {
  const checks = {
    database: 'DOWN',
    redis: 'DOWN',
    server: 'UP',
  };

  try {
    await pool.query('SELECT 1');
    checks.database = 'UP';
  } catch (err) {
    checks.database = 'ERROR';
  }

  try {
    await redis.ping();
    checks.redis = 'UP';
  } catch (err) {
    checks.redis = 'ERROR';
  }

  const isReady = checks.database === 'UP' && checks.redis === 'UP';
  res.status(isReady ? 200 : 503).json(checks);
});

/**
 * Internal Status / Metrics
 */
router.get('/status', (req, res) => {
  res.status(200).json({
    app: 'youtube-platform',
    version: '1.0.0',
    uptime: process.uptime(),
    metrics: metricsService.metrics,
  });
});

module.exports = router;
