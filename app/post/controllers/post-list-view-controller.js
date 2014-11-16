module.exports = ['$scope', '$translate', 'PostEntityProvider', function($scope, $translate, PostEntityProvider) {
	$translate('post.posts').then(function(postsTranslation){
		$scope.title = postsTranslation;
	});

	$scope.posts = PostEntityProvider.getPosts();

	$scope.$watch(function(){
		return PostEntityProvider.getPosts();
	}, function(newPosts) {
		$scope.posts = newPosts;
	});

}];
