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
