module.exports = ['leafletData', '$http', function(leafletData, $http){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            attribute: '=',
            values: '=',
            key: '='
        },
        templateUrl: 'templates/posts/location.html',
        controller: ['$scope', '$geolocation', function($scope, $geolocation) {

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


                updateMarkerPosition: function(lat, lon){
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
                },

                centerMapTo: function(lat, lon){
                    leafletData.getMap($scope.attribute.key).then(function(map) {
                        map.panTo(new L.LatLng(lat, lon));
                    })
                },

                getCurrentPosition: function(event){
                    event.preventDefault();
                    var that = this;
                    $geolocation.getCurrentPosition({
                        timeout: 60000
                    }).then(function(geoposition){
                        var lat = geoposition.coords.latitude;
                        var lon = geoposition.coords.longitude;
                        that.updateLatLon(lat, lon);
                        that.updateMarkerPosition(lat, lon);
                        that.centerMapTo(lat, lon);
                    });
                },

                searchLocation: function(event){
                    event.preventDefault();
                    var that = this;
                    $http.get('http://nominatim.openstreetmap.org/search?q=' + escape($scope.searchLocationTerm) + '&format=json').success(
                        function(data, status, headers, config){
                            var lat = data[0].lat,
                            lon = data[0].lon;

                            that.updateLatLon(lat, lon);
                            that.updateMarkerPosition(lat, lon);
                            that.centerMapTo(lat, lon);
                            $scope.searchLocationTerm = "";
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
                    var lat = layer.getLatLng().lat,
                    lon = layer.getLatLng().lng;
                    $scope.updateLatLon(lat, lon);
                });
                map.on('draw:deleted', function(e){
                    marker = null;
                    $scope.updateLatLon(null, null);
                });
                map.on('draw:edited', function(e){
                    var layers = e.layers;
                    layers.eachLayer(function (layer) {
                        var lat = layer.getLatLng().lat,
                        lon = layer.getLatLng().lng;
                        $scope.updateLatLon(lat, lon);
                    });
                });
            });
        }]
    };
}];
