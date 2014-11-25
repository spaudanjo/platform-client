module.exports = ['$scope', '$routeParams', 'UserEndpoint', function($scope, $routeParams, UserEndpoint) {
    $scope.title = 'User profile for user id ' + $routeParams.id;

	UserEndpoint.get({userId: $routeParams.id}).$promise.then(function(userData){
		$scope.user_data = userData;
	});

}];
