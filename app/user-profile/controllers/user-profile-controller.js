module.exports = ['$scope', '$translate', 'UserEndpoint', 'Notify', function($scope, $translate, UserEndpoint, Notify) {
    $translate('user_profile.title').then(function(title){
        $scope.title = title;
    });

    $scope.saveUserProfile = function(){
        var promise = UserEndpoint.update({id: 'me'}, $scope.userProfileDataForEdit).$promise;

        promise.then(
            function(userData){
                $scope.userProfileData = $scope.userProfileDataForEdit = userData;
            },
            function(errorResponse){
                if(errorResponse.status === 400)
                {
                    var errors = errorResponse.data && errorResponse.data.errors;
                    if(errors)
                    {
                        var errorMessages = errors.map(function(error){
                            return error.message
                        });
                        Notify.showAlerts(errorMessages);
                    }
                }
            }
        );

        return promise;
    };

    $scope.onUserProfileEditFormShow = function(){
        $scope.userProfileDataForEdit = angular.copy($scope.userProfileData);
    };

    UserEndpoint.get({id: 'me'}).$promise.then(function(userData){
        $scope.userProfileData = $scope.userProfileDataForEdit = userData;
    });

}];
