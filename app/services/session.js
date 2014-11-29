module.exports = [
    'localStorageService',
function(
    localStorageService
) {

    var sessionData = {
        userId: null,
        userName: null
    };

    var loadSessionData = function(){
        this.sessionData = localStorageService.get('sessionData');
    };

    var setSessionData = function(sessionData){
        this.sessionData = sessionData;
        localStorageService.set('sessionData', sessionData);
    };

    var getSessionData = function(){
        return this.sessionData;
    };

    return {
        loadSessionData: loadSessionData,
        setSessionData: setSessionData,
        getSessionData: getSessionData,
    };
}];
