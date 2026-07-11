"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_error_1 = __importDefault(require("./common.error"));
const localization_keys_1 = __importDefault(require("../localization/localization.keys"));
const localize_string_1 = __importDefault(require("../localization/localize.string"));
class ErrorHandler {
    static handleError(res, error) {
        if (error instanceof common_error_1.default) {
            return res.status(error.status).json({
                status: error.status,
                message: error.message,
                details: error.details || {},
                data: error.data || {}
            });
        }
        return res.status(500).json({
            status: 500,
            message: localize_string_1.default.localize(localization_keys_1.default.GENERAL_ERROR, "en"),
            details: (typeof error === 'object' && error !== null && 'message' in error) ? error.message : 'Unknown error',
            data: {}
        });
    }
}
exports.default = ErrorHandler;
