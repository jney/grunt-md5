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
    var options = this.options(),
      srcFiles = grunt.file.expandFiles(this.file.srcRaw),
      destDir = this.file.dest;

    grunt.verbose.writeflags(options, 'Options');

    grunt.verbose.writeln('Files: ' + srcFiles);
    grunt.verbose.writeln('Destination directory:' + destDir);

    if (typeof srcFiles === 'undefined') {
      grunt.fail.warn("Files object doesn't exist");
    }

    srcFiles.forEach(function(srcFile) {
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

        if (_.isFunction(options.callback)) {
          options.callback(destFile, srcFile, srcCode);
        }
        grunt.log.writeln("File '" + destFile + "' created.");
      } catch(err) {
        grunt.log.error(err);
        grunt.fail.warn("Fail to generate an MD5 file name");
      }
    });
  });
};
