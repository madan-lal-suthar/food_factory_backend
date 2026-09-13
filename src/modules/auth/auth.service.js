const jwt = require('../../utils/jwt');
const User = require('../users/user.model');

class AuthService {
  async register(payload) {
    const user = await User.create(payload);
    const token = jwt.sign({ id: user.id, email: user.email });
    return { user, token };
  }

  async login(payload) {
    const user = await User.findOne({ where: { email: payload.email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email });
    return { user, token };
  }
}

module.exports = new AuthService();
