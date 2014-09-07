module.exports = ['$rootScope', '$location', function($rootScope, $location){

  $rootScope.$on('event:authentication:succeeded', function(){
    $rootScope.signedIn = true;
    $location.path("/posts");
  });

  $rootScope.$on('event:authentication:failed', function(){
    $rootScope.signedIn = false;
    $location.path("/signin");
  });

  $rootScope.$on('event:unauthorized', function(){
    $rootScope.signedIn = false;
    $location.path("/signin");
  });

}];
