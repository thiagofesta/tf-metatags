describe('Testing Provider/Service: tfMetaTags', function() {

  var tfMetaTags,
    $rootScope,
    $state;

  beforeEach(module('tf.metatags'));

  beforeEach(function() {
    module('tf.metatags', function ($provide) {
      $provide.value('$rootScope', {
        $on: jasmine.createSpy()
      });

      $provide.value('$state', {
        current: {}
      });
    });
    inject(function (_tfMetaTags_, _$rootScope_, _$state_) {
      tfMetaTags = _tfMetaTags_;
      $rootScope = _$rootScope_;
      $state = _$state_;
    });
  });

  it('should return a service called tfMetaTags', function() {
    expect(tfMetaTags).toBeDefined();
    expect(tfMetaTags).toEqual(jasmine.any(Object));
  });

  it('should be able to (set/get)Defaults', function() {
    expect(tfMetaTags.setDefaults).toBeDefined();
    expect(tfMetaTags.setDefaults).toEqual(jasmine.any(Function));
    expect(tfMetaTags.getDefaults).toBeDefined();
    expect(tfMetaTags.getDefaults).toEqual(jasmine.any(Function));

    expect(tfMetaTags.getDefaults()).toEqual({});

    var obj = {
      title: 'TF tfMetaTags',
      properties: {
        description: 'Describes a homepage'
      }
    };

    tfMetaTags.setDefaults(obj);

    expect(tfMetaTags.getDefaults()).toEqual(obj);
  });

  it('should be able to (set/get)TitlePrefix', function() {
    expect(tfMetaTags.setTitlePrefix).toBeDefined();
    expect(tfMetaTags.setTitlePrefix).toEqual(jasmine.any(Function));
    expect(tfMetaTags.getTitlePrefix).toBeDefined();
    expect(tfMetaTags.getTitlePrefix).toEqual(jasmine.any(Function));

    expect(tfMetaTags.getTitlePrefix()).toBe('');

    tfMetaTags.setTitlePrefix('tfMetaTags ');

    expect(tfMetaTags.getTitlePrefix()).toBe('tfMetaTags ');
  });

  it('should be able to (set/get)TitleSuffix', function() {
    expect(tfMetaTags.setTitleSuffix).toBeDefined();
    expect(tfMetaTags.setTitleSuffix).toEqual(jasmine.any(Function));
    expect(tfMetaTags.getTitleSuffix).toBeDefined();
    expect(tfMetaTags.getTitleSuffix).toEqual(jasmine.any(Function));

    expect(tfMetaTags.getTitleSuffix()).toBe('');

    tfMetaTags.setTitleSuffix(' | TF');

    expect(tfMetaTags.getTitleSuffix()).toBe(' | TF');
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
      $state.current = {};

      tfMetaTags.update();

      expect(tfMetaTags.current).toEqual({});
    });

    it('when have only title and description and setDefaults', function() {
      $state.current = {
        tfMetaTags: {
          title: 'Homepage',
          properties: {
            description: 'Description of homepage'
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
          keywords: 'Meta, tags, home'
        }
      });
    });

    it('when have only title and description and setTitlePrefix and setTitleSuffix', function() {
      $state.current = {
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
      $state.current = {};

      tfMetaTags.setTitlePrefix('Pre ');
      tfMetaTags.setTitleSuffix(' | TF');
      tfMetaTags.update();

      expect(tfMetaTags.current).toEqual({
        title: 'Pre  | TF'
      });
    });

    it('when has title, description and keywords', function() {
      $state.current = {
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

  });

  it('should have an initialize method which listen for $stateChangeSuccess on the $rootScope', function() {
    expect(tfMetaTags.initialize).toBeDefined();
    expect(tfMetaTags.initialize).toEqual(jasmine.any(Function));

    tfMetaTags.initialize();

    expect($rootScope.$on).toHaveBeenCalledWith('$stateChangeSuccess', tfMetaTags.update);
  });

  it('when calling update method it should register tfMetaTags.current on the $rootScope.tfMetaTags', function() {
    tfMetaTags.update();

    expect($rootScope.tfMetaTags).toBe(tfMetaTags.current);
  });

  it('should be able to add a callbacks', function() {
    expect(tfMetaTags.addCallback).toBeDefined();
    expect(tfMetaTags.addCallback).toEqual(jasmine.any(Function));
    expect(tfMetaTags.getCallback).toBeDefined();
    expect(tfMetaTags.getCallback).toEqual(jasmine.any(Function));

    var fn = function() {};
    tfMetaTags.addCallback('afterChange', fn);

    expect(tfMetaTags.getCallback()).toEqual({
      afterChange: jasmine.any(Function)
    });
    expect(tfMetaTags.getCallback('afterChange')).toBe(fn);
    expect(tfMetaTags.getCallback('beforeChange')).toBeUndefined();
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
