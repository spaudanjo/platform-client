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
            // proxy.whenGET('/login').respond(200);
            // proxy.whenGET('/logoff').respond(200);

            // proxy.onLoad.whenGET('http://ushahidi-backend/logoff').respond(200);

            // proxy.whenPOST('/oauth/token').respond(function(method, url, data) {
            //     var reqPayload = JSON.parse(data);
            //     if(reqPayload.username === 'admin' && reqPayload.password === 'admin')
            //     {
            //         return [200, {
            //             'access_token':'UmexrkSXVsHeEzGH1TMjYjvX344iB94XZK34nIVw',
            //             'token_type':'Bearer',
            //             'expires':2414253574,
            //             'expires_in':3600,
            //             'refresh_token':'o1sw8yr6b8BuH00RlIEeLv3v75bzZWZfymquNlKs',
            //             'refresh_token_expires_in':604800
            //         }, {}];
            //     }
            //     else
            //     {
            //         return [400, {
            //             'error':'invalid_request',
            //             'error_description':'The user credentials were incorrect.'
            //         }, {}];
            //     }
            // });


            // browser.pause();
            browser.get('/login');
            // browser.pause();

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
