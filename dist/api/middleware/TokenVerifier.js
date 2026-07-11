"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiConfig_1 = __importDefault(require("../common/apiConfig"));
const log_1 = __importDefault(require("../common/log"));
const jwt_helper_1 = __importDefault(require("../helper/jwt.helper"));
const appConstants_1 = __importDefault(require("../common/appConstants"));
class TokenVerifier {
    static isLoginRequired(path) {
        return !apiConfig_1.default.some((route) => path.includes(route));
    }
    static async verifyAndValidateToken(token, req, res) {
        try {
            const authDecodedData = await jwt_helper_1.default.verifyToken(token);
            if (!authDecodedData)
                throw new Error("Invalid token");
            req.decoded = authDecodedData;
            const userData = await TokenVerifier.validateToken(req, res);
            if (!userData ||
                !userData.executed ||
                !userData.data?.isValidate ||
                !TokenVerifier.validateRequestUrlPath(req)) {
                throw new Error("User validation failed");
            }
            return true;
        }
        catch (err) {
            log_1.default.error("Token verification failed:", err);
            return false;
        }
    }
    static async validateToken(req, res) {
        if (req.decoded.userType == appConstants_1.default.USER_TYPE.USER) {
            try {
                const params = [req.decoded.userId];
                const result = "";
                if (result.length > 0) {
                    return {
                        executed: 1,
                        data: {
                            isValidate: true,
                        },
                    };
                }
                return {
                    executed: 0,
                    data: {
                        isValidate: false,
                    },
                };
            }
            catch (error) {
                throw error;
            }
        }
        return {
            executed: 0,
            data: {
                isValidate: false,
            },
        };
    }
    static validateRequestUrlPath(req) {
        const { userType } = req.decoded;
        const path = req.path;
        if (userType === "ADMIN") {
            return path.includes("/admin/") || path.includes("/common/");
        }
        else if (userType === 1) {
            return (path.includes("/user/") ||
                path.includes("/common/") ||
                path.includes("/admin/"));
        }
        return false;
    }
}
exports.default = TokenVerifier;
