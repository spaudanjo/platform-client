module.exports = ['$scope', 'Authentication', function($scope, Authentication) {

  $scope.username = "demo";
  $scope.password = "testing";

  $scope.signinSubmit = function(){
    $scope.username = "";
    $scope.password = "";
    Authentication.signin($scope.username, $scope.password);
  };
}];
