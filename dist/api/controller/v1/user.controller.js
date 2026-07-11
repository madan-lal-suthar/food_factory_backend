"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../../service/v1/user.service"));
const validation_utils_1 = __importDefault(require("../../validator/validation.utils"));
const localize_string_1 = __importDefault(require("../../localization/localize.string"));
class UserController {
    static async userSignUp(req, res) {
        const languageHeader = req.headers["language"];
        const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
        try {
            // Normalize language header to always be a string
            if (validation_utils_1.default.fieldValidation(req.body.email)) {
                return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("EMAIL_REQUIRED", language) });
            }
            else if (validation_utils_1.default.fieldValidation(req.body.password)) {
                return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("PASSWORD_REQUIRED", language) });
            }
            const adminDetail = await user_service_1.default.userSignUp(req, res);
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
    static async getHomeBanner(req, res) {
        const languageHeader = req.headers["language"];
        const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
        try {
            const homeBanner = await user_service_1.default.getHomeBanner(req, res);
            if (homeBanner.executed == 1) {
                return res.json({ status: 200, data: homeBanner.data, message: localize_string_1.default.localize("HOME_BANNER_FETCHED_SUCCESSFULLY", language) });
            }
            else {
                return res.json({ status: 400, data: homeBanner.data, message: localize_string_1.default.localize("DATA_NOT_FOUND", language) });
            }
        }
        catch (error) {
            return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("FAILED", language) });
        }
    }
    static async getTopHomefoods(req, res) {
        const languageHeader = req.headers["language"];
        const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
        try {
            const topHomefoods = await user_service_1.default.getTopHomefoods(req, res);
            if (topHomefoods.executed == 1) {
                return res.json({ status: 200, data: topHomefoods.data, message: localize_string_1.default.localize("TOP_HOME_FOODS_FETCHED_SUCCESSFULLY", language) });
            }
            else {
                return res.json({ status: 400, data: topHomefoods.data, message: localize_string_1.default.localize("DATA_NOT_FOUND", language) });
            }
        }
        catch (error) {
            return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("FAILED", language) });
        }
    }
    static async getRestaurantTiming(req, res) {
        const languageHeader = req.headers["language"];
        const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
        try {
            const restaurantTiming = await user_service_1.default.getRestaurantTiming(req, res);
            if (restaurantTiming.executed == 1) {
                return res.json({ status: 200, data: restaurantTiming.data, message: localize_string_1.default.localize("RESTAURANT_TIMING_FETCHED_SUCCESSFULLY", language) });
            }
            else {
                return res.json({ status: 400, data: restaurantTiming.data, message: localize_string_1.default.localize("DATA_NOT_FOUND", language) });
            }
        }
        catch (error) {
            return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("FAILED", language) });
        }
    }
    static async getFeedbackOfCustomer(req, res) {
        const languageHeader = req.headers["language"];
        const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
        try {
            const feedbackOfCustomer = await user_service_1.default.getFeedbackOfCustomer(req, res);
            if (feedbackOfCustomer.executed == 1) {
                return res.json({ status: 200, data: feedbackOfCustomer.data, message: localize_string_1.default.localize("FEEDBACK_OF_CUSTOMER_FETCHED_SUCCESSFULLY", language) });
            }
            else {
                return res.json({ status: 400, data: feedbackOfCustomer.data, message: localize_string_1.default.localize("DATA_NOT_FOUND", language) });
            }
        }
        catch (error) {
            return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("FAILED", language) });
        }
    }
    static async getBestChefOfRestaurant(req, res) {
        const languageHeader = req.headers["language"];
        const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
        try {
            const bestChefOfRestaurant = await user_service_1.default.getBestChefOfRestaurant(req, res);
            if (bestChefOfRestaurant.executed == 1) {
                return res.json({ status: 200, data: bestChefOfRestaurant.data, message: localize_string_1.default.localize("BEST_CHEF_OF_RESTAURANT_FETCHED_SUCCESSFULLY", language) });
            }
            else {
                return res.json({ status: 400, data: bestChefOfRestaurant.data, message: localize_string_1.default.localize("DATA_NOT_FOUND", language) });
            }
        }
        catch (error) {
            return res.json({ status: 400, data: {}, message: localize_string_1.default.localize("FAILED", language) });
        }
    }
}
exports.default = UserController;
