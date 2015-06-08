module.exports = [
    '_',
function (
    _
) {

    return {
        restrict: 'A',
        scope: {
            // id: '@',
            // name: '@',
            // model: '=',
            // required: '='
        },
        controller: [
            '$window',
            '$scope',
        function (
            $window,
            $scope
        ) {
            alert("JO");
        }]
    };

}];
