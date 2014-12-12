module.exports = ['$scope', '$translate', 'UserProfileEndpoint', 'Notify', function($scope, $translate, UserProfileEndpoint, Notify) {
    $translate('user_profile.title').then(function(title){
        $scope.title = title;
    });

    $scope.$watch(function(){
        return UserProfileEndpoint.getUserProfile();
    }, function(newValue/*, oldValue*/) {
		$scope.user_profile_data = newValue;
    }, true);

    $scope.save_user_profile = function(){
        var promise = UserProfileEndpoint.updateUserProfile($scope.user_profile_data_for_edit).then(
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

    $scope.on_user_profile_edit_form_show = function(){
        $scope.user_profile_data_for_edit = angular.copy($scope.user_profile_data);
    };

    UserProfileEndpoint.fetchUserProfile();

}];
