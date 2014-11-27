module.exports = ['$scope', 'UserProfileDatapool', 'UserProfileEndpoint', function($scope, UserProfileDatapool, UserProfileEndpoint) {
    $scope.title = 'User profile for user id ';

	UserProfileEndpoint.get().$promise.then(function(userProfileData){
		$scope.user_profile_data = userProfileData;
        $scope.user_profile_data_for_edit = angular.copy(userProfileData);
	});

}];
