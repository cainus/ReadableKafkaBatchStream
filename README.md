#ReadableKafkaBatchStream

A node.js stream for reading from a Kafka queue

##Usage

```javascript

var options = {
  topic: 'test',
  partition: 0,
  host: 'localhost',
  port: 9092,
  offset: null, // Number, String or BigNum
  maxMessageSize: 1024 * 1024,  // 1 MB
};
var kafkaStream = new ReadableKafkaStream(options);

```
