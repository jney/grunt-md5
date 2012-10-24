module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    },
    clean: {
      output: ['test/fixtures/output']
    },
    md5: {
      main: {
        files: {
          'test/fixtures/output': 'test/fixtures/js/*'
        },
        options: {
          keepExtension: true
        }
      }
    },
    nodeunit: {
      tests: 'test/*_test.js'
    }
  });

  grunt.loadTasks('tasks');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.registerTask('test', ['clean', 'md5', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
