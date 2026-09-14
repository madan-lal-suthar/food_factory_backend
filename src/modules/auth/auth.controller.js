const authService = require('./auth.service');

exports.register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json({ status: 201, success: true, message: 'Registration successful', data: result });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({ status: 200, success: true, message: 'Login successful', data: result });
  } catch (error) {
    next(error);
  }
};
