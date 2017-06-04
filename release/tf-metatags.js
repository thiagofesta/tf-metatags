/**
 * Angular module for providing MetaTags support based on routes.
 * @version v2.0.0-dev-2017-06-04
 * @link https://github.com/thiagofesta/tf-metatags
 * @author Thiago Festa <thiagofesta@gmail.com> (http://thiagofesta.com)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
(function () {
  'use strict';

  runBlock.$inject = ['tfMetaTags'];
  angular
    .module('tf.metatags', ['ui.router'])
    .provider('tfMetaTags', tfMetaTagsProvider)
    .run(runBlock);

  /* @ngInject */
  function tfMetaTagsProvider() {
    /* jshint validthis:true */
    tfMetaTags.$inject = ['$rootScope', '$transitions', '$state', '$q', '$timeout', '$interpolate', '$injector'];
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

    /* @ngInject */
    function tfMetaTags($rootScope, $transitions, $state, $q, $timeout, $interpolate, $injector) {

      self.current = {};
      self.resolved = {};
      self.update = update;
      self.initialize = initialize;

      /////////////////////

      function initialize() {
        $transitions.onSuccess({to: '**'}, onStateChangeSuccess);

        function onStateChangeSuccess(transition) {
          var tokens = transition.getResolveTokens();
          var resolves = {};
          var promises = tokens.map(function(token) {
            var resolved = transition.injector().get(token);
            resolves[token] = resolved;
            return resolved;
          });

          $q.all(promises).then(function() {
            self.resolved = resolves;
            $timeout(self.update);
          });
        }
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
            if (!angular.isObject(value)) {
              obj[key] = getValue(value);
            }
          });
        }
      }

      function getValue(value) {
        var ret;

        if (angular.isFunction(value)) {
          ret = $injector.invoke(value, self, self.resolved);
        } else if (angular.isString(value)) {
          ret = $interpolate(value)(self.resolved);
        } else {
          ret = value;
        }

        return ret;
      }

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

      // Expose to Service same methods that the Provider have
      return self;
    }

  }

  /* @ngInject */
  function runBlock(tfMetaTags) {
    tfMetaTags.initialize();
  }

})();
