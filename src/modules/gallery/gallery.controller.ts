const galleryService = require('./gallery.service');

exports.getAll = async (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
  try {
    const result = await galleryService.getAll();
    res.status(200).json({ status: 200, success: true, message: 'Gallery fetched successfully', data: result });
  } catch (error) {
    next(error);
  }
};
