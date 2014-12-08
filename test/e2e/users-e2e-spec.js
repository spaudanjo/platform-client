describe('users profile', function(){
    describe('as a signed in user', function(){

        beforeEach(function(){
            // ... sign in stuff configuration for e2e mocking
        });

        describe('"Edit profile" link in user menu', function(){
            beforeEach(function(){
                //... click the user menu link
            });
            it('should exist', function(){});
            describe('click it', function(){
                it('should bring you to the "edit user profile" page', function(){});
            });
        });

        describe('show users profile', function(){
            beforeEach(function(){
                // go to profile page
            });
            it('should show the users profile data', function(){});
            describe('edit users profile', function(){

                describe('successfull API call', function(){

                    beforeEach(function(){
                        // change users data and hit 'save'
                    });

                    it('should update user data', function(){
                        // With e2e mock,
                        // make sure that the user data API was called correctly.
                    });

                    it('should notify the user about successfull update process', function(){});
                    it('should stay on the page and show the updated user data', function(){});
                });

                describe('unsuccessfull API call', function(){

                    beforeEach(function(){
                        // with e2e mocking, return non 200 status code to simulate API call fail
                    });

                    beforeEach(function(){
                        // change users data and hit 'save'
                    });

                    it('should notify the user about the unsuccessfull update process', function(){});
                    it('should stay on the page and show the old user data', function(){});
                });

            });
        });
    });

});
