"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localize_string_1 = __importDefault(require("../localization/localize.string"));
class CommonError extends Error {
    messageKey;
    status;
    code;
    details;
    data;
    constructor({ key, status = 400, code = 1000, details = null, language = "en", data = {}, dynamicParams = {} }) {
        super();
        this.name = this.constructor.name;
        this.messageKey = key;
        this.message = localize_string_1.default.localize(key, language, dynamicParams);
        this.status = status;
        this.code = code;
        this.details = details;
        this.data = data;
    }
}
exports.default = CommonError;
