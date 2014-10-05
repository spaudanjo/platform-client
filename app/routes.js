module.exports = ['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    // $urlRouterProvider.otherwise("/posts");

    $stateProvider
        .state('home', {
            url: '/',
            controller: require('./controllers/posts.js'),
            templateUrl: 'templates/posts.html'
        })
        .state('posts', {
            url: '/posts/',
            controller: require('./controllers/posts.js'),
            templateUrl: 'templates/posts.html'
        })
        .state('test', {
            url: '/test/',
            // controller: require('./controllers/posts/detail.js'),
            // templateUrl: 'templates/posts/detail.html'
            controller: function(){
                alert("PSTS DETAIL CNTRL INLINE");
            },
            template: "POSTS DETAIL INLINE TEMPLATE"
        })
        .state('signin', {
            url: '/signin/',
            controller: require('./controllers/signin.js'),
            templateUrl: 'templates/signin.html'
        })
        .state('posts.detail', {
            url: '/detail/',
            controller: require('./controllers/posts/detail.js'),
            templateUrl: 'templates/posts/detail.html'
        })
        .state('posts.add-to-set', {
            url: '/add-to-set/',
            controller: require('./controllers/sets/add-to-set.js'),
            templateUrl: 'templates/sets/add-to-set.html'
        })
        .state('settings', {
            url: '/settings/',
            controller: require('./controllers/admin/settings.js'),
            templateUrl: 'templates/admin/settings.html'
        })
        .state('users', {
            url: '/users/',
            controller: require('./controllers/users/users.js'),
            templateUrl: 'templates/users/users.html'
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
    //     });
}];
