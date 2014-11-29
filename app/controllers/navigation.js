module.exports = ['$scope', 'Authentication', 'Session', function($scope, Authentication, Session) {
    $scope.mainMenu = false;

    $scope.$watch(function(){
        return Session.getSessionDataEntry('userName');
    }, function(newValue, oldValue) {
        $scope.user_name = Session.getSessionDataEntry('userName');
    }, true);

    $scope.toggle = function(param) {
        $scope[param] = $scope[param] === false ? true : false;
    };

    $scope.signoutClick = function(){
        event.preventDefault();
        event.stopPropagation();
        Authentication.signout();
    };

}];
