var getLastUrlPart = function(url){
    // as an alternative to this custom regex approach,
    // we could checkout http://medialize.github.io/URI.js
    var urlRegex = /^https?:\/\/[A-Za-z0-9\-.]+(?::[0-9]+)?(.*)$/g
    var match = urlRegex.exec(url);
    return match[1];
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

                var usernameSpanSelector = 'span#username',
                usernameSpan,
                fullnameSpanSelector = 'span#full_name',
                fullnameSpan,
                emailSpanSelector = 'span#email',
                emailSpan,

                fullnameFieldSelector = 'input[type="text"][name="realname"]',
                fullnameField,
                emailFieldSelector = 'input[type="email"][name="email"]',
                emailField,

                editProfileButtonSelector = 'button#edit_profile',
                editProfileButton,

                saveProfileButtonSelector = 'button[type="submit"]#save_profile',
                saveProfileButton,

                cancelButtonSelector = 'button[type="button"]#cancel',
                cancelButton;

                beforeEach(function(){
                    userProfileLink.click();

                    usernameSpan = element(by.css(usernameSpanSelector));
                    fullnameSpan = element(by.css(fullnameSpanSelector));
                    emailSpan = element(by.css(emailSpanSelector));
                    editProfileButton = element(by.css(editProfileButtonSelector));
                });

                it('should go to users/me (edit profile page)', function(){
                    browser.getCurrentUrl().then(function(url){
                        expect(getLastUrlPart(url)).toBe('/users/me');
                    });
                });

                it('should show the username, full name and email of the current user', function(){
                    expect(usernameSpan.isDisplayed()).toBe(true);
                    expect(usernameSpan.getText()).toBe('admin');

                    expect(fullnameSpan.isDisplayed()).toBe(true);
                    expect(fullnameSpan.getText()).toBe('Admin Joe');

                    expect(emailSpan.isDisplayed()).toBe(true);
                    expect(emailSpan.getText()).toBe('admin@example.com');
                });

                it('should show "Edit Profile" button', function(){
                    expect(editProfileButton.isDisplayed()).toBe(true);
                });

                describe('clicking the "Edit Profile" button', function(){
                    beforeEach(function(){
                        editProfileButton.click();

                        fullnameField = element(by.css(fullnameFieldSelector));
                        emailField = element(by.css(emailFieldSelector));

                        saveProfileButton = element(by.css(saveProfileButtonSelector));
                        cancelButton = element(by.css(cancelButtonSelector));
                    });

                    it('should show the editable fields for full name and email with the correct values prefilled', function(){
                        expect(fullnameField.isDisplayed()).toBe(true);
                        expect(fullnameField.getAttribute('value')).toBe('Admin Joe');

                        expect(emailField.isDisplayed()).toBe(true);
                        expect(emailField.getAttribute('value')).toBe('admin@example.com');
                    });

                    it('should show "Save Profile" and "Cancel" buttons', function(){
                        expect(saveProfileButton.isDisplayed()).toBe(true);
                        expect(cancelButton.isDisplayed()).toBe(true);
                    });

                    describe('changing fullname and email values', function(){
                        beforeEach(function(){
                            fullnameField.sendKeys('Foo Bar');
                            emailField.sendKeys('foo@bar.com');
                        });
                    });
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
