const express = require('express');
const router = express.Router();
const { googleSignIn, register, login } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login user & get token
// @access  Public
router.post('/login', login);

// @route   POST /api/auth/google
// @desc    Authenticate with Google ID Token and get JWT
// @access  Public
router.post('/google', googleSignIn);

module.exports = router;
