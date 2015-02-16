module.exports = ['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
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


    // .when('/', {
    //     redirectTo: '/views/map'
    // })
    // .when('/login', {
    //     controller: require('./controllers/login-controller.js'),
    //     templateUrl: 'templates/login.html'
    // })
    // .when('/posts/add-to-set', {
    //     controller: require('./controllers/sets/add-to-set.js'),
    //     templateUrl: 'templates/sets/add-to-set.html'
    // })
    // .when('/map-settings', {
    //     controller: require('./controllers/admin/map-settings.js'),
    //     templateUrl: 'templates/admin/map-settings.html'
    // });

    $stateProvider
    // .state('home', {
    //   url: "/",
    //   controller: require('./controllers/posts.js'),
    //   templateUrl: 'templates/posts.html'
    // })
    .state('login', {
      url: "/login/",
      controller: require('./controllers/login-controller.js'),
      templateUrl: 'templates/login.html'
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
}];


// module.exports = ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//
//     $locationProvider.html5Mode(true);
//
//     $routeProvider
//         .when('/', {
//             redirectTo: '/views/map'
//         })
//         .when('/login', {
//             controller: require('./controllers/login-controller.js'),
//             templateUrl: 'templates/login.html'
//         })
//         .when('/posts/add-to-set', {
//             controller: require('./controllers/sets/add-to-set.js'),
//             templateUrl: 'templates/sets/add-to-set.html'
//         })
//         .when('/map-settings', {
//             controller: require('./controllers/admin/map-settings.js'),
//             templateUrl: 'templates/admin/map-settings.html'
//         });
// }];
