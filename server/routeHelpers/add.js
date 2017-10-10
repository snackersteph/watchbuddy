const moviedb = require('../../helper/moviedb.js');

//this function will populate the seasons, episodes and runtime of episodes when a show is chosen to place into the schedule
module.exports = (req, res) => {
	const { id } = req.body;
	moviedb.details(id, data => { 
    const { seasons } = JSON.parse(data);
		var info = JSON.parse(data);
		var detail = {};
		var obj = seasons.reduce((memo, el) => {
			if (el.season_number !== 0) {
				memo[el.season_number] = [el.episode_count, "https://image.tmdb.org/t/p/w500" + el.poster_path];
      }
      return memo;
		}, {});
		detail.seasons = obj;
		detail.runtime = info.episode_run_time[0];
		res.send(detail)
	})
}