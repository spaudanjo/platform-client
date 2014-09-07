module.exports = ['$provide', '$httpProvider', function($provide, $httpProvider){
  // register the interceptor as a service
  $provide.factory('authInterceptor', ['$rootScope', '$q', function($rootScope, $q) {
    return {

      // optional method
      'responseError': function(rejection) {
        if ( rejection.status == 401) {
          var deferred = $q.defer();
          $rootScope.$broadcast('event:unauthorized');
          return deferred.promise;
        };
        return $q.reject( rejection );
      }
    };
  }]);
  $httpProvider.interceptors.push('authInterceptor');
}];
