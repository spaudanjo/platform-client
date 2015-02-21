module.exports = [
    '$scope',
    '$translate',
    '$routeParams',
    '$q',
    'PostEndpoint',
    'ConfigEndpoint',
    'UserEndpoint',
    'TagEndpoint',
    'FormAttributeEndpoint',
    'Leaflet',
    'leafletData',
    'MapLayersBaseControllerConfig',
function(
    $scope,
    $translate,
    $routeParams,
    $q,
    PostEndpoint,
    ConfigEndpoint,
    UserEndpoint,
    TagEndpoint,
    FormAttributeEndpoint,
    L,
    leafletData,
    MapLayersBaseControllerConfig
) {

    $translate('post.view_on_map').then(function(postDetailsTranslation){
        $scope.title = postDetailsTranslation;
    });

    $scope.showType = function(type) {
        if (type === 'point') {
            return false;
        }
        if (type === 'geometry') {
            return false;
        }

        return true;
    };

    $scope.post = PostEndpoint.get({id: $routeParams.id}, function() {
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

    // Map

    // Load config
    var config = ConfigEndpoint.get({id:'map'});
    angular.extend($scope, new MapLayersBaseControllerConfig($scope, config));

    // Load geojson
    var geojson = PostEndpoint.get({id: $routeParams.id, extra: 'geojson'});
    // Load geojson and pass to map
    geojson.$promise.then(function (data) {
        $scope.geojson = {
            data: data,
            onEachFeature: function (feature, layer) {
                var key = feature.properties.attribute_key;

                layer.bindPopup(
                    key
                );
            }
        };
    });

    // Show map once data loaded
    $q.all(
        config.$promise,
        geojson.$promise
    ).then(function() {
        $scope.mapDataLoaded = true;
    });

    $q.all({
        map: leafletData.getMap('post-map'),
        geojson: leafletData.getGeoJSON('post-map')
    })
    // Set map options, add layers, and set bounds
    .then(function (data) {
        // Disable 'Leaflet prefix on attributions'
        data.map.attributionControl.setPrefix(false);

        // Center map on geojson
        data.map.fitBounds(data.geojson.getBounds());
        // Avoid zooming further than 15 (particularly when we just have a single point)
        if (data.map.getZoom() > 15) {
            data.map.setZoom(15);
        }
    });
}];
