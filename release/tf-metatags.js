/**
 * Angular module for providing MetaTags support based on routes.
 * @version v0.4.0-dev-2015-09-14
 * @link https://github.com/thiagofesta/tf-metatags
 * @author Thiago Festa <thiagofesta@gmail.com> (http://thiagofesta.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
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
      if (callbackName) {
        return callbacks[callbackName];
      }

      return callbacks;
    }

    function mergeDefaults(metaTagsObj) {
      var properties;

      if (defaults.properties) {
        properties = angular.extend({}, defaults.properties, metaTagsObj.properties);
      }

      metaTagsObj = angular.extend({}, defaults, metaTagsObj);

      if (properties) {
        metaTagsObj.properties = properties;
      }

      return metaTagsObj;
    }

    function updateTitle(metaTagsObj) {
      var title = titlePrefix + (metaTagsObj.title || '') + titleSuffix;

      if (title) {
        metaTagsObj.title = title;
      }
    }

    function removeFalsyValues(metaTagsObj) {
      cleanup(metaTagsObj);
      cleanup(metaTagsObj.properties);

      function cleanup(obj) {
        angular.forEach(obj, function(value, key) {
          if (!value) {
            delete obj[key];
          }
        });
      }
    }

    function executeFunctions(metaTagsObj) {
      execute(metaTagsObj);
      execute(metaTagsObj.properties);

      function execute(obj) {
        angular.forEach(obj, function(value, key) {
          if (angular.isFunction(value)) {
            obj[key] = value();
          }
        });
      }
    }

    /* @ngInject */
    function tfMetaTags($rootScope, $state, $timeout) {

      self.update = update;
      self.initialize = initialize;

      /////////////////////

      function update() {
        if (typeof callbacks.beforeChange === 'function') {
          callbacks.beforeChange();
        }

        var metaTagsObj = mergeDefaults($state.current.tfMetaTags || {});
        removeFalsyValues(metaTagsObj);
        executeFunctions(metaTagsObj);
        updateTitle(metaTagsObj);

        self.current = metaTagsObj;
        $rootScope.tfMetaTags = self.current;

        if (typeof callbacks.afterChange === 'function') {
          callbacks.afterChange();
        }
      }

      function initialize() {
        $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);

        function onStateChangeSuccess() {
          $timeout(self.update);
        }
      }

      // Expose to Service same methods that the Provider have
      return self;
    }
    tfMetaTags.$inject = ['$rootScope', '$state', '$timeout'];

  }

  /* @ngInject */
  function runBlock(tfMetaTags) {
    tfMetaTags.initialize();
  }
  runBlock.$inject = ['tfMetaTags'];

})();
