var rootPath = '../../../../../';

describe('UserEndpoint', function(){

    var $rootScope,
        $httpBackend,
        CONST,
        UserProfileEndpoint,
        mockUserDataResponse;

    beforeEach(function(){
        var store = {
            'ls.userId': 2
        };

        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            debugger;
            return store[key];
        });
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            return store[key] = value + '';
        });
        spyOn(localStorage, 'clear').and.callFake(function () {
            debugger;
            store = {};
        });


        var testApp = angular.module('testApp', [
        'ngResource',
        'LocalStorageModule'
        ]);

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

        testApp.service('UserProfileEndpoint', require(rootPath+'app/user-profile/services/endpoints/user-profile-endpoint.js'));

        // var sessionMock = jasmine.createSpy('session');
        // var sessionMock
        testApp.service('Session', require(rootPath+'app/services/session.js'));
        // testApp.service('Session', sessionMock);
    });

    beforeEach(angular.mock.module('testApp'));

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _CONST_, _UserProfileEndpoint_){
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        CONST = _CONST_;
        UserProfileEndpoint = _UserProfileEndpoint_;
    }));

    describe('fetch user profile data for userId stored in session and then get this user profile data', function(){

        // we mock the localStorage API
        beforeEach(function () {
        });

        beforeEach(function(){
            mockUserDataResponse = {
                "id": "2",
                "url": "http://ushahidi-backend/api/v2/users/2",
                "email": "admin@example.com",
                "realname": "Max Test",
                "username": "admin",
                "logins": "0",
                "failed_attempts": "0",
                "last_login": null,
                "last_attempt": null,
                "created": "1970-01-01T00:00:00+00:00",
                "updated": "2014-11-30T13:56:41+00:00",
                "role": "admin",
                "allowed_methods": [
                    "get",
                    "post",
                    "put"
                ]
            }
        });

        it('should call the correct url and return the correct data', function(){
            // var successCallback = jasmine.createSpy('success');
            var tUserId = localStorage.getItem('userId');
            debugger;
            $httpBackend.expectGET(CONST.BACKEND_URL + '/api/v2/users/2').respond(mockUserDataResponse);
            UserProfileEndpoint.fetchUserProfile();
            //
            // PostEndpoint.query().$promise.then(successCallback);
            //
            $httpBackend.flush();
            var t = UserProfileEndpoint.getUserProfile();
            // $rootScope.$digest();
            //
            // expect(successCallback).toHaveBeenCalled();
        });
    });
});
