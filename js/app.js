var app = angular.module('nbaRoutes', ['ngRoute'])

.config(function ($routeProvider, $httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');

  $routeProvider
  .when('/', {
    templateUrl: 'js/home/homeTmpl.html',
    controller: 'homeCtrl'
  })

  .when('/teams/:team', {
    templateUrl: 'js/teams/teamTmpl.html',
    controller: 'teamCtrl',
    resolve: {
      teamData: function ($route, teamService, $location, $q) {
        var deferred = $q.defer();

        teamService.getTeamData($route.current.params.team)
          .then(function(results){
            deferred.resolve(results);
          })
          .catch(function (error) {
            $location.path('/');
            deferred.reject(error);
          })

        return deferred.promise;
      }
    }
  })

  .when('/404', {
    templateUrl: 'js/home/error.html'
  })

  .otherwise('/404');

})


































// app.config(function ($routeProvider, $httpProvider){
//   $httpProvider.interceptors.push('httpRequestInterceptor');

//   //router here
//   $routeProvider
//   	.when('/', {
//   		templateUrl: 'js/home/homeTmpl.html',
//   		controller: 'homeCtrl'
//   	})
//   	.when('/teams/:team', {
//   		templateUrl: 'js/teams/teamTmpl.html',
//   		controller: 'teamCtrl',
//   		resolve: {
//   			teamData: function ($route, teamService) {
//   				return teamService.getTeamData($route.current.params.team);
//   			}
//   		}
//   	})
//   	.otherwise('/index.html');

// });