angular.module('MyApp', ['ngRoute', 'satellizer'])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });
  });
