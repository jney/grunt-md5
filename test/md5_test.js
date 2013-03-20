'use strict';

var grunt = require('grunt');
var fs = require('fs');

exports.md5 = {
  main: function(test) {
    test.expect(1);

    var md5Filename = 'test-' + require('crypto').
      createHash('md5').
      update(grunt.file.read('test/fixtures/test.js', {encoding: 'utf8'}), 'utf8').
      digest('hex') + '.js';

    test.ok(grunt.file.exists('test/fixtures/output/main/' + md5Filename),
            'should generate an MD5 filename keeping its basename and extension');
    test.done();
  },
  noExtension: function(test) {
    test.expect(1);

    var md5Filename = 'test-' + require('crypto').
      createHash('md5').
      update(grunt.file.read('test/fixtures/test.js', {encoding: 'utf8'}), 'utf8').
      digest('hex');

    test.ok(grunt.file.exists('test/fixtures/output/noExtension/' + md5Filename),
            'should generate an MD5 filename keeping only its basename');
    test.done();
  },
  noBasename: function(test) {
    test.expect(1);

    var md5Filename = require('crypto').
      createHash('md5').
      update(grunt.file.read('test/fixtures/test.js', {encoding: 'utf8'}), 'utf8').
      digest('hex') + '.js';

    test.ok(grunt.file.exists('test/fixtures/output/noBasename/' + md5Filename),
            'should generate an MD5 filename keeping only its extension');
    test.done();
  },
  noBasenameOrExtension: function(test) {
    test.expect(1);

    var md5Filename = require('crypto').
      createHash('md5').
      update(grunt.file.read('test/fixtures/test.js', {encoding: 'utf8'}), 'utf8').
      digest('hex');

    test.ok(grunt.file.exists('test/fixtures/output/noBasenameOrExtension/' + md5Filename),
            'should generate an MD5 filename without keeping its basename or extension');
    test.done();
  },
  internationalCharacters: function(test) {
    test.expect(1);

    var md5Filename = 'international-' + require('crypto').
      createHash('md5').
      update(grunt.file.read('test/fixtures/international.js', {encoding: 'utf8'}), 'utf8').
      digest('hex') + '.js';

    test.ok(grunt.file.exists('test/fixtures/output/internationalCharacters/' + md5Filename),
            'should generate correct MD5 filename for contents with international characters');

    test.done();
  },
  expandFiles: function(test) {
    test.expect(4);

    var filePath = 'test/fixtures/output/expand/js/file1-d41d8cd98f00b204e9800998ecf8427e.js';
    test.ok(grunt.file.isFile(filePath), 'should generate js files not directories');
    
    filePath = 'test/fixtures/output/expand/js/file2-d41d8cd98f00b204e9800998ecf8427e.js';
    test.ok(grunt.file.isFile(filePath), 'should generate js files not directories');

    filePath = 'test/fixtures/output/expand/css/file3-d41d8cd98f00b204e9800998ecf8427e.css';
    test.ok(grunt.file.isFile(filePath), 'should generate css files not directories');

    filePath = 'test/fixtures/output/expand/css/file4-d41d8cd98f00b204e9800998ecf8427e.css';
    test.ok(grunt.file.isFile(filePath), 'should generate css files not directories');
    
    test.done();
  },
  afterEach: function(test) {
    test.expect(1);
    var output = fs.readFileSync('test/fixtures/output/afterEach.out', 'utf-8');
    var expected = fs.readFileSync('test/expected/afterEach.out', 'utf-8');
    test.equal(output, expected, 'should call afterEach function with new path, old path, and file content');
    test.done();
  },
  after: function(test) {
    test.expect(1);
    var output = fs.readFileSync('test/fixtures/output/after.out', 'utf-8');
    var expected = fs.readFileSync('test/expected/after.out', 'utf-8');
    test.equal(output, expected, 'should call after function with all new path, old path, and file content of all files');
    test.done();
  },
  contextAndOptionsAfterEach: function(test) {
    test.expect(1);
    var output = fs.readFileSync('test/fixtures/output/contextAndOptions/afterEach.out', 'utf-8');
    var expected = fs.readFileSync('test/expected/contextAndOptions/afterEach.out', 'utf-8');
    test.equal(output, expected, 'should give options to callback and set task context');
    test.done();
  },
  contextAndOptionsAfter: function(test) {
    test.expect(1);
    var output = fs.readFileSync('test/fixtures/output/contextAndOptions/after.out', 'utf-8');
    var expected = fs.readFileSync('test/expected/contextAndOptions/after.out', 'utf-8');
    test.equal(output, expected, 'should give options to callback and set task context');
    test.done();
  }
};
