'use strict';

var getLastUrlPart = function(url){
  return url.substr(url.lastIndexOf('/') + 1);
};

var ptor;

beforeEach(function() {
  ptor = protractor.getInstance();
});

describe('sign in', function() {

  describe('menu', function(){

    var signinButton;

    beforeEach(function() {
      browser.get('/');
      signinButton = element(by.css('a[href="signin"]'));
    });

    it("should have sign in button", function(){
      expect(signinButton.getText()).toBe('Sign in');
    });

    describe('clicking the signin button', function(){
      beforeEach(function(){
        signinButton.click();
      });

      it('should go to the signin page', function(){
        ptor.getCurrentUrl().then(function(url){
          expect(getLastUrlPart(url)).toBe('signin');
        });
      });

      it('should have a sign in form', function(){
        var usernameField = element(by.model("username"));
        expect(usernameField.isDisplayed()).toBeTruthy();

        var passwordField = element(by.model("password"));
        expect(passwordField.isDisplayed()).toBeTruthy();

        var submitButton = element(by.css("button[type='submit']"));
        expect(submitButton.isDisplayed()).toBeTruthy();
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
