var httpProxy = require('http-proxy');
var router = new httpProxy.RoutingProxy();

// partial application - returning a function
function bouncer(req, res) {
    function bounce(host, port) {
        router.proxyRequest(req, res, {
            host: host,
            port: port,
            enable: { xforward: false }
        });
    }

    return bounce;
}

module.exports = bouncer;

