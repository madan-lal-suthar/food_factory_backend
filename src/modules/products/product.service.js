const { Op } = require('sequelize');
const Product = require('./product.model');

class ProductService {
  async list(query = {}) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const offset = (page - 1) * limit;

    const where = {};
    const search = String(query.search || '').trim();

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const products = await Product.findAll({
      where,
      offset,
      limit,
      order: [['id', 'DESC']],
    });

    return { products, page, limit };
  }

  async create(payload) {
    return Product.create(payload);
  }
}

module.exports = new ProductService();
