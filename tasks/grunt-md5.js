/*
 * grunt-md5
 * https://github.com/jney/grunt-md5
 *
 * Copyright (c) 2012 Jean-Sébastien Ney
 * Licensed under the MIT license.
 */

/*global _:true */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils;

  var _ = grunt.util._;
  var async = grunt.util.async;
  var crypto = require('crypto');

  grunt.registerMultiTask('md5', 'Generate a md5 filename', function() {
    var options = grunt.helper('options', this);

    grunt.verbose.writeflags(options, 'Options');

    // TODO: ditch this when grunt v0.4 is released
    this.files = this.files || grunt.helper('normalizeMultiTaskFiles', this.data, this.target);

    var done = this.async();

    var srcFiles;
    var destDir;

    async.forEachSeries(this.files, function(file, next) {
      srcFiles = grunt.file.expandFiles(file.src);
      destDir = file.dest;

      if (typeof srcFiles == 'undefined') {
        // TODO generate error if file does not exists
      }

      if (grunt.file.exists(destDir) === false) {
        grunt.file.mkdir(destDir);
      }

      async.concatSeries(srcFiles, function(srcFile, nextConcat) {
        grunt.helper('md5', srcFile, destDir, options, function(file) {
          nextConcat(file);
        });
      }, function(filename) {
        grunt.log.writeln('File \'' + filename + '\' created.');
        next();
      });
    }, function() {
      done();
    });
  });

  grunt.registerHelper('md5', function(srcFile, destPath, opts, callback) {
    try {
      var srcCode = grunt.file.read(srcFile);
      var ext = '';
      if (opts.keepExtension !== false) {
        ext = '.' + fileExtension(srcFile);
      }
      var filename = require('crypto').
        createHash('md5').
        update(srcCode).
        digest('hex') + ext;

      var output = require('path').join(destPath, filename);

      grunt.file.copy(srcFile, output);

      if (_.isFunction(opts.callback)) {
        opts.callback(grunt.file.expand(output), srcFile);
      }

      callback(output);

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
