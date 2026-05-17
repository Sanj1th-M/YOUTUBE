const express = require('express');
const downloadController = require('../controllers/downloadController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const zod = require('zod');
const { heavyLimiter } = require('../middlewares/security/rateLimiter');

const router = express.Router();

const startDownloadSchema = zod.object({
  body: zod.object({
    videoId: zod.string().min(1).max(50),
    title: zod.string().max(200),
    thumbnailUrl: zod.string().url(),
    type: zod.enum(['video', 'audio']),
  }),
});

router.use(authMiddleware);

router.post('/start', heavyLimiter, validate(startDownloadSchema), downloadController.startDownload);
router.get('/', downloadController.getDownloads);
router.patch('/:id/status', downloadController.updateStatus);
router.delete('/:id', downloadController.removeDownload);

module.exports = router;
