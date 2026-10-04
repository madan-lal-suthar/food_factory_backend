const categoryService = require('./category.service');

exports.getAll = async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
  try {
    const result = await categoryService.getAll(req.query);
    res.status(200).json({ status: 200, success: true, message: 'Categories fetched successfully', data: result });
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
  try {
    const result = await categoryService.getById(req.params.id);
    res.status(200).json({ status: 200, success: true, message: 'Category fetched successfully', data: result || {} });
  } catch (error) {
    next(error);
  }
};
