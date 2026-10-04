const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Order = sequelize.define('orders', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  restaurantId: { type: DataTypes.INTEGER, allowNull: false },
  customerName: { type: DataTypes.STRING(245), allowNull: false, defaultValue: 'Guest' },
  deliveryAddress: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
  note: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
  status: { type: DataTypes.STRING(50), allowNull: true, defaultValue: 'pending' },
  total: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
}, { tableName: 'orders', timestamps: true });

module.exports = Order;
