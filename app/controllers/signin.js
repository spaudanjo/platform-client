module.exports = ['$scope', 'Authentication', function($scope, Authentication) {

  $scope.username = "demo";
  $scope.password = "testing";

  $scope.signinSubmit = function(){
    Authentication.signin($scope.username, $scope.password);
  };
}];
