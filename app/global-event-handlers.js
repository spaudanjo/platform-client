module.exports = ['$rootScope', '$location', function($rootScope, $location){

  var switchToSignedin = function(){
    $rootScope.signedin = true;
    $location.path("/posts");
  };

  var switchToSignedout = function(){
    $rootScope.signedin = false;
    $location.path("/signin");
  };

  $rootScope.$on('event:authentication:signin:succeeded', function(){
    switchToSignedin();
  });

  $rootScope.$on('event:authentication:signin:failed', function(){
    switchToSignedout();
  });

  $rootScope.$on('event:authentication:signout:succeeded', function(){
    switchToSignedout();
  });

  $rootScope.$on('event:unauthorized', function(){
    switchToSignedout();
  });

}];
