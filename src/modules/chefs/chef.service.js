const { Op } = require('sequelize');
const Chef = require('./chef.model');

class ChefService {
  async getAll(query = {}) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 12);
    const offset = (page - 1) * limit;

    const restaurant = String(query.restaurant || '').trim();
    const search = String(query.search || '').trim();

    const where = {};

    if (restaurant) {
      where.restaurant = { [Op.iLike]: restaurant };
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { restaurant: { [Op.iLike]: `%${search}%` } },
        { specialty: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const data = await Chef.findAll({
      where,
      limit,
      offset,
      order: [['id', 'ASC']],
    });

    const total = await Chef.count({ where });

    return {
      data,
      pagination: { page, limit, total },
    };
  }

  async getById(id) {
    return Chef.findByPk(id);
  }
}

module.exports = new ChefService();
