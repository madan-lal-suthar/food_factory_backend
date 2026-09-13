const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/users/user.routes');
const productRoutes = require('../modules/products/product.routes');
const notFoundMiddleware = require('../middlewares/notFound.middleware');
const errorMiddleware = require('../middlewares/error.middleware');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);

router.use(notFoundMiddleware);
router.use(errorMiddleware);

module.exports = router;
