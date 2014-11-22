var userMenuLinkSelector = 'a#user-menu-link';

describe('users profile', function(){
    beforeEach(function(){
        browser.get('');
        var signinLinkSelector = 'a#signin-link';
        var signinLink = element(by.css(signinLinkSelector));
        signinLink.click();
        // ... more sign in stuff here
    });

    describe('"Edit profile" link in user menu', function(){
        beforeEach(function(){
            //... click the user menu link
        });
        it('should exist');
        describe('click it', function(){
            it('should bring you to the "edit user profile" page');
        });
    });

    describe('show users profile', function(){
        beforeEach(function(){
            // go to profile page
        });
        it('should show the users profile data');
        describe('edit users profile', function(){

            describe('successfull API call', function(){

                beforeEach(function(){
                    // change users data and hit 'save'
                });

                it('should update user data', function(){
                    // With e2e mock,
                    // make sure that the user data API was called correctly.
                });

                it('should notify the user about successfull update process');
                it('should stay on the page and show the updated user data');
            });

            describe('unsuccessfull API call', function(){

                beforeEach(function(){
                    // with e2e mocking, return non 200 status code to simulate API call fail
                });

                beforeEach(function(){
                    // change users data and hit 'save'
                });

                it('should notify the user about the not successfull update process');
                it('should stay on the page and show the old user data');
            });



        });
    });

});
