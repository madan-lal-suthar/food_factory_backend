"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../../model/user"));
const crypto_helper_1 = __importDefault(require("../../helper/crypto.helper"));
const jwt_helper_1 = __importDefault(require("../../helper/jwt.helper"));
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    try {
        const email = String(req.body.email || '');
        const password = String(req.body.password || '');
        const user = await user_1.default.findOne({ where: { email } });
        if (!user || !crypto_helper_1.default.matchPassword(password, String(user.get?.('password') || user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        const token = jwt_helper_1.default.generatejwtTokenWithData({ id: user.id, email: user.email });
        return res.json({ success: true, data: { token, user } });
    }
    catch (error) {
        return res.status(401).json({ success: false, message: 'Login failed' });
    }
});
router.post('/register', async (req, res) => {
    try {
        const user = await user_1.default.create({
            name: req.body.name,
            email: req.body.email,
            password: crypto_helper_1.default.encryptPassword(String(req.body.password || '')),
            userName: req.body.userName || req.body.email,
            profileLink: req.body.profileLink || '',
        });
        const token = jwt_helper_1.default.generatejwtTokenWithData({ id: user.id, email: user.email });
        return res.status(201).json({ success: true, data: { token, user } });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: 'Registration failed' });
    }
});
router.post('/forgot-password', async (req, res) => {
    return res.json({ success: true, data: { message: 'Password reset link sent', email: req.body.email } });
});
exports.default = router;
