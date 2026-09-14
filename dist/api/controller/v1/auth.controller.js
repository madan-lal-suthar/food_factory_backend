"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_service_1 = __importDefault(require("../../service/v1/auth.service"));
class AuthController {
    static async login(req, res) {
        try {
            const result = await auth_service_1.default.login(req.body);
            return res.json({ success: true, data: result });
        }
        catch (error) {
            return res.status(401).json({ success: false, message: 'Login failed' });
        }
    }
    static async register(req, res) {
        try {
            const result = await auth_service_1.default.register(req.body);
            return res.status(201).json({ success: true, data: result });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: 'Registration failed' });
        }
    }
    static async forgotPassword(req, res) {
        try {
            const result = await auth_service_1.default.forgotPassword(req.body.email);
            return res.json({ success: true, data: result });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: 'Password reset failed' });
        }
    }
}
exports.default = AuthController;
