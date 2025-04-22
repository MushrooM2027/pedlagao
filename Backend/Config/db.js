const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('pedlagao', 'root', 'Aditya1401@R', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+05:30'
});

module.exports = sequelize;