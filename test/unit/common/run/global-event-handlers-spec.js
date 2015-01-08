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

        var testApp = angular.module('testApp', []),
        mockedSessionService =
        {
            getSessionData: function(){
                return mockedSessionData;
            }
        },
        mockedAuthenticationService =
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

    });


    describe('rootScope', function(){
        describe('global events', function(){

            beforeEach(function(){
                angular.mock.module('testApp');
            });

            beforeEach(inject(function(_$rootScope_, _$location_){
                $rootScope = _$rootScope_;
                $location = _$location_;
            }));

            describe('authentication', function(){

                describe('signin', function(){
                    describe('succeeded', function(){
                        beforeEach(function(){
                            mockedSessionData = {
                                userName: 'max',
                                email: 'max@example.com'
                            };

                            $rootScope.$broadcast('event:authentication:signin:succeeded');
                        });

                        it('should set userName and email to $rootScope', function(){
                            expect($rootScope.userName).toEqual(mockedSessionData.userName);
                            expect($rootScope.email).toEqual(mockedSessionData.email);
                        });

                        it('should set $rootScope.signedin to true', function(){
                            expect($rootScope.signedin).toBe(true);
                        });

                        it('should change the path to "/"', function(){
                            expect($location.path()).toEqual('/');
                        });
                    });

                    describe('failed', function(){

                        beforeEach(function(){
                            $rootScope.$broadcast('event:authentication:signin:failed');
                        });

                        it('should set userName and email to null on $rootScope', function(){
                            expect($rootScope.userName).toEqual(null);
                            expect($rootScope.email).toEqual(null);
                        });

                        it('should set $rootScope.signedin to false', function(){
                            expect($rootScope.signedin).toBe(false);
                        });

                        it('should change the path to "/signin"', function(){
                            expect($location.path()).toEqual('/signin');
                        });
                    });
                });

                describe('signout', function(){
                    describe('succeeded', function(){

                        beforeEach(function(){
                            $rootScope.$broadcast('event:authentication:signout:succeeded');
                        });

                        it('should set userName and email to null on $rootScope', function(){
                            expect($rootScope.userName).toEqual(null);
                            expect($rootScope.email).toEqual(null);
                        });

                        it('should set $rootScope.signedin to false', function(){
                            expect($rootScope.signedin).toBe(false);
                        });

                        it('should change the path to "/"', function(){
                            expect($location.path()).toEqual('/');
                        });
                    });
                });
            });

            describe('unauthorized', function(){
                beforeEach(function(){
                    $rootScope.$broadcast('event:unauthorized');
                });

                it('should set userName and email to null on $rootScope', function(){
                    expect($rootScope.userName).toEqual(null);
                    expect($rootScope.email).toEqual(null);
                });

                it('should set $rootScope.signedin to false', function(){
                    expect($rootScope.signedin).toBe(false);
                });

                it('should change the path to "/signin"', function(){
                    expect($location.path()).toEqual('/signin');
                });
            });
        });
    });

    describe('initial setting of session data', function(){

        describe('signed in', function(){

            beforeEach(function(){
                mockedAuthenticationData.signinStatus = true;
            });

            // beforeEach(function(){
            //     angular.mock.module('testApp');
            // });
            //
            // beforeEach(inject(function(_$rootScope_, _$location_){
            //     $rootScope = _$rootScope_;
            //     $location = _$location_;
            // }));
            //

            it('should set $rootScope.signedin to true', function(){
                expect($rootScope.signedin).toBe(true);
            });

        });

        describe('not signed in', function(){

            it('should set $rootScope.signedin to false', function(){
                expect($rootScope.signedin).toBe(false);
            });

        });
    });
});
