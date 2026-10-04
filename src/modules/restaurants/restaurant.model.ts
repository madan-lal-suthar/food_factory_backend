const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Restaurant = sequelize.define('restaurants', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(245), allowNull: false, defaultValue: '' },
  description: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
  image: { type: DataTypes.STRING(500), allowNull: true, defaultValue: '/bucket/restaurants/default.jpg' },
  category: { type: DataTypes.STRING(245), allowNull: true, defaultValue: '' },
  rating: { type: DataTypes.FLOAT, allowNull: true, defaultValue: 0 },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
}, { tableName: 'restaurants', timestamps: true });

module.exports = Restaurant;
