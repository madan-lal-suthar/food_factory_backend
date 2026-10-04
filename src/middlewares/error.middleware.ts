module.exports = (err: HttpError, req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    status,
    success: false,
    message: err.message || 'Internal server error',
    data: null,
  });
};
