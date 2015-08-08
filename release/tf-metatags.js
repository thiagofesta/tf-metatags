/**
 * Angular module for providing MetaTags support based on routes
 * @version v0.0.1-dev-2015-08-08
 * @link https://github.com/thiagofesta/tf-metatags
 * @author Thiago Festa <thiagofesta@gmail.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('tf-metatags', ['ui.router'])
    .service('MetaTags', ['$rootScope', '$state', function ($rootScope, $state) {
        'use strict';

        var self = this,
            titlePrefix = '',
            titleSuffix = '',
            defaults = {},
            callbacks = {};

        /**
         * @name MetaTags#build
         * @description
         * Builds the meta tags.
         *
         * @param {object} metaTags `metaTags` object from the `$state.current`.
         */
        function build(metaTags) {
            metaTags = angular.extend(defaults, metaTags);
            metaTags = buildTitle(metaTags);
            expose(metaTags);
        }

        /**
         * @name MetaTags#buildTitle
         * @description
         * Gets a `metaTags` object with no title or a title no "fixed" and add prefix and suffix on it.
         *
         * @param {object} metaTags `metaTags` object with title not prefixed/suffixed.
         * @returns {object} Returns `metaTags` object with title prefixed/suffixed.
         */
        function buildTitle(metaTags) {
            if(metaTags && !metaTags.title) {
                metaTags.title = '';
            }

            metaTags.title = titlePrefix + metaTags.title + titleSuffix;

            return metaTags;
        }

        /**
         * @name MetaTags#expose
         * @description
         * Expose the generated `metaTags` to `$rootScope`.
         *
         * Note: the `$rootScope.MetaTags` object has this patter: `{ title: '', properties: { [list of properties] } }`
         *
         * @param {object} metaTags `metaTags` object from the `$state.current`.
         */
        function expose(metaTags) {
            var obj = {
                title: '',
                properties: {}
            };

            angular.forEach(metaTags, function(value, key) {

                switch (key) {
                    case 'title':
                        obj.title = value;
                        break;

                    default:
                        obj.properties[key] = value;
                }

            });

            $rootScope.MetaTags = obj;
        }



        // Public

        /**
         * @name MetaTags#setTitlePrefix
         * @description
         * Set a title prefix.
         *
         * @param {string} prefix The title prefix.
         */
        self.setTitlePrefix = function(prefix) {
            titlePrefix = prefix;
        };

        /**
         * @name MetaTags#setTitleSuffix
         * @description
         * Set a title suffix.
         *
         * @param {string} suffix The title suffix.
         */
        self.setTitleSuffix = function(suffix) {
            titleSuffix = suffix;
        };

        /**
         * @name MetaTags#setDefaults
         * @description
         * Set the default `metaTags` object.
         * It's will be used when not passed by each route.
         *
         * @param {object} options The default options.
         */
        self.setDefaults = function(options) {
            defaults = angular.extend(defaults, options);
        };

        /**
         * @name MetaTags#addCallback
         * @description
         * Adds a callback.
         *
         * @param {string} callbackName The callback name. Sample: `afterChange`.
         * @param {function} callbackFn The callback function.
         */
        self.addCallback = function(callbackName, callbackFn) {
            if(!callbacks[callbackName]) {
                callbacks[callbackName] = callbackFn;
            }
        };

        /**
         * @name MetaTags#init
         * @description
         * Initializes the MetaTags service.
         * It needs to be called on the main app `run` method/phase.
         *
         * It keeps listening to `$stateChangeSuccess` event and build the new data.
         */
        self.init = function() {
            $rootScope.$on('$stateChangeSuccess', function() {
                build($state.current.metaTags || {});

                if(typeof callbacks.afterChange === 'function') {
                    callbacks.afterChange();
                }
            });
        };

        return self;

    }]);
