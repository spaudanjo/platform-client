module.exports = ['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    // $urlRouterProvider.otherwise("/posts");
    // .controller('navigation', require('./controllers/navigation.js'))
    // .controller('workspaceAccordion', require('./workspace'))
    // .controller('userFilter', require('./controllers/users/filter.js'))

    $stateProvider
        .state('root', {
            views: {
                'menu': {
                    templateUrl: 'templates/partials/menu.html',
                    controller: require('./controllers/navigation.js'),
                    views: {
                        'workspace-accordion': {
                            templateUrl: 'templates/partials/workspace-accordion.html',
                            controller: require('./workspace.js'),
                        }

                    }
                },
                'footer': {
                    templateUrl: 'templates/partials/footer.html'
                }
            }
        })
        .state('root.home', {
            url: '/',
            views: {
                '@': {
                    controller: require('./controllers/posts.js'),
                    templateUrl: 'templates/posts.html',
                }
            },
            resolve: {
                posts: ['PostData', function(PostData){
                    return PostData.query();
                }]
            }
        })
        .state('root.posts', {
            url: '/posts/',
            views: {
                '@': {
                    controller: require('./controllers/posts.js'),
                    templateUrl: 'templates/posts.html',
                }
            },
            resolve: {
                posts: ['PostData', function(PostData){
                    return PostData.query();
                }]
            }
        })
        .state('root.signin', {
            url: '/signin/',
            views: {
                '@': {
                    controller: require('./controllers/signin.js'),
                    templateUrl: 'templates/signin.html'
                }
            }
        })
        .state('root.test', {
            url: 'test/',
            // controller: require('./controllers/posts/detail.js'),
            // templateUrl: 'templates/posts/detail.html'
            controller: function(){
                alert("PSTS DETAIL CNTRL INLINE");
            },
            template: "POSTS DETAIL INLINE TEMPLATE"
        })
        .state('root.posts.detail', {
            url: ':postId/',
            views: {
                '@': {
                    controller: require('./controllers/posts/detail.js'),
                    templateUrl: 'templates/posts/detail.html'
                }
            }
        })
        .state('root.posts.add-to-set', {
            url: 'add-to-set/',
            views: {
                '@root': {
                    controller: require('./controllers/sets/add-to-set.js'),
                    templateUrl: 'templates/sets/add-to-set.html'
                }
            }
        })
        .state('root.settings', {
            url: 'settings/',
            views: {
                '@root': {
                    controller: require('./controllers/admin/settings.js'),
                    templateUrl: 'templates/admin/settings.html'
                }
            }
        })
        .state('root.users', {
            url: 'users/',
            views: {
                '@root': {
                    controller: require('./controllers/users/users.js'),
                    templateUrl: 'templates/users/users.html'
                }
            }
        });

}];
