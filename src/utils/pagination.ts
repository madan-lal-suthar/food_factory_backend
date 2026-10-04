module.exports = {
  paginate: (page = 1, limit = 10, total = 0) => ({
    page: Number(page),
    limit: Number(limit),
    total,
    pages: Math.ceil(total / limit) || 0,
  }),
};
