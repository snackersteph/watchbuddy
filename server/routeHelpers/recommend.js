const moviedb = require('../../helper/moviedb.js');

//This function is to retrieve the top 5 recommended shows from the MovieDB api for the front page of WatchBuddy.
module.exports = (req, res) => {
	moviedb.genre((data) => {
		const { genres } = JSON.parse(data);
		moviedb.getPopularShows((data) => {
			const top = JSON.parse(data).results.splice(0, 5);
			const array = top.map(show => {
				const { name, id } = show;
				const arr = show.genre_ids.map(int => {
					for (var i = 0; i < genres.length; i++) {
						if (genres[i].id === int){
							return genres[i].name;
						}
					}
				});
				return ({
					name,
					id,
					genres: arr,
					summary: show.overview,
					firstAirDate: show.first_air_date,
					image: `https://image.tmdb.org/t/p/w500/${show.backdrop_path}`,
				});
			});
			res.send(array)
		});
	});
}