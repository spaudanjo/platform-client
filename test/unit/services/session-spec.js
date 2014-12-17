var rootPath = '../../../';

describe('Session', function(){

    var mockedLocalStorageHash,
    Session,
    emptySessionData;

    beforeEach(function(){

        emptySessionData = {
            userId: null,
            userName: null,
            realName: null,
            email: null,
            accessToken: null
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
                clear: function(){
                    mockedLocalStorageHash = {};
                }
            };
        })
        .service('Session', require(rootPath+'app/services/session.js'));

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

    });

    beforeEach(angular.mock.module('testApp'));

    beforeEach(inject(function(_Session_){
        Session = _Session_
    }));

    describe('loadSessionData from localStorageService', function(){
        var returnedSessionData;

        beforeEach(function(){
            mockedLocalStorageHash = {
                key1: 'val1',
                key2: 'val2'
            };
        });

        describe('getSessionDataEntry', function(){
            describe('without calling loadSessionData before', function(){

                beforeEach(function(){
                    returnedSessionData = Session.getSessionData();
                });

                it('return the empty session data', function(){
                    expect(returnedSessionData).toEqual(emptySessionData);
                });
            });
        });

    });
});
