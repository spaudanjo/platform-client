module.exports = [
    '$rootScope',
function(
    $rootScope
) {

    var showSingleAlert = function(alertMessage){
        // TODO: find a better solution for that
        // e.g. use some notification plugins
        // like https://github.com/cgross/angular-notify
        // or https://github.com/jirikavi/AngularJS-Toaster
        alert(alertMessage);
    };

    var showAlerts = function(alertMessages){
        alertMessages.map(showSingleAlert);
    };

    return {
        showSingleAlert: showSingleAlert,
        showAlerts: showAlerts
    };

}];