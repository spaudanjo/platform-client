var ROOT_PATH = '../../../../';

describe('user profile controller', function(){

    var $rootScope,
        $scope,
        $controller,
        mockUserEndpoint,
        mockNotify,
        mockUserResponse;

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

    beforeEach(function(){
        mockUserEndpoint = {
            get: function() {
                return {$promise: {
                    then: function(){}
                }};
            }
        };

        mockNotify = {
            showAlerts: function(alerts) {}
        };

        $controller('userProfileController', {
            $scope: $scope,
            Notify: mockNotify,
            UserEndpoint: mockUserEndpoint
        });

        $rootScope.$digest();
        // $rootScope.$apply();
    });

    it('should have the right title', function(){
		expect($scope.title).toBe('Edit profile');
    });

    describe('UserEndpoint usage', function(){

        beforeEach(inject(function($q){

            mockUserResponse = [{
                'id': 2,
                'url': 'http://ushahidi-backend/api/v2/users/2',
                'email': 'admin@22dsad.com',
                'realname': 'dasda',
                'username': 'admin',
                'role': 'admin'
            }];

            var queryDeferred;
            mockUserEndpoint = {
                get: function() {
                    queryDeferred = $q.defer();
                    return {$promise: queryDeferred.promise};
                }
            };
            spyOn(mockUserEndpoint, 'get').and.callThrough();

            $controller('userProfileController', {
                $scope: $scope,
                Notify: mockNotify,
                UserEndpoint: mockUserEndpoint
            });

            queryDeferred.resolve(mockUserResponse);
            $rootScope.$digest();
            // $rootScope.$apply();
        }));

        it('should query the UserEndpoint', function(){
            expect(mockUserEndpoint.get).toHaveBeenCalled();
        });

        it('should set the response from UserEndpoint.query() to userData and userProfileDataForEdit', function(){
            expect($scope.userProfileData).toEqual(mockUserResponse);
            expect($scope.userProfileDataForEdit).toEqual(mockUserResponse);
        });



            // $scope.onUserProfileEditFormShow = function(){
            //     $scope.userProfileDataForEdit = angular.copy($scope.userProfileData);
        describe('onUserProfileEditFormShow', function(){

            describe('before calling the method', function(){

                describe('userProfileDataForEdit', function(){

                    it('should be defined', function(){
                        expect($scope.userProfileDataForEdit).toBeDefined();
                    });

                    it('should be identical to userProfileData', function(){
                        // TODO: CHECK THAT IS NOT UNDEFINED
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

    });


});
