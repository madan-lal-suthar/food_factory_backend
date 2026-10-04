const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const OrderItem = sequelize.define('order_items', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  orderId: { type: DataTypes.INTEGER, allowNull: false },
  foodId: { type: DataTypes.INTEGER, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  price: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
}, { tableName: 'order_items', timestamps: true });

module.exports = OrderItem;
