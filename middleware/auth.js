// const jwt = require('jsonwebtoken');
// const config = require('../config/db');

// // Middleware to check authentication
// module.exports = function (req, res, next) {
//   // Get token from header
//   const token = req.header('x-auth-token');

//   // Check if no token
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   // Verify token
//   try {
//     const decoded = jwt.verify(token, config.get('jwtSecret'));

//     // Add user from payload to request object
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

module.exports = async function (req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = await User.findByPk(decoded.user.id);
    if (!req.user) {
      return res.status(401).json({ msg: 'User not found, authorization denied' });
    }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
