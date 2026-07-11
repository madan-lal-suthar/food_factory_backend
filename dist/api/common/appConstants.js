"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const appConstants = {
    // need to manage stripe account credentials and environment here
    jwtSecret: config_1.default.JWT_SECRET,
    jwtExpiredTime: "365days",
    jwtExpiresIn: '15m',
    FIREBASE_WEB_API_KEY: "",
    USER_TYPE: {
        USER: 1,
        ADMIN: 2,
    }
};
exports.default = appConstants;
