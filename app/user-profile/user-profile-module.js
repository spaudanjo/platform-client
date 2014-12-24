require('angular-xeditable');
require('../common/helpers/gravatar-helper-module.js');
require('../common/services/endpoints/user-endpoint-module.js');

angular.module('user-profile', [
    'common.services.endpoints.userEndpoint',
    'xeditable',
    'gravatarHelper'
])

.controller('userProfile', require('./controllers/user-profile-controller.js'))
.config(require('./user-profile-routes.js'));
