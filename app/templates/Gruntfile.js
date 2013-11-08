'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['app/**/*.js', 'public/scripts/**/*.js']
    },
    concurrent: {
      start: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    watch: {
      options: {
        livereload: true,
        dateFormat: function(time) {
          grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('Waiting for more changes...');
        },
      },
      scripts: {
        files: ['public/scripts/*.js'],
        tasks: ['browserify'],
        options: {
          debounceDelay: 250
        }
      },
      layout: {
        files: ['public/images/*', 'public/stylesheets/*', 'app/views/*']
      }
    },
    nodemon: {
      dev: {
        options: {
          file: 'app.js',
          nodeArgs: ['--debug']
        }
      }
    },
    browserify: {
      basic: {
        src: ['public/scripts/main.js'],
        dest: 'public/build/build.js'
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['browserify', 'concurrent']);
};
