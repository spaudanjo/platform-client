module.exports = [
    '$scope',
    '$translate',
    '$location',
    'PostEntity',
    'PostEndpoint',
    'FormEndpoint',
    'FormAttributeEndpoint',
function(
    $scope,
    $translate,
    $location,
    postEntity,
    PostEndpoint,
    FormEndpoint,
    FormAttributeEndpoint
) {
    $translate('post.create_post').then(function(title){
        $scope.title = title;
    });

    FormEndpoint.query().$promise.then(function(forms) {
        $scope.forms = forms;
    });

    $scope.chooseForm = function(form) {
        $scope.active_form = form;
        $scope.post = postEntity({form_id: form.id});

        FormAttributeEndpoint.query().$promise.then(function(attrs) {
            $scope.attributes = attrs;
        });
    };

    $scope.filterNotDisabled = function (form) {
        return !form.disabled;
    };

    $scope.filterInForm = function(attr) {
        if (!attr.forms[$scope.active_form.id]) {
            return false;
        }
        return true;
    };

    $scope.goBack = function() {
        $scope.active_form = null;
    };

    $scope.savePost = function(post) {
        $scope.saving_post = true;
        var response = PostEndpoint.save(post, function () {
            if (response.errors){
                // Handle errors
                console.log(response);
            }

            if (response.id) {
                $location.path('/posts/detail/' + response.id);
            }
        });
    };

    $scope.isDate = function(attr) {
        return attr.input === 'date';
    };
    $scope.isLocation = function(attr) {
        return attr.input === 'location';
    };
    $scope.isSelect = function(attr) {
        return attr.input === 'select';
    };
    $scope.isText = function(attr) {
        return attr.input === 'text';
    };
    $scope.isTextarea = function(attr) {
        return attr.input === 'textarea';
    };

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
        }
    });

    // add/remove links
    $scope.links = [];

    $scope.addLink = function () {
        $scope.links.push({});
    };

    // remove current link row
    $scope.removeLink = function(link) {
        var currentIndex = $scope.links.indexOf(link);
        $scope.links.splice(currentIndex, 1);
    };

}];
