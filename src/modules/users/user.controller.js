const userService = require('./user.service');

exports.list = async (req, res, next) => {
  try {
    const result = await userService.list(req.query);
    res.status(200).json({ status: 200, success: true, message: 'Users fetched successfully', data: result });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    res.status(201).json({ status: 201, success: true, message: 'User created successfully', data: result });
  } catch (error) {
    next(error);
  }
};
