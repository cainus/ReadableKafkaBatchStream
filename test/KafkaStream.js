var KafkaStream = require('../index');
var should = require('should');
var sinon = require('sinon');
var prozess = require('prozess');

describe("KafkaStream", function(){
  it ("throws an exception if created without a topic", function(){
    try {
      var stream = new KafkaStream({});
      should.fail("expected exception was not raised");
    } catch(ex){
      ex.message.should.equal("ReadableKafkaStream requires a topic");
    }
  });
  it ("creates a Prozess consumer", function(){
    var stream = new KafkaStream({topic : 'test'});
    stream.topic.should.equal('test');
    stream.consumer.topic.should.equal('test');
  });
  it ("has a default host of 'localhost'", function(){
    new KafkaStream({topic : 'test'}).host.should.equal("localhost");
  });
  it ("has a default port of 9292", function(){
    new KafkaStream({topic : 'test'}).port.should.equal(9092);
  });
  it ("has a default offset of null", function(){
    should.not.exist(new KafkaStream({topic : 'test'}).offset);
  });
  it ("has a default maxMessageSize of 1 MB", function(){
    new KafkaStream({topic : 'test'}).maxMessageSize.should.equal(1024 * 1024);
  });
  it ("has a default partition of 0", function(){
    new KafkaStream({topic : 'test'}).partition.should.equal(0);
  });
  it ("can set host", function(){
    new KafkaStream({topic : 'test', host : 'asdf.com'}).host.should.equal("asdf.com");
  });
  it ("can set port", function(){
    new KafkaStream({topic : 'test', port : 1010}).port.should.equal(1010);
  });
  it ("can set offset", function(){
    new KafkaStream({topic : 'test', offset : 90}).offset.eq(90).should.equal(true);
  });
  it ("can set maxMessageSize", function(){
    new KafkaStream({topic : 'test', maxMessageSize : 90}).maxMessageSize.should.equal(90);
  });
  it ("can set partition", function(){
    new KafkaStream({topic : 'test', partition : 2}).partition.should.equal(2);
  });
});
