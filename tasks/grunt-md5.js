/*
 * grunt-md5
 * https://github.com/jney/grunt-md5
 *
 * Copyright (c) 2012 Jean-Sébastien Ney
 * Licensed under the MIT license.
 */

/*global _:true, require:true*/

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;

  grunt.registerMultiTask('md5', 'Generate a md5 filename', function() {
    var options = grunt.helper('options', this);

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    var files = this.files || grunt.helper('normalizeMultiTaskFiles', this.data, this.target);
    var srcFiles;
    var destDir;

    files.forEach(function(file) {
      srcFiles = grunt.file.expandFiles(file.src);
      destDir = file.dest;

      if (typeof srcFiles == 'undefined') {
        // TODO generate error if file does not exists
        return;
      }

      if (grunt.file.exists(destDir) === false) {
        grunt.file.mkdir(destDir);
      }

      destDir = grunt.file.expandDirs(destDir)[0];

      srcFiles.forEach(function(srcFile) {
        grunt.helper('md5', srcFile, destDir, options, function(file) {
          grunt.log.writeln('File \'' + file + '\' created.');
        });
      });

    });
  });

  grunt.registerHelper('md5', function(srcFile, destDir, opts, callback) {
    try {
      var srcCode = grunt.file.read(srcFile);
      var ext = '';
      // keep extension unless you explicitly tell to not
      if (opts.keepExtension !== false) {
        ext = fileExtension(srcFile);
        if (ext) {
          ext = '.' + ext;
        }
      }
      var filename = require('crypto').
        createHash('md5').
        update(srcCode).
        digest('hex') + ext;

      var destFile = require('path').join(destDir, filename);

      grunt.file.copy(srcFile, destFile);

      if (_.isFunction(opts.callback)) {
        opts.callback(destFile, srcFile, srcCode);
      }

      callback(destFile, srcFile, srcCode);

    } catch(err) {
      grunt.log.error(err);
      grunt.fail.warn("Fail to generate an MD5 file name");
    }
  });

  function fileExtension(filename) {
    var array = filename.split('.');
    if (array.length === 1) {
      return '';
    } else {
      return array.pop();
    }
  }
};
