angular.module('MyApp')
  .factory('Weather', function($http) {
    return {
      get: function(data) {
        return $http.get('/data', {
          params: {
            city: data
          }
        });
      }
    };
  });