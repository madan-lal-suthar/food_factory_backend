"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const localize_string_1 = __importDefault(require("../localization/localize.string"));
const common_error_1 = __importDefault(require("../error.handler/common.error"));
const localization_keys_1 = __importDefault(require("../localization/localization.keys"));
class ValidationUtils {
    // Validate required fields dynamically and return them in order
    static validateFields(req, res, fields = [], vaildationType = "optional") {
        return new Promise((resolve, reject) => {
            try {
                let bodyField = req.body ?? {};
                if (vaildationType === "optional") {
                    let bodyKeys = Object.keys(bodyField);
                    if (bodyKeys.every((key) => fields.includes(key))) {
                        return resolve(true);
                    }
                    let missingKeys = bodyKeys.filter((key) => !fields.includes(key));
                    for (let key of missingKeys) {
                        if (ValidationUtils.fieldValidation(bodyField[key])) {
                            let checkMessage = localize_string_1.default.checkStrLocalization(key.toUpperCase(), req.headers["language"]);
                            throw new common_error_1.default({
                                status: 400,
                                key: checkMessage ? key.toUpperCase() : localization_keys_1.default.VALIDATE_FIELD_REQUIRED,
                                language: req.headers["language"],
                                dynamicParams: {
                                    fieldName: key.charAt(0).toUpperCase() + key.slice(1)
                                }
                            });
                        }
                    }
                }
                else {
                    if (fields.every((key) => !ValidationUtils.fieldValidation(bodyField[key]))) {
                        return resolve(true);
                    }
                    for (let key of fields) {
                        if (ValidationUtils.fieldValidation(bodyField[key])) {
                            let checkMessage = localize_string_1.default.checkStrLocalization(key.toUpperCase(), req.headers["language"]);
                            throw new common_error_1.default({
                                status: 400,
                                key: checkMessage ? key.toUpperCase() : localization_keys_1.default.VALIDATE_FIELD_REQUIRED,
                                language: req.headers["language"],
                                dynamicParams: {
                                    fieldName: key.charAt(0).toUpperCase() + key.slice(1)
                                }
                            });
                        }
                    }
                }
            }
            catch (error) {
                // console.log("validation error ====>>>>", error);
                throw error;
            }
        });
    }
    static fieldValidation(fieldValue) {
        // Check for undefined, null, or empty string
        if (fieldValue === undefined || fieldValue === null || fieldValue === '') {
            return true; // Field is missing/invalid
        }
        // Check if value is an array
        if (Array.isArray(fieldValue)) {
            return fieldValue.length === 0; // true if empty array
        }
        // Check if value is an object (but not null or array)
        if (typeof fieldValue === 'object' && fieldValue !== null && !Array.isArray(fieldValue)) {
            const isEmptyObject = Object.keys(fieldValue).length === 0;
            return isEmptyObject ? true : 'object'; // true if empty object, else 'object'
        }
        // Check for other primitives
        if (typeof fieldValue === 'string' ||
            typeof fieldValue === 'number' ||
            typeof fieldValue === 'boolean') {
            return false; // Valid value
        }
        // Fallback for other types (e.g., functions, symbols, BigInt, etc.)
        return true;
    }
}
exports.default = ValidationUtils;
