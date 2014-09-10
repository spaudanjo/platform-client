require('angular/angular');
require('angular-route/angular-route');
require('angular-resource/angular-resource');
require('./modules/ui-tabs');
require('angular-ui-bootstrap/src/dropdown/dropdown');

angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.dropdown', 'ui.tabs'])
  .constant('API_URL', 'http://localhost:8000')
  .directive('postPreview', require('./directives/post-preview.js'))
  .directive('signinSignoutButton', require('./directives/signin-signout-button.js'))
  .service('Authentication', require('./services/authentication.js'))
  .service('PostData', require('./services/data/post.js'))
  .controller('navigation', require('./controllers/navigation.js'))
  .config(require('./interceptors/authentication.js'))
  .config(require('./routes'))
  .run(require('./global-event-handlers.js'));
