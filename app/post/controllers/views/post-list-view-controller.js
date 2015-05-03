module.exports = [
    '$scope',
    '$translate',
    'PostEndpoint',
    'GlobalFilter',
    'Session',
    'Notify',
    '$q',
    '_',
    function (
        $scope,
        $translate,
        PostEndpoint,
        GlobalFilter,
        Session,
        Notify,
        $q,
        _
    ){
        $scope.stuff = [
          {selected: false, label: 'Scotchy scotch'},
          {selected: true, label: 'Monacle'},
          {selected: true, label: 'Curly mustache'},
          {selected: false, label: 'Top hat'}
        ];

        $translate('post.posts').then(function(postsTranslation) {
            $scope.title = postsTranslation;
        });

        var getPostsForPagination = function (query) {
            query = query || GlobalFilter.getPostQuery();
            var postQuery = _.extend(query, {
                offset: ($scope.currentPage - 1) * $scope.itemsPerPage,
                limit: $scope.itemsPerPage
            });

            PostEndpoint.query(postQuery).$promise.then(function (postsResponse) {
                $scope.posts = postsResponse.results;
                $scope.totalItems = postsResponse.total_count;
            });
        },
        handleResponseErrors = function (errorResponse) {
            var errors = _.pluck(errorResponse.data && errorResponse.data.errors, 'message');
            errors && Notify.showAlerts(errors);
        };

        // whenever the GlobalFilter post query changes,
        // update the current list of posts
        $scope.$watch(function () {
            return JSON.stringify(GlobalFilter.getPostQuery());
        }, function (newValue, oldValue) {
            getPostsForPagination();
        });

        $scope.deleteSelectedPosts = function () {
            $translate('notify.post.destroy_confirm').then(function(message) {
                if (window.confirm(message)) {
                    // ask server to delete selected posts
                    // and refetch posts from server
                    var deletePostsPromises = _.map(
                        $scope.selectedItems,
                        function (post) {
                            return PostEndpoint.delete({ id: post.id }).$promise;
                    });
                    $q.all(deletePostsPromises).then(getPostsForPagination, handleResponseErrors)
                    .finally(getPostsForPagination);
                }
            });
        };

        $scope.itemsPerPageChanged = function (count) {
            $scope.itemsPerPage = count;
            getPostsForPagination();
        };

        $scope.userHasBulkActionPermissions = function () {
            return _.any($scope.posts, function (post) {
                return _.intersection(post.allowed_privileges, ['update', 'delete', 'change_status']).length > 0;
            });
        };

        $scope.unselectAllPosts = function () {
            _.forEach($scope.posts, function (post) {
                post.selected = false;
            });
        };

        $scope.selectAllPosts = function () {
            _.forEach($scope.posts, function (post) {
                post.selected = true;
            });
        };

        $scope.allSelectedOnCurrentPage = function () {
            var numberOfPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
            var itemsOnLastPage = $scope.totalItems % $scope.itemsPerPage;

            return ($scope.currentPage === (numberOfPages-1) && $scope.selectedItems.length === $scope.itemsPerPage)
                ||
                ($scope.selectedItems.length === itemsOnLastPage)
                ;
        };

        // --- start: initialization
        $scope.pageChanged = getPostsForPagination;
        $scope.currentPage = 1;
        $scope.selectedItems = [];
        $scope.itemsPerPageOptions = [10, 20, 50];
        $scope.itemsPerPage = $scope.itemsPerPageOptions[0];

        // untill we have the correct total_count value from backend request:
        $scope.totalItems = $scope.itemsPerPage;

        getPostsForPagination();
    }
];
