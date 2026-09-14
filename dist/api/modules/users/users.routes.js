"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../../model/user"));
const crypto_helper_1 = __importDefault(require("../../helper/crypto.helper"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const rows = await user_1.default.findAll({ where: { isDeleted: false } });
        return res.json({ success: true, data: rows });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch users' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const row = await user_1.default.findOne({ where: { id: req.params.id, isDeleted: false } });
        return res.json({ success: true, data: row || {} });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: 'Failed to fetch user' });
    }
});
router.post('/', async (req, res) => {
    try {
        const user = await user_1.default.create({
            name: req.body.name,
            email: req.body.email,
            password: crypto_helper_1.default.encryptPassword(String(req.body.password || '')),
            userName: req.body.userName || req.body.email,
            profileLink: req.body.profileLink || '',
        });
        return res.status(201).json({ success: true, data: user });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: 'Failed to create user' });
    }
});
exports.default = router;
