var http = require('http');

// regexes for websites
var home = require('./lib/home.js');
var auth = require('./lib/auth.js');
var profile = require('./lib/profile.js');

// hosts and port for the websites
var config = require('./config.json');

// wrapping http-proxy
var bouncer = require('./lib/bouncer.js');

var server = http.createServer(function (req, res) {
    var bounce = bouncer(req, res);

    if (home(req)) {
        bounce(config.home.host, config.home.port);
    }
    else if (profile(req)) {
        bounce(config.profile.host, config.profile.port);
    }
    else if (auth(req)) {
        bounce(config.auth.host, config.auth.port);
    }
    else {
        res.statusCode = 404;
        res.end('404 Not Found');
    }
});

server.listen(3000);
