module.exports = ['$location', 'Authentication', function($location, Authentication){
  var onSigninStatusChanged = function(){
    $location.path("/posts");
  };
  Authentication.registerObserverCallback(onSigninStatusChanged);
}];
