var getLastUrlPart = function(url){
    // as an alternative to this custom regex approach,
    // we could checkout http://medialize.github.io/URI.js
    var urlRegex = /^https?:\/\/[A-Za-z0-9\-.]+(?::[0-9]+)?(.*)$/g;
    var match = urlRegex.exec(url);
    return match[1];
};

function passThrough($httpBackend) {
    $httpBackend.whenGET(/^\/scripts\//).passThrough();
};

var build = function(funcs) {
    var funcStr = "angular.module('httpBackEndMock', ['ngMockE2E'])";

    if (Array.isArray(funcs)) {
        for (var i = 0; i < funcs.length; i++) {
            funcStr += "\r.run(" + funcs[i] + ")"
        };
    } else {
        funcStr += "\r.run(" + funcs + ")"
    }

    funcStr += "\r.run(" + passThrough + ")";

    var funcTyped = Function(funcStr);

    //console.log(funcTyped.toString())
    return funcTyped;
}


describe('users management', function() {

    beforeEach(function() {
        browser.addMockModule('httpBackEndMock', build([
            function($httpBackend){

                var CONST = {};
                CONST.BACKEND_URL = 'http://localhost:8081';
                CONST.API_URL = CONST.BACKEND_URL + 'api/v2';


                $httpBackend.whenPOST(CONST.BACKEND_URL + '/oauth/token').respond(function(method, url, data) {
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
                        var resource = require('../mocked_backend/api/v2/posts.json');
                        return [200, resource, {}];
                    },
                    'config/features': function(){
                        var resource = require('../mocked_backend/api/v2/config/features.json');
                        return [200, resource, {}];
                    },
                    'config/map': function(){
                        var resource = require('../mocked_backend/api/v2/config/map.json');
                        return [200, resource, {}];
                    },
                    'users': function(){
                        var resource = require('../mocked_backend/api/v2/users.json');
                        return [200, resource, {}];
                    },
                    'users/me': function(){
                        var resource = require('../mocked_backend/api/v2/users/me.json');
                        return [200, resource, {}];
                    },
                    'config/site': function(){
                        var resource = require('../mocked_backend/api/v2/config/site.json');
                        return [200, resource, {}];
                    }
                };

                var matcher = new RegExp(CONST.API_URL + '/.*');

                $httpBackend.whenGET(matcher).respond(function(method, url/*, data*/) {
                    var resourceName = url.split('api/v2/')[1];
                    return apiHandlers[resourceName]();

                });

                $httpBackend.whenPUT(matcher).respond(function(method, url, data){
                    return [200, data, {}];
                });

                // pass through all template fetches
                // to the server which delivers the angular app
                $httpBackend.whenGET(/templates.*/).passThrough();
            }
            ]));
        });

        describe('as a loggedin admin user', function(){

            var userMenuLink;

            beforeEach(function() {
            browser.get('/login');

            element(by.model('username')).sendKeys('admin');
            element(by.model('password')).sendKeys('admin');
            element(by.css('button[type="submit"]')).click();
        });

        describe('clicking the "tools" menu link in top menu', function(){
            var toolsMenuLinkSelector = 'a[href="/tools"]';

            beforeEach(function(){
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
