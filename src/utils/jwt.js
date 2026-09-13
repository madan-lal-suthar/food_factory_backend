const jwt = require('jsonwebtoken');
const env = require('../config/env');

module.exports = {
  sign(payload) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
  },
  verify(token) {
    return jwt.verify(token, env.JWT_SECRET);
  },
};
