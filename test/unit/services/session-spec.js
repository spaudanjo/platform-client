var rootPath = '../../../';

describe('Session', function(){

    var mockedLocalStorageHash,
    Session,
    emptySessionData,
    // undefined session data is the session hash after trying to load the keys
    // from the localStorage when the entries are not stored there yet.
    // So it's basically the emptySessionData,
    // but with 'undefined' instead of 'null' values for the keys
    undefinedSessionData;

    beforeEach(function(){

        emptySessionData = {
            userId: null,
            userName: null,
            realName: null,
            email: null,
            accessToken: null
        };

        undefinedSessionData = {};
        Object.keys(emptySessionData).forEach(function(key){
            undefinedSessionData[key] = undefined;
        });

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
                clear: function(){
                    mockedLocalStorageHash = {};
                }
            };
        })
        .service('Session', require(rootPath+'app/services/session.js'));

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

    });

    beforeEach(angular.mock.module('testApp'));

    describe('getSessionData', function(){
        var returnedSessionData;

        describe('without values stored in localStorage', function(){

            beforeEach(inject(function(_Session_){
                Session = _Session_
            }));

            beforeEach(function(){
                returnedSessionData = Session.getSessionData();
            });

            it('returns the empty session data', function(){
                expect(returnedSessionData).toEqual(undefinedSessionData);
            });
        });

        describe('with values stored in localStorage', function(){

            beforeEach(function(){
                mockedLocalStorageHash = {
                    userId: '1',
                    accessToken: 'secrettoken'
                };
            });

            beforeEach(inject(function(_Session_){
                Session = _Session_
            }));

            beforeEach(function(){
                returnedSessionData = Session.getSessionData();
            });

            it('returns the session data with the stored values from localStorage',
            function(){
                var expectedSessionData = {
                    userId: '1',
                    userName: null,
                    realName: null,
                    email: null,
                    accessToken: 'secrettoken'
                }

                expect(returnedSessionData).toEqual(expectedSessionData);
            });
        });
    });
});
