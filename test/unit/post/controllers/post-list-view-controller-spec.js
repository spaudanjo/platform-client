var ROOT_PATH = '../../../../';

describe('posts list controller', function(){

    var $rootScope,
        $scope,
        $controller,
        mockPostEndpoint,
        mockPostResponse,
        mockGlobalFilter = { getPostQuery: function() { return {}; } },
        mockNotify,
        mockedSessionData;

    beforeEach(function(){
        var testApp = angular.module('testApp', [
        'pascalprecht.translate'
        ]),
        mockedSessionService =
        {
            getSessionData: function(){
                return mockedSessionData;
            },
            getSessionDataEntry: function(key){
                return mockedSessionData[key];
            },
            setSessionDataEntry: function(key, value){
                mockedSessionData[key] = value;
            }
        };

        testApp.service('Session', function(){
            return mockedSessionService;
        })
        .config(require(ROOT_PATH + 'app/common/configs/locale-config.js'))
        .controller('postListViewController', require(ROOT_PATH + 'app/post/controllers/views/post-list-view-controller.js'));

        require(ROOT_PATH + 'test/unit/simple-test-app-config')(testApp);

        angular.mock.module('testApp');
    });

    beforeEach(inject(function(_$rootScope_, _$controller_){
        $rootScope = _$rootScope_;
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
    }));


    beforeEach(function(){
        mockPostEndpoint = {
            query: function() {
                return {$promise: {
                    then: function(){}
                }};
            }
        };

        mockedSessionData = {};

        mockNotify = {
            showAlerts: function(/*alerts*/) {}
        };

        $controller('postListViewController', {
            $scope: $scope,
            PostEndpoint: mockPostEndpoint,
            Notify: mockNotify,
            GlobalFilter: mockGlobalFilter
        });

        $rootScope.$digest();
        $rootScope.$apply();
    });

    it('should have the right title', function(){
		expect($scope.title).toBe('Posts');
    });

    describe('PostEndpoint usage', function(){

        beforeEach(inject(function($q){

            mockPostResponse = {
                results:
                [{
                    'id': '1',
                    'type': 'report',
                    'title': 'Test post'
                }]
            };

            var queryDeferred;
            mockPostEndpoint = {
                query: function() {
                    queryDeferred = $q.defer();
                    return {$promise: queryDeferred.promise};
                }
            };
            spyOn(mockPostEndpoint, 'query').and.callThrough();

            $controller('postListViewController', {
                $scope: $scope,
                Notify: mockNotify,
                GlobalFilter: mockGlobalFilter,
                PostEndpoint: mockPostEndpoint
            });

            queryDeferred.resolve(mockPostResponse);
            $rootScope.$digest();
            $rootScope.$apply();
        }));

        it('should query the PostEndpoint', function(){
            expect(mockPostEndpoint.query).toHaveBeenCalled();
        });

        it('should set the response from PostEndpoint.query() to $scope.posts', function(){
            expect($scope.posts).toEqual(mockPostResponse.results);
        });

    });

});
