module.exports = ['$rootScope', '$location', function($rootScope, $location){

  $rootScope.$on('event:authentication:succeeded', function(){
    $location.path("/posts");
  });

  $rootScope.$on('event:authentication:failed', function(){
    $location.path("/signin");
  });

  $rootScope.$on('event:unauthorized', function(){
    $location.path("/signin");
  });

}];
