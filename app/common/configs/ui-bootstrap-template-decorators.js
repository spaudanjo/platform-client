module.exports = [
    '$provide',
function(
    $provide
) {
    $provide.decorator('paginationDirective', function($delegate) {
        //we now get an array of all the datepickerDirectives,
        //and use the first one
        $delegate[0].templateUrl = 'templates/angular-ui-bootstrap/pagination/pagination.html';
        return $delegate;
    });
}];
