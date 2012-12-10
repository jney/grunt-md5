'use strict';

var grunt = require('grunt');

exports.md5 = {
  main: function(test) {
    test.expect(1);

    var md5Filename = 'test-' + require('crypto').
      createHash('md5').
      update(grunt.file.read('test/fixtures/test.js')).
      digest('hex') + '.js';

    test.ok(grunt.file.exists('test/fixtures/output/main/' + md5Filename),
            'should generate an MD5 filename keeping its basename and extension');
    test.done();
  },
  noExtension: function(test) {
    test.expect(1);

    var md5Filename = 'test-' + require('crypto').
      createHash('md5').
      update(grunt.file.read('test/fixtures/test.js')).
      digest('hex');

    test.ok(grunt.file.exists('test/fixtures/output/noExtension/' + md5Filename),
            'should generate an MD5 filename keeping only its basename');
    test.done();
  },
  noBasename: function(test) {
    test.expect(1);

    var md5Filename = require('crypto').
      createHash('md5').
      update(grunt.file.read('test/fixtures/test.js')).
      digest('hex') + '.js';

    test.ok(grunt.file.exists('test/fixtures/output/noBasename/' + md5Filename),
            'should generate an MD5 filename keeping only its extension');
    test.done();
  },
  noBasenameOrExtension: function(test) {
    test.expect(1);

    var md5Filename = require('crypto').
      createHash('md5').
      update(grunt.file.read('test/fixtures/test.js')).
      digest('hex');

    test.ok(grunt.file.exists('test/fixtures/output/noBasenameOrExtension/' + md5Filename),
            'should generate an MD5 filename without keeping its basename or extension');
    test.done();
  }
};
