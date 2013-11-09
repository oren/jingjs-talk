// core module
var http = require('http');

http.createServer(function (req, res) {
  if (req.url === '/') {
    res.end('root\n');
  }

  res.end('anything else\n');
}).listen(3000);
