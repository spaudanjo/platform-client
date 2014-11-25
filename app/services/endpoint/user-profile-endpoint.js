module.exports = [
    '$resource',
    'Util',
    '_',
function(
    $resource,
    Util,
    _
) {

    var UserProfileEndpoint = $resource(Util.url('/user'), 
    {
        get: {
            method: 'GET'
        },
        update: {
            method: 'PUT'
        }
    });

    return UserProfileEndpoint;

}];
