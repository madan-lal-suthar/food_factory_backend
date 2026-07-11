"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_helper_1 = __importDefault(require("../../helper/crypto.helper"));
const user_1 = __importDefault(require("../../model/user"));
const banner_1 = __importDefault(require("../../model/banner"));
const food_products_1 = __importDefault(require("../../model/food_products"));
const food_categories_1 = __importDefault(require("../../model/food_categories"));
const sequelize_1 = require("sequelize");
class UserService {
    static async userSignUp(request, response) {
        try {
            const { email, password, name, userName, profileLink } = request.body;
            const hashedPassword = crypto_helper_1.default.encryptPassword(password);
            let getUserDetail = await user_1.default.create({
                email, password: hashedPassword, name, userName, profileLink
            });
            console.log("getUserDetail ===>>>>", getUserDetail);
            // if (result[0][0].res === 1) {
            return ({ executed: 1, data: { getUserDetail } });
            // } else if (result[0][0].res === 2) {
            //     return ({ executed: 2, data: {} });
            // } else {
            return ({ executed: 0, data: {} });
            // }
        }
        catch (error) {
            console.log("error ====>>>", error);
            throw new Error('Failed to login admin');
        }
    }
    static async getHomeBanner(request, response) {
        try {
            const getBannerList = await banner_1.default.findAll({
                attributes: ["id", "mediaLink"],
                where: {
                    isDeleted: false
                }
            });
            if (getBannerList.length == 0) {
                return ({ executed: 0, data: {} });
            }
            return ({ executed: 1, data: { getBannerList: getBannerList } });
        }
        catch (error) {
            console.log("error ====>>>", error);
            return ({ executed: 0, data: {} });
        }
    }
    static async getTopHomefoods(request, response) {
        try {
            const getTopHomefoods = await food_products_1.default.findAll({
                attributes: ["id", "name", "description", "totalPrice", "categoryId", "mediaLink"],
                order: [["id", "DESC"]],
                limit: 20,
                include: [
                    {
                        model: user_1.default,
                        as: "user",
                        attributes: ["id", "name", "userName", "profileLink"]
                    },
                    {
                        model: food_categories_1.default,
                        as: "category",
                        attributes: [(0, sequelize_1.literal)("name")]
                    }
                ],
                where: {
                    isDeleted: false
                }
            });
            if (getTopHomefoods.length == 0) {
                return ({ executed: 0, data: {} });
            }
            return ({ executed: 1, data: { getTopHomefoods: getTopHomefoods } });
        }
        catch (error) {
            console.log("error ====>>>", error);
            return ({ executed: 0, data: {} });
        }
    }
    static async getRestaurantTiming(request, response) {
        try {
            const getRestaurantTiming = await user_1.default.findAll({
                attributes: ["id", "name", "userName", "profileLink"],
                where: {
                    isDeleted: false
                }
            });
            if (getRestaurantTiming.length == 0) {
                return ({ executed: 0, data: {} });
            }
            return ({ executed: 1, data: { getRestaurantTiming: getRestaurantTiming } });
        }
        catch (error) {
            console.log("error ====>>>", error);
            return ({ executed: 0, data: {} });
        }
    }
    static async getFeedbackOfCustomer(request, response) {
        try {
            const getFeedbackOfCustomer = await user_1.default.findAll({
                attributes: ["id", "name", "userName", "profileLink"],
                where: {
                    isDeleted: false
                }
            });
            if (getFeedbackOfCustomer.length == 0) {
                return ({ executed: 0, data: {} });
            }
            return ({ executed: 1, data: { getFeedbackOfCustomer: getFeedbackOfCustomer } });
        }
        catch (error) {
            console.log("error ====>>>", error);
            return ({ executed: 0, data: {} });
        }
    }
    static async getBestChefOfRestaurant(request, response) {
        try {
            const getBestChefOfRestaurant = await user_1.default.findAll({
                attributes: ["id", "name", "userName", "profileLink"],
                where: {
                    isDeleted: false
                }
            });
            if (getBestChefOfRestaurant.length == 0) {
                return ({ executed: 0, data: {} });
            }
            return ({ executed: 1, data: { getBestChefOfRestaurant: getBestChefOfRestaurant } });
        }
        catch (error) {
            console.log("error ====>>>", error);
            return ({ executed: 0, data: {} });
        }
    }
}
exports.default = UserService;
