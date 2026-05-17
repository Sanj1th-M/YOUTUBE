const express = require('express');
const videoController = require('../controllers/videoController');
const router = express.Router();

router.get('/home', videoController.getHomeFeed);
router.get('/search', videoController.searchVideos);
router.get('/suggestions', videoController.getSuggestions);
router.get('/:id', videoController.getVideoById);
router.get('/:id/related', videoController.getRelatedVideos);

module.exports = router;
