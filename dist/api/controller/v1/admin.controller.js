"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin_service_1 = __importDefault(require("../../service/v1/admin.service"));
const validation_utils_1 = __importDefault(require("../../validator/validation.utils"));
const localize_string_1 = __importDefault(require("../../localization/localize.string"));
class AdminController {
    static async RegisterAdmin(req, res, next) {
        const languageHeader = req.headers["language"];
        const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
        try {
            // Normalize language header to always be a string
            if (validation_utils_1.default.fieldValidation(req.body.fullName)) {
                return res.json({
                    status: 400,
                    data: {},
                    message: localize_string_1.default.localize("FULLNAME_REQUIRED", language)
                });
            }
            else if (validation_utils_1.default.fieldValidation(req.body.email)) {
                return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("EMAIL_REQUIRED", language) });
            }
            else if (validation_utils_1.default.fieldValidation(req.body.password)) {
                return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("PASSWORD_REQUIRED", language) });
            }
            const adminDetail = await admin_service_1.default.RegisterAdmin(req, res);
            if (adminDetail.executed == 1) {
                return res.json({ status: 200, data: {}, message: localize_string_1.default.localize("REGISTRATION_SUCCESSFULLY_MSG", language) });
            }
            else if (adminDetail.executed == 2) {
                return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("EMAIL_ALREADY_EXISTS", language) });
            }
            else {
                return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("FAILED", language) });
            }
        }
        catch (error) {
            console.log(error);
            return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("FAILED", language) });
        }
    }
}
exports.default = AdminController;
