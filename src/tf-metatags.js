angular.module('tf.metatags', [])
  .service('MetaTags', ['$rootScope', '$state', function($rootScope, $state) {
    'use strict';

    var self = this,
      defaults = {},
      titlePrefix = '',
      titleSuffix = '',
      callbacks = {};

    var mergeDefaults = function(metaTagsObj) {
      var properties;

      if(defaults.properties) {
        properties = angular.extend({}, defaults.properties, metaTagsObj.properties);
      }

      metaTagsObj = angular.extend({}, defaults, metaTagsObj);

      if(properties) {
        metaTagsObj.properties = properties;
      }

      return metaTagsObj;
    };

    var updateTitle = function(metaTagsObj) {
      var title = titlePrefix + (metaTagsObj.title || '') + titleSuffix;

      if(title) {
        metaTagsObj.title = title;
      }

      return metaTagsObj;
    };

    self.setDefaults = function(obj) {
      defaults = obj;
    };
    self.getDefaults = function() {
      return defaults;
    };

    self.setTitlePrefix = function(prefix) {
      titlePrefix = prefix;
    };
    self.getTitlePrefix = function() {
      return titlePrefix;
    };

    self.setTitleSuffix = function(suffix) {
      titleSuffix = suffix;
    };
    self.getTitleSuffix = function() {
      return titleSuffix;
    };

    self.addCallback = function(callbackName, callbackFn) {
      callbacks[callbackName] = callbackFn;
    };
    self.getCallback = function(callbackName) {
      if(callbackName) {
        return callbacks[callbackName];
      }

      return callbacks;
    };

    self.current = {};

    self.update = function() {
      if(typeof callbacks.beforeChange === 'function') {
        callbacks.beforeChange();
      }

      var metaTagsObj = mergeDefaults($state.current.metaTags || {});
      metaTagsObj = updateTitle(metaTagsObj);

      self.current = metaTagsObj;
      $rootScope.MetaTags = self.current;

      if(typeof callbacks.afterChange === 'function') {
        callbacks.afterChange();
      }
    };

    self.init = function() {
      $rootScope.$on('$stateChangeSuccess', self.update);
    };

    return self;

  }]);
