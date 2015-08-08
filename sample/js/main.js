angular.module('tfApp', ['ui.router', 'tf-metatags'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app', {
      'abstract': true,
      url: '',
      template: '<div ui-view></div>'
    }).state('app.home', {
      url: '/',
      templateUrl: 'views/main.html',
      metaTags: {
        title: 'Main'
      }
    }).state('app.view1', {
      url: '/view1/',
      templateUrl: 'views/view1.html',
      metaTags: {
        title: 'View 1',
        description: 'This is the view 1',
        keywords: 'override, the, descriptions'
      }
    }).state('app.view2', {
      url: '/view2/',
      templateUrl: 'views/view2.html',
      metaTags: {
        title: 'View 2',
        description: 'This is the view 2'
      }
    });
    $urlRouterProvider.otherwise("/");

  }])
  .run(['MetaTags', function (MetaTags) {

    MetaTags.setDefaults({
      keywords: 'metatags, meta, tags, thiagofesta'
    });

    MetaTags.setTitleSuffix(' | MetaTags');

    MetaTags.init();

  }]);
