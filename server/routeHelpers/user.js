const { User } = require('../../database-postgres');
const { Show, Movie, Event } = require('../../database-mongo');
const Promise = require('bluebird');

module.exports = {
  GET: ({ params: { username }}, res) => {
    if (!username) {
      res.send(404, 'user does not exist');
    }
    User.findOne({ where: { username }})
      .then(({ dataValues: { id, phone, avatar, notifications, bio }}) => {
        console.log('found', username, id);
        Promise.props({
          events: Event.find({ userId: id }).exec(),
          shows: Show.find({ userId: id }).exec(),
          movies: Movie.find({ userId: id }).exec(),
          info: { phone, avatar, notifications, bio },
        }).then(result => res.send(200, result))
        .catch(err => res.send(err));
        // res.send(JSON.stringify(id));
      });
  },
  POST: ({ body: { events = [], shows = [], movies = [] }, params: { username }}, res) => {
    if (!(events.length || shows.length || movies.length)) {
      res.send('Nothing to change');
    } else if (!username) {
      res.send(404, 'user does not exist');
    }
    User.findOne({ where: { username }})
      .then(({ dataValues: { id }}) => {
        events.map(event => Event.update({ userId: id, title: event.title }, event, { upsert: true })
          .then(result => console.log(result)));
        shows.map(show => Show.update({ userId: id, title: show.title }, show, { upsert: true })
          .then(result => console.log(result)));
        movies.map(movie => Movie.update({ userId: id, title: movie.title }, movie, { upsert: true })
          .then(result => console.log(result)));
        console.log('found', username, id);
        console.log(`body: 
          events: ${JSON.stringify(events)}, 
          shows: ${JSON.stringify(shows)}, 
          movies: ${JSON.stringify(movies)}, `);
        res.send(JSON.stringify(id));
      });
  },
};