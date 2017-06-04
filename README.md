# tfMetaTags

[ ![Codeship Status for thiagofesta/tf-metatags](https://img.shields.io/codeship/af075410-1dd6-0133-13c3-0a18ce4642f2.svg)](https://codeship.com/projects/95120) [![Build Status TravisCI](https://img.shields.io/travis/thiagofesta/tf-metatags.svg)](https://travis-ci.org/thiagofesta/tf-metatags) [![codecov.io](https://img.shields.io/codecov/c/github/thiagofesta/tf-metatags.svg)](http://codecov.io/github/thiagofesta/tf-metatags?branch=master) [![coveralls.io](https://img.shields.io/coveralls/thiagofesta/tf-metatags/master.svg)](https://coveralls.io/github/thiagofesta/tf-metatags) [![bower.io](https://img.shields.io/bower/v/tf-metatags.svg)](http://bower.io/search/?q=tf-metatags)  [![npm](https://img.shields.io/npm/v/tf-metatags.svg)](https://www.npmjs.com/package/tf-metatags)
[![Code Climate](https://img.shields.io/codeclimate/github/thiagofesta/tf-metatags.svg)](https://codeclimate.com/github/thiagofesta/tf-metatags)

Angular module for providing MetaTags support based on routes.

Inspired from [angular-metatags](https://github.com/AvraamMavridis/angular-metatags) and used some ideas from [ui-router-metatags](https://github.com/tinusn/ui-router-metatags).

## Versions

When using ui-router 1 or higher, use tf-metatags 2 or higher.

| ui-router | tf-metatags |
| --------- | ----------- |
| >= 1.0.0  | >= 2.0.0    |
| <  1.0.0  | <  2.0.0.   |

## Installation

Download [tf-metatags.min.js](https://raw.githubusercontent.com/thiagofesta/tf-metatags/master/release/tf-metatags.min.js) and include it on your page

```html
<script src="tf-metatags.min.js"></script>
```

Include it in your module declaration

```javascript
angular.module('myApp', ['ui.router', 'tf.metatags']);
```

Add the tfMetaTags service to your page

```html
<title ng-bind="tfMetaTags.title"></title>
<meta ng-repeat="(key, value) in tfMetaTags.properties" name="{{key}}" content="{{value}}" >
```

Then configure defaults

```javascript
angular
  .module('myApp')
  .config(['tfMetaTagsProvider', function (tfMetaTagsProvider) {

    tfMetaTagsProvider.setDefaults({
      title: 'Default Title',
      properties: {
        keywords: 'keyword1, keyword2'
      }
    });

    tfMetaTagsProvider.setTitleSuffix(' | MetaTags');
    tfMetaTagsProvider.setTitlePrefix('Prefix ');

  }]);
```

And finally decorate the routes with tfMetaTags:

```javascript
angular
  .module('myApp')
  .config(['$stateProvider', function ($stateProvider, $windowProvider) {

    var $window = $windowProvider.$get();

    $stateProvider
      .state('home', {
        url: '/',
        tfMetaTags: {
          title: 'Home',
          properties: {
            description: 'This is the homepage',
            keywords: 'keyword1, keyword2',
            'og:title': 'Home',
            'og:url': function() {
              return $window.location.href;
            },
            'twitter:title': 'Home'
          }
        }
      })
      .state('movie', {
        url: '/movie',
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
            description: 'Summary: {{movieData.summary}}; Year: {{movieData.year}}'
          }
        }
      });

  }]);
```

## SEO concerns

Until the search engine bots will be able to execute javascript properly you will have to use a tool like [prerender.io](https://prerender.io/) or [brombone](http://www.brombone.com/) to serve prerendered pages when a bot visit your site.

You can read more for the topic on the following articles:

-[Weluse.de - Angular & SEO finally a piece of cake](https://weluse.de/blog/angularjs-seo-finally-a-piece-of-cake.html)

-[Builtvisible.com - The Basics of JavaScript Framework SEO in AngularJS](http://builtvisible.com/javascript-framework-seo/)

-[Yearofmoo.com - AngularJS and SEO](http://www.yearofmoo.com/2012/11/angularjs-and-seo.html)


## Running sample app & Testing

First you need to install the dependencies

    npm install
    ./node_modules/bower/bin/bower install && ./node_modules/protractor/bin/webdriver-manager update

Now you are able to have the server up and running. Go and start the server

    grunt server


### Running tests

We have JSHint, JSCS, Unit tests and E2E tests.

All of them can be run once using the following command

    grunt test

You can see the coverage on the command line output or more details opening the `test/coverage/index.html` file on your browser.


##### Running JSHint

For running JSHint

    grunt test:jshint


##### Running JSCS

For running JSCS

    grunt test:jscs


##### Running Unit Tests

For running unit tests

    grunt test:unit


##### Running E2E Tests

For running E2E

    grunt test:e2e


### Building

For create a build run

    grunt build

This task will also make sure all tests are passing before making the build, once build is completed it also perform tests against the generated code.
