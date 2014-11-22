module.exports = ['$routeProvider', function($routeProvider) {


    $routeProvider
    .when('/users/:id', {
        controller: require('./controllers/user-profile-controller.js'),
        templateUrl: 'templates/users/profile.html'
    });
}];
