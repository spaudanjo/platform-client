require('angular-mocks/angular-mocks');
angular.module('e2e-mocks', ['ngMockE2E'])
    .run(['$httpBackend', 'CONST', 'URI', '_', function($httpBackend, CONST, URI, _) {

    var resourceToJsonMapping = {
        'posts': require('../mocked_backend/api/v2/posts.json'),
        'forms': require('../mocked_backend/api/v2/forms.json'),
        'tags': require('../mocked_backend/api/v2/tags.json'),
        'config/features': require('../mocked_backend/api/v2/config/features.json'),
        'config/map': require('../mocked_backend/api/v2/config/map.json'),
        'users': require('../mocked_backend/api/v2/users.json'),
        'users/me': require('../mocked_backend/api/v2/users/me.json'),
        'config/site': require('../mocked_backend/api/v2/config/site.json'),
    };

    var getResultForResources = function(resourceName, offset, limit){
        var resource = _.clone(resourceToJsonMapping[resourceName]);
        if(resource.results && !isNaN(offset) && !isNaN(limit))
        {
            resource.results = resource.results.slice(offset, offset+limit);
        }
        return [200, resource, {}];
    };

    var getSingleResourceForResourceId = function(resourceName, resourceId){
        var resources = _.clone(resourceToJsonMapping[resourceName]);
        var singleResource = _.find(resources.results, function(resource){return resource.id === resourceId})
        return [200, singleResource, {}];
    };

   // note: the nested resources must be part of the top resource, 
   // directly inline in the same json file
    var getNestedResourcesForSingleResourceId = function(resourceName, resourceId, nestedResourcesName){
        var resources = _.clone(resourceToJsonMapping[resourceName]);
        var singleResource = _.find(resources.results, function(resource){return resource.id === resourceId})
        var nestedResource = singleResource[nestedResourcesName];
        return [200, nestedResource, {}];
    };

    $httpBackend.whenPOST(CONST.BACKEND_URL + '/oauth/token').respond(function(method, url, data) {
        var reqPayload = JSON.parse(data);
        if(reqPayload.username === 'admin' && reqPayload.password === 'admin')
        {
            return [200, {
                'access_token':'UmexrkSXVsHeEzGH1TMjYjvX344iB94XZK34nIVw',
                'token_type':'Bearer',
                'expires':2414253574,
                'expires_in':3600,
                'refresh_token':'o1sw8yr6b8BuH00RlIEeLv3v75bzZWZfymquNlKs',
                'refresh_token_expires_in':604800
            }, {}];
        }
        else
        {
            return [400, {
                'error':'invalid_request',
                'error_description':'The user credentials were incorrect.'
            }, {}];
        }
    });


    var matcher = new RegExp(CONST.API_URL + '/.*');

    $httpBackend.whenGET(matcher).respond(function(method, url/*, data*/) {
        var uri = URI(url),
            queryParams = uri.query(true),
            offset = parseInt(queryParams.offset),
            limit = parseInt(queryParams.limit),
            resourceName = uri.path().split('api/v2/')[1];

        var matcher = new RegExp('([a-zA-Z]+)(?:\/([0-9]*))?(?:\/(.*))?');
        var matches = resourceName.match(matcher);
        matches = matches.splice(1);
        matches = matches.filter(function(n){ return n != undefined });

        if(matches.length === 1)
        {
            return getResultForResources(matches[0], offset, limit);
        }
        else if(matches.length === 2)
        {
            return getSingleResourceForResourceId(matches[0], matches[1]);
        }
        else if(matches.length === 3)
        {
            return getNestedResourcesForSingleResourceId(matches[0], matches[1], matches[2]);
        }
    });


    $httpBackend.whenPOST(matcher).respond(function(method, url/*, data*/) {
        var uri = URI(url),
            queryParams = uri.query(true),
            offset = parseInt(queryParams.offset),
            limit = parseInt(queryParams.limit),
            resourceName = uri.path().split('api/v2/')[1];

        // check if request is for an specific single tag resource
        if(resourceName.indexOf("tags/") >= 0)
        {
            var tagId = resourceName.split("tags/")[1];
            return getSingleResourceForResourceId('tags', tagId);
        }

        // check if request is for an specific single post resource
        if(resourceName.indexOf("posts/") >= 0)
        {
            var postId = resourceName.split("posts/")[1];
            return getSingleResourceForResourceId('posts', postId);
        }

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
