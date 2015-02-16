module.exports = [
    '$resource',
    '$rootScope',
    'Util',
function(
    $resource,
    $rootScope,
    Util
) {

    var GeojsonEndpoint = $resource(Util.apiUrl('/posts/:id/geojson'), {
        id: '@id'
    }, {
        query: {
            method: 'GET',
            isArray: false,
            transformResponse: function(data /*, header*/) {
                return angular.fromJson(data);
            }
        }
    });

    return GeojsonEndpoint;

}];
