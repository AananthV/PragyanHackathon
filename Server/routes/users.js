var express = require('express');
var router = express.Router();

var userController = require('../controllers/user.js')

/* GET users listing. */
router.post('/users/findName', userController.findUsersLike);

module.exports = router;
