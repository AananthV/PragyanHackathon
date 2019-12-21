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
