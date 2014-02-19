var test = require('tape');
var fs = require('fs');
var tuga = require('../');


fs.createReadStream('./test/data.txt')
.pipe(tuga(function (chunk, enc, cb) {
  
  for (var i = 0; i < chunk.length; i++) {
    if (chunk[i] === 101) chunk[i] = 42;
  }

  this.push(chunk);

  cb();
}))
.on('data', function (data) {
  console.log(data.toString());
})
.on('end', function () {
  console.log('Hello World!!!');
});