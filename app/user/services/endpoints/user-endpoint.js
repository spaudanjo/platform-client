module.exports = [
    '$resource',
    '$rootScope',
    'CONST',
    'Util',
function(
    $resource,
    $rootScope,
    CONST,
    Util
) {

    var UserEndpoint = $resource(CONST.API_URL + '/users/:userId', {
        userId: '@userId'
    }, {
        get: {
            method: 'GET',
            isArray: false,
            transformResponse: function(data /*, header*/) {
                return Util.transformResponse(data);
            }
        }
    });

    $rootScope.$on('event:authentication:signout:succeeded', function(){
        UserEndpoint.query();
    });

    return UserEndpoint;

}];
