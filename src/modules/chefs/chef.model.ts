const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Chef = sequelize.define('Chef', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurant: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  specialty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
}, {
  tableName: 'chefs',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['name', 'restaurant'],
    },
  ],
});

module.exports = Chef;
