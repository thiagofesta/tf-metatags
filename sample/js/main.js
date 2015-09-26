(function () {
  'use strict';

  angular
    .module('tfApp', [
      'ui.router',
      'tf.metatags'
    ])
    .config(tfAppConfig);

  /* @ngInject */
  function tfAppConfig($stateProvider, $urlRouterProvider, tfMetaTagsProvider, $windowProvider) {

    var $window = $windowProvider.$get();

    tfMetaTagsProvider.setDefaults({
      properties: {
        keywords: 'metatags, meta, tags, thiagofesta',
        'og:url': function() {
          return $window.location.href;
        }
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
      resolve: {
        /* @ngInject */
        movieData: function($q, $timeout) {
          var deferred = $q.defer();

          $timeout(function() {
            deferred.resolve({
              title: 'The Lord of the Rings: The Fellowship of the Ring',
              year: 2001,
              summary: 'A meek hobbit of the Shire and eight companions set out on a journey to Mount Doom to destroy the One Ring and the dark lord Sauron.'
            });
          }, 1000);

          return deferred.promise;
        }
      },
      tfMetaTags: {
        /* @ngInject */
        title: function(movieData) {
          return movieData.title;
        },
        properties: {
          description: 'Summary: {{movieData.summary}}; Year: {{movieData.year}}',
          keywords: 'override, the, descriptions'
        }
      }
    }).state('app.view2', {
      url: '/view2/',
      templateUrl: 'views/view2.html',
      tfMetaTags: {
        title: 'View 2',
        properties: {
          description: 'This is the view 2',
          'og:url': null,
          'og:image': function() {
            return 'http://someurl.com/image.jpg';
          }
        }
      }
    });
    $urlRouterProvider.otherwise("/");
  }

})();
