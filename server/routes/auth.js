const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { auth } = require('../middleware/auth');
const { validateRegistration, validateLogin } = require('../middleware/validation');

// Public routes (no authentication required)
router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);

// Protected route (authentication required)
router.get('/profile', auth, getProfile);

module.exports = router;