angular.module('MyApp')
  .controller('HomeCtrl', function($http, $scope, Weather) {

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
  });
