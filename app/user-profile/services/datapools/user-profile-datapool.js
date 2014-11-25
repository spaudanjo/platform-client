module.exports = [
function() {

    var userProfile = {
        id: null,
        username: null
    };

    var that = this;
    return {

        setUserProfile: function(userProfile)
        {
            that.userProfile = userProfile;
        },

        getUserProfile: function(){
            return that.userProfile;
        }
    };

}];
