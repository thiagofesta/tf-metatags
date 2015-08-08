describe('Testing tf-metatags', function() {
  'use strict';

  var testMain = function() {
    it('the page title should be correct', function() {
      expect(browser.getTitle()).toEqual('Main | MetaTags');
    });

    it('should render meta tags correctly', function() {

      element.all(by.css('head meta')).then(function(items) {
        expect(items.length).toBe(1);

        expect(items[0].getAttribute('name')).toBe('keywords');
        expect(items[0].getAttribute('content')).toBe('metatags, meta, tags, thiagofesta');
      });

    });
  };

  var testView1 = function() {
    it('the page title should be correct', function() {
      expect(browser.getTitle()).toEqual('View 1 | MetaTags');
    });

    it('should render meta tags correctly', function() {

      element.all(by.css('head meta')).then(function(items) {
        expect(items.length).toBe(2);

        expect(items[0].getAttribute('name')).toBe('description');
        expect(items[0].getAttribute('content')).toBe('This is the view 1');

        expect(items[1].getAttribute('name')).toBe('keywords');
        expect(items[1].getAttribute('content')).toBe('override, the, descriptions');
      });

    });
  };

  var testView2 = function() {
    it('the page title should be correct', function() {
      expect(browser.getTitle()).toEqual('View 2 | MetaTags');
    });

    it('should render meta tags correctly', function() {

      element.all(by.css('head meta')).then(function(items) {
        expect(items.length).toBe(2);

        expect(items[0].getAttribute('name')).toBe('description');
        expect(items[0].getAttribute('content')).toBe('This is the view 2');

        expect(items[1].getAttribute('name')).toBe('keywords');
        expect(items[1].getAttribute('content')).toBe('metatags, meta, tags, thiagofesta');
      });

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
        browser.get('/sample/index.html#/view1/');
      });

      testView1();
    });

    describe('when accessing /view2/', function() {

      beforeEach(function() {
        browser.get('/sample/index.html#/view2/');
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
