var Consumer = require('prozess').Consumer;
var util = require("util");
var StreamShim = require("readable-stream");

var KafkaStream = function(options){
  options = options || {};
  if (!options.topic){
    throw new Error("ReadableKafkaStream requires a topic");
  }
  this.topic = options.topic;
  this.readable = true;
  this.writable = false;

  this.consumer = new Consumer(options);
  this.partition = this.consumer.partition;
  this.host = this.consumer.host;
  this.port = this.consumer.port;
  this.offset = this.consumer.offset;
  this.maxMessageSize = this.consumer.maxMessageSize;
  this.nextOffset = null;
  this.connected = false;
  StreamShim.Readable.call(this, {objectMode : true});

};


util.inherits(KafkaStream, StreamShim.Readable);

var consume = function(stream, cb){
  var that = stream;
  that.consumer.consume(function(err, messages){
    if (err){
      return that.emit('error', err);
    }
    console.log("about to push: ", messages);
    //console.log("state: ", that._readableState);
    that.push(messages);
    // a new read means the last read was successful,
    // so the offset should be updated to the last one
    if (that.nextOffset){
      that.offset = that.nextOffset;
    }
    that.nextOffset = that.consumer.offset;
    // TODO throw some event, so it can be persisted?
  });

};

KafkaStream.prototype._read = function(){
  var that = this;
  if (!that.connected){
    that.consumer.connect(function(err) {
      if (err){
        return that.emit('error', err);
      } else {
        consume(that);
      }
    });
  } else {
    consume(that);
  }
};


module.exports = KafkaStream;


