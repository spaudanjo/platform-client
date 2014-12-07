module.exports = [
    '$resource',
    'Util',
    'Session',
    '$q',
    '_',
function(
    $resource,
    Util,
    Session,
    $q,
    _
) {

    var userProfile = {
        id: null,
        username: null
    };

    var that = this;

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
            var userId = Session.getSessionDataEntry('userId');
            UserProfileResource.get({userId: userId}).$promise.then(function(userProfileData){
                that.userProfile = userProfileData;
            });
        },
        updateUserProfile: function(userProfileData){
            var deferred = $q.defer();

            var userProfileResource = new UserProfileResource(userProfileData);
            userProfileResource.$save().then(
                function(){
                    that.userProfile = userProfileResource;
                    deferred.resolve();
                },
                function(response){
                    var errorInfo = { httpStatus: response.status };

                    if(response.status === 400)
                    {
                        var errors = response.data && response.data.errors;
                        if(errors)
                        {
                            errorInfo.errors = [];
                            errors.forEach(function(error){
                                errorInfo.errors.push(error.message);
                            });
                        }
                    }
                    deferred.reject(errorInfo);
                }
            );

            return deferred.promise;
        }
    };

}];
