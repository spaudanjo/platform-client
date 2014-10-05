module.exports = ['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    // $urlRouterProvider.otherwise("/posts");
    // .controller('navigation', require('./controllers/navigation.js'))
    // .controller('workspaceAccordion', require('./workspace'))
    // .controller('userFilter', require('./controllers/users/filter.js'))

    $stateProvider
        .state('root', {
            url: '',
            views: {
                'menu': {
                    controller: require('./controllers/navigation.js'),
                    templateUrl: 'templates/partials/menu.html'
                },
                'footer': {
                    templateUrl: 'templates/partials/footer.html'
                }
            }
        })
        .state('root.home', {
            url: '/',
            controller: require('./controllers/posts.js'),
            templateUrl: 'templates/posts.html'
        })
        .state('root.posts', {
            url: '/posts/',
            controller: require('./controllers/posts.js'),
            templateUrl: 'templates/posts.html',
            resolve: {
                posts: ['PostData', function(PostData){
                    return PostData.query();
                }]
            }
        })
        .state('root.test', {
            url: '/test/',
            // controller: require('./controllers/posts/detail.js'),
            // templateUrl: 'templates/posts/detail.html'
            controller: function(){
                alert("PSTS DETAIL CNTRL INLINE");
            },
            template: "POSTS DETAIL INLINE TEMPLATE"
        })
        .state('root.signin', {
            url: '/signin/',
            controller: require('./controllers/signin.js'),
            templateUrl: 'templates/signin.html'
        })
        .state('root.posts.detail', {
            url: '/:postId/',
            controller: require('./controllers/posts/detail.js'),
            templateUrl: 'templates/posts/detail.html'
        })
        .state('root.posts.add-to-set', {
            url: '/add-to-set/',
            controller: require('./controllers/sets/add-to-set.js'),
            templateUrl: 'templates/sets/add-to-set.html'
        })
        .state('root.settings', {
            url: '/settings/',
            controller: require('./controllers/admin/settings.js'),
            templateUrl: 'templates/admin/settings.html'
        })
        .state('root.users', {
            url: '/users/',
            controller: require('./controllers/users/users.js'),
            templateUrl: 'templates/users/users.html'
        });

}];
