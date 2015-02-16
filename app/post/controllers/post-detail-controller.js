module.exports = [
    '$scope',
    '$translate',
    '$routeParams',
    'PostEndpoint',
    'UserEndpoint',
    'TagEndpoint',
    '$http',
    'Util',
    '$window',
    'leafletData',
    'FormAttributeEndpoint',
function(
    $scope,
    $translate,
    $routeParams,
    PostEndpoint,
    UserEndpoint,
    TagEndpoint,
    $http,
    Util,
    $window,
    leafletData,
    FormAttributeEndpoint
) {
    $translate('post.post_details').then(function(postDetailsTranslation){
        $scope.title = postDetailsTranslation;
    });

    $scope.post = PostEndpoint.get({id: $routeParams.id}, function() {
        $http.get(Util.apiUrl('/posts/' + $routeParams.id + '/geojson')).
        success(function(data, status, headers, config) {
            leafletData.getMap().then(function(map){
                data.features.filter(function(feature){
                    return feature.geometry.type === "Point";
                })
                .forEach(function(feature){
                    var marker = $window.L.marker(feature.geometry.coordinates).addTo(map);

                    marker.bindPopup(feature.properties.title);
                    marker.on('mouseover', function (e) {
                        this.openPopup();
                    });
                    marker.on('mouseout', function (e) {
                        this.closePopup();
                    });
                });
            });
        });



        // Load the post author
        if ($scope.post.user && $scope.post.user.id) {
            $scope.user = UserEndpoint.get({id: $scope.post.user.id});
        }

        // Load the post form
        if ($scope.post.form && $scope.post.form.id) {
            $scope.form_attributes = [];
            FormAttributeEndpoint.query({formId: $scope.post.form.id}, function(attributes) {
                angular.forEach(attributes, function(attr) {
                    this[attr.key] = attr;
                }, $scope.form_attributes);
            });
        }

        // Replace tags with full tag object
        $scope.post.tags = $scope.post.tags.map(function (tag) {
            return TagEndpoint.get({id: tag.id});
        });
    });
}];
