const Category = require('./category.model');

class CategoryService {
  async getAll(query = {}) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 12);
    const offset = (page - 1) * limit;

    const data = await Category.findAll({ where: { isDeleted: false }, limit, offset });
    return data;
  }

  async getById(id) {
    return Category.findOne({ where: { id, isDeleted: false } });
  }
}

module.exports = new CategoryService();
