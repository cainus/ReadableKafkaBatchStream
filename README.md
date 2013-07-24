#ReadableKafkaBatchStream

A node.js stream for reading from a Kafka queue.

This Readable stream emits arrays of buffers.  The buffers are the contents of your kafka queue, and the 
arrays represent a "batch" of these buffers, because Kafka requests items from the queue in batches, and
doesn't mark its progress in the queue until an entire batch is complete.

(Unfortunately the batching nature of Kafka makes it impossible for the Readable stream to just emit messages 
one at a time, making this a slightly more difficult Stream to deal with.) 

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
  maxMessageSize: 1024 * 1024  // 1 MB
};
var kafkaStream = new KafkaStream(options);

// make a simple transform stream to change the array of buffers into a string
var stringifier = new Transform({objectMode : true});
stringifier._transform = function(chunk, encoding, cb){
  console.log("chunk is: ", chunk);
  this.push(chunk.toString());
  cb();
};

// pipe the kafka stream to the stringifier to standard out
kafkaStream.pipe(stringifier).pipe(process.stdout);

```
