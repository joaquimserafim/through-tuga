var Transform = require('stream').Transform;
var inherits = require('util').inherits;


function Stream (options, fn) {
  if (!(this instanceof Stream)) return new Stream(options, fn);
  Transform.call(this, options);

  // set _transform function
  this._transform = fn;
}

inherits(Stream, Transform);


module.exports = tuga;

function tuga (options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  }

  return Stream(options, cb);
}