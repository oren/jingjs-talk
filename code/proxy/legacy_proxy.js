var httpProxy = require('http-proxy');
var router = new httpProxy.RoutingProxy();
var config = require('yp/config');

/**
 * So the way the YPU app works is:
 *
 * 1. If the URL is defined in the app, it serves it,
 *    e.g. `/`, `/glendale-ca/mip/123`
 * 2. If the app fails to recognize the URL, it proxies
 *    that request to the defined LEGACY_HOST.
 *
 *    Example: http://yellowpages.com/news gets proxied to the rails app.
 *
 */
function proxy(req, res) {
    router.proxyRequest(req, res, {
        host: config.LEGACY_HOST,
        port: config.LEGACY_PORT
    });
}

module.exports = proxy;
