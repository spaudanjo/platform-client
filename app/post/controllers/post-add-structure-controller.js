module.exports = [
    '$scope',
    '$translate',
    '$location',
    '$routeParams',
    '$controller',
    'PostEndpoint',
    'FormEndpoint',
function(
    $scope,
    $translate,
    $location,
    $routeParams,
    $controller,
    PostEndpoint,
    FormEndpoint
) {
    var that = this;
    // Initialize the base modify controller and extend it.
    angular.extend(this, $controller('PostModifyController', { $scope: $scope }));

    $translate('post.add_structure').then(function(title){
        $scope.title = title;
    });

    // Activate editing mode
    $scope.is_edit = true;

    FormEndpoint.query().$promise.then(function(forms) {
        $scope.forms = forms;
    });

    $scope.chooseForm = function(form) {
        $scope.active_form = form;
        $scope.post.form = { id: form.id };

        that.fetchAttributes($scope.post.form.id);
    };

    $scope.filterNotDisabled = function (form) {
        return !form.disabled;
    };

    PostEndpoint.get({id: $routeParams.id}).$promise.then(function(post) {
        $scope.post = post;
    });

    $scope.goBack = function() {
        $location.path('/posts/' + $scope.post.id);
    };

}];
