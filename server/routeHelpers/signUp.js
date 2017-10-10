const db = require('../../database-mysql');
const utils = require('../hashUtils.js');

module.exports = (req, res) => {
  var salt = utils.createRandom32String(); // create salt
  var user = req.body.email;
  var pw = utils.createHash(req.body.password, salt);
  var array = [];
  array.push(user);
  array.push(pw);
  array.push(salt);
  db.createUser(array, (data) => {
     res.send(user);
  })
}