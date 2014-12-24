require('../common/helpers/gravatar-helper-module.js');
require('../common/services/endpoints/user-endpoint-module.js');

angular.module('users', [
    'common.services.endpoints.userEndpoint',
    'gravatarHelper'
])
.controller('userManager', require('./controllers/user-manager-controller.js'))
.config(require('./user-routes.js'));
