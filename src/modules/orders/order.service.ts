const Order = require('./order.model');
const OrderItem = require('./orderItem.model');

type OrderItemInput = { foodId: string | number; price: string | number; quantity: string | number };
type OrderInput = {
  restaurantId: string | number;
  customerName?: string;
  deliveryAddress: string;
  note?: string;
  items?: OrderItemInput[];
};

class OrderService {
  async create(payload: OrderInput) {
    const total = Number(payload.items?.reduce((sum: number, item: OrderItemInput) => sum + Number(item.price) * Number(item.quantity), 0) || 0);

    const order = await Order.create({
      restaurantId: payload.restaurantId,
      customerName: payload.customerName || 'Guest',
      deliveryAddress: payload.deliveryAddress,
      note: payload.note,
      status: 'pending',
      total,
    });

    const items = await Promise.all(
      (payload.items || []).map((item: OrderItemInput) => OrderItem.create({
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
