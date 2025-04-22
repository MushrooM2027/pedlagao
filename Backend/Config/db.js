const { Sequelize } = require('sequelize');
const dbPassword = process.env.DB_PASSWORD;
const sequelize = new Sequelize('pedlagao', 'root', dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+05:30'
});

module.exports = sequelize;