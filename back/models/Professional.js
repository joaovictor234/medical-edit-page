const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Professional = sequelize.define('professional', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  conselho: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo conselho não pode ser vazio'
      }
    }
  },
  estadoConselho: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo estado conselho não pode ser vazio'
      }
    }
  },
  numeroConselho: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo número do conselho não pode ser vazio'
      }
    }
  },
  especialidade: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo especialidade não pode ser vazio'
      }
    }
  },
  rqe: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo RQE não pode ser vazio'
      }
    }
  },
  sincronizacaoMEMED: Sequelize.BOOLEAN
})

module.exports = Professional;