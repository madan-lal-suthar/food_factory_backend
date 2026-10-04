const User = require('./user.model');

class UserService {
  async list(query: ExpressQuery = {}) {
    const page = Number(query.page || 1);
    const limit = Number(query.limit || 10);

    const offset = (page - 1) * limit;
    const users = await User.findAll({ offset, limit });
    return { users, page, limit };
  }

  async create(payload: Record<string, unknown>) {
    return User.create(payload);
  }
}

module.exports = new UserService();
