
const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', auth, authController.getAuthenticatedUser);
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  authController.authenticateUser
);

module.exports = router;
