const express = require('express');
const { register, login, getMe, publicRegister } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// New public route for anyone to sign up
router.post('/signup', publicRegister);

// Route for an admin to register a new user
router.post('/register', protect, authorize('admin'), register);

router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;