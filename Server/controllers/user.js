const User = require('../models/User.js')

exports.getAll = (req, res) => {
  User.find({}, function(err, users) {
    user_data = [];
    for (var user of users) {
      user_data.push({name: user.name, id: user._id})
    }
    return res.send(user_data);
  });
}
