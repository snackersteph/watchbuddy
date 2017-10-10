const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const db = require('../database-mysql');
const moviedb = require('../helper/moviedb.js');
const utils = require('./hashUtils.js');
const { 
	recommend,
	search,
	signUp,
	logIn,
	add,
	addShow,
} = require('./routeHelpers/index.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../react-client/dist'));


//This function is to retrieve the top 5 recommended shows from the MovieDB api for the front page of WatchBuddy.
app.get('/recommend', recommend);

//This function will search for the top 10 results when inputting a term into the MovieDB api.
app.post('/search', search);

//This function will create a new row for the users table for new users.
app.post('/signUp', signUp);

//This function will check whether the password matches for that user.
app.post('/logIn', logIn);

//this function will populate the seasons, episodes and runtime of episodes when a show is chosen to place into the schedule
app.post('/add', add);

//this function will add show information to the user's database as well as return the information for the current and next episode. This will also return the number of remaining episodes.
app.post('/addshow', addShow);

app.post('/update', function (req, res) {

})

app.listen(process.env.PORT || 3000, ()  => {
  console.log(`listening on port ${3000}!`);
})










