const { STRING } = require('sequelize');
const db = require('../db/connection.js');

const User = db.define('user', {
  username: STRING,
  gheId: STRING
});

module.exports = User;
