module.exports = [
    '$scope',
    'Authentication',
    'Session',
function(
    $scope, Authentication, Session
) {
    $scope.mainMenu = false;

    $scope.$watch(function(){
        return Session.getSessionData();
    }, function(newValue/*, oldValue*/) {
        $scope.userName = newValue.userName;
        $scope.email = newValue.email;
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
