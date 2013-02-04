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

  var _ = grunt.util._, path = require('path');

  grunt.registerMultiTask('md5', 'Generate a md5 filename', function() {
    var options = this.options();
    var destDir;
    var isExpandedPair;

    grunt.verbose.writeflags(options, 'Options');

    // Keep track of processedFiles so we can call the `after` callback if needed.
    var processedFiles = [];
    this.files.forEach(function(filePair) {
      // Changes for each file (old path, new path, file content)
      var fileChange;

      isExpandedPair = filePair.orig.expand || false;

      grunt.verbose.writeln('Files: ' + filePair.src);
      if (typeof filePair.src === 'undefined') {
        grunt.fail.warn("Files object doesn't exist");
      }

      filePair.src.forEach(function(srcFile) {
        if (detectDestType(filePair.dest) === 'directory') {
          destDir = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, srcFile));
        } else {
          destDir = filePair.dest;
        }

        grunt.verbose.writeln('Destination directory:' + destDir);

        if (grunt.file.exists(destDir) === false) {
          grunt.verbose.writeln("Creating destination directory as it didn't exist.");
          grunt.file.mkdir(destDir);
        }

        try {
          var srcCode = grunt.file.read(srcFile), ext = '', basename = '', filename, destFile;
          // keep extension unless you explicitly tell to not
          if (options.keepExtension !== false) {
            ext = path.extname(srcFile);
          }
          // keep basename unless you explicitly tell to not
          if (options.keepBasename !== false) {
            basename = path.basename(srcFile, ext || path.extname(srcFile)) + '-';
          }
          filename = basename +
            require('crypto').
            createHash('md5').
            update(srcCode).
            digest('hex') + ext;

          destFile = path.join(destDir, filename);

          grunt.file.copy(srcFile, destFile);

          fileChange = {
            newPath: destFile,
            oldPath: srcFile,
            content: srcCode
          };

          if (_.isFunction(options.afterEach)) {
            options.afterEach(fileChange);
          }
          processedFiles.push(fileChange);
          grunt.log.writeln("File '" + destFile + "' created.");
        } catch(err) {
          grunt.log.error(err);
          grunt.fail.warn("Fail to generate an MD5 file name");
        }
      });

      if (options.after) {
        options.after(processedFiles);
      }
    });
  });

  var detectDestType = function(dest) {
    if (grunt.util._.endsWith(dest, '/')) {
      return 'directory';
    } else {
      return 'file';
    }
  };

  var unixifyPath = function(filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };
};

