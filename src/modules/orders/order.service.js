const Order = require('./order.model');
const OrderItem = require('./orderItem.model');

class OrderService {
  async create(payload) {
    const total = Number(payload.items?.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0) || 0);

    const order = await Order.create({
      restaurantId: payload.restaurantId,
      customerName: payload.customerName || 'Guest',
      deliveryAddress: payload.deliveryAddress,
      note: payload.note,
      status: 'pending',
      total,
    });

    const items = await Promise.all(
      (payload.items || []).map((item) => OrderItem.create({
        orderId: order.id,
        foodId: item.foodId,
        quantity: item.quantity,
        price: item.price,
      }))
    );

    return {
      id: order.id,
      status: order.status,
      total: order.total,
      restaurantId: order.restaurantId,
      items: items.map((item) => ({ foodId: item.foodId, quantity: item.quantity })),
    };
  }
}

module.exports = new OrderService();
