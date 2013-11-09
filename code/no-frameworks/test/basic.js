var test = require('tape');
var http = require('http');

test('/ returns done', function (t) {
  t.plan(1);

  http.get('http://localhost:3000', function(res) {
    t.equal(res.statusCode, 200)
  }).on('error', function(e) {
    console.log('Got error: ' + e.message);
  });
});
