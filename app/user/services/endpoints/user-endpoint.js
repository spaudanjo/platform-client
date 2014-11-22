module.exports = [
    '$resource',
    '$rootScope',
    'CONST',
function(
    $resource,
    $rootScope,
    CONST
) {

    var UserEndpoint = $resource(CONST.API_URL + '/users/:userId', {
        postId: '@userId'
    }, {
        query: {
            method: 'GET',
            isArray: true,
            transformResponse: function(data /*, header*/) {
                return angular.fromJson(data).results;
            }
        }
    });

    $rootScope.$on('event:authentication:signout:succeeded', function(){
        UserEndpoint.query();
    });

    return PostEndpoint;

}];
