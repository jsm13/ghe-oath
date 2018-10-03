const Sequelize = require('sequelize');

const db = new Sequelize('auth_test', '', '', {
  dialect: 'postgres'
})

module.exports = db;
