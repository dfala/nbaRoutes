var app = angular.module('nbaRoutes');

app.controller('teamCtrl', function($scope, $routeParams, teamService, teamData){
	$scope.teamData = teamData;
	$scope.newGame;
	$scope.showNewGameForm = false;

	if (teamData[0].homeTeam === 'utahjazz') {
		$scope.homeTeam = 'Utah Jazz';
		$scope.logoPath = 'images/jazz-logo.png';
	} else if (teamData[0].homeTeam === 'losangeleslakers') {
		$scope.homeTeam = 'Los Angeles Lakers';
		$scope.logoPath = 'images/lakers-logo.png';
	} else if (teamData[0].homeTeam === 'miamiheat') {
		$scope.homeTeam = 'Miami Heat';
		$scope.logoPath = 'images/heat-logo.png';
	}

	$scope.toggleNewGameForm = function () {
		$scope.showNewGameForm = !$scope.showNewGameForm;
	}

	$scope.submitGame = function () {
		$scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();

		console.log($scope.newGame);

		teamService.addNewGame($scope.newGame)
			.then(function (response) {
				teamService.getTeamData($scope.newGame.homeTeam)
					.then(function (data) {
						$scope.teamData = data;

						$scope.newGame = '';
						$scope.showNewGameForm = false;
					})
			}, function (err) {
				console.error(err);
			})
	}

	// console.warn('$scope', $scope);
});