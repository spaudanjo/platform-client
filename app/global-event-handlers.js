module.exports = ['$rootScope', '$location', 'Authentication', function($rootScope, $location, Authentication){
  $rootScope.$on('event:authentication:succeeded', function(){
    Authentication.getSigninStatus() ? $location.path("/posts") : $location.path("/signin");
  });
}];
