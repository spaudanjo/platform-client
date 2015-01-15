require('angular-mocks/angular-mocks');
angular.module('e2e-mocks', ['ngMockE2E'])
    .run(['$httpBackend', 'CONST', 'URI', '_', function($httpBackend, CONST, URI, _) {

    var resourceToJsonMapping = {
        'posts': require('../mocked_backend/api/v2/posts.json'),
        'config/features': require('../mocked_backend/api/v2/config/features.json'),
        'config/map': require('../mocked_backend/api/v2/config/map.json'),
        'users': require('../mocked_backend/api/v2/users.json'),
        'users/me': require('../mocked_backend/api/v2/users/me.json'),
        'config/site': require('../mocked_backend/api/v2/config/site.json'),
    };

    var getResultForResource = function(resourceName, offset, limit){
        var resource = _.clone(resourceToJsonMapping[resourceName]);
        if(resource.results)
        {
            resource.results = resource.results.slice(offset, offset+limit);
        }
        return [200, resource, {}];
    };

    var matcher = new RegExp(CONST.API_URL + '/.*');

    $httpBackend.whenGET(matcher).respond(function(method, url/*, data*/) {
        var uri = URI(url),
            queryParams = uri.query(true),
            offset = parseInt(queryParams.offset),
            limit = parseInt(queryParams.limit),
            resourceName = uri.path().split('api/v2/')[1];

        return getResultForResource(resourceName, offset, limit);
    });

    $httpBackend.whenPUT(matcher).respond(function(method, url, data){
        return [200, data, {}];
    });

    // pass through all template fetches
    // to the server which delivers the angular app
    $httpBackend.whenGET(/templates.*/).passThrough();
}]);

angular.module('app').requires.push('e2e-mocks');
