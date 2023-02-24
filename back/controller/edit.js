const User = require('../models/User');
const Personal = require('../models/Personal');
const Address = require('../models/Address');
const Professional = require('../models/Professional');
const { ValidationErrorItem } = require('sequelize');
const sharp = require('sharp');

exports.getUserData = async (req, res, next) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    res.status(200).json({ message: 'Requisição realizada com sucesso.', user })
  } else {
    res.status(404).json({ message: 'Usuário não encontrado.' })
  }

}

exports.putUserData = async (req, res, next) => {
  const id = req.params.id;
  const { username, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    await user.update({ username, password })
    res.status(200).json({ message: 'Dados atualizados com sucesso!', user });
  } catch (error) {
    console.error(error);
    if(error.errors[0] instanceof ValidationErrorItem) {
      const errorMessage = error.errors[0].message;
      res.status(400).json({message: errorMessage})
      return;
    }
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

exports.getPersonalData = async (req, res, next) => {
  console.log("request: ",req.params.id)
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' })
  const personal = await Personal.findByPk(user.personalId);
  if (!personal) return res.status(404).json({ message: 'Dados pessoais não encontrados.' });
  console.log("personal: ", personal)
  res.status(200).json({ message: 'Dados pessoais', personal });
}

exports.putPersonalData = async (req, res, next) => {
  const id = req.params.id;
  const { name, birthDate, gender, img, email, tel, rg, cpf, cns } = req.body;

  try {
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const personal = await Personal.findByPk(user.personalId);
    if (!personal) {
      const personalCreated = await Personal.create({ name, birthDate, gender, img, email, tel, rg, cpf, cns });
      await user.setPersonal(personalCreated);
      await personalCreated.setUser(user);
      res.status(201).json({ message: 'Dados pessoais criados.', personalCreated });
    } else {
      await personal.update({ name, birthDate, gender, img, email, tel, rg, cpf, cns });
      res.status(200).json({ message: 'Dados pessoais atualizados.', personal })
    }
  } catch (error) {
    console.error("error: ", error);
    if(error.errors[0] instanceof ValidationErrorItem) {
      const errorMessage = error.errors[0].message;
      res.status(400).json({message: errorMessage})
      return;
    }
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

exports.getAddressData = async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return req.status(404).json({ message: 'Usuário não encontrado' });
  const address = await Address.findByPk(user.addressId);
  if (!address) return res.status(404).json({ message: 'Dados do endereço não encontrados' });
  res.status(200).json({ message: 'Dados do endereço', address });
}

exports.putAddressData = async (req, res, next) => {
  const { state, city, publicPlace, district, number, complement } = req.body;

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) res.status(404).json({ message: 'Usuário não encontrados.' });

    const address = await Address.findByPk(user.addressId);
    if (!address) {
      const addressCreate = await Address.create({ state, city, publicPlace, district, number, complement });
      await user.setAddress(addressCreate);
      await addressCreate.setUser(user);
      res.status(201).json({ message: 'Dados do endereço criados.', addressCreate });
    } else {
      await address.update({ state, city, publicPlace, district, number, complement });
      res.status(200).json({ message: 'Dados do endereço atualizados.', address })
    }
  } catch (error) {
    console.error(error);
    if(error.errors[0] instanceof ValidationErrorItem) {
      const errorMessage = error.errors[0].message;
      res.status(400).json({message: errorMessage})
      return;
    }
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}

exports.getProfessionalData = async (req, res, next) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return req.status(404).json({ message: 'Usuários não encontrado.' });
  const professional = await Professional.findByPk(user.professionalId);
  if (!professional) return res.status(404).json({ message: 'Dados profissionais não encontrado.' });
  res.status(200).json({ message: 'Dados profissionais', professional });
}

exports.putProfessionalData = async (req, res, next) => {
  const { conselho, estadoConselho, numeroConselho, especialidade, rqe, sincronizacaoMEMED } = req.body;

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) res.status(404).json({ message: 'Usuário não encontrado' });

    const professional = await Professional.findByPk(user.professionalId);
    if (!professional) {
      const professionalCreate = await Professional.create({ conselho, estadoConselho, numeroConselho, especialidade, rqe, sincronizacaoMEMED });
      await user.setProfessional(professionalCreate);
      await professionalCreate.setUser(user);
      res.status(201).json({ message: 'Dados profissionais criados.', professionalCreate });
    } else {
      await professional.update({ conselho, estadoConselho, numeroConselho, especialidade, rqe, sincronizacaoMEMED });
      res.status(200).json({ message: 'Dados profissionais atualizados.', professional })
    }
  } catch (error) {
    console.error(error);
    if(error.errors[0] instanceof ValidationErrorItem) {
      const errorMessage = error.errors[0].message;
      res.status(400).json({message: errorMessage})
      return;
    }
    res.status(500).json({ message: 'Erro no servidor.' });
  }
}