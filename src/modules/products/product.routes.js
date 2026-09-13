const express = require('express');
const productController = require('./product.controller');
const { validate } = require('../../middlewares/validation.middleware');
const productValidation = require('./product.validation');
const { authRequired } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authRequired, productController.list);
router.post('/', authRequired, validate(productValidation.create), productController.create);

module.exports = router;
