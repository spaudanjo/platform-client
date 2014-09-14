'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser.get('/');
  });

  var query = element(by.model("query"));
  var phones = element.all(by.repeater("phone in phones"));

  it("should filter the phones as user types into search field", function(){

  	expect(phones.count()).toBe(20);

  	query.sendKeys("nexus");
  	expect(phones.count()).toBe(1);

    query.clear();
  	query.sendKeys("motorola");
  	expect(phones.count()).toBe(8);
  });

});
