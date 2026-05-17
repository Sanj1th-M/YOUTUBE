const express = require('express');
const searchController = require('../controllers/searchController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const zod = require('zod');
const { heavyLimiter } = require('../middlewares/security/rateLimiter');

const router = express.Router();

const searchSchema = zod.object({
  query: zod.object({
    q: zod.string().min(1).max(200),
  }),
});

// Public search routes
router.get('/', heavyLimiter, validate(searchSchema), (req, res, next) => {
  // Optional auth to track history if logged in
  if (req.headers.authorization) {
    return authMiddleware(req, res, next);
  }
  next();
}, searchController.search);

router.get('/suggestions', heavyLimiter, validate(searchSchema), searchController.getSuggestions);

// Protected search history routes
router.get('/history', authMiddleware, searchController.getHistory);
router.delete('/history', authMiddleware, searchController.clearHistory);

module.exports = router;
