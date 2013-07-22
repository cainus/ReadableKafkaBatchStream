var dir = './lib/';
if (process.env.READABLEKAFKABATCHSTREAM_COVERAGE){
  var dir = './lib-cov/';
}
exports.Stream = require(dir + 'Stream');
