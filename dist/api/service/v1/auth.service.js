"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../model/user"));
const crypto_helper_1 = __importDefault(require("../../helper/crypto.helper"));
const jwt_helper_1 = __importDefault(require("../../helper/jwt.helper"));
class AuthService {
    static async login(payload) {
        const email = String(payload.email || '');
        const password = String(payload.password || '');
        const user = await user_1.default.findOne({ where: { email } });
        if (!user || user.get('password') !== crypto_helper_1.default.encryptPassword(password)) {
            throw new Error('Invalid credentials');
        }
        const token = jwt_helper_1.default.generateToken({ id: user.id, email: user.email });
        return { token, user };
    }
    static async register(payload) {
        const user = await user_1.default.create({
            name: payload.name,
            email: payload.email,
            password: crypto_helper_1.default.encryptPassword(String(payload.password || '')),
            userName: payload.userName || payload.email,
            profileLink: payload.profileLink || '',
        });
        const token = jwt_helper_1.default.generateToken({ id: user.id, email: user.email });
        return { token, user };
    }
    static async forgotPassword(email) {
        return { message: 'Password reset link sent', email };
    }
}
exports.default = AuthService;
