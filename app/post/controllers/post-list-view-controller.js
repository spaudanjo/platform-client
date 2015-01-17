module.exports = ['$scope', '$translate', 'PostEndpoint', function($scope, $translate, PostEndpoint) {
	$translate('post.posts').then(function(postsTranslation){
		$scope.title = postsTranslation;
	});

	$scope.currentPage = 1;
	$scope.itemsPerPage = 3;
	// set a guessed initial value for totalItems
	// untill we have the correct total_count value from backend request
	// $scope.totalItems = $scope.itemsPerPage * 2;

	var getPostsForPagination = function(){
		PostEndpoint.query({
			offset: ($scope.currentPage - 1) * $scope.itemsPerPage,
			limit: $scope.itemsPerPage
		}).$promise.then(function(posts){
			$scope.posts = posts.results;
			$scope.totalItems = posts.total_count;
		});
	};

	$scope.pageChanged = getPostsForPagination;
	$scope.itemsPerPageChanged = getPostsForPagination;

	getPostsForPagination();

}];
