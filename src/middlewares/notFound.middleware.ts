module.exports = (req: ExpressRequest, res: ExpressResponse) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: 'Route not found',
    data: null,
  });
};
