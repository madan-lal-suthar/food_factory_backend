const sequelize = require('../../config/database');
const User = require('../../modules/users/user.model');
const Product = require('../../modules/products/product.model');
const Chef = require('../../modules/chefs/chef.model');

const db = {
  sequelize,
  User,
  Product,
  Chef,
};

module.exports = db;
