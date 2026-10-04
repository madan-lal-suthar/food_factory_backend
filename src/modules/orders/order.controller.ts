const orderService = require('./order.service');

exports.create = async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
  try {
    const result = await orderService.create(req.body);
    res.status(201).json({ status: 201, success: true, message: 'Order created successfully', data: result });
  } catch (error) {
    next(error);
  }
};
