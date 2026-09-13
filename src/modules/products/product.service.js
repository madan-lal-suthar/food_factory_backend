const Product = require('./product.model');

class ProductService {
  async list(query = {}) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);
    const offset = (page - 1) * limit;

    const products = await Product.findAll({ offset, limit });
    return { products, page, limit };
  }

  async create(payload) {
    return Product.create(payload);
  }
}

module.exports = new ProductService();
