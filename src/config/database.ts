const { Sequelize } = require('sequelize');
const env = require('./env');

const sequelize = new Sequelize(env.DB_NAME || 'food_factory', env.DB_USER || 'postgres', env.DB_PASSWORD || '', {
  host: env.DB_HOST || 'localhost',
  port: Number(env.DB_PORT || 5432),
  dialect: env.DB_DIALECT || 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
