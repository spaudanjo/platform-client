var rootPath = '../../../../../';

describe('authentication interceptor', function(){

    var $httpBackend,
        $rootScope,
        $httpProviderIt,
        API_URL,
        mockedSessionData;

    beforeEach(function(){
        var testApp = angular.module('testApp', [], function($httpProvider){
            //save our interceptor
            $httpProviderIt = $httpProvider;
        });

        mockedSessionData = {
            accessToken: 'fooBarToken'
        };
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

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _CONST_){
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        API_URL + _CONST_.API_URL;
    }));

    describe('$httpProvider', function(){
        it('should have the authInterceptor', function () {
            expect($httpProviderIt.interceptors).toContain('authInterceptor');
        });
    });

    describe('request handler', function(){

        describe('for API requests', function () {
            it('should add the authorization token header', function () {
                $httpBackend.when('GET', API_URL+'/test-endpoint', null, function(headers) {
                    expect(headers.Authorization).toBe(mockedSessionData.accessToken);
                }).respond(200, {name: 'example' });
            });
        });

        describe('for non-API requests', function () {
            it('should not add the authorization token header', function () {
            });
        });

    });

    describe('responseError handler', function(){
        describe('for a 401 error', function(){
            it('should broadcast an "unauthorized" event over the rootScope', function(){

            });
        });
    });

});
