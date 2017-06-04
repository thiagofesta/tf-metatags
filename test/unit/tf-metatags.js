describe('Testing Provider/Service: tfMetaTags', function() {
  'use strict';

  describe('Testing Provider', function() {
    var tfMetaTagsProvider;

    beforeEach(function() {
      module('tf.metatags', function(_tfMetaTagsProvider_) {
        tfMetaTagsProvider = _tfMetaTagsProvider_;
      });
      inject();
    });

    it('should be able to (set/get)Defaults', function() {
      expect(tfMetaTagsProvider.setDefaults).toBeDefined();
      expect(tfMetaTagsProvider.setDefaults).toEqual(jasmine.any(Function));
      expect(tfMetaTagsProvider.getDefaults).toBeDefined();
      expect(tfMetaTagsProvider.getDefaults).toEqual(jasmine.any(Function));

      expect(tfMetaTagsProvider.getDefaults()).toEqual({});

      var obj = {
        title: 'TF tfMetaTags',
        properties: {
          description: 'Describes a homepage'
        }
      };

      tfMetaTagsProvider.setDefaults(obj);

      expect(tfMetaTagsProvider.getDefaults()).toEqual(obj);
    });

    it('should be able to (set/get)TitlePrefix', function() {
      expect(tfMetaTagsProvider.setTitlePrefix).toBeDefined();
      expect(tfMetaTagsProvider.setTitlePrefix).toEqual(jasmine.any(Function));
      expect(tfMetaTagsProvider.getTitlePrefix).toBeDefined();
      expect(tfMetaTagsProvider.getTitlePrefix).toEqual(jasmine.any(Function));

      expect(tfMetaTagsProvider.getTitlePrefix()).toBe('');

      tfMetaTagsProvider.setTitlePrefix('tfMetaTags ');

      expect(tfMetaTagsProvider.getTitlePrefix()).toBe('tfMetaTags ');
    });

    it('should be able to (set/get)TitleSuffix', function() {
      expect(tfMetaTagsProvider.setTitleSuffix).toBeDefined();
      expect(tfMetaTagsProvider.setTitleSuffix).toEqual(jasmine.any(Function));
      expect(tfMetaTagsProvider.getTitleSuffix).toBeDefined();
      expect(tfMetaTagsProvider.getTitleSuffix).toEqual(jasmine.any(Function));

      expect(tfMetaTagsProvider.getTitleSuffix()).toBe('');

      tfMetaTagsProvider.setTitleSuffix(' | TF');

      expect(tfMetaTagsProvider.getTitleSuffix()).toBe(' | TF');
    });

    it('should be able to add a callbacks', function() {
      expect(tfMetaTagsProvider.addCallback).toBeDefined();
      expect(tfMetaTagsProvider.addCallback).toEqual(jasmine.any(Function));
      expect(tfMetaTagsProvider.getCallback).toBeDefined();
      expect(tfMetaTagsProvider.getCallback).toEqual(jasmine.any(Function));

      var fn = function() {};
      tfMetaTagsProvider.addCallback('afterChange', fn);

      expect(tfMetaTagsProvider.getCallback()).toEqual({
        afterChange: jasmine.any(Function)
      });
      expect(tfMetaTagsProvider.getCallback('afterChange')).toBe(fn);
      expect(tfMetaTagsProvider.getCallback('beforeChange')).toBeUndefined();
    });

  });

  describe('Testing Service', function() {

    var tfMetaTags,
      $rootScope,
      $transitions,
      $state,
      $timeout,
      $q;

    beforeEach(module('tf.metatags'));

    beforeEach(inject(function (_tfMetaTags_, _$rootScope_, _$transitions_, _$state_, _$timeout_, _$q_) {
      tfMetaTags = _tfMetaTags_;
      $rootScope = _$rootScope_;
      $transitions = _$transitions_;
      $state = _$state_;
      $timeout = _$timeout_;
      $q = _$q_;
    }));

    it('should return a service called tfMetaTags', function() {
      expect(tfMetaTags).toBeDefined();
      expect(tfMetaTags).toEqual(jasmine.any(Object));
    });

    it('should have a current property', function() {
      expect(tfMetaTags.current).toBeDefined();
      expect(tfMetaTags.current).toEqual({});
    });

    it('should have an update method', function() {
      expect(tfMetaTags.update).toBeDefined();
      expect(tfMetaTags.update).toEqual(jasmine.any(Function));
    });

    describe('should update correctly', function() {

      it('when have nothing', function() {
        $state.router.globals.current = {};

        tfMetaTags.update();

        expect(tfMetaTags.current).toEqual({});
      });

      it('when have only title and description and setDefaults', function() {
        $state.router.globals.current = {
          tfMetaTags: {
            title: 'Homepage',
            properties: {
              description: 'Description of homepage',
              number: 123
            }
          }
        };

        tfMetaTags.setDefaults({
          title: 'Title',
          properties: {
            description: 'Desc',
            keywords: 'Meta, tags, home'
          }
        });

        tfMetaTags.update();

        expect(tfMetaTags.current).toEqual({
          title: 'Homepage',
          properties: {
            description: 'Description of homepage',
            keywords: 'Meta, tags, home',
            number: 123
          }
        });
      });

      it('when have only title and description and setTitlePrefix and setTitleSuffix', function() {
        $state.router.globals.current = {
          tfMetaTags: {
            title: 'Homepage',
            properties: {
              description: 'Description of homepage'
            }
          }
        };

        tfMetaTags.setTitlePrefix('Pre ');
        tfMetaTags.setTitleSuffix(' | TF');

        tfMetaTags.update();

        expect(tfMetaTags.current).toEqual({
          title: 'Pre Homepage | TF',
          properties: {
            description: 'Description of homepage'
          }
        });
      });

      it('when have nothing and use setTitlePrefix and setTitleSuffix', function() {
        $state.router.globals.current = {};

        tfMetaTags.setTitlePrefix('Pre ');
        tfMetaTags.setTitleSuffix(' | TF');
        tfMetaTags.update();

        expect(tfMetaTags.current).toEqual({
          title: 'Pre  | TF'
        });
      });

      it('when has title, description and keywords', function() {
        $state.router.globals.current = {
          tfMetaTags: {
            title: 'Homepage',
            properties: {
              description: 'The homepage',
              keywords: 'home, page'
            }
          }
        };

        tfMetaTags.update();

        expect(tfMetaTags.current).toEqual($state.current.tfMetaTags);
      });

      it('when setDefaults has empty values and functions', function() {
        tfMetaTags.setDefaults({
          title: function() {
            return 'Title';
          },
          properties: {
            description: 'Desc',
            keywords: 'Meta, tags, home',
            'og:url': function() {
              return 'http://someurl.com/test';
            },
            'og:image': 'http://someurl.com/image.jpg',
            'og:image:width': 300,
            'og:image:height': 300
          }
        });

        $state.router.globals.current = {
          tfMetaTags: {
            title: 'Homepage',
            properties: {
              'og:image:width': undefined,
              'og:image:height': ''
            }
          }
        };

        tfMetaTags.update();

        // It runs the fns, and remove falsy values
        expect(tfMetaTags.current).toEqual({
          title: 'Homepage',
          properties: {
            description: 'Desc',
            keywords: 'Meta, tags, home',
            'og:url': 'http://someurl.com/test',
            'og:image': 'http://someurl.com/image.jpg'
          }
        });
      });

      it('when have interpolations', function() {
        tfMetaTags.setDefaults({
          properties: {
            'og:url': function(movieData) {
              return movieData.url;
            },
            'og:image': '{{movieData.img}}'
          }
        });

        tfMetaTags.resolved = {
          movieData: {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            year: 2001,
            summary: 'A meek hobbit of the Shire and eight companions set out on a journey to Mount Doom to destroy' +
            ' the One Ring and the dark lord Sauron.',
            img: 'http://someurl.com/image.jpg',
            url: 'http://someurl.com/test'
          }
        };

        $state.router.globals.current = {
          tfMetaTags: {
            title: function(movieData) {
              return movieData.title;
            },
            properties: {
              description: 'Summary: {{movieData.summary}}; Year: {{movieData.year}}',
              keywords: 'Meta, tags, home'
            }
          }
        };

        tfMetaTags.update();

        // It runs the fns, and remove falsy values
        expect(tfMetaTags.current).toEqual({
          title: 'The Lord of the Rings: The Fellowship of the Ring',
          properties: {
            description: 'Summary: A meek hobbit of the Shire and eight companions set out on a journey to Mount' +
            ' Doom to destroy the One Ring and the dark lord Sauron.; Year: 2001',
            keywords: 'Meta, tags, home',
            'og:url': 'http://someurl.com/test',
            'og:image': 'http://someurl.com/image.jpg'
          }
        });
      });

    });

    it('should have an initialize method which listen for $transitions.onSuccess', function() {
      spyOn($transitions, 'onSuccess');

      expect(tfMetaTags.initialize).toBeDefined();
      expect(tfMetaTags.initialize).toEqual(jasmine.any(Function));

      tfMetaTags.initialize();

      expect($transitions.onSuccess).toHaveBeenCalledWith({to: '**'}, jasmine.any(Function));
    });

    it('when receiving $transitions.onSuccess, should update', function() {
      spyOn(tfMetaTags, 'update');

      tfMetaTags.initialize();

      expect(tfMetaTags.update).not.toHaveBeenCalled();

      $transitions.getHooks('onSuccess')[3].callback({
        injector: function() {
          return {
            get: angular.noop
          };
        },
        getResolveTokens: function() {
          return ['a'];
        }
      });
      $timeout.flush();

      expect(tfMetaTags.update).toHaveBeenCalledWith();
    });

    it('when calling update method it should register tfMetaTags.current on the $rootScope.tfMetaTags', function() {
      tfMetaTags.update();

      expect($rootScope.tfMetaTags).toBe(tfMetaTags.current);
    });

    it('should call the beforeChange callback when its set', function() {
      var callbacks = {
        beforeChange: jasmine.createSpy()
      };
      tfMetaTags.addCallback('beforeChange', callbacks.beforeChange);

      tfMetaTags.update();

      expect(callbacks.beforeChange).toHaveBeenCalled();
    });

    it('should call the afterChange callback when its set', function() {
      var callbacks = {
        afterChange: jasmine.createSpy()
      };
      tfMetaTags.addCallback('afterChange', callbacks.afterChange);

      tfMetaTags.update();

      expect(callbacks.afterChange).toHaveBeenCalled();
    });

  });

});
