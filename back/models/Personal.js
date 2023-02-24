const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Personal = sequelize.define('personal', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo nome não pode ser vazio'
      }
    }
  },
  birthDate: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo data de nascimento não pode ser vazio'
      }
    }
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo gênero não pode ser vazio'
      }
    }
  },
  img: Sequelize.BLOB,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo email não pode ser vazio'
      }
    }
  },
  tel: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo telefone não pode ser vazio'
      }
    }
  },
  rg: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo RG não pode ser vazio'
      }
    }
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,validate: {
      notEmpty: {
        msg: 'O campo CPF não pode ser vazio'
      }
    }
  },
  cns: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'O campo CNS não pode ser vazio'
      }
    }
  }
})

module.exports = Personal;