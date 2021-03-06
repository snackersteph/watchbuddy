const db = require('../../database-mysql');
const utils = require('../hashUtils.js');

//This function will create a new row for the users table for new users.
module.exports = (req, res) => {
  const { email, password } = req.body;
  const salt = utils.createRandom32String(); // create salt
  const pw = utils.createHash(password, salt);
  const array = [email, pw, salt];

  db.createUser(array, (data) => {
     res.send(email);
  });
}