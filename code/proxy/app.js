var login = require('./yp/handlers/auth/login.js');
var api = require('./yp/handlers/api.js');
var listing = require('./yp/handlers/listing.js');
var middleware = require('./yp/middleware.js');
var legacyProxy = require('./legacy_proxy.js');

app.get('/logout', middleware, login.destroy);
app.post('/login', middleware, login.post);
app.get('/api', api);
app.get('/listings/:id/directions', middleware, listing);

app.all('*', legacyProxy);
