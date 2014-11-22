angular.module('user', [])

.service('UserEndpoint', require('./services/endpoints/user-endpoint.js'))

.controller('userProfile', require('./controllers/user-profile-controller.js'))
.config(require('./user-routes.js'));
