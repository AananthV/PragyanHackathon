const User = require('../models/User.js')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

exports.register = (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    User.create(
      {
      name: req.body.name,
      password_hashed: hash,
      email: req.body.email,
      phone: req.body.phone,
      public_address: req.body.public_address
      },
      function (err, user) {
        console.log(user)
        return res.send(user._id)
      }
    )
  })
}

exports.login = (req, res) => {
  User.find({ email: req.body.email }, function(err, user) {
    bcrypt.compare(req.body.password, user.password_hashed, function(err, res) {
      if (res == true) {
        req.session.user_id = user._id;
      }
      return res.render('index', { title: 'Express' })
    });
  })
}
