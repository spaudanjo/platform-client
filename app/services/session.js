module.exports = [
function() {

    var userId = null;

    var that = this;
    return {

        setUserId: function(userId)
        {
            that.userId = userId;
        },

        getUserId: function(){
            return that.userId;
        }
    };

}];
