"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_categories_1 = __importDefault(require("../../model/food_categories"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const rows = await food_categories_1.default.findAll({ where: { isDeleted: false } });
        return res.json({ success: true, data: rows });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch categories' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const item = await food_categories_1.default.findOne({ where: { id: req.params.id, isDeleted: false } });
        return res.json({ success: true, data: item || {} });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch category' });
    }
});
exports.default = router;
