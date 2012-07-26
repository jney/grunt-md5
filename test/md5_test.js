var fs = require('fs');
var grunt = require('grunt');

exports.md5 = {
  main: function(test) {
    test.expect(1);

    var filename = require('crypto').
      createHash('md5').
      update(fs.readFileSync('fixtures/js/test.js', 'utf8')).
      digest('hex') + '.js';
    var result = fs.existsSync('fixtures/output/'+filename);
    test.ok(result, 'should generate a md5 filename');

    test.done();
  }
};
