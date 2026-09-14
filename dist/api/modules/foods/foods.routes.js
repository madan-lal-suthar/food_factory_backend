"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_products_1 = __importDefault(require("../../model/food_products"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
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
        const rows = await food_products_1.default.findAll({ where, limit, offset });
        const total = await food_products_1.default.count({ where });
        return res.json({
            success: true,
            data: rows,
            pagination: { page, limit, total },
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch foods' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const item = await food_products_1.default.findOne({ where: { id: req.params.id, isDeleted: false } });
        return res.json({ success: true, data: item || {} });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch food' });
    }
});
exports.default = router;
