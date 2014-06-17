var test = require('tape');
var fs = require('fs');
var tuga = require('../');


test('through-tuga - modifying "a" by "*"', function (t) {
  t.plan(2);

  var number = 0;

  fs.createReadStream('./test/data.txt')
  .pipe(tuga(function (chunk, enc, cb) {
    for (var i = 0; i < chunk.length; i++) {
      if (chunk[i] === 101) {
        ++number;
        chunk[i] = 42;
      }
    }

    this.push(chunk);

    cb();
  }))
  .on('data', function (data) {
    var check_number = 0;

    for (var i = 0; i < data.length; i++) {
      if (data[i] === 42) ++check_number;
    }

    t.equal(number, check_number, 'find "*" ' + check_number + ' times in stream');
  })
  .on('end', function () {
    t.pass('end of stream');
  });
});
