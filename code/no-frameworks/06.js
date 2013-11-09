// core module
var http = require('http');

// npm packages
var router = require('routes')();
var Templar = require('templar');
var ejs = require('ejs');

router.addRoute('/*', require('./routes/other2.js'));
router.addRoute('/', require('./routes/home2.js'));

http.createServer(function (req, res) {
  res.template = Templar(req, res, templarOptions);
  router.match(req.url).fn(req, res);
}).listen(3000);
