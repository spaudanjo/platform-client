var getLastUrlPart = function(url){
    // as an alternative to this custom regex approach,
    // we could checkout http://medialize.github.io/URI.js
    var urlRegex = /^https?:\/\/[A-Za-z0-9\-.]+(?::[0-9]+)?(.*)$/g;
    var match = urlRegex.exec(url);
    return match[1];
};

describe('users management', function() {

    var HttpBackend = require('http-backend-proxy');
    var proxy = new HttpBackend(browser);

    describe('as a loggedin admin user', function(){

        var userMenuLink;

        beforeEach(function() {
            browser.manage().logs().get('browser').then(function(browserLogs) {
                // browserLogs is an array of objects with level and message fields
                browserLogs.forEach(function(log){
                    // if (log.level.value > 900) { // it's an error log
                        // console.log('Browser console error!');
                        console.log('!!!!!!!!!!!!!!!!!!!!!! BROWSER LOG!!!!!!!!!!!!!!');
                        console.log(log.message);
                        console.log('!!!!!!!!!!!!!!!!!!!!!! BROWSER LOG ENDE!!!!!!!!!!!!!!');
                    // }
                });
            });



            // proxy.whenGET('/login').respond(200);
            // proxy.whenGET('/logoff').respond(200);

            proxy.onLoad.whenGET('http://ushahidi-backend/logoff').respond(200);

            proxy.onLoad.whenPOST('http://ushahidi-backend/oauth/token').respond(function(method, url, data) {
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!! IN OAUTH/TOKEN HANDLER');
                var reqPayload = JSON.parse(data);
                if(reqPayload.username === 'admin' && reqPayload.password === 'admin')
                {
                    return [200, {
                        'access_token':'UmexrkSXVsHeEzGH1TMjYjvX344iB94XZK34nIVw',
                        'token_type':'Bearer',
                        'expires':2414253574,
                        'expires_in':3600,
                        'refresh_token':'o1sw8yr6b8BuH00RlIEeLv3v75bzZWZfymquNlKs',
                        'refresh_token_expires_in':604800
                    }, {}];
                }
                else
                {
                    return [400, {
                        'error':'invalid_request',
                        'error_description':'The user credentials were incorrect.'
                    }, {}];
                }
            });

            var apiHandlers = {
                'posts': function(){
                    var resource = require('../../../mocked_backend/api/v2/posts.json');
                    return [200, resource, {}];
                },
                'config/features': function(){
                    var resource = require('../../../mocked_backend/api/v2/config/features.json');
                    return [200, resource, {}];
                },
                'config/map': function(){
                    var resource = require('../../../mocked_backend/api/v2/config/map.json');
                    return [200, resource, {}];
                },
                'users': function(){
                    var resource = require('../../../mocked_backend/api/v2/users.json');
                    return [200, resource, {}];
                },
                'users/me': function(){
                    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!INSIDE OF USERS/ME HANDLER');
                    var resource = require('../../../mocked_backend/api/v2/users/me.json');
                    return [200, resource, {}];
                },
                'config/site': function(){
                    var resource = require('../../../mocked_backend/api/v2/config/site.json');
                    return [200, resource, {}];
                }
            };

            var matcher = new RegExp('http://ushahidi-backend/api/v2/.*');


            console.log('!!!!!!!!!!!!!!!!!!!!!!!!!! TEST ');


            proxy.onLoad.whenGET(matcher).respond(function(method, url/*, data*/) {
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!INSIDE OF GET HANDLER');
                var resourceName = url.split('api/v2/')[1];
                return apiHandlers[resourceName]();

            });

            proxy.onLoad.whenPUT(matcher).respond(function(method, url, data){
                return [200, data, {}];
            });

            // pass through all template fetches
            // to the server which delivers the angular app
            proxy.onLoad.whenGET(/templates.*/).passThrough();


            // browser.pause();
            browser.get('/login');
            // browser.pause();

            // browser.debugger();

            element(by.model('username')).sendKeys('admin');
            element(by.model('password')).sendKeys('admin');
            element(by.css('button[type="submit"]')).click();
        });

        describe('clicking the "tools" menu link in top menu', function(){
            var toolsMenuLinkSelector = 'a[href="/tools"]';

            beforeEach(function(){
                // browser.pause();
                var toolsMenuLink = element(by.css(toolsMenuLinkSelector));
                toolsMenuLink.click();
            });

            describe('clicking the "users" link in the "tools/settings" menu', function(){
                var usersLinkSelector = 'a[href="/tools"]';

                beforeEach(function(){
                    var usersLink = element(by.css(usersLinkSelector));
                    usersLink.click();
                });

                describe('with some existing users in the backend', function(){
                    it('should list the users', function(){

                    });
                });


                it('should exist and have the correct text', function(){
                    // expect(userProfileLink.isDisplayed()).toBe(true);
                    // expect(userProfileLink.getText()).toBe('My Profile');
                });

            });

        });

    });
});
