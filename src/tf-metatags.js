(function () {
  'use strict';

  angular
    .module('tf.metatags', [])
    .provider('tfMetaTags', tfMetaTagsProvider)
    .run(runBlock);

  /* @ngInject */
  function tfMetaTagsProvider() {
    /* jshint validthis:true */
    var self = this,
      defaults = {},
      titlePrefix = '',
      titleSuffix = '',
      callbacks = {};

    self.setDefaults = setDefaults;
    self.getDefaults = getDefaults;

    self.setTitlePrefix = setTitlePrefix;
    self.getTitlePrefix = getTitlePrefix;

    self.setTitleSuffix = setTitleSuffix;
    self.getTitleSuffix = getTitleSuffix;

    self.addCallback = addCallback;
    self.getCallback = getCallback;

    self.current = {};

    self.$get = tfMetaTags;

    //////////////////////////

    function setDefaults(obj) {
      defaults = obj;
    }
    function getDefaults() {
      return defaults;
    }

    function setTitlePrefix(prefix) {
      titlePrefix = prefix;
    }
    function getTitlePrefix() {
      return titlePrefix;
    }

    function setTitleSuffix(suffix) {
      titleSuffix = suffix;
    }
    function getTitleSuffix() {
      return titleSuffix;
    }

    function addCallback(callbackName, callbackFn) {
      callbacks[callbackName] = callbackFn;
    }
    function getCallback(callbackName) {
      if(callbackName) {
        return callbacks[callbackName];
      }

      return callbacks;
    }

    function mergeDefaults(metaTagsObj) {
      var properties;

      if(defaults.properties) {
        properties = angular.extend({}, defaults.properties, metaTagsObj.properties);
      }

      metaTagsObj = angular.extend({}, defaults, metaTagsObj);

      if(properties) {
        metaTagsObj.properties = properties;
      }

      return metaTagsObj;
    }

    function updateTitle(metaTagsObj) {
      var title = titlePrefix + (metaTagsObj.title || '') + titleSuffix;

      if(title) {
        metaTagsObj.title = title;
      }

      return metaTagsObj;
    }

    /* @ngInject */
    function tfMetaTags($rootScope, $state) {

      self.update = update;
      self.initialize = initialize;

      /////////////////////

      function update() {
        if(typeof callbacks.beforeChange === 'function') {
          callbacks.beforeChange();
        }

        var metaTagsObj = mergeDefaults($state.current.tfMetaTags || {});
        metaTagsObj = updateTitle(metaTagsObj);

        self.current = metaTagsObj;
        $rootScope.tfMetaTags = self.current;

        if(typeof callbacks.afterChange === 'function') {
          callbacks.afterChange();
        }
      }

      function initialize() {
        $rootScope.$on('$stateChangeSuccess', self.update);
      }

      // Expose to Service same methods that the Provider have
      return self;
    }

  }

  /* @ngInject */
  function runBlock(tfMetaTags) {
    tfMetaTags.initialize();
  }

})();
