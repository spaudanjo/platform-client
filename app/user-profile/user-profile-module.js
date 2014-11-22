require('angular-xeditable');
require('../common/helpers/gravatar-helper-module.js');

angular.module('user-profile', ['xeditable', 'gravatarHelper'])

.service('UserProfileEndpoint', require('./services/endpoints/user-profile-endpoint.js'))

.controller('userProfile', require('./controllers/user-profile-controller.js'))
.config(require('./user-profile-routes.js'));
