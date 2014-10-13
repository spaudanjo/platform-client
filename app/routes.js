module.exports = function($stateProvider, $urlRouterProvider, $locationProvider) {
     $locationProvider.html5Mode(true);

    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.url();

        // check to see if the path already has a slash where it should be
        if (path[path.length - 1] === '/' || path.indexOf('/?') > -1) {
            return;
        }

        if (path.indexOf('?') > -1) {
            return path.replace('?', '/?');
        }

        return path + '/';
    });

    $stateProvider
    .state('home', {
      url: "/",
      controller: require('./controllers/posts.js'),
      templateUrl: 'templates/posts.html'
    })
    .state('signin', {
      url: "/signin/",
      controller: require('./controllers/signin.js'),
      templateUrl: 'templates/signin.html'
    });

    // var postRouteConfig = {
    //   controller: require('./controllers/posts.js'),
    //   templateUrl: 'templates/posts.html'
    // };
    // $routeProvider
    //     .when('/', postRouteConfig)
    //     .when('/posts', postRouteConfig)
    //     .when('/signin', {
    //         controller: require('./controllers/signin.js'),
    //         templateUrl: 'templates/signin.html'
    //     })
    //     .when('/posts/detail', {
    //         controller: require('./controllers/posts/detail.js'),
    //         templateUrl: 'templates/posts/detail.html'
    //     })
    //     .when('/posts/add-to-set', {
    //         controller: require('./controllers/sets/add-to-set.js'),
    //         templateUrl: 'templates/sets/add-to-set.html'
    //     })
    //     .when('/settings', {
    //         controller: require('./controllers/admin/settings.js'),
    //         templateUrl: 'templates/admin/settings.html'
    //     })
    //     .when('/users', {
    //         controller: require('./controllers/users/users.js'),
    //         templateUrl: 'templates/users/users.html'
    //     })
    //     .when('/tags', {
    //         controller: require('./controllers/tags/tags.js'),
    //         templateUrl: 'templates/tags/tags.html'
    //     });
};
