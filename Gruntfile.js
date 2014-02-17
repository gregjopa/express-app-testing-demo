module.exports = function (grunt) {

  // configuration
  grunt.initConfig({


    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: {
        src: ['app/**/*.js']
      },
      gruntfile: {
        src: 'Gruntfile.js'
      }
    },


    watch: {
      lint: {
        files: '<%= jshint.files.src %>',
        tasks: 'jshint'
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

  });


  // plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');


  // tasks
  grunt.registerTask('server', ['concurrent:target']);
  grunt.registerTask('default', ['jshint', 'server']);

};
