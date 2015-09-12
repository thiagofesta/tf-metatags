/**
 *  Karma configuration
 *  More details: http://karma-runner.github.io/0.13/config/configuration-file.html
 */
module.exports = function(config) {
  'use strict';

  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      '../sample/bower_components/angular/angular.js',
      '../sample/bower_components/angular-ui-router/release/angular-ui-router.js',
      '../sample/bower_components/angular-mocks/angular-mocks.js',
      '../release/tf-metatags.min.js',
      'unit/*.js'
    ],

    reporters: ['progress'],

    exclude: [],

    port: 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: true
  });
};
