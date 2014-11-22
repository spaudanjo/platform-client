require('angular/angular');
require('angular-route/angular-route');
require('leaflet/dist/leaflet');
require('angular-leaflet-directive/dist/angular-leaflet-directive');
require('angular-resource/angular-resource');
require('angular-translate');
require('./modules/ui-tabs');
require('angular-ui-bootstrap/src/dropdown/dropdown');
require('angular-ui-bootstrap/src/collapse/collapse');
require('angular-ui-bootstrap/src/transition/transition');
require('angular-ui-bootstrap/src/accordion/accordion');
require('angular-mocks/angular-mocks');

require('./post/post-module.js');
require('./user/user-module.js');

// this 'environment variable' will be set within the gulpfile
var backendUrl = process.env.backend_url;

angular.module('app',
    [
        'ngRoute',
        'ngResource',
        'pascalprecht.translate',
        'ui.bootstrap.dropdown',
        'ui.bootstrap.collapse',
        'ui.bootstrap.accordion',
        'ui.bootstrap.transition',
        'ui.tabs',
        'leaflet-directive',
        'posts',
        'user'
    ])

    .constant('CONST', {
        BACKEND_URL         : backendUrl,
        API_URL             : backendUrl + '/api/v2',
        DEFAULT_LOCALE      : 'en_US',
        OAUTH_CLIENT_ID     : 'ushahidiui',
        OAUTH_CLIENT_SECRET : '35e7f0bca957836d05ca0492211b0ac707671261'
    })

    .directive('globalFilter', require('./directives/global-filter.js'))
    .directive('globalFilterMeta', require('./directives/global-filter-meta.js'))
    .directive('inFocus', require('./directives/focus.js'))

    .service('Authentication', require('./services/authentication.js'))
    .service('ConfigEndpoint', require('./services/endpoint/config.js'))
    .service('FormEndpoint', require('./services/endpoint/form.js'))
    .service('FormAttributeEndpoint', require('./services/endpoint/form-attributes.js'))
    .service('TagEndpoint', require('./services/endpoint/tag.js'))
    .service('Util', require('./services/util.js'))

    .controller('navigation', require('./controllers/navigation.js'))
    .controller('workspaceAccordion', require('./workspace'))
    .controller('userFilter', require('./controllers/users/filter.js'))
    .controller('adminMapSettings', require('./controllers/admin/map-settings.js'))
    .controller('filterGlobal', require('./controllers/global-filter.js'))

    .config(require('./interceptors/authentication.js'))
    .config(require('./routes'))
    .config(require('./modules/ui-accordion'))
    .config(require('./locale-config.js'))

    .run(require('./global-event-handlers.js'))
    .run(require('./global-scope-variables.js'))

    .factory('_', function() {
        return require('underscore/underscore');
    })

    ;
