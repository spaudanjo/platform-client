'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('sign in', function() {

  describe('menu', function(){

    beforeEach(function() {
      browser.get('/');
    });

    it("should have sign in button", function(){
      expect(element(by.css('a[href="signin"]')).getText()).toBe('Sign in');
    });

    // describe('clicking the signin button')

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
