const moviedb = require('../../helper/moviedb.js');

//This function is to retrieve the top 5 recommended shows from the MovieDB api for the front page of WatchBuddy.
module.exports = (req, res) => {
	var genres;
	moviedb.genre((data) => {
		genres = JSON.parse(data).genres
		moviedb.getPopularShows((data) => {
			var top = JSON.parse(data).results.splice(0, 5)
			var array = [];
			top.forEach((el) => {
				var obj = {};
				obj.name = el.name;
				var arr = [];
				el.genre_ids.forEach((int) => {
					for (var i = 0; i < genres.length; i++) {
						if (genres[i].id === int){
							arr.push(genres[i].name)
						}
					}
				})
				obj.genres = arr
				obj.summary = el.overview;
				obj.firstAirDate = el.first_air_date;
				obj.image = "https://image.tmdb.org/t/p/w500/" + el.backdrop_path;
				obj.id = el.id
				array.push(obj)
			})
			res.send(array)
		})
	})
}