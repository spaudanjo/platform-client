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

    $translate('post.posts').then(function(title) {
        $scope.title = title;
        $scope.$emit('setPageTitle', title);
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



    $scope.deleteSelectedPosts = function() {
		// ask server to delete selected posts
		// and refetch posts from server
		var deletePostsPromises = _.map($scope.selectedPostIds, function(postId){
			return PostEndpoint.delete({ id: postId }).$promise;
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

    $scope.isToggled = function(post) {
        return $scope.selectedPostIds.indexOf(post.id) > -1;
    };

    $scope.togglePost = function(post) {
		// don't do anything if user has no bulk action permissions at all
		if(!$scope.userHasBulkActionPermissions())
		{
			return;
		}

        var idx = $scope.selectedPostIds.indexOf(post.id);
        if (idx > -1) {
            $scope.selectedPostIds.splice(idx, 1);
        } else {
            $scope.selectedPostIds.push(post.id);
        }
    };

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
