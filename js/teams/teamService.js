var app = angular.module('nbaRoutes');

app.factory('teamService', function($http, $q){
	var service = {};

	// ADD NEW GAME
	service.addNewGame = function (gameObject) {
		var deferred = $q.defer();

		if (!gameObject) return console.warn('gameObject is not defined');

		//gameObject will have the data bout individual game that we'll send to parse
		var url = 'https://api.parse.com/1/classes/' + gameObject.homeTeam;
		
		var homeTeamScore = parseInt(gameObject.homeTeamScore);
		var opponentScore = parseInt(gameObject.opponentScore);


		if (homeTeamScore > opponentScore) {
			gameObject.win = false;
		};

		$http.post(url, gameObject)
			.then(function (response) {
				deferred.resolve(response);
			}, function (err) {
				console.error(err)
			})

		return deferred.promise;
	}

	// ADD NEW GAME
	service.getTeamData = function (team) {
		if (!team) return console.warn('team is not defined');

		var deferred = $q.defer();
		var url = 'https://api.parse.com/1/classes/' + team + '?order=-createdAt';

		$http.get(url)
			.then(function (response) {
				var results = response.data.results;
				var wins = 0;
				var losses = 0;

				results.forEach(function (game, index) {
					if (game.won) { wins++ } else { losses++ };
				})

				results.wins = wins;
				results.losses = losses;

				deferred.resolve(results);
			}, function (err) {
				console.error(err);
			})

		return deferred.promise;
	}

	return service;
});