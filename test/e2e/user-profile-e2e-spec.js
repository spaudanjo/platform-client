var getLastUrlPart = function(url){

    // as an alternative to this custom regex approach,
    // we could checkout http://medialize.github.io/URI.js

    var urlRegex = /^https?:\/\/[A-Za-z0-9\-.]+(?::[0-9]+)?(.*)$/g
    var match = urlRegex.exec(url);
    return match[1];
    // return url.substr(url.lastIndexOf('/'));
};

var signinLinkSelector = 'a#signin-link',
signoutLinkSelector = 'a#signout-link',
userMenuLinkSelector = 'a#user-menu-link',
userMenuLinkSelector = 'a#user-menu-link',
userProfileLinkSelector = 'a#user-profile';


describe('user profile management', function() {

    describe('as a signed in user', function(){

        var userMenuLink;

        beforeEach(function() {
            browser.get('/signin');

            element(by.model('username')).sendKeys('admin');
            element(by.model('password')).sendKeys('admin');
            element(by.css('button[type="submit"]')).click();

            userMenuLink = element(by.css(userMenuLinkSelector));
            userMenuLink.click();
        });

        describe('link to user profile in user menu', function(){
            var userProfileLink;

            beforeEach(function(){
                userProfileLink = element(by.css(userProfileLinkSelector));
            });

            it('should exist and have the correct text', function(){
                expect(userProfileLink.isDisplayed()).toBe(true);
                expect(userProfileLink.getText()).toBe('Edit Profile');
            });

            describe('clicking the user profile link', function(){
                beforeEach(function(){
                    userProfileLink.click();
                });

                it('should go to users/me (edit profile page)', function(){
                    browser.getCurrentUrl().then(function(url){
                        expect(getLastUrlPart(url)).toBe('/users/me');
                    });
                    // browser.getCurrentUrl().then(function(url){
                    //     expect(getLastUrlPart(url)).toBe('/users/me');
                    // });
                });
            });
        }); // end 'sign in link in main menu'

        // describe('sign in form:', function(){
        //
        //     var usernameField;
        //     var passwordField;
        //     var submitButton;
        //
        //     beforeEach(function(){
        //         browser.get('/signin');
        //         usernameField = element(by.model('username'));
        //         passwordField = element(by.model('password'));
        //         submitButton = element(by.css('button[type="submit"]'));
        //     });
        //
        //     it('should have a sign in form', function(){
        //         expect(usernameField.isDisplayed()).toBeTruthy();
        //         expect(passwordField.isDisplayed()).toBeTruthy();
        //         expect(submitButton.isDisplayed()).toBeTruthy();
        //     });
        //
        //     describe('submit form with wrong credentials', function(){
        //         beforeEach(function(){
        //             usernameField.sendKeys('foo');
        //             passwordField.sendKeys('bar');
        //             submitButton.click();
        //         });
        //
        //         it('should stay on the sign in page', function(){
        //             browser.getCurrentUrl().then(function(url){
        //                 expect(getLastUrlPart(url)).toBe('/signin');
        //             });
        //         });
        //     }); // end 'submit form with wrong credentials'
        //
        //     describe('submit form with correct credentials', function(){
        //         beforeEach(function(){
        //             usernameField.sendKeys('admin');
        //             passwordField.sendKeys('admin');
        //             submitButton.click();
        //         });
        //
        //         it('should go to the home page', function(){
        //             browser.getCurrentUrl().then(function(url){
        //                 expect(getLastUrlPart(url)).toBe('/map');
        //             });
        //         });
        //
        //         describe('signout link in the user menu', function(){
        //             var signinLink, signoutLink, userMenuLink;
        //
        //             beforeEach(function(){
        //                 signinLink = element(by.css(signinLinkSelector));
        //                 userMenuLink = element(by.css(userMenuLinkSelector));
        //                 signoutLink = element(by.css(signoutLinkSelector));
        //             });
        //
        //             it('should exist instead of the signin link', function(){
        //                 expect(signinLink.isDisplayed()).toBeFalsy();
        //                 userMenuLink.click();
        //                 expect(signoutLink.isDisplayed()).toBeTruthy();
        //             });
        //
        //             describe('clicking the signout link', function(){
        //
        //                 beforeEach(function(){
        //                     userMenuLink.click();
        //                     signoutLink.click();
        //                 });
        //
        //                 it('should change again to the signin link', function(){
        //                     expect(userMenuLink.isDisplayed()).toBeFalsy();
        //                     expect(signoutLink.isDisplayed()).toBeFalsy();
        //                     expect(signinLink.isDisplayed()).toBeTruthy();
        //                 });
        //             });
        //         });
        //     }); // end 'submit form with correct credentials'
        //
        // }); // end 'sign in form'
    }); // end 'sign in link in main menu'
}); // end 'sign in'
