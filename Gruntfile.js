module.exports = function(grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    buildtag: '-dev-' + grunt.template.today('yyyy-mm-dd'),
    meta: {
      banner: '/**\n' +
        ' * <%= pkg.description %>\n' +
        ' * @version v<%= pkg.version %><%= buildtag %>\n' +
        ' * @link <%= pkg.homepage %>\n' +
        ' * @author <%= pkg.authors.join(",") %>\n' +
        ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
        ' */\n'
    },

    connect: {
      options: {
        port: 3000,
        hostname: '0.0.0.0',
        open: 'http://0.0.0.0:3000/sample/index.html'
      },
      main: {
        options: {
          keepalive: true
        }
      },
      test: {
        options: {
          open: false
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      metatags: [
        'Gruntfile.js',
        'src/*.js'
      ],
      sample: [

      ],
      unit: {
        src: ['test/unit/{,*/}*.js']
      },
      e2e: {
        src: ['test/e2e/{,*/}*.js']
      }
    },

    jscs: {
      options: {
        config: '.jscsrc',
        reporter: require('jscs-stylish').path
      },
      metatags: [
        'Gruntfile.js',
        'src/*.js'
      ],
      sample: [

      ],
      unit: {
        src: ['test/unit/{,*/}*.js']
      },
      e2e: {
        src: ['test/e2e/{,*/}*.js']
      }
    },

    karma: {
      src: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      },
      build: {
        configFile: 'test/karma-build.conf.js',
        singleRun: true
      }
    },

    protractor: {
      options: {
        configFile: 'test/protractor.conf.js',
        noColor: false
      },
      e2e: {
        options: {
          keepAlive: false
        }
      }
    },

    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      build: {
        files: {
          'release/tf-metatags.min.js': ['release/tf-metatags.js']
        }
      }
    },

    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      build: {
        src: ['release/tf-metatags.js'],
        dest: 'release/tf-metatags.js'
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      src: {
        files: {
          'release/tf-metatags.js': ['src/tf-metatags.js']
        }
      }
    }

  });

  grunt.registerTask('build', [
    'test',
    'ngAnnotate:src',
    'concat:build',
    'uglify:build',
    'karma:build'
  ]);

  grunt.registerTask('server', [
    'connect:main'
  ]);

  grunt.registerTask('test', [
    'connect:test',
    'jshint',
    'jscs',
    'karma:src',
    'protractor:e2e'
  ]);

  grunt.registerTask('test:jshint', [
    'jshint'
  ]);

  grunt.registerTask('test:jscs', [
    'jscs'
  ]);

  grunt.registerTask('test:unit', [
    'karma:src'
  ]);

  grunt.registerTask('test:e2e', [
    'connect:test',
    'protractor:e2e'
  ]);

};
