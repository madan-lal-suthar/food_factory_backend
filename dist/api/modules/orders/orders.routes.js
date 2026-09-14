"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = __importDefault(require("../../model/orders"));
const order_items_1 = __importDefault(require("../../model/order_items"));
const router = (0, express_1.Router)();
router.post('/', async (req, res) => {
    try {
        const payload = req.body;
        const total = Number(payload.items?.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0) || 0);
        const order = await orders_1.default.create({
            restaurantId: payload.restaurantId,
            customerName: payload.customerName || 'Guest',
            deliveryAddress: payload.deliveryAddress,
            note: payload.note,
            status: 'pending',
            total,
        });
        const items = await Promise.all((payload.items || []).map((item) => order_items_1.default.create({
            orderId: order.get?.('id') || order.id,
            foodId: item.foodId,
            quantity: item.quantity,
            price: item.price,
        })));
        return res.status(201).json({
            success: true,
            data: {
                id: order.get?.('id') || order.id,
                status: order.get?.('status') || order.status,
                total: order.get?.('total') || order.total,
                restaurantId: order.get?.('restaurantId') || order.restaurantId,
                items: items.map((item) => ({ foodId: item.get?.('foodId') || item.foodId, quantity: item.get?.('quantity') || item.quantity })),
            },
        });
    }
    catch (error) {
        return res.status(400).json({ success: false, message: 'Failed to create order' });
    }
});
exports.default = router;
