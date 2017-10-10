const db = require('../../database-mysql');
const utils = require('../hashUtils.js');

module.exports = (req, res) => {
  var user = req.body.email;
  var pw = req.body.password;
  var salt = '';
  var hash = '';
  var array = [];
  array.push(user);
  db.checkUser(array, (data) => {
    if (data.length === 0) {
      res.status(400)
      res.send()
    } else {
      hash = data[0].password;
      salt = data[0].salt;
      if (utils.compareHash(pw, hash, salt)) {
        res.send(user);
      } else {
        res.status(400);
        res.send()
      }
    }
  })
}