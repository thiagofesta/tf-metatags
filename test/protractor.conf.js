/**
 *  Protractor configuration
 *  More details: https://github.com/angular/protractor/blob/master/docs/referenceConf.js
 */
exports.config = {

  directConnect: true,

  specs: [
    'e2e/**/*.js'
  ],

  exclude: [],

  capabilities: {
    'browserName': 'chrome'
  },

  multiCapabilities: [],

  baseUrl: 'http://0.0.0.0:3000/',

  framework: 'jasmine2',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
