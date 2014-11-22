var rootPath = '../../../../../';

describe('Session', function(){

    var mockedLocalStorageHash;

    beforeEach(function(){

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
        });

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

    });

    beforeEach(angular.mock.module('testApp'));

    describe('', function(){

    });
});
