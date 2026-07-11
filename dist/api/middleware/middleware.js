"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RequestLogger_1 = __importDefault(require("./RequestLogger"));
const TokenVerifier_1 = __importDefault(require("./TokenVerifier"));
const log_1 = __importDefault(require("../common/log"));
const date_1 = __importDefault(require("../common/date"));
class Middleware {
    static allowAccess(req, res, next) {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
            "Access-Control-Allow-Headers": "X-Requested-With,content-type",
            "Access-Control-Allow-Credentials": true,
        };
        Object.entries(corsHeaders).forEach(([key, value]) => {
            res.setHeader(key, value);
        });
        next();
    }
    static handleError(req, res, next) {
        const err = new Error(`Not Found: ${req.method}:${req.originalUrl}`);
        log_1.default.error(err);
        err.status = 404;
        next(err);
    }
    static async verifyToken(req, res, next) {
        if (!TokenVerifier_1.default.isLoginRequired(req.path))
            return next();
        const token = req.headers["authorization"];
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "No token provided.",
            });
        }
        const isValid = await TokenVerifier_1.default.verifyAndValidateToken(token, req, res);
        if (!isValid) {
            return res.status(401).json({
                status: 401,
                message: "You are forcefully logged out, please try to login again or contact administrator.",
            });
        }
        next();
    }
    static printLogs(req, res, next) {
        log_1.default.info({
            Time: date_1.default,
            url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
            body: req.body,
            header: req.headers,
            clientInfo: "",
        });
        next();
    }
    static logAllRequests(req, res, next) {
        if (req.method !== "OPTIONS") {
            new RequestLogger_1.default(req, res);
        }
        next();
    }
}
exports.default = Middleware;
