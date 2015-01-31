module.exports = ['leafletData', function(leafletData){
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

                markers: {
                    osloMarker: {
                        lat: 36.079868,
                        lng: -79.819416,
                        message: 'Greensboro, NC',
                        focus: true,
                        draggable: false
                    }
                },
                controls: {
                    draw: {}
                }

            });

            leafletData.getMap($scope.attribute.key).then(function(map) {
                var drawnItems = $scope.controls.edit.featureGroup;
                map.on('draw:created', function (e) {
                    var layer = e.layer;
                    drawnItems.addLayer(layer);
                    console.log(JSON.stringify(layer.toGeoJSON()));
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
