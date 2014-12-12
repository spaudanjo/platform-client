angular.module('gravatarHelper', [])
.factory('gravatar', function() {
    return require('gravatar');
})
.run(['$rootScope', 'gravatar', function($rootScope, gravatar){
    $rootScope.getGravatar = function(user) {
        return gravatar.url(user.email, {default: 'retro'});
    };
}]);
