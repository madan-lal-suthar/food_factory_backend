"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const food_products_1 = __importDefault(require("../../model/food_products"));
const food_categories_1 = __importDefault(require("../../model/food_categories"));
const restaurants_1 = __importDefault(require("../../model/restaurants"));
const gallery_1 = __importDefault(require("../../model/gallery"));
const reviews_1 = __importDefault(require("../../model/reviews"));
const orders_1 = __importDefault(require("../../model/orders"));
const order_items_1 = __importDefault(require("../../model/order_items"));
const sequelize_1 = require("sequelize");
class PublicService {
    static async getRestaurants(req) {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 12);
        const search = String(req.query.search || '');
        const offset = (page - 1) * limit;
        const where = search ? { name: { [sequelize_1.Op.iLike]: `%${search}%` }, isDeleted: false } : { isDeleted: false };
        const rows = await restaurants_1.default.findAll({ where, limit, offset });
        const total = await restaurants_1.default.count({ where });
        return {
            data: rows,
            pagination: { page, limit, total },
        };
    }
    static async getRestaurantById(id) {
        return restaurants_1.default.findOne({ where: { id, isDeleted: false } });
    }
    static async getCategories(req) {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 12);
        const offset = (page - 1) * limit;
        const rows = await food_categories_1.default.findAll({ where: { isDeleted: false }, limit, offset });
        return { data: rows };
    }
    static async getCategoryById(id) {
        return food_categories_1.default.findOne({ where: { id, isDeleted: false } });
    }
    static async getFoods(req) {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 8);
        const offset = (page - 1) * limit;
        const restaurant = String(req.query.restaurant || '');
        const category = String(req.query.category || '');
        const search = String(req.query.search || '');
        const where = { isDeleted: false };
        if (restaurant)
            where.restaurantName = { [sequelize_1.Op.iLike]: `%${restaurant}%` };
        if (category)
            where.categoryName = { [sequelize_1.Op.iLike]: `%${category}%` };
        if (search)
            where.name = { [sequelize_1.Op.iLike]: `%${search}%` };
        const rows = await food_products_1.default.findAll({
            where,
            limit,
            offset,
        });
        const total = await food_products_1.default.count({ where });
        return {
            data: rows,
            pagination: { page, limit, total },
        };
    }
    static async getFoodById(id) {
        return food_products_1.default.findOne({ where: { id, isDeleted: false } });
    }
    static async getGallery(req) {
        return gallery_1.default.findAll({ where: { isDeleted: false } });
    }
    static async getReviews(req) {
        return reviews_1.default.findAll({ where: { isDeleted: false } });
    }
    static async createOrder(payload) {
        const order = await orders_1.default.create({
            restaurantId: payload.restaurantId,
            customerName: payload.customerName || 'Guest',
            deliveryAddress: payload.deliveryAddress,
            note: payload.note,
            status: 'pending',
            total: Number(payload.items?.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0) || 0),
        });
        const items = await Promise.all((payload.items || []).map((item) => order_items_1.default.create({
            orderId: order.id,
            foodId: item.foodId,
            quantity: item.quantity,
            price: item.price,
        })));
        return {
            id: order.id,
            status: order.status,
            total: order.total,
            restaurantId: order.restaurantId,
            items: items.map((item) => ({ foodId: item.foodId, quantity: item.quantity })),
        };
    }
}
exports.default = PublicService;
