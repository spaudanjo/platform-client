var rootPath = '../../../../../';

describe('UserEndpoint', function(){

    var $rootScope,
        $httpBackend,
        UserProfileEndpoint;

    beforeEach(function(){
        var testApp = angular.module('testApp', [
        'ngResource'
        ]);

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

    });

    beforeEach(angular.mock.module('testApp', function($provide){
        $provide.value('localStorageService', function(){
            return {

            };
        });
        $provide.service('UserProfileEndpoint', require(rootPath+'app/user-profile/services/endpoints/user-profile-endpoint.js'));
        $provide.service('Session', require(rootPath+'app/services/session.js'));
    }));

    // beforeEach(function(){
    //     mockDependency = {
    //       getSomething: function () {
    //           return 'mockReturnValue';
    //       }
    //   };
    //
    //   module(function ($provide) {
    //       $provide.value('myDependency', mockDependency);
    //   });
    // });

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _UserProfileEndpoint_){
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        UserProfileEndpoint = _UserProfileEndpoint_;
    }));

    describe('get user profile data for a specific userId', function(){

        it('should call the correct url and return the correct data', function(){
            var successCallback = jasmine.createSpy('success');
            // $httpBackend.expectGET(BACKEND_URL + '/api/v2/users').respond(mockPostResponse);
            //
            // PostEndpoint.query().$promise.then(successCallback);
            //
            // $httpBackend.flush();
            // $rootScope.$digest();
            //
            // expect(successCallback).toHaveBeenCalled();
        });
    });
});
