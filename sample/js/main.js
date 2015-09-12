(function () {
  'use strict';

  angular
    .module('tfApp', [
      'ui.router',
      'tf.metatags'
    ])
    .config(tfAppConfig);

  /* @ngInject */
  function tfAppConfig($stateProvider, $urlRouterProvider, tfMetaTagsProvider) {

    tfMetaTagsProvider.setDefaults({
      properties: {
        keywords: 'metatags, meta, tags, thiagofesta'
      }
    });
    tfMetaTagsProvider.setTitleSuffix(' | MetaTags');

    $stateProvider.state('app', {
      'abstract': true,
      url: '',
      template: '<div ui-view></div>'
    }).state('app.home', {
      url: '/',
      templateUrl: 'views/main.html',
      tfMetaTags: {
        title: 'Main'
      }
    }).state('app.view1', {
      url: '/view1/',
      templateUrl: 'views/view1.html',
      tfMetaTags: {
        title: 'View 1',
        properties: {
          description: 'This is the view 1',
          keywords: 'override, the, descriptions'
        }
      }
    }).state('app.view2', {
      url: '/view2/',
      templateUrl: 'views/view2.html',
      tfMetaTags: {
        title: 'View 2',
        properties: {
          description: 'This is the view 2'
        }
      }
    });
    $urlRouterProvider.otherwise("/");
  }

})();
