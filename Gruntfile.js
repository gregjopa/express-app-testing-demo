module.exports = function (grunt) {

  // configuration
  grunt.initConfig({


    jshint: {
      options: {
        jshintrc: '.jshintrc',
        ignores: ['test/coverage/**/*.js']
      },
      files: {
        src: ['app/**/*.js', 'test/**/*.js']
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },


    watch: {
      lint: {
        files: '<%= jshint.files.src %>',
        tasks: 'jshint'
      },
      test: {
        files: ['test/unit/*.js'],
        tasks: ['jshint', 'coverage']
      }
    },


    nodemon: {
      dev: {
        script: 'app/app.js',
        options: {
          ext: 'js,json'
        }
      }
    },


    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },


    mochaTest: {
      unit: {
        options: {
          reporter: 'spec'
        },
        src: ['test/unit/*.js']
      }
    },


    // start - code coverage settings

    env: {
      coverage: {
        APP_DIR_FOR_CODE_COVERAGE: '../test/coverage/instrument/app/'
      }
    },


    clean: {
      coverage: {
        src: ['/test/coverage/']
      }
    },


    instrument: {
      files: 'app/*.js',
      options: {
        lazy: true,
        basePath: 'test/coverage/instrument/'
      }
    },


    reloadTasks: {
      rootPath: 'test/coverage/instrument/app'
    },


    storeCoverage: {
      options: {
        dir: 'test/coverage/reports'
      }
    },


    makeReport: {
      src: 'test/coverage/reports/**/*.json',
      options: {
        type: 'lcov',
        dir: 'test/coverage/reports',
        print: 'detail'
      }
    }

    // end - code coverage settings

  });


  // plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-istanbul');
  grunt.loadNpmTasks('grunt-env');


  // tasks
  grunt.registerTask('server', ['concurrent:target']);
  grunt.registerTask('default', ['jshint', 'server']);
  grunt.registerTask('test', ['mochaTest:unit']);

  grunt.registerTask('coverage', ['jshint', 'clean', 'env:coverage', 'instrument',
    'reloadTasks', 'test', 'storeCoverage', 'makeReport' ]);

};
