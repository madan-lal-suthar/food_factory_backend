const productService = require('./product.service');

exports.list = async (req, res, next) => {
  try {
    const result = await productService.list(req.query);
    res.status(200).json({ status: 200, success: true, message: 'Foods fetched successfully', data: result });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const result = await productService.create(req.body);
    res.status(201).json({ status: 201, success: true, message: 'Food created successfully', data: result });
  } catch (error) {
    next(error);
  }
};
