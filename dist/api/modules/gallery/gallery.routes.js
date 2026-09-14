"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gallery_1 = __importDefault(require("../../model/gallery"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const rows = await gallery_1.default.findAll({ where: { isDeleted: false } });
        return res.json({ success: true, data: rows });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch gallery' });
    }
});
exports.default = router;
