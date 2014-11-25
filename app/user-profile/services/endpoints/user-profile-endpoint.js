module.exports = [
    '$resource',
    'Util',
    '_',
function(
    $resource,
    Util,
    _
) {

    var accessToken = localStorage.getItem('access_token');
    var UserProfileEndpoint = $resource(Util.url('/'),
    {
        get: {
            method: 'GET',
            headers:{'Authorization': 'Bearer ' + accessToken}
        },
        update: {
            method: 'PUT'
        }
    });

    // $rootScope.$on('event:authentication:signout:succeeded', function(){
    //     UserProfileEndpoint.query();
    // });

    return UserProfileEndpoint;

}];
