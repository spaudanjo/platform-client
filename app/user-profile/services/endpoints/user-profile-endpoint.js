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
    var userId = localStorage.getItem('user_id');
    var UserProfileEndpoint = $resource(Util.apiUrl('/users/'+userId),
    {
        get: {
            method: 'GET',
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
