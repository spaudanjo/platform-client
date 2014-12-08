module.exports = ['$rootScope', '$location', 'Authentication', 'Spinner', function($rootScope, $location, Authentication, Spinner){

    $rootScope.signedin = Authentication.getSigninStatus();

    var switchToSignedin = function(){
        $rootScope.signedin = true;
        $location.path('/');
    };

    var switchToSignedoutAndShowSigninPage = function(){
        $rootScope.signedin = false;
        $location.path('/signin');
    };

    $rootScope.$on('event:authentication:signin:succeeded', function(){
        switchToSignedin();
    });

    $rootScope.$on('event:authentication:signin:failed', function(){
        switchToSignedoutAndShowSigninPage();
    });

    $rootScope.$on('event:authentication:signout:succeeded', function(){
        $rootScope.signedin = false;
        $location.path('/');
    });

    $rootScope.$on('event:unauthorized', function(){
        // stop possibily still running spinner of original http request
        Spinner.stopSpinner();
        switchToSignedoutAndShowSigninPage();
    });

}];
