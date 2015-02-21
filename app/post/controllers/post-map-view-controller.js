module.exports = [
    '$q',
    '$scope',
    '$translate',
    'ConfigEndpoint',
    'PostEndpoint',
    'Leaflet',
    'leafletData',
    'MapLayersBaseControllerConfig',
function(
    $q,
    $scope,
    $translate,
    ConfigEndpoint,
    PostEndpoint,
    L,
    leafletData,
    MapLayersBaseControllerConfig
) {


    var geoJsonLayer = false,
        clusterLayer = false,
        fitDataOnMap = false;

    // Load posts geojson
    var geojson = PostEndpoint.get({extra:'geojson'});
    // Load map settings
    var config = ConfigEndpoint.get({id:'map'});

    // Create GeoJSON Layer
    geojson.$promise.then(function(geoJsonData) {
        geoJsonLayer = L.geoJson(geoJsonData, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(
                    '<strong><a href="/posts/'+feature.properties.id+'">' +
                    feature.properties.title +
                    '</a></strong>' +
                    '<p>'+feature.properties.description+'</p>'
                );
            }
        });
    });

    angular.extend($scope, new MapLayersBaseControllerConfig($scope, config));

    // Add map config to scope
    config.$promise.then(function(config) {
        fitDataOnMap = config.default_view.fitDataOnMap;
        return config;
    });


    $q.all({
        geojson: geojson.$promise,
        config: config.$promise
    })
    // Init cluster group
    .then(function(data) {
        if (data.config.clustering === true) {
            // Create marker cluster layer
            clusterLayer = L.markerClusterGroup({
                maxClusterRadius: data.config.maxClusterRadius
            });

            // Add geojson layers to cluster layer
            // This has to be done individually. Using clusterLayer.addLayers() breaks the clustering.
            angular.forEach(geoJsonLayer.getLayers(), function(layer) {
                clusterLayer.addLayer(layer);
            });
        }
    })
    // Get map instance
    .then(function () { return leafletData.getMap('map'); })
    // Set map options, add layers, and set bounds
    .then(function (map) {
        // Disable 'Leaflet prefix on attributions'
        map.attributionControl.setPrefix(false);

        // Add clusters to map
        var markers = clusterLayer || geoJsonLayer;
        map.addLayer(markers);

        if (fitDataOnMap === true) {
            // Center map on geojson
            map.fitBounds(markers.getBounds());
            // Avoid zooming further than 15 (particularly when we just have a single point)
            if (map.getZoom() > 15) {
                map.setZoom(15);
            }
        }
    });

    $translate('post.view_on_map').then(function(postDetailsTranslation){
        $scope.title = postDetailsTranslation;
    });

    $scope.map = ConfigEndpoint.get({ id: 'map' });

}];
