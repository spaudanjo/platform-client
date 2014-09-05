module.exports = ['$scope', '$http', function($scope, $http) {

  $scope.username = "demo";
  $scope.password = "testing";

  $scope.signinSubmit = function(){
    var payload = {
      username: $scope.username,
      password: $scope.password,
      grant_type: 'password',
      client_id: 'test_id',
      client_secret: 'test_secret'
    };
    $http.post("http://localhost:8000/oauth/access_token", payload)
    .success(function(data){
      localStorage.setItem('access_token', data.access_token);
      $rootScope.$broadcast('event:authenticated');
    });

  };
}];
