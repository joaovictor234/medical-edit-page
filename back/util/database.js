const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('healthydev_db', 'root', 'admin', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize;