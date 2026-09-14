"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const public_service_1 = __importDefault(require("../../service/v1/public.service"));
class PublicController {
    static async getRestaurants(req, res) {
        try {
            const result = await public_service_1.default.getRestaurants(req);
            return res.json({ success: true, data: result.data, pagination: result.pagination });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch restaurants' });
        }
    }
    static async getRestaurantById(req, res) {
        try {
            const result = await public_service_1.default.getRestaurantById(req.params.id);
            return res.json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch restaurant' });
        }
    }
    static async getCategories(req, res) {
        try {
            const result = await public_service_1.default.getCategories(req);
            return res.json({ success: true, data: result.data });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch categories' });
        }
    }
    static async getCategoryById(req, res) {
        try {
            const result = await public_service_1.default.getCategoryById(req.params.id);
            return res.json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch category' });
        }
    }
    static async getFoods(req, res) {
        try {
            const result = await public_service_1.default.getFoods(req);
            return res.json({ success: true, data: result.data, pagination: result.pagination });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch foods' });
        }
    }
    static async getFoodById(req, res) {
        try {
            const result = await public_service_1.default.getFoodById(req.params.id);
            return res.json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch food' });
        }
    }
    static async getGallery(req, res) {
        try {
            const result = await public_service_1.default.getGallery(req);
            return res.json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch gallery' });
        }
    }
    static async getReviews(req, res) {
        try {
            const result = await public_service_1.default.getReviews(req);
            return res.json({ success: true, data: result });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
        }
    }
    static async createOrder(req, res) {
        try {
            const result = await public_service_1.default.createOrder(req.body);
            return res.status(201).json({ success: true, data: result });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: 'Failed to create order' });
        }
    }
}
exports.default = PublicController;
