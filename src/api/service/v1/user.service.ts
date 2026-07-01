import appConstants from "../../common/appConstants";
import CryptoService from "../../helper/crypto.helper";
import jwtHelper from "../../helper/jwt.helper";
import { Request, Response } from 'express';
import userModel from "../../model/user" 
import BannerModel from "../../model/banner" 
import FoodProductModel from "../../model/food_products" 
import FoodCategoryModel from "../../model/food_categories";
import { literal } from "sequelize";

class UserService {
    static async userSignUp(request : Request, response : Response) {
        try {
            const { email, password, name, userName, profileLink } = request.body;
            const hashedPassword = CryptoService.encryptPassword(password);
            let getUserDetail = await userModel.create(
                {
                    email, password: hashedPassword, name, userName,profileLink
                }
            )
            console.log("getUserDetail ===>>>>", getUserDetail)

            // if (result[0][0].res === 1) {
                return ({ executed: 1, data: { getUserDetail} });
            // } else if (result[0][0].res === 2) {
            //     return ({ executed: 2, data: {} });
            // } else {
                return ({ executed: 0, data: {} });
            // }
        } catch (error) {
            console.log("error ====>>>", error);
            throw new Error('Failed to login admin');
        }
    }
    static async getHomeBanner(request : Request, response : Response) {
        try {
            const getBannerList = await BannerModel.findAll({
                attributes: ["id", "mediaLink"],
                where: {
                    isDeleted: false
                }
            });
            if(getBannerList.length == 0){  
                   return({executed : 0, data: {}}) 
            }
            return ({ executed: 1, data: {getBannerList : getBannerList} });
        } catch (error) {
            console.log("error ====>>>", error);
            return ({ executed: 0, data: {} });
        }
    }
    static async getTopHomefoods(request : Request, response : Response) {
        try {
            const getTopHomefoods = await FoodProductModel.findAll({
                attributes: ["id", "name", "description", "totalPrice", "categoryId", "mediaLink"],
                order: [["id", "DESC"]],
                limit: 20,
                include: [
                    {
                        model: userModel,
                        as: "user",
                        attributes: ["id", "name", "userName", "profileLink"]
                    },
                     {
                        model: FoodCategoryModel,
                        as: "category",
                        attributes: [literal("name") as unknown as "categoryName"]   
                    }
                ],
            
                where: {
                    isDeleted: false
                }
            });
            if(getTopHomefoods.length == 0){  
                   return({executed : 0, data: {}}) 
            }
            return ({ executed: 1, data: {getTopHomefoods : getTopHomefoods} });
        } catch (error) {
            console.log("error ====>>>", error);
            return ({ executed: 0, data: {} });
        }
    }
    static async getRestaurantTiming(request : Request, response : Response) {
        try {
            const getRestaurantTiming = await userModel.findAll({
                attributes: ["id", "name", "userName", "profileLink"],
                where: {
                    isDeleted: false
                }
            });
            if(getRestaurantTiming.length == 0){  
                   return({executed : 0, data: {}}) 
            }
            return ({ executed: 1, data: {getRestaurantTiming : getRestaurantTiming} });
        } catch (error) {
            console.log("error ====>>>", error);
            return ({ executed: 0, data: {} });
        }
    }
    static async getFeedbackOfCustomer(request : Request, response : Response) {
        try {
            const getFeedbackOfCustomer = await userModel.findAll({
                attributes: ["id", "name", "userName", "profileLink"],
                where: {
                    isDeleted: false
                }
            });
            if(getFeedbackOfCustomer.length == 0){  
                   return({executed : 0, data: {}}) 
            }
            return ({ executed: 1, data: {getFeedbackOfCustomer : getFeedbackOfCustomer} });
        } catch (error) {
            console.log("error ====>>>", error);
            return ({ executed: 0, data: {} });
        }
    }
    static async getBestChefOfRestaurant(request : Request, response : Response) {
        try {
            const getBestChefOfRestaurant = await userModel.findAll({
                attributes: ["id", "name", "userName", "profileLink"],
                where: {
                    isDeleted: false
                }
            });
            if(getBestChefOfRestaurant.length == 0){  
                   return({executed : 0, data: {}}) 
            }
            return ({ executed: 1, data: {getBestChefOfRestaurant : getBestChefOfRestaurant} });
        } catch (error) {
            console.log("error ====>>>", error);
            return ({ executed: 0, data: {} });
        }
    }
    
}

export default UserService;    
