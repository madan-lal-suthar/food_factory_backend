const chefService = require('./chef.service');

exports.getAll = async (req, res, next) => {
  try {
    const result = await chefService.getAll(req.query);
    res.status(200).json({
      status: 200,
      success: true,
      message: 'Chefs fetched successfully',
      data: result.data,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const result = await chefService.getById(req.params.id);

    if (!result) {
      const error = new Error('Chef not found');
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: 'Chef fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
