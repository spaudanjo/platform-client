module.exports = ['$scope', 'Authentication', function($scope, Authentication) {
    $scope.title = 'Posts';
    var onSigninStatusChanged = function(){
      debugger;
    };
    Authentication.registerObserverCallback(onSigninStatusChanged);
}];
