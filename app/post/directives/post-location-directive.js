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
        controller: ['$scope', '$geolocation', function($scope, $geolocation) {

            $scope.getCurrentPosition = function(event){
                event.preventDefault();
                $geolocation.getCurrentPosition({
                    timeout: 60000
                }).then(function(geoposition){
                    debugger;
                });
            };

            // $geolocation.watchPosition({
            //     timeout: 60000,
            //     maximumAge: 250,
            //     enableHighAccuracy: true
            // });

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

                updateLatLon: function(lat, lon){
                    if($scope.values[$scope.attribute.key] !== null)
                        $scope.values[$scope.attribute.key] = {};
                    if($scope.values[$scope.attribute.key][$scope.key] !== null)
                        $scope.values[$scope.attribute.key][$scope.key] = {};

                    $scope.values[$scope.attribute.key][$scope.key].lat = lat;
                    $scope.values[$scope.attribute.key][$scope.key].lon = lon;
                },

                searchLocation: function(event){
                    var jo = $geolocation;
                    debugger;
                    event.preventDefault();
                    var that = this;
                    $http.get('http://nominatim.openstreetmap.org/search?q=' + escape($scope.searchLocationTerm) + '&format=json').success(
                        function(data, status, headers, config){
                            var lat = data[0].lat,
                            lon = data[0].lon;

                            that.updateLatLon(lat, lon);
                            // $scope.values['lat'] = lat;

                            leafletData.getMap($scope.attribute.key).then(function(map){
                                var drawnItems = $scope.controls.edit.featureGroup;

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
                map.on('draw:deleted', function(e){
                    marker = null;
                    // var layers = e.layers;
                    // layers.eachLayer(function (layer) {
                    //     console.log(JSON.stringify(layer.toGeoJSON()));
                    // });
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
