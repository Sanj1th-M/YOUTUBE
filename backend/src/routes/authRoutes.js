const express = require('express');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const zod = require('zod');
const { authLimiter } = require('../middlewares/security/rateLimiter');

const router = express.Router();

const registerSchema = zod.object({
  body: zod.object({
    username: zod.string().min(3).max(50),
    email: zod.string().email(),
    password: zod.string().min(8),
  }),
});

const loginSchema = zod.object({
  body: zod.object({
    email: zod.string().email(),
    password: zod.string(),
  }),
});

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/refresh', authLimiter, authController.refresh);
router.post('/logout', authLimiter, authController.logout);

module.exports = router;
