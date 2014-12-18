module.exports = ['$scope', '$translate', 'UserProfileEndpoint', 'Notify', function($scope, $translate, UserProfileEndpoint, Notify) {
    $translate('user_profile.title').then(function(title){
        $scope.title = title;
    });

    $scope.$watch(function(){
        return UserProfileEndpoint.getUserProfile();
    }, function(newValue/*, oldValue*/) {
		$scope.userProfileData = newValue;
		$scope.userProfileDataForEdit = newValue;
    }, true);

    $scope.saveUserProfile = function(){
        var promise = UserProfileEndpoint.updateUserProfile($scope.userProfileDataForEdit).then(
            function(){
            },
            function(errorInfo){
                if(errorInfo.errors)
                {
                    Notify.showAlerts(errorInfo.errors);
                }
            }
        );

        return promise;
    };

    $scope.onUserProfileEditFormShow = function(){
        $scope.userProfileDataForEdit = angular.copy($scope.userProfileData);
    };

    UserProfileEndpoint.fetchUserProfile();

}];
