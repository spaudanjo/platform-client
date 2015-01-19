var getLastUrlPart = function(url){
    // as an alternative to this custom regex approach,
    // we could checkout http://medialize.github.io/URI.js
    var urlRegex = /^https?:\/\/[A-Za-z0-9\-.]+(?::[0-9]+)?(.*)$/g;
    var match = urlRegex.exec(url);
    return match[1];
};

describe('users management', function() {

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
                var usersLinkSelector = 'a[href="/tools/users"]';

                beforeEach(function(){
                    var usersLink = element(by.css(usersLinkSelector));
                    usersLink.click();
                });

                describe('with some existing users in the backend', function(){
                    it('should list the users', function(){
                        var adminLink = element(by.css('a[href="/tools/users/2"'));
                        expect(adminLink.getText()).toEqual('admin');
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
