const utils = require('../hashUtils.js');
const { User } = require('../../database-postgres');
const { pickBy } = require('lodash');

module.exports = {
  POST: ({ params: { username }, body: {
    phone,
    avatarUrl,
    notifications,
    bio,
  }}, res) => {
    const updates = pickBy({ phone, avatarUrl, notifications, bio }, (val) => !!val);
    console.log('UPDATES FOUND: ', updates);
    if (!Object.keys(updates).length) {
      res.send('Nothing to update');
    }
    User.update(updates, { where: { username }})
      .then(() => res.send(202, 'Update successful'))
      .catch(() => res.send(500, 'Update failed'));
  }
};