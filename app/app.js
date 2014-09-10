require('angular/angular');
require('angular-route/angular-route');
require('angular-resource/angular-resource');
require('./modules/ui-tabs');
require('angular-ui-bootstrap/src/dropdown/dropdown');

var backendUrl = 'http://localhost:8000';

angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.dropdown', 'ui.tabs'])
  .constant('BACKEND_URL', backendUrl)
  .constant('API_URL', backendUrl + '/api/v2')
  .directive('postPreview', require('./directives/post-preview.js'))
  .directive('signinSignoutButton', require('./directives/signin-signout-button.js'))
  .service('Authentication', require('./services/authentication.js'))
  .service('PostData', require('./services/data/post.js'))
  .controller('navigation', require('./controllers/navigation.js'))
  .config(require('./interceptors/authentication.js'))
  .config(require('./routes'))
  .run(require('./global-event-handlers.js'));
