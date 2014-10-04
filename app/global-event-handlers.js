module.exports = ['$rootScope', '$state', 'Authentication', function($rootScope, $state, Authentication){

    $rootScope.signedin = Authentication.getSigninStatus();

    var switchToSignedin = function(){
        $rootScope.signedin = true;
        $state.go('home');
    };

    var switchToSignedoutAndShowSigninPage = function(){
        $rootScope.signedin = false;
        $state.go('signin');
    };

    $rootScope.$on('event:authentication:signin:succeeded', function(){
        switchToSignedin();
    });

    $rootScope.$on('event:authentication:signin:failed', function(){
        switchToSignedoutAndShowSigninPage();
    });

    $rootScope.$on('event:authentication:signout:succeeded', function(){
        $rootScope.signedin = false;
        $state.go('home')
    });

    $rootScope.$on('event:unauthorized', function(){
        switchToSignedoutAndShowSigninPage();
    });

}];
