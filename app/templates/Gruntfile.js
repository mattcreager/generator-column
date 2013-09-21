/* jshint node: true */

'use strict';

module.exports = function(grunt) {

  var nodemonIgnoredFiles = [
    'README.md',
    'Gruntfile.js',
    'node-inspector.js',
    'karma.conf.js',
    '/.git/',
    '/node_modules/',
    '/app/',
    '/dist/',
    '/test/',
    '/coverage/',
    '/temp/',
    '/.tmp',
    '/.sass-cache',
    '*.txt',
    '*.jade',
  ];

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
        files: ['app.js', 'app/**/*.js', 'public/scripts/*.js'],
        tasks: ['jshint', 'browserify'],
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
          ignoredFiles: nodemonIgnoredFiles,
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

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify', 'concurrent:start']);
};