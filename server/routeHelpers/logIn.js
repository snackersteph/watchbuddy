const utils = require('../hashUtils.js');
const { User } = require('../../database-postgres');

//This function will check whether the password matches for that user.
module.exports = {
  POST: ({ body: { username, password }}, res) => {
    console.log('RECEIVED: ', username, password);
    const array = [username];

    User.findOne({ where: { username }})
      .then(({ dataValues: { username, salt, password: pwHash }}) => {
        console.log('HASH MATCH', utils.compareHash(password, pwHash, salt));
        if (utils.compareHash(password, pwHash, salt)) {
          res.send(username);
        }
      }).catch(err => {
        console.log('Error logging in: ', err);
        res.status(400);
        res.send();
      });
  },
};