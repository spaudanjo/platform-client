module.exports = [
    'TagEndpoint',
    'UserEndpoint',
    'FormEndpoint',
function(
    TagEndpoint,
    UserEndpoint,
    FormEndpoint
) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            post: '=',
        },
        templateUrl: 'templates/posts/preview.html',
        link: function(scope) {
            // Replace tags with full tag object
            scope.post.tags = scope.post.tags.map(function (tag) {
                return TagEndpoint.get({id: tag.id});
            });

            scope.togglePost = function(){
                scope.post.selected = !scope.post.selected;
            };

            FormEndpoint.get({formId: scope.post.form.id}, function(form) {
                scope.form_name = form.name;
            });
        }
    };

}];
