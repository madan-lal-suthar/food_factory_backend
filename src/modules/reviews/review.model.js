const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Review = sequelize.define('reviews', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  customerName: { type: DataTypes.STRING(245), allowNull: false, defaultValue: 'Guest' },
  rating: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 5 },
  comment: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
  restaurantId: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
}, { tableName: 'reviews', timestamps: true });

module.exports = Review;
