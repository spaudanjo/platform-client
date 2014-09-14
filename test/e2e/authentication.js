'use strict';

var getLastUrlPart = function(url){
  return url.substr(url.lastIndexOf('/'));
};

var httpBackendMock = function() {
  angular.module('httpBackendMock', ['ngMockE2E', 'myApp'])
    .run(function($httpBackend) {
      var authenticated = false;
      var testAccount = {
        email: 'test@example.com'
      };

      $httpBackend.whenGET('/api/auth').respond(function(method, url, data, headers) {
        return authenticated ? [200, testAccount, {}] : [401, {}, {}];
      });

      $httpBackend.whenPOST('/api/auth').respond(function(method, url, data, headers) {
        authenticated = true;
        return [200, testAccount, {}];
      });

      $httpBackend.whenDELETE('/api/auth').respond(function(method, url, data, headers) {
        authenticated = false;
        return [204, {}, {}];
      });

      $httpBackend.whenGET(/.*/).passThrough();
    })
};

var ptor = protractor.getInstance();
// ptor.addMockModule('httpBackendMock', httpBackendMock);



describe('sign in', function() {

  describe('menu', function(){

    var signinLink;

    beforeEach(function() {
      browser.get('/');
      signinLink = element(by.css('a[href="signin"]'));
    });

    it("should have sign in button", function(){
      expect(signinLink.getText()).toBe('Sign in');
    });

    describe('clicking the signin button', function(){
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
