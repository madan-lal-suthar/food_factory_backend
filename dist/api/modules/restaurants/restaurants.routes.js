"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurants_1 = __importDefault(require("../../model/restaurants"));
const sequelize_1 = require("sequelize");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const page = Number(req.query.page || 1);
        const limit = Number(req.query.limit || 12);
        const search = String(req.query.search || '');
        const offset = (page - 1) * limit;
        const where = { isDeleted: false };
        if (search)
            where.name = { [sequelize_1.Op.iLike]: `%${search}%` };
        const rows = await restaurants_1.default.findAll({ where, limit, offset });
        const total = await restaurants_1.default.count({ where });
        return res.json({
            success: true,
            data: rows,
            pagination: { page, limit, total },
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch restaurants' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const item = await restaurants_1.default.findOne({ where: { id: req.params.id, isDeleted: false } });
        return res.json({ success: true, data: item || {} });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch restaurant' });
    }
});
exports.default = router;
