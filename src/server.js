const http = require('http');
const env = require('./config/env');
const app = require('./app');
const db = require('./database/models');
const logger = require('./config/logger');

const server = http.createServer(app);

(async () => {
  try {
    await db.sequelize.authenticate();
    logger.info('Database connected successfully');

    await db.sequelize.sync({ alter: true });
    logger.info('Database synced');

    server.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error(error.message);
    process.exit(1);
  }
})();
