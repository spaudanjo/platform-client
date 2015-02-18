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
        controller: ['$window', '$scope', '$geolocation', function($window, $scope, $geolocation) {

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
                        marker: false,
                        polyline: false,
                        polygon: false,
                        rectangle: false,
                        circle: false
                    },
                    edit: false
                },

                updateLatLon: function(lat, lon){
                    if($scope.values[$scope.attribute.key] !== null)
                    {
                        $scope.values[$scope.attribute.key] = {};
                    }
                    if($scope.values[$scope.attribute.key][$scope.key] !== null)
                    {
                        $scope.values[$scope.attribute.key][$scope.key] = {};
                    }

                    $scope.values[$scope.attribute.key][$scope.key].lat = lat;
                    $scope.values[$scope.attribute.key][$scope.key].lon = lon;
                },


                updateMarkerPosition: function(lat, lon){
                    leafletData.getMap($scope.attribute.key).then(function(map){
                        if(marker !== null)
                        {
                            map.removeLayer(marker);
                        }

                        marker = new L.Marker(new L.latLng(lat, lon), {draggable:true});
                        map.addLayer(marker);

                    });
                },

                centerMapTo: function(lat, lon){
                    leafletData.getMap($scope.attribute.key).then(function(map) {
                        map.panTo(new $window.L.LatLng(lat, lon));
                    });
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
                    $http.get('http://nominatim.openstreetmap.org/search?q=' + $window.escape($scope.searchLocationTerm) + '&format=json').success(
                        function(data, status, headers, config){
                            var lat = data[0].lat,
                            lon = data[0].lon;

                            that.updateLatLon(lat, lon);
                            that.updateMarkerPosition(lat, lon);
                            that.centerMapTo(lat, lon);
                            $scope.searchLocationTerm = '';
                        }
                    );
                }
            });

            leafletData.getMap($scope.attribute.key).then(function(map) {
                map.on('click', onMapClick);
                function onMapClick(e) {
                    var lat = e.latlng.lat,
                        lon = e.latlng.lng;
                    $scope.updateMarkerPosition(lat, lon);
                    $scope.updateLatLon(lat, lon);
                };
            });
        }]
    };
}];
