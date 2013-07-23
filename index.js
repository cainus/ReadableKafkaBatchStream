var dir = './lib/';
if (process.env.READABLEKAFKABATCHSTREAM_COVERAGE){
  var dir = './lib-cov/';
}
module.exports = require(dir + 'KafkaStream');
