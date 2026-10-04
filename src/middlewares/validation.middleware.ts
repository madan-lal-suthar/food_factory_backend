const Joi = require('joi');

exports.validate = (schema: import('joi').Schema) => (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: 'Validation error',
      data: error.details.map((detail: import('joi').ValidationErrorItem) => detail.message),
    });
  }

  next();
};
