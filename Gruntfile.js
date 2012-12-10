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
        es5: true,
        globals: {}
      }
    },
    clean: {
      output: {
        src: ['test/fixtures/output']
      }
    },
    md5: {
      main: {
        files: {
          'test/fixtures/output/main': 'test/fixtures/test.js'
        },
        options: {
          keepExtension: true,
          keepBasename: true
        }
      },
      noExtension: {
        files: {
          'test/fixtures/output/noExtension': 'test/fixtures/test.js'
        },
        options: {
          keepExtension: false,
          keepBasename: true
        }
      },
      noBasename: {
        files: {
          'test/fixtures/output/noBasename': 'test/fixtures/test.js'
        },
        options: {
          keepExtension: true,
          keepBasename: false 
        }
      },
      noBasenameOrExtension: {
        files: {
          'test/fixtures/output/noBasenameOrExtension': 'test/fixtures/test.js'
        },
        options: {
          keepExtension: false,
          keepBasename: false 
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
  grunt.registerTask('test', ['clean', 'md5', 'nodeunit', 'clean']);
  grunt.registerTask('default', ['jshint', 'test']);
};
