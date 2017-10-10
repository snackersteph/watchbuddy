const moviedb = require('../../helper/moviedb.js');

//this function will populate the seasons, episodes and runtime of episodes when a show is chosen to place into the schedule
module.exports = (req, res) => {
	var id = req.body.id
	moviedb.details(id, (data) => { 
		var info = JSON.parse(data);
		var detail = {};
		var obj = {};
		info.seasons.forEach((el) => {
			if (el.season_number !== 0){
				obj[el.season_number] = [el.episode_count, "https://image.tmdb.org/t/p/w500" + el.poster_path];
			}
		})
		detail.seasons = obj;
		detail.runtime = info.episode_run_time[0];
		res.send(detail)
	})
}