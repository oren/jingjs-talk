// core module
var http = require('http');

// npm packages
var router = require('routes')();

router.addRoute('/*', require('./routes/other.js'));
router.addRoute('/', require('./routes/home.js'));

http.createServer(function (req, res) {
  router.match(req.url).fn(req, res);
}).listen(3000);
