var rootPath = '../../../../../';

describe('UserEndpoint', function(){

    var $rootScope,
        $httpBackend,
        BACKEND_URL,
        UserEndpoint,
        mockUserResponse;


    beforeEach(function(){
        var testApp = angular.module('testApp', [
        'ngResource'
        ])
        .service('UserEndpoint', require(rootPath+'app/common/services/endpoints/user-endpoint.js'));

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

        angular.mock.module('testApp');
    });

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _CONST_, _UserEndpoint_){
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        BACKEND_URL = _CONST_.BACKEND_URL;
        UserEndpoint = _UserEndpoint_;
    }));


    describe('"users/me" for the user data of signed in user', function(){

        beforeEach(function(){
            mockUserDataResponse = {
                'id': 2,
                'url': 'http://ushahidi-backend/api/v2/users/2',
                'email': 'admin@example.com',
                'realname': 'Admin Joe',
                'username': 'admin',
            };
        });

        describe('get user data', function(){
            it('should call the correct url and return the correct data', function(){
                var successCallback = jasmine.createSpy('success');
                $httpBackend.expectGET(BACKEND_URL + '/api/v2/users/me').respond(mockUserDataResponse);

                UserEndpoint.get({id: 'me'}).$promise.then(successCallback);

                $httpBackend.flush();
                $rootScope.$digest();

                expect(successCallback).toHaveBeenCalled();

                var actualUserData = successCallback.calls.mostRecent().args[0];
                expect(actualUserData.id).toEqual(mockUserDataResponse.id);
                expect(actualUserData.realname).toEqual(mockUserDataResponse.realname);
                expect(actualUserData.email).toEqual(mockUserDataResponse.email);
                expect(actualUserData.username).toEqual(mockUserDataResponse.username);
            });
        });

        describe('update user data', function(){

            describe('with invalid data to update', function(){

                beforeEach(function(){
                    mockUserDataResponse = {
                        'id': 2,
                        'url': 'http://ushahidi-backend/api/v2/users/2',
                        'email': 'invalid@email.com',
                        'realname': 'Obi Wan',
                        'username': 'obi',
                    };
                });

                it('should call the correct url and return XXXXXXXXXXXXXXX', function(){
                    var successCallback = jasmine.createSpy('success');
                    $httpBackend.expectPUT(BACKEND_URL + '/api/v2/users/me').respond(400, mockUserDataResponse);

                    var userDataToUpdate = {
                        'email':'invalid@email',
                        'realname':'Obi Wan'
                    };

                    UserEndpoint.update({id: 'me'}, userDataToUpdate).$promise.then(successCallback);
                    // var promise = UserEndpoint.update({id: 'me'}, $scope.userProfileDataForEdit).$promise;

                    $httpBackend.flush();
                    $rootScope.$digest();

                    expect(successCallback).toHaveBeenCalled();

                    var actualUserData = successCallback.calls.mostRecent().args[0];
                    expect(actualUserData.id).toEqual(mockUserDataResponse.id);
                    expect(actualUserData.realname).toEqual(userDataToUpdate.realname);
                    expect(actualUserData.email).toEqual(userDataToUpdate.email);
                    expect(actualUserData.username).toEqual(mockUserDataResponse.username);
                });
            });

            describe('with valid data to update', function(){

                beforeEach(function(){
                    mockUserDataResponse = {
                        'id': 2,
                        'url': 'http://ushahidi-backend/api/v2/users/2',
                        'email': 'new@email.com',
                        'realname': 'Obi Wan',
                        'username': 'obi',
                    };
                });

                it('should call the correct url and return the updated user data', function(){
                    var successCallback = jasmine.createSpy('success');
                    $httpBackend.expectPUT(BACKEND_URL + '/api/v2/users/me').respond(mockUserDataResponse);

                    var userDataToUpdate = {
                        'email':'new@email.com',
                        'realname':'Obi Wan'
                    };

                    UserEndpoint.update({id: 'me'}, userDataToUpdate).$promise.then(successCallback);
                    // var promise = UserEndpoint.update({id: 'me'}, $scope.userProfileDataForEdit).$promise;

                    $httpBackend.flush();
                    $rootScope.$digest();

                    expect(successCallback).toHaveBeenCalled();

                    var actualUserData = successCallback.calls.mostRecent().args[0];
                    expect(actualUserData.id).toEqual(mockUserDataResponse.id);
                    expect(actualUserData.realname).toEqual(userDataToUpdate.realname);
                    expect(actualUserData.email).toEqual(userDataToUpdate.email);
                    expect(actualUserData.username).toEqual(mockUserDataResponse.username);
                });
            });
        });

    });

});


















// var rootPath = '../../../../../';
//
// describe('UsereEndpoint', function(){
//
//     var $rootScope,
//         $httpBackend,
//         CONST,
//         UserProfileEndpoint,
//         mockUserDataResponse,
//         sessionData;
//
//     beforeEach(function(){
//
//         var testApp = angular.module('testApp', ['ngResource']);
//
//         sessionData = {
//             userId: null,
//             userName: null,
//             accessToken: null
//         };
//
//         testApp.service('Session', function(){
//
//             var setSessionDataEntry = function(key, value){
//                 sessionData[key] = value;
//             };
//
//             var getSessionDataEntry = function(key){
//                 return sessionData[key];
//             };
//
//             return {
//                 setSessionDataEntry: setSessionDataEntry,
//                 getSessionDataEntry: getSessionDataEntry
//             };
//         });
//
//         require(rootPath+'test/unit/simple-test-app-config.js')(testApp);
//
//         testApp.service('UserProfileEndpoint', require(rootPath+'app/user-profile/services/endpoints/user-profile-endpoint.js'));
//
//     });
//
//     beforeEach(angular.mock.module('testApp'));
//
//     beforeEach(inject(function(_$httpBackend_, _$rootScope_, _CONST_, _UserProfileEndpoint_){
//         $httpBackend = _$httpBackend_;
//         $rootScope = _$rootScope_;
//         CONST = _CONST_;
//         UserProfileEndpoint = _UserProfileEndpoint_;
//     }));
//
//     describe('fetch user profile data for userId stored in session', function(){
//
//         beforeEach(function () {
//             sessionData.userId = 2;
//         });
//
//         beforeEach(function(){
//             mockUserDataResponse = {
//                 'id': '2',
//                 'url': 'http://ushahidi-backend/api/v2/users/2',
//                 'username': 'admin',
//                 'email': 'admin@example.com',
//                 'realname': 'Max Test',
//                 'logins': '0',
//                 'failed_attempts': '0',
//                 'last_login': null,
//                 'last_attempt': null,
//                 'created': '1970-01-01T00:00:00+00:00',
//                 'updated': '2014-11-30T13:56:41+00:00',
//                 'role': 'admin',
//                 'allowed_methods': [
//                     'get',
//                     'post',
//                     'put'
//                 ]
//             };
//         });
//
//         beforeEach(function () {
//             $httpBackend.expectGET(CONST.BACKEND_URL + '/api/v2/users/me').respond(mockUserDataResponse);
//             UserProfileEndpoint.fetchUserProfile();
//             $httpBackend.flush();
//         });
//
//         describe('get user profile data', function(){
//             var userProfileData;
//             beforeEach(function(){
//                 userProfileData = UserProfileEndpoint.getUserProfile();
//             });
//
//             it('returns the correct data', function(){
//                 expect(userProfileData.id).toEqual(mockUserDataResponse.id);
//                 expect(userProfileData.username).toEqual(mockUserDataResponse.username);
//                 expect(userProfileData.realname).toEqual(mockUserDataResponse.realname);
//                 expect(userProfileData.username).toEqual(mockUserDataResponse.username);
//             });
//         });
//     });
//
//     describe('update user profile data', function(){
//
//         var updateUserProfileData, updatePromise;
//
//         beforeEach(function () {
//             updateUserProfileData = {
//                 id: '2',
//                 username: 'barfoo',
//                 email: 'bar@foo.com',
//                 realname: 'Hanna Bar'
//             };
//         });
//
//         describe('with status 200 (successfull) of the server response', function(){
//
//             var successCallback, errorCallback;
//
//             beforeEach(function(){
//                 mockUserDataResponse = {
//                     'id': '2',
//                     'url': 'http://ushahidi-backend/api/v2/users/2',
//                     'username': 'barfoo',
//                     'email': 'bar@foo.com',
//                     'realname': 'Hanna Bar',
//                     'logins': '0',
//                     'failed_attempts': '0',
//                     'last_login': null,
//                     'last_attempt': null,
//                     'created': '1970-01-01T00:00:00+00:00',
//                     'updated': '2014-11-30T13:56:41+00:00',
//                     'role': 'admin',
//                     'allowed_methods': [
//                     'get',
//                     'post',
//                     'put'
//                     ]
//                 };
//             });
//
//             beforeEach(function () {
//                 $httpBackend.expectPUT(CONST.BACKEND_URL + '/api/v2/users/me')
//                 .respond(200, mockUserDataResponse);
//
//                 updatePromise = UserProfileEndpoint.updateUserProfile(updateUserProfileData);
//
//                 successCallback = jasmine.createSpy('success');
//                 errorCallback = jasmine.createSpy('error');
//                 updatePromise.then(successCallback, errorCallback);
//
//                 $httpBackend.flush();
//             });
//
//             it('resolves the promise', function(){
//                 expect(successCallback).toHaveBeenCalled();
//             });
//
//             it('sets the correct data', function(){
//                 var userProfileData = UserProfileEndpoint.getUserProfile();
//                 expect(userProfileData.id).toEqual(mockUserDataResponse.id);
//                 expect(userProfileData.username).toEqual(mockUserDataResponse.username);
//                 expect(userProfileData.realname).toEqual(mockUserDataResponse.realname);
//                 expect(userProfileData.username).toEqual(mockUserDataResponse.username);
//             });
//         });
//
//         describe('with status 400 (bad request) of the server response and validation errors', function(){
//             var successCallback, errorCallback;
//
//             beforeEach(function(){
//                 mockUserDataResponse = {
//                     'errors': [
//                         {
//                             'message': 'Validation Error: \'email must be an email address\'',
//                             'code': 400
//                         }
//                     ]
//                 };
//             });
//
//             beforeEach(function () {
//                 $httpBackend.expectPUT(CONST.BACKEND_URL + '/api/v2/users/me')
//                 .respond(400, mockUserDataResponse);
//
//                 updatePromise = UserProfileEndpoint.updateUserProfile(updateUserProfileData);
//
//                 successCallback = jasmine.createSpy('success');
//                 errorCallback = jasmine.createSpy('error');
//                 updatePromise.then(successCallback, errorCallback);
//
//                 $httpBackend.flush();
//             });
//
//             it('rejects the promise with the validation errors', function(){
//                 expect(errorCallback).toHaveBeenCalled();
//
//                 var validationErrors = errorCallback.calls.mostRecent().args[0].errors;
//                 expect(validationErrors.length).toBe(1);
//                 expect(validationErrors[0]).toEqual(mockUserDataResponse.errors[0].message);
//             });
//         });
//     });
// });
