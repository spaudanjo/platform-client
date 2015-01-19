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
                    it('should list all users', function(){
                        expect(element.all(by.repeater('user in users')).count()).toEqual(5);
                    });

                    describe('one user in the list (admin)', function(){
                        var adminLink;
                        beforeEach(function(){
                            adminLink = element(by.css('a[href="/tools/users/2"'));
                        });

                        describe('role field', function(){
                            var roleField;
                            beforeEach(function(){
                                roleField = element(by.css('tr#user-2 td.role'));
                            });

                            it('should exist and have the correct role name as text', function(){
                                expect(roleField.getText()).toEqual('Admin');
                            });

                        });

                        describe('link to users detail view', function(){
                            it('should exist and have the user name as link text', function(){
                                expect(adminLink.getText()).toEqual('admin');
                            });
                        });
                    });

                });

            });

        });

    });
});
