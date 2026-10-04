const Joi = require('joi');

exports.create = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().positive().required(),
  description: Joi.string().allow('', null),
});
