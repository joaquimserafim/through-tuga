# through-tuga

<a href="https://nodei.co/npm/through-tuga/"><img src="https://nodei.co/npm/through-tuga.png"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/through-tuga.png?branch=master)](https://travis-ci.org/joaquimserafim/through-tuga)

[![browser support](https://ci.testling.com/joaquimserafim/through-tuga.png)](https://ci.testling.com/joaquimserafim/through-tuga)


through concept but with Streams2/Tranform making things simple, work as well for Stream3

**V1**

**node: >=0.10**

##API

    through_tuga([optionsObject,] transformFunction[, flushFunction ])
    
    The "optionsObject" argument is optional and is passed straight through to
    stream.Transform.
    
    stream.pipe(through_tuga({objectMode: true*}, 
        function (chunk, encoding, callback) {
        
            // flush
            this.push(chunk);
            cb();
        }
    )
    
    *optionsObject:
    {objectMode: true}     => if you are processing non-binary streams.
    {allowHalfOpen: false} => Default=true. If set to false, then the stream will 
    automatically end the readable side when the writable side ends and vice versa.
    
    
    
                
  

##Example
    
    
    var fs = require('fs');
    var tuga = require('through-tuga');
    
    
    // normal 
    
    fs.createReadStream('data.txt')
    .pipe(tuga(function (chunk, enc, cb) {
      this.push(chunk);
      cb();
    }))
    .on('data', function (data) {
      console.log(data.toString());
    });
    
    
    // make some transformation 
      
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
    
