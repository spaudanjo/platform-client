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
        $rootScope.$apply();
    });

    it('should have the right title', function(){
		expect($scope.title).toBe('Edit profile');
    });

    describe('UserEndpoint usage', function(){

        beforeEach(inject(function($q){

            mockUserResponse = [{
                'id': '1',
                'type': 'report',
                'title': 'Test post'
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
            $rootScope.$apply();
        }));

        it('should query the UserEndpoint', function(){
            expect(mockUserEndpoint.get).toHaveBeenCalled();
        });

        it('should set the response from UserEndpoint.query() to $scope.posts', function(){
            expect($scope.userProfileData).toEqual(mockUserResponse);
        });

    });

});
