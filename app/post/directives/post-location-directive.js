module.exports = ['leafletData', '$http', function(leafletData, $http){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            attribute: '=',
            values: '=',
            key: '=',
            mapId: '='
        },
        templateUrl: 'templates/posts/location.html',
        controller: ['$scope', function($scope) {

            var marker = null;

            // leaflet map or location attribute
            angular.extend($scope, {
                defaults: {
                    scrollWheelZoom: false
                },

                center: {
                    lat: 36.079868,
                    lng: -79.819416,
                    zoom: 4
                },

                controls: {
                    draw: {
                        marker: true,
                        polyline: false,
                        polygon: false,
                        rectangle: false,
                        circle: false
                    }
                },

                searchLocation: function(event){
                    event.preventDefault();
                    $http.get('http://nominatim.openstreetmap.org/search?q=' + escape($scope.searchLocationTerm) + '&format=json').success(
                        function(data, status, headers, config){
                            var lat = data[0].lat,
                            lon = data[0].lon;
                            leafletData.getMap($scope.attribute.key).then(function(map){
                                var drawnItems = $scope.controls.edit.featureGroup;

                                var j = lat;
                                var i = lon;

                                var newLatLng = new L.LatLng(lat, lon);
                                if(marker)
                                {
                                    marker.setLatLng(newLatLng);
                                }
                                else
                                {
                                    marker = L.marker(newLatLng);
                                    marker.addTo(drawnItems);
                                }
                            });
                        }
                    );
                }

            });

            leafletData.getMap($scope.attribute.key).then(function(map) {
                var drawnItems = $scope.controls.edit.featureGroup;
                map.on('draw:created', function (e) {
                    var layer = e.layer;
                    if(drawnItems && drawnItems.getLayers().length!==0){
                        drawnItems.clearLayers();
                    }
                    drawnItems.addLayer(layer);

                    marker = layer;
                });
                map.on('draw:edited', function(e){
                    var layers = e.layers;
                    layers.eachLayer(function (layer) {
                        console.log(JSON.stringify(layer.toGeoJSON()));
                    });
                });
            });



            // // Replace tags with full tag object
            // scope.post.tags = scope.post.tags.map(function (tag) {
            //     return TagEndpoint.get({id: tag.id});
            // });
            //
            // // Load the post author
            // if (scope.post.user && scope.post.user.id) {
            //     scope.post.user = UserEndpoint.get({id: scope.post.user.id});
            // }
        }]
    };
}];
