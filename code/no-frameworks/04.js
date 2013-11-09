// core module
var http = require('http');

// npm packages
var router = require('routes')();

router.addRoute('/*', other);
router.addRoute('/', home);

http.createServer(function (req, res) {
  router.match(req.url).fn(req, res);
}).listen(3000);

function home (req, res) {
  res.end('root\n');
};

function other (req, res) {
  res.end('anything else\n');
};
