const jwt = require('../../utils/jwt');
const User = require('../users/user.model');
const crypto = require('crypto');

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

  async guestLogin(req) {
    const guestId = `guest_${crypto.randomUUID()}`;
    const accessToken = jwt.signGuest({ type: 'guest', guestId, session: crypto.randomUUID(), role: 'guest' }, '1h');
    const refreshToken = jwt.signGuest({ type: 'guest', guestId, session: crypto.randomUUID(), role: 'guest' }, '7d');
    return { accessToken, refreshToken, guestId };
  }
}

module.exports = new AuthService();
