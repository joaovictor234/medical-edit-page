const router = require('express').Router();
const editController = require('../controller/edit');

router.get('/user/:id', editController.getUserData);

router.put('/user/:id', editController.putUserData);

router.get('/personal/:id', editController.getPersonalData);

router.put('/personal/:id', editController.putPersonalData);

router.get('/address/:id', editController.getAddressData);

router.put('/address/:id', editController.putAddressData);

router.get('/professional/:id', editController.getProfessionalData);

router.put('/professional/:id', editController.putProfessionalData);

exports.routes = router;