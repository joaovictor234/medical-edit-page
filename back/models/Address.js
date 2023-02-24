const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Address = sequelize.define('address', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  state: {
    type: Sequelize.STRING(2),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo estado não pode ser vazio'
      }
    },
    
  },
  city: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo cidade não pode ser vazio'
      }
    }
  },
  publicPlace: Sequelize.STRING,
  district: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo bairro não pode ser vazio'
      }
    }
  },
  number: {
    type: Sequelize.STRING(10),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo número não pode ser vazio'
      }
    }
  },
  complement: Sequelize.STRING
})

module.exports = Address;