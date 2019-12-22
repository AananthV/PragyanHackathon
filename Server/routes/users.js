var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.js')
var documentController = require('../controllers/document.js')

/* GET users listing. */
router.post('/users/findName', userController.findUsersLike);
router.get('/dashboard', documentController.getDocuments);

module.exports = router;