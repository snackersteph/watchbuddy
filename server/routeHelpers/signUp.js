const db = require('../../database-mysql');
const utils = require('../hashUtils.js');

//This function will create a new row for the users table for new users.
module.exports = (req, res) => {
  var salt = utils.createRandom32String(); // create salt
  var user = req.body.email;
  var pw = utils.createHash(req.body.password, salt);
  var array = [user, pw, salt];
  // array.push(user);
  // array.push(pw);
  // array.push(salt);
  db.createUser(array, (data) => {
     res.send(user);
  })
}