var Transform = require('stream').Transform;
var inherits = require('util').inherits;


function Stream (options, transform, flush) {
  Transform.call(this, options);
  this._transform = transform;
  this._flush = flush;
}

inherits(Stream, Transform);


module.exports = tuga;

function tuga (options, transform, flush) {
  if (typeof options === 'function') {
    flush = transform;
    transform = options;
    options = {};
  }

  if (typeof transform !== 'function')
    transform = function (chunk, enc, cb) { cb(null, chunk); };

  if (typeof flush !== 'function')
    flush = null;

  return new Stream(options, transform, flush);
}
