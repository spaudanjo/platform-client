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
        });
    });

});
