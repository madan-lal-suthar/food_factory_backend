const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Category = sequelize.define('food_categories', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  mediaLink: { type: DataTypes.STRING(500), allowNull: true, defaultValue: '' },
  name: { type: DataTypes.STRING(500), allowNull: true, defaultValue: '' },
  description: { type: DataTypes.STRING(500), allowNull: true, defaultValue: '' },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
}, { tableName: 'food_categories', timestamps: true });

module.exports = Category;
