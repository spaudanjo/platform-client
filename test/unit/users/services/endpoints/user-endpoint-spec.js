var rootPath = '../../../../../';

describe('UserEndpoint', function(){

    var $rootScope,
        $httpBackend,
        BACKEND_URL,
        UserEndpoint;

    beforeEach(function(){
        var testApp = angular.module('testApp', [
        'ngResource'
        ])
        .service('UserEndpoint', require(rootPath+'app/user/services/endpoints/user-endpoint.js'));

        require(rootPath+'test/unit/simple-test-app-config.js')(testApp);

        angular.mock.module('testApp');
    });

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _CONST_, _UserEndpoint_){
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        BACKEND_URL = _CONST_.BACKEND_URL;
        UserEndpoint = _UserEndpoint_;
    }));

    describe('get user data for a specific userId', function(){

        it('should call the correct url and return the correct data', function(){
            var successCallback = jasmine.createSpy('success');
            $httpBackend.expectGET(BACKEND_URL + '/api/v2/posts').respond(mockPostResponse);

            PostEndpoint.query().$promise.then(successCallback);

            $httpBackend.flush();
            $rootScope.$digest();

            expect(successCallback).toHaveBeenCalled();
        });
    });
});
