var rootPath = '../../../../../';

describe('UserEndpoint', function(){

    var $rootScope,
        $httpBackend,
        CONST,
        UserProfileEndpoint,
        mockUserDataResponse,
        sessionData;

    beforeEach(function(){

        var testApp = angular.module('testApp', ['ngResource']);

        sessionData = {
            userId: null,
            userName: null,
            accessToken: null
        };

        testApp.service('Session', function(){

            var setSessionDataEntry = function(key, value){
                sessionData[key] = value;
            };

            var getSessionDataEntry = function(key){
                return sessionData[key];
            };

            return {
                setSessionDataEntry: setSessionDataEntry,
                getSessionDataEntry: getSessionDataEntry
            };
        });

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

        testApp.service('UserProfileEndpoint', require(rootPath+'app/user-profile/services/endpoints/user-profile-endpoint.js'));

    });

    beforeEach(angular.mock.module('testApp'));

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _CONST_, _UserProfileEndpoint_){
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        CONST = _CONST_;
        UserProfileEndpoint = _UserProfileEndpoint_;
    }));

    describe('fetch user profile data for userId stored in session', function(){

        beforeEach(function () {
            sessionData.userId = 2;
        });

        beforeEach(function(){
            mockUserDataResponse = {
                "id": "2",
                "url": "http://ushahidi-backend/api/v2/users/2",
                "username": "admin",
                "email": "admin@example.com",
                "realname": "Max Test",
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

        beforeEach(function () {
            $httpBackend.expectGET(CONST.BACKEND_URL + '/api/v2/users/2').respond(mockUserDataResponse);
            UserProfileEndpoint.fetchUserProfile();
            $httpBackend.flush();
        });

        it('call the correct url', function(){

        });

        describe('get user profile data', function(){
            var userProfileData;
            beforeEach(function(){
                userProfileData = UserProfileEndpoint.getUserProfile();
            });

            it('returns the correct data', function(){
                expect(userProfileData.id).toEqual(mockUserDataResponse.id);
                expect(userProfileData.username).toEqual(mockUserDataResponse.username);
                expect(userProfileData.realname).toEqual(mockUserDataResponse.realname);
                expect(userProfileData.username).toEqual(mockUserDataResponse.username);
            });
        });
    });

    describe('update user profile data', function(){

        var userProfileData;

        beforeEach(function () {
            userProfileData = {
                username: 'barfoo',
                email: 'bar@foo.com',
                realname: 'Hanna Bar'
            };
        });

        beforeEach(function(){
            mockUserDataResponse = {
                "id": "2",
                "url": "http://ushahidi-backend/api/v2/users/2",
                "username": "barfoo",
                "email": "bar@foo.com",
                "realname": "Hanna Bar",
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

        it('call the correct url and set the correct data', function(){
            // $httpBackend.expectPUT(CONST.BACKEND_URL + '/api/v2/users/2')
            // .respond(200, mockUserDataResponse);
            // $httpBackend.flush();
            //
            // var userProfileData = UserProfileEndpoint.getUserProfile();
            // expect(userProfileData.id).toEqual(mockUserDataResponse.id);
            // expect(userProfileData.username).toEqual(mockUserDataResponse.username);
            // expect(userProfileData.realname).toEqual(mockUserDataResponse.realname);
            // expect(userProfileData.username).toEqual(mockUserDataResponse.username);
        });
    });
});
