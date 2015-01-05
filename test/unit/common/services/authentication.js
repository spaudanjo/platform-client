var rootPath = '../../../../';

describe('Authentication', function(){

    var $rootScope,
        $httpBackend,
        BACKEND_URL,
        mockedSessionData,
        Session,
        emptySessionData,
        signinPromise,
        mockedOauthTokenResponse;

    beforeEach(function(){

        emptySessionData = {
            userId: undefined,
            userName: undefined,
            realName: undefined,
            email: undefined,
            accessToken: undefined
        };

        var testApp = angular.module('testApp');

        mockedSessionData = {};
        testApp.service('Session', function(){

            return {
                clearSessionData: function(){
                    mockedSessionData = {};
                },
                setSessionDataEntries: function(entries){
                    mockedSessionData = angular.extend({}, mockedSessionData, entries);
                },
                getSessionDataEntry: function(key){
                    return mockedSessionData[key];
                },
                setSessionDataEntry: function(key, value){
                    mockedSessionData[key] = value;
                }
            };
        })
        .service('Authentication', require(rootPath+'app/common/services/authentication.js'));

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

        angular.mock.module('testApp');

    });

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _CONST_){
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        BACKEND_URL = _CONST_.BACKEND_URL;
    }));

    describe('signin', function(){
        beforeEach(function(){
            mockedOauthTokenResponse = {
                "access_token":"foobarfoobarfoobarfoobarfoobarfoobar",
                "token_type":"Bearer",
                "expires":9999999999,
                "expires_in":3600,
                "refresh_token":"foobarfoobarfoobarfoobarfoobarfoobar",
                "refresh_token_expires_in":604800
            };

            $httpBackend.whenGET(BACKEND_URL+'/oauth/token').respond(mockedOauthTokenResponse);
            signinPromise = Authentication.signin('fooUser', 'barPassword');
        });

        it('should add the accessToken and user info data to the Session', function(){});

        it('should add the accessToken to the Session', function(){});

        it('should add the accessToken to the Session', function(){});














        describe('without values stored in localStorage', function(){

            beforeEach(inject(function(_Session_){
                Session = _Session_;
            }));

            beforeEach(function(){
                returnedSessionData = Session.getSessionData();
            });

            it('returns the empty session data', function(){
                expect(returnedSessionData).toEqual(emptySessionData);
            });
        });

        describe('with values stored in localStorage', function(){

            beforeEach(function(){
                mockedSessionData = {
                    userId: '1',
                    accessToken: 'secrettoken'
                };
            });

            beforeEach(inject(function(_Session_){
                Session = _Session_;
            }));

            beforeEach(function(){
                returnedSessionData = Session.getSessionData();
            });

            it('returns the session data with the stored values from localStorage',
            function(){
                var expectedSessionData = {
                    userId: '1',
                    userName: undefined,
                    realName: undefined,
                    email: undefined,
                    accessToken: 'secrettoken'
                };

                expect(returnedSessionData).toEqual(expectedSessionData);
            });
        });
    });


    describe('setSessionDataEntry', function(){

        describe('without values stored in localStorage', function(){

            beforeEach(inject(function(_Session_){
                Session = _Session_;
            }));

            beforeEach(function(){
                Session.setSessionDataEntry('userId', '1');
            });

            it('has the keys and values stored in the session', function(){
                var expectedSessionDataEntries = angular.extend({}, emptySessionData, {userId: '1'});
                expect(Session.getSessionData()).toEqual(expectedSessionDataEntries);
            });

            it('has the key and value stored in the local storage', function(){
                expect(mockedSessionData.userId).toEqual('1');
            });
        });
    });


    describe('setSessionDataEntries', function(){
        var sessionDataEntriesToSet;

        describe('without values stored in localStorage', function(){

            beforeEach(inject(function(_Session_){
                Session = _Session_;
            }));

            beforeEach(function(){
                sessionDataEntriesToSet = {
                    userId: '1',
                    userName: 'mike'
                };
                Session.setSessionDataEntries(sessionDataEntriesToSet);
            });

            it('has the keys and values stored in the session', function(){
                var expectedSessionDataEntries = angular.extend({}, emptySessionData, sessionDataEntriesToSet);
                expect(Session.getSessionData()).toEqual(expectedSessionDataEntries);
            });

            it('has the keys and values stored in the local storage', function(){
                expect(mockedSessionData.userId).toEqual('1');
                expect(mockedSessionData.userName).toEqual('mike');
            });
        });
    });

    describe('getSessionDataEntry and getSessionDataEntries', function(){

        describe('with some values stored in localStorage before instantiating (injecting) the Session service', function(){

            beforeEach(function(){
                mockedSessionData.userId = '1';
                mockedSessionData.userName = 'mike';
            });

            beforeEach(inject(function(_Session_){
                Session = _Session_;
            }));

            describe('getSessionDataEntry', function(){
                it('returns the correct values', function(){
                    expect(Session.getSessionDataEntry('userId')).toEqual('1');
                    expect(Session.getSessionDataEntry('userName')).toEqual('mike');
                });
            });

            describe('getSessionDataEntries', function(){
                it('returns the correct values', function(){
                    var expectedSessionDataEntries = angular.extend({}, emptySessionData, {
                        'userId': '1',
                        'userName': 'mike'
                    });
                    expect(Session.getSessionData()).toEqual(expectedSessionDataEntries);
                });
            });
        });
    });

    describe('clearSessionData', function(){

        describe('with some values stored in localStorage before instantiating (injecting) the Session service', function(){

            beforeEach(function(){
                mockedSessionData.userId = '1';
                mockedSessionData.userName = 'mike';
            });

            beforeEach(inject(function(_Session_){
                Session = _Session_;
            }));

            it('has the values loaded in session', function(){
                expect(Session.getSessionDataEntry('userId')).toEqual('1');
                expect(Session.getSessionDataEntry('userName')).toEqual('mike');
            });

            describe('calling clearSessionData', function(){

                beforeEach(function(){
                    Session.clearSessionData();
                });

                it('has the only the initial keys with undefined values stored in the session', function(){
                    expect(Session.getSessionData()).toEqual(emptySessionData);
                });

                it('doesn\'t have any keys and values stored in the local storage', function(){
                    expect(mockedSessionData).toEqual({});
                });
            });
        });
    });
});
