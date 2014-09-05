require('angular/angular');
require('angular-route/angular-route');
require('./modules/ui-tabs');
require('angular-ui-bootstrap/src/dropdown/dropdown');

var app = angular.module('app', ['ngRoute', 'ui.bootstrap.dropdown', 'ui.tabs'])
    .config(require('./routes'))
    .service('Authentication', require('./services/authentication.js'))
    .run(require('./global-event-handlers.js'))
    .controller('navigation', require('./controllers/navigation.js'));
