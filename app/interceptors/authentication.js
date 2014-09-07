module.exports = ['$provide', '$httpProvider', function($provide, $httpProvider){
  // register the interceptor as a service
  $provide.factory('authInterceptor',
  ['$rootScope', '$q', '$location', function($rootScope, $q, $location) {
    return {

      'request': function(config) {
        $location;
        if(config.url.indexOf("localhost:8000") != -1)
        {
          var accessToken = localStorage.getItem('access_token');
          var sep = config.url.indexOf('?') === -1 ? '?' : '&';
          config.url = config.url + sep + 'access_token=' + accessToken;
        }
        return config;
      },

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
