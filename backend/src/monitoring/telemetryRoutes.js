const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');
const metricsService = require('../metrics/metricsService');
const catchAsync = require('../utils/catchAsync');

/**
 * Endpoint for frontend logging and failure tracking
 */
router.post('/logs', catchAsync(async (req, res) => {
  const { event, details, level = 'info' } = req.body;

  // Log frontend event on backend
  logger[level](`[FRONTEND] ${event}`, { ...details, client_ip: req.ip });

  // Track specific frontend failures in metrics
  if (event === 'playback_failure') {
    metricsService.increment('playback_failures');
  }

  res.status(200).json({ success: true });
}));

module.exports = router;
