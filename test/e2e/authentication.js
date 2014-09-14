'use strict';

var getLastUrlPart = function(url){
  return url.substr(url.lastIndexOf('/'));
};

var ptor = protractor.getInstance();

var signinLinkSelector = 'a[href="signin"]';
var signoutLinkSelector = 'a[href="signout"]';


describe('sign in', function() {

  describe('sign in link in main menu', function(){

    var signinLink;

    beforeEach(function() {
      browser.get('/');
      signinLink = element(by.css(signinLinkSelector));
    });

    it("should exist and have the correct text", function(){
      expect(signinLink.isDisplayed()).toBe(true);
      expect(signinLink.getText()).toBe('Sign in');
    });

    describe('clicking the signin link', function(){
      beforeEach(function(){
        signinLink.click();
      });

      it('should go to the signin page', function(){
        ptor.getCurrentUrl().then(function(url){
          expect(getLastUrlPart(url)).toBe('/signin');
        });
      });
  });

  describe('sign in form', function(){

    var usernameField;
    var passwordField;
    var submitButton;

    beforeEach(function(){
      browser.get('/signin');
      usernameField = element(by.model("username"));
      passwordField = element(by.model("password"));
      submitButton = element(by.css("button[type='submit']"));
    });

      it('should have a sign in form', function(){
        expect(usernameField.isDisplayed()).toBeTruthy();
        expect(passwordField.isDisplayed()).toBeTruthy();
        expect(submitButton.isDisplayed()).toBeTruthy();
      });

      describe('submit form with wrong credentials', function(){
        beforeEach(function(){
          usernameField.sendKeys("foo");
          passwordField.sendKeys("bar");
          submitButton.click();
        });

        it('should stay on the sign in page', function(){
          ptor.getCurrentUrl().then(function(url){
            expect(getLastUrlPart(url)).toBe('/signin');
          });
        });

      });

      describe('submit form with correct credentials', function(){
        beforeEach(function(){
          usernameField.sendKeys("admin");
          passwordField.sendKeys("admin");
          submitButton.click();
        });

        it('should go to the home page', function(){
          ptor.getCurrentUrl().then(function(url){
            expect(getLastUrlPart(url)).toBe('/');
          });
        });

        describe('signout link in the main menu', function(){
          var signoutLink;

          it('should exist instead of the signin link', function(){
            signoutLink = element(by.css(signoutLinkSelector));
            expect(element(by.css(signoutLinkSelector)).isDisplayed()).toBeTruthy();

            expect(element(by.css(signinLinkSelector)).isDisplayed()).toBeFalsy();
          });
        });

      });

    });

        // expect(usernameField.getText()).toBe('')

    	// element.all(by.css(".phones li a")).first().click();
    	// browser.getLocationAbsUrl().then(function(url){
    	// 	expect(url.split('#')[1]).toBe('/phones/nexus-s');
    	// });


      // var query = element(by.model("query"));
      // var phones = element.all(by.repeater("phone in phones"));

      // expect(phones.count()).toBe(20);
      //
      // query.sendKeys("nexus");
      // expect(phones.count()).toBe(1);
      //
      // query.clear();
      // query.sendKeys("motorola");
      // expect(phones.count()).toBe(8);
  });

});
