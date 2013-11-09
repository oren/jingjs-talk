// core module
var http = require('http');

http.createServer(function (req, res) {
  res.end('done\n');
}).listen(3000);
