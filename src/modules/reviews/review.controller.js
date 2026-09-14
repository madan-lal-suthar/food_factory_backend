const reviewService = require('./review.service');

exports.getAll = async (req, res, next) => {
  try {
    const result = await reviewService.getAll();
    res.status(200).json({ status: 200, success: true, message: 'Reviews fetched successfully', data: result });
  } catch (error) {
    next(error);
  }
};
