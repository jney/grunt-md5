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
  var path = require('path');

  grunt.registerMultiTask('md5', 'Generate a md5 filename', function() {
    var destDir;
    // file object : {newPath: /***/, oldPath: /***/, content: /***/}
    var currentFile;
    var options = this.options({
      encoding: 'utf8'
    });

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(file) {
      // Keep track of processedFiles so we can call the `after` callback if needed.
      var processedFiles = [];

      if (typeof file.src === 'undefined') {
        grunt.fail.warn('Files object doesn\'t exist');
      }

      if (!grunt.file.exists(file.dest)) {
        grunt.file.mkdir(file.dest);
        grunt.verbose.writeln('Directory \'' + file.dest + '\' created.');
      }

      var srcFiles = grunt.file.expand(file.src);
      var destDir = grunt.file.expand(file.dest)[0];

      grunt.verbose.writeln('Files: ' + file.src);
      grunt.verbose.writeln('Destination directory: \'' + destDir + '\'');

      srcFiles.forEach(function(srcFile) {
        try {
          var basename = '';
          var destFile;
          var ext = '';
          var filename;
          var srcCode = grunt.file.read(srcFile);

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
            update(srcCode, options.encoding).
            digest('hex') + ext;

          destFile = path.join(file.dest, filename);

          grunt.file.copy(srcFile, destFile);

          currentFile = {
            newPath: destFile,
            oldPath: srcFile,
            content: srcCode
          };

          // for callback after each file
          if (_.isFunction(options.afterEach)) {
            options.afterEach(currentFile);
          }

          if (_.isFunction(options.after)) {
            processedFiles.push(currentFile);
          }

          grunt.log.writeln('File \'' + destFile + '\' created.');
        } catch(err) {
          grunt.log.error(err);
          grunt.fail.warn('Fail to generate an MD5 file name');
        }
      });

      // call `after` if defined
      if (_.isFunction(options.after)) {
        options.after(processedFiles);
      }
    });
  });
};

