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


    $stateProvider
    .state('/views/map', {
        url: '/views/map/',
        controller: require('./controllers/post-map-view-controller.js'),
        templateUrl: 'templates/post-map-view.html'
    })
    .state('/views/list', {
        url: "/views/list/",
        controller: require('./controllers/post-list-view-controller.js'),
        templateUrl: 'templates/post-list-view.html'
    })
    // .state('/posts/id', {
    //     url: "/posts/:id/",
    //     controller: require('./controllers/post-detail-controller.js'),
    //     templateUrl: 'templates/posts/detail.html'
    // })
    // .state('/posts/id/edit', {
    //     url: "/posts/:id/edit/",
    //     controller: require('./controllers/post-edit-controller.js'),
    //     templateUrl: 'templates/posts/modify.html'
    // })
    .state('/posts/create', {
        url: "/posts/create/",
        controller: require('./controllers/post-create-controller.js'),
        templateUrl: 'templates/posts/modify.html'
    });


}];
