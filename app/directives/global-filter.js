module.exports = ['TagEndpoint', 'SelectedTags', function(TagEndpoint, SelectedTags){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            post: '='
        },
        templateUrl: 'templates/partials/global-filter.html',
        link: function($scope, elem, attrs){
            $scope.tags = [];
            TagEndpoint.query().$promise.then(function(tags){
                $scope.tags = tags;
            });

            $scope.selectedTags = SelectedTags.getSelectedTags();

            // toggle selection for a given tag
            $scope.toggleSelection = SelectedTags.toggleSelection;

            $scope.toggleSelectAll = SelectedTags.toggleSelectAll;

            $scope.$watch(function(){
                return SelectedTags.getSelectedAll();
            }, function(newVal){
                $scope.selectedAll = newVal;
            });
        }
    };
}];
