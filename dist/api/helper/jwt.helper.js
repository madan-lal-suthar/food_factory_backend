"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appConstants_1 = __importDefault(require("../common/appConstants"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    secret;
    expiresIn;
    constructor() {
        this.secret = appConstants_1.default.jwtSecret;
        this.expiresIn = appConstants_1.default.jwtExpiredTime;
    }
    generatejwtTokenWithData(data) {
        const token = jsonwebtoken_1.default.sign(data, this.secret, {
            expiresIn: this.expiresIn,
        });
        return token;
    }
    async verifyToken(token) {
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, this.secret);
            return decodedToken;
        }
        catch (error) {
            return null;
        }
    }
}
exports.default = new JWTService();
