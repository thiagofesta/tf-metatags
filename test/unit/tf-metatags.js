describe('Testing MetaTags Service', function () {
  'use strict';

  var MetaTags,
    $rootScope;

  beforeEach(module('tfApp'));

  beforeEach(inject(function (_MetaTags_, _$rootScope_) {
    MetaTags = _MetaTags_;
    $rootScope = _$rootScope_;
  }));

  it('should have an init method', function () {
    expect(MetaTags.init).toEqual(jasmine.any(Function));
  });

});
