const express = require('express');
const authController = require('./auth.controller');
const { validate } = require('../../middlewares/validation.middleware');
const authValidation = require('./auth.validation');

const router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.get('/guest', authController.guestLogin);

module.exports = router;
