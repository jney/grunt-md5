// For testing callbacks.
var fs = require('fs');

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
      },
      callback: {
        files: {
          'test/fixtures/output/callback': 'test/fixtures/test.js'
        },
        options: {
          callback: function(newPath, oldPath, content) {
            var fileContent = 'newPath: ' + newPath + '\noldPath: ' + oldPath + '\ncontent: ' + content;
            // Doing sync here because there isn't a way to do async in task execution.
            fs.appendFileSync('test/fixtures/output/callback.out', fileContent);
          }
        }
      },
      after: {
        files: {
          'test/fixtures/output/after': ['test/fixtures/test.js', 'test/fixtures/test2.js']
        },
        options: {
          after: function(files) {
            files.forEach(function(file) {
              var fileContent = 'newPath: ' + file.newPath + '\noldPath: ' + file.oldPath + '\ncontent: ' + file.content;
              // Doing sync here because there isn't a way to do async in task execution.
              fs.appendFileSync('test/fixtures/output/after.out', fileContent);
            });
          }
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
