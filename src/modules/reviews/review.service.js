const Review = require('./review.model');

class ReviewService {
  async getAll() {
    return Review.findAll({ where: { isDeleted: false } });
  }
}

module.exports = new ReviewService();
