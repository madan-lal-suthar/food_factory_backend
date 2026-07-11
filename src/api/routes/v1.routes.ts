import express from "express";
import UserController from '../controller/v1/user.controller';
import AdminController from "../controller/v1/admin.controller";
class Routes {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    //#region User API
    this.router.route("/user/signUp").post(UserController.userSignUp);
    this.router.route("/public/user/getHomeBanner").post(UserController.getHomeBanner);
    this.router.route("/public/user/getTopHomefoods").post(UserController.getTopHomefoods);
    this.router.route("/public/user/getRestaurantTiming").post(UserController.getRestaurantTiming);
    this.router.route("/public/user/getFeedbackOfCustomer").post(UserController.getFeedbackOfCustomer);
    this.router.route("/public/user/getBestChefOfRestaurant").post(UserController.getBestChefOfRestaurant);
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

export default new Routes().router; 
