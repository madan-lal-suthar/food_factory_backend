"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurants_routes_1 = __importDefault(require("../modules/restaurants/restaurants.routes"));
const categories_routes_1 = __importDefault(require("../modules/categories/categories.routes"));
const foods_routes_1 = __importDefault(require("../modules/foods/foods.routes"));
const orders_routes_1 = __importDefault(require("../modules/orders/orders.routes"));
const gallery_routes_1 = __importDefault(require("../modules/gallery/gallery.routes"));
const reviews_routes_1 = __importDefault(require("../modules/reviews/reviews.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const users_routes_1 = __importDefault(require("../modules/users/users.routes"));
class Routes {
    router;
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.use('/auth', auth_routes_1.default);
        this.router.use('/users', users_routes_1.default);
        this.router.use('/restaurants', restaurants_routes_1.default);
        this.router.use('/categories', categories_routes_1.default);
        this.router.use('/foods', foods_routes_1.default);
        this.router.use('/orders', orders_routes_1.default);
        this.router.use('/gallery', gallery_routes_1.default);
        this.router.use('/reviews', reviews_routes_1.default);
    }
}
exports.default = new Routes().router;
