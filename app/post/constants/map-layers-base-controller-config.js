module.exports =
function(
    $scope,
    config
) {

    var layers = {
        baselayers : {
            mapquest: {
                name: 'MapQuest',
                url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.png',
                type: 'xyz',
                layerOptions: {
                    subdomains: '1234',
                    attribution: 'Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="http://info.mapquest.com/terms-of-use/">MapQuest</a>',
                }
            },
            mapquestAerial: {
                name: 'MapQuest Aerial',
                url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png',
                type: 'xyz',
                layerOptions: {
                    subdomains: '1234',
                    attribution: 'Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Imagery &copy; <a href="http://info.mapquest.com/terms-of-use/">MapQuest</a>',
                }
            },
            hOSM: {
                name: 'Humanitarian OSM',
                url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
                type: 'xyz',
                layerOptions: {
                    attribution: 'Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>'
                }
            },
        }
    };

    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: false
        },
        center: {
            // Default to centered on Nairobi
            lat: -1.2833,
            lng: 36.8167,
            zoom: 8
        },
        layers : layers
    });

    // Add map config to scope
    config.$promise.then(function(config) {
        // Add settings to scope
        // color, icon and baseLayer have been ignored
        angular.extend($scope, {
            center: {
                lat: config.default_view.lat,
                lng: config.default_view.lon,
                zoom: config.default_view.zoom
            },
            tiles: layers[config.default_view.baseLayer]
        });

        return config;
    });
};
