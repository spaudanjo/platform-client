module.exports = [
    'localStorageService',
function(
    localStorageService
) {

    this.clearedSessionData = {
        userId: null,
        userName: null,
        accessToken: null
    };

    this.sessionData = angular.copy(this.clearedSessionData);

    var that = this;
    var loadSessionData = function(){
        Object.keys(that.sessionData).map(function(key){
            that.sessionData[key] = localStorageService.get(key);
        });
    };

    var setSessionDataEntry = function(key, value){
        that.sessionData[key] = value;
        localStorageService.set(key, value);
    };

    var getSessionDataEntry = function(key){
        return that.sessionData[key];
    };

    var getSessionData = function(){
        return that.sessionData;
    };

    var clearSessionData = function(){
        Object.keys(that.sessionData).map(function(key){
            localStorageService.remove(key);
        });
        that.sessionData = angular.copy(that.clearedSessionData);
    };

    // load already saved session data from earlierer session
    // from local storage when session service is intialized loadSessionData();

    loadSessionData();

    return {
        setSessionDataEntry: setSessionDataEntry,
        getSessionDataEntry: getSessionDataEntry,
        getSessionData: getSessionData,
        clearSessionData: clearSessionData
    };
}];
