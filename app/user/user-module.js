require('../common/root-scope-helpers/gravatar-helper-module.js');

angular.module('users', [
    'gravatarHelper'
])
.controller('userManager', require('./controllers/user-manager-controller.js'))
.config(require('./user-routes.js'));
