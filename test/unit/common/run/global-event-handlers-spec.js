var rootPath = '../../../../';

describe('global event handlers run config', function(){

    var mockedSessionData,
        mockeAuthenticationData,
        $rootScope,
        $location;

    beforeEach(function(){

        mockedSessionData = {};
        mockedAuthenticationData = {
            signinStatus: false
        };

        var testApp = angular.module('testApp'),
        mockedSessionService =
        {
            getSessionData: function(){
                return mockedSessionData;
            }
        },
        mockeAuthenticationService =
        {
            getSigninStatus: function(){
                return mockedAuthenticationData.signinStatus;
            }
        };

        testApp.service('Session', function(){
            return mockedSessionService;
        })
        .service('Authentication', function(){
            return mockedAuthenticationService;
        })
        .run(require(rootPath+'app/common/run/global-event-handlers.js'))

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

        angular.mock.module('testApp');

    });

    beforeEach(inject(function(_$rootScope_, _$location, _Authentication_, _Session_){
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        BACKEND_URL = _CONST_.BACKEND_URL;
        Authentication = _Authentication_;
    }));

    describe('rootScope', function(){
        describe('global events', function(){

            describe('authentication', function(){

                beforeEach(inject(function(_Session_){
                    Session = _Session_;
                }));

                beforeEach(function(){
                    returnedSessionData = Session.getSessionData();
                });

                describe('signin', function(){
                    describe('succeeded', function(){
                        it('should set userName and email to $rootScope', function(){});
                        it('should set $rootScope.signedIn to true', function(){});
                        it('should change the path to "/"', function(){});
                    });
                    describe('failed', function(){
                    });
                });

                describe('signout', function(){
                    describe('succeeded', function(){
                    });
                });
            });

            describe('unauthorized', function(){
            });
        });

        describe('initial setting of session data', function(){
            describe('signed in', function(){});
            describe('not signed in', function(){});
        });
    });
});
