var rootPath = '../../../../';

describe('global event handlers run config', function(){

    var mockedLocalStorageHash,
    Session,
    emptySessionData;

    beforeEach(function(){

        emptySessionData = {
            userId: undefined,
            userName: undefined,
            realName: undefined,
            email: undefined,
            accessToken: undefined
        };

        var testApp = angular.module('testApp');

        mockedLocalStorageHash = {};
        testApp.service('localStorageService', function(){
            return {
                get: function(key){
                    return mockedLocalStorageHash[key];
                },
                set: function(key, val){
                    mockedLocalStorageHash[key] = val;
                },
                remove: function(key){
                    delete mockedLocalStorageHash[key];
                },
                clear: function(){
                    mockedLocalStorageHash = {};
                }
            };
        })
        .run(require(rootPath+'app/common/run/global-event-handlers.js'))

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

    });

    beforeEach(angular.mock.module('testApp'));

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
                    });
                    describe('failed', function(){
                    });
                });

                describe('signout', function(){
                    describe('succeeded', function(){
                    });
                });

                it('returns the empty session data', function(){
                    expect(returnedSessionData).toEqual(emptySessionData);
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
