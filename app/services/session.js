module.exports = [
function() {

    var user = {
        id: null,
        username: null
    };

    var that = this;
    return {

        setUser: function(user)
        {
            that.user = user;
        },

        getUser: function(){
            return that.user;
        }
    };

}];
