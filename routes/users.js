const express = require('express');
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with minimum of 6 characters').isLength({ min: 6 }),
  ],
  userController.registerUser
);

router.get('/getAllUser', auth, userController.getAllUsers);

module.exports = router;
