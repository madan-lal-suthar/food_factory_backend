const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const userRoutes = require('../modules/users/user.routes');
const restaurantRoutes = require('../modules/restaurants/restaurant.routes');
const categoryRoutes = require('../modules/categories/category.routes');
const foodRoutes = require('../modules/products/product.routes');
const chefRoutes = require('../modules/chefs/chef.routes');
const galleryRoutes = require('../modules/gallery/gallery.routes');
const reviewRoutes = require('../modules/reviews/review.routes');
const orderRoutes = require('../modules/orders/order.routes');
const notFoundMiddleware = require('../middlewares/notFound.middleware');
const errorMiddleware = require('../middlewares/error.middleware');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/categories', categoryRoutes);
router.use('/foods', foodRoutes);
router.use('/chefs', chefRoutes);
router.use('/gallery', galleryRoutes);
router.use('/reviews', reviewRoutes);
router.use('/orders', orderRoutes);

router.use(notFoundMiddleware);
router.use(errorMiddleware);

module.exports = router;
