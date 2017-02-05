angular.module('parrotPollApp').factory('HttpInterceptor', function($q,$location) {
    return {
     responseError: function(response) {
        // Unauthorized
        if(response.status==500){
          $location.path('/error500');
        }
        return $q.reject(response);
      }
    };
  });
