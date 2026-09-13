const sequelize = require('../../config/database');
const User = require('../../modules/users/user.model');
const Product = require('../../modules/products/product.model');

const db = {
  sequelize,
  User,
  Product,
};

module.exports = db;
