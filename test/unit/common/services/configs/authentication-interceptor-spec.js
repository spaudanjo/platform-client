var rootPath = '../../../../../';

describe('authentication interceptor', function(){

    var $httpBackend,
        $rootScope,
        $httpProviderIt,
        BACKEND_URL,
        mockedSessionData;

    beforeEach(function(){
        var testApp = angular.module('testApp', [], function($httpProvider){
            //save our interceptor
            $httpProviderIt = $httpProvider;
        });

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
        .config(require(rootPath+'app/common/configs/authentication-interceptor.js'))

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

        angular.mock.module('testApp');
    });

    beforeEach(inject(function(_$httpBackend_, _$rootScope_){
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
    }));

    describe('$httpProvider', function(){
        it('should have the authInterceptor', function () {
            expect($httpProviderIt.interceptors).toContain('authInterceptor');
        });
    });

    describe('request handler', function(){
        it('', function () {
        });
    });

    describe('responseError handler', function(){
        it('', function () {
        });
    });

});
