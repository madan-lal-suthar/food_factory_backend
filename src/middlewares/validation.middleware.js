const Joi = require('joi');

exports.validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: 'Validation error',
      data: error.details.map((detail) => detail.message),
    });
  }

  next();
};
