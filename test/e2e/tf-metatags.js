describe('Testing tf-metatags', function() {
  'use strict';

  var testMain = function() {
    it('the page title should be correct', function() {
      expect(browser.getTitle()).toEqual('Main | MetaTags');
    });

    it('should render meta tags correctly', function() {

      element.all(by.css('head meta')).then(function(items) {
        expect(items.length).toBe(2);
      });

      var ogUrl = element(by.css('head meta[name="og:url"]'));
      expect(ogUrl.getAttribute('name')).toBe('og:url');
      expect(ogUrl.getAttribute('content')).toBe('http://0.0.0.0:3000/sample/index.html#!/');

      var keywords = element(by.css('head meta[name=keywords]'));
      expect(keywords.getAttribute('name')).toBe('keywords');
      expect(keywords.getAttribute('content')).toBe('metatags, meta, tags, thiagofesta');
    });
  };

  var testView1 = function() {
    it('the page title should be correct', function() {
      expect(browser.getTitle()).toEqual('The Lord of the Rings: The Fellowship of the Ring | MetaTags');
    });

    it('should render meta tags correctly', function() {

      element.all(by.css('head meta')).then(function(items) {
        expect(items.length).toBe(3);
      });

      var ogUrl = element(by.css('head meta[name="og:url"]'));
      expect(ogUrl.getAttribute('name')).toBe('og:url');
      expect(ogUrl.getAttribute('content')).toBe('http://0.0.0.0:3000/sample/index.html#!/view1/');

      var keywords = element(by.css('head meta[name=keywords]'));
      expect(keywords.getAttribute('name')).toBe('keywords');
      expect(keywords.getAttribute('content')).toBe('override, the, descriptions');

      var description = element(by.css('head meta[name=description]'));
      expect(description.getAttribute('name')).toBe('description');
      expect(description.getAttribute('content')).toBe('Summary: A meek hobbit of the Shire and eight companions ' +
      'set out on a journey to Mount Doom to destroy the One Ring and the dark lord Sauron.; Year: 2001');
    });
  };

  var testView2 = function() {
    it('the page title should be correct', function() {
      expect(browser.getTitle()).toEqual('View 2 | MetaTags');
    });

    it('should render meta tags correctly', function() {

      element.all(by.css('head meta')).then(function(items) {
        expect(items.length).toBe(3);
      });

      var ogImage = element(by.css('head meta[name="og:image"]'));
      expect(ogImage.getAttribute('name')).toBe('og:image');
      expect(ogImage.getAttribute('content')).toBe('http://someurl.com/image.jpg');

      var keywords = element(by.css('head meta[name=keywords]'));
      expect(keywords.getAttribute('name')).toBe('keywords');
      expect(keywords.getAttribute('content')).toBe('metatags, meta, tags, thiagofesta');

      var description = element(by.css('head meta[name=description]'));
      expect(description.getAttribute('name')).toBe('description');
      expect(description.getAttribute('content')).toBe('This is the view 2');
    });
  };

  describe('when reloading the page', function() {

    describe('when accessing /', function() {

      beforeEach(function() {
        browser.get('/sample/index.html');
      });

      testMain();
    });

    describe('when accessing /view1/', function() {

      beforeEach(function() {
        browser.get('/sample/index.html#!/view1/');
      });

      testView1();
    });

    describe('when accessing /view2/', function() {

      beforeEach(function() {
        browser.get('/sample/index.html#!/view2/');
      });

      testView2();
    });

  });

  describe('when clicking around', function() {

    beforeEach(function() {
      browser.get('/sample/index.html');
    });

    describe('when accessing /', function() {
      beforeEach(function() {
        element(by.id('btn-1')).click();
      });
      testMain();
    });

    describe('when accessing /view1/', function() {
      beforeEach(function() {
        element(by.id('btn-2')).click();
      });
      testView1();
    });

    describe('when accessing /view2/', function() {
      beforeEach(function() {
        element(by.id('btn-3')).click();
      });
      testView2();
    });

  });

});
