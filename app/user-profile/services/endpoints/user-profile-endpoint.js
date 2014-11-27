module.exports = [
    '$resource',
    'Util',
    '_',
function(
    $resource,
    Util,
    _
) {

    var userProfile = {
        id: null,
        username: null
    };

    var that = this;

    var accessToken = localStorage.getItem('access_token');
    var userId = localStorage.getItem('user_id');

    var UserProfileResource = $resource(Util.apiUrl('/users/:userId'),
    {
        userId: '@id'
    },
    {
        get: {
            method: 'GET',
        },
        save: {
            method: 'PUT'
        }
    });

    return {
        getUserProfile: function(){
            return that.userProfile;
        },
        fetchUserProfile: function(){
            UserProfileResource.get({userId: userId}).$promise.then(function(userProfileData){
                that.userProfile = userProfileData;
            });
        },
        updateUserProfile: function(userProfileData){
            var userProfileResource = new UserProfileResource(userProfileData);
            userProfileResource.$save().then(function(){
                that.userProfile = userProfileResource;
            },function(response){
                alert("Error in endpoint while saving user profile");
            });
            // resource.update(userProfileData);
            // this.fetchUserProfile();
        }
    };

    // $rootScope.$on('event:authentication:signout:succeeded', function(){
    //     UserProfileEndpoint.query();
    // });

}];
