#ReadableKafkaBatchStream

A node.js stream for reading from a Kafka queue

##Usage
This example prints your kafka queue to the screen.

```javascript

var KafkaStream = require('readable-kafka-batch-stream');
var Transform = require('readable-stream').Transform;

var options = {
  topic: 'test',
  partition: 0,
  host: 'localhost',
  port: 9092,
  offset: null, // Number, String or BigNum
  maxMessageSize: 1024 * 1024,  // 1 MB
};
var kafkaStream = new KafkaStream(options);

var stringifier = new Transform({objectMode : true});
stringifier._transform = function(chunk, encoding, cb){
  console.log("chunk is: ", chunk);
  this.push(chunk.toString());
  cb();
};

kafkaStream.pipe(stringifier).pipe(process.stdout);

```
