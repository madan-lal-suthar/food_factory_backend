const jwt = require('../utils/jwt');

exports.authRequired = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 401, success: false, message: 'Unauthorized', data: null });
  }

  try {
    req.user = jwt.verify(token);
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, success: false, message: 'Invalid token', data: null });
  }
};
