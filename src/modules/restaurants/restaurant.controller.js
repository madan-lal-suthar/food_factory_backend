const restaurantService = require('./restaurant.service');

exports.getAll = async (req, res, next) => {
  try {
    const result = await restaurantService.getAll(req.query);
    res.status(200).json({ status: 200, success: true, message: 'Restaurants fetched successfully', data: result.data, pagination: result.pagination });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const result = await restaurantService.getById(req.params.id);
    res.status(200).json({ status: 200, success: true, message: 'Restaurant fetched successfully', data: result || {} });
  } catch (error) {
    next(error);
  }
};
