require('../common/helpers/gravatar-helper-module.js');

angular.module('users', ['gravatarHelper'])

.service('UserEndpoint', require('./services/endpoints/user-endpoint.js'))
.service('UserEntity', require('./services/entities/user-entity.js'))

.controller('userManager', require('./controllers/user-manager-controller.js'))
.config(require('./user-routes.js'));
