const jwt = require('jsonwebtoken');
const env = require('../config/env');

module.exports = {
  sign(payload: string | Buffer | object, expiresIn = env.JWT_EXPIRES_IN) {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
  },
  signGuest(payload: string | Buffer | object, expiresIn = '1h') {
    return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
  },
  verify(token: string) {
    return jwt.verify(token, env.JWT_SECRET);
  },
};
