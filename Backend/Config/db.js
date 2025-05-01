require('dotenv').config(); // <-- load .env file

const { Sequelize } = require('sequelize');
// const MYSQL_URL = process.env.MYSQL_URL;
const sequelize = new Sequelize(process.env.MYSQL_URL, {
  dialect: 'mysql',
  timezone: '+05:30',
});

module.exports = sequelize;