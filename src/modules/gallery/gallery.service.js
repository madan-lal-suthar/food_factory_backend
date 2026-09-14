const Gallery = require('./gallery.model');

class GalleryService {
  async getAll() {
    return Gallery.findAll({ where: { isDeleted: false } });
  }
}

module.exports = new GalleryService();
