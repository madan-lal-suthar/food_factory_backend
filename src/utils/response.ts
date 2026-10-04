module.exports = {
  success: (res: ExpressResponse, data: unknown, message = 'Success', status = 200) =>
    res.status(status).json({ status, success: true, message, data }),
  error: (res: ExpressResponse, message = 'Error', status = 400, data: unknown = null) =>
    res.status(status).json({ status, success: false, message, data }),
};
