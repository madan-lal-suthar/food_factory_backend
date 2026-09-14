module.exports = {
  success: (res, data, message = 'Success', status = 200) =>
    res.status(status).json({ status, success: true, message, data }),
  error: (res, message = 'Error', status = 400, data = null) =>
    res.status(status).json({ status, success: false, message, data }),
};
