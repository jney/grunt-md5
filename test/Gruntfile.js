module.exports = function(grunt) {
  'use strict';

  grunt.file.mkdir('fixtures/output');

  grunt.initConfig({
    pkg: {
      name: 'grunt-md5',
      version: '0.1.1'
    },

    test: {
      tasks: ["*_test.js"]
    },

    clean: {
      output: ['fixtures/output']
    },

    md5: {
      main: {
        files: {
          'fixtures/output': 'fixtures/js/*'
        },
        options: {
          keepExtension: true
        }
      }
    }
  });

  grunt.loadTasks('../node_modules/grunt-contrib/tasks');
  grunt.loadTasks('../tasks');
  grunt.registerTask('default', 'clean md5 test');
};
