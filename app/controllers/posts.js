module.exports = ['$scope', 'posts', function($scope, posts) {
		$scope.title = 'Posts';
		$scope.posts = posts;

		// $scope.$watch('$state.$current.locals.globals.posts', function (posts) {
		// 	$scope.posts = posts;
		// });
}];
