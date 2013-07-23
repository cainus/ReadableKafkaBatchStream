var KafkaStream = require('./index');
var options = {topic : 'test', host : 'localhost'};
var kafkaStream = new KafkaStream(options);
var util = require("util");
var Readable = require('readable-stream').Readable;
var Transform = require('readable-stream').Transform;



var stringifier = new Transform({objectMode : true});
stringifier._transform = function(chunk, encoding, cb){
  console.log("chunk is: ", chunk);
  this.push(chunk.toString());
  cb();
};

kafkaStream.pipe(stringifier).pipe(process.stdout);

