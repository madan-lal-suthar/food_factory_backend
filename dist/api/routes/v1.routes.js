"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controller/v1/user.controller"));
class Routes {
    router;
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        //#region User API
        this.router.route("/user/signUp").post(user_controller_1.default.userSignUp);
        this.router.route("/public/user/getHomeBanner").post(user_controller_1.default.getHomeBanner);
        this.router.route("/public/user/getTopHomefoods").post(user_controller_1.default.getTopHomefoods);
        this.router.route("/public/user/getRestaurantTiming").post(user_controller_1.default.getRestaurantTiming);
        this.router.route("/public/user/getFeedbackOfCustomer").post(user_controller_1.default.getFeedbackOfCustomer);
        this.router.route("/public/user/getBestChefOfRestaurant").post(user_controller_1.default.getBestChefOfRestaurant);
        //#endregion
        //Menu API
        // this.router.route("/public/menu/getMenuByCategory").post(UserController.getMenuByCategory);
        // this.router.route("/public/menu/getMenuByFoods").post(UserController.getMenuByFoods);
        // this.router.route("/public/menu/getFoodDetails").post(UserController.getFoodDetails);
        // //Restaurant API
        // this.router.route("/public/user/reservationOfTables").post(UserController.reservationOfTables);
        // this.router.route("/public/user/createOrderOfFoods").post(UserController.createOrderOfFoods);
        // this.router.route("/public/user/getOrderDetails").post(UserController.getOrderDetails);
        // //gallery API
        // this.router.route("/public/gallery/getGalleryImages").post(UserController.getGalleryImages);
        // //blog API
        // this.router.route("/public/blog/getAllBlogs").post(UserController.getAllBlogs);
        // this.router.route("/public/blog/getBlogDetails").post(UserController.getBlogDetails);
        // //about us API
        // this.router.route("/public/aboutus/getAboutUs").post(UserController.getAboutUs);
    }
}
exports.default = new Routes().router;
