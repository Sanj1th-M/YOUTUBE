const express = require('express');
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Public/Optional Auth feed
router.get('/home', (req, res, next) => {
  if (req.headers.authorization) {
    return authMiddleware(req, res, next);
  }
  next();
}, recommendationController.getHomeFeed);

// Related recommendations
router.get('/related/:id', recommendationController.getRelatedVideos);

module.exports = router;
