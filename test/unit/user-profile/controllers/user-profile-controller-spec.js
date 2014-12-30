var ROOT_PATH = '../../../../';

describe('user profile controller', function(){

    var $rootScope,
        $scope,
        $controller,
        mockUserEndpoint,
        mockNotify,
        mockUserGetResponse,
        mockUserUpdateResponse;

    beforeEach(function(){
        var testApp = angular.module('testApp', [
        'pascalprecht.translate'
        ])
        .config(require(ROOT_PATH + 'app/locale-config.js'))
        .controller('userProfileController', require(ROOT_PATH + 'app/user-profile/controllers/user-profile-controller.js'));

        require(ROOT_PATH + 'test/unit/simple-test-app-config')(testApp);

        angular.mock.module('testApp');
    });

    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
    }));

    beforeEach(inject(function($q){

        mockNotify = {
            showAlerts: function(alerts) {}
        };

        mockUserGetResponse = [{
            'id': 2,
            'url': 'http://ushahidi-backend/api/v2/users/2',
            'email': 'admin@22dsad.com',
            'realname': 'dasda',
            'username': 'admin',
            'role': 'admin'
        }];

        var getDeferred = $q.defer(), updateDeferred = $q.defer();
        mockUserEndpoint = {
            get: function() {
                return {$promise: getDeferred.promise};
            },
            update: function() {
                return {$promise: updateDeferred.promise};
            }
        };

        spyOn(mockUserEndpoint, 'get').and.callThrough();
        spyOn(mockUserEndpoint, 'update').and.callThrough();

        $controller('userProfileController', {
            $scope: $scope,
            Notify: mockNotify,
            UserEndpoint: mockUserEndpoint
        });

        getDeferred.resolve(mockUserGetResponse);
        updateDeferred.resolve(mockUserUpdateResponse);
        $rootScope.$digest();
        // $rootScope.$apply();
    }));

    it('should have the right title', function(){
		expect($scope.title).toBe('Edit profile');
    });

    describe('UserEndpoint usage', function(){

        it('should query the UserEndpoint', function(){
            expect(mockUserEndpoint.get).toHaveBeenCalled();
        });

        it('should set the response from UserEndpoint.query() to userData and userProfileDataForEdit', function(){
            expect($scope.userProfileData).toEqual(mockUserGetResponse);
            expect($scope.userProfileDataForEdit).toEqual(mockUserGetResponse);
        });

    });

    describe('onUserProfileEditFormShow', function(){

        describe('before calling the method', function(){

            describe('userProfileDataForEdit', function(){

                it('should be defined', function(){
                    expect($scope.userProfileDataForEdit).toBeDefined();
                });

                it('should be identical to userProfileData', function(){
                    expect($scope.userProfileDataForEdit).toBe($scope.userProfileData);
                });

            });

        });

        describe('after calling the method', function(){

            beforeEach(function(){
                $scope.onUserProfileEditFormShow();
            });

            describe('userProfileDataForEdit (copy of userProfileData)', function(){

                it('should be defined', function(){
                    expect($scope.userProfileDataForEdit).toBeDefined();
                });

                it('should not be identical to userProfileData', function(){
                    expect($scope.userProfileDataForEdit).not.toBe($scope.userProfileData);
                });

                it('should be equal to userProfileData', function(){
                    expect($scope.userProfileDataForEdit).toEqual($scope.userProfileData);
                });

            });

        });

    });

    describe('saveUserProfile', function(){
        beforeEach(function(){
            $scope.userProfileDataForEdit = angular.copy($scope.userProfileData);
        });
    });

});
