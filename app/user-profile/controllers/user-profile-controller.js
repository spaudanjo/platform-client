module.exports = ['$scope', 'UserProfileEndpoint', function($scope, UserProfileEndpoint) {

    $scope.$watch(function(){
        return UserProfileEndpoint.getUserProfile();
    },function(newValue, oldValue) {
		$scope.user_profile_data = newValue;
    }, true);

    $scope.save_user_profile = function(){
        UserProfileEndpoint.updateUserProfile($scope.user_profile_data_for_edit);
    };

    $scope.on_user_profile_edit_form_show = function(){
        $scope.user_profile_data_for_edit = angular.copy($scope.user_profile_data);
    };

    UserProfileEndpoint.fetchUserProfile();

}];
