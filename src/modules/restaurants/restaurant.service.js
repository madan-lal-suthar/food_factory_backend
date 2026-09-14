const Restaurant = require('./restaurant.model');
const { Op } = require('sequelize');

class RestaurantService {
  async getAll(query = {}) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 12);
    const search = String(query.search || '');
    const offset = (page - 1) * limit;

    const where = { isDeleted: false };
    if (search) where.name = { [Op.iLike]: `%${search}%` };

    const data = await Restaurant.findAll({ where, limit, offset });
    const total = await Restaurant.count({ where });

    return {
      data,
      pagination: { page, limit, total },
    };
  }

  async getById(id) {
    return Restaurant.findOne({ where: { id, isDeleted: false } });
  }
}

module.exports = new RestaurantService();
