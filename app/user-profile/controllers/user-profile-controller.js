module.exports = ['$scope', 'UserProfileEndpoint', function($scope, UserProfileEndpoint) {
    $scope.title = 'User profile for user id ';

	var updateUserProfileScope = function(userProfileData){
		$scope.user_profile_data = userProfileData;
        $scope.user_profile_data_for_edit = angular.copy(userProfileData);
	};

    $scope.$watch(function(){
        return UserProfileEndpoint.getUserProfile();
    },function(newValue, oldValue) {
        updateUserProfileScope(newValue);
        // if(newValue != oldValue) {
        //     $scope.dataHasChanged= angular.equals($scope.project,$scope.original);
        // }
    }, true);

    UserProfileEndpoint.fetchUserProfile();

    $scope.save_user_profile = function(){
        UserProfileEndpoint.updateUserProfile($scope.user_profile_data_for_edit);
    };

}];
