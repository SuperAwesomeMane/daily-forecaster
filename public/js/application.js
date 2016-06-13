angular.module('MyApp', ['ngRoute', 'satellizer'])
  .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        templateUrl: 'partials/404.html'
      });
  }]);

angular.module('MyApp')
  .controller('HeaderCtrl', ["$scope", "$location", "$window", "$auth", function($scope, $location, $window, $auth) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    
    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/');
    };
  }]);
angular.module('MyApp')
  .controller('HomeCtrl', ["$http", "$scope", "Weather", function($http, $scope, Weather) {

    $scope.getWeatherData = function() {
      $scope.data = document.getElementById('searchInput').value;
      if ($scope.data != "") {
        document.getElementById('cityDisplay').value = $scope.data;
      }

      Weather.get($scope.data).then(function(response) {

          console.log($scope.data);
          console.log(response.data);
          $scope.city = response.data.city.name;
          $scope.weatherData = response.data.list;
          
          $scope.weatherData = $scope.weatherData.map(function(item) {
            item.date = new Date(item.dt * 1000);
            return item;
          });

        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };
  }]);

angular.module('MyApp')
  .factory('Weather', ["$http", function($http) {
    return {
      get: function(data) {
        return $http.get('/data', {
          params: {
            city: data
          }
        });
      }
    };
  }]);