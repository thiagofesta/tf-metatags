describe('Testing Service: MetaTags', function() {

  var MetaTags,
    $rootScope,
    $state;

  beforeEach(module('tf-metatags'));

  beforeEach(function() {
    module('tf-metatags', function ($provide) {
      $provide.value('$rootScope', {
        $on: jasmine.createSpy()
      });

      $provide.value('$state', {
        current: {}
      });
    });
    inject(function (_MetaTags_, _$rootScope_, _$state_) {
      MetaTags = _MetaTags_;
      $rootScope = _$rootScope_;
      $state = _$state_;
    });
  });

  it('should return a service called MetaTags', function() {
    expect(MetaTags).toBeDefined();
    expect(MetaTags).toEqual(jasmine.any(Object));
  });

  it('should be able to (set/get)Defaults', function() {
    expect(MetaTags.setDefaults).toBeDefined();
    expect(MetaTags.setDefaults).toEqual(jasmine.any(Function));
    expect(MetaTags.getDefaults).toBeDefined();
    expect(MetaTags.getDefaults).toEqual(jasmine.any(Function));

    expect(MetaTags.getDefaults()).toEqual({});

    var obj = {
      title: 'TF MetaTags',
      properties: {
        description: 'Describes a homepage'
      }
    };

    MetaTags.setDefaults(obj);

    expect(MetaTags.getDefaults()).toEqual(obj);
  });

  it('should be able to (set/get)TitlePrefix', function() {
    expect(MetaTags.setTitlePrefix).toBeDefined();
    expect(MetaTags.setTitlePrefix).toEqual(jasmine.any(Function));
    expect(MetaTags.getTitlePrefix).toBeDefined();
    expect(MetaTags.getTitlePrefix).toEqual(jasmine.any(Function));

    expect(MetaTags.getTitlePrefix()).toBe('');

    MetaTags.setTitlePrefix('MetaTags ');

    expect(MetaTags.getTitlePrefix()).toBe('MetaTags ');
  });

  it('should be able to (set/get)TitleSuffix', function() {
    expect(MetaTags.setTitleSuffix).toBeDefined();
    expect(MetaTags.setTitleSuffix).toEqual(jasmine.any(Function));
    expect(MetaTags.getTitleSuffix).toBeDefined();
    expect(MetaTags.getTitleSuffix).toEqual(jasmine.any(Function));

    expect(MetaTags.getTitleSuffix()).toBe('');

    MetaTags.setTitleSuffix(' | TF');

    expect(MetaTags.getTitleSuffix()).toBe(' | TF');
  });

  it('should have a current property', function() {
    expect(MetaTags.current).toBeDefined();
    expect(MetaTags.current).toEqual({});
  });

  it('should have an update method', function() {
    expect(MetaTags.update).toBeDefined();
    expect(MetaTags.update).toEqual(jasmine.any(Function));
  });

  describe('should update correctly', function() {

    it('when have nothing', function() {
      $state.current = {};

      MetaTags.update();

      expect(MetaTags.current).toEqual({});
    });

    it('when have only title and description and setDefaults', function() {
      $state.current = {
        metaTags: {
          title: 'Homepage',
          properties: {
            description: 'Description of homepage'
          }
        }
      };

      MetaTags.setDefaults({
        title: 'Title',
        properties: {
          description: 'Desc',
          keywords: 'Meta, tags, home'
        }
      });

      MetaTags.update();

      expect(MetaTags.current).toEqual({
        title: 'Homepage',
        properties: {
          description: 'Description of homepage',
          keywords: 'Meta, tags, home'
        }
      });
    });

    it('when have only title and description and setTitlePrefix and setTitleSuffix', function() {
      $state.current = {
        metaTags: {
          title: 'Homepage',
          properties: {
            description: 'Description of homepage'
          }
        }
      };

      MetaTags.setTitlePrefix('Pre ');
      MetaTags.setTitleSuffix(' | TF');

      MetaTags.update();

      expect(MetaTags.current).toEqual({
        title: 'Pre Homepage | TF',
        properties: {
          description: 'Description of homepage'
        }
      });
    });

    it('when have nothing and use setTitlePrefix and setTitleSuffix', function() {
      $state.current = {};

      MetaTags.setTitlePrefix('Pre ');
      MetaTags.setTitleSuffix(' | TF');
      MetaTags.update();

      expect(MetaTags.current).toEqual({
        title: 'Pre  | TF'
      });
    });

    it('when has title, description and keywords', function() {
      $state.current = {
        metaTags: {
          title: 'Homepage',
          properties: {
            description: 'The homepage',
            keywords: 'home, page'
          }
        }
      };

      MetaTags.update();

      expect(MetaTags.current).toEqual($state.current.metaTags);
    });

  });

  it('should have an init method which listen for $stateChangeSuccess on the $rootScope', function() {
    expect(MetaTags.init).toBeDefined();
    expect(MetaTags.init).toEqual(jasmine.any(Function));

    MetaTags.init();

    expect($rootScope.$on).toHaveBeenCalledWith('$stateChangeSuccess', MetaTags.update);
  });

  it('when calling update method it should register MetaTags.current on the $rootScope.MetaTags', function() {
    MetaTags.update();

    expect($rootScope.MetaTags).toBe(MetaTags.current);
  });

  it('should be able to add a callbacks', function() {
    expect(MetaTags.addCallback).toBeDefined();
    expect(MetaTags.addCallback).toEqual(jasmine.any(Function));
    expect(MetaTags.getCallback).toBeDefined();
    expect(MetaTags.getCallback).toEqual(jasmine.any(Function));

    var fn = function() {};
    MetaTags.addCallback('afterChange', fn);

    expect(MetaTags.getCallback()).toEqual({
      afterChange: jasmine.any(Function)
    });
    expect(MetaTags.getCallback('afterChange')).toBe(fn);
    expect(MetaTags.getCallback('beforeChange')).toBeUndefined();
  });

  it('should call the beforeChange callback when its set', function() {
    var callbacks = {
      beforeChange: jasmine.createSpy()
    };
    MetaTags.addCallback('beforeChange', callbacks.beforeChange);

    MetaTags.update();

    expect(callbacks.beforeChange).toHaveBeenCalled();
  });

  it('should call the afterChange callback when its set', function() {
    var callbacks = {
      afterChange: jasmine.createSpy()
    };
    MetaTags.addCallback('afterChange', callbacks.afterChange);

    MetaTags.update();

    expect(callbacks.afterChange).toHaveBeenCalled();
  });

});
