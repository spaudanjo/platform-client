module.exports = [
    '$scope',
    '$translate',
    'PostEndpoint',
    'GlobalFilter',
	'Session',
	'Notify',
	'$q',
    '_',
function(
    $scope,
    $translate,
    PostEndpoint,
    GlobalFilter,
	Session,
	Notify,
	$q,
    _
) {

    $scope.stuff = [
      {selected: false, label: 'Scotchy scotch'},
      {selected: true, label: 'Monacle'},
      {selected: true, label: 'Curly mustache'},
      {selected: false, label: 'Top hat'}
    ];

    $translate('post.posts').then(function(postsTranslation) {
        $scope.title = postsTranslation;
    });

    var getPostsForPagination = function(query) {
        query = query || GlobalFilter.getPostQuery();
        var postQuery = _.extend(query, {
            offset: ($scope.currentPage - 1) * $scope.itemsPerPage,
            limit: $scope.itemsPerPage
        });

        PostEndpoint.query(postQuery).$promise.then(function(postsResponse){
            $scope.posts = postsResponse.results;
            $scope.totalItems = postsResponse.total_count;
        });
    },
	handleResponseErrors = function(errorResponse){
        var errors = _.pluck(errorResponse.data && errorResponse.data.errors, 'message');
        errors && Notify.showAlerts(errors);
    };

    // whenever the GlobalFilter post query changes,
    // update the current list of posts
    $scope.$watch(function() {
        return JSON.stringify(GlobalFilter.getPostQuery());
    }, function(newValue, oldValue) {
        getPostsForPagination();
    });


    $scope.somePostsSelected = function(){
		return _.any($scope.posts, function(post){
			return post.selected;
		})
	};


    $scope.deleteSelectedPosts = function() {
		// ask server to delete selected posts
		// and refetch posts from server
		var deletePostsPromises = _.map(
			_.filter($scope.posts, function(post){
				return post.selected;
			}),
			function(post){
			return PostEndpoint.delete({ id: post.id }).$promise;
		});
		$q.all(deletePostsPromises).then(getPostsForPagination, handleResponseErrors)
		.finally(getPostsForPagination);
    };

    $scope.itemsPerPageChanged = function(count) {
        $scope.itemsPerPage = count;
        getPostsForPagination();
    };

    // TODO: probably a more fine grained role based condition check is necessary here
	$scope.userHasBulkActionPermissions = function(){
		return Session.getSessionDataEntry('role') === 'admin';
	};

	$scope.pageChanged = getPostsForPagination;
    $scope.currentPage = 1;
    $scope.itemsPerPageOptions = [10, 20, 50];
    $scope.itemsPerPage = $scope.itemsPerPageOptions[0];

	$scope.selectAllPosts = function(){
		$scope.selectedPostIds = _.map($scope.posts, function(post){
			return post.id;
		});
	};

	// --- start: initialization
	$scope.currentPage = 1;
	$scope.itemsPerPageOptions = [10, 20, 50];
	$scope.itemsPerPage = $scope.itemsPerPageOptions[0];
	// untill we have the correct total_count value from backend request:
	$scope.totalItems = $scope.itemsPerPage;

    getPostsForPagination();

}];
