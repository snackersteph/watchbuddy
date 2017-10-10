const moviedb = require('../../helper/moviedb.js');

//This function will search for the top 10 results when inputting a term into the MovieDB api.
module.exports = (req, res) => {
	console.log(req.body.term)
	var title = req.body.term
	var genres;
	moviedb.genre((data) => {
		genres = JSON.parse(data).genres
		moviedb.search(title, (data) => {
			var searched = JSON.parse(data).results.splice(0, 10);
			var array = [];
			searched.forEach((el) => {
				var obj = {};
				obj.name = el.name;
				obj.id = el.id;
				var arr = [];
				el.genre_ids.forEach((int) => {
					for (var i = 0; i < genres.length; i++) {
						if (genres[i].id === int) {
							arr.push(genres[i].name)
						}
					}
				})
				obj.genres = arr
				obj.summary = el.overview;
				obj.firstAirDate = el.first_air_date;
				obj.image = "https://image.tmdb.org/t/p/w500/" + el.backdrop_path;
				array.push(obj)
			})
			res.send(array);
		})
	})
}