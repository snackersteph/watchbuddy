const db = require('../../database-mysql');
const utils = require('../hashUtils.js');

//This function will check whether the password matches for that user.
module.exports = (req, res) => {
  const { email, password } = req.body;
  const array = [email];

  db.checkUser(array, (data) => {
    if (data.length) {
      hash = data[0].password;
      salt = data[0].salt;
      if (utils.compareHash(password, hash, salt)) {
        res.send(email);
      }
    }
    res.status(400);
    res.send();
  });
}