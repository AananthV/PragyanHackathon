var express = require('express');
var router = express.Router();

var authController = require('../controllers/auth.js')

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', authController.register)

router.post('/login', authController.login)

module.exports = router;
