require('angular/angular');
require('angular-route/angular-route');
require('angular-resource/angular-resource');
require('./modules/ui-tabs');
require('angular-ui-bootstrap/src/dropdown/dropdown');

var app = angular.module('app', ['ngRoute', 'ngResource', 'ui.bootstrap.dropdown', 'ui.tabs'])
    .directive('postPreview', require('./directives/post-preview.js'))
    .service('Authentication', require('./services/authentication.js'))
    .service('PostData', require('./services/data/post.js'))
    .controller('navigation', require('./controllers/navigation.js'))
    .config(require('./interceptors/authentication.js'))
    .config(require('./routes'))
    .run(require('./global-event-handlers.js'));
