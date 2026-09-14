const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Gallery = sequelize.define('gallery', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING(245), allowNull: true, defaultValue: '' },
  image: { type: DataTypes.STRING(500), allowNull: true, defaultValue: '/bucket/gallery/default.jpg' },
  description: { type: DataTypes.TEXT, allowNull: true, defaultValue: '' },
  isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
}, { tableName: 'gallery', timestamps: true });

module.exports = Gallery;
