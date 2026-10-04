const env = require('./config/env');
const app = require('./app');
const db = require('./database/models');
const logger = require('./config/logger');
const seedChefs = require('./modules/chefs/chef.seed');

(async () => {
  try {
    await db.sequelize.authenticate();
    logger.info('Database connected successfully');

    await db.sequelize.sync({ alter: true });
    logger.info('Database synced');

    await seedChefs();
    logger.info('Chef seed data inserted');

    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
})();
