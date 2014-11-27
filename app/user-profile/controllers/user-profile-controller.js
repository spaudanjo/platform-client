module.exports = ['$scope', 'UserProfileEndpoint', 'Spinner', function($scope, UserProfileEndpoint, Spinner) {

    $scope.$watch(function(){
        return UserProfileEndpoint.getUserProfile();
    },function(newValue, oldValue) {
		$scope.user_profile_data = newValue;
    }, true);

    $scope.save_user_profile = function(){
        Spinner.startSpinner();
        UserProfileEndpoint.updateUserProfile($scope.user_profile_data_for_edit).then(
            function(){Spinner.stopSpinner();},
            function(){Spinner.stopSpinner();}
        );
    };

    $scope.on_user_profile_edit_form_show = function(){
        $scope.user_profile_data_for_edit = angular.copy($scope.user_profile_data);
    };

    UserProfileEndpoint.fetchUserProfile();

}];
