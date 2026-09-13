const express = require('express');
const userController = require('./user.controller');
const { validate } = require('../../middlewares/validation.middleware');
const userValidation = require('./user.validation');
const { authRequired } = require('../../middlewares/auth.middleware');

const router = express.Router();

router.get('/', authRequired, userController.list);
router.post('/', authRequired, validate(userValidation.create), userController.create);

module.exports = router;
