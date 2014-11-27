angular.module('user-profile', [])

.service('UserProfileEndpoint', require('./services/endpoints/user-profile-endpoint.js'))

.controller('userProfile', require('./controllers/user-profile-controller.js'))
.config(require('./user-profile-routes.js'));
