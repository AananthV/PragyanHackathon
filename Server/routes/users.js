var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.js')
var documentController = require('../controllers/document.js')

/* GET users listing. */
router.get('/users/getAll', userController.getAll);
router.get('/dashboard', documentController.getDocumentsUploaded, documentController.getDocumentsSign);

module.exports = router;
