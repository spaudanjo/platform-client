module.exports = ['$location', 'Authentication', function($location, Authentication){
  var onSigninStatusChanged = function(){
    Authentication.getSigninStatus() ? $location.path("/posts") : $location.path("/signin");
  };
  Authentication.registerObserverCallback(onSigninStatusChanged);
}];
