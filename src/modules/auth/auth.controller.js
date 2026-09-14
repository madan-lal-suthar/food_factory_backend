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

exports.guestLogin = async (req, res, next) => {
  try {
    const result = await authService.guestLogin(req);
    res.cookie('access_token', result.accessToken, { httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 1000 });
    res.cookie('refresh_token', result.refreshToken, { httpOnly: true, sameSite: 'lax', maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.status(200).json({ status: 200, success: true, message: 'Guest login successful', data: { accessToken: result.accessToken, refreshToken: result.refreshToken, guest: true } });
  } catch (error) {
    next(error);
  }
};
