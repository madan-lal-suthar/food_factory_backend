import UserService from '../../service/v1/user.service';
import validate from '../../validator/validation.utils';
import localizeString from '../../localization/localize.string';
import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../../error.handler/error.handler';

class UserController {
  static async userSignUp(req: Request, res: Response) {
    const languageHeader = req.headers["language"];
    const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
    try {
    // Normalize language header to always be a string

      if (validate.fieldValidation(req.body.email)) {
        return res.json({ status: 400, data: {}, message: localizeString.localize("EMAIL_REQUIRED", language) });
      } else if (validate.fieldValidation(req.body.password)) {
        return res.json({ status: 400, data: {}, message: localizeString.localize("PASSWORD_REQUIRED", language) });
      }

      const adminDetail = await UserService.userSignUp(req, res);
      if (adminDetail.executed == 1) {
        return res.json({ status: 200, data: {}, message: localizeString.localize("REGISTRATION_SUCCESSFULLY_MSG", language) });
      } else if (adminDetail.executed == 2) {
        return res.json({ status: 400, data: {}, message: localizeString.localize("EMAIL_ALREADY_EXISTS", language) });
      } else {
        return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
      }
    } catch (error) {
      console.log(error);
      return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
    }
  }
  static async getHomeBanner(req: Request, res: Response) {
    const languageHeader = req.headers["language"];
    const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
    try {
      const homeBanner = await UserService.getHomeBanner(req, res);
      if (homeBanner.executed == 1) {
        return res.json({ status: 200, data: homeBanner.data, message: localizeString.localize("HOME_BANNER_FETCHED_SUCCESSFULLY", language) });
      } else {
        return res.json({ status: 400, data: homeBanner.data, message: localizeString.localize("DATA_NOT_FOUND", language) });
      }
    } catch (error) {
      return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
    }
  }
  static async getTopHomefoods(req: Request, res: Response) {
    const languageHeader = req.headers["language"];
    const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
    try {
      const topHomefoods = await UserService.getTopHomefoods(req, res);
      if (topHomefoods.executed == 1) {
        return res.json({ status: 200, data: topHomefoods.data, message: localizeString.localize("TOP_HOME_FOODS_FETCHED_SUCCESSFULLY", language) });
      } else {
        return res.json({ status: 400, data: topHomefoods.data, message: localizeString.localize("DATA_NOT_FOUND", language) });
      }
    } catch (error) {
      return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
    }
  }
  static async getRestaurantTiming(req: Request, res: Response) {
    const languageHeader = req.headers["language"];
    const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
    try {
      const restaurantTiming = await UserService.getRestaurantTiming(req, res);
    
      if (restaurantTiming.executed == 1) {
        return res.json({ status: 200, data: restaurantTiming.data, message: localizeString.localize("RESTAURANT_TIMING_FETCHED_SUCCESSFULLY", language) });
      } else {
        return res.json({ status: 400, data: restaurantTiming.data, message: localizeString.localize("DATA_NOT_FOUND", language) });
      }
    } catch (error) {
      return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
    }
  }
  static async getFeedbackOfCustomer(req: Request, res: Response) {
    const languageHeader = req.headers["language"];
    const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
    try {
      const feedbackOfCustomer = await UserService.getFeedbackOfCustomer(req, res);
      if (feedbackOfCustomer.executed == 1) {
        return res.json({ status: 200, data: feedbackOfCustomer.data, message: localizeString.localize("FEEDBACK_OF_CUSTOMER_FETCHED_SUCCESSFULLY", language) });
      } else {
        return res.json({ status: 400, data: feedbackOfCustomer.data, message: localizeString.localize("DATA_NOT_FOUND", language) });
      }
    } catch (error) {
      return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
    }
  }
  static async getBestChefOfRestaurant(req: Request, res: Response) {
    const languageHeader = req.headers["language"];
    const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
    try {
      const bestChefOfRestaurant = await UserService.getBestChefOfRestaurant(req, res);
      if (bestChefOfRestaurant.executed == 1) {
        return res.json({ status: 200, data: bestChefOfRestaurant.data, message: localizeString.localize("BEST_CHEF_OF_RESTAURANT_FETCHED_SUCCESSFULLY", language) });
      } else {
        return res.json({ status: 400, data: bestChefOfRestaurant.data, message: localizeString.localize("DATA_NOT_FOUND", language) });
      }
    } catch (error) {
      return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
    }
  }
  // static async getMenuByCategory(req: Request, res: Response) {
  //   const languageHeader = req.headers["language"];
  //   const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
  //   try {
  //     const menuByCategory = await UserService.getMenuByCategory(req, res);
  //     if (menuByCategory.executed == 1) {
  //       return res.json({ status: 200, data: menuByCategory.data, message: localizeString.localize("MENU_BY_CATEGORY_FETCHED_SUCCESSFULLY", language) });
  //     } else {
  //       return res.json({ status: 400, data: menuByCategory.data, message: localizeString.localize("FAILED", language) });
  //     }
  //   } catch (error) {
  //     return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  //   }
  // } 
  // static async getMenuByFoods(req: Request, res: Response) {
  //   const languageHeader = req.headers["language"];
  //   const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
  //   try {
  //     const menuByFoods = await UserService.getMenuByFoods(req, res);
  //     if (menuByFoods.executed == 1) {
  //       return res.json({ status: 200, data: menuByFoods.data, message: localizeString.localize("MENU_BY_FOODS_FETCHED_SUCCESSFULLY", language) });
  //     } else {
  //       return res.json({ status: 400, data: menuByFoods.data, message: localizeString.localize("FAILED", language) });
  //     }
  //   } catch (error) {
  //     return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  //   }
  // }
  // static async getFoodDetails(req: Request, res: Response) {
  //   const languageHeader = req.headers["language"];
  //   const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
  //   try {
  //     const foodDetails = await UserService.getFoodDetails(req, res);
  //     if (foodDetails.executed == 1) {
  //       return res.json({ status: 200, data: foodDetails.data, message: localizeString.localize("FOOD_DETAILS_FETCHED_SUCCESSFULLY", language) });
  //     } else {
  //       return res.json({ status: 400, data: foodDetails.data, message: localizeString.localize("FAILED", language) });
  //     }
  //   } catch (error) {
  //     return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  //   }
  // }
  // static async reservationOfTables(req: Request, res: Response) {
  //   const languageHeader = req.headers["language"];
  //   const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
  //   try {
  //     const reservationOfTables = await UserService.reservationOfTables(req, res);
  //     if (reservationOfTables.executed == 1) {
  //       return res.json({ status: 200, data: reservationOfTables.data, message: localizeString.localize("RESERVATION_OF_TABLES_FETCHED_SUCCESSFULLY", language) });
  //     } else {
  //       return res.json({ status: 400, data: reservationOfTables.data, message: localizeString.localize("FAILED", language) });
  //     }
  //   } catch (error) {
  //     return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  //   }
  // }
  // static async createOrderOfFoods(req: Request, res: Response) {
  //   const languageHeader = req.headers["language"];
  //   const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
  //     try {
  //       const createOrderOfFoods = await UserService.createOrderOfFoods(req, res);
  //       if (createOrderOfFoods.executed == 1) {
  //         return res.json({ status: 200, data: createOrderOfFoods.data, message: localizeString.localize("CREATE_ORDER_OF_FOODS_FETCHED_SUCCESSFULLY", language) });
  //       } else {
  //         return res.json({ status: 400, data: createOrderOfFoods.data, message: localizeString.localize("FAILED", language) });
  //       }
  //     } catch (error) {
  //       return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  //     }
  // }
  // static async getOrderDetails(req: Request, res: Response) {
  //   const languageHeader = req.headers["language"];
  //   const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
  //   try {
  //     const orderDetails = await UserService.getOrderDetails(req, res);
  //     if (orderDetails.executed == 1) {
  //       return res.json({ status: 200, data: orderDetails.data, message: localizeString.localize("ORDER_DETAILS_FETCHED_SUCCESSFULLY", language) });
  //     } else {
  //       return res.json({ status: 400, data: orderDetails.data, message: localizeString.localize("FAILED", language) });
  //     }
  //   } catch (error) {
  //     return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  //   }
  // }
  // static async getGalleryImages(req: Request, res: Response) {
  //   const languageHeader = req.headers["language"];
  //   const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
  //   try {
  //     const galleryImages = await UserService.getGalleryImages(req, res);
  //     if (galleryImages.executed == 1) {
  //       return res.json({ status: 200, data: galleryImages.data, message: localizeString.localize("GALLERY_IMAGES_FETCHED_SUCCESSFULLY", language) });
  //     } else {
  //       return res.json({ status: 400, data: galleryImages.data, message: localizeString.localize("FAILED", language) });
  //     }
  //   } catch (error) {
  //     return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  //   }
  // }
  // static async getAllBlogs(req: Request, res: Response) {
  //   const languageHeader = req.headers["language"];
  //   const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
  //   try {
  //     const info = await UserService.getAllBlogs(req, res);
  //     if (info.executed == 1) {
  //       return res.json({ status: 200, data: info.data, message: localizeString.localize("BLOG_POSTS_FETCHED_SUCCESSFULLY", language) });
  //     } else {
  //       return res.json({ status: 400, data: info.data, message: localizeString.localize("FAILED", language) });
  //     }
  //   } catch (error) {
  //     return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  //   }
  // }
  // static async getBlogDetails(req: Request, res: Response) {
  //   const languageHeader = req.headers["language"];
  //   const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
  //   try {
  //     const info = await UserService.getBlogDetails(req, res);
  //     if (info.executed == 1) {
  //       return res.json({ status: 200, data: info.data, message: localizeString.localize("BLOG_DETAILS_FETCHED_SUCCESSFULLY", language) });
  //     } else {
  //       return res.json({ status: 400, data: info.data, message: localizeString.localize("FAILED", language) });
  //     }
  //   } catch (error) {
  //     return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  //   }
  // }
  // static async getAboutUs(req: Request, res: Response) {
  //   const languageHeader = req.headers["language"];
  //   const language = Array.isArray(languageHeader) ? languageHeader[0] : languageHeader;
  //   try {
  //     const info = await UserService.getAboutUs(req, res);
  //     if (info.executed == 1) {
  //       return res.json({ status: 200, data: info.data, message: localizeString.localize("ABOUT_US_FETCHED_SUCCESSFULLY", language) });
  //     } else {
  //       return res.json({ status: 400, data: info.data, message: localizeString.localize("FAILED", language) });
  //     }
  //   } catch (error) {
  //     return res.json({ status: 400, data: {}, message: localizeString.localize("FAILED", language) });
  //   }
  // }
}
export default UserController;