module.exports = ['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    // $urlRouterProvider.otherwise("/posts");

    $stateProvider
        .state('home', {
            url: '/',
            controller: require('./controllers/posts.js'),
            templateUrl: 'templates/posts.html'
        })
        .state('signin', {
            url: '/signin',
            controller: require('./controllers/signin.js'),
            templateUrl: 'templates/signin.html'
        });
        .state('posts', {
            url: '/posts',
            controller: require('./controllers/posts.js'),
            templateUrl: 'templates/posts.html'
        })
        .state('posts.detail', {
            url: '/posts/detail',
            controller: require('./controllers/posts/detail.js'),
            templateUrl: 'templates/posts/detail.html'
        })
        .state('posts.add-to-set', {
            url: '/posts/add-to-set',
            controller: require('./controllers/sets/add-to-set.js'),
            templateUrl: 'templates/sets/add-to-set.html'
        })
        .state('settings', {
            url: '/settings',
            controller: require('./controllers/admin/settings.js'),
            templateUrl: 'templates/admin/settings.html'
        })
        .state('users', {
            url: '/users',
            controller: require('./controllers/users/users.js'),
            templateUrl: 'templates/users/users.html'
        });
}];
